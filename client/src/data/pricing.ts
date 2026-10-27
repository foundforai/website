/**
 * Suggested prices for the AI Actions revamp.
 * Pending review. Change prices here only.
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
  deliveryBusinessDays: 7,
  fixItFreeDays: 60,
  auditReportBusinessDays: 3,
} as const;

export const pricingTiers = [pricing.audit, pricing.setup, pricing.monitoring] as const;

export function guaranteeLine(): string {
  return `Delivered in ${pricing.deliveryBusinessDays} business days. We Fix It Free for ${pricing.fixItFreeDays} days. Multi-location and agencies: custom scoping.`;
}
