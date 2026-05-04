export type AiSource =
  | 'chatgpt'
  | 'claude'
  | 'perplexity'
  | 'gemini'
  | 'copilot'
  | 'meta_ai'
  | 'you_com'
  | 'phind'
  | 'other_ai'
  | 'not_ai';

interface Rule {
  pattern: string;
  source: AiSource;
}

// Matched in order via hostname+path includes (case-insensitive). Patterns
// containing "/" are matched against host+path; bare hostnames are matched
// against the host. Order matters: more-specific rules come first.
const RULES: Rule[] = [
  { pattern: 'bing.com/chat', source: 'copilot' },
  { pattern: 'chatgpt.com', source: 'chatgpt' },
  { pattern: 'chat.openai.com', source: 'chatgpt' },
  { pattern: 'openai.com', source: 'chatgpt' },
  { pattern: 'claude.ai', source: 'claude' },
  { pattern: 'anthropic.com', source: 'claude' },
  { pattern: 'perplexity.ai', source: 'perplexity' },
  { pattern: 'gemini.google.com', source: 'gemini' },
  { pattern: 'bard.google.com', source: 'gemini' },
  { pattern: 'copilot.microsoft.com', source: 'copilot' },
  { pattern: 'meta.ai', source: 'meta_ai' },
  { pattern: 'you.com', source: 'you_com' },
  { pattern: 'phind.com', source: 'phind' },
];

export function classifyAiSource(referrer: string): AiSource {
  if (!referrer) return 'not_ai';
  let test: string;
  try {
    const u = new URL(referrer);
    test = (u.hostname + u.pathname).toLowerCase();
  } catch {
    return 'not_ai';
  }
  for (const { pattern, source } of RULES) {
    if (test.includes(pattern)) return source;
  }
  return 'not_ai';
}
