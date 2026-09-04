import {
  CalendarCheck,
  CreditCard,
  FileSpreadsheet,
  MessageCircleQuestion,
  Search,
  UserPlus,
  Check,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ACTIONS,
  BUSINESS_TYPES,
  type ActionId,
  type Step1Errors,
} from '@/lib/agentic-web-assessment';

const ACTION_ICONS: Record<ActionId, LucideIcon> = {
  answers: MessageCircleQuestion,
  book: CalendarCheck,
  leads: UserPlus,
  quotes: FileSpreadsheet,
  status: Search,
  payment: CreditCard,
};

interface StepOpportunityProps {
  website: string;
  businessType: string;
  actions: ActionId[];
  errors: Step1Errors;
  onWebsiteChange: (value: string) => void;
  onBusinessTypeChange: (value: string) => void;
  onToggleAction: (id: ActionId) => void;
  onContinue: () => void;
}

export default function StepOpportunity({
  website,
  businessType,
  actions,
  errors,
  onWebsiteChange,
  onBusinessTypeChange,
  onToggleAction,
  onContinue,
}: StepOpportunityProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onContinue();
      }}
      noValidate
      className="space-y-8"
    >
      <div className="space-y-2">
        <Label htmlFor="awa-website">Business website</Label>
        <Input
          id="awa-website"
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder="https://yourbusiness.com"
          value={website}
          onChange={(e) => onWebsiteChange(e.target.value)}
          aria-invalid={errors.website ? true : undefined}
          aria-describedby={errors.website ? 'awa-website-error' : 'awa-website-hint'}
          data-testid="input-website"
        />
        <p id="awa-website-hint" className="text-xs text-muted-foreground">
          Include the site you want agents to use as the source of truth.
        </p>
        {errors.website ? (
          <p id="awa-website-error" className="text-sm text-destructive" role="alert">
            {errors.website}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="awa-business-type">Business type</Label>
        <Select value={businessType || undefined} onValueChange={onBusinessTypeChange}>
          <SelectTrigger
            id="awa-business-type"
            aria-invalid={errors.businessType ? true : undefined}
            aria-describedby={errors.businessType ? 'awa-type-error' : undefined}
            data-testid="select-business-type"
          >
            <SelectValue placeholder="Select the closest fit" />
          </SelectTrigger>
          <SelectContent>
            {BUSINESS_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value} data-testid={`option-type-${t.value}`}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.businessType ? (
          <p id="awa-type-error" className="text-sm text-destructive" role="alert">
            {errors.businessType}
          </p>
        ) : null}
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium leading-none mb-1">
          What should AI agents accomplish?
        </legend>
        <p id="awa-actions-hint" className="text-xs text-muted-foreground">
          Select every action that matters. You can start with one and add more later.
        </p>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          role="group"
          aria-describedby={errors.actions ? 'awa-actions-error awa-actions-hint' : 'awa-actions-hint'}
        >
          {ACTIONS.map((action) => {
            const selected = actions.includes(action.id);
            const Icon = ACTION_ICONS[action.id];
            return (
              <button
                key={action.id}
                type="button"
                onClick={() => onToggleAction(action.id)}
                aria-pressed={selected}
                data-testid={`action-${action.id}`}
                className={`text-left rounded-xl border p-4 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  selected
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-card-border bg-card hover:border-primary/40'
                }`}
              >
                <span className="flex items-start gap-3">
                  <span
                    className={`shrink-0 rounded-lg p-2 ${
                      selected ? 'bg-primary/10' : 'bg-muted'
                    }`}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" style={{ color: '#0F5FDB' }} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-2">
                      <span className="font-semibold leading-snug">{action.label}</span>
                      <span
                        className={`shrink-0 mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md border ${
                          selected
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'border-input bg-background'
                        }`}
                        aria-hidden="true"
                      >
                        {selected ? <Check className="h-3.5 w-3.5" /> : null}
                      </span>
                    </span>
                    <span className="block text-sm text-muted-foreground mt-1 leading-relaxed">
                      {action.description}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        {errors.actions ? (
          <p id="awa-actions-error" className="text-sm text-destructive" role="alert">
            {errors.actions}
          </p>
        ) : null}
      </fieldset>

      <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
        <Button
          type="submit"
          size="lg"
          className="font-semibold"
          style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
          data-testid="button-continue-opportunity"
        >
          Continue to readiness
        </Button>
      </div>
    </form>
  );
}
