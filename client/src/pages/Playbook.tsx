import { useState } from 'react';
import { useLocation } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';
import { trackEvent } from '@/lib/analytics';

const PLAYBOOK_ACCESS_KEY = 'ffa-playbook-access';
const PLAYBOOK_ACCESS_AT_KEY = 'ffa-playbook-access-at';

const playbookSchemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Playbook', url: 'https://foundforai.com/playbook' },
  ]),
  {
    '@type': 'WebPage',
    '@id': 'https://foundforai.com/playbook#webpage',
    name: 'AI Visibility Playbook',
    url: 'https://foundforai.com/playbook',
    description:
      'A free interactive 20-point checklist that shows small business owners why AI tools like ChatGPT, Google AI Overview, and Perplexity aren’t recommending them — and exactly what to fix first.',
    isPartOf: { '@id': 'https://foundforai.com/#website' },
    publisher: { '@id': 'https://foundforai.com/#org' },
    about: [
      'AI visibility',
      'AI search discovery',
      'structured data',
      'local service businesses',
    ],
    potentialAction: [
      {
        '@type': 'Action',
        name: 'Unlock the interactive playbook',
        target: 'https://foundforai.com/playbook/access',
      },
    ],
  },
  {
    '@type': 'HowTo',
    '@id': 'https://foundforai.com/playbook#howto',
    name: 'Make your business recommendable to AI',
    description:
      '20 checks across 5 sections that determine whether AI assistants like ChatGPT, Google AI Overview, Perplexity, and Claude will recommend your business.',
    totalTime: 'PT15M',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Who You Are',
        url: 'https://foundforai.com/playbook/access#section-01',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'What AI Actually Reads',
        url: 'https://foundforai.com/playbook/access#section-02',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'What’s Keeping You Invisible',
        url: 'https://foundforai.com/playbook/access#section-03',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Why AI Should Pick You',
        url: 'https://foundforai.com/playbook/access#section-04',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Can AI Explain You?',
        url: 'https://foundforai.com/playbook/access#section-05',
      },
    ],
  },
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
      const response = await fetch('https://formspree.io/f/mpqwvlnz', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          _subject: 'New AI Visibility Playbook request',
          _language: 'en',
        }),
      });

      if (response.ok) {
        try {
          window.localStorage.setItem(PLAYBOOK_ACCESS_KEY, email);
          window.localStorage.setItem(
            PLAYBOOK_ACCESS_AT_KEY,
            new Date().toISOString()
          );
        } catch {
          // localStorage unavailable in private mode — the access page
          // will redirect them back here, which is the right behavior.
        }

        trackEvent('access_playbook', {
          form_location: '/playbook',
          form_name: 'playbook_access',
        });

        setLocation('/playbook/access');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError(
        'Something went wrong. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout
      title="AI Visibility Playbook — Free Interactive Checklist | Found For AI"
      description="A free interactive 20-point checklist that shows small business owners why AI tools like ChatGPT, Google AI Overview, and Perplexity aren’t recommending them — and exactly what to fix first."
      canonical="https://foundforai.com/playbook"
      schemas={playbookSchemas}
    >
      <section className="py-10 md:py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            AI Visibility Playbook
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            A free interactive checklist that walks you through the 20 things
            AI systems actually check before they’ll recommend a business.
            About 15 minutes. Your progress saves automatically.
          </p>

          <p className="text-muted-foreground mb-4">
            When someone asks ChatGPT for a good HVAC company, yoga studio, or
            dentist in your area, AI gives them one or two names. Not ten blue
            links. One or two.
          </p>

          <p className="text-muted-foreground mb-4">
            If your business isn’t one of them, it’s usually not because you’re
            doing something wrong. It’s because your website was built for
            people to read — not for AI to understand.
          </p>

          <p className="text-muted-foreground mb-6">
            Score yourself, find your gaps, and walk away with a clear picture
            of what to fix first.
          </p>

          <div className="mb-8">
            <p className="font-semibold mb-2">What’s inside</p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>The 5 areas AI evaluates before recommending you</li>
              <li>A 20-point interactive checklist with progress saved per device</li>
              <li>Plain-language explanations (no developer-speak)</li>
              <li>A live score and tier analysis as you go</li>
              <li>A printable PDF version for your team</li>
            </ul>
          </div>

          <Card>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-base font-semibold">
                    Email
                  </Label>
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
                  <p
                    className="text-sm text-red-600 dark:text-red-400"
                    data-testid="text-playbook-error"
                  >
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-semibold group"
                  style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
                  disabled={loading}
                  data-testid="button-playbook-submit"
                >
                  {loading ? 'Unlocking…' : 'Unlock the interactive playbook'}
                  {!loading && (
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  No spam. We use your email to send you AI search insights
                  occasionally. Unsubscribe anytime.
                </p>
              </form>
            </CardContent>
          </Card>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Questions first?{' '}
            <a
              href="/book-call"
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
