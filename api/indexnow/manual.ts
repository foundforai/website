// Token-protected manual IndexNow submission endpoint. POST only.
//
//   curl -X POST https://foundforai.com/api/indexnow/manual \
//     -H "x-admin-key: $ADMIN_API_KEY" \
//     -H "Content-Type: application/json" \
//     -d '{"urls":["https://foundforai.com/blog/new-post"]}'
//
// Auth: x-admin-key header must match ADMIN_API_KEY env var. Returns 503
// if the env var isn't set on the deployment.

import { submitUrls } from '../../lib/indexnow';

export const config = { runtime: 'edge' };

interface RequestBody {
  urls?: unknown;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return Response.json(
      { error: 'method not allowed; use POST' },
      { status: 405, headers: { allow: 'POST' } }
    );
  }

  const expected = process.env.ADMIN_API_KEY;
  if (!expected) {
    return Response.json(
      {
        error: 'ADMIN_API_KEY env var is not set on this deployment',
        hint:
          'Add ADMIN_API_KEY in Project Settings > Environment Variables in Vercel, then redeploy.',
      },
      { status: 503 }
    );
  }

  const provided = request.headers.get('x-admin-key') || '';
  if (provided !== expected) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return Response.json({ error: 'invalid JSON body' }, { status: 400 });
  }

  if (
    !Array.isArray(body.urls) ||
    body.urls.length === 0 ||
    !body.urls.every((u) => typeof u === 'string')
  ) {
    return Response.json(
      { error: 'body must be { urls: string[] } and urls must be non-empty' },
      { status: 400 }
    );
  }

  const result = await submitUrls(body.urls as string[]);
  return Response.json(result);
}
