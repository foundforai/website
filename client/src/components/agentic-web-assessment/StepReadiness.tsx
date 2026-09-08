import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  READINESS_QUESTIONS,
  type ReadinessId,
  type ReadinessValue,
} from '@/lib/agentic-web-assessment';

const CHOICES: Array<{ value: ReadinessValue; label: string }> = [
  { value: 'yes', label: 'Yes' },
  { value: 'not_sure', label: 'Not sure' },
  { value: 'no', label: 'No' },
];

interface StepReadinessProps {
  readiness: Record<ReadinessId, ReadinessValue>;
  onChange: (id: ReadinessId, value: ReadinessValue) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function StepReadiness({
  readiness,
  onChange,
  onBack,
  onContinue,
}: StepReadinessProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onContinue();
      }}
      className="space-y-5"
    >
      <p className="text-sm text-muted-foreground leading-relaxed">
        A best estimate is fine. <strong>Not sure</strong> becomes a discovery item, not a blocker.
      </p>

      <ol className="divide-y divide-border rounded-xl border border-card-border bg-card">
        {READINESS_QUESTIONS.map((q) => (
          <li key={q.id} className="p-4 sm:p-5">
            <fieldset className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-3 lg:gap-6 lg:items-center">
              <legend className="sr-only">{q.prompt}</legend>
              <div>
                <p className="font-semibold text-sm leading-snug" aria-hidden="true">
                  {q.prompt}
                </p>
                <p id={`${q.id}-hint`} className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {q.hint}
                </p>
              </div>
              <RadioGroup
                value={readiness[q.id]}
                onValueChange={(v) => onChange(q.id, v as ReadinessValue)}
                className="grid grid-cols-3 gap-1.5 min-w-0 sm:min-w-[280px]"
                aria-describedby={`${q.id}-hint`}
                data-testid={`readiness-${q.id}`}
              >
                {CHOICES.map((choice) => {
                  const itemId = `${q.id}-${choice.value}`;
                  const selected = readiness[q.id] === choice.value;
                  return (
                    <div key={choice.value}>
                      <RadioGroupItem
                        value={choice.value}
                        id={itemId}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={itemId}
                        className={`flex items-center justify-center min-h-9 px-2 rounded-md border text-xs font-semibold cursor-pointer transition-colors motion-reduce:transition-none focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 ${
                          selected
                            ? 'border-primary bg-primary/5 text-foreground'
                            : 'border-input bg-background text-muted-foreground hover:border-primary/40'
                        }`}
                      >
                        {choice.label}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </fieldset>
          </li>
        ))}
      </ol>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="font-semibold"
          onClick={onBack}
          data-testid="button-back-readiness"
        >
          Back
        </Button>
        <Button
          type="submit"
          size="lg"
          className="font-semibold"
          style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
          data-testid="button-see-recommendation"
        >
          Build my recommendation
        </Button>
      </div>
    </form>
  );
}
