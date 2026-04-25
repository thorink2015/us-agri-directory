'use client';

import { useEffect } from 'react';

/**
 * Detects AI search-engine referrers on landing and records a custom GA4
 * event so AI traffic does not vanish into (direct) / (none).
 *
 * Why this exists:
 * AI engines (ChatGPT, Claude, Perplexity, Gemini, Grok) strip or mask
 * the Referer header when sending a user to an external site. In GA4 the
 * visit lands as "Direct" with no source. This component inspects
 * document.referrer AND known AI tracking query params on the landing URL,
 * fires an `ai_referral` event with the engine name, and sets a
 * traffic_source_override property for the session so you can filter AI
 * traffic cleanly in GA4 Explore reports.
 *
 * Fires exactly once per page load. SafeMode: no-op outside
 * agdronedirectory.com and no-op if window.gtag is missing.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Known AI-engine referrer host patterns. Order matters: longest prefix wins.
const AI_ENGINES: { engine: string; match: (host: string, search: string) => boolean }[] = [
  { engine: 'chatgpt', match: (h) => /(^|\.)chatgpt\.com$/i.test(h) || /(^|\.)chat\.openai\.com$/i.test(h) },
  { engine: 'claude', match: (h) => /(^|\.)claude\.ai$/i.test(h) || /(^|\.)claude\.com$/i.test(h) },
  { engine: 'perplexity', match: (h) => /(^|\.)perplexity\.ai$/i.test(h) },
  { engine: 'gemini', match: (h) => /(^|\.)gemini\.google\.com$/i.test(h) || /(^|\.)bard\.google\.com$/i.test(h) },
  { engine: 'copilot', match: (h) => /(^|\.)copilot\.microsoft\.com$/i.test(h) || /(^|\.)bing\.com$/i.test(h) && false },
  { engine: 'grok', match: (h) => /(^|\.)grok\.com$/i.test(h) || /(^|\.)x\.ai$/i.test(h) },
  { engine: 'you', match: (h) => /(^|\.)you\.com$/i.test(h) },
  { engine: 'mistral', match: (h) => /(^|\.)chat\.mistral\.ai$/i.test(h) || /(^|\.)lechat\.mistral\.ai$/i.test(h) },
  { engine: 'kagi', match: (h) => /(^|\.)kagi\.com$/i.test(h) },
  { engine: 'phind', match: (h) => /(^|\.)phind\.com$/i.test(h) },
  { engine: 'andi', match: (h) => /(^|\.)andisearch\.com$/i.test(h) },
  { engine: 'brave-leo', match: (h) => /(^|\.)search\.brave\.com$/i.test(h) },
];

// Explicit UTM / query-param overrides so you can hand-tag AI-oriented content
// (e.g. llms.txt links) with ?utm_source=chatgpt and still attribute correctly.
const UTM_AI_SOURCES = new Set([
  'chatgpt',
  'openai',
  'claude',
  'anthropic',
  'perplexity',
  'gemini',
  'google-ai',
  'grok',
  'xai',
  'copilot',
  'bing-ai',
  'you',
  'mistral',
  'llms-txt',
  'ai-overview',
]);

function detectAIEngine(): string | null {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;

  // 1. UTM override on the landing URL.
  try {
    const params = new URLSearchParams(window.location.search);
    const source = (params.get('utm_source') || '').toLowerCase();
    if (UTM_AI_SOURCES.has(source)) return source;
    const ref = (params.get('ref') || '').toLowerCase();
    if (UTM_AI_SOURCES.has(ref)) return ref;
  } catch {
    // ignore
  }

  // 2. document.referrer hostname match.
  try {
    const raw = document.referrer;
    if (!raw) return null;
    const url = new URL(raw);
    const host = url.hostname;
    for (const { engine, match } of AI_ENGINES) {
      if (match(host, url.search)) return engine;
    }
  } catch {
    // ignore
  }

  return null;
}

export default function AIReferrerTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hostname !== 'agdronedirectory.com') return;
    if (typeof window.gtag !== 'function') return;

    const engine = detectAIEngine();
    if (!engine) return;

    const pagePath =
      typeof window !== 'undefined' ? window.location.pathname + window.location.search : '';

    window.gtag('event', 'ai_referral', {
      ai_engine: engine,
      page_path: pagePath,
      referrer: document.referrer || '(stripped)',
    });

    // Session-scoped custom dimension so Explore reports can segment on it.
    window.gtag('set', 'user_properties', {
      traffic_source_override: `ai-${engine}`,
    });

    // Also emit a GA4 event parameter on the next page_view so campaign reports
    // surface AI visits without a custom dimension plumbing change.
    window.gtag('set', { campaign_source: `ai-${engine}`, campaign_medium: 'ai-referral' });
  }, []);

  return null;
}
