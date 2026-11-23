/**
 * Events data. Single source of truth for /events hub cards and the
 * schema.org Event objects emitted on the hub and detail pages.
 *
 * To add a new event:
 *   1. Append an EventCard entry below (status: "upcoming"). Populate every
 *      field. Google's Event rich result validation wants location and flags
 *      a missing organizer, performer, description, image, or eventStatus.
 *   2. Create a detail page at client/src/pages/Event<Slug>.tsx.
 *   3. Register the route in client/src/App.tsx and add it to STATIC_ROUTES
 *      in client/src/data/routes.ts (prerender + sitemap).
 *   4. Drop the OG image at client/public/events/<slug>-og.png (1200x630),
 *      or point `image` at another real asset.
 *
 * Times are ISO 8601 with a numeric offset for America/Denver (MDT -06:00
 * or MST -07:00). Comparisons use that absolute instant. Do not store a
 * date-only value. If a future record is date-only, treat the archive
 * boundary as 23:59:59 in America/Denver on that civil date before calling
 * the listing past.
 *
 * status "past" means the event was held. Set it only after occurrence is
 * confirmed. An event still marked "upcoming" whose endISO is already past
 * drops out of the upcoming list automatically. It is not labeled as held
 * until status is "past". Past events do not offer registration.
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
  /** Path segment under /events. Must match the route in App.tsx. */
  slug: string;
  /** Full event title for the card heading, page h1, and schema name. */
  title: string;
  /** Short hook line shown on the hub card (one sentence). */
  blurb: string;
  /**
   * Longer description used in schema.org `description` and on the detail
   * page. Should stand alone.
   */
  description: string;
  /** ISO 8601 with timezone offset. Schema startDate and sort order. */
  startISO: string;
  /** ISO 8601 with timezone offset. Schema endDate. */
  endISO: string;
  /** Display strings. Explicit so dates are never formatted client-side. */
  dateLabel: string;
  timeLabel: string;
  locationLabel: string;
  cost: string;
  /**
   * External registration URL. Public pages and schema offers use it only
   * while the event is still upcoming.
   */
  registerUrl: string;
  /** OG/social image. Also used as the schema image. Must be a real file. */
  image: string;
  /** Physical venue address. */
  location: EventAddress;
  /** Speaker/presenter names. Used for schema `performer`. */
  performers: string[];
  /**
   * ISO 8601 timestamp from which a registration offer is valid.
   * Ignored once the event is no longer upcoming.
   */
  offerValidFrom: string;
  /**
   * Editorial lifecycle. "past" means the event was held.
   * Upcoming listings also expire from the hub once endISO has passed.
   */
  status: "upcoming" | "past";
};

export const EVENTS: EventCard[] = [
  {
    slug: "ai-visibility-workshop-june-2026",
    title: "AI Visibility Workshop: Get Your Business Found For AI",
    blurb:
      "Held June 18, 2026 at Kiln in Holladay. A free workshop on what ChatGPT, Gemini, Perplexity, and Claude read on a small business website.",
    description:
      "A one-hour, in-person workshop held on June 18, 2026 at Kiln in Holladay, Utah. It focused on what ChatGPT, Gemini, Perplexity, and Claude read on a small business website, and the changes that help them recommend the business.",
    startISO: "2026-06-18T10:30:00-06:00",
    endISO: "2026-06-18T11:30:00-06:00",
    dateLabel: "Thursday, June 18, 2026",
    timeLabel: "10:30 to 11:30 AM MDT",
    locationLabel: "Kiln, Holladay, UT",
    cost: "Free",
    registerUrl: "https://luma.com/gtpi1ef0",
    image: "/events/june-2026-workshop-1.jpg",
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
    status: "past",
  },
];

export function eventEndMs(event: EventCard): number {
  const ms = Date.parse(event.endISO);
  if (!Number.isFinite(ms)) {
    throw new Error(`Invalid endISO for ${event.slug}`);
  }
  return ms;
}

/** True only for a confirmed upcoming event whose end is still in the future. */
export function isUpcoming(event: EventCard, now: Date = new Date()): boolean {
  return event.status === "upcoming" && eventEndMs(event) > now.getTime();
}

/** True when occurrence was confirmed and status was set to "past". */
export function isHeld(event: EventCard): boolean {
  return event.status === "past";
}

export const upcomingEvents = (now: Date = new Date()): EventCard[] =>
  EVENTS.filter((event) => isUpcoming(event, now)).sort((a, b) =>
    a.startISO.localeCompare(b.startISO),
  );

export const pastEvents = (): EventCard[] =>
  EVENTS.filter((event) => isHeld(event)).sort((a, b) =>
    b.startISO.localeCompare(a.startISO),
  );

/**
 * schema.org Event. Past and expired events stay EventScheduled with their
 * original dates. They do not use EventCancelled or an invented completed
 * status, and they do not advertise a registration offer.
 */
export const buildEventSchema = (event: EventCard, now: Date = new Date()): Record<string, unknown> => {
  const schema: Record<string, unknown> = {
    "@type": "EducationEvent",
    "@id": `https://foundforai.com/events/${event.slug}#event`,
    name: event.title,
    description: event.description,
    startDate: event.startISO,
    endDate: event.endISO,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [`https://foundforai.com${event.image}`],
    url: `https://foundforai.com/events/${event.slug}`,
    location: {
      "@type": "Place",
      name: event.location.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.location.street,
        addressLocality: event.location.city,
        addressRegion: event.location.region,
        postalCode: event.location.postal,
        addressCountry: event.location.country,
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Found For AI",
      url: "https://foundforai.com",
    },
    performer: event.performers.map((name) => ({ "@type": "Person", name })),
  };

  if (isUpcoming(event, now) && event.registerUrl) {
    schema.offers = {
      "@type": "Offer",
      url: event.registerUrl,
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: event.offerValidFrom,
    };
  }

  return schema;
};
