/**
 * Published service prices. Change prices here only.
 * AI Actions figures are suggestions, pending review.
 * AI Receptionist is $500 setup, plans from $299/mo (approved 2026-11-26).
 */
export const pricing = {
  currency: 'USD',
  audit: {
    name: 'Free AI Actions Audit',
    priceLabel: '$0',
    lowPrice: 0,
    highPrice: 0,
    cadenceLabel: '',
    items: [
      'One key journey tested',
      'Two AI assistants',
      'Where it got stuck, with screenshots',
      'Top 3 fixes',
    ],
  },
  setup: {
    name: 'AI Actions Setup',
    priceLabel: '$1,500 to $2,500',
    lowPrice: 1500,
    highPrice: 2500,
    cadenceLabel: 'one time',
    items: [
      'Consult or quote request action',
      'Services and hours lookup',
      'Customer confirms before sending',
      'Routed to your inbox, then re-tested',
    ],
  },
  monitoring: {
    name: 'Monitoring + Visibility',
    priceLabel: '$199 to $399',
    lowPrice: 199,
    highPrice: 399,
    cadenceLabel: 'per month',
    items: [
      'Monthly agent re-tests',
      'Follow-up help for quiet leads',
      'AI visibility (AEO) tuning',
      'Plain monthly report',
    ],
  },
  receptionist: {
    name: 'AI Receptionist',
    priceLabel: '$500 setup',
    lowPrice: 500,
    highPrice: 500,
    cadenceLabel: 'plans from $299/mo',
    plansFrom: 299,
    items: [
      'Answers the phone when your staff cannot',
      'Talks with callers naturally',
      'Common questions, including hours and services',
      'Books, reschedules, or routes into tools you already use',
      'Found For AI sets it up and is the local first call for changes',
    ],
  },
  deliveryBusinessDays: 7,
  fixItFreeDays: 60,
  auditReportBusinessDays: 3,
} as const;

export const pricingTiers = [pricing.audit, pricing.setup, pricing.monitoring, pricing.receptionist] as const;

export function guaranteeLine(): string {
  return `Delivered in ${pricing.deliveryBusinessDays} business days. We Fix It Free for ${pricing.fixItFreeDays} days. Multi-location and agencies: custom scoping.`;
}
