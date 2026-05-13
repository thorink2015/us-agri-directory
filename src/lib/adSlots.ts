// ─── AdSense ad unit slot IDs ────────────────────────────────────────────
// One central registry so slot IDs are never hardcoded inside components.
// Real IDs pasted 2026-05-13 after Eugen created the units in the AdSense
// dashboard. AdSense unit metadata:
//
//   displayAuto  Display Ad 1  responsive auto    8100046551
//   infeed       Infeed Ads 1  fluid              5473883213  (uses AD_LAYOUT_KEYS.infeed)
//   inArticle    In-article    fluid              9935267161  (uses data-ad-layout="in-article")
//   multiplex    Multiplex 1   autorelaxed        6731124568
//
// Production rendering is still gated by NEXT_PUBLIC_ADS_ENABLED in
// `src/components/ads/AdSlot.tsx`. Until Eugen flips that env var on
// Netlify (post-AdSense approval), zero <ins class="adsbygoogle"> markup
// ships in production HTML — the IDs sit dormant in the bundle.
// ─────────────────────────────────────────────────────────────────────────

export const ADSENSE_CLIENT = 'ca-pub-1300213627244453' as const;

export const AD_SLOTS = {
  /** Display (responsive auto). Reused across all 5 display positions. */
  displayAuto: '8100046551',
  /** Infeed (fluid + layout key). Between operator cards on state hubs. */
  infeed: '5473883213',
  /** In-article (fluid, in-article layout). Inside blog and guide bodies. */
  inArticle: '9935267161',
  /** Multiplex (autorelaxed). Bottom of blog, guides, crops as related-content. */
  multiplex: '6731124568',
} as const;

export const AD_LAYOUT_KEYS = {
  infeed: '-h0-6+22-5f+52',
} as const;

export type AdSlotKey = keyof typeof AD_SLOTS;
