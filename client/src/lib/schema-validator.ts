// Pure functions for extracting JSON-LD from HTML and validating it.
// No DOM access — works on raw HTML strings so it can run in any environment.

export type CheckLevel = 'error' | 'warning' | 'info';

export interface SchemaCheck {
  level: CheckLevel;
  field?: string;
  message: string;
}

export interface ParsedNode {
  index: number;
  blockIndex: number;
  type: string;
  id?: string;
  raw: Record<string, unknown>;
  checks: SchemaCheck[];
}

export interface ValidationResult {
  jsonLdBlockCount: number;
  parseErrors: Array<{ blockIndex: number; message: string; snippet: string }>;
  nodes: ParsedNode[];
  globalChecks: SchemaCheck[];
  summary: {
    errors: number;
    warnings: number;
    infos: number;
    score: number; // 0-100, rough "AI-readability" score
  };
}

// ----------------------------------------------------------------------------
// HTML → JSON-LD extraction
// ----------------------------------------------------------------------------

const SCRIPT_LDJSON_RE =
  /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

export function extractJsonLdBlocks(html: string): string[] {
  const blocks: string[] = [];
  let match: RegExpExecArray | null;
  SCRIPT_LDJSON_RE.lastIndex = 0;
  while ((match = SCRIPT_LDJSON_RE.exec(html)) !== null) {
    blocks.push(match[1]);
  }
  return blocks;
}

// ----------------------------------------------------------------------------
// Validation rules
// ----------------------------------------------------------------------------

function isString(v: unknown): v is string {
  return typeof v === 'string' && v.length > 0;
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function hasField(node: Record<string, unknown>, field: string): boolean {
  const v = node[field];
  if (v === undefined || v === null) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === 'string') return v.length > 0;
  if (typeof v === 'object') return Object.keys(v as object).length > 0;
  return true;
}

function getString(node: Record<string, unknown>, field: string): string | undefined {
  const v = node[field];
  return typeof v === 'string' ? v : undefined;
}

function getType(node: Record<string, unknown>): string {
  const t = node['@type'];
  if (typeof t === 'string') return t;
  if (Array.isArray(t) && t.length > 0 && typeof t[0] === 'string') return t[0] as string;
  return 'Unknown';
}

interface RuleSpec {
  required?: string[];
  recommended?: string[];
  extra?: (node: Record<string, unknown>) => SchemaCheck[];
}

const RULES: Record<string, RuleSpec> = {
  Organization: {
    required: ['name', 'url'],
    recommended: ['logo', 'sameAs', 'description'],
  },
  LocalBusiness: {
    required: ['name', 'address'],
    recommended: ['telephone', 'url', 'openingHoursSpecification', 'geo', 'areaServed', 'image', 'priceRange'],
    extra: (node) => {
      const checks: SchemaCheck[] = [];
      const addr = node.address;
      if (addr && isObject(addr)) {
        const requiredAddr = ['streetAddress', 'addressLocality', 'addressRegion', 'postalCode', 'addressCountry'];
        for (const f of requiredAddr) {
          if (!hasField(addr, f)) {
            checks.push({
              level: 'warning',
              field: `address.${f}`,
              message: `Address is missing ${f} — AI may not be able to confirm your location.`,
            });
          }
        }
      }
      return checks;
    },
  },
  WebSite: {
    required: ['name', 'url'],
    recommended: ['publisher', 'potentialAction'],
  },
  WebPage: {
    required: ['name', 'url'],
    recommended: ['isPartOf', 'description'],
  },
  Person: {
    required: ['name'],
    recommended: ['url', 'jobTitle', 'sameAs', 'worksFor'],
  },
  BreadcrumbList: {
    required: ['itemListElement'],
    extra: (node) => {
      const checks: SchemaCheck[] = [];
      const items = node.itemListElement;
      if (Array.isArray(items)) {
        if (items.length < 2) {
          checks.push({
            level: 'warning',
            field: 'itemListElement',
            message: 'Breadcrumb has fewer than 2 items — usually you want at least Home → Page.',
          });
        }
        items.forEach((it, idx) => {
          if (!isObject(it)) return;
          if (!hasField(it, 'position')) {
            checks.push({
              level: 'warning',
              field: `itemListElement[${idx}].position`,
              message: 'Breadcrumb item missing position.',
            });
          }
          if (!hasField(it, 'name')) {
            checks.push({
              level: 'warning',
              field: `itemListElement[${idx}].name`,
              message: 'Breadcrumb item missing name.',
            });
          }
          if (!hasField(it, 'item') && !hasField(it, 'url')) {
            checks.push({
              level: 'warning',
              field: `itemListElement[${idx}].item`,
              message: 'Breadcrumb item missing item URL.',
            });
          }
        });
      }
      return checks;
    },
  },
  BlogPosting: {
    required: ['headline', 'datePublished', 'author', 'image'],
    recommended: ['description', 'dateModified', 'publisher', 'mainEntityOfPage', 'inLanguage'],
  },
  Article: {
    required: ['headline', 'datePublished', 'author', 'image'],
    recommended: ['description', 'dateModified', 'publisher', 'mainEntityOfPage'],
  },
  NewsArticle: {
    required: ['headline', 'datePublished', 'author', 'image'],
    recommended: ['dateModified', 'publisher'],
  },
  FAQPage: {
    required: ['mainEntity'],
    extra: (node) => {
      const checks: SchemaCheck[] = [];
      const me = node.mainEntity;
      const items = Array.isArray(me) ? me : me ? [me] : [];
      if (items.length === 0) {
        checks.push({
          level: 'error',
          field: 'mainEntity',
          message: 'FAQPage has no Question entries.',
        });
      }
      items.forEach((q, idx) => {
        if (!isObject(q)) return;
        if (!hasField(q, 'name')) {
          checks.push({
            level: 'warning',
            field: `mainEntity[${idx}].name`,
            message: 'Question missing name (the actual question text).',
          });
        }
        const a = q.acceptedAnswer;
        if (!a || (isObject(a) && !hasField(a, 'text'))) {
          checks.push({
            level: 'warning',
            field: `mainEntity[${idx}].acceptedAnswer.text`,
            message: 'Question missing acceptedAnswer.text.',
          });
        }
      });
      return checks;
    },
  },
  Product: {
    required: ['name'],
    recommended: ['description', 'image', 'brand', 'offers', 'aggregateRating', 'sku'],
  },
  Service: {
    required: ['name', 'provider'],
    recommended: ['description', 'serviceType', 'areaServed', 'offers'],
  },
  HowTo: {
    required: ['name', 'step'],
    recommended: ['description', 'totalTime'],
  },
  Review: {
    required: ['reviewRating', 'author'],
    recommended: ['itemReviewed', 'reviewBody', 'datePublished'],
  },
  Event: {
    required: ['name', 'startDate', 'location'],
    recommended: ['endDate', 'description', 'organizer', 'offers'],
  },
};

function validateNode(node: Record<string, unknown>): SchemaCheck[] {
  const type = getType(node);
  const checks: SchemaCheck[] = [];

  const rule = RULES[type];
  if (!rule) {
    return checks;
  }

  for (const field of rule.required ?? []) {
    if (!hasField(node, field)) {
      checks.push({
        level: 'error',
        field,
        message: `Missing required field "${field}" on ${type}.`,
      });
    }
  }
  for (const field of rule.recommended ?? []) {
    if (!hasField(node, field)) {
      checks.push({
        level: 'warning',
        field,
        message: `Missing recommended field "${field}" on ${type}.`,
      });
    }
  }
  if (rule.extra) {
    checks.push(...rule.extra(node));
  }

  return checks;
}

// ----------------------------------------------------------------------------
// Top-level validate
// ----------------------------------------------------------------------------

function flattenGraph(json: unknown, blockIndex: number, out: ParsedNode[]) {
  function add(obj: unknown) {
    if (!isObject(obj)) return;
    if ('@graph' in obj && Array.isArray(obj['@graph'])) {
      for (const child of obj['@graph']) add(child);
      return;
    }
    if (!('@type' in obj)) return;
    out.push({
      index: out.length,
      blockIndex,
      type: getType(obj),
      id: typeof obj['@id'] === 'string' ? (obj['@id'] as string) : undefined,
      raw: obj,
      checks: validateNode(obj),
    });
  }
  if (Array.isArray(json)) {
    for (const item of json) add(item);
  } else {
    add(json);
  }
}

export function validate(html: string): ValidationResult {
  const blocks = extractJsonLdBlocks(html);
  const parseErrors: ValidationResult['parseErrors'] = [];
  const nodes: ParsedNode[] = [];

  blocks.forEach((block, blockIndex) => {
    const trimmed = block.trim();
    if (!trimmed) return;
    try {
      const parsed = JSON.parse(trimmed);
      flattenGraph(parsed, blockIndex, nodes);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'unknown parse error';
      parseErrors.push({
        blockIndex,
        message,
        snippet: trimmed.slice(0, 200),
      });
    }
  });

  const globalChecks: SchemaCheck[] = [];

  if (blocks.length === 0) {
    globalChecks.push({
      level: 'error',
      message:
        'No JSON-LD blocks found on the page. AI assistants rely heavily on structured data to identify and recommend businesses — this is the most important thing to add.',
    });
  }

  // Look for an Organization or LocalBusiness as the entity foundation.
  const types = new Set(nodes.map((n) => n.type));
  const hasOrg =
    types.has('Organization') ||
    types.has('LocalBusiness') ||
    Array.from(types).some((t) =>
      ['ProfessionalService', 'Restaurant', 'Store', 'MedicalBusiness', 'HomeAndConstructionBusiness'].includes(t)
    );
  if (blocks.length > 0 && !hasOrg) {
    globalChecks.push({
      level: 'warning',
      message:
        'No Organization or LocalBusiness entity found. This is the foundation AI uses to understand who you are — without it, other schema has nothing to anchor to.',
    });
  }

  // @id orphan check
  const ids = new Set<string>(nodes.filter((n) => n.id).map((n) => n.id as string));
  for (const node of nodes) {
    visitRefs(node.raw, (ref) => {
      if (!ids.has(ref)) {
        node.checks.push({
          level: 'info',
          field: '@id reference',
          message: `Reference to @id "${ref}" but that node isn't defined in the same graph.`,
        });
      }
    });
  }

  const summary = computeSummary(nodes, globalChecks, parseErrors.length, blocks.length);

  return {
    jsonLdBlockCount: blocks.length,
    parseErrors,
    nodes,
    globalChecks,
    summary,
  };
}

function visitRefs(obj: unknown, visit: (id: string) => void) {
  if (!obj) return;
  if (Array.isArray(obj)) {
    for (const item of obj) visitRefs(item, visit);
    return;
  }
  if (typeof obj !== 'object') return;
  const rec = obj as Record<string, unknown>;
  for (const [key, value] of Object.entries(rec)) {
    if (key === '@id' && typeof value === 'string') {
      // Don't flag self @id declarations — only references inside other fields
      continue;
    }
    if (isObject(value) && Object.keys(value).length === 1 && typeof value['@id'] === 'string') {
      visit(value['@id'] as string);
    } else {
      visitRefs(value, visit);
    }
  }
}

function computeSummary(
  nodes: ParsedNode[],
  globalChecks: SchemaCheck[],
  parseErrorCount: number,
  blockCount: number
) {
  let errors = parseErrorCount;
  let warnings = 0;
  let infos = 0;
  const all = [...globalChecks, ...nodes.flatMap((n) => n.checks)];
  for (const c of all) {
    if (c.level === 'error') errors++;
    else if (c.level === 'warning') warnings++;
    else infos++;
  }
  // Score model: start at 100, large penalty for no schema at all,
  // smaller penalties per error/warning. Floor at 0.
  let score = 100;
  if (blockCount === 0) {
    score = 0;
  } else {
    score -= errors * 12;
    score -= warnings * 4;
    score = Math.max(0, score);
  }
  return { errors, warnings, infos, score };
}
