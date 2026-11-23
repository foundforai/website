/**
 * Community page content that is optional or image-backed.
 *
 * June 18, 2026 Holladay workshop photos render in the past-meetups section
 * on /community and on the workshop detail page. An empty list hides the
 * photo block completely: no frames and no placeholder copy.
 *
 * These photos document that workshop only. Do not reuse them as evidence
 * of the earlier ChatGPT meetups. Those meetups, if photos are supplied
 * later, belong in EARLIER_MEETUP_PHOTOS and render under that narrative.
 *
 * To add a photo:
 * 1. Save the optimized web file (EXIF location data already stripped) in
 *    client/public/events/. Keep the original, uncropped file outside
 *    client/public.
 * 2. Append an entry: src, width, height, alt, optional caption, order.
 * 3. Alt text describes what is actually visible. Do not name the people
 *    in the photo. Captions add context and should not repeat the alt text.
 * 4. Do not commit permission notes, attendee names, or private details.
 *
 * Testimonials render only when COMMUNITY_TESTIMONIALS has entries. Add a
 * quote only with permission to publish, the approved wording, and an
 * approved attribution. Do not store permission records in this file.
 */

export type CommunityPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  order: number;
};

export type CommunityTestimonial = {
  quote: string;
  attribution: string;
  detail?: string;
};

export const EARLIER_MEETUP_PHOTOS: CommunityPhoto[] = [];

export const JUNE_2026_WORKSHOP_PHOTOS: CommunityPhoto[] = [
  {
    src: '/events/june-2026-workshop-1.jpg',
    width: 1600,
    height: 1200,
    alt: 'Presenting robots.txt basics at the June 18, 2026 AI visibility workshop in Holladay',
    caption:
      'A small seated audience in a modern event space. The slide is robots.txt, titled The Bouncer at Your Door.',
    order: 1,
  },
  {
    src: '/events/june-2026-workshop-2.jpg',
    width: 1600,
    height: 1200,
    alt: 'Two presenters and a seated audience at the June 18, 2026 AI visibility workshop in Holladay',
    caption: 'The slide on screen covers robots.txt, titled The Bouncer at Your Door.',
    order: 2,
  },
  {
    src: '/events/june-2026-workshop-3.jpg',
    width: 1200,
    height: 1600,
    alt: 'Walking through llms.txt at the June 2026 workshop',
    caption:
      'Two presenters stand by an llms.txt slide at the June 18, 2026 AI visibility workshop in Holladay.',
    order: 3,
  },
];

export const COMMUNITY_TESTIMONIALS: CommunityTestimonial[] = [];
