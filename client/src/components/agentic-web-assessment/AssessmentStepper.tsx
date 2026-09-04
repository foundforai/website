import { Check } from 'lucide-react';

const STEPS = [
  { n: 1, label: 'Business opportunity' },
  { n: 2, label: 'Readiness' },
  { n: 3, label: 'Recommendation' },
] as const;

interface AssessmentStepperProps {
  step: 1 | 2 | 3;
  onGoTo?: (step: 1 | 2) => void;
  canGoToStep2: boolean;
}

export default function AssessmentStepper({
  step,
  onGoTo,
  canGoToStep2,
}: AssessmentStepperProps) {
  return (
    <ol className="grid grid-cols-3 gap-2 sm:gap-4" aria-label="Assessment progress">
      {STEPS.map((s) => {
        const complete = step > s.n;
        const current = step === s.n;
        const goable =
          (s.n === 1 && step > 1) || (s.n === 2 && canGoToStep2 && step === 3);

        const inner = (
          <>
            <StepMark n={s.n} complete={complete} current={current} />
            <span
              className={`text-xs sm:text-sm font-semibold leading-tight ${
                current || complete ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              <span className="sr-only">
                {current ? 'Current step: ' : complete ? 'Completed: ' : 'Upcoming: '}
              </span>
              {s.label}
            </span>
          </>
        );

        return (
          <li key={s.n} className="min-w-0">
            {goable && onGoTo && (s.n === 1 || s.n === 2) ? (
              <button
                type="button"
                onClick={() => onGoTo(s.n)}
                aria-current={current ? 'step' : undefined}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-2 w-full text-center sm:text-left rounded-lg p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {inner}
              </button>
            ) : (
              <div
                className="flex flex-col sm:flex-row items-center sm:items-start gap-2 p-1"
                aria-current={current ? 'step' : undefined}
              >
                {inner}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function StepMark({
  n,
  complete,
  current,
}: {
  n: number;
  complete: boolean;
  current: boolean;
}) {
  return (
    <span
      className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border-2 ${
        complete
          ? 'bg-primary text-primary-foreground border-primary'
          : current
            ? 'bg-primary/10 text-primary border-primary'
            : 'bg-muted text-muted-foreground border-transparent'
      }`}
      aria-hidden="true"
    >
      {complete ? <Check className="h-4 w-4" /> : n}
    </span>
  );
}
