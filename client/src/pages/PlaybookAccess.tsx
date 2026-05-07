import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { Download, RotateCcw } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PlaybookSideNav from '@/components/playbook/PlaybookSideNav';
import PlaybookSection from '@/components/playbook/PlaybookSection';
import PlaybookScore from '@/components/playbook/PlaybookScore';
import PlaybookCloser from '@/components/playbook/PlaybookCloser';
import {
  PLAYBOOK_STORAGE_KEY,
  PLAYBOOK_TOTAL_CHECKS,
  playbookSections,
} from '@/data/playbook';

const ACCESS_FLAG_KEY = 'ffa-playbook-access';

export default function PlaybookAccess() {
  const [, setLocation] = useLocation();
  const [hydrated, setHydrated] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState<string>('section-01');

  // On mount: confirm the user came through the email gate, otherwise
  // soft-redirect to /playbook so they can submit their email.
  useEffect(() => {
    let access = false;
    try {
      access = !!window.localStorage.getItem(ACCESS_FLAG_KEY);
    } catch {
      // localStorage unavailable — treat as no access.
    }
    setHasAccess(access);
    setHydrated(true);
    if (!access) {
      setLocation('/playbook');
    }
  }, [setLocation]);

  // Restore previously saved checks on mount; persist on every change.
  useEffect(() => {
    if (!hasAccess) return;
    try {
      const raw = window.localStorage.getItem(PLAYBOOK_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, boolean>;
        if (parsed && typeof parsed === 'object') setChecked(parsed);
      }
    } catch {
      // ignore — start with empty state
    }
  }, [hasAccess]);

  useEffect(() => {
    if (!hasAccess) return;
    try {
      window.localStorage.setItem(PLAYBOOK_STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // localStorage write can fail in private mode — non-fatal
    }
  }, [checked, hasAccess]);

  // Track which section the user is currently scrolled to so the side
  // nav can highlight the active one.
  useEffect(() => {
    if (!hasAccess) return;
    const handler = () => {
      const sections = document.querySelectorAll<HTMLElement>("[id^='section-']");
      let current = 'section-01';
      const offset = window.innerHeight * 0.35;
      sections.forEach((s) => {
        const rect = s.getBoundingClientRect();
        if (rect.top < offset) current = s.id;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [hasAccess]);

  const checkedCount = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked]
  );

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAll = () => {
    if (
      typeof window !== 'undefined' &&
      window.confirm('Clear every check and start the playbook over?')
    ) {
      setChecked({});
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <PageLayout
      title="The AI Visibility Playbook | Found For AI"
      description="A 20-point interactive checklist for small business owners who want to stop being invisible to ChatGPT, Google AI, Perplexity, and Claude."
      canonical="https://foundforai.com/playbook/access"
      noindex
    >
      <section className="bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {!hydrated || !hasAccess ? (
            <div className="text-center py-20 text-slate-500" data-testid="playbook-loading">
              Loading…
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <PlaybookSideNav
                sections={playbookSections}
                checked={checked}
                activeSection={activeSection}
              />

              <main className="flex-1 min-w-0 max-w-3xl">
                <header className="mb-10">
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full mb-5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Field guide · 15 minutes
                  </div>
                  <h1
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-5"
                    style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.05 }}
                    data-testid="playbook-h1"
                  >
                    Is AI recommending your business — or{' '}
                    <span style={{ color: '#0F5FDB' }}>skipping right past it?</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    A twenty-point checklist for small business owners who want
                    to stop being invisible to ChatGPT, Google’s AI Overview,
                    Perplexity, and the AI search built into every modern phone.
                  </p>

                  <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <div>
                      <div className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">
                        Sections
                      </div>
                      <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                        5 · 20 checks
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">
                        Your progress
                      </div>
                      <div className="text-base font-bold" style={{ color: '#0F5FDB' }}>
                        {checkedCount} / {PLAYBOOK_TOTAL_CHECKS} checked
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">
                        Published by
                      </div>
                      <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                        Found For AI
                      </div>
                    </div>
                  </div>
                </header>

                {/* Why this matters — narrative intro */}
                <section className="mb-12 sm:mb-16">
                  <div className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-3">
                    Why this matters now
                  </div>
                  <p className="text-lg sm:text-xl text-slate-800 dark:text-slate-100 leading-relaxed mb-4 font-medium">
                    Something quietly changed in how people find businesses like yours.
                  </p>
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    When a homeowner needs an HVAC company, they used to Google
                    it and scroll through ten results. Today, more and more of
                    them ask ChatGPT. Or they use Google’s AI Overview. Or
                    Perplexity. Or the AI search built into their phone.
                  </p>
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    And here’s the part most owners haven’t clocked yet:{' '}
                    <strong className="text-slate-900 dark:text-slate-100">
                      AI doesn’t show them ten options. It shows them one or two.
                    </strong>{' '}
                    And the AI decides which ones.
                  </p>
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    If your business isn’t one of the names it hands over, you
                    never even got the chance to compete. You weren’t outbid.
                    You weren’t outranked. You were invisible.
                  </p>

                  <blockquote className="border-l-4 pl-5 my-6" style={{ borderColor: '#0F5FDB' }}>
                    <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0F5FDB] mb-2">
                      The good news
                    </div>
                    <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                      Most of your competitors are just as invisible as you are.
                      Whoever fixes this first wins the AI recommendation.
                    </p>
                  </blockquote>

                  <h3
                    className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    How to use this playbook
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    There are 20 checkboxes across 5 sections. Each one is
                    something AI systems actually look for when they decide
                    whether to recommend a business.
                  </p>
                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    Go through it honestly. Check what you can confidently say
                    is true about your business today. Leave the rest blank. At
                    the end, you’ll score yourself and know exactly where you
                    stand.
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                    It should take about 15 minutes. Grab a coffee.
                  </p>
                </section>

                {/* The 5 sections */}
                {playbookSections.map((s) => (
                  <PlaybookSection
                    key={s.num}
                    section={s}
                    checked={checked}
                    onToggle={toggle}
                  />
                ))}

                <PlaybookScore checkedCount={checkedCount} />
                <PlaybookCloser />

                <div className="no-print flex flex-col sm:flex-row gap-3 mt-12">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm hover:shadow transition"
                    data-testid="playbook-print"
                  >
                    <Download className="h-4 w-4" />
                    Print or save as PDF
                  </button>
                  <button
                    type="button"
                    onClick={resetAll}
                    className="inline-flex items-center justify-center gap-2 bg-transparent border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-700 transition"
                    data-testid="playbook-reset"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset my checklist
                  </button>
                </div>
              </main>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
