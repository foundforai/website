import PageLayout from '@/components/PageLayout';
import { CtaBand, FaqList, HowItWorks, ProofSection, SampleReport, TierGrid } from '@/components/marketing/RevampBlocks';
import { HOME_FAQS } from '@/data/revamp-copy';
import { breadcrumbList } from '@/lib/breadcrumb';
import { faqPageSchema, tierServiceSchemas } from '@/lib/revamp-schema';

const PAGE = 'https://foundforai.com/';

const schemas = [
  breadcrumbList([{ name: 'Home', url: PAGE }]),
  faqPageSchema('https://foundforai.com/#faq', HOME_FAQS),
  ...tierServiceSchemas('https://foundforai.com/services'),
];

export default function Home() {
  return (
    <PageLayout
      title="AI can find you. Now let it finish the job. | Found For AI"
      description="Your customers are asking AI assistants to find a business and reach out for them. We make sure the assistant can actually send you the consult or quote request, with the right details."
      canonical="https://foundforai.com/"
      schemas={schemas}
    >
      <div className="revamp">
        <section className="revamp-hero">
          <div className="revamp-wrap revamp-hero-grid">
            <div>
              <span className="revamp-eyebrow">AI Actions for local businesses</span>
              <h1>
                AI can find you. <em>Now let it finish the job.</em>
              </h1>
              <p className="revamp-lead">
                Your customers are asking AI assistants to find a business and reach out for them. We make sure the assistant can actually send you the consult or quote request, with the right details, instead of giving up and picking someone else.
              </p>
              <div className="revamp-ctas">
                <a href="/audit" className="revamp-btn">
                  Get my free audit
                </a>
                <a href="#how" className="revamp-btn ghost">
                  See how it works
                </a>
              </div>
              <ul className="revamp-ticks">
                <li>Free audit</li>
                <li>Report in 3 business days</li>
                <li>Dental and ortho specialists</li>
              </ul>
            </div>
            <SampleReport />
          </div>
        </section>

        <section className="revamp-section">
          <div className="revamp-wrap">
            <h2>Getting mentioned is only half of it.</h2>
            <p className="revamp-sub">
              AI assistants are getting better at finding businesses. Plenty of sites still lose the customer right after.
            </p>
            <div className="revamp-grid3">
              <article className="revamp-card">
                <div className="revamp-ic">1</div>
                <h3>Stuck at the widget</h3>
                <p>The assistant finds you, then can't figure out your booking widget.</p>
              </article>
              <article className="revamp-card">
                <div className="revamp-ic">2</div>
                <h3>Request never sent</h3>
                <p>It can't tell what you need from a new patient or customer, so it gives up.</p>
              </article>
              <article className="revamp-card">
                <div className="revamp-ic">3</div>
                <h3>Phone tag</h3>
                <p>When a request does come through, it's missing details and your team chases it.</p>
              </article>
            </div>
          </div>
        </section>

        <HowItWorks />

        <CtaBand
          title="See what happens when AI tries to reach you."
          body="Tell us your website and the action you care about. We'll send you a short report showing what worked, what broke, and what to fix first."
        />

        <ProofSection title="It's already working." />
        <TierGrid />
        <FaqList items={HOME_FAQS} />
        <CtaBand
          title="Ready to see your report?"
          body="Free, plain, and focused on the one action that matters most to you."
        />
      </div>
    </PageLayout>
  );
}
