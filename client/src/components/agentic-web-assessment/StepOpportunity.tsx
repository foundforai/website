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
import { Label } from '@/components/ui/label';
import {
  ACTIONS,
  BUSINESS_TYPES,
  stripWebsiteProtocol,
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
      className="space-y-7"
    >
      <p className="text-sm text-muted-foreground leading-relaxed">
        We will use this to scope the right actions, not force a generic chatbot.
      </p>

      <div className="grid grid-cols-1 gap-5">
        <div className="space-y-2">
          <Label htmlFor="awa-website">Business website</Label>
          <div
            className={`flex items-stretch rounded-md border bg-background overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${
              errors.website ? 'border-destructive' : 'border-input'
            }`}
          >
            <span
              className="shrink-0 inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border-r border-input"
              aria-hidden="true"
            >
              https://
            </span>
            <input
              id="awa-website"
              type="text"
              inputMode="url"
              autoComplete="url"
              required
              aria-required="true"
              placeholder="yourbusiness.com"
              value={stripWebsiteProtocol(website)}
              onChange={(e) => onWebsiteChange(stripWebsiteProtocol(e.target.value))}
              aria-invalid={errors.website ? true : undefined}
              aria-describedby={errors.website ? 'awa-website-error' : 'awa-website-hint'}
              data-testid="input-website"
              className="flex h-11 w-full bg-transparent px-3 text-base outline-none placeholder:text-muted-foreground md:text-sm"
            />
          </div>
          <p id="awa-website-hint" className="text-xs text-muted-foreground">
            The site you want agents to use as the source of truth.
          </p>
          {errors.website ? (
            <p id="awa-website-error" className="text-sm text-destructive" role="alert">
              {errors.website}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="awa-business-type">Business type</Label>
          <select
            id="awa-business-type"
            value={businessType}
            onChange={(e) => onBusinessTypeChange(e.target.value)}
            required
            aria-required="true"
            aria-invalid={errors.businessType ? true : undefined}
            aria-describedby={errors.businessType ? 'awa-type-error' : undefined}
            data-testid="select-business-type"
            className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            <option value="">Choose the closest fit</option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t.value} value={t.value} data-testid={`option-type-${t.value}`}>
                {t.label}
              </option>
            ))}
          </select>
          {errors.businessType ? (
            <p id="awa-type-error" className="text-sm text-destructive" role="alert">
              {errors.businessType}
            </p>
          ) : null}
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium leading-none mb-1">
          What should AI be able to do?
        </legend>
        <p id="awa-actions-hint" className="text-xs text-muted-foreground">
          Select every action that matters.
        </p>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
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
                className={`text-left rounded-xl border p-3.5 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  selected
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-card-border bg-card hover:border-primary/40'
                }`}
              >
                <span className="flex items-start gap-3">
                  <span
                    className={`shrink-0 rounded-lg p-2 ${selected ? 'bg-primary/10' : 'bg-muted'}`}
                    aria-hidden="true"
                  >
                    <Icon className="h-4 w-4" style={{ color: '#0F5FDB' }} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-sm leading-snug">{action.tileLabel}</span>
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
                    <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">
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
          Assess my readiness
        </Button>
      </div>
    </form>
  );
}
