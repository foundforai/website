# IndexNow auto-submission

[IndexNow](https://www.indexnow.org/) is a protocol for telling supported
search engines about new or updated URLs the moment they change, instead
of waiting for the next crawl. Bing (and therefore ChatGPT Search /
Copilot, which use Bing's index), Yandex, Naver, and Seznam all support
it. Google does not — Google still requires Search Console.

This site auto-submits URLs to `api.indexnow.org` on a schedule, and
exposes a token-protected endpoint for on-demand pushes.

## Where the key lives

The IndexNow ownership key is published at
**`https://foundforai.com/a2c11531e7de47a08dfe4cb47d120610.txt`**.
That file is in `client/public/` and is served as plain text by Vercel.
**Don't move, rename, or delete it** — Bing periodically re-checks the
key file to confirm we still own the host.

The same key value is also held in the `INDEXNOW_KEY` env var, used by
the submitter functions.

## Required env vars

Set these in **Vercel project → Settings → Environment Variables**
(Production + Preview + Development scopes). Local copies for reference
go in `.env.local` (which is gitignored). See `.env.local.example` for
a template.

| Name | Value | Purpose |
|---|---|---|
| `INDEXNOW_KEY` | `a2c11531e7de47a08dfe4cb47d120610` | Public key string. Must match the file at the key location. |
| `INDEXNOW_KEY_LOCATION` | `https://foundforai.com/a2c11531e7de47a08dfe4cb47d120610.txt` | Full URL to the key file. |
| `INDEXNOW_HOST` | `foundforai.com` | Bare hostname, no scheme, no path. |
| `ADMIN_API_KEY` | (32-char hex; `openssl rand -hex 16`) | Auth for the manual endpoint and a fallback for the cron endpoint. |
| `CRON_SECRET` | (auto, optional) | Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}` if set. The cron endpoint also accepts `x-vercel-cron` from Vercel's infrastructure as a fallback. |

## How automatic submission works

| Component | What it does |
|---|---|
| `lib/indexnow.ts` | `submitUrl(url)` and `submitUrls(urls)` helpers. Both safe — never throw, log to console, return status. |
| `prerender.mjs` | Generates `dist/sitemap.xml` from `client/src/data/routes.ts` at build time. Every entry has a `<lastmod>`. |
| `client/src/data/routes.ts` | Source of truth for routes + sitemap metadata. Static routes share `STATIC_DEFAULT_LASTMOD`; blog posts inherit `dateModified || datePublished` from `blog-posts.ts`. |
| `api/cron/indexnow.ts` | Vercel Cron handler. Wakes every 6 hours, fetches `/sitemap.xml`, picks URLs with `<lastmod>` within the last 7 days, submits them via `submitUrls()`. |
| `vercel.json` `crons` | `{ "path": "/api/cron/indexnow", "schedule": "0 */6 * * *" }` |
| `api/indexnow/manual.ts` | POST-only admin endpoint for on-demand submissions. |

### When the recent-list is empty

Per spec: if no URL has a `<lastmod>` within the last 7 days, the cron
submits **all** sitemap URLs once. This handles the first-deploy case
cleanly. The trade-off: on a stable site that hasn't changed in 7 days,
the cron will resubmit everything every 6 hours (4× per day, 26 URLs =
~104 submissions/day). IndexNow doesn't publish a hard daily limit and
this volume is well below any concern, but if you want stricter
behaviour later, change `mode: 'bulk-empty'` in
`api/cron/indexnow.ts` to return without submitting and rely on the
manual endpoint for bulk seeding.

## Manual submission

Use the manual endpoint to push URLs immediately — e.g., right after
publishing a new blog post.

```bash
curl -X POST https://foundforai.com/api/indexnow/manual \
  -H "x-admin-key: $ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"urls":["https://foundforai.com/blog/new-post"]}'
```

Response shape:

```json
{
  "status": 200,
  "submitted": 1,
  "body": ""
}
```

The response `status` is the HTTP status code IndexNow returned (see the
table below). `submitted` is the number of URLs we pushed; `body` is
IndexNow's response body, usually empty on success.

You can also force-trigger the cron from anywhere:

```bash
curl -X POST https://foundforai.com/api/cron/indexnow \
  -H "x-admin-key: $ADMIN_API_KEY"
```

## Verifying in Bing Webmaster Tools

1. Open [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Make sure `foundforai.com` is selected.
3. Go to **Configure My Site → IndexNow** in the left nav.
4. The panel shows the most recent IndexNow submissions: when, how many
   URLs, status. The first-deploy bulk submission should land here
   within a few minutes.
5. Bing also periodically re-fetches the key file at
   `INDEXNOW_KEY_LOCATION`. If that file ever returns non-200 the
   integration breaks — keep it in `client/public/`.

## IndexNow HTTP status codes

| Code | Meaning | What to do |
|---|---|---|
| 200 | OK | Submission accepted — URLs queued for crawling |
| 202 | Accepted | Same as 200 in practice; URLs queued |
| 400 | Bad Request | Malformed JSON, missing fields, or URL format invalid |
| 403 | Forbidden — invalid key | Key file doesn't match `INDEXNOW_KEY`, or wrong key for host |
| 422 | Unprocessable Entity — wrong host | `host` field doesn't match the host of one or more URLs in `urlList` |
| 429 | Too Many Requests | Slow down. Reduce cron frequency or batch differently. |

The cron endpoint surfaces all of these via the response JSON's
`status` field — and middleware/function logs in the Vercel dashboard
show the full request/response.

## Adding a new page so the cron picks it up

1. Add the route to `client/src/data/routes.ts` (or a blog post to
   `client/src/data/blog-posts.ts` — that path auto-derives a route).
2. Set `lastmod` to today's date.
3. Push to main.
4. The next cron run (within 6 hours) will see the recent `lastmod` and
   submit the URL.
5. Or trigger it immediately:
   ```bash
   curl -X POST https://foundforai.com/api/indexnow/manual \
     -H "x-admin-key: $ADMIN_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"urls":["https://foundforai.com/your-new-path"]}'
   ```

## Operational notes

- `INDEXNOW_KEY` is **public**. The key value is treated as an env var
  for tidiness, but anyone can read it from
  `https://foundforai.com/a2c11531e7de47a08dfe4cb47d120610.txt`.
  Don't rotate it without also updating that file.
- `ADMIN_API_KEY` and `CRON_SECRET` **are** secrets. Don't commit them
  or share them publicly. Rotate them by generating a new value with
  `openssl rand -hex 16` and updating Vercel env vars.
- The cron schedule `0 */6 * * *` runs at 00:00, 06:00, 12:00, 18:00
  UTC. To change frequency, edit `vercel.json` and redeploy.
- Vercel Cron is available on Pro plans and above. The crons are
  visible in **Vercel Dashboard → Project → Settings → Cron Jobs** and
  in the **Logs** tab when they run.
