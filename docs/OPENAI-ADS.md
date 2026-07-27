# OpenAI (ChatGPT Ads) tracking

Conversion tracking for ads run in ChatGPT via OpenAI's Ads Manager. Two
layers report the same conversions and are deduplicated by OpenAI on a shared
event id:

1. **Browser pixel** (`oaiq`) — fires from the client on user actions.
2. **Conversions API (CAPI)** — server-side, fires the purchase from our
   backend for reliable delivery (survives ad blockers, iOS ITP, network
   drops) and adds a hashed email for stronger matching.

Pixel ID: **`WJ4J26xHhehLEXTaNxeVK7`** (Ads Manager account "Found For AI",
pixel "My first pixel").

## Event taxonomy

OpenAI defines standard events, each bound to a data shape. We use three:

| OpenAI event | Data shape | Fires on |
|---|---|---|
| `lead_created` | `customer_action` | Free-score / form submits |
| `appointment_scheduled` | `customer_action` | A completed Cal.com booking |
| `order_created` | `contents` | A verified Stripe purchase (pixel + CAPI) |

The default `registration_completed` from OpenAI's setup wizard is **not**
used — the site has no signup. Conversion events created in Ads Manager:
Order Created, Lead Created, Appointment Scheduled. **Appointment Scheduled**
is the intended campaign optimization event (a booked call is the real
money conversion); Lead Created is the higher-volume alternative for faster
algorithm learning early on.

## Browser pixel

### Base snippet
Installed once in **`client/index.html`** `<head>`, near the top:
`oaiq("init",{pixelId:"WJ4J26xHhehLEXTaNxeVK7"})`. `debug` was removed after
launch verification — re-add `debug:true` to the init call to see event logs
in the browser console.

### Conversions route through `analytics.ts`
**`client/src/lib/analytics.ts`** is the single place the pixel is called
(via a guarded `fireOpenAi()` that no-ops if `window.oaiq` is absent):

- **`trackEvent(event, params)`** — after its normal `dataLayer` push, it
  looks the event up in `OPENAI_LEAD_EVENTS` and, if mapped, fires
  `lead_created`. Current map (all → `lead_created`):
  `submit_scorecard`, `contact_form_submit`, `submit_audit_request`,
  `access_playbook`, `download_playbook`.
- **`trackPurchase(opts)`** — after its GA4 `purchase` push, fires
  `order_created` with `amount` in **cents** (`Math.round(value * 100)`),
  `currency`, a single `contents[]` item, and `event_id = opts.transactionId`
  (the Stripe session id) for dedup against the CAPI event.
- **`trackOpenAiAppointment()`** — fires `appointment_scheduled`. Called from
  the booking-success path, **not** on page view.

To add a new lead-style conversion, add its `trackEvent` name to
`OPENAI_LEAD_EVENTS`. No other change needed.

### Appointment tracking
In **`client/src/pages/BookCall.tsx`**, a Cal.com embed listener fires the
conversion only on a real completed booking:

```js
cal('on', {
  action: 'bookingSuccessful',
  callback: () => {
    trackOpenAiAppointment();            // appointment_scheduled -> pixel
    trackEvent('appointment_scheduled', { form_location: '/book-call' });
  },
});
```

Note the older `trackEvent('book_call')` on the same page fires on page
**view** (booking intent) and is a GA4-only signal — it is not sent to the
OpenAI pixel.

## Conversions API (server-side)

**`api/_openai.ts`** (underscore prefix → not exposed as a Vercel route)
exports `reportOpenAiOrder()`.

- Endpoint: `POST https://bzr.openai.com/v1/events?pid=<PIXEL_ID>`
- Auth: `Authorization: Bearer ${OPENAI_ADS_API_KEY}`
- Sends `order_created` (`contents` shape). `id` = the Stripe session id, so
  it **dedupes against the browser pixel's `order_created`**.
- User matching: SHA-256-hashed lowercase email (`email_sha256`), plus
  `ip_address` and `user_agent` lifted from the request.
- **Best-effort**: wrapped in try/catch with a `2500ms` timeout
  (`AbortController`) so a slow or failed OpenAI call can never block or break
  the purchase flow. No-ops silently if `OPENAI_ADS_API_KEY` is unset.

### Where it fires
**`api/audit.ts`** already verifies the Stripe Checkout session server-side
(`payment_status === 'paid'`) before returning the paid audit. Right after
that verification it calls `reportOpenAiOrder()` with the session id, amount,
currency, and buyer email. It is **not** called on the admin-key bypass path
(no real payment there). Because dedup is by session id, calling it on every
results-page load is safe.

## Required env var

Set in **Vercel → Settings → Environment Variables** (Production + Preview).

| Name | Value | Purpose |
|---|---|---|
| `OPENAI_ADS_API_KEY` | Conversion key from Ads Manager → your pixel → **Conversions API** tab (a "conversion key", *not* an account API key) | Bearer auth for `reportOpenAiOrder`. If unset, server-side reporting no-ops; the browser pixel still fires. |

See `.env.local.example` for the template entry.

## Verifying

- **Ads Manager → Conversions → Event Stream** shows events within ~1–3 min.
  A working `lead_created` row reads `pixel_sdk` / `{"type":"customer_action"}`.
- Re-add `debug:true` to the pixel init and watch the browser console.
- Your own browser's ad blocker can eat the pixel request — test in an
  Incognito window with extensions off. Real ChatGPT ad traffic is unaffected.

## Files involved

| File | Role |
|---|---|
| `client/index.html` | Base `oaiq` pixel snippet. |
| `client/src/lib/analytics.ts` | Maps internal events → OpenAI events; `fireOpenAi`, `trackPurchase`, `trackOpenAiAppointment`. |
| `client/src/pages/BookCall.tsx` | Fires `appointment_scheduled` on Cal.com `bookingSuccessful`. |
| `api/_openai.ts` | Server-side CAPI helper (`reportOpenAiOrder`). |
| `api/audit.ts` | Calls `reportOpenAiOrder` after verifying a paid Stripe session. |

Related: `docs/ga4-events.md` (the GA4/`dataLayer` side of the same events).
