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
      className="space-y-6"
    >
      <p className="text-sm text-muted-foreground leading-relaxed">
        Each question defaults to <strong>Not sure</strong>. Uncertainty becomes a
        discovery item — not an automatic blocker — when we recommend a package.
      </p>

      <ol className="space-y-4">
        {READINESS_QUESTIONS.map((q, index) => (
          <li
            key={q.id}
            className="rounded-xl border border-card-border bg-card p-4 sm:p-5"
          >
            <fieldset>
              <legend className="font-semibold leading-snug mb-1">
                <span className="text-primary mr-2 tabular-nums">{index + 1}.</span>
                {q.prompt}
              </legend>
              <p id={`${q.id}-hint`} className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {q.hint}
              </p>
              <RadioGroup
                value={readiness[q.id]}
                onValueChange={(v) => onChange(q.id, v as ReadinessValue)}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2"
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
                        className={`flex items-center justify-center min-h-11 px-3 rounded-lg border text-sm font-semibold cursor-pointer transition-colors motion-reduce:transition-none focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 ${
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
          See recommendation
        </Button>
      </div>
    </form>
  );
}
