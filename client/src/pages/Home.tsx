import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'wouter';
import { Check, TrendingUp, Search, Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  const [currentAssistant, setCurrentAssistant] = useState<'chatgpt' | 'gemini' | 'perplexity'>('chatgpt');
  const [isAfter, setIsAfter] = useState(false);

  const ANSWERS = {
    chatgpt: {
      before: {
        text: "I couldn't find enough structured information about this business. It may not provide clear entity data or schema for assistants.",
        badges: ["No schema", "Entity unknown", "Not cited"]
      },
      after: {
        text: "Found For AI is a studio that makes businesses discoverable in AI search (ChatGPT, Gemini, Perplexity) using AI SEO and AEO. Based in Utah; services include schema implementation, sitemaps, and performance tuning.",
        badges: ["Valid JSON-LD", "Recognized entity", "Cited in answers"]
      }
    },
    gemini: {
      before: {
        text: "This brand isn't clearly defined as an entity. Content lacks structured data and consistent metadata.",
        badges: ["Weak entity", "Missing schema"]
      },
      after: {
        text: "Found For AI (Utah) helps companies appear in AI answers via structured data (JSON-LD), llms.txt/robots.txt, and AEO content. Starter Fix completes in ~7 business days for up to 10 pages.",
        badges: ["Organization schema", "Sitemap submitted", "Assistant-ready copy"]
      }
    },
    perplexity: {
      before: {
        text: "Limited signals detected. I can't confidently summarize this business.",
        badges: ["Low confidence", "Unstructured"]
      },
      after: {
        text: "Found For AI improves AI visibility with entity mapping, schema validation, and speed optimizations, enabling assistants to parse and reference the site.",
        badges: ["Entity mapped", "Fast render", "LLM-accessible"]
      }
    }
  };

  const JSONLD = {
    before: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "(missing)",
      "url": "(missing)",
      "description": "(not provided)"
    },
    after: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Found For AI",
      "url": "https://foundforai.com",
      "logo": "https://foundforai.com/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "UT",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://x.com/foundforai",
        "https://www.linkedin.com/company/foundforai"
      ]
    }
  };

  const mode = isAfter ? 'after' : 'before';
  const currentAnswer = ANSWERS[currentAssistant][mode];
  const currentJSON = JSONLD[mode];

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

      {/* 3. AI LAB - Interactive Demo */}
      <section id="ai-lab" className="ai-lab">
        <h2 className="ai-lab__title">See how AI answers change after optimization</h2>
        <p className="ai-lab__sub">
          Switch assistants and compare before vs. after. We structure entities + schema so AI can cite your brand.
        </p>

        <div className="ai-lab__tabs" role="tablist" aria-label="AI assistants">
          <button
            className={`tab ${currentAssistant === 'chatgpt' ? 'is-active' : ''}`}
            onClick={() => setCurrentAssistant('chatgpt')}
            role="tab"
            aria-selected={currentAssistant === 'chatgpt'}
            data-testid="tab-chatgpt"
          >
            ChatGPT
          </button>
          <button
            className={`tab ${currentAssistant === 'gemini' ? 'is-active' : ''}`}
            onClick={() => setCurrentAssistant('gemini')}
            role="tab"
            aria-selected={currentAssistant === 'gemini'}
            data-testid="tab-gemini"
          >
            Gemini
          </button>
          <button
            className={`tab ${currentAssistant === 'perplexity' ? 'is-active' : ''}`}
            onClick={() => setCurrentAssistant('perplexity')}
            role="tab"
            aria-selected={currentAssistant === 'perplexity'}
            data-testid="tab-perplexity"
          >
            Perplexity
          </button>
          <div className="toggle">
            <span>Before</span>
            <label 
              className="switch" 
              data-testid="toggle-label-before-after"
              onClick={(e) => {
                e.preventDefault();
                setIsAfter(!isAfter);
              }}
            >
              <input
                id="aiToggle"
                type="checkbox"
                checked={isAfter}
                readOnly
                aria-label="Toggle Before/After"
                data-testid="toggle-before-after"
              />
              <span className="slider"></span>
            </label>
            <span>After</span>
          </div>
        </div>

        <div className="ai-lab__grid">
          <article className="answer" aria-live="polite">
            <div className="answer__header">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="answer__body" data-testid="answer-body">
              {currentAnswer.text.split('Found For AI').map((part, index, arr) =>
                index < arr.length - 1 ? (
                  <span key={index}>
                    {part}
                    <mark>Found For AI</mark>
                  </span>
                ) : (
                  part
                )
              )}
            </div>
            <div className="answer__badges" data-testid="answer-badges">
              {currentAnswer.badges.map((badge, index) => (
                <span key={index} className="badge">
                  {badge}
                </span>
              ))}
            </div>
          </article>

          <aside className="code">
            <div className="code__label">JSON-LD (Organization)</div>
            <pre>
              <code className="language-json" data-testid="code-block">
                {JSON.stringify(currentJSON, null, 2)}
              </code>
            </pre>
          </aside>
        </div>

        <Link href="/pricing" className="btn primary ai-lab__cta" data-testid="button-ai-lab-cta">
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
