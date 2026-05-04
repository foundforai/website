import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');
const ssrDistDir = resolve(__dirname, 'dist-ssr');

const ssr = await import(pathToFileURL(join(ssrDistDir, 'entry-server.js')).href);
const { render, prerenderPaths, sitemapEntries } = ssr;

const template = await readFile(join(distDir, 'index.html'), 'utf-8');

for (const route of prerenderPaths) {
  const { html, head } = render(route);
  const final = template
    .replace('<!--ssr-head-->', head)
    .replace('<!--ssr-outlet-->', html);

  const outPath = route === '/'
    ? join(distDir, 'index.html')
    : join(distDir, route.replace(/^\//, ''), 'index.html');
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, final);
  console.log(`  prerendered ${route}`);
}

console.log(`\n✓ Pre-rendered ${prerenderPaths.length} routes`);

const SITE_ORIGIN = 'https://foundforai.com';

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const xmlBody = sitemapEntries.map((r) => {
  const loc = `${SITE_ORIGIN}${r.path === '/' ? '/' : r.path}`;
  const parts = [`    <loc>${escapeXml(loc)}</loc>`];
  if (r.lastmod) parts.push(`    <lastmod>${escapeXml(r.lastmod)}</lastmod>`);
  if (r.changefreq) parts.push(`    <changefreq>${r.changefreq}</changefreq>`);
  if (typeof r.priority === 'number') parts.push(`    <priority>${r.priority.toFixed(1)}</priority>`);
  return `  <url>\n${parts.join('\n')}\n  </url>`;
}).join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlBody}
</urlset>
`;

await writeFile(join(distDir, 'sitemap.xml'), sitemapXml);
console.log(`✓ Wrote sitemap.xml with ${sitemapEntries.length} entries`);
