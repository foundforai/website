import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Check, ShieldCheck, Clock, RefreshCw, BarChart3, Building2 } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';
import { STRIPE_LINKS } from '@/lib/stripe-links';

const pricingSchemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Pricing', url: 'https://foundforai.com/pricing' }
  ]),
  {
    "@type": "Service",
    "@id": "https://foundforai.com/pricing#service",
    "name": "Found For AI",
    "description": "Done-for-you AI visibility management. $997 onboarding installs the AI Data Layer, then Starter ($299/mo) or Growth ($599/mo) keeps visibility tuned. Custom enterprise and agency programs scoped individually.",
    "serviceType": "AI Visibility Management",
    "provider": { "@id": "https://foundforai.com/#org" },
    "areaServed": { "@type": "Country", "name": "United States" },
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "Local businesses, mid-market companies, multi-location brands, and agencies"
    },
    "offers": [
      {
        "@type": "Offer",
        "@id": "https://foundforai.com/pricing#offer-onboarding",
        "name": "Onboarding",
        "description": "One-time full AI Visibility Audit, AI Data Layer installation, and initial optimizations. Delivered in 7 business days with a 60-day We Fix It Free guarantee.",
        "priceCurrency": "USD",
        "price": "997.00",
        "url": "https://foundforai.com/pricing#onboarding",
        "availability": "https://schema.org/InStock",
        "category": "AI Visibility Implementation",
        "seller": { "@id": "https://foundforai.com/#org" }
      },
      {
        "@type": "Offer",
        "@id": "https://foundforai.com/pricing#offer-starter",
        "name": "Starter Plan",
        "description": "Ongoing AI visibility monitoring, monthly audit, and up to 2 optimizations per month (schema updates plus content and entity signal enhancements). Priority support.",
        "priceCurrency": "USD",
        "price": "299.00",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "299.00",
          "priceCurrency": "USD",
          "billingDuration": "P1M",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": "1",
            "unitCode": "MON"
          }
        },
        "url": "https://foundforai.com/pricing#starter",
        "availability": "https://schema.org/InStock",
        "category": "AI Visibility Subscription",
        "seller": { "@id": "https://foundforai.com/#org" }
      },
      {
        "@type": "Offer",
        "@id": "https://foundforai.com/pricing#offer-growth",
        "name": "Growth Plan",
        "description": "Everything in Starter plus custom automation workflows and AI agent setup so operations scale alongside increased visibility.",
        "priceCurrency": "USD",
        "price": "599.00",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "599.00",
          "priceCurrency": "USD",
          "billingDuration": "P1M",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": "1",
            "unitCode": "MON"
          }
        },
        "url": "https://foundforai.com/pricing#growth",
        "availability": "https://schema.org/InStock",
        "category": "AI Visibility Subscription",
        "seller": { "@id": "https://foundforai.com/#org" }
      },
      {
        "@type": "Offer",
        "@id": "https://foundforai.com/pricing#offer-diy-monthly",
        "name": "DIY Monthly",
        "description": "Self-serve, privacy-friendly analytics dashboard plus a monthly DIY AEO report you implement yourself. 7-day free trial.",
        "priceCurrency": "USD",
        "price": "49.00",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "49.00",
          "priceCurrency": "USD",
          "billingDuration": "P1M",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": "1",
            "unitCode": "MON"
          }
        },
        "url": "https://foundforai.com/pricing#diy",
        "availability": "https://schema.org/InStock",
        "category": "AI Visibility Subscription",
        "seller": { "@id": "https://foundforai.com/#org" }
      },
      {
        "@type": "Offer",
        "@id": "https://foundforai.com/pricing#offer-diy-annual",
        "name": "DIY Annual",
        "description": "Self-serve, privacy-friendly analytics dashboard plus a monthly DIY AEO report. Annual billing with 2 months free. 30-day free trial.",
        "priceCurrency": "USD",
        "price": "490.00",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "490.00",
          "priceCurrency": "USD",
          "billingDuration": "P1Y",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": "1",
            "unitCode": "ANN"
          }
        },
        "url": "https://foundforai.com/pricing#diy",
        "availability": "https://schema.org/InStock",
        "category": "AI Visibility Subscription",
        "seller": { "@id": "https://foundforai.com/#org" }
      }
    ]
  },
  {
    "@type": "FAQPage",
    "@id": "https://foundforai.com/pricing#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is there a one-time onboarding fee plus a monthly plan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Onboarding installs the AI Data Layer and fixes the foundation AI assistants need to understand and recommend your business. The monthly plan keeps it accurate as your business, your industry, and the AI models themselves change. The two work together — you cannot keep something tuned that was never set up correctly to begin with."
        }
      },
      {
        "@type": "Question",
        "name": "What is included in the $997 onboarding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A full AI Visibility Audit, AI Data Layer installation, and initial optimizations to the signals AI assistants read about your business. Delivered in 7 business days and backed by a 60-day We Fix It Free guarantee."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Starter and Growth?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Starter ($299/month) is ongoing monitoring, a monthly audit, and up to 2 optimizations per month. Growth ($599/month) adds custom automation workflows and AI agent setup, for businesses that want operations to keep up as visibility increases."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer enterprise or agency pricing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. For mid-market companies, retail chains, multi-location brands, and agencies, we build custom AI visibility programs scoped to your organization — multi-location rollouts, white-label agency delivery, and custom reporting. These engagements are priced individually after a scoping conversation. Contact us to discuss your specific needs."
        }
      },
      {
        "@type": "Question",
        "name": "Can I cancel anytime?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. All plans are month-to-month with no long-term contracts. Cancel any time."
        }
      },
      {
        "@type": "Question",
        "name": "How is this different from AI visibility audit tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most AI visibility tools show you a list of gaps and leave you to fix them. With our done-for-you plans, we fix them for you and keep them fixed every month."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 60-day We Fix It Free guarantee cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If anything we install or change during onboarding is incorrect, missing, or breaks within 60 days, we fix it at no additional cost."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a self-serve option?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. A lightweight DIY plan ($49/month) provides a privacy-friendly analytics dashboard and a monthly AEO report you implement yourself. It skips the $997 onboarding entirely, and you can upgrade to a done-for-you plan anytime — we use what the analytics already know about your business to make onboarding faster."
        }
      }
    ]
  }
];

export default function Pricing() {

  const faqs = [
    {
      question: "Why is there a one-time onboarding fee plus a monthly plan?",
      answer: "Onboarding installs the AI Data Layer and fixes the foundation AI assistants need to understand and recommend your business. The monthly plan keeps it accurate as your business, your industry, and the AI models themselves change. You can't keep something tuned that was never set up correctly to begin with.",
    },
    {
      question: "What's included in the $997 onboarding?",
      answer: "A full AI Visibility Audit, AI Data Layer installation, and initial optimizations to the signals AI assistants read about your business. Delivered in 7 business days and backed by a 60-day We Fix It Free guarantee.",
    },
    {
      question: "What's the difference between Starter and Growth?",
      answer: "Starter ($299/mo) is ongoing monitoring, a monthly audit, and up to 2 optimizations per month. Growth ($599/mo) adds custom automation workflows and AI agent setup — for businesses that want operations to keep up as visibility increases.",
    },
    {
      question: "Do you offer enterprise or agency pricing?",
      answer: "Yes. For mid-market companies, retail chains, multi-location brands, and agencies, we build custom AI visibility programs scoped to your organization — multi-location rollouts, white-label agency delivery, and custom reporting. These engagements are priced individually after a scoping conversation. Contact us to discuss your specific needs.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes. All plans are month-to-month with no long-term contracts. Cancel anytime.",
    },
    {
      question: "How is this different from AI visibility audit tools?",
      answer: "Most AI visibility tools show you the gaps and leave you to fix them. With our done-for-you plans, we fix them and keep them fixed.",
    },
    {
      question: "What does the 60-day We Fix It Free guarantee cover?",
      answer: "If anything we install or change during onboarding is incorrect, missing, or breaks within 60 days, we fix it at no additional cost.",
    },
    {
      question: "Is there a self-serve option?",
      answer: "Yes. A lightweight DIY plan ($49/mo) provides a privacy-friendly analytics dashboard and a monthly AEO report you implement yourself. It skips the $997 onboarding entirely, and you can upgrade to a done-for-you plan anytime — we use what the analytics already know about your business to make onboarding faster.",
    },
  ];

  return (
    <PageLayout
      title="Pricing | Found For AI"
      description="Done-for-you AI visibility management. $997 onboarding installs the AI Data Layer, then $299/mo Starter or $599/mo Growth keeps it tuned. Custom enterprise and agency programs scoped individually. 60-day guarantee."
      canonical="https://foundforai.com/pricing"
      schemas={pricingSchemas}
    >
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              Done-For-You · AI Operator Subscription
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI visibility, managed for you.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4">
              One-time onboarding installs your AI Data Layer. A monthly plan keeps your visibility tuned as AI models and your business change. Custom programs available for larger organizations and agencies.
            </p>
            <p className="text-base md:text-lg font-medium text-foreground">
              Most AI visibility tools show you the gaps. We fix them — and keep them fixed.
            </p>
          </div>
        </div>
      </section>

      {/* Onboarding Section - Required Starting Point */}
      <section id="onboarding" className="py-12 md:py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-accent/15 text-accent px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3">
              Step 1 · Required Starting Point
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Onboarding</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every done-for-you engagement starts here. We install the AI Data Layer and fix the foundation AI assistants need to confidently recommend your business.
            </p>
          </div>

          <Card className="border-primary border-2 shadow-lg">
            <CardHeader className="text-center pb-6 pt-8">
              <CardTitle className="text-2xl mb-2">Full AI Visibility Onboarding</CardTitle>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-bold text-primary">$997</span>
                <span className="text-muted-foreground">one-time</span>
              </div>
              <CardDescription className="text-base mt-3 max-w-xl mx-auto">
                A full AI Visibility Audit, AI Data Layer installation, and initial optimizations — implemented for you in 7 business days.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Full AI Visibility Audit across major AI assistants</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">AI Data Layer installation (schema + entity signals)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Initial content and clarity optimizations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Technical blockers resolved (robots, indexing, crawl)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Documentation of every change we make</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">7 business day delivery</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  60-day We Fix It Free guarantee
                </div>
                <span className="hidden sm:inline text-muted-foreground">·</span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-accent" />
                  Delivered in 7 business days
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Monthly Plans Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-accent/15 text-accent px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3">
              Step 2 · Choose Your Ongoing Plan
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Keep It Tuned Every Month</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AI assistants update constantly. So does your business. Our monthly plans keep your visibility accurate, current, and working.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
            {/* Starter Plan */}
            <Card id="starter" className="relative transition-all duration-300 hover:shadow-xl border-primary border-2 shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-2xl mb-2">Starter</CardTitle>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-4xl font-bold text-primary">$299</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">No long-term contract</p>
                <CardDescription className="text-base mt-4">
                  Ongoing AI visibility monitoring and monthly optimization, fully done for you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Ongoing AI visibility monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Monthly audit across major AI assistants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Up to 2 optimizations per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Schema updates as your business changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Content and entity signal enhancements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Priority support</span>
                  </li>
                </ul>
                <Link href="/book-call">
                  <Button size="lg" className="w-full font-semibold" data-testid="button-starter-cta">
                    Start with Starter
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground text-center">
                  Requires $997 onboarding ·{' '}
                  <Link href="/refund-policy" className="underline hover:no-underline">
                    30-day money-back guarantee
                  </Link>
                </p>
              </CardContent>
            </Card>

            {/* Growth Plan */}
            <Card id="growth" className="relative transition-all duration-300 hover:shadow-xl border-border border-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Scale Up
                </span>
              </div>
              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-2xl mb-2">Growth</CardTitle>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-4xl font-bold text-primary">$599</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">No long-term contract</p>
                <CardDescription className="text-base mt-4">
                  Everything in Starter, plus automation so operations scale with the visibility you're earning.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Everything in Starter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Custom automation workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">AI agent setup tailored to your operations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Workflow integrations (lead intake, follow-up, ops)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Designed to handle increased visibility without more staff</span>
                  </li>
                </ul>
                <Link href="/book-call">
                  <Button size="lg" variant="outline" className="w-full font-semibold border-2" data-testid="button-growth-cta">
                    Start with Growth
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground text-center">
                  Requires $997 onboarding ·{' '}
                  <Link href="/refund-policy" className="underline hover:no-underline">
                    30-day money-back guarantee
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enterprise & Agency Section */}
      <section id="enterprise" className="py-16 md:py-20 bg-slate-900 dark:bg-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Building2 className="h-4 w-4" />
            Enterprise &amp; Agency Scoping
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Custom AI Visibility programs
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            For mid-market companies, retail chains, multi-location brands, and agencies. Standard plans don't fit every organization — we scope these engagements individually around your locations, brands, stakeholders, and reporting needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6" data-testid="card-pricing-enterprise-multilocation">
              <h3 className="font-bold mb-2">Multi-location rollouts</h3>
              <p className="text-sm text-slate-300">
                AI Data Layer deployment across dozens or hundreds of locations with centralized governance.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6" data-testid="card-pricing-enterprise-agency">
              <h3 className="font-bold mb-2">White-label for agencies</h3>
              <p className="text-sm text-slate-300">
                We handle the AI search layer behind the scenes while you own the client relationship.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6" data-testid="card-pricing-enterprise-reporting">
              <h3 className="font-bold mb-2">Custom measurement</h3>
              <p className="text-sm text-slate-300">
                Bespoke reporting aligned to your stakeholders, from baselines to month-over-month tracking.
              </p>
            </div>
          </div>

          <Link href="/contact">
            <Button
              size="lg"
              className="text-lg px-8 py-6 font-semibold bg-white text-slate-900 hover:bg-slate-100"
              data-testid="button-pricing-enterprise-cta"
            >
              Request a conversation
            </Button>
          </Link>
          <p className="text-sm text-slate-400 mt-4">
            Priced individually after a scoping conversation.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">How an engagement works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're a single-location business or a multi-location brand, every engagement follows the same proven sequence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Done-for-you path */}
            <Card className="border-primary border-2">
              <CardHeader>
                <div className="inline-flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Done-For-You Path</CardTitle>
                </div>
                <CardDescription>For businesses that want AI visibility handled by specialists.</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0 mt-0.5">1</span>
                    <span className="text-sm">$997 onboarding — we audit, install the AI Data Layer, ship initial fixes in 7 business days.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0 mt-0.5">2</span>
                    <span className="text-sm">Choose Starter ($299/mo) or Growth ($599/mo) to keep it tuned.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0 mt-0.5">3</span>
                    <span className="text-sm">Every month: we monitor, audit, optimize. You stay recommended.</span>
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* Enterprise path */}
            <Card className="border-border border-2">
              <CardHeader>
                <div className="inline-flex items-center gap-2 mb-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Enterprise &amp; Agency Path</CardTitle>
                </div>
                <CardDescription>For mid-market companies, retail chains, and agencies.</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0 mt-0.5">1</span>
                    <span className="text-sm">Scoping conversation — locations, brands, stakeholders, and what AI currently gets wrong.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0 mt-0.5">2</span>
                    <span className="text-sm">Custom program design — rollout plan, governance, and measurement scoped to your organization.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0 mt-0.5">3</span>
                    <span className="text-sm">Phased delivery with stakeholder reporting at every step.</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 bg-primary/5 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-accent" />
              <div className="font-semibold">60-Day Guarantee</div>
              <p className="text-sm text-muted-foreground">
                On the $997 onboarding. If anything we install is wrong or breaks, we fix it free.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="h-8 w-8 text-accent" />
              <div className="font-semibold">7-Day Onboarding</div>
              <p className="text-sm text-muted-foreground">
                Full setup delivered in 7 business days from kickoff.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="h-8 w-8 text-accent" />
              <div className="font-semibold">No Long Contracts</div>
              <p className="text-sm text-muted-foreground">
                All plans are month-to-month or annual. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIY / Self-Serve — de-emphasized, for hands-on operators and existing subscribers */}
      <section id="diy" className="py-10 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <Card className="border-border">
            <CardContent className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-base font-semibold">Prefer to do it yourself?</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  A lightweight DIY plan — privacy-friendly analytics plus a monthly AEO report you implement on your own — is available at $49/mo (or{' '}
                  <a href={STRIPE_LINKS.diy.annual} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                    $490/yr
                  </a>
                  ). No onboarding, cancel anytime.
                </p>
              </div>
              <a href={STRIPE_LINKS.diy.monthly} target="_blank" rel="noopener noreferrer" className="shrink-0">
                <Button variant="outline" size="sm" className="font-medium" data-testid="button-diy-cta">
                  Start 7-day trial
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Onboarding, monthly plans, enterprise scoping, and guarantees.
          </p>
          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to be the business AI recommends?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Book a strategy call to scope your engagement — or start with a free AI visibility report and see exactly where you stand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/book-call">
              <Button size="lg" className="font-semibold" data-testid="button-final-cta">
                Book Your Onboarding Call
              </Button>
            </Link>
            <Link href="/scorecard">
              <Button size="lg" variant="outline" className="font-semibold" data-testid="button-final-scorecard">
                Get Your Free Report
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            $997 one-time onboarding · $299/mo or $599/mo · 60-day guarantee · Enterprise &amp; agency programs scoped individually
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
