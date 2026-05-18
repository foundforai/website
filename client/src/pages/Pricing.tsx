import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Check, ShieldCheck, Clock, RefreshCw, BarChart3 } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';

const DIY_MONTHLY_URL = 'https://buy.stripe.com/8x2eV78Ws36B0yA0WZ3Nm00';
const DIY_ANNUAL_URL = 'https://buy.stripe.com/fZueV76Ok6iN956fRT3Nm01';

const pricingSchemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Pricing', url: 'https://foundforai.com/pricing' }
  ]),
  {
    "@type": "Service",
    "@id": "https://foundforai.com/pricing#service",
    "name": "Found For AI",
    "description": "AI visibility for small local businesses. Self-serve analytics ($49/mo) or done-for-you AI Operator Subscription ($997 onboarding plus monthly plan).",
    "serviceType": "AI Visibility Management",
    "provider": { "@id": "https://foundforai.com/#org" },
    "areaServed": { "@type": "Country", "name": "United States" },
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "Small local businesses and owner-operators"
    },
    "offers": [
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
      },
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
      }
    ]
  },
  {
    "@type": "FAQPage",
    "@id": "https://foundforai.com/pricing#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between DIY and the AI Operator Subscription (Starter/Growth)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "DIY ($49/mo) is self-serve. You get a privacy-friendly analytics dashboard and a monthly AEO report, and you implement the optimizations yourself. The AI Operator Subscription is done-for-you. You pay a one-time $997 onboarding and a monthly plan, and we do the implementation and ongoing optimizations. Most owner-operators eventually move from DIY to Starter once they see what needs to be fixed and prefer not to do it themselves."
        }
      },
      {
        "@type": "Question",
        "name": "Does DIY require the $997 onboarding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. DIY is fully self-serve and skips the onboarding entirely. The $997 onboarding only applies to the done-for-you Starter and Growth plans."
        }
      },
      {
        "@type": "Question",
        "name": "Can I upgrade from DIY to Starter later?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. You can upgrade to Starter or Growth anytime. We use what we already know about your business from the DIY analytics to make the onboarding faster."
        }
      },
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
          "text": "Starter ($299/month) is ongoing monitoring, a monthly audit, and up to 2 optimizations per month. Growth ($599/month) adds custom automation workflows and AI agent setup, which is for owner-operators who want operations to keep up as visibility increases."
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
          "text": "Most AI visibility tools show you a list of gaps and leave you to fix them. With our done-for-you plans, we fix them for you and keep them fixed every month. If you prefer to do the work yourself, DIY gives you the same visibility data and a monthly report you implement on your own."
        }
      },
      {
        "@type": "Question",
        "name": "What does the 60-day We Fix It Free guarantee cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If anything we install or change during onboarding is incorrect, missing, or breaks within 60 days, we fix it at no additional cost."
        }
      }
    ]
  }
];

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  const diyPricing = {
    monthly: {
      label: '$49',
      suffix: '/month',
      trialDays: 7,
      url: DIY_MONTHLY_URL,
    },
    annual: {
      label: '$490',
      suffix: '/year',
      trialDays: 30,
      url: DIY_ANNUAL_URL,
      savingNote: '2 months free vs monthly',
    },
  } as const;

  const currentDiy = diyPricing[billing];

  const faqs = [
    {
      question: "What's the difference between DIY and the AI Operator Subscription (Starter/Growth)?",
      answer: "DIY ($49/mo) is self-serve. You get a privacy-friendly analytics dashboard and a monthly AEO report, and you implement the optimizations yourself. The AI Operator Subscription is done-for-you — you pay a one-time $997 onboarding and a monthly plan, and we do the implementation and ongoing optimizations. Most owner-operators eventually move from DIY to Starter once they see what needs to be fixed and prefer not to do it themselves.",
    },
    {
      question: "Does DIY require the $997 onboarding?",
      answer: "No. DIY is fully self-serve and skips the onboarding entirely. The $997 onboarding only applies to the done-for-you Starter and Growth plans.",
    },
    {
      question: "Can I upgrade from DIY to Starter later?",
      answer: "Yes. You can upgrade anytime. We use what we already know about your business from the DIY analytics to make the onboarding faster.",
    },
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
      answer: "Starter ($299/mo) is ongoing monitoring, a monthly audit, and up to 2 optimizations per month. Growth ($599/mo) adds custom automation workflows and AI agent setup — for owner-operators who want operations to keep up as visibility increases.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes. All plans are month-to-month with no long-term contracts. Cancel anytime.",
    },
    {
      question: "How is this different from AI visibility audit tools?",
      answer: "Most AI visibility tools show you the gaps and leave you to fix them. With our done-for-you plans, we fix them and keep them fixed. If you'd rather DIY, our DIY plan gives you the same visibility data plus a monthly report you implement yourself.",
    },
    {
      question: "What does the 60-day We Fix It Free guarantee cover?",
      answer: "If anything we install or change during onboarding is incorrect, missing, or breaks within 60 days, we fix it at no additional cost.",
    },
  ];

  return (
    <PageLayout
      title="Pricing | Found For AI"
      description="Two ways to get AI to recommend your business. DIY analytics from $49/mo, or done-for-you AI Operator Subscription starting with a $997 onboarding plus $299/mo Starter or $599/mo Growth. 60-day guarantee."
      canonical="https://foundforai.com/pricing"
      schemas={pricingSchemas}
    >
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              Two ways to get recommended by AI
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              DIY the analytics, or have us do the work.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4">
              Start self-serve with privacy-friendly analytics and a monthly DIY AEO report, or skip ahead to our done-for-you AI Operator Subscription.
            </p>
            <p className="text-base md:text-lg font-medium text-foreground">
              Most AI visibility tools show you the gaps. We either show them clearly — or fix them for you.
            </p>
          </div>
        </div>
      </section>

      {/* DIY / Self-Serve Section */}
      <section id="diy" className="py-12 md:py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-accent/15 text-accent px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3">
              Self-Serve · Start today
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Found For AI Analytics</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See exactly how AI assistants describe your business, and get a monthly DIY AEO report you can act on yourself. No onboarding required.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-muted rounded-full p-1">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  billing === 'monthly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                data-testid="toggle-billing-monthly"
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling('annual')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  billing === 'annual'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                data-testid="toggle-billing-annual"
              >
                Annual <span className="text-accent text-xs ml-1">Save 17%</span>
              </button>
            </div>
          </div>

          <Card className="max-w-2xl mx-auto border-accent border-2 shadow-lg">
            <CardHeader className="text-center pb-6 pt-8">
              <div className="inline-flex items-center justify-center gap-2 mb-3">
                <BarChart3 className="h-6 w-6 text-accent" />
                <CardTitle className="text-2xl">DIY</CardTitle>
              </div>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-bold text-primary" data-testid="text-diy-price">
                  {currentDiy.label}
                </span>
                <span className="text-muted-foreground">{currentDiy.suffix}</span>
              </div>
              {billing === 'annual' && (
                <p className="text-sm text-accent font-medium" data-testid="text-diy-saving">
                  {diyPricing.annual.savingNote}
                </p>
              )}
              <CardDescription className="text-base mt-3 max-w-md mx-auto">
                Privacy-friendly analytics + a monthly DIY AEO report. {currentDiy.trialDays}-day free trial.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="grid md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Privacy-friendly analytics dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Cookie-free, GDPR-friendly tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Monthly DIY AEO report</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">No onboarding fee, no setup call</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Upgrade to Starter anytime</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">Cancel anytime</span>
                </li>
              </ul>
              <a href={currentDiy.url} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full font-semibold" data-testid="button-diy-cta">
                  Start {currentDiy.trialDays}-day free trial →
                </Button>
              </a>
              <p className="text-xs text-muted-foreground text-center">
                Credit card required to start trial. No charge until day {currentDiy.trialDays + 1}.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Divider into Done-For-You */}
      <section className="py-10 bg-muted/30 border-y border-border">
        <div className="text-center max-w-3xl mx-auto px-4">
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3">
            Done-For-You · AI Operator Subscription
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Or skip ahead — we'll do the work for you.
          </h2>
          <p className="text-muted-foreground">
            One-time $997 onboarding installs the AI Data Layer. Then choose Starter or Growth to keep your AI visibility tuned every month.
          </p>
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
                <p className="text-xs text-muted-foreground text-center">Requires $997 onboarding</p>
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
                <p className="text-xs text-muted-foreground text-center">Requires $997 onboarding</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Two paths, your call</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start self-serve with the analytics, or hand the work to us. Either way you get a clear picture of how AI talks about your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* DIY path */}
            <Card className="border-accent border-2">
              <CardHeader>
                <div className="inline-flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  <CardTitle className="text-xl">DIY Path</CardTitle>
                </div>
                <CardDescription>For owner-operators who like to roll their sleeves up.</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold shrink-0 mt-0.5">1</span>
                    <span className="text-sm">Start your 7- or 30-day trial of DIY ($49/mo or $490/yr).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold shrink-0 mt-0.5">2</span>
                    <span className="text-sm">Install the tracking snippet on your site (one line of HTML).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold shrink-0 mt-0.5">3</span>
                    <span className="text-sm">Get a monthly DIY AEO report. Implement what you can.</span>
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* Done-for-you path */}
            <Card className="border-primary border-2">
              <CardHeader>
                <div className="inline-flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Done-For-You Path</CardTitle>
                </div>
                <CardDescription>For owner-operators who'd rather not be a schema markup specialist.</CardDescription>
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

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            DIY vs done-for-you, onboarding, plans, and how to upgrade.
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
            Start your free trial of DIY in minutes, or book a strategy call to scope a done-for-you engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={currentDiy.url} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="font-semibold" data-testid="button-final-diy">
                Start DIY Free Trial
              </Button>
            </a>
            <Link href="/book-call">
              <Button size="lg" variant="outline" className="font-semibold" data-testid="button-final-cta">
                Book Your Onboarding Call
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            DIY from $49/mo · $997 one-time onboarding · $299/mo or $599/mo · 60-day guarantee
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
