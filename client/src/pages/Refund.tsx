import PageLayout from '@/components/PageLayout';
import { breadcrumbList } from '@/lib/breadcrumb';

const EFFECTIVE_DATE = 'May 19, 2026';

const refundSchemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Refund Policy', url: 'https://foundforai.com/refund-policy' },
  ]),
  {
    "@type": "WebPage",
    "@id": "https://foundforai.com/refund-policy#webpage",
    "url": "https://foundforai.com/refund-policy",
    "name": "Refund & Cancellation Policy",
    "description":
      "Found For AI's 30-day money-back guarantee, cancellation terms, and the process for requesting a refund.",
    "isPartOf": { "@id": "https://foundforai.com/#website" },
    "about": { "@id": "https://foundforai.com/#org" },
    "publisher": { "@id": "https://foundforai.com/#org" },
    "dateModified": "2026-05-19",
  },
];

export default function Refund() {
  return (
    <PageLayout
      title="Refund & Cancellation Policy | Found For AI"
      description="30-day money-back guarantee. Cancel anytime. Read our full refund and cancellation policy."
      canonical="https://foundforai.com/refund-policy"
      schemas={refundSchemas}
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            Effective {EFFECTIVE_DATE}
          </p>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-12">
            <p className="text-base md:text-lg font-medium text-foreground leading-relaxed">
              <span className="font-bold">Plain-English summary:</span> If our service hasn't worked for you, we'll give you your money back within 30 days. After that, you can still cancel anytime — we just don't refund past charges.
            </p>
          </div>

          <div className="prose prose-neutral max-w-none space-y-10 text-foreground">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                1. 30-day money-back guarantee
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You can request a <strong className="text-foreground">full refund of your most recent payment within 30 days</strong> of being charged, for any reason. This applies to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1 mb-3">
                <li>DIY ($49/mo or $490/yr)</li>
                <li>Starter ($299/mo or $2,990/yr)</li>
                <li>Growth ($599/mo or $7,188/yr)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You don't have to explain why. If you ask within 30 days, we refund — period.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The 30 days runs from the <strong className="text-foreground">most recent charge</strong>, not from your initial signup. So if you've been subscribed for six months, your latest monthly charge clears, and you decide you're done within 30 days of that, you get a refund of that last month.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">2. Free trials</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                The <strong className="text-foreground">DIY tier includes a free trial</strong>: 7 days on monthly, 30 days on annual. You won't be charged until the trial ends. <strong className="text-foreground">Cancel anytime during the trial and pay nothing.</strong> A trial cancellation isn't a "refund" — it's just stopping the subscription before any payment ever happens.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Starter and Growth do not have free trials (they're done-for-you services that begin work on day one).
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">3. After 30 days</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You can{' '}
                <strong className="text-foreground">cancel anytime</strong>{' '}
                through your billing portal at{' '}
                <a
                  href="https://billing.stripe.com/p/login/8x2eV78Ws36B0yA0WZ3Nm00"
                  className="text-primary underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  billing.stripe.com
                </a>{' '}
                (the link is also in every receipt email you receive from us).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                When you cancel:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-3">
                <li>
                  <strong className="text-foreground">Monthly plans</strong>: your access continues until the end of your current billing period. You won't be charged again.
                </li>
                <li>
                  <strong className="text-foreground">Annual plans</strong>: your access continues until your annual term ends. We don't pro-rate annual refunds outside the 30-day window.
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We don't refund partial months or past months once you're outside the 30-day window. We don't "trap" anyone — you can always cancel, you just don't get back what was already paid.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                4. The $997 onboarding (Starter and Growth only)
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                If you paid for our one-time AI Visibility Onboarding and we made a mistake — wrong schema, broken integration, missing optimization promised in scope — we'll fix it free within <strong className="text-foreground">60 days</strong> of delivery. If we can't or won't fix it, you get the full $997 back.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is in addition to the 30-day money-back guarantee on your monthly subscription.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                5. How to request a refund
              </h2>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-2 mb-3">
                <li>
                  Email{' '}
                  <a
                    href="mailto:info@foundforai.com?subject=Refund%20request"
                    className="text-primary underline hover:no-underline"
                  >
                    info@foundforai.com
                  </a>{' '}
                  with the subject line "Refund request" and the email address you paid with.
                </li>
                <li>We'll confirm receipt within 1 business day.</li>
                <li>We process the refund within 5 business days.</li>
                <li>
                  Stripe returns the funds to your original payment method in 5–10 business days after we process. (We don't control this part — that's your bank.)
                </li>
              </ol>
              <p className="text-muted-foreground leading-relaxed">
                You can also reply directly to any receipt email from{' '}
                <strong className="text-foreground">noreply@foundforai.com</strong>{' '}
                — that lands in our inbox too.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                6. What happens to your data when you cancel
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Your analytics data and site configuration stay in our system for{' '}
                <strong className="text-foreground">90 days after cancellation</strong>. If you re-subscribe within that window, everything picks up where you left off. After 90 days, your account and tracking data are permanently deleted.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you want immediate deletion before the 90 days are up, log in and use{' '}
                <strong className="text-foreground">Account Settings → Danger Zone → Delete Account</strong>, or email us at{' '}
                <a
                  href="mailto:info@foundforai.com"
                  className="text-primary underline hover:no-underline"
                >
                  info@foundforai.com
                </a>{' '}
                and ask.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">7. Chargebacks</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                If you have a billing concern,{' '}
                <strong className="text-foreground">email us first</strong>{' '}
                — we respond within 1 business day and refunds are easy to process directly through Stripe.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Filing a chargeback through your bank without first contacting us costs us money even when the dispute is resolved in our favor, and triggers automatic suspension of your account. We don't recommend it.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you do file a chargeback that we believe was incorrect (e.g., you continued to use the service after disputing the charge), we may close your account and prevent future signups from the same email or payment method.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                8. Discretion outside this policy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                If something has gone wrong on our end — a billing bug, an outage, an unhappy edge case our policy doesn't anticipate — we'd rather make it right than hide behind a 30-day rule. Just email us and explain. We're a small team and we read every message.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We also reserve the right to deny refund requests we believe are abusive (e.g., signing up, using the service heavily, requesting a refund right at day 30, then re-signing up). This is the exception, not the norm.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">9. Policy updates</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this policy. If we do, the change takes effect at the time of update and won't be applied retroactively to refunds you'd have qualified for under the previous version. The current version is always at{' '}
                <a
                  href="https://foundforai.com/refund-policy"
                  className="text-primary underline hover:no-underline"
                >
                  foundforai.com/refund-policy
                </a>
                .
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
