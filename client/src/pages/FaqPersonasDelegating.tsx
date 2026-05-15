import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';

const FAQS = [
  {
    q: "Why doesn't my business show up when I ask ChatGPT about it?",
    a: "Most likely, your website wasn't built to be read by machines. AI tools don't browse the way Google's crawler does — they pull from structured signals, citations across the open web, and training data that may be a year or more old. If your site lacks machine-readable business data (services, service areas, hours, trust signals in schema), the AI has nothing clean to grab and either skips you or hallucinates something wrong. The fix is to install that structured layer so AI tools can actually parse what you do and who you serve. The AI Visibility Fix from FoundForAI audits exactly where the gaps are and installs the layer in about a week.",
  },
  {
    q: "How do I get my business to show up in ChatGPT, Gemini, and Perplexity?",
    a: "Three things have to be true. First, your site has to be machine-readable — structured data describing your business, services, and service areas in a format AI parsers expect. Second, you need consistent corroboration off-site (directory listings, citations, mentions) so the AI cross-checks and trusts what your site says. Third, your content has to answer the specific questions people ask AI tools, not the keywords they used to type into Google. Most small business sites fail on all three. The AI Visibility Fix installs the structured layer, audits trust signals, and verifies that ChatGPT, Gemini, Perplexity, and Claude actually recommend you when asked.",
  },
  {
    q: "Is AI search a real thing or just hype I should ignore?",
    a: "It's real, and the usage numbers are no longer small. ChatGPT alone processes billions of queries a month, and a meaningful share of those are the kind of research questions people used to type into Google — \"best HVAC company near me,\" \"who should I hire to train my dog,\" \"good CPA for a contractor.\" The shift isn't that Google dies; it's that a chunk of high-intent research now happens inside an AI tool that only names a handful of businesses. If you're not one of the names it gives, you never get the shot. So no, not hype — but you don't need to panic either. You need a clear diagnosis and a fix.",
  },
  {
    q: "How do I know if my AI visibility work is actually working — like, what do I look at?",
    a: "You want a scoreboard, so here it is. The core measurement is direct: ask ChatGPT, Gemini, Perplexity, and Claude the questions your customers would ask (\"best [service] in [city],\" \"who does [specific service] for [specific situation]\"), and track whether your business gets named, how it gets described, and whether the details are accurate. Run those checks before the work, then again after, then monthly. Secondary signals include referral traffic tagged as coming from AI tools and direct inbound that mentions ChatGPT or Perplexity by name. The AI Visibility Fix includes that before/after verification across all four major AI tools as part of the engagement.",
  },
  {
    q: "Do I need to hire someone to handle AI search the way my CPA handles my taxes, or is there a tool that just does it?",
    a: "There are tools, but none of them do the actual fix — they mostly report on where you stand. The work itself is part technical (installing structured data, fixing how your site is parsed) and part editorial (writing content that answers the questions AI tools are asked). It's closer to your CPA than to QuickBooks: you can buy software that tells you something is wrong, but you still need someone to do the work correctly the first time. For most owner-operators, the right move is one-time done-for-you onboarding to install the fix, then light monthly monitoring so it stays tuned as the AI tools keep changing. The AI Visibility Fix is built exactly that way — $997 one-time onboarding delivered in 7 business days, then an optional Starter ($299/mo) or Growth ($599/mo) plan for ongoing monitoring, all backed by a 60-day We Fix It Free guarantee.",
  },
  {
    q: "What's the difference between AI SEO (AEO/GEO) and regular SEO, and do I need both?",
    a: "Regular SEO optimizes for Google's ranked list of blue links — keywords, backlinks, page speed, the usual. AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) optimize for AI tools that give one answer, not ten links. The mechanics are different: AI tools weight structured data, entity clarity, and corroborated facts more heavily, and they down-weight promotional language that ranks fine on Google. You need both because they serve different traffic sources, but if you've never touched the AI side, that's the bigger gap right now — every competitor has been doing SEO for fifteen years. The AI Visibility Fix handles the AEO/GEO layer specifically.",
  },
  {
    q: "How much should a small business owner expect to pay to get found in ChatGPT and other AI tools?",
    a: "The honest range: $1,000 to $5,000 for a proper one-time install on an existing site, and ongoing monitoring is typically $200–$600 a month if you want it. Anything under $500 for the install is usually a script-run audit with no real implementation, and anything over $10,000 for a small local business is almost always an agency padding hours. Look for fixed-price packages with a defined scope — structured data, content adjustments, and verification across the major AI tools — not open-ended hourly retainers. FoundForAI's AI Visibility Fix is $997 for onboarding (the one-time install, delivered in 7 business days, backed by a 60-day We Fix It Free guarantee). After that, monthly plans are optional and also fixed-price — Starter is $299/mo for ongoing monitoring and Growth is $599/mo if you want custom automation workflows and AI agent setup added on top. Month-to-month on both, no long contracts.",
  },
  {
    q: "My SEO guy says he's \"adding AI services\" — is that the same thing as hiring an AI visibility specialist?",
    a: "Probably not, and it's worth asking him three specific questions before you assume it is. One: what structured data schema is he installing, and can he show you the JSON-LD on a page he's already done? Two: how does he verify the work — does he actually query ChatGPT, Gemini, Perplexity, and Claude before and after? Three: what's his approach to llms.txt and AI crawler access? If the answers are vague, he's adding \"AI\" to his pitch deck, not to his deliverable. A real AI visibility specialist treats it as its own discipline with its own verification. The AI Visibility Fix is built around exactly those three things.",
  },
  {
    q: "How long does it take before AI tools like ChatGPT actually start mentioning my business after the work is done?",
    a: "Faster than people expect for some tools, slower for others. Perplexity and the live-search modes of ChatGPT and Gemini can pick up changes within days to a couple of weeks because they crawl in close to real time. Claude and the baseline (non-search) modes of ChatGPT rely more on training data updates and corroborated mentions across the web, so those can take 1–3 months to fully reflect the work. That's why the AI Visibility Fix carries a 60-day We Fix It Free guarantee — it's the realistic window for the slower tools to catch up, and it puts the risk on the provider, not on you.",
  },
  {
    q: "If I do nothing about AI search right now, am I going to lose customers to competitors who already did this?",
    a: "You're in the situation where a chunk of high-intent buyers — people ready to spend real money — are asking AI tools for a recommendation and getting three names. If you're not one of the three, you never knew the lead existed. It's not catastrophic yet because AI search is still a minority of total research traffic in most local categories, but the share is climbing every quarter and the businesses that get installed early tend to stay installed because AI tools reinforce what they've already learned. The honest answer: you're not losing your business tomorrow, but every month you wait, the gap between you and the competitor who did this gets harder to close. The AI Visibility Fix is designed to close it in a week.",
  },
];

const PAGE_URL = 'https://foundforai.com/faq/personas/delegating-owner-operator';

export default function FaqPersonasDelegating() {
  const pageSchemas = [
    breadcrumbList([
      { name: 'Home', url: 'https://foundforai.com/' },
      { name: 'FAQ', url: 'https://foundforai.com/faq/personas/delegating-owner-operator' },
    ]),
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      "url": PAGE_URL,
      "name": "AI Visibility FAQ for Owner-Operators | Found For AI",
      "isPartOf": { "@id": "https://foundforai.com/#website" },
      "about": { "@id": "https://foundforai.com/#org" },
      "description": "Plain-language answers for owner-operators about getting their business found by ChatGPT, Gemini, Perplexity, and Claude — what it costs, how to measure it, and how it differs from regular SEO.",
      "inLanguage": "en-US",
      "primaryImageOfPage": "https://foundforai.com/found-for-ai-logo-white.png",
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      "url": PAGE_URL,
      "isPartOf": { "@id": `${PAGE_URL}#webpage` },
      "mainEntity": FAQS.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a,
        },
      })),
    },
  ];

  return (
    <PageLayout
      title="AI Visibility FAQ for Owner-Operators | Found For AI"
      description="Plain-language answers for owner-operators about getting their business found by ChatGPT, Gemini, Perplexity, and Claude — what it costs, how to measure it, and how it differs from regular SEO."
      canonical={PAGE_URL}
      schemas={pageSchemas}
    >
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              FAQ · For owner-operators delegating their AI visibility
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              The questions owner-operators ask AI tools about getting found
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              These are the real questions small business owners ask ChatGPT, Gemini, Perplexity, and Claude when they realize their business isn't showing up. Below are direct, no-hype answers — what's actually happening, what to do about it, and what it costs.
            </p>
          </div>

          <div className="space-y-10">
            {FAQS.map((f, i) => (
              <article key={i} className="border-b border-border pb-10 last:border-b-0">
                <h2
                  className="text-xl md:text-2xl font-semibold mb-4 leading-snug"
                  style={{ color: '#0F5FDB' }}
                >
                  {f.q}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {f.a}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 p-8 md:p-10 rounded-2xl bg-muted/40 border border-border text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Want to see how AI tools describe your business right now?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Run a free AI Visibility Check. We show you what ChatGPT, Gemini, Perplexity, and Claude say — or don't say — about your business, and exactly what to fix.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/audit">
                <Button size="lg" className="inline-flex items-center gap-2" data-testid="cta-faq-audit">
                  Run my free check <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" data-testid="cta-faq-pricing">
                  See pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
