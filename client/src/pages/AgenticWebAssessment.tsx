import { useEffect, useMemo, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { AssessmentProgress, StepCard } from '@/components/agentic-web-assessment/AssessmentStepper';
import StepOpportunity from '@/components/agentic-web-assessment/StepOpportunity';
import StepReadiness from '@/components/agentic-web-assessment/StepReadiness';
import StepRecommendation from '@/components/agentic-web-assessment/StepRecommendation';
import { breadcrumbList } from '@/lib/breadcrumb';
import {
  emptyAssessment,
  evaluateAssessment,
  validateStep1,
  type ActionId,
  type AssessmentInput,
  type ReadinessId,
  type ReadinessValue,
  type Step1Errors,
} from '@/lib/agentic-web-assessment';

const SITE = 'https://foundforai.com';
const PATH = '/agentic-web-assessment';

const CHIPS = ['No technical prep', 'Tailored recommendation', 'No data submitted'] as const;

const schemas: object[] = [
  breadcrumbList([
    { name: 'Home', url: `${SITE}/` },
    { name: 'Agentic Web Assessment', url: `${SITE}${PATH}` },
  ]),
  {
    '@type': 'WebPage',
    '@id': `${SITE}${PATH}#webpage`,
    url: `${SITE}${PATH}`,
    name: 'Agentic Web Assessment',
    description:
      'Configure an MCP / WebMCP implementation for your website. Three short steps produce a tailored package recommendation. Answers stay in your browser until you choose a contact action.',
    isPartOf: { '@id': `${SITE}/#website` },
    publisher: { '@id': `${SITE}/#org` },
    about: ['MCP', 'WebMCP', 'agentic web', 'AI agents'],
    potentialAction: {
      '@type': 'Action',
      name: 'Run Agentic Web Assessment',
      target: `${SITE}${PATH}`,
    },
  },
];

type Step = 1 | 2 | 3;

export default function AgenticWebAssessment() {
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState<AssessmentInput>(() => emptyAssessment());
  const [errors, setErrors] = useState<Step1Errors>({});
  const headingRef = useRef<HTMLHeadingElement>(null);

  const result = useMemo(
    () => (step === 3 ? evaluateAssessment(draft) : null),
    [step, draft]
  );

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
  }, [step]);

  function toggleAction(id: ActionId) {
    setDraft((prev) => {
      const selected = prev.actions.includes(id);
      return {
        ...prev,
        actions: selected ? prev.actions.filter((a) => a !== id) : [...prev.actions, id],
      };
    });
    setErrors((prev) => ({ ...prev, actions: undefined }));
  }

  function goToStep2() {
    const nextErrors = validateStep1(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStep(2);
  }

  function restart() {
    setDraft(emptyAssessment());
    setErrors({});
    setStep(1);
  }

  const progressPct = (step / 3) * 100;
  const stepTitle =
    step === 1 ? 'Your opportunity' : step === 2 ? 'Readiness' : 'Recommendation';

  return (
    <PageLayout
      title="Agentic Web Assessment | MCP / WebMCP Recommendation | Found For AI"
      description="A three-step configurator that recommends an MCP / WebMCP implementation package for your website. Answers stay in your browser until you choose a contact action."
      canonical={`${SITE}${PATH}`}
      schemas={schemas}
    >
      <section className="py-10 md:py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <AssessmentProgress step={step} />

          <header className="mt-6 mb-10">
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-[1.05] outline-none"
            >
              Turn your website into an action layer.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-6">
              See what AI could safely answer, book, and capture for your business, and get a
              practical implementation plan in about three minutes.
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Assessment benefits">
              {CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground"
                >
                  <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {chip}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-3xl">
              This assessment is <strong>not submitted</strong>. Your website, selections, and
              scores stay in this browser. Nothing is sent to Found For AI unless you later
              choose a contact action such as booking a call.
            </p>
          </header>

          <div className="rounded-xl border border-card-border bg-card/80 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 sm:px-6 py-4 border-b border-border">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-primary">
                  Step {step} of 3
                </p>
                <p className="font-bold">{stepTitle}</p>
              </div>
              <div
                className="w-full sm:w-48 h-1.5 rounded-full bg-muted overflow-hidden"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={3}
                aria-valuenow={step}
                aria-label={`Step ${step} of 3`}
              >
                <span
                  className="block h-full bg-primary motion-reduce:transition-none transition-[width] duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-3">
              <StepCard n={1} step={step} onGoTo={(s) => setStep(s)}>
                <StepOpportunity
                  website={draft.website}
                  businessType={draft.businessType}
                  actions={draft.actions}
                  errors={errors}
                  onWebsiteChange={(website) => {
                    setDraft((prev) => ({ ...prev, website }));
                    setErrors((prev) => ({ ...prev, website: undefined }));
                  }}
                  onBusinessTypeChange={(businessType) => {
                    setDraft((prev) => ({ ...prev, businessType }));
                    setErrors((prev) => ({ ...prev, businessType: undefined }));
                  }}
                  onToggleAction={toggleAction}
                  onContinue={goToStep2}
                />
              </StepCard>

              <StepCard
                n={2}
                step={step}
                onGoTo={Object.keys(validateStep1(draft)).length === 0 ? (s) => setStep(s) : undefined}
              >
                <StepReadiness
                  readiness={draft.readiness}
                  onChange={(id: ReadinessId, value: ReadinessValue) =>
                    setDraft((prev) => ({
                      ...prev,
                      readiness: { ...prev.readiness, [id]: value },
                    }))
                  }
                  onBack={() => setStep(1)}
                  onContinue={() => setStep(3)}
                />
              </StepCard>

              <StepCard n={3} step={step}>
                {result ? (
                  <StepRecommendation
                    result={result}
                    onBack={() => setStep(2)}
                    onRestart={restart}
                  />
                ) : null}
              </StepCard>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
