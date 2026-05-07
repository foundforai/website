import PageLayout from '@/components/PageLayout';
import ScorecardHero from '@/components/ScorecardHero';
import { breadcrumbList } from '@/lib/breadcrumb';

const scorecardSchemas = [
  breadcrumbList([
    { name: 'Home', url: 'https://foundforai.com/' },
    { name: 'AI Visibility Scorecard', url: 'https://foundforai.com/scorecard' },
  ]),
  {
    '@type': 'WebPage',
    '@id': 'https://foundforai.com/scorecard#webpage',
    url: 'https://foundforai.com/scorecard',
    name: 'Free AI Visibility Scorecard',
    description:
      'Free AI Visibility Scorecard. See exactly how ChatGPT, Gemini, Perplexity, and Claude describe — or ignore — your business. Instant on-page report, no credit card.',
    isPartOf: { '@id': 'https://foundforai.com/#website' },
    publisher: { '@id': 'https://foundforai.com/#org' },
    primaryImageOfPage: 'https://foundforai.com/found-for-ai-logo-white.png',
    potentialAction: {
      '@type': 'Action',
      name: 'Run AI Visibility Scorecard',
      target: 'https://foundforai.com/scorecard',
    },
  },
];

export default function Scorecard() {
  return (
    <PageLayout
      title="Free AI Visibility Scorecard — See How ChatGPT, Gemini & Perplexity See Your Business | Found For AI"
      description="Free AI Visibility Scorecard. See exactly how ChatGPT, Gemini, Perplexity, and Claude describe — or ignore — your business. Instant on-page report."
      canonical="https://foundforai.com/scorecard"
      ogImage="/found-for-ai-logo-white.png"
      schemas={scorecardSchemas}
    >
      <ScorecardHero showWhatWeCheck />
    </PageLayout>
  );
}
