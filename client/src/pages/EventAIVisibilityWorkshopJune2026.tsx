import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import CommunityPhotoGrid from '@/components/CommunityPhotoGrid';
import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';
import { cn } from '@/lib/utils';
import { EVENTS } from '@/data/events';
import { JUNE_2026_WORKSHOP_PHOTOS } from '@/data/community';

function requireJuneWorkshop() {
  const found = EVENTS.find((item) => item.slug === 'ai-visibility-workshop-june-2026');
  if (!found) {
    throw new Error('Missing June 2026 workshop event');
  }
  return found;
}

const event = requireJuneWorkshop();

const PAGE_URL = `https://foundforai.com/events/${event.slug}`;
const TITLE = 'AI Visibility Workshop in Holladay, UT | June 18, 2026 | Found For AI';
const DESCRIPTION =
  'The AI Visibility Workshop was held in Holladay, UT on June 18, 2026. A one-hour session on how ChatGPT, Claude, Gemini, and Perplexity decide which businesses to recommend.';

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Kiln+1895+E+Rodeo+Walk+Dr+Suite+B200+Holladay+UT+84117';

const SPEAKERS = [
  {
    name: 'Dustin Crump',
    role: 'Founder, Found For AI',
    bio:
      'Dustin built Found For AI to measure how ChatGPT, Gemini, Perplexity, and Claude describe, or ignore, small businesses. He works hands-on with operators on the technical and content changes that move AI visibility.',
    photo: '/events/dustin-crump.jpg',
  },
  {
    name: 'Brian Jolley',
    role: 'COO, Found For AI',
    bio:
      'Brian Jolley is COO of Found For AI, where he leads operations and the day-to-day work of installing AI visibility for local businesses. He works directly with operators on the changes that move the needle on AI recommendability.',
    photo: '/events/brian-jolley.jpg',
  },
];

const TOPICS = [
  {
    title: 'How AI tools decide who to recommend',
    body:
      'How ChatGPT and Claude choose which businesses to mention when someone asks for a recommendation, and the signals that get a business included or left out.',
  },
  {
    title: 'The technical foundations AI crawlers read',
    body:
      'What GPTBot, ClaudeBot, and PerplexityBot fetch from a site, including robots.txt, structured data, and server-rendered content, and where many small business sites fall short.',
  },
  {
    title: 'A short list of website changes',
    body:
      'The highest-leverage website changes that make a site more recommendable, organized as a short prioritized list an owner or developer can apply.',
  },
];

const FAQS = [
  {
    q: 'Who was this workshop for?',
    a: 'This workshop was for small business owners, marketing leads, and founders who want their business mentioned when someone asks an AI tool like ChatGPT, Claude, Gemini, or Perplexity for a recommendation. It was most useful for people with a website and a business they want AI tools to understand.',
  },
  {
    q: 'Was this workshop free?',
    a: 'Yes. The AI Visibility Workshop on June 18, 2026 was free to attend. There was no charge for the session.',
  },
  {
    q: 'Where was the workshop held?',
    a: 'The workshop was at Kiln, 1895 E Rodeo Walk Dr Suite B200, Holladay, UT 84117. It was an in-person event on Thursday, June 18, 2026, from 10:30 to 11:30 AM MDT.',
  },
  {
    q: 'What was the workshop about?',
    a: 'The workshop focused on how AI tools decide which businesses to recommend, which technical signals AI crawlers read on a website, and which changes are worth making first.',
  },
];

const webPageSchema = {
  '@type': 'WebPage',
  '@id': `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: TITLE,
  isPartOf: { '@id': 'https://foundforai.com/#website' },
  about: { '@id': 'https://foundforai.com/#org' },
  description: DESCRIPTION,
  inLanguage: 'en-US',
  primaryImageOfPage: `https://foundforai.com${event.image}`,
};

const faqSchema = {
  '@type': 'FAQPage',
  '@id': `${PAGE_URL}#faq`,
  mainEntity: FAQS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const pageSchemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Events', url: 'https://foundforai.com/events' },
    { name: event.title, url: PAGE_URL },
  ]),
  webPageSchema,
  faqSchema,
];

const textLink =
  'inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

const primaryAction = cn(
  buttonVariants({ size: 'lg' }),
  'font-semibold whitespace-normal h-auto text-center',
);

const secondaryAction = cn(
  buttonVariants({ variant: 'outline', size: 'lg' }),
  'font-semibold whitespace-normal h-auto text-center',
);

export default function EventAIVisibilityWorkshopJune2026() {
  return (
    <PageLayout
      title={TITLE}
      description={DESCRIPTION}
      canonical={PAGE_URL}
      ogImage={event.image}
      schemas={pageSchemas}
    >
      <section className="border-b">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20 text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-semibold">
              Past workshop
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              Hosted by FoundForAI
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              <Calendar className="h-3.5 w-3.5" />
              June 18, 2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-semibold">
              <MapPin className="h-3.5 w-3.5" />
              Holladay, UT
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {event.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            This free, one-hour workshop was held in person on {event.dateLabel}, from {event.timeLabel},
            at Kiln in Holladay, Utah. It focused on what ChatGPT, Claude, Gemini, and Perplexity read
            on a business website, and the changes that help them recommend the business.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#logistics" className={secondaryAction}>
              See logistics
            </a>
            <Link
              href="/community"
              className={primaryAction}
              style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
            >
              Explore community work
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30 border-b">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            Why this mattered
          </div>
          <p className="mt-4 text-2xl md:text-3xl font-semibold leading-snug tracking-tight">
            {event.description}
          </p>
        </div>
      </section>

      {JUNE_2026_WORKSHOP_PHOTOS.length > 0 ? (
        <section className="py-16 md:py-20 border-b" aria-labelledby="workshop-photos-heading">
          <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 id="workshop-photos-heading" className="text-3xl md:text-4xl font-bold tracking-tight">
              From the workshop
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl">
              Photos from the June 18, 2026 session at Kiln in Holladay.
            </p>
            <CommunityPhotoGrid photos={JUNE_2026_WORKSHOP_PHOTOS} />
          </div>
        </section>
      ) : null}

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              What the session focused on
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Three topics from the workshop
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TOPICS.map((topic, index) => (
              <Card key={topic.title} className="h-full">
                <CardContent className="p-6">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    0{index + 1}
                  </div>
                  <h3 className="mt-3 text-lg font-bold leading-snug">{topic.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{topic.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30 border-y">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Speakers
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Speakers
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SPEAKERS.map((speaker) => (
              <Card key={speaker.name} className="h-full">
                <CardContent className="p-6 flex gap-5">
                  <img
                    src={speaker.photo}
                    alt={`Headshot of ${speaker.name}, ${speaker.role}`}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover flex-none bg-muted"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{speaker.name}</h3>
                    <div className="text-xs font-semibold uppercase tracking-widest text-primary mt-1">
                      {speaker.role}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{speaker.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="logistics" className="py-16 md:py-24 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Logistics
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">When and where</h2>
          </div>

          <Card className="mt-10">
            <CardContent className="p-6 md:p-10 grid gap-8 md:grid-cols-2">
              <div className="space-y-5">
                <DetailBlock label="Date" value={event.dateLabel} />
                <DetailBlock label="Time" value={event.timeLabel} />
                <DetailBlock label="Cost" value={event.cost} />
              </div>
              <div className="space-y-5">
                <DetailBlock label="Venue" value={event.location.name} />
                <DetailBlock
                  label="Address"
                  value={`${event.location.street}, ${event.location.city}, ${event.location.region} ${event.location.postal}`}
                />
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={textLink}>
                  Open in Google Maps
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30 border-y">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Common questions
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Frequently asked</h2>
          </div>

          <div className="mt-10 space-y-3">
            {FAQS.map((item) => (
              <details key={item.q} className="group rounded-lg border bg-card p-5">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <span className="text-base font-semibold leading-snug">{item.q}</span>
                  <span className="text-primary text-xl leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Interested in a future session?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No upcoming workshop dates are currently announced. If you want a session for your team
            or a local group, get in touch.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className={primaryAction}
              style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
            >
              Get in touch
            </Link>
            <Link
              href="/events"
              className="text-primary font-semibold hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              View events
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-primary">{label}</div>
      <div className="mt-2 text-base text-foreground">{value}</div>
    </div>
  );
}
