// Token-protected admin endpoint for AI bot hit stats.
//
// IMPORTANT — current implementation is a stub.
// Middleware logs every AI bot hit via console.log to Vercel project logs,
// but those logs are not aggregated here. Aggregation requires a backing
// store. The honest options:
//
//   1. Vercel KV (recommended). Add `@vercel/kv`, write entries from
//      middleware via `kv.lpush('ai_bot_hits', JSON.stringify(entry))` +
//      `kv.ltrim('ai_bot_hits', 0, 9999)`, then read here with
//      `kv.lrange('ai_bot_hits', 0, -1)` and aggregate.
//
//   2. Vercel Logs API. Provision a VERCEL_TOKEN with logs-read scope and
//      query the project's logs filtered by `[ai-bot]` prefix.
//
//   3. Log drain to Datadog/Axiom/etc., then query from there.
//
// Per-isolate in-memory ring buffers don't aggregate across the fleet —
// each Edge isolate has its own memory and they cycle independently — so
// we deliberately don't pretend to ship one. This endpoint returns an
// honest "no aggregation backing store yet" payload along with the wiring
// recipe and a pointer to the raw logs.
//
// Auth: pass `?token=...` query param OR `x-api-token` header. Token must
// match the AI_BOT_STATS_TOKEN env var on the deployment. If the env var
// isn't set, the endpoint returns 503.

export const config = { runtime: 'edge' };

interface ErrorBody {
  error: string;
  hint?: string;
}

interface OkBody {
  status: 'ok';
  message: string;
  bot_hits: unknown[];
  todo: {
    why_empty: string;
    recommended_path: string;
    docs: string;
  };
  bot_rules_summary: string;
  log_format: {
    prefix: string;
    fields: string[];
  };
}

export default async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const expected = process.env.AI_BOT_STATS_TOKEN;

  if (!expected) {
    const body: ErrorBody = {
      error: 'AI_BOT_STATS_TOKEN env var is not set on this deployment',
      hint:
        'Add AI_BOT_STATS_TOKEN to Project Settings > Environment Variables in Vercel, then redeploy.',
    };
    return Response.json(body, { status: 503 });
  }

  const provided =
    url.searchParams.get('token') || request.headers.get('x-api-token') || '';

  if (provided !== expected) {
    const body: ErrorBody = { error: 'unauthorized' };
    return Response.json(body, { status: 401 });
  }

  const body: OkBody = {
    status: 'ok',
    message:
      'AI bot hits are logged in real time by middleware.ts. This endpoint does not yet aggregate them — see TODO below.',
    bot_hits: [],
    todo: {
      why_empty:
        'Aggregation requires a backing store. Edge isolates do not share memory across requests, so an in-memory ring buffer is unreliable.',
      recommended_path:
        'Add @vercel/kv. In middleware.ts: import { kv } from "@vercel/kv"; await kv.lpush("ai_bot_hits", JSON.stringify(entry)); await kv.ltrim("ai_bot_hits", 0, 9999). Then in this endpoint read with kv.lrange("ai_bot_hits", 0, -1) and aggregate by bot+path.',
      docs: '/docs/AI_ATTRIBUTION.md',
    },
    bot_rules_summary:
      'GPTBot/ChatGPT-User/OAI-SearchBot=openai; ClaudeBot/Claude-Web/anthropic-ai=anthropic; PerplexityBot/Perplexity-User=perplexity; Google-Extended=google_ai; Applebot-Extended=apple_ai; Bytespider/Amazonbot/CCBot/Diffbot/FacebookBot/Meta-ExternalAgent=other_ai',
    log_format: {
      prefix: '[ai-bot]',
      fields: ['ts', 'bot', 'ua', 'path', 'query', 'referer', 'country'],
    },
  };

  return Response.json(body);
}
