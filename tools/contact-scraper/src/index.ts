import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pLimit from 'p-limit';
import { CONFIG } from './config.ts';
import { parseCli, HELP_TEXT } from './cli.ts';
import { createSource } from './sources/index.ts';
import { scrapeOne } from './scrape/engine.ts';
import { CsvWriter, defaultOutputPath } from './output/csv.ts';
import { ProgressStore } from './output/progress.ts';
import { Logger, defaultLogPath } from './output/logger.ts';
import type { InputRow, ScrapeResult, ScrapeStatus } from './types.ts';

const TOOL_ROOT = path.resolve(fileURLToPath(import.meta.url), '..', '..');

function unionPassthroughKeys(rows: InputRow[]): string[] {
  const set = new Set<string>();
  for (const r of rows) {
    if (!r.passthrough) continue;
    for (const k of Object.keys(r.passthrough)) set.add(k);
  }
  return [...set].sort();
}

function summarize(results: ScrapeResult[]): Record<ScrapeStatus, number> {
  const counts: Record<ScrapeStatus, number> = {
    success: 0,
    partial: 0,
    no_contact_found: 0,
    no_website: 0,
    site_dead: 0,
    blocked: 0,
    cf_blocked: 0,
    error: 0,
  };
  for (const r of results) counts[r.status]++;
  return counts;
}

async function main(): Promise<void> {
  if (process.argv.includes('--help')) {
    console.log(HELP_TEXT);
    return;
  }

  const opts = parseCli(process.argv);
  const source = createSource(opts);
  const all = await source.load();
  const allRows = opts.limit ? all.slice(0, opts.limit) : all;

  const progressPath = path.join(TOOL_ROOT, 'progress.json');
  const progress = await ProgressStore.load(progressPath, opts.force);
  const skipped = opts.force ? 0 : allRows.filter((r) => progress.has(r.id)).length;
  const todo = opts.force ? allRows : allRows.filter((r) => !progress.has(r.id));

  const passthroughKeys = unionPassthroughKeys(allRows);
  const outputPath = opts.output ?? defaultOutputPath(TOOL_ROOT);
  const logPath = defaultLogPath(TOOL_ROOT);

  const logger = new Logger(logPath);
  await logger.open();
  const csv = new CsvWriter(outputPath, passthroughKeys);
  await csv.open();
  await csv.writeHeader();

  logger.info(
    `start source=${opts.source}${opts.file ? ` file=${opts.file}` : ''} ` +
      `total=${allRows.length} todo=${todo.length} skipped=${skipped} ` +
      `concurrency=${opts.concurrency} delayMs=${opts.perDomainDelayMs}`,
  );
  logger.info(`output=${path.relative(TOOL_ROOT, outputPath)}`);
  logger.info(`log=${path.relative(TOOL_ROOT, logPath)}`);

  const results: ScrapeResult[] = [];
  const limit = pLimit(opts.concurrency);
  let completedSinceFlush = 0;

  // Build a quick lookup for passthrough by id so writeResult can pull
  // it without re-scanning.
  const byId = new Map<string, InputRow>();
  for (const r of allRows) byId.set(r.id, r);

  const tasks = todo.map((row, idx) =>
    limit(async () => {
      const result = await scrapeOne(row, {
        perDomainDelayMs: opts.perDomainDelayMs,
      });
      results.push(result);
      await csv.writeResult(result, byId.get(result.id)?.passthrough);
      progress.mark(result.id, result.status, result.scrapedAt);
      completedSinceFlush++;
      const tag = `[${idx + 1}/${todo.length}]`;
      const detail = [
        result.status,
        result.emailPrimary || '-',
        result.phonePrimary || '-',
      ].join(' ');
      logger.info(`${tag} ${result.id} -> ${detail}`);
      if (completedSinceFlush >= CONFIG.progressFlushEvery) {
        await progress.flush();
        completedSinceFlush = 0;
      }
    }),
  );

  try {
    await Promise.all(tasks);
  } finally {
    await progress.flush();
    await csv.close();
  }

  const counts = summarize(results);
  logger.info(
    `done success=${counts.success} partial=${counts.partial} ` +
      `no_contact=${counts.no_contact_found} no_website=${counts.no_website} ` +
      `site_dead=${counts.site_dead} blocked=${counts.blocked} ` +
      `cf_blocked=${counts.cf_blocked} error=${counts.error}`,
  );
  logger.info(`csv: ${outputPath}`);
  await logger.close();
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.stack ?? err.message : err);
  process.exit(1);
});
