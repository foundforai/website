import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <PageLayout
      title="404 - Page Not Found | Found For AI"
      description="The page you're looking for doesn't exist. Return to Found For AI homepage for AI SEO consulting services."
      canonical="https://foundforai.com/404"
    >
      <section className="py-16 md:py-24 bg-background min-h-[60vh] flex items-center">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="text-8xl font-bold text-primary/20">404</div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="gap-2" data-testid="button-home">
                <Home className="h-5 w-5" />
                Back to Home
              </Button>
            </Link>
            <Link href="/audit">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-audit">
                <Search className="h-5 w-5" />
                Get Free Audit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
