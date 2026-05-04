declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

function readAiSource(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = window.sessionStorage?.getItem('ai_source');
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as { ai_source?: string };
    return parsed?.ai_source;
  } catch {
    return undefined;
  }
}

export function trackEvent(event: string, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined') return;
  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }
  const aiSource = readAiSource();
  const finalParams = aiSource ? { ai_source: aiSource, ...params } : params;
  window.dataLayer.push({ event, ...finalParams });
}
