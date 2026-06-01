---
name: llms-txt
description: Create or improve a site's llms.txt file so AI assistants can accurately understand and recommend the business.
---

# llms.txt Creation and Optimization

Create a well-structured `llms.txt` file at the root of a domain so AI assistants can quickly understand who the business is, what it does, who it serves, and how to contact or book it.

## File Structure

```
# {Business Name}

## About
{2–4 sentence description: what the business does, who it serves, where it operates.}

## Founder / Team (if relevant)
{Name, role, credentials, social links}

## The core problem we solve
{Plain-language description of the customer pain point}

## Services
### {Service Name} — {Price}
{Description, what's included, who it's for}
{Booking/purchase URL}

(repeat for each service or product)

## Guarantee (if applicable)
{Any satisfaction guarantee or refund policy}

## Contact
- Phone: {number}
- Email: {address}
- Book a call: {URL}

## Social
- LinkedIn: {URL}
- (other platforms)
```

## Rules

- Write in plain prose — no marketing language or superlatives.
- Include prices. AI assistants use pricing to match user intent.
- Include booking/purchase URLs directly under each service.
- Repeat the business name and location in the first paragraph for entity clarity.
- Keep the full file under 2,000 words. Create `llms-full.txt` for longer detail.
- Place the file at `https://{domain}/llms.txt` with `Content-Type: text/plain`.

## Serving the file

Add to your `robots.txt`:
```
# Sitemap and content discovery
Sitemap: https://{domain}/sitemap.xml
```

Add a `Link` response header on the homepage:
```
Link: </llms.txt>; rel="describedby"
```

## Validation

Fetch `{domain}/llms.txt` and confirm:
- HTTP 200 with `Content-Type: text/plain`
- Contains `## About` and at least one `## Services` section
- Business name and location appear in the first 200 words

## Resources

- llms.txt specification: https://llmstxt.org/
- Example (this site): https://foundforai.com/llms.txt
