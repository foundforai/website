import { randomBytes, randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { buildImpactSummary } from '../../client/src/lib/community/impact.ts';
import { mergeEvents } from '../../client/src/lib/community/seed.ts';
import { eventTiming, toPublicEvent } from '../../client/src/lib/community/timing.ts';
import {
  emptyDatabase,
  type AssessmentRequest,
  type AttendanceStatus,
  type CommunityDatabase,
  type CommunityEvent,
  type Consent,
  type Contact,
  type FollowUpStatus,
  type HostBrand,
  type Opportunity,
  type Partner,
  type PublicEvent,
  type PublicTestimonial,
  type Testimonial,
} from '../../client/src/lib/community/types.ts';
import {
  CommunityHttpError,
  type ValidEventInput,
  type ValidHostingRequest,
  type ValidRegistration,
} from '../../client/src/lib/community/validate.ts';

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 8;

export type RegisterResult = {
  ok: true;
  alreadyRegistered: boolean;
  registrationId: string;
  contactId: string;
  workshopWithdrawUrl: string;
  marketingWithdrawUrl: string;
};

export type CommunityStore = {
  listPublicEvents(now?: Date): Promise<PublicEvent[]>;
  listPublicTestimonials(): Promise<PublicTestimonial[]>;
  register(input: ValidRegistration, meta: { ip: string; origin: string }, now?: Date): Promise<RegisterResult>;
  requestHosting(input: ValidHostingRequest, meta: { ip: string }, now?: Date): Promise<{ id: string }>;
  withdraw(token: string, now?: Date): Promise<{ ok: true; type: Consent['type'] }>;
  snapshot(now?: Date): Promise<AdminSnapshot>;
  saveEvent(input: ValidEventInput): Promise<CommunityEvent>;
  setAttendance(registrationId: string, status: AttendanceStatus, now?: Date): Promise<void>;
  setFollowUp(contactId: string, status: FollowUpStatus, note: string, now?: Date): Promise<void>;
  savePartner(input: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }, now?: Date): Promise<Partner>;
  saveOpportunity(input: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }, now?: Date): Promise<Opportunity>;
  saveTestimonial(input: Omit<Testimonial, 'id' | 'createdAt'> & { id?: string }, now?: Date): Promise<Testimonial>;
  saveAssessment(input: Omit<AssessmentRequest, 'id' | 'createdAt'>, now?: Date): Promise<AssessmentRequest>;
  saveFeedback(note: string, sourceBrand: HostBrand, eventId: string | null, now?: Date): Promise<void>;
  saveOutcome(note: string, sourceBrand: HostBrand, now?: Date): Promise<void>;
  readDatabase(): Promise<CommunityDatabase>;
};

export type AdminSnapshot = {
  generatedAt: string;
  events: PublicEvent[];
  contacts: Contact[];
  registrations: CommunityDatabase['registrations'];
  attendance: CommunityDatabase['attendance'];
  consents: Array<Omit<Consent, 'token'>>;
  hostingRequests: CommunityDatabase['hostingRequests'];
  assessmentRequests: AssessmentRequest[];
  partners: Partner[];
  opportunities: Opportunity[];
  testimonials: Testimonial[];
  feedback: CommunityDatabase['feedback'];
  outcomes: CommunityDatabase['outcomes'];
  followUps: CommunityDatabase['followUps'];
  metrics: {
    upcomingWorkshops: number;
    registrations: number;
    attendance: number;
    businessesAssisted: number;
    partnerConversations: number;
    feedback: number;
    outcomes: number;
    assessmentInquiries: number;
    foundforaiInquiries: number;
    fripseInquiries: number;
    qualifiedOpportunities: number;
    proposals: number;
    projectsWon: number;
  };
  impactSummary: string;
};

function nowIso(now: Date): string {
  return now.toISOString();
}

function token(): string {
  return randomBytes(24).toString('hex');
}

type DocumentPersistence = {
  load: () => Promise<CommunityDatabase>;
  save: (db: CommunityDatabase) => Promise<void>;
};

export class DocumentCommunityStore implements CommunityStore {
  private queue: Promise<unknown> = Promise.resolve();
  private readonly persistence: DocumentPersistence;

  constructor(persistence: DocumentPersistence) {
    this.persistence = persistence;
  }

  private async update<T>(fn: (db: CommunityDatabase) => Promise<T> | T): Promise<T> {
    const run = this.queue.then(async () => {
      const db = await this.load();
      const result = await fn(db);
      await this.persistence.save(db);
      return result;
    });
    this.queue = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }

  private async load(): Promise<CommunityDatabase> {
    return this.persistence.load();
  }

  async readDatabase(): Promise<CommunityDatabase> {
    return this.load();
  }

  async listPublicEvents(now: Date = new Date()): Promise<PublicEvent[]> {
    const db = await this.load();
    return publicEvents(db, now);
  }

  async listPublicTestimonials(): Promise<PublicTestimonial[]> {
    const db = await this.load();
    return db.testimonials
      .filter((item) => item.approved && item.publishingPermission && item.quote && item.attribution)
      .map((item) => ({ quote: item.quote, attribution: item.attribution, detail: item.detail }));
  }

  async register(input: ValidRegistration, meta: { ip: string; origin: string }, now: Date = new Date()): Promise<RegisterResult> {
    return this.update((db) => {
      consumeRate(db, `register:${meta.ip}`, now);
      const event = mergeEvents(db.events).find((item) => item.id === input.workshopId);
      if (!event) throw new CommunityHttpError(404, 'That workshop was not found.', { workshopId: 'Choose a scheduled workshop.' });
      if (eventTiming(event, now) !== 'upcoming' || event.registrationStatus !== 'open') {
        throw new CommunityHttpError(400, 'This workshop is not open for registration.', {
          workshopId: 'This workshop is not open for registration.',
        });
      }
      const registered = db.registrations.filter((row) => row.eventId === event.id).length;
      if (event.capacity != null && registered >= event.capacity) {
        throw new CommunityHttpError(409, 'This workshop is full.');
      }
      const contact = upsertContact(db, input, now);
      const existing = db.registrations.find((row) => row.contactId === contact.id && row.eventId === event.id);
      if (existing) {
        const consents = db.consents.filter((row) => row.registrationId === existing.id);
        return consentUrls(meta.origin, existing.id, contact.id, consents, true);
      }
      const registrationId = randomUUID();
      db.registrations.push({
        id: registrationId,
        contactId: contact.id,
        eventId: event.id,
        learningGoals: input.learningGoals,
        sourceBrand: input.sourceBrand,
        createdAt: nowIso(now),
      });
      db.attendance.push({
        id: randomUUID(),
        registrationId,
        status: 'unknown',
        updatedAt: nowIso(now),
      });
      const workshopConsent = pushConsent(db, {
        contactId: contact.id,
        registrationId,
        hostingRequestId: null,
        type: 'workshop_communication',
        granted: true,
        sourceBrand: input.sourceBrand,
        now,
      });
      const marketingConsent = pushConsent(db, {
        contactId: contact.id,
        registrationId,
        hostingRequestId: null,
        type: 'marketing',
        granted: input.marketingConsent,
        sourceBrand: input.sourceBrand,
        now,
      });
      if (input.learningGoals) {
        db.interests.push({
          id: randomUUID(),
          contactId: contact.id,
          kind: 'learning_goals',
          value: input.learningGoals,
          sourceBrand: input.sourceBrand,
          createdAt: nowIso(now),
        });
      }
      if (input.businessCategory) {
        db.interests.push({
          id: randomUUID(),
          contactId: contact.id,
          kind: 'business_category',
          value: input.businessCategory,
          sourceBrand: input.sourceBrand,
          createdAt: nowIso(now),
        });
      }
      return consentUrls(meta.origin, registrationId, contact.id, [workshopConsent, marketingConsent], false);
    });
  }

  async requestHosting(input: ValidHostingRequest, meta: { ip: string }, now: Date = new Date()): Promise<{ id: string }> {
    return this.update((db) => {
      consumeRate(db, `hosting:${meta.ip}`, now);
      const contact = upsertContact(db, input, now);
      const id = randomUUID();
      db.hostingRequests.push({
        id,
        contactId: contact.id,
        name: input.name,
        email: input.email,
        businessName: input.businessName,
        message: input.message,
        sourceBrand: input.sourceBrand,
        createdAt: nowIso(now),
      });
      pushConsent(db, {
        contactId: contact.id,
        registrationId: null,
        hostingRequestId: id,
        type: 'hosting_contact',
        granted: true,
        sourceBrand: input.sourceBrand,
        now,
      });
      pushConsent(db, {
        contactId: contact.id,
        registrationId: null,
        hostingRequestId: id,
        type: 'marketing',
        granted: input.marketingConsent,
        sourceBrand: input.sourceBrand,
        now,
      });
      return { id };
    });
  }

  async withdraw(tokenValue: string, now: Date = new Date()): Promise<{ ok: true; type: Consent['type'] }> {
    return this.update((db) => {
      const consent = db.consents.find((row) => row.token === tokenValue);
      if (!consent) throw new CommunityHttpError(404, 'This consent link is not valid.');
      consent.granted = false;
      consent.withdrawnAt = nowIso(now);
      return { ok: true as const, type: consent.type };
    });
  }

  async snapshot(now: Date = new Date()): Promise<AdminSnapshot> {
    const db = await this.load();
    const events = publicEvents(db, now);
    const attendedIds = new Set(db.attendance.filter((row) => row.status === 'attended').map((row) => row.registrationId));
    const businesses = new Set(
      db.registrations
        .filter((row) => attendedIds.has(row.id))
        .map((row) => db.contacts.find((contact) => contact.id === row.contactId)?.businessName?.trim())
        .filter((name): name is string => Boolean(name)),
    );
    return {
      generatedAt: nowIso(now),
      events,
      contacts: db.contacts,
      registrations: db.registrations,
      attendance: db.attendance,
      consents: db.consents.map(({ token: _token, ...rest }) => rest),
      hostingRequests: db.hostingRequests,
      assessmentRequests: db.assessmentRequests,
      partners: db.partners,
      opportunities: db.opportunities,
      testimonials: db.testimonials,
      feedback: db.feedback,
      outcomes: db.outcomes,
      followUps: db.followUps,
      metrics: {
        upcomingWorkshops: events.filter((event) => event.timing === 'upcoming').length,
        registrations: db.registrations.length,
        attendance: attendedIds.size,
        businessesAssisted: businesses.size,
        partnerConversations: db.partners.filter((row) => row.status === 'conversation').length,
        feedback: db.feedback.length,
        outcomes: db.outcomes.length,
        assessmentInquiries: db.assessmentRequests.length,
        foundforaiInquiries: db.opportunities.filter((row) => row.originatingBrand === 'foundforai' && row.kind === 'inquiry').length,
        fripseInquiries: db.opportunities.filter((row) => row.originatingBrand === 'fripse' && row.kind === 'inquiry').length,
        qualifiedOpportunities: db.opportunities.filter((row) => row.status === 'qualified').length,
        proposals: db.opportunities.filter((row) => row.status === 'proposal').length,
        projectsWon: db.opportunities.filter((row) => row.status === 'won').length,
      },
      impactSummary: buildImpactSummary(db, now),
    };
  }

  async saveEvent(input: ValidEventInput): Promise<CommunityEvent> {
    return this.update((db) => {
      const event: CommunityEvent = { ...input };
      const index = db.events.findIndex((item) => item.id === event.id);
      if (index >= 0) db.events[index] = event;
      else db.events.push(event);
      return event;
    });
  }

  async setAttendance(registrationId: string, status: AttendanceStatus, now: Date = new Date()): Promise<void> {
    await this.update((db) => {
      const row = db.attendance.find((item) => item.registrationId === registrationId);
      if (!row) throw new CommunityHttpError(404, 'Registration not found.');
      row.status = status;
      row.updatedAt = nowIso(now);
    });
  }

  async setFollowUp(contactId: string, status: FollowUpStatus, note: string, now: Date = new Date()): Promise<void> {
    await this.update((db) => {
      if (!db.contacts.some((contact) => contact.id === contactId)) {
        throw new CommunityHttpError(404, 'Contact not found.');
      }
      const existing = db.followUps.find((row) => row.contactId === contactId);
      if (existing) {
        existing.status = status;
        existing.note = note.slice(0, 2000);
        existing.updatedAt = nowIso(now);
      } else {
        db.followUps.push({
          id: randomUUID(),
          contactId,
          status,
          note: note.slice(0, 2000),
          updatedAt: nowIso(now),
        });
      }
    });
  }

  async savePartner(input: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }, now: Date = new Date()): Promise<Partner> {
    return this.update((db) => {
      const partner: Partner = {
        id: input.id || randomUUID(),
        name: input.name,
        organizationType: input.organizationType,
        status: input.status,
        notes: input.notes,
        sourceBrand: input.sourceBrand,
        createdAt: nowIso(now),
        updatedAt: nowIso(now),
      };
      const index = db.partners.findIndex((row) => row.id === partner.id);
      if (index >= 0) db.partners[index] = { ...db.partners[index], ...partner, createdAt: db.partners[index].createdAt };
      else db.partners.push(partner);
      return index >= 0 ? db.partners[index] : partner;
    });
  }

  async saveOpportunity(
    input: Omit<Opportunity, 'id' | 'createdAt' | 'updatedAt'> & { id?: string },
    now: Date = new Date(),
  ): Promise<Opportunity> {
    return this.update((db) => {
      const row: Opportunity = {
        id: input.id || randomUUID(),
        originatingBrand: input.originatingBrand,
        kind: input.kind,
        status: input.status,
        title: input.title,
        notes: input.notes,
        contactEmail: input.contactEmail,
        createdAt: nowIso(now),
        updatedAt: nowIso(now),
      };
      const index = db.opportunities.findIndex((item) => item.id === row.id);
      if (index >= 0) db.opportunities[index] = { ...db.opportunities[index], ...row, createdAt: db.opportunities[index].createdAt };
      else db.opportunities.push(row);
      return index >= 0 ? db.opportunities[index] : row;
    });
  }

  async saveTestimonial(input: Omit<Testimonial, 'id' | 'createdAt'> & { id?: string }, now: Date = new Date()): Promise<Testimonial> {
    return this.update((db) => {
      const row: Testimonial = {
        id: input.id || randomUUID(),
        quote: input.quote,
        attribution: input.attribution,
        detail: input.detail,
        approved: input.approved,
        publishingPermission: input.publishingPermission,
        sourceBrand: input.sourceBrand,
        createdAt: nowIso(now),
      };
      const index = db.testimonials.findIndex((item) => item.id === row.id);
      if (index >= 0) db.testimonials[index] = row;
      else db.testimonials.push(row);
      return row;
    });
  }

  async saveAssessment(input: Omit<AssessmentRequest, 'id' | 'createdAt'>, now: Date = new Date()): Promise<AssessmentRequest> {
    return this.update((db) => {
      const row: AssessmentRequest = { ...input, id: randomUUID(), createdAt: nowIso(now) };
      db.assessmentRequests.push(row);
      return row;
    });
  }

  async saveFeedback(note: string, sourceBrand: HostBrand, eventId: string | null, now: Date = new Date()): Promise<void> {
    await this.update((db) => {
      db.feedback.push({ id: randomUUID(), eventId, note: note.slice(0, 2000), sourceBrand, createdAt: nowIso(now) });
    });
  }

  async saveOutcome(note: string, sourceBrand: HostBrand, now: Date = new Date()): Promise<void> {
    await this.update((db) => {
      db.outcomes.push({ id: randomUUID(), note: note.slice(0, 2000), sourceBrand, createdAt: nowIso(now) });
    });
  }
}

function publicEvents(db: CommunityDatabase, now: Date): PublicEvent[] {
  return mergeEvents(db.events).map((event) => {
    const registeredCount = db.registrations.filter((row) => row.eventId === event.id).length;
    return toPublicEvent(event, registeredCount, now);
  });
}

function upsertContact(
  db: CommunityDatabase,
  input: { name: string; email: string; emailNormalized: string; businessName: string | null; sourceBrand: HostBrand; businessCategory?: string | null },
  now: Date,
): Contact {
  const existing = db.contacts.find((contact) => contact.emailNormalized === input.emailNormalized);
  if (existing) {
    existing.name = input.name || existing.name;
    existing.updatedAt = nowIso(now);
    if (input.businessName && !existing.businessName) existing.businessName = input.businessName;
    if (input.businessCategory && !existing.businessCategory) existing.businessCategory = input.businessCategory;
    if (input.businessName && !existing.organizationId) {
      existing.organizationId = ensureOrg(db, input.businessName, input.businessCategory ?? null, input.sourceBrand, now);
    }
    return existing;
  }
  const contact: Contact = {
    id: randomUUID(),
    email: input.email,
    emailNormalized: input.emailNormalized,
    name: input.name,
    businessName: input.businessName,
    businessCategory: input.businessCategory ?? null,
    organizationId: input.businessName
      ? ensureOrg(db, input.businessName, input.businessCategory ?? null, input.sourceBrand, now)
      : null,
    sourceBrand: input.sourceBrand,
    createdAt: nowIso(now),
    updatedAt: nowIso(now),
  };
  db.contacts.push(contact);
  return contact;
}

function ensureOrg(db: CommunityDatabase, name: string, category: string | null, sourceBrand: HostBrand, now: Date): string {
  const key = name.trim().toLowerCase();
  const existing = db.organizations.find((org) => org.name.trim().toLowerCase() === key);
  if (existing) return existing.id;
  const id = randomUUID();
  db.organizations.push({ id, name: name.trim(), category, sourceBrand, createdAt: nowIso(now) });
  return id;
}

function pushConsent(
  db: CommunityDatabase,
  input: {
    contactId: string;
    registrationId: string | null;
    hostingRequestId: string | null;
    type: Consent['type'];
    granted: boolean;
    sourceBrand: HostBrand;
    now: Date;
  },
): Consent {
  const row: Consent = {
    id: randomUUID(),
    contactId: input.contactId,
    registrationId: input.registrationId,
    hostingRequestId: input.hostingRequestId,
    type: input.type,
    granted: input.granted,
    sourceBrand: input.sourceBrand,
    createdAt: nowIso(input.now),
    withdrawnAt: null,
    token: token(),
  };
  db.consents.push(row);
  return row;
}

function consentUrls(
  origin: string,
  registrationId: string,
  contactId: string,
  consents: Consent[],
  alreadyRegistered: boolean,
): RegisterResult {
  const base = origin.replace(/\/$/, '');
  const workshop = consents.find((row) => row.type === 'workshop_communication');
  const marketing = consents.find((row) => row.type === 'marketing');
  return {
    ok: true,
    alreadyRegistered,
    registrationId,
    contactId,
    workshopWithdrawUrl: workshop ? `${base}/community/unsubscribe?token=${workshop.token}` : '',
    marketingWithdrawUrl: marketing ? `${base}/community/unsubscribe?token=${marketing.token}` : '',
  };
}

function consumeRate(db: CommunityDatabase, key: string, now: Date): void {
  const cutoff = now.getTime() - RATE_WINDOW_MS;
  let bucket = db.rateLimits.find((row) => row.key === key);
  if (!bucket) {
    bucket = { key, hits: [] };
    db.rateLimits.push(bucket);
  }
  bucket.hits = bucket.hits.filter((hit) => hit >= cutoff);
  if (bucket.hits.length >= RATE_LIMIT) {
    throw new CommunityHttpError(429, 'Too many submissions. Please wait a few minutes and try again.');
  }
  bucket.hits.push(now.getTime());
}

let cached: { key: string; store: CommunityStore } | null = null;

export function communityDataFile(): string {
  return process.env.COMMUNITY_DATA_FILE || path.join(process.cwd(), '.data', 'community.json');
}

export function getCommunityStore(): CommunityStore {
  if (process.env.DATABASE_URL) {
    const key = `pg:${process.env.DATABASE_URL}`;
    if (cached?.key === key) return cached.store;
    const store = createPostgresStore(process.env.DATABASE_URL);
    cached = { key, store };
    return store;
  }
  const file = communityDataFile();
  const key = `file:${file}`;
  if (cached?.key === key) return cached.store;
  const store = new DocumentCommunityStore(filePersistence(file));
  cached = { key, store };
  return store;
}

export function resetCommunityStoreForTests(): void {
  cached = null;
}

function filePersistence(filePath: string): DocumentPersistence {
  return {
    async load() {
      try {
        const raw = await readFile(filePath, 'utf8');
        const parsed = JSON.parse(raw) as CommunityDatabase;
        return { ...emptyDatabase(), ...parsed };
      } catch (error) {
        const code = (error as NodeJS.ErrnoException).code;
        if (code === 'ENOENT') return emptyDatabase();
        throw error;
      }
    },
    async save(db) {
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, JSON.stringify(db, null, 2));
    },
  };
}

function createPostgresStore(databaseUrl: string): CommunityStore {
  return new DocumentCommunityStore({
    load: () => loadPostgresDocument(databaseUrl),
    save: (db) => persistPostgresDocument(databaseUrl, db),
  });
}

type SqlClient = {
  <T = Record<string, unknown>[]>(strings: TemplateStringsArray, ...values: unknown[]): Promise<T>;
  json: (value: unknown) => unknown;
  begin: <T>(fn: (sql: SqlClient) => Promise<T>) => Promise<T>;
  unsafe: (query: string) => Promise<unknown>;
};

async function openPostgres(databaseUrl: string): Promise<SqlClient> {
  try {
    const imported = await import('postgres');
    const postgres = imported.default as unknown as (
      url: string,
      options?: { ssl?: string; max?: number },
    ) => SqlClient;
    return postgres(databaseUrl, { ssl: 'require', max: 1 });
  } catch {
    throw new CommunityHttpError(
      503,
      'DATABASE_URL is set, but the postgres package is not installed. Install it after you provision a database.',
    );
  }
}

async function ensurePostgresSchema(sql: SqlClient): Promise<void> {
  await sql.unsafe(`create table if not exists community_state (
    id text primary key,
    doc jsonb not null,
    updated_at timestamptz not null default now()
  )`);
}

async function loadPostgresDocument(databaseUrl: string): Promise<CommunityDatabase> {
  const sql = await openPostgres(databaseUrl);
  await ensurePostgresSchema(sql);
  const rows = await sql<{ doc: CommunityDatabase }[]>`select doc from community_state where id = 'default'`;
  const doc = rows[0]?.doc;
  return doc ? { ...emptyDatabase(), ...doc } : emptyDatabase();
}

export async function persistPostgresDocument(databaseUrl: string, db: CommunityDatabase): Promise<void> {
  const sql = await openPostgres(databaseUrl);
  await ensurePostgresSchema(sql);
  await sql`insert into community_state (id, doc, updated_at)
    values ('default', ${sql.json(db)}, now())
    on conflict (id) do update set doc = excluded.doc, updated_at = now()`;
}
