'use client';

import { useEffect, useRef } from 'react';

const BEEHIIV_FORM_ID = 'f05ad8ce-3cc6-4a42-8c44-e02383e7059b';
const LOADER_SRC = 'https://subscribe-forms.beehiiv.com/v3/loader.js';

/**
 * Embeds the beehiiv "Tank Mix" subscribe form:
 *   <script async src="https://subscribe-forms.beehiiv.com/v3/loader.js"
 *           data-beehiiv-form="f05ad8ce-3cc6-4a42-8c44-e02383e7059b"></script>
 *
 * The script is created and appended into this component's own container on
 * mount (afterInteractive) rather than written into JSX, because React does
 * not execute <script> tags rendered as markup. The beehiiv loader injects
 * the form as a sibling of its script tag, so appending into our container
 * keeps the form exactly where we place it.
 */
export default function BeehiivEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || el.querySelector('script')) return;

    const script = document.createElement('script');
    script.src = LOADER_SRC;
    script.async = true;
    script.setAttribute('data-beehiiv-form', BEEHIIV_FORM_ID);
    el.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      className="beehiiv-embed w-full min-h-[48px]"
      aria-label="Tank Mix newsletter signup form"
    />
  );
}
