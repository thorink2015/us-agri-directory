// Public types used across the scraper. Kept dependency-free so any
// source loader, engine, or output writer can import without cycles.

export type ScrapeStatus =
  | 'success'           // found at least one email
  | 'partial'           // found phone or contact form but no email
  | 'no_contact_found'  // pages loaded but nothing extracted
  | 'no_website'        // input had no website to scrape
  | 'site_dead'         // DNS / repeated network failure
  | 'blocked'           // 403 or anti-bot challenge
  | 'cf_blocked'        // Cloudflare challenge page detected
  | 'error';            // other failure (notes carry the reason)

export interface InputRow {
  // Stable identifier from the source. For directory mode this is the
  // operator slug. For CSV / JSON modes it's whatever id column exists,
  // falling back to a slugified name.
  id: string;
  name: string;
  website?: string;
  // Pass-through fields preserved verbatim into the output CSV so users
  // can join the result back to their source list.
  passthrough?: Record<string, string>;
}

export interface ScrapeResult {
  id: string;
  name: string;
  website: string;
  emailPrimary: string;
  emailAll: string[];
  phonePrimary: string;
  phoneAll: string[];
  contactFormUrl: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  sourcePagesChecked: string[];
  status: ScrapeStatus;
  notes: string;
  scrapedAt: string; // ISO8601
}

export interface SourceLoader {
  load(): Promise<InputRow[]>;
}

export type SourceMode = 'directory' | 'csv' | 'json';

export interface CliOptions {
  source: SourceMode;
  file?: string;
  limit?: number;
  force: boolean;
  output?: string;
  concurrency: number;
  perDomainDelayMs: number;
}
