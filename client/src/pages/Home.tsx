import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Mail, ArrowRight } from 'lucide-react';

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const painPoints = [
    'AI cannot identify what services you offer',
    'AI cannot confirm your service area or location',
    'AI cannot connect your booking link or contact info',
    'AI cannot read your common questions and answers',
    'AI does not know which pages matter most',
    'AI cannot see clear trust signals',
  ];

  const solutionCards = [
    {
      step: 'Step One',
      title: 'AI Visibility Audit',
      description: 'We scan your website through the same lens modern AI tools use and reveal what is unreadable or missing. You receive a simple before and after report.',
    },
    {
      step: 'Step Two',
      title: 'AI Readability Layer Installation',
      description: 'We install the data layer that translates your business into a format AI understands instantly. This includes services, service area, hours, booking info, FAQs, business details, trust signals.',
    },
    {
      step: 'Step Three',
      title: 'AI Search Optimization And Verification',
      description: 'We test your visibility inside leading AI tools and confirm they understand what you offer, recommend you properly, and link to correct pages.',
    },
  ];

  const features = [
    'AI visibility audit + AI readability layer',
    'Before and after visibility report',
    'Seven business day turnaround + sixty day fix it free guarantee',
  ];

  const proofPoints = [
    'AI can clearly describe what you do.',
    'AI can see your service area and contact details.',
    'AI has a reason to recommend you instead of a competitor.',
  ];

  const faqs = [
    {
      question: 'What\'s the turnaround time?',
      answer: 'This is a fast, one time fix. Once you check out, our team begins your audit and installs your AI readability layer. Your upgraded visibility is live within seven business days.',
    },
    {
      question: 'What if something is wrong or missing?',
      answer: 'We guarantee it. If anything inside your new AI readability layer is incorrect, missing, or breaks within sixty days, we fix it at no cost.',
    },
    {
      question: 'Can I talk to someone first?',
      answer: 'Absolutely. Email this page to a partner or team member, or reach out to us directly. We\'re happy to discuss your specific situation before you purchase.',
    },
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <PageLayout
      title="AI Search Fix – AI Visibility & Readability for Local Businesses | Found For AI"
      description="Make AI recommend your business. One-time AI Search Fix ($1,595) includes audit, schema installation, and AI verification in 7 days."
      canonical="https://foundforai.com"
    >
      {/* Navigation handled by Navigation component */}

      {/* HERO SECTION */}
      <section className="hero-section min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1F35] via-[#1a2f47] to-[#0B1F35] relative overflow-hidden">
        {/* Background accent circle */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#007CFF] opacity-10 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 space-y-2">
              <div style={{ color: '#0B1F35' }} className="font-bold text-5xl md:text-6xl">
                Be the Business
              </div>
              <div style={{ color: '#007CFF' }} className="font-bold text-6xl md:text-7xl">
                AI Recommends First.
              </div>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              AI tools like ChatGPT, Perplexity, and Google Gemini now decide which local businesses to recommend. If AI cannot read your site, it cannot recommend you.
            </p>
            
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              We install the missing AI readability layer so AI can finally understand your services, location, and booking link.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <a href="https://square.link/u/o25cVCY4" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="bg-[#007CFF] hover:bg-[#0066FF] text-white font-semibold px-8 text-lg h-auto py-4"
                  data-testid="button-hero-fix-visibility"
                >
                  Fix My AI Visibility — 1,595 dollars
                </Button>
              </a>
            </div>
            
            <p className="text-sm text-gray-400 mb-8">One time, done for you, delivered in seven business days.</p>
            
            <button
              onClick={() => scrollToSection('solution')}
              className="text-[#007CFF] hover:text-[#0066FF] font-semibold underline underline-offset-4 transition-colors"
              data-testid="button-see-included"
            >
              See everything that is included.
            </button>
          </div>
        </div>
      </section>

      {/* PAIN SECTION */}
      <section id="pain" className="py-16 md:py-24 bg-[#0B1F35]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Why Your Business Is Not Showing Up In AI Search
          </h2>
          
          <p className="text-gray-300 text-lg mb-12 text-center max-w-2xl mx-auto">
            AI does not read websites like humans do. It looks for structured data signals that tell it what your business is, where you are, and what to recommend.
          </p>

          <ul className="space-y-4 mb-12">
            {painPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-4 text-gray-300 text-lg">
                <span className="text-[#007CFF] font-bold flex-shrink-0 mt-1">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <p className="text-center text-white text-xl font-semibold bg-[#007CFF]/10 border border-[#007CFF]/30 rounded-lg p-6">
            If AI cannot understand your business, it cannot recommend you to your next customer.
          </p>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section id="solution" className="py-16 md:py-24 bg-gradient-to-br from-[#1a2f47] to-[#0B1F35]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            What We Install To Make AI Recommend You
          </h2>
          
          <p className="text-gray-300 text-lg mb-16 text-center max-w-3xl mx-auto">
            Our AI Search Fix adds a focused AI readability layer so tools like ChatGPT, Perplexity, and Google Gemini can finally understand, trust, and recommend your business.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutionCards.map((card, index) => (
              <Card key={index} className="bg-[#0B1F35] border-[#007CFF]/30 text-white">
                <CardHeader>
                  <div className="text-[#007CFF] font-semibold text-sm mb-2">{card.step}</div>
                  <CardTitle className="text-2xl text-white">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-base leading-relaxed">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY + GUARANTEE SECTION */}
      <section className="py-16 md:py-24 bg-[#0B1F35]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Delivered In Seven Business Days, Guaranteed
          </h2>
          
          <p className="text-gray-300 text-lg mb-12 text-center">
            This is a fast, one time fix. Once you check out, our team begins your audit and installs your AI readability layer. Your upgraded visibility is live within seven business days.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <p className="text-white font-semibold text-lg">No long projects</p>
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-lg">No confusing back and forth</p>
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-lg">No agency retainers</p>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-[#1a2f47] to-[#0B1F35] border-[#007CFF]/30 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Our "We Fix It Free" Guarantee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-lg">
                If anything inside your new AI readability layer is incorrect, missing, or breaks within sixty days, we fix it at no cost.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1a2f47] to-[#0B1F35]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            One Time AI Search Fix, Built For Local Businesses
          </h2>
          
          <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto">
            Get complete AI visibility and readability in one deliverable. No subscriptions, no ongoing fees.
          </p>

          <div className="bg-[#0B1F35] border border-[#007CFF]/30 rounded-lg p-8 md:p-12 mb-12">
            <div className="text-5xl md:text-6xl font-bold text-white mb-8">
              1,595 dollars
              <span className="text-lg text-gray-400 block mt-2">one time</span>
            </div>

            <ul className="space-y-4 mb-12 text-left">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300 text-base">
                  <Check className="h-6 w-6 text-[#007CFF] flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <a href="https://square.link/u/o25cVCY4" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="w-full bg-[#007CFF] hover:bg-[#0066FF] text-white font-semibold text-lg h-auto py-4"
                  data-testid="button-pricing-fix-visibility"
                >
                  Fix My AI Visibility Now
                </Button>
              </a>
              <p className="text-sm text-gray-400">Takes less than two minutes to get started</p>
            </div>
          </div>

          <button
            onClick={() => {
              const subject = encodeURIComponent('Found For AI Search Fix');
              const body = encodeURIComponent(`Check out this AI Search Fix for local businesses:\n\n${window.location.href}`);
              window.location.href = `mailto:?subject=${subject}&body=${body}`;
            }}
            className="text-[#007CFF] hover:text-[#0066FF] font-semibold flex items-center justify-center gap-2 transition-colors"
            data-testid="button-share-email"
          >
            <Mail className="h-5 w-5" />
            Need to talk to a partner? Email this page to them.
          </button>
        </div>
      </section>

      {/* PROOF SECTION */}
      <section className="py-16 md:py-24 bg-[#0B1F35]">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
            What Happens After The Fix
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {proofPoints.map((point, index) => (
              <div key={index} className="bg-[#1a2f47] border border-[#007CFF]/20 rounded-lg p-8">
                <p className="text-white text-lg font-semibold">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1a2f47] to-[#0B1F35]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Common Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#0B1F35] border border-[#007CFF]/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#1a2f47] transition-colors"
                  data-testid={`button-faq-${index}`}
                >
                  <h3 className="text-white font-semibold text-lg">{faq.question}</h3>
                  <span className={`text-[#007CFF] transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 py-4 border-t border-[#007CFF]/30 bg-[#1a2f47]/50">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B1F35] border-t border-[#007CFF]/30 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Found For AI</h3>
              <p className="text-gray-400">AI visibility and AI readability upgrades for local businesses.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Pages</h4>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-400 hover:text-[#007CFF] transition-colors" data-testid="link-footer-home">Home</a></li>
                  <li><a href="/scorecard" className="text-gray-400 hover:text-[#007CFF] transition-colors" data-testid="link-footer-scorecard">AI Scorecard</a></li>
                  <li><a href="/contact" className="text-gray-400 hover:text-[#007CFF] transition-colors" data-testid="link-footer-contact">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="/privacy" className="text-gray-400 hover:text-[#007CFF] transition-colors" data-testid="link-footer-privacy">Privacy</a></li>
                  <li><a href="/terms" className="text-gray-400 hover:text-[#007CFF] transition-colors" data-testid="link-footer-terms">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-[#007CFF]/30 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Found For AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </PageLayout>
  );
}
