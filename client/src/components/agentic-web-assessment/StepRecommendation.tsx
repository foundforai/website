import { useState } from 'react';
import { Link } from 'wouter';
import { Check, Copy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BOOK_CALL_URL, type AssessmentResult } from '@/lib/agentic-web-assessment';

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
      await navigator.clipboard.writeText(result.summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // The plain-text block below stays selectable if clipboard is blocked.
    }
  }

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div
              className="shrink-0 w-28 h-28 rounded-full border-4 border-primary/20 bg-primary/5 flex flex-col items-center justify-center mx-auto sm:mx-0"
              aria-label={`Readiness score ${result.score} out of 100`}
            >
              <span
                className="text-4xl font-bold tabular-nums leading-none"
                style={{ color: '#0F5FDB' }}
                data-testid="readiness-score"
              >
                {result.score}
              </span>
              <span className="text-xs text-muted-foreground mt-1">of 100</span>
            </div>
            <div className="text-center sm:text-left min-w-0">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-primary mb-2">
                Readiness
              </p>
              <h3 className="text-2xl font-bold mb-2" data-testid="readiness-label">
                {result.label}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Readiness answers contribute up to 80 points. Selected actions add
                opportunity points. The total never exceeds 100.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <p className="text-xs font-semibold tracking-[0.16em] uppercase text-primary mb-2">
          Recommended package
        </p>
        <h3 className="text-2xl md:text-3xl font-bold mb-2" data-testid="package-name">
          {result.package.name}
        </h3>
        <p className="text-muted-foreground leading-relaxed" data-testid="package-explanation">
          {result.package.explanation}
        </p>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoTile label="Website" value={result.websiteDisplay} testId="result-website" />
        <InfoTile label="Business type" value={result.businessTypeLabel} testId="result-type" />
        <InfoTile
          label="First-release timeline"
          value={result.package.timeline}
          testId="result-timeline"
        />
        <InfoTile
          label="Selected AI actions"
          value={result.actionLabels.join(', ')}
          testId="result-actions"
        />
      </dl>

      <section>
        <h3 className="text-lg font-bold mb-3">Recommended scope</h3>
        <ul className="space-y-2">
          {result.package.scope.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed">
              <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-3">Implementation path</h3>
        <ol className="space-y-3">
          {result.package.steps.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span
                className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary text-xs font-bold tabular-nums"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed pt-1">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-2">Discovery focus</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          These are planning items, not failures. Anything marked Not sure or No
          becomes a conversation we resolve before tools go live.
        </p>
        {result.discovery.length === 0 ? (
          <p className="text-sm leading-relaxed rounded-xl border border-card-border bg-card p-4">
            Nothing flagged — every readiness answer was Yes. We will still confirm
            details on a kickoff call.
          </p>
        ) : (
          <ul className="space-y-3">
            {result.discovery.map((item) => (
              <li
                key={item.questionId}
                className="rounded-xl border border-card-border bg-card p-4"
                data-testid={`discovery-${item.questionId}`}
              >
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

      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold">Copyable sales summary</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopy}
            data-testid="button-copy-summary"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1.5" /> Copy summary
              </>
            )}
          </Button>
        </div>
        <pre
          className="text-xs md:text-sm bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed border max-h-[420px] overflow-y-auto"
          data-testid="sales-summary"
        >
          {result.summary}
        </pre>
      </section>

      <div className="p-6 sm:p-8 bg-muted/50 border rounded-xl">
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          This recommendation is still only on your device. If you want to walk
          through scope and timing, booking a call is a contact action you choose —
          it is not an automatic submit.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={BOOK_CALL_URL}
            className="inline-flex items-center justify-center min-h-10 px-8 font-semibold rounded-md text-white hover:opacity-90 transition-opacity motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={{ backgroundColor: '#0F5FDB' }}
            data-testid="link-book-call"
          >
            Book a 15-minute call
          </a>
          <Link href="/services">
            <Button variant="outline" className="w-full sm:w-auto font-semibold" data-testid="link-services">
              Review services
            </Button>
          </Link>
        </div>
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

function InfoTile({
  label,
  value,
  testId,
}: {
  label: string;
  value: string;
  testId: string;
}) {
  return (
    <div className="rounded-xl border border-card-border bg-card p-4">
      <dt className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1">
        {label}
      </dt>
      <dd className="font-semibold leading-snug break-words" data-testid={testId}>
        {value}
      </dd>
    </div>
  );
}
