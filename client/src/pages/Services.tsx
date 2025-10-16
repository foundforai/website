import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Check, Search, Wrench, TrendingUp, ArrowRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      name: 'AI Visibility Starter Fix',
      price: '$495',
      description: '7-day AI SEO audit + technical setup for up to 10 pages',
      features: [
        'AI SEO & technical audit',
        'Schema.org validation',
        'robots.txt + llms.txt setup',
        'Sitemap creation & submission',
        'OpenGraph & Twitter Card setup',
        'Core Web Vitals report',
        'AI bot access permissions',
      ],
      ctaText: 'Book Starter Fix',
      ctaLink: 'https://square.link/u/o25cVCY4',
      isExternal: true,
    },
    {
      name: 'Pro Visibility Plan',
      price: 'Custom',
      description: 'Ongoing AI optimization, 5-cluster topic buildout, monthly reporting',
      features: [
        'Everything in Starter Fix',
        '5-cluster topic architecture',
        'Monthly AI visibility reporting',
        'Ongoing schema optimization',
        'Growth tracking & analytics',
        'Priority support',
        'Quarterly strategy reviews',
      ],
      ctaText: 'Schedule a Call',
      ctaLink: '/book-call',
      isExternal: false,
      popular: true,
    },
    {
      name: 'Enterprise & Agency Integration',
      price: 'Custom',
      description: 'White-label or multi-site integration for agencies and large enterprises',
      features: [
        'Everything in Pro Plan',
        'Multi-site management',
        'White-label options',
        'Dedicated account manager',
        'Custom SLA agreements',
        'API access & integrations',
        'Volume pricing',
      ],
      ctaText: 'Schedule a Call',
      ctaLink: '/book-call',
      isExternal: false,
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Audit',
      description: "We analyze your site's AI readiness, schema markup, and technical setup to identify gaps in your AI visibility.",
      icon: Search,
    },
    {
      step: '2',
      title: 'Fix',
      description: 'We implement schema markup, optimize your content structure, and configure technical settings so AI can find and understand your business.',
      icon: Wrench,
    },
    {
      step: '3',
      title: 'Grow',
      description: 'Track your AI visibility over time with monthly reporting, ongoing optimization, and strategic content planning.',
      icon: TrendingUp,
    },
  ];

  return (
    <PageLayout
      title="AI SEO Services for the Age of AI Search | Found For AI"
      description="We help your business be found by AI, not just Google. AI visibility services including audits, schema markup, and ongoing optimization."
      canonical="https://foundforai.com/services"
    >
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI SEO Services for the Age of AI Search
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We help your business be found by AI, not just Google.
            </p>
          </div>

          {/* Why AI Visibility Matters */}
          <Card className="mb-16 bg-gradient-to-br from-primary/5 to-accent/5 border-2">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-center">Why AI Visibility Matters</h2>
              <div className="space-y-4 text-lg text-muted-foreground max-w-4xl mx-auto">
                <p>
                  The way people discover businesses is changing. Instead of scrolling through Google search results, customers are now asking AI assistants like ChatGPT, Perplexity, and Claude for recommendations.
                </p>
                <p>
                  These AI tools don't just return links—they give direct answers. If your business isn't structured for AI to read, understand, and recommend, you're invisible in the new search landscape.
                </p>
                <p className="font-semibold text-foreground">
                  Traditional SEO optimizes for search engines. AI SEO optimizes for intelligent discovery.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`relative transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                  service.popular ? 'border-primary border-2 shadow-lg' : 'border-2'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{service.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary mb-2">{service.price}</div>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {service.isExternal ? (
                    <a
                      href={service.ctaLink}
                      target="_blank"
                      rel="noopener"
                      data-testid={`button-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Button size="lg" className="w-full font-semibold">
                        {service.ctaText}
                      </Button>
                    </a>
                  ) : (
                    <Link href={service.ctaLink}>
                      <Button
                        size="lg"
                        className="w-full font-semibold"
                        data-testid={`button-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {service.ctaText}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our proven three-step process to get you found by AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {howItWorks.map((step, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{step.step}</div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <Link href="/pricing">
              <Button size="lg" className="font-semibold text-lg px-8 group" data-testid="button-see-pricing">
                See Pricing & Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
