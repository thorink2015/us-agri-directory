# FOUND.md — Reusable assets inventory

> Generated 2026-06-03 for the "find reusable assets" request, scoped to
> **this** repo (`thorink2015/us-agri-directory`, the US Ag Drone Directory).

## Scope note (why this differs from the original prompt)

The asset-finder prompt assumed a different project (`local-marketing-site`,
a local marketing agency) and assumed it could scan a local machine and an
entire GitHub account. In this environment none of that was possible:

- This is an ephemeral cloud container with **only this repo on disk**, so
  there was no projects folder or other machine to scan.
- `gh` is not installed, and GitHub access is **scoped to this one repo**,
  so other repos could not be enumerated or cloned.
- The prompt-referenced folders (`reference/`, `site/`, `copy/`,
  `reference/design-system.md`, `site/styles.css`) **do not exist** here.

So nothing was copied in from outside. This is a catalogue of what is
already reusable **inside this repo** (Section 1) plus a grounded gap list
(Section 2). Every path below is verified against the working tree.

**The canonical pattern library is `_memory/code-patterns.md`.** Read it
before building anything new. This file points at it rather than copying it.

---

## Section 1 — Reusable assets already in this repo

### Pages / routes (~50)

- **Static / marketing:** `/`, `/about`, `/contact`, `/pricing`,
  `/advertise`, `/list-your-business`, `/get-matched`, `/buyers-guide`,
  `/start-a-drone-business`, `/grants-and-subsidies`, `/insurance`,
  `/training-and-certification`, `/glossary`, `/map`
- **Hubs + programmatic:** `/operators` (+`[slug]`), `/states`
  (+`[slug]`, `[slug]/[city]`, `[slug]/operators`, `[slug]/crops/[crop]`,
  `[slug]/services/[service]`), `/crops` (+`[slug]`), `/services`
  (+`[slug]`), `/drones` (+`[slug]`), `/regions` (+`[slug]`), `/blog`
  (+`[slug]`), `/guides` (+`[slug]`)
- **Regulations:** `/regulations` (+ `faa-part-107`, `faa-part-137`,
  `ndaa-compliance`, `state-licensing`)
- **Comparisons:** `/comparisons/drone-vs-airplane`,
  `/comparisons/drone-vs-ground-rig`
- **Tools (6 calculators):** `/tools` (+ `acreage-converter`,
  `coverage-calculator`, `drone-comparison`, `roi-calculator`,
  `spray-cost-calculator`, `treatment-calendar`)
- **Affiliate redirect:** `/go/[slug]` (noindex)

### Design system (the "design lock" for this repo)

- **Tokens:** `src/app/globals.css` — CSS vars `--background: #F8F9FA`,
  `--foreground: #1A1A2E`; body font is a **`system-ui` stack** (no web
  font, zero CLS, deliberate).
- **Tailwind:** `tailwind.config.ts` — maps the two CSS vars; otherwise
  the default Tailwind palette. Brand greens used inline (green-700
  `#15803d`, green-900 `#14532d`, green-500 `#22c55e`); the full SVG/chart
  palette is enumerated in `code-patterns.md`.
- **Long-form CSS components:** `.guide-body`, `.guide-table-callout`,
  `.guide-pullquote`, `.guide-figure*`, and a print stylesheet, all in
  `globals.css`.

### Reusable React components (`src/components/`, 34 files)

- **Author / E-E-A-T:** `author/Byline.tsx`, `author/AuthorCard.tsx`
- **Schema:** `schema/OperatorSchema.tsx` (LocalBusiness + hasCredential),
  `schema/CountyPageSchema.tsx`
- **Layout:** `layout/Header.tsx` (mega-nav with dropdowns),
  `layout/Footer.tsx`, `layout/Breadcrumb.tsx`
- **UI:** `ui/FAQAccordion.tsx`, `ui/USMap.tsx` (zero-JS inline SVG map),
  `ui/MailtoLink.tsx` (Cloudflare-obfuscation-safe), `ui/ExternalLink.tsx`,
  `ui/SocialIcons.tsx`, `ui/VerificationBadges.tsx`, `ui/ExitIntentPopup.tsx`,
  `ui/HomepageNewsletterForm.tsx`
- **Operators:** `operators/OperatorCard.tsx`,
  `operators/OperatorContactLinks.tsx`, `operators/OperatorGallery.tsx`
- **Leads:** `leads/GetMatchedWizard.tsx` + `GetMatchedModal.tsx` +
  `GetMatchedButton.tsx` (4-step TCPA-consent lead capture, Formspree
  endpoint, optional Turnstile, honeypot)
- **Guides:** `guides/GuideTOC.tsx`, `guides/GuideReadingProgress.tsx`,
  `guides/ShareButtons.tsx`, `guides/StatsCharts.tsx` (inline SVG charts)
- **Affiliate:** `affiliate/AffiliateCard.tsx`,
  `affiliate/AffiliateTextLink.tsx`, `affiliate/AffiliateDisclosure.tsx`
- **Ads:** `ads/AdSlot.tsx` (AdSense, env-gated production kill switch)
- **Analytics:** `analytics/GoogleAnalytics.tsx`, `analytics/GAPageView.tsx`,
  `analytics/AIReferrerTracker.tsx`
- **Counties / Search:** `counties/CountyCard.tsx`, `search/SearchBar.tsx`

### Lib helpers (`src/lib/`)

- `seo.ts` — title/meta helpers
- `indexing-gates.ts` — shared noindex predicates (sitemap and page
  templates import the same source, so they never drift)
- `operator-content.ts`, `state-crop-content.ts`, `state-service-content.ts`
  — template-level content enrichment that lifts thin pages above the
  index threshold from existing data only
- `adSlots.ts` — AdSense slot registry; `utm.ts`, `utils.ts`

### Data layer (`src/data/`, 16 modules, no database)

`author.ts` (**single source of truth**: `AUTHOR`, `SITE`,
`personSchema()`, `organizationSchema()`), `operators.ts`, `states.ts`,
`counties.ts`, `crops.ts`, `drone-model.ts` (exported as `drones`),
`services.ts`, `regions.ts`, `cities.ts`, `seed-cities.ts`,
`blog-posts.ts`, `guides.ts`, `glossary.ts`, `faqs.ts`, `affiliates.ts`,
`types.ts`, `us-states-svg.ts` (20 KB public-domain SVG path data).

### SEO / schema / AEO

- **Dynamic routes:** `src/app/sitemap.ts` (noindex-aware),
  `src/app/robots.ts` (27 AI-crawler allowlist + `Mediapartners-Google`
  wall), `src/app/manifest.ts`
- **File-based brand metadata:** `src/app/icon.tsx`, `apple-icon.tsx`,
  `opengraph-image.tsx`, `favicon.ico`
- **AI discovery files:** `public/llms.txt`, `public/llms-full.txt`,
  `public/humans.txt`, `public/ads.txt`, `public/.well-known/security.txt`
- **IndexNow:** key file `public/199aa73a01c74f6786948b45aaec2d17.txt`,
  `scripts/ping-indexnow.mjs`, `netlify/plugins/indexnow/`
- **Pattern library** for AEO block, Article / FAQPage / BreadcrumbList /
  HowTo schema, and canonical URLs: `_memory/code-patterns.md`

### Brand assets / fonts

- **Author photo:** `public/images/eugen-author.jpg` (canonical per
  `project-facts.md`). A second `public/images/eugen-author.jpeg` also
  exists (flagged in Section 2).
- **Operator photos:** `public/images/operators/pro-ag-solutions/*.webp`
  (3), `public/images/operators/swift-aeroseed/*.webp` (1)
- **Affiliate logo placeholder:**
  `public/affiliate-assets/pilot-institute/pilot-institute-logo.svg`
- **Favicon / OG / app icons:** generated via Next file-based metadata
  (the `src/app/*.tsx` files above)
- **Fonts:** `src/app/fonts/GeistVF.woff` + `GeistMonoVF.woff` are present
  but **unused** (not wired in `layout.tsx` or `globals.css`). See
  Section 2.

### Legal

- `/privacy` — `src/app/privacy/page.tsx` (includes the AdSense / DART
  disclosure block)
- `/terms` — `src/app/terms/page.tsx`
- `/affiliate-disclosure` — `src/app/affiliate-disclosure/page.tsx`

### Copy and content patterns

- **Voice rules:** `_memory/standing-rules.md` §9. Body copy must come
  from `_research/` deliverables per `_memory/copy-source-of-truth.md`
  (no invented facts).
- **Reusable content scaffolds** (all in `_memory/code-patterns.md`):
  AEO answer block, authority-links block, FAQ block, content-page
  top/bottom wrapper, long-form sentinel-append loop, two-file calculator
  split, lead-capture wizard placement.

### Scripts and tooling

- `scripts/`: `import-operators.ts` (research markdown to `Operator`
  objects), `ping-indexnow.mjs`, `check-cloudflare.sh`,
  `check-service-links.mjs`, `build-priority-list.mjs`
- `tools/contact-scraper/` — standalone Node CLI (own package.json) plus
  GitHub Action `.github/workflows/scrape-contacts.yml`
- `tools/content-audits/duplicate_check.py`
- `audit/` — prior audit reports (schema, indexing, meta, performance,
  AEO, internal-link-graph, http-security, on-page)

---

## Section 2 — Gaps (genuinely not built or flagged)

Grounded in the filesystem and `_memory/pending-items.md`.

### Pages

- **No EPA regulations sub-page.** `/regulations` has FAA Part 107/137,
  NDAA, and state-licensing, but no EPA / FIFRA page. Blocked on
  `_research/research-02-epa-pesticide-rules.md`. Scaffold-only until the
  deliverable lands (`copy-source-of-truth.md`).
- **47 of 50 states use the fallback county template** (only Iowa, Texas,
  California are rich proof states). Blocked on
  `research-03-state-licensing.md`.
- Homepage / pricing depth rewrites and the grants / insurance / training
  pillars are blocked on `research-04` / `research-05`.

### Fonts

- **Orphaned Geist fonts.** `src/app/fonts/GeistVF.woff` and
  `GeistMonoVF.woff` are not referenced anywhere. Either wire them via
  `next/font/local` if a branded typeface is wanted, or delete the two
  files. The `system-ui` stack is the real, intentional font system today.

### Brand assets

- **Duplicate author photo.** Both `eugen-author.jpg` and
  `eugen-author.jpeg` exist; `.jpg` is canonical. Remove the stray to
  avoid ambiguity.
- **Per-route OG images.** Dynamic OG is done for city pages only
  (PR #101). State / crop / service / operator OG generation is still
  pending.
- **Real Pilot Institute logo + Part 107 screenshots** are still
  placeholders, pending Eugen's drop.

### SEO / schema (post-launch polish, from pending-items)

- `state-crop` and `state-service` routes are missing `BreadcrumbList`
  schema (~1,100 pages).
- Homepage is missing `WebSite` + `SearchAction` schema.
- `HowTo` schema is missing on the city template's "how to hire" section.

### Copy

- `organizationSchema().sameAs` is still an empty array (needs company
  social URLs).
- Alaska state hub is under the 700-word threshold (one-time content pass).

### Legal

- Covered for this site's model. There is **no A2P / 10DLC SMS terms**
  page, but this repo runs no SMS program. The `/get-matched` wizard does
  capture TCPA consent text inline (`wizard-options.ts`). If a texting
  program launches, a dedicated SMS consent / terms section becomes the gap.

### Data / housekeeping (from pending-items "actionable findings")

- `Applied Ag` is the only ultra-thin operator: flesh out or remove.
- Re-tag operators for `mapping` / `consultancy` to flip ~15-20
  state-service pages to indexed without new research.
- `operators-batch-4b-mountain-west.md` parses to 0 rows (re-extract or
  delete).
- Regenerate `existing-operators-name-list.txt` before the next research
  import.
