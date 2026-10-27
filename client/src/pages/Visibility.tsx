import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { CtaBand, FaqList } from '@/components/marketing/RevampBlocks';
import { pricing } from '@/data/pricing';
import { breadcrumbList } from '@/lib/breadcrumb';
import { faqPageSchema } from '@/lib/revamp-schema';

const PAGE = 'https://foundforai.com/visibility';

const faqs = [
  {
    q: 'Can you guarantee AI will recommend me?',
    a: 'No one honestly can. What we can do is make the facts clear, and make sure that when an assistant tries to reach you, it gets through.',
  },
  {
    q: 'What happened to AI visibility?',
    a: "It's still here. It's how assistants find you in the first place, and it's included in Monitoring.",
  },
  {
    q: 'Do I need a new website?',
    a: 'No. Visibility work and AI Actions both sit on the site you already have.',
  },
  {
    q: 'Where did the older visibility pages go?',
    a: 'The explainers are still here: AEO, What is AI SEO, and Retrieval-Layer SEO. This page is the short version, and it connects that work to AI Actions.',
  },
];

const schemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Visibility', url: PAGE },
  ]),
  faqPageSchema(`${PAGE}#faq`, faqs),
  {
    '@type': 'Service',
    '@id': `${PAGE}#service`,
    name: 'AI visibility (AEO)',
    serviceType: 'Answer engine optimization',
    description:
      'AI visibility is how assistants learn that a business exists, what it does, and where it works. It is included in Monitoring + Visibility.',
    provider: { '@id': 'https://foundforai.com/#org' },
    url: PAGE,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: String(pricing.monitoring.lowPrice),
      highPrice: String(pricing.monitoring.highPrice),
      priceCurrency: pricing.currency,
    },
  },
];

export default function Visibility() {
  return (
    <PageLayout
      title="AI visibility for local businesses | Found For AI"
      description="AI visibility is how assistants find your business in the first place. AI Actions is how they finish the job once they do. No one can guarantee a recommendation."
      canonical={PAGE}
      schemas={schemas}
    >
      <div className="revamp">
        <section className="revamp-hero">
          <div className="revamp-wrap" style={{ maxWidth: 800 }}>
            <span className="revamp-eyebrow">Visibility</span>
            <h1>Getting found is step one.</h1>
            <p className="revamp-lead">
              AI visibility, also called AEO, is how assistants learn that you exist, what you do, and where you work. AI Actions is how they finish the job once they find you.
            </p>
            <div className="revamp-ctas">
              <Link href="/audit" className="revamp-btn">
                Get my free audit
              </Link>
              <Link href="/ai-actions" className="revamp-btn ghost">
                See AI Actions
              </Link>
            </div>
          </div>
        </section>

        <section className="revamp-section">
          <div className="revamp-wrap">
            <h2>What we tune</h2>
            <p className="revamp-sub">
              Assistants repeat the facts they can verify. If those facts are muddy, they move on to a business they can describe.
            </p>
            <div className="revamp-grid2">
              <article className="revamp-card">
                <h3>Services, hours, and place</h3>
                <p>What you offer, when you are open, and where you work, written so an assistant does not have to guess.</p>
              </article>
              <article className="revamp-card">
                <h3>Answers to real questions</h3>
                <p>The questions customers already ask, in language an assistant can quote without inventing the rest.</p>
              </article>
              <article className="revamp-card">
                <h3>A site they can read</h3>
                <p>Structure, names, and pages that match. The educational guides below go deeper on how that reading works.</p>
              </article>
              <article className="revamp-card">
                <h3>The same facts everywhere</h3>
                <p>Your site and the other places assistants cross-check should tell the same story about the business.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="revamp-section alt">
          <div className="revamp-wrap revamp-prose">
            <h2>Included in Monitoring</h2>
            <p>
              {pricing.monitoring.name} is {pricing.monitoring.priceLabel} {pricing.monitoring.cadenceLabel}. It covers monthly agent re-tests, follow-up help for quiet leads, AI visibility tuning, and a plain monthly report.
            </p>
            <p>
              No one can promise that an assistant will recommend you. Visibility makes the facts clear. AI Actions makes the request path work when an assistant tries to reach you.
            </p>
            <h2 style={{ marginTop: 36 }}>Keep reading</h2>
            <p>These guides stay at their current addresses:</p>
            <ul className="revamp-list">
              <li>
                <Link href="/aeo" className="revamp-link">What is AEO</Link>
              </li>
              <li>
                <Link href="/what-is-ai-seo" className="revamp-link">What is AI SEO</Link>
              </li>
              <li>
                <Link href="/retrieval-layer-seo" className="revamp-link">Retrieval-Layer SEO</Link>
              </li>
              <li>
                <Link href="/blog" className="revamp-link">Blog</Link>
              </li>
            </ul>
          </div>
        </section>

        <FaqList items={faqs} />
        <CtaBand
          title="Start with the action that matters."
          body="The free audit shows whether an assistant can find you and whether it can send the request."
        />
      </div>
    </PageLayout>
  );
}
