import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Building2, ArrowRight } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';
import ScorecardHero from '@/components/ScorecardHero';

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
          "name": "How does pricing work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every engagement is scoped to your business, so we quote custom rather than list set packages. We start with an audit and install your AI Data Layer, then keep your visibility tuned with ongoing optimization. Book a call and we'll put together a proposal that fits your goals, footprint, and budget."
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
        },
        {
          "@type": "Question",
          "name": "Do you work with larger organizations or agencies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We design custom AI visibility programs for mid-market companies, retail chains, multi-location brands, and agencies. These engagements are scoped individually — covering multi-location rollouts, white-label delivery for agencies, and custom reporting. Contact us to discuss your specific needs."
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

  const capabilities = [
    {
      name: "AI Visibility & AEO",
      summary: "Get read, trusted, and recommended by ChatGPT, Gemini, Perplexity, and Claude — through structured data, entity clarity, and AI-readable content.",
    },
    {
      name: "AI-First Marketing",
      summary: "AI-ready marketing for businesses, brands, and sports organizations — built so AI surfaces you first when buyers and fans go looking.",
    },
    {
      name: "Ongoing Optimization & Reporting",
      summary: "We keep your visibility tuned as the models change, and show you exactly what AI says about your business over time.",
    },
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
          
          <p className="text-lg md:text-xl font-bold text-center mb-10">
            If AI cannot understand your business, it cannot recommend you to your next customer.
          </p>

          <Card className="bg-background/60 border-border max-w-3xl mx-auto" data-testid="card-grocery-example">
            <CardContent className="p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                A real-world example
              </p>
              <p className="text-base md:text-lg">
                Ask an AI assistant what's on sale this week at a regional grocery chain, and it usually can't answer — the weekly ad is locked inside images and PDFs that AI can't read. The promotions exist, the chain spent money producing them, and AI still recommends a competitor. The same blind spot affects service pages, menus, inventory, and booking details across every industry.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* HOW AI ACTUALLY DECIDES WHO TO RECOMMEND */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            How AI Actually Decides Who to Recommend
          </h2>

          <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            Modern AI assistants don't search the web in real time. They retrieve pre-indexed chunks of content and use them to generate answers. This is called Retrieval-Augmented Generation, or RAG. Three things determine whether your business shows up in that retrieved set.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="h-full" data-testid="card-rag-readable">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Your site has to be readable</h3>
                <p className="text-muted-foreground">
                  AI systems rely on structured data, clear entity signals, and machine-readable files like llms.txt to understand what your business is, where it operates, and what it offers.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full" data-testid="card-rag-chunkable">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Your content has to be chunkable</h3>
                <p className="text-muted-foreground">
                  Each section of your site needs to make sense on its own. A 200-to-400-word passage answering a specific customer question is far more retrievable than a long page that buries the answer.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full" data-testid="card-rag-trusted">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Your business has to be trusted</h3>
                <p className="text-muted-foreground">
                  AI weighs entity authority, consistent identity across the web, verified business details, and citation patterns when deciding which businesses to recommend.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="text-center">
            We install all three.{' '}
            <a
              href="/retrieval-layer-seo"
              className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
              data-testid="link-home-retrieval-layer-seo"
            >
              Learn how Retrieval-Layer SEO works →
            </a>
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
            Engagements move fast. Once we start, our team runs your AI Visibility Audit, installs your AI Data Layer, and ships your initial optimizations within seven business days. After that, ongoing optimization keeps everything tuned as AI models and your business change.
          </p>

          <div className="text-center space-y-2 mb-10">
            <p className="text-base font-medium">No DIY checklists</p>
            <p className="text-base font-medium">No confusing back and forth</p>
            <p className="text-base font-medium">No off-the-shelf packages — every engagement is scoped to you</p>
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

      {/* MAIN OFFER — Custom Engagements */}
      <section id="ai-search-fix" className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Custom Engagements
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We scope the work to your business.
            </h2>
            <p className="text-lg text-muted-foreground">
              No two businesses show up in AI the same way — so we don't sell packages off a shelf. We start by learning where you stand, then build a custom engagement: install the AI Data Layer, fix what's blocking recommendations, and keep it tuned as the models change.
            </p>
          </div>

          {/* Capability Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {capabilities.map((cap, index) => (
              <Card key={index} className="h-full border-2" data-testid={`card-capability-${index + 1}`}>
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-bold mb-3">{cap.name}</h3>
                  <p className="text-muted-foreground text-sm">{cap.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/book-call" data-testid="button-book-call-cta">
              <Button size="lg" className="text-lg px-8 py-6 font-semibold" style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}>
                Book a Strategy Call
              </Button>
            </a>
            <a href="/scorecard" data-testid="button-report-cta">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 font-semibold border-2">
                Get a Free Visibility Report
              </Button>
            </a>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-6">
            Custom engagements · Scoped to your business · No off-the-shelf packages
          </p>

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

      {/* ENTERPRISE & AGENCY */}
      <section id="enterprise" className="py-16 md:py-20 bg-slate-900 dark:bg-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Building2 className="h-4 w-4" />
              Enterprise &amp; Agency Scoping
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Custom AI Visibility programs for larger organizations
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Mid-market companies, retail chains, multi-location brands, and agencies have needs that don't fit a standard plan. We scope these engagements individually. Let's discuss your specific needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6" data-testid="card-enterprise-multilocation">
                <h3 className="font-bold mb-2">Multi-location &amp; multi-brand</h3>
                <p className="text-sm text-slate-300">
                  AI Data Layer rollouts across dozens or hundreds of locations, with per-location entity signals and centralized governance.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6" data-testid="card-enterprise-agency">
                <h3 className="font-bold mb-2">Agency partnerships</h3>
                <p className="text-sm text-slate-300">
                  White-label AI visibility delivery for agencies. We handle the AI search layer behind the scenes while you own the client relationship.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6" data-testid="card-enterprise-reporting">
                <h3 className="font-bold mb-2">Custom programs &amp; reporting</h3>
                <p className="text-sm text-slate-300">
                  Bespoke scoping, measurement, and reporting aligned to your stakeholders — from AI visibility baselines to month-over-month tracking.
                </p>
              </div>
            </div>

            <a href="/contact" data-testid="button-enterprise-cta">
              <Button
                size="lg"
                className="text-lg px-8 py-6 font-semibold bg-white text-slate-900 hover:bg-slate-100"
              >
                Talk to us about custom scoping
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </a>
            <p className="text-sm text-slate-400 mt-4">
              No forms gauntlet — a direct conversation about your organization's AI visibility.
            </p>
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
          
          <details className="mb-4" data-testid="faq-pricing">
            <summary className="cursor-pointer text-lg font-semibold py-3" data-testid="faq-summary-pricing">
              How does pricing work?
            </summary>
            <p className="text-muted-foreground py-3 pl-4">
              Every engagement is scoped to your business, so we quote custom rather than list set packages. We start with an audit and install your AI Data Layer, then keep your visibility tuned with ongoing optimization. Book a call and we'll put together a proposal that fits your goals, footprint, and budget.
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

          <details className="mb-4" data-testid="faq-enterprise">
            <summary className="cursor-pointer text-lg font-semibold py-3" data-testid="faq-summary-enterprise">
              Do you work with larger organizations or agencies?
            </summary>
            <p className="text-muted-foreground py-3 pl-4">
              Yes. We design custom AI visibility programs for mid-market companies, retail chains, multi-location brands, and agencies. These engagements are scoped individually — covering multi-location rollouts, white-label delivery for agencies, and custom reporting. <a href="/contact" className="text-primary hover:underline font-medium">Contact us</a> to discuss your specific needs.
            </p>
          </details>

          <div className="mt-10 text-center">
            <a
              href="/faq/personas/delegating-owner-operator"
              className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
              data-testid="link-home-faq-personas"
            >
              See more common questions answered →
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
