import PageLayout from '@/components/PageLayout';
import { breadcrumbList } from '@/lib/breadcrumb';

const EFFECTIVE_DATE = 'May 11, 2026';

const privacySchemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Privacy Policy', url: 'https://foundforai.com/privacy' },
  ]),
  {
    "@type": "WebPage",
    "@id": "https://foundforai.com/privacy#webpage",
    "url": "https://foundforai.com/privacy",
    "name": "Privacy Policy",
    "description": "How Found For AI collects, uses, and protects information from visitors and clients.",
    "isPartOf": { "@id": "https://foundforai.com/#website" },
    "about": { "@id": "https://foundforai.com/#org" },
    "publisher": { "@id": "https://foundforai.com/#org" },
    "dateModified": "2026-05-11",
  },
];

export default function Privacy() {
  return (
    <PageLayout
      title="Privacy Policy | Found For AI"
      description="How Found For AI collects, uses, and protects information from visitors and clients."
      canonical="https://foundforai.com/privacy"
      schemas={privacySchemas}
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Effective {EFFECTIVE_DATE}</p>

          <div className="prose prose-neutral max-w-none space-y-8 text-foreground">
            <section>
              <p className="text-muted-foreground leading-relaxed">
                Found For AI ("Found For AI", "we", "us", or "our") operates the website
                {' '}<a href="https://foundforai.com" className="text-primary hover:underline">https://foundforai.com</a>{' '}
                and provides AI visibility consulting services. This Privacy Policy explains what
                information we collect, how we use it, and the choices you have. By using our website
                or services, you agree to the practices described below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-3">We collect the following categories of information:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Information you provide directly</strong> — such as your name, email
                  address, phone number, company, website URL, and any message content you submit through
                  contact forms, scorecard requests, audit requests, the playbook access form, or when
                  booking a call.
                </li>
                <li>
                  <strong className="text-foreground">Usage and device information</strong> — including IP address,
                  browser type, device type, operating system, referring URL, pages viewed, and timestamps,
                  collected automatically by our analytics tools.
                </li>
                <li>
                  <strong className="text-foreground">Cookies and similar technologies</strong> — small files placed on
                  your device to remember preferences, measure traffic, and improve site performance.
                </li>
                <li>
                  <strong className="text-foreground">Public social media data</strong> — when we conduct AI visibility
                  research, we may access publicly available information from platforms such as X (Twitter),
                  LinkedIn, and others through their official APIs, in accordance with each platform's terms.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Respond to inquiries and provide the services you request;</li>
                <li>Deliver audits, scorecards, playbooks, and consulting deliverables;</li>
                <li>Conduct AI visibility research and analyze publicly available data;</li>
                <li>Send transactional emails (e.g., confirming a request or delivering a report);</li>
                <li>Improve our website, content, and service offerings;</li>
                <li>Detect, prevent, and address fraud, abuse, or security issues;</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">3. Legal Bases for Processing</h2>
              <p className="text-muted-foreground">
                Where required by law (such as the EU/UK GDPR), we process personal information based on:
                your consent, the necessity to perform a contract with you, our legitimate interests in
                operating and improving our business, and compliance with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">4. Third-Party Services</h2>
              <p className="text-muted-foreground mb-3">
                We use trusted third-party providers to operate our website and services. These providers
                process information on our behalf and have their own privacy practices:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Vercel</strong> — website hosting and infrastructure.</li>
                <li><strong className="text-foreground">Google Analytics & Google Tag Manager</strong> — traffic analytics.</li>
                <li><strong className="text-foreground">Formspree</strong> — contact and lead form delivery.</li>
                <li><strong className="text-foreground">Email and scheduling tools</strong> — to communicate with you and book calls.</li>
                <li><strong className="text-foreground">X (Twitter) Developer Platform</strong> — used for AI visibility research via public API endpoints. We do not store private X account data, and we comply with X's Developer Agreement and Policy.</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                We do not sell your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">5. Cookies</h2>
              <p className="text-muted-foreground">
                We use cookies and similar technologies to operate the site, remember preferences, and
                measure traffic. You can disable cookies in your browser settings, but some features of
                the site may not function correctly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">6. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain personal information for as long as needed to provide our services, comply with
                legal obligations, resolve disputes, and enforce our agreements. When information is no
                longer required, we delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">7. Your Rights</h2>
              <p className="text-muted-foreground mb-3">
                Depending on where you live, you may have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access the personal information we hold about you;</li>
                <li>Request correction or deletion of your information;</li>
                <li>Object to or restrict certain processing;</li>
                <li>Withdraw consent at any time (where consent is the legal basis);</li>
                <li>Lodge a complaint with a data protection authority.</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                California residents have additional rights under the CCPA/CPRA, including the right to
                know, delete, correct, and limit the use of sensitive personal information. To exercise any
                of these rights, contact us at{' '}
                <a href="mailto:support@foundforai.com" className="text-primary hover:underline">support@foundforai.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">8. Security</h2>
              <p className="text-muted-foreground">
                We use reasonable administrative, technical, and physical safeguards to protect personal
                information. No method of transmission or storage is 100% secure, however, and we cannot
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">9. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our services are not directed to children under 13, and we do not knowingly collect
                personal information from children. If you believe a child has provided us with
                information, please contact us so we can delete it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">10. International Users</h2>
              <p className="text-muted-foreground">
                Found For AI is based in the United States. If you access our services from outside the
                U.S., your information will be transferred to, stored, and processed in the United States.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">11. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will post the revised policy on
                this page and update the "Effective" date above. Material changes will be communicated
                where appropriate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">12. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy or our data practices, contact us:
              </p>
              <address className="not-italic text-muted-foreground mt-3 space-y-1">
                <div><strong className="text-foreground">Found For AI</strong></div>
                <div>Cottonwood Heights, Utah, USA</div>
                <div>Email: <a href="mailto:support@foundforai.com" className="text-primary hover:underline">support@foundforai.com</a></div>
                <div>Phone: <a href="tel:+18018982456" className="text-primary hover:underline">+1 (801) 898-2456</a></div>
              </address>
            </section>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
