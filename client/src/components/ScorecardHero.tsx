import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/lib/analytics';

export const SCORECARD_RESULT_STORAGE_KEY = 'scorecard:lastResult';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqwvlnz';

function captureLead(lead: { url: string; email: string; keyword: string }): void {
  // Fire-and-forget. keepalive lets the request finish even if the page
  // navigates away (we redirect to /scorecard/results immediately on
  // success). We never await this — the scoring call is the blocking
  // path, this is just lead capture.
  try {
    void fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      keepalive: true,
      body: JSON.stringify({
        email: lead.email,
        websiteUrl: lead.url,
        keyword: lead.keyword,
        _subject: 'New AI Visibility Scorecard request',
        _language: 'en',
      }),
    }).catch(() => {
      // Swallow — Formspree being down should not break the flow.
    });
  } catch {
    // Same — never let lead capture break the form submit.
  }
}

const PLATFORM_BADGES: Array<{
  abbr: string;
  name: string;
  bg: string;
  fg: string;
}> = [
  { abbr: 'GPT', name: 'ChatGPT', bg: '#86efac', fg: '#065f46' },
  { abbr: 'GEM', name: 'Gemini', bg: '#a5b4fc', fg: '#1e3a8a' },
  { abbr: 'PPX', name: 'Perplexity', bg: '#a5f3fc', fg: '#155e75' },
  { abbr: 'CLD', name: 'Claude', bg: '#fdba74', fg: '#7c2d12' },
];

const CHECKS: Array<{ icon: string; label: string }> = [
  { icon: '🗂', label: 'Schema.org Data' },
  { icon: '🤖', label: 'AI Crawler Access' },
  { icon: '📄', label: 'llms.txt' },
  { icon: '🗺', label: 'XML Sitemap' },
  { icon: '⚙️', label: 'Technical SEO' },
  { icon: '🏆', label: 'E-E-A-T Signals' },
];

function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

interface ScorecardHeroProps {
  /** Render the 6-card "What We Check" grid below the form + badges.
   *  True on the standalone /scorecard page, false on the homepage where
   *  the rest of the marketing body owns the page below the hero. */
  showWhatWeCheck?: boolean;
}

export default function ScorecardHero({
  showWhatWeCheck = false,
}: ScorecardHeroProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const normalizedUrl = normalizeUrl(url);
    if (!normalizedUrl || !email.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing info',
        description: 'Please enter your website and email.',
      });
      return;
    }

    setLoading(true);

    captureLead({
      url: normalizedUrl,
      email: email.trim(),
      keyword: keyword.trim(),
    });

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          url: normalizedUrl,
          email: email.trim(),
          keyword: keyword.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Scoring service returned ${response.status}`);
      }

      const data = await response.json();

      const payload = {
        result: data,
        submitted: {
          url: normalizedUrl,
          email: email.trim(),
          keyword: keyword.trim(),
        },
        receivedAt: new Date().toISOString(),
      };

      try {
        window.sessionStorage.setItem(
          SCORECARD_RESULT_STORAGE_KEY,
          JSON.stringify(payload)
        );
      } catch {
        // sessionStorage can throw in private mode; fail soft and let the
        // results page show its empty state.
      }

      trackEvent('submit_scorecard', {
        form_location: window.location.pathname,
        form_name: 'ai_visibility_scorecard',
      });

      setLocation('/scorecard/results');
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Scan failed',
        description:
          'We could not reach the scoring service. Please try again or email support@foundforai.com.',
      });
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="text-center">
          <div
            className="inline-flex items-center bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full border border-blue-100"
            data-testid="scorecard-eyebrow"
          >
            The New Way to Be Discovered
          </div>

          <h1
            className="mt-8 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-slate-900 dark:text-slate-100"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="scorecard-h1"
          >
            Is AI Recommending<br />Your Business?
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            See exactly how ChatGPT, Gemini, Perplexity, and Claude describe — or
            ignore — your business. Free report, no credit card.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 max-w-5xl mx-auto"
            data-testid="scorecard-form"
            noValidate
          >
            <div className="flex flex-col md:flex-row gap-2 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-2">
              <input
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="yourbusiness.com"
                aria-label="Website URL"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-4 py-3 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 focus:outline-none bg-transparent md:border-r md:border-gray-100 dark:md:border-slate-700"
                data-testid="scorecard-input-url"
              />
              <input
                type="email"
                autoComplete="email"
                placeholder="you@business.com"
                aria-label="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 focus:outline-none bg-transparent md:border-r md:border-gray-100 dark:md:border-slate-700"
                data-testid="scorecard-input-email"
              />
              <input
                type="text"
                placeholder="What should AI find you for?"
                aria-label="Keyword phrase (optional)"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 px-4 py-3 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 focus:outline-none bg-transparent"
                data-testid="scorecard-input-keyword"
              />
              <button
                type="submit"
                disabled={loading}
                className="text-white font-semibold px-6 py-3 rounded-xl text-sm transition flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90"
                style={{ backgroundColor: '#0F5FDB' }}
                data-testid="scorecard-submit"
              >
                {loading ? 'Analyzing…' : 'Get my free report'}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-5 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-2">
                <span className="text-slate-400">✓</span> Instant on-page report
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-slate-400">✓</span> Save as PDF
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-slate-400">✓</span> No credit card
              </span>
            </div>

            <p className="mt-6 text-xs sm:text-sm text-center text-slate-500 dark:text-slate-400">
              Already know you need it?{' '}
              <Link
                href="/fix-plan"
                className="font-medium hover:underline"
                style={{ color: '#0F5FDB' }}
                data-testid="scorecard-fix-plan-link"
              >
                Get the AI Visibility Fix →
              </Link>
            </p>
          </form>

          <div className="mt-16 sm:mt-20">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              <span className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
                Measured Against
              </span>
              {PLATFORM_BADGES.map((badge) => (
                <div
                  key={badge.abbr}
                  className="flex items-center gap-2"
                  data-testid={`scorecard-badge-${badge.abbr.toLowerCase()}`}
                >
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-[10px] font-bold tracking-wide"
                    style={{ background: badge.bg, color: badge.fg }}
                  >
                    {badge.abbr}
                  </span>
                  <span className="text-base font-semibold text-slate-700 dark:text-slate-200">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {showWhatWeCheck ? (
            <div className="mt-16 sm:mt-20 max-w-2xl mx-auto">
              <p className="text-center text-xs font-semibold tracking-widest text-slate-400 uppercase mb-6">
                What We Check
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CHECKS.map((check) => (
                  <div
                    key={check.label}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm px-4 py-3.5 flex items-center gap-3"
                    data-testid={`what-we-check-${check.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  >
                    <span className="text-xl" aria-hidden="true">
                      {check.icon}
                    </span>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-slate-400 mt-6">
                Standards sourced directly from Google, Microsoft, OpenAI,
                Anthropic, schema.org, and llms.txt.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
