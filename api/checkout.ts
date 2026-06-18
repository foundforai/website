// Creates a Stripe Checkout session for the $99 one-time Full AI Visibility
// Audit. We use Stripe's REST API directly via fetch (no SDK dependency, works
// on the edge runtime). The website URL, keyword, and email are stored in the
// session metadata so /api/audit can re-run the scorer for the exact site the
// customer paid for after verifying payment.

export const config = { runtime: 'edge' };

const AUDIT_PRICE_CENTS = 9900; // $99.00 one-time
const FALLBACK_ORIGIN = 'https://foundforai.com';

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

function resolveOrigin(request: Request): string {
  const origin = request.headers.get('origin');
  if (origin && /^https?:\/\//.test(origin)) return origin.replace(/\/$/, '');
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '');
  return FALLBACK_ORIGIN;
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'method not allowed' }, 405);
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return json(
      { error: 'Payments are not configured yet. Please email support@foundforai.com.' },
      503
    );
  }

  let body: { url?: string; email?: string; keyword?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid json body' }, 400);
  }

  const url = (body.url || '').trim();
  const email = (body.email || '').trim();
  const keyword = (body.keyword || '').trim();
  if (!url) {
    return json({ error: 'missing required url' }, 400);
  }

  const origin = resolveOrigin(request);

  const form = new URLSearchParams();
  form.set('mode', 'payment');
  // Stripe substitutes {CHECKOUT_SESSION_ID} on redirect. URLSearchParams
  // percent-encodes the braces; Stripe decodes the form body, so the literal
  // placeholder is preserved.
  form.set('success_url', `${origin}/scorecard/results?session_id={CHECKOUT_SESSION_ID}`);
  form.set('cancel_url', `${origin}/scorecard/results`);
  if (email) form.set('customer_email', email);
  form.set('allow_promotion_codes', 'true');
  form.set('line_items[0][quantity]', '1');
  form.set('line_items[0][price_data][currency]', 'usd');
  form.set('line_items[0][price_data][unit_amount]', String(AUDIT_PRICE_CENTS));
  form.set('line_items[0][price_data][product_data][name]', 'Full AI Visibility Audit');
  form.set(
    'line_items[0][price_data][product_data][description]',
    `Complete AI visibility audit + prioritized action plan for ${hostnameOf(url)}`
  );
  form.set('metadata[url]', url);
  form.set('metadata[keyword]', keyword);
  form.set('metadata[email]', email);

  let session: { id?: string; url?: string; error?: { message?: string } };
  try {
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: form,
    });
    session = await res.json();
    if (!res.ok) {
      return json(
        { error: session?.error?.message || 'could not create checkout session' },
        502
      );
    }
  } catch {
    return json({ error: 'could not reach the payment processor' }, 502);
  }

  if (!session.url) {
    return json({ error: 'checkout session missing redirect url' }, 502);
  }

  return json({ url: session.url });
}
