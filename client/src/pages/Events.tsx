import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';
import { EVENTS, upcomingEvents, pastEvents, buildEventSchema, type EventCard } from '@/data/events';

const PAGE_URL = 'https://foundforai.com/events';

const eventSeriesSchema = {
  '@type': 'EventSeries',
  '@id': 'https://foundforai.com/events#series',
  name: 'Found For AI Workshops',
  description:
    'Ongoing free workshops on AI visibility — helping businesses get recommended by ChatGPT, Gemini, Perplexity, and Claude.',
  url: PAGE_URL,
  organizer: { '@id': 'https://foundforai.com/#org' },
  subEvent: EVENTS.map(buildEventSchema),
};

const collectionPageSchema = {
  '@type': 'CollectionPage',
  '@id': `${PAGE_URL}#page`,
  url: PAGE_URL,
  name: 'AI Visibility Workshops & Events | Found For AI',
  description:
    'Free monthly workshops on AI visibility — learn how ChatGPT, Gemini, Perplexity, and Claude decide what businesses to recommend.',
  isPartOf: { '@id': 'https://foundforai.com/#website' },
  about: { '@id': 'https://foundforai.com/#org' },
  publisher: { '@id': 'https://foundforai.com/#org' },
};

const pageSchemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Events', url: PAGE_URL },
  ]),
  collectionPageSchema,
  eventSeriesSchema,
];

export default function Events() {
  const upcoming = upcomingEvents();
  const past = pastEvents();
  const featured = upcoming[0];
  const restUpcoming = upcoming.slice(1);

  return (
    <PageLayout
      title="AI Visibility Workshops & Events | Found For AI"
      description="Free monthly workshops on AI visibility — learn how ChatGPT, Gemini, Perplexity, and Claude decide what businesses to recommend, and what to fix on your site."
      canonical={PAGE_URL}
      schemas={pageSchemas}
    >
      {/* Hero */}
      <section className="border-b">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            Workshops &amp; Events
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Found For AI Events &amp; Workshops
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Free, practical workshops on AI visibility — learn what ChatGPT, Gemini, Perplexity,
            and Claude actually read on your site and what you need to fix to get recommended.
          </p>
        </div>
      </section>

      {/* Upcoming — featured */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Upcoming
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Next workshop</h2>
          </div>

          {featured ? (
            <FeaturedEventCard event={featured} />
          ) : (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                <p className="text-base">
                  The next workshop is being scheduled. Check back soon — or{' '}
                  <Link href="/audit" className="text-primary font-semibold hover:underline">
                    run a free AI visibility audit
                  </Link>{' '}
                  in the meantime.
                </p>
              </CardContent>
            </Card>
          )}

          {restUpcoming.length > 0 && (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {restUpcoming.map((e) => (
                <EventCardCompact key={e.slug} event={e} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past events */}
      <section className="py-16 md:py-20 border-t bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Past events
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Workshops we&rsquo;ve hosted
            </h2>
          </div>

          {past.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {past.map((e) => (
                <EventCardCompact key={e.slug} event={e} muted />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-muted-foreground">
                <p className="text-base">
                  The first Found For AI workshop is{' '}
                  <strong className="text-foreground">June 18, 2026</strong>. Recaps, slides, and
                  recordings from past events will live here as the series continues.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 md:py-24 border-t">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Want to know how AI sees your business right now?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Run the free AI visibility audit — it shows you what ChatGPT, Gemini, Perplexity, and
            Claude currently say about you, and what to fix.
          </p>
          <Link href="/audit">
            <Button
              size="lg"
              className="mt-8 font-semibold"
              style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
              data-testid="button-events-cta-audit"
            >
              Get my free audit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}

function FeaturedEventCard({ event }: { event: EventCard }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 md:p-10 grid gap-8 md:grid-cols-[1.4fr_1fr] items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              {event.cost}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Calendar className="h-3 w-3" />
              {event.dateLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
              <MapPin className="h-3 w-3" />
              {event.locationLabel}
            </span>
          </div>
          <h3 className="mt-5 text-2xl md:text-3xl font-bold tracking-tight leading-tight">
            {event.title}
          </h3>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            {event.blurb}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={event.registerUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="font-semibold"
                style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
                data-testid="button-events-register-featured"
              >
                Register Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Link href={`/events/${event.slug}`}>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold"
                data-testid="button-events-details-featured"
              >
                Event details
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-primary/5 border p-6 space-y-4">
          <DetailRow label="When" value={`${event.dateLabel} · ${event.timeLabel}`} />
          <DetailRow label="Where" value={event.locationLabel} />
          <DetailRow label="Cost" value={event.cost} />
        </div>
      </CardContent>
    </Card>
  );
}

function EventCardCompact({ event, muted = false }: { event: EventCard; muted?: boolean }) {
  return (
    <Link href={`/events/${event.slug}`}>
      <Card
        className={`h-full cursor-pointer hover-elevate transition-shadow ${
          muted ? 'opacity-90' : ''
        }`}
      >
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Calendar className="h-3 w-3" />
              {event.dateLabel}
            </span>
            {!muted && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                {event.cost}
              </span>
            )}
          </div>
          <h3 className="mt-3 text-lg font-bold leading-snug">{event.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{event.blurb}</p>
          <div className="mt-4 text-sm text-primary font-semibold">
            {muted ? 'View recap →' : 'View details →'}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-primary">{label}</div>
      <div className="mt-1 text-base text-foreground">{value}</div>
    </div>
  );
}
