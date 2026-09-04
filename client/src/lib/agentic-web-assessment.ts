/**
 * Agentic Web Assessment — scoring, package selection, and action-plan
 * helpers. Pure client-side logic; nothing here talks to a network.
 *
 * This file recommends an MCP / WebMCP *implementation package*.
 * It is not an MCP server.
 */

export type ActionId =
  | 'answers'
  | 'book'
  | 'leads'
  | 'quotes'
  | 'status'
  | 'payment';

export type ReadinessValue = 'yes' | 'not_sure' | 'no';

export type ReadinessId =
  | 'contentCurrent'
  | 'ownerApproves'
  | 'digitalTools'
  | 'systemAccess'
  | 'humanHandoff';

export type PackageId = 'foundation' | 'conversion' | 'operations';

export type ReadinessLabel = 'Strong starting point' | 'Ready to map' | 'Foundation first';

export interface BusinessTypeOption {
  value: string;
  label: string;
}

export interface ActionOption {
  id: ActionId;
  label: string;
  description: string;
  /** Conversion-style actions (booking, lead capture). */
  kind: 'foundation' | 'conversion' | 'complex';
}

export interface ReadinessQuestion {
  id: ReadinessId;
  prompt: string;
  hint: string;
  discoveryNotSure: string;
  discoveryNo: string;
}

export interface PackageDefinition {
  id: PackageId;
  name: string;
  timeline: string;
  explanation: string;
  scope: string[];
  steps: string[];
}

export interface AssessmentInput {
  website: string;
  businessType: string;
  actions: ActionId[];
  readiness: Record<ReadinessId, ReadinessValue>;
}

export interface DiscoveryItem {
  questionId: ReadinessId;
  prompt: string;
  answer: Exclude<ReadinessValue, 'yes'>;
  guidance: string;
}

export interface AssessmentResult {
  readinessPoints: number;
  opportunityPoints: number;
  score: number;
  label: ReadinessLabel;
  scoreExplanation: string;
  packageId: PackageId;
  package: PackageDefinition;
  websiteDisplay: string;
  businessTypeLabel: string;
  actionLabels: string[];
  discovery: DiscoveryItem[];
  actionPlan: string;
}

export const BOOK_CALL_URL = 'https://foundforai.com/book-call';

export const BUSINESS_TYPES: BusinessTypeOption[] = [
  { value: 'home-services', label: 'Home services & trades' },
  { value: 'healthcare', label: 'Healthcare, dental & wellness' },
  { value: 'professional', label: 'Professional services' },
  { value: 'beauty', label: 'Beauty, salon & spa' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'real-estate', label: 'Real estate' },
  { value: 'hospitality', label: 'Restaurant & hospitality' },
  { value: 'retail', label: 'Retail' },
  { value: 'b2b', label: 'B2B & consulting' },
  { value: 'other', label: 'Other' },
];

export const ACTIONS: ActionOption[] = [
  {
    id: 'answers',
    label: 'Answer customer questions',
    description:
      'Give AI a trusted source for hours, services, policies, and FAQs.',
    kind: 'foundation',
  },
  {
    id: 'book',
    label: 'Book appointments',
    description:
      'Let agents check availability and request or confirm a visit.',
    kind: 'conversion',
  },
  {
    id: 'leads',
    label: 'Capture and qualify leads',
    description: 'Collect the right details and route serious inquiries.',
    kind: 'conversion',
  },
  {
    id: 'quotes',
    label: 'Create estimates or quotes',
    description: 'Use approved pricing rules to draft an estimate.',
    kind: 'complex',
  },
  {
    id: 'status',
    label: 'Check order or request status',
    description: 'Look up a job, order, or ticket without the phone tag.',
    kind: 'complex',
  },
  {
    id: 'payment',
    label: 'Start a secure payment or checkout handoff',
    description: 'Begin checkout or send a payment link with guardrails.',
    kind: 'complex',
  },
];

export const READINESS_QUESTIONS: ReadinessQuestion[] = [
  {
    id: 'contentCurrent',
    prompt: 'Website content is current and reliable',
    hint: 'Hours, services, pricing cues, and policies match how you actually operate.',
    discoveryNotSure:
      'We will review live pages together and flag anything that should be locked before an agent quotes it.',
    discoveryNo:
      'We will treat content cleanup as a first-week discovery item so the agent only uses approved facts.',
  },
  {
    id: 'ownerApproves',
    prompt: 'Someone owns and approves customer-facing information',
    hint: 'A named person can sign off on what an agent is allowed to say.',
    discoveryNotSure:
      'We will identify an approver during discovery so answers have a clear owner.',
    discoveryNo:
      'We will help you name an owner and a lightweight approval path before anything customer-facing goes live.',
  },
  {
    id: 'digitalTools',
    prompt: 'Digital tools exist for the requested actions',
    hint: 'Calendar, CRM, quoting, status, or payment tools already handle the work today.',
    discoveryNotSure:
      'We will map the tools you already use and note any gaps before we design agent workflows.',
    discoveryNo:
      'We will scope a workable first action using the systems you do have — or a simple intake path — rather than forcing a full stack rewrite.',
  },
  {
    id: 'systemAccess',
    prompt: 'Website and business-system access is available',
    hint: 'We can reach the site, CMS, and the tools those actions depend on.',
    discoveryNotSure:
      'We will confirm access paths during kickoff so implementation is not blocked mid-build.',
    discoveryNo:
      'We will start with a discovery checklist for access and credentials so the first release has a clear runway.',
  },
  {
    id: 'humanHandoff',
    prompt: 'A human handoff process is defined',
    hint: 'When an agent should stop, a person knows how to pick up the conversation.',
    discoveryNotSure:
      'We will design a simple escalation path so uncertain or high-stakes requests reach a person.',
    discoveryNo:
      'We will define a human handoff as part of the first release — agents should never dead-end a customer.',
  },
];

export const DEFAULT_READINESS: Record<ReadinessId, ReadinessValue> = {
  contentCurrent: 'not_sure',
  ownerApproves: 'not_sure',
  digitalTools: 'not_sure',
  systemAccess: 'not_sure',
  humanHandoff: 'not_sure',
};

export const PACKAGES: Record<PackageId, PackageDefinition> = {
  foundation: {
    id: 'foundation',
    name: 'Agentic Answers Foundation',
    timeline: '2–3 weeks',
    explanation:
      'You want AI to answer from approved business knowledge — without booking, quoting, or taking payments yet. This package stands up a trusted MCP / WebMCP discovery layer with clear answer boundaries and a human escalation path.',
    scope: [
      'Structured, approved business knowledge the agent is allowed to use',
      'MCP / WebMCP discovery endpoint so assistants can find and query that knowledge',
      'Answer boundaries and human escalation for questions the agent should not handle',
      'Analytics for unanswered and high-intent questions',
    ],
    steps: [
      'Inventory and approve the knowledge AI should use on your site.',
      'Stand up an MCP / WebMCP discovery endpoint with explicit answer boundaries.',
      'Define human escalation for questions the agent should not answer.',
      'Instrument unanswered and high-intent questions so the next release is informed.',
    ],
  },
  conversion: {
    id: 'conversion',
    name: 'Agentic Conversion',
    timeline: '3–5 weeks',
    explanation:
      'You want answers plus one or two focused conversion actions — typically booking or lead capture. This package adds a guarded MCP / WebMCP tool for that workflow, with validation, handoff, and outcome measurement.',
    scope: [
      'Approved knowledge and a trusted answer layer',
      'One primary customer-action workflow (booking or lead capture)',
      'MCP / WebMCP tools with validation and guardrails',
      'Human handoff, event logging, and outcome measurement',
    ],
    steps: [
      'Approve knowledge and ship the answer layer agents will rely on.',
      'Design the primary customer-action workflow around booking or lead capture.',
      'Connect MCP / WebMCP tools with validation and guardrails.',
      'Add human handoff, event logging, and outcome measurement.',
    ],
  },
  operations: {
    id: 'operations',
    name: 'Agentic Operations',
    timeline: '5–8 weeks',
    explanation:
      'You selected a more complex action — quotes, status lookups, or payment — or several actions at once. This package maps the journey and systems first, then phases MCP / WebMCP tools behind permission boundaries, approval gates, and observability.',
    scope: [
      'Customer-journey and system-architecture map for the selected actions',
      'Trusted answer layer with permission boundaries',
      'Phased MCP / WebMCP tools for the actions you selected',
      'Approval gates, fallbacks, observability, and measurement',
    ],
    steps: [
      'Map the customer journey and the systems each selected action depends on.',
      'Build a trusted answer layer with permission boundaries.',
      'Phase in MCP / WebMCP tools for the selected actions, with approval gates and fallbacks.',
      'Add observability and measurement across the full journey.',
    ],
  },
};

const READINESS_POINTS: Record<ReadinessValue, number> = {
  yes: 16,
  not_sure: 8,
  no: 2,
};

const POINTS_PER_ACTION = 4;
const MAX_SCORE = 100;

const COMPLEX_ACTIONS = new Set<ActionId>(['quotes', 'status', 'payment']);
const CONVERSION_ACTIONS = new Set<ActionId>(['book', 'leads']);

export function normalizeWebsite(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function isValidWebsite(input: string): boolean {
  const normalized = normalizeWebsite(input);
  if (!normalized) return false;
  try {
    const url = new URL(normalized);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    const host = url.hostname.toLowerCase();
    if (!host.includes('.') || host.startsWith('.') || host.endsWith('.')) return false;
    if (/\s/.test(host)) return false;
    return true;
  } catch {
    return false;
  }
}

export function businessTypeLabel(value: string): string {
  return BUSINESS_TYPES.find((t) => t.value === value)?.label ?? '';
}

export function actionById(id: ActionId): ActionOption {
  const found = ACTIONS.find((a) => a.id === id);
  if (!found) {
    throw new Error(`Unknown action id: ${id}`);
  }
  return found;
}

/**
 * Package selection (first matching rule wins):
 *
 * 1. Any quotes / status / payment action → Operations.
 * 2. 3+ selected actions, unless they are exactly "answers" plus 1–2
 *    conversion-style actions (book, leads) and nothing else → Operations.
 * 3. Only "Answer customer questions" → Foundation.
 * 4. Conversion-style actions (book, leads), with or without answers → Conversion.
 *    Answers are treated as often foundational, but intent wins: book/leads
 *    without answers still recommend Conversion.
 * 5. Fallback → Operations.
 *
 * Examples:
 *   [answers]                        → Foundation
 *   [answers, book]                  → Conversion
 *   [answers, book, leads]           → Conversion (answers + two conversion)
 *   [book] or [leads] or [book, leads] → Conversion
 *   [answers, quotes]                → Operations
 *   [payment] or [status]            → Operations
 *   [answers, book, leads, status]   → Operations
 */
export function recommendPackage(actions: ActionId[]): PackageId {
  const unique = uniqueActions(actions);
  const hasComplex = unique.some((id) => COMPLEX_ACTIONS.has(id));
  if (hasComplex) return 'operations';

  const conversionCount = unique.filter((id) => CONVERSION_ACTIONS.has(id)).length;
  const hasAnswers = unique.includes('answers');
  const onlyAnswersAndConversion = unique.every(
    (id) => id === 'answers' || CONVERSION_ACTIONS.has(id)
  );

  if (unique.length >= 3 && !(hasAnswers && conversionCount >= 1 && conversionCount <= 2 && onlyAnswersAndConversion)) {
    return 'operations';
  }

  if (unique.length === 1 && unique[0] === 'answers') return 'foundation';

  if (conversionCount >= 1) return 'conversion';

  return 'operations';
}

export function readinessPoints(readiness: Record<ReadinessId, ReadinessValue>): number {
  return READINESS_QUESTIONS.reduce(
    (sum, q) => sum + READINESS_POINTS[readiness[q.id]],
    0
  );
}

export function opportunityPoints(actionCount: number): number {
  return Math.max(0, actionCount) * POINTS_PER_ACTION;
}

export function totalScore(readiness: number, opportunity: number): number {
  return Math.min(MAX_SCORE, readiness + opportunity);
}

export function scoreLabel(score: number): ReadinessLabel {
  if (score >= 82) return 'Strong starting point';
  if (score >= 62) return 'Ready to map';
  return 'Foundation first';
}

export function scoreExplanation(
  score: number,
  readinessPts: number,
  opportunityPts: number,
  actionCount: number
): string {
  const actionBit =
    actionCount === 1
      ? `The one action you selected adds ${opportunityPts} opportunity ${opportunityPts === 1 ? 'point' : 'points'}.`
      : `The ${actionCount} actions you selected add ${opportunityPts} opportunity points.`;
  const breakdown = `Your readiness answers contribute ${readinessPts} of 80 possible points. ${actionBit} Combined score: ${score} of 100.`;

  const meaning =
    score >= 82
      ? 'This range usually means the basics are in place, so a focused first release can start once a few details are confirmed.'
      : score >= 62
        ? 'This range is enough to start scoping. A short mapping pass will lock down systems, owners, and the first workflow.'
        : 'This range suggests starting with knowledge, owners, and access. That foundation work makes the first release safer and clearer.';

  return `${breakdown} ${meaning}`;
}

export function discoveryItems(
  readiness: Record<ReadinessId, ReadinessValue>
): DiscoveryItem[] {
  const items: DiscoveryItem[] = [];
  for (const q of READINESS_QUESTIONS) {
    const answer = readiness[q.id];
    if (answer === 'yes') continue;
    items.push({
      questionId: q.id,
      prompt: q.prompt,
      answer,
      guidance: answer === 'not_sure' ? q.discoveryNotSure : q.discoveryNo,
    });
  }
  return items;
}

function uniqueActions(actions: ActionId[]): ActionId[] {
  const seen = new Set<ActionId>();
  const out: ActionId[] = [];
  for (const id of actions) {
    if (!seen.has(id)) {
      seen.add(id);
      out.push(id);
    }
  }
  return out;
}

function displayWebsite(input: string): string {
  const normalized = normalizeWebsite(input);
  try {
    const url = new URL(normalized);
    return url.href.replace(/\/$/, '');
  } catch {
    return input.trim();
  }
}

export function buildActionPlan(result: Omit<AssessmentResult, 'actionPlan'>): string {
  const discoveryBlock =
    result.discovery.length === 0
      ? 'None flagged — every readiness answer was Yes. Still worth a quick confirmation before anything customer-facing goes live.'
      : result.discovery
          .map((d) => {
            const flag = d.answer === 'not_sure' ? 'Not sure yet' : 'Needs attention';
            return `- ${d.prompt} (${flag}): ${d.guidance}`;
          })
          .join('\n');

  const nextSteps = result.package.steps
    .map((step, i) => `${i + 1}. ${step}`)
    .join('\n');

  const scope = result.package.scope.map((item) => `- ${item}`).join('\n');
  const actions = result.actionLabels.map((label) => `- ${label}`).join('\n');

  return [
    'Agentic Web Action Plan',
    '',
    `Business website: ${result.websiteDisplay}`,
    `Business type: ${result.businessTypeLabel}`,
    '',
    'Selected AI actions',
    actions,
    '',
    'Readiness score',
    `${result.score} of 100 — ${result.label}`,
    result.scoreExplanation,
    '',
    'Recommended implementation package',
    result.package.name,
    result.package.explanation,
    '',
    `Expected timeline: ${result.package.timeline}`,
    '',
    'Proposed first-release scope',
    scope,
    '',
    'Discovery items',
    discoveryBlock,
    '',
    'Recommended next steps',
    nextSteps,
    '',
    '—',
    'Prepared from the Agentic Web Assessment on foundforai.com. This plan stays on your device unless you choose to share it.',
    '',
    `Optional: Discuss this plan with Found For AI — ${BOOK_CALL_URL}`,
  ].join('\n');
}

export function evaluateAssessment(input: AssessmentInput): AssessmentResult {
  const actions = uniqueActions(input.actions);
  const readyPts = readinessPoints(input.readiness);
  const oppPts = opportunityPoints(actions.length);
  const score = totalScore(readyPts, oppPts);
  const packageId = recommendPackage(actions);
  const pkg = PACKAGES[packageId];
  const actionLabels = actions.map((id) => actionById(id).label);

  const label = scoreLabel(score);
  const withoutPlan = {
    readinessPoints: readyPts,
    opportunityPoints: oppPts,
    score,
    label,
    scoreExplanation: scoreExplanation(score, readyPts, oppPts, actions.length),
    packageId,
    package: pkg,
    websiteDisplay: displayWebsite(input.website),
    businessTypeLabel: businessTypeLabel(input.businessType) || input.businessType,
    actionLabels,
    discovery: discoveryItems(input.readiness),
  };

  return {
    ...withoutPlan,
    actionPlan: buildActionPlan(withoutPlan),
  };
}

export function emptyAssessment(): AssessmentInput {
  return {
    website: '',
    businessType: '',
    actions: [],
    readiness: { ...DEFAULT_READINESS },
  };
}

export interface Step1Errors {
  website?: string;
  businessType?: string;
  actions?: string;
}

export function validateStep1(input: Pick<AssessmentInput, 'website' | 'businessType' | 'actions'>): Step1Errors {
  const errors: Step1Errors = {};
  if (!input.website.trim()) {
    errors.website = 'Enter your business website.';
  } else if (!isValidWebsite(input.website)) {
    errors.website = 'Enter a valid website, such as example.com or https://example.com.';
  }
  if (!input.businessType) {
    errors.businessType = 'Select a business type.';
  }
  if (input.actions.length < 1) {
    errors.actions = 'Select at least one thing you want AI agents to do.';
  }
  return errors;
}
