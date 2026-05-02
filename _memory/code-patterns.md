# Code patterns

> Reusable patterns established on this project. Copy these when
> building similar pages — do not reinvent.

Last updated: 2026-04-15

## AEO (Answer Engine Optimization) block

**Used on:** crop pages, service pages, region pages, `/about`.

**Purpose:** A 2–3 sentence answer designed for Google AI Overviews,
Perplexity, and ChatGPT to lift verbatim. Must contain at least one
specific number (price, acreage, %, etc.).

**Data shape:** stored as `aeoBlock: string` on the relevant data interface.

**Rendering:**

```tsx
<div className="bg-green-50 border-l-4 border-green-600 px-4 py-3 rounded-r-xl mb-6">
  <p className="text-sm text-gray-700 leading-relaxed">{thing.aeoBlock}</p>
</div>
```

**Placement:** directly under the `<Byline>`, above the main page body.

## Content-page top/bottom wrapper

Every content page (crop, service, region, guide, regulation) renders:

```tsx
import Byline from '@/components/author/Byline';
import AuthorCard from '@/components/author/AuthorCard';
import { AUTHOR, SITE } from '@/data/author';

// Fallback when no per-entity lastReviewedAt is set
const LAST_REVIEWED = '2026-04-01';

// In JSX:
<h1>...</h1>
<Byline lastUpdated={entity.lastReviewedAt ?? LAST_REVIEWED} />
{/* AEO block */}
{/* main content */}
<AuthorCard />
```

The `Byline` component drives `<time datetime>` for Google last-updated
parsing. The `AuthorCard` drives E-E-A-T footer signal.

## Article schema with @id refs

**Always** reference author + publisher by `@id` — never inline the
Person/Organization objects again. Homepage emits the canonical Person
and Organization JSON-LD once.

```ts
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: `...`,
  description: '...',
  url: `${SITE.domain}/path/to/page`,
  mainEntityOfPage: `${SITE.domain}/path/to/page`,
  datePublished: '2026-01-01',
  dateModified: lastReviewed,
  author: { '@id': AUTHOR.personId },
  publisher: { '@id': AUTHOR.organizationId },
  image: `${SITE.domain}/images/og-default.jpg`,
};
```

Render with:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
/>
```

## Authority links block

**Used on:** crop, service, region pages. Adds outbound trust links
(FAA, EPA, USDA, extension).

**Data shape:** `authorityLinks: { label: string; url: string }[]`.

```tsx
<div className="mb-8">
  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
    Official resources
  </p>
  <div className="flex flex-col gap-2">
    {entity.authorityLinks.map((link) => (
      <a
        key={link.url}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-green-700 hover:underline"
      >
        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
        {link.label}
      </a>
    ))}
  </div>
</div>
```

## FAQ section (FAQPage schema)

**Used on:** crop, service, state pages.

```ts
const faqs = [
  { question: '...', answer: '...' },
  ...
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};
```

Render: `<FAQAccordion faqs={faqs} />` + JSON-LD script.

## Breadcrumb schema

```ts
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
    { '@type': 'ListItem', position: 2, name: 'Parent', item: `${SITE.domain}/parent` },
    { '@type': 'ListItem', position: 3, name: entity.name, item: `${SITE.domain}/parent/${entity.slug}` },
  ],
};
```

## Canonical URLs

Always use **relative paths** (`'/about'`, `` `/crops/${slug}` ``) in
`alternates.canonical`. Next.js auto-expands via `metadataBase` in
`src/app/layout.tsx`.

## Interactive calculator pattern

Each tool is split into two files:

- `ComponentName.tsx` (client) with `'use client'` — interactive React state, uses `useMemo` for calculations
- `page.tsx` (server) — exports metadata, emits JSON-LD (SoftwareApplication + BreadcrumbList), renders AEO block + `<ComponentName />`

Examples: `src/app/tools/roi-calculator/`, `src/app/tools/coverage-calculator/`.

## Long-form content rollout (sentinel append loop)

**Used on:** pillar guides in `src/app/guides/[slug]/content.tsx`. Any
time we are writing a 3,000+ word TSX body that would otherwise exceed
safe per-turn output.

**Why:** A single `Write` with a 5,000-word body sends ~25k tokens
through the stream and reliably trips "stream idle timeout - partial
response received" or post-compaction rate limiting. Appending one H2
section per turn keeps each diff tiny and the git tree clean between
turns.

**Shape of the scaffold:**

```tsx
// src/app/guides/[slug]/content.tsx
import { ReactNode } from 'react';

export const guideContent: Record<string, ReactNode> = {
  'the-slug': (
    <>
      {/* GUIDE-INSERT-POINT: the-slug */}
    </>
  ),
};
```

**Imports grow with the body, not up front.** Start with only
`ReactNode`. When the first section with internal links lands, that
same `Edit` also adds `import Link from 'next/link';`. Importing ahead
of use trips `@typescript-eslint/no-unused-vars` and fails the
Netlify build (see `known-issues.md` 2026-04-21 entry).

**Per-section turn:**

1. ONE `Edit` that replaces the sentinel with:
   ```tsx
   [new section JSX]
   {/* GUIDE-INSERT-POINT: the-slug */}
   ```
2. ONE `git commit` (short subject, e.g. `content(guides): section N of
   <slug> — <short label>`) and `git push`.
3. Stop. Wait for user to say "next".

**Final turn only:** remove the sentinel, run `npx next build` to
verify the route generates, commit + push.

**Author tone / escape rules (same as blog/[slug]/content.tsx):**
- Apostrophes in JSX text → `&apos;`
- Curly double quotes → `&ldquo;` / `&rdquo;`
- No em/en dashes, no double hyphens (standing rule)
- Internal paths via `<Link href="/...">` — the `.guide-body a[href^="/"]`
  selector in `globals.css` styles them with the green underline

**Don'ts:**
- Never `Write` the whole content file mid-rollout. Always `Edit` so
  only the diff streams.
- Never re-read the research markdown every turn — it's already in
  conversation context from the first read.
- Never put more than one H2 section per turn, even for short ones.

**Research drop convention:** Eugen drops each guide's source research
into `_research/<slug>.md` matching the target slug in
`src/data/guides.ts`. First turn of a new guide: read that file once in
full, then work from in-context memory for every subsequent section
turn. The `_research/` folder is internal-only (not shipped to Netlify)
and is safe to delete before launch per `project-facts.md`.

## Pillar guide shipping checklist

When shipping a new pillar guide, everything the template needs is
already in `src/data/guides.ts`. Per-guide work:

1. Read `_research/<slug>.md`.
2. Append a new entry to `guides` in `src/data/guides.ts` filling every
   required field. Optional fields to populate for quality:
   - `howToSteps` + `howToTitle` (HowTo JSON-LD)
   - `featuredPullQuote` (hero card on /guides hub when this guide is
     newest)
   - `quickFacts`, `pullQuotes`, `relatedInternal`
3. Seed the content scaffold: add a new key to `guideContent` in
   `src/app/guides/[slug]/content.tsx` with the sentinel comment.
4. Append H2 sections via the sentinel loop above.
5. After the final section lands:
   - Add the slug to `public/llms.txt` under `## Pillar guides`.
   - Append a full AEO-block entry to `public/llms-full.txt`.
   - Add one reciprocal `<Link>` on the most relevant 3–5 pages (crop,
     service, regulation, tools) into the new guide.
   - If this guide replaces the "Latest guide" hero, the `/guides` hub
     updates automatically via `getLatestGuides(1)` + `featuredPullQuote`.
     The homepage featured-guide callout is hardcoded — update it when
     the featured slug changes.
6. Sitemap + JSON-LD cover the new guide automatically via
   `guides.map(...)` in `src/app/sitemap.ts` and the schemas in
   `src/app/guides/[slug]/page.tsx`.

## Guide ShareButtons

**Used on:** `src/app/guides/[slug]/page.tsx` (both places — under the Byline and above the print CTA).

Client component at `src/components/guides/ShareButtons.tsx` exposes X, LinkedIn, and copy-link with `role="group"`, per-button `aria-label`, live clipboard feedback (`Check` icon for 1.8s after copy). The `size` prop (`sm` default / `md`) swaps button padding; copy-link falls back to `document.execCommand('copy')` when `navigator.clipboard` is absent. Added in the 2026-04-24 year-round-revenue guide batch.

Always pass `url={absoluteUrl}` (the full `${SITE.domain}/guides/${guide.slug}` string, not the relative canonical) so X and LinkedIn share metadata correctly when their crawlers re-fetch the URL.

## Guide revenue / comparison table

Long-form numeric tables go inside a `<figure>` to get the `.guide-table-callout` card styling (bordered stone panel, zebra rows, sans-serif body, horizontal scroll on overflow). Always set `aria-label` on the figure describing what the table shows, and `scope="col"` on every `<th>` so screen readers announce column context. Pattern from guide 2 revenue table:

```tsx
<figure className="guide-table-callout" aria-label="Year 2 revenue model, solo operator">
  <table>
    <thead>
      <tr>
        <th scope="col">Service</th>
        <th scope="col">Days per year</th>
        <th scope="col">Rate</th>
        ...
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Liquid spray</td>
        <td>85</td>
        <td>$14 per acre</td>
        ...
      </tr>
      ...
      <tr>
        <td><strong>Total</strong></td>
        ...
        <td><strong>$420,500</strong></td>
      </tr>
    </tbody>
  </table>
</figure>
```

## Inline SVG charts for guide pages

**Used on:** `/guides/agricultural-drone-spraying-statistics-2026`.
Pattern: ship statistics visualizations as inline SVG React components,
not raster image files. Lives in `src/components/guides/StatsCharts.tsx`.

**Why:**
- Zero extra HTTP requests, ~1–2 KB per chart, no image-decode work
- Crisp at any DPI/zoom, print-friendly, no LCP penalty
- AEO-friendly: `<text>` nodes are readable by AI engines and screen readers
- Easy to brand-match (uses Tailwind palette directly)

**Required scaffolding per chart:**
- `viewBox`, `preserveAspectRatio="xMidYMid meet"`, `role="img"`
- `<title>` + `<desc>` referenced by `aria-labelledby`
- Real `<text>` for every value label, axis tick, source line — never
  embed text in raster
- Brand colors: green-700 `#15803d`, green-900 `#14532d`, green-500
  `#22c55e`, amber-700 `#b45309`, amber-400 `#fbbf24`, slate-500/700
  for neutrals, stone-200 `#e7e5e4` for gridlines

**Wrap in the existing `guide-figure` figure with a real figcaption** (no
"image slot N of 6" placeholder text — write the actual source attribution
in the figcaption).

**No `next/image`** for these — they are SVG, not raster, so they ship
as part of the HTML. Any single SVG over ~10 KB inlined should be split
or simplified.

## Template-level content enrichment via helper module

**Used on:** `/operators/[slug]` (PR-thin-profile uplift, 2026-05-02).

**Purpose:** lift sparse profile pages above Google's indexation
threshold without manual data entry on individual records. Every
helper composes copy or structured data from existing `src/data/*`
(operators, states, crops, regions, counties, services).

**Pattern:**

1. Pure helpers in `src/lib/<entity>-content.ts` — no JSX, no side
   effects. Return strings, structured data, or null when input is
   too thin to produce something useful.
2. Template imports helpers and renders new sections conditionally.
3. JSON-LD emitted inline via
   `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />`.

**For the operator template specifically (`src/lib/operator-content.ts`):**

- `composeAutoParagraph(operator)` — only fires when description
  word count < 30. Returns 2–3 factual sentences derived from
  services + states + crops + region + licensing agency.
- `getOperatorRegion(operator)` — prefers `states.ts.regionSlug`,
  falls back to `counties.ts.region` with a free-form-to-slug map
  (only the 4 regions that have a real `/regions/[slug]` page).
- `getCoveredStateContext(operator)` — joins counties + states.ts
  to surface licensingAgency + aerialCategory per covered state.
- `getCropPricingLines(operator)` — only when operator services
  'spraying' AND crops are listed. Pulls priceMinUsd/Max from
  `src/data/crops.ts`. Never defaults the operator's own price.
- `composeOperatorFAQs(operator)` — 2 FAQs: how to verify the
  operator's licensing in their primary state (interpolates the
  state agency name) and what their effective rate range
  typically includes/excludes.
- `operatorFAQSchema(faqs)` — FAQPage JSON-LD object.

**Why this beats manual data entry:** ~400 operator records would
otherwise need per-record copy. Template-level helpers lift every
profile uniformly, including future imports.

**Verified lift on three thin-profile canaries (2026-05-02):**

  lnp-ag-drone-spraying  40  -> 448 words
  sphex-ag               51  -> 462 words
  agronix                51  -> 495 words
  agriforce-drone        164 -> 735 words (rich profile, no regression)

## Commit message format

```
Short imperative subject line (≤72 chars)

Optional 2-3 line body explaining the why. Mention affected files or
batches. Follow existing repo tone (see `git log` for examples).
```

Never include Co-Authored-By lines unless user asks.
