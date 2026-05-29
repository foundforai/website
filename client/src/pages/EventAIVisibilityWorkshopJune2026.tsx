import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';

/* ───────────────────────────────────────────────────────────────────
 * Event constants — single place to update for this specific event.
 * Hub card data lives in client/src/data/events.ts.
 * ─────────────────────────────────────────────────────────────────── */

const EVENT = {
  slug: 'ai-visibility-workshop-june-2026',
  title: 'AI Visibility Workshop: Get Your Business Found For AI',
  hook:
    "AI search is replacing traditional rankings. If ChatGPT, Gemini, and Perplexity can't confidently understand your business, they won't recommend it. This workshop shows you exactly what to fix.",
  dateLabel: 'Thursday, June 18, 2026',
  timeLabel: '10:30–11:30 AM MDT',
  startISO: '2026-06-18T10:30:00-06:00',
  endISO: '2026-06-18T11:30:00-06:00',
  cost: 'Free',
  registerUrl: 'https://luma.com/gtpi1ef0',
  ogImage: '/events/ai-visibility-workshop-june-2026-og.png',
  venue: {
    name: 'Kiln',
    street: '1895 E Rodeo Walk Dr Suite B200',
    city: 'Holladay',
    region: 'UT',
    postal: '84117',
    country: 'US',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Kiln+1895+E+Rodeo+Walk+Dr+Suite+B200+Holladay+UT+84117',
  },
} as const;

const PAGE_URL = `https://foundforai.com/events/${EVENT.slug}`;
const OG_IMAGE_URL = `https://foundforai.com${EVENT.ogImage}`;

const SPEAKERS = [
  {
    name: 'Dustin Crump',
    role: 'Founder, Found For AI',
    bio:
      'Dustin built Found For AI to measure how ChatGPT, Gemini, Perplexity, and Claude describe — or ignore — small businesses. He works hands-on with operators on the technical and content changes that move AI visibility.',
    photo: '/events/dustin-crump.jpg',
  },
  {
    name: 'Brian Jolley',
    role: 'COO, Found For AI',
    bio:
      "Brian Jolley is COO of Found For AI, where he leads operations and the day-to-day work of installing AI visibility for local businesses. He works directly with operators on the changes that move the needle on AI recommendability.",
    photo: '/events/brian-jolley.jpg',
  },
];

const BENEFITS = [
  {
    title: 'How AI tools decide who to recommend',
    body:
      'Walk through how ChatGPT and Claude actually choose which businesses to mention when someone asks for a recommendation — and the signals that get a business included versus left out.',
  },
  {
    title: 'The technical foundations AI crawlers read',
    body:
      'See exactly what GPTBot, ClaudeBot, and PerplexityBot fetch from your site — robots.txt, structured data, server-rendered content — and where most small business sites fall short.',
  },
  {
    title: 'A practical guide you can apply immediately',
    body:
      'Leave with a short, prioritized checklist you can hand to your developer or run yourself — the highest-leverage changes to make your site more recommendable in the next 30 days.',
  },
];

const FAQS = [
  {
    q: 'Who should attend this workshop?',
    a: "This workshop is for small business owners, marketing leads, and founders who want their business mentioned when someone asks an AI tool like ChatGPT, Claude, Gemini, or Perplexity for a recommendation. It's most useful if you have a website and a business you want AI tools to understand and surface.",
  },
  {
    q: 'Is this workshop really free?',
    a: "Yes — the AI Visibility Workshop on June 18, 2026 is free to attend. There's no charge, no upsell at the door, and no required follow-up purchase. Seating at Kiln is limited, so registration through Luma is required.",
  },
  {
    q: 'Where is the workshop held?',
    a: "The workshop is at Kiln, 1895 E Rodeo Walk Dr Suite B200, Holladay, UT 84117. It's an in-person event on Thursday, June 18, 2026, from 10:30 to 11:30 AM MDT.",
  },
  {
    q: 'What will I walk away with?',
    a: "You'll leave with a clear understanding of how AI tools decide which businesses to recommend, the specific technical signals AI crawlers read on a website, and a prioritized checklist of changes you can apply to your own site in the days after the workshop.",
  },
];

/* ───────────────────────────────────────────────────────────────────
 * Schemas — merged into the global graph by SEOHead.
 * ─────────────────────────────────────────────────────────────────── */

const eventSchema = {
  '@type': 'Event',
  '@id': `${PAGE_URL}#event`,
  name: EVENT.title,
  description: EVENT.hook,
  startDate: EVENT.startISO,
  endDate: EVENT.endISO,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  image: [OG_IMAGE_URL],
  url: PAGE_URL,
  isPartOf: {
    '@type': 'EventSeries',
    '@id': 'https://foundforai.com/events#series',
    name: 'Found For AI Workshops',
    url: 'https://foundforai.com/events',
  },
  location: {
    '@type': 'Place',
    name: EVENT.venue.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: EVENT.venue.street,
      addressLocality: EVENT.venue.city,
      addressRegion: EVENT.venue.region,
      postalCode: EVENT.venue.postal,
      addressCountry: EVENT.venue.country,
    },
  },
  organizer: { '@id': 'https://foundforai.com/#org' },
  performer: [
    { '@type': 'Person', '@id': 'https://foundforai.com/#dustin-crump', name: 'Dustin Crump' },
    { '@type': 'Person', name: 'Brian Jolley' },
  ],
  offers: {
    '@type': 'Offer',
    url: EVENT.registerUrl,
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-05-29T00:00:00-06:00',
  },
};

const webPageSchema = {
  '@type': 'WebPage',
  '@id': `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: 'AI Visibility Workshop in Holladay, UT | Free Event | Found For AI',
  isPartOf: { '@id': 'https://foundforai.com/#website' },
  about: { '@id': 'https://foundforai.com/#org' },
  description:
    'Free AI visibility workshop in Holladay, UT — June 18, 2026. Learn how ChatGPT, Claude, Gemini, and Perplexity decide what businesses to recommend, and what to fix.',
  inLanguage: 'en-US',
  primaryImageOfPage: OG_IMAGE_URL,
};

const faqSchema = {
  '@type': 'FAQPage',
  '@id': `${PAGE_URL}#faq`,
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const pageSchemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Events', url: 'https://foundforai.com/events' },
    { name: EVENT.title, url: PAGE_URL },
  ]),
  webPageSchema,
  eventSchema,
  faqSchema,
];

/* ───────────────────────────────────────────────────────────────────
 * Page
 * ─────────────────────────────────────────────────────────────────── */

export default function EventAIVisibilityWorkshopJune2026() {
  return (
    <PageLayout
      title="AI Visibility Workshop in Holladay, UT | Free Event | Found For AI"
      description="Free AI visibility workshop in Holladay, UT — June 18, 2026. Learn how ChatGPT, Claude, Gemini, and Perplexity decide what businesses to recommend."
      canonical={PAGE_URL}
      ogImage={EVENT.ogImage}
      schemas={pageSchemas}
    >
      {/* Hero */}
      <section className="border-b">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20 text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold">
              {EVENT.cost}
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

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            {EVENT.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A one-hour, in-person workshop on what ChatGPT, Claude, Gemini, and Perplexity actually
            read on your site — and the specific changes that make them recommend your business.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={EVENT.registerUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="font-semibold text-base"
                style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
                data-testid="button-event-register-hero"
              >
                Register Now — It&rsquo;s Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="#logistics">
              <Button size="lg" variant="outline" className="font-semibold">
                See logistics
              </Button>
            </a>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Seating at Kiln is limited. Registration is through Luma.
          </p>
        </div>
      </section>

      {/* Why this matters */}
      <section className="py-16 md:py-20 bg-muted/30 border-b">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            Why this matters
          </div>
          <p className="mt-4 text-2xl md:text-3xl font-semibold leading-snug tracking-tight">
            {EVENT.hook}
          </p>
        </div>
      </section>

      {/* Benefit cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              What you&rsquo;ll learn
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Three things you&rsquo;ll take home
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <Card key={b.title} className="h-full">
                <CardContent className="p-6">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    0{i + 1}
                  </div>
                  <h3 className="mt-3 text-lg font-bold leading-snug">{b.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="py-16 md:py-24 bg-muted/30 border-y">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Speakers
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Who&rsquo;s leading the workshop
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SPEAKERS.map((s) => (
              <Card key={s.name} className="h-full">
                <CardContent className="p-6 flex gap-5">
                  <img
                    src={s.photo}
                    alt={`Headshot of ${s.name}, ${s.role}`}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover flex-none bg-muted"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{s.name}</h3>
                    <div className="text-xs font-semibold uppercase tracking-widest text-primary mt-1">
                      {s.role}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics */}
      <section id="logistics" className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Logistics
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">When &amp; where</h2>
          </div>

          <Card className="mt-10">
            <CardContent className="p-6 md:p-10 grid gap-8 md:grid-cols-2">
              <div className="space-y-5">
                <DetailBlock label="Date" value={EVENT.dateLabel} />
                <DetailBlock label="Time" value={EVENT.timeLabel} />
                <DetailBlock label="Cost" value={`${EVENT.cost} — registration required`} />
              </div>
              <div className="space-y-5">
                <DetailBlock label="Venue" value={EVENT.venue.name} />
                <DetailBlock
                  label="Address"
                  value={`${EVENT.venue.street}, ${EVENT.venue.city}, ${EVENT.venue.region} ${EVENT.venue.postal}`}
                />
                <a
                  href={EVENT.venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline"
                >
                  Open in Google Maps
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-muted/30 border-y">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Common questions
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Frequently asked</h2>
          </div>

          <div className="mt-10 space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-lg border bg-card p-5">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <span className="text-base font-semibold leading-snug">{f.q}</span>
                  <span className="text-primary text-xl leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="py-16 md:py-24" style={{ background: 'rgba(15, 95, 219, 0.06)' }}>
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Users className="h-3.5 w-3.5" />
            Seating limited
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Save Your Seat — Seating Limited
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {EVENT.cost} to attend · {EVENT.dateLabel} · {EVENT.venue.city}, {EVENT.venue.region}
          </p>
          <a href={EVENT.registerUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="mt-8 font-semibold text-base"
              style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
              data-testid="button-event-register-closing"
            >
              Save Your Seat
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
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
