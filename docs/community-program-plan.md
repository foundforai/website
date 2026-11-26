# Utah small-business AI community program

Living plan for the sister-company community program. Found For AI and Fripse AI stay separate. One host brand per event. This file is updated as work lands. Nothing here is permission to merge, deploy, buy a service, or send email.

## Phase 1. Audit

- [x] Read Found For AI `main` after PR #14 (`d137b5d`, community page, schema, June 2026 workshop).
- [x] Clone https://github.com/foundforai/fripse and read the marketing site.

### Found For AI (https://foundforai.com)

- Framework: Vite + React 18 + wouter, not Next.js. Prerendered static pages plus Vercel serverless functions in `api/`.
- Hosting: Vercel (`vercel.json`, edge middleware for bot logs and markdown negotiation).
- Data: no live database in this repo. `replit.md` mentions Drizzle and Neon, but those packages are not installed. `@vercel/blob` is used only by `api/upload-screenshot.ts`. Forms post to Formspree (`client/src/lib/leads.ts`, contact page). No CRM. No Turnstile.
- Email: no outbound mailer for the community. IndexNow and an OpenAI ads helper exist. Do not use those for community mail.
- Analytics: GA4 via `client/src/lib/analytics.ts`, plus an OpenAI pixel. `foundforai-analytics` is not in this repo. The dashboard does not claim analytics attribution.
- Events: `/events` and `/events/ai-visibility-workshop-june-2026`. The only seeded event is the past June 18, 2026 Holladay workshop.
- Community: `/community` already had the photo grid, past-meetup copy, Grogan and Goldsberry summaries, FAQs, and an empty testimonial list. Nav did not include Community.
- Auth: `ADMIN_API_KEY` already gates `/api/indexnow/manual`.

### Fripse AI (https://fripseai.com)

- Framework: the same Vite + React + wouter pattern, prerendered.
- Hosting: Cloudflare Worker (`worker.ts`, `wrangler.toml`) serves the static build and sends form mail with Cloudflare Email Sending to `info@fripse.com` from `forms@fripseai.com`. `vercel.json` is also present.
- Assessment: `/assessment`, `/book`, and `/quiz` already exist. Community links to those. It does not add a second assessment app.
- Forms: `/api/lead` on the worker, field allowlist, no Turnstile, no CRM.
- No events pages before this work.

### Decisions from the audit

- Put the one community backend in the Found For AI Vercel app.
- Dev store: JSON file at `.data/community.json` (gitignored).
- Production store: Postgres when `DATABASE_URL` is set. Schema is `db/community/001_init.sql`. The app creates `community_state` and stores the CRM document there. Provisioning the database is a founder step. Do not sign up for a provider from this work.
- Confirmation email is a template plus `deliverRegistrationEmail`, which returns `disabled` unless `COMMUNITY_EMAIL_ENABLED=true`, and even then returns `no_provider_configured`. It does not send.

## Phase 2. Websites

- [x] Found For AI `/community` keeps its photos, structure, Grogan summary, and Goldsberry summary. Added Utah commitment, sister-company cross-promo, host label, shared upcoming list, and a testimonial component that renders nothing until the API returns approved quotes with publishing permission.
- [x] `/events` has Upcoming, Previous, and a workshop hosting request. Empty upcoming state says "No workshops scheduled yet" and links to Request a workshop. Past events are not given Event structured data.
- [x] Community is in the Found For AI header and footer.
- [x] Fripse `/community` with the requested hero, learning topics, one June 2026 image, shared events, assessment links, and Found For AI cross-link. Community is in the Fripse nav, footer, sitemap, and `llms.txt`.

## Phase 3. Shared events, registration, CRM

- [x] Event model with host brand, America/Denver, venue or online link, capacity, registration status, and computed past/upcoming.
- [x] Public read API and registration API. CORS allows foundforai.com, fripseai.com, fripse.com, localhost, `*.vercel.app`, and `*.workers.dev`.
- [x] Registration fields, required workshop-communication consent, optional marketing consent defaulting off, honeypot, rate limit, capacity check, and separate consent-withdrawal tokens.
- [x] Turnstile runs only if `TURNSTILE_SECRET_KEY` is set. It is not set. Neither repo used Turnstile before.
- [x] Contacts deduped by normalized email. Commercial opportunities are a separate collection and are not created by registration.
- [x] Admin routes require `ADMIN_API_KEY`. No secrets are committed.
- [ ] Founder: provision Postgres, set `DATABASE_URL` on Vercel, run `db/community/001_init.sql`. Until then, preview and production writes cannot persist. Local `.data/community.json` works for development.
- [ ] Founder: choose an email provider before any confirmation mail can be turned on. Leave `COMMUNITY_EMAIL_ENABLED` unset.

## Phase 4. Growth workflow

- [x] `ops/community/` templates for agenda, exercises, event description, registration copy, follow-up, and recap.
- [x] Partner research checklist and an empty verified-contact CSV. No scraped contacts.
- [x] Outreach drafts marked founder review required, never auto-send.
- [x] Content repurposing table with one primary site per article.
- [x] `npm run community:impact` and the same summary on the dashboard, from recorded rows only.
- [x] Private `ops/community/openworks-portfolio.md`. OpenWorks is not named on public pages.

## Phase 5. Founder dashboard

- [x] `/admin/community` is noindex and omitted from the sitemap. It asks for the admin key, then shows community metrics and a separate commercial section, event editing, attendance, follow-up, and manual commercial records.
- [x] Metrics are counts of stored rows. They do not claim a cause or a channel attribution.

## Testing log

- [x] `npm test`: 7 community tests and 6 existing event tests passed (validation, dedupe, separate consents, honeypot, past/upcoming, no public testimonials, CORS).
- [x] `npm run check` and `npm run build` passed for Found For AI. Fripse `tsc` and `npm run build` passed, including prerender of `/community`.
- [x] Local browser screenshots, desktop and mobile: Found For AI `/community` and `/events`, Fripse `/community`, registration validation and success, admin dashboard. The registration shots use a local-only event in `/tmp`, not a seeded public workshop.
- [x] Grogan and Goldsberry blocks inside `Community.tsx` match `main`. `blog-posts.ts` and the Salt Lake case study file have no diff. The June 2026 workshop is past and has no Event structured data in the prerendered HTML.

## Founder decisions still open

1. Provision Postgres (or another Postgres host) and set `DATABASE_URL`. Run `db/community/001_init.sql`.
2. Set `ADMIN_API_KEY` in Vercel if it is not already set for IndexNow. The dashboard uses the same variable.
3. Leave email disabled until a provider is chosen. Then set `COMMUNITY_EMAIL_ENABLED` only after the send function is wired to that provider. This PR does not wire a provider.
4. Add Turnstile site and secret keys only if you want that check. It is optional.
5. Schedule real workshops in the dashboard. Do not invent dates in git.
6. Collect testimonials only with approval and publishing permission.
7. Decide whether Fripse assessment bookings, which still email `info@fripse.com` through the Cloudflare worker, should also be copied into this CRM. They are not copied automatically.
8. Merge and production deploy stay with the founder. This work does not merge and does not deploy.
