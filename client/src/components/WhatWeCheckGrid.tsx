const CHECKS: Array<{ icon: string; label: string }> = [
  { icon: '🗂', label: 'Schema.org Data' },
  { icon: '🤖', label: 'AI Crawler Access' },
  { icon: '📄', label: 'llms.txt' },
  { icon: '🗺', label: 'XML Sitemap' },
  { icon: '⚙️', label: 'Technical SEO' },
  { icon: '🏆', label: 'E-E-A-T Signals' },
];

export default function WhatWeCheckGrid() {
  return (
    <section
      className="py-16 md:py-20 bg-white dark:bg-slate-900"
      data-testid="what-we-check"
    >
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <p className="text-center text-xs font-semibold tracking-widest text-slate-400 uppercase mb-6">
          What We Check
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CHECKS.map((check) => (
            <div
              key={check.label}
              className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm px-4 py-3.5 flex items-center gap-3"
              data-testid={`what-we-check-${check.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            >
              <span className="text-xl" aria-hidden="true">
                {check.icon}
              </span>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                {check.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Standards sourced directly from Google, Microsoft, OpenAI, Anthropic,
          schema.org, and llms.txt.
        </p>
      </div>
    </section>
  );
}
