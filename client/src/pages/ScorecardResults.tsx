import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { Check, X, Download, ChevronDown, ArrowRight, Lock } from 'lucide-react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { useToast } from '@/hooks/use-toast';
import { trackEvent, trackPurchase } from '@/lib/analytics';
import {
  SCORECARD_RESULT_STORAGE_KEY,
  SCORECARD_FULL_STORAGE_KEY,
} from '@/components/ScorecardHero';

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
  checks?: ScorecardCheck[];
  recommendation?: string;
}

interface ScorecardRecommendation {
  priority: 'high' | 'medium' | 'low';
  text: string;
}

interface ScorecardMeta {
  schemasFound?: string[];
}

interface ScorecardApiResult {
  url?: string;
  overallScore: number;
  grade: string;
  sections: ScorecardSection[];
  recommendations?: ScorecardRecommendation[];
  meta?: ScorecardMeta;
  /** Free teaser only — number of failing checks across all sections. */
  issueCount?: number;
  /** True on the free teaser payload (no per-check details / action plan). */
  locked?: boolean;
}

interface Submitted {
  url: string;
  email: string;
  keyword: string;
}

interface StoredPayload {
  result: ScorecardApiResult;
  submitted: Submitted;
  receivedAt: string;
}

const AUDIT_PRICE = '$99';

// The paid $99 self-serve unlock is dormant: the funnel now gives the full
// report away free on a booked call. The Stripe plumbing (api/checkout.ts +
// the session_id path in api/audit.ts) is left intact — flip this to `true`
// to bring the paywall UI back with no other changes.
const SHOW_PAID_UNLOCK = false;

function gradeColor(grade: string): { ring: string; text: string; pillBg: string; pillText: string } {
  const g = (grade || '').toUpperCase().charAt(0);
  if (g === 'A') return { ring: '#16a34a', text: '#16a34a', pillBg: '#dcfce7', pillText: '#15803d' };
  if (g === 'B') return { ring: '#22c55e', text: '#22c55e', pillBg: '#dcfce7', pillText: '#15803d' };
  if (g === 'C') return { ring: '#f59e0b', text: '#d97706', pillBg: '#fef3c7', pillText: '#b45309' };
  if (g === 'D') return { ring: '#f97316', text: '#ea580c', pillBg: '#ffedd5', pillText: '#c2410c' };
  return { ring: '#ef4444', text: '#dc2626', pillBg: '#fee2e2', pillText: '#b91c1c' };
}

function progressBarColor(score: number, max: number): string {
  if (max <= 0) return '#cbd5e1';
  const pct = score / max;
  if (pct >= 0.85) return '#16a34a';
  if (pct >= 0.6) return '#22c55e';
  if (pct >= 0.35) return '#f59e0b';
  return '#ef4444';
}

function priorityPillClasses(priority: ScorecardRecommendation['priority']): string {
  if (priority === 'high') return 'bg-red-50 text-red-700 border-red-200';
  if (priority === 'medium') return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-blue-50 text-blue-700 border-blue-200';
}

function ScoreRing({ score, color }: { score: number; color: string }) {
  const size = 140;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  const offset = circumference * (1 - clamped / 100);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
        fontSize={36}
        fontWeight={800}
        fill={color}
      >
        {clamped}
      </text>
      <text x="50%" y="68%" textAnchor="middle" dominantBaseline="central" fontSize={11} fill="#94a3b8">
        / 100
      </text>
    </svg>
  );
}

type Mode = 'teaser' | 'verifying' | 'full' | 'error';

export default function ScorecardResults() {
  const [payload, setPayload] = useState<StoredPayload | null>(null);
  const [fullResult, setFullResult] = useState<ScorecardApiResult | null>(null);
  const [mode, setMode] = useState<Mode>('teaser');
  const [errorMsg, setErrorMsg] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    // Load the free teaser (for the site URL + submitted context).
    let stored: StoredPayload | null = null;
    try {
      const raw = window.sessionStorage.getItem(SCORECARD_RESULT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredPayload;
        if (parsed?.result?.sections) stored = parsed;
      }
    } catch {
      // sessionStorage unavailable / corrupt — fall through.
    }
    setPayload(stored);

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const adminKey = params.get('key');
    const adminUrl = params.get('url');

    if (adminKey) {
      // Internal operator link: generate the full report for any URL with no
      // payment. Gated server-side by SCORECARD_ADMIN_KEY.
      setMode('verifying');
      setAdminMode(true);
      setHydrated(true);
      const q = new URLSearchParams({ admin_key: adminKey, url: adminUrl || '' });
      fetch(`/api/audit?${q.toString()}`)
        .then(async (res) => {
          const data = (await res.json()) as ScorecardApiResult & { error?: string };
          if (!res.ok || !data.sections) {
            throw new Error(data?.error || 'Could not generate the report.');
          }
          setFullResult(data);
          if (data.url) {
            setPayload({
              result: data,
              submitted: { url: data.url, email: '', keyword: '' },
              receivedAt: new Date().toISOString(),
            });
          }
          setMode('full');
          // Strip the admin key from the URL bar / history.
          window.history.replaceState({}, '', '/scorecard/results');
        })
        .catch((err: unknown) => {
          setErrorMsg(err instanceof Error ? err.message : 'Could not generate the report.');
          setMode('error');
        });
      return;
    }

    if (sessionId) {
      // Returning from Stripe — verify payment server-side, then unlock.
      setMode('verifying');
      setHydrated(true);
      fetch(`/api/audit?session_id=${encodeURIComponent(sessionId)}`)
        .then(async (res) => {
          const data = (await res.json()) as ScorecardApiResult & {
            error?: string;
            payment?: { sessionId?: string; amountTotal?: number | null; currency?: string };
          };
          if (!res.ok || !data.sections) {
            throw new Error(data?.error || 'We could not verify your payment.');
          }
          setFullResult(data);
          setMode('full');
          try {
            window.sessionStorage.setItem(SCORECARD_FULL_STORAGE_KEY, JSON.stringify(data));
          } catch {
            // ignore storage failures
          }
          // Fire the GA4 purchase conversion once per Stripe session. GA4 also
          // dedupes by transaction_id, but this guard avoids a duplicate push
          // if the effect re-runs before the URL is cleaned.
          const txnId = data.payment?.sessionId || sessionId;
          const guardKey = `scorecard:tracked:${txnId}`;
          let alreadyTracked = false;
          try {
            alreadyTracked = window.sessionStorage.getItem(guardKey) === '1';
          } catch {
            // ignore
          }
          if (!alreadyTracked) {
            const cents = data.payment?.amountTotal;
            const value = typeof cents === 'number' ? cents / 100 : 99;
            trackPurchase({
              transactionId: txnId,
              value,
              currency: data.payment?.currency || 'USD',
            });
            try {
              window.sessionStorage.setItem(guardKey, '1');
            } catch {
              // ignore
            }
          }
          // Drop session_id from the URL so a refresh doesn't re-verify.
          window.history.replaceState({}, '', '/scorecard/results');
        })
        .catch((err: unknown) => {
          setErrorMsg(err instanceof Error ? err.message : 'Verification failed.');
          setMode('error');
        });
      return;
    }

    // No Stripe redirect: show a previously-unlocked full report if present,
    // otherwise the free teaser.
    try {
      const rawFull = window.sessionStorage.getItem(SCORECARD_FULL_STORAGE_KEY);
      if (rawFull) {
        const parsedFull = JSON.parse(rawFull) as ScorecardApiResult;
        if (parsedFull?.sections) {
          setFullResult(parsedFull);
          setMode('full');
        }
      }
    } catch {
      // ignore
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
      <section className="bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {!hydrated ? (
            <div className="text-center py-20 text-slate-500">Loading…</div>
          ) : mode === 'verifying' ? (
            <VerifyingState admin={adminMode} />
          ) : mode === 'error' ? (
            <ErrorState message={errorMsg} hasTeaser={!!payload} />
          ) : mode === 'full' && fullResult ? (
            <FullView result={fullResult} submitted={payload?.submitted} />
          ) : payload ? (
            <TeaserView payload={payload} />
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </PageLayout>
  );
}

function VerifyingState({ admin = false }: { admin?: boolean }) {
  return (
    <div className="text-center max-w-xl mx-auto py-24">
      <div
        className="mx-auto mb-6 h-10 w-10 rounded-full border-4 border-slate-200 border-t-[#0F5FDB] animate-spin"
        aria-hidden="true"
      />
      <h1
        className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-3"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {admin ? 'Generating the full report…' : 'Unlocking your full audit…'}
      </h1>
      <p className="text-base text-slate-500 dark:text-slate-400">
        {admin
          ? 'Running the complete AI visibility scan on this site. This takes a few seconds.'
          : 'Confirming your payment and generating your complete report. This takes a few seconds.'}
      </p>
    </div>
  );
}

function ErrorState({ message, hasTeaser }: { message: string; hasTeaser: boolean }) {
  return (
    <div className="text-center max-w-xl mx-auto py-16">
      <h1
        className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-4"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        We couldn't unlock your audit
      </h1>
      <p className="text-base text-slate-500 dark:text-slate-400 mb-2">{message}</p>
      <p className="text-base text-slate-500 dark:text-slate-400 mb-8">
        If you were charged, email{' '}
        <a href="mailto:support@foundforai.com" className="font-semibold" style={{ color: '#0F5FDB' }}>
          support@foundforai.com
        </a>{' '}
        and we'll send your full report right away.
      </p>
      <Link href="/scorecard">
        <button
          className="text-white font-semibold px-6 py-3 rounded-xl text-sm transition hover:opacity-90"
          style={{ backgroundColor: '#0F5FDB' }}
        >
          {hasTeaser ? 'Run a new scan' : 'Run my scorecard'}
        </button>
      </Link>
    </div>
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
        Results live in your browser tab. Run a fresh scan to see how AI tools currently see your business.
      </p>
      <Link href="/scorecard">
        <button
          className="text-white font-semibold px-6 py-3 rounded-xl text-sm transition hover:opacity-90"
          style={{ backgroundColor: '#0F5FDB' }}
          data-testid="results-empty-cta"
        >
          Run my scorecard
        </button>
      </Link>
    </div>
  );
}

/** Shared header card: title + URL + score ring + grade + 3-stat row. */
function ScoreHeader({
  title,
  url,
  score,
  grade,
  headlineStats,
}: {
  title: string;
  url: string;
  score: number;
  grade: string;
  headlineStats: Array<{ label: string; value: number | null }>;
}) {
  const colors = gradeColor(grade);
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-6 sm:p-8 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-6 items-center">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-1"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="results-h1"
          >
            {title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 break-all">{url}</p>
        </div>
        <div className="flex flex-col items-center justify-self-start sm:justify-self-end">
          <ScoreRing score={score} color={colors.ring} />
          <span
            className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: colors.pillBg, color: colors.pillText }}
            data-testid="results-grade-pill"
          >
            Grade {grade}
          </span>
        </div>
      </div>
      {headlineStats.length > 0 ? (
        <div className="border-t border-gray-100 dark:border-slate-700 mt-6 pt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {headlineStats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {stat.value === null ? '—' : `${stat.value}%`}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SchemaChips({ schemas }: { schemas: string[] }) {
  if (!schemas.length) return null;
  return (
    <div className="bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-2xl p-5 sm:p-6 mb-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-blue-700 dark:text-blue-400 uppercase mb-3">
        Detected Schema Types
      </p>
      <div className="flex flex-wrap gap-2">
        {schemas.map((schemaName) => (
          <span
            key={schemaName}
            className="inline-flex items-center bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 text-sm font-medium px-3 py-1.5 rounded-full border border-blue-100 dark:border-slate-700"
            data-testid="results-schema-chip"
          >
            {schemaName}
          </span>
        ))}
      </div>
    </div>
  );
}

function useHeadlineStats(sections: ScorecardSection[]) {
  return useMemo(() => {
    const byId = new Map(sections.map((s) => [s.id, s]));
    const pct = (id: string) => {
      const s = byId.get(id);
      if (!s || s.max <= 0) return null;
      return Math.round((s.score / s.max) * 100);
    };
    return [
      { label: 'Schema.org', value: pct('schema') },
      { label: 'AI Crawlers', value: pct('crawlers') },
      { label: 'Technical SEO', value: pct('technical') },
    ];
  }, [sections]);
}

/* ------------------------------------------------------------------ */
/* FREE TEASER VIEW — score + categories + issue count, fixes locked.  */
/* ------------------------------------------------------------------ */

function TeaserView({ payload }: { payload: StoredPayload }) {
  const { result, submitted } = payload;
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const score = Math.max(0, Math.min(100, Math.round(result.overallScore || 0)));
  const grade = (result.grade || '—').toUpperCase();
  const url = submitted.url || result.url || '';
  const issueCount = Math.max(0, result.issueCount ?? 0);

  const handleUnlock = async () => {
    if (loading) return;
    setLoading(true);
    trackEvent('begin_checkout', {
      form_location: '/scorecard/results',
      value: 99,
      currency: 'USD',
    });
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          url,
          email: submitted.email,
          keyword: submitted.keyword,
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data?.error || 'Could not start checkout.');
      }
      window.location.href = data.url;
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Checkout unavailable',
        description:
          err instanceof Error
            ? err.message
            : 'Please try again or email support@foundforai.com.',
      });
      setLoading(false);
    }
  };

  return (
    <>
      <ScoreHeader
        title="Your AI Visibility Score"
        url={url}
        score={score}
        grade={grade}
        headlineStats={[]}
      />

      {/* The hook: give the number, keep the specifics ambiguous. */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-6 sm:p-8 mb-6">
        <div className="flex items-start gap-4">
          <span className="shrink-0 mt-0.5 flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40">
            <Lock className="h-5 w-5 text-amber-700 dark:text-amber-300" />
          </span>
          <div>
            <h2
              className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              data-testid="results-issue-count"
            >
              {issueCount > 0
                ? `We found ${issueCount} ${issueCount === 1 ? 'issue' : 'issues'} limiting how AI sees you`
                : 'Here’s what’s shaping your score'}
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Your score reflects how well ChatGPT, Gemini, Perplexity, and Claude can find,
              understand, and trust your business right now. Some of what we found is working
              in your favor — and some of it is quietly holding you back.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              The full breakdown — exactly what’s working, what isn’t, and how to fix each
              item — is{' '}
              <span className="font-semibold text-slate-900 dark:text-slate-100">yours free</span>.
              We’ll walk you through it live so nothing gets lost in translation.
            </p>
          </div>
        </div>
      </div>

      {/* Primary CTA: book the call to get the full report free. */}
      <div
        className="rounded-2xl p-6 sm:p-10 mb-6 text-center shadow-sm"
        style={{ backgroundColor: '#0F5FDB' }}
      >
        <h2
          className="text-2xl sm:text-3xl font-extrabold text-white mb-3"
          style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
        >
          See your full report — free
        </h2>
        <p className="text-base text-blue-50 mb-7 max-w-xl mx-auto leading-relaxed">
          Book a free 15-minute call and we’ll walk you through your complete AI Visibility
          Report — every issue, in plain English, with the exact fixes. No pitch, no credit card.
        </p>
        <a
          href="/book-call"
          className="inline-flex items-center justify-center gap-2 bg-white text-[#0F5FDB] font-bold px-8 py-4 rounded-xl text-base transition hover:bg-blue-50"
          data-testid="results-book-call"
        >
          Get my full report → Book a free call
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Dormant $99 self-serve unlock — controlled by SHOW_PAID_UNLOCK. */}
      {SHOW_PAID_UNLOCK ? (
        <div className="bg-white dark:bg-slate-800 border-2 border-[#0F5FDB]/30 rounded-2xl p-6 sm:p-10 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
                <Lock className="h-3.5 w-3.5" /> Full Audit
              </span>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100"
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
              >
                Unlock your full AI Visibility Audit
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <div
                className="text-4xl font-extrabold text-slate-900 dark:text-slate-100"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {AUDIT_PRICE}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">one-time</div>
            </div>
          </div>

          <ul className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              'Every issue we found, explained in plain English',
              'A prioritized, step-by-step action plan',
              'Exactly what passed and failed in each category',
              'Downloadable PDF report to keep or share',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={handleUnlock}
            disabled={loading}
            className="w-full text-center text-white font-semibold px-6 py-4 rounded-xl text-base transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#0F5FDB' }}
            data-testid="results-unlock-cta"
          >
            {loading ? 'Starting secure checkout…' : `Unlock full audit — ${AUDIT_PRICE}`}
          </button>

          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
            Secure checkout via Stripe · Instant access · No subscription
          </p>
        </div>
      ) : null}

      {/* Enterprise / agency */}
      <div className="bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-2xl p-6 sm:p-8 mb-6 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Reviewing this for a larger organization or agency?{' '}
          <Link href="/contact" className="font-semibold hover:underline" style={{ color: '#0F5FDB' }}>
            Let’s talk about custom scoping →
          </Link>
        </p>
      </div>

      <ReportFooter />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* FULL VIEW — unlocked after payment OR via the internal admin key.   */
/* ------------------------------------------------------------------ */

function FullView({ result, submitted }: { result: ScorecardApiResult; submitted?: Submitted }) {
  const score = Math.max(0, Math.min(100, Math.round(result.overallScore || 0)));
  const grade = (result.grade || '—').toUpperCase();
  const url = submitted?.url || result.url || '';
  const schemas = result.meta?.schemasFound || [];
  const headlineStats = useHeadlineStats(result.sections);

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const quoteMailto = `mailto:support@foundforai.com?subject=${encodeURIComponent(
    'Done-For-You Quote — AI Visibility Audit'
  )}&body=${encodeURIComponent(
    `Hi — I just unlocked the full AI Visibility Audit on ${url} and would like a done-for-you quote.\n\nMy score: ${score}/100 (Grade ${grade})`
  )}`;

  return (
    <>
      <ScoreHeader
        title="Full AI Visibility Report"
        url={url}
        score={score}
        grade={grade}
        headlineStats={headlineStats}
      />

      <SchemaChips schemas={schemas} />

      <AccordionPrimitive.Root type="multiple" className="space-y-4 mb-6" data-testid="results-sections">
        {result.sections.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
      </AccordionPrimitive.Root>

      {result.recommendations && result.recommendations.length > 0 ? (
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 sm:p-8 mb-6">
          <h2
            className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Action Plan
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-5">
            Prioritized steps to improve your AI visibility score
          </p>
          <ul className="space-y-3 border-t border-gray-100 dark:border-slate-700 pt-5">
            {result.recommendations.map((rec, i) => (
              <li
                key={i}
                className="flex items-start gap-4 text-sm md:text-base text-slate-700 dark:text-slate-200"
                data-testid={`results-rec-${rec.priority}`}
              >
                <span
                  className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase border ${priorityPillClasses(rec.priority)}`}
                >
                  {rec.priority}
                </span>
                <span className="pt-0.5">{rec.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="no-print bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-2xl p-6 sm:p-10 mb-6">
        <h2
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-3"
          style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.01em' }}
        >
          You've got your roadmap. Want us to handle the fixes?
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          We'll walk you through your report live and give you a custom 30-day plan to get cited by ChatGPT,
          Gemini, Perplexity, and Claude.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <a
            href="/book-call"
            className="flex-1 text-center text-white font-semibold px-5 py-4 rounded-xl text-sm sm:text-base transition hover:opacity-90"
            style={{ backgroundColor: '#0F5FDB' }}
            data-testid="results-cta-book"
          >
            Walk Me Through My Report — Book Free 15-Min Review
          </a>
          <a
            href={quoteMailto}
            className="flex-1 text-center bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-semibold px-5 py-4 rounded-xl text-sm sm:text-base transition hover:bg-slate-50 dark:hover:bg-slate-800"
            data-testid="results-cta-quote"
          >
            Email Me a Done-For-You Quote
          </a>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            No pitch — we review your report live
          </span>
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            Custom 30-day fix roadmap
          </span>
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            15 minutes, free, no credit card
          </span>
        </div>
      </div>

      <div className="no-print bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 mb-6 text-center">
        <p className="text-base text-slate-600 dark:text-slate-300">
          Reviewing this for a larger organization, retail chain, or agency?{' '}
          <Link
            href="/contact"
            className="font-semibold hover:underline"
            style={{ color: '#0F5FDB' }}
            data-testid="results-enterprise-link"
          >
            Let's talk about custom scoping →
          </Link>
        </p>
      </div>

      <button
        type="button"
        onClick={handlePrint}
        className="no-print w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-md transition mb-6"
        data-testid="results-download-pdf"
      >
        <Download className="h-4 w-4" />
        Download PDF
      </button>

      <ReportFooter />
    </>
  );
}

function ReportFooter() {
  return (
    <p className="text-center text-xs text-slate-500 dark:text-slate-400 pb-4">
      Report generated by{' '}
      <Link href="/" className="font-semibold hover:underline" style={{ color: '#0F5FDB' }}>
        FoundForAI
      </Link>{' '}
      · Standards sourced from Google, Bing, OpenAI, Anthropic, schema.org, and llms.txt.
    </p>
  );
}

function SectionCard({ section }: { section: ScorecardSection }) {
  const pct = section.max > 0 ? Math.max(0, Math.min(100, (section.score / section.max) * 100)) : 0;
  const barColor = progressBarColor(section.score, section.max);
  const checks = section.checks || [];

  return (
    <AccordionPrimitive.Item
      value={section.id}
      className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl overflow-hidden"
      data-testid={`results-section-${section.id}`}
    >
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger
          className="group w-full text-left p-5 sm:p-6 flex flex-col gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition"
          data-testid={`results-section-trigger-${section.id}`}
        >
          <div className="flex items-center gap-3">
            {section.icon ? (
              <span className="text-xl" aria-hidden="true">
                {section.icon}
              </span>
            ) : null}
            <h3
              className="flex-1 text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {section.title}
            </h3>
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100 shrink-0">
              {section.score}/{section.max}
            </div>
            <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </div>
          <div className="h-2 rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: barColor }} />
          </div>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1">
          {section.description ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{section.description}</p>
          ) : null}

          <ul className="divide-y divide-gray-100 dark:divide-slate-700 border-t border-gray-100 dark:border-slate-700">
            {checks.map((check, i) => (
              <li key={i} className="flex items-start gap-3 py-3 text-sm text-slate-700 dark:text-slate-200">
                <span
                  className={`shrink-0 mt-0.5 flex items-center justify-center w-6 h-6 rounded-full ${
                    check.passed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
                  }`}
                >
                  {check.passed ? (
                    <Check className="h-3.5 w-3.5 text-green-600" />
                  ) : (
                    <X className="h-3.5 w-3.5 text-red-500" />
                  )}
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{check.label}</div>
                  {check.detail ? (
                    <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{check.detail}</div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>

          {section.recommendation ? (
            <div className="mt-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg p-4 text-sm text-slate-600 dark:text-slate-300 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <span className="font-bold text-slate-900 dark:text-slate-100">Recommendation:</span>{' '}
                {section.recommendation}
              </div>
              <a
                href="/book-call"
                className="no-print shrink-0 inline-flex items-center justify-center gap-1.5 text-white font-semibold px-4 py-2.5 rounded-lg text-xs sm:text-sm transition hover:opacity-90 whitespace-nowrap"
                style={{ backgroundColor: '#0F5FDB' }}
                data-testid={`results-section-cta-${section.id}`}
              >
                Click here and let us help
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ) : null}
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}
