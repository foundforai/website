import PageLayout from '@/components/PageLayout';
import { CtaBand, FaqList, ProofSection, SampleReport } from '@/components/marketing/RevampBlocks';
import { HOME_FAQS } from '@/data/revamp-copy';
import { breadcrumbList } from '@/lib/breadcrumb';
import { faqPageSchema } from '@/lib/revamp-schema';

const PAGE = 'https://foundforai.com/dental';

const schemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Dental', url: PAGE },
  ]),
  faqPageSchema(`${PAGE}#faq`, HOME_FAQS),
  {
    '@type': 'Service',
    '@id': `${PAGE}#service`,
    name: 'AI Actions for dentists and orthodontists',
    serviceType: 'AI Actions for dental practices',
    description:
      'Consult and new-patient requests that arrive complete, follow-up for people who asked but never booked, and visibility when patients ask an assistant for a dentist or orthodontist nearby. No clinical or insurance details are collected.',
    provider: { '@id': 'https://foundforai.com/#org' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Dentists and orthodontists',
    },
    areaServed: { '@type': 'Country', name: 'United States' },
    url: PAGE,
  },
];

export default function Dental() {
  return (
    <PageLayout
      title="Let AI send you new patients, not voicemails. | Found For AI"
      description="Patients now ask ChatGPT and other assistants to find a dentist or orthodontist and request a visit. We make sure your practice can take that request and follow up."
      canonical={PAGE}
      schemas={schemas}
    >
      <div className="revamp">
        <section className="revamp-hero">
          <div className="revamp-wrap revamp-hero-grid">
            <div>
              <span className="revamp-eyebrow">For dentists and orthodontists</span>
              <h1>
                Let AI send you new patients, <em>not voicemails.</em>
              </h1>
              <p className="revamp-lead">
                Patients now ask ChatGPT and other assistants to find a dentist or orthodontist and request a visit. We make sure your practice can take that request and follow up, so fewer people slip through phone tag and unfinished intake forms.
              </p>
              <div className="revamp-ctas">
                <a href="/audit?vertical=dental" className="revamp-btn">
                  Get my free dental audit
                </a>
              </div>
              <ul className="revamp-ticks">
                <li>No clinical data collected</li>
                <li>Works with your current site</li>
              </ul>
            </div>
            <SampleReport />
          </div>
        </section>

        <section className="revamp-section">
          <div className="revamp-wrap">
            <h2>Built for how practices actually run</h2>
            <p className="revamp-sub">
              Fewer dropped requests, less chasing, and patients who show up with their details already in.
            </p>
            <div className="revamp-grid2">
              <article className="revamp-card">
                <div className="revamp-ic">✓</div>
                <h3>Requests that arrive complete</h3>
                <p>Consult and new-patient requests come in with name, phone, email, and the best way to reach them.</p>
              </article>
              <article className="revamp-card">
                <div className="revamp-ic">↺</div>
                <h3>Follow-up for quiet leads</h3>
                <p>Help reaching people who asked but never booked, before they pick another office.</p>
              </article>
              <article className="revamp-card">
                <div className="revamp-ic">⌕</div>
                <h3>Found when patients ask AI</h3>
                <p>Shows up when someone asks an assistant for a dentist or orthodontist near them.</p>
              </article>
              <article className="revamp-card">
                <div className="revamp-ic">🔒</div>
                <h3>Careful with patient info</h3>
                <p>No health history, insurance, or payment details. Contact info and a short note only.</p>
              </article>
            </div>
          </div>
        </section>

        <ProofSection title="A Salt Lake orthodontist, tested for real." />

        <CtaBand
          title="Get your free dental audit."
          body="We'll have AI assistants try to request a visit at your practice and show you exactly what happens."
          href="/audit?vertical=dental"
        />

        <FaqList items={HOME_FAQS} />
      </div>
    </PageLayout>
  );
}
