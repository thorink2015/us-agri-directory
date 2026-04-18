#!/usr/bin/env node
/**
 * scripts/import-operators.ts  — step 1 of 3
 * Parses all 7 operator batch files and reports row counts + column names.
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

type RawRow = Record<string, string>;

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
      if (line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = false;
      }
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

/**
 * Extract rows from every ``` (csv) ... ``` fenced block in the file.
 * Returns raw rows with original column names as keys.
 */
export function parseCsvBlock(content: string): RawRow[] {
  const rows: RawRow[] = [];

  // Match ```csv or ``` blocks
  const blockRe = /```(?:csv)?\r?\n([\s\S]+?)```/g;
  let match: RegExpExecArray | null;

  while ((match = blockRe.exec(content)) !== null) {
    const block = match[1];
    const lines = block.split('\n').map(l => l.replace(/\r$/, '')).filter(Boolean);
    if (lines.length < 2) continue;

    const headers = parseCSVLine(lines[0]);
    for (let i = 1; i < lines.length; i++) {
      const vals = parseCSVLine(lines[i]);
      // Skip blank / separator lines
      if (!vals.some(v => v.trim())) continue;
      const row: RawRow = {};
      headers.forEach((h, idx) => {
        row[h.trim()] = (vals[idx] ?? '').trim();
      });
      rows.push(row);
    }
  }

  return rows;
}

// ---------------------------------------------------------------------------
// Markdown pipe-table parser
// ---------------------------------------------------------------------------

function isSeparatorLine(line: string): boolean {
  // Lines like |---|---|---| or |:---|:---:|---:|
  return /^\|[\s\-:|]+\|$/.test(line.trim());
}

/**
 * Parse a single contiguous block of pipe-table lines.
 * The first non-separator line is treated as the header row.
 */
function parseTableBlock(lines: string[]): RawRow[] {
  if (lines.length < 2) return [];

  // Find header line (first non-separator line)
  let headerLine = '';
  let headerIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (!isSeparatorLine(lines[i])) {
      headerLine = lines[i];
      headerIdx = i;
      break;
    }
  }
  if (headerIdx === -1) return [];

  const headers = headerLine.split('|').slice(1, -1).map(h => h.trim());
  const rows: RawRow[] = [];

  for (let i = headerIdx + 1; i < lines.length; i++) {
    if (isSeparatorLine(lines[i])) continue;
    const vals = lines[i].split('|').slice(1, -1).map(v => v.trim());
    if (!vals.some(v => v)) continue;
    const row: RawRow = {};
    headers.forEach((h, idx) => {
      row[h] = vals[idx] ?? '';
    });
    rows.push(row);
  }

  return rows;
}

/**
 * Extract rows from ALL markdown pipe tables in the file.
 * Handles files with multiple per-state tables (batch-5-west-coast-pacific).
 * Only returns rows from directory tables (header contains a company-name column
 * or has >= 10 columns). Summary/stats tables are skipped.
 */
export function parseMarkdownTable(content: string): RawRow[] {
  const fileLines = content.split('\n').map(l => l.replace(/\r$/, ''));

  // Collect all contiguous pipe-table blocks
  const blocks: string[][] = [];
  let tableBuf: string[] = [];

  const flush = () => {
    if (tableBuf.length > 1) blocks.push([...tableBuf]);
    tableBuf = [];
  };

  for (const line of fileLines) {
    if (line.trim().startsWith('|')) {
      tableBuf.push(line);
    } else {
      flush();
    }
  }
  flush();

  if (blocks.length === 0) return [];

  const rows: RawRow[] = [];

  for (const block of blocks) {
    // Identify the header row (first non-separator line)
    const headerLine = block.find(l => !isSeparatorLine(l));
    if (!headerLine) continue;

    const cols = headerLine.split('|').slice(1, -1).map(h => h.trim());

    // Skip summary/stat tables: require either a company-name column OR >= 10 cols
    const hasCompanyCol = cols.some(c => /company|operator.?name|company.?name/i.test(c));
    if (!hasCompanyCol && cols.length < 10) continue;

    rows.push(...parseTableBlock(block));
  }

  return rows;
}

// ---------------------------------------------------------------------------
// File-level dispatcher
// ---------------------------------------------------------------------------

/**
 * Read a batch file, detect its format, and return raw rows.
 * CSV-fenced-block files take priority; markdown tables are the fallback.
 */
export function parseBatchFile(filepath: string): RawRow[] {
  const content = fs.readFileSync(filepath, 'utf-8');

  // If the file contains at least one fenced CSV/code block, use CSV parser
  if (/```(?:csv)?\r?\n/.test(content)) {
    return parseCsvBlock(content);
  }

  // Otherwise treat as markdown table file
  return parseMarkdownTable(content);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('=== Batch file parser — step 1 of 3 ===\n');

  for (const rel of BATCH_FILES) {
    const full = path.join(ROOT, rel);
    const name = path.basename(rel);

    if (!fs.existsSync(full)) {
      console.log(`[${name}]  FILE NOT FOUND\n`);
      continue;
    }

    const rows = parseBatchFile(full);
    const cols = rows.length > 0 ? Object.keys(rows[0]) : [];

    console.log(`[${name}]`);
    console.log(`  rows      : ${rows.length}`);
    console.log(`  columns   : ${cols.length}`);
    console.log(`  col names : ${cols.join(' | ')}`);
    if (rows.length > 0) {
      const first = rows[0];
      const nameKey = cols.find(c => /company|operator name/i.test(c)) ?? cols[0];
      console.log(`  first row : ${first[nameKey] ?? '(see below)'}`);
    }
    console.log();
  }
}

main();
