# AI Visibility Audit — foundforai.com

**Auditor:** Found For AI (self-audit)
**Date:** 2026-05-26
**URL audited:** https://foundforai.com
**Trigger:** Post-fix verification — llms.txt update, llms-full.txt update, Bravebot robots.txt addition, BlogPosting author fix.

---

## Top 3 findings

### 1. All critical signals passing — no blocking issues found
Every triage check passes. Schema is server-rendered and visible to all three major AI crawlers. All key pages return 200. Titles are unique and descriptive. Required files are live and current.

### 2. BlogPosting author fix confirmed live on both posts
**Brian Jolley** (`/blog/when-cookies-bite-back`): `{"@type": "Person", "name": "Brian Jolley"}` — matches the visible byline. ✅
**Dustin Crump** (`/blog/how-to-get-found-in-ai`): `{"@id": "https://foundforai.com/#dustin-crump"}` — resolves to the global entity graph. ✅

Previously both posts returned `#dustin-crump` regardless of byline. That misleading markup is resolved. (Google E-E-A-T: schema author must match the visible byline.)

### 3. One residual low-priority item: DIY offer absent from homepage Service schema
The homepage `Service` schema lists Onboarding ($997), Starter ($299), and Growth ($599) as offers but omits the DIY plan ($49/mo or $490/yr). The DIY plan is correctly described in llms.txt, llms-full.txt, and the /pricing page schema. This is the only remaining gap from the previous audit. (schema.org Offer; Bing Guideline #14.)

---

## Full prioritized findings

| # | Finding | Severity | Source | Status |
|---|---|---|---|---|
| 1 | Schema server-rendered in raw HTML | ✅ Pass | Field Lessons → server-side rendering | 1 block on homepage |
| 2 | GPTBot sees schema | ✅ Pass | Field Lessons → AI crawler verification | 1 block |
| 3 | ClaudeBot sees schema | ✅ Pass | Field Lessons → AI crawler verification | 1 block |
| 4 | PerplexityBot sees schema | ✅ Pass | Field Lessons → AI crawler verification | 1 block |
| 5 | All key pages return HTTP 200 on direct URL access | ✅ Pass | Field Lessons → client-side routing bug | / /about /services /pricing /blog /contact /book-call |
| 6 | Unique titles per page in raw HTML | ✅ Pass | Bing #13 | All 6 pages unique and descriptive |
| 7 | llms.txt live and current | ✅ Pass | llmstxt.org spec | HTTP 200, current offer stack |
| 8 | llms-full.txt live and current | ✅ Pass | llmstxt.org spec | HTTP 200, current offer stack |
| 9 | robots.txt — all AI crawlers explicitly allowed, Bravebot listed | ✅ Pass | AI Crawlers reference | HTTP 200 |
| 10 | sitemap.xml present | ✅ Pass | Bing #3 | HTTP 200 |
| 11 | BlogPosting schema — all required fields present on both posts | ✅ Pass | Field Lessons → BlogPosting requirements | headline, datePublished, dateModified, author, publisher, image, mainEntityOfPage, url, description |
| 12 | BlogPosting image field populated with post-specific image | ✅ Pass | Field Lessons → BlogPosting requirements | when-cookies: detour_cookie_popup.png; how-to-get-found: Unsplash photo |
| 13 | Author schema matches visible byline on all tested posts | ✅ Pass | Google E-E-A-T → Who-How-Why | Brian Jolley → inline Person; Dustin → @id entity |
| 14 | Entity graph continuity — #org, #website, #local, #dustin-crump reused across pages | ✅ Pass | Field Lessons → entity graph continuity | Consistent across homepage and blog posts |
| 15 | GTM (GTM-PC6434DW) in raw HTML sitewide | ✅ Pass | Field Lessons → measurement layer | Present |
| 16 | DIY offer absent from homepage Service schema | Low | schema.org Offer; Bing #14 | Carried from previous audit — only remaining gap |

---

## Quick wins (under 1 hour each)

- [ ] Add DIY Offer to homepage Service schema (sole remaining item from prior audit)

---

## Verification commands

```bash
# Schema visible to all three major AI crawlers
curl -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.3; +https://openai.com/gptbot" \
  -s https://foundforai.com/ | grep -c "application/ld+json"
curl -A "ClaudeBot/1.0 (+https://www.anthropic.com/contact)" \
  -s https://foundforai.com/ | grep -c "application/ld+json"
curl -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; PerplexityBot/1.0; +https://docs.perplexity.ai/guides/bots" \
  -s https://foundforai.com/ | grep -c "application/ld+json"

# BlogPosting author correctness
curl -s https://foundforai.com/blog/when-cookies-bite-back | grep -o '"author":{[^}]*}'
curl -s https://foundforai.com/blog/how-to-get-found-in-ai | grep -o '"author":{[^}]*}'

# Required files
curl -o /dev/null -s -w "%{http_code}" https://foundforai.com/llms.txt
curl -o /dev/null -s -w "%{http_code}" https://foundforai.com/llms-full.txt
curl -o /dev/null -s -w "%{http_code}" https://foundforai.com/robots.txt
curl -o /dev/null -s -w "%{http_code}" https://foundforai.com/sitemap.xml
```

---

## Out of scope for this audit

- **Cloudflare bot management:** DNS confirms Cloudflare in path. AI crawlers are currently passing through (all three return schema). Recommend a manual check in the Cloudflare dashboard to confirm Bot Fight Mode is OFF — this cannot be verified externally.
- **AI Assistants GA4 channel group:** GTM confirmed present. Whether the AI Assistants custom channel group regex is active is a GA4 admin-side check.
- **Server-side bot logging:** Cannot verify from outside. Flag for confirmation.
- **IndexNow:** Not verified as implemented. Would improve freshness signals for Bing/Copilot grounding (Bing Guideline #4).
