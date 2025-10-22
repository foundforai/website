import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'wouter';
import { Check, TrendingUp, Search, Zap, ArrowRight } from 'lucide-react';

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

  const proofQuotes = [
    { quote: "AI search is changing everything.", source: "Forbes" },
    { quote: "SEO as we know it is over.", source: "Search Engine Journal" },
    { quote: "Early AI optimization wins visibility.", source: "HubSpot Research" },
  ];

  const stats = [
    { value: "63%", label: "Consumers now ask AI before Google." },
    { value: "90%", label: "Websites are not yet visible to ChatGPT." },
    { value: "#1", label: "Structured data drives AI answers." },
  ];

  const starterFeatures = [
    "Schema.org validation",
    "robots.txt + llms.txt",
    "Sitemap creation + Search Console submission",
    "OpenGraph/Twitter cards",
    "Core Web Vitals report",
    "AI bot access permissions",
  ];

  const upsellTiles = [
    {
      title: "Pro Visibility Plan",
      description: "Ongoing AI optimization, 5-cluster topic buildout, monthly reporting.",
      link: "https://calendar.app.google/VUK3jfv6jSf1ezHv5",
    },
    {
      title: "Enterprise & Agency Integration",
      description: "White-label or multi-site AI SEO for larger teams.",
      link: "https://calendar.app.google/VUK3jfv6jSf1ezHv5",
    },
    {
      title: "Custom Audit",
      description: "Tailored analysis for unique stacks or web apps.",
      link: "https://calendar.app.google/VUK3jfv6jSf1ezHv5",
    },
  ];

  return (
    <PageLayout
      title="Found For AI | The New Way to Be Discovered"
      description="Found For AI helps businesses become visible in AI search engines like ChatGPT, Gemini, and Perplexity. We build your discoverability for the next era of search."
      canonical="https://foundforai.com"
      ogImage="/logo.png"
    >
      {/* 1. HERO SECTION */}
      <section className="hero hero--brand">
        <h1>Found for AI.</h1>
        <h2>The new way to be discovered.</h2>
        <p>We help your business show up where customers actually search — in AI assistants like ChatGPT, Gemini, and Perplexity. From schema to AI visibility audits, we make sure your site is findable in the next era of search.</p>
        <Link href="/pricing" className="btn primary" data-testid="button-hero-cta">
          Get My AI Visibility Audit →
        </Link>
      </section>

      {/* 2. PROOF STRIP */}
      <section className="py-8 bg-muted/30 border-y">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proofQuotes.map((item, index) => (
              <div key={index} className="text-center" data-testid={`proof-quote-${index}`}>
                <p className="text-sm md:text-base text-muted-foreground italic">
                  "{item.quote}"
                </p>
                <p className="text-xs md:text-sm font-semibold mt-2 text-foreground">
                  — {item.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EXPLAINER SECTION */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why AI SEO Is Exploding in 2025
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              AI assistants are becoming the new discovery engines. Sites must be AI-readable with proper schema, sitemaps, and metadata to be found in this new landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center" data-testid={`stat-card-${index}`}>
                <CardContent className="p-8">
                  <div className="text-5xl md:text-6xl font-bold text-primary mb-4">
                    {stat.value}
                  </div>
                  <p className="text-base text-muted-foreground">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OFFER CARD - Starter Fix $495 */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <Card className="border-2 border-primary shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl md:text-4xl mb-2">
                Starter Fix — $495
              </CardTitle>
              <CardDescription className="text-lg">
                Delivered within 7 business days
              </CardDescription>
              <p className="text-base text-muted-foreground mt-2">
                Complete AI SEO audit and technical setup for up to 10 pages.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3 mb-8">
                {starterFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                    <span className="text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center space-y-3">
                <a
                  href="https://square.link/u/o25cVCY4"
                  target="_blank"
                  rel="noopener"
                  data-testid="button-starter-fix"
                >
                  <Button size="lg" className="w-full md:w-auto text-lg px-12 font-semibold">
                    Book Starter Fix – $495
                  </Button>
                </a>
                <p className="text-sm text-muted-foreground">
                  Secure checkout via Square.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 5. UPSELL TILES */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upsellTiles.map((tile, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                data-testid={`upsell-card-${index}`}
              >
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{tile.title}</CardTitle>
                  <CardDescription className="text-base">
                    {tile.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href={tile.link}
                    target="_blank"
                    rel="noopener"
                    data-testid={`button-${tile.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Button variant="secondary" size="lg" className="w-full font-semibold">
                      Schedule a Call
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Your Tech SEO & AI SEO Issues Fixed.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Every day you're invisible to AI search, you're losing customers. Let's change that.
          </p>
          <Link href="/pricing">
            <Button size="lg" className="text-lg px-8 font-semibold" data-testid="button-final-cta">
              View Pricing & Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* SUPPORT NOTE */}
      <section className="py-8 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            Questions?{' '}
            <a
              href="mailto:support@foundforai.com"
              className="text-primary hover:underline font-medium"
              data-testid="link-support-email"
            >
              support@foundforai.com
            </a>{' '}
            — 24-hour response.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
