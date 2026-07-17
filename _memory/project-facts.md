# Project facts

> Verified facts only. No guesses. Update when facts change or new
> facts are learned. Keep entries short; link to source files instead
> of duplicating content.

Last updated: 2026-04-15

## Project identity

- **Site name:** US Ag Drone Directory
- **Production domain:** `https://agdronedirectory.com`
- **Repo:** `thorink2015/us-agri-directory`
- **Working branch:** rotates per session. The harness assigns the
  branch name in each session prompt; develop and push only on
  that branch unless Eugen says otherwise.
  - **Historical note:** `claude/add-drone-operators-directory-T0YnN`
    was the long-running working branch through April. Fully merged
    into `main` on 2026-05-05 (per
    `_handoff/branch-audit-2026-05-06.md`); do not resurrect.
  - **Never push to other branches without explicit user approval.**
- **Main branch:** holds the live US Ag Drone Directory site
  (Netlify production branch as of 2026-04-17 fix; see
  `_memory/known-issues.md`). PRs land here after review. The
  pre-2026-04-17 Romanian codebase is no longer on main.
- **Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, deployed to Netlify
- **Data:** TypeScript files in `src/data/` — no database, no CMS

## Author (E-E-A-T)

- **Single source of truth:** `src/data/author.ts` — import `AUTHOR`,
  `SITE`, `personSchema()`, `organizationSchema()` from here. Never
  paraphrase the bio elsewhere.
- **Filled as of 2026-04-24:** firstName Eugen, lastName Manoli,
  LinkedIn `https://www.linkedin.com/in/manoli-eugen/`, job title
  "Founder and Editor", bio has Florida / United States and
  Agricultural Economics populated.
- **Photo:** `/public/images/eugen-author.jpg` (39 KB, uploaded
  2026-04-24). `Byline` and `AuthorCard` render the real image;
  initial-letter fallback still in place for safety if the file
  goes missing.
- **Public email:** `eugen@agdronedirectory.com` (active).
- **Optional still blank:** `AUTHOR.x` (X/Twitter URL — optional,
  filtered out of `sameAs` by `authorSameAs()`).
- **Organization `sameAs`** in `organizationSchema()` is still an
  empty array. Add the company LinkedIn + X URLs when they exist.

## Environment variables (set in Netlify dashboard)

| Name | Purpose | Status |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 tracking | To be replaced with Plausible |
| `NEXT_PUBLIC_FORMSPREE_ID` | Contact form endpoint | Set |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible Analytics site ID | **Not yet set — blocked on Eugen** |
| `NEXT_PUBLIC_STRIPE_PREMIUM_ACRE_URL` | Stripe Payment Link for The Premium Acre CTAs (join page + minimal header), read via `src/lib/premium-acre.ts` | **Not yet set — blocked on Eugen.** Buttons scroll to the founder-deal card until set |

## Schema @id anchors (every JSON-LD on the site references these)

- Organization: `https://agdronedirectory.com/#organization`
- Person (Eugen): `https://agdronedirectory.com/about#eugen`
- WebSite: `https://agdronedirectory.com/#website`

These are canonicalized in `src/data/author.ts` via `AUTHOR.personId`
and `AUTHOR.organizationId` getters.

## IndexNow

- **Active key:** `199aa73a01c74f6786948b45aaec2d17`
- **Key file:** `/public/199aa73a01c74f6786948b45aaec2d17.txt`
- **Ping script:** `scripts/ping-indexnow.mjs` — auto-runs via Netlify Build Plugin on every production deploy
- **Netlify plugin:** `netlify/plugins/indexnow/` — fires `onSuccess`, logs warning on failure (never fails the deploy)
- **Last run result:** 1130 URLs submitted, HTTP 200 accepted (2026-04-16)

## Conventions Eugen cares about

- **Work in small batches** (1–3 items per commit, max). Batch and
  push, wait for "next". Avoids API timeouts.
- **English only** — no Romanian content. hreflang NOT needed.
- **Honest copy** — `/about` explicitly states what the site is NOT
  (not a Part 137 operator, not legal advice). Do NOT fabricate
  credentials for Eugen.
- **Primary sources only** — every regulatory/pricing fact cites FAA,
  EPA, USDA, or land-grant extension. No secondary aggregators.
- **One author, visible byline** — every content page renders `<Byline>`
  under H1 + `<AuthorCard>` at footer.

## Newsletter (Tank Mix by AgDrone)

- **Provider:** beehiiv. Embed loader
  `https://subscribe-forms.beehiiv.com/v3/loader.js`, form id
  `f05ad8ce-3cc6-4a42-8c44-e02383e7059b`.
- **Components:** `src/components/newsletter/` (see
  `code-patterns.md § Newsletter CTA`). Rendered prominently on the
  homepage (section 14) and above the footer on every other page. One
  green card, copy left / beehiiv form right on desktop.
- **Replaced** the two old Formspree newsletter forms (footer "Stay
  updated" + `HomepageNewsletterForm`) on 2026-06-17. The `newsletter`
  and `newsletter-homepage` Formspree `_form_type` values are now
  unused.

## Paid newsletter (The Premium Acre)

- **Product:** paid twice-monthly newsletter (issues on the 1st and
  15th): one Money Lane + one Fine Print + one Binder Doc per issue.
- **Pricing (2026-07-17, per Eugen):** founding members $17/month
  locked for life; public anchor price $49/month.
- **Pages:** `/premium-acre` = founding-list email signup (Formspree
  `premium-acre-signup`); `/premium-acre/join` = founding sales page,
  CTAs go to the Stripe Payment Link via
  `NEXT_PUBLIC_STRIPE_PREMIUM_ACRE_URL`.
- **Starter Binder (founder day-one delivery):** Job Quoting Sheet,
  Spray Application Record, Spray Service Agreement, Subcontract Spray
  Agreement, Pre-Season Compliance Checklist. Documents themselves live
  outside this repo (Eugen's deliverables).
- **Leads perk:** directory farmer inquiries in a member's area get
  sent to members first. Frame as perk, never a promise (lead flow not
  stable yet, per Eugen 2026-07-17).
- **Public persona (2026-07-17, per Eugen):** on Premium Acre pages the
  author appears as "AgDrone Eugen" (no family name) with the author
  photo. Tank Mix reach figure per Eugen: 1,000+ drone operators.
  `src/data/author.ts` itself stays untouched (frozen).
- **Chrome branding:** the minimal header/footer on `/premium-acre` and
  `/premium-acre/join` carry The Premium Acre brand (Mail icon + serif
  wordmark), not the directory brand, and the header CTA is the
  founding Stripe CTA. Copy voice on the join page: no strikethrough
  price theater ($49 stated in words), one CTA label everywhere
  ("Lock in my $17 rate"), "locked while you stay" never "for life".
- **Positioning (Eugen, 2026-07-17, second pass):** hero in his own
  newsletter-ad voice: H1 is just "The Premium Acre" + his line "I do
  the digging, you get the playbook: the work that pays more, who's
  buying and how to land it." Money-making content is center stage
  (playbooks, researched numbers/rates, how to land work, getting
  found online). The five binder documents are a WELCOME BONUS perk,
  never a headline section. No ad-style headlines.
- **H1 note:** join page H1 is "The Premium Acre", so the signup page
  H1 became "The Premium Acre founding list" (site-wide unique-H1 rule).

## Internal folders (not served by the site)

- `_research/` — 13 research + planning docs (see `_research/README.md`)
- `_memory/` — this folder. Claude Code self-maintained knowledge base.
- Both can be deleted with `rm -rf _research _memory` before launch.

## `_research/` drop-folder workflow (2026-04-17)

Eugen uses `_research/` as a drop folder for any files he wants Claude
Code to work with. Standard flow per batch:

1. Look in `_research/` for the new files Eugen dropped
2. Read + analyze them
3. Apply the changes / integrate content into the right destination
   (e.g. `src/data/`, `src/app/...`, `public/images/`, etc.)
4. Move or delete the source files out of `_research/` once integrated,
   so the folder only holds un-processed drops
5. Commit + push per the small-batches rule

Do not leave processed drop files sitting in `_research/`.
