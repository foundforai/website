import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function BookCall() {
  return (
    <PageLayout
      title="Schedule Your Strategy Call | Found For AI"
      description="Book your AI visibility strategy call. Let's discuss your Pro Visibility Plan or Enterprise needs."
      canonical="https://foundforai.com/book-call"
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/pricing">
              <Button variant="ghost" className="gap-2 mb-4" data-testid="button-back-pricing">
                <ArrowLeft className="h-4 w-4" />
                Back to Pricing
              </Button>
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Schedule Your Strategy Call
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose a time that works best for you to discuss your AI visibility needs.
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative w-full" style={{ paddingBottom: '100%', minHeight: '700px' }}>
                <iframe 
                  src="https://calendar.app.google/VUK3jfv6jSf1ezHv5"
                  title="Schedule a Call with Found For AI"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  style={{ minHeight: '700px' }}
                  data-testid="iframe-calendar"
                />
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Need help? Email us at <a href="mailto:info@foundforai.com" className="text-primary hover:underline">info@foundforai.com</a>
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
