import PageLayout from '@/components/PageLayout';
import { breadcrumbList } from '@/lib/breadcrumb';

const EFFECTIVE_DATE = 'June 17, 2026';

const refundSchemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Billing & Guarantee', url: 'https://foundforai.com/refund-policy' },
  ]),
  {
    "@type": "WebPage",
    "@id": "https://foundforai.com/refund-policy#webpage",
    "url": "https://foundforai.com/refund-policy",
    "name": "Billing & Guarantee",
    "description":
      "How Found For AI handles billing on custom engagements, plus our 60-day We Fix It Free guarantee.",
    "isPartOf": { "@id": "https://foundforai.com/#website" },
    "about": { "@id": "https://foundforai.com/#org" },
    "publisher": { "@id": "https://foundforai.com/#org" },
    "dateModified": "2026-06-17",
  },
];

export default function Refund() {
  return (
    <PageLayout
      title="Billing & Guarantee | Found For AI"
      description="How Found For AI handles billing on custom engagements, plus our 60-day We Fix It Free guarantee."
      canonical="https://foundforai.com/refund-policy"
      schemas={refundSchemas}
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Billing &amp; Guarantee
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            Effective {EFFECTIVE_DATE}
          </p>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-12">
            <p className="text-base md:text-lg font-medium text-foreground leading-relaxed">
              <span className="font-bold">Plain-English summary:</span> We work on custom engagements scoped to your business. The specific fees, payment schedule, and cancellation terms live in your written proposal — and everything we install is backed by a 60-day We Fix It Free guarantee.
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-10 text-foreground">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                1. How engagements are priced
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Found For AI is an AI visibility agency. We don't sell fixed packages off a shelf — we scope each engagement to your goals, footprint, and budget. The exact fees, deposit, payment schedule, and cancellation terms for your project are defined in the written proposal or statement of work you approve before any work begins.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If anything in this page conflicts with a proposal you've signed, the signed proposal controls.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                2. Our 60-day We Fix It Free guarantee
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Everything we install or change during an engagement is backed by a <strong className="text-foreground">60-day We Fix It Free guarantee</strong>. If something we delivered is incorrect, missing, or breaks within 60 days — wrong schema, a broken integration, an optimization we promised in scope that didn't ship — we fix it at no additional cost.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If we can't or won't make it right, we'll work out a fair resolution with you directly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                3. Cancellation
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You can end an ongoing engagement at any time per the notice terms in your proposal. We don't lock anyone into long-term contracts. Work and fees already delivered before cancellation aren't refunded, but you won't be billed for work that hasn't started.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                4. Billing questions &amp; disputes
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                If you ever have a billing concern, <strong className="text-foreground">email us first</strong> — we respond within one business day and would much rather make it right than have you go through your bank. Filing a dispute without contacting us costs us money even when it's resolved in our favor, so please reach out.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If something has gone wrong on our end — a billing error, an outage, an edge case our terms don't anticipate — just tell us. We're a small team and we read every message.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                5. Your data
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                When an engagement ends, you can request that we delete the business data and access credentials you shared with us. Email us and we'll confirm what we hold and remove it. See our{' '}
                <a href="https://foundforai.com/privacy" className="text-primary underline hover:no-underline">
                  Privacy Policy
                </a>{' '}
                for the full details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">6. Updates to this page</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this page from time to time. The current version is always at{' '}
                <a
                  href="https://foundforai.com/refund-policy"
                  className="text-primary underline hover:no-underline"
                >
                  foundforai.com/refund-policy
                </a>
                . Changes don't apply retroactively to terms already set in a signed proposal.
              </p>
            </section>

            <section className="pt-8 border-t border-border">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Questions?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Email{' '}
                <a
                  href="mailto:info@foundforai.com"
                  className="text-primary underline hover:no-underline"
                >
                  info@foundforai.com
                </a>
                . A human reads every message.
              </p>
            </section>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
