import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');
const ssrDistDir = resolve(__dirname, 'dist-ssr');

const { render } = await import(pathToFileURL(join(ssrDistDir, 'entry-server.js')).href);

const routes = [
  '/',
  '/what-is-ai-seo',
  '/what-is-found-for-ai',
  '/aeo',
  '/audit',
  '/services',
  '/pricing',
  '/book-call',
  '/about',
  '/contact',
  '/thank-you',
  '/blog',
  '/ai-search-visibility',
  '/insights',
  '/playbook',
  '/playbook/thanks',
  '/media',
  '/media/small-lake-city-podcast',
  '/blog/mental-model-shift-ai-search',
  '/blog/what-is-found-for-ai',
  '/blog/missing-half-of-ai-seo-automation',
  '/blog/are-you-ready-to-be-found-by-ai',
  '/blog/how-to-make-website-ai-discoverable',
];

const template = await readFile(join(distDir, 'index.html'), 'utf-8');

for (const route of routes) {
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

console.log(`\n✓ Pre-rendered ${routes.length} routes`);
