# CLAUDE.md — Contact Scraper

> Read first if a future session needs to extend, debug, or re-run this
> tool. Updated as we hit gotchas. **Status: in progress, batch 1 of 4.**

## What this tool is

A standalone Node + TypeScript CLI under `tools/contact-scraper/` that
scrapes contact info from operator websites and writes a CSV. It is
intentionally separate from the main Next.js app: its own
`package.json`, its own deps, its own tsconfig. Nothing in here is
imported by the website.

## Why a separate package

- The Next.js root pins old deps (`lucide-react@1.8.0`) that we don't
  want to disturb. Adding `cheerio` to the root `package.json` would
  bloat installs for everyone working on the site.
- Tools that fetch the public internet have a different blast radius
  than tools that build the static site. Keeping them decoupled means
  the production build can never accidentally pull this in.

## Architecture (layered, no cycles)

```
cli.ts               flag parsing
  → sources/*        load InputRow[] from directory|csv|json
  → scrape/engine.ts run per-site pipeline (added in batch 2)
  → output/*         CSV writer + progress.json + logger (batch 3)
```

Public types live in `src/types.ts`. Tunables live in `src/config.ts`.
Importing config or types is fine from anywhere; importing across
sibling layers is not.

## Hard rules for editors of this tool

1. **Never** make this tool reach into `src/app/` or import anything
   from the main Next.js bundle. The only file we touch in the parent
   repo is `src/data/operators.ts`, read-only via dynamic import.
2. **Never** change the `Operator` interface in `../../src/data/types.ts`
   from inside this tool. Add a narrow interface in `sources/directory.ts`
   instead (we already do this).
3. **Never** mutate operator data files. The scraper writes only to
   `tools/contact-scraper/output/`, `logs/`, and `progress.json`.
4. **Polite by default.** 5 cross-domain in flight, 2.5s same-domain
   delay, realistic UA. Do not "speed it up" without a request.
5. **Resumable by default.** Progress saves every 10 completions. A
   second run skips entries already in `progress.json` unless `--force`.

## Input shape (directory mode)

`src/data/operators.ts` exports `operators: Operator[]`. We import it
dynamically (tsx handles the .ts extension). Only `slug`, `name`,
`website`, `phone`, `email`, `city` are read here; everything else is
ignored. As of last count: 391 operators total, 285 have a `website`.

## Output schema (will land in batch 3)

CSV columns:
```
operator_id, operator_name, website, email_primary, email_all,
phone_primary, phone_all, contact_form_url, linkedin, facebook,
instagram, twitter, youtube, source_pages_checked, status, notes,
scraped_at
```

`status` is one of:
- `success` — at least one email found
- `partial` — phone or form found but no email
- `no_contact_found` — pages loaded but nothing extracted
- `no_website` — input had no website to begin with
- `site_dead` — DNS / repeated network failure
- `blocked` — 403 / anti-bot
- `cf_blocked` — Cloudflare challenge page detected
- `error` — other (note carries reason)

## Sandbox / network gotchas

The Claude Code web sandbox blocks general HTTP fetches with
`x-deny-reason: host_not_allowed`, but the npm registry is reachable.
This means: we can `npm install` and typecheck inside a web session,
but the actual scrape must run on the owner's local machine (or a
Claude Code session that has internet).

If you (a future Claude) try to run the scraper inside the web sandbox
and every site returns `error: fetch failed`, that's the cause. Don't
debug the scraper — debug the environment.

## Things explicitly NOT to change without thinking

- The candidate-page list in `config.ts`. It is ordered for a reason
  (homepage first because footers carry emails; `/contact` second).
- The dynamic import of `operators.ts`. Static `import` would force a
  build step here just to read one array.
- The "no Playwright" default. Playwright pulls 200 MB of Chromium and
  the owner is non-technical. Default engine is `fetch` + `cheerio`
  + Cloudflare CFEmail decoder, which covers WordPress / Squarespace /
  Wix sites. A `--engine=playwright` second pass can be added later
  for the ~25% of sites that JS-render their contact info, but that
  goes behind a flag.

## Common error signatures (will grow as we hit them)

*To be populated during batches 2-4 and after the first real run.*

## Where to start if you need to extend this

- New input source (e.g. Google Sheets URL): add a class in
  `src/sources/`, register it in `src/sources/index.ts`, declare the
  `SourceMode` in `src/types.ts`. Don't touch the engine.
- Higher email coverage: add a decoder in `src/scrape/decoders.ts`
  (file lands in batch 2). The pattern is "input HTML/text → emails[]".
- New output format: add a writer in `src/output/`. The CSV writer is
  the reference implementation.
