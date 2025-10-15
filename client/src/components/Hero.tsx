import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroImage from '@assets/generated_images/Hero_illustration_for_AI_SEO_f9e4ef37.png';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Is Your Website Ready To Be Found By AI?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              We optimize your site for AI search, schema, and GEO visibility
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/audit">
                <Button size="lg" className="text-lg font-semibold group" data-testid="button-get-audit-hero">
                  Get My Free Audit
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <img 
              src={heroImage} 
              alt="AI SEO Illustration" 
              className="w-full h-auto rounded-xl"
              loading="eager"
              width="1024"
              height="1024"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
