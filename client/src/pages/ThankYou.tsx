import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { CheckCircle, Clock, Mail, Calendar } from 'lucide-react';

export default function ThankYou() {
  return (
    <PageLayout
      title="Thank You - Audit Request Received | Found For AI"
      description="Your AI Readiness Audit request has been received. We'll send your personalized scorecard within 24 hours."
      canonical="https://foundforai.com/thank-you"
    >
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-500/10 text-green-500 mb-6">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your AI Readiness Audit Is In Progress
            </h1>
            <p className="text-lg text-muted-foreground">
              We've received your request and our team is already analyzing your website.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">What Happens Next</h3>
                  <p className="text-muted-foreground">
                    Within 24 hours, you'll receive your comprehensive AI Readiness Scorecard via email. This includes your schema analysis, GEO optimization score, and AI discoverability rating.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Your Scorecard Will Include</h3>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Schema markup analysis and missing elements</li>
                    <li>• GEO data completeness and accuracy</li>
                    <li>• AI content structure evaluation</li>
                    <li>• Top 3 priority fixes with impact ratings</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Book a Follow-Up Call</h3>
                  <p className="text-muted-foreground">
                    Once you receive your scorecard, you'll have the option to book a free 15-minute consultation to discuss your results and next steps.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              In the meantime, learn more about AI SEO
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/what-is-ai-seo">
                <Button variant="outline" data-testid="button-learn-ai-seo">
                  What Is AI SEO
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" data-testid="button-read-blog">
                  Read Our Blog
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" data-testid="button-back-home">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
