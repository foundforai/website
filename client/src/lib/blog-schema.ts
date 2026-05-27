import type { BlogPost } from '@/data/blog-posts';

const SITE_ORIGIN = 'https://foundforai.com';
const DEFAULT_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;
const ORG_ID = `${SITE_ORIGIN}/#org`;

const KNOWN_AUTHORS: Record<string, Record<string, unknown>> = {
  'Dustin Crump': { "@id": `${SITE_ORIGIN}/#dustin-crump` },
};

function resolveAuthor(name: string): Record<string, unknown> {
  return KNOWN_AUTHORS[name] ?? { "@type": "Person", "name": name };
}

function toIsoDate(date: string): string {
  if (!date) return date;
  if (date.includes('T')) return date;
  return `${date}T00:00:00-07:00`;
}

function absoluteImage(image: string | undefined): string {
  if (!image) return DEFAULT_IMAGE;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  return `${SITE_ORIGIN}${image.startsWith('/') ? image : `/${image}`}`;
}

export function buildBlogPostingSchema(post: BlogPost): Record<string, unknown> {
  const url = `${SITE_ORIGIN}/blog/${post.slug}`;
  const description =
    post.schemaDescription || post.metaDescription || post.excerpt;

  const schema: Record<string, unknown> = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    "url": url,
    "headline": post.title,
    "description": description,
    "image": absoluteImage(post.image),
    "datePublished": toIsoDate(post.date),
    "dateModified": toIsoDate(post.dateModified || post.date),
    "author": resolveAuthor(post.author),
    "publisher": { "@id": ORG_ID },
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "inLanguage": "en-US",
  };

  if (post.keywords) schema.keywords = post.keywords;
  if (post.articleSection) schema.articleSection = post.articleSection;

  if (post.mentions && post.mentions.length > 0) {
    schema.mentions = post.mentions.map((m) => ({
      "@type": "Organization",
      "name": m.name,
      "url": m.url,
    }));
  } else if (post.hasMentions) {
    schema.mentions = {
      "@type": "Organization",
      "name": "Fripse AI",
      "url": "https://fripse.com",
    };
  }

  return schema;
}
