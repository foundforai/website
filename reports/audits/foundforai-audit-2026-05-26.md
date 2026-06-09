# AI Visibility Audit — foundforai.com

**Auditor:** Found For AI (self-audit)
**Date:** 2026-05-26
**URL audited:** https://foundforai.com
**Trigger:** Verify updated llms.txt is live; full crawl posture and schema check.

---

## Top 3 findings

### 1. llms.txt is live and current
**Status:** Confirmed.
The updated llms.txt is serving correctly at `https://foundforai.com/llms.txt` (HTTP 200). Content reflects the current offer stack: DIY ($49/mo or $490/yr), Onboarding ($997 one-time), Starter ($299/mo), Growth ($599/mo). The stale "AI Visibility Fix — $1,595" and "Recurring Events Subscription" entries have been removed. `/book-call` is listed in Primary pages. No formatting issues found against the llmstxt.org spec (H1 present, sections properly delimited).

**Verification:** `curl -s https://foundforai.com/llms.txt | head -5` returns `# Found For AI`.

---

### 2. Cloudflare is in the DNS path — Bot Fight Mode risk
**What to watch:** DNS nameservers are `randy.ns.cloudflare.com` and `marjory.ns.cloudflare.com`. Cloudflare Bot Fight Mode or WAF rules can block GPTBot, ClaudeBot, and PerplexityBot before requests reach origin — meaning a correct robots.txt allow-list won't matter if the request never gets through.

**Current status:** AI crawlers are currently passing through. GPTBot and ClaudeBot both returned `1` `application/ld+json` block when fetched with their respective user-agent strings — confirming schema is visible and Cloudflare is not blocking them today.

**Why it matters:** Cloudflare configuration can change (plan upgrade, new WAF rule, Bot Fight Mode toggle). If AI crawler traffic in Vercel logs goes to zero, this is the first place to check. (Reference: Field Lessons → DNS / hosting distinction.)

**Fix:** In Cloudflare dashboard, verify Bot Fight Mode is OFF or that GPTBot, ClaudeBot, PerplexityBot are in the allow-list under Security → Bots.

**Verification:** `curl -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.3; +https://openai.com/gptbot" -s https://foundforai.com/ | grep -c "application/ld+json"` should return `1`.

---

### 3. DIY offer missing from homepage Service schema
**What's missing:** The homepage `Service` schema lists three offers (Onboarding $997, Starter $299, Growth $599) but omits the DIY plan ($49/mo or $490/yr). The DIY plan is correctly described in llms.txt and the `/pricing` page schema, but AI assistants reading the homepage entity graph will not see it as an offer.

**Why it matters:** AI assistants assembling a price or offer summary for Found For AI may describe only the done-for-you plans, missing the self-serve entry point — which is the lowest-friction conversion. (Reference: schema.org → Product/Offer; Bing Guideline #14: structured data must match visible page content.)

**Fix:** Add a fourth `Offer` object to the `Service` schema on the homepage for the DIY plan:
```json
{
  "@type": "Offer",
  "name": "DIY Monthly",
  "description": "Self-serve AI visibility analytics and monthly DIY AEO report. 7-day free trial.",
  "price": "49.00",
  "priceCurrency": "USD",
  "url": "https://foundforai.com/pricing#diy",
  "availability": "https://schema.org/InStock",
  "priceSpecification": {
    "@type": "UnitPriceSpecification",
    "price": "49.00",
    "priceCurrency": "USD",
    "billingDuration": "P1M"
  }
}
```

**Verification:** `curl -s https://foundforai.com/ | grep -o '"DIY"'` should return a match.

---

## Full prioritized findings

| # | Finding | Severity | Source | Fix effort |
|---|---|---|---|---|
| 1 | llms.txt live and current with correct pricing | ✅ Pass | llmstxt.org spec | Done |
| 2 | Cloudflare in DNS path — monitor Bot Fight Mode | Medium | Field Lessons → DNS/hosting | 15 min to verify in CF dashboard |
| 3 | DIY offer missing from homepage Service schema | Low | schema.org Offer; Bing #14 | 30 min |
| 4 | robots.txt — all AI crawlers explicitly allowed, Bravebot added | ✅ Pass | AI Crawlers reference | Done |
| 5 | Schema server-side in raw HTML — GPTBot and ClaudeBot both see it | ✅ Pass | Field Lessons → server-side rendering | Done |
| 6 | Unique titles per page in raw HTML | ✅ Pass | Bing #13; Google SEO fundamentals | Done |
| 7 | All key pages return HTTP 200 on direct URL access | ✅ Pass | Field Lessons → client-side routing bug | Done |
| 8 | BlogPosting schema complete — headline, datePublished, dateModified, author @id, publisher @id, image, mainEntityOfPage, url, description | ✅ Pass | Field Lessons → BlogPosting requirements | Done |
| 9 | Entity graph continuity — #org, #website, #local, #dustin-crump reused across pages | ✅ Pass | Field Lessons → entity graph continuity | Done |
| 10 | GTM (GTM-PC6434DW) present in raw HTML sitewide | ✅ Pass | Field Lessons → GA4 measurement layer | Done |

---

## Quick wins (under 1 hour)

- [ ] Add DIY Offer to homepage Service schema (see Finding #3 above)
- [ ] Log into Cloudflare dashboard and confirm Bot Fight Mode is OFF under Security → Bots

---

## Verification commands

```bash
# Confirm llms.txt is live and current
curl -s https://foundforai.com/llms.txt | head -10

# Confirm robots.txt has Bravebot
curl -s https://foundforai.com/robots.txt | grep -A1 "Brave"

# Confirm AI crawlers see schema
curl -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.3; +https://openai.com/gptbot" \
  -s https://foundforai.com/ | grep -c "application/ld+json"
curl -A "ClaudeBot/1.0 (+https://www.anthropic.com/contact)" \
  -s https://foundforai.com/ | grep -c "application/ld+json"

# Confirm direct URL access on blog posts (catches client-side routing bugs)
curl -o /dev/null -s -w "%{http_code}" https://foundforai.com/blog/when-cookies-bite-back
curl -o /dev/null -s -w "%{http_code}" https://foundforai.com/blog/how-to-get-found-in-ai

# DNS — Cloudflare nameserver check
dig NS foundforai.com +short
```

---

## Out of scope for this audit

- **llms-full.txt / `.md` page versions:** The llmstxt.org spec supports a companion `llms-full.txt` with links to Markdown versions of key pages. Not currently implemented. Worth discussing as a next optimization pass — particularly for high-value pages like `/pricing`, `/services`, and `/what-is-ai-seo`.
- **Server-side bot logging:** Cannot verify from outside. Confirmed GTM is in place; whether the AI Assistants custom channel group regex is active in GA4 is a client-side check.
- **Manual citation monitoring cadence:** Process check — not verifiable from audit.
- **IndexNow:** Not verified as implemented. Submitting URLs on publish would improve freshness signals for Bing/Copilot grounding (Bing Guideline #4).
