'use client';

import { useEffect, useRef, useState } from 'react';

const BEEHIIV_FORM_ID = 'f05ad8ce-3cc6-4a42-8c44-e02383e7059b';
const LOADER_SRC = 'https://subscribe-forms.beehiiv.com/v3/loader.js';

/**
 * Embeds the beehiiv "Tank Mix" subscribe form.
 *
 * The beehiiv loader injects the form as a sibling of its own <script> tag,
 * so the script is appended into our own container (not the document head)
 * to keep the form where we want it. It is loaded lazily, only once the
 * section is near the viewport, so it never costs anything on first paint and
 * keeps the PageSpeed budget intact (standing-rules § 8: no synchronous
 * external scripts).
 */
export default function BeehiivEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [injected, setInjected] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || injected) return;

    const inject = () => {
      if (el.querySelector('script')) return;
      const script = document.createElement('script');
      script.src = LOADER_SRC;
      script.async = true;
      script.setAttribute('data-beehiiv-form', BEEHIIV_FORM_ID);
      el.appendChild(script);
      setInjected(true);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            inject();
            observer.disconnect();
          }
        },
        { rootMargin: '400px' },
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    // Older browsers without IntersectionObserver: just load it.
    inject();
  }, [injected]);

  return (
    <div
      ref={containerRef}
      className="beehiiv-embed min-h-[78px]"
      aria-label="Tank Mix newsletter signup form"
    />
  );
}
