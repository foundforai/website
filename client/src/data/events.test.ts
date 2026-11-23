import {
  EVENTS,
  buildEventSchema,
  eventEndMs,
  isHeld,
  isUpcoming,
  pastEvents,
  upcomingEvents,
  type EventCard,
} from './events.ts';
import {
  COMMUNITY_TESTIMONIALS,
  EARLIER_MEETUP_PHOTOS,
  JUNE_2026_WORKSHOP_PHOTOS,
} from './community.ts';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const june = EVENTS.find((event) => event.slug === 'ai-visibility-workshop-june-2026');

function withStatus(status: EventCard['status'], endISO: string): EventCard {
  if (!june) throw new Error('june event missing');
  return { ...june, status, endISO, slug: `fixture-${status}` };
}

const tests: Array<[string, () => void]> = [
  ['june workshop is a confirmed past event on the original date', () => {
    assert(june, 'june event missing');
    assert(june.status === 'past', 'status should be past');
    assert(june.startISO === '2026-06-18T10:30:00-06:00', 'start changed');
    assert(june.endISO === '2026-06-18T11:30:00-06:00', 'end changed');
    assert(june.dateLabel === 'Thursday, June 18, 2026', 'date label changed');
    assert(isHeld(june), 'should be held');
    assert(!isUpcoming(june, new Date('2026-11-23T12:00:00-07:00')), 'should not be upcoming in November 2026');
    assert(pastEvents().some((event) => event.slug === june.slug), 'missing from past list');
    assert(!upcomingEvents(new Date('2026-11-23T12:00:00-07:00')).some((event) => event.slug === june.slug), 'still upcoming');
  }],
  ['a past end time removes an unconfirmed event from upcoming without marking it held', () => {
    const expired = withStatus('upcoming', '2026-06-18T11:30:00-06:00');
    const now = new Date('2026-11-23T12:00:00-07:00');
    assert(!isUpcoming(expired, now), 'expired upcoming should not stay upcoming');
    assert(!isHeld(expired), 'expired upcoming is not confirmed held');
    assert(eventEndMs(expired) < now.getTime(), 'end should be before now');
  }],
  ['a future upcoming event stays upcoming and can keep an offer', () => {
    const future = withStatus('upcoming', '2027-06-18T11:30:00-06:00');
    const now = new Date('2026-11-23T12:00:00-07:00');
    assert(isUpcoming(future, now), 'future event should be upcoming');
    const schema = buildEventSchema(future, now);
    assert(schema.eventStatus === 'https://schema.org/EventScheduled', 'status');
    assert(schema.offers, 'upcoming event should keep its offer');
  }],
  ['held june schema keeps the original schedule and drops registration', () => {
    assert(june, 'june event missing');
    const schema = buildEventSchema(june, new Date('2026-11-23T12:00:00-07:00'));
    assert(schema.eventStatus === 'https://schema.org/EventScheduled', 'scheduled');
    assert(schema.startDate === '2026-06-18T10:30:00-06:00', 'start');
    assert(schema.endDate === '2026-06-18T11:30:00-06:00', 'end');
    assert(!('offers' in schema), 'past event must not offer registration');
    const json = JSON.stringify(schema);
    assert(!json.includes('EventCancelled'), 'must not say cancelled');
    assert(!json.includes('EventCompleted'), 'must not invent EventCompleted');
    assert(!json.includes('luma.com'), 'registration url must not be in schema');
  }],
  ['workshop photos are real files with factual text and no named people', () => {
    assert(JUNE_2026_WORKSHOP_PHOTOS.length === 3, 'expected 3 photos');
    assert(EARLIER_MEETUP_PHOTOS.length === 0, 'no earlier meetup photos were supplied');
    assert(COMMUNITY_TESTIMONIALS.length === 0, 'no testimonials were supplied');
    for (const photo of JUNE_2026_WORKSHOP_PHOTOS) {
      assert(photo.src.startsWith('/events/june-2026-workshop-'), photo.src);
      assert(photo.width > 0 && photo.height > 0, 'dimensions');
      assert(photo.alt.trim().length > 0, 'alt');
      const text = `${photo.alt} ${photo.caption ?? ''}`;
      assert(!text.includes('—'), 'em dash');
      assert(!/dustin|brian|tesla|385-993-4305/i.test(text), 'named person or phone in photo text');
      assert(!/coming soon|placeholder/i.test(text), 'placeholder copy');
    }
  }],
];

let failed = 0;
for (const [name, run] of tests) {
  try {
    run();
    console.log(`ok  ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`fail  ${name}`);
    console.error(err instanceof Error ? err.message : err);
  }
}

if (failed > 0) {
  console.error(`\n${failed} test(s) failed`);
  process.exit(1);
}

console.log(`\n${tests.length} tests passed`);
