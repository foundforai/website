import { useMemo, useState } from 'react';
import { useLocation, useSearch } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { AUDIT_ACTIONS, BUSINESS_TYPES } from '@/data/revamp-copy';
import { pricing } from '@/data/pricing';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/lib/analytics';
import { breadcrumbList } from '@/lib/breadcrumb';
import { submitLead } from '@/lib/leads';

const PAGE = 'https://foundforai.com/audit';

const schemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Free AI Actions Audit', url: PAGE },
  ]),
  {
    '@type': 'WebPage',
    '@id': `${PAGE}#webpage`,
    url: PAGE,
    name: 'Free AI Actions Audit',
    description: `We'll have AI assistants try to reach your business through your website and send you a plain report within ${pricing.auditReportBusinessDays} business days.`,
    isPartOf: { '@id': 'https://foundforai.com/#website' },
    publisher: { '@id': 'https://foundforai.com/#org' },
    potentialAction: {
      '@type': 'Action',
      name: 'Request a free AI Actions Audit',
      target: PAGE,
    },
  },
  {
    '@type': 'Service',
    '@id': `${PAGE}#service`,
    name: pricing.audit.name,
    serviceType: 'AI Actions audit',
    description: pricing.audit.items.join('. '),
    provider: { '@id': 'https://foundforai.com/#org' },
    url: PAGE,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: pricing.currency,
    },
  },
];

export default function Audit() {
  const search = useSearch();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const queryVertical = useMemo(() => new URLSearchParams(search).get('vertical') || '', [search]);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    websiteUrl: '',
    businessType: 'dental',
    action: 'consult',
    phone: '',
    note: '',
    consent: false,
    gotcha: '',
  });

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.consent) {
      setError('Please agree that we can email you about this audit.');
      return;
    }
    if (form.gotcha) return;

    setLoading(true);
    const business = BUSINESS_TYPES.find((item) => item.value === form.businessType);
    const action = AUDIT_ACTIONS.find((item) => item.value === form.action);
    const vertical = queryVertical || form.businessType;

    try {
      const ok = await submitLead({
        fullName: form.fullName,
        email: form.email,
        websiteUrl: form.websiteUrl,
        businessType: business?.label || form.businessType,
        action: action?.label || form.action,
        phone: form.phone,
        note: form.note,
        vertical,
        consent: 'Yes',
        _gotcha: form.gotcha,
        _subject: `Free AI Actions Audit: ${form.websiteUrl} (${vertical})`,
      });

      if (!ok) {
        setError('Submission failed. Please email info@foundforai.com directly.');
        toast({
          variant: 'destructive',
          title: 'Submission failed',
          description: 'Please email info@foundforai.com directly.',
        });
        return;
      }

      trackEvent('submit_audit_request', {
        form_location: '/audit',
        form_name: 'audit_request',
        vertical,
        action: form.action,
      });
      setLocation('/thank-you');
    } catch {
      setError('Submission failed. Please email info@foundforai.com.');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Submission failed. Please email info@foundforai.com.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout
      title="Free AI Actions Audit | Found For AI"
      description={`We'll have AI assistants try to reach your business through your website and send you a plain report within ${pricing.auditReportBusinessDays} business days.`}
      canonical={PAGE}
      schemas={schemas}
    >
      <div className="revamp">
        <section className="revamp-hero">
          <div className="revamp-wrap revamp-hero-grid">
            <div>
              <span className="revamp-eyebrow">Free</span>
              <h1>Free AI Actions Audit</h1>
              <p className="revamp-lead">
                We'll have AI assistants try to reach your business through your website and send you a plain report within {pricing.auditReportBusinessDays} business days.
              </p>
              <div className="revamp-card" style={{ marginTop: 28 }}>
                <h3 style={{ marginTop: 0 }}>What you get</h3>
                <ul className="revamp-list">
                  <li>Whether AI can find you</li>
                  <li>Whether it can send the request</li>
                  <li>Where it got stuck, with screenshots</li>
                  <li>The top 3 fixes</li>
                </ul>
              </div>
              <p style={{ marginTop: 20 }} className="revamp-muted">
                Want a quick look first?{' '}
                <a href="/agentic-web-assessment" className="revamp-link">
                  Try the 3-minute self check
                </a>
              </p>
            </div>

            <form className="revamp-form" onSubmit={handleSubmit} data-testid="form-audit">
              <h2>Request your audit</h2>
              <div className="revamp-row">
                <div>
                  <label htmlFor="fullName">Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="Jane Smith"
                    value={form.fullName}
                    onChange={(e) => set('fullName', e.target.value)}
                    data-testid="input-full-name"
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@practice.com"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    data-testid="input-email"
                  />
                </div>
              </div>
              <label htmlFor="websiteUrl">Business website</label>
              <input
                id="websiteUrl"
                name="websiteUrl"
                type="url"
                required
                placeholder="https://yourpractice.com"
                value={form.websiteUrl}
                onChange={(e) => set('websiteUrl', e.target.value)}
                data-testid="input-website-url"
              />
              <div className="revamp-row">
                <div>
                  <label htmlFor="businessType">Business type</label>
                  <select
                    id="businessType"
                    name="businessType"
                    required
                    value={form.businessType}
                    onChange={(e) => set('businessType', e.target.value)}
                    data-testid="select-business-type"
                  >
                    {BUSINESS_TYPES.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="action">Action to test</label>
                  <select
                    id="action"
                    name="action"
                    required
                    value={form.action}
                    onChange={(e) => set('action', e.target.value)}
                    data-testid="select-action"
                  >
                    {AUDIT_ACTIONS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <label htmlFor="phone">
                Phone <small>(optional)</small>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                data-testid="input-phone"
              />
              <label htmlFor="note">
                Note <small>(optional)</small>
              </label>
              <textarea
                id="note"
                name="note"
                rows={3}
                placeholder="Please don't include patient or payment details"
                value={form.note}
                onChange={(e) => set('note', e.target.value)}
                data-testid="input-note"
              />
              <label className="revamp-check">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => set('consent', e.target.checked)}
                  required
                  data-testid="checkbox-consent"
                />
                <span>I agree Found For AI can email me about this audit.</span>
              </label>
              <label className="revamp-hp" aria-hidden="true">
                Company website
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.gotcha}
                  onChange={(e) => set('gotcha', e.target.value)}
                />
              </label>
              <button className="revamp-btn block" type="submit" disabled={loading} data-testid="button-submit-audit">
                {loading ? 'Sending...' : 'Get my free audit'}
              </button>
              <p className="revamp-note">We'll email your report. This doesn't book anything.</p>
              {error ? <p className="revamp-error">{error}</p> : null}
            </form>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
