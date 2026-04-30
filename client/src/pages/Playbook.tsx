import { useState } from 'react';
import { useLocation } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';

const playbookSchemas = [
  {
    "@type": "WebPage",
    "@id": "https://foundforai.com/playbook#webpage",
    "name": "AI Visibility Playbook",
    "url": "https://foundforai.com/playbook",
    "description": "A 15-minute checklist to find out why AI tools like ChatGPT and Google AI aren't recommending your business — and what to fix first.",
    "isPartOf": { "@id": "https://foundforai.com/#website" },
    "publisher": { "@id": "https://foundforai.com/#org" },
    "about": [
      "AI visibility",
      "AI search discovery",
      "structured data",
      "local service businesses"
    ],
    "mainEntity": { "@id": "https://foundforai.com/playbook#document" },
    "potentialAction": [
      {
        "@type": "Action",
        "name": "Download the playbook",
        "target": "https://foundforai.com/found-for-ai-readability-playbook.pdf"
      }
    ]
  },
  {
    "@type": "DigitalDocument",
    "@id": "https://foundforai.com/playbook#document",
    "name": "AI Visibility Playbook",
    "fileFormat": "application/pdf",
    "url": "https://foundforai.com/found-for-ai-readability-playbook.pdf",
    "publisher": { "@id": "https://foundforai.com/#org" },
    "offers": {
      "@type": "Offer",
      "@id": "https://foundforai.com/playbook#offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://foundforai.com/playbook"
    }
  }
];

export default function Playbook() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/movklzvl', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          _subject: 'New playbook download request from Found For AI',
          _language: 'en',
        }),
      });

      if (response.ok) {
        setLocation('/playbook/thanks');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout
      title="AI Visibility Playbook - Free Download | Found For AI"
      description="A 15-minute checklist to find out why AI tools like ChatGPT and Google AI aren't recommending your business — and what to fix first."
      canonical="https://foundforai.com/playbook"
      schemas={playbookSchemas}
    >
      <section className="py-10 md:py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            AI Visibility Playbook
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            A 15-minute checklist to find out why AI tools like ChatGPT and Google AI aren't recommending your business — and what to fix first.
          </p>

          <p className="text-muted-foreground mb-4">
            When someone asks ChatGPT for a good HVAC company, yoga studio, or dentist in your area, AI gives them one or two names. Not ten blue links. One or two.
          </p>

          <p className="text-muted-foreground mb-4">
            If your business isn't one of them, it's usually not because you're doing something wrong. It's because your website was built for people to read — not for AI to understand.
          </p>

          <p className="text-muted-foreground mb-6">
            This playbook walks you through the 20 things AI systems check before they'll recommend a business. Score yourself. Find your gaps. Fix what you can on your own.
          </p>

          <div className="mb-8">
            <p className="font-semibold mb-2">What's inside</p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>The 5 areas AI evaluates before recommending you</li>
              <li>A 20-point self-scoring checklist</li>
              <li>Plain-language explanations (no developer-speak)</li>
              <li>A scoring guide that tells you where you actually stand</li>
            </ul>
          </div>

          <Card>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-base font-semibold">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2"
                    data-testid="input-playbook-email"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400" data-testid="text-playbook-error">{error}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-semibold group"
                  style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
                  disabled={loading}
                  data-testid="button-playbook-submit"
                >
                  {loading ? 'Sending...' : 'Send me the playbook'}
                  {!loading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  No spam. One email to deliver the playbook, and occasional notes on AI search. Unsubscribe anytime.
                </p>
              </form>
            </CardContent>
          </Card>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Questions first?{' '}
            <a
              href="https://foundforai.com/talk-to-a-human#calendar"
              className="underline hover:text-foreground transition-colors"
              data-testid="link-playbook-book-call"
            >
              Book a 15-minute call →
            </a>
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
