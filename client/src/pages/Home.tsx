import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import ValueCards from '@/components/ValueCards';
import ScorecardSection from '@/components/ScorecardSection';
import FAQSection from '@/components/FAQSection';

export default function Home() {
  useEffect(() => {
    const softwareAppSchema = document.createElement('script');
    softwareAppSchema.type = 'application/ld+json';
    softwareAppSchema.id = 'software-app-schema';
    softwareAppSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "FoundForAI",
      "url": "https://foundforai.com",
      "applicationCategory": "SEO, AI Optimization, Marketing Automation",
      "operatingSystem": "All",
      "description": "FoundForAI helps businesses optimize their online presence for AI-driven search engines like ChatGPT, Gemini, and Perplexity. We make your business discoverable by AI.",
      "creator": {
        "@type": "Organization",
        "name": "FoundForAI",
        "url": "https://foundforai.com",
        "logo": "https://foundforai.com/logo.png",
        "sameAs": [
          "https://www.linkedin.com/company/foundforai",
          "https://x.com/fripseai"
        ]
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    });
    document.head.appendChild(softwareAppSchema);

    const faqSchema = document.createElement('script');
    faqSchema.type = 'application/ld+json';
    faqSchema.id = 'homepage-faq-schema';
    faqSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why do I need to be found by AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Because AI assistants like ChatGPT, Gemini, and Perplexity are the new search engines. Your customers are asking AI, not Google — and if AI can't see you, you don't exist to them."
          }
        },
        {
          "@type": "Question",
          "name": "Will AI searches replace Google?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI searches are already reshaping discovery. They won't fully replace Google overnight, but they'll become the main way people find businesses by 2026."
          }
        },
        {
          "@type": "Question",
          "name": "How does FoundForAI help my business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We make your business visible to AI by optimizing your website content, metadata, and structure for AI crawlers — so your business appears in AI-generated answers and search results."
          }
        }
      ]
    });
    document.head.appendChild(faqSchema);

    return () => {
      const existingSoftwareSchema = document.getElementById('software-app-schema');
      const existingFaqSchema = document.getElementById('homepage-faq-schema');
      if (existingSoftwareSchema) {
        document.head.removeChild(existingSoftwareSchema);
      }
      if (existingFaqSchema) {
        document.head.removeChild(existingFaqSchema);
      }
    };
  }, []);

  return (
    <PageLayout
      title="Found For AI - Make Your Website Discoverable by AI Search"
      description="AI SEO consulting that optimizes your website for ChatGPT, Perplexity, and AI-driven search. Get schema markup, GEO optimization, and AI readiness audits."
      canonical="https://foundforai.com/"
    >
      <Hero />
      <ValueCards />
      <ScorecardSection />
      <FAQSection />
    </PageLayout>
  );
}
