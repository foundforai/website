import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { CtaBand, FaqList, HowItWorks } from '@/components/marketing/RevampBlocks';
import { HOME_FAQS } from '@/data/revamp-copy';
import { pricing } from '@/data/pricing';
import { breadcrumbList } from '@/lib/breadcrumb';
import { faqPageSchema, tierServiceSchemas } from '@/lib/revamp-schema';

const PAGE = 'https://foundforai.com/ai-actions';

const schemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'AI Actions', url: PAGE },
  ]),
  faqPageSchema(`${PAGE}#faq`, HOME_FAQS),
  ...tierServiceSchemas(PAGE),
];

export default function AiActions() {
  return (
    <PageLayout
      title="AI Actions for local businesses | Found For AI"
      description="AI Actions are simple, safe steps on your website that an assistant can finish: a consult, a quote, or a services and hours lookup. The customer confirms the details first."
      canonical={PAGE}
      schemas={schemas}
    >
      <div className="revamp">
        <section className="revamp-hero">
          <div className="revamp-wrap" style={{ maxWidth: 800 }}>
            <span className="revamp-eyebrow">AI Actions</span>
            <h1>Simple actions assistants can actually finish.</h1>
            <p className="revamp-lead">
              AI Actions are a small layer on the site you already have. An assistant can request a consult, request a quote, or look up services and hours. The customer confirms the details. The request goes to your inbox.
            </p>
            <div className="revamp-ctas">
              <Link href="/audit" className="revamp-btn">
                Get my free audit
              </Link>
              <Link href="/dental" className="revamp-btn ghost">
                For dentists and orthodontists
              </Link>
            </div>
          </div>
        </section>

        <HowItWorks />

        <section className="revamp-section">
          <div className="revamp-wrap">
            <h2>What we set up</h2>
            <p className="revamp-sub">
              The first actions are the ones a local business actually gets asked for. Setup is {pricing.setup.priceLabel} {pricing.setup.cadenceLabel}, after the free audit.
            </p>
            <div className="revamp-grid2">
              <article className="revamp-card">
                <div className="revamp-ic">1</div>
                <h3>Consult or quote request</h3>
                <p>Name, phone, email, and the best way to reach them. A short note. Nothing clinical, and no payment details.</p>
              </article>
              <article className="revamp-card">
                <div className="revamp-ic">2</div>
                <h3>Services and hours lookup</h3>
                <p>So an assistant can answer what you offer and when you are open without guessing from an old widget.</p>
              </article>
              <article className="revamp-card">
                <div className="revamp-ic">3</div>
                <h3>Confirmation before sending</h3>
                <p>The customer sees the details and agrees before the request leaves their assistant. Your team still schedules the way you do now.</p>
              </article>
              <article className="revamp-card">
                <div className="revamp-ic">4</div>
                <h3>Inbox, then a re-test</h3>
                <p>Requests land where you already read them. We run the path again after setup so a broken confirmation step does not stay hidden.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="revamp-section alt">
          <div className="revamp-wrap">
            <h2>Any local business. Dental first.</h2>
            <p className="revamp-sub">
              The same pattern fits a practice, a med spa, a home-services company, or a law firm. Dental and orthodontics are the lead vertical because that is where we have already watched a real request go through.
            </p>
            <p>
              <Link href="/dental" className="revamp-link">
                See AI Actions for dentists and orthodontists →
              </Link>
            </p>
            <p style={{ marginTop: 12 }}>
              <Link href="/visibility" className="revamp-link">
                Visibility is how assistants find you first →
              </Link>
            </p>
          </div>
        </section>

        <FaqList items={HOME_FAQS} />
        <CtaBand
          title="See where an assistant gets stuck."
          body="The audit runs one key journey with two assistants and sends a plain report. It does not book anything."
        />
      </div>
    </PageLayout>
  );
}
