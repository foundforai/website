declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    // OpenAI (ChatGPT Ads) pixel command queue, installed in index.html.
    oaiq?: (...args: unknown[]) => void;
  }
}

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

/**
 * Map our internal GA4-style event names onto OpenAI's standard ad-conversion
 * taxonomy. Only the events worth optimizing ChatGPT ads toward are listed —
 * every one here uses the `customer_action` data shape (engagement/leads).
 * Purchases fire separately via trackPurchase() as `order_created`.
 */
const OPENAI_LEAD_EVENTS: Record<string, string> = {
  submit_scorecard: 'lead_created',
  contact_form_submit: 'lead_created',
  submit_audit_request: 'lead_created',
  access_playbook: 'lead_created',
  download_playbook: 'lead_created',
};

/** Low-level guarded call into the OpenAI pixel queue. No-op if not loaded. */
function fireOpenAi(
  eventName: string,
  data: Record<string, unknown>,
  options?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined' || typeof window.oaiq !== 'function') return;
  if (options) {
    window.oaiq('measure', eventName, data, options);
  } else {
    window.oaiq('measure', eventName, data);
  }
}

/**
 * Report an appointment/booking to the OpenAI pixel as `appointment_scheduled`.
 * Call this on an actual booking completion (e.g. Cal.com's booking success),
 * not on page view — this is the primary conversion ChatGPT ads optimize toward.
 */
export function trackOpenAiAppointment(): void {
  fireOpenAi('appointment_scheduled', { type: 'customer_action' });
}

function readAiSource(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = window.sessionStorage?.getItem('ai_source');
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as { ai_source?: string };
    return parsed?.ai_source;
  } catch {
    return undefined;
  }
}

export function trackEvent(event: string, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined') return;
  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }
  const aiSource = readAiSource();
  const finalParams = aiSource ? { ai_source: aiSource, ...params } : params;
  window.dataLayer.push({ event, ...finalParams });

  // Mirror lead-style conversions to the OpenAI (ChatGPT Ads) pixel.
  const openAiEvent = OPENAI_LEAD_EVENTS[event];
  if (openAiEvent) {
    fireOpenAi(openAiEvent, { type: 'customer_action' });
  }
}

/**
 * GA4 ecommerce "purchase" event — the conversion ad platforms optimize toward.
 *
 * Pushes the standard GA4 ecommerce structure (cleared first per Google's
 * guidance so values don't merge across events). `transactionId` should be the
 * Stripe Checkout session id: GA4 dedupes purchases by transaction_id, so this
 * counts a single conversion even if the event fires more than once.
 */
export function trackPurchase(opts: {
  transactionId: string;
  value: number;
  currency?: string;
  itemId?: string;
  itemName?: string;
}): void {
  if (typeof window === 'undefined') return;
  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }
  const aiSource = readAiSource();
  // Clear any previous ecommerce payload before pushing the new one.
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: 'purchase',
    ...(aiSource ? { ai_source: aiSource } : {}),
    ecommerce: {
      transaction_id: opts.transactionId,
      value: opts.value,
      currency: opts.currency || 'USD',
      items: [
        {
          item_id: opts.itemId || 'ai-visibility-audit',
          item_name: opts.itemName || 'Full AI Visibility Audit',
          price: opts.value,
          quantity: 1,
        },
      ],
    },
  });

  // Mirror the purchase to the OpenAI (ChatGPT Ads) pixel as `order_created`.
  // OpenAI expects `amount` as an integer in minor units (cents), and dedupes
  // on the transaction id passed as event_id.
  fireOpenAi(
    'order_created',
    {
      type: 'contents',
      amount: Math.round(opts.value * 100),
      currency: opts.currency || 'USD',
      contents: [
        {
          id: opts.itemId || 'ai-visibility-audit',
          name: opts.itemName || 'Full AI Visibility Audit',
          content_type: 'product',
          quantity: 1,
          amount: Math.round(opts.value * 100),
        },
      ],
    },
    { event_id: opts.transactionId },
  );
}
