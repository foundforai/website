// Public proxy used by the schema validator tool to fetch a page's HTML.
//
// Browser CORS blocks foundforai.com from fetching arbitrary domains directly,
// so the validator UI calls this endpoint and the function does the fetch
// server-side. The response includes the page's HTML so the client can extract
// JSON-LD blocks and run validation rules.
//
// Safety:
// - Only http/https
// - Blocks loopback / private / link-local hostnames
// - 12s timeout, ~3 MB response cap
// - Identifies itself in the User-Agent so site owners can see the source

const MAX_BYTES = 3 * 1024 * 1024;
const TIMEOUT_MS = 12_000;
const USER_AGENT =
  'FoundForAI-SchemaValidator/1.0 (+https://foundforai.com/tools/schema-validator)';

function badHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (!h) return true;
  if (h === 'localhost' || h.endsWith('.localhost')) return true;
  if (h === '0.0.0.0' || h === '::1') return true;
  // IPv4 private/loopback ranges
  if (/^127\./.test(h)) return true;
  if (/^10\./.test(h)) return true;
  if (/^192\.168\./.test(h)) return true;
  if (/^169\.254\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  // IPv6 link-local
  if (/^fe80:/i.test(h)) return true;
  return false;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
      'cache-control': 'no-store',
    },
  });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, OPTIONS',
        'access-control-allow-headers': 'content-type',
      },
    });
  }
  if (request.method !== 'GET') {
    return json({ error: 'method not allowed' }, 405);
  }

  const requestUrl = new URL(request.url);
  const raw = requestUrl.searchParams.get('url');
  if (!raw) {
    return json({ error: 'missing required ?url= parameter' }, 400);
  }

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return json({ error: 'invalid url' }, 400);
  }

  if (target.protocol !== 'http:' && target.protocol !== 'https:') {
    return json({ error: 'only http and https urls are allowed' }, 400);
  }
  if (badHost(target.hostname)) {
    return json({ error: 'this host is not allowed' }, 400);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(target.toString(), {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': USER_AGENT,
        accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
      },
    });
  } catch (err) {
    clearTimeout(timer);
    const message =
      err instanceof Error && err.name === 'AbortError'
        ? 'fetch timed out'
        : 'failed to fetch url';
    return json({ error: message }, 502);
  }
  clearTimeout(timer);

  const finalUrl = res.url || target.toString();
  const status = res.status;
  const contentType = res.headers.get('content-type') || '';

  // Read body with byte cap so we don't blow memory on huge pages.
  const reader = res.body?.getReader();
  if (!reader) {
    return json({ error: 'no response body' }, 502);
  }
  const chunks: Uint8Array[] = [];
  let total = 0;
  let truncated = false;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BYTES) {
      truncated = true;
      try {
        await reader.cancel();
      } catch {
        // ignore
      }
      break;
    }
    chunks.push(value);
  }

  const merged = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    merged.set(c, offset);
    offset += c.byteLength;
  }
  const html = new TextDecoder('utf-8').decode(merged);

  return json({
    requestedUrl: target.toString(),
    finalUrl,
    status,
    contentType,
    bytes: total,
    truncated,
    html,
  });
}
