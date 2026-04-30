import { renderToString } from 'react-dom/server';
import App from './App';
import { resetHead, getHeadHtml } from './lib/ssr-head';

export function render(url: string) {
  resetHead();
  const html = renderToString(<App ssrPath={url} />);
  const head = getHeadHtml();
  return { html, head };
}
