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
          "name": "What does \"Found for AI\" actually mean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your site is structured so AI assistants can understand what you do, who you serve, and when to recommend you — not just index a page."
          }
        },
        {
          "@type": "Question",
          "name": "How is this different from traditional SEO?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We prioritize entities, JSON-LD schema, sitemaps, metadata consistency, and performance so AI models can parse and cite your content."
          }
        },
        {
          "@type": "Question",
          "name": "How fast is the Starter Fix?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Delivered within 7 business days for up to 10 pages, including audit, schema, sitemap, robots/llms.txt, and OG/Twitter cards."
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
      <section className="proof-strip" aria-label="Trusted AI search tools">
        <p className="proof-text">Trusted by teams optimizing for AI search tools:</p>
        <ul className="logo-row">
          <li><img src="/assets/logos/chatgpt.svg" alt="ChatGPT" loading="lazy" data-testid="logo-chatgpt" /></li>
          <li><img src="/assets/logos/gemini.svg" alt="Google Gemini" loading="lazy" data-testid="logo-gemini" /></li>
          <li><img src="/assets/logos/perplexity.svg" alt="Perplexity" loading="lazy" data-testid="logo-perplexity" /></li>
          <li><img src="/assets/logos/claude.svg" alt="Claude" loading="lazy" data-testid="logo-claude" /></li>
          <li><img src="/assets/logos/copilot.svg" alt="Microsoft Copilot" loading="lazy" data-testid="logo-copilot" /></li>
        </ul>
      </section>

      {/* 3. AI DEMO (Before vs After) */}
      <section className="ai-demo" id="ai-demo">
        <h2>How AI sees your business — before and after</h2>
        <p className="sub">We optimize your structure so assistants can read and recommend you.</p>
        <div className="demo-grid">
          <article className="demo-card">
            <h3>Before</h3>
            <img src="/assets/demo-before.svg" alt="AI response before optimization" loading="lazy" width="640" height="400" data-testid="demo-before-image" />
            <ul className="ticks">
              <li>Missing entities & schema</li>
              <li>Inconsistent metadata</li>
              <li>Not referenced in AI answers</li>
            </ul>
          </article>
          <article className="demo-card after">
            <h3>After</h3>
            <img src="/assets/demo-after.svg" alt="AI response after optimization" loading="lazy" width="640" height="400" data-testid="demo-after-image" />
            <ul className="ticks">
              <li>Recognized brand/entity</li>
              <li>Valid JSON-LD & sitemap</li>
              <li>Shows up in AI answers</li>
            </ul>
          </article>
        </div>
        <Link href="/pricing" className="btn primary demo-cta" data-testid="button-demo-cta">
          Get My AI Visibility Audit →
        </Link>
      </section>

      {/* 4. FOUNDER NOTE / TESTIMONIAL */}
      <section className="founder" aria-label="Founder note">
        <div className="founder-wrap">
          <img className="headshot" src="/assets/dustin-crump.jpg" alt="Dustin Crump" loading="lazy" width="96" height="96" data-testid="founder-headshot" />
          <blockquote>
            "I built Found For AI after hearing the same question from business owners: 'How do we show up in ChatGPT?' We make your site readable by AI — fast."
          </blockquote>
          <p className="sig">— <strong>Dustin Crump</strong>, Founder</p>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="faq" id="faq">
        <h2>FAQ</h2>
        <details data-testid="faq-found-for-ai">
          <summary data-testid="faq-summary-found-for-ai">What does "Found for AI" actually mean?</summary>
          <p>Your site is structured so AI assistants can understand what you do, who you serve, and when to recommend you — not just index a page.</p>
        </details>
        <details data-testid="faq-different-seo">
          <summary data-testid="faq-summary-different-seo">How is this different from traditional SEO?</summary>
          <p>We prioritize entities, JSON-LD schema, sitemaps, metadata consistency, and performance so AI models can parse and cite your content.</p>
        </details>
        <details data-testid="faq-starter-speed">
          <summary data-testid="faq-summary-starter-speed">How fast is the Starter Fix?</summary>
          <p>Delivered within 7 business days for up to 10 pages, including audit, schema, sitemap, robots/llms.txt, and OG/Twitter cards.</p>
        </details>
      </section>

      {/* 6. EXPLAINER SECTION */}
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

      {/* 7. OFFER CARD - Starter Fix $495 */}
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

      {/* 8. UPSELL TILES */}
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

      {/* 9. FINAL CTA */}
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
