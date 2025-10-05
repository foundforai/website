import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Check } from 'lucide-react';

export default function Services() {
  const packages = [
    {
      name: 'Free Audit',
      price: 'Free',
      description: 'Quick scan and top three fixes',
      features: [
        'Basic schema analysis',
        'Top 3 priority fixes',
        'AI Readiness score',
        '24-hour delivery',
      ],
    },
    {
      name: 'Pro Audit',
      price: '$299',
      description: 'Full schema and GEO review with action plan',
      features: [
        'Comprehensive schema audit',
        'Full GEO optimization review',
        'Prioritized action plan',
        'Implementation code snippets',
        'Content structure analysis',
        'FAQ optimization guidance',
      ],
      popular: true,
    },
    {
      name: 'Done For You',
      price: '$750+',
      description: 'We implement everything for you',
      features: [
        'Complete JSON-LD implementation',
        'Metadata optimization',
        'GEO corrections',
        'Content structure fixes',
        'Ongoing monitoring',
        'White-glove support',
      ],
    },
  ];

  return (
    <PageLayout
      title="AI SEO Services & Pricing - Audits and Implementation | Found For AI"
      description="Choose from Free Audit, Pro Audit ($299), or Done-For-You Implementation ($750+). Get schema markup, GEO optimization, and AI readiness solutions."
      canonical="https://foundforai.com/services"
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI SEO Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From free audits to full implementation, we help businesses of all sizes become AI-discoverable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative ${pkg.popular ? 'border-primary border-2 shadow-xl' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <div className="text-4xl font-bold mb-2">{pkg.price}</div>
                  <CardDescription className="text-base">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/audit">
                    <Button
                      className="w-full"
                      variant={pkg.popular ? 'default' : 'outline'}
                      data-testid={`button-request-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      Request Audit
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
