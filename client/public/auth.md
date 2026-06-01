# auth.md

This document describes how AI agents can access Found For AI services and APIs.

## Discovery

Agents can retrieve `/.well-known/oauth-authorization-server` to discover supported registration flows and endpoints.

## Public APIs — No Registration Required

The following endpoints are publicly accessible without authentication:

| Endpoint | Method | Description |
|---|---|---|
| `/api/analyze` | POST | AI visibility analysis for a given URL |
| `/api/fetch-page` | GET | Fetch a page's HTML for schema inspection (`?url=`) |
| `/api/status` | GET | Service health check |

No API key or token is required to use these endpoints. Agents may call them directly.

## Registration Flows

### Anonymous — Immediate Access

Agents may register anonymously to receive an API key for higher rate limits or future authenticated features.

POST to `/api/agent/register` with:

```json
{
  "type": "anonymous",
  "requested_credential_type": "api_key",
  "agent_name": "your-agent-name",
  "contact_email": "optional@example.com"
}
```

Response:
```json
{
  "credential_type": "api_key",
  "credential": "fai_...",
  "expires_in": null
}
```

Include the key in subsequent requests as:
```
Authorization: Bearer fai_...
```

## Scopes

| Scope | Description |
|---|---|
| `public` | Access to all public API endpoints (default, no key required) |
| `api.analyze` | AI visibility analysis endpoint |
| `api.fetch` | Page fetch proxy endpoint |

## Contact

For enterprise access, custom rate limits, or integration questions:
- Email: support@foundforai.com
- Book a call: https://foundforai.com/book-call
