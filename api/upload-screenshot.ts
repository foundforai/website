// Upload endpoint for the /reveal sales tool.
//
// The reveal page lets an operator drag/drop a screenshot of a lead's site.
// The browser POSTs the raw image bytes here; this function stores them in
// Vercel Blob and returns a short public URL. That URL is baked into the
// per-lead share link (the `img` query param), so the recipient sees the
// screenshot without the operator having to host it anywhere.
//
// Runtime notes:
// - Node.js (Fluid Compute), NOT Edge: @vercel/blob depends on undici /
//   node:stream, which the Edge runtime cannot bundle.
// - Uses the classic Node (req, res) signature — the Web Request/Response
//   signature only works on Edge for bare /api functions.
// - bodyParser disabled so we read the raw image straight off the request
//   stream: no JSON-parser 1 MB cap and no base64 bloat.
//
// Requires the BLOB_READ_WRITE_TOKEN env var, which Vercel provisions
// automatically when a Blob store is connected to the project. Until then this
// returns a clean 500 and the reveal page falls back to its "paste a URL" field.

import type { IncomingMessage, ServerResponse } from 'node:http';
import { put } from '@vercel/blob';

export const config = { runtime: 'nodejs', api: { bodyParser: false } };

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = /^image\/(png|jpe?g|webp|gif|avif)$/i;

function send(res: ServerResponse, status: number, data: unknown): void {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json');
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(data));
}

async function readBody(req: IncomingMessage): Promise<Buffer> {
  // If a body parser ran despite the config, use what it buffered.
  const pre = (req as IncomingMessage & { body?: unknown }).body;
  if (Buffer.isBuffer(pre)) return pre;

  const chunks: Buffer[] = [];
  let total = 0;
  for await (const chunk of req) {
    const buf = typeof chunk === 'string' ? Buffer.from(chunk) : (chunk as Buffer);
    total += buf.length;
    if (total > MAX_BYTES) throw new Error('too_large');
    chunks.push(buf);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('access-control-allow-origin', '*');
    res.setHeader('access-control-allow-methods', 'POST, OPTIONS');
    res.setHeader('access-control-allow-headers', 'content-type');
    res.end();
    return;
  }
  if (req.method !== 'POST') return send(res, 405, { error: 'method not allowed' });

  const contentType = (req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
  if (!ALLOWED.test(contentType)) {
    return send(res, 415, { error: 'expected an image file (png, jpg, webp, gif, avif)' });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return send(res, 500, { error: 'screenshot storage is not configured yet (no Blob store)' });
  }

  let bytes: Buffer;
  try {
    bytes = await readBody(req);
  } catch (e) {
    if ((e as Error).message === 'too_large') {
      return send(res, 413, { error: 'image too large (8 MB max)' });
    }
    return send(res, 400, { error: 'could not read upload body' });
  }
  if (bytes.byteLength === 0) return send(res, 400, { error: 'empty upload' });

  const ext = contentType.split('/')[1].replace('jpeg', 'jpg');
  try {
    const blob = await put(`reveal-shots/shot.${ext}`, bytes, {
      access: 'public',
      addRandomSuffix: true,
      contentType,
    });
    return send(res, 200, { url: blob.url });
  } catch (err) {
    return send(res, 500, { error: 'upload failed', detail: String(err) });
  }
}
