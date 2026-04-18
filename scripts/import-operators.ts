#!/usr/bin/env node
/**
 * scripts/import-operators.ts  — step 2 of 3
 * Parses all 7 operator batch files, maps each row to the Operator interface,
 * and writes scripts/import-mapped.json.
 * Run: npx tsx scripts/import-operators.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');

const BATCH_FILES = [
  '_research/operators-batch-1-northeast.md',
  '_research/operators-batch-3-midwest-corn-belt.md',
  '_research/operators-batch-4a-great-plains.md',
  '_research/operators-batch-4b-mountain-west-v2.md',
  '_research/operators-batch-5-west-coast-pacific.md',
  '_research/operators-batch-5a-california.md',
  '_research/operators-batch-5b-pnw-ak-hi.md',
];

// (dry-run output path is constructed inline in main)

type RawRow = Record<string, string>;
type ServiceType =
  | 'spraying' | 'spreading' | 'monitoring' | 'mapping'
  | 'training'  | 'rental'    | 'sales'      | 'seeding'
  | 'consultancy' | 'emergency';

// Minimal Operator shape (matches src/data/types.ts Operator interface)
interface MappedOperator {
  slug: string;
  name: string;
  description: string;
  country: string;
  city: string;
  counties: string[];
  phone?: string;
  email?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  founded?: number;
  services: ServiceType[];
  drones: string[];
  crops: string[];
  certFAAPart107?: boolean;
  certFAAPart137?: boolean;
  featured: boolean;
  verified: boolean;
  /** debug — which file produced this row */
  _src: string;
}

// ---------------------------------------------------------------------------
// State abbreviation → slug map
// ---------------------------------------------------------------------------

const STATE_SLUGS: Record<string, string> = {
  AL: 'alabama',       AK: 'alaska',        AZ: 'arizona',      AR: 'arkansas',
  CA: 'california',    CO: 'colorado',       CT: 'connecticut',  DE: 'delaware',
  FL: 'florida',       GA: 'georgia',        HI: 'hawaii',       ID: 'idaho',
  IL: 'illinois',      IN: 'indiana',        IA: 'iowa',         KS: 'kansas',
  KY: 'kentucky',      LA: 'louisiana',      ME: 'maine',        MD: 'maryland',
  MA: 'massachusetts', MI: 'michigan',       MN: 'minnesota',    MS: 'mississippi',
  MO: 'missouri',      MT: 'montana',        NE: 'nebraska',     NV: 'nevada',
  NH: 'new-hampshire', NJ: 'new-jersey',     NM: 'new-mexico',   NY: 'new-york',
  NC: 'north-carolina',ND: 'north-dakota',   OH: 'ohio',         OK: 'oklahoma',
  OR: 'oregon',        PA: 'pennsylvania',   RI: 'rhode-island', SC: 'south-carolina',
  SD: 'south-dakota',  TN: 'tennessee',      TX: 'texas',        UT: 'utah',
  VT: 'vermont',       VA: 'virginia',       WA: 'washington',   WV: 'west-virginia',
  WI: 'wisconsin',     WY: 'wyoming',
};

// ---------------------------------------------------------------------------
// CSV parser — handles quoted fields with embedded commas
// ---------------------------------------------------------------------------

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"' && !inQuotes) {
      inQuotes = true;
    } else if (ch === '"' && inQuotes) {
      if (line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = false;
    } else if (ch === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current.trim());
  return fields;
}

export function parseCsvBlock(content: string): RawRow[] {
  const rows: RawRow[] = [];
  const blockRe = /```(?:csv)?\r?\n([\s\S]+?)```/g;
  let match: RegExpExecArray | null;

  while ((match = blockRe.exec(content)) !== null) {
    const lines = match[1].split('\n').map(l => l.replace(/\r$/, '')).filter(Boolean);
    if (lines.length < 2) continue;
    const headers = parseCSVLine(lines[0]);
    for (let i = 1; i < lines.length; i++) {
      const vals = parseCSVLine(lines[i]);
      if (!vals.some(v => v.trim())) continue;
      const row: RawRow = {};
      headers.forEach((h, idx) => { row[h.trim()] = (vals[idx] ?? '').trim(); });
      rows.push(row);
    }
  }
  return rows;
}

// ---------------------------------------------------------------------------
// Markdown pipe-table parser
// ---------------------------------------------------------------------------

function isSeparatorLine(line: string): boolean {
  return /^\|[\s\-:|]+\|$/.test(line.trim());
}

function parseTableBlock(lines: string[]): RawRow[] {
  if (lines.length < 2) return [];
  let headerLine = '';
  let headerIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (!isSeparatorLine(lines[i])) { headerLine = lines[i]; headerIdx = i; break; }
  }
  if (headerIdx === -1) return [];

  const headers = headerLine.split('|').slice(1, -1).map(h => h.trim());
  const rows: RawRow[] = [];
  for (let i = headerIdx + 1; i < lines.length; i++) {
    if (isSeparatorLine(lines[i])) continue;
    const vals = lines[i].split('|').slice(1, -1).map(v => v.trim());
    if (!vals.some(v => v)) continue;
    const row: RawRow = {};
    headers.forEach((h, idx) => { row[h] = vals[idx] ?? ''; });
    rows.push(row);
  }
  return rows;
}

export function parseMarkdownTable(content: string): RawRow[] {
  const fileLines = content.split('\n').map(l => l.replace(/\r$/, ''));
  const blocks: string[][] = [];
  let tableBuf: string[] = [];

  const flush = () => { if (tableBuf.length > 1) blocks.push([...tableBuf]); tableBuf = []; };
  for (const line of fileLines) {
    if (line.trim().startsWith('|')) tableBuf.push(line);
    else flush();
  }
  flush();

  const rows: RawRow[] = [];
  for (const block of blocks) {
    const headerLine = block.find(l => !isSeparatorLine(l));
    if (!headerLine) continue;
    const cols = headerLine.split('|').slice(1, -1).map(h => h.trim());
    const hasCompanyCol = cols.some(c => /company|operator.?name|company.?name/i.test(c));
    if (!hasCompanyCol && cols.length < 10) continue;
    rows.push(...parseTableBlock(block));
  }
  return rows;
}

export function parseBatchFile(filepath: string): RawRow[] {
  const content = fs.readFileSync(filepath, 'utf-8');
  if (/```(?:csv)?\r?\n/.test(content)) return parseCsvBlock(content);
  return parseMarkdownTable(content);
}

// ---------------------------------------------------------------------------
// Column name resolver — maps varied headers to canonical field names
// ---------------------------------------------------------------------------

/**
 * Return the first value whose key matches any of the provided patterns.
 * Patterns are matched case-insensitively against the row's keys.
 */
function getCol(row: RawRow, ...patterns: RegExp[]): string {
  for (const pat of patterns) {
    for (const key of Object.keys(row)) {
      if (pat.test(key)) return row[key] ?? '';
    }
  }
  return '';
}

// ---------------------------------------------------------------------------
// Field helpers
// ---------------------------------------------------------------------------

function clean(v: string): string {
  const s = v.trim();
  return /^(n\/a|--|na|none|\?|tbd)$/i.test(s) ? '' : s;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function addUtm(raw: string): string {
  const s = clean(raw);
  if (!s) return '';
  const url = s.startsWith('http') ? s : 'https://' + s;
  const sep = url.includes('?') ? '&' : '?';
  return url + sep + 'utm_source=agdronedirectory&utm_medium=referral&utm_campaign=operator_profile';
}

function parseCert(v: string): boolean | undefined {
  const s = clean(v).toLowerCase();
  if (!s) return undefined;
  if (/^(yes|y|licensed|certified|confirmed|✓)/.test(s)) return true;
  if (/^(no|n\/a|n|none|not )/.test(s)) return false;
  return undefined; // "Implied", "Assists clients", blank → omit
}

function parseYear(v: string): number | undefined {
  const s = clean(v);
  const m = s.match(/\b(19\d{2}|20[0-2]\d)\b/);
  return m ? parseInt(m[1], 10) : undefined;
}

/** Extract every US state abbreviation found in a text string. */
function statesFromText(text: string): string[] {
  if (!text) return [];
  const found = new Set<string>();

  // 2-letter uppercase abbreviations at word boundaries
  for (const m of text.matchAll(/\b([A-Z]{2})\b/g)) {
    const slug = STATE_SLUGS[m[1]];
    if (slug) found.add(slug);
  }

  // Full lowercase state names (for texts like "Central Illinois multi-county")
  const lower = text.toLowerCase();
  for (const [abbr, slug] of Object.entries(STATE_SLUGS)) {
    void abbr;
    const name = slug.replace(/-/g, ' ');
    if (new RegExp(`\\b${name}\\b`).test(lower)) found.add(slug);
  }

  return [...found];
}

function mapServices(servText: string, catText: string): ServiceType[] {
  const t = `${servText} ${catText}`.toLowerCase();
  const s = new Set<ServiceType>();
  if (/spray|fungicid|herbicid|insecticid|pesticid|defoliant|aerial applic|chemical applic|liquid applic/.test(t)) s.add('spraying');
  if (/\bseed(ing)?\b|cover.?crop|broadcast seed/.test(t)) s.add('seeding');
  if (/\bmap(ping)?\b|survey|orthomosaic|\bgis\b|lidar|photogrammetry/.test(t)) s.add('mapping');
  if (/scout|monitor|\bndvi\b|crop health|multispectral|thermal imag|imagery/.test(t)) s.add('monitoring');
  if (/spread|granular|fertilizer|urea|lime|dry applic/.test(t)) s.add('spreading');
  if (/\btrain(ing)?\b|education|certification|course/.test(t)) s.add('training');
  if (/rental|lease/.test(t)) s.add('rental');
  if (/\bsales?\b|dealer|reseller/.test(t)) s.add('sales');
  if (/consult|advisory|agrono/.test(t)) s.add('consultancy');
  if (/emergency/.test(t)) s.add('emergency');
  return [...s];
}

function parseDrones(text: string): string[] {
  const s = clean(text);
  if (!s || /^(not specified|various|see above|n\/a|--|tbd)$/i.test(s)) return [];
  return s
    .split(/[;,]|\bplus\b|\band\b/i)
    .map(d => d.trim())
    .filter(d => d.length > 2 && !/^(not specified|various|see above)$/i.test(d));
}

function parseCrops(text: string): string[] {
  const s = clean(text);
  if (!s || /^(general|all|various|n\/a)$/i.test(s)) return [];
  return s
    .split(/[;,]/)
    .map(c => c.trim())
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Core mapper
// ---------------------------------------------------------------------------

export function mapToOperator(row: RawRow, sourceFile: string): MappedOperator | null {
  // ── Company name ──────────────────────────────────────────────────────────
  const name = clean(
    getCol(row, /company.*(name|operator)/i, /^company$/i, /^name$/i)
  );
  if (!name) return null;

  // ── Category (used for services hinting) ─────────────────────────────────
  const category = clean(getCol(row, /^cat(egory)?$/i));

  // ── City + state ──────────────────────────────────────────────────────────
  // Some files have a combined "City, State" column; others have separate City + ST/State.
  const combinedCityState = clean(
    getCol(row, /^city[, ]+(state|st|ca|hi|or|wa|id|co|mt|wy|nv|nm|az|ut)$/i, /^city state$/i)
  );
  const separateCity  = clean(getCol(row, /^city$/i));
  const separateSt    = clean(getCol(row, /^(st|state)$/i));

  let city = '';
  let homeStateAbbr = '';

  if (combinedCityState) {
    // "Twin Falls, ID" or "Northern Colorado" or "Washington IL"
    const commaSplit = combinedCityState.split(',');
    if (commaSplit.length >= 2) {
      city = commaSplit.slice(0, -1).join(',').trim();
      homeStateAbbr = commaSplit[commaSplit.length - 1].trim().match(/^([A-Z]{2})/)?.[1] ?? '';
    } else {
      // No comma — try "City ST" pattern at end of string
      const m = combinedCityState.match(/^(.+?)\s+([A-Z]{2})$/);
      if (m) { city = m[1].trim(); homeStateAbbr = m[2]; }
      else {
        // Last resort: look for any embedded 2-letter abbreviation
        const abbr = combinedCityState.match(/\b([A-Z]{2})\b/);
        if (abbr && STATE_SLUGS[abbr[1]]) {
          homeStateAbbr = abbr[1];
          city = combinedCityState.replace(abbr[0], '').trim().replace(/,\s*$/, '');
        } else {
          city = combinedCityState;
        }
      }
    }
  } else if (separateCity) {
    city = separateCity;
    homeStateAbbr = separateSt.match(/^([A-Z]{2})$/)?.[1] ?? separateSt;
  }

  // ── Counties from "States Served" ─────────────────────────────────────────
  const statesServedRaw = clean(
    getCol(row, /states?.served/i, /regions?.served/i)
  );
  let counties = statesFromText(statesServedRaw);

  // Fall back to home state when statesServed yields nothing
  if (counties.length === 0 && homeStateAbbr) {
    const slug = STATE_SLUGS[homeStateAbbr.toUpperCase()];
    if (slug) counties = [slug];
  }

  // ── Website ───────────────────────────────────────────────────────────────
  const websiteRaw = clean(getCol(row, /website/i));
  const website = websiteRaw ? addUtm(websiteRaw) : undefined;

  // ── Contact fields ────────────────────────────────────────────────────────
  const phone    = clean(getCol(row, /^phone$/i)) || undefined;
  const email    = clean(getCol(row, /^email$/i)) || undefined;
  const facebook = clean(getCol(row, /^(facebook|fb)(\s|url|$)/i)) || undefined;
  const instagram= clean(getCol(row, /^(instagram|ig)(\s|url|$)/i)) || undefined;
  const linkedin = clean(getCol(row, /^(linkedin|li)(\s|url|$)/i)) || undefined;
  const youtube  = clean(getCol(row, /^(youtube|yt)(\s|url|$)/i)) || undefined;

  // ── Certifications ────────────────────────────────────────────────────────
  const certFAAPart107 = parseCert(clean(getCol(row, /part.?107|p107/i)));
  const certFAAPart137 = parseCert(clean(getCol(row, /part.?137|p137/i)));

  // ── Founded ───────────────────────────────────────────────────────────────
  const founded = parseYear(clean(getCol(row, /year.*(founded|est)|^founded$|^est\.?$/i)));

  // ── Services ─────────────────────────────────────────────────────────────
  const servicesRaw = clean(getCol(row, /services/i));
  const services = mapServices(servicesRaw, category);

  // ── Drones & crops ────────────────────────────────────────────────────────
  const drones = parseDrones(clean(getCol(row, /drone.?model|^drones$/i)));
  const crops  = parseCrops(clean(getCol(row, /^crops/i)));

  // ── Description ───────────────────────────────────────────────────────────
  const description = clean(getCol(row, /short.?description|^description$/i));

  return {
    slug: slugify(name),
    name,
    description,
    country: 'US',
    city,
    counties,
    ...(phone     ? { phone }     : {}),
    ...(email     ? { email }     : {}),
    ...(website   ? { website }   : {}),
    ...(facebook  ? { facebook }  : {}),
    ...(instagram ? { instagram } : {}),
    ...(linkedin  ? { linkedin }  : {}),
    ...(youtube   ? { youtube }   : {}),
    ...(founded !== undefined ? { founded } : {}),
    services,
    drones,
    crops,
    ...(certFAAPart107 !== undefined ? { certFAAPart107 } : {}),
    ...(certFAAPart137 !== undefined ? { certFAAPart137 } : {}),
    featured: false,
    verified: false,
    _src: path.basename(sourceFile),
  };
}

// ---------------------------------------------------------------------------
// Category filter
// ---------------------------------------------------------------------------

/**
 * Return true for Operator / Dealer / Multi rows.
 * Explicitly excludes Training, Manufacturer, Government, University, Extension.
 * Also handles single-letter codes used by batch-4a (O / D / T / M).
 */
function categoryIncluded(cat: string): boolean {
  const c = cat.toLowerCase().trim();

  // Single-letter batch-4a codes
  if (c === 'o' || c === 'd') return true;
  if (c === 't' || c === 'm') return false;

  // Exclusions take priority over partial matches
  if (/\b(government|govt|university|univ\.|extension|training|manufacturer|research|platform|integrator|franchisor)\b/.test(c)) return false;

  // Include if the string contains operator, dealer, or multi
  return /operator|dealer|multi/.test(c);
}

// ---------------------------------------------------------------------------
// Extract existing operator names from src/data/operators.ts
// ---------------------------------------------------------------------------

function loadExistingNames(): Set<string> {
  const file = path.join(ROOT, 'src/data/operators.ts');
  const src  = fs.readFileSync(file, 'utf-8');
  const names = new Set<string>();
  for (const m of src.matchAll(/\bname:\s*['"]([^'"]+)['"]/g)) {
    names.add(m[1].toLowerCase().trim());
  }
  return names;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('=== Operator batch import — step 3 of 3 (dry run) ===\n');

  // ── 1. Parse all batch files ──────────────────────────────────────────────
  const allMapped: MappedOperator[] = [];
  let totalRaw = 0;
  let skippedNoName = 0;

  for (const rel of BATCH_FILES) {
    const full = path.join(ROOT, rel);
    const name = path.basename(rel);

    if (!fs.existsSync(full)) { console.warn(`SKIP (not found): ${name}`); continue; }

    const rows = parseBatchFile(full);
    totalRaw += rows.length;

    for (const row of rows) {
      const op = mapToOperator(row, rel);
      if (op) allMapped.push(op);
      else skippedNoName++;
    }
  }

  console.log(`Total parsed (all files)          : ${allMapped.length} of ${totalRaw} raw rows`);

  // ── 2. Category filter ────────────────────────────────────────────────────
  // We need the raw category value, which mapToOperator currently doesn't
  // preserve.  Re-derive it: match the row's category column from a second pass.
  // Simpler: store category on MappedOperator via _cat during mapping.
  // Since we can't change the type now, re-read to get category per operator.
  // Instead, we re-parse inline and attach category to allMapped via index.

  // Build category list in lock-step with allMapped by re-running the parse.
  const categories: string[] = [];
  for (const rel of BATCH_FILES) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) continue;
    const rows = parseBatchFile(full);
    for (const row of rows) {
      const cat = clean(getCol(row, /^cat(egory)?$/i));
      // Only add if mapToOperator would have succeeded (non-empty name)
      const name = clean(getCol(row, /company.*(name|operator)/i, /^company$/i, /^name$/i));
      if (name) categories.push(cat);
    }
  }

  const afterCategory = allMapped.filter((_, i) => categoryIncluded(categories[i] ?? ''));
  console.log(`After category filter (Op/Dealer/Multi): ${afterCategory.length}`);

  // ── 3. Dedup vs existing operators.ts ─────────────────────────────────────
  const existingNames = loadExistingNames();
  console.log(`Existing operators in operators.ts : ${existingNames.size}`);

  const afterExistingDedup = afterCategory.filter(
    op => !existingNames.has(op.name.toLowerCase().trim())
  );
  console.log(`After dedup vs existing            : ${afterExistingDedup.length}`);

  // ── 4. Internal dedup across batch files (keep first occurrence) ──────────
  const seenNames = new Set<string>();
  const final: MappedOperator[] = [];
  for (const op of afterExistingDedup) {
    const key = op.name.toLowerCase().trim();
    if (!seenNames.has(key)) { seenNames.add(key); final.push(op); }
  }
  console.log(`After internal dedup (cross-batch) : ${final.length}  ← final new operators`);

  // ── 5. Sample output ──────────────────────────────────────────────────────
  console.log('\n=== Sample operators (first 3 from final list) ===\n');
  for (const op of final.slice(0, 3)) {
    const { _src, ...display } = op;
    console.log(JSON.stringify(display, null, 2));
    console.log(`  [source: ${_src}]\n`);
  }

  // ── 6. Write dry-run JSON ─────────────────────────────────────────────────
  const dryRunOutput = path.join(ROOT, 'scripts/import-dry-run.json');
  fs.writeFileSync(dryRunOutput, JSON.stringify(final, null, 2));
  console.log(`\nDry-run output (${final.length} new operators) → ${dryRunOutput}`);
  console.log('operators.ts was NOT modified.');
}

main();
