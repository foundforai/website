import { resolveTier, playbookTiers, PLAYBOOK_TOTAL_CHECKS } from '@/data/playbook';

interface Props {
  checkedCount: number;
}

export default function PlaybookScore({ checkedCount }: Props) {
  const activeTier = resolveTier(checkedCount);
  const pct = (checkedCount / PLAYBOOK_TOTAL_CHECKS) * 100;

  // Circular dial geometry
  const size = 140;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct / 100);

  return (
    <section
      id="score"
      className="scroll-mt-24 pt-12 sm:pt-16"
      data-testid="playbook-score"
    >
      <div className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-2">
        Score yourself
      </div>
      <h2
        className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-4"
        style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.02em' }}
      >
        How visible are you to AI?
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
        Count how many of the {PLAYBOOK_TOTAL_CHECKS} boxes you could
        confidently check.
      </p>

      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-6 sm:p-8 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-6 items-center">
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">
              Your score
            </div>
            <div
              className="text-6xl sm:text-7xl font-black text-slate-900 dark:text-slate-100 leading-none"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.03em' }}
            >
              {checkedCount}
              <span className="text-3xl sm:text-4xl font-bold text-slate-300 dark:text-slate-500 ml-1">
                / {PLAYBOOK_TOTAL_CHECKS}
              </span>
            </div>
          </div>

          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            aria-hidden="true"
            className="justify-self-start sm:justify-self-end"
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#0F5FDB"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              style={{ transition: 'stroke-dashoffset 500ms ease' }}
            />
          </svg>
        </div>

        <div className="mt-6 h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: '#0F5FDB' }}
          />
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#0F5FDB] mb-1.5">
            {activeTier.range} checked
          </div>
          <h3
            className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {activeTier.heading}
          </h3>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {activeTier.body}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {playbookTiers.map((t) => {
          const active = t.match(checkedCount);
          return (
            <div
              key={t.range}
              className={`rounded-xl p-4 border transition ${
                active
                  ? 'bg-[#0F5FDB]/5 border-[#0F5FDB]/30'
                  : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 opacity-60'
              }`}
              data-testid={`playbook-tier-${active ? 'active' : 'inactive'}`}
            >
              <div className="text-xs font-semibold tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-1">
                {t.range} checked
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {t.heading}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        The good news: most of what’s on this list is fixable in a single
        focused implementation. You don’t need a year-long SEO contract. You
        need someone to install the right technical foundation once, correctly.
      </p>
    </section>
  );
}
