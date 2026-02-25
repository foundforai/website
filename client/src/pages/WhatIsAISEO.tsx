import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import FAQSection from '@/components/FAQSection';

export default function WhatIsAISEO() {
  useEffect(() => {
    const faqSchema = document.createElement('script');
    faqSchema.type = 'application/ld+json';
    faqSchema.id = 'what-is-ai-seo-faq-schema';
    faqSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why are AI queries different than Google searches?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI queries are conversational and context-driven. Instead of scanning a list of links like Google, AI gives one or two answers it trusts. If your business isn't part of that trusted answer set, you're invisible to customers using AI tools like ChatGPT and Perplexity."
          }
        },
        {
          "@type": "Question",
          "name": "Why do I need to be found by AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "More customers are now asking AI tools for recommendations instead of searching on Google. Being found by AI means your business information is structured so large language models can read, understand, and confidently recommend your brand."
          }
        },
        {
          "@type": "Question",
          "name": "Will AI searches replace Google?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI-driven discovery is already reshaping how people find information. Google is moving toward AI-first results, and platforms like ChatGPT and Perplexity are becoming new discovery channels. Traditional SEO still matters, but AI visibility is now essential."
          }
        },
        {
          "@type": "Question",
          "name": "Will AI searches and queries help customers find my business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It can, if your website is AI-readable. Structured data, FAQs, and contextual clarity make it easy for AI systems to understand what you do and include your business in relevant responses."
          }
        },
        {
          "@type": "Question",
          "name": "What does it mean to be Found by AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Being Found by AI means your website, services, and business details are optimized so AI tools can interpret them correctly and recommend you when users ask related questions."
          }
        },
        {
          "@type": "Question",
          "name": "How do I know if my site is AI-ready?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can request a free AI Readiness Audit at FoundForAI.com/audit. We'll assess your visibility across AI tools and provide a personalized plan to increase your discoverability."
          }
        }
      ]
    });
    document.head.appendChild(faqSchema);

    return () => {
      const existing = document.getElementById('what-is-ai-seo-faq-schema');
      if (existing) {
        document.head.removeChild(existing);
      }
    };
  }, []);
  const comparisonData = [
    { old: 'Keywords', new: 'Meaning and context' },
    { old: 'Backlinks', new: 'Verified business facts' },
    { old: 'Long blog posts', new: 'Clear answers and summaries' },
    { old: 'Content written only for people', new: 'AI systems interpreting your site' },
  ];

  return (
    <PageLayout
      title="What Is AI SEO - Understanding AI Search Optimization | Found For AI"
      description="Learn the difference between traditional SEO and AI SEO. Discover how to make your business clearly understandable to AI systems like ChatGPT and Perplexity."
      canonical="https://foundforai.com/what-is-ai-seo"
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            What Is AI SEO?
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
            <p>
              AI SEO is the practice of making your business clearly understandable to AI systems like ChatGPT, Perplexity, and Google's AI results, so they can confidently recommend you when people ask for help.
            </p>
            <p>
              At Found For AI, we call this AI visibility, we install an AI readability layer plus structured data so the machines and humans see the same truth.
            </p>
            <p>
              Unlike traditional SEO, which focused on ranking pages for keywords, AI SEO focuses on clarity, context, and trust. AI systems don't search the web the way humans do. They interpret information to decide which businesses are relevant, credible, and worth mentioning.
            </p>
            <p>
              The shift is fundamental. AI systems don't hunt for keywords. They interpret meaning, context, and signals of credibility to understand who you are, what you offer, and when you're a good recommendation.
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Old SEO vs AI SEO
          </h2>

          <Card className="mb-12 overflow-hidden">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="text-white" style={{ backgroundColor: '#0F5FDB' }}>
                    <th className="py-4 px-6 text-left font-semibold">Old SEO</th>
                    <th className="py-4 px-6 text-left font-semibold">AI SEO</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-muted/50' : 'bg-background'}>
                      <td className="py-4 px-6 text-red-600 dark:text-red-400 font-medium">{row.old}</td>
                      <td className="py-4 px-6 text-green-700 dark:text-green-400 font-medium">{row.new}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card className="border-2" style={{ background: 'linear-gradient(to bottom right, rgba(15, 95, 219, 0.1), rgba(15, 95, 219, 0.05))' }}>
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get AI Ready?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Get your free AI Readiness Scorecard and discover exactly what's holding you back from AI discovery.
              </p>

              <div className="mb-8">
                <h4 className="text-xl font-bold mb-3">Who this is for</h4>
                <p className="text-muted-foreground">
                  If you sell a real service in a real place, HVAC, dental, plumbing, med spa, legal, home services, and you rely on phone calls, bookings, or estimates, this matters now.
                </p>
              </div>

              <Link href="/audit">
                <Button size="lg" className="font-semibold group" style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }} data-testid="button-get-audit-cta">
                  Get My Free Audit
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <div className="mt-8">
                <h4 className="text-xl font-bold mb-3">What you get in the free scorecard</h4>
                <p className="text-muted-foreground">
                  A snapshot of what AI can see about your business today, what it cannot, the top visibility gaps holding you back, and the fastest fixes to become recommendable.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <FAQSection />
    </PageLayout>
  );
}
