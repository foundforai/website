import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQSection() {
  const faqs = [
    {
      question: 'How do I make my website visible to AI searches?',
      answer: 'You can make your website visible to AI searches by adding schema markup, clear headings, and structured content that AI systems can read and interpret. Found For AI audits and fixes your site to ensure visibility in ChatGPT, Perplexity, and other AI-driven search tools.',
    },
    {
      question: 'What is AI SEO and why does it matter?',
      answer: 'AI SEO focuses on optimizing your website so AI models can understand it, not only search engines. This includes structured data, semantic HTML, and FAQ sections that directly answer user intent. As AI assistants become the primary way people search, being discoverable is critical.',
    },
    {
      question: 'How do I check if my site is AI ready?',
      answer: 'Use Found For AI\'s free audit to analyze schema, GEO data, and content structure, then get an AI Readiness Scorecard with prioritized fixes. We identify exactly what\'s missing and how to implement it.',
    },
    {
      question: 'What kind of schema helps AI understand my website?',
      answer: 'LocalBusiness, Service, FAQPage, and Article are the most impactful. They tell AI who you are, what you offer, and how to contact you. Proper schema markup is the language AI uses to extract and present information.',
    },
    {
      question: 'Can AI help me get more customers?',
      answer: 'Yes! AI assistants and search now surface businesses directly in answers. Being AI-optimized increases your chances of being recommended when potential customers ask questions about services you offer.',
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

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
