import type { PublicEvent } from './types.ts';

/** Event structured data for a real upcoming workshop only. */
export function upcomingEventSchema(event: PublicEvent): Record<string, unknown> | null {
  if (!event.schemaEligible) return null;
  const organizer =
    event.hostBrand === 'fripse'
      ? { '@type': 'Organization', name: 'Fripse AI', url: 'https://fripseai.com' }
      : { '@type': 'Organization', name: 'Found For AI', url: 'https://foundforai.com' };
  const location = event.onlineUrl && !event.venue
    ? { '@type': 'VirtualLocation', url: event.onlineUrl }
    : {
        '@type': 'Place',
        name: event.venue || 'To be announced',
        ...(event.onlineUrl ? { url: event.onlineUrl } : {}),
      };
  const schema: Record<string, unknown> = {
    '@type': 'EducationEvent',
    '@id': `https://foundforai.com/events#${event.id}`,
    name: event.title,
    description: event.description,
    startDate: event.start,
    endDate: event.end,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: event.onlineUrl && !event.venue
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location,
    organizer,
    performer: [{ '@type': 'Person', name: event.instructor }],
  };
  if (event.image) schema.image = [event.image];
  if (event.registrationStatus === 'open') {
    schema.offers = {
      '@type': 'Offer',
      url: 'https://foundforai.com/events#register',
      price: '0',
      priceCurrency: 'USD',
      availability: event.seatsRemaining === 0 ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    };
  }
  return schema;
}
