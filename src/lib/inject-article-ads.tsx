// ─── In-article ad injection helper ─────────────────────────────────────
// Walks the top-level children of a prose ReactNode and inserts
// <InArticleAd> markers at two positions:
//
//   1. Immediately after the FIRST <h2> heading.
//   2. The earlier of: immediately after the THIRD <h2>, OR immediately
//      after the element whose cumulative running word count crosses 800.
//
// Both `blogContent` and `guideContent` keyed-by-slug records hold a
// React Fragment (`<>...</>`) as the value. The helper preserves that
// shape: it returns a new Fragment with two extra <InArticleAd> nodes
// interleaved. Short posts (zero or one <h2>) get at most one ad
// injection; ultra-short posts (no <h2>) get none.
// ────────────────────────────────────────────────────────────────────────

import React, { ReactNode } from 'react';
import { InArticleAd } from '@/components/ads/AdUnits';

function getNodeText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join(' ');
  if (React.isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return getNodeText(props.children);
  }
  return '';
}

function isH2(node: ReactNode): boolean {
  return React.isValidElement(node) && node.type === 'h2';
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function injectInArticleAds(content: ReactNode): ReactNode {
  if (!React.isValidElement(content)) return content;

  const root = content as React.ReactElement<{ children?: ReactNode }>;
  const rawChildren = root.props.children;
  const children = React.Children.toArray(rawChildren);

  const result: ReactNode[] = [];
  let h2Count = 0;
  let cumulativeWords = 0;
  let firstInjected = false;
  let secondInjected = false;
  let adKey = 0;

  for (const child of children) {
    result.push(child);

    if (isH2(child)) {
      h2Count += 1;
      if (h2Count === 1 && !firstInjected) {
        result.push(<InArticleAd key={`ia-${adKey++}`} />);
        firstInjected = true;
        continue;
      }
      if (h2Count === 3 && firstInjected && !secondInjected) {
        result.push(<InArticleAd key={`ia-${adKey++}`} />);
        secondInjected = true;
        continue;
      }
    }

    if (firstInjected && !secondInjected) {
      cumulativeWords += countWords(getNodeText(child));
      if (cumulativeWords >= 800) {
        result.push(<InArticleAd key={`ia-${adKey++}`} />);
        secondInjected = true;
      }
    }
  }

  return <>{result}</>;
}
