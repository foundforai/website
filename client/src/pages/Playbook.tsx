import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';

export default function Playbook() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.id = 'playbook-page-schema';
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AI Readability Playbook",
      "url": "https://foundforai.com/playbook",
      "description": "A 15 minute checklist to help your business show up when people ask AI who to hire.",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Found For AI",
        "url": "https://foundforai.com/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Found For AI",
        "url": "https://foundforai.com/"
      },
      "about": [
        "AI visibility",
        "AI search discovery",
        "structured data",
        "local service businesses"
      ],
      "mainEntity": {
        "@type": "DigitalDocument",
        "name": "Found For AI Readability Playbook",
        "fileFormat": "application/pdf",
        "url": "https://foundforai.com/found-for-ai-readability-playbook.pdf"
      },
      "potentialAction": [
        {
          "@type": "Action",
          "name": "Download the playbook",
          "target": "https://foundforai.com/playbook"
        },
        {
          "@type": "ReserveAction",
          "name": "Talk to a human",
          "target": "https://foundforai.com/talk-to-a-human"
        }
      ]
    });
    document.head.appendChild(schema);

    return () => {
      const existing = document.getElementById('playbook-page-schema');
      if (existing) {
        document.head.removeChild(existing);
      }
    };
  }, []);

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
      title="AI Readability Playbook - Free Download | Found For AI"
      description="Download the AI Readability Playbook: the fastest fixes to help your business get discovered and recommended by AI search tools and assistants."
      canonical="https://foundforai.com/playbook"
    >
      <section className="py-10 md:py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            AI Readability Playbook
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            A 15 minute checklist to help your business show up when people ask AI who to hire.
          </p>

          <p className="text-muted-foreground mb-4">
            Get the 10 fastest fixes that make AI tools understand what you do, where you work, and why you can be trusted.
          </p>

          <div className="mb-6">
            <p className="font-semibold mb-2">What's inside</p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Services and locations clarity</li>
              <li>Trust signals AI looks for</li>
              <li>The basic structured data your site needs</li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Prefer done for you?{' '}
            <a href="https://foundforai.com/talk-to-a-human" className="underline hover:text-foreground transition-colors" data-testid="link-playbook-dfy">Talk to a human</a>.
          </p>

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
                  No spam. Instant download link.
                </p>
              </form>

              <div className="mt-6 pt-6 border-t text-center">
                <a
                  href="https://foundforai.com/talk-to-a-human"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-playbook-talk"
                >
                  Prefer to talk it through? <span className="underline">Talk to a human</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
}
