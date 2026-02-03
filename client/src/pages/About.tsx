import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ExternalLink } from 'lucide-react';

export default function About() {
  const values = [
    'Transparent - No hidden costs or confusing jargon',
    'Practical - Real fixes, not theoretical advice',
    'Results-focused - Your visibility is our success metric',
  ];

  return (
    <PageLayout
      title="About Found For AI - AI SEO Consulting Experts | Dustin Crump"
      description="Meet Dustin Crump and learn how Found For AI helps small businesses stay visible in the AI search era with transparent, practical, results-focused optimization."
      canonical="https://foundforai.com/about"
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            About Found For AI
          </h1>

          <p className="text-lg text-muted-foreground mb-6 text-center max-w-3xl mx-auto">
            Found For AI is a company that offers an AI visibility framework and implementation service founded by Dustin Crump. It helps real businesses become discoverable and trusted by AI-powered search systems such as Google Gemini, ChatGPT, and Perplexity.
          </p>
          
          <p className="text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            If you want a clear explanation of what Found For AI is and how AI systems decide which businesses to recommend, read the{' '}
            <a href="https://foundforai.com/what-is-found-for-ai" className="text-primary hover:underline" data-testid="link-about-explainer">full explainer here</a>.
          </p>

          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="flex justify-center">
                  <img
                    src="/assets/dustin-crump.jpg"
                    alt="Dustin Crump, Founder of Found For AI"
                    className="rounded-full w-48 h-48 object-cover object-top"
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <h2 className="text-2xl font-bold">Dustin Crump</h2>
                  <p className="text-lg text-muted-foreground font-medium">
                    Founder, Found For AI
                  </p>
                  <p className="text-muted-foreground">
                    Dustin Crump is an AI SEO strategist and founder of Found For AI, a consultancy built around one simple belief — the next era of search belongs to those who optimize for machines that think, not just humans who type.
                  </p>
                  <p className="text-muted-foreground">
                    After years in technical SEO and structured data design, Dustin saw a growing blind spot: great businesses were invisible in ChatGPT, Perplexity, and other AI-driven discovery tools. Found For AI was built to fix that.
                  </p>
                  <p className="text-muted-foreground">
                    Today, Dustin helps companies future-proof their visibility with AI-focused optimization and content designed to be understood by AI systems — not just indexed by traditional search engines. His mission is to make sure real businesses get found, trusted, and chosen in the age of intelligent search.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We help small businesses stay visible in the AI search era
            </p>
          </div>

          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Why Choose Us</h3>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-accent shrink-0 mt-1" />
                    <p className="text-lg">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Our Partner</h2>
            <p className="text-muted-foreground leading-relaxed">
              Found For AI is part of the Fripse AI ecosystem. If you need automation, CRM workflows, or AI-powered internal tools, visit <a href="https://fripse.com" target="_blank" rel="noopener" className="text-primary hover:underline" data-testid="link-fripse-partner">Fripse AI</a>.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-xl font-bold mb-3">Writing & Perspectives</h2>
            <p className="text-muted-foreground mb-4">
              Dustin also writes about AI visibility and how modern AI systems interpret businesses online.
            </p>
            <div className="space-y-2">
              <p className="font-medium">Why AI Can't Recommend Your Business (Even If Your Website Looks Great)</p>
              <p className="text-sm text-muted-foreground">Published on LinkedIn</p>
              <a
                href="https://www.linkedin.com/pulse/why-ai-cant-recommend-your-business-even-website-looks-dustin-crump-r5r7c/?trackingId=7bFuIRCgb%2B4PF28z4UfPVQ%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                data-testid="link-about-linkedin-article"
              >
                Read the article
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              For a deeper breakdown of AI visibility and AI driven discovery, see{' '}
              <a href="https://foundforai.com/what-is-found-for-ai" className="text-primary hover:underline" data-testid="link-about-explainer-bottom">What is Found For AI</a>.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
