import type { CliOptions, SourceMode } from './types.ts';
import { CONFIG } from './config.ts';

const VALID_SOURCES: SourceMode[] = ['directory', 'csv', 'json'];

function parseFlag(args: string[], name: string): string | undefined {
  const exact = `--${name}`;
  const prefix = `--${name}=`;
  for (let i = 0; i < args.length; i++) {
    const a = args[i]!;
    if (a === exact) return args[i + 1];
    if (a.startsWith(prefix)) return a.slice(prefix.length);
  }
  return undefined;
}

function hasFlag(args: string[], name: string): boolean {
  return args.includes(`--${name}`);
}

export function parseCli(argv: string[]): CliOptions {
  const args = argv.slice(2);
  const sourceRaw = parseFlag(args, 'source') ?? 'directory';
  if (!VALID_SOURCES.includes(sourceRaw as SourceMode)) {
    throw new Error(
      `Invalid --source=${sourceRaw}. Must be one of: ${VALID_SOURCES.join(', ')}`,
    );
  }
  const limitRaw = parseFlag(args, 'limit');
  const limit = limitRaw ? Number.parseInt(limitRaw, 10) : undefined;
  if (limitRaw && (Number.isNaN(limit) || limit! <= 0)) {
    throw new Error(`--limit must be a positive integer, got: ${limitRaw}`);
  }
  const concurrencyRaw = parseFlag(args, 'concurrency');
  const concurrency = concurrencyRaw
    ? Number.parseInt(concurrencyRaw, 10)
    : CONFIG.defaultConcurrency;
  const delayRaw = parseFlag(args, 'per-domain-delay');
  const perDomainDelayMs = delayRaw
    ? Number.parseInt(delayRaw, 10)
    : CONFIG.defaultPerDomainDelayMs;

  return {
    source: sourceRaw as SourceMode,
    file: parseFlag(args, 'file'),
    limit,
    force: hasFlag(args, 'force'),
    output: parseFlag(args, 'output'),
    concurrency,
    perDomainDelayMs,
  };
}

export const HELP_TEXT = `
Contact Scraper

Usage:
  npm run scrape -- --source=directory [--limit=N] [--force]
  npm run scrape -- --source=csv --file=path/to/list.csv [--limit=N]
  npm run scrape -- --source=json --file=path/to/list.json [--limit=N]

Flags:
  --source=directory|csv|json   Where to load operator list from (default: directory)
  --file=PATH                   Required for csv / json sources
  --limit=N                     Stop after first N entries (use to test)
  --force                       Re-scrape entries already in progress.json
  --output=PATH                 Override default output CSV location
  --concurrency=N               Cross-domain parallelism (default: 5)
  --per-domain-delay=MS         Delay between hits to same domain (default: 2500)
  --help                        Show this help

Examples:
  npm run scrape:test                     # 10 operators from src/data/operators.ts
  npm run scrape -- --source=directory    # all 391 operators
  npm run scrape -- --source=csv --file=research/new-list.csv
`.trim();
