import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { SCORECARD_RESULT_STORAGE_KEY } from '@/components/ScorecardHero';

interface ScorecardCheck {
  label: string;
  passed: boolean;
  detail?: string;
}

interface ScorecardSection {
  id: string;
  title: string;
  score: number;
  max: number;
  icon?: string;
  description?: string;
  checks: ScorecardCheck[];
  recommendation?: string;
}

interface ScorecardRecommendation {
  priority: 'high' | 'medium' | 'low';
  text: string;
}

interface ScorecardApiResult {
  url?: string;
  overallScore: number;
  grade: string;
  sections: ScorecardSection[];
  recommendations?: ScorecardRecommendation[];
}

interface StoredPayload {
  result: ScorecardApiResult;
  submitted: { url: string; email: string; keyword: string };
  receivedAt: string;
}

function whatThisMeans(score: number): string {
  if (score >= 80) {
    return "AI tools have a strong baseline to work with. The AI Visibility Fix can push you from 'present' to 'preferred' — making sure ChatGPT, Gemini, and Perplexity reach for you by name when someone in your market asks.";
  }
  if (score >= 60) {
    return 'Your foundation is there but uneven — AI can find some of what you do but is missing key signals. The Fix tightens schema, entity links, and AI-crawler configuration so AI tools confidently recommend you.';
  }
  if (score >= 40) {
    return 'Major gaps. Today AI is reading a fragmented version of your business — wrong, incomplete, or just absent. The Fix installs the visibility layer AI needs to recommend you with confidence.';
  }
  return 'AI cannot reliably understand or recommend your business right now. The Fix installs a complete AI visibility layer and usually delivers within seven business days.';
}

function priorityClass(priority: ScorecardRecommendation['priority']): string {
  if (priority === 'high') return 'bg-red-50 text-red-700 border-red-200';
  if (priority === 'medium') return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-slate-50 text-slate-600 border-slate-200';
}

export default function ScorecardResults() {
  const [payload, setPayload] = useState<StoredPayload | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(SCORECARD_RESULT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredPayload;
        if (parsed?.result?.sections) {
          setPayload(parsed);
        }
      }
    } catch {
      // sessionStorage unavailable / corrupt — fall through to empty state.
    }
    setHydrated(true);
  }, []);

  return (
    <PageLayout
      title="Your AI Visibility Scorecard | Found For AI"
      description="Your personalized AI Visibility Scorecard results."
      canonical="https://foundforai.com/scorecard/results"
      noindex
    >
      <section className="bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-16 md:pt-20 pb-16 md:pb-24">
          {!hydrated ? (
            <div className="text-center py-20 text-slate-500">Loading…</div>
          ) : !payload ? (
            <EmptyState />
          ) : (
            <ResultsView payload={payload} />
          )}
        </div>
      </section>
    </PageLayout>
  );
}

function EmptyState() {
  return (
    <div className="text-center max-w-xl mx-auto py-16">
      <h1
        className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        No scorecard yet
      </h1>
      <p className="text-base text-slate-500 dark:text-slate-400 mb-8">
        Results live in your browser tab. Run a fresh scan to see how AI tools
        currently see your business.
      </p>
      <Link href="/scorecard">
        <Button
          size="lg"
          className="text-base font-semibold"
          style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
          data-testid="results-empty-cta"
        >
          Run my scorecard
        </Button>
      </Link>
    </div>
  );
}

function ResultsView({ payload }: { payload: StoredPayload }) {
  const { result, submitted } = payload;
  const score = Math.max(0, Math.min(100, Math.round(result.overallScore || 0)));

  return (
    <>
      <header className="text-center mb-12">
        <p className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase mb-3">
          AI Visibility Scorecard
        </p>
        <h1
          className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100 mb-3"
          style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.02em' }}
          data-testid="results-h1"
        >
          {submitted.url || result.url || 'Your site'}
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400">
          Reviewed against the published AI visibility standards from Google,
          Microsoft, OpenAI, Anthropic, and schema.org.
        </p>
      </header>

      <div className="grid md:grid-cols-[auto,1fr] gap-8 md:gap-12 items-center mb-12 bg-gradient-to-br from-blue-50/60 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-blue-100 dark:border-slate-700 p-8 md:p-10">
        <div className="text-center">
          <div
            className="text-7xl md:text-8xl font-black leading-none"
            style={{ color: '#0F5FDB', fontFamily: "'Montserrat', sans-serif" }}
            data-testid="results-grade"
          >
            {result.grade || '—'}
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {score}
            <span className="text-base font-medium text-slate-400">/100</span>
          </div>
        </div>
        <div>
          <h2
            className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            What this means
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {whatThisMeans(score)}
          </p>
        </div>
      </div>

      <h2
        className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Section breakdown
      </h2>

      <div className="space-y-4 mb-12">
        {result.sections.map((section) => (
          <Card key={section.id} data-testid={`results-section-${section.id}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-3 text-lg md:text-xl">
                  {section.icon ? (
                    <span aria-hidden="true">{section.icon}</span>
                  ) : null}
                  {section.title}
                </span>
                <Badge variant="outline" className="text-base font-bold">
                  {section.score}/{section.max}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {section.description ? (
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  {section.description}
                </p>
              ) : null}
              <ul className="space-y-2">
                {section.checks.map((check, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200"
                  >
                    {check.passed ? (
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-green-600" />
                    ) : (
                      <X className="h-4 w-4 mt-0.5 shrink-0 text-red-500" />
                    )}
                    <span>
                      <span className={check.passed ? '' : 'font-medium'}>
                        {check.label}
                      </span>
                      {check.detail ? (
                        <span className="block text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                          {check.detail}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
              {section.recommendation ? (
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 border-l-2 border-blue-200 pl-3">
                  {section.recommendation}
                </p>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      {result.recommendations && result.recommendations.length > 0 ? (
        <>
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Prioritized fixes
          </h2>
          <ul className="space-y-2 mb-12">
            {result.recommendations.map((rec, i) => (
              <li
                key={i}
                className={`flex items-start gap-3 text-sm md:text-base p-3 rounded-lg border ${priorityClass(rec.priority)}`}
              >
                <span className="text-xs font-bold uppercase tracking-wide shrink-0 mt-0.5">
                  {rec.priority}
                </span>
                <span>{rec.text}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <Card
        className="bg-gradient-to-br from-primary/10 to-accent/10"
        data-testid="results-cta"
      >
        <CardContent className="p-8 md:p-10 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Want us to fix all of this?
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-6 max-w-xl mx-auto">
            The AI Visibility Fix installs the entire AI visibility layer for you
            in seven business days. One-time, $1,595, with our sixty-day fix-it-free
            guarantee.
          </p>
          <a href="https://foundforai.com/fix-plan" data-testid="results-cta-fix">
            <Button
              size="lg"
              className="text-base md:text-lg px-8 py-6 font-semibold"
              style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
            >
              Get my AI Visibility Fix
            </Button>
          </a>
          <p className="text-xs text-slate-500 mt-4">
            Or email{' '}
            <a
              href="mailto:support@foundforai.com"
              className="underline hover:text-slate-700"
            >
              support@foundforai.com
            </a>{' '}
            with questions.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
