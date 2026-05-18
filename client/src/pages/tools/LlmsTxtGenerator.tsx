import { useMemo, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Copy, Download, Check } from 'lucide-react';
import { breadcrumbList } from '@/lib/breadcrumb';
import { trackEvent } from '@/lib/analytics';

const SITE = 'https://foundforai.com';

interface LinkRow {
  id: string;
  title: string;
  url: string;
  note: string;
}

interface Section {
  id: string;
  heading: string;
  links: LinkRow[];
}

function rid() {
  return Math.random().toString(36).slice(2, 9);
}

function emptyRow(): LinkRow {
  return { id: rid(), title: '', url: '', note: '' };
}

const DEFAULT_SECTIONS: Section[] = [
  {
    id: rid(),
    heading: 'Key Pages',
    links: [
      { id: rid(), title: 'Services', url: '', note: 'What we offer' },
      { id: rid(), title: 'About', url: '', note: 'Who we are' },
      { id: rid(), title: 'Contact', url: '', note: 'How to reach us' },
    ],
  },
  {
    id: rid(),
    heading: 'Optional',
    links: [{ id: rid(), title: 'Blog', url: '', note: 'Articles and updates' }],
  },
];

function formatLink(link: LinkRow): string | null {
  const title = link.title.trim();
  const url = link.url.trim();
  if (!title || !url) return null;
  const note = link.note.trim();
  return note ? `- [${title}](${url}): ${note}` : `- [${title}](${url})`;
}

function buildLlmsTxt(input: {
  name: string;
  tagline: string;
  description: string;
  sections: Section[];
}): string {
  const parts: string[] = [];
  const name = input.name.trim() || 'Your Business Name';
  parts.push(`# ${name}`);
  parts.push('');

  const tagline = input.tagline.trim();
  if (tagline) {
    parts.push(`> ${tagline}`);
    parts.push('');
  }

  const description = input.description.trim();
  if (description) {
    parts.push(description);
    parts.push('');
  }

  for (const section of input.sections) {
    const heading = section.heading.trim();
    const links = section.links.map(formatLink).filter(Boolean) as string[];
    if (!heading || links.length === 0) continue;
    parts.push(`## ${heading}`);
    parts.push('');
    for (const line of links) parts.push(line);
    parts.push('');
  }

  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

export default function LlmsTxtGenerator() {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState<Section[]>(DEFAULT_SECTIONS);
  const [copied, setCopied] = useState(false);

  const output = useMemo(
    () => buildLlmsTxt({ name, tagline, description, sections }),
    [name, tagline, description, sections]
  );

  function updateSection(id: string, patch: Partial<Section>) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function addSection() {
    setSections((prev) => [...prev, { id: rid(), heading: '', links: [emptyRow()] }]);
  }

  function removeSection(id: string) {
    setSections((prev) => prev.filter((s) => s.id !== id));
  }

  function addLink(sectionId: string) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, links: [...s.links, emptyRow()] } : s
      )
    );
  }

  function updateLink(sectionId: string, linkId: string, patch: Partial<LinkRow>) {
    setSections((prev) =>
      prev.map((s) =>
        s.id !== sectionId
          ? s
          : {
              ...s,
              links: s.links.map((l) => (l.id === linkId ? { ...l, ...patch } : l)),
            }
      )
    );
  }

  function removeLink(sectionId: string, linkId: string) {
    setSections((prev) =>
      prev.map((s) =>
        s.id !== sectionId
          ? s
          : { ...s, links: s.links.filter((l) => l.id !== linkId) }
      )
    );
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      trackEvent('llms_txt_copy', { length: output.length });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }

  function handleDownload() {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'llms.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    trackEvent('llms_txt_download', { length: output.length });
  }

  const schemas: object[] = [
    breadcrumbList([
      { name: 'Home', url: `${SITE}/` },
      { name: 'Tools', url: `${SITE}/tools` },
      { name: 'llms.txt Generator', url: `${SITE}/tools/llms-txt-generator` },
    ]),
    {
      '@type': 'WebApplication',
      '@id': `${SITE}/tools/llms-txt-generator#app`,
      name: 'llms.txt Generator',
      url: `${SITE}/tools/llms-txt-generator`,
      description:
        'Free generator that produces a clean, spec-compliant llms.txt file. Tells AI assistants what your site is about and which pages matter most.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${SITE}/#org` },
      isAccessibleForFree: true,
    },
    {
      '@type': 'HowTo',
      '@id': `${SITE}/tools/llms-txt-generator#howto`,
      name: 'How to add llms.txt to your website',
      description:
        'Generate a llms.txt file and upload it to the root of your domain so AI assistants can find it.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Fill in your business details and key pages',
        },
        { '@type': 'HowToStep', position: 2, name: 'Copy or download the generated llms.txt' },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Upload llms.txt to the root of your domain so it is reachable at /llms.txt',
        },
      ],
    },
  ];

  return (
    <PageLayout
      title="Free llms.txt Generator | Found For AI"
      description="Free llms.txt generator. Build the file AI assistants like ChatGPT, Claude, and Perplexity look for when they crawl your site. Copy or download, then upload to the root of your domain."
      canonical={`${SITE}/tools/llms-txt-generator`}
      schemas={schemas}
    >
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <header className="mb-10">
            <Badge variant="outline" className="mb-4">
              Free Tool
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              llms.txt Generator
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Build the file AI assistants look for when they crawl your site. Fill in
              your business details and key pages — copy or download the result, then
              upload it to the root of your domain so it&apos;s reachable at
              <code className="mx-1 px-1.5 py-0.5 rounded bg-muted text-sm">
                /llms.txt
              </code>
              .
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-lg font-bold">Your business</h2>
                  <div>
                    <Label htmlFor="biz-name">Business name</Label>
                    <Input
                      id="biz-name"
                      placeholder="Acme Plumbing"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      data-testid="input-business-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="biz-tagline">One-line summary</Label>
                    <Input
                      id="biz-tagline"
                      placeholder="Family-owned emergency plumbing in Salt Lake City since 1998."
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      data-testid="input-tagline"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Shown as the <code>&gt; quote</code> line — the first thing AI reads.
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="biz-description">Longer description (optional)</Label>
                    <Textarea
                      id="biz-description"
                      placeholder="Describe what you do, who you serve, and why customers pick you. A few sentences is plenty."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      data-testid="input-description"
                    />
                  </div>
                </CardContent>
              </Card>

              {sections.map((section, idx) => (
                <Card key={section.id}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Input
                        value={section.heading}
                        onChange={(e) =>
                          updateSection(section.id, { heading: e.target.value })
                        }
                        placeholder="Section heading (e.g. Key Pages, Services)"
                        className="font-semibold"
                        data-testid={`input-section-heading-${idx}`}
                      />
                      {sections.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSection(section.id)}
                          aria-label="Remove section"
                          data-testid={`button-remove-section-${idx}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-3">
                      {section.links.map((link, lidx) => (
                        <div
                          key={link.id}
                          className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start"
                        >
                          <Input
                            className="md:col-span-3"
                            placeholder="Link text"
                            value={link.title}
                            onChange={(e) =>
                              updateLink(section.id, link.id, { title: e.target.value })
                            }
                            data-testid={`input-link-title-${idx}-${lidx}`}
                          />
                          <Input
                            className="md:col-span-4"
                            placeholder="https://example.com/page"
                            value={link.url}
                            onChange={(e) =>
                              updateLink(section.id, link.id, { url: e.target.value })
                            }
                            data-testid={`input-link-url-${idx}-${lidx}`}
                          />
                          <Input
                            className="md:col-span-4"
                            placeholder="Short note (optional)"
                            value={link.note}
                            onChange={(e) =>
                              updateLink(section.id, link.id, { note: e.target.value })
                            }
                            data-testid={`input-link-note-${idx}-${lidx}`}
                          />
                          <div className="md:col-span-1 flex justify-end">
                            {section.links.length > 1 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeLink(section.id, link.id)}
                                aria-label="Remove link"
                                data-testid={`button-remove-link-${idx}-${lidx}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => addLink(section.id)}
                      className="w-full"
                      data-testid={`button-add-link-${idx}`}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add link
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <Button
                variant="outline"
                onClick={addSection}
                className="w-full"
                data-testid="button-add-section"
              >
                <Plus className="h-4 w-4 mr-2" /> Add section
              </Button>
            </div>

            {/* Output */}
            <div className="lg:sticky lg:top-28 self-start">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">Your llms.txt</h2>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        data-testid="button-copy"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-1.5" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1.5" /> Copy
                          </>
                        )}
                      </Button>
                      <Button size="sm" onClick={handleDownload} data-testid="button-download">
                        <Download className="h-4 w-4 mr-1.5" /> Download
                      </Button>
                    </div>
                  </div>
                  <pre
                    className="text-xs md:text-sm bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed border max-h-[600px] overflow-y-auto"
                    data-testid="output-llms-txt"
                  >
                    {output}
                  </pre>
                  <p className="text-xs text-muted-foreground">
                    Upload this file to the root of your domain so it&apos;s served at{' '}
                    <code>https://yourdomain.com/llms.txt</code>. Most platforms (Vercel,
                    Netlify, WordPress) let you add it as a static file or via a redirect.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Below-the-fold explainer */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-2">What is llms.txt?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A plain-text file at the root of your domain that tells AI assistants
                what your site is about and which pages matter most. Think of it as a
                table of contents written for ChatGPT, Claude, Gemini, and Perplexity.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Why does it matter?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI assistants don&apos;t read your homepage the way humans do. When they
                can find a clean llms.txt, they get an unambiguous picture of your
                business — and are much more likely to recommend you in answers.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Where do I put it?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Upload the file to the root of your domain so it&apos;s served at{' '}
                <code>/llms.txt</code>. On Vercel: put it in <code>/public</code>. On
                WordPress: use a static file plugin or your host&apos;s file manager.
              </p>
            </div>
          </div>

          <div className="mt-20 p-8 md:p-10 bg-muted/50 border rounded-xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want the whole AI visibility layer done for you?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              llms.txt is one piece. The full visibility layer also includes schema
              markup, intent-based FAQs, and entity cleanup. Our AI Visibility Fix
              installs all of it in seven business days, flat fee.
            </p>
            <a
              href="https://foundforai.com/book-call"
              className="inline-block px-8 py-4 font-semibold rounded-lg text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#0F5FDB' }}
              data-testid="link-tool-cta"
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
