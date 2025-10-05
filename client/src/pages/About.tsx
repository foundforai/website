import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import founderImage from '@assets/generated_images/Founder_headshot_Dustin_Crump_ecfd1909.png';

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
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            About Found For AI
          </h1>

          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="flex justify-center">
                  <img
                    src={founderImage}
                    alt="Dustin Crump, Founder of Found For AI"
                    className="rounded-full w-48 h-48 object-cover"
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <h2 className="text-2xl font-bold">Dustin Crump</h2>
                  <p className="text-muted-foreground">
                    Dustin is an AI SEO specialist who recognized early that the shift to AI-powered search would fundamentally change how businesses are discovered online. After seeing countless quality businesses struggle to appear in ChatGPT and Perplexity results, he founded Found For AI to bridge the gap.
                  </p>
                  <p className="text-muted-foreground">
                    With a background in technical SEO and structured data, Dustin helps businesses implement the schema markup, GEO optimization, and content structure needed to thrive in the AI search era.
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
        </div>
      </section>
    </PageLayout>
  );
}
