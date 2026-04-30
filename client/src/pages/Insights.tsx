import PageLayout from '@/components/PageLayout';
import { ExternalLink } from 'lucide-react';

export default function Insights() {
  const insightsSchemas = [
    {
      "@type": "WebPage",
      "@id": "https://foundforai.com/insights#webpage",
      "name": "Insights - Found For AI",
      "description": "Writing and perspectives on AI visibility, structured data, and how modern AI systems interpret businesses online.",
      "url": "https://foundforai.com/insights",
      "isPartOf": { "@id": "https://foundforai.com/#website" },
      "author": { "@id": "https://foundforai.com/#dustin-crump" }
    }
  ];

  return (
    <PageLayout
      title="Insights - AI Visibility & Structured Data | Found For AI"
      description="Writing and perspectives on AI visibility, structured data, and how modern AI systems interpret businesses online. By Dustin Crump."
      canonical="https://foundforai.com/insights"
      schemas={insightsSchemas}
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            data-testid="heading-insights"
          >
            Insights
          </h1>

          <p className="text-lg text-muted-foreground mb-16 leading-relaxed">
            Writing and perspectives on AI visibility, structured data, and how modern AI systems interpret businesses online.
          </p>

          <div className="space-y-12">
            <div>
              <h2 
                className="text-2xl font-bold mb-8 pb-3 border-b border-border"
                data-testid="heading-external-writing"
              >
                External Writing
              </h2>

              <article className="space-y-3" data-testid="article-linkedin-1">
                <h3 className="text-xl font-semibold leading-snug">
                  Why AI Can't Recommend Your Business (Even If Your Website Looks Great)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Published on LinkedIn by Dustin Crump
                </p>
                <a
                  href="https://www.linkedin.com/pulse/why-ai-cant-recommend-your-business-even-website-looks-dustin-crump-r5r7c/?trackingId=7bFuIRCgb%2B4PF28z4UfPVQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm"
                  data-testid="link-read-article-linkedin-1"
                >
                  Read the article
                  <ExternalLink className="h-4 w-4" />
                </a>
              </article>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
