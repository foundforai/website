import { buildRegistrationEmail, deliverRegistrationEmail } from '../../client/src/lib/community/email.ts';
import { CommunityHttpError, honeypotTripped, validateEventInput, validateHostingRequest, validateRegistration } from '../../client/src/lib/community/validate.ts';
import { getCommunityStore, resetCommunityStoreForTests } from './store.ts';

export { resetCommunityStoreForTests };

type HeaderValue = string | string[] | undefined;

export type CommunityRequest = {
  method: string;
  url: string;
  headers: Record<string, HeaderValue> | Headers;
  body?: unknown;
};

export type CommunityResponse = {
  status: number;
  headers: Record<string, string>;
  body: unknown;
};

const PRODUCTION_ORIGINS = new Set([
  'https://foundforai.com',
  'https://www.foundforai.com',
  'https://fripseai.com',
  'https://www.fripseai.com',
  'https://fripse.com',
  'https://www.fripse.com',
]);

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (PRODUCTION_ORIGINS.has(origin)) return true;
  try {
    const url = new URL(origin);
    const host = url.hostname;
    if (url.protocol === 'http:' && (host === 'localhost' || host === '127.0.0.1')) return true;
    if (url.protocol === 'https:' && (host.endsWith('.vercel.app') || host.endsWith('.workers.dev'))) return true;
  } catch {
    return false;
  }
  return false;
}

function header(headers: CommunityRequest['headers'], name: string): string {
  if (headers instanceof Headers) return headers.get(name) || '';
  const value = headers[name] ?? headers[name.toLowerCase()];
  if (Array.isArray(value)) return value[0] || '';
  return value || '';
}

function originOf(request: CommunityRequest): string {
  return header(request.headers, 'origin');
}

function corsHeaders(request: CommunityRequest): Record<string, string> {
  const headers: Record<string, string> = {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    vary: 'Origin',
  };
  const origin = originOf(request);
  if (isAllowedOrigin(origin)) {
    headers['access-control-allow-origin'] = origin;
    headers['access-control-allow-methods'] = 'GET, POST, PATCH, OPTIONS';
    headers['access-control-allow-headers'] = 'content-type, x-admin-key';
    headers['access-control-max-age'] = '86400';
  }
  return headers;
}

function siteOrigin(request: CommunityRequest): string {
  const origin = originOf(request);
  if (isAllowedOrigin(origin)) return origin;
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

function clientIp(request: CommunityRequest): string {
  const forwarded = header(request.headers, 'x-forwarded-for').split(',')[0]?.trim();
  return forwarded || 'local';
}

async function maybeTurnstile(request: CommunityRequest, body: unknown): Promise<void> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return;
  const token = body && typeof body === 'object' ? (body as Record<string, unknown>).turnstileToken : '';
  if (typeof token !== 'string' || !token) {
    throw new CommunityHttpError(400, 'Complete the spam check.', { turnstile: 'Complete the spam check.' });
  }
  const payload = new URLSearchParams({ secret, response: token, remoteip: clientIp(request) });
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: payload,
  });
  const result = (await response.json()) as { success?: boolean };
  if (!result.success) {
    throw new CommunityHttpError(400, 'Spam check failed.', { turnstile: 'Spam check failed.' });
  }
}

function assertAdmin(request: CommunityRequest): void {
  const expected = process.env.ADMIN_API_KEY || '';
  if (!expected) {
    throw new CommunityHttpError(503, 'ADMIN_API_KEY is not set on this deployment.');
  }
  const provided = header(request.headers, 'x-admin-key');
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    throw new CommunityHttpError(401, 'Unauthorized.');
  }
}

function timingSafeEqual(a: string, b: string): boolean {
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

function pathOf(request: CommunityRequest): string {
  const pathname = new URL(request.url).pathname.replace(/\/+$/, '');
  return pathname || '/';
}

export async function handleCommunityRequest(request: CommunityRequest): Promise<CommunityResponse> {
  const headers = corsHeaders(request);
  if (request.method === 'OPTIONS') {
    return { status: 204, headers, body: null };
  }
  try {
    const body = await route(request);
    return { status: 200, headers, body };
  } catch (error) {
    if (error instanceof CommunityHttpError) {
      return {
        status: error.status,
        headers,
        body: { error: error.message, fields: error.fields ?? null },
      };
    }
    console.error('community api error', error instanceof Error ? error.message : error);
    return { status: 500, headers, body: { error: 'Something went wrong.' } };
  }
}

async function route(request: CommunityRequest): Promise<unknown> {
  const path = pathOf(request);
  const method = request.method.toUpperCase();
  const store = getCommunityStore();
  const suffix = path.replace(/^\/api\/community/, '') || '/';

  if (method === 'GET' && suffix === '/events') return { events: await store.listPublicEvents() };
  if (method === 'GET' && suffix === '/testimonials') return { testimonials: await store.listPublicTestimonials() };
  if (method === 'POST' && suffix === '/registrations') return register(request);
  if (method === 'POST' && suffix === '/hosting-requests') return host(request);
  if (method === 'POST' && suffix === '/consents/withdraw') return withdraw(request);
  if (suffix.startsWith('/admin')) return admin(request, suffix);
  throw new CommunityHttpError(404, 'Not found.');
}

async function register(request: CommunityRequest): Promise<unknown> {
  if (honeypotTripped(request.body)) return { ok: true };
  await maybeTurnstile(request, request.body);
  const input = validateRegistration(request.body);
  const result = await getCommunityStore().register(input, { ip: clientIp(request), origin: siteOrigin(request) });
  const events = await getCommunityStore().listPublicEvents();
  const event = events.find((item) => item.id === input.workshopId);
  if (event) {
    const message = buildRegistrationEmail({
      to: input.email,
      name: input.name,
      event,
      marketingConsent: input.marketingConsent,
      workshopWithdrawUrl: result.workshopWithdrawUrl,
      marketingWithdrawUrl: result.marketingWithdrawUrl,
    });
    const delivery = await deliverRegistrationEmail(message);
    return { ...result, email: { sent: delivery.sent, reason: delivery.reason } };
  }
  return result;
}

async function host(request: CommunityRequest): Promise<unknown> {
  if (honeypotTripped(request.body)) return { ok: true };
  await maybeTurnstile(request, request.body);
  const input = validateHostingRequest(request.body);
  const result = await getCommunityStore().requestHosting(input, { ip: clientIp(request) });
  return { ok: true, id: result.id };
}

async function withdraw(request: CommunityRequest): Promise<unknown> {
  const token = request.body && typeof request.body === 'object' ? (request.body as Record<string, unknown>).token : '';
  if (typeof token !== 'string' || token.length < 16) {
    throw new CommunityHttpError(400, 'Missing consent token.', { token: 'Missing consent token.' });
  }
  return getCommunityStore().withdraw(token);
}

async function admin(request: CommunityRequest, suffix: string): Promise<unknown> {
  assertAdmin(request);
  const method = request.method.toUpperCase();
  const store = getCommunityStore();
  if (method === 'GET' && suffix === '/admin/snapshot') return store.snapshot();
  if (method === 'POST' && suffix === '/admin/events') {
    const event = await store.saveEvent(validateEventInput(request.body));
    return { ok: true, event };
  }
  if (method === 'POST' && suffix === '/admin/attendance') {
    const body = record(request.body);
    const status = body.status;
    if (status !== 'unknown' && status !== 'attended' && status !== 'no_show') {
      throw new CommunityHttpError(400, 'Invalid attendance status.');
    }
    if (typeof body.registrationId !== 'string') throw new CommunityHttpError(400, 'Missing registration.');
    await store.setAttendance(body.registrationId, status);
    return { ok: true };
  }
  if (method === 'POST' && suffix === '/admin/follow-up') {
    const body = record(request.body);
    const status = body.status;
    if (status !== 'none' && status !== 'needed' && status !== 'scheduled' && status !== 'done') {
      throw new CommunityHttpError(400, 'Invalid follow-up status.');
    }
    if (typeof body.contactId !== 'string') throw new CommunityHttpError(400, 'Missing contact.');
    await store.setFollowUp(body.contactId, status, typeof body.note === 'string' ? body.note : '');
    return { ok: true };
  }
  if (method === 'POST' && suffix === '/admin/opportunities') {
    const body = record(request.body);
    const row = await store.saveOpportunity({
      originatingBrand: body.originatingBrand === 'fripse' ? 'fripse' : 'foundforai',
      kind: body.kind === 'assessment' ? 'assessment' : 'inquiry',
      status: opportunityStatus(body.status),
      title: typeof body.title === 'string' ? body.title.slice(0, 160) : 'Untitled',
      notes: typeof body.notes === 'string' ? body.notes.slice(0, 2000) : '',
      contactEmail: typeof body.contactEmail === 'string' ? body.contactEmail : null,
    });
    return { ok: true, opportunity: row };
  }
  if (method === 'POST' && suffix === '/admin/assessments') {
    const body = record(request.body);
    const row = await store.saveAssessment({
      contactId: null,
      name: typeof body.name === 'string' ? body.name.slice(0, 120) : '',
      email: typeof body.email === 'string' ? body.email.slice(0, 200) : '',
      businessName: typeof body.businessName === 'string' ? body.businessName : null,
      notes: typeof body.notes === 'string' ? body.notes.slice(0, 2000) : '',
      originatingBrand: body.originatingBrand === 'foundforai' ? 'foundforai' : 'fripse',
    });
    return { ok: true, assessment: row };
  }
  if (method === 'POST' && suffix === '/admin/partners') {
    const body = record(request.body);
    const status = body.status;
    const partnerStatus = status === 'conversation' || status === 'active' || status === 'paused' || status === 'research' ? status : 'research';
    const row = await store.savePartner({
      name: typeof body.name === 'string' ? body.name.slice(0, 160) : '',
      organizationType: typeof body.organizationType === 'string' ? body.organizationType.slice(0, 80) : '',
      status: partnerStatus,
      notes: typeof body.notes === 'string' ? body.notes.slice(0, 2000) : '',
      sourceBrand: body.sourceBrand === 'fripse' ? 'fripse' : 'foundforai',
    });
    return { ok: true, partner: row };
  }
  if (method === 'POST' && suffix === '/admin/testimonials') {
    const body = record(request.body);
    const row = await store.saveTestimonial({
      quote: typeof body.quote === 'string' ? body.quote.slice(0, 1000) : '',
      attribution: typeof body.attribution === 'string' ? body.attribution.slice(0, 160) : '',
      detail: typeof body.detail === 'string' ? body.detail.slice(0, 160) : null,
      approved: body.approved === true,
      publishingPermission: body.publishingPermission === true,
      sourceBrand: body.sourceBrand === 'fripse' ? 'fripse' : 'foundforai',
    });
    return { ok: true, testimonial: row };
  }
  if (method === 'POST' && suffix === '/admin/feedback') {
    const body = record(request.body);
    await store.saveFeedback(
      typeof body.note === 'string' ? body.note : '',
      body.sourceBrand === 'fripse' ? 'fripse' : 'foundforai',
      typeof body.eventId === 'string' ? body.eventId : null,
    );
    return { ok: true };
  }
  if (method === 'POST' && suffix === '/admin/outcomes') {
    const body = record(request.body);
    await store.saveOutcome(typeof body.note === 'string' ? body.note : '', body.sourceBrand === 'fripse' ? 'fripse' : 'foundforai');
    return { ok: true };
  }
  throw new CommunityHttpError(404, 'Not found.');
}

function record(body: unknown): Record<string, unknown> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new CommunityHttpError(400, 'Invalid submission.');
  }
  return body as Record<string, unknown>;
}

function opportunityStatus(value: unknown): 'new' | 'qualified' | 'proposal' | 'won' | 'lost' {
  if (value === 'qualified' || value === 'proposal' || value === 'won' || value === 'lost' || value === 'new') return value;
  return 'new';
}
