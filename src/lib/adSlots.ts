// ─── AdSense ad unit slot IDs ────────────────────────────────────────────
// One central registry so slot IDs are never hardcoded inside components.
// Eugen replaces each TODO value with the real slot ID after creating the
// matching ad unit in the AdSense dashboard:
//   AdSense > Ads > By ad unit > Display ads / In-article > create unit
// Until then, components render an empty <ins data-ad-slot="TODO_..."> which
// AdSense simply leaves blank (no policy violation, no layout break).
// ─────────────────────────────────────────────────────────────────────────

export const ADSENSE_CLIENT = 'ca-pub-1300213627244453' as const;

export const AD_SLOTS = {
  HOME_BELOW_HERO: 'TODO_REPLACE_WITH_REAL_SLOT_ID',
  HOME_MID: 'TODO_REPLACE_WITH_REAL_SLOT_ID',
  STATE_BELOW_INTRO: 'TODO_REPLACE_WITH_REAL_SLOT_ID',
  STATE_AFTER_OPERATORS: 'TODO_REPLACE_WITH_REAL_SLOT_ID',
  GUIDE_IN_ARTICLE_1: 'TODO_REPLACE_WITH_REAL_SLOT_ID',
  GUIDE_IN_ARTICLE_2: 'TODO_REPLACE_WITH_REAL_SLOT_ID',
  TOOLS_BELOW_RESULT: 'TODO_REPLACE_WITH_REAL_SLOT_ID',
} as const;

export type AdSlotKey = keyof typeof AD_SLOTS;

/** Returns true when the slot ID is still a placeholder. The AdSlot
 *  component uses this to skip the `(adsbygoogle).push({})` call until a
 *  real ID is present, so unfilled placeholders don't fire impression
 *  requests against the AdSense script. */
export function isPlaceholderSlot(slotId: string): boolean {
  return slotId.startsWith('TODO_');
}
