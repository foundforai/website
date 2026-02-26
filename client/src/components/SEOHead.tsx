import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

export default function SEOHead({ title, description, canonical, ogImage = '/found-for-ai-logo-white.png' }: SEOHeadProps) {
  useEffect(() => {
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', description);
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', title);
    if (!document.querySelector('meta[property="og:title"]')) {
      document.head.appendChild(ogTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.setAttribute('content', description);
    if (!document.querySelector('meta[property="og:description"]')) {
      document.head.appendChild(ogDescription);
    }

    const ogImageMeta = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
    ogImageMeta.setAttribute('property', 'og:image');
    ogImageMeta.setAttribute('content', `https://foundforai.com${ogImage}`);
    if (!document.querySelector('meta[property="og:image"]')) {
      document.head.appendChild(ogImageMeta);
    }

    const ogImageWidth = document.querySelector('meta[property="og:image:width"]') || document.createElement('meta');
    ogImageWidth.setAttribute('property', 'og:image:width');
    ogImageWidth.setAttribute('content', '1200');
    if (!document.querySelector('meta[property="og:image:width"]')) {
      document.head.appendChild(ogImageWidth);
    }

    const ogImageHeight = document.querySelector('meta[property="og:image:height"]') || document.createElement('meta');
    ogImageHeight.setAttribute('property', 'og:image:height');
    ogImageHeight.setAttribute('content', '630');
    if (!document.querySelector('meta[property="og:image:height"]')) {
      document.head.appendChild(ogImageHeight);
    }

    const ogType = document.querySelector('meta[property="og:type"]') || document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.setAttribute('content', 'website');
    if (!document.querySelector('meta[property="og:type"]')) {
      document.head.appendChild(ogType);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    const canonicalUrl = canonical ? canonical.replace(/\/$/, '') : 'https://foundforai.com';
    ogUrl.setAttribute('content', canonicalUrl);
    if (!document.querySelector('meta[property="og:url"]')) {
      document.head.appendChild(ogUrl);
    }

    const ogSiteName = document.querySelector('meta[property="og:site_name"]') || document.createElement('meta');
    ogSiteName.setAttribute('property', 'og:site_name');
    ogSiteName.setAttribute('content', 'Found For AI');
    if (!document.querySelector('meta[property="og:site_name"]')) {
      document.head.appendChild(ogSiteName);
    }

    const ogLocale = document.querySelector('meta[property="og:locale"]') || document.createElement('meta');
    ogLocale.setAttribute('property', 'og:locale');
    ogLocale.setAttribute('content', 'en_US');
    if (!document.querySelector('meta[property="og:locale"]')) {
      document.head.appendChild(ogLocale);
    }

    const twitterCard = document.querySelector('meta[name="twitter:card"]') || document.createElement('meta');
    twitterCard.setAttribute('name', 'twitter:card');
    twitterCard.setAttribute('content', 'summary_large_image');
    if (!document.querySelector('meta[name="twitter:card"]')) {
      document.head.appendChild(twitterCard);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]') || document.createElement('meta');
    twitterTitle.setAttribute('name', 'twitter:title');
    twitterTitle.setAttribute('content', title);
    if (!document.querySelector('meta[name="twitter:title"]')) {
      document.head.appendChild(twitterTitle);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]') || document.createElement('meta');
    twitterDescription.setAttribute('name', 'twitter:description');
    twitterDescription.setAttribute('content', description);
    if (!document.querySelector('meta[name="twitter:description"]')) {
      document.head.appendChild(twitterDescription);
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]') || document.createElement('meta');
    twitterImage.setAttribute('name', 'twitter:image');
    twitterImage.setAttribute('content', `https://foundforai.com${ogImage}`);
    if (!document.querySelector('meta[name="twitter:image"]')) {
      document.head.appendChild(twitterImage);
    }

    if (canonical) {
      const linkCanonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      linkCanonical.setAttribute('href', canonical);
      if (!document.querySelector('link[rel="canonical"]')) {
        document.head.appendChild(linkCanonical);
      }
    }

    const jsonLd = document.createElement('script');
    jsonLd.type = 'application/ld+json';
    jsonLd.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
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
            "name": "Dustin Crump",
            "url": "https://www.linkedin.com/in/fripse"
          },
          "sameAs": [
            "https://www.linkedin.com/company/foundforai",
            "https://x.com/foundforai",
            "https://www.facebook.com/foundforai",
            "https://www.instagram.com/foundforai"
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
              "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
              "opens": "09:00",
              "closes": "17:00"
            }
          ],
          "parentOrganization": { "@id": "https://foundforai.com/#org" },
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
        }
      ]
    });
    document.head.appendChild(jsonLd);

    return () => {
      document.head.removeChild(jsonLd);
    };
  }, [title, description, canonical, ogImage]);

  return null;
}
