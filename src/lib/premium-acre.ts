// ─── The Premium Acre (paid newsletter) shared constants ─────────────────────
// Live Stripe Payment Links, supplied by Eugen on 2026-07-17. The
// NEXT_PUBLIC_STRIPE_PREMIUM_ACRE_URL env-var indirection used before the
// links existed has been retired (it was never set in Netlify).

// Founding rate, $17/month locked. Used on /premium-acre/join and the
// minimal-header CTA on the founding-side pages.
export const PREMIUM_ACRE_STRIPE_FOUNDING_URL =
  'https://buy.stripe.com/eVq00jcGu8wF3ales40gw0l';

// Regular rate, $49/month. Used on /premium-acre/subscribe (the wider
// Tank Mix reader wave) and its minimal-header CTA.
export const PREMIUM_ACRE_STRIPE_REGULAR_URL =
  'https://buy.stripe.com/3cI9ATaymeV36mx2Jm0gw0m';

export const PREMIUM_ACRE_JOIN_PATH = '/premium-acre/join';

// Email-only twin of the join page for the wider Tank Mix reader wave
// (noindex; same shared SalesPage component, regular pricing variant).
export const PREMIUM_ACRE_SUBSCRIBE_PATH = '/premium-acre/subscribe';
