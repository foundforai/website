import type { CommunityEvent, EventTiming, PublicEvent } from './types.ts';

const DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Denver',
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const TIME_FORMAT = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Denver',
  hour: 'numeric',
  minute: '2-digit',
  timeZoneName: 'short',
});

export function eventEndMs(event: Pick<CommunityEvent, 'end' | 'id'>): number {
  const ms = Date.parse(event.end);
  if (!Number.isFinite(ms)) {
    throw new Error(`Invalid end datetime for ${event.id}`);
  }
  return ms;
}

/** Upcoming only while the event has not ended. A past end can never stay upcoming. */
export function eventTiming(event: Pick<CommunityEvent, 'end' | 'id'>, now: Date = new Date()): EventTiming {
  return eventEndMs(event) > now.getTime() ? 'upcoming' : 'past';
}

export function hostLabel(brand: CommunityEvent['hostBrand']): PublicEvent['hostLabel'] {
  return brand === 'fripse' ? 'Hosted by Fripse AI' : 'Hosted by FoundForAI';
}

export function formatEventDate(iso: string): string {
  return DATE_FORMAT.format(new Date(iso));
}

export function formatEventTime(start: string, end: string): string {
  return `${TIME_FORMAT.format(new Date(start))} to ${TIME_FORMAT.format(new Date(end))}`;
}

export function toPublicEvent(
  event: CommunityEvent,
  registeredCount: number,
  now: Date = new Date(),
): PublicEvent {
  const timing = eventTiming(event, now);
  const open = timing === 'upcoming' && event.registrationStatus === 'open';
  return {
    ...event,
    timing,
    hostLabel: hostLabel(event.hostBrand),
    dateLabel: formatEventDate(event.start),
    timeLabel: formatEventTime(event.start, event.end),
    registeredCount,
    seatsRemaining: event.capacity == null ? null : Math.max(0, event.capacity - registeredCount),
    registrationStatus: open ? 'open' : 'closed',
    registrationUrl: timing === 'upcoming' ? event.registrationUrl : null,
    schemaEligible: timing === 'upcoming',
  };
}
