'use client';

import { useEffect, useState } from 'react';

/**
 * Thin sticky progress bar that tracks scroll through the article.
 * Fixed to the top of the viewport, 2px, green brand tone, non-overlay.
 */
export default function GuideReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const next = max > 0 ? Math.min(100, Math.max(0, (doc.scrollTop / max) * 100)) : 0;
      setPct(next);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[2px] z-40 pointer-events-none print:hidden"
    >
      <div
        className="h-full bg-green-700"
        style={{ width: `${pct}%`, transition: 'width 80ms linear' }}
      />
    </div>
  );
}
