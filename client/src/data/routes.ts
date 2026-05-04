import { blogPosts } from './blog-posts';

export type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface RouteEntry {
  path: string;
  prerender: boolean;
  sitemap: boolean;
  priority?: number;
  changefreq?: ChangeFreq;
  lastmod?: string;
}

const STATIC_ROUTES: RouteEntry[] = [
  { path: '/', prerender: true, sitemap: true, priority: 1.0, changefreq: 'weekly' },
  { path: '/audit', prerender: true, sitemap: true, priority: 0.9, changefreq: 'monthly' },
  { path: '/pricing', prerender: true, sitemap: true, priority: 0.9, changefreq: 'monthly' },
  { path: '/services', prerender: true, sitemap: true, priority: 0.8, changefreq: 'monthly' },
  { path: '/playbook', prerender: true, sitemap: true, priority: 0.9, changefreq: 'monthly' },
  { path: '/playbook/thanks', prerender: true, sitemap: false },
  { path: '/aeo', prerender: true, sitemap: true, priority: 0.8, changefreq: 'monthly' },
  { path: '/what-is-ai-seo', prerender: true, sitemap: true, priority: 0.8, changefreq: 'monthly' },
  { path: '/what-is-found-for-ai', prerender: true, sitemap: true, priority: 0.8, changefreq: 'monthly' },
  { path: '/ai-search-visibility', prerender: true, sitemap: true, priority: 0.7, changefreq: 'monthly' },
  { path: '/insights', prerender: true, sitemap: true, priority: 0.7, changefreq: 'monthly' },
  { path: '/about', prerender: true, sitemap: true, priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', prerender: true, sitemap: true, priority: 0.7, changefreq: 'monthly' },
  { path: '/book-call', prerender: true, sitemap: true, priority: 0.7, changefreq: 'monthly' },
  { path: '/thank-you', prerender: true, sitemap: false },
  { path: '/blog', prerender: true, sitemap: true, priority: 0.8, changefreq: 'weekly' },
  { path: '/media', prerender: true, sitemap: true, priority: 0.6, changefreq: 'monthly' },
  { path: '/media/small-lake-city-podcast', prerender: true, sitemap: true, priority: 0.6, changefreq: 'monthly' },
  // Standalone HTML pages (already static — not prerendered, but included in sitemap where appropriate)
  { path: '/ai-visibility', prerender: false, sitemap: true, priority: 0.8, changefreq: 'monthly' },
  { path: '/talk-to-a-human', prerender: false, sitemap: true, priority: 0.6, changefreq: 'monthly' },
  { path: '/fix-plan', prerender: false, sitemap: true, priority: 1.0, changefreq: 'monthly' },
  { path: '/fix-plan/request', prerender: false, sitemap: false },
  { path: '/fix-plan/thanks', prerender: false, sitemap: false },
];

const BLOG_ROUTES: RouteEntry[] = blogPosts.map((p) => ({
  path: `/blog/${p.slug}`,
  prerender: true,
  sitemap: true,
  priority: 0.7,
  changefreq: 'monthly' as const,
  lastmod: p.dateModified || p.date,
}));

export const allRoutes: RouteEntry[] = [...STATIC_ROUTES, ...BLOG_ROUTES];

export const prerenderPaths: string[] = allRoutes
  .filter((r) => r.prerender)
  .map((r) => r.path);

export const sitemapEntries: RouteEntry[] = allRoutes.filter((r) => r.sitemap);
