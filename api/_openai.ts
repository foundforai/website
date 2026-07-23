// Server-side reporting to the OpenAI (ChatGPT Ads) Conversions API.
//
// This runs ALONGSIDE the browser pixel (installed in client/index.html). OpenAI
// dedupes events on the shared event `id`, so firing the same order_created from
// both the pixel and here is safe — and it's the recommended setup: the browser
// event carries ad-click attribution, while this server event guarantees delivery
// (survives ad blockers, iOS ITP, and network drops) and adds a hashed email for
// stronger matching.
//
// Filename is underscore-prefixed so Vercel does NOT expose it as an API route.

const PIXEL_ID = 'WJ4J26xHhehLEXTaNxeVK7';
const ENDPOINT = `https://bzr.openai.com/v1/events?pid=${PIXEL_ID}`;
const REQUEST_TIMEOUT_MS = 2500;

/** SHA-256, lowercase 64-char hex — the format OpenAI expects for hashed PII. */
async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input.trim().toLowerCase());
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export interface OpenAiOrderInput {
  /** Stripe Checkout session id — MUST match the browser pixel's event_id to dedupe. */
  eventId: string;
  /** Order total in minor units (cents). */
  amountCents: number;
  /** ISO currency code, e.g. "USD". */
  currency: string;
  /** Buyer email (raw) — hashed here before it leaves the server. */
  email?: string;
  /** URL of the page where the conversion completed. */
  sourceUrl?: string;
  /** The inbound request, used to lift IP + user-agent for match quality. */
  request?: Request;
}

/**
 * Report a completed purchase to OpenAI as `order_created`. Best-effort:
 * never throws, and is capped by a short timeout so it can't hold up the
 * caller's response. No-ops (returns silently) when OPENAI_ADS_API_KEY is unset.
 */
export async function reportOpenAiOrder(input: OpenAiOrderInput): Promise<void> {
  const token = process.env.OPENAI_ADS_API_KEY;
  if (!token) return; // Conversions API not configured yet — skip cleanly.

  try {
    const user: Record<string, string> = {};
    if (input.email) user.email_sha256 = await sha256Hex(input.email);

    const req = input.request;
    if (req) {
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
      const ua = req.headers.get('user-agent');
      if (ip) user.ip_address = ip;
      if (ua) user.user_agent = ua;
    }

    const body = {
      events: [
        {
          id: input.eventId,
          type: 'order_created',
          timestamp_ms: Date.now(),
          action_source: 'web',
          ...(input.sourceUrl ? { source_url: input.sourceUrl } : {}),
          ...(Object.keys(user).length ? { user } : {}),
          data: {
            type: 'contents',
            amount: input.amountCents,
            currency: input.currency,
            contents: [
              {
                id: 'ai-visibility-audit',
                name: 'Full AI Visibility Audit',
                content_type: 'product',
                quantity: 1,
                amount: input.amountCents,
              },
            ],
          },
        },
      ],
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    // Analytics must never break the purchase flow — swallow everything.
  }
}
