# Contact Scraper

A polite, resumable tool that takes a list of operator websites and
extracts emails, phones, contact-form URLs and social links into a
single CSV. Lives in its own folder with its own `package.json` so it
never touches the main Next.js app.

## How to run it (no terminal needed)

The easiest path: GitHub Actions. You click a button on github.com,
GitHub runs the scraper on its own free runners, and gives you a CSV
file to download. Independent of Netlify minutes.

### Step-by-step (3 minutes)

1. **Open the repo on GitHub:** https://github.com/thorink2015/us-agri-directory
2. **Click the "Actions" tab** at the top of the repo page.
   - If GitHub asks "I understand my workflows, go ahead and enable them",
     click that button. (Only needed once per repo.)
3. **In the left sidebar, click "Scrape Contacts".**
4. **On the right side, click the gray "Run workflow" button.**
   A small panel drops down.
5. **In that panel:**
   - **Branch:** leave on `claude/build-operators-scraper-l0r9c`
     (this is where the tool lives until the PR merges)
   - **source:** leave on `directory` (uses the 391 operators in
     `src/data/operators.ts`)
   - **file:** leave blank
   - **limit:** leave blank for the full 391, or type `10` for a
     test run on the first 10 only. **Do a `10` run first** so you
     can sanity-check the output before spending a full run.
   - **force:** leave unchecked
   - **concurrency:** leave on `5`
   - **per_domain_delay_ms:** leave on `2500`
6. **Click the green "Run workflow" button.**
7. Wait. Refresh the page after a few seconds; a yellow circle appears
   showing the run is in progress. The full 391-site run takes roughly
   60-90 minutes; a `limit=10` test takes 1-2 minutes.
8. **When it finishes** (green check), click on the run name to open it.
9. **Scroll to the bottom** of the run page. Under "Artifacts" you'll
   see three boxes:
   - **`contacts-csv`** — click to download the CSV (this is the file you want)
   - **`contacts-log`** — click to download the run log if anything looks wrong
   - **`contact-scraper-progress`** — the resumable state file, ignore unless you want to resume a partial run later
10. **Unzip the downloaded `contacts-csv.zip`.** Inside is the CSV.
    Open it in Numbers / Excel / Google Sheets.

### What if it fails?

- **Yellow circle never turns green for 4+ hours:** something is stuck.
  On the run page, click "Cancel run" at the top right. Re-run with a
  smaller `limit` (e.g. 50) so you can isolate the issue.
- **Red X (failure):** click the run name, then click "scrape" in the
  job list, then expand "Run scraper" to read the error. Send it to me
  and I'll fix it.
- **Some operators come back as `site_dead` or `blocked`:** that's
  normal. See "Reading the CSV" below.

## Reading the CSV

Each row is one operator. Columns:

| Column | Meaning |
|---|---|
| `operator_id` | Stable id (slug from the source) |
| `operator_name` | Display name |
| `website` | The URL we scraped |
| `email_primary` | The best email we found (prefers personal over `info@`) |
| `email_all` | Every email we found, semicolon-separated |
| `phone_primary` | First phone found |
| `phone_all` | Every phone, semicolon-separated |
| `contact_form_url` | URL of a page with an actual contact form |
| `linkedin`, `facebook`, `instagram`, `twitter`, `youtube` | Social profile links |
| `source_pages_checked` | Which pages we walked (semicolon-separated) |
| `status` | One of: `success`, `partial`, `no_contact_found`, `no_website`, `site_dead`, `blocked`, `cf_blocked`, `error` |
| `notes` | Reason for failure or extra signal (e.g. "email-as-image detected") |
| `scraped_at` | ISO timestamp |
| Extra columns | Pulled from the source; for `directory` mode that's `city`, `existing_email`, `existing_phone` so you can compare what's already in the directory against what we found |

### Status values

| Status | What it means | What to do |
|---|---|---|
| `success` | Found at least one email | Use `email_primary` for outreach |
| `partial` | Found phone or contact form, no email | Use `contact_form_url` or `phone_primary` |
| `no_contact_found` | Site loaded but had no extractable contact | Manual review needed |
| `no_website` | The directory entry has no website at all | Skip or research separately |
| `site_dead` | DNS failure or repeated timeout | Site may be down; retry later or skip |
| `blocked` | 403 / anti-bot response | Site is hostile to automation; manual visit needed |
| `cf_blocked` | Cloudflare challenge page | Same as above |
| `error` | Other failure | Check `notes` |

Realistic coverage on a healthy ag-operator list:
- Email: 50-65% (higher with the Cloudflare CFEmail decoder)
- Phone: 70-80%
- Contact form URL: 85-90%

## Reusing for new lists later

The same tool reads three input modes. After this US run finishes, you
can scrape a new research list (Romanian directory, an Apollo export,
anything) by changing the `source` and `file` inputs in the same
GitHub Actions workflow.

**CSV mode:** put a CSV with `name` and `website` columns somewhere in
the repo (e.g. `_research/new-operators.csv`), then run the workflow
with `source=csv` and `file=_research/new-operators.csv`. Any extra
columns in your CSV pass through to the output untouched.

**JSON mode:** same but with `source=json` and a JSON array of
`{ "name": "...", "website": "..." }` objects.

## Files

```
tools/contact-scraper/
├── README.md       — this file (the run guide)
├── CLAUDE.md       — for future Claude Code sessions (gotchas, patterns)
├── package.json    — separate from the root app, never imported
├── tsconfig.json
├── src/
│   ├── index.ts    — CLI entry: orchestration loop with p-limit
│   ├── cli.ts      — flag parser
│   ├── config.ts   — tunables (timeouts, concurrency, candidate paths)
│   ├── types.ts    — public types
│   ├── sources/    — directory / csv / json input loaders
│   ├── scrape/     — fetch + decoders + extractor + per-site engine
│   └── output/     — csv writer / progress.json / logger
├── output/         — CSVs land here (gitignored, also uploaded as artifact)
├── logs/           — run logs (gitignored, also uploaded as artifact)
└── progress.json   — resumable state (gitignored, also uploaded)
```

## Running locally if you ever want to (skip if using GitHub Actions)

You'd need Node 22 installed. Then in a terminal:

```bash
cd tools/contact-scraper
npm install
npm run scrape:test          # test with 10 operators
npm run scrape -- --source=directory   # all 391
```

The CSV lands in `tools/contact-scraper/output/`.
