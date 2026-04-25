import { parseCli, HELP_TEXT } from './cli.ts';
import { createSource } from './sources/index.ts';

async function main(): Promise<void> {
  if (process.argv.includes('--help')) {
    console.log(HELP_TEXT);
    return;
  }

  const opts = parseCli(process.argv);
  const source = createSource(opts);
  const all = await source.load();
  const rows = opts.limit ? all.slice(0, opts.limit) : all;

  // BATCH 1 ENDS HERE.
  // The engine, output writer, progress store and logger are added in
  // subsequent batches. For now, dump a summary so the CLI is testable.
  const withWebsite = rows.filter((r) => r.website && r.website.trim().length > 0);
  const withoutWebsite = rows.length - withWebsite.length;
  console.log(JSON.stringify(
    {
      source: opts.source,
      file: opts.file ?? null,
      totalLoaded: all.length,
      afterLimit: rows.length,
      withWebsite: withWebsite.length,
      withoutWebsite,
      sample: rows.slice(0, 3).map((r) => ({
        id: r.id,
        name: r.name,
        website: r.website ?? null,
      })),
    },
    null,
    2,
  ));
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
