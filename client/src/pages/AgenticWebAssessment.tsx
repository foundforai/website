import { useEffect, useMemo, useRef, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import AssessmentStepper from '@/components/agentic-web-assessment/AssessmentStepper';
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

  const stepTitle =
    step === 1
      ? 'Business opportunity'
      : step === 2
        ? 'Readiness assessment'
        : 'Your recommendation';

  return (
    <PageLayout
      title="Agentic Web Assessment — MCP / WebMCP Recommendation | Found For AI"
      description="A three-step configurator that recommends an MCP / WebMCP implementation package for your website. Answers stay in your browser until you choose a contact action."
      canonical={`${SITE}${PATH}`}
      schemas={schemas}
    >
      <section className="py-12 md:py-20 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4">
            Agentic web
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Agentic Web Assessment
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            Find the MCP / WebMCP implementation that fits your website — answers,
            booking, leads, quotes, status, or a payment handoff. Three short steps.
            This page recommends the service; it is not itself an MCP server.
          </p>
          <Alert className="bg-card">
            <AlertDescription>
              This assessment is <strong>not submitted</strong>. Your website, selections,
              and scores stay in this browser. Nothing is sent to Found For AI unless
              you later choose a contact action such as booking a call.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8">
            <AssessmentStepper
              step={step}
              canGoToStep2={Object.keys(validateStep1(draft)).length === 0}
              onGoTo={(s) => setStep(s)}
            />
          </div>

          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-2xl md:text-3xl font-bold mb-2 outline-none"
          >
            {stepTitle}
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {step === 1 &&
              'Tell us about the business and what you want AI agents to do.'}
            {step === 2 &&
              'A few readiness questions. If you are not sure, that is fine — we treat uncertainty as discovery, not a stop sign.'}
            {step === 3 &&
              'A package recommendation based only on what you entered on this page.'}
          </p>

          {step === 1 && (
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
          )}

          {step === 2 && (
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
          )}

          {step === 3 && result && (
            <StepRecommendation
              result={result}
              onBack={() => setStep(2)}
              onRestart={restart}
            />
          )}
        </div>
      </section>
    </PageLayout>
  );
}
