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
      "name": "AI Visibility Fix",
      "description": "A one-time implementation that fixes how AI tools understand and recommend your business.",
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
            "text": "The AI Visibility Fix is completed within 7 business days."
          }
        },
        {
          "@type": "Question",
          "name": "What exactly do I receive?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You'll receive a complete implementation of AI visibility fixes, documentation of all changes made, and verification that AI tools can now read your site correctly."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer refunds?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer a 60-day fix-it-free guarantee. If anything we implement is incorrect, missing, or breaks within sixty days, we fix it at no cost."
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
      answer: "The AI Visibility Fix is completed within 7 business days."
    },
    {
      question: "What exactly do I receive?",
      answer: "You'll receive a complete implementation of AI visibility fixes, documentation of all changes made, and verification that AI tools can now read your site correctly."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 60-day fix-it-free guarantee. If anything we implement is incorrect, missing, or breaks within sixty days, we fix it at no cost."
    }
  ];

  return (
    <PageLayout
      title="Pricing - AI Visibility Fix | Found For AI"
      description="Start with the AI Visibility Fix. One clear starting point for $1,595. Additional options only if you need them."
      canonical="https://foundforai.com/pricing"
    >
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Start With the AI Visibility Fix
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              One clear starting point. Additional options only if you need them.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-start">
            {/* Card 1: AI Visibility Fix (Start Here) - Emphasized */}
            <Card className="relative transition-all duration-300 hover:shadow-xl border-primary border-2 shadow-lg lg:scale-105 lg:-mt-4 lg:mb-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Start Here
                </span>
              </div>
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-2">AI Visibility Fix</CardTitle>
                <div className="text-4xl font-bold text-primary mb-2">$1,595</div>
                <p className="text-sm text-muted-foreground">one time</p>
                <CardDescription className="text-base mt-4">
                  A one-time implementation that fixes how AI tools understand and recommend your business.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">AI Data Layer corrections and enhancements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Missing business context for AI systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Content clarity fixes for AI tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Technical blockers resolved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Documentation of all changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">7 business day delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">60-day fix-it-free guarantee</span>
                  </li>
                </ul>
                <a 
                  href="https://foundforai.com/fix-plan" 
                  data-testid="button-starter-fix"
                >
                  <Button size="lg" className="w-full font-semibold">
                    Start My AI Visibility Fix
                  </Button>
                </a>
                <p className="text-sm text-muted-foreground text-center">Most businesses start here</p>
              </CardContent>
            </Card>

            {/* Card 2: Ongoing Optimization (After the Fix) */}
            <Card className="relative transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Ongoing Optimization</CardTitle>
                <p className="text-sm text-muted-foreground mb-2">(After the Fix)</p>
                <div className="text-4xl font-bold text-primary mb-2">Custom</div>
                <CardDescription className="text-base">
                  For businesses that want continuous AI visibility growth after their initial fix.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Everything in AI Visibility Fix</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Monthly AI visibility monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Ongoing optimization updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Growth tracking & reporting</span>
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
                  <Button size="lg" variant="outline" className="w-full font-semibold" data-testid="button-pro-schedule">
                    Schedule a Call
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground text-center">Available after completing the AI Visibility Fix</p>
              </CardContent>
            </Card>

            {/* Card 3: Enterprise & Agency Expansion */}
            <Card className="relative transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Enterprise & Agency Expansion</CardTitle>
                <div className="text-4xl font-bold text-primary mb-2">Custom</div>
                <CardDescription className="text-base">
                  For multi-site, agency, or large-scale implementations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Everything in Ongoing Optimization</span>
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
                    <span className="text-sm">Volume pricing</span>
                  </li>
                </ul>
                <Link href="/book-call">
                  <Button size="lg" variant="outline" className="w-full font-semibold" data-testid="button-enterprise-schedule">
                    Schedule a Call
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground text-center">Custom scope, post-fix</p>
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
