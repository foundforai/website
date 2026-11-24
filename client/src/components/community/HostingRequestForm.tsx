import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { HostBrand } from '@/lib/community/types.ts';

type FieldErrors = Record<string, string>;

export default function HostingRequestForm({ sourceBrand }: { sourceBrand: HostBrand }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    setFormError('');
    setDone(false);
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      businessName: String(form.get('businessName') || ''),
      message: String(form.get('message') || ''),
      hostingContactConsent: form.get('hostingContactConsent') === 'on',
      marketingConsent: form.get('marketingConsent') === 'on',
      companyWebsite: String(form.get('companyWebsite') || ''),
      sourceBrand,
    };
    try {
      const response = await fetch('/api/community/hosting-requests', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string; fields?: FieldErrors };
      if (!response.ok) {
        setErrors(data.fields || {});
        setFormError(data.error || 'Please check the form and try again.');
        return;
      }
      setDone(true);
      formEl.reset();
    } catch {
      setFormError('The form could not be sent. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="host-a-workshop" onSubmit={onSubmit} className="mt-8 space-y-4 scroll-mt-24" noValidate>
      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Company website
          <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <Label htmlFor="host-name">Name</Label>
        <Input id="host-name" name="name" autoComplete="name" className="mt-2" />
        {errors.name ? <p className="mt-1 text-sm text-red-700">{errors.name}</p> : null}
      </div>
      <div>
        <Label htmlFor="host-email">Email</Label>
        <Input id="host-email" name="email" type="email" autoComplete="email" className="mt-2" />
        {errors.email ? <p className="mt-1 text-sm text-red-700">{errors.email}</p> : null}
      </div>
      <div>
        <Label htmlFor="host-business">Business name (optional)</Label>
        <Input id="host-business" name="businessName" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="host-message">What would you like to host?</Label>
        <Textarea id="host-message" name="message" className="mt-2" />
        {errors.message ? <p className="mt-1 text-sm text-red-700">{errors.message}</p> : null}
      </div>
      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input name="hostingContactConsent" type="checkbox" className="mt-1" />
        <span>You can email me about this hosting request. Required.</span>
      </label>
      {errors.hostingContactConsent ? (
        <p className="text-sm text-red-700" role="alert">{errors.hostingContactConsent}</p>
      ) : null}
      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input name="marketingConsent" type="checkbox" className="mt-1" />
        <span>Email me occasionally about future workshops and related services. Optional, and not selected for you.</span>
      </label>
      {formError ? <p className="text-sm text-red-700" role="alert">{formError}</p> : null}
      {done ? (
        <p className="text-sm" role="status">
          Thanks. Your request is saved. It is not a marketing signup unless you checked that box.
        </p>
      ) : null}
      <Button type="submit" disabled={loading} className="font-semibold" style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}>
        {loading ? 'Sending...' : 'Request a workshop'}
      </Button>
    </form>
  );
}
