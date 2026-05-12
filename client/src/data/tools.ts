export interface ToolEntry {
  slug: string;
  path: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  status: 'live' | 'coming-soon';
}

export const tools: ToolEntry[] = [
  {
    slug: 'llms-txt-generator',
    path: '/tools/llms-txt-generator',
    name: 'llms.txt Generator',
    tagline: 'Build the file AI assistants look for when they crawl your site.',
    description:
      'A free generator that produces a clean, spec-compliant llms.txt file for your website. Paste in your business details and key pages — copy the result to the root of your domain.',
    icon: 'FileText',
    status: 'live',
  },
  {
    slug: 'schema-validator',
    path: '/tools/schema-validator',
    name: 'Schema Validator',
    tagline: 'See exactly what JSON-LD AI assistants find on any page — and what is missing.',
    description:
      'A free schema validator. Paste any URL to inspect its JSON-LD entity graph and surface the required and recommended fields each type is missing.',
    icon: 'ShieldCheck',
    status: 'live',
  },
];

export const toolsBySlug: Record<string, ToolEntry> = Object.fromEntries(
  tools.map((t) => [t.slug, t])
);
