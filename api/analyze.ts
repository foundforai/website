// Local proxy for the AI Visibility Scorecard (free tier).
//
// The scoring engine lives on an external service (scorecard.foundforai.com).
// We proxy through this function so the FREE result returns only a teaser:
// overall score, grade, per-category scores, detected schema types, and a
// count of issues found. The per-check details and the prioritized action
// plan are withheld here — they are the deliverable of the paid audit and are
// only returned by /api/audit after Stripe confirms payment.
//
// Previously vercel.json rewrote /api/analyze straight to the external scorer,
// which meant the full report (every failing check + action plan) was sent to
// the browser and readable in DevTools. This proxy stops that leak.

export const config = { runtime: 'edge' };

const SCORER_URL =
  process.env.SCORER_URL || 'https://scorecard.foundforai.com/api/analyze';
const TIMEOUT_MS = 25_000;

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
interface ScorerResult {
  url?: string;
  overallScore: number;
  grade: string;
  sections: ScorecardSection[];
  recommendations?: Array<{ priority: string; text: string }>;
  meta?: { schemasFound?: string[] };
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  });
}

// Strip the full scorer result down to the free teaser. Keeps category scores
// (so the visitor sees WHERE they're weak) but drops the per-check findings and
// the action plan (the WHAT and HOW — that's what they pay for).
export function toTeaser(full: ScorerResult) {
  const sections = (full.sections || []).map((s) => ({
    id: s.id,
    title: s.title,
    icon: s.icon,
    score: s.score,
    max: s.max,
  }));
  const issueCount = (full.sections || []).reduce(
    (n, s) => n + (s.checks || []).filter((c) => !c.passed).length,
    0
  );
  return {
    url: full.url,
    overallScore: full.overallScore,
    grade: full.grade,
    sections,
    issueCount,
    meta: { schemasFound: full.meta?.schemasFound || [] },
    locked: true as const,
  };
}

// Shared by /api/audit too — calls the external scorer server-side.
export async function runScorer(body: {
  url: string;
  email?: string;
  keyword?: string;
}): Promise<ScorerResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(SCORER_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`scorer returned ${res.status}`);
    }
    return (await res.json()) as ScorerResult;
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'method not allowed' }, 405);
  }

  let body: { url?: string; email?: string; keyword?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid json body' }, 400);
  }

  const url = (body.url || '').trim();
  if (!url) {
    return json({ error: 'missing required url' }, 400);
  }

  try {
    const full = await runScorer({
      url,
      email: (body.email || '').trim() || undefined,
      keyword: (body.keyword || '').trim() || undefined,
    });
    return json(toTeaser(full));
  } catch (err) {
    const message =
      err instanceof Error && err.name === 'AbortError'
        ? 'the scan timed out'
        : 'could not reach the scoring service';
    return json({ error: message }, 502);
  }
}
