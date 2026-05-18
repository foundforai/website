import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Mail, BarChart3, ArrowRight } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';
import ScorecardHero from '@/components/ScorecardHero';
import { STRIPE_LINKS } from '@/lib/stripe-links';

export default function Home() {
  const homeSchemas = [
    breadcrumbList([
      { name: 'Home', url: 'https://foundforai.com/' }
    ]),
    {
      "@type": "WebPage",
      "@id": "https://foundforai.com/#webpage",
      "url": "https://foundforai.com/",
      "name": "Found For AI | Be the Business AI Recommends First",
      "isPartOf": { "@id": "https://foundforai.com/#website" },
      "about": { "@id": "https://foundforai.com/#org" },
      "primaryImageOfPage": "https://foundforai.com/found-for-ai-logo-white.png",
      "description": "Found For AI is an AI visibility framework and implementation service that helps businesses get discovered and recommended by AI-powered search systems like ChatGPT, Google Gemini, and Perplexity."
    },
    {
      "@type": "FAQPage",
      "@id": "https://foundforai.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is this a monthly subscription?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It is a hybrid. You start with a one-time $997 onboarding, which installs your AI Data Layer and ships your initial fixes in 7 business days. Then you choose a monthly plan — Starter ($299/mo) or Growth ($599/mo) — so we keep your visibility tuned as AI models and your business change. Monthly plans are month-to-month with no long-term contracts."
          }
        },
        {
          "@type": "Question",
          "name": "Do you need to rebuild my website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Usually no. We add an AI-focused data layer around your existing site so AI tools can read what you already have. If we see anything that truly needs to be rebuilt, we will tell you before any extra work is done."
          }
        },
        {
          "@type": "Question",
          "name": "Can my current web person do this?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most web teams are focused on design, content, and regular search. AI visibility is a different skill set. We only do AI search and AI visibility work, which is why agencies often bring us in behind the scenes to handle this part."
          }
        },
        {
          "@type": "Question",
          "name": "What if I don't have a website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "That's fine. AI systems need a place to read your services, location, and booking information. If you don't have a website, we create a simple AI-ready site as part of making your business AI-eligible."
          }
        }
      ]
    }
  ];

  const whyNotShowingUp = [
    "AI cannot identify what services you actually offer",
    "AI cannot confirm your service area or location",
    "AI cannot connect your booking link or contact info",
    "AI cannot read your common questions and answers",
    "AI does not know which pages on your site matter most",
    "AI cannot see clear proof that you are a trusted business"
  ];

  const installSteps = [
    {
      title: "Step One — AI Visibility Audit",
      body: "We scan your website the way modern AI tools do and show what is unreadable or missing. You get a simple before and after report."
    },
    {
      title: "Step Two — AI Visibility Layer Installation",
      body: "We install a clean data layer that includes your services, service area, hours, contact and booking info, common questions and answers, core business details, and trust signals."
    },
    {
      title: "Step Three — AI Search Optimization And Verification",
      body: "We test your visibility in leading AI tools and confirm they understand what you offer, recommend you correctly, and link to the right pages."
    }
  ];

  const pricingChecklist = [
    "Full AI Visibility Audit + AI Data Layer installation",
    "Initial optimizations done for you in 7 business days",
    "60-day We Fix It Free guarantee on everything we install"
  ];

  const monthlyTiers = [
    {
      name: "Starter",
      price: "$299",
      cadence: "/mo",
      summary: "Ongoing monitoring, monthly audit, and up to 2 optimizations per month. Priority support.",
      tag: "Most Popular"
    },
    {
      name: "Growth",
      price: "$599",
      cadence: "/mo",
      summary: "Everything in Starter, plus custom automation workflows and AI agent setup so operations scale with visibility.",
      tag: "Scale Up"
    }
  ];

  const proofBlurbs = [
    "AI can clearly describe what you do.",
    "AI can see your service area and contact details.",
    "AI has a reason to recommend you instead of a competitor."
  ];

  const emailSubject = encodeURIComponent("Found For AI Visibility Fix");
  const emailBody = encodeURIComponent("Check out this AI Visibility Fix service: https://foundforai.com");
  const mailtoLink = `mailto:sales@foundforai.com?subject=${emailSubject}&body=${emailBody}`;

  return (
    <PageLayout
      title="Found For AI | Be the Business AI Recommends First"
      description="Found For AI is an AI visibility framework and implementation service that helps businesses get discovered and recommended by AI-powered search systems like ChatGPT, Google Gemini, and Perplexity."
      canonical="https://foundforai.com"
      ogImage="/found-for-ai-logo-white.png"
      schemas={homeSchemas}
    >
      {/* SECTION 1: HERO — AI Visibility Scorecard form (replaces legacy
          two-column hero, archived at client/src/_legacy/HomeHeroLegacy.tsx) */}
      <ScorecardHero />

      {/* SECTION 2: CONTEXT & URGENCY */}
      <section className="py-16 md:py-24 px-5 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-4 tracking-tight text-slate-900 dark:text-slate-100"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              AI Is Already Choosing Who Gets Found
            </h2>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">
              Search behavior is shifting faster than most businesses realize.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: Stat Blocks */}
            <div className="space-y-8">
              <div className="border-l-2 border-[#0F5FDB] pl-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-100">AI Search Adoption</span>
                  <span className="text-sm font-medium text-green-600">↑</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Exploding usage across consumers and businesses</p>
              </div>
              
              <div className="border-l-2 border-slate-200 dark:border-slate-700 pl-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-100">Traditional Rankings</span>
                  <span className="text-sm font-medium text-red-600">↓</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Replaced by direct recommendations</p>
              </div>
              
              <div className="border-l-2 border-[#0F5FDB] pl-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-100">Local + B2B Discovery</span>
                  <span className="text-sm font-medium text-green-600">↑</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Increasingly driven by AI answers</p>
              </div>
              
              <div className="border-l-2 border-slate-200 dark:border-slate-700 pl-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-100">Website Readability</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Now a prerequisite, not an optimization</p>
              </div>
            </div>
            
            {/* Right: Elegant Curve with Editorial Callouts */}
            <div className="flex items-center justify-center py-12 md:py-16 overflow-visible">
              <svg 
                viewBox="0 0 420 320" 
                className="w-full max-w-lg h-auto overflow-visible"
                style={{ overflow: 'visible' }}
                aria-label="Symbolic curve illustrating AI adoption momentum with key milestones"
              >
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e2e8f0" />
                    <stop offset="40%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#0F5FDB" />
                  </linearGradient>
                </defs>
                
                {/* LAYER 1: Curve (rendered first, appears behind) */}
                <g className="curve-layer">
                  <path 
                    d="M 30 220 C 90 218, 160 210, 230 175 C 290 145, 330 95, 390 60" 
                    fill="none" 
                    stroke="url(#curveGradient)" 
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
                
                {/* LAYER 2: Dots and Annotations (rendered last, appears on top) */}
                <g className="annotation-layer">
                  {/* Left Callout - Early Stage (text below curve with 20px gap) */}
                  <circle cx="70" cy="218" r="3" fill="#cbd5e1" />
                  <text x="70" y="252" textAnchor="middle" fontSize="10" fontWeight="500" fill="#94a3b8">Early AI Search Adoption</text>
                  <text x="70" y="268" textAnchor="middle" fontSize="9" fill="#cbd5e1">Limited usage, experimental</text>
                  
                  {/* Middle Callout - Transition (text below curve with 20px gap) */}
                  <circle cx="230" cy="175" r="4" fill="#64748b" />
                  <text x="230" y="210" textAnchor="middle" fontSize="10" fontWeight="500" fill="#64748b">Mainstream Shift</text>
                  <text x="230" y="226" textAnchor="middle" fontSize="9" fill="#94a3b8">AI answers begin</text>
                  <text x="230" y="240" textAnchor="middle" fontSize="9" fill="#94a3b8">replacing rankings</text>
                  
                  {/* Right Callout - Now (text above curve with 16px gap) */}
                  <circle cx="380" cy="65" r="5" fill="#0F5FDB" />
                  <text x="380" y="32" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F5FDB">Now</text>
                  <text x="380" y="46" textAnchor="middle" fontSize="9" fill="#64748b">AI tools actively</text>
                  <text x="380" y="58" textAnchor="middle" fontSize="9" fill="#64748b">recommend businesses</text>
                </g>
              </svg>
            </div>
          </div>
          
          {/* Supporting Copy */}
          <p className="text-center text-sm mt-12 max-w-2xl mx-auto text-slate-500 dark:text-slate-400">
            AI-powered tools like Google Gemini, ChatGPT, and Perplexity are rapidly becoming the default way people discover businesses.
          </p>
        </div>
      </section>

      {/* WHY YOU'RE NOT SHOWING UP IN AI SEARCH */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Why Your Business Is Not Showing Up In AI Search
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
            AI does not read websites like humans. It relies on a machine-readable layer that most sites do not have. Your site can look great to people but appear blurry or incomplete to AI.
          </p>
          
          <ul className="space-y-3 mb-8 max-w-2xl mx-auto">
            {whyNotShowingUp.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-base md:text-lg">
                <span className="text-destructive mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <p className="text-lg md:text-xl font-bold text-center">
            If AI cannot understand your business, it cannot recommend you to your next customer.
          </p>
        </div>
      </section>

      {/* WHAT WE INSTALL */}
      <section id="what-we-install" className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            What We Install To Make AI Recommend You
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            Our AI Visibility Fix adds a focused AI visibility layer so tools like ChatGPT, Perplexity, and Google Gemini can finally understand, trust, and recommend your business.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {installSteps.map((step, index) => (
              <Card key={index} className="h-full" data-testid={`card-step-${index + 1}`}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground text-center mt-8 max-w-2xl mx-auto">
            If your business doesn't have a website, we deploy a lightweight AI-readable site so AI systems can understand and recommend you.
          </p>
        </div>
      </section>

      {/* DELIVERY AND GUARANTEE */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Delivered In Seven Business Days, Guaranteed
          </h2>

          <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
            Onboarding is fast. Once you start, our team runs your AI Visibility Audit, installs your AI Data Layer, and ships your initial optimizations within seven business days. After that, your monthly plan keeps everything tuned as AI models and your business change.
          </p>

          <div className="text-center space-y-2 mb-10">
            <p className="text-base font-medium">No DIY checklists</p>
            <p className="text-base font-medium">No confusing back and forth</p>
            <p className="text-base font-medium">No long-term contracts on monthly plans</p>
          </div>

          <Card className="bg-primary/5 border-primary/20" data-testid="card-guarantee">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Our We Fix It Free Guarantee</h3>
              <p className="text-muted-foreground">
                If anything we install during onboarding is incorrect, missing, or breaks within sixty days, we fix it at no cost. Most AI visibility tools just show you the gaps — we fix them and keep them fixed.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SELF-SERVE / DIY — Lightweight entry point */}
      <section id="diy" className="py-16 md:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Self-Serve · DIY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to start tracking yourself?
            </h2>
            <p className="text-lg text-muted-foreground">
              Skip the onboarding and grab the analytics + a monthly DIY AEO report you implement on your own time. Roll your sleeves up at $49/mo.
            </p>
          </div>

          <Card className="border-emerald-200 dark:border-emerald-900/50 border-2 shadow-lg max-w-3xl mx-auto" data-testid="card-diy-home">
            <CardContent className="p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-2xl md:text-3xl font-bold">DIY</h3>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-primary">$49</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    7-day free trial · No setup call · Cancel anytime
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Privacy-friendly analytics dashboard + a monthly DIY AEO report so you can see the needle move as you implement the fixes.
                  </p>
                  <a
                    href={STRIPE_LINKS.diy.monthly}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-diy-cta-home"
                  >
                    <Button size="lg" className="font-semibold gap-2" style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}>
                      Start 7-Day Free Trial
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm">Privacy-friendly analytics dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm">Cookie-free, GDPR-friendly tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm">Monthly DIY AEO report</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm">No onboarding fee, no setup call</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm">Upgrade to Starter anytime</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PRICING / MAIN OFFER — AI Operator Subscription */}
      <section id="ai-search-fix" className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Done-For-You · AI Operator Subscription
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Or skip the work — we'll fix it, then keep it fixed.
            </h2>
            <p className="text-lg text-muted-foreground">
              Built for busy owner-operators. Start with a one-time onboarding, then pick a monthly plan so your visibility stays tuned as AI models keep changing.
            </p>
          </div>

          {/* Onboarding Card */}
          <Card className="border-primary border-2 shadow-lg mb-6" data-testid="card-onboarding">
            <CardContent className="p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-block bg-accent/15 text-accent px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3">
                    Step 1 · Required Starting Point
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Onboarding</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-bold text-primary">$997</span>
                    <span className="text-muted-foreground">one-time</span>
                  </div>
                  <p className="text-muted-foreground">
                    Full AI Visibility Audit, AI Data Layer installation, and initial optimizations — implemented for you in 7 business days.
                  </p>
                </div>
                <ul className="space-y-3">
                  {pricingChecklist.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span className="text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Tiers */}
          <div className="text-center mb-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Step 2 · Choose Your Ongoing Plan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {monthlyTiers.map((tier, index) => (
              <Card key={index} className="relative border-2" data-testid={`card-tier-${tier.name.toLowerCase()}`}>
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold">{tier.name}</h4>
                    <span className="text-xs font-semibold uppercase tracking-wide text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                      {tier.tag}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-3xl md:text-4xl font-bold text-primary">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.cadence}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{tier.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center space-y-4">
            <a href="/pricing" data-testid="button-pricing-cta">
              <Button size="lg" className="text-lg px-8 py-6 font-semibold" style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}>
                See Full Pricing
              </Button>
            </a>
            <p className="text-sm text-muted-foreground">
              DIY from $49/mo · $997 onboarding · $299/mo or $599/mo · 60-day guarantee
            </p>
          </div>

          <div className="mt-6 text-center">
            <a
              href={mailtoLink}
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              data-testid="link-email-partner"
            >
              <Mail className="h-4 w-4" />
              Need to talk to a partner? Email this page to them.
            </a>
          </div>
        </div>
      </section>

      {/* PROOF SECTION */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            What Happens After The Fix
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proofBlurbs.map((blurb, index) => (
              <Card key={index} data-testid={`card-proof-${index + 1}`}>
                <CardContent className="p-6">
                  <p className="text-lg font-medium">{blurb}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON QUESTIONS */}
      <section className="faq py-16 md:py-24 bg-muted/30" id="faq">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Common Questions</h2>
          
          <details className="mb-4" data-testid="faq-subscription">
            <summary className="cursor-pointer text-lg font-semibold py-3" data-testid="faq-summary-subscription">
              Is this a monthly subscription?
            </summary>
            <p className="text-muted-foreground py-3 pl-4">
              It's a hybrid. You start with a one-time $997 onboarding — we install your AI Data Layer and ship the initial fixes in 7 business days. Then you choose a monthly plan (Starter $299/mo or Growth $599/mo) so we keep your visibility tuned as AI models and your business change. Monthly plans are month-to-month with no long-term contracts.
            </p>
          </details>
          
          <details className="mb-4" data-testid="faq-rebuild">
            <summary className="cursor-pointer text-lg font-semibold py-3" data-testid="faq-summary-rebuild">
              Do you need to rebuild my website?
            </summary>
            <p className="text-muted-foreground py-3 pl-4">
              Usually no. We add an AI focused data layer around your existing site so AI tools can read what you already have. If we see anything that truly needs to be rebuilt, we will tell you before any extra work is done.
            </p>
          </details>
          
          <details className="mb-4" data-testid="faq-web-person">
            <summary className="cursor-pointer text-lg font-semibold py-3" data-testid="faq-summary-web-person">
              Can my current web person do this?
            </summary>
            <p className="text-muted-foreground py-3 pl-4">
              Most web teams are focused on design, content, and regular search. AI visibility is a different skill set. We only do AI search and AI visibility work, which is why agencies often bring us in behind the scenes to handle this part.
            </p>
          </details>
          
          <details className="mb-4" data-testid="faq-no-website">
            <summary className="cursor-pointer text-lg font-semibold py-3" data-testid="faq-summary-no-website">
              What if I don't have a website?
            </summary>
            <p className="text-muted-foreground py-3 pl-4">
              That's fine. AI systems need a place to read your services, location, and booking information. If you don't have a website, we create a simple AI-ready site as part of making your business AI-eligible.
            </p>
          </details>

          <div className="mt-10 text-center">
            <a
              href="/faq/personas/delegating-owner-operator"
              className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
              data-testid="link-home-faq-personas"
            >
              See more questions answered for owner-operators →
            </a>
          </div>
        </div>
      </section>

      {/* SUPPORT NOTE */}
      <section className="py-8 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center space-y-2">
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
          <p className="text-sm text-muted-foreground">
            <a
              href="https://foundforai.com/blog/what-is-found-for-ai"
              className="text-primary hover:underline"
              data-testid="link-home-what-is-found-for-ai"
            >
              What Is Found For AI?
            </a>
            {' · '}
            <a
              href="/blog/7-things-smart-business-owners-do-to-get-recommended-by-ai"
              className="text-primary hover:underline"
              data-testid="link-home-7-things"
            >
              How to get recommended by AI
            </a>
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
