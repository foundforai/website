import PageLayout from '@/components/PageLayout';

const aiSearchVisibilitySchemas = [
  {
    "@type": "WebPage",
    "@id": "https://foundforai.com/ai-search-visibility#page",
    "url": "https://foundforai.com/ai-search-visibility",
    "name": "AI Search Visibility for Businesses",
    "isPartOf": { "@id": "https://foundforai.com/#website" },
    "about": { "@id": "https://foundforai.com/#service-ai-visibility" }
  },
  {
    "@type": "Service",
    "@id": "https://foundforai.com/#service-ai-visibility",
    "name": "AI Search Visibility Optimization",
    "serviceType": "AI Search Visibility Optimization",
    "description": "Optimization of websites and business data so AI assistants can understand, trust, and recommend a business in AI generated answers.",
    "provider": { "@id": "https://foundforai.com/#org" },
    "serviceAudience": {
      "@type": "Audience",
      "audienceType": ["Local service businesses", "Professional services", "Agencies", "Online businesses"]
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceLocation": { "@type": "VirtualLocation", "url": "https://foundforai.com" }
    },
    "areaServed": { "@type": "Country", "name": "United States" },
    "offers": {
      "@type": "Offer",
      "price": "1595",
      "priceCurrency": "USD",
      "url": "https://foundforai.com/services",
      "availability": "https://schema.org/InStock"
    }
  },
  {
    "@type": "FAQPage",
    "@id": "https://foundforai.com/ai-search-visibility#faq",
    "isPartOf": { "@id": "https://foundforai.com/ai-search-visibility#page" },
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does it take for AI systems to use this information?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI platforms update on their own timelines. Most changes are reflected within two to eight weeks after implementation."
        }
      },
      {
        "@type": "Question",
        "name": "Does this replace SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. AI search visibility complements traditional SEO by addressing how AI assistants interpret and recommend businesses."
        }
      },
      {
        "@type": "Question",
        "name": "Do you need to rebuild my website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Usually no. Found For AI works with your existing site and adds an AI focused data layer."
        }
      },
      {
        "@type": "Question",
        "name": "Is this a monthly service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. This is typically a one time implementation, with optional future expansions."
        }
      }
    ]
  }
];

export default function AISearchVisibility() {
  return (
    <PageLayout
      title="AI Search Visibility for Businesses | Found For AI"
      description="Found For AI helps businesses become visible to AI assistants like ChatGPT, Google Gemini, and Perplexity through AI readable data layers."
      canonical="https://foundforai.com/ai-search-visibility"
      schemas={aiSearchVisibilitySchemas}
    >
      <article className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">AI Search Visibility for Businesses</h1>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">What does Found For AI do?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Found For AI helps businesses become visible to AI assistants like ChatGPT, Google Gemini, and Perplexity. We install and optimize an AI readable data layer on your website so modern AI systems can correctly understand your services, location, and booking options, and confidently recommend your business when customers ask for help.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">What is AI Search Visibility?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AI search visibility is the ability for your business to be recognized, understood, and referenced by AI powered search tools. Unlike traditional search engines that rank web pages, AI assistants generate answers. If your business information is not structured clearly, AI systems cannot reliably include you in those answers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">How AI Tools Decide Which Businesses to Recommend</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              AI assistants evaluate businesses based on clarity and trust, not design or keywords. They look for:
            </p>
            <ul className="list-disc list-inside text-lg text-muted-foreground space-y-2 mb-4">
              <li>Structured data that defines services, location, and contact details</li>
              <li>Clear entity relationships between your brand, services, and people</li>
              <li>Consistent information across your website and public profiles</li>
              <li>Verifiable signals that confirm your business is real and current</li>
            </ul>
            <p className="text-lg text-muted-foreground leading-relaxed">
              If these signals are missing or fragmented, AI tools skip your business.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">What Found For AI Actually Does</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Problem</th>
                    <th className="text-left py-3 px-4 font-semibold">What We Fix</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">AI cannot understand your services</td>
                    <td className="py-3 px-4 text-muted-foreground">We structure your services using AI readable schema</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">Your booking link is invisible to AI</td>
                    <td className="py-3 px-4 text-muted-foreground">We expose scheduling and contact actions to AI systems</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">Business details are unclear or inconsistent</td>
                    <td className="py-3 px-4 text-muted-foreground">We normalize and connect your business data</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">Your site works for humans but not AI</td>
                    <td className="py-3 px-4 text-muted-foreground">We add a dedicated AI visibility layer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Who This Is For</h2>
            <ul className="list-disc list-inside text-lg text-muted-foreground space-y-2 mb-4">
              <li>Local service businesses</li>
              <li>Professional service firms</li>
              <li>Marketing and web agencies</li>
              <li>SaaS and online service companies</li>
            </ul>
            <p className="text-lg text-muted-foreground leading-relaxed">
              If customers might ask AI for recommendations in your category, this applies to you.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">How This Is Different From Traditional SEO</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">AI Search Visibility</th>
                    <th className="text-left py-3 px-4 font-semibold">Traditional SEO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">Optimizes for AI generated answers</td>
                    <td className="py-3 px-4 text-muted-foreground">Optimizes for search result rankings</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">Focuses on structured data and entities</td>
                    <td className="py-3 px-4 text-muted-foreground">Focuses on keywords and backlinks</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">Designed for assistants like ChatGPT and Gemini</td>
                    <td className="py-3 px-4 text-muted-foreground">Designed for Google search results</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">How long does it take for AI systems to use this information?</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  AI platforms update on their own timelines. Most changes are reflected within two to eight weeks after implementation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Does this replace SEO?</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  No. AI search visibility complements traditional SEO by addressing how AI assistants interpret and recommend businesses.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Do you need to rebuild my website?</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Usually no. We work with your existing site and add an AI focused data layer.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Is this a monthly service?</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  No. This is typically a one time implementation, with optional future expansions.
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </PageLayout>
  );
}
