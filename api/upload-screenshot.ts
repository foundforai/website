// Upload endpoint for the /reveal sales tool.
//
// The reveal page lets an operator drag/drop a screenshot of a lead's site.
// The browser POSTs the raw image bytes here; this function stores it in
// Vercel Blob and returns a short public URL. That URL is then baked into the
// per-lead share link (the `img` query param), so the recipient sees the
// screenshot without the operator having to host it anywhere.
//
// Requires the BLOB_READ_WRITE_TOKEN env var, which Vercel provisions
// automatically when a Blob store is connected to the project. Until a store
// is connected, this returns a 500 and the reveal page falls back to the
// "paste an image URL" field.
//
// Safety:
// - POST only, image/* content-types only
// - ~8 MB cap
// - random suffix so uploads never collide or overwrite

import { put } from '@vercel/blob';

export const config = { runtime: 'edge' };

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = /^image\/(png|jpe?g|webp|gif|avif)$/i;

function json(data: unknown, status = 200): Response {
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
        'access-control-allow-methods': 'POST, OPTIONS',
        'access-control-allow-headers': 'content-type',
      },
    });
  }
  if (request.method !== 'POST') return json({ error: 'method not allowed' }, 405);

  const contentType = (request.headers.get('content-type') || '').split(';')[0].trim();
  if (!ALLOWED.test(contentType)) {
    return json({ error: 'expected an image file (png, jpg, webp, gif, avif)' }, 415);
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return json(
      { error: 'screenshot storage is not configured yet (no Blob store)' },
      500,
    );
  }

  let bytes: ArrayBuffer;
  try {
    bytes = await request.arrayBuffer();
  } catch {
    return json({ error: 'could not read upload body' }, 400);
  }
  if (bytes.byteLength === 0) return json({ error: 'empty upload' }, 400);
  if (bytes.byteLength > MAX_BYTES) return json({ error: 'image too large (8 MB max)' }, 413);

  const ext = contentType.split('/')[1].replace('jpeg', 'jpg');
  try {
    const blob = await put(`reveal-shots/shot.${ext}`, bytes, {
      access: 'public',
      addRandomSuffix: true,
      contentType,
    });
    return json({ url: blob.url });
  } catch (err) {
    return json({ error: 'upload failed', detail: String(err) }, 500);
  }
}
