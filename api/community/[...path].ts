import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleCommunityRequest } from '../../lib/community/http.ts';

export const config = { runtime: 'nodejs', api: { bodyParser: false } };

const MAX_BYTES = 50_000;

function headerMap(req: IncomingMessage): Record<string, string | string[] | undefined> {
  return req.headers;
}

async function readBody(req: IncomingMessage): Promise<unknown> {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') return undefined;
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > MAX_BYTES) {
      const error = new Error('payload too large');
      (error as Error & { statusCode?: number }).statusCode = 413;
      throw error;
    }
    chunks.push(buffer);
  }
  if (size === 0) return undefined;
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const host = req.headers.host || 'foundforai.com';
  const proto = headerMap(req)['x-forwarded-proto'];
  const protocol = (Array.isArray(proto) ? proto[0] : proto) || 'https';
  try {
    const body = await readBody(req);
    const result = await handleCommunityRequest({
      method: req.method || 'GET',
      url: `${protocol}://${host}${req.url || '/api/community'}`,
      headers: req.headers,
      body,
    });
    res.statusCode = result.status;
    for (const [key, value] of Object.entries(result.headers)) res.setHeader(key, String(value));
    res.end(result.body == null ? '' : JSON.stringify(result.body));
  } catch (error) {
    const status = (error as { statusCode?: number }).statusCode;
    res.statusCode = status === 413 ? 413 : 400;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: status === 413 ? 'Payload too large.' : 'Invalid JSON.' }));
  }
}
