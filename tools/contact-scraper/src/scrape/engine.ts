import { CONFIG } from '../config.ts';
import type { InputRow, ScrapeResult, ScrapeStatus } from '../types.ts';
import { fetchHtml, getDomain, normalizeUrl, type FetchOutcome } from './fetch.ts';
import { discoverCandidates } from './pages.ts';
import { extractFromHtml, isRoleEmail, type PageExtraction } from './extract.ts';
import { waitForDomainSlot } from './domain-queue.ts';

export interface EngineOptions {
  perDomainDelayMs: number;
}

interface AggregatedSignals {
  emails: string[];
  phones: string[];
  socials: PageExtraction['socials'];
  contactFormUrl: string;
  emailImageFlag: boolean;
  pagesChecked: string[];
}

function emptyAggregate(): AggregatedSignals {
  return {
    emails: [],
    phones: [],
    socials: {
      linkedin: '',
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
    },
    contactFormUrl: '',
    emailImageFlag: false,
    pagesChecked: [],
  };
}

function mergePage(
  agg: AggregatedSignals,
  url: string,
  ext: PageExtraction,
): void {
  agg.pagesChecked.push(url);
  for (const e of ext.emails) {
    if (!agg.emails.includes(e)) agg.emails.push(e);
  }
  for (const p of ext.phones) {
    if (!agg.phones.includes(p)) agg.phones.push(p);
  }
  for (const k of Object.keys(agg.socials) as (keyof PageExtraction['socials'])[]) {
    if (!agg.socials[k] && ext.socials[k]) agg.socials[k] = ext.socials[k];
  }
  if (!agg.contactFormUrl && ext.hasContactForm) agg.contactFormUrl = url;
  if (ext.hasEmailImage) agg.emailImageFlag = true;
}

function pickPrimaryEmail(emails: string[]): string {
  if (emails.length === 0) return '';
  const personal = emails.find((e) => !isRoleEmail(e));
  return personal ?? emails[0]!;
}

function pickPrimaryPhone(phones: string[]): string {
  return phones[0] ?? '';
}

async function fetchWithRetry(
  url: string,
  delayMs: number,
): Promise<FetchOutcome> {
  const domain = getDomain(url);
  if (domain) await waitForDomainSlot(domain, delayMs);
  const first = await fetchHtml(url);
  if (
    first.kind !== 'timeout' &&
    first.kind !== 'network_error'
  ) {
    return first;
  }
  // One retry with the longer timeout.
  if (domain) await waitForDomainSlot(domain, delayMs);
  return fetchHtml(url, { timeoutMs: CONFIG.retry.timeoutMs });
}

function classifyOutcome(o: FetchOutcome):
  | { kind: 'usable'; html: string; finalUrl: string }
  | { kind: 'site_dead'; reason: string }
  | { kind: 'blocked'; reason: string }
  | { kind: 'cf_blocked' }
  | { kind: 'http_error'; status: number; finalUrl: string } {
  switch (o.kind) {
    case 'ok':
      return { kind: 'usable', html: o.html, finalUrl: o.finalUrl };
    case 'cf_blocked':
      return { kind: 'cf_blocked' };
    case 'http_error':
      if (o.status === 401 || o.status === 403 || o.status === 429) {
        return { kind: 'blocked', reason: `HTTP ${o.status}` };
      }
      return { kind: 'http_error', status: o.status, finalUrl: o.finalUrl };
    case 'too_large':
      return { kind: 'http_error', status: o.status, finalUrl: o.finalUrl };
    case 'timeout':
      return { kind: 'site_dead', reason: 'timeout' };
    case 'network_error':
      return { kind: 'site_dead', reason: o.reason };
  }
}

export async function scrapeOne(
  row: InputRow,
  opts: EngineOptions,
): Promise<ScrapeResult> {
  const scrapedAt = new Date().toISOString();
  const baseResult: Omit<ScrapeResult, 'status' | 'notes'> = {
    id: row.id,
    name: row.name,
    website: row.website ?? '',
    emailPrimary: '',
    emailAll: [],
    phonePrimary: '',
    phoneAll: [],
    contactFormUrl: '',
    linkedin: '',
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    sourcePagesChecked: [],
    scrapedAt,
  };

  if (!row.website || !row.website.trim()) {
    return { ...baseResult, status: 'no_website', notes: 'no website in source' };
  }

  const homepage = normalizeUrl(row.website);
  if (!homepage) {
    return {
      ...baseResult,
      status: 'error',
      notes: `unparseable website: ${row.website}`,
    };
  }
  baseResult.website = homepage;

  // Step 1: fetch homepage with retry.
  const homepageOutcome = await fetchWithRetry(homepage, opts.perDomainDelayMs);
  const homepageClass = classifyOutcome(homepageOutcome);
  if (homepageClass.kind === 'site_dead') {
    return {
      ...baseResult,
      status: 'site_dead',
      notes: `homepage failed: ${homepageClass.reason}`,
    };
  }
  if (homepageClass.kind === 'blocked') {
    return {
      ...baseResult,
      status: 'blocked',
      notes: `homepage ${homepageClass.reason}`,
    };
  }
  if (homepageClass.kind === 'cf_blocked') {
    return {
      ...baseResult,
      status: 'cf_blocked',
      notes: 'cloudflare challenge on homepage',
    };
  }
  if (homepageClass.kind === 'http_error') {
    return {
      ...baseResult,
      status: 'site_dead',
      notes: `homepage HTTP ${homepageClass.status}`,
    };
  }

  // Step 2: discover candidate pages from the homepage HTML.
  const homeFinalUrl = homepageClass.finalUrl;
  const candidates = discoverCandidates(homeFinalUrl, homepageClass.html);

  // Step 3: extract from homepage and walk candidates within the per-site budget.
  const agg = emptyAggregate();
  mergePage(agg, homeFinalUrl, extractFromHtml(homepageClass.html));

  const startedAt = Date.now();
  const notes: string[] = [];

  for (const url of candidates.slice(1)) {
    if (Date.now() - startedAt > CONFIG.perSiteBudgetMs) {
      notes.push('per-site budget reached');
      break;
    }
    const outcome = await fetchWithRetry(url, opts.perDomainDelayMs);
    const cls = classifyOutcome(outcome);
    if (cls.kind === 'usable') {
      mergePage(agg, cls.finalUrl, extractFromHtml(cls.html));
    } else if (cls.kind === 'cf_blocked') {
      notes.push(`cf_blocked: ${url}`);
      // No point hammering more pages on this domain.
      break;
    } else if (cls.kind === 'blocked') {
      notes.push(`blocked: ${url} (${cls.reason})`);
      break;
    } else if (cls.kind === 'http_error') {
      // 404 on /contact is the common case — silent, expected.
      if (cls.status !== 404) notes.push(`HTTP ${cls.status}: ${url}`);
    } else if (cls.kind === 'site_dead') {
      notes.push(`failed: ${url} (${cls.reason})`);
    }
  }

  if (agg.emailImageFlag && agg.emails.length === 0) {
    notes.push('email-as-image detected; manual review needed');
  }

  // Step 4: choose primaries and pick the final status.
  const emailPrimary = pickPrimaryEmail(agg.emails);
  const phonePrimary = pickPrimaryPhone(agg.phones);
  let status: ScrapeStatus;
  if (emailPrimary) status = 'success';
  else if (phonePrimary || agg.contactFormUrl) status = 'partial';
  else status = 'no_contact_found';

  return {
    ...baseResult,
    emailPrimary,
    emailAll: agg.emails,
    phonePrimary,
    phoneAll: agg.phones,
    contactFormUrl: agg.contactFormUrl,
    linkedin: agg.socials.linkedin,
    facebook: agg.socials.facebook,
    instagram: agg.socials.instagram,
    twitter: agg.socials.twitter,
    youtube: agg.socials.youtube,
    sourcePagesChecked: agg.pagesChecked,
    status,
    notes: notes.join('; '),
  };
}
