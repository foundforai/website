import { useState, useEffect, useRef, useMemo } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, ArrowRight, Share2 } from 'lucide-react';

type Item = { id: string; statement: string; explanation: string };
type Section = { key: string; number: number; title: string; intro: string; items: Item[] };

const SECTIONS: Section[] = [
  {
    key: 'who-you-are',
    number: 1,
    title: 'Who You Are',
    intro:
      'The first thing an AI system does when it considers your business is try to figure out who you actually are. AI builds a picture of your business by pulling from your website, Google, directories, and social profiles. If those sources tell slightly different stories, AI gets confused — and a confused AI recommends someone else.',
    items: [
      {
        id: '1.1',
        statement: 'Your business name is spelled the exact same way everywhere',
        explanation:
          'Check your website, Google Business Profile, Yelp, Facebook, and any directories. "Smith Plumbing," "Smith Plumbing LLC," and "Smith Plumbing & Heating" look like three different companies to AI — even if they\'re all you.',
      },
      {
        id: '1.2',
        statement: 'Your address and phone number are identical across every platform',
        explanation:
          'Even "St." vs. "Street" or an old suite number on one site can split you into two businesses in an AI\'s view. Pick the exact version you want to be known by and make every platform match it.',
      },
      {
        id: '1.3',
        statement: 'Your Google Business Profile is claimed, complete, and current',
        explanation:
          'Hours, services, photos, description — all filled in. This is one of the biggest single sources AI pulls from when someone asks for a local recommendation. An empty or stale profile is one of the fastest ways to get skipped.',
      },
      {
        id: '1.4',
        statement: 'Your homepage makes it obvious who you are, what you do, and how to contact you — in the first screen',
        explanation:
          "If an AI reads your homepage and can't answer those three questions in the first few sentences, it can't confidently recommend you. Quick test: ask a friend to look at your homepage for 5 seconds and tell you what you do. If they can't, AI can't either.",
      },
    ],
  },
  {
    key: 'what-ai-reads',
    number: 2,
    title: 'What AI Actually Reads',
    intro:
      "When AI looks at your website, it doesn't just read the text on the page. It also looks for a hidden, machine-readable layer — the AI-readable layer. Most small business sites don't have it. Here's how to know.",
    items: [
      {
        id: '2.1',
        statement: 'Your site has basic "LocalBusiness" schema installed and it matches what\'s visible on your pages',
        explanation:
          'Free way to check: go to search.google.com/test/rich-results, paste in your homepage URL, and look at what comes back. If it says "no items detected," you have no schema. If it shows data, make sure it matches what\'s on the page.',
      },
      {
        id: '2.2',
        statement: 'Each service you offer has its own schema markup',
        explanation:
          'A generic "we\'re a business" tag isn\'t enough. AI needs to know you specifically offer AC repair, or beginner yoga classes, or emergency dental. Without this, you won\'t get matched to the specific questions people ask AI.',
      },
      {
        id: '2.3',
        statement: 'Your FAQ pages have FAQ schema',
        explanation:
          "This is one of the fastest wins in AI visibility. When your FAQ is properly marked up, AI can pull your answer directly into a response. Without it, the AI pulls someone else's answer — even if yours is better.",
      },
      {
        id: '2.4',
        statement: 'Nothing on your site has broken or conflicting schema',
        explanation:
          "Broken schema is worse than no schema. It tells AI your data can't be trusted, and AI responds by quietly excluding you from consideration. Most sites with broken schema have no idea it's broken because nothing visibly breaks on the page.",
      },
    ],
  },
  {
    key: 'whats-keeping-you-invisible',
    number: 3,
    title: "What's Keeping You Invisible",
    intro:
      "You can have a beautiful website and still be invisible to AI. These are the technical blockers most small business owners don't know they have.",
    items: [
      {
        id: '3.1',
        statement: 'Your important pages are not accidentally blocked from being read',
        explanation:
          'Websites have files called robots.txt and meta tags that can tell AI "don\'t look at this page." These are meant for login or staging pages, but they often get left on live pages by mistake. If AI can\'t read it, it doesn\'t exist.',
      },
      {
        id: '3.2',
        statement: 'Your services, pricing, schedule, and contact pages are public — not hidden behind a login or booking tool',
        explanation:
          'If customers have to click "book now" and go to a separate portal to see what you offer, AI can\'t see any of it. Your core information needs to be on regular public pages.',
      },
      {
        id: '3.3',
        statement: 'Your homepage links clearly to your most important pages',
        explanation:
          "AI uses internal links to figure out what you think is important. If your best service page is buried three clicks deep with no clear path from the homepage, AI assumes it's not a priority.",
      },
      {
        id: '3.4',
        statement: "You don't have duplicate versions of your pages floating around",
        explanation:
          'Some sites accidentally have the same page at two URLs — with and without "www," with and without a trailing slash, or a leftover old version. This splits your trust signals and confuses AI about which page is real.',
      },
    ],
  },
  {
    key: 'why-ai-should-pick-you',
    number: 4,
    title: 'Why AI Should Pick You',
    intro:
      'Being readable isn\'t enough. AI also evaluates whether your business is worth recommending. These are the trust signals that tip the scale.',
    items: [
      {
        id: '4.1',
        statement: 'You have recent, specific, written reviews — not just a star rating',
        explanation:
          "Recency matters more than total count. Ten detailed reviews from the last six months beat 200 generic reviews from three years ago. AI reads review content to understand what you're good at.",
      },
      {
        id: '4.2',
        statement: 'Your website answers the questions your customers actually ask before hiring you',
        explanation:
          "What does it cost? How long does it take? Do you service my area? If your pages don't answer these, AI can't use them to help someone decide — and will use a competitor who does.",
      },
      {
        id: '4.3',
        statement: 'Other websites mention your business — directories, local news, partner sites, associations',
        explanation:
          'AI cross-checks your business against other sources. If you only exist on your own website, you look less established than a competitor who shows up in the local chamber of commerce listing and three directories.',
      },
      {
        id: '4.4',
        statement: 'Your credentials, certifications, and years in business are stated clearly in plain text',
        explanation:
          "Licensed, NASM-certified, 15 years in practice, insured and bonded — if it's not written in readable text on your page, AI doesn't know about it. Credentials buried in a logo image don't count.",
      },
    ],
  },
  {
    key: 'can-ai-explain-you',
    number: 5,
    title: 'Can AI Explain You',
    intro:
      'The final test: if AI read your entire website right now, could it write a short, confident paragraph recommending you to the right customer? Most sites fail this test.',
    items: [
      {
        id: '5.1',
        statement: "Your homepage says who you're for — not just what you do",
        explanation:
          '"Yoga studio" is a category. "Beginner-friendly yoga studio in downtown Boise with morning and lunchtime classes for working professionals" is a recommendation. The second one gets cited.',
      },
      {
        id: '5.2',
        statement: 'Each of your main pages has one clear job',
        explanation:
          'A page that tries to explain your services AND your story AND your pricing AND your philosophy gets cited for none of them. One page, one purpose. AI rewards focus.',
      },
      {
        id: '5.3',
        statement: 'The next step for a customer is obvious and easy on every page',
        explanation:
          'Book, call, message, request a quote — whatever it is, it should be the most obvious button on every important page.',
      },
      {
        id: '5.4',
        statement: 'Your site explains why someone should pick you over the business next door',
        explanation:
          'Same-day service. First session free. Family-owned since 1998. Something specific. "We provide quality service" is what every business says — so AI treats it as no differentiator at all.',
      },
    ],
  },
];

const ALL_ITEM_IDS = SECTIONS.flatMap((s) => s.items.map((i) => i.id));

const BLUE = '#0F5FDB';
const GREEN = '#1DC98F';
const AMBER = '#F59E0B';
const RED = '#DC2626';

const BOOK_URL = 'https://foundforai.com/talk-to-a-human#calendar';
const SERVICES_URL = '/services';

function track(event: string, payload?: Record<string, any>) {
  try {
    const w = window as any;
    if (typeof w.gtag === 'function') {
      w.gtag('event', event, payload || {});
    }
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event, ...(payload || {}) });
    }
    if (typeof w.plausible === 'function') {
      w.plausible(event, { props: payload || {} });
    }
  } catch {
    /* no-op */
  }
}

export default function Playbook() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const startedRef = useRef(false);
  const completedSectionsRef = useRef<Set<string>>(new Set());
  const checklistRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeSection, setActiveSection] = useState<Section>(SECTIONS[0]);

  const totalChecked = useMemo(
    () => ALL_ITEM_IDS.reduce((acc, id) => acc + (checked[id] ? 1 : 0), 0),
    [checked]
  );

  const sectionScores = useMemo(() => {
    return SECTIONS.map((s) => ({
      section: s,
      count: s.items.reduce((acc, it) => acc + (checked[it.id] ? 1 : 0), 0),
    }));
  }, [checked]);

  const lowestSections = useMemo(() => {
    const min = Math.min(...sectionScores.map((s) => s.count));
    return sectionScores.filter((s) => s.count === min).map((s) => s.section);
  }, [sectionScores]);

  const toggle = (id: string, sectionKey: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };

      if (!startedRef.current && Object.values(next).some(Boolean)) {
        startedRef.current = true;
        track('playbook_started');
      }

      const sec = SECTIONS.find((s) => s.key === sectionKey)!;
      const allInSection = sec.items.every((it) => next[it.id]);
      if (allInSection && !completedSectionsRef.current.has(sectionKey)) {
        completedSectionsRef.current.add(sectionKey);
        track('playbook_section_completed', { section: sec.title });
      } else if (!allInSection && completedSectionsRef.current.has(sectionKey)) {
        completedSectionsRef.current.delete(sectionKey);
      }

      return next;
    });
  };

  // Track which section is in view for the sticky progress bar indicator.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const key = (visible[0].target as HTMLElement).dataset.sectionKey;
          const found = SECTIONS.find((s) => s.key === key);
          if (found) setActiveSection(found);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    SECTIONS.forEach((s) => {
      const el = sectionRefs.current[s.key];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // HowTo schema in <head>.
  useEffect(() => {
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.id = 'playbook-howto-schema';
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Check If AI Can Recommend Your Business',
      description:
        "A free 15-minute self-assessment to find out why AI tools like ChatGPT and Perplexity aren't recommending your business.",
      totalTime: 'PT15M',
      step: [
        { '@type': 'HowToStep', name: 'Check who you are', text: 'Verify your business identity is consistent across every platform AI pulls from.' },
        { '@type': 'HowToStep', name: 'Check what AI reads', text: 'Confirm your website has the AI-readable layer AI systems need to understand your business.' },
        { '@type': 'HowToStep', name: "Check what's blocking AI", text: 'Identify anything keeping AI from reading your important pages.' },
        { '@type': 'HowToStep', name: 'Check your trust signals', text: 'Confirm AI has reasons to recommend you over a competitor.' },
        { '@type': 'HowToStep', name: 'Check your clarity', text: 'Verify AI could write a confident one-paragraph recommendation of your business.' },
      ],
    });
    document.head.appendChild(schema);
    return () => {
      const existing = document.getElementById('playbook-howto-schema');
      if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
    };
  }, []);

  const scrollToChecklist = () => {
    checklistRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const seeResults = () => {
    track('playbook_results_viewed');
    track('playbook_score', { score: totalChecked });
    setShowResults(true);
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailError('');
    try {
      const response = await fetch('https://formspree.io/f/movklzvl', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          score: `${totalChecked} / 20`,
          _subject: 'New AI Visibility Playbook PDF request',
          _language: 'en',
        }),
      });
      if (response.ok) {
        track('playbook_email_submitted', { score: totalChecked });
        setEmailSent(true);
      } else {
        setEmailError('Something went wrong. Please try again.');
      }
    } catch {
      setEmailError('Something went wrong. Please check your connection and try again.');
    } finally {
      setEmailLoading(false);
    }
  };

  const handleShare = async () => {
    const url = 'https://foundforai.com/playbook';
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch {
        /* no-op */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Score bucket
  const bucket: 'strong' | 'partial' | 'invisible' =
    totalChecked >= 16 ? 'strong' : totalChecked >= 10 ? 'partial' : 'invisible';
  const bucketColor = bucket === 'strong' ? GREEN : bucket === 'partial' ? AMBER : RED;
  const bucketLabel =
    bucket === 'strong' ? 'Strong' : bucket === 'partial' ? 'Partial Visibility' : 'Effectively Invisible';

  // Lowest-section sentence
  const lowestSentence = useMemo(() => {
    if (totalChecked === 20) return null;
    const allTied = lowestSections.length === SECTIONS.length;
    if (allTied) return 'your gaps are spread across every section';
    const names = lowestSections.map((s) => s.title);
    if (names.length === 1) return `your biggest gap is in ${names[0]}`;
    if (names.length === 2) return `your biggest gaps are in ${names[0]} and ${names[1]}`;
    const last = names[names.length - 1];
    const front = names.slice(0, -1).join(', ');
    return `your biggest gaps span ${front}, and ${last}`;
  }, [lowestSections, totalChecked]);

  const progressPct = Math.round((totalChecked / 20) * 100);

  return (
    <PageLayout
      title="AI Visibility Playbook — Score Your Business in 15 Minutes | Found For AI"
      description="Free interactive checklist. Find out why ChatGPT, Google AI, and Perplexity aren't recommending your business. 20 checks. No email required."
      canonical="https://foundforai.com/playbook"
    >
      {/* HERO */}
      <section className="bg-background pt-12 md:pt-20 pb-10 md:pb-14">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Visibility Playbook</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            A 15-minute checklist to find out why AI tools like ChatGPT and Google AI aren't recommending your business — and what to fix first.
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
            When someone asks ChatGPT for a good HVAC company, yoga studio, or dentist in your area, AI gives them one or two names. Not ten blue links. One or two. If your business isn't one of them, it's usually not because you're doing something wrong. It's because your website was built for people to read — not for AI to understand.
          </p>
          <Button
            size="lg"
            className="font-semibold"
            style={{ backgroundColor: BLUE, borderColor: BLUE }}
            onClick={scrollToChecklist}
            data-testid="button-start-checklist"
          >
            Start the checklist ↓
          </Button>
        </div>
      </section>

      {/* STICKY PROGRESS BAR */}
      <div
        className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border"
        role="progressbar"
        aria-valuenow={totalChecked}
        aria-valuemin={0}
        aria-valuemax={20}
        aria-label="Playbook progress"
        data-testid="progress-bar"
      >
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-3 mb-2 text-sm">
            <span className="font-semibold tabular-nums" data-testid="text-progress-count">
              {totalChecked} of 20 checked
            </span>
            <span className="hidden sm:inline text-muted-foreground" data-testid="text-progress-section">
              Section {activeSection.number} of 5: {activeSection.title}
            </span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300 ease-out"
              style={{ width: `${progressPct}%`, backgroundColor: BLUE }}
            />
          </div>
        </div>
      </div>

      {/* CHECKLIST */}
      <section ref={checklistRef} className="bg-background py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          {SECTIONS.map((section) => (
            <div
              key={section.key}
              ref={(el) => { sectionRefs.current[section.key] = el; }}
              data-section-key={section.key}
              className="mb-12 md:mb-16 scroll-mt-24"
            >
              <div className="mb-6 md:mb-8">
                <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: BLUE }}>
                  Section {section.number} of 5
                </p>
                <h2 className="text-2xl md:text-3xl font-bold mt-1 mb-3">{section.title}</h2>
                <p className="text-muted-foreground italic leading-relaxed">{section.intro}</p>
              </div>

              <div className="space-y-3">
                {section.items.map((item) => {
                  const isChecked = !!checked[item.id];
                  return (
                    <label
                      key={item.id}
                      htmlFor={`item-${item.id}`}
                      className="flex items-start gap-4 p-4 md:p-5 min-h-11 rounded-md border border-border bg-card cursor-pointer hover-elevate active-elevate-2 transition-colors"
                      data-testid={`row-item-${item.id}`}
                    >
                      <input
                        type="checkbox"
                        id={`item-${item.id}`}
                        checked={isChecked}
                        onChange={() => toggle(item.id, section.key)}
                        className="sr-only peer"
                        data-testid={`checkbox-${item.id}`}
                      />
                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded border-2 shrink-0 transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2"
                        style={{
                          backgroundColor: isChecked ? BLUE : 'transparent',
                          borderColor: isChecked ? BLUE : 'hsl(var(--border))',
                          transform: isChecked ? 'scale(1.05)' : 'scale(1)',
                        }}
                      >
                        {isChecked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground leading-snug">{item.statement}</p>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.explanation}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="text-center mt-8">
            <Button
              size="lg"
              className="font-semibold w-full sm:w-auto"
              style={{ backgroundColor: BLUE, borderColor: BLUE }}
              onClick={seeResults}
              data-testid="button-see-results"
            >
              See my results
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section
        ref={resultsRef}
        className={`bg-muted/30 border-t border-border py-12 md:py-16 scroll-mt-24 ${showResults ? '' : 'hidden'}`}
        aria-hidden={!showResults}
        data-testid="section-results"
      >
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Score */}
          <div className="text-center mb-10">
            <div
              className="inline-flex items-baseline gap-2 font-bold"
              data-testid="text-score"
            >
              <span className="text-6xl md:text-7xl" style={{ color: bucketColor }}>
                {totalChecked}
              </span>
              <span className="text-3xl md:text-4xl text-muted-foreground">/ 20</span>
            </div>
            <div className="mt-2">
              <span
                className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: bucketColor }}
                data-testid="text-score-label"
              >
                {bucketLabel}
              </span>
            </div>
          </div>

          {/* Section breakdown */}
          <div className="mb-10">
            <h3 className="text-lg font-bold mb-4">Where you stand by section</h3>
            <div className="space-y-3">
              {sectionScores.map(({ section, count }) => {
                const pct = Math.round((count / 4) * 100);
                return (
                  <div key={section.key} data-testid={`section-score-${section.key}`}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">{section.title}</span>
                      <span className="text-muted-foreground tabular-nums">{count} / 4</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-300"
                        style={{ width: `${pct}%`, backgroundColor: BLUE }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Personalized copy */}
          <Card className="mb-8">
            <CardContent className="p-6 md:p-8">
              {bucket === 'strong' && (
                <>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">You're in rare company.</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Most small businesses score under 10 their first time through. You're clearly ahead. Your foundation is strong and AI systems can both find and understand you. Your next move is going deeper on content and trust signals — things that separate "recommended" from "recommended first." If you'd like a second set of eyes on what you could still improve, a 15-minute call is the fastest way.
                  </p>
                  <a
                    href={BOOK_URL}
                    onClick={() => track('playbook_cta_booking_clicked', { bucket })}
                    data-testid="link-results-book-call"
                  >
                    <Button
                      size="lg"
                      className="font-semibold w-full sm:w-auto"
                      style={{ backgroundColor: BLUE, borderColor: BLUE }}
                    >
                      Book a 15-minute call
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </>
              )}

              {bucket === 'partial' && (
                <>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">You're halfway there.</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    AI knows you exist but doesn't fully understand or trust you yet. Based on your answers, {lowestSentence}. These are almost always where real visibility gets unlocked or lost — and they're the kind of thing that takes specialized work to fix correctly.
                  </p>
                  <div className="flex flex-col gap-3 sm:items-start">
                    <a
                      href={BOOK_URL}
                      onClick={() => track('playbook_cta_booking_clicked', { bucket })}
                      data-testid="link-results-book-call"
                    >
                      <Button
                        size="lg"
                        className="font-semibold w-full sm:w-auto"
                        style={{ backgroundColor: BLUE, borderColor: BLUE }}
                      >
                        Book a 15-minute call — we'll tell you what to fix first
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </a>
                    <a
                      href={SERVICES_URL}
                      onClick={() => track('playbook_cta_services_clicked', { bucket })}
                      className="underline text-sm text-muted-foreground hover:text-foreground"
                      data-testid="link-results-services"
                    >
                      Learn about the AI Visibility Fix →
                    </a>
                  </div>
                </>
              )}

              {bucket === 'invisible' && (
                <>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">You're effectively invisible to AI right now.</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    That sounds brutal, but here's the upside: so is almost every one of your local competitors. The business that fixes this first in your market gets the AI recommendation — AI systems tend to reinforce their own confidence, so once they start recommending someone, they keep recommending them. Based on your answers, {lowestSentence}. The good news: most of what's on this list is fixable in a single focused implementation. You don't need a year-long SEO contract. You need someone to install the correct foundation once, correctly.
                  </p>
                  <div className="flex flex-col gap-3 sm:items-start">
                    <a
                      href={BOOK_URL}
                      onClick={() => track('playbook_cta_booking_clicked', { bucket })}
                      data-testid="link-results-book-call"
                    >
                      <Button
                        size="lg"
                        className="font-semibold w-full sm:w-auto"
                        style={{ backgroundColor: BLUE, borderColor: BLUE }}
                      >
                        Book a 15-minute call
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </a>
                    <a
                      href={SERVICES_URL}
                      onClick={() => track('playbook_cta_services_clicked', { bucket })}
                      className="underline text-sm text-muted-foreground hover:text-foreground"
                      data-testid="link-results-services"
                    >
                      See the AI Visibility Fix — $1,595, seven business days →
                    </a>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Optional email capture */}
          <Card className="mb-8">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl font-bold mb-2">Want a PDF copy of your results?</h3>
              <p className="text-muted-foreground mb-4">
                We'll email you a copy of this checklist, plus occasional notes on AI search. Unsubscribe anytime.
              </p>
              {emailSent ? (
                <p className="text-sm font-medium" data-testid="text-email-sent">
                  Sent. Check your inbox in the next few minutes.
                </p>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <div>
                    <Label htmlFor="playbook-email" className="sr-only">Email</Label>
                    <Input
                      id="playbook-email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-testid="input-results-email"
                    />
                  </div>
                  {emailError && (
                    <p className="text-sm text-red-600 dark:text-red-400" data-testid="text-email-error">
                      {emailError}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="font-semibold w-full sm:w-auto"
                    style={{ backgroundColor: BLUE, borderColor: BLUE }}
                    disabled={emailLoading}
                    data-testid="button-results-email-submit"
                  >
                    {emailLoading ? 'Sending...' : 'Send me the PDF'}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    No spam. One email to deliver the PDF, and the occasional note on AI search. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Share */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground underline"
              data-testid="button-share-playbook"
            >
              <Share2 className="w-4 h-4" />
              {copied ? 'Copied!' : 'Share this playbook'}
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
