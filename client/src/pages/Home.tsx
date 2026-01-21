import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Mail } from 'lucide-react';

export default function Home() {
  useEffect(() => {
    const updateIframeHeight = (height: number) => {
      const frame = document.getElementById("ai-scanner-frame") as HTMLIFrameElement;
      if (!frame) return;
      const newHeight = Math.max(height, 700);
      frame.style.height = newHeight + "px";
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "resize-iframe") {
        updateIframeHeight(event.data.height);
      }
    };

    window.addEventListener("message", handleMessage);

    const intervalId = setInterval(() => {
      const frame = document.getElementById("ai-scanner-frame") as HTMLIFrameElement;
      if (frame && frame.contentWindow) {
        frame.contentWindow.postMessage({ type: "request-height" }, "*");
      }
    }, 800);

    // FAQPage Schema for homepage
    const faqSchema = document.createElement('script');
    faqSchema.type = 'application/ld+json';
    faqSchema.id = 'home-faq-schema';
    faqSchema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is this a monthly subscription?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. This is a one time project. We install your AI readability layer, deliver your report, and stand behind the work with our sixty day fix it free guarantee."
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
            "text": "Most web teams are focused on design, content, and regular search. AI visibility is a different skill set. We only do AI search and AI readability work, which is why agencies often bring us in behind the scenes to handle this part."
          }
        }
      ]
    });
    document.head.appendChild(faqSchema);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearInterval(intervalId);
      const existingFaq = document.getElementById('home-faq-schema');
      if (existingFaq) {
        document.head.removeChild(existingFaq);
      }
    };
  }, []);

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
      title: "Step Two — AI Readability Layer Installation",
      body: "We install a clean data layer that includes your services, service area, hours, contact and booking info, common questions and answers, core business details, and trust signals."
    },
    {
      title: "Step Three — AI Search Optimization And Verification",
      body: "We test your visibility in leading AI tools and confirm they understand what you offer, recommend you correctly, and link to the right pages."
    }
  ];

  const pricingChecklist = [
    "AI visibility audit and AI readability layer install",
    "Before and after AI visibility report",
    "Seven business day turnaround plus sixty day fix it free guarantee"
  ];

  const proofBlurbs = [
    "AI can clearly describe what you do.",
    "AI can see your service area and contact details.",
    "AI has a reason to recommend you instead of a competitor."
  ];

  const emailSubject = encodeURIComponent("Found For AI Search Fix");
  const emailBody = encodeURIComponent("Check out this AI Search Fix service: https://foundforai.com");
  const mailtoLink = `mailto:sales@foundforai.com?subject=${emailSubject}&body=${emailBody}`;

  return (
    <PageLayout
      title="Found For AI | Be the Business AI Recommends First"
      description="AI tools like ChatGPT, Perplexity, and Google Gemini now decide which local businesses to recommend. We install the missing AI readability layer so AI can finally understand your services, location, and booking link."
      canonical="https://foundforai.com"
      ogImage="/found-for-ai-logo-white.png"
    >
      {/* SECTION 1: HERO / IDENTITY SECTION */}
      <section 
        className="pt-20 md:pt-28 pb-10 md:pb-14 px-5 text-center"
        style={{ background: 'linear-gradient(to right, #EEF3FA, #E6F0FF)' }}
      >
        <div className="max-w-[950px] mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-none">
            <span className="block">Is AI Recommending</span>
            <span className="block font-extrabold tracking-tighter">Your Competition?</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground/80 mb-6 max-w-2xl mx-auto leading-relaxed">
            If AI can't confidently understand your website, it won't recommend you, it will recommend someone else.
          </p>
          
          <p className="text-sm text-muted-foreground/60 mb-12 max-w-2xl mx-auto">
            Found For AI helps businesses become readable, understandable, and recommendable by AI-powered search and answer engines.
          </p>
          
          <div className="flex flex-col items-center gap-3">
            <Button 
              size="lg" 
              className="text-lg px-8"
              onClick={() => {
                const scannerSection = document.getElementById('scanner-section');
                if (scannerSection) {
                  scannerSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              data-testid="button-hero-cta"
            >
              Run Free AI Visibility Report
            </Button>
            <p className="text-sm text-muted-foreground">
              No signup required. Instant results.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: SCANNER APP */}
      <section 
        id="scanner-section" 
        className="scanner-embed-section pt-10 md:pt-12 pb-16 md:pb-20 px-5 text-center bg-white"
        style={{ boxShadow: '0 -1px 3px rgba(0,0,0,0.04)' }}
      >
        <div className="max-w-[950px] mx-auto">
          <iframe 
            id="ai-scanner-frame"
            src="https://foundforaivisibilityaudit.replit.app" 
            className="w-full max-w-[900px] border-none mx-auto block rounded-xl overflow-hidden"
            style={{ 
              height: '600px',
              marginTop: '40px',
              transition: 'height 0.25s ease'
            }}
            loading="lazy"
            title="AI Visibility Audit Scanner"
            data-testid="iframe-scanner-embed"
          />
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
            Our AI Search Fix adds a focused AI readability layer so tools like ChatGPT, Perplexity, and Google Gemini can finally understand, trust, and recommend your business.
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
        </div>
      </section>

      {/* DELIVERY AND GUARANTEE */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Delivered In Seven Business Days, Guaranteed
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
            This is a fast, one time fix. Once you check out, our team starts your AI visibility audit and installs your full AI readability layer. Your upgraded AI visibility is live within seven business days.
          </p>
          
          <div className="text-center space-y-2 mb-10">
            <p className="text-base font-medium">No long projects</p>
            <p className="text-base font-medium">No confusing back and forth</p>
            <p className="text-base font-medium">No agency retainers</p>
          </div>
          
          <Card className="bg-primary/5 border-primary/20" data-testid="card-guarantee">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Our We Fix It Free Guarantee</h3>
              <p className="text-muted-foreground">
                If anything inside your new AI readability layer is incorrect, missing, or breaks within sixty days, we fix it at no cost. This is not a subscription or a trial. It is a real upgrade to how AI understands and recommends your business.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PRICING / MAIN OFFER */}
      <section id="ai-search-fix" className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            One Time AI Search Fix, Built For Local Businesses
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stop wasting budget sending traffic to a site AI cannot read. Upgrade your AI visibility once and start getting recommended.
          </p>
          
          <div className="mb-8">
            <span className="text-5xl md:text-6xl font-bold text-primary">$1,595</span>
            <p className="text-lg text-muted-foreground mt-2">one time</p>
          </div>
          
          <ul className="space-y-3 mb-8 max-w-md mx-auto text-left">
            {pricingChecklist.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                <span className="text-base">{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="space-y-4">
            <a
              href="https://foundforai.com/fix-plan"
              data-testid="button-pricing-cta"
            >
              <Button size="lg" className="text-lg px-8 py-6 font-semibold">
                Get My AI Visibility Fix
              </Button>
            </a>
            <p className="text-sm text-muted-foreground">
              Takes less than two minutes to get started
            </p>
          </div>
          
          <div className="mt-6">
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
              No. This is a one time project. We install your AI readability layer, deliver your report, and stand behind the work with our sixty day fix it free guarantee.
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
              Most web teams are focused on design, content, and regular search. AI visibility is a different skill set. We only do AI search and AI readability work, which is why agencies often bring us in behind the scenes to handle this part.
            </p>
          </details>
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
