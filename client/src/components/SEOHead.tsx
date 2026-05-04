import { useEffect } from 'react';
import { pushHead, escapeHtml, escapeJsonLd } from '@/lib/ssr-head';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schemas?: object[];
  noindex?: boolean;
}

const SITE_ORIGIN = 'https://foundforai.com';

const GLOBAL_GRAPH: object[] = [
  {
    "@type": "Organization",
    "@id": "https://foundforai.com/#org",
    "name": "Found For AI",
    "alternateName": ["FoundForAI", "Found for AI Consulting", "Found For AI SEO"],
    "url": "https://foundforai.com",
    "logo": "https://foundforai.com/found-for-ai-logo-white.png",
    "image": [
      "https://foundforai.com/found-for-ai-logo-white.png",
      "https://foundforai.com/found-for-ai-logo-black.png"
    ],
    "description": "Found For AI helps businesses become discoverable inside AI assistants like ChatGPT, Gemini, and Perplexity through AEO (Answer Engine Optimization).",
    "founder": {
      "@type": "Person",
      "@id": "https://foundforai.com/#dustin-crump",
      "name": "Dustin Crump",
      "jobTitle": "Founder & AI Visibility Strategist",
      "url": "https://foundforai.com/about",
      "sameAs": [
        "https://www.linkedin.com/in/fripse",
        "https://x.com/foundforai",
        "https://www.smalllakepod.com/episodes/dustin-crump-foundforai"
      ]
    },
    "sameAs": [
      "https://www.linkedin.com/company/foundforai",
      "https://x.com/foundforai",
      "https://www.facebook.com/foundforai",
      "https://www.instagram.com/foundforai",
      "https://www.google.com/search?kgmid=/g/11ypjwtt92"
    ],
    "subjectOf": [
      {
        "@type": "PodcastEpisode",
        "@id": "https://foundforai.com/media/small-lake-city-podcast#episode",
        "name": "How to Slide Into the Consciousness of AI — with Dustin Crump",
        "url": "https://foundforai.com/media/small-lake-city-podcast",
        "partOfSeries": {
          "@type": "PodcastSeries",
          "name": "Small Lake City Podcast",
          "url": "https://www.smalllakepod.com"
        }
      }
    ],
    "brand": { "@type": "Brand", "name": "Found For AI" }
  },
  {
    "@type": "WebSite",
    "@id": "https://foundforai.com/#website",
    "url": "https://foundforai.com",
    "name": "Found For AI",
    "publisher": { "@id": "https://foundforai.com/#org" },
    "inLanguage": "en-US",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://foundforai.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@type": "LocalBusiness",
    "@id": "https://foundforai.com/#local",
    "name": "Found For AI",
    "image": "https://foundforai.com/assets/office.jpg",
    "url": "https://foundforai.com",
    "telephone": "+18018982456",
    "email": "info@foundforai.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "6187 S Highland Dr",
      "addressLocality": "Cottonwood Heights",
      "addressRegion": "UT",
      "postalCode": "84121",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.619,
      "longitude": -111.810
    },
    "areaServed": [
      { "@type": "City", "name": "Cottonwood Heights" },
      { "@type": "City", "name": "Salt Lake City" },
      { "@type": "City", "name": "Sandy" },
      { "@type": "City", "name": "Draper" }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "parentOrganization": { "@id": "https://foundforai.com/#org" },
    "sameAs": [
      "https://www.google.com/search?kgmid=/g/11ypjwtt92"
    ],
    "hasMap": "https://www.google.com/maps/place/Cottonwood+Heights,+UT",
    "potentialAction": [
      {
        "@type": "CommunicateAction",
        "name": "Contact Found For AI",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://foundforai.com/contact"
        }
      },
      {
        "@type": "ScheduleAction",
        "name": "Book a Consultation",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://foundforai.com/talk-to-a-human",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        }
      }
    ]
  },
  {
    "@type": "Service",
    "@id": "https://foundforai.com/#service-ai-seo",
    "serviceType": "AI SEO Readiness Audit and Optimization",
    "provider": { "@id": "https://foundforai.com/#org" },
    "areaServed": "United States",
    "offers": {
      "@type": "Offer",
      "price": "1595",
      "priceCurrency": "USD",
      "url": "https://foundforai.com/services"
    }
  },
  {
    "@type": "Person",
    "@id": "https://foundforai.com/#dustin-crump",
    "name": "Dustin Crump",
    "jobTitle": "Founder & AI Visibility Strategist",
    "url": "https://foundforai.com/about",
    "worksFor": { "@id": "https://foundforai.com/#org" },
    "sameAs": [
      "https://www.linkedin.com/in/fripse",
      "https://x.com/foundforai",
      "https://www.smalllakepod.com/episodes/dustin-crump-foundforai"
    ],
    "subjectOf": [
      {
        "@type": "PodcastEpisode",
        "@id": "https://foundforai.com/media/small-lake-city-podcast#episode",
        "name": "How to Slide Into the Consciousness of AI — with Dustin Crump",
        "url": "https://foundforai.com/media/small-lake-city-podcast",
        "partOfSeries": {
          "@type": "PodcastSeries",
          "name": "Small Lake City Podcast",
          "url": "https://www.smalllakepod.com"
        }
      }
    ]
  }
];

function buildGraph(extras: object[] = []): string {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [...GLOBAL_GRAPH, ...extras]
  };
  return escapeJsonLd(JSON.stringify(graph));
}

function buildHeadHtml({
  title,
  description,
  canonical,
  ogImage,
  schemas,
  noindex
}: SEOHeadProps): string {
  const imagePath = ogImage || '/found-for-ai-logo-white.png';
  const fullImage = imagePath.startsWith('http') ? imagePath : `${SITE_ORIGIN}${imagePath}`;
  const canonicalUrl = canonical ? canonical.replace(/\/$/, '') : SITE_ORIGIN;
  const tags: string[] = [];

  tags.push(`<title>${escapeHtml(title)}</title>`);
  tags.push(`<meta name="description" content="${escapeHtml(description)}" />`);
  if (noindex) {
    tags.push(`<meta name="robots" content="noindex, nofollow" />`);
  }
  tags.push(`<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`);
  tags.push(`<meta property="og:title" content="${escapeHtml(title)}" />`);
  tags.push(`<meta property="og:description" content="${escapeHtml(description)}" />`);
  tags.push(`<meta property="og:type" content="website" />`);
  tags.push(`<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`);
  tags.push(`<meta property="og:image" content="${escapeHtml(fullImage)}" />`);
  tags.push(`<meta property="og:image:width" content="1200" />`);
  tags.push(`<meta property="og:image:height" content="630" />`);
  tags.push(`<meta property="og:site_name" content="Found For AI" />`);
  tags.push(`<meta property="og:locale" content="en_US" />`);
  tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  tags.push(`<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  tags.push(`<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  tags.push(`<meta name="twitter:image" content="${escapeHtml(fullImage)}" />`);
  tags.push(`<script type="application/ld+json" data-seo-head="true">${buildGraph(schemas)}</script>`);

  return tags.join('\n    ');
}

function setOrCreateMeta(selector: string, attr: 'name' | 'property', attrValue: string, content: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setOrCreateLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEOHead(props: SEOHeadProps) {
  const { title, description, canonical, ogImage, schemas, noindex } = props;

  if (typeof window === 'undefined') {
    pushHead(buildHeadHtml(props));
    return null;
  }

  useEffect(() => {
    const imagePath = ogImage || '/found-for-ai-logo-white.png';
    const fullImage = imagePath.startsWith('http') ? imagePath : `${SITE_ORIGIN}${imagePath}`;
    const canonicalUrl = canonical ? canonical.replace(/\/$/, '') : SITE_ORIGIN;

    document.title = title;
    setOrCreateMeta('meta[name="description"]', 'name', 'description', description);
    setOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setOrCreateMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setOrCreateMeta('meta[property="og:image"]', 'property', 'og:image', fullImage);
    setOrCreateMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    setOrCreateMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
    setOrCreateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Found For AI');
    setOrCreateMeta('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');
    setOrCreateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setOrCreateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setOrCreateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', fullImage);
    setOrCreateLink('canonical', canonicalUrl);

    if (noindex) {
      setOrCreateMeta('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow');
    } else {
      const robotsEl = document.querySelector('meta[name="robots"]');
      if (robotsEl) robotsEl.parentNode?.removeChild(robotsEl);
    }

    document.querySelectorAll('script[data-seo-head="true"]').forEach((el) => el.remove());
    const jsonLd = document.createElement('script');
    jsonLd.type = 'application/ld+json';
    jsonLd.setAttribute('data-seo-head', 'true');
    jsonLd.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [...GLOBAL_GRAPH, ...(schemas || [])]
    });
    document.head.appendChild(jsonLd);

    return () => {
      jsonLd.remove();
    };
  }, [title, description, canonical, ogImage, noindex, JSON.stringify(schemas)]);

  return null;
}
