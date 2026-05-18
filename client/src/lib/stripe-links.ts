/**
 * Stripe Payment Link URLs.
 *
 * These are public by design (designed to be put on marketing pages) and
 * intentionally safe to expose in client-side code. Change them here and
 * every reference across the site updates.
 *
 * Created in the Stripe dashboard under the Found For AI account.
 */

export const STRIPE_LINKS = {
  diy: {
    monthly: 'https://buy.stripe.com/8x2eV78Ws36B0yA0WZ3Nm00', // $49/mo, 7-day trial
    annual: 'https://buy.stripe.com/fZueV76Ok6iN956fRT3Nm01',  // $490/yr, 30-day trial
  },
  starter: {
    monthly: 'https://buy.stripe.com/bJe3cpegM7mR2GIgVX3Nm02', // $299/mo, no trial
    annual: 'https://buy.stripe.com/5kQ3cpc8E7mR5SU6hj3Nm03',  // $2,990/yr, no trial
  },
  growth: {
    monthly: 'https://buy.stripe.com/7sY00d5Kg8qV2GI6hj3Nm04', // $599/mo, no trial
    annual: 'https://buy.stripe.com/dRm28lb4AdLfdlm3573Nm05',  // $7,188/yr, no trial
  },
} as const;
