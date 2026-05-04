// Vercel Cron-triggered IndexNow submitter. Wakes every 6 hours per the
// `crons` schedule in vercel.json. Fetches the live sitemap, picks URLs
// with <lastmod> within the last 7 days, and submits them. If no URL is
// recent (e.g., first run on a fresh deploy), submits everything once.
//
// Auth: accepts any of
//   - Authorization: Bearer ${CRON_SECRET}      (Vercel Cron default)
//   - x-vercel-cron-secret: ${CRON_SECRET}      (legacy header for compat)
//   - x-admin-key: ${ADMIN_API_KEY}             (manual trigger)
// If neither secret is set in env, we accept the request when Vercel
// stamps it with the x-vercel-cron header (sent on cron-originated runs).

import { submitUrls } from '../../lib/indexnow';

export const config = { runtime: 'edge' };

const SITEMAP_URL = 'https://foundforai.com/sitemap.xml';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

interface SitemapEntry {
  loc: string;
  lastmod: string | null;
}

function parseSitemap(xml: string): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const urlBlock = /<url\b[^>]*>([\s\S]*?)<\/url>/g;
  let match: RegExpExecArray | null;
  while ((match = urlBlock.exec(xml)) !== null) {
    const block = match[1];
    const loc = /<loc>\s*([^<]+?)\s*<\/loc>/.exec(block);
    const lastmod = /<lastmod>\s*([^<]+?)\s*<\/lastmod>/.exec(block);
    if (loc) {
      entries.push({ loc: loc[1], lastmod: lastmod ? lastmod[1] : null });
    }
  }
  return entries;
}

function authorize(request: Request): boolean {
  const cronSecret = process.env.CRON_SECRET;
  const adminKey = process.env.ADMIN_API_KEY;

  const auth = request.headers.get('authorization') || '';
  const cronHeader = request.headers.get('x-vercel-cron-secret') || '';
  const provided = request.headers.get('x-admin-key') || '';

  if (cronSecret) {
    if (auth === `Bearer ${cronSecret}`) return true;
    if (cronHeader === cronSecret) return true;
  }
  if (adminKey && provided === adminKey) return true;

  // Vercel sets x-vercel-cron on cron-originated invocations; trust it as a
  // last resort so the cron still works if CRON_SECRET hasn't been wired.
  if (request.headers.get('x-vercel-cron')) return true;

  return false;
}

export default async function handler(request: Request): Promise<Response> {
  if (!authorize(request)) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  let xml: string;
  try {
    const res = await fetch(SITEMAP_URL, {
      headers: { 'cache-control': 'no-cache' },
    });
    if (!res.ok) {
      return Response.json(
        { error: `failed to fetch sitemap: ${res.status}` },
        { status: 502 }
      );
    }
    xml = await res.text();
  } catch (err) {
    return Response.json(
      { error: `sitemap fetch threw: ${String(err)}` },
      { status: 502 }
    );
  }

  const entries = parseSitemap(xml);
  const now = Date.now();
  const recent = entries.filter((e) => {
    if (!e.lastmod) return false;
    const t = Date.parse(e.lastmod);
    if (Number.isNaN(t)) return false;
    return now - t < SEVEN_DAYS_MS;
  });

  let urls: string[];
  let mode: 'recent' | 'bulk-empty';
  if (recent.length > 0) {
    urls = recent.map((e) => e.loc);
    mode = 'recent';
  } else {
    // Spec: "If list is empty (e.g., on first run with no recent lastmods)
    // submit ALL URLs once." See docs/INDEXNOW.md for the rate-limit caveat.
    urls = entries.map((e) => e.loc);
    mode = 'bulk-empty';
  }

  const result = await submitUrls(urls);

  return Response.json({
    mode,
    sitemap_total: entries.length,
    submitted: result.submitted,
    status: result.status,
    body: result.body,
    urls,
  });
}
