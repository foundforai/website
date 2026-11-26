import { useMemo, type ReactNode } from 'react';
import PageLayout from '@/components/PageLayout';
import HostingRequestForm from '@/components/community/HostingRequestForm';
import WorkshopRegistrationForm from '@/components/community/WorkshopRegistrationForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';
import { upcomingEventSchema } from '@/lib/community/schema';
import { useCommunityEvents } from '@/lib/community/use-events';
import type { PublicEvent } from '@/lib/community/types';

const PAGE_URL = 'https://foundforai.com/events';

const collectionPageSchema = {
  '@type': 'CollectionPage',
  '@id': `${PAGE_URL}#page`,
  url: PAGE_URL,
  name: 'AI Visibility Workshops & Events | Found For AI',
  description:
    'Workshops from Found For AI on AI visibility. See past sessions, including the June 18, 2026 workshop in Holladay, and ask about a future session.',
  isPartOf: { '@id': 'https://foundforai.com/#website' },
  about: { '@id': 'https://foundforai.com/#org' },
  publisher: { '@id': 'https://foundforai.com/#org' },
};

export default function Events() {
  const { events } = useCommunityEvents();
  const upcoming = events.filter((event) => event.timing === 'upcoming');
  const past = events.filter((event) => event.timing === 'past').sort((a, b) => b.start.localeCompare(a.start));
  const featured = upcoming[0];
  const restUpcoming = upcoming.slice(1);
  const pageSchemas = useMemo(() => {
    const scheduled = upcoming.map((event) => upcomingEventSchema(event)).filter((schema): schema is Record<string, unknown> => Boolean(schema));
    return [
      breadcrumbList([
        { name: 'Home', url: 'https://foundforai.com/' },
        { name: 'Events', url: PAGE_URL },
      ]),
      collectionPageSchema,
      ...(scheduled.length
        ? [{
            '@type': 'EventSeries',
            '@id': 'https://foundforai.com/events#series',
            name: 'Found For AI Workshops',
            description: 'Scheduled workshops from Found For AI and sister-company sessions listed with their host.',
            url: PAGE_URL,
            organizer: { '@id': 'https://foundforai.com/#org' },
            subEvent: scheduled,
          }]
        : []),
    ];
  }, [upcoming]);

  return (
    <PageLayout
      title="AI Visibility Workshops & Events | Found For AI"
      description="Workshops from Found For AI on AI visibility. See past sessions, including the June 18, 2026 workshop in Holladay, and ask about a future session."
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
            Free, practical workshops on AI visibility. Learn what ChatGPT, Gemini, Perplexity,
            and Claude actually read on your site and what you need to fix to get recommended.
          </p>
        </div>
      </section>

      {/* Upcoming featured */}
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
              <CardContent className="py-10 text-center">
                <p className="text-base text-foreground">No workshops scheduled yet.</p>
                <a
                  href="#host-a-workshop"
                  className="mt-4 inline-flex text-primary font-semibold hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Request a workshop
                </a>
              </CardContent>
            </Card>
          )}

          <WorkshopRegistrationForm events={events} sourceBrand="foundforai" />

          {restUpcoming.length > 0 && (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {restUpcoming.map((e) => (
                <EventCardCompact key={e.id} event={e} />
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
              Previous
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Previous workshops
            </h2>
          </div>

          {past.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {past.map((e) => (
                <EventCardCompact key={e.id} event={e} muted />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-muted-foreground">
                <p className="text-base">
                  Explore past community teaching and practical AI projects on our{' '}
                  <Link
                    href="/community"
                    className="text-primary font-semibold hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    community page
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          )}

          <div className="mt-10 max-w-3xl">
            <h3 className="text-2xl font-bold tracking-tight">
              Community learning and practical projects
            </h3>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              See Dustin’s earlier ChatGPT meetup experience, examples of business AI work, and ideas
              for future community workshops.
            </p>
            <p className="mt-4">
              <Link
                href="/community"
                className="text-primary font-semibold hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Explore our community page
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section id="host-a-workshop" className="py-16 md:py-20 border-t scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            Workshop hosting request
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Request a workshop</h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Ask Found For AI to host a practical session for your team, chamber, library, or coworking space.
            This request is separate from marketing email.
          </p>
          <HostingRequestForm sourceBrand="foundforai" />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 md:py-24 border-t">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Want to know how AI sees your business right now?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Run the free AI visibility audit. It shows you what ChatGPT, Gemini, Perplexity, and
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

function FeaturedEventCard({ event }: { event: PublicEvent }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 md:p-10 grid gap-8 md:grid-cols-[1.4fr_1fr] items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              Free
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-muted text-foreground text-xs font-semibold">
              {event.hostLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Calendar className="h-3 w-3" />
              {event.dateLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
              <MapPin className="h-3 w-3" />
              {event.venue || 'Online'}
            </span>
          </div>
          <h3 className="mt-5 text-2xl md:text-3xl font-bold tracking-tight leading-tight">
            {event.title}
          </h3>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            {event.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#register">
              <Button
                size="lg"
                className="font-semibold"
                style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
                data-testid="button-events-register-featured"
              >
                Register
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            {event.id === 'ai-visibility-workshop-june-2026' ? (
              <Link href="/events/ai-visibility-workshop-june-2026">
                <Button size="lg" variant="outline" className="font-semibold">
                  Event details
                </Button>
              </Link>
            ) : null}
          </div>
        </div>

        <div className="rounded-lg bg-primary/5 border p-6 space-y-4">
          <DetailRow label="When" value={`${event.dateLabel} · ${event.timeLabel}`} />
          <DetailRow label="Where" value={event.venue || event.onlineUrl || 'To be announced'} />
          <DetailRow label="Host" value={event.hostLabel} />
        </div>
      </CardContent>
    </Card>
  );
}

function EventCardCompact({ event, muted = false }: { event: PublicEvent; muted?: boolean }) {
  return (
    <CardLink event={event}>
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
            {muted ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                Past workshop
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                {event.hostLabel}
              </span>
            )}
          </div>
          <h3 className="mt-3 text-lg font-bold leading-snug">{event.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
          <div className="mt-4 text-sm text-primary font-semibold">
            {muted ? 'View event details' : 'View details'}
          </div>
        </CardContent>
      </Card>
    </CardLink>
  );
}

function CardLink({ event, children }: { event: PublicEvent; children: ReactNode }) {
  if (event.id === 'ai-visibility-workshop-june-2026') {
    return <Link href="/events/ai-visibility-workshop-june-2026">{children}</Link>;
  }
  return <div>{children}</div>;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-primary">{label}</div>
      <div className="mt-1 text-base text-foreground">{value}</div>
    </div>
  );
}
