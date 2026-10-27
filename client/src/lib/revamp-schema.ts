import { pricing, pricingTiers } from '@/data/pricing';

export function faqPageSchema(id: string, faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export function tierServiceSchemas(pageUrl: string) {
  return pricingTiers.map((tier) => {
    const slug = tier.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const offer =
      tier.lowPrice === tier.highPrice
        ? {
            '@type': 'Offer',
            price: String(tier.lowPrice),
            priceCurrency: pricing.currency,
          }
        : {
            '@type': 'AggregateOffer',
            lowPrice: String(tier.lowPrice),
            highPrice: String(tier.highPrice),
            priceCurrency: pricing.currency,
          };

    return {
      '@type': 'Service',
      '@id': `${pageUrl}#${slug}`,
      name: tier.name,
      description: `${tier.name}. ${tier.items.join('. ')}.`,
      serviceType: tier.name,
      provider: { '@id': 'https://foundforai.com/#org' },
      areaServed: { '@type': 'Country', name: 'United States' },
      url: pageUrl,
      offers: offer,
    };
  });
}
