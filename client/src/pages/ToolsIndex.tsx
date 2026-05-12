import { Link } from 'wouter';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, ShieldCheck, ArrowRight } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';
import { tools } from '@/data/tools';

const SITE = 'https://foundforai.com';

const iconMap = {
  FileText,
  ShieldCheck,
};

export default function ToolsIndex() {
  const schemas: object[] = [
    breadcrumbList([
      { name: 'Home', url: `${SITE}/` },
      { name: 'Tools', url: `${SITE}/tools` },
    ]),
    {
      '@type': 'CollectionPage',
      '@id': `${SITE}/tools#collection`,
      name: 'Free AI Visibility Tools',
      url: `${SITE}/tools`,
      description:
        'Free tools from Found For AI to help small businesses get found in AI answers — llms.txt generators, schema helpers, and more.',
      isPartOf: { '@id': `${SITE}/#website` },
      publisher: { '@id': `${SITE}/#org` },
      hasPart: tools.map((t) => ({
        '@type': 'WebApplication',
        name: t.name,
        url: `${SITE}${t.path}`,
        description: t.description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      })),
    },
  ];

  return (
    <PageLayout
      title="Free AI Visibility Tools | Found For AI"
      description="Free tools to help small businesses get found in AI answers. Generate llms.txt files, validate schema, and more — built by Found For AI."
      canonical={`${SITE}/tools`}
      schemas={schemas}
    >
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <header className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">
              Free Tools
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Free AI Visibility Tools
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Practical tools that help you do — right now — the things AI assistants actually look for when they decide which businesses to recommend.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = iconMap[tool.icon as keyof typeof iconMap] ?? FileText;
              const isLive = tool.status === 'live';
              const content = (
                <Card
                  className={`h-full transition-all ${isLive ? 'hover:shadow-lg hover:-translate-y-1' : 'opacity-60'}`}
                  data-testid={`card-tool-${tool.slug}`}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="rounded-lg p-3"
                        style={{ backgroundColor: 'rgba(15, 95, 219, 0.1)' }}
                      >
                        <Icon className="h-6 w-6" style={{ color: '#0F5FDB' }} />
                      </div>
                      {!isLive && (
                        <Badge variant="secondary" className="text-xs">
                          Coming soon
                        </Badge>
                      )}
                    </div>
                    <h2 className="text-xl font-bold mb-2">{tool.name}</h2>
                    <p className="text-muted-foreground text-sm mb-6 flex-1">
                      {tool.tagline}
                    </p>
                    {isLive && (
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        Open tool <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </CardContent>
                </Card>
              );

              return isLive ? (
                <Link
                  key={tool.slug}
                  href={tool.path}
                  data-testid={`link-tool-${tool.slug}`}
                >
                  {content}
                </Link>
              ) : (
                <div key={tool.slug}>{content}</div>
              );
            })}
          </div>

          <div className="mt-20 p-8 md:p-10 bg-muted/50 border rounded-xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want us to do this for you?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              The tools here give you the building blocks. Our AI Visibility Fix installs the entire visibility layer — schema, llms.txt, intent-based FAQs, and entity cleanup — in one go, in seven business days.
            </p>
            <a
              href="https://foundforai.com/talk-to-a-human#calendar"
              className="inline-block px-8 py-4 font-semibold rounded-lg text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#0F5FDB' }}
              data-testid="link-tools-cta"
            >
              → Book a 15-minute call
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
