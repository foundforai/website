// Returns the FULL AI Visibility Audit — but only after verifying that the
// Stripe Checkout session was actually paid. The full report (every failing
// check + prioritized action plan) is never sent to the browser on the free
// path; this endpoint is the only way to obtain it.
//
// Flow: Stripe redirects the buyer to /scorecard/results?session_id=cs_...
// The results page calls GET /api/audit?session_id=cs_... — we retrieve the
// session from Stripe, confirm payment_status === 'paid', read the website URL
// from the session metadata, re-run the scorer server-side, and return the
// complete result. Because the URL is fixed in metadata at checkout time, the
// buyer only ever gets the audit for the site they paid for.

import { runScorer } from './analyze';
import { reportOpenAiOrder } from './_openai';

export const config = { runtime: 'edge' };

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

interface StripeSession {
  id?: string;
  payment_status?: string;
  status?: string;
  amount_total?: number;
  currency?: string;
  metadata?: { url?: string; keyword?: string; email?: string };
  error?: { message?: string };
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'GET') {
    return json({ error: 'method not allowed' }, 405);
  }

  const params = new URL(request.url).searchParams;

  // Internal operator bypass. With the admin key, generate the FULL report for
  // any URL without a Stripe payment — used to build reports for leads / sales
  // calls. The public UI never sends admin_key; this path is invisible to it.
  const providedKey = params.get('admin_key');
  if (providedKey) {
    const adminKey = process.env.SCORECARD_ADMIN_KEY;
    if (!adminKey || providedKey !== adminKey) {
      return json({ error: 'unauthorized' }, 401);
    }
    const adminUrl = (params.get('url') || '').trim();
    if (!adminUrl) {
      return json({ error: 'missing url' }, 400);
    }
    try {
      const full = await runScorer({ url: adminUrl });
      return json({ ...full, paid: true, admin: true });
    } catch {
      return json({ error: 'could not generate the report' }, 502);
    }
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return json({ error: 'payments are not configured' }, 503);
  }

  const sessionId = params.get('session_id');
  if (!sessionId || !sessionId.startsWith('cs_')) {
    return json({ error: 'missing or invalid session_id' }, 400);
  }

  let session: StripeSession;
  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      { headers: { Authorization: `Bearer ${key}` } }
    );
    session = await res.json();
    if (!res.ok) {
      return json(
        { error: session?.error?.message || 'could not verify payment' },
        502
      );
    }
  } catch {
    return json({ error: 'could not reach the payment processor' }, 502);
  }

  if (session.payment_status !== 'paid') {
    return json({ error: 'payment not completed', paid: false }, 402);
  }

  const url = (session.metadata?.url || '').trim();
  if (!url) {
    return json({ error: 'paid session is missing the website url' }, 422);
  }

  const amountCents = typeof session.amount_total === 'number' ? session.amount_total : 9900;
  const currency = (session.currency || 'usd').toUpperCase();

  // Report the purchase to the OpenAI (ChatGPT Ads) Conversions API. Uses the
  // Stripe session id as the event id so OpenAI dedupes this against the browser
  // pixel's order_created. Best-effort and time-capped — never blocks or breaks
  // the audit response. (Not fired on the admin-key path above: no real payment.)
  await reportOpenAiOrder({
    eventId: session.id || sessionId,
    amountCents,
    currency,
    email: session.metadata?.email || undefined,
    sourceUrl: request.url,
    request,
  });

  try {
    const full = await runScorer({
      url,
      email: session.metadata?.email || undefined,
      keyword: session.metadata?.keyword || undefined,
    });
    return json({
      ...full,
      paid: true,
      payment: {
        sessionId: session.id || sessionId,
        // Stripe amounts are in the smallest currency unit (cents).
        amountTotal: typeof session.amount_total === 'number' ? session.amount_total : null,
        currency,
      },
    });
  } catch {
    return json(
      {
        error:
          'payment confirmed, but the audit could not be generated. Please email support@foundforai.com and we will send it manually.',
        paid: true,
      },
      502
    );
  }
}
