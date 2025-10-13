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
            "https://x.com/fripseai",
            "https://fripse.com"
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
              "name":"Why are AI queries different than Google searches?",
              "acceptedAnswer":{"@type":"Answer","text":"AI queries are conversational and context-driven. Instead of scanning a list of links like Google, AI gives one or two answers it trusts. If your business isn't part of that trusted answer set, you're invisible to customers using AI tools like ChatGPT and Perplexity."}
            },
            {
              "@type":"Question",
              "name":"Why do I need to be found by AI?",
              "acceptedAnswer":{"@type":"Answer","text":"More customers are now asking AI tools for recommendations instead of searching on Google. Being found by AI means your business information is structured so large language models can read, understand, and confidently recommend your brand."}
            },
            {
              "@type":"Question",
              "name":"Will AI searches replace Google?",
              "acceptedAnswer":{"@type":"Answer","text":"AI-driven discovery is already reshaping how people find information. Google is moving toward an AI-based experience (SGE), and platforms like ChatGPT, Claude, and Perplexity are becoming new discovery channels. Traditional SEO still matters, but AI visibility is now essential."}
            },
            {
              "@type":"Question",
              "name":"Will AI searches and queries help customers find my business?",
              "acceptedAnswer":{"@type":"Answer","text":"Yes — if your website is AI-readable. Structured data, FAQs, and contextual clarity make it easy for AI systems to understand what you do and include your business in relevant responses."}
            },
            {
              "@type":"Question",
              "name":"What does it mean to be Found by AI?",
              "acceptedAnswer":{"@type":"Answer","text":"Being Found by AI means your website, services, and business details are optimized so AI tools can interpret them correctly and recommend you when users ask related questions."}
            },
            {
              "@type":"Question",
              "name":"How do I know if my site is AI-ready?",
              "acceptedAnswer":{"@type":"Answer","text":"You can request a free AI Readiness Audit at FoundForAI.com/audit. We'll assess your visibility across AI tools and provide a personalized plan to increase your discoverability."}
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
