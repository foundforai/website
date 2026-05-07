// Content for the interactive AI Visibility Playbook at /playbook/access.
// Mirrors the standalone export at scope: 5 sections × 4 checks = 20 total.

export interface PlaybookCheck {
  /** Stable id used for localStorage and React keys. e.g. "1a", "2c". */
  id: string;
  title: string;
  detail: string;
}

export interface PlaybookAside {
  label: string;
  /** Lines to render as a monospace code block. */
  code: string[];
}

export interface PlaybookSection {
  /** Two-digit ordinal — drives the section anchor (`section-${num}`). */
  num: string;
  title: string;
  /** Lead sentence under the section title. */
  lede: string;
  /** Body paragraph below the lede. */
  body: string;
  /** Optional "what AI sees" aside — currently only on section 02. */
  aside?: PlaybookAside;
  checks: PlaybookCheck[];
}

export interface PlaybookTier {
  /** e.g. "16 – 20", "Under 10". Display only. */
  range: string;
  heading: string;
  body: string;
  /** Returns true when this tier matches the user's check count (0–20). */
  match: (checked: number) => boolean;
}

export const PLAYBOOK_TOTAL_CHECKS = 20;
export const PLAYBOOK_STORAGE_KEY = 'ffa-playbook-checks';

export const playbookSections: PlaybookSection[] = [
  {
    num: '01',
    title: 'Who You Are',
    lede:
      'The first thing an AI system does when it considers your business is try to figure out who you actually are. Sounds simple. Usually isn’t.',
    body:
      'AI builds a mental picture of your business by pulling information from your website, Google, directories, social profiles, and review sites. If those sources tell slightly different stories — different business names, different addresses, an old phone number — the AI gets confused. And a confused AI won’t recommend you. It’ll recommend the business it’s sure about.',
    checks: [
      {
        id: '1a',
        title: 'Your business name is spelled the exact same way everywhere',
        detail:
          'Check your website, Google Business Profile, Yelp, Facebook, and any directories. “Smith Plumbing,” “Smith Plumbing LLC,” and “Smith Plumbing & Heating” look like three different companies to AI — even if they’re all you.',
      },
      {
        id: '1b',
        title:
          'Your address and phone number are identical across every platform',
        detail:
          'Even “St.” vs. “Street” or an old suite number on one site can split you into two businesses in an AI’s view. Pick the exact version you want to be known by and make every platform match it.',
      },
      {
        id: '1c',
        title:
          'Your Google Business Profile is claimed, complete, and current',
        detail:
          'Hours, services, photos, description — all filled in. This is one of the biggest single sources AI pulls from when someone asks for a local recommendation. An empty or stale profile is one of the fastest ways to get skipped.',
      },
      {
        id: '1d',
        title:
          'Your homepage makes it obvious who you are, what you do, and how to contact you — in the first screen',
        detail:
          'If an AI reads your homepage and can’t answer those three questions in the first few sentences, it can’t confidently recommend you. Quick test: ask a friend to look at your homepage for 5 seconds and tell you what you do. If they can’t, AI can’t either.',
      },
    ],
  },
  {
    num: '02',
    title: 'What AI Actually Reads',
    lede: 'Here’s the part most business owners have never been told.',
    body:
      'When AI looks at your website, it doesn’t just read the words on the page. It also looks for a hidden, machine-readable version of your business info — technical stuff called “structured data” or “schema markup.” It’s code that sits inside your site’s pages and literally spells out: this is a business, here’s the name, here’s what they offer, here’s the address, here are the hours. Think of it like filling out a form that only AI can see. If the form is filled out, AI trusts you. If it’s blank or wrong, AI has to guess — and AI doesn’t like guessing, so it defers to a competitor whose form is filled out.',
    aside: {
      label: 'What AI sees',
      code: [
        '{ "@type": "LocalBusiness",',
        '  "name": "Your Business",',
        '  "address": { ... },',
        '  "telephone": "...",',
        '  "openingHours": [ ... ],',
        '  "offers": [ "Service A", ... ] }',
      ],
    },
    checks: [
      {
        id: '2a',
        title:
          'Your site has basic “LocalBusiness” schema installed and it matches what’s visible on your pages',
        detail:
          'Free way to check: go to search.google.com/test/rich-results, paste in your homepage URL, and look at what comes back. If it says “no items detected,” you have no schema. If it shows data, make sure it matches what’s on the page — mismatched data is worse than none.',
      },
      {
        id: '2b',
        title: 'Each service you offer has its own schema markup',
        detail:
          'A generic “we’re a business” tag isn’t enough. AI needs to know you specifically offer AC repair, or beginner yoga classes, or emergency dental. Without this, you won’t get matched to the specific questions people ask AI.',
      },
      {
        id: '2c',
        title: 'Your FAQ pages have FAQ schema',
        detail:
          'This is one of the fastest wins in AI visibility. When your FAQ is properly marked up, AI can pull your answer directly into a response. Without it, the AI pulls someone else’s answer — even if yours is better.',
      },
      {
        id: '2d',
        title: 'Nothing on your site has broken or conflicting schema',
        detail:
          'Broken schema is worse than no schema. It tells AI your data can’t be trusted, and AI responds by quietly excluding you from consideration. Most sites with broken schema have no idea it’s broken because nothing visibly “breaks” on the page.',
      },
    ],
  },
  {
    num: '03',
    title: 'What’s Keeping You Invisible',
    lede: 'You can have a beautiful website and still be invisible to AI.',
    body:
      'These are the technical blockers that most small business owners don’t know exist — and they’re surprisingly common.',
    checks: [
      {
        id: '3a',
        title:
          'Your important pages are not accidentally blocked from being read',
        detail:
          'Websites have files called robots.txt and meta tags that can tell search engines and AI “don’t look at this page.” These are meant to be used for login pages or staging sites, but they often get left on live pages by mistake. If AI can’t crawl your page, your page does not exist as far as AI is concerned.',
      },
      {
        id: '3b',
        title:
          'Your services, pricing, schedule, and contact pages are public — not hidden behind a login or a booking tool',
        detail:
          'If customers have to click “book now” and go to a separate portal to see what you offer, AI can’t see any of it. Your core information needs to be visible on a regular public page before the booking tool takes over.',
      },
      {
        id: '3c',
        title: 'Your homepage links clearly to your most important pages',
        detail:
          'AI uses internal links to figure out what you think is important. If your best service page is buried three clicks deep with no clear path from the homepage, AI assumes it’s not a priority — and treats it that way.',
      },
      {
        id: '3d',
        title: 'You don’t have duplicate versions of your pages floating around',
        detail:
          'Some sites accidentally have the same page at two URLs — with and without “www”, with and without a trailing slash, or a leftover old version. This splits your trust signals and confuses AI about which page is the real one.',
      },
    ],
  },
  {
    num: '04',
    title: 'Why AI Should Pick You',
    lede: 'Being readable isn’t enough.',
    body:
      'Once AI knows you exist and what you do, it still has to decide whether you’re worth recommending over the other businesses in your area. These are the trust signals that tip the scale.',
    checks: [
      {
        id: '4a',
        title:
          'You have recent, specific, written reviews — not just a star rating',
        detail:
          'Recency matters more than total count. Ten detailed reviews from the last six months beat 200 generic reviews from three years ago. AI reads review content to understand what you’re actually good at.',
      },
      {
        id: '4b',
        title:
          'Your website answers the questions your customers actually ask before hiring you',
        detail:
          'What does it cost? How long does it take? Do you service my area? Do I need to be home? If your pages don’t answer these, AI can’t use them to help someone decide — and will use a competitor who does.',
      },
      {
        id: '4c',
        title:
          'Other websites mention your business — directories, local news, partner sites, associations',
        detail:
          'AI cross-checks your business against other sources on the web. If you only exist on your own website, you look less established than a competitor who shows up in the local chamber of commerce listing, a news article, and three directories.',
      },
      {
        id: '4d',
        title:
          'Your credentials, certifications, and years in business are stated clearly in plain text',
        detail:
          'Licensed HVAC, NASM-certified trainer, 15 years in practice, insured and bonded — if it’s not written in readable text on your page, AI doesn’t know about it. Credentials buried in a logo image don’t count.',
      },
    ],
  },
  {
    num: '05',
    title: 'Can AI Explain You?',
    lede: 'Here’s the final test.',
    body:
      'If an AI system read your entire website right now, could it write a short, confident paragraph about your business and recommend you to the right person? Most small business sites fail this test. Not because the business is bad — but because the website doesn’t give AI enough to work with.',
    checks: [
      {
        id: '5a',
        title: 'Your homepage says who you’re for — not just what you do',
        detail:
          '“Yoga studio” is a category. “Beginner-friendly yoga studio in downtown Boise, with morning and lunchtime classes for working professionals” is a recommendation. The second one gets cited. The first one gets ignored.',
      },
      {
        id: '5b',
        title: 'Each of your main pages has one clear job',
        detail:
          'A page that tries to explain your services AND your story AND your pricing AND your philosophy gets cited for none of them. One page, one purpose. AI rewards focus.',
      },
      {
        id: '5c',
        title: 'The next step for a customer is obvious and easy on every page',
        detail:
          'Book, call, message, request a quote — whatever it is, it should be the most obvious button on every important page. AI systems are starting to factor “can a customer actually take action here” into what they recommend.',
      },
      {
        id: '5d',
        title:
          'Your site explains why someone should pick you over the business next door',
        detail:
          'Same-day service. First session free. Family-owned since 1998. Licensed in three states. Something specific. “We provide quality service” is what every business says — so AI treats it as no differentiator at all.',
      },
    ],
  },
];

export const playbookTiers: PlaybookTier[] = [
  {
    range: '16 – 20',
    heading: 'You’re in rare company.',
    body:
      'Your foundation is strong and AI systems can both find you and understand you. Your next move is going deeper on content and trust signals — things that separate “recommended” from “recommended first.”',
    match: (n) => n >= 16,
  },
  {
    range: '10 – 15',
    heading: 'You’re halfway there.',
    body:
      'AI knows you exist but doesn’t fully understand or trust you yet. The gaps are usually in the technical layer — structured data, schema, crawl settings — which is almost always where real visibility gets unlocked or lost.',
    match: (n) => n >= 10 && n <= 15,
  },
  {
    range: 'Under 10',
    heading: 'You’re effectively invisible to AI right now.',
    body:
      'That sounds brutal, but here’s the upside: so is almost every one of your local competitors. The business that fixes this first in your market gets the AI recommendation — and in the small handful of markets where someone’s already fixed it, they’re quietly taking an outsized share of new customers.',
    match: (n) => n < 10,
  },
];

/** Resolve the active tier for a given count of checked items. */
export function resolveTier(checkedCount: number): PlaybookTier {
  return (
    playbookTiers.find((t) => t.match(checkedCount)) ??
    playbookTiers[playbookTiers.length - 1]
  );
}
