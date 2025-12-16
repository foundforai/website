import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, Check } from 'lucide-react';

export default function AEO() {
  const benefits = [
    "AI assistants reference your brand in answers",
    "Your business details are clearly understood by AI systems",
    "Your services, location, and FAQs are interpreted correctly",
    "Your site is reliable and trustworthy from an AI perspective"
  ];

  const implementations = [
    {
      title: "AI Data Layer Installation",
      description: "We install a clean, consistent AI Data Layer that clearly defines your business identity — including who you are, what you offer, where you operate, and how customers engage with you."
    },
    {
      title: "AI Visibility Layer Optimization",
      description: "We ensure AI systems can reliably access and interpret your business information across your site."
    },
    {
      title: "Answer-Ready Content",
      description: "We organize key information like services, FAQs, and locations so AI can confidently reference your business."
    },
    {
      title: "Discovery & Access Signals",
      description: "We make it easy for AI systems to discover and read your site without friction."
    },
    {
      title: "Performance & Clarity Cleanup",
      description: "Fast loading pages and clear structure help AI systems understand your site efficiently."
    }
  ];

  return (
    <PageLayout
      title="What is AEO (Answer Engine Optimization)? | Found For AI"
      description="AEO helps your business appear inside AI-generated answers from tools like ChatGPT, Gemini, and Perplexity — not just as a link, but as a recommended source."
      canonical="https://foundforai.com/aeo"
    >
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            What Is AEO (Answer Engine Optimization)?
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
            AEO helps your business appear inside AI-generated answers from tools like ChatGPT, Gemini, and Perplexity — not just as a link, but as a recommended source.
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Instead of optimizing only for search engines, AEO ensures AI systems can understand, trust, and accurately represent your business when answering real customer questions.
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            At Found For AI, we do this by installing your <strong>AI Data Layer</strong> and strengthening your <strong>AI Visibility Layer</strong> — so AI assistants know who you are, what you offer, and when to recommend you.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Why AEO Matters
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            AI assistants are quickly becoming the first place people ask questions. If AI can't clearly read your business, it won't recommend you.
          </p>
          <p className="text-lg font-medium mb-8 text-center">AEO helps ensure that:</p>
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
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            SEO vs AEO, At a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">SEO</h3>
                <p className="text-muted-foreground mb-4">SEO focuses on ranking pages in search engines.</p>
                <p className="text-muted-foreground">SEO helps people find you.</p>
              </CardContent>
            </Card>
            <Card className="border-accent">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 text-accent">AEO</h3>
                <p className="text-muted-foreground mb-4">AEO focuses on being cited and recommended by AI.</p>
                <p className="text-muted-foreground">AEO helps AI recommend you.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Implement */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            What We Implement
          </h2>
          <div className="space-y-6">
            {implementations.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
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
                Run your free AI Visibility Check to see how AI systems currently interpret your business — or grab the Starter Fix to install your AI Data Layer and become AI-ready quickly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/audit">
                  <Button size="lg" className="font-semibold group" data-testid="button-cta-check">
                    Run Free AI Visibility Check →
                  </Button>
                </Link>
                <a href="https://square.link/u/o25cVCY4" target="_blank" rel="noopener">
                  <Button variant="outline" size="lg" className="font-semibold" data-testid="button-cta-buy">
                    Buy Starter Fix – $1,595 →
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
