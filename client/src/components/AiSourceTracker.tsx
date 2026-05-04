import { useEffect } from 'react';
import { classifyAiSource, type AiSource } from '@/lib/ai-source';

interface StoredAiSource {
  ai_source: AiSource;
  ai_landing_path: string;
  ai_landing_ts: string;
}

const STORAGE_KEY = 'ai_source';

function readStored(): StoredAiSource | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredAiSource;
  } catch {
    return null;
  }
}

function writeStored(record: StoredAiSource): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* private mode / quota issues — ignore silently */
  }
}

export default function AiSourceTracker() {
  useEffect(() => {
    const referrer = document.referrer || '';
    const newSource = classifyAiSource(referrer);
    const stored = readStored();

    // Set on first arrival OR when a fresh AI referrer appears (the AI
    // referrer is the more interesting signal so we let it overwrite).
    const shouldUpdate = !stored || newSource !== 'not_ai';
    if (!shouldUpdate) return;

    const record: StoredAiSource = {
      ai_source: newSource,
      ai_landing_path: window.location.pathname,
      ai_landing_ts: new Date().toISOString(),
    };
    writeStored(record);

    if (!Array.isArray(window.dataLayer)) {
      window.dataLayer = [];
    }
    window.dataLayer.push({
      event: 'ai_source_set',
      ai_source: record.ai_source,
      ai_landing_path: record.ai_landing_path,
    });

    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') {
      gtag('set', 'user_properties', { ai_source: record.ai_source });
    }
  }, []);

  return null;
}
