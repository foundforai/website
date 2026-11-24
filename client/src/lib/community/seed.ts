import type { CommunityEvent } from './types.ts';

/**
 * The only seeded event. It is the June 18, 2026 Holladay workshop already
 * published on foundforai.com. Do not add invented events here.
 */
export const SEEDED_EVENTS: CommunityEvent[] = [
  {
    id: 'ai-visibility-workshop-june-2026',
    title: 'AI Visibility Workshop: Get Your Business Found For AI',
    description:
      'A one-hour, in-person workshop held on June 18, 2026 at Kiln in Holladay, Utah. It focused on what ChatGPT, Gemini, Perplexity, and Claude read on a small business website, and the changes that help them recommend the business.',
    hostBrand: 'foundforai',
    start: '2026-06-18T10:30:00-06:00',
    end: '2026-06-18T11:30:00-06:00',
    timeZone: 'America/Denver',
    venue: 'Kiln, 1895 E Rodeo Walk Dr Suite B200, Holladay, UT 84117',
    onlineUrl: null,
    capacity: null,
    registrationStatus: 'closed',
    topic: 'AI visibility for small business websites',
    instructor: 'Dustin Crump and Brian Jolley',
    image: 'https://foundforai.com/events/june-2026-workshop-1.jpg',
    registrationUrl: null,
  },
];

export function mergeEvents(stored: CommunityEvent[]): CommunityEvent[] {
  const byId = new Map<string, CommunityEvent>();
  for (const event of SEEDED_EVENTS) byId.set(event.id, event);
  for (const event of stored) byId.set(event.id, event);
  return Array.from(byId.values()).sort((a, b) => a.start.localeCompare(b.start));
}
