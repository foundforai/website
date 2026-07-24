import { writeFile, readFile, mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');
const ssrDistDir = resolve(__dirname, 'dist-ssr');

const ssr = await import(pathToFileURL(join(ssrDistDir, 'entry-server.js')).href);
const { render, prerenderPaths, sitemapEntries, allRoutes } = ssr;

const template = await readFile(join(distDir, 'index.html'), 'utf-8');

const SITE_ORIGIN = 'https://foundforai.com';

// ---------------------------------------------------------------------------
// Markdown mirror: every indexable content page is also emitted as /<path>.md
// (home -> /index.md) so AI agents can read clean Markdown instead of parsing
// the React DOM. Content is extracted from the page's <main> landmark (every
// page uses PageLayout, so nav/footer are excluded), converted with turndown,
// internal links are rewritten to their .md counterparts, and each file links
// back to /llms.txt + /llms-full.txt. The generated list is injected into
// llms.txt at the <!--MD_INDEX--> marker. Legal/funnel pages are excluded.
// ---------------------------------------------------------------------------
const MD_EXCLUDE = new Set(['/privacy', '/terms', '/refund-policy']);
const mdRoutes = allRoutes.filter((r) => r.prerender && r.sitemap && !MD_EXCLUDE.has(r.path));
const mdSet = new Set(mdRoutes.map((r) => r.path));

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  hr: '---',
  emDelimiter: '_',
});
turndown.use(gfm);
turndown.remove(['script', 'style', 'noscript']);

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&nbsp;/g, ' ');
}

function cleanTitle(head, route) {
  const m = head.match(/<title>([\s\S]*?)<\/title>/i);
  const raw = m ? decodeEntities(m[1]).trim() : route;
  return raw.replace(/\s*[|\-–—]\s*Found For AI\s*$/i, '').trim() || raw;
}

function mdPathFor(route) {
  return route === '/' ? '/index.md' : `${route}.md`;
}

// Rewrite Markdown links to internal pages so they point at the .md mirror
// (only when that page actually has a mirror). Preserves ?query and #hash.
function rewriteInternalLinks(md) {
  return md.replace(/\]\((\/[^)\s]*)\)/g, (full, url) => {
    const parts = url.match(/^(\/[^?#]*)([?#].*)?$/);
    if (!parts) return full;
    const p = parts[1].replace(/\/+$/, '') || '/';
    const rest = parts[2] || '';
    if (p === '/' && mdSet.has('/')) return `](/index.md${rest})`;
    if (mdSet.has(p)) return `](${p}.md${rest})`;
    return full;
  });
}

// Adjacent CTA buttons render as back-to-back links with no separator
// (`](/a.md)[Label](/b.md)`). Insert a space so each link parses cleanly.
function spaceAdjacentLinks(md) {
  return md.replace(/(\]\([^)]*\))(\[)/g, '$1 $2');
}

function buildMarkdown(route, title, bodyMd) {
  const canonical = `${SITE_ORIGIN}${route === '/' ? '/' : route}`;
  const header =
    `> **${title}**\n` +
    `> Markdown mirror of ${canonical} — part of the Found For AI knowledge base.\n` +
    `> Index: ${SITE_ORIGIN}/llms.txt · Full knowledge file: ${SITE_ORIGIN}/llms-full.txt`;
  const footer =
    `---\n\n` +
    `_Canonical page: ${canonical} · Found For AI — AI-visibility knowledge base: ` +
    `${SITE_ORIGIN}/llms.txt · ${SITE_ORIGIN}/llms-full.txt_`;
  return `${header}\n\n${bodyMd.trim()}\n\n${footer}\n`;
}

const mdIndex = [];

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

  if (mdSet.has(route)) {
    const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
    const contentHtml = mainMatch ? mainMatch[1] : html;
    const title = cleanTitle(head, route);
    const bodyMd = spaceAdjacentLinks(rewriteInternalLinks(turndown.turndown(contentHtml)));
    const outMd = route === '/'
      ? join(distDir, 'index.md')
      : join(distDir, `${route.replace(/^\//, '')}.md`);
    await mkdir(dirname(outMd), { recursive: true });
    await writeFile(outMd, buildMarkdown(route, title, bodyMd));
    mdIndex.push({ route, title });
    console.log(`  markdown    ${mdPathFor(route)}`);
  }
}

console.log(`\n✓ Pre-rendered ${prerenderPaths.length} routes`);
console.log(`✓ Wrote ${mdIndex.length} Markdown mirror files`);

// Inject the generated Markdown index into dist/llms.txt at the marker.
try {
  const llmsPath = join(distDir, 'llms.txt');
  let llms = await readFile(llmsPath, 'utf-8');
  if (llms.includes('<!--MD_INDEX-->')) {
    const list = mdIndex
      .map(({ route, title }) => `- ${SITE_ORIGIN}${mdPathFor(route)} — ${title}`)
      .join('\n');
    llms = llms.replace('<!--MD_INDEX-->', list);
    await writeFile(llmsPath, llms);
    console.log(`✓ Injected ${mdIndex.length} Markdown links into llms.txt`);
  } else {
    console.warn('  llms.txt: <!--MD_INDEX--> marker not found; skipped md index injection');
  }
} catch (err) {
  console.warn('  could not inject md index into llms.txt:', err.message);
}

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

// Inline AI-source classifier for standalone HTML pages (the React app uses
// AiSourceTracker.tsx). Mirrors classifyAiSource in client/src/lib/ai-source.ts —
// keep the rule list in sync.
const AI_SOURCE_SCRIPT = `<script>
(function(){
  var STORAGE_KEY='ai_source';
  var rules=[
    {p:'bing.com/chat', s:'copilot'},
    {p:'chatgpt.com', s:'chatgpt'},
    {p:'chat.openai.com', s:'chatgpt'},
    {p:'openai.com', s:'chatgpt'},
    {p:'claude.ai', s:'claude'},
    {p:'anthropic.com', s:'claude'},
    {p:'perplexity.ai', s:'perplexity'},
    {p:'gemini.google.com', s:'gemini'},
    {p:'bard.google.com', s:'gemini'},
    {p:'copilot.microsoft.com', s:'copilot'},
    {p:'meta.ai', s:'meta_ai'},
    {p:'you.com', s:'you_com'},
    {p:'phind.com', s:'phind'}
  ];
  function classify(ref){
    if(!ref) return 'not_ai';
    try{
      var u=new URL(ref);
      var t=(u.hostname+u.pathname).toLowerCase();
      for(var i=0;i<rules.length;i++){ if(t.indexOf(rules[i].p)!==-1) return rules[i].s; }
    }catch(e){}
    return 'not_ai';
  }
  var ref=document.referrer||'';
  var src=classify(ref);
  var stored=null;
  try{ var raw=sessionStorage.getItem(STORAGE_KEY); if(raw) stored=JSON.parse(raw); }catch(e){}
  if(!stored || src!=='not_ai'){
    var rec={ai_source:src, ai_landing_path:location.pathname, ai_landing_ts:new Date().toISOString()};
    try{ sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rec)); }catch(e){}
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({event:'ai_source_set', ai_source:rec.ai_source, ai_landing_path:rec.ai_landing_path});
    if(typeof window.gtag==='function'){ window.gtag('set','user_properties',{ai_source:rec.ai_source}); }
  }
})();
</script>`;

const LEAD_INTENT_SCRIPT = `<script>
(function(){
  function aiSrc(){
    try{ var r=sessionStorage.getItem('ai_source'); if(!r) return null; var p=JSON.parse(r); return p&&p.ai_source||null; }catch(e){ return null; }
  }
  document.addEventListener('click', function(e){
    var a = e.target && e.target.closest && e.target.closest('a[href]');
    if(!a) return;
    var href = a.getAttribute('href') || '';
    var type = href.indexOf('mailto:')===0 ? 'email' : (href.indexOf('tel:')===0 ? 'phone' : null);
    if(!type) return;
    var payload={event:'lead_intent', link_type:type, link_url:href};
    var s=aiSrc(); if(s) payload.ai_source=s;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
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
  // Order matters: GTM head first so dataLayer exists, then ai_source script
  // (also in head) so the source is set before any later events fire.
  html = html.replace('<head>', `<head>\n  ${GTM_HEAD}\n  ${AI_SOURCE_SCRIPT}\n`);
  html = html.replace('<body>', `<body>\n  ${GTM_BODY_NOSCRIPT}`);
  html = html.replace('</body>', `  ${LEAD_INTENT_SCRIPT}\n</body>`);
  await writeFile(filePath, html);
  console.log(`  injected GTM + ai_source + lead_intent into ${filename}`);
  injected++;
}
console.log(`✓ Injected GTM into ${injected} standalone HTML file${injected === 1 ? '' : 's'}`);
