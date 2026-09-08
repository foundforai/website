import { useState } from 'react';
import { Link } from 'wouter';
import { Check, ChevronDown, Copy, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type AssessmentResult, type PackageId } from '@/lib/agentic-web-assessment';

const FIRST_RELEASE_TEASER: Record<PackageId, string> = {
  foundation:
    'The first release stands up a trusted answer layer from approved business knowledge, with clear boundaries and a human handoff.',
  conversion:
    'The first release pairs approved answers with one primary booking or lead-capture workflow.',
  operations:
    'The first release maps the customer journey and phases in the more complex tools you selected.',
};

const CLOSING_PATH = [
  { code: '01', title: 'Discover', detail: 'Map the customer journey and tools' },
  { code: '02', title: 'Connect', detail: 'Add a secure MCP/WebMCP action layer' },
  { code: '03', title: 'Prove', detail: 'Test guardrails and measure outcomes' },
] as const;

interface StepRecommendationProps {
  result: AssessmentResult;
  onBack: () => void;
  onRestart: () => void;
}

export default function StepRecommendation({
  result,
  onBack,
  onRestart,
}: StepRecommendationProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(result.actionPlan);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // The plain-text block below stays selectable if clipboard is blocked.
    }
  }

  function handleDownload() {
    const blob = new Blob([result.actionPlan], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'agentic-web-action-plan.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div
          className="shrink-0 w-32 h-32 rounded-full border-4 border-primary/20 bg-primary/5 flex flex-col items-center justify-center mx-auto sm:mx-0"
          aria-label={`Readiness score ${result.score} out of 100`}
        >
          <span
            className="text-5xl font-bold tabular-nums leading-none"
            style={{ color: '#0F5FDB' }}
            data-testid="readiness-score"
          >
            {result.score}
          </span>
          <span className="text-xs text-muted-foreground mt-1">/100</span>
        </div>
        <div className="text-center sm:text-left min-w-0">
          <p
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-3"
            data-testid="readiness-label"
          >
            {result.label}
          </p>
          <h3 className="text-2xl md:text-3xl font-bold mb-2" data-testid="package-name">
            {result.package.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed" data-testid="package-explanation">
            {result.package.explanation}
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden border border-border">
        <MetaCell label="Website" value={result.websiteDisplay} testId="result-website" />
        <MetaCell label="Business" value={result.businessTypeLabel} testId="result-type" />
        <MetaCell label="First release" value={result.package.timeline} testId="result-timeline" />
      </dl>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="rounded-xl border border-card-border bg-card p-5">
          <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-3">
            Recommended scope
          </h3>
          <ul className="space-y-2">
            {result.package.scope.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed">
                <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border border-card-border bg-card p-5">
          <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-3">
            Implementation path
          </h3>
          <ol className="space-y-3">
            {result.package.steps.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span
                  className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold tabular-nums"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <p className="sr-only" data-testid="result-actions">
        {result.actionLabels.join(', ')}
      </p>

      <section className="rounded-xl border border-card-border bg-card p-5">
        <h3 className="text-lg font-bold mb-2">Discovery focus</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          These are planning items, not failures. Anything marked Not sure or No
          becomes a conversation we resolve before tools go live.
        </p>
        {result.discovery.length === 0 ? (
          <p className="text-sm leading-relaxed">
            Nothing flagged. Every readiness answer was Yes. We will still confirm
            details on a kickoff call.
          </p>
        ) : (
          <ul className="space-y-3">
            {result.discovery.map((item) => (
              <li key={item.questionId} data-testid={`discovery-${item.questionId}`}>
                <p className="font-semibold text-sm mb-1">
                  {item.prompt}{' '}
                  <span className="font-medium text-muted-foreground">
                    ({item.answer === 'not_sure' ? 'Not sure' : 'Needs work'})
                  </span>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.guidance}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl border border-card-border bg-card p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-2">
          First release
        </p>
        <p className="text-xl font-bold mb-2" data-testid="teaser-timeline">
          {result.package.timeline}
        </p>
        <p className="text-base leading-relaxed mb-3" data-testid="teaser-sentence">
          {FIRST_RELEASE_TEASER[result.packageId]}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Scope, discovery items, and next steps are ready to walk through on a call.
        </p>

        <Link href="/book-call">
          <Button
            size="lg"
            className="w-full sm:w-auto font-semibold min-h-12 px-8 text-base"
            style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
            data-testid="link-book-call"
          >
            Book an appointment
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-xl">
          Walk through this plan with Found For AI. About 30 minutes. Nothing is
          submitted from this assessment.
        </p>

        <div className="mt-6 pt-5 border-t border-border space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
              aria-label="Copy my assessment"
              data-testid="button-copy-assessment"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1.5" /> Copy my assessment
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownload}
              aria-label="Save my action plan"
              data-testid="button-save-action-plan"
            >
              <Download className="h-4 w-4 mr-1.5" /> Save my action plan
            </Button>
          </div>

          <details className="group rounded-lg border border-border bg-muted/40">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg [&::-webkit-details-marker]:hidden">
              <span>View full action plan</span>
              <ChevronDown
                className="h-4 w-4 shrink-0 text-muted-foreground motion-reduce:transition-none transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <pre
              className="text-xs md:text-sm p-4 pt-0 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed max-h-[420px] overflow-y-auto"
              data-testid="action-plan"
            >
              {result.actionPlan}
            </pre>
          </details>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" aria-label="How the service works">
        {CLOSING_PATH.map((item) => (
          <div key={item.code} className="rounded-xl border border-card-border bg-card p-4">
            <p className="text-xs font-bold tabular-nums text-primary mb-1">{item.code}</p>
            <p className="font-bold">{item.title}</p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="font-semibold"
          onClick={onBack}
          data-testid="button-back-recommendation"
        >
          Back
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="font-semibold"
          onClick={onRestart}
          data-testid="button-restart"
        >
          <RotateCcw className="h-4 w-4" />
          Start another assessment
        </Button>
      </div>
    </div>
  );
}

function MetaCell({
  label,
  value,
  testId,
}: {
  label: string;
  value: string;
  testId: string;
}) {
  return (
    <div className="bg-card p-4">
      <dt className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1">
        {label}
      </dt>
      <dd className="font-semibold leading-snug break-words" data-testid={testId}>
        {value}
      </dd>
    </div>
  );
}
