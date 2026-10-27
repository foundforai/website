// Keeps returning visitors from getting stuck on an old build.
// The site is a single-page app: a tab that stays open keeps running the
// JavaScript (and blog list) it first loaded, even after a new deploy.
// When the tab regains focus (and every few minutes), we check whether the
// live site is serving a newer bundle. If it is, the next in-app link click
// does a full page load instead of a client-side route change, so the
// visitor gets the current content without a hard refresh.

const CHECK_INTERVAL_MS = 5 * 60 * 1000;
let isStale = false;
let lastCheck = 0;

function currentBundle(): string | null {
  const el = document.querySelector<HTMLScriptElement>('script[type="module"][src*="/assets/index-"]');
  if (!el) return null;
  const m = el.getAttribute('src')!.match(/\/assets\/index-[^"'?]+\.js/);
  return m ? m[0] : null;
}

async function checkForNewBuild() {
  const now = Date.now();
  if (isStale || now - lastCheck < 60 * 1000) return;
  lastCheck = now;
  const mine = currentBundle();
  if (!mine) return;
  try {
    const res = await fetch('/', { cache: 'no-store', headers: { Accept: 'text/html' } });
    if (!res.ok) return;
    const html = await res.text();
    const m = html.match(/\/assets\/index-[^"'?]+\.js/);
    if (m && m[0] !== mine) isStale = true;
  } catch {
    // Offline or blocked: ignore and try again later.
  }
}

export function installStaleBuildCheck() {
  if (typeof window === 'undefined' || import.meta.env.DEV) return;

  const origPush = history.pushState.bind(history);
  history.pushState = function (data: unknown, unused: string, url?: string | URL | null) {
    if (isStale && url != null) {
      window.location.assign(String(url));
      return;
    }
    return origPush(data, unused, url);
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void checkForNewBuild();
  });
  window.addEventListener('focus', () => void checkForNewBuild());
  window.setInterval(() => void checkForNewBuild(), CHECK_INTERVAL_MS);
}
