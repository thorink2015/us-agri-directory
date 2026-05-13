'use client';

// ─── Format-specific AdSlot wrappers ─────────────────────────────────────
// Thin presets over the generic <AdSlot> in this folder. Each wrapper binds
// one AD_SLOTS key with the matching format + layout / layoutKey so consumer
// pages can render the right unit type without restating AdSense magic
// strings.
//
// All four wrappers respect the NEXT_PUBLIC_ADS_ENABLED gate inherited from
// <AdSlot>: in production with the env unset, every wrapper returns null;
// in dev, all four render the dashed dev placeholder.
// ─────────────────────────────────────────────────────────────────────────

import AdSlot from './AdSlot';
import { AD_LAYOUT_KEYS, AD_SLOTS } from '@/lib/adSlots';

interface WrapperProps {
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

/** Display (responsive auto). The 5 existing positions across homepage,
 *  state hubs and tool pages all use this. */
export function DisplayAd(props: WrapperProps) {
  return <AdSlot slot={AD_SLOTS.displayAuto} format="auto" {...props} />;
}

/** Infeed (fluid + layout key). Designed to visually match surrounding
 *  content cards. Use inside the state-page operator grid. */
export function InfeedAd(props: WrapperProps) {
  return (
    <AdSlot
      slot={AD_SLOTS.infeed}
      format="fluid"
      layoutKey={AD_LAYOUT_KEYS.infeed}
      {...props}
    />
  );
}

/** In-article (fluid + in-article layout). Sits between paragraphs inside
 *  long-form blog and guide bodies. */
export function InArticleAd(props: WrapperProps) {
  return (
    <AdSlot
      slot={AD_SLOTS.inArticle}
      format="fluid"
      layout="in-article"
      {...props}
    />
  );
}

/** Multiplex (autorelaxed). Renders as a related-content grid at the
 *  bottom of long-form content. */
export function MultiplexAd(props: WrapperProps) {
  return <AdSlot slot={AD_SLOTS.multiplex} format="autorelaxed" {...props} />;
}
