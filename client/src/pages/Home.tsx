import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import ValueCards from '@/components/ValueCards';
import ScorecardSection from '@/components/ScorecardSection';
import FAQSection from '@/components/FAQSection';

export default function Home() {
  return (
    <PageLayout
      title="Found For AI - Make Your Website Discoverable by AI Search"
      description="AI SEO consulting that optimizes your website for ChatGPT, Perplexity, and AI-driven search. Get schema markup, GEO optimization, and AI readiness audits."
      canonical="https://foundforai.com/"
    >
      <Hero />
      <ValueCards />
      <ScorecardSection />
      <FAQSection />
    </PageLayout>
  );
}
