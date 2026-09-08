import type { ReactNode } from 'react';

const STEP_META = [
  { n: 1 as const, code: '01', title: 'Your opportunity', hint: 'Start with the business' },
  { n: 2 as const, code: '02', title: 'Readiness', hint: 'Quick readiness check' },
  { n: 3 as const, code: '03', title: 'Recommendation', hint: '' },
];

interface AssessmentProgressProps {
  step: 1 | 2 | 3;
}

export function AssessmentProgress({ step }: AssessmentProgressProps) {
  const current = STEP_META[step - 1];
  return (
    <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] uppercase text-primary">
      <span className="hidden sm:inline-block w-8 h-px bg-primary" aria-hidden="true" />
      <p>
        <span>Agentic web readiness</span>
        <span className="sr-only">, step </span>
        <span className="ml-3 text-muted-foreground font-medium tracking-[0.12em]">
          {current.code}-03
        </span>
      </p>
    </div>
  );
}

interface StepCardHeaderProps {
  n: 1 | 2 | 3;
  active: boolean;
  complete: boolean;
  onSelect?: () => void;
}

export function StepCardHeader({ n, active, complete, onSelect }: StepCardHeaderProps) {
  const meta = STEP_META[n - 1];
  const label = meta.hint ? `${meta.title}: ${meta.hint}` : meta.title;
  const className = `w-full flex items-center gap-3 text-left rounded-lg p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
    onSelect ? 'cursor-pointer' : 'cursor-default'
  }`;

  const inner = (
    <>
      <span
        className={`shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg border text-xs font-bold tabular-nums ${
          active || complete
            ? 'border-primary/40 text-primary bg-primary/5'
            : 'border-border text-muted-foreground bg-muted'
        }`}
        aria-hidden="true"
      >
        {meta.code}
      </span>
      <span className="min-w-0">
        <span className="sr-only">
          {active ? 'Current step: ' : complete ? 'Completed: ' : 'Upcoming: '}
        </span>
        <span className={`block text-sm font-bold ${active || complete ? 'text-foreground' : 'text-muted-foreground'}`}>
          {label}
        </span>
      </span>
    </>
  );

  if (onSelect) {
    return (
      <button type="button" onClick={onSelect} className={className} aria-current={active ? 'step' : undefined}>
        {inner}
      </button>
    );
  }

  return (
    <div className={className} aria-current={active ? 'step' : undefined}>
      {inner}
    </div>
  );
}

interface StepCardProps {
  n: 1 | 2 | 3;
  step: 1 | 2 | 3;
  onGoTo?: (step: 1 | 2) => void;
  children?: ReactNode;
}

export function StepCard({ n, step, onGoTo, children }: StepCardProps) {
  const active = step === n;
  const complete = step > n;
  const goable = complete && (n === 1 || n === 2) && onGoTo;

  return (
    <section
      className={`rounded-xl border ${
        active ? 'border-card-border bg-card shadow-sm' : 'border-transparent bg-muted/40'
      }`}
    >
      <div className={active ? 'p-4 sm:p-5 pb-0' : 'p-4 sm:p-5'}>
        <StepCardHeader
          n={n}
          active={active}
          complete={complete}
          onSelect={goable ? () => onGoTo?.(n as 1 | 2) : undefined}
        />
      </div>
      {active ? <div className="p-4 sm:p-6 pt-4">{children}</div> : null}
    </section>
  );
}
