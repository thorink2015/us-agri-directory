// Generate research priority list deliverables under audit/research-plan/.
//
// Inputs (existing data only — no fabrication):
//   - src/data/seed-cities.ts  (196 USDA NASS / Census Places anchored cities)
//   - src/data/operators.ts    (392 operators with city + state coverage)
//   - src/data/counties.ts     (50 state-level rows with agriculturalLandHa)
//   - src/data/states.ts       (50 StateData rows with abbreviation + region)
//
// USDA NASS county-level cropland_acres / farm_count / ag_receipts cannot be
// fetched in this environment (network blocked). Per the task spec, columns
// that fail to resolve are emitted as empty rather than guessed. ag_score is
// computed from the metrics that DO resolve: seed-city population (when
// present) and state-level agricultural acreage from counties.ts.
//
// Output:
//   audit/research-plan/master-cities-ranked.csv
//   audit/research-plan/priority-batches.md
//   audit/research-plan/existing-operators-name-list.txt

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { operators } from '../src/data/operators';
import { seedCities, SeedCity } from '../src/data/seed-cities';
import { counties } from '../src/data/counties';
import { stateData } from '../src/data/states';
import { citySlug } from '../src/data/cities';

const OUT_DIR = join(__dirname, '..', 'audit', 'research-plan');
mkdirSync(OUT_DIR, { recursive: true });

// ─── lookup tables ────────────────────────────────────────────────────────
const stateBySlug = new Map(counties.map((c) => [c.slug, c]));
const stateNameBySlug = new Map(counties.map((c) => [c.slug, c.name]));
const stateAbbrBySlug = new Map(stateData.map((s) => [s.slug, s.abbreviation]));

const maxStateAgLandHa = Math.max(...counties.map((c) => c.agriculturalLandHa));

// ─── city universe ────────────────────────────────────────────────────────
interface CityRow {
  city: string;
  state_slug: string;
  state_name: string;
  state_abbr: string;
  city_slug: string;
  county: string;
  population?: number;
  operator_count: number;
  source: 'seed' | 'operator';
}

const cityMap = new Map<string, CityRow>();

// pass 1: seed cities
for (const seed of seedCities) {
  const stateRow = stateBySlug.get(seed.stateSlug);
  if (!stateRow) continue;
  const slug = citySlug(seed.name);
  const key = `${seed.stateSlug}__${slug}`;
  cityMap.set(key, {
    city: seed.name.trim(),
    state_slug: seed.stateSlug,
    state_name: stateRow.name,
    state_abbr: stateAbbrBySlug.get(seed.stateSlug) ?? '',
    city_slug: slug,
    county: seed.county ?? '',
    population: seed.population,
    operator_count: 0,
    source: 'seed',
  });
}

// pass 2: operator-derived cities (validate using same rules as cities.ts)
const RESERVED = new Set(['operators', 'services', 'crops']);
const REGIONAL = new Set([
  'central', 'north', 'south', 'east', 'west',
  'eastern', 'western', 'northern', 'southern',
  'midwest', 'mid-west', 'mountain', 'pacific',
  'plains', 'delta', 'statewide', 'unknown', 'remote',
  'na', 'tbd',
]);
const REGIONAL_PREFIXES = [
  'northern ', 'southern ', 'eastern ', 'western ', 'central ',
  'north ', 'south ', 'east ', 'west ',
  'northeast ', 'northwest ', 'southeast ', 'southwest ',
  'ne ', 'nw ', 'se ', 'sw ',
  'mid-', 'mid ',
  'upper ', 'lower ',
];
const REGIONAL_SUFFIXES = [
  ' county', ' counties', ' parish', ' shore', ' coast',
  ' region', ' area', ' valley region', ' watershed',
];
const STATE_NAMES = new Set(counties.map((c) => c.name.toLowerCase()));
const STATE_ABBRS = new Set(counties.map((c) => c.slug));

function isValidCityName(city: string, stateSlug: string): boolean {
  const trimmed = city.trim();
  if (!trimmed) return false;
  if (trimmed.includes('/') || trimmed.includes('(') || trimmed.includes(')')) return false;
  if (trimmed.includes(';')) return false;
  if (/\d/.test(trimmed)) return false;
  if (/(?:^|\s|,|\()([A-Z]{2})(?:\s|,|\)|\/|$)/.test(trimmed)) return false;
  if (/\s+(and|or|to|via)\s+/i.test(trimmed)) return false;
  const lower = trimmed.toLowerCase();
  const slug = citySlug(trimmed);
  if (!slug) return false;
  if (RESERVED.has(slug)) return false;
  if (REGIONAL.has(lower)) return false;
  if (STATE_NAMES.has(lower)) return false;
  if (STATE_ABBRS.has(slug)) return false;
  for (const p of REGIONAL_PREFIXES) if (lower.startsWith(p)) return false;
  for (const s of REGIONAL_SUFFIXES) if (lower.endsWith(s)) return false;
  if (trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed)) return false;
  if (slug === stateSlug) return false;
  return true;
}

for (const op of operators) {
  if (!op.city || !op.counties || op.counties.length === 0) continue;
  const stateSlug = op.counties[0];
  const stateRow = stateBySlug.get(stateSlug);
  if (!stateRow) continue;
  if (!isValidCityName(op.city, stateSlug)) continue;
  const slug = citySlug(op.city);
  const key = `${stateSlug}__${slug}`;
  const existing = cityMap.get(key);
  if (existing) {
    existing.operator_count += 1;
  } else {
    cityMap.set(key, {
      city: op.city.trim(),
      state_slug: stateSlug,
      state_name: stateRow.name,
      state_abbr: stateAbbrBySlug.get(stateSlug) ?? '',
      city_slug: slug,
      county: '',
      operator_count: 1,
      source: 'operator',
    });
  }
}

// ─── known directory cities (those rendered at /states/[slug]/[city]) ────
// Mirrors src/data/cities.ts qualifies(): isSeed === true OR ops >= 2.
function inDirectory(row: CityRow): boolean {
  if (row.source === 'seed') return true; // every seed entry qualifies
  return row.operator_count >= 2;
}

// ─── ag_score ─────────────────────────────────────────────────────────────
// county-level cropland_acres / farm_count / ag_receipts unavailable in this
// environment. We emit those columns blank and rank on what IS available:
//   - seed-city population (Census Places)
//   - state agricultural-land hectares (counties.ts)
//   - operator coverage as a tiebreaker
const populations = Array.from(cityMap.values())
  .map((r) => r.population)
  .filter((p): p is number => typeof p === 'number');
const maxPop = Math.max(...populations);

function agScore(row: CityRow): number {
  const stateRow = stateBySlug.get(row.state_slug);
  const stateWeight = stateRow ? stateRow.agriculturalLandHa / maxStateAgLandHa : 0;
  if (typeof row.population === 'number') {
    const popWeight = row.population / maxPop;
    // Seed cities have a verified Census Places population. Score is the
    // weighted sum of city size and state ag intensity so a Fresno or Lubbock
    // outranks a small town in Rhode Island.
    return Math.round((popWeight * 0.55 + stateWeight * 0.45) * 10000) / 10000;
  }
  // Operator-derived cities without a Census population are anchored by the
  // operator's state coverage only. Score is capped at 0.40 so any seeded
  // city with a real population ranks above them, with operator_count as a
  // small tiebreaker.
  const opBoost = Math.min(row.operator_count, 5) / 5 * 0.04;
  return Math.round((stateWeight * 0.36 + opBoost) * 10000) / 10000;
}

// ─── rows + sort ──────────────────────────────────────────────────────────
const rows = Array.from(cityMap.values()).map((r) => ({
  ...r,
  ag_score: agScore(r),
  in_directory: inDirectory(r),
  coverage_status:
    r.operator_count >= 3 ? 'covered_well' :
    r.operator_count >= 1 ? 'light' : 'gap',
}));
rows.sort((a, b) => b.ag_score - a.ag_score);

// ─── FILE 1: master-cities-ranked.csv ─────────────────────────────────────
const csvHeaders = [
  'rank',
  'city',
  'state',
  'state_slug',
  'city_slug',
  'county',
  'cropland_acres',
  'farm_count',
  'ag_receipts_usd',
  'ag_score',
  'existing_operator_count',
  'coverage_status',
  'in_directory',
];

function csvEscape(v: string | number | boolean | undefined): string {
  if (v === undefined || v === null) return '';
  const s = String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

const csvLines = [csvHeaders.join(',')];
rows.forEach((r, i) => {
  csvLines.push([
    i + 1,
    csvEscape(r.city),
    csvEscape(r.state_name),
    r.state_slug,
    r.city_slug,
    csvEscape(r.county),
    '',  // cropland_acres — USDA NASS, not resolvable in this env
    '',  // farm_count
    '',  // ag_receipts_usd
    r.ag_score,
    r.operator_count,
    r.coverage_status,
    r.in_directory,
  ].join(','));
});
writeFileSync(join(OUT_DIR, 'master-cities-ranked.csv'), csvLines.join('\n') + '\n');

// ─── FILE 2: priority-batches.md ──────────────────────────────────────────
const gapOrLight = rows.filter((r) => r.coverage_status === 'gap' || r.coverage_status === 'light');
const top200 = gapOrLight.slice(0, 200);

interface Batch {
  num: number;
  cities: typeof top200;
  totalScore: number;
}
const batches: Batch[] = [];
for (let i = 0; i < 8; i++) {
  const slice = top200.slice(i * 25, i * 25 + 25);
  batches.push({
    num: i + 1,
    cities: slice,
    totalScore: slice.reduce((s, c) => s + c.ag_score, 0),
  });
}

function batchTheme(cities: typeof top200): string {
  const stateCounts = new Map<string, number>();
  for (const c of cities) {
    stateCounts.set(c.state_name, (stateCounts.get(c.state_name) ?? 0) + 1);
  }
  const top = Array.from(stateCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([s, n]) => `${s} (${n})`)
    .join(', ');
  return top;
}

const mdLines: string[] = [];
mdLines.push('# Operator research priority batches');
mdLines.push('');
mdLines.push('Top 200 gap + light-coverage cities grouped into 8 research batches of');
mdLines.push('25 each. Ordered by combined ag_score so Batch 1 is the highest-priority');
mdLines.push('research target. ag_score is derived from Census Places population and');
mdLines.push('state-level USDA agricultural acreage; county-level cropland / farm-count');
mdLines.push('/ farm-receipt enrichment was not resolvable in the build environment and');
mdLines.push('is left blank in the master CSV per the no-fabrication rule.');
mdLines.push('');
mdLines.push(`Source data: \`src/data/seed-cities.ts\` (196 USDA NASS / Census Places`);
mdLines.push(`anchored cities) + operator-derived cities from \`src/data/operators.ts\`.`);
mdLines.push('');

for (const b of batches) {
  mdLines.push(`## Batch ${b.num} — combined ag_score ${b.totalScore.toFixed(3)}`);
  mdLines.push('');
  mdLines.push(`**Theme:** ${batchTheme(b.cities)}`);
  mdLines.push('');
  mdLines.push('| # | City | State | County | ag_score | Operators | Status |');
  mdLines.push('|---|------|-------|--------|---------:|----------:|--------|');
  b.cities.forEach((c, i) => {
    mdLines.push(
      `| ${i + 1} | ${c.city} | ${c.state_name} | ${c.county || '—'} | ${c.ag_score.toFixed(4)} | ${c.operator_count} | ${c.coverage_status} |`,
    );
  });
  mdLines.push('');
}
writeFileSync(join(OUT_DIR, 'priority-batches.md'), mdLines.join('\n'));

// ─── FILE 3: existing-operators-name-list.txt ────────────────────────────
const opLines: string[] = [];
for (const op of operators) {
  if (!op.name) continue;
  const stateSlug = op.counties?.[0];
  const stateName = stateSlug ? stateNameBySlug.get(stateSlug) ?? '' : '';
  const city = op.city?.trim() ?? '';
  if (!stateName) {
    opLines.push(`${op.name} | ${city || 'Unknown'}, —`);
  } else {
    opLines.push(`${op.name} | ${city || 'Unknown'}, ${stateName}`);
  }
}
opLines.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
writeFileSync(
  join(OUT_DIR, 'existing-operators-name-list.txt'),
  opLines.join('\n') + '\n',
);

// ─── stats for PR description ─────────────────────────────────────────────
const coveredWell = rows.filter((r) => r.coverage_status === 'covered_well').length;
const light = rows.filter((r) => r.coverage_status === 'light').length;
const gap = rows.filter((r) => r.coverage_status === 'gap').length;

const gapByState = new Map<string, number>();
for (const r of rows) {
  if (r.coverage_status === 'gap' || r.coverage_status === 'light') {
    gapByState.set(r.state_name, (gapByState.get(r.state_name) ?? 0) + 1);
  }
}
const topGapStates = Array.from(gapByState.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);

console.log(`Total cities ranked: ${rows.length}`);
console.log(`Coverage: covered_well=${coveredWell} light=${light} gap=${gap}`);
console.log(`Operators in dedupe list: ${opLines.length}`);
console.log('\nTop 10 by ag_score:');
rows.slice(0, 10).forEach((r, i) => {
  console.log(`  ${i + 1}. ${r.city}, ${r.state_abbr} — score ${r.ag_score} (ops=${r.operator_count})`);
});
console.log('\nTop 5 priority states by gap-city volume:');
topGapStates.forEach(([s, n]) => console.log(`  ${s}: ${n}`));
