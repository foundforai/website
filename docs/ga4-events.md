# GA4 / GTM Custom Events

Found For AI is a lead-gen site. There is no e-commerce / purchase event.
This document describes the custom events the site pushes into the
`window.dataLayer` for GTM/GA4 to forward to GA4 as conversions.

## Stack

- **Container**: GTM-PC6434DW (installed in `client/index.html` head + body
  noscript fallback). This is the only analytics layer on the site —
  there is no direct `gtag.js` and no GA4 Measurement ID hardcoded
  anywhere; that's configured inside GTM.
- **Helper**: `client/src/lib/analytics.ts` exports `trackEvent(name, params)`
  which `dataLayer.push({event: name, ...params})`. Every event below
  flows through that one function — keep it that way.

To add a tag in GA4 via GTM: create a new "Google Analytics: GA4 event"
tag, set the event name to match the names below, and use a "Custom Event"
trigger that fires when `Event` equals the same name. Add the parameters
below as event parameters on the tag.

## Events

### `submit_audit_request`

- **Fires from**: `client/src/pages/Audit.tsx`, in the form's success
  branch after a 200-OK response from Formspree.
- **Trigger**: visitor successfully submits the audit form on `/audit`.
- **Parameters**:
  - `form_location`: `'/audit'`
  - `form_name`: `'audit_request'`
- **Test**: visit `/audit`, fill in the form with a real email, submit.
  Expect the toast "Thanks - we will be in touch soon." and a redirect
  to `/thank-you`. The event should fire just before the redirect.

### `contact_form_submit`

- **Fires from**: `client/src/pages/Contact.tsx`, in the form's success
  branch after a 200-OK response from Formspree.
- **Trigger**: visitor successfully submits the contact form on `/contact`.
- **Parameters**:
  - `form_location`: `'/contact'`
  - `form_name`: `'contact'`
- **Test**: visit `/contact`, fill in name + email + message (10+ chars),
  submit. Expect the toast "Thanks - we will be in touch soon." and the
  form to clear.

### `book_call`

- **Fires from**: `client/src/pages/BookCall.tsx`, in a `useEffect` on
  page mount.
- **Trigger**: visitor lands on `/book-call`. **This is page-view-as-intent,
  not a confirmed booking.**
- **Parameters**:
  - `form_location`: `'/book-call'`

#### Why this isn't a true "booking confirmed" event

The booking widget on `/book-call` is **Google Calendar Appointments**
(an iframe embed). Unlike Cal.com or Calendly, Google Calendar
Appointments **does not emit a `postMessage` on successful booking**.
There is no client-side hook to detect that a booking actually
completed. We can only know the visitor opened the booking page.

If you want a true "booking confirmed" GA4 event, the path is server-side:

1. Set up a Google Calendar webhook (via Apps Script or a Zapier "New
   Calendar Event" trigger) that fires when a booking lands in your
   calendar.
2. Have the webhook POST to GA4 via the [Measurement Protocol API](https://developers.google.com/analytics/devguides/collection/protocol/ga4)
   with event `book_call_confirmed`, the appointment time, and (if you
   capture it on a hidden field) the source URL.

That gives you confirmed-booking attribution that matches reality.
Until then, treat `book_call` as upper-funnel intent.

### `download_playbook`

- **Fires from**: `client/src/pages/Playbook.tsx`, in the form's success
  branch after a 200-OK response from Formspree.
- **Trigger**: visitor successfully submits the email-gated playbook
  request on `/playbook`. The PDF is delivered by email afterwards.
- **Parameters**:
  - `file_name`: `'found-for-ai-readability-playbook.pdf'`
  - `form_location`: `'/playbook'`
- **Test**: visit `/playbook`, enter an email, click "Send me the
  playbook." Expect a redirect to `/playbook/thanks`.

#### Note about the event name

The spec asked for `download_playbook` and we kept the name. Strictly
speaking the user has not yet *downloaded* the PDF when this fires —
they have *requested* it. If you later add a direct-download button
(no email gate), use `download_playbook` for the click and consider
renaming this one to `request_playbook`.

### `lead_intent`

- **Fires from**: a global click listener in `client/src/App.tsx`
  (`LeadIntentTracker` component, mounted once at the app root).
- **Trigger**: any click on an `<a>` tag whose `href` begins with
  `mailto:` or `tel:` — anywhere on the site.
- **Parameters**:
  - `link_type`: `'email'` or `'phone'`
  - `link_url`: the `href` attribute (e.g. `mailto:info@foundforai.com`,
    `tel:+18018982456`)
- **Test**: open any page that has the footer or a contact link
  (`/contact`, `/book-call` footer, blog post footer, etc.), click the
  email or phone link. The event should fire.

## How to verify in GA4 DebugView

1. Open your browser's GA Debugger Chrome extension and toggle it ON.
   (Or visit any page with `?gtm_debug=x` appended.)
2. Open GA4 Admin → DebugView in another tab. Your session should show
   up as a stream.
3. Trigger each event:
   - `/audit` → submit form
   - `/contact` → submit form
   - `/book-call` → just visit the page
   - `/playbook` → submit form
   - any page with a `mailto:` or `tel:` link → click it
4. Each event should appear in DebugView with the parameters listed above.
5. To verify in the dataLayer directly, open DevTools console on any
   page and run `window.dataLayer` — you should see a growing array of
   pushed events.

## How to add a new event

1. Pick an event name (snake_case, GA4 convention).
2. In the relevant component, `import { trackEvent } from '@/lib/analytics'`.
3. Call `trackEvent('event_name', { param: 'value' })` at the success
   moment.
4. Add a section to this doc.
5. In GTM, create a tag + Custom Event trigger with the same name, and
   point it at GA4 with the parameters as event parameters.

Do **not** push to `window.dataLayer` directly from components — always
go through the helper, so events stay consistent and there's one place
to swap the analytics layer if needed.
