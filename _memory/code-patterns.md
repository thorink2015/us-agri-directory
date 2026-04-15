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

## Commit message format

```
Short imperative subject line (≤72 chars)

Optional 2-3 line body explaining the why. Mention affected files or
batches. Follow existing repo tone (see `git log` for examples).
```

Never include Co-Authored-By lines unless user asks.
