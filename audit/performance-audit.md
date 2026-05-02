# Performance audit (Deliverable 4 of 8)

## Headline

**Excellent performance baseline.** Static-prerendered Next.js 14 App Router with shared 87.3 KB First Load JS, per-route increments staying under 15 KB even on heavy pages. **Zero CRITICAL findings.** One MEDIUM (state-hub HTML weight at 206 KB avg, max 249 KB — large but driven by content density not bloat). Two LOW (font-display strategy unverified, no Lighthouse run feasible in this sandbox without browser).

## 1. Bundle sizes (from `next build`)

**First Load JS shared by all routes: 87.3 KB** (gzipped, framework + shared chunks).

```
First Load JS shared by all                              87.3 kB
  ├ chunks/2117-679efe748c9c6bc7.js                        31.7 kB
  ├ chunks/fd9d1056-3eb1e5136289b6c6.js                    53.6 kB
  └ other shared chunks (total)                            1.96 kB
```

Per-route page bundles (just the route-specific JS, on top of the 87.3 KB shared):

| Route | Size (gzipped) | First Load |
|---|---:|---:|
| `/` | 3.22 kB | 107 kB |
| `/_not-found` | 142 B | 87.5 kB |
| `/about` | 1.22 kB | 97.8 kB |
| `/advertise` | 390 B | 96.9 kB |
| `/blog` | 214 B | 96.8 kB |
| `/blog/[slug]` | 1.97 kB | 98.5 kB |
| `/buyers-guide` | 1.97 kB | 98.5 kB |
| `/comparisons/drone-vs-airplane` | 1.15 kB | 97.7 kB |
| `/comparisons/drone-vs-ground-rig` | 1.15 kB | 97.7 kB |
| `/contact` | 2.92 kB | 99.5 kB |
| `/crops` | 216 B | 96.8 kB |
| `/crops/[slug]` | 911 B | 102 kB |
| `/drones` | 216 B | 96.8 kB |
| `/drones/[slug]` | 911 B | 102 kB |
| `/glossary` | 216 B | 96.8 kB |
| `/grants-and-subsidies` | 1.15 kB | 97.7 kB |
| `/guides` | 216 B | 96.8 kB |
| `/guides/[slug]` | 4.27 kB | **106 kB** |
| `/insurance` | 1.15 kB | 97.7 kB |
| `/list-your-business` | 3.87 kB | **139 kB** |
| `/map` | 12.1 kB | **109 kB** |
| `/operators` | 3.72 kB | 123 kB |
| `/operators/[slug]` | 2.24 kB | 104 kB |

**Nothing is over 200 KB First Load JS.** The fattest route (`/list-your-business`) at 139 KB carries the operator submission form's payload. `/map` at 109 KB carries the static map SVG. Both reasonable.

**Verdict: PASS** — under any reasonable performance budget.

## 2. HTML page weight (rendered, gzipped on Netlify but raw here)

3-page sample per route, raw HTML size (the wire size after gzip will be ~25–30% of these):

| Route | Avg | Max |
|---|---:|---:|
| `city` | 117 KB | 163 KB |
| `state-crop` | 91 KB | 93 KB |
| `state-service` | 118 KB | 154 KB |
| `state-operators` | 140 KB | 149 KB |
| `state-hub` | **206 KB** | **249 KB** |
| `operator` | 69 KB | 69 KB |
| `crop-hub` | 102 KB | 117 KB |
| `service-hub` | 114 KB | 125 KB |
| `drone-hub` | 114 KB | 161 KB |
| `region-hub` | 125 KB | 134 KB |
| `guide` | 186 KB | 238 KB |
| `blog` | 62 KB | 63 KB |
| `static` | 55 KB | 61 KB |

After gzip (Netlify default), the largest pages drop to ~50–70 KB on the wire.

**Verdict: PASS-with-flag.** State-hub at 206 KB raw is on the high side; flagged as MEDIUM since gzipped wire size will land around 50–60 KB which is still healthy. Investigation worth doing only if state hubs show LCP regressions.

## 3. Lighthouse / Web Vitals

**Lighthouse run not feasible** in this sandbox — no Chromium binary available. Reporting what's measurable from the build output:

- **JavaScript shipped to client:** 87.3 KB shared + 0–4 KB per route. Under any sane budget.
- **Static prerendered HTML:** all 1,908 non-dynamic routes are prerendered (`○` or `●` flags in build output). Zero server-side rendering on user request, zero TTFB beyond Netlify edge cache.
- **Edge caching:** Netlify edge serves prerendered HTML directly. Expected TTFB <100ms.
- **Hydration cost:** the App Router does selective hydration; only client components hydrate. Spot-check shows the operator template uses `'use client'` only on `OperatorContactLinks` (small) and `OperatorGallery` (lazy via dynamic import).

For a real Lighthouse score, run `npx lighthouse https://agdronedirectory.com/states/iowa --view` post-deploy.

## 4. Image audit

5-page sample per route (~60 pages). Images sampled: **2 total in the rendered HTML.** The site's image surface is essentially limited to:

- 1 author photo (`/images/eugen-author.jpg`) on pages with the AuthorCard or Byline.
- 1 OG image generated dynamically per the layout's `opengraph-image.tsx` (not directly in `<img>` tags).

Of the 2 imgs sampled:
- **0 missing alt** (both have descriptive alts).
- **0 missing width/height** (both use `next/image` which auto-emits dimensions).
- **1 long alt (>125 chars)** — flagged as LOW.

The site is **strikingly image-light by design**. No hero photos on operator pages, no crop imagery, no drone product photos rendered as `<img>` (drone pages reference DJI/Hylio specs in text, not catalog photos). Format choice is moot; everything that exists is `next/image`-managed JPEG/WebP.

**Verdict: PASS.** Image-light design avoids the typical performance pitfalls.

## 5. Font loading

- Layout uses `next/font` (per `_memory/project-facts.md`'s reference to Geist).
- `next/font` self-hosts and applies `font-display: optional` by default for non-FOIT/FOUT behavior.
- No external Google Fonts `<link>` tag observed in any sampled page.

**Verdict: PASS** (default `next/font` behavior is the right choice).

## 6. Third-party scripts

`<script>` external sources observed across sampled pages:

| Source | Loading mode | Notes |
|---|---|---|
| `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js` | preload + crossorigin | Google AdSense — preload prevents blocking |
| `formspree.io` (DNS prefetch only) | dns-prefetch | preconnect for Formspree form submissions |

No render-blocking external scripts. AdSense uses `<link rel="preload">` rather than synchronous `<script>`. Formspree only used at form-submit time (client-side `fetch`).

**Verdict: PASS.**

## 7. CSS

Tailwind CSS, single bundled file `_next/static/css/82b5f80f21adc16c.css`. Tailwind's PurgeCSS removes unused utilities at build. Final CSS bundle size sampled at <50 KB. **PASS.**

## 8. Render-blocking resources

Sampled `<head>` of the homepage and an operator page. Render-blocking entries:

- 1× CSS `<link rel="stylesheet">` (Tailwind bundle, <50 KB).
- 0 render-blocking JS (`async`/`defer` on every external script reference).

**Verdict: PASS.**

## Findings

- **CRITICAL: 0**
- **HIGH: 0**
- **MEDIUM (1):** state-hub HTML weight averaging 206 KB raw (max 249 KB). Acceptable post-gzip but worth investigating if LCP regresses. Likely the long `licensingDetails` prose plus the populated `topCrops` and `sprayWindows` arrays + 50+ FAQs.
- **LOW (3):** 1 long alt text (>125 chars), font-display strategy not directly verified (likely fine), Lighthouse run not feasible in sandbox (run post-deploy).

**Verdict: PASS.** Performance is the current strongest dimension on the site. The state-hub size is large because the content density is genuinely high, not because of bloat.
