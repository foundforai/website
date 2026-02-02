import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
      "alternateName": ["FoundForAI", "Found for AI Consulting", "Found For AI SEO"],
      "url": "https://foundforai.com",
      "logo": "https://foundforai.com/found-for-ai-logo-white.png",
      "image": [
        "https://foundforai.com/found-for-ai-logo-white.png",
        "https://foundforai.com/found-for-ai-logo-black.png"
      ],
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
      "founder": {
        "@type": "Person",
        "name": "Dustin Crump",
        "url": "https://www.linkedin.com/in/fripse"
      },
      "sameAs": [
        "https://x.com/foundforai",
        "https://www.linkedin.com/company/foundforai",
        "https://www.facebook.com/foundforai",
        "https://www.instagram.com/foundforai"
      ],
      "brand": { "@type": "Brand", "name": "Found For AI" },
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
      "name": "What is Found For AI",
      "description": "Found For AI is a framework and implementation approach that helps businesses become discoverable and recommendable by AI systems like Google Gemini, ChatGPT, and Perplexity.",
      "url": "https://foundforai.com/what-is-found-for-ai",
      "about": ["Found For AI", "AI visibility", "AI search recommendations"],
      "publisher": {
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
            "text": "Yes, our Pro Visibility Plan adds ongoing optimization and reporting."
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
      title="What is Found For AI | AI Visibility Framework"
      description="Found For AI is a framework and implementation approach that helps businesses become discoverable and recommendable by AI systems like Google Gemini, ChatGPT, and Perplexity."
      canonical="https://foundforai.com/what-is-found-for-ai"
      ogImage="/found-for-ai-logo-white.png"
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          
          {/* H1 and Definition Block */}
          <h1 
            className="text-4xl md:text-5xl font-bold mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="heading-what-is-found-for-ai"
          >
            What is Found For AI
          </h1>

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Definition</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Found For AI is a framework and implementation approach that helps businesses become discoverable and recommendable by AI systems like Google Gemini, ChatGPT, and Perplexity, by improving how clearly machines can understand what a business does, where it operates, and how confident they should be recommending it.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              <a href="#ai-vs-seo" className="text-primary hover:underline">
                Learn how this differs from SEO
              </a>
            </p>
          </div>

          {/* How AI Systems Decide */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">How AI systems decide which businesses to recommend</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Entity clarity</strong>, whether AI can identify exactly what your business is and what it offers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Consistent business facts</strong>, the same name, address, services, and details appearing across the web</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Structured data</strong>, machine readable markup that tells AI systems what each page means</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Content that answers real questions</strong>, information structured around what people actually ask</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Crawl and render health</strong>, whether AI systems can access and process your pages</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Trust signals</strong>, reviews, citations, and references from other credible sources</span>
              </li>
            </ul>
          </div>

          {/* AI Search vs Traditional SEO */}
          <div id="ai-vs-seo" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6">AI search vs traditional SEO</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Traditional SEO</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>Ranking pages in a list of results</li>
                  <li>Optimizing for keywords and backlinks</li>
                  <li>Driving clicks to your homepage</li>
                  <li>Persuading visitors once they arrive</li>
                  <li>Competing for position on a results page</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">AI search and recommendation</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>Recommending businesses directly by name</li>
                  <li>Understanding entities and confidence levels</li>
                  <li>Providing answers and actions, not just links</li>
                  <li>Citing referenceable definitions and facts</li>
                  <li>Being included or excluded from the answer</li>
                </ul>
              </div>
            </div>
          </div>

          {/* What Found For AI Is and Is Not */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">What Found For AI is, and what it is not</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">What it is</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• A focused framework for AI discoverability</li>
                  <li>• Implementation of structured data and entity clarity</li>
                  <li>• Technical improvements that help machines understand your business</li>
                  <li>• A way to become citable and recommendable by AI systems</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-muted-foreground">What it is not</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• A replacement for traditional SEO or marketing</li>
                  <li>• A promise of specific rankings or placements</li>
                  <li>• A way to manipulate or trick AI systems</li>
                  <li>• A one time fix that never needs attention</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="mb-16 py-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">If you want help implementing this, start here.</p>
            <Link href="/pricing" data-testid="link-cta-pricing">
              <Button size="lg" className="text-lg" style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}>
                Get My AI Visibility Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Implementation Options (What we do, moved below) */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Implementation options</h2>
            <p className="text-muted-foreground mb-6">
              If you choose to work with Found For AI, here is what we can implement for your business.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>AI visibility audit and action plan</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Schema.org (JSON-LD) implementation and validation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>robots.txt, llms.txt, and sitemap creation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>OpenGraph and metadata cleanup</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Core Web Vitals tuning for better crawl and render</span>
              </li>
            </ul>
          </div>

          {/* Secondary CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/services" data-testid="link-services">
              <Button variant="outline" size="lg">
                See All Services
              </Button>
            </Link>
            <Link href="/pricing" data-testid="link-pricing">
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            <div className="space-y-4">
              <details data-testid="faq-agency">
                <summary className="cursor-pointer text-lg font-semibold py-3" data-testid="faq-summary-agency">
                  Are you an agency or a product?
                </summary>
                <p className="text-muted-foreground py-3 pl-4">
                  We are a focused studio with a productized service model. You get fast deliverables and clear outcomes.
                </p>
              </details>
              <details data-testid="faq-speed">
                <summary className="cursor-pointer text-lg font-semibold py-3" data-testid="faq-summary-speed">
                  How fast is the Starter Fix?
                </summary>
                <p className="text-muted-foreground py-3 pl-4">
                  Delivered within 7 business days for up to 10 pages.
                </p>
              </details>
              <details data-testid="faq-upgrade">
                <summary className="cursor-pointer text-lg font-semibold py-3" data-testid="faq-summary-upgrade">
                  Can I upgrade?
                </summary>
                <p className="text-muted-foreground py-3 pl-4">
                  Yes, our Pro Visibility Plan adds ongoing optimization and reporting.
                </p>
              </details>
            </div>
          </div>

          {/* About the Founder */}
          <div className="pt-8 border-t border-border">
            <p className="text-muted-foreground">
              Found For AI was created by Dustin Crump to help businesses navigate the shift to AI powered search.{' '}
              <Link href="/about" className="text-primary hover:underline" data-testid="link-about-founder">
                About the founder
              </Link>
            </p>
          </div>

        </div>
      </section>
    </PageLayout>
  );
}
