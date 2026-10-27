import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { trackEvent } from '@/lib/analytics';
import { breadcrumbList } from '@/lib/breadcrumb';
import { submitLead } from '@/lib/leads';

const PAGE = 'https://foundforai.com/book-call';

const schemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Request a consult', url: PAGE },
  ]),
];

export default function BookCall() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    website: '',
    note: '',
    consent: false,
    gotcha: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.consent) {
      setError('Please agree that we can email you about this request.');
      return;
    }
    if (form.gotcha) return;
    setLoading(true);
    try {
      const ok = await submitLead({
        name: form.name,
        email: form.email,
        website: form.website,
        note: form.note,
        consent: 'Yes',
        _gotcha: form.gotcha,
        _subject: `Consult request: ${form.website || form.email}`,
      });
      if (!ok) {
        setError('Submission failed. Please email info@foundforai.com directly.');
        return;
      }
      trackEvent('contact_form_submit', {
        form_location: '/book-call',
        form_name: 'consult_request',
      });
      setDone(true);
    } catch {
      setError('Submission failed. Please email info@foundforai.com.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout
      title="Request a consult | Found For AI"
      description="Request a consult with Found For AI. We'll reply by email. This doesn't book a time."
      canonical={PAGE}
      schemas={schemas}
    >
      <div className="revamp">
        <section className="revamp-hero">
          <div className="revamp-wrap revamp-hero-grid">
            <div>
              <span className="revamp-eyebrow">Consult</span>
              <h1>Request a consult</h1>
              <p className="revamp-lead">
                Tell us about the business and the action you care about. We'll reply by email. This doesn't book a time on a calendar.
              </p>
            </div>
            {done ? (
              <div className="revamp-form" data-testid="consult-success">
                <h2>Request received</h2>
                <p className="revamp-muted" style={{ marginTop: 12 }}>
                  We'll reply by email. This doesn't book anything.
                </p>
              </div>
            ) : (
              <form className="revamp-form" onSubmit={handleSubmit} data-testid="form-consult">
                <h2>Send a request</h2>
                <label htmlFor="consult-name">Name</label>
                <input
                  id="consult-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <label htmlFor="consult-email">Email</label>
                <input
                  id="consult-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <label htmlFor="consult-website">Business website</label>
                <input
                  id="consult-website"
                  type="url"
                  required
                  placeholder="https://yourpractice.com"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
                <label htmlFor="consult-note">
                  Note <small>(optional)</small>
                </label>
                <textarea
                  id="consult-note"
                  rows={4}
                  placeholder="Please don't include patient or payment details"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                />
                <label className="revamp-check">
                  <input
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  />
                  <span>I agree Found For AI can email me about this request.</span>
                </label>
                <label className="revamp-hp" aria-hidden="true">
                  Company website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.gotcha}
                    onChange={(e) => setForm({ ...form, gotcha: e.target.value })}
                  />
                </label>
                <button className="revamp-btn block" type="submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Request a consult'}
                </button>
                <p className="revamp-note">We'll reply by email. This doesn't book anything.</p>
                {error ? <p className="revamp-error">{error}</p> : null}
              </form>
            )}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
