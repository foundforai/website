import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Check, ArrowRight } from 'lucide-react';

export default function Pricing() {
  useEffect(() => {
    const serviceSchema = document.createElement('script');
    serviceSchema.type = 'application/ld+json';
    serviceSchema.id = 'service-schema';
    serviceSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "AI Visibility Starter Fix",
      "description": "Delivered within 7 business days — includes AI SEO audit and technical setup for up to 10 pages.",
      "provider": {
        "@type": "Organization",
        "name": "FoundForAI",
        "url": "https://foundforai.com"
      },
      "areaServed": {
        "@type": "Place",
        "name": "United States"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "1595.00",
        "url": "https://foundforai.com/pricing",
        "availability": "https://schema.org/InStock"
      }
    });
    document.head.appendChild(serviceSchema);

    const faqSchema = document.createElement('script');
    faqSchema.type = 'application/ld+json';
    faqSchema.id = 'pricing-faq-schema';
    faqSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What's the turnaround time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The AI Visibility and Search Fix is completed within 7 business days. Pro Visibility Plans begin implementation within 48 hours of strategy call completion."
          }
        },
        {
          "@type": "Question",
          "name": "What exactly do I receive?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You'll get a complete technical audit report, all schema markup files, configuration files (robots.txt, llms.txt), sitemap setup, and a prioritized roadmap for ongoing optimization."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer refunds?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer a satisfaction guarantee. If you're not happy with the AI Visibility and Search Fix deliverables, we'll revise until you are. Enterprise clients receive custom SLAs."
          }
        }
      ]
    });
    document.head.appendChild(faqSchema);

    return () => {
      const existingServiceSchema = document.getElementById('service-schema');
      const existingFaqSchema = document.getElementById('pricing-faq-schema');
      if (existingServiceSchema) {
        document.head.removeChild(existingServiceSchema);
      }
      if (existingFaqSchema) {
        document.head.removeChild(existingFaqSchema);
      }
    };
  }, []);
  const faqs = [
    {
      question: "What's the turnaround time?",
      answer: "The AI Visibility and Search Fix is completed within 7 business days. Pro Visibility Plans begin implementation within 48 hours of strategy call completion."
    },
    {
      question: "What exactly do I receive?",
      answer: "You'll get a complete technical audit report, all schema markup files, configuration files (robots.txt, llms.txt), sitemap setup, and a prioritized roadmap for ongoing optimization."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a satisfaction guarantee. If you're not happy with the AI Visibility and Search Fix deliverables, we'll revise until you are. Enterprise clients receive custom SLAs."
    }
  ];

  return (
    <PageLayout
      title="Pricing - AI SEO Services & Plans | Found For AI"
      description="Choose your level of AI visibility. Get your AI Visibility Audit ($495) or book a strategy call for advanced AI SEO plans."
      canonical="https://foundforai.com/pricing"
    >
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your Level of AI Visibility
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get your AI Visibility Audit or book a strategy call for advanced plans.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Card 1: AI Visibility and Search Fix */}
            <Card className="relative transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">AI Visibility and Search Fix</CardTitle>
                <div className="text-4xl font-bold text-primary mb-2">$1595</div>
                <CardDescription className="text-base">
                  7-day AI SEO audit + technical setup for up to 10 pages.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">AI SEO & technical audit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Schema.org validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">robots.txt + llms.txt setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Sitemap creation & submission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">OpenGraph & Twitter Card setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Core Web Vitals report</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">AI bot access permissions</span>
                  </li>
                </ul>
                <a 
                  href="https://square.link/u/o25cVCY4" 
                  target="_blank" 
                  rel="noopener"
                  data-testid="button-starter-fix"
                >
                  <Button size="lg" className="w-full font-semibold">
                    Book AI Visibility and Search Fix – $1595
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Card 2: Pro Visibility Plan */}
            <Card className="relative transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-primary border-2 shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Pro Visibility Plan</CardTitle>
                <div className="text-4xl font-bold text-primary mb-2">Custom</div>
                <CardDescription className="text-base">
                  Ongoing AI optimization, 5-cluster topic buildout, monthly reporting, and growth tracking.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Everything in AI Visibility and Search Fix</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">5-cluster topic architecture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Monthly AI visibility reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Ongoing schema optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Growth tracking & analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Quarterly strategy reviews</span>
                  </li>
                </ul>
                <Link href="/book-call">
                  <Button size="lg" variant="default" className="w-full font-semibold" data-testid="button-pro-schedule">
                    Schedule a Call
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Card 3: Enterprise/Agency */}
            <Card className="relative transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Enterprise / Agency</CardTitle>
                <div className="text-4xl font-bold text-primary mb-2">Custom</div>
                <CardDescription className="text-base">
                  White-label or multi-site integration for agencies and large enterprises.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Everything in Pro Plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Multi-site management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">White-label options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Custom SLA agreements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">API access & integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Volume pricing</span>
                  </li>
                </ul>
                <Link href="/book-call">
                  <Button size="lg" className="w-full font-semibold" data-testid="button-enterprise-schedule">
                    Schedule a Call
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Questions About AI Visibility?
          </h2>
          <div className="space-y-6 mb-12">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" size="lg" className="font-semibold group" data-testid="button-back-home">
                Back to Home
              </Button>
            </Link>
            <Link href="/purchase-complete">
              <Button size="lg" className="font-semibold group" data-testid="button-view-confirmation">
                Already Purchased? View Confirmation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
