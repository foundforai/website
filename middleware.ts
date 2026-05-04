// Vercel Edge Middleware — runs on every page-level request before the
// static response is served. Detects known AI bot User-Agents and emits
// a structured JSON line via console.log; Vercel's runtime captures it
// to project Logs (visible in the Vercel dashboard, also forwardable to
// log drains like Datadog, Axiom, S3, etc.).
//
// We do NOT block any of these bots. Logging only.

interface BotRule {
  pattern: RegExp;
  vendor: string;
}

const BOT_RULES: BotRule[] = [
  { pattern: /\b(GPTBot|ChatGPT-User|OAI-SearchBot)\b/i, vendor: 'openai' },
  { pattern: /\b(ClaudeBot|Claude-Web|anthropic-ai)\b/i, vendor: 'anthropic' },
  { pattern: /\b(PerplexityBot|Perplexity-User)\b/i, vendor: 'perplexity' },
  { pattern: /\bGoogle-Extended\b/i, vendor: 'google_ai' },
  { pattern: /\bApplebot-Extended\b/i, vendor: 'apple_ai' },
  { pattern: /\b(Bytespider|Amazonbot|CCBot|Diffbot|FacebookBot|Meta-ExternalAgent)\b/i, vendor: 'other_ai' },
];

function classifyBot(ua: string): string | null {
  for (const { pattern, vendor } of BOT_RULES) {
    if (pattern.test(ua)) return vendor;
  }
  return null;
}

export const config = {
  // Run on page-level requests; skip JS/CSS/image/font assets to keep
  // edge invocations bounded. .txt and .xml are intentionally NOT skipped
  // because robots.txt / sitemap.xml / llms.txt / ai.txt are high-signal
  // bot endpoints we want to see in the logs.
  matcher:
    '/((?!_next/|_vercel/|assets/|.*\\.(?:js|css|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|otf|eot|map)$).*)',
};

export default function middleware(request: Request) {
  const ua = request.headers.get('user-agent') || '';
  const vendor = classifyBot(ua);
  if (!vendor) return; // not an AI bot — pass through silently

  const url = new URL(request.url);
  const entry = {
    ts: new Date().toISOString(),
    bot: vendor,
    ua,
    path: url.pathname,
    query: url.search || null,
    referer: request.headers.get('referer') || null,
    country: request.headers.get('x-vercel-ip-country') || null,
  };
  console.log(`[ai-bot] ${JSON.stringify(entry)}`);
  // No return = continue to origin (we don't modify the response).
}
