#!/usr/bin/env node
/**
 * scripts/import-final-merged-csv.ts
 * One-shot import of _research/ag-drone-operators-FINAL-merged CSV.
 *
 * 1. Parses the CSV (RFC 4180).
 * 2. Dedupes rows against src/data/operators.ts by normalized name,
 *    website domain, phone digits and email.
 * 3. Maps net-new rows to Operator entries and appends them to
 *    src/data/operators.ts (before the closing `];`).
 * 4. Rewrites the CSV in place with two appended columns:
 *    directory_url + directory_status (new | existing).
 *
 * Run: npx tsx scripts/import-final-merged-csv.ts [--dry-run]
 */

import * as fs from 'fs';
import * as path from 'path';
import { operators } from '../src/data/operators';

const ROOT = path.resolve(__dirname, '..');
const CSV_PATH = path.join(
  ROOT,
  '_research/ag-drone-operators-FINAL-merged - ag-drone-operators-FINAL-merged.csv'
);
const OPERATORS_PATH = path.join(ROOT, 'src/data/operators.ts');
const DOMAIN = 'https://agdronedirectory.com';
const TODAY = '2026-06-10';
const DRY_RUN = process.argv.includes('--dry-run');

// ─── State maps ────────────────────────────────────────────────────────────

const STATE_SLUGS: Record<string, string> = {
  AL: 'alabama', AK: 'alaska', AZ: 'arizona', AR: 'arkansas',
  CA: 'california', CO: 'colorado', CT: 'connecticut', DE: 'delaware',
  FL: 'florida', GA: 'georgia', HI: 'hawaii', ID: 'idaho',
  IL: 'illinois', IN: 'indiana', IA: 'iowa', KS: 'kansas',
  KY: 'kentucky', LA: 'louisiana', ME: 'maine', MD: 'maryland',
  MA: 'massachusetts', MI: 'michigan', MN: 'minnesota', MS: 'mississippi',
  MO: 'missouri', MT: 'montana', NE: 'nebraska', NV: 'nevada',
  NH: 'new-hampshire', NJ: 'new-jersey', NM: 'new-mexico', NY: 'new-york',
  NC: 'north-carolina', ND: 'north-dakota', OH: 'ohio', OK: 'oklahoma',
  OR: 'oregon', PA: 'pennsylvania', RI: 'rhode-island', SC: 'south-carolina',
  SD: 'south-dakota', TN: 'tennessee', TX: 'texas', UT: 'utah',
  VT: 'vermont', VA: 'virginia', WA: 'washington', WV: 'west-virginia',
  WI: 'wisconsin', WY: 'wyoming',
};

const STATE_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_SLUGS).map(([abbr, slug]) => [
    abbr,
    slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
  ])
);

// ─── CSV parse / serialize (RFC 4180) ──────────────────────────────────────

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { cur += '"'; i++; }
        else inQ = false;
      } else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') { row.push(cur); cur = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cur); cur = '';
      if (row.some((f) => f.trim())) rows.push(row);
      row = [];
    } else cur += c;
  }
  if (cur || row.length) {
    row.push(cur);
    if (row.some((f) => f.trim())) rows.push(row);
  }
  return rows;
}

function csvField(v: string): string {
  return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
}

// ─── Normalizers for dedupe keys ───────────────────────────────────────────

const normName = (s: string) =>
  s.toLowerCase()
    .replace(/\b(llc|inc|co|corp|company|llp|ltd)\b\.?/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
const normSite = (s: string) =>
  (s || '').toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split(/[/?#]/)[0].trim();
const normPhone = (s: string) => (s || '').replace(/\D/g, '').slice(-10);
const normEmail = (s: string) => (s || '').toLowerCase().trim();

// ─── Field helpers ─────────────────────────────────────────────────────────

function clean(v: string): string {
  const s = (v || '').trim();
  return /^(n\/a|--|na|none|\?|tbd)$/i.test(s) ? '' : s;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
}

function withUtm(raw: string): string {
  const url = raw.startsWith('http') ? raw : 'https://' + raw;
  const sep = url.includes('?') ? '&' : '?';
  return url + sep + 'utm_source=agdronedirectory&utm_medium=referral&utm_campaign=operator_profile';
}

/** Sanitize free text for site copy: no em/en dashes, no double hyphens. */
function sanitize(s: string): string {
  return s
    .replace(/[—–]/g, ', ')
    .replace(/--/g, '-')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Single-quoted TS string literal. */
function q(s: string): string {
  return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
}

/** Extract every US state slug referenced in free text via 2-letter abbrevs. */
function statesFromText(text: string): string[] {
  const found = new Set<string>();
  for (const m of (text || '').matchAll(/\b([A-Z]{2})\b/g)) {
    const slug = STATE_SLUGS[m[1]];
    if (slug) found.add(slug);
  }
  return [...found];
}

/** "WA/OR/ID" or "WA, OR & ID" fragment → "Serves Washington, Oregon and Idaho". */
function expandStateListFragment(frag: string): string | null {
  const tokens = frag.split(/[/,&+\s]+/).filter(Boolean);
  if (tokens.length === 0) return null;
  if (!tokens.every((t) => /^[A-Z]{2}$/.test(t) && STATE_SLUGS[t])) return null;
  const names = tokens.map((t) => STATE_NAMES[t]);
  const joined =
    names.length === 1 ? names[0] : names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
  return `Serves ${joined}`;
}

/** services_notes → readable sentences for the profile About block. */
function notesToDescription(notes: string): string {
  const frags = sanitize(notes)
    .split(';')
    .map((f) => f.trim())
    .filter(Boolean)
    .map((f) => expandStateListFragment(f) ?? f)
    .map((f) => f.charAt(0).toUpperCase() + f.slice(1))
    .map((f) => f.replace(/[.\s]+$/, ''));
  return frags.length ? frags.join('. ') + '.' : '';
}

type ServiceType =
  | 'spraying' | 'spreading' | 'monitoring' | 'mapping' | 'training'
  | 'rental' | 'sales' | 'seeding' | 'consultancy' | 'emergency';

function mapServices(t0: string): ServiceType[] {
  const t = t0.toLowerCase();
  const s = new Set<ServiceType>();
  if (/spray|fungicid|herbicid|insecticid|pesticid|defoliant|aerial applic|chemical applic|liquid applic|custom applic/.test(t)) s.add('spraying');
  if (/\bseed(ing)?\b|cover.?crop|broadcast seed/.test(t)) s.add('seeding');
  if (/\bmap(ping)?\b|survey|orthomosaic|\bgis\b|lidar|photogrammetry/.test(t)) s.add('mapping');
  if (/scout|monitor|\bndvi\b|crop health|multispectral|thermal imag|imagery|field analysis/.test(t)) s.add('monitoring');
  if (/spread|granular|fertiliz|urea|\blime\b|dry applic/.test(t)) s.add('spreading');
  if (/\btrain(ing)?\b|education|certification course|\bcourses?\b/.test(t)) s.add('training');
  if (/rental|leasing|\blease\b/.test(t)) s.add('rental');
  if (/\bsales?\b|dealer|reseller/.test(t)) s.add('sales');
  if (/consult|advisory|agrono/.test(t)) s.add('consultancy');
  if (/emergency/.test(t)) s.add('emergency');
  return [...s];
}

function mapCrops(t0: string): string[] {
  const t = t0.toLowerCase();
  const out: string[] = [];
  const add = (slug: string) => { if (!out.includes(slug)) out.push(slug); };
  if (/\bcorn\b/.test(t)) add('corn');
  if (/soybean/.test(t)) add('soybeans');
  if (/\bwheat\b/.test(t)) add('wheat');
  if (/\bcotton\b/.test(t)) add('cotton');
  if (/\brice\b/.test(t)) add('rice');
  if (/vineyard|grape/.test(t)) add('grapes');
  if (/orchard/.test(t)) add('orchards');
  if (/cover.?crop/.test(t)) add('cover-crops');
  if (/pasture|rangeland|range land/.test(t)) add('pasture');
  if (/alfalfa/.test(t)) add('alfalfa');
  if (/potato/.test(t)) add('potatoes');
  if (/row.?crop/.test(t)) add('row-crops');
  return out;
}

/** Map drone mentions to catalog slugs only when the match is unambiguous. */
function mapDrones(t0: string): string[] {
  const t = t0.toLowerCase();
  const out: string[] = [];
  const add = (slug: string) => { if (!out.includes(slug)) out.push(slug); };
  if (/\bt100\b/.test(t)) add('dji-agras-t100');
  if (/\bt50\b/.test(t)) add('dji-agras-t50');
  if (/\bt25p\b/.test(t)) add('dji-agras-t25p');
  if (/\bt25\b(?!p)/.test(t)) add('dji-agras-t25');
  if (/\bt40\b/.test(t)) add('dji-agras-t40');
  if (/\bt10\b/.test(t)) add('dji-agras-t10');
  if (/hylio|ag-?272/.test(t)) add('hylio-ag-272');
  if (/ag-?230/.test(t)) add('hylio-ag-230');
  if (/xag.{0,8}p100.{0,3}pro/.test(t)) add('xag-p100-pro');
  else if (/xag.{0,8}p100/.test(t)) add('xag-p100');
  if (/talos|t60x/.test(t)) add('talos-t60x');
  if (/pyka|pelican/.test(t)) add('pyka-pelican-2');
  if (/joyance.{0,8}j100/.test(t)) add('joyance-j100');
  if (/joyance.{0,8}j150/.test(t)) add('joyance-j150');
  if (/eavision/.test(t)) add('eavision-j100');
  if (/ceres/.test(t)) add('ceres-air-c31');
  if (/leading.?edge|pv40x/.test(t)) add('leadingedge-pv40x');
  return out;
}

// ─── Main ──────────────────────────────────────────────────────────────────

function main() {
  const text = fs.readFileSync(CSV_PATH, 'utf-8');
  const rows = parseCSV(text);
  const headers = rows[0].map((h) => h.trim());
  const data = rows.slice(1).map((r) =>
    Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? '').trim()]))
  ) as Record<string, string>[];

  // Existing-operator lookup maps
  const exByName = new Map(operators.map((o) => [normName(o.name), o.slug]));
  const exBySite = new Map(
    operators.filter((o) => o.website).map((o) => [normSite(o.website!), o.slug])
  );
  const exByPhone = new Map(
    operators
      .filter((o) => o.phone && normPhone(o.phone).length === 10)
      .map((o) => [normPhone(o.phone!), o.slug])
  );
  const exByEmail = new Map(
    operators.filter((o) => o.email).map((o) => [normEmail(o.email!), o.slug])
  );
  const usedSlugs = new Set(operators.map((o) => o.slug));

  const entries: string[] = [];
  const annotated: { row: Record<string, string>; url: string; status: string }[] = [];
  let newCount = 0;
  let existingCount = 0;
  let predictedNoindex = 0;
  const newStateDist = new Map<string, number>();

  for (const row of data) {
    const name = clean(row.company_name);
    if (!name) continue;

    const website = clean(row.website);
    const phone = clean(row.phone);
    const email = clean(row.email);

    // ── Dedupe vs existing directory ────────────────────────────────────
    const matchSlug =
      exByName.get(normName(name)) ||
      (website ? exBySite.get(normSite(website)) : undefined) ||
      (phone && normPhone(phone).length === 10 ? exByPhone.get(normPhone(phone)) : undefined) ||
      (email ? exByEmail.get(normEmail(email)) : undefined);

    if (matchSlug) {
      existingCount++;
      annotated.push({ row, url: `${DOMAIN}/operators/${matchSlug}`, status: 'existing' });
      continue;
    }

    // ── Map to a new Operator entry ─────────────────────────────────────
    const notes = clean(row.services_notes);
    const city = clean(row.city);
    const stateAbbr = clean(row.state).toUpperCase();
    const homeSlug = STATE_SLUGS[stateAbbr];

    const counties: string[] = [];
    if (homeSlug) counties.push(homeSlug);
    for (const s of statesFromText(notes)) if (!counties.includes(s)) counties.push(s);

    let slug = slugify(name);
    if (usedSlugs.has(slug)) {
      const suffix = city ? slugify(city) : homeSlug || '2';
      slug = slugify(`${name}-${suffix}`);
      let n = 2;
      while (usedSlugs.has(slug)) slug = slugify(`${name}-${suffix}-${n++}`);
    }
    usedSlugs.add(slug);
    exByName.set(normName(name), slug); // guard against CSV-internal repeats

    const description = notesToDescription(notes);
    const services = mapServices(notes);
    const crops = mapCrops(notes);
    const drones = mapDrones(notes);
    const ownerName = clean(row.contact_name);
    const social = clean(row.facebook_or_social);
    const socialUrl = social ? (social.startsWith('http') ? social : 'https://' + social) : '';
    let socialField = '';
    if (/instagram\.com/i.test(socialUrl)) socialField = 'instagram';
    else if (/linkedin\.com/i.test(socialUrl)) socialField = 'linkedin';
    else if (/tiktok\.com/i.test(socialUrl)) socialField = 'tiktok';
    else if (/youtube\.com|youtu\.be/i.test(socialUrl)) socialField = 'youtube';
    else if (/facebook\.com|fb\.com/i.test(socialUrl)) socialField = 'facebook';

    const certFAAPart107 = /part\s*-?\s*107/i.test(notes);
    const certFAAPart137 = /part\s*-?\s*137/i.test(notes);
    const veteranOwned = /veteran[- ]owned/i.test(notes);
    const womenLed = /(women|woman)[- ](owned|led)/i.test(notes);
    const foundedM = notes.match(/(?:founded|established|est\.?|since|opened)\s*(?:in\s*)?((?:19|20)\d{2})\b/i);
    const founded = foundedM ? parseInt(foundedM[1], 10) : undefined;
    const acresM = notes.match(/(?<![$/\d])(\d[\d,]{2,})\s*\+?\s*acres\b(?!\s*\/)/i);
    const haTreated = acresM ? parseInt(acresM[1].replace(/,/g, ''), 10) : undefined;

    // Mirror of shouldNoindexUltraThinOperator for reporting
    const descWords = description ? description.trim().split(/\s+/).length : 0;
    const ultraThin =
      descWords < 30 && !city && !phone && !email && !website && !haTreated;
    if (ultraThin) predictedNoindex++;

    for (const c of counties.slice(0, 1)) newStateDist.set(c, (newStateDist.get(c) ?? 0) + 1);

    const lines: string[] = [];
    lines.push('  {');
    lines.push(`    slug: ${q(slug)},`);
    lines.push(`    name: ${q(sanitize(name))},`);
    lines.push(`    description:`);
    lines.push(`      ${q(description)},`);
    lines.push(`    country: 'US',`);
    lines.push(`    counties: [${counties.map(q).join(', ')}],`);
    lines.push(`    city: ${q(sanitize(city))},`);
    if (phone) lines.push(`    phone: ${q(phone)},`);
    if (email) lines.push(`    email: ${q(email)},`);
    if (website) lines.push(`    website: ${q(withUtm(website))},`);
    if (socialField) lines.push(`    ${socialField}: ${q(socialUrl)},`);
    if (founded) lines.push(`    founded: ${founded},`);
    if (ownerName && normName(ownerName) !== normName(name))
      lines.push(`    ownerName: ${q(sanitize(ownerName))},`);
    lines.push(`    services: [${services.map(q).join(', ')}],`);
    lines.push(`    drones: [${drones.map(q).join(', ')}],`);
    lines.push(`    crops: [${crops.map(q).join(', ')}],`);
    if (haTreated && haTreated >= 500) lines.push(`    haTreated: ${haTreated},`);
    if (certFAAPart107) lines.push(`    certFAAPart107: true,`);
    if (certFAAPart137) lines.push(`    certFAAPart137: true,`);
    if (veteranOwned) lines.push(`    veteranOwned: true,`);
    if (womenLed) lines.push(`    womenLed: true,`);
    lines.push(`    featured: false,`);
    lines.push(`    verified: false,`);
    lines.push(`    pendingConfirmation: true,`);
    lines.push(`    lastUpdated: ${q(TODAY)},`);
    lines.push('  },');
    entries.push(lines.join('\n'));

    newCount++;
    annotated.push({ row, url: `${DOMAIN}/operators/${slug}`, status: 'new' });
  }

  // ── Report ────────────────────────────────────────────────────────────
  console.log(`CSV rows           : ${data.length}`);
  console.log(`Matched existing   : ${existingCount}`);
  console.log(`Net-new operators  : ${newCount}`);
  console.log(`Predicted noindex (ultra-thin gate): ${predictedNoindex}`);
  console.log(`New total in directory: ${operators.length + newCount}`);
  const topStates = [...newStateDist.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  console.log('Top home states of new entries:', topStates.map(([s, n]) => `${s}:${n}`).join(' '));

  if (DRY_RUN) {
    console.log('\n=== Sample entries (first 3) ===\n');
    console.log(entries.slice(0, 3).join('\n'));
    console.log('\nDry run: no files modified.');
    return;
  }

  // ── Append to operators.ts ────────────────────────────────────────────
  const src = fs.readFileSync(OPERATORS_PATH, 'utf-8');
  const anchor = '\n];\n\nexport function getOperatorBySlug';
  if (!src.includes(anchor)) throw new Error('operators.ts anchor not found');
  const header =
    `\n  // ── IMPORTED BATCH 4: ag-drone-operators-FINAL-merged.csv (${TODAY}, ${newCount} entries) ──\n`;
  const updated = src.replace(anchor, header + entries.join('\n') + anchor);
  fs.writeFileSync(OPERATORS_PATH, updated);
  console.log(`\nAppended ${newCount} entries to src/data/operators.ts`);

  // ── Rewrite CSV with directory_url + directory_status ─────────────────
  const outHeaders = [...headers, 'directory_url', 'directory_status'];
  const outLines = [outHeaders.map(csvField).join(',')];
  for (const { row, url, status } of annotated) {
    const vals = headers.map((h) => row[h] ?? '');
    outLines.push([...vals, url, status].map(csvField).join(','));
  }
  fs.writeFileSync(CSV_PATH, outLines.join('\n') + '\n');
  console.log(`Rewrote CSV with directory links: ${annotated.length} rows annotated`);
}

main();
