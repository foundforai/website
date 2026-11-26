import { useEffect, useState } from 'react';
import { SEEDED_EVENTS } from './seed.ts';
import { toPublicEvent } from './timing.ts';
import type { PublicEvent, PublicTestimonial } from './types.ts';

const seeded = SEEDED_EVENTS.map((event) => toPublicEvent(event, 0));

export function useCommunityEvents(): { events: PublicEvent[]; loaded: boolean } {
  const [events, setEvents] = useState<PublicEvent[]>(seeded);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/community/events', { headers: { accept: 'application/json' } })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('events'))))
      .then((data: { events?: PublicEvent[] }) => {
        if (!cancelled && Array.isArray(data.events)) setEvents(data.events);
      })
      .catch(() => {
        // Keep the seeded June 2026 workshop if the API is unavailable.
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { events, loaded };
}

export function useApprovedTestimonials(): PublicTestimonial[] {
  const [items, setItems] = useState<PublicTestimonial[]>([]);
  useEffect(() => {
    let cancelled = false;
    fetch('/api/community/testimonials', { headers: { accept: 'application/json' } })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('testimonials'))))
      .then((data: { testimonials?: PublicTestimonial[] }) => {
        if (!cancelled && Array.isArray(data.testimonials)) {
          setItems(data.testimonials.filter((item) => item.quote && item.attribution));
        }
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return items;
}
