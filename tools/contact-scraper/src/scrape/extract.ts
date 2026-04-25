import * as cheerio from 'cheerio';
import {
  decodeHtmlEntities,
  extractCfEmails,
  extractMailtoEmails,
  extractSpelledOutEmails,
} from './decoders.ts';

export interface PageExtraction {
  emails: string[];
  phones: string[];
  socials: {
    linkedin: string;
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  hasContactForm: boolean;
  hasEmailImage: boolean;
}

// Junk emails we never want in the output. Tracking placeholders, sentry
// keys, common dummies. Anything matching is dropped silently.
const EMAIL_BLOCKLIST = [
  /@example\.com$/i,
  /@example\.org$/i,
  /@email\.com$/i,
  /@domain\.com$/i,
  /@yourdomain\.com$/i,
  /@test\.com$/i,
  /@sentry\.io$/i,
  /@sentry\.wixpress\.com$/i,
  /@wixpress\.com$/i,
  /@u003e/i, // escaped JSON garbage
  /^you@/i,
  /^name@/i,
  /^your@/i,
  /^email@/i,
  /^test@/i,
  /^firstname/i,
  /^user@/i,
];

const ROLE_LOCAL_PARTS = new Set([
  'info',
  'contact',
  'hello',
  'hi',
  'sales',
  'support',
  'admin',
  'office',
  'mail',
  'enquiries',
  'inquiries',
  'help',
  'team',
  'service',
  'general',
  'press',
  'media',
  'noreply',
  'no-reply',
  'postmaster',
  'webmaster',
]);

export function isRoleEmail(email: string): boolean {
  const local = email.split('@')[0]?.toLowerCase() ?? '';
  return ROLE_LOCAL_PARTS.has(local);
}

function cleanEmail(raw: string): string | null {
  let e = raw.trim().toLowerCase();
  // Strip surrounding punctuation that regex sometimes captures.
  e = e.replace(/^[<("'`]+|[>)"'`,;.]+$/g, '');
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(e)) return null;
  if (EMAIL_BLOCKLIST.some((re) => re.test(e))) return null;
  // Drop image-extension false positives like image-jpg@2x.com — extremely rare
  // but cheap to guard.
  if (/@\d+x\./.test(e)) return null;
  return e;
}

const EMAIL_REGEX = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

function extractEmails(html: string, text: string): string[] {
  const collected = new Set<string>();
  // Decode HTML entities first so &#64; etc. become @.
  const htmlDecoded = decodeHtmlEntities(html);
  const textDecoded = decodeHtmlEntities(text);

  // 1) plain regex on decoded HTML and visible text
  let m: RegExpExecArray | null;
  EMAIL_REGEX.lastIndex = 0;
  while ((m = EMAIL_REGEX.exec(htmlDecoded)) !== null) collected.add(m[0]);
  EMAIL_REGEX.lastIndex = 0;
  while ((m = EMAIL_REGEX.exec(textDecoded)) !== null) collected.add(m[0]);

  // 2) mailto: hrefs
  for (const e of extractMailtoEmails(html)) collected.add(e);

  // 3) Cloudflare email protection (data-cfemail / cdn-cgi/l/email-protection)
  for (const e of extractCfEmails(html)) collected.add(e);

  // 4) Word-spelled obfuscations on visible text
  for (const e of extractSpelledOutEmails(textDecoded)) collected.add(e);

  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of collected) {
    const cleaned = cleanEmail(raw);
    if (!cleaned) continue;
    if (seen.has(cleaned)) continue;
    seen.add(cleaned);
    out.push(cleaned);
  }
  return out;
}

const PHONE_BLOCK = [
  // Known-fake "555" example numbers.
  /^\+?1[\s.-]?\(?555\)?/,
];

function normalizePhone(raw: string): string {
  return raw.replace(/[^\d+]/g, '');
}

function extractPhones(text: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];

  // US format: optional +1, area code, prefix, line. Uses lookbehind to
  // avoid catching digits embedded in longer runs (e.g. tracking IDs).
  const usRe =
    /(?<!\d)(?:\+?1[\s.\-]?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}(?!\d)/g;
  let m: RegExpExecArray | null;
  while ((m = usRe.exec(text)) !== null) {
    const raw = m[0];
    const norm = normalizePhone(raw);
    // Reject if too short / too long after normalization.
    const digits = norm.replace(/^\+/, '');
    if (digits.length !== 10 && digits.length !== 11) continue;
    if (PHONE_BLOCK.some((re) => re.test(raw))) continue;
    const display = raw.trim();
    if (!seen.has(norm)) {
      seen.add(norm);
      out.push(display);
    }
  }
  return out;
}

function extractSocials($: cheerio.CheerioAPI): PageExtraction['socials'] {
  const acc = {
    linkedin: '',
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
  };
  $('a[href]').each((_, el) => {
    const hrefRaw = $(el).attr('href');
    if (!hrefRaw) return;
    const href = hrefRaw.trim();
    if (!href || href.startsWith('#')) return;
    const lower = href.toLowerCase();
    // Filter out share / intent / sharing URLs — those are widgets, not the
    // operator's own profile.
    const isShare =
      lower.includes('/sharer') ||
      lower.includes('/share?') ||
      lower.includes('/intent/') ||
      lower.includes('share.php') ||
      lower.includes('linkedin.com/shareArticle'.toLowerCase()) ||
      lower.includes('linkedin.com/sharing/');
    if (isShare) return;

    if (!acc.linkedin && lower.includes('linkedin.com/')) acc.linkedin = href;
    if (!acc.facebook && (lower.includes('facebook.com/') || lower.includes('fb.com/')))
      acc.facebook = href;
    if (!acc.instagram && lower.includes('instagram.com/')) acc.instagram = href;
    if (
      !acc.twitter &&
      (lower.includes('twitter.com/') || lower.includes('://x.com/') || lower.includes('//x.com/'))
    )
      acc.twitter = href;
    if (!acc.youtube && (lower.includes('youtube.com/') || lower.includes('youtu.be/')))
      acc.youtube = href;
  });
  return acc;
}

function detectContactForm($: cheerio.CheerioAPI): boolean {
  let found = false;
  $('form').each((_, formEl) => {
    if (found) return;
    const form = $(formEl);
    // Heuristic: form has either (a) input[type=email], or (b) textarea, or
    // (c) at least one input with name/id/placeholder mentioning email/message.
    if (form.find('input[type="email"]').length > 0) {
      found = true;
      return;
    }
    if (form.find('textarea').length > 0) {
      found = true;
      return;
    }
    const fieldHit = form.find('input, textarea').filter((_, el) => {
      const $el = $(el);
      const sig = `${$el.attr('name') ?? ''} ${$el.attr('id') ?? ''} ${$el.attr('placeholder') ?? ''}`.toLowerCase();
      return /email|message|enquiry|inquiry|contact|name/.test(sig);
    });
    if (fieldHit.length >= 2) {
      found = true;
    }
  });
  return found;
}

function detectEmailImage($: cheerio.CheerioAPI): boolean {
  // Look for <img> tags with alt/title/src text that suggests an email image.
  let found = false;
  $('img').each((_, el) => {
    if (found) return;
    const $el = $(el);
    const sig = `${$el.attr('alt') ?? ''} ${$el.attr('title') ?? ''} ${$el.attr('src') ?? ''}`.toLowerCase();
    if (sig.includes('@') || /email/.test(sig) || /e-?mail/.test(sig)) {
      // Confirm there's contact-context nearby (within parent or grandparent).
      const ctx = `${$el.parent().text()} ${$el.parent().parent().text()}`.toLowerCase();
      if (/contact|email|reach|get in touch/.test(ctx)) {
        found = true;
      }
    }
  });
  return found;
}

export function extractFromHtml(html: string): PageExtraction {
  const $ = cheerio.load(html);
  // Drop scripts and styles from the visible-text channel; keep them in the
  // raw HTML channel because mailto: and CFEmail can live in attributes.
  $('script, style, noscript').remove();
  const text = $.root().text();

  return {
    emails: extractEmails(html, text),
    phones: extractPhones(text),
    socials: extractSocials($),
    hasContactForm: detectContactForm($),
    hasEmailImage: detectEmailImage($),
  };
}
