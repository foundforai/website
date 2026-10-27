import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { CtaBand, ProofChat } from '@/components/marketing/RevampBlocks';
import { PROOF_BODY } from '@/data/revamp-copy';
import { breadcrumbList } from '@/lib/breadcrumb';

const PAGE = 'https://foundforai.com/case-studies/salt-lake-orthodontist';

const schemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Dental', url: 'https://foundforai.com/dental' },
    { name: 'Salt Lake orthodontist case study', url: PAGE },
  ]),
  {
    '@type': 'Article',
    '@id': `${PAGE}#article`,
    headline: 'A Salt Lake orthodontist, tested for real',
    datePublished: '2026-10-27',
    dateModified: '2026-10-27',
    author: { '@id': 'https://foundforai.com/#org' },
    publisher: { '@id': 'https://foundforai.com/#org' },
    description: PROOF_BODY,
    mainEntityOfPage: PAGE,
  },
];

export default function SaltLakeCaseStudy() {
  return (
    <PageLayout
      title="A Salt Lake orthodontist, tested for real | Found For AI"
      description="On October 27, 2026, an AI assistant sent a real consult request through a Salt Lake orthodontist's website. The test also caught an approval prompt that disappeared too fast."
      canonical={PAGE}
      schemas={schemas}
    >
      <div className="revamp">
        <section className="revamp-hero">
          <div className="revamp-wrap" style={{ maxWidth: 800 }}>
            <span className="revamp-eyebrow">Case study</span>
            <h1>A Salt Lake orthodontist, tested for real.</h1>
            <p className="revamp-lead">{PROOF_BODY}</p>
          </div>
        </section>

        <section className="revamp-section">
          <div className="revamp-wrap revamp-proof">
            <div className="revamp-prose revamp-stack">
              <h2>What we asked the assistant to do</h2>
              <p>
                On October 27, 2026, we asked an AI assistant, in its built-in browser, to request a free consult at a Salt Lake orthodontist. The person had to confirm the details before anything was sent. The test did not include health history, insurance, or payment details.
              </p>
              <h2>What happened</h2>
              <p>
                The assistant found the practice, used a consult request on the site, read the details back, and sent the request after the person said yes. The request was routed to the practice as a real consult request. The office could schedule it the way the practice already does.
              </p>
              <div className="revamp-warn">
                <b>What the test also caught:</b> the assistant's approval prompt flashed on screen and disappeared before the person could confirm. A path that works once can still fail the next person. That is the kind of thing the free audit is for, before patients run into it.
              </div>
              <h2>What this page does not include</h2>
              <p>
                The practice is not named here. No patient is named. The chat card is a styled recreation, not a screenshot, and the details are changed for privacy.
              </p>
              <p>
                <Link href="/dental" className="revamp-link">
                  Back to AI Actions for dental →
                </Link>
              </p>
            </div>
            <ProofChat />
          </div>
        </section>

        <CtaBand
          title="Get your free dental audit."
          body="We'll have AI assistants try to request a visit at your practice and show you exactly what happens."
          href="/audit?vertical=dental"
        />
      </div>
    </PageLayout>
  );
}
