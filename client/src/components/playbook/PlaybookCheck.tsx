import { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import type { PlaybookCheck as PlaybookCheckData } from '@/data/playbook';

interface Props {
  check: PlaybookCheckData;
  sectionNum: string;
  isChecked: boolean;
  onToggle: () => void;
}

export default function PlaybookCheck({
  check,
  sectionNum,
  isChecked,
  onToggle,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const itemLabel = `${sectionNum}.${check.id.slice(-1).toUpperCase()}`;

  return (
    <div
      className={`flex gap-4 py-4 border-b border-slate-100 dark:border-slate-700 last:border-b-0 ${
        isChecked ? 'opacity-70' : ''
      }`}
      data-testid={`playbook-check-${check.id}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={isChecked}
        aria-label={isChecked ? 'Checked' : 'Not checked'}
        className={`shrink-0 w-7 h-7 mt-0.5 rounded-md border-2 flex items-center justify-center transition ${
          isChecked
            ? 'bg-[#0F5FDB] border-[#0F5FDB] text-white'
            : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-[#0F5FDB]'
        }`}
        data-testid={`playbook-check-toggle-${check.id}`}
      >
        {isChecked ? <Check className="h-4 w-4" /> : null}
      </button>

      <div className="flex-1">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full text-left flex items-start gap-2 group"
          aria-expanded={expanded}
          data-testid={`playbook-check-expand-${check.id}`}
        >
          <span
            className="text-xs font-bold text-slate-400 dark:text-slate-500 tabular-nums mt-1 shrink-0"
            style={{ letterSpacing: '0.05em' }}
          >
            {itemLabel}
          </span>
          <span
            className={`flex-1 text-base sm:text-lg leading-snug font-semibold ${
              isChecked
                ? 'text-slate-500 dark:text-slate-400 line-through decoration-1'
                : 'text-slate-900 dark:text-slate-100'
            } group-hover:text-[#0F5FDB] transition`}
          >
            {check.title}
          </span>
          <ChevronRight
            className={`h-4 w-4 mt-1.5 shrink-0 text-slate-400 transition-transform ${
              expanded ? 'rotate-90' : ''
            }`}
          />
        </button>
        {expanded ? (
          <p className="mt-3 ml-8 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {check.detail}
          </p>
        ) : null}
      </div>
    </div>
  );
}
