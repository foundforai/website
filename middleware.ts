// Vercel Edge Middleware — runs on every page-level request before the
// static response is served.
//
// Responsibilities:
//   1. Detect known AI bot User-Agents and emit structured log lines.
//   2. Content negotiation: serve text/markdown when Accept: text/markdown
//      is present (RFC 7231 content negotiation for AI agents).

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

// Minimal HTML→Markdown converter for edge runtime (no DOM available).
// Extracts <main> content, strips chrome, converts semantic elements.
function htmlToMarkdown(html: string): string {
  // --- frontmatter from <head> meta ---
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  const descMatch =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
  const description = descMatch ? descMatch[1].trim() : '';

  // --- strip chrome ---
  let body = html;
  body = body.replace(/<head[\s\S]*?<\/head>/gi, '');
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  body = body.replace(/<style[\s\S]*?<\/style>/gi, '');
  body = body.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  body = body.replace(/<header[\s\S]*?<\/header>/gi, '');
  body = body.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  body = body.replace(/<!--[\s\S]*?-->/g, '');

  // narrow to <main> if present
  const mainMatch = body.match(/<main[\s\S]*?<\/main>/i);
  if (mainMatch) body = mainMatch[0];

  // --- semantic → markdown ---
  body = body.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, c) => `\n# ${bare(c)}\n`);
  body = body.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, c) => `\n## ${bare(c)}\n`);
  body = body.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, c) => `\n### ${bare(c)}\n`);
  body = body.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, c) => `\n#### ${bare(c)}\n`);
  body = body.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  body = body.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  body = body.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
  body = body.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*');
  body = body.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');
  body = body.replace(/<a[^>]+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
    const t = bare(text).trim();
    return t ? `[${t}](${href})` : href;
  });
  body = body.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, c) => `\n- ${bare(c).trim()}`);
  body = body.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n');
  body = body.replace(/<br\s*\/?>/gi, '\n');
  body = body.replace(/<hr\s*\/?>/gi, '\n---\n');

  // --- strip remaining tags & decode entities ---
  body = body.replace(/<[^>]+>/g, '');
  body = decodeEntities(body);

  // --- normalise whitespace ---
  body = body.replace(/[ \t]+/g, ' ');
  body = body.replace(/\n{3,}/g, '\n\n').trim();

  const fm: string[] = ['---'];
  if (title) fm.push(`title: "${title.replace(/"/g, '\\"')}"`);
  if (description) fm.push(`description: "${description.replace(/"/g, '\\"')}"`);
  fm.push('---', '');

  return fm.join('\n') + '\n' + body;
}

function bare(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&#8217;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”');
}

export const config = {
  // Run on page-level requests; skip JS/CSS/image/font assets to keep
  // edge invocations bounded. .txt and .xml are intentionally NOT skipped
  // because robots.txt / sitemap.xml / llms.txt / ai.txt are high-signal
  // bot endpoints we want to see in the logs.
  matcher:
    '/((?!_next/|_vercel/|api/|assets/|.*\\.(?:js|css|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|otf|eot|map)$).*)',
};

export default async function middleware(request: Request) {
  // 1. AI-bot logging (unchanged behaviour)
  const ua = request.headers.get('user-agent') || '';
  const vendor = classifyBot(ua);
  if (vendor) {
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
  }

  // 2. Markdown content negotiation
  // x-markdown-passthrough prevents the internal fetch from re-entering here.
  const accept = request.headers.get('accept') || '';
  const isPassthrough = request.headers.get('x-markdown-passthrough') === '1';
  if (accept.includes('text/markdown') && !isPassthrough) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const htmlRes = await fetch(request.url, {
        headers: {
          accept: 'text/html',
          'x-markdown-passthrough': '1',
        },
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (htmlRes.ok) {
        const html = await htmlRes.text();
        const markdown = htmlToMarkdown(html);
        const tokens = Math.ceil(markdown.length / 4);
        return new Response(markdown, {
          status: 200,
          headers: {
            'content-type': 'text/markdown; charset=utf-8',
            'x-markdown-tokens': String(tokens),
            vary: 'Accept',
            'cache-control': 'public, max-age=300, s-maxage=300',
          },
        });
      }
    } catch {
      clearTimeout(timer);
      // fall through to origin on error
    }
  }
}
