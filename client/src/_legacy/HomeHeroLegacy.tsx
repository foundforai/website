// LEGACY — archived 2026-05-07 when the homepage hero was replaced with
// <ScorecardHero /> as part of feature/scorecard-hero-integration.
//
// This file is intentionally not imported anywhere. It exists so the
// previous two-column hero (stock photo + "See How AI Sees Your Business" /
// "How AI Search Works" CTAs) is preserved verbatim and easy to diff
// without spelunking through git history.
//
// If you need to roll back the hero, port this JSX back into
// client/src/pages/Home.tsx in place of <ScorecardHero /> and re-add the
// heroImage import + Link/ArrowRight imports.

import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const heroImage =
  'https://images.unsplash.com/photo-1758518730136-1bf4fa26ccbf?q=80&w=3731&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default function HomeHeroLegacy() {
  return (
    <section
      className="pt-20 md:pt-28 pb-16 md:pb-20 px-5 bg-gradient-to-r from-slate-100 to-blue-50 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column: Copy + CTAs */}
          <div className="text-center md:text-left">
            <h1
              className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold mb-6 tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span className="text-slate-900 dark:text-slate-100">Is AI Recommending</span>
              <br />
              <span className="text-[#0F5FDB]">Your Business?</span>
            </h1>

            <div className="sr-only">
              <p>
                Found For AI is a company that offers an AI visibility framework and
                implementation service that helps businesses get discovered and
                recommended by AI-powered search systems like ChatGPT, Google Gemini,
                and Perplexity.
              </p>
            </div>

            <p className="text-lg md:text-xl mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
              If AI can't confidently understand what you do, where you operate, and
              how customers contact you, it won't recommend you.
            </p>

            <p
              className="sr-only"
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: 0,
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: 0,
              }}
            >
              Found For AI helps B2B service businesses get discovered and recommended
              by AI-powered search tools like Google Gemini, ChatGPT, and Perplexity.
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
              <Link href="/audit">
                <Button
                  size="lg"
                  className="text-base px-6 py-3 font-semibold"
                  style={{ backgroundColor: '#0F5FDB', color: '#ffffff', border: 'none' }}
                  data-testid="button-hero-cta"
                >
                  See How AI Sees Your Business
                </Button>
              </Link>
              <Link
                href="/what-is-ai-seo"
                className="inline-flex items-center gap-1 text-sm font-medium py-3 transition-colors"
                style={{ color: '#0F5FDB' }}
                data-testid="link-hero-secondary"
              >
                How AI Search Works <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="order-first md:order-last">
            <img
              src={heroImage}
              alt="Business team reviewing AI visibility data on laptop"
              className="w-full h-auto rounded-xl shadow-lg"
              data-testid="img-hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
