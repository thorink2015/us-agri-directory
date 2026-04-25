# Contact Scraper

> **Status: WIP — Batch 1 of 4 (scaffolding only).** Engine, output, and
> run instructions land in batches 2-4. Don't try to run a real scrape
> with this build yet; it'll just print a summary of the input list.

A polite, resumable tool that takes a list of operator websites and
extracts emails, phones, contact-form URLs and social links into a
single CSV. Lives in its own folder with its own `package.json` so it
never touches the main Next.js app.

## Quick start (intended, once finished)

```bash
cd tools/contact-scraper
npm install
npm run scrape:test          # 10 operators from src/data/operators.ts
npm run scrape -- --source=directory   # all 391 operators
```

Output lands in `tools/contact-scraper/output/contacts-YYYY-MM-DD-HHmm.csv`.

## Input modes

| Mode | Flag | Source |
|---|---|---|
| Directory | `--source=directory` | The repo's `src/data/operators.ts` (default) |
| CSV | `--source=csv --file=path.csv` | Any CSV with `name` + `website` columns |
| JSON | `--source=json --file=path.json` | Array of `{ name, website }` objects |

Pass-through columns (anything other than `id`, `slug`, `name`,
`website`/`url`) are preserved into the output CSV so you can join the
result back to your source list.

## What it will (and won't) extract

| Field | Coverage target |
|---|---|
| Email | 50–65% (higher with CFEmail decoder) |
| Phone | 70–80% |
| Contact form URL | 85–90% |
| Socials (LinkedIn, Facebook, Instagram, X, YouTube) | best-effort |

It will not solve image-only emails or fully JS-rendered contact
widgets in the default engine. Those get flagged in the `notes`
column for manual follow-up.

## Files

```
tools/contact-scraper/
├── README.md       — this file (for the human owner)
├── CLAUDE.md       — for future Claude Code sessions (gotchas, patterns)
├── package.json    — separate from the root app
├── tsconfig.json
├── src/
│   ├── index.ts    — CLI entry
│   ├── cli.ts      — flag parsing
│   ├── config.ts   — tunables (timeouts, concurrency, candidate paths)
│   ├── types.ts    — public types shared across modules
│   └── sources/    — directory / csv / json input loaders
├── output/         — CSVs land here (gitignored)
├── logs/           — run logs (gitignored)
└── progress.json   — resumable state (gitignored)
```
