export default function FAQSection() {
  const faqs = [
    {
      question: 'Why are AI queries different than Google searches?',
      answer: 'AI queries are conversational and context-driven. Instead of scanning a list of links like Google, AI gives one or two answers it trusts. If your business isn\'t part of that trusted answer set, you\'re invisible to customers using AI tools like ChatGPT and Perplexity.',
    },
    {
      question: 'Why do I need to be found by AI?',
      answer: 'More customers are now asking AI tools for recommendations instead of searching on Google. Being found by AI means your business information is structured so large language models can read, understand, and confidently recommend your brand.',
    },
    {
      question: 'Will AI searches replace Google?',
      answer: 'AI-driven discovery is already reshaping how people find information. Google is moving toward an AI-based experience (SGE), and platforms like ChatGPT, Claude, and Perplexity are becoming new discovery channels. Traditional SEO still matters, but AI visibility is now essential.',
    },
    {
      question: 'Will AI searches and queries help customers find my business?',
      answer: 'Yes — if your website is AI-readable. Structured data, FAQs, and contextual clarity make it easy for AI systems to understand what you do and include your business in relevant responses.',
    },
    {
      question: 'What does it mean to be Found by AI?',
      answer: 'Being Found by AI means your website, services, and business details are optimized so AI tools can interpret them correctly and recommend you when users ask related questions.',
    },
    {
      question: 'How do I know if my site is AI-ready?',
      answer: 'You can request a free AI Readiness Audit at FoundForAI.com/audit. We\'ll assess your visibility across AI tools and provide a personalized plan to increase your discoverability.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Questions You Might Ask ChatGPT About AI SEO
          </h2>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item border-b pb-8 last:border-b-0 last:pb-0">
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#0F5FDB' }}>
                {faq.question}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
