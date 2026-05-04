import { writeFile, readFile, mkdir, readdir } from 'node:fs/promises';
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

// Inject GTM into standalone HTML files (the ones in client/public/*.html that
// bypass the React app shell — fix-plan.html, talk-to-a-human.html, etc.).
// They live at the top level of dist/ and don't yet include GTM. Pre-rendered
// routes already inherit GTM from client/index.html, so the include-check
// below skips them.
const GTM_ID = 'GTM-PC6434DW';

const GTM_HEAD = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');</script>
<!-- End Google Tag Manager -->`;

const GTM_BODY_NOSCRIPT = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;

const LEAD_INTENT_SCRIPT = `<script>
(function(){
  document.addEventListener('click', function(e){
    var a = e.target && e.target.closest && e.target.closest('a[href]');
    if(!a) return;
    var href = a.getAttribute('href') || '';
    var type = href.indexOf('mailto:')===0 ? 'email' : (href.indexOf('tel:')===0 ? 'phone' : null);
    if(!type) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event:'lead_intent', link_type:type, link_url:href});
  });
})();
</script>`;

const distEntries = await readdir(distDir);
const topLevelHtml = distEntries.filter((f) => f.endsWith('.html'));
let injected = 0;
for (const filename of topLevelHtml) {
  const filePath = join(distDir, filename);
  let html = await readFile(filePath, 'utf-8');
  if (html.includes(GTM_ID)) continue;
  if (!html.includes('<head>') || !html.includes('<body>') || !html.includes('</body>')) {
    console.warn(`  skipped ${filename}: missing standard head/body markers`);
    continue;
  }
  html = html.replace('<head>', `<head>\n  ${GTM_HEAD}\n`);
  html = html.replace('<body>', `<body>\n  ${GTM_BODY_NOSCRIPT}`);
  html = html.replace('</body>', `  ${LEAD_INTENT_SCRIPT}\n</body>`);
  await writeFile(filePath, html);
  console.log(`  injected GTM + lead_intent into ${filename}`);
  injected++;
}
console.log(`✓ Injected GTM into ${injected} standalone HTML file${injected === 1 ? '' : 's'}`);
