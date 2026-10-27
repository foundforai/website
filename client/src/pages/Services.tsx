import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { CtaBand, FaqList, TierGrid } from '@/components/marketing/RevampBlocks';
import { HOME_FAQS } from '@/data/revamp-copy';
import { pricing } from '@/data/pricing';
import { breadcrumbList } from '@/lib/breadcrumb';
import { faqPageSchema, tierServiceSchemas } from '@/lib/revamp-schema';

const PAGE = 'https://foundforai.com/services';

const schemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Services', url: PAGE },
  ]),
  faqPageSchema(`${PAGE}#faq`, HOME_FAQS),
  ...tierServiceSchemas(PAGE),
];

export default function Services() {
  return (
    <PageLayout
      title="AI Actions, monitoring, and visibility | Found For AI"
      description={`Start with a free AI Actions Audit. Setup is ${pricing.setup.priceLabel} ${pricing.setup.cadenceLabel}. Monitoring and visibility is ${pricing.monitoring.priceLabel} ${pricing.monitoring.cadenceLabel}. Multi-location and agencies are custom.`}
      canonical={PAGE}
      schemas={schemas}
    >
      <div className="revamp">
        <section className="revamp-hero">
          <div className="revamp-wrap" style={{ maxWidth: 800 }}>
            <span className="revamp-eyebrow">Services</span>
            <h1>Start free. Add the rest when it helps.</h1>
            <p className="revamp-lead">
              Three ways to work together: a free audit, a one-time AI Actions setup, and monthly monitoring with visibility. Larger footprints are scoped on their own.
            </p>
            <div className="revamp-ctas">
              <Link href="/audit" className="revamp-btn">
                Get my free audit
              </Link>
              <Link href="/book-call" className="revamp-btn ghost">
                Request a consult
              </Link>
            </div>
          </div>
        </section>

        <TierGrid />

        <section className="revamp-section" id="enterprise">
          <div className="revamp-wrap">
            <h2>Multi-location and agencies</h2>
            <p className="revamp-sub">
              Custom scoping when one location is not the whole job. We keep the conversation on the footprint you actually have.
            </p>
            <div className="revamp-grid3">
              <article className="revamp-card" data-testid="card-enterprise-multilocation">
                <h3>Multi-location and multi-brand</h3>
                <p>Rollouts across many locations, with each location's facts kept clear and one place to govern them.</p>
              </article>
              <article className="revamp-card" data-testid="card-enterprise-agency">
                <h3>Agency partnerships</h3>
                <p>We handle the AI Actions and visibility layer while you keep the client relationship.</p>
              </article>
              <article className="revamp-card" data-testid="card-enterprise-reporting">
                <h3>Custom programs and reporting</h3>
                <p>Scoping and reporting shaped to your stakeholders, from a first audit through month to month checks.</p>
              </article>
            </div>
            <div className="revamp-ctas">
              <Link href="/book-call" className="revamp-btn">
                Request a consult
              </Link>
            </div>
            <p className="revamp-note" style={{ textAlign: 'left' }}>
              Tell us about the footprint. We'll reply by email. This doesn't book anything.
            </p>
          </div>
        </section>

        <section className="revamp-section alt">
          <div className="revamp-wrap revamp-prose">
            <h2>What a setup includes</h2>
            <p>
              Delivered in {pricing.deliveryBusinessDays} business days. We Fix It Free for {pricing.fixItFreeDays} days if something we set up is wrong, missing, or breaks.
            </p>
            <ul className="revamp-list">
              <li>The action you care about, usually a consult or quote request</li>
              <li>A services and hours lookup</li>
              <li>A confirmation step the customer sees before the request is sent</li>
              <li>Routing into the inbox you already use</li>
              <li>A re-test after the work ships</li>
            </ul>
            <p style={{ marginTop: 18 }}>
              <Link href="/ai-actions" className="revamp-link">
                Read how AI Actions work →
              </Link>
            </p>
          </div>
        </section>

        <FaqList items={HOME_FAQS} />
        <CtaBand
          title="Ready to see your report?"
          body="Free, plain, and focused on the one action that matters most to you."
        />
      </div>
    </PageLayout>
  );
}
