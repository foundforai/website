import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import FAQSection from '@/components/FAQSection';

export default function WhatIsAISEO() {
  const comparisonData = [
    { old: 'Keywords', new: 'Entities' },
    { old: 'Backlinks', new: 'Structured data' },
    { old: 'Long blogs', new: 'Clear facts and FAQs' },
    { old: 'Human-only reading', new: 'AI agents reading HTML and JSON-LD' },
  ];

  return (
    <PageLayout
      title="What Is AI SEO - Understanding AI Search Optimization | Found For AI"
      description="Learn the difference between traditional SEO and AI SEO. Discover how schema markup, structured data, and semantic content help AI find your business."
      canonical="https://foundforai.com/what-is-ai-seo"
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            What Is AI SEO?
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
            <p>
              AI SEO is the practice of optimizing your website so that AI models like ChatGPT, Perplexity, and Google's AI Overviews can understand, extract, and recommend your content. Unlike traditional SEO that focuses on keyword rankings, AI SEO ensures your business is discoverable when users ask AI assistants natural language questions.
            </p>
            <p>
              The shift is fundamental: AI doesn't crawl for keywords—it reads structured data, semantic HTML, and clear content to understand who you are, what you offer, and when to recommend you.
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Old SEO vs AI SEO
          </h2>

          <Card className="mb-12 overflow-hidden">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="py-4 px-6 text-left font-semibold">Old SEO</th>
                    <th className="py-4 px-6 text-left font-semibold">AI SEO</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-muted/50' : 'bg-background'}>
                      <td className="py-4 px-6 text-red-600 dark:text-red-400 font-medium">{row.old}</td>
                      <td className="py-4 px-6 text-accent-foreground font-medium">{row.new}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-2">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get AI Ready?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Get your free AI Readiness Scorecard and discover exactly what's holding you back from AI discovery.
              </p>
              <Link href="/audit">
                <Button size="lg" className="font-semibold group" data-testid="button-get-audit-cta">
                  Get My Free Audit
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <FAQSection />
    </PageLayout>
  );
}
