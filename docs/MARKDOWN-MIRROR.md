# Markdown mirror (`/page.md`)

Every indexable content page on the site is also published as a clean
Markdown file — `/services` has a twin at `/services.md`, the home page at
`/index.md`, `/blog/<slug>` at `/blog/<slug>.md`, and so on. AI agents and
tooling can read the Markdown instead of parsing the React DOM.

This follows the **one source, two outputs** pattern: the React components
are the single source of truth. The build renders them to semantic HTML for
humans, then derives the Markdown mirror from that same render — so the two
outputs never drift. Edit a page, rebuild, and its `.md` regenerates
automatically. There is no second copy to maintain.

## How it's generated

All of this happens in **`prerender.mjs`**, during `npm run build`, right
after each route is server-rendered to HTML.

| Step | What happens |
|---|---|
| Select pages | `allRoutes` filtered to `prerender && sitemap`, minus a small exclude list (see below). |
| Extract content | The rendered HTML's `<main>…</main>` is pulled out. Every page uses `PageLayout`, which wraps content in a single `<main>` landmark, so nav/header/footer are excluded automatically. |
| Convert | [`turndown`](https://github.com/mixmark-io/turndown) (+ `turndown-plugin-gfm` for tables) converts the HTML to Markdown: ATX headings, fenced code, `-` bullets. `script`/`style`/`noscript` are stripped. |
| Rewrite links | Internal links are rewritten to their `.md` counterparts **when a mirror exists** (`/book-call` → `/book-call.md`, `/` → `/index.md`), preserving `?query` and `#hash`. Links to non-mirrored pages are left as normal URLs. |
| Space adjacent links | Back-to-back CTA links (`](/a.md)[Label]`) get a space inserted so each parses cleanly. |
| Wrap | A blockquote header (title + canonical URL + links to `/llms.txt` and `/llms-full.txt`) and a footer (canonical + knowledge-base links) are added around the body. |
| Write | Output goes to `dist/<path>.md` (`/` → `dist/index.md`). |

After all files are written, the build injects the full list of generated
`.md` links into `dist/llms.txt` at the `<!--MD_INDEX-->` marker (see below).

## Which pages get a mirror

Included: every route with `prerender: true` **and** `sitemap: true` in
`client/src/data/routes.ts` — home, services, the education pages (`/aeo`,
`/what-is-*`, `/retrieval-layer-seo`), about, contact, tools, events, media,
and all blog posts.

Excluded:

- **Legal pages** — `/privacy`, `/terms`, `/refund-policy` — via the
  `MD_EXCLUDE` set in `prerender.mjs`.
- **Funnel / thank-you pages** — `/scorecard/results`, `/playbook/access`,
  `/playbook/thanks`, `/thank-you` — automatically, because they are
  `sitemap: false`.
- **Standalone HTML pages** (`/ai-visibility`, `/fix-plan*`) — they are
  `prerender: false`, so there is no React render to extract from.

To add or remove a page from the mirror, change its `prerender`/`sitemap`
flags in `routes.ts`, or edit `MD_EXCLUDE` in `prerender.mjs`.

## Serving & headers

Configured in **`vercel.json`** with a header rule matching `/(.*).md`:

| Header | Value | Why |
|---|---|---|
| `Content-Type` | `text/markdown; charset=utf-8` | So agents/browsers treat it as Markdown, not download it. |
| `X-Robots-Tag` | `noindex` | Search engines index the **HTML** page, not the Markdown twin — avoids duplicate-content confusion. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) ignore `noindex` for ingestion, so AI visibility is unaffected. |

The HTML pages themselves carry **no** robots restriction and keep their
`<link rel="canonical">` (see `SEOHead`), so the human page stays fully
indexable and canonical.

Note: `.md` files are **not** added to `sitemap.xml` — the sitemap lists
canonical HTML URLs only.

## Discovery

An AI agent can find the Markdown layer three ways:

1. **Append `.md`** to any page URL.
2. **`/llms.txt`** — the "Markdown versions" section explains the convention
   and lists every mirror. The list is build-generated at the
   `<!--MD_INDEX-->` marker, so it stays in sync. (`/llms-full.txt` documents
   the convention too, in its Primary Pages section.)
3. **`Link: rel="describedby"`** header on `/` points crawlers at
   `/llms.txt` (see `vercel.json`).

## Build dependencies

`turndown` and `turndown-plugin-gfm` are `devDependencies` — they run only in
`prerender.mjs` at build time and ship nothing to the browser.

## Files involved

| File | Role |
|---|---|
| `prerender.mjs` | Generates the `.md` files and injects the `llms.txt` index. |
| `client/src/data/routes.ts` | Source of which routes exist and their `prerender`/`sitemap` flags. |
| `client/src/components/PageLayout.tsx` | Provides the `<main>` landmark the extractor relies on. |
| `client/public/llms.txt` | Holds the `<!--MD_INDEX-->` marker the build fills in. |
| `client/public/llms-full.txt` | Documents the append-`.md` convention. |
| `vercel.json` | `Content-Type` + `X-Robots-Tag` headers for `.md`. |
