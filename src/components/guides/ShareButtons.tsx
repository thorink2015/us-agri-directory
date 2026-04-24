'use client';

import { useState } from 'react';
import { Link2, Check } from 'lucide-react';

interface Props {
  url: string;
  title: string;
  /** Visual size: sm renders in a compact header strip, md in a footer band. */
  size?: 'sm' | 'md';
}

export default function ShareButtons({ url, title, size = 'sm' }: Props) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const xHref = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  const onCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* swallow */
    }
  };

  const btnBase =
    size === 'sm'
      ? 'inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md border border-stone-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1'
      : 'inline-flex items-center gap-2 text-sm font-semibold px-3.5 py-2 rounded-lg border border-stone-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1';

  return (
    <div
      role="group"
      aria-label="Share this guide"
      className="flex flex-wrap items-center gap-2"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 mr-1">
        Share
      </span>
      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        className={btnBase}
        aria-label="Share on X"
      >
        <span aria-hidden="true" className="font-bold">X</span>
      </a>
      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        className={btnBase}
        aria-label="Share on LinkedIn"
      >
        <span aria-hidden="true" className="font-bold">LinkedIn</span>
      </a>
      <button
        type="button"
        onClick={onCopy}
        className={btnBase}
        aria-label={copied ? 'Link copied to clipboard' : 'Copy link to clipboard'}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Copy link</span>
          </>
        )}
      </button>
    </div>
  );
}
