import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink, Mic, Youtube, FileText } from 'lucide-react';

const mediaSchemas = [
  {
    "@type": "ItemList",
    "@id": "https://foundforai.com/media#list",
    "name": "Media Appearances — Dustin Crump",
    "description": "Podcast appearances and media features with Dustin Crump, Founder of Found For AI",
    "url": "https://foundforai.com/media",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "PodcastEpisode",
          "name": "How to Slide Into the Consciousness of AI — with Dustin Crump",
          "url": "https://www.smalllakepod.com/episodes/dustin-crump-foundforai",
          "sameAs": [
            "https://open.spotify.com/episode/6hY9YVGJlwd8ifDMIuRGIj",
            "https://youtu.be/VqFTeqxGR9s"
          ],
          "datePublished": "2025-04-01",
          "description": "Dustin Crump of Found For AI discusses AI visibility, Answer Engine Optimization, and how local businesses can get found and recommended by AI assistants like ChatGPT, Claude, and Gemini.",
          "partOfSeries": {
            "@type": "PodcastSeries",
            "name": "Small Lake City Podcast",
            "url": "https://www.smalllakepod.com"
          },
          "author": { "@id": "https://foundforai.com/#dustin-crump" }
        }
      }
    ]
  }
];

export default function Media() {
  return (
    <PageLayout
      title="Media & Podcast Appearances | Found For AI"
      description="Podcast appearances, interviews, and media features with Dustin Crump, Founder of Found For AI — covering AI visibility, AEO, and how businesses get found by AI assistants."
      canonical="https://foundforai.com/media"
      schemas={mediaSchemas}
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center" data-testid="text-media-title">
            Media & Podcast Appearances
          </h1>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto" data-testid="text-media-subtitle">
            Conversations about AI visibility, Answer Engine Optimization, and helping businesses get found by AI
          </p>

          <Card className="mb-8" data-testid="card-appearance-small-lake-city">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Mic className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground" data-testid="text-show-name">
                  Small Lake City Podcast
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-episode-title">
                How to Slide Into the Consciousness of AI — with Dustin Crump
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                <Calendar className="h-4 w-4" />
                <span data-testid="text-episode-date">April 2025</span>
              </div>
              <p className="text-muted-foreground mb-6" data-testid="text-episode-description">
                Dustin joins the Small Lake City Podcast to discuss how AI is replacing Google search, why businesses are invisible to AI assistants, and how the AI visibility layer works — including real client results from local Salt Lake businesses.
              </p>
              <div className="flex flex-wrap gap-3">
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
                <Link href="/media/small-lake-city-podcast" data-testid="link-full-episode">
                  <Button className="font-semibold gap-2" style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}>
                    <FileText className="h-4 w-4" />
                    Full Episode + Transcript
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
}
