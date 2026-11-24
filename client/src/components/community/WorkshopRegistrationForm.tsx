import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { HostBrand, PublicEvent } from '@/lib/community/types.ts';

type FieldErrors = Record<string, string>;

type Success = {
  alreadyRegistered?: boolean;
  workshopWithdrawUrl?: string;
  marketingWithdrawUrl?: string;
  email?: { sent: boolean; reason: string };
};

export default function WorkshopRegistrationForm({
  events,
  sourceBrand,
}: {
  events: PublicEvent[];
  sourceBrand: HostBrand;
}) {
  const openEvents = events.filter((event) => event.timing === 'upcoming' && event.registrationStatus === 'open');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState<Success | null>(null);
  const [loading, setLoading] = useState(false);

  if (openEvents.length === 0) return null;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    setFormError('');
    setSuccess(null);
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      businessName: String(form.get('businessName') || ''),
      businessCategory: String(form.get('businessCategory') || ''),
      workshopId: String(form.get('workshopId') || ''),
      learningGoals: String(form.get('learningGoals') || ''),
      workshopCommunicationConsent: form.get('workshopCommunicationConsent') === 'on',
      marketingConsent: form.get('marketingConsent') === 'on',
      companyWebsite: String(form.get('companyWebsite') || ''),
      sourceBrand,
    };
    try {
      const response = await fetch('/api/community/registrations', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as Success & { error?: string; fields?: FieldErrors };
      if (!response.ok) {
        setErrors(data.fields || {});
        setFormError(data.error || 'Please check the form and try again.');
        return;
      }
      setSuccess(data);
      formEl.reset();
    } catch {
      setFormError('The form could not be sent. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="register" onSubmit={onSubmit} className="mt-8 space-y-4 text-left" noValidate>
      <h3 className="text-2xl font-bold tracking-tight">Register</h3>
      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Company website
          <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <Label htmlFor="workshopId">Workshop</Label>
        <select
          id="workshopId"
          name="workshopId"
          defaultValue={openEvents[0]?.id}
          className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          {openEvents.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
        {errors.workshopId ? <p className="mt-1 text-sm text-red-700">{errors.workshopId}</p> : null}
      </div>
      <div>
        <Label htmlFor="reg-name">Name</Label>
        <Input id="reg-name" name="name" autoComplete="name" required className="mt-2" />
        {errors.name ? <p className="mt-1 text-sm text-red-700">{errors.name}</p> : null}
      </div>
      <div>
        <Label htmlFor="reg-email">Email</Label>
        <Input id="reg-email" name="email" type="email" autoComplete="email" required className="mt-2" />
        {errors.email ? <p className="mt-1 text-sm text-red-700">{errors.email}</p> : null}
      </div>
      <div>
        <Label htmlFor="reg-business">Business name (optional)</Label>
        <Input id="reg-business" name="businessName" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="reg-category">Business category (optional)</Label>
        <Input id="reg-category" name="businessCategory" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="reg-goals">What do you want to learn? (optional)</Label>
        <Textarea id="reg-goals" name="learningGoals" className="mt-2" />
      </div>
      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input name="workshopCommunicationConsent" type="checkbox" className="mt-1" />
        <span>Email me about this workshop, including time, place, and updates. Required to register.</span>
      </label>
      {errors.workshopCommunicationConsent ? (
        <p className="text-sm text-red-700" role="alert">{errors.workshopCommunicationConsent}</p>
      ) : null}
      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input name="marketingConsent" type="checkbox" className="mt-1" />
        <span>Email me occasionally about future workshops and related services. Optional, and not selected for you.</span>
      </label>
      {formError ? <p className="text-sm text-red-700" role="alert">{formError}</p> : null}
      {success ? (
        <div className="rounded-lg border bg-muted/40 p-4 text-sm leading-relaxed" role="status">
          <p>{success.alreadyRegistered ? 'You were already registered for this workshop.' : 'You are registered.'}</p>
          <p className="mt-2">
            Workshop email consent and marketing email consent are stored separately.
            {success.email?.sent === false ? ' A confirmation email was not sent.' : ''}
          </p>
          {success.workshopWithdrawUrl ? (
            <p className="mt-2">
              <a className="text-primary font-semibold hover:underline" href={success.workshopWithdrawUrl}>
                Withdraw workshop email consent
              </a>
            </p>
          ) : null}
          {success.marketingWithdrawUrl ? (
            <p className="mt-2">
              <a className="text-primary font-semibold hover:underline" href={success.marketingWithdrawUrl}>
                Withdraw marketing consent
              </a>
            </p>
          ) : null}
        </div>
      ) : null}
      <Button type="submit" disabled={loading} className="font-semibold" style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}>
        {loading ? 'Sending...' : 'Register'}
      </Button>
    </form>
  );
}
