# CLAUDE.md — Master Documentation for droneagricol.ro

This file is the single source of truth for Claude Code sessions working on this project.
Read this file at the start of every session before making any changes.

---

## Project Overview

**droneagricol.ro** — the most complete directory of agricultural drone operators in Romania and Moldova.

- **Framework:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Deployment:** Netlify (branch: `claude/build-agri-drone-directory-K8coy`)
- **Language:** Romanian only (structure ready for /ru/ and /en/ later)
- **Data:** TypeScript files in `src/data/` — no database, no CMS
- **Analytics:** Google Analytics 4 (env: `NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- **Forms:** Formspree (env: `NEXT_PUBLIC_FORMSPREE_ID`)

---

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout: GA4, OG meta, Header/Footer
│   ├── page.tsx                      # Homepage
│   ├── operatori/
│   │   ├── page.tsx                  # Server wrapper (passes data to client)
│   │   ├── OperatoriClient.tsx       # Client: search + advanced filters + sort
│   │   └── [slug]/page.tsx           # Operator profile
│   ├── judete/
│   │   ├── page.tsx                  # All 41 counties grouped by region
│   │   └── [slug]/
│   │       ├── page.tsx              # County detail (41 pages)
│   │       ├── operatori/page.tsx    # Operators in county
│   │       ├── culturi/[crop]/page.tsx    # County + crop (41×8=328 pages)
│   │       └── servicii/[service]/page.tsx # County + service (41×6=246 pages)
│   ├── culturi/
│   │   ├── page.tsx                  # All 8 crops
│   │   └── [slug]/page.tsx           # Crop detail
│   ├── servicii/
│   │   ├── page.tsx                  # All services hub
│   │   └── [slug]/page.tsx           # Service detail (6 pages)
│   ├── drone/
│   │   ├── page.tsx                  # All drone models
│   │   └── [slug]/page.tsx           # Drone model detail (5 pages)
│   ├── orase/[slug]/page.tsx         # City pages (~20 pages)
│   ├── regiuni-viticole/
│   │   ├── page.tsx                  # Wine regions hub
│   │   └── [slug]/page.tsx           # Wine region detail (6 pages)
│   ├── moldova/
│   │   ├── page.tsx                  # Moldova hub
│   │   └── [slug]/page.tsx           # Moldova regions (8 pages)
│   ├── preturi-pulverizare-drona/page.tsx  # Pricing guide
│   ├── adauga-operator/              # Submission form
│   ├── despre/page.tsx
│   ├── contact/page.tsx
│   ├── sitemap.ts                    # ~742 URLs auto-generated
│   └── robots.ts                    # Allows AI crawlers
├── components/
│   ├── analytics/
│   │   ├── GoogleAnalytics.tsx       # GA4 Script injection
│   │   └── events.ts                 # trackEvent() helpers
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Breadcrumb.tsx
│   ├── operators/
│   │   ├── OperatorCard.tsx          # Card with UTM link on website icon
│   │   └── OperatorGrid.tsx
│   ├── counties/
│   │   └── CountyCard.tsx
│   ├── search/
│   │   └── SearchBar.tsx
│   ├── schema/
│   │   ├── OperatorSchema.tsx        # LocalBusiness JSON-LD
│   │   ├── CountyPageSchema.tsx      # CollectionPage + ItemList JSON-LD
│   │   └── HomeSchema.tsx            # Organization + WebSite JSON-LD
│   └── ui/
│       ├── FAQAccordion.tsx
│       └── ExternalLink.tsx          # UTM-tracked external link component
├── data/
│   ├── types.ts                      # All TypeScript interfaces
│   ├── operators.ts                  # 23 operators (19 RO + 4 MD)
│   ├── counties.ts                   # 41 Romanian counties
│   ├── crops.ts                      # 8 crop types
│   ├── services.ts                   # 6 service definitions
│   ├── drone-models.ts               # 5 drone models
│   ├── cities.ts                     # 20 major cities
│   ├── wine-regions.ts               # 6 Romanian wine regions
│   ├── regions-moldova.ts            # 8 Moldova regions
│   └── faqs.ts                       # FAQ content arrays
└── lib/
    ├── utils.ts                      # cn(), formatPrice(), addUtmParams()
    └── seo.ts                        # buildOperatorMetadata(), buildCountyMetadata()
```

---

## How to Add a New Operator

Edit `src/data/operators.ts` and add an entry to the `operators` array:

```typescript
{
  slug: 'company-slug',           // REQUIRED: lowercase, hyphens, no diacritics
  name: 'Company Name SRL',       // REQUIRED: full legal name
  description: '...',             // REQUIRED: 1–3 sentences, max 300 chars
  country: 'RO',                  // REQUIRED: 'RO' or 'MD'
  counties: ['timis', 'arad'],    // REQUIRED: array of county slugs they cover
  city: 'Timișoara',              // REQUIRED: city name (with diacritics)
  phone: '+40 722 123 456',       // optional
  email: 'contact@example.com',  // optional
  website: 'https://example.com', // optional — UTM params auto-added
  facebook: 'https://facebook.com/page', // optional
  services: ['spraying', 'monitoring'], // REQUIRED: see ServiceType in types.ts
  drones: ['dji-agras-t50'],      // optional: see drone-models.ts for slugs
  crops: ['grau', 'porumb'],      // optional: see crops.ts for slugs
  priceMinRon: 80,                // optional
  priceMaxRon: 120,               // optional
  haTreated: 5000,                // optional: cumulative hectares treated
  fleetSize: 3,                   // optional: number of drones
  verified: true,                 // optional: show verified badge
  featured: false,                // optional: appears first in listings
  certAACR: true,                 // optional: AACR authorization
}
```

**After adding:** Run `npm run build` to verify no TypeScript errors.

---

## How to Add a New County (if Romania adds a county)

Edit `src/data/counties.ts` — add to the `counties` array. The county will automatically appear on:
- `/judete/` (all counties page)
- `/judete/[slug]/` (county detail)
- All 328 county+crop pages
- All 246 county+service pages
- Sitemap

---

## UTM Tracking

All outbound links to operator websites automatically get UTM parameters via `addUtmParams()` in `src/lib/utils.ts`:

```
utm_source=droneagricol.ro
utm_medium=directory
utm_campaign=operator-listing
utm_content=[operator-slug]
```

**To check traffic sent:** Google Analytics → Reports → Traffic Acquisition → filter by Source = `droneagricol.ro`

The `ExternalLink` component (`src/components/ui/ExternalLink.tsx`) also fires a GA4 `operator_website_click` event.

---

## Analytics Events

Tracked in `src/components/analytics/events.ts`:

| Event | Trigger | Parameters |
|-------|---------|------------|
| `operator_website_click` | Click external website link | operator_slug, source |
| `operator_phone_click` | Click phone number | operator_slug |
| `operator_email_click` | Click email | operator_slug |
| `form_submit` | Submit operator addition form | form_name |
| `filter_applied` | Apply filter on /operatori | filter_type, filter_value |
| `county_search` | Search by county in hero | county_slug |

---

## SEO Architecture

### URL structure (742+ pages)
- `/` — Homepage (priority 1.0)
- `/operatori/` — All operators (priority 0.9)
- `/preturi-pulverizare-drona/` — Pricing page (priority 0.9)
- `/operatori/[slug]/` — Operator profiles (priority 0.85)
- `/judete/[slug]/` — County pages (priority 0.85)
- `/judete/[slug]/culturi/[crop]/` — County+crop (328 pages, priority 0.7)
- `/judete/[slug]/servicii/[service]/` — County+service (246 pages, priority 0.7)
- `/culturi/[slug]/` — Crop pages (priority 0.8)
- `/servicii/[slug]/` — Service pages (priority 0.75)
- `/regiuni-viticole/[slug]/` — Wine regions (priority 0.72)
- `/orase/[slug]/` — City pages (priority 0.7)
- `/moldova/[slug]/` — Moldova regions (priority 0.75)
- `/drone/[slug]/` — Drone model pages (priority 0.65)

### Schema markup
- Homepage: `Organization` + `WebSite`
- County pages: `CollectionPage` + `ItemList` + `BreadcrumbList` + `FAQPage`
- Operator profiles: `ProfessionalService` + `BreadcrumbList`
- Pricing page: `FAQPage` embedded

---

## Deployment (Netlify)

1. Push to branch `claude/build-agri-drone-directory-K8coy`
2. Netlify auto-deploys via `@netlify/plugin-nextjs` (see `netlify.toml`)
3. Build command: `npm run build`
4. Publish directory: `.next`

**Environment variables to set in Netlify dashboard:**
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4 measurement ID
- `NEXT_PUBLIC_FORMSPREE_ID` — Formspree form ID

---

## Development Commands

```bash
npm run dev       # Start dev server on http://localhost:3000
npm run build     # Production build (generates all static pages)
npm run lint      # ESLint check
```

---

## Branch

**Always develop on:** `claude/build-agri-drone-directory-K8coy`
**Push command:** `git push -u origin claude/build-agri-drone-directory-K8coy`

---

## Common Issues & Solutions

| Issue | Solution |
|-------|---------|
| Build fails with TypeScript errors | Check `src/data/types.ts` — all ServiceType values must match |
| New county not appearing | Verify slug matches exactly in both counties.ts and operator.counties[] |
| UTM not appearing on links | Use `ExternalLink` component or call `addUtmParams()` directly |
| GA4 not firing | Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in Netlify env vars |
| Formspree form not working | Set `NEXT_PUBLIC_FORMSPREE_ID` in Netlify env vars |
| Sitemap missing pages | Update `src/app/sitemap.ts` — import new data source and add to return array |

---

*Last updated: Session on claude/build-agri-drone-directory-K8coy*
