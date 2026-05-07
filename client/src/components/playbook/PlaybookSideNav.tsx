import type { PlaybookSection } from '@/data/playbook';
import { PLAYBOOK_TOTAL_CHECKS } from '@/data/playbook';

interface Props {
  sections: PlaybookSection[];
  checked: Record<string, boolean>;
  activeSection: string;
}

export default function PlaybookSideNav({
  sections,
  checked,
  activeSection,
}: Props) {
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const pct = (totalChecked / PLAYBOOK_TOTAL_CHECKS) * 100;

  return (
    <nav
      className="no-print hidden lg:block w-64 shrink-0"
      aria-label="Playbook sections"
    >
      <div className="sticky top-24">
        <div className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-1">
          Playbook
        </div>
        <div
          className="text-base font-bold text-slate-900 dark:text-slate-100 mb-6"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          20 checks · 5 sections
        </div>

        <ul className="space-y-1 mb-6">
          {sections.map((s) => {
            const done = s.checks.filter((c) => checked[c.id]).length;
            const isActive = activeSection === `section-${s.num}`;
            return (
              <li key={s.num}>
                <a
                  href={`#section-${s.num}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                    isActive
                      ? 'bg-blue-50 dark:bg-slate-800 text-[#0F5FDB] font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                  data-testid={`playbook-sidenav-${s.num}`}
                >
                  <span className="text-xs font-bold tabular-nums w-6 shrink-0">
                    {s.num}
                  </span>
                  <span className="flex-1 truncate">{s.title}</span>
                  <span className="text-xs text-slate-400 shrink-0 tabular-nums">
                    {done}/{s.checks.length}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#score"
          className="block bg-slate-50 dark:bg-slate-800 rounded-xl p-4 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          data-testid="playbook-sidenav-score"
        >
          <div className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1.5">
            Your score
          </div>
          <div
            className="text-2xl font-extrabold text-slate-900 dark:text-slate-100"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {totalChecked}
            <span className="text-sm font-medium text-slate-400 ml-0.5">
              / {PLAYBOOK_TOTAL_CHECKS}
            </span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, backgroundColor: '#0F5FDB' }}
            />
          </div>
        </a>
      </div>
    </nav>
  );
}
