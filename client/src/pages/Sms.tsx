import PageLayout from '@/components/PageLayout';
import { breadcrumbList } from '@/lib/breadcrumb';

const smsSchemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'SMS updates', url: 'https://foundforai.com/sms' },
  ]),
  {
    "@type": "WebPage",
    "@id": "https://foundforai.com/sms#webpage",
    "url": "https://foundforai.com/sms",
    "name": "SMS updates",
    "description": "How to opt in to informational text messages from Dustin Crump / Found For AI.",
    "isPartOf": { "@id": "https://foundforai.com/#website" },
    "about": { "@id": "https://foundforai.com/#org" },
    "publisher": { "@id": "https://foundforai.com/#org" },
    "dateModified": "2026-08-28",
  },
];

export default function Sms() {
  return (
    <PageLayout
      title="SMS updates | Found For AI"
      description="How to opt in to informational text messages from Dustin Crump / Found For AI."
      canonical="https://foundforai.com/sms"
      schemas={smsSchemas}
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">SMS updates</h1>
          <p className="text-sm text-muted-foreground mb-12">
            Text messages from Dustin Crump / Found For AI
          </p>

          <div className="prose prose-neutral max-w-none space-y-8 text-foreground">
            <section>
              <p className="text-muted-foreground leading-relaxed">
                Dustin Crump / Found For AI sends informational texts from{' '}
                <a href="tel:+13859934305" className="text-primary hover:underline">+1 385-993-4305</a>.
                Messages are informational and transactional only, not marketing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">How to opt in</h2>
              <p className="text-muted-foreground leading-relaxed">
                Text <strong className="text-foreground">START</strong> to{' '}
                <a href="tel:+13859934305" className="text-primary hover:underline font-semibold">+1 385-993-4305</a>.
                Keyword opt-in only — we do not collect mobile numbers through a form on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">What happens next</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                After you opt in, you will receive this confirmation:
              </p>
              <blockquote className="border-l-4 border-primary/40 pl-4 text-foreground leading-relaxed">
                Dustin Crump: You're subscribed to informational texts from this number. Msg frequency varies. Msg and data rates may apply. Reply HELP for help, STOP to cancel.
              </blockquote>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">Message details</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Message frequency varies.</li>
                <li>Message and data rates may apply.</li>
                <li>Reply STOP to cancel, HELP for help.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not share mobile numbers with third parties or affiliates for marketing or promotional purposes.
                Mobile numbers are used only to send and receive the informational messages you opted into.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">Privacy and terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Privacy:{' '}
                <a href="https://foundforai.com/privacy" className="text-primary hover:underline">https://foundforai.com/privacy</a>
                <br />
                Terms:{' '}
                <a href="https://foundforai.com/terms" className="text-primary hover:underline">https://foundforai.com/terms</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">Questions</h2>
              <p className="text-muted-foreground leading-relaxed">
                Email{' '}
                <a href="mailto:support@foundforai.com" className="text-primary hover:underline">support@foundforai.com</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
