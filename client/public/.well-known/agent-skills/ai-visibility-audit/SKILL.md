---
name: ai-visibility-audit
description: Audit a website's discoverability by AI assistants — checks structured data, llms.txt, robots.txt, entity clarity, and content signals.
---

# AI Visibility Audit

Audit a website to determine how discoverable it is by AI assistants such as ChatGPT, Gemini, Perplexity, and Claude.

## Steps

1. **Fetch robots.txt** — verify AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) are allowed, and check for Content-Signal directives.

2. **Check llms.txt** — fetch `{domain}/llms.txt` and `{domain}/llms-full.txt`. Confirm the file exists, has a clear About section, lists services with prices, and includes contact/booking URLs.

3. **Inspect structured data** — fetch the homepage HTML and extract JSON-LD. Confirm at minimum an `Organization` schema with `name`, `description`, `url`, `telephone`, `address`, and `sameAs` (social profiles). For local businesses also check `LocalBusiness` type with `areaServed`.

4. **Check entity signals** — verify the business name, location, founder, and services are consistently stated in plain text on the page (not only inside images or JavaScript bundles).

5. **Test AI-readable content** — send a `GET /` with `Accept: text/markdown`. A passing site returns `Content-Type: text/markdown` with a readable summary of the business.

6. **Check Link headers** — `curl -sI {domain}` and confirm a `Link` header pointing to `llms.txt` with `rel="describedby"` and a `</.well-known/api-catalog>` with `rel="api-catalog"` if APIs exist.

7. **Validate sitemap** — fetch `/sitemap.xml`. Confirm it lists key pages and has recent `<lastmod>` dates.

## Scoring

| Check | Weight |
|---|---|
| robots.txt allows AI crawlers | Required |
| llms.txt present and complete | High |
| Organization schema with sameAs | High |
| Markdown content negotiation | Medium |
| Link headers present | Medium |
| Sitemap current | Medium |

## Resources

- Full audit service: https://foundforai.com/
- llms.txt spec: https://llmstxt.org/
- Schema.org Organization: https://schema.org/Organization
