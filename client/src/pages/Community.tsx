import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import CommunityPhotoGrid from '@/components/CommunityPhotoGrid';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EVENTS } from '@/data/events';
import {
  COMMUNITY_TESTIMONIALS,
  EARLIER_MEETUP_PHOTOS,
  JUNE_2026_WORKSHOP_PHOTOS,
} from '@/data/community';
import {
  COMMUNITY_DESCRIPTION,
  COMMUNITY_FAQS,
  COMMUNITY_OG_IMAGE,
  COMMUNITY_PAGE_URL,
  COMMUNITY_TITLE,
  buildCommunitySchemas,
} from '@/data/community-schema';

const PAGE_URL = COMMUNITY_PAGE_URL;
const TITLE = COMMUNITY_TITLE;
const DESCRIPTION = COMMUNITY_DESCRIPTION;

const juneWorkshop = EVENTS.find((event) => event.slug === 'ai-visibility-workshop-june-2026');

const linkClass =
  'text-primary font-semibold hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

const primaryAction = cn(
  buttonVariants({ size: 'lg' }),
  'font-semibold whitespace-normal h-auto text-center',
);

const secondaryAction = cn(
  buttonVariants({ variant: 'outline', size: 'lg' }),
  'font-semibold whitespace-normal h-auto text-center',
);

const pageSchemas = buildCommunitySchemas();

const GROGAN_METRICS = [
  '48 vending machines',
  'Approximately 2 years in production',
  'About 3 hours saved per day',
];

const WORKSHOP_TOPICS = [
  'Writing clearer ChatGPT prompts using real business tasks.',
  'Drafting and reviewing useful customer communications.',
  'Identifying repetitive work that may benefit from AI assistance.',
  'Checking AI-generated answers and deciding what information to share.',
];

export default function Community() {
  return (
    <PageLayout
      title={TITLE}
      description={DESCRIPTION}
      canonical={PAGE_URL}
      ogImage={COMMUNITY_OG_IMAGE}
      schemas={pageSchemas}
    >
      <section className="border-b">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            Community &amp; practical AI
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Practical AI for local small businesses
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Useful AI starts with everyday business needs. I’m Dustin Crump, founder of Found For AI.
            I’ve helped local business owners learn to use ChatGPT and built AI integrations for real
            business operations. This page brings together that teaching experience, examples of my
            work, and ideas for future workshops.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#past-meetups"
              className={primaryAction}
              style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
            >
              Explore past meetups
            </a>
            <Link href="/contact" className={secondaryAction}>
              Ask about a workshop
            </Link>
          </div>
        </div>
      </section>

      <section id="past-meetups" className="py-16 md:py-20 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Helping business owners get more from ChatGPT
          </h2>
          <div className="mt-6 space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              I previously hosted local meetups where small-business owners could learn how to use
              ChatGPT more effectively. The focus was practical: making the technology easier to
              understand and more useful in day-to-day work.
            </p>
            <p>
              It has been a while since the last meetup. These are past sessions, and I’d like to
              build on that experience with future workshops shaped around what local business owners
              need.
            </p>
          </div>
          <CommunityPhotoGrid photos={EARLIER_MEETUP_PHOTOS} />

          {juneWorkshop ? (
            <article className="mt-12">
              <h3 className="text-2xl font-bold tracking-tight">
                AI Visibility Workshop, June 18, 2026
              </h3>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                On June 18, 2026, Found For AI held a free, in-person workshop at Kiln in Holladay,
                Utah, from {juneWorkshop.timeLabel}. The session focused on what ChatGPT, Gemini,
                Perplexity, and Claude read on a business website, and what to change so they can
                recommend the business.
              </p>
              <CommunityPhotoGrid photos={JUNE_2026_WORKSHOP_PHOTOS} eager />
              <p className="mt-6">
                <Link href={`/events/${juneWorkshop.slug}`} className={linkClass}>
                  View the workshop page
                </Link>
              </p>
            </article>
          ) : null}
        </div>
      </section>

      <section className="py-16 md:py-20 border-t bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Practical AI in real businesses
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            Teaching and implementation inform each other. These projects show the kind of practical
            business work behind my approach.
          </p>

          <article className="mt-10">
            <h3 className="text-2xl font-bold">Grogan Vending</h3>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              I built an AI solution for Grogan Vending, a business operating 48 vending machines. As
              of November 2026, the solution had been in production for approximately two years,
              saving about three hours of work per day.
            </p>
            <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-3">
              {GROGAN_METRICS.map((metric) => (
                <li key={metric} className="rounded-lg border bg-card p-4 min-w-0 text-sm font-semibold leading-snug">
                  {metric}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Project figures reported by Dustin Crump as of November 2026. Time savings are
              approximate.
            </p>
          </article>

          <article className="mt-12">
            <h3 className="text-2xl font-bold">Goldsberry Orthodontics</h3>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              I built an integration using the Model Context Protocol (MCP) for Goldsberry
              Orthodontics. MCP gives compatible AI assistants a way to connect with the information
              and tools an integration makes available.
            </p>
            <p className="mt-4">
              <Link href="/blog/goldsberry-orthodontics-ai-actions" className={linkClass}>
                Read the Goldsberry Orthodontics article
              </Link>
            </p>
          </article>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What future workshops could cover
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            I’d like to offer more hands-on opportunities for local business owners to explore AI.
            Potential topics include:
          </p>
          <ul className="mt-6 space-y-3 text-base md:text-lg text-muted-foreground leading-relaxed list-disc pl-5">
            {WORKSHOP_TOPICS.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            No upcoming workshop dates are currently announced. Interested in attending or hosting a
            session? Get in touch and tell me what would be useful for your business.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/contact"
              className={primaryAction}
              style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
            >
              Ask about future workshops
            </Link>
            <Link href="/events" className={linkClass}>
              View events and workshop updates
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t bg-muted/30" aria-labelledby="community-faq-heading">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 id="community-faq-heading" className="text-3xl md:text-4xl font-bold tracking-tight">
            Common questions
          </h2>
          <div className="mt-8 space-y-8">
            {COMMUNITY_FAQS.map((item) => (
              <div key={item.q}>
                <h3 className="text-xl font-semibold">{item.q}</h3>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {COMMUNITY_TESTIMONIALS.length > 0 ? (
        <section className="py-16 md:py-20 border-t bg-muted/30">
          <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">From business owners</h2>
            <div className="mt-8 space-y-6">
              {COMMUNITY_TESTIMONIALS.map((item) => (
                <figure key={item.attribution} className="rounded-lg border bg-card p-6">
                  <blockquote className="text-lg leading-relaxed">{item.quote}</blockquote>
                  <figcaption className="mt-4 text-sm text-muted-foreground">
                    {item.attribution}
                    {item.detail ? `, ${item.detail}` : ''}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-16 md:py-24 border-t">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Bring a practical AI question
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Have a business task you’d like to improve, or a group interested in learning together?
            Tell me what you’re working on.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className={primaryAction}
              style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
            >
              Get in touch
            </Link>
            <Link href="/events" className={linkClass}>
              View events
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
