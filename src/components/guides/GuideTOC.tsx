'use client';

import { useEffect, useRef, useState } from 'react';
import { List } from 'lucide-react';

interface Props {
  sections: { id: string; label: string }[];
}

/**
 * Anchor-linked table of contents.
 * - Desktop (lg+): sticky sidebar, scrollspy-highlighted active entry.
 * - Mobile (<lg): collapsible drawer at the top of the article.
 * Relies on `<h2 id="...">` (or any element with id) matching `section.id`.
 */
export default function GuideTOC({ sections }: Props) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);
  const mobileRef = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    if (!sections.length) return;
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const sorted = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveId(sorted[0].target.id);
        }
      },
      {
        rootMargin: '-120px 0px -65% 0px',
        threshold: 0,
      }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections]);

  if (!sections.length) return null;

  return (
    <>
      {/* Desktop sidebar */}
      <nav
        aria-label="Guide contents"
        className="hidden lg:block sticky top-8 self-start w-60 shrink-0 print:hidden"
      >
        <div className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-3">
          In this guide
        </div>
        <ol className="space-y-0 text-sm border-l border-stone-200">
          {sections.map((s) => {
            const active = activeId === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`block pl-4 py-1.5 -ml-px border-l-2 transition-colors leading-snug ${
                    active
                      ? 'border-green-700 text-green-800 font-medium'
                      : 'border-transparent text-gray-600 hover:text-green-800'
                  }`}
                  onClick={() => setActiveId(s.id)}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile drawer */}
      <details
        ref={mobileRef}
        className="lg:hidden mb-8 group bg-stone-50 border border-stone-200 rounded-xl print:hidden"
      >
        <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer list-none select-none">
          <List className="w-4 h-4 text-gray-700" />
          <span className="font-semibold text-gray-900 text-sm">In this guide</span>
          <span className="ml-auto text-xs text-gray-500">
            {sections.length} sections
          </span>
        </summary>
        <ol className="px-4 pb-4 pt-2 space-y-1 text-sm border-t border-stone-200">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="block py-1.5 text-gray-700 hover:text-green-800"
                onClick={() => mobileRef.current && (mobileRef.current.open = false)}
              >
                <span className="text-gray-400 mr-2 tabular-nums">{String(i + 1).padStart(2, '0')}.</span>
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </>
  );
}
