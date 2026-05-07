import { ArrowRight } from 'lucide-react';

const SEVEN_DAY_STEPS = [
  'Install and validate the correct structured data across your site (schema markup, JSON-LD).',
  'Fix entity consistency — your name, address, and phone across Google, directories, and your site.',
  'Clean up your AI crawl configuration (robots.txt, llms.txt, IndexNow) so AI can read what it needs to.',
  'Audit and resolve any duplicate content or broken markup hurting your trust score.',
  'Document everything we changed, in plain language, in a written report and a video walkthrough.',
];

export default function PlaybookCloser() {
  return (
    <section
      className="no-print pt-12 sm:pt-16"
      data-testid="playbook-closer"
    >
      <div className="bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700 rounded-2xl p-6 sm:p-10">
        <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0F5FDB] mb-3">
          Found gaps you don’t want to fix yourself?
        </div>
        <h2
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-5"
          style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.02em' }}
        >
          That’s exactly what we built the{' '}
          <span style={{ color: '#0F5FDB' }}>AI Visibility Fix</span> for.
        </h2>

        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed mb-3">
          Most of the items in this playbook are technical. Schema markup,
          crawl configuration, entity consistency across platforms. It’s the
          kind of work that takes a developer a week to figure out from scratch
          — and that’s if they’ve done it before, which most haven’t, because
          this is a new kind of work.
        </p>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed mb-8">
          You have better things to do with your week.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div>
            <h3
              className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              What it is
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              A one-time, done-for-you implementation. We go through your site,
              fix the exact gaps this playbook identified, and hand you back a
              website AI systems can actually read and recommend.
            </p>
          </div>
          <div>
            <h3
              className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              What it costs
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              One flat fee. No retainer. No monthly SEO contract. We do the
              work once, hand it off, and you own the result.
            </p>
          </div>
        </div>

        <h3
          className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          What we do in seven business days
        </h3>
        <ol className="space-y-3 mb-10">
          {SEVEN_DAY_STEPS.map((step, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed"
            >
              <span
                className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-[#0F5FDB] tabular-nums"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex-1">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-1">
              15 minutes · no pitch
            </div>
            <div
              className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mb-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              The fastest way to know if it’s right for you is to talk.
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              We look at your site, tell you what we’d fix and what we wouldn’t,
              and you decide.
            </div>
          </div>
          <a
            href="/talk-to-a-human#calendar"
            className="shrink-0 inline-flex items-center justify-center gap-2 text-white font-semibold px-5 py-3.5 rounded-xl text-sm sm:text-base transition hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: '#0F5FDB' }}
            data-testid="playbook-closer-cta"
          >
            Book your 15-minute call
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
