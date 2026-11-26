import { breadcrumbList } from '../lib/breadcrumb.ts';
import { JUNE_2026_WORKSHOP_PHOTOS, type CommunityPhoto } from './community.ts';

export const COMMUNITY_PAGE_URL = 'https://foundforai.com/community';
export const COMMUNITY_TITLE = 'Community & Practical AI Workshops | Found For AI';
export const COMMUNITY_DESCRIPTION =
  'Explore Dustin Crump’s past ChatGPT meetups, practical small-business AI projects, and ideas for future Found For AI community workshops.';
/** Landscape workshop photo. SEOHead turns this path into og:image and twitter:image. */
export const COMMUNITY_OG_IMAGE = '/events/june-2026-workshop-1.jpg';

const ORG_ID = 'https://foundforai.com/#org';
const PERSON_ID = 'https://foundforai.com/#dustin-crump';

/**
 * sameAs values already published on the site Person node in SEOHead.
 * Do not add profiles that are not already on the site.
 */
export const DUSTIN_SAME_AS = [
  'https://www.linkedin.com/in/fripse',
  'https://x.com/foundforai',
  'https://www.smalllakepod.com/episodes/dustin-crump-foundforai',
];

export const COMMUNITY_FAQS = [
  {
    q: 'Does Found For AI run workshops?',
    a: 'Dustin has hosted local meetups on using ChatGPT, and Found For AI held an AI Visibility Workshop on June 18, 2026 at Kiln in Holladay, Utah. No upcoming workshop dates are currently announced. You can ask about a future session.',
  },
  {
    q: 'What did the June 2026 workshop cover?',
    a: 'The June 18, 2026 workshop focused on what ChatGPT, Gemini, Perplexity, and Claude read on a business website, and what to change so they can recommend the business. Photos from the session show a robots.txt slide titled The Bouncer at Your Door, and an llms.txt slide.',
  },
];

function photoObject(photo: CommunityPhoto, index: number) {
  const id = `${COMMUNITY_PAGE_URL}#photo-${index + 1}`;
  const url = `https://foundforai.com${photo.src}`;
  return {
    '@type': 'ImageObject',
    '@id': id,
    contentUrl: url,
    url,
    width: photo.width,
    height: photo.height,
    caption: photo.caption,
    description: photo.alt,
    encodingFormat: 'image/jpeg',
  };
}

export function buildCommunitySchemas(_now: Date = new Date()): object[] {
  const images = JUNE_2026_WORKSHOP_PHOTOS.map(photoObject);

  return [
    breadcrumbList([
      { name: 'Home', url: 'https://foundforai.com/' },
      { name: 'Community', url: COMMUNITY_PAGE_URL },
    ]),
    {
      '@type': 'WebPage',
      '@id': `${COMMUNITY_PAGE_URL}#webpage`,
      url: COMMUNITY_PAGE_URL,
      name: COMMUNITY_TITLE,
      description: COMMUNITY_DESCRIPTION,
      isPartOf: { '@id': 'https://foundforai.com/#website' },
      about: { '@id': PERSON_ID },
      publisher: { '@id': ORG_ID },
      primaryImageOfPage: { '@id': images[0]?.['@id'] },
      image: images.map((image) => ({ '@id': image['@id'] })),
      inLanguage: 'en-US',
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Dustin Crump',
      jobTitle: 'Founder & AI Visibility Strategist',
      url: 'https://foundforai.com/about',
      worksFor: { '@id': ORG_ID },
      sameAs: DUSTIN_SAME_AS,
    },
    ...images,
    {
      '@type': 'FAQPage',
      '@id': `${COMMUNITY_PAGE_URL}#faq`,
      mainEntity: COMMUNITY_FAQS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ];
}
