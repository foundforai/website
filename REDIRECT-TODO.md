# Subdomain redirect TODO — `scorecard.foundforai.com` → `foundforai.com/scorecard`

> **Status: NOT ACTIVATED. Do not paste this anywhere yet.**
>
> Activate this only after `https://foundforai.com/scorecard` and
> `https://foundforai.com/scorecard/results` are live in production and
> verified end-to-end (form submits, results page renders, sessionStorage
> handoff works).

## Why this lives in a separate file

This redirect cannot be configured from this repo. `scorecard.foundforai.com`
is hosted as **its own Vercel project** (a Next.js static export — separate
codebase). The redirect rule has to be added to that project's
`vercel.json`, not this one.

This file is a hand-off note so the rule isn't lost between branches.

## What to do when you're ready to cut over

In the **scorecard.foundforai.com Vercel project's** `vercel.json`, add:

```json
{
  "redirects": [
    {
      "source": "/",
      "destination": "https://foundforai.com/scorecard",
      "statusCode": 301
    },
    {
      "source": "/:path*",
      "destination": "https://foundforai.com/scorecard",
      "statusCode": 301
    }
  ]
}
```

(Adjust paths if the scorecard project has any routes worth preserving —
e.g. you may want to keep `/api/analyze` reachable on that subdomain
during the transition window so this repo's `/api/analyze` rewrite
keeps working. If you've ported the analyzer into this repo by then,
no exclusion is needed.)

Deploy the scorecard project. Test:

```bash
curl -sI https://scorecard.foundforai.com           # expect 301 to foundforai.com/scorecard
curl -sI https://scorecard.foundforai.com/anything  # expect 301 to foundforai.com/scorecard
```

## After cutover

- Verify Search Console shows the redirect (`scorecard.foundforai.com` →
  `foundforai.com/scorecard` in the URL Inspection tool).
- Submit `https://foundforai.com/scorecard` for indexing if not already.
- Update any hardcoded references to `scorecard.foundforai.com` in
  documentation, social bios, ad copy, email templates.
- Decide whether to keep the `/api/analyze` rewrite proxying to the old
  subdomain (still needed if the analyzer hasn't been ported), or flip
  it to a local serverless function.

## Rollback

Reverting just means removing those redirect entries from the scorecard
project's `vercel.json` and redeploying. No data is lost — the static
export of the old scorecard tool is still in that project's git history.
