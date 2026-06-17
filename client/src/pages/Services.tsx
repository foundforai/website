import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import {
  Check,
  Search,
  Layers,
  Sparkles,
  ShieldCheck,
  Clock,
  Repeat,
  Bot,
  Users,
  ArrowRight,
  Eye,
  LineChart,
} from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';

const servicesSchemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'Services', url: 'https://foundforai.com/services' },
  ]),
  {
    '@type': 'Service',
    '@id': 'https://foundforai.com/services#service',
    name: 'AI Visibility & AI-First Marketing',
    description:
      "A custom AI visibility agency engagement. We audit how AI assistants understand your business, install the AI Data Layer, fix what blocks recommendations, and keep visibility tuned as AI assistants change. Every engagement is scoped to the business.",
    serviceType: 'AI Visibility Management',
    provider: { '@id': 'https://foundforai.com/#org' },
    areaServed: { '@type': 'Country', 'name': 'United States' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Businesses, brands, sports organizations, multi-location companies, and agencies',
    },
    url: 'https://foundforai.com/services',
  },
];

interface Deliverable {
  title: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
  icon: typeof Search;
}

interface AudienceItem {
  title: string;
  description: string;
  icon: typeof Users;
}

const deliverables: Deliverable[] = [
  {
    title: 'Full AI Visibility Audit',
    description:
      'We map how ChatGPT, Claude, Perplexity, and Google Gemini currently understand (or miss) your business — and exactly what is blocking recommendations.',
  },
  {
    title: 'AI Data Layer Installation',
    description:
      'We install the structured schema and entity signals AI assistants actually read — services, service area, hours, trust signals, and more.',
  },
  {
    title: 'Initial Content & Clarity Optimizations',
    description:
      'We resolve the content gaps and confusing signals that prevent AI from confidently describing what you do.',
  },
  {
    title: 'Technical Blockers Resolved',
    description:
      'Crawl, indexing, and bot-access issues are fixed so AI systems can actually read your site the way they need to.',
  },
  {
    title: 'Documentation of Every Change',
    description:
      'You get a clear record of everything we installed and why — no black box, no mystery.',
  },
  {
    title: 'Verification Across Major AI Tools',
    description:
      'We confirm the major AI assistants can read, understand, and accurately describe your business after the work ships.',
  },
];

const howItWorks: Step[] = [
  {
    number: '1',
    title: 'Onboard',
    description:
      'We run your audit, install the AI Data Layer, and ship the initial optimizations. Delivered in seven business days, backed by a 60-day We Fix It Free guarantee.',
    icon: Layers,
  },
  {
    number: '2',
    title: 'Scope Your Engagement',
    description:
      'We build a custom plan around your goals, footprint, and budget — then keep your visibility tuned with ongoing optimization.',
    icon: Repeat,
  },
  {
    number: '3',
    title: 'Stay Recommended',
    description:
      'Every month we monitor, audit, and optimize so your visibility holds as AI models and your business keep changing.',
    icon: Sparkles,
  },
];

const audience: AudienceItem[] = [
  {
    title: 'Local service businesses',
    description:
      'Owner-operated businesses that depend on being recommended for nearby queries — salons, trades, fitness, healthcare, professional services.',
    icon: Users,
  },
  {
    title: 'B2B operators',
    description:
      'Founders and consultants whose buyers are now asking ChatGPT and Claude before booking a discovery call.',
    icon: LineChart,
  },
  {
    title: 'Anyone tired of dashboards',
    description:
      "Owners who want the work done for them — not another tool that just shows the gaps and leaves them to fix it.",
    icon: Bot,
  },
];

export default function Services() {
  return (
    <PageLayout
      title="Services — AI Visibility & AI-First Marketing | Found For AI"
      description="A custom AI visibility agency. We audit, install your AI Data Layer, and keep your business recommended by ChatGPT, Gemini, Perplexity, and Claude. Every engagement scoped to you."
      canonical="https://foundforai.com/services"
      schemas={servicesSchemas}
    >
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            What We Do
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            AI Visibility, Done For You
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            We make sure AI assistants understand, trust, and recommend your business — then keep it that way.
          </p>
          <p className="text-base md:text-lg font-medium text-foreground max-w-2xl mx-auto">
            Most AI visibility tools show you the gaps. We fix them and keep them fixed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <Link href="/book-call">
              <Button size="lg" className="font-semibold gap-2" data-testid="button-hero-book-call">
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/scorecard">
              <Button size="lg" variant="outline" className="font-semibold gap-2 border-2" data-testid="button-hero-scorecard">
                Get Your Free AI Visibility Report
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why This Matters Now */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Why This Matters Now</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Customer discovery is shifting from search results to AI recommendations. Businesses that aren't AI-readable are getting passed over.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <Eye className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-semibold text-lg mb-2">AI is the new front door</h3>
                <p className="text-sm text-muted-foreground">
                  Buyers ask ChatGPT, Claude, Perplexity, and Gemini for recommendations before they click a single link.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Search className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-semibold text-lg mb-2">Traditional SEO isn't enough</h3>
                <p className="text-sm text-muted-foreground">
                  AI reads structured data and entity signals differently. Ranking on Google doesn't guarantee an AI will mention you.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <LineChart className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-semibold text-lg mb-2">The window is open now</h3>
                <p className="text-sm text-muted-foreground">
                  Most local competitors haven't fixed this yet. The first business in a market to be AI-readable takes outsized share of new customers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's in the AI Visibility Fix */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-accent/15 text-accent px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3">
              Where every engagement starts
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What an AI-visibility engagement includes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every engagement starts with the foundation. Here's exactly what we install.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliverables.map((item, index) => (
              <Card key={index} className="border-border/50" data-testid={`card-deliverable-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-10 pt-8 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-accent" />
              Delivered in 7 business days
            </div>
            <span className="hidden sm:inline text-muted-foreground">·</span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-accent" />
              60-day We Fix It Free guarantee
            </div>
          </div>
        </div>
      </section>

      {/* The Hybrid Model */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">How an Engagement Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              You start with the audit and install. After that, ongoing optimization keeps your visibility tuned so you stay recommended as AI models evolve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-primary border-2 shadow-md">
              <CardContent className="p-8">
                <Layers className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">Audit &amp; Install</h3>
                <p className="text-sm font-medium text-accent uppercase tracking-wide mb-4">Where every engagement starts</p>
                <p className="text-muted-foreground mb-4">
                  Audit, AI Data Layer installation, and initial optimizations — done for you in seven business days.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-accent shrink-0 mt-1" />
                    <span>The foundation AI assistants need to recommend you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-accent shrink-0 mt-1" />
                    <span>60-day We Fix It Free guarantee on everything we install</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-border shadow-md">
              <CardContent className="p-8">
                <Repeat className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">Ongoing Optimization</h3>
                <p className="text-sm font-medium text-accent uppercase tracking-wide mb-4">Keep It Tuned</p>
                <p className="text-muted-foreground mb-4">
                  AI assistants change constantly — and so does your business. We keep your visibility accurate and current, scoped to how much support you want.
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-accent shrink-0 mt-1" />
                    <span>Ongoing monitoring and monthly audits across the major AI assistants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <LineChart className="h-4 w-4 text-accent shrink-0 mt-1" />
                    <span>Regular optimizations and reporting on what AI says about your business</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Link href="/book-call">
              <Button size="lg" className="font-semibold gap-2" data-testid="button-hybrid-book-call">
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A clear path from invisible to recommended — without you doing the work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorks.map((step, index) => (
              <Card key={index} className="border-border/50" data-testid={`card-step-${index}`}>
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary mb-5">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <div className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">
                    Step {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Who This Is For</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for owner-operators who want their business recommended by AI — without becoming an AI specialist themselves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {audience.map((item, index) => (
              <Card key={index} className="border-border/50" data-testid={`card-audience-${index}`}>
                <CardContent className="p-6">
                  <item.icon className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to be the business AI recommends?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Two ways to start — pick whichever fits where you are.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <Link href="/book-call">
              <Button size="lg" className="w-full font-semibold" data-testid="button-final-book-call">
                Book a Strategy Call
              </Button>
            </Link>
            <Link href="/scorecard">
              <Button size="lg" variant="outline" className="w-full font-semibold border-2" data-testid="button-final-scorecard">
                Free Visibility Report
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Custom engagements · Scoped to your business · 60-day guarantee · No off-the-shelf packages
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
