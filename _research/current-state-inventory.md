# Current-state inventory — agdronedirectory.com

_Last audited: 2026-04-20. Paste this into any new Claude session so the
assistant knows what's already live vs. still to build. Companion to
`MASTER-PLAN.md` + `TACTICAL-APPENDIX.md`._

## Site at a glance

- **Domain:** `https://agdronedirectory.com` (Netlify, Next.js 14 App Router + TypeScript + Tailwind)
- **Working branch:** `claude/add-drone-operators-directory-T0YnN` — never push elsewhere without approval; `main` holds the old Romanian code
- **Data model:** TypeScript files in `src/data/`, no database, no CMS
- **Static pages generated:** ~1,200+ (sitemap covers operators, states, state×crop, state×service, blogs, guides, crops, services, drones, regions, static pages)
- **Analytics:** GA4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`); Search Console, Bing (via GSC import), Yandex verified; Ahrefs WMT registered
- **IndexNow:** Netlify plugin auto-pings every production deploy (last run: 1,130 URLs, HTTP 200)
- **robots.txt:** explicit allowlist for 27 crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, xAI, Mistral, Applebot-Extended, etc.)

## Data tables (counts as of this audit)

| File | Records | Notes |
|---|---|---|
| `src/data/operators.ts` | **391** | FAA 107/137 flags, DJI/Hylio/XAG/NDAA flags, lat/lng, `logoUrl` field exists but almost always empty |
| `src/data/states.ts` | 59 | IA, TX, CA are the 3 "proof states" with rich data; other 47 fall back to counties-based template (blocked on `research-03-state-licensing.md`) |
| `src/data/counties.ts` | 84 | Lat/lng + ag acres |
| `src/data/regions.ts` | 5 | Corn Belt, Great Plains, Delta, California, Southeast |
| `src/data/crops.ts` | 8 | Corn, soy, wheat, rice, grapes, cover crops, alfalfa, citrus |
| `src/data/services.ts` | 10 | Spraying, spreading, monitoring, mapping, training, rental, sales, seeding, consultancy, emergency |
| `src/data/drone-model.ts` | 8 | DJI T25P/T50/T100, Hylio AG-272, XAG, ADT Falcon, LEAT |
| `src/data/glossary.ts` | 61 | A–Z with `relatedLink` internals |
| `src/data/blog-posts.ts` | **11** | All shipped; Master Plan's "publish posts 6–10" is DONE |
| `src/data/faqs.ts` | 14 | |
| `src/data/guides.ts` | 5+ | Content under `/guides` |
| `src/data/author.ts` | 1 | Canonical Eugen bio — placeholders still open: `{{LAST_NAME}}`, `{{LINKEDIN_URL}}`, `{{X_URL}}`, `{{COUNTRY_REGION}}`, `{{FIELD_OF_STUDY}}`, `/public/images/eugen-author.jpg` (avatar fallback active) |

## Routes shipped (45 `page.tsx` files)

- `/`, `/about`, `/contact`, `/pricing`, `/list-your-business`, `/glossary`, `/privacy`, `/terms`
- `/operators`, `/operators/[slug]` (391 profiles)
- `/states`, `/states/[slug]` (59), `/states/[slug]/operators`, `/states/[slug]/crops/[crop]` (~472), `/states/[slug]/services/[service]` (~500+)
- `/crops`, `/crops/[slug]` (8)
- `/services`, `/services/[slug]` (10)
- `/drones`, `/drones/[slug]` (8)
- `/regions`, `/regions/[slug]` (5)
- `/blog`, `/blog/[slug]` (11)
- `/guides`, `/guides/[slug]` (5+)
- `/tools` + 6 calculators: `spray-cost-calculator`, `roi-calculator`, `coverage-calculator`, `acreage-converter`, `drone-comparison`, `treatment-calendar`
- `/regulations`, `/faa-part-107`, `/faa-part-137`, `/state-licensing`, `/ndaa-compliance`
- `/comparisons/drone-vs-ground-rig`, `/comparisons/drone-vs-airplane`
- `/grants-and-subsidies`, `/insurance`, `/training-and-certification`, `/buyers-guide`, `/start-a-drone-business`

**Not shipped:** `/states/[slug]/[city]` (no city-level pages at all).

## Blog posts live (11)

1. `corn-fungicide-drone-spraying-guide`
2. `faa-part-137-drone-guide`
3. `cover-crop-seeding-drone-guide`
4. `dji-vs-hylio-which-spray-drone`
5. `drone-spraying-state-license-guide`
6. `drone-spraying-pricing-trends-2026`
7. `ndaa-chinese-drones-what-farmers-need-to-know`
8. `drone-spraying-rice-guide`
9. `vineyard-drone-spraying-guide`
10. `first-1000-acres-drone-operator`
11. `drone-spraying-corn-soybeans`

## Schema stack (JSON-LD)

**Emitted:** Organization, Person (Eugen via `author.ts`), WebSite (homepage), ProfessionalService (operator profiles via `OperatorSchema.tsx`), LocalBusiness (county/state pages via `CountyPageSchema.tsx`), PostalAddress, GeoCoordinates, Article (blog + crop + service + region pages per memory — needs a quick re-verify across every page), BreadcrumbList (blog, state, about, contact, list-your-business confirmed; not yet sitewide), FAQPage (blog + crops + services + about + list-your-business), SoftwareApplication (all 6 tool pages), DefinedTermSet (glossary).

**Missing / not emitted:** AggregateRating, Review, Offer, GeoShape (`areaServed` with polygon), Person bylines with per-article `author` resolved to Person `@id` (may already be done — needs verify).

## SEO infra

- `sitemap.ts` — dynamic, ~1,200 URLs
- `robots.ts` — 27-crawler allowlist
- IndexNow — Netlify plugin, auto-pings on deploy, key `199aa73a01c74f6786948b45aaec2d17`
- `llms.txt` — **PRESENT BUT BROKEN** — still contains Romanian TerraDron.ro content (23 RO operators, old domain). Feeding LLMs the wrong signal right now.
- `llms-full.txt` — NOT present
- AEO answer blocks — live on crops, services, regions, state-proof pages, all 6 tools, about, list-your-business, homepage; not audited on every hub

## Monetization / revenue infra

- **Stripe:** not wired. No `stripe`, `checkout`, `subscribe` code anywhere.
- **Pricing page:** `/pricing` exists but is informational — no CTA to a paid plan, no Checkout button.
- **AdSense:** registered externally, not installed in code.
- **Affiliate links:** none (Pilot Institute, DPGS, SkyWatch not installed).
- **Newsletter:** footer signup posts to **Formspree only** (`NEXT_PUBLIC_FORMSPREE_ID`). No Loops / beehiiv / Resend / Mailchimp. No `/newsletter` page.
- **Contact / List-your-business forms:** both Formspree, no backend.
- **Claim-your-listing:** does not exist as a distinct flow. `/list-your-business` is only a public submission form, no claim-token, no admin dashboard, no auth.

## Verification + trust

Operator fields include `verified`, `certFAAPart107`, `certFAAPart137`, `djiCert`, `xagCert`, `hylioCert`, `ndaaCompliant`, `iso9001` — but these are just **booleans with no badge UI component**. No insurance upload, no FAA registry lookup, no Stripe Identity, no expiry cron.

## Reviews

None. No review data model in `types.ts`, no UI, no AggregateRating schema, no ratings field on operators.

## Maps / quote tools

No Mapbox, no Leaflet, no turf.js, no polygon draw, no US map, no USDA Cropland Data Layer integration. Operators have lat/lng but no map renders them.

## AI features

None. No chatbot, no embeddings, no Pinecone / pgvector, no Voyage AI, no "find my operator" matching. Only basic filter-by-state/service on `/operators`.

## Analytics attribution

GA4 installed. No special Perplexity / ChatGPT / Claude / Gemini / Copilot referral filter or custom event.

## Netlify / build

- `netlify.toml` — Node 20, `@netlify/plugin-nextjs`, IndexNow plugin, cache + security headers, www → apex redirect
- No Netlify Functions, no scheduled/cron tasks, no FAA or state-registry scraper

## Env vars referenced in code

- `NEXT_PUBLIC_FORMSPREE_ID`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — declared, not yet set (Plausible swap pending)

## Deviations from Master Plan's "not live" list (corrections)

| Master Plan said "not live" | Actual state |
|---|---|
| 10 blog posts outstanding | **11 live** — Tier 1 #10 already done |
| llms.txt not live | **Present but stale (Romanian)** — needs replacement, not creation |
| Chemical supplier data on state pages | Confirmed not live |
| City-level pages | Confirmed not live |
| Visual US map | Confirmed not live |
| Verification badge stack | Fields exist as bools, no UI — effectively not live |
| Newsletter sending | Formspree-only — effectively not live |
| Paid Stripe tier | Confirmed not live |
| Claim-your-listing flow | Confirmed not live |
| Satellite polygon quote tool | Confirmed not live |
| FAA + state scraper | Confirmed not live |
| Verified reviews | Confirmed not live |
| Rate benchmark database | Confirmed not live |
| AI matching chatbot | Confirmed not live |
| Operator photos on cards | `logoUrl` field exists, almost always empty |
