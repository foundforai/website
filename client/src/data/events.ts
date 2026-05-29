/**
 * Events data — single source of truth for /events hub cards.
 *
 * To add a new event:
 *   1. Append an EventCard entry below (status: "upcoming"). Keep startISO in
 *      full ISO 8601 with timezone offset (e.g. "2026-07-16T10:30:00-06:00").
 *   2. Create a detail page at client/src/pages/Event<Slug>.tsx — copy the
 *      existing EventAIVisibilityWorkshopJune2026.tsx as a starting point.
 *   3. Register the route in client/src/App.tsx and add it to STATIC_ROUTES in
 *      client/src/data/routes.ts (prerender + sitemap).
 *   4. Drop the OG image at client/public/events/<slug>-og.png (1200×630).
 *
 * When an event passes, flip its status to "past". The hub renders upcoming
 * and past lists from this array.
 */

export type EventCard = {
  /** Path segment under /events — must match the route in App.tsx. */
  slug: string;
  /** Full event title for the card heading + page <h1>. */
  title: string;
  /** Hook line shown on the hub card (one sentence). */
  blurb: string;
  /** ISO 8601 with timezone offset — drives schema startDate and sort order. */
  startISO: string;
  /** ISO 8601 with timezone offset — schema endDate. */
  endISO: string;
  /** Display strings — explicit so we never format dates client-side. */
  dateLabel: string;        // "Thursday, June 18, 2026"
  timeLabel: string;        // "10:30–11:30 AM MDT"
  locationLabel: string;    // "Kiln · Holladay, UT"
  cost: string;             // "Free"
  /** External registration URL (Luma, Eventbrite, etc.). Opens in new tab. */
  registerUrl: string;
  /** Lifecycle: hub renders upcoming and past in separate sections. */
  status: "upcoming" | "past";
};

export const EVENTS: EventCard[] = [
  {
    slug: "ai-visibility-workshop-june-2026",
    title: "AI Visibility Workshop: Get Your Business Found For AI",
    blurb:
      "A free, hands-on workshop on what ChatGPT, Gemini, Perplexity, and Claude actually read on your site — and what to fix so they recommend your business.",
    startISO: "2026-06-18T10:30:00-06:00",
    endISO: "2026-06-18T11:30:00-06:00",
    dateLabel: "Thursday, June 18, 2026",
    timeLabel: "10:30–11:30 AM MDT",
    locationLabel: "Kiln · Holladay, UT",
    cost: "Free",
    registerUrl: "https://luma.com/gtpi1ef0",
    status: "upcoming",
  },
];

export const upcomingEvents = (): EventCard[] =>
  EVENTS.filter((e) => e.status === "upcoming").sort((a, b) =>
    a.startISO.localeCompare(b.startISO),
  );

export const pastEvents = (): EventCard[] =>
  EVENTS.filter((e) => e.status === "past").sort((a, b) =>
    b.startISO.localeCompare(a.startISO),
  );
