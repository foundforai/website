import type { PlaybookSection as PlaybookSectionData } from '@/data/playbook';
import PlaybookCheck from './PlaybookCheck';

interface Props {
  section: PlaybookSectionData;
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export default function PlaybookSection({ section, checked, onToggle }: Props) {
  const doneInSection = section.checks.filter((c) => checked[c.id]).length;
  const total = section.checks.length;
  const pct = total > 0 ? (doneInSection / total) * 100 : 0;

  return (
    <section
      id={`section-${section.num}`}
      className="scroll-mt-24 pt-12 sm:pt-16 first:pt-0"
      data-testid={`playbook-section-${section.num}`}
    >
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-3">
          <span
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-white font-extrabold text-xl"
            style={{
              backgroundColor: '#0F5FDB',
              fontFamily: "'Montserrat', sans-serif",
            }}
            aria-hidden="true"
          >
            {section.num}
          </span>
          <div className="flex-1">
            <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: '#0F5FDB' }}
              />
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1.5">
              {doneInSection} of {total} checked
            </div>
          </div>
        </div>
        <h2
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100"
          style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.02em' }}
        >
          {section.title}
        </h2>
      </div>

      <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 leading-relaxed mb-4 font-medium">
        {section.lede}
      </p>
      <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        {section.body}
      </p>

      {section.aside ? (
        <aside
          className="bg-slate-900 dark:bg-slate-800 text-slate-100 rounded-xl p-5 mb-8 shadow-sm"
          data-testid={`playbook-section-aside-${section.num}`}
        >
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-blue-300 mb-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />
            {section.aside.label}
          </div>
          <pre
            className="text-sm leading-relaxed whitespace-pre overflow-x-auto"
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace" }}
          >
            {section.aside.code.join('\n')}
          </pre>
        </aside>
      ) : null}

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 px-5 sm:px-6 py-2 sm:py-2">
        <div className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 pt-3 pb-2">
          The {section.checks.length} checks
        </div>
        {section.checks.map((c) => (
          <PlaybookCheck
            key={c.id}
            check={c}
            sectionNum={section.num}
            isChecked={!!checked[c.id]}
            onToggle={() => onToggle(c.id)}
          />
        ))}
      </div>
    </section>
  );
}
