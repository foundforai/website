import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Check, Search, Wrench, TrendingUp, ArrowRight, CalendarCheck } from 'lucide-react';

export default function Services() {
  const howItWorks = [
    {
      step: '1',
      title: 'Audit',
      description: "We analyze how AI tools currently see your business and identify what's missing or unclear.",
      icon: Search,
    },
    {
      step: '2',
      title: 'Fix',
      description: 'We implement the technical and contextual changes your site needs so AI can understand and recommend your business.',
      icon: Wrench,
    },
    {
      step: '3',
      title: 'Verify',
      description: 'We confirm that major AI tools can now read, understand, and accurately describe your business.',
      icon: TrendingUp,
    },
  ];

  return (
    <PageLayout
      title="Our Core Service: AI Visibility Fix | Found For AI"
      description="A one-time implementation that fixes how AI tools understand and recommend your business."
      canonical="https://foundforai.com/services"
    >
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Core Service: AI Visibility Fix
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A one-time implementation that fixes how AI tools understand and recommend your business.
            </p>
          </div>

          {/* Primary Service - AI Visibility Starter Fix */}
          <Card className="mb-16 border-primary border-2 shadow-xl bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 hidden md:block">
              <span className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold">
                Start Here
              </span>
            </div>
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4 md:hidden">
                    Start Here
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Visibility Starter Fix</h2>
                  <div className="text-4xl font-bold text-primary mb-4">$1,595</div>
                  <p className="text-sm text-muted-foreground mb-6">one time</p>
                  <p className="text-lg text-muted-foreground mb-8">
                    This is where every engagement starts. We implement the technical and contextual changes your site needs so AI tools like ChatGPT, Perplexity, and Google Gemini can clearly understand, trust, and recommend your business.
                  </p>
                  <a href="https://foundforai.com/fix-plan" data-testid="button-start-fix">
                    <Button size="lg" className="font-semibold text-lg px-8">
                      Start My AI Visibility Fix
                    </Button>
                  </a>
                  <p className="text-sm text-muted-foreground mt-4">Most businesses start here</p>
                </div>
                <div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span className="text-base">AI visibility audit</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span className="text-base">AI readability layer installation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span className="text-base">Business context and trust signal corrections</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span className="text-base">Verification across major AI tools</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span className="text-base">Documentation of all changes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span className="text-base">7 business day delivery</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span className="text-base">60-day fix-it-free guarantee</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Recurring Events Subscription */}
          <Card className="mb-16 border-2 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Recurring Events Subscription</h2>
                  <p className="text-lg font-medium text-muted-foreground mb-6">
                    Keep your event inventory accurate, measurable, and improving every month.
                  </p>
                  <p className="text-base text-muted-foreground mb-6">
                    Built for local businesses with recurring public classes, workshops, and events. We keep your schedule pages accurate, run monthly micro tests to improve booking clicks, and send you a simple report each month showing what changed and what moved.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">$750</span>
                      <span className="text-sm text-muted-foreground">one-time onboarding</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">$250</span>
                      <span className="text-sm text-muted-foreground">per month</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-8">Minimum term: 3 months, then month to month</p>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="font-semibold text-lg px-8" data-testid="button-events-subscription">
                      Schedule a Call
                    </Button>
                  </Link>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Includes:</h3>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span className="text-base">Monthly accuracy audit and fixes — schedule, pages, links, times, instructors</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span className="text-base">One micro test per month from a fixed menu</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span className="text-base">Simple monthly report — booking clicks, top pages, what changed</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span className="text-base">Tracking setup and baseline snapshot on onboarding</span>
                    </li>
                  </ul>
                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold mb-1">Optional add-on: Distribution Pack — $100/month</p>
                    <p className="text-sm text-muted-foreground">One GBP post, Facebook Event update, or Eventbrite update per month.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our proven three-step process to fix your AI visibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {howItWorks.map((step, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{step.step}</div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Additional Services (After the Fix)</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              For businesses that need ongoing optimization or larger-scale implementations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Ongoing Optimization */}
            <Card className="transition-all duration-300 hover:shadow-xl border-2">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl mb-2">Ongoing AI Visibility Optimization</CardTitle>
                <div className="text-3xl font-bold text-primary mb-2">Custom</div>
                <CardDescription className="text-base">
                  For businesses that want continued optimization, reporting, and growth after their AI Visibility Fix is complete.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Everything in AI Visibility Fix</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Monthly AI visibility monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Ongoing optimization updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Growth tracking & reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Quarterly strategy reviews</span>
                  </li>
                </ul>
                <Link href="/book-call">
                  <Button size="lg" variant="outline" className="w-full font-semibold" data-testid="button-ongoing-optimization">
                    Schedule a Call
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground text-center">Available after completing the Starter Fix</p>
              </CardContent>
            </Card>

            {/* Enterprise & Agency */}
            <Card className="transition-all duration-300 hover:shadow-xl border-2">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl mb-2">Enterprise & Agency Integration</CardTitle>
                <div className="text-3xl font-bold text-primary mb-2">Custom</div>
                <CardDescription className="text-base">
                  For multi-site, agency, or large-scale AI visibility implementations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Everything in Ongoing Optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Multi-site management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">White-label options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">Custom SLA agreements</span>
                  </li>
                </ul>
                <Link href="/book-call">
                  <Button size="lg" variant="outline" className="w-full font-semibold" data-testid="button-enterprise-integration">
                    Schedule a Call
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground text-center">Custom scope, post-fix</p>
              </CardContent>
            </Card>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-16">
            <p className="text-lg text-muted-foreground mb-6">Ready to fix your AI visibility?</p>
            <a href="https://foundforai.com/fix-plan" data-testid="button-final-cta">
              <Button size="lg" className="font-semibold text-lg px-8 group">
                Start My AI Visibility Fix
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
