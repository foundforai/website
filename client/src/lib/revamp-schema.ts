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

type PricingTier = (typeof pricingTiers)[number];

function tierOffers(tier: PricingTier) {
  if ('plansFrom' in tier) {
    return [
      {
        '@type': 'Offer',
        name: 'Setup',
        price: String(tier.lowPrice),
        priceCurrency: pricing.currency,
      },
      {
        '@type': 'Offer',
        name: 'Monthly plans',
        price: String(tier.plansFrom),
        priceCurrency: pricing.currency,
        description: tier.cadenceLabel,
      },
    ];
  }

  return tier.lowPrice === tier.highPrice
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
}

export function serviceSchema(pageUrl: string, tier: PricingTier) {
  const slug = tier.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const priceBits = [tier.priceLabel, tier.cadenceLabel].filter(Boolean).join(', ');
  return {
    '@type': 'Service',
    '@id': `${pageUrl}#${slug}`,
    name: tier.name,
    description: `${tier.name}. ${priceBits}. ${tier.items.join('. ')}.`,
    serviceType: tier.name,
    provider: { '@id': 'https://foundforai.com/#org' },
    areaServed: { '@type': 'Country', name: 'United States' },
    url: pageUrl,
    offers: tierOffers(tier),
  };
}

export function tierServiceSchemas(pageUrl: string) {
  return pricingTiers.map((tier) => serviceSchema(pageUrl, tier));
}
