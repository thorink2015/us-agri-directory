// ─── The Premium Acre (paid newsletter) shared constants ─────────────────────
// Single source for the Stripe Payment Link used by every founding CTA
// (the /premium-acre/join page and the minimal header on the two Premium
// Acre pages). Set NEXT_PUBLIC_STRIPE_PREMIUM_ACRE_URL in Netlify to the
// live link (https://buy.stripe.com/...) and redeploy; callers provide
// their own safe fallback while it is empty.
export const PREMIUM_ACRE_STRIPE_URL =
  process.env.NEXT_PUBLIC_STRIPE_PREMIUM_ACRE_URL || '';

export const PREMIUM_ACRE_JOIN_PATH = '/premium-acre/join';

// Email-only twin of the join page for the wider Tank Mix reader wave
// (noindex; same shared SalesPage component).
export const PREMIUM_ACRE_SUBSCRIBE_PATH = '/premium-acre/subscribe';
