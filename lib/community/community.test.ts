import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { EVENTS } from '../../client/src/data/events.ts';
import { SEEDED_EVENTS } from '../../client/src/lib/community/seed.ts';
import { eventTiming } from '../../client/src/lib/community/timing.ts';
import { validateRegistration } from '../../client/src/lib/community/validate.ts';
import { handleCommunityRequest, isAllowedOrigin, resetCommunityStoreForTests } from './http.ts';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const now = new Date('2026-11-24T12:00:00-07:00');
const futureEnd = '2027-06-18T11:30:00-06:00';

async function withStore(run: (origin: string) => Promise<void>): Promise<void> {
  const dir = await mkdtemp(path.join(tmpdir(), 'community-'));
  process.env.COMMUNITY_DATA_FILE = path.join(dir, 'community.json');
  process.env.ADMIN_API_KEY = 'test-admin-key';
  delete process.env.DATABASE_URL;
  delete process.env.COMMUNITY_EMAIL_ENABLED;
  delete process.env.TURNSTILE_SECRET_KEY;
  resetCommunityStoreForTests();
  try {
    await run('http://127.0.0.1:5173');
  } finally {
    resetCommunityStoreForTests();
    await rm(dir, { recursive: true, force: true });
  }
}

function request(origin: string, method: string, pathname: string, body?: unknown, headers: Record<string, string> = {}) {
  return handleCommunityRequest({
    method,
    url: `${origin}${pathname}`,
    headers: { origin, ...headers },
    body,
  });
}

const tests: Array<[string, () => Promise<void>]> = [
  ['seed is only the real June 2026 workshop and it is past', async () => {
    assert(SEEDED_EVENTS.length === 1, 'seed count');
    const seed = SEEDED_EVENTS[0];
    const june = EVENTS.find((event) => event.slug === seed.id);
    assert(june, 'events.ts missing june workshop');
    assert(seed.start === june.startISO, 'start drift');
    assert(seed.end === june.endISO, 'end drift');
    assert(seed.title === june.title, 'title drift');
    assert(seed.hostBrand === 'foundforai', 'host');
    assert(eventTiming(seed, now) === 'past', 'june must be past in November 2026');
    assert(eventTiming({ ...seed, end: futureEnd }, now) === 'upcoming', 'future stays upcoming');
  }],
  ['public events never list the past workshop as upcoming and omit Event eligibility', async () => {
    await withStore(async (origin) => {
      const response = await request(origin, 'GET', '/api/community/events');
      assert(response.status === 200, 'status');
      const events = (response.body as { events: Array<Record<string, unknown>> }).events;
      assert(events.length === 1, 'only the seeded workshop');
      assert(events[0].timing === 'past', 'timing');
      assert(events[0].schemaEligible === false, 'no event schema for a past workshop');
      assert(events[0].registrationStatus === 'closed', 'registration closed');
      assert(events[0].registrationUrl == null, 'no registration url');
      assert(events[0].hostLabel === 'Hosted by FoundForAI', 'host label');
      assert(String(events[0].dateLabel).includes('June 18, 2026'), 'denver date');
    });
  }],
  ['registration validation separates required workshop consent from optional marketing consent', async () => {
    let threw = false;
    try {
      validateRegistration({
        name: 'Ada',
        email: 'ada@example.com',
        workshopId: 'future-workshop',
        sourceBrand: 'fripse',
        marketingConsent: false,
      });
    } catch (error) {
      threw = true;
      const fields = (error as { fields?: Record<string, string> }).fields;
      assert(fields?.workshopCommunicationConsent, 'consent error');
      assert(!fields?.marketingConsent, 'marketing must stay optional');
    }
    assert(threw, 'missing workshop consent should fail');

    const valid = validateRegistration({
      name: 'Ada',
      email: ' Ada@Example.com ',
      workshopId: 'future-workshop',
      sourceBrand: 'foundforai',
      workshopCommunicationConsent: true,
    });
    assert(valid.emailNormalized === 'ada@example.com', 'normalized email');
    assert(valid.marketingConsent === false, 'marketing defaults off');
    assert(valid.workshopCommunicationConsent === true, 'workshop consent');
  }],
  ['registration dedupes contacts, keeps consents separate, and does not create a commercial opportunity', async () => {
    await withStore(async (origin) => {
      await request(origin, 'POST', '/api/community/admin/events', {
        id: 'future-workshop',
        title: 'Future local test workshop',
        description: 'Used only by the automated test.',
        hostBrand: 'fripse',
        start: '2027-06-18T10:30:00-06:00',
        end: futureEnd,
        timeZone: 'America/Denver',
        venue: 'Salt Lake City',
        onlineUrl: null,
        capacity: 2,
        registrationStatus: 'open',
        topic: 'ChatGPT for business',
        instructor: 'Dustin Crump',
        image: null,
        registrationUrl: null,
      }, { 'x-admin-key': 'test-admin-key' });

      const payload = {
        name: 'Ada Lovelace',
        email: 'Ada@Example.com',
        businessName: 'Analytical Engines',
        businessCategory: 'Professional services',
        workshopId: 'future-workshop',
        learningGoals: 'Shorter client emails',
        workshopCommunicationConsent: true,
        sourceBrand: 'fripse',
      };
      const first = await request(origin, 'POST', '/api/community/registrations', payload);
      assert(first.status === 200, JSON.stringify(first.body));
      const second = await request(origin, 'POST', '/api/community/registrations', {
        ...payload,
        email: 'ada@example.com',
        name: 'Ada L.',
      });
      assert(second.status === 200, 'second status');
      assert((second.body as { alreadyRegistered: boolean }).alreadyRegistered === true, 'idempotent registration');

      const other = await request(origin, 'POST', '/api/community/registrations', {
        ...payload,
        email: 'grace@example.com',
        name: 'Grace',
        marketingConsent: true,
      });
      assert(other.status === 200, 'second person');

      const snapshot = await request(origin, 'GET', '/api/community/admin/snapshot', undefined, {
        'x-admin-key': 'test-admin-key',
      });
      const body = snapshot.body as {
        contacts: Array<{ emailNormalized: string }>;
        registrations: unknown[];
        consents: Array<{ type: string; granted: boolean; contactId: string }>;
        opportunities: unknown[];
        metrics: { upcomingWorkshops: number };
      };
      assert(body.contacts.length === 2, 'deduped contacts');
      assert(body.registrations.length === 2, 'two registrations');
      const ada = body.contacts.find((contact) => contact.emailNormalized === 'ada@example.com');
      assert(ada, 'ada');
      const adaConsents = body.consents.filter((consent) => consent.contactId === (ada as { id?: string }).id || true);
      const workshop = body.consents.filter((consent) => consent.type === 'workshop_communication');
      const marketing = body.consents.filter((consent) => consent.type === 'marketing');
      assert(workshop.length === 2 && workshop.every((consent) => consent.granted), 'workshop consent granted');
      assert(marketing.length === 2, 'marketing consent stored even when declined');
      const declined = marketing.find((consent) => consent.granted === false);
      const accepted = marketing.find((consent) => consent.granted === true);
      assert(declined && accepted, 'marketing choices stay separate');
      assert(body.opportunities.length === 0, 'registration must not create a commercial opportunity');
      assert(body.metrics.upcomingWorkshops === 1, 'future event is upcoming');
      assert(!JSON.stringify(body.consents).includes('token'), 'admin snapshot hides consent tokens');
      void adaConsents;

      const pastAttempt = await request(origin, 'POST', '/api/community/registrations', {
        ...payload,
        email: 'past@example.com',
        workshopId: 'ai-visibility-workshop-june-2026',
      });
      assert(pastAttempt.status === 400, 'past workshop cannot take registration');

      const honeypot = await request(origin, 'POST', '/api/community/registrations', {
        ...payload,
        email: 'bot@example.com',
        companyWebsite: 'https://spam.example',
      });
      assert(honeypot.status === 200, 'honeypot status');
      const after = await request(origin, 'GET', '/api/community/admin/snapshot', undefined, {
        'x-admin-key': 'test-admin-key',
      });
      const contacts = (after.body as { contacts: Array<{ emailNormalized: string }> }).contacts;
      assert(!contacts.some((contact) => contact.emailNormalized === 'bot@example.com'), 'honeypot not stored');
    });
  }],
  ['consent withdrawal flips only the token that was used', async () => {
    await withStore(async (origin) => {
      await request(origin, 'POST', '/api/community/admin/events', {
        id: 'future-workshop',
        title: 'Future local test workshop',
        description: 'Used only by the automated test.',
        hostBrand: 'foundforai',
        start: '2027-06-18T10:30:00-06:00',
        end: futureEnd,
        timeZone: 'America/Denver',
        venue: null,
        onlineUrl: 'https://example.com/workshop',
        capacity: null,
        registrationStatus: 'open',
        topic: 'AI visibility',
        instructor: 'Dustin Crump',
        image: null,
        registrationUrl: null,
      }, { 'x-admin-key': 'test-admin-key' });
      const registered = await request(origin, 'POST', '/api/community/registrations', {
        name: 'Ada',
        email: 'ada@example.com',
        workshopId: 'future-workshop',
        workshopCommunicationConsent: true,
        marketingConsent: true,
        sourceBrand: 'foundforai',
      });
      const marketingUrl = (registered.body as { marketingWithdrawUrl: string }).marketingWithdrawUrl;
      const token = new URL(marketingUrl).searchParams.get('token');
      assert(token, 'token');
      const withdrawn = await request(origin, 'POST', '/api/community/consents/withdraw', { token });
      assert(withdrawn.status === 200, 'withdraw');
      assert((withdrawn.body as { type: string }).type === 'marketing', 'type');
      const dbResponse = await request(origin, 'GET', '/api/community/admin/snapshot', undefined, {
        'x-admin-key': 'test-admin-key',
      });
      const consents = (dbResponse.body as { consents: Array<{ type: string; granted: boolean }> }).consents;
      assert(consents.find((consent) => consent.type === 'marketing')?.granted === false, 'marketing withdrawn');
      assert(consents.find((consent) => consent.type === 'workshop_communication')?.granted === true, 'workshop consent remains');
    });
  }],
  ['cors allows the two production sites and preview hosts only', async () => {
    assert(isAllowedOrigin('https://foundforai.com'), 'foundforai');
    assert(isAllowedOrigin('https://fripseai.com'), 'fripse');
    assert(isAllowedOrigin('https://foundforai-git-preview.vercel.app'), 'vercel preview');
    assert(isAllowedOrigin('https://fripse.workers.dev'), 'workers preview');
    assert(isAllowedOrigin('http://127.0.0.1:5173'), 'local');
    assert(!isAllowedOrigin('https://evil.example'), 'other site');
    assert(!isAllowedOrigin(null), 'missing');
  }],
  ['unapproved testimonials stay off the public list', async () => {
    await withStore(async (origin) => {
      await request(origin, 'POST', '/api/community/admin/testimonials', {
        quote: 'Not approved',
        attribution: 'Someone',
        approved: false,
        publishingPermission: true,
        sourceBrand: 'foundforai',
      }, { 'x-admin-key': 'test-admin-key' });
      await request(origin, 'POST', '/api/community/admin/testimonials', {
        quote: 'Approved but private',
        attribution: 'Someone else',
        approved: true,
        publishingPermission: false,
        sourceBrand: 'fripse',
      }, { 'x-admin-key': 'test-admin-key' });
      const response = await request(origin, 'GET', '/api/community/testimonials');
      assert(JSON.stringify((response.body as { testimonials: unknown[] }).testimonials) === '[]', 'empty public list');
    });
  }],
];

let failed = 0;
for (const [name, run] of tests) {
  try {
    await run();
    console.log(`ok  ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`fail  ${name}`);
    console.error(error instanceof Error ? error.stack || error.message : error);
  }
}

if (failed > 0) {
  console.error(`\n${failed} test(s) failed`);
  process.exit(1);
}

console.log(`\n${tests.length} tests passed`);
