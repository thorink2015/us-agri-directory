import * as cheerio from 'cheerio';
import { CONFIG } from '../config.ts';

// Build the candidate page list for a site:
//   1) homepage itself
//   2) standard /contact, /about etc paths from CONFIG
//   3) any link on the homepage whose text or href hints at "contact"
//      or "get in touch", limited to same-origin
//
// Returns absolute URLs, deduped, capped at a sane maximum.
const MAX_CANDIDATES = 6;

const CONTACT_HINTS = [
  /\bcontact\b/i,
  /\bget in touch\b/i,
  /\breach (us|out)\b/i,
  /\bemail us\b/i,
];

export function discoverCandidates(homepageUrl: string, html: string): string[] {
  const homeUrl = new URL(homepageUrl);
  const origin = homeUrl.origin;

  const out: string[] = [];
  const seen = new Set<string>();
  const push = (u: string) => {
    if (seen.has(u)) return;
    seen.add(u);
    out.push(u);
  };

  // 1) homepage first — it carries the footer, which is where most ag
  //    operators actually publish their email.
  push(homeUrl.toString());

  // 2) standard candidate paths
  for (const path of CONFIG.candidatePaths) {
    if (path === '/') continue;
    push(new URL(path, origin).toString());
  }

  // 3) homepage links matching contact hints
  if (html) {
    const $ = cheerio.load(html);
    $('a[href]').each((_, el) => {
      if (out.length >= MAX_CANDIDATES * 2) return;
      const $el = $(el);
      const hrefRaw = $el.attr('href');
      if (!hrefRaw) return;
      const text = $el.text().trim();
      const matchesText = CONTACT_HINTS.some((re) => re.test(text));
      const matchesHref = CONTACT_HINTS.some((re) => re.test(hrefRaw));
      if (!matchesText && !matchesHref) return;
      try {
        const u = new URL(hrefRaw, origin);
        if (u.origin !== origin) return;
        u.hash = '';
        push(u.toString());
      } catch {
        // ignore unparseable hrefs
      }
    });
  }

  return out.slice(0, MAX_CANDIDATES);
}
