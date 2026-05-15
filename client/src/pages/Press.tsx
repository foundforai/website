import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Mail, Phone, ArrowRight, Mic } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';

const PRESS_RELEASE = {
  slug: 'found-for-ai-launches-ai-operator-subscription',
  headline: 'Found For AI Launches Hybrid AI Operator Subscription for Local Businesses',
  fullHeadline:
    'Utah-Based Found For AI Launches Hybrid AI Operator Subscription to Help Local Businesses Get Recommended by AI',
  subhead:
    'After helping a Holladay hair salon go from invisible to the #1 AI-recommended result for "hair extensions in Salt Lake," founder Dustin Crump launches Found For AI with a hybrid model combining AI visibility implementation and ongoing optimization.',
  datePublished: '2026-05-15',
  dateModified: '2026-05-15',
  dateline: 'COTTONWOOD HEIGHTS, Utah — May 15, 2026',
  description:
    'Found For AI announces formal launch of the AI Operator Subscription — a hybrid model combining one-time AI visibility implementation with ongoing monthly optimization for local businesses.',
  url: 'https://foundforai.com/press#found-for-ai-launches-ai-operator-subscription',
};

const pressSchemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Press', url: 'https://foundforai.com/press' },
  ]),
  {
    '@type': 'CollectionPage',
    '@id': 'https://foundforai.com/press#page',
    url: 'https://foundforai.com/press',
    name: 'Press | Found For AI',
    description:
      'Press releases, announcements, and media resources from Found For AI — the AI visibility company helping local businesses get recommended by ChatGPT, Claude, Perplexity, and Google Gemini.',
    isPartOf: { '@id': 'https://foundforai.com/#website' },
    about: { '@id': 'https://foundforai.com/#org' },
    publisher: { '@id': 'https://foundforai.com/#org' },
  },
  {
    '@type': 'NewsArticle',
    '@id': PRESS_RELEASE.url,
    headline: PRESS_RELEASE.headline,
    alternativeHeadline: PRESS_RELEASE.fullHeadline,
    description: PRESS_RELEASE.description,
    datePublished: PRESS_RELEASE.datePublished,
    dateModified: PRESS_RELEASE.dateModified,
    inLanguage: 'en-US',
    isPartOf: { '@id': 'https://foundforai.com/press#page' },
    mainEntityOfPage: { '@id': 'https://foundforai.com/press#page' },
    author: { '@id': 'https://foundforai.com/#dustin-crump' },
    publisher: { '@id': 'https://foundforai.com/#org' },
    image: 'https://foundforai.com/found-for-ai-logo-white.png',
    articleSection: 'Press Release',
    keywords: [
      'AI visibility',
      'AI Operator Subscription',
      'AI SEO',
      'AEO',
      'Found For AI',
      'local business AI',
      'ChatGPT recommendations',
    ],
    about: { '@id': 'https://foundforai.com/#org' },
    mentions: [
      {
        '@type': 'LocalBusiness',
        name: 'Loxxie Hair',
        description:
          'Hair extensions specialist salon in Holladay, Utah offering tape-ins, hand-tied wefts, clip-ins, I-tips, and ponytail extensions.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Holladay',
          addressRegion: 'UT',
          addressCountry: 'US',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          bestRating: '5',
        },
      },
    ],
  },
];

interface ReleaseSectionProps {
  heading?: string;
  children: React.ReactNode;
}

function ReleaseSection({ heading, children }: ReleaseSectionProps) {
  return (
    <div className="mb-8">
      {heading && (
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">{heading}</h3>
      )}
      <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}

interface PullQuoteProps {
  quote: string;
  attribution: string;
  role: string;
}

function PullQuote({ quote, attribution, role }: PullQuoteProps) {
  return (
    <blockquote className="border-l-4 border-primary bg-primary/5 pl-6 pr-4 py-4 my-6 rounded-r-md">
      <p className="text-base md:text-lg italic text-foreground mb-3">&ldquo;{quote}&rdquo;</p>
      <footer className="text-sm font-medium text-muted-foreground not-italic">
        — <span className="text-foreground font-semibold">{attribution}</span>, {role}
      </footer>
    </blockquote>
  );
}

export default function Press() {
  return (
    <PageLayout
      title="Press | Found For AI"
      description="Press releases, announcements, and media resources from Found For AI — helping local businesses get recommended by AI assistants."
      canonical="https://foundforai.com/press"
      schemas={pressSchemas}
    >
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Press &amp; Announcements
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Press
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Official news, announcements, and media resources from Found For AI.
          </p>
        </div>
      </section>

      {/* Latest Press Release */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
              For Immediate Release · {PRESS_RELEASE.dateline}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
              {PRESS_RELEASE.fullHeadline}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground italic leading-relaxed">
              {PRESS_RELEASE.subhead}
            </p>
          </div>

          <article className="prose-content">
            <ReleaseSection>
              <p>
                Found For AI, a Utah-based company helping small businesses become discoverable
                and recommendable by AI tools like ChatGPT, Claude, Perplexity, and Google Gemini,
                today announced its formal launch and the introduction of its AI Operator
                Subscription.
              </p>
              <p>
                The company combines one-time AI visibility implementation with ongoing monthly
                optimization and monitoring. This hybrid approach helps local businesses not only
                get recommended by AI assistants but stay visible as AI systems evolve.
              </p>
              <p>
                The launch is backed by a real-world proof point with Loxxie Hair, a hair
                extensions specialist in Holladay, Utah. Before working with Found For AI, the
                salon did not appear in major AI chatbots for queries like &ldquo;where can I get
                hair extensions in Salt Lake.&rdquo; Within three weeks of implementation, Loxxie
                Hair became the top recommendation in both ChatGPT and Claude.
              </p>
            </ReleaseSection>

            <PullQuote
              quote={`I don't know what the *#%& they did, but our phones are ringing off the hook and we're getting tons more foot traffic.`}
              attribution="Kellie Barland"
              role="Owner, Loxxie Hair"
            />

            <ReleaseSection heading="Why AI Visibility Matters for Local Businesses">
              <p>
                As millions of consumers shift from traditional search to asking AI assistants for
                local recommendations, many small businesses are becoming invisible. Found For AI
                helps close that gap through structured data implementation, entity grounding, and
                ongoing optimization — so AI systems can clearly understand and recommend the
                business.
              </p>
            </ReleaseSection>

            <PullQuote
              quote="A lot of business owners assume their existing SEO will carry over to AI. There's overlap, but AI reads structured data and entity signals differently. Our hybrid model gives businesses both the initial fix and the ongoing work needed to maintain visibility."
              attribution="Dustin Crump"
              role="Founder, Found For AI"
            />

            <ReleaseSection heading="The AI Operator Subscription">
              <p>Found For AI offers a clear path for small businesses:</p>
              <ul className="space-y-3 pl-1">
                <li>
                  <strong className="text-foreground">Onboarding — $997 one-time:</strong> Full AI
                  visibility audit, data layer installation, and initial optimizations delivered in
                  seven business days with a 60-day guarantee.
                </li>
                <li>
                  <strong className="text-foreground">Starter — $299/month:</strong> Ongoing
                  monitoring, monthly audits, and up to two optimizations per month.
                </li>
                <li>
                  <strong className="text-foreground">Growth — $599/month:</strong> Everything in
                  Starter, plus custom automation workflows to help operations scale with increased
                  visibility.
                </li>
              </ul>
              <p>
                The model is designed specifically for owner-operated local businesses that want
                the work handled for them rather than another dashboard to manage.
              </p>
            </ReleaseSection>

            <ReleaseSection heading="Built in Utah, for Utah Small Businesses">
              <p>
                Crump, who has lived in Utah since age 11, intentionally based the company in the
                state.
              </p>
            </ReleaseSection>

            <PullQuote
              quote="Utah has a real spirit of helping each other succeed. I want Found For AI to be part of what helps local service businesses win as technology shifts."
              attribution="Dustin Crump"
              role="Founder, Found For AI"
            />

            <ReleaseSection>
              <p>
                Found For AI primarily serves local service businesses and owner-operators across
                Utah and beyond.
              </p>
            </ReleaseSection>
          </article>

          {/* Boilerplate */}
          <div className="mt-12 pt-10 border-t border-border space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-2">About Found For AI</h3>
              <p className="text-muted-foreground leading-relaxed">
                Found For AI is an AI visibility company based in Cottonwood Heights, Utah. It
                helps small businesses become recommendable by AI assistants through its AI
                Operator Subscription, which combines implementation with ongoing optimization and
                monitoring. Learn more at{' '}
                <Link href="/" className="text-primary hover:underline font-medium">
                  foundforai.com
                </Link>
                .
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">About Loxxie Hair</h3>
              <p className="text-muted-foreground leading-relaxed">
                Loxxie Hair is a hair extensions specialist salon in Holladay, Utah, offering
                tape-ins, hand-tied wefts, clip-ins, I-tips, and ponytail extensions. The salon is
                rated 4.9 stars and serves clients across the Salt Lake Valley.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-16 md:py-20 bg-muted/30 border-y border-border">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">Media Contact</h2>
          <p className="text-center text-muted-foreground mb-10">
            For interviews, quotes, or additional information.
          </p>
          <Card className="border-2 border-border">
            <CardContent className="p-8 md:p-10">
              <div className="text-center mb-6">
                <p className="text-xl font-bold text-foreground">Dustin Crump</p>
                <p className="text-muted-foreground">Founder, Found For AI</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:info@foundforai.com"
                  className="inline-flex items-center justify-center gap-2 text-primary hover:underline font-medium"
                  data-testid="link-press-email"
                >
                  <Mail className="h-4 w-4" />
                  info@foundforai.com
                </a>
                <span className="hidden sm:inline text-muted-foreground">·</span>
                <a
                  href="tel:+18018982456"
                  className="inline-flex items-center justify-center gap-2 text-primary hover:underline font-medium"
                  data-testid="link-press-phone"
                >
                  <Phone className="h-4 w-4" />
                  +1 (801) 898-2456
                </a>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-8 pt-6 border-t border-border">
                <strong className="text-foreground">Verification:</strong> Live AI query results
                confirming Loxxie Hair as the top recommendation for &ldquo;where can I get hair
                extensions in Salt Lake&rdquo; on ChatGPT and Claude are available upon request.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Media / Podcast Cross-Link */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <Mic className="h-10 w-10 text-accent mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-3">More from Found For AI</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Podcast appearances, interviews, and other media featuring the Found For AI team.
          </p>
          <Link href="/media">
            <Button size="lg" className="font-semibold gap-2" data-testid="button-press-to-media">
              See Media &amp; Podcast Appearances
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
