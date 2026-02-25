import { useState } from 'react';
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
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Readability Playbook
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            The fastest fixes to help your business get discovered and recommended by AI search and assistants, with a simple checklist you can use in 15 minutes.
          </p>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4 mb-10">
            <p>
              More and more people are asking AI tools like ChatGPT, Gemini, and Perplexity who to hire, where to go, and what to buy. If your business isn't structured so AI can read and trust it, you won't show up. This playbook walks you through the fastest clarity and trust fixes to become recommendable.
            </p>
            <p>
              If you'd rather have someone handle it for you, our AI Visibility Tune-Up covers the full implementation so you can skip the checklist and go straight to results.
            </p>
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
                  We'll email you the download link instantly.
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
