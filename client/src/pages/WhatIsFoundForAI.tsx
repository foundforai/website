import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'wouter';

export default function WhatIsFoundForAI() {
  useEffect(() => {
    // Organization Schema
    const orgSchema = document.createElement('script');
    orgSchema.type = 'application/ld+json';
    orgSchema.id = 'org-schema-what-is';
    orgSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Found For AI",
      "url": "https://foundforai.com",
      "logo": "https://foundforai.com/assets/logo.png",
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Salt Lake City",
        "addressRegion": "UT",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "support@foundforai.com"
      },
      "sameAs": [
        "https://x.com/foundforai",
        "https://www.linkedin.com/company/foundforai"
      ],
      "description": "Found For AI makes businesses discoverable in AI search engines (ChatGPT, Gemini, Perplexity) with AI-first SEO, schema, and technical setup."
    });
    document.head.appendChild(orgSchema);

    // WebPage Schema
    const webPageSchema = document.createElement('script');
    webPageSchema.type = 'application/ld+json';
    webPageSchema.id = 'webpage-schema-what-is';
    webPageSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "What is Found For AI?",
      "url": "https://foundforai.com/what-is-found-for-ai",
      "about": {
        "@type": "Organization",
        "name": "Found For AI",
        "url": "https://foundforai.com"
      },
      "mainEntity": {
        "@type": "Organization",
        "name": "Found For AI"
      }
    });
    document.head.appendChild(webPageSchema);

    // FAQPage Schema
    const faqSchema = document.createElement('script');
    faqSchema.type = 'application/ld+json';
    faqSchema.id = 'faq-schema-what-is';
    faqSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are you an agency or a product?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We're a focused studio with a productized service model. You get fast deliverables and clear outcomes."
          }
        },
        {
          "@type": "Question",
          "name": "How fast is the Starter Fix?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Delivered within 7 business days for up to 10 pages."
          }
        },
        {
          "@type": "Question",
          "name": "Can I upgrade?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — our Pro Visibility Plan adds ongoing optimization and reporting."
          }
        }
      ]
    });
    document.head.appendChild(faqSchema);

    return () => {
      const existingOrgSchema = document.getElementById('org-schema-what-is');
      const existingWebPageSchema = document.getElementById('webpage-schema-what-is');
      const existingFaqSchema = document.getElementById('faq-schema-what-is');
      
      if (existingOrgSchema) document.head.removeChild(existingOrgSchema);
      if (existingWebPageSchema) document.head.removeChild(existingWebPageSchema);
      if (existingFaqSchema) document.head.removeChild(existingFaqSchema);
    };
  }, []);

  return (
    <PageLayout
      title="What is Found For AI? | The New Way to Be Discovered"
      description="Found For AI is a Utah-based technology studio that makes businesses discoverable by AI search engines like ChatGPT, Gemini, and Perplexity through AI-first SEO, schema, and technical setup."
      canonical="https://foundforai.com/what-is-found-for-ai"
      ogImage="/assets/logo.png"
    >
      {/* Hero Section */}
      <section className="hero hero--brand">
        <h1>What is Found For AI?</h1>
        <p>Found For AI is a technology studio that makes businesses discoverable in AI search — so you're visible to ChatGPT, Gemini, and Perplexity, not just Google.</p>
        <Link href="/pricing" className="btn primary" data-testid="button-hero-cta">
          Get My AI Visibility Audit →
        </Link>
      </section>

      {/* Body Content */}
      <section className="content">
        <h2>Who we are</h2>
        <p>
          <strong>Found For AI</strong> helps real businesses become visible in AI assistants. 
          We structure your site with schema, fix technical SEO, and tune performance so AI systems 
          can read and trust your content.
        </p>

        <h2>What we do</h2>
        <ul>
          <li>AI Visibility audit and action plan</li>
          <li>Schema.org (JSON-LD) implementation and validation</li>
          <li>robots.txt &amp; <code>llms.txt</code>, sitemap creation and submission</li>
          <li>OpenGraph/Twitter cards and metadata cleanup</li>
          <li>Core Web Vitals tuning for better crawl/render</li>
        </ul>

        <h2>Why it matters now</h2>
        <p>
          Customers increasingly ask AI — not just search engines — for recommendations. 
          If AI can't parse your site, you're invisible where decisions are being made.
        </p>

        <h2>How we work</h2>
        <ol>
          <li><strong>Audit:</strong> We analyze how AI currently sees your site.</li>
          <li><strong>Fix:</strong> We implement schema, sitemaps, metadata, and performance improvements.</li>
          <li><strong>Grow:</strong> Ongoing optimization (optional) to expand AI visibility.</li>
        </ol>

        <div className="cta-block">
          <Link href="/pricing" className="btn primary" data-testid="button-pricing-cta">
            View Pricing &amp; Book the Starter Fix →
          </Link>
          <Link href="/services" className="btn secondary" data-testid="button-services-cta">
            See All Services →
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <h2>FAQ</h2>
        <details data-testid="faq-agency">
          <summary data-testid="faq-summary-agency">Are you an agency or a product?</summary>
          <p>We're a focused studio with a productized service model. You get fast deliverables and clear outcomes.</p>
        </details>
        <details data-testid="faq-speed">
          <summary data-testid="faq-summary-speed">How fast is the Starter Fix?</summary>
          <p>Delivered within 7 business days for up to 10 pages.</p>
        </details>
        <details data-testid="faq-upgrade">
          <summary data-testid="faq-summary-upgrade">Can I upgrade?</summary>
          <p>Yes — our Pro Visibility Plan adds ongoing optimization and reporting.</p>
        </details>
      </section>
    </PageLayout>
  );
}
