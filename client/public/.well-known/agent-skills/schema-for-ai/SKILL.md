---
name: schema-for-ai
description: Implement JSON-LD structured data that helps AI assistants identify, trust, and recommend a business.
---

# Schema Markup for AI Discovery

Add JSON-LD structured data to a website so AI assistants can extract verified facts about the business without having to parse prose.

## Priority Schema Types

### 1. Organization (required for all businesses)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://{domain}/#org",
  "name": "{Legal business name}",
  "url": "https://{domain}",
  "logo": "https://{domain}/logo.png",
  "description": "{1–2 sentence description}",
  "telephone": "{E.164 format, e.g. +18015551234}",
  "email": "{contact email}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{street}",
    "addressLocality": "{city}",
    "addressRegion": "{state}",
    "postalCode": "{zip}",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://www.linkedin.com/company/{slug}",
    "https://twitter.com/{handle}",
    "https://www.facebook.com/{page}"
  ],
  "founder": {
    "@type": "Person",
    "name": "{Founder name}",
    "url": "https://{domain}/about"
  }
}
```

### 2. LocalBusiness (add for service-area businesses)

Extend Organization with:
```json
{
  "@type": ["Organization", "LocalBusiness"],
  "areaServed": {
    "@type": "City",
    "name": "{City}",
    "containedInPlace": {"@type": "State", "name": "{State}"}
  },
  "priceRange": "$$"
}
```

### 3. Service (one block per offering)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "{Service name}",
  "description": "{What's included}",
  "provider": {"@id": "https://{domain}/#org"},
  "offers": {
    "@type": "Offer",
    "price": "{amount}",
    "priceCurrency": "USD",
    "url": "https://{domain}/{service-page}"
  }
}
```

### 4. WebSite (enables sitelinks and search)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://{domain}/#website",
  "url": "https://{domain}",
  "name": "{Business name}",
  "publisher": {"@id": "https://{domain}/#org"}
}
```

## Implementation

Place all JSON-LD blocks inside `<script type="application/ld+json">` tags in `<head>`. Multiple blocks are allowed.

## Validation

1. Fetch the page HTML and extract `<script type="application/ld+json">` blocks.
2. Parse each block and confirm `@type`, `@id`, `name`, and `url` are present on the Organization.
3. Confirm `sameAs` includes at least two external profile URLs.
4. Check that `telephone` or `email` is present for contact discoverability.

## Common mistakes

- Using `@type: "Company"` instead of `"Organization"` — AI systems recognise schema.org types.
- Omitting `@id` — without it, separate schema blocks cannot be linked into a single entity graph.
- Missing `sameAs` — AI systems use social profiles to verify entity identity across sources.
- Hiding schema in client-side JS — schema must be in the server-rendered HTML.

## Resources

- Schema.org Organization: https://schema.org/Organization
- Google Rich Results Test: https://search.google.com/test/rich-results
- Full implementation service: https://foundforai.com/
