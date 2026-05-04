# AI Attribution & Bot Logging

Two independent systems live in this codebase to answer two different questions:

1. **Where did human traffic come from?** Did someone click into the site
   from ChatGPT, Claude, Perplexity, Gemini, etc.? — Part 1, client-side
   referrer attribution stored as a sessionStorage value and forwarded to
   GA4 via the GTM dataLayer.

2. **Which AI bots are crawling the site?** GPTBot, ClaudeBot,
   PerplexityBot, Google-Extended, etc. — Part 2, server-side User-Agent
   logging in Vercel Edge Middleware.

These do not overlap. The first is what real visitors see; the second is
what AI training/answer-engine crawlers are doing.

---

## Part 1 — Client-side AI referrer attribution

### What it does

When a visitor lands on the site, an inline classifier checks
`document.referrer`. If the referrer hostname matches a known AI assistant,
we capture the source and store it in `sessionStorage` for the rest of the
visit. From then on, every analytics event the site fires automatically
includes an `ai_source` parameter — so you can answer "which leads /
form-submits / playbook downloads originated from AI search?" in GA4.

### `ai_source` values

| Value         | Triggered when referrer hostname includes |
|---------------|-------------------------------------------|
| `chatgpt`     | `chatgpt.com`, `chat.openai.com`, `openai.com` |
| `claude`      | `claude.ai`, `anthropic.com` |
| `perplexity`  | `perplexity.ai` |
| `gemini`      | `gemini.google.com`, `bard.google.com` |
| `copilot`     | `copilot.microsoft.com`, `bing.com/chat` |
| `meta_ai`     | `meta.ai` |
| `you_com`     | `you.com` |
| `phind`       | `phind.com` |
| `other_ai`    | (reserved — not currently emitted by the classifier; type only) |
| `not_ai`      | Anything else (direct, organic, social, paid, internal nav) |

### Where the code lives

| File | Role |
|---|---|
| `client/src/lib/ai-source.ts` | `classifyAiSource(referrer)` and the `AiSource` type |
| `client/src/components/AiSourceTracker.tsx` | React component that runs on mount, classifies, stores, and pushes the `ai_source_set` event |
| `client/src/lib/analytics.ts` | `trackEvent(name, params)` reads `ai_source` from sessionStorage and includes it on every event |
| `prerender.mjs` | Injects an inline JS port of the classifier into standalone HTML pages (`/fix-plan`, `/talk-to-a-human`, `/ai-visibility`, etc.) so the same `ai_source` capture works there too |

### sessionStorage shape

Key: `ai_source`. Value: JSON of

```json
{
  "ai_source": "chatgpt",
  "ai_landing_path": "/blog/5-things-ai-checks-local-business",
  "ai_landing_ts": "2026-05-04T12:34:56.789Z"
}
```

The capture rule: write on first arrival OR when the new referrer is an
AI source. (We let a fresh AI referrer overwrite a previous `not_ai` so
e.g. user opens a blog post in a tab → tab idles → user clicks a link
from ChatGPT to the same site in another tab → second tab gets attributed
to chatgpt without losing the signal.)

### Events that include `ai_source`

Every event pushed via `trackEvent()` automatically includes the current
`ai_source` from sessionStorage when present. No call-site changes needed.

- `ai_source_set` — fires when the source is captured (or refreshed). Params: `ai_source`, `ai_landing_path`.
- `submit_audit_request` — params: `form_location`, `form_name`, `ai_source`.
- `contact_form_submit` — params: `form_location`, `form_name`, `ai_source`.
- `book_call` — params: `form_location`, `ai_source`. (Note: page-view-as-intent — see [`docs/ga4-events.md`](./ga4-events.md).)
- `download_playbook` — params: `file_name`, `form_location`, `ai_source`.
- `lead_intent` — params: `link_type`, `link_url`, `ai_source`.

### GTM / GA4 admin work needed (do this once)

In **GTM** (container `GTM-PC6434DW`):

1. Variables → New → Data Layer Variable → name: `ai_source`, data layer
   variable name: `ai_source`. Save.
2. Variables → New → Data Layer Variable → `ai_landing_path` similarly.
3. On every existing GA4 event tag that you set up earlier
   (`submit_audit_request`, `contact_form_submit`, `book_call`,
   `download_playbook`, `lead_intent`) — add `ai_source` as an event
   parameter, value `{{ai_source}}`. (Optional: same with
   `ai_landing_path` on `ai_source_set` only.)
4. Create a new GA4 event tag for `ai_source_set` itself with both params.
5. On your GA4 Configuration tag, add `ai_source` to **User Properties**
   so it follows the user across sessions in GA4.
6. Submit + publish the GTM workspace.

In **GA4 Admin**:

7. Admin → Custom definitions → **Custom dimensions** → Create:
   - Dimension name: `AI Source`
   - Scope: **User** (so it persists)
   - User property: `ai_source`
   - Save.
8. Optional but useful: also create an **event-scoped** custom dimension
   `AI Source (event)` reading the event parameter `ai_source`. Lets you
   slice individual events by source even if user property hasn't propagated.
9. Wait ~24h for processing, then in any report add **AI Source** as a
   secondary dimension to see e.g. form submits by source.

### How to query in GA4

- **Reports → Engagement → Events**: secondary dimension = AI Source.
- **Explore → Free-form**: rows = AI Source, columns = event name, values
  = event count. Tells you which source sends which events.
- **Explore → Funnel**: build a funnel `ai_source_set → submit_audit_request`
  segmented by AI Source.

### How to test attribution end-to-end

1. Open DevTools console on any page of the site.
2. Run: `sessionStorage.removeItem('ai_source')` to reset.
3. Reload the page from a known AI source. The simplest test:
   in the URL bar replace your referrer by visiting the site via a search
   on chatgpt.com / claude.ai / perplexity.ai and clicking a result.
4. After load, check `JSON.parse(sessionStorage.getItem('ai_source'))` —
   should show the matching source.
5. Check `window.dataLayer` — should have an `ai_source_set` event with
   the right `ai_source`.
6. In GA4 Admin → DebugView, the same event should appear in real time.

To force-test without a real referrer:

```js
sessionStorage.setItem('ai_source', JSON.stringify({
  ai_source: 'claude',
  ai_landing_path: '/audit',
  ai_landing_ts: new Date().toISOString()
}));
```

Then submit the audit form. The `submit_audit_request` event should ride
with `ai_source: 'claude'`.

---

## Part 2 — Server-side AI bot logging

### What it does

`middleware.ts` at the project root runs on every page-level request via
Vercel Edge. It inspects the `User-Agent` header against known AI crawler
patterns and, on a match, emits a structured JSON line to the Vercel
project logs prefixed with `[ai-bot]`.

We do not block any of these bots. Logging only.

### Bot vendor mapping

| Vendor key   | User-Agent patterns matched (case-insensitive, word-boundary) |
|--------------|---------------------------------------------------------------|
| `openai`     | GPTBot, ChatGPT-User, OAI-SearchBot |
| `anthropic`  | ClaudeBot, Claude-Web, anthropic-ai |
| `perplexity` | PerplexityBot, Perplexity-User |
| `google_ai`  | Google-Extended |
| `apple_ai`   | Applebot-Extended |
| `other_ai`   | Bytespider, Amazonbot, CCBot, Diffbot, FacebookBot, Meta-ExternalAgent |

### Log line format

```
[ai-bot] {"ts":"…","bot":"openai","ua":"…","path":"/blog/…","query":null,"referer":null,"country":"US"}
```

Fields:

- `ts` — ISO 8601 UTC timestamp
- `bot` — one of the vendor keys above
- `ua` — full User-Agent string (useful for distinguishing GPTBot v1 vs the searchbot variant)
- `path` — request pathname
- `query` — full query string (with leading `?`) or null
- `referer` — `referer` header or null
- `country` — Vercel-derived country code from request IP (`x-vercel-ip-country`) or null

### How to read the logs

Vercel dashboard → your project → **Logs** tab → filter by `[ai-bot]`.
You can also export to a log drain (Datadog, Axiom, S3, BetterStack) via
**Settings → Log Drains** and aggregate there.

### `/api/ai-bot-stats` endpoint

A token-protected admin endpoint at `/api/ai-bot-stats` exists at the
project root.

**Auth**: pass `?token=…` query param or `x-api-token` header. Token must
match the `AI_BOT_STATS_TOKEN` env var configured in Vercel project
settings. If the env var is unset, the endpoint returns 503.

**Current behaviour**: stub. Returns a `bot_hits: []` array with a TODO
explaining that aggregation needs a backing store. Per-isolate in-memory
ring buffers don't aggregate across the Edge fleet — each isolate has its
own memory and they cycle independently — so we deliberately don't ship
that anti-pattern.

### How to make `/api/ai-bot-stats` actually aggregate

Recommended path is **Vercel KV**.

1. In Vercel dashboard: Storage → Create Database → KV. Connect it to the
   project. Vercel injects `KV_*` env vars automatically.
2. `npm install @vercel/kv`.
3. In `middleware.ts`, replace the `console.log` with (or alongside):
   ```ts
   import { kv } from '@vercel/kv';
   await kv.lpush('ai_bot_hits', JSON.stringify(entry));
   await kv.ltrim('ai_bot_hits', 0, 9999); // keep last 10k
   ```
4. In `api/ai-bot-stats.ts`:
   ```ts
   import { kv } from '@vercel/kv';
   const raw = await kv.lrange('ai_bot_hits', 0, -1);
   const hits = raw.map((r) => JSON.parse(r as string));
   // aggregate by bot + path
   ```
5. Redeploy.

Alternatives:

- **Vercel Logs API**: provision a `VERCEL_TOKEN` with logs-read scope and
  query logs filtered by `[ai-bot]`. More moving parts than KV.
- **Log drain to Axiom/Datadog/BetterStack** + their API for queries.
  Better long-term, more cost.

### Verifying middleware locally / in production

Locally there's no Vercel runtime so middleware doesn't fire. To verify
on a deploy, after the next push:

```bash
curl -A "Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)" \
     https://foundforai.com/blog/mental-model-shift-ai-search
```

Then in Vercel dashboard → Logs → search `[ai-bot]`. Should see one entry
within ~10 seconds.

The `/api/ai-bot-stats` endpoint can be hit directly:

```bash
curl -H "x-api-token: YOUR_TOKEN" https://foundforai.com/api/ai-bot-stats
```

## Operational notes

- Adding a new AI assistant to track: add a rule to `RULES` in
  `client/src/lib/ai-source.ts`, then mirror the same entry in the
  `rules` array inside `AI_SOURCE_SCRIPT` in `prerender.mjs`. Both lists
  must stay in sync.
- Adding a new AI bot to log: add a rule to `BOT_RULES` in
  `middleware.ts` only.
- Don't push raw `dataLayer` from components — go through `trackEvent`
  so the `ai_source` enrichment stays consistent.
