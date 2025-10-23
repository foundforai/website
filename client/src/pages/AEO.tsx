import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, Check } from 'lucide-react';

export default function AEO() {
  const benefits = [
    "AI assistants cite your brand in answers",
    "Machine-readable with JSON-LD schema",
    "Answer-ready conversational content",
    "Entity mapping (Organization, Service, FAQ)",
    "Structured sitemaps and metadata",
    "Fast renderability for AI crawlers"
  ];

  const seoVsAeo = [
    { aspect: 'Goal', seo: 'Rank pages/keywords in Google', aeo: 'Get cited in AI answers' },
    { aspect: 'Focus', seo: 'Links & on-page signals', aeo: 'Entities, schema, answer formatting' },
    { aspect: 'Content', seo: 'Blog posts, keywords', aeo: 'FAQs, clear facts, structured data' },
    { aspect: 'Tech', seo: 'Meta tags, header optimization', aeo: 'JSON-LD, robots/llms.txt, entities' }
  ];

  return (
    <PageLayout
      title="What is AEO (Answer Engine Optimization)? | Found For AI"
      description="AEO makes your content show up inside AI-generated answers from ChatGPT, Gemini, and Perplexity. Learn how to structure your site so AI assistants can understand, trust, and cite your brand."
      canonical="https://foundforai.com/aeo"
    >
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            What is AEO (Answer Engine Optimization)?
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            AEO makes your content show up <strong>inside AI-generated answers</strong> (ChatGPT, Gemini, Perplexity) — not just as blue links.
            We structure your site so assistants can understand, trust, and cite your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/audit">
              <Button size="lg" className="font-semibold group" data-testid="button-hero-check">
                Run Free AI Visibility Check
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="font-semibold" data-testid="button-hero-pricing">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why AEO Matters */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Why AEO Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                  <span className="text-base">{benefit}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO vs AEO Comparison */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            SEO vs AEO, in One Glance
          </h2>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="py-4 px-6 text-left font-semibold">Aspect</th>
                    <th className="py-4 px-6 text-left font-semibold">SEO</th>
                    <th className="py-4 px-6 text-left font-semibold">AEO</th>
                  </tr>
                </thead>
                <tbody>
                  {seoVsAeo.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-muted/50' : 'bg-background'}>
                      <td className="py-4 px-6 font-semibold text-foreground">{row.aspect}</td>
                      <td className="py-4 px-6 text-muted-foreground">{row.seo}</td>
                      <td className="py-4 px-6 text-accent font-medium">{row.aeo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What We Implement */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            What We Implement
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12">
            <p>
              <strong>Entity & Schema Mapping:</strong> We implement Organization, Service, FAQ, and other schema types so AI understands your business structure.
            </p>
            <p>
              <strong>Sitemaps & Discovery:</strong> robots.txt, llms.txt, and properly formatted sitemaps ensure AI crawlers can access and index your content.
            </p>
            <p>
              <strong>Metadata Cleanup:</strong> Consistent OpenGraph, Twitter cards, and meta descriptions across all pages.
            </p>
            <p>
              <strong>Performance Tuning:</strong> Fast page loads and clean HTML make your site easier for AI to render and parse.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <Card className="border-2 border-primary shadow-xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Run your free AI Visibility Check or grab the Starter Fix package to get AI-ready in 7 business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/audit">
                  <Button size="lg" className="font-semibold group" data-testid="button-cta-check">
                    Run Free AI Visibility Check →
                  </Button>
                </Link>
                <a href="https://square.link/u/o25cVCY4" target="_blank" rel="noopener">
                  <Button variant="outline" size="lg" className="font-semibold" data-testid="button-cta-buy">
                    Buy Starter Fix – $495 →
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
}
