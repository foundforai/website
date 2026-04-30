import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ExternalLink, Youtube, Globe } from 'lucide-react';

const smallLakeSchemas = [
  {
    "@type": "PodcastEpisode",
    "@id": "https://foundforai.com/media/small-lake-city-podcast#episode",
    "name": "How to Slide Into the Consciousness of AI — with Dustin Crump",
    "url": "https://foundforai.com/media/small-lake-city-podcast",
    "sameAs": [
      "https://www.smalllakepod.com/episodes/dustin-crump-foundforai",
      "https://open.spotify.com/episode/6hY9YVGJlwd8ifDMIuRGIj",
      "https://youtu.be/VqFTeqxGR9s"
    ],
    "datePublished": "2025-04-01",
    "description": "Dustin Crump of Found For AI discusses AI visibility, Answer Engine Optimization, structured data, and how local businesses can get found and recommended by AI assistants like ChatGPT, Claude, and Gemini.",
    "keywords": ["AI visibility", "Answer Engine Optimization", "AEO", "AI search", "schema markup", "structured data", "Found For AI", "Dustin Crump"],
    "partOfSeries": {
      "@type": "PodcastSeries",
      "name": "Small Lake City Podcast",
      "url": "https://www.smalllakepod.com"
    },
    "author": { "@id": "https://foundforai.com/#dustin-crump" },
    "publisher": {
      "@type": "Organization",
      "name": "Small Lake City Podcast",
      "url": "https://www.smalllakepod.com"
    }
  },
  {
    "@type": "BreadcrumbList",
    "@id": "https://foundforai.com/media/small-lake-city-podcast#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://foundforai.com" },
      { "@type": "ListItem", "position": 2, "name": "Media", "item": "https://foundforai.com/media" },
      { "@type": "ListItem", "position": 3, "name": "Small Lake City Podcast", "item": "https://foundforai.com/media/small-lake-city-podcast" }
    ]
  }
];

export default function MediaEpisodeSmallLake() {
  const quotes = [
    "How do you slide into the consciousness of AI where it will recommend your business?",
    "I look at your site and I'm like, wow, it's a really good site for humans. But what about the robots?",
    "AI is hungry for your events. It wants to give you what you want.",
  ];

  return (
    <PageLayout
      title="How to Slide Into the Consciousness of AI | Small Lake City Podcast | Found For AI"
      description="Dustin Crump of Found For AI on the Small Lake City Podcast — covering AI visibility, why businesses are invisible to AI search, and how the AI visibility layer works. Full episode and transcript."
      canonical="https://foundforai.com/media/small-lake-city-podcast"
      schemas={smallLakeSchemas}
    >
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground mb-8" data-testid="nav-breadcrumb">
            <Link href="/" data-testid="link-breadcrumb-home">
              <span className="hover:text-primary transition-colors">Home</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/media" data-testid="link-breadcrumb-media">
              <span className="hover:text-primary transition-colors">Media</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground" data-testid="text-breadcrumb-current">Small Lake City Podcast</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-page-title">
            How to Slide Into the Consciousness of AI
          </h1>
          <p className="text-lg text-muted-foreground mb-10" data-testid="text-page-subheading">
            Small Lake City Podcast — Episode with Dustin Crump, Founder of Found For AI
          </p>

          <div className="aspect-video w-full rounded-md overflow-hidden mb-8 bg-muted" data-testid="container-video">
            <iframe
              src="https://www.youtube.com/embed/VqFTeqxGR9s"
              title="How to Slide Into the Consciousness of AI — Small Lake City Podcast"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
              data-testid="iframe-youtube"
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href="https://open.spotify.com/episode/6hY9YVGJlwd8ifDMIuRGIj"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-spotify"
            >
              <Button variant="outline" className="font-semibold gap-2">
                <ExternalLink className="h-4 w-4" />
                Listen on Spotify
              </Button>
            </a>
            <a
              href="https://youtu.be/VqFTeqxGR9s"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-youtube"
            >
              <Button variant="outline" className="font-semibold gap-2">
                <Youtube className="h-4 w-4" />
                Watch on YouTube
              </Button>
            </a>
            <a
              href="https://www.smalllakepod.com/episodes/dustin-crump-foundforai"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-podcast-website"
            >
              <Button variant="outline" className="font-semibold gap-2">
                <Globe className="h-4 w-4" />
                Visit Podcast Website
              </Button>
            </a>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-about-episode-heading">
                About This Episode
              </h2>
              <p className="text-muted-foreground" data-testid="text-about-episode-body">
                Dustin Crump, Founder of Found For AI, joined the Small Lake City Podcast to talk about why businesses are invisible to AI assistants — and what to do about it. The conversation covers how AI search is replacing Google for everyday queries, what the AI visibility layer actually is and why it matters, real results from local Salt Lake businesses after implementing AI visibility fixes, the future of AI agents and why your business needs to be visible to them now.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6" data-testid="text-quotes-heading">
                Key Quotes from This Episode
              </h2>
              <div className="space-y-6">
                {quotes.map((q, i) => (
                  <blockquote
                    key={i}
                    className="border-l-4 border-primary pl-5 py-2 italic text-lg text-foreground"
                    data-testid={`quote-${i}`}
                  >
                    “{q}”
                  </blockquote>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6" data-testid="text-transcript-heading">
                Full Transcript
              </h2>
              <div className="space-y-5 text-muted-foreground" data-testid="container-transcript">
                <p>
                  Dustin Crump joined the Small Lake City Podcast to discuss AI visibility, Answer Engine Optimization, and how businesses can get found and recommended by AI assistants.
                </p>

                <h3 className="text-lg font-semibold text-foreground pt-2">On how AI search is replacing Google:</h3>
                <p>
                  “I've replaced 70 to 90% of things I would usually go to Google for. User behavior is shifting rapidly — people aren't just typing 'accountant near me.' They're having a full conversation with AI. It's their therapist, their business advisor, everything.”
                </p>

                <h3 className="text-lg font-semibold text-foreground pt-2">On what the AI visibility layer actually is:</h3>
                <p>
                  “There's this structured data, this schema markup — it's a layer of code on your site. It's not visual to you, but it's visible to the AI. I look at your site and I'm like, wow, it's a really good site for humans. But what about the robots? When we put this visibility layer on there, we tell it exactly: this is what you are, this is what you do, this is who you serve. So when AI combs your site, it knows exactly who you are.”
                </p>

                <h3 className="text-lg font-semibold text-foreground pt-2">On real client results:</h3>
                <p>
                  “There's Loc See Hair — a hair extension place in Holiday, Utah. They didn't show up in any of the AIs. I put their visibility layer on and they're now number one right away. The owner said, 'I don't know what you did, it's blowing up.'”
                </p>

                <h3 className="text-lg font-semibold text-foreground pt-2">On the future of AI agents:</h3>
                <p>
                  “Do you think Oprah goes on Google and searches for restaurants? No — she has agents. In the very near future, we're all going to be Oprah. These AI agents are going to have access to your email, your calendar, your preferences. If your website doesn't have that visibility layer, the agent is going to pass you up.”
                </p>

                <h3 className="text-lg font-semibold text-foreground pt-2">On events and local businesses:</h3>
                <p>
                  “AI is hungry for your events. If you have a yoga studio, a bar with trivia night, an ax throwing place — AI wants to tell people about it. People are going to be asking their AI: what can I do tonight? If that layer isn't on your site, you won't get served up.”
                </p>

                <h3 className="text-lg font-semibold text-foreground pt-2">On embracing AI:</h3>
                <p>
                  “You have to use it. There's never been a better time to be an entrepreneur. It's kind of leveled the playing field for everybody.”
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-about-show-heading">
                About the Show
              </h2>
              <p className="text-muted-foreground" data-testid="text-about-show-body">
                Small Lake City Podcast covers entrepreneurship, business, and culture in Salt Lake City. Hosted locally and focused on the people building things in Utah.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
}
