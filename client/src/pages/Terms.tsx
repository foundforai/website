import PageLayout from '@/components/PageLayout';
import { breadcrumbList } from '@/lib/breadcrumb';

const EFFECTIVE_DATE = 'May 11, 2026';

const termsSchemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Terms of Service', url: 'https://foundforai.com/terms' },
  ]),
  {
    "@type": "WebPage",
    "@id": "https://foundforai.com/terms#webpage",
    "url": "https://foundforai.com/terms",
    "name": "Terms of Service",
    "description": "The terms and conditions governing use of Found For AI's website and services.",
    "isPartOf": { "@id": "https://foundforai.com/#website" },
    "about": { "@id": "https://foundforai.com/#org" },
    "publisher": { "@id": "https://foundforai.com/#org" },
    "dateModified": "2026-05-11",
  },
];

export default function Terms() {
  return (
    <PageLayout
      title="Terms of Service | Found For AI"
      description="The terms and conditions governing use of Found For AI's website and services."
      canonical="https://foundforai.com/terms"
      schemas={termsSchemas}
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-12">Effective {EFFECTIVE_DATE}</p>

          <div className="prose prose-neutral max-w-none space-y-8 text-foreground">
            <section>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service ("Terms") govern your access to and use of the website
                {' '}<a href="https://foundforai.com" className="text-primary hover:underline">https://foundforai.com</a>{' '}
                and the consulting and software services offered by Found For AI ("Found For AI", "we",
                "us", or "our"). By accessing the site or engaging our services, you agree to be bound by
                these Terms. If you do not agree, do not use the site or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">1. Eligibility</h2>
              <p className="text-muted-foreground">
                You must be at least 18 years old, or the age of majority in your jurisdiction, to use our
                services. By using the site, you represent and warrant that you meet this requirement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">2. Services</h2>
              <p className="text-muted-foreground">
                Found For AI provides AI visibility consulting, audits, scorecards, playbooks, research,
                and related deliverables. The specific scope, fees, and timing of any paid engagement will
                be defined in a separate proposal, statement of work, or order form. In the event of a
                conflict between these Terms and an executed proposal, the proposal controls.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">3. Acceptable Use</h2>
              <p className="text-muted-foreground mb-3">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use the site or services for any unlawful, harmful, or fraudulent purpose;</li>
                <li>Attempt to gain unauthorized access to any portion of the site, systems, or networks;</li>
                <li>Interfere with, disrupt, or place an unreasonable load on the site or services;</li>
                <li>Scrape, copy, or harvest content except as permitted by these Terms or applicable law;</li>
                <li>Misrepresent your identity or affiliation with any person or organization;</li>
                <li>Use automated tools to submit forms or generate traffic without our prior written consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">4. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on the site — including text, graphics, logos, images, code, and deliverables
                — is owned by Found For AI or its licensors and is protected by copyright, trademark, and
                other intellectual property laws. You may view and share publicly available content for
                non-commercial, personal use, with attribution. You may not reproduce, modify, distribute,
                or create derivative works from our content without our prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">5. User Submissions</h2>
              <p className="text-muted-foreground">
                When you submit information through our forms (including website URLs, business details,
                or feedback), you grant Found For AI a non-exclusive, worldwide, royalty-free license to
                use that information to provide and improve our services. You represent that you have the
                right to submit such information and that it does not violate any third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">6. Third-Party Services and Links</h2>
              <p className="text-muted-foreground">
                The site may link to or rely on third-party services (such as Google Analytics, Formspree,
                Vercel, X/Twitter, and others). We are not responsible for the content, policies, or
                practices of any third-party services. Your use of those services is governed by their own
                terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">7. AI-Assisted Content</h2>
              <p className="text-muted-foreground">
                Some content on this site may be assisted by AI tools. We review such content for accuracy
                but make no warranty that it is free of errors. You are responsible for verifying any
                recommendations before acting on them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">8. Disclaimers</h2>
              <p className="text-muted-foreground uppercase tracking-wide text-sm">
                The site and services are provided "as is" and "as available", without warranties of any
                kind, whether express or implied, including implied warranties of merchantability, fitness
                for a particular purpose, and non-infringement. Found For AI does not warrant that the
                site will be uninterrupted, error-free, or secure, or that any specific business,
                ranking, traffic, revenue, or AI visibility outcome will be achieved.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">9. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, Found For AI and its officers, employees, and
                contractors will not be liable for any indirect, incidental, special, consequential,
                exemplary, or punitive damages, or any loss of profits, revenue, data, or goodwill,
                arising out of or related to your use of the site or services. Our total aggregate
                liability for any claim arising out of these Terms or your use of the site will not
                exceed the greater of (a) the amount you paid Found For AI in the 12 months preceding the
                claim, or (b) one hundred U.S. dollars (US$100).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">10. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to defend, indemnify, and hold harmless Found For AI from any claims, damages,
                losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising
                out of or related to: (a) your violation of these Terms; (b) your misuse of the site or
                services; or (c) your violation of any rights of a third party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">11. Termination</h2>
              <p className="text-muted-foreground">
                We may suspend or terminate your access to the site or services at any time, with or
                without notice, if we believe you have violated these Terms or for any other reason at our
                discretion. Sections that by their nature should survive termination (including
                intellectual property, disclaimers, limitation of liability, and indemnification) will
                survive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">12. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms are governed by the laws of the State of Utah, USA, without regard to its
                conflict-of-laws principles. Any dispute arising out of or related to these Terms will be
                resolved exclusively in the state or federal courts located in Salt Lake County, Utah,
                and you consent to the personal jurisdiction of those courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">13. Changes to These Terms</h2>
              <p className="text-muted-foreground">
                We may update these Terms from time to time. The revised Terms will be posted on this
                page with an updated "Effective" date. Your continued use of the site after the changes
                take effect constitutes your acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">14. Contact</h2>
              <p className="text-muted-foreground">
                Questions about these Terms can be sent to:
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
