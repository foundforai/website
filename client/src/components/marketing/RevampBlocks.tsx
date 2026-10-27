import { Link } from 'wouter';
import { guaranteeLine, pricing } from '@/data/pricing';
import { PROOF_BODY } from '@/data/revamp-copy';

export function SampleReport() {
  return (
    <div className="revamp-chat" data-testid="sample-report">
      <div className="revamp-chat-top">
        <span>Sample audit report</span>
        <span className="revamp-tag">Example</span>
      </div>
      <div className="revamp-msgs">
        <div className="revamp-score">
          <b>yourpractice.com</b>
          <span className="revamp-score-num">
            62<small>/100</small>
          </span>
        </div>
        <div className="revamp-ok">
          <i>✓</i>
          <span>
            <b>Found by AI:</b> assistants named the practice and hours
          </span>
        </div>
        <div className="revamp-ok">
          <i className="warn">!</i>
          <span>
            <b>Request a consult:</b> agent stalled on the booking widget
          </span>
        </div>
        <div className="revamp-ok">
          <i className="bad">✕</i>
          <span>
            <b>Follow-up:</b> no way for an agent to confirm details
          </span>
        </div>
        <div className="revamp-tool">
          <b>Top fix:</b> add a consult request action with a clear confirmation step
        </div>
      </div>
      <p className="revamp-cap">What your free audit report looks like. Sample data.</p>
    </div>
  );
}

export function ProofChat() {
  return (
    <div className="revamp-chat" data-testid="proof-chat">
      <div className="revamp-chat-top">
        <span>AI assistant · built-in browser</span>
        <span className="revamp-tag">Illustration of the Oct 27 test</span>
      </div>
      <div className="revamp-msgs">
        <div className="revamp-bubble user">
          Can you request a free consult for my daughter at an orthodontist in Salt Lake?
        </div>
        <div className="revamp-bubble bot">
          Sure. This practice's site offers a consult request. I'll need a name, phone, email and best way to reach you.
        </div>
        <div className="revamp-tool">
          <b>Site action:</b> request consultation
          <br />
          Name, phone, email, preferred contact: text
        </div>
        <div className="revamp-bubble bot">Here are the details. Should I send this request to the office?</div>
        <div className="revamp-bubble user">Yes, send it.</div>
        <div className="revamp-ok">
          <i>✓</i>
          <span>
            <b>Request sent.</b> The office will reach out to schedule.
          </span>
        </div>
      </div>
      <p className="revamp-cap">Styled recreation, not a screenshot. Details changed for privacy.</p>
    </div>
  );
}

export function ProofSection({ title }: { title: string }) {
  return (
    <section className="revamp-section alt">
      <div className="revamp-wrap revamp-proof">
        <div>
          <span className="revamp-eyebrow">Case study</span>
          <h2 style={{ marginTop: 14 }}>{title}</h2>
          <p>{PROOF_BODY}</p>
          <div className="revamp-warn">
            <b>What the test also caught:</b> the assistant's approval prompt flashed on screen and disappeared before the person could confirm. That's the kind of thing our audit finds before your patients run into it.
          </div>
          <p style={{ marginTop: 18 }}>
            <Link href="/case-studies/salt-lake-orthodontist" className="revamp-link">
              Read the case study →
            </Link>
          </p>
        </div>
        <ProofChat />
      </div>
    </section>
  );
}

export function CtaBand({
  title,
  body,
  href = '/audit',
  label = 'Get my free audit',
}: {
  title: string;
  body: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="revamp-band-wrap">
      <div className="revamp-wrap">
        <div className="revamp-band">
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
          <div className="revamp-band-action">
            <Link href={href} className="revamp-btn">
              {label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TierGrid() {
  return (
    <section className="revamp-section alt" id="tiers">
      <div className="revamp-wrap">
        <h2>Simple ways to start</h2>
        <p className="revamp-sub">Start free. Add setup and monitoring when it makes sense.</p>
        <div className="revamp-tiers">
          <article className="revamp-tier featured">
            <h3>{pricing.audit.name}</h3>
            <div className="revamp-price">{pricing.audit.priceLabel}</div>
            <ul>
              {pricing.audit.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href="/audit" className="revamp-btn">
              Get my free audit
            </Link>
          </article>
          <article className="revamp-tier">
            <h3>{pricing.setup.name}</h3>
            <div className="revamp-price">
              {pricing.setup.priceLabel} <small>{pricing.setup.cadenceLabel}</small>
            </div>
            <ul>
              {pricing.setup.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href="/audit" className="revamp-btn ghost">
              Start with the audit
            </Link>
          </article>
          <article className="revamp-tier">
            <h3>{pricing.monitoring.name}</h3>
            <div className="revamp-price">
              {pricing.monitoring.priceLabel} <small>{pricing.monitoring.cadenceLabel}</small>
            </div>
            <ul>
              {pricing.monitoring.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href="/audit" className="revamp-btn ghost">
              Start with the audit
            </Link>
          </article>
        </div>
        <p className="revamp-note">{guaranteeLine()}</p>
      </div>
    </section>
  );
}

export function FaqList({
  items,
  title = 'Common questions',
}: {
  items: { q: string; a: string }[];
  title?: string;
}) {
  return (
    <section className="revamp-section">
      <div className="revamp-wrap revamp-faq">
        <h2>{title}</h2>
        <div style={{ height: 20 }} />
        {items.map((item, index) => (
          <details key={item.q} open={index < 2}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
        <p style={{ marginTop: 18 }}>
          <Link href="/faq/personas/delegating-owner-operator" className="revamp-link">
            More questions for owner-operators →
          </Link>
        </p>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="revamp-section alt" id="how">
      <div className="revamp-wrap">
        <h2>How it works</h2>
        <p className="revamp-sub">Three steps, starting free.</p>
        <div className="revamp-grid3">
          <article className="revamp-card">
            <div className="revamp-ic num">1</div>
            <h3>Free audit</h3>
            <p>
              We send real AI assistants through your site to do the one thing that matters most, like requesting a consult, and show you where they get stuck.
            </p>
          </article>
          <article className="revamp-card">
            <div className="revamp-ic num">2</div>
            <h3>Set up AI Actions</h3>
            <p>
              We add simple, safe actions to your site that assistants can use. The customer always confirms the details, and requests go straight to your inbox.
            </p>
          </article>
          <article className="revamp-card">
            <div className="revamp-ic num">3</div>
            <h3>Monitor and follow up</h3>
            <p>
              Each month we re-test as the assistants change, and we help you follow up with people who went quiet.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function NextStepAiActions() {
  return (
    <aside className="revamp-next" data-testid="next-step-ai-actions">
      <span className="revamp-eyebrow">Next step</span>
      <h2>Next step: AI Actions</h2>
      <p className="revamp-muted">
        Visibility helps an assistant find you. AI Actions is how that assistant finishes the job: a consult or quote request, confirmed by the customer, sent to your inbox.
      </p>
      <div className="revamp-ctas">
        <Link href="/ai-actions" className="revamp-btn">
          See how AI Actions work
        </Link>
        <Link href="/audit" className="revamp-btn ghost">
          Get my free audit
        </Link>
      </div>
    </aside>
  );
}
