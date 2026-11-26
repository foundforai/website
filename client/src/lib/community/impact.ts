import { mergeEvents } from './seed.ts';
import { eventTiming } from './timing.ts';
import type { CommunityDatabase, HostBrand } from './types.ts';

/**
 * Monthly summary from recorded rows only. Counts are not outcomes, and this
 * text does not infer revenue, rankings, or attendance that was not marked.
 */
export function buildImpactSummary(db: CommunityDatabase, now: Date = new Date()): string {
  const events = mergeEvents(db.events);
  const upcoming = events.filter((event) => eventTiming(event, now) === 'upcoming');
  const previous = events.filter((event) => eventTiming(event, now) === 'past');
  const attended = db.attendance.filter((row) => row.status === 'attended');
  const businesses = new Set(
    attended
      .map((row) => db.registrations.find((registration) => registration.id === row.registrationId))
      .map((registration) => registration && db.contacts.find((contact) => contact.id === registration.contactId))
      .map((contact) => contact?.businessName?.trim())
      .filter((name): name is string => Boolean(name)),
  );
  const month = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Denver',
    month: 'long',
    year: 'numeric',
  }).format(now);

  const lines = [
    `# Community impact summary, ${month}`,
    '',
    'Figures below are counts of records in the community store. They are not estimates.',
    '',
    `- Upcoming workshops: ${upcoming.length}`,
    `- Previous workshops on record: ${previous.length}`,
    `- Registrations: ${db.registrations.length}`,
    `- Registrations marked attended: ${attended.length}`,
    `- Businesses assisted (unique business names on attended registrations): ${businesses.size}`,
    `- Partner records in conversation: ${db.partners.filter((partner) => partner.status === 'conversation').length}`,
    `- Feedback notes: ${db.feedback.length}`,
    `- Outcome notes: ${db.outcomes.length}`,
    `- Workshop hosting requests: ${db.hostingRequests.length}`,
    '',
    '## By host brand',
    '',
    brandBlock('foundforai', db),
    '',
    brandBlock('fripse', db),
    '',
    '## Commercial pipeline (separate from community participation)',
    '',
    `- Assessment inquiries: ${db.assessmentRequests.length}`,
    `- FoundForAI commercial inquiries: ${countInquiries(db, 'foundforai')}`,
    `- Fripse commercial inquiries: ${countInquiries(db, 'fripse')}`,
    `- Qualified opportunities: ${db.opportunities.filter((row) => row.status === 'qualified').length}`,
    `- Proposals: ${db.opportunities.filter((row) => row.status === 'proposal').length}`,
    `- Projects won: ${db.opportunities.filter((row) => row.status === 'won').length}`,
    '',
    'No testimonials are included unless a record is approved and has publishing permission.',
    `Approved testimonials with publishing permission: ${
      db.testimonials.filter((item) => item.approved && item.publishingPermission).length
    }`,
    '',
    'Founder review required before this summary is shared.',
  ];
  return lines.join('\n');
}

function brandBlock(brand: HostBrand, db: CommunityDatabase): string {
  const label = brand === 'fripse' ? 'Fripse AI' : 'FoundForAI';
  const registrations = db.registrations.filter((row) => row.sourceBrand === brand).length;
  return `### ${label}\n- Registrations attributed to this site: ${registrations}\n- Hosting requests from this site: ${
    db.hostingRequests.filter((row) => row.sourceBrand === brand).length
  }`;
}

function countInquiries(db: CommunityDatabase, brand: HostBrand): number {
  return db.opportunities.filter((row) => row.originatingBrand === brand && row.kind === 'inquiry').length;
}
