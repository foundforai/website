import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { pricing } from '@/data/pricing';

export default function ThankYou() {
  return (
    <PageLayout
      title="Audit request received | Found For AI"
      description={`Your free AI Actions Audit request is in. We'll email a plain report within ${pricing.auditReportBusinessDays} business days. This doesn't book anything.`}
      canonical="https://foundforai.com/thank-you"
      noindex
    >
      <div className="revamp">
        <section className="revamp-hero">
          <div className="revamp-wrap" style={{ maxWidth: 720 }}>
            <span className="revamp-eyebrow">Request received</span>
            <h1>We'll email your report.</h1>
            <p className="revamp-lead">
              Expect a plain report within {pricing.auditReportBusinessDays} business days. It covers whether an assistant can find you, whether it can send the request, where it got stuck, and the top 3 fixes.
            </p>
            <p className="revamp-note" style={{ textAlign: 'left', marginTop: 18 }}>
              This doesn't book anything.
            </p>
            <div className="revamp-ctas">
              <Link href="/ai-actions" className="revamp-btn">
                See how it works
              </Link>
              <Link href="/" className="revamp-btn ghost">
                Back home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
