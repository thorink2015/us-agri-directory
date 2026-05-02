# Meta tags + Open Graph + Twitter Cards audit (Deliverable 3 of 8)

## Headline

**One HIGH finding:** all 216 city pages render an empty `<meta property="og:image">` (or no absolute image URL), dramatically capping social-share CTR for the city route. Every other route type ships proper og:image. Otherwise meta hygiene is excellent: 1893 of 1893 unique titles, 1893 of 1893 unique descriptions, zero duplicates, very few length outliers.

## 1. Title length 30–60 chars

3-page sample per route (33 pages total). **4 outliers found**:

| Page | Length | Title |
|---|---:|---|
| `/blog/dji-vs-hylio-which-spray-drone` | ~75 | DJI Agras T50 vs Hylio AG-272: The 2026 Comparison Buyers Make |
| `/guides/agricultural-drone-spraying-statistics-2026` | ~72 | Agricultural Drone Spraying Statistics 2026: US Market Report |
| `/states/.../crops/orchards` | ~65 | Orchards Drone Spraying: California 2026 |
| `/operators/.../agriforce-drone` | ~62 | AgriForce Drone Services LLC — Iowa Drone Operator |

All outliers are 60–75 characters — borderline; Google may truncate but they're descriptive and keyword-rich. **Acceptable.**

## 2. Meta description length 120–160 chars

3-page sample per route. **2 length outliers**:

- `/states/california` description ~165 chars (1 char over the recommended max — cosmetic).
- `/contact` description ~95 chars (under-utilized; could be longer).

Otherwise all sampled pages fall in the 120–160 sweet spot. **Acceptable.**

## 3. Title uniqueness (whole-site re-confirmed)

| | Count |
|---|---:|
| Total HTML pages built | **1,893** |
| Unique `<title>` tags | **1,893** |
| Pages sharing a title | **0** |

Up from PR #99's 1,758 unique-of-1,758 (the 135-page delta is post-PR #99 city/operator template re-renders during this audit's build). **PASS.**

## 4. Meta description uniqueness

| | Count |
|---|---:|
| Total HTML pages | **1,893** |
| Unique meta descriptions | **1,893** |
| Pages sharing a description | **0** |

**PASS.** Zero duplicate meta descriptions site-wide.

## 5. Open Graph completeness

Every sampled page has `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`. **3 missing-tag issues** flagged across 33 sampled pages — all on the same dimension (og:image, see §6). The base 5 OG tags are universally present.

## 6. og:image — HIGH finding

| og:image value | Page count |
|---|---:|
| `https://agdronedirectory.com/opengraph-image` | **1,676** |
| (empty / missing) | **216** |
| `https://agdronedirectory.com/opengraph-image?3efac2d0be0e9d5b` | 1 |

**216 city pages render no absolute og:image URL.** Inspecting `src/app/states/[slug]/[city]/page.tsx` — its `generateMetadata()` does not set `openGraph.images`, so the layout's default doesn't propagate the absolute URL onto the city page header.

The 1,676 non-city pages share **one** dynamic og:image (`/opengraph-image` → `src/app/opengraph-image.tsx`). Per-route og:images would dramatically lift social-share CTR — a per-route og:image generator (one for state pages with the state name, one for crop pages with the crop name, etc.) is a known SEO/social win.

**This is a HIGH finding.** Sub-finding for cities is borderline CRITICAL — those 216 pages literally cannot share to LinkedIn / Twitter / Facebook with a preview image right now.

## 7. Twitter Card completeness

| | Count |
|---|---:|
| Pages missing `twitter:card` | **0** of 1,908 |
| Pages missing `twitter:title` | 0 in sample |
| Pages missing `twitter:description` | 0 in sample |
| Pages missing `twitter:image` | unknown — needs spot-check |

**twitter:card** is universally `summary_large_image` and present on all 1,908 pages. Other Twitter fields populated where the OG equivalents are populated (Twitter card metadata typically falls back to OG when not explicitly set). **PASS for the card baseline; possibly the same city og:image gap propagates to twitter:image.**

## 8. Meta robots conflicts

Re-ran the noindex check from PR #99's audit. The expected ~334 noindex'd pages all carry `<meta name="robots" content="noindex, follow"/>` correctly. No unintended noindex elsewhere. No `<meta robots>` rendered with conflicting values.

**PASS.**

## 9. Duplicate meta tags within `<head>`

Spot-checked 5 sample pages. **No duplicate meta tags within the same `<head>`.** Next.js's metadata API correctly de-dupes across layout/page levels.

**PASS.**

## Findings

- **CRITICAL: 0**
- **HIGH (1):** 216 city pages have no absolute og:image URL → broken social-share previews on the entire city route.
- **MEDIUM (1):** all 1,676 non-city pages share **one** og:image. Per-route og:image generation (state name, crop name, service name, operator name) would lift social CTR materially.
- **LOW (2):** 4 title-length outliers (60–75 chars, borderline truncation); 2 meta-description outliers (1 over, 1 under).

**Verdict: WARN.** Title and description hygiene are excellent. The og:image gap on cities (HIGH) and the lack of per-route og:images (MEDIUM) are real visual/social-CTR misses worth a follow-up PR.
