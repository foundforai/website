import { blogPosts } from './blog-posts';

export type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface RouteEntry {
  path: string;
  prerender: boolean;
  sitemap: boolean;
  priority?: number;
  changefreq?: ChangeFreq;
  /**
   * ISO 8601 date (YYYY-MM-DD) reflecting the last meaningful content
   * change for this route. Drives <lastmod> in sitemap.xml and the
   * 7-day window the IndexNow cron uses to pick recent URLs to submit.
   * Update this when you actually change a page's content.
   */
  lastmod?: string;
}

// Default lastmod for static routes. The site was substantially refactored
// during the Replit -> Vercel migration; this is the cutover/baseline date.
// Going forward, when a static page's content actually changes, update its
// own lastmod (or this constant if the change spans many pages).
const STATIC_DEFAULT_LASTMOD = '2026-05-04';

const STATIC_ROUTES: RouteEntry[] = [
  { path: '/', prerender: true, sitemap: true, priority: 1.0, changefreq: 'weekly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/audit', prerender: true, sitemap: true, priority: 0.9, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/scorecard', prerender: true, sitemap: true, priority: 0.9, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/scorecard/results', prerender: true, sitemap: false },
  { path: '/pricing', prerender: true, sitemap: true, priority: 0.9, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/services', prerender: true, sitemap: true, priority: 0.8, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/playbook', prerender: true, sitemap: true, priority: 0.9, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/playbook/thanks', prerender: true, sitemap: false },
  { path: '/aeo', prerender: true, sitemap: true, priority: 0.8, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/what-is-ai-seo', prerender: true, sitemap: true, priority: 0.8, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/what-is-found-for-ai', prerender: true, sitemap: true, priority: 0.8, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/ai-search-visibility', prerender: true, sitemap: true, priority: 0.7, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/insights', prerender: true, sitemap: true, priority: 0.7, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/about', prerender: true, sitemap: true, priority: 0.7, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/contact', prerender: true, sitemap: true, priority: 0.7, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/book-call', prerender: true, sitemap: true, priority: 0.7, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/thank-you', prerender: true, sitemap: false },
  { path: '/blog', prerender: true, sitemap: true, priority: 0.8, changefreq: 'weekly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/media', prerender: true, sitemap: true, priority: 0.6, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/media/small-lake-city-podcast', prerender: true, sitemap: true, priority: 0.6, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  // Standalone HTML pages (already static — not prerendered, but included in sitemap where appropriate)
  { path: '/ai-visibility', prerender: false, sitemap: true, priority: 0.8, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/talk-to-a-human', prerender: false, sitemap: true, priority: 0.6, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
  { path: '/fix-plan', prerender: false, sitemap: true, priority: 1.0, changefreq: 'monthly', lastmod: STATIC_DEFAULT_LASTMOD },
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
