import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, AlertCircle, AlertTriangle, Info, CheckCircle2, Code } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';
import { trackEvent } from '@/lib/analytics';
import { validate, type ValidationResult, type SchemaCheck, type ParsedNode } from '@/lib/schema-validator';

const SITE = 'https://foundforai.com';

function levelIcon(level: SchemaCheck['level']) {
  if (level === 'error') return <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />;
  if (level === 'warning') return <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />;
  return <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />;
}

function levelBg(level: SchemaCheck['level']) {
  if (level === 'error') return 'bg-red-500/5 border-red-500/20';
  if (level === 'warning') return 'bg-amber-500/5 border-amber-500/20';
  return 'bg-blue-500/5 border-blue-500/20';
}

function scoreColor(score: number) {
  if (score >= 80) return '#16a34a';
  if (score >= 50) return '#f59e0b';
  return '#dc2626';
}

function CheckList({ checks }: { checks: SchemaCheck[] }) {
  if (checks.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <CheckCircle2 className="h-4 w-4" />
        No issues detected.
      </div>
    );
  }
  return (
    <ul className="space-y-2">
      {checks.map((c, i) => (
        <li
          key={i}
          className={`flex items-start gap-2 p-3 border rounded-md text-sm ${levelBg(c.level)}`}
        >
          {levelIcon(c.level)}
          <div>
            {c.field && (
              <code className="text-xs bg-background px-1.5 py-0.5 rounded border mr-1.5">
                {c.field}
              </code>
            )}
            <span>{c.message}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function NodeCard({ node }: { node: ParsedNode }) {
  const [showRaw, setShowRaw] = useState(false);
  const errorCount = node.checks.filter((c) => c.level === 'error').length;
  const warningCount = node.checks.filter((c) => c.level === 'warning').length;
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="font-mono">
              {node.type}
            </Badge>
            {node.id && (
              <code className="text-xs text-muted-foreground truncate max-w-[300px]">
                {node.id}
              </code>
            )}
          </div>
          <div className="flex items-center gap-2">
            {errorCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {errorCount} error{errorCount === 1 ? '' : 's'}
              </Badge>
            )}
            {warningCount > 0 && (
              <Badge className="text-xs bg-amber-500/15 text-amber-600 border-amber-500/30">
                {warningCount} warning{warningCount === 1 ? '' : 's'}
              </Badge>
            )}
            {node.checks.length === 0 && (
              <Badge className="text-xs bg-green-500/15 text-green-600 border-green-500/30">
                clean
              </Badge>
            )}
          </div>
        </div>
        <CheckList checks={node.checks} />
        <button
          type="button"
          onClick={() => setShowRaw((v) => !v)}
          className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition"
          data-testid={`button-raw-${node.index}`}
        >
          <Code className="h-3 w-3" />
          {showRaw ? 'Hide raw JSON-LD' : 'Show raw JSON-LD'}
        </button>
        {showRaw && (
          <pre className="mt-2 text-xs bg-muted p-3 rounded-md overflow-x-auto font-mono leading-relaxed border max-h-64">
            {JSON.stringify(node.raw, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}

export default function SchemaValidator() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [fetchedUrl, setFetchedUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setFetchedUrl(null);

    let normalized = url.trim();
    if (!normalized) {
      setError('Please enter a URL.');
      return;
    }
    if (!/^https?:\/\//i.test(normalized)) {
      normalized = `https://${normalized}`;
    }

    setLoading(true);
    trackEvent('schema_validator_run', { url: normalized });
    try {
      const res = await fetch(`/api/fetch-page?url=${encodeURIComponent(normalized)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || `Failed to fetch (${res.status}).`);
        return;
      }
      setFetchedUrl(data.finalUrl || normalized);
      const validation = validate(data.html as string);
      setResult(validation);
      trackEvent('schema_validator_result', {
        url: normalized,
        score: validation.summary.score,
        errors: validation.summary.errors,
        warnings: validation.summary.warnings,
        node_count: validation.nodes.length,
      });
    } catch {
      setError('Network error while fetching the page.');
    } finally {
      setLoading(false);
    }
  }

  const schemas: object[] = [
    breadcrumbList([
      { name: 'Home', url: `${SITE}/` },
      { name: 'Tools', url: `${SITE}/tools` },
      { name: 'Schema Validator', url: `${SITE}/tools/schema-validator` },
    ]),
    {
      '@type': 'WebApplication',
      '@id': `${SITE}/tools/schema-validator#app`,
      name: 'Schema Validator',
      url: `${SITE}/tools/schema-validator`,
      description:
        'Free schema validator. Paste any URL to see what JSON-LD structured data the page exposes, what is missing, and how AI-readable the entity graph is.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${SITE}/#org` },
      isAccessibleForFree: true,
    },
    {
      '@type': 'HowTo',
      '@id': `${SITE}/tools/schema-validator#howto`,
      name: 'How to validate your site\'s JSON-LD schema',
      description:
        'Use the Schema Validator to check your site\'s structured data and get an AI-readability score that shows how likely AI assistants are to find and recommend you.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Enter your site\'s URL into the validator',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Click "Validate schema" to scan the page\'s JSON-LD blocks',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Review the AI-readability score and per-entity validation checks to find missing fields',
        },
      ],
    },
  ];

  return (
    <PageLayout
      title="Free Schema Validator | Found For AI"
      description="Free schema validator. Paste any URL to see exactly what JSON-LD structured data AI assistants find on the page — what's there, what's missing, and how AI-readable the entity graph is."
      canonical={`${SITE}/tools/schema-validator`}
      schemas={schemas}
    >
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <header className="mb-10">
            <Badge variant="outline" className="mb-4">
              Free Tool
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Schema Validator</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Paste any URL. See exactly what JSON-LD structured data the page exposes — what
              AI assistants actually read about that business — and where the entity graph is
              missing the fields that drive recommendations.
            </p>
          </header>

          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
                <Input
                  type="url"
                  inputMode="url"
                  placeholder="https://yourdomain.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                  data-testid="input-validator-url"
                  disabled={loading}
                  required
                />
                <Button
                  type="submit"
                  disabled={loading}
                  data-testid="button-validate"
                  style={{ backgroundColor: '#0F5FDB', borderColor: '#0F5FDB' }}
                  className="font-semibold text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Validating…
                    </>
                  ) : (
                    'Validate schema'
                  )}
                </Button>
              </form>
              {error && (
                <div className="mt-3 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}
            </CardContent>
          </Card>

          {result && (
            <div className="space-y-6">
              {/* Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-6 flex-wrap">
                    <div className="text-center">
                      <div
                        className="text-5xl font-bold"
                        style={{ color: scoreColor(result.summary.score) }}
                        data-testid="text-score"
                      >
                        {result.summary.score}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">/ 100</div>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <h2 className="text-lg font-bold mb-1">AI-readability score</h2>
                      {fetchedUrl && (
                        <p className="text-xs text-muted-foreground mb-3 break-all">
                          {fetchedUrl}
                        </p>
                      )}
                      <div className="flex gap-4 text-sm flex-wrap">
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="inline-block w-2 h-2 rounded-full bg-red-500"
                            aria-hidden
                          />
                          {result.summary.errors} error{result.summary.errors === 1 ? '' : 's'}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="inline-block w-2 h-2 rounded-full bg-amber-500"
                            aria-hidden
                          />
                          {result.summary.warnings} warning
                          {result.summary.warnings === 1 ? '' : 's'}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="inline-block w-2 h-2 rounded-full bg-blue-500"
                            aria-hidden
                          />
                          {result.summary.infos} info
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Code className="h-3.5 w-3.5" />
                          {result.jsonLdBlockCount} JSON-LD block
                          {result.jsonLdBlockCount === 1 ? '' : 's'}, {result.nodes.length} entit
                          {result.nodes.length === 1 ? 'y' : 'ies'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Global checks */}
              {result.globalChecks.length > 0 && (
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-bold mb-3">Overall</h3>
                    <CheckList checks={result.globalChecks} />
                  </CardContent>
                </Card>
              )}

              {/* Parse errors */}
              {result.parseErrors.length > 0 && (
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-bold mb-3 text-red-600">JSON parse errors</h3>
                    <ul className="space-y-3">
                      {result.parseErrors.map((p, i) => (
                        <li key={i} className="text-sm">
                          <p className="font-medium">
                            Block #{p.blockIndex + 1}: {p.message}
                          </p>
                          <pre className="mt-1 text-xs bg-muted p-2 rounded border overflow-x-auto">
                            {p.snippet}
                            {p.snippet.length === 200 ? '…' : ''}
                          </pre>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Each entity */}
              {result.nodes.length > 0 && (
                <div>
                  <h3 className="font-bold text-xl mb-4">Entities detected</h3>
                  <div className="space-y-4">
                    {result.nodes.map((n) => (
                      <NodeCard key={n.index} node={n} />
                    ))}
                  </div>
                </div>
              )}

              {/* Empty state */}
              {result.nodes.length === 0 && result.parseErrors.length === 0 && (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    No JSON-LD structured data was found on the page. This is the single biggest
                    AI-visibility gap most small business sites have.
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Explainer */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-2">What does this check?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every JSON-LD block on the page is parsed and each entity is checked against
                the fields Google, Schema.org, and AI assistants treat as required or
                recommended for that type.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Why the AI angle?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Schema isn&apos;t just about Google rich results anymore. AI assistants use it
                as the authoritative description of who you are. Missing or contradictory
                schema is the most common reason AI quietly skips a business.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">What about microdata or RDFa?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                JSON-LD is the format Google, OpenAI, Anthropic, and Perplexity all
                prioritize, so that&apos;s what this validator inspects. If you&apos;re still
                on microdata, the migration is itself a recommended fix.
              </p>
            </div>
          </div>

          <div className="mt-20 p-8 md:p-10 bg-muted/50 border rounded-xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want us to fix the gaps instead of just finding them?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              Our AI Visibility Fix installs the full schema layer — Organization,
              LocalBusiness, Service, BlogPosting, FAQPage, and an entity graph that ties it
              all together — in seven business days, flat fee.
            </p>
            <a
              href="https://foundforai.com/book-call"
              className="inline-block px-8 py-4 font-semibold rounded-lg text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#0F5FDB' }}
              data-testid="link-validator-cta"
            >
              → Book a 15-minute call
            </a>
            <p className="text-sm text-muted-foreground mt-4">
              No pitch. No obligation. Just clarity.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
