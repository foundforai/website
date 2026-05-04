// IndexNow client. Both functions are safe — they never throw; errors are
// logged to console and surfaced via the returned status code (0 means
// the fetch itself threw). Imported by api/cron/indexnow.ts and
// api/indexnow/manual.ts.
//
// Env vars (set in Vercel project settings, all envs):
//   INDEXNOW_KEY           — public key string, must match the file at
//                            INDEXNOW_KEY_LOCATION
//   INDEXNOW_KEY_LOCATION  — full URL to the key file
//   INDEXNOW_HOST          — bare hostname (e.g. foundforai.com), no scheme

interface SingleResult {
  status: number;
  ok: boolean;
}

interface BulkResult {
  status: number;
  submitted: number;
  body: string;
}

export async function submitUrl(url: string): Promise<SingleResult> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.error('[indexnow] INDEXNOW_KEY env var is not set');
    return { status: 500, ok: false };
  }
  try {
    const apiUrl = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(
      url
    )}&key=${encodeURIComponent(key)}`;
    const res = await fetch(apiUrl, { method: 'GET' });
    const ok = res.status >= 200 && res.status < 300;
    if (!ok) {
      console.error(`[indexnow] submitUrl status=${res.status} url=${url}`);
    } else {
      console.log(`[indexnow] submitUrl status=${res.status} url=${url}`);
    }
    return { status: res.status, ok };
  } catch (err) {
    console.error('[indexnow] submitUrl threw:', err);
    return { status: 0, ok: false };
  }
}

export async function submitUrls(urls: string[]): Promise<BulkResult> {
  const key = process.env.INDEXNOW_KEY;
  const keyLocation = process.env.INDEXNOW_KEY_LOCATION;
  const host = process.env.INDEXNOW_HOST;

  if (!key || !keyLocation || !host) {
    console.error(
      '[indexnow] missing one or more env vars: INDEXNOW_KEY, INDEXNOW_KEY_LOCATION, INDEXNOW_HOST'
    );
    return { status: 500, submitted: 0, body: 'missing env vars' };
  }

  if (!Array.isArray(urls) || urls.length === 0) {
    return { status: 200, submitted: 0, body: 'no urls to submit' };
  }

  const urlList = urls.slice(0, 10000);

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation, urlList }),
    });
    const body = await res.text();
    console.log(
      `[indexnow] submitUrls status=${res.status} submitted=${urlList.length} body=${body || '(empty)'}`
    );
    return { status: res.status, submitted: urlList.length, body };
  } catch (err) {
    console.error('[indexnow] submitUrls threw:', err);
    return { status: 0, submitted: 0, body: String(err) };
  }
}
