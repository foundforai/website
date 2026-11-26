import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { CtaBand, FaqList } from '@/components/marketing/RevampBlocks';
import { pricing } from '@/data/pricing';
import { breadcrumbList } from '@/lib/breadcrumb';
import { faqPageSchema, serviceSchema } from '@/lib/revamp-schema';

const PAGE = 'https://foundforai.com/ai-receptionist';

const FAQS = [
  {
    q: 'What does AI Receptionist do?',
    a: 'It answers your business phone line when staff cannot. It talks with callers naturally, answers common questions such as hours and services, and books, reschedules, or routes callers into the tools you already use.',
  },
  {
    q: 'Who sets it up and supports it?',
    a: "Found For AI sets it up and is the local first call for changes. Request a consult and we'll reply by email. This doesn't book a time.",
  },
  {
    q: 'What does it cost?',
    a: `${pricing.receptionist.priceLabel}, ${pricing.receptionist.cadenceLabel}. Request a consult and we'll confirm what fits.`,
  },
  {
    q: 'Who is it a fit for?',
    a: 'Phone-heavy local businesses such as dental and orthodontic offices, salons, auto repair, and HVAC.',
  },
  {
    q: 'Is this the same as AI Actions?',
    a: 'No. AI Actions help an assistant finish a request on your website, and the customer confirms before anything is sent. AI Receptionist answers your phone line.',
  },
  {
    q: 'Can you guarantee every call gets booked?',
    a: 'No. It answers when staff cannot, covers the common questions you set up, and books, reschedules, or routes callers into the tools you already use.',
  },
];

const schemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Services', url: 'https://foundforai.com/services' },
    { name: 'AI Receptionist', url: PAGE },
  ]),
  faqPageSchema(`${PAGE}#faq`, FAQS),
  serviceSchema(PAGE, pricing.receptionist),
];

export default function AiReceptionist() {
  return (
    <PageLayout
      title="AI Receptionist for local businesses | Found For AI"
      description="AI Receptionist answers your phone when staff can't, covers common questions, and books, reschedules, or routes callers into the tools you already use. $500 setup. Plans from $299/mo."
      canonical={PAGE}
      schemas={schemas}
    >
      <div className="revamp">
        <section className="revamp-hero">
          <div className="revamp-wrap" style={{ maxWidth: 800 }}>
            <span className="revamp-eyebrow">AI Receptionist</span>
            <h1>The phone gets answered when your staff cannot.</h1>
            <p className="revamp-lead">
              AI Receptionist answers your business phone line when staff can't. It talks with callers naturally, answers common questions about the business, and books, reschedules, or routes callers into the tools you already use. Found For AI sets it up and is the local first call for changes.
            </p>
            <div className="revamp-ctas">
              <Link href="/book-call" className="revamp-btn">
                Request a consult
              </Link>
              <Link href="/audit" className="revamp-btn ghost">
                Get my free audit
              </Link>
            </div>
          </div>
        </section>

        <section className="revamp-section">
          <div className="revamp-wrap">
            <h2>What it does</h2>
            <p className="revamp-sub">
              A done-for-you service for the phone line you already have. Found For AI sets it up and supports it.
            </p>
            <div className="revamp-grid2">
              <article className="revamp-card">
                <h3>Answers when staff can't</h3>
                <p>It answers the business phone line when your team cannot pick up.</p>
              </article>
              <article className="revamp-card">
                <h3>Talks with callers naturally</h3>
                <p>Callers can talk with it in plain language about the business.</p>
              </article>
              <article className="revamp-card">
                <h3>Common questions</h3>
                <p>Hours, services, and the other questions you want answered about the business.</p>
              </article>
              <article className="revamp-card">
                <h3>Books, reschedules, or routes</h3>
                <p>Callers can be booked, rescheduled, or routed into the tools you already use.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="revamp-section alt">
          <div className="revamp-wrap">
            <h2>A fit for phone-heavy local businesses</h2>
            <p className="revamp-sub">
              Dental and orthodontic offices, salons, auto repair, and HVAC are the kinds of businesses this is for.
            </p>
          </div>
        </section>

        <section className="revamp-section" id="pricing">
          <div className="revamp-wrap revamp-prose">
            <h2>Pricing</h2>
            <p>
              {pricing.receptionist.priceLabel}, {pricing.receptionist.cadenceLabel}. Found For AI sets it up and is the local first call for changes.
            </p>
            <div className="revamp-ctas">
              <Link href="/book-call" className="revamp-btn">
                Request a consult
              </Link>
              <Link href="/services" className="revamp-btn ghost">
                See all services
              </Link>
            </div>
            <p style={{ marginTop: 18 }}>
              AI Receptionist is for the phone.{' '}
              <Link href="/ai-actions" className="revamp-link">
                AI Actions
              </Link>{' '}
              and{' '}
              <Link href="/visibility" className="revamp-link">
                visibility
              </Link>{' '}
              are how assistants find you and finish a request on your website.
            </p>
          </div>
        </section>

        <FaqList items={FAQS} />
        <CtaBand
          title="Want this on your phone line?"
          body="Request a consult. We'll reply by email. This doesn't book a time."
          href="/book-call"
          label="Request a consult"
        />
      </div>
    </PageLayout>
  );
}
