/**
 * Events data — single source of truth for /events hub cards and the
 * schema.org Event objects emitted on both the hub and detail pages.
 *
 * To add a new event:
 *   1. Append an EventCard entry below (status: "upcoming"). Populate every
 *      field — Google's Event Rich Result validation requires location and
 *      flags missing organizer/performer/description/image/offers/eventStatus.
 *   2. Create a detail page at client/src/pages/Event<Slug>.tsx — copy the
 *      existing EventAIVisibilityWorkshopJune2026.tsx as a starting point.
 *   3. Register the route in client/src/App.tsx and add it to STATIC_ROUTES
 *      in client/src/data/routes.ts (prerender + sitemap).
 *   4. Drop the OG image at client/public/events/<slug>-og.png (1200×630).
 *
 * When an event passes, flip its status to "past". The hub renders upcoming
 * and past lists from this array.
 */

export type EventAddress = {
  name: string;
  street: string;
  city: string;
  region: string;
  postal: string;
  country: string;
};

export type EventCard = {
  /** Path segment under /events — must match the route in App.tsx. */
  slug: string;
  /** Full event title for the card heading + page <h1> + schema name. */
  title: string;
  /** Short hook line shown on the hub card (one sentence). */
  blurb: string;
  /**
   * Longer description used in the schema.org `description` field and the
   * "Why this matters" block on the detail page. Should stand alone as a
   * quotable sentence that explains what the event is and who it's for.
   */
  description: string;
  /** ISO 8601 with timezone offset — schema startDate + sort order. */
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
  /** OG/social image, e.g. "/events/<slug>-og.png" — also used as schema image. */
  image: string;
  /** Physical venue address — populated even for online events with a default. */
  location: EventAddress;
  /** Speaker/presenter names — used to populate schema `performer`. */
  performers: string[];
  /**
   * ISO 8601 timestamp from which the offer is valid. For free events this
   * is the day the page went live; for paid events use the announcement date.
   */
  offerValidFrom: string;
  /** Lifecycle: hub renders upcoming and past in separate sections. */
  status: "upcoming" | "past";
};

export const EVENTS: EventCard[] = [
  {
    slug: "ai-visibility-workshop-june-2026",
    title: "AI Visibility Workshop: Get Your Business Found For AI",
    blurb:
      "A free, hands-on workshop on what ChatGPT, Gemini, Perplexity, and Claude actually read on your site — and what to fix so they recommend your business.",
    description:
      "AI search is replacing traditional rankings. If ChatGPT, Gemini, and Perplexity can't confidently understand your business, they won't recommend it. This one-hour, in-person workshop shows small business owners and marketing leads exactly what AI tools read on a website and the specific changes that make them recommend your business.",
    startISO: "2026-06-18T10:30:00-06:00",
    endISO: "2026-06-18T11:30:00-06:00",
    dateLabel: "Thursday, June 18, 2026",
    timeLabel: "10:30–11:30 AM MDT",
    locationLabel: "Kiln · Holladay, UT",
    cost: "Free",
    registerUrl: "https://luma.com/gtpi1ef0",
    image: "/events/ai-visibility-workshop-june-2026-og.png",
    location: {
      name: "Kiln",
      street: "1895 E Rodeo Walk Dr Suite B200",
      city: "Holladay",
      region: "UT",
      postal: "84117",
      country: "US",
    },
    performers: ["Dustin Crump", "Brian Jolley"],
    offerValidFrom: "2026-05-29T00:00:00-06:00",
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

/**
 * Build a fully-populated schema.org Event object from an EventCard.
 * Used by both the hub page (inside EventSeries.subEvent) and the detail page,
 * so every Event reference passes Google's Event Rich Result validation.
 */
export const buildEventSchema = (e: EventCard): object => ({
  "@type": "Event",
  "@id": `https://foundforai.com/events/${e.slug}#event`,
  name: e.title,
  description: e.description,
  startDate: e.startISO,
  endDate: e.endISO,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: [`https://foundforai.com${e.image}`],
  url: `https://foundforai.com/events/${e.slug}`,
  location: {
    "@type": "Place",
    name: e.location.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: e.location.street,
      addressLocality: e.location.city,
      addressRegion: e.location.region,
      postalCode: e.location.postal,
      addressCountry: e.location.country,
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Found For AI",
    url: "https://foundforai.com",
  },
  performer: e.performers.map((name) => ({ "@type": "Person", name })),
  offers: {
    "@type": "Offer",
    url: e.registerUrl,
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validFrom: e.offerValidFrom,
  },
});
