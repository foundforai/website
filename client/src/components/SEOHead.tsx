import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

export default function SEOHead({ title, description, canonical, ogImage = '/assets/og-default.jpg' }: SEOHeadProps) {
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

    const twitterCard = document.querySelector('meta[name="twitter:card"]') || document.createElement('meta');
    twitterCard.setAttribute('name', 'twitter:card');
    twitterCard.setAttribute('content', 'summary_large_image');
    if (!document.querySelector('meta[name="twitter:card"]')) {
      document.head.appendChild(twitterCard);
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
          "legalName": "Found For AI LLC",
          "url": "https://foundforai.com",
          "logo": "https://foundforai.com/assets/logo.png",
          "sameAs": [
            "https://www.linkedin.com/in/fripse",
            "https://x.com/fripseai"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://foundforai.com/#website",
          "url": "https://foundforai.com",
          "name": "Found For AI",
          "publisher": { "@id": "https://foundforai.com/#org" },
          "inLanguage": "en-US"
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://foundforai.com/#local",
          "name": "Found For AI",
          "image": "https://foundforai.com/assets/office.jpg",
          "url": "https://foundforai.com",
          "telephone": "+18018982456",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
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
          "hasMap": "https://www.google.com/maps/place/Cottonwood+Heights,+UT"
        },
        {
          "@type": "Service",
          "@id": "https://foundforai.com/#service-ai-seo",
          "serviceType": "AI SEO Readiness Audit and Optimization",
          "provider": { "@id": "https://foundforai.com/#org" },
          "areaServed": "United States",
          "offers": {
            "@type": "Offer",
            "price": "299",
            "priceCurrency": "USD",
            "url": "https://foundforai.com/services"
          }
        },
        {
          "@type":"FAQPage",
          "mainEntity":[
            {
              "@type":"Question",
              "name":"How do I make my website visible to AI searches?",
              "acceptedAnswer":{"@type":"Answer","text":"You can make your website visible to AI searches by adding schema markup, clear headings, and structured content that AI systems can read and interpret. Found For AI audits and fixes your site to ensure visibility in ChatGPT, Perplexity, and other AI driven search tools."}
            },
            {
              "@type":"Question",
              "name":"What is AI SEO and why does it matter?",
              "acceptedAnswer":{"@type":"Answer","text":"AI SEO focuses on optimizing your website so AI models can understand it, not only search engines. This includes structured data, semantic HTML, and FAQ sections that directly answer user intent."}
            },
            {
              "@type":"Question",
              "name":"How do I check if my site is AI ready?",
              "acceptedAnswer":{"@type":"Answer","text":"Use Found For AI's free audit to analyze schema, GEO data, and content structure, then get an AI Readiness Scorecard with prioritized fixes."}
            },
            {
              "@type":"Question",
              "name":"What kind of schema helps AI understand my website?",
              "acceptedAnswer":{"@type":"Answer","text":"LocalBusiness, Service, FAQPage, and Article are the most impactful, they tell AI who you are, what you offer, and how to contact you."}
            },
            {
              "@type":"Question",
              "name":"Can AI help me get more customers?",
              "acceptedAnswer":{"@type":"Answer","text":"Yes, AI assistants and search now surface businesses directly in answers. Being AI optimized increases your chances of being recommended."}
            }
          ]
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
