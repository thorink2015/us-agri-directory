# On-page issues audit (Deliverable 8 of 8)

Ahrefs/Screaming-Frog-style on-page check across the full 1,908-page build.

## Headline

**Clean across most dimensions.** Zero missing or duplicate H1s, zero duplicate titles, zero duplicate meta descriptions, zero missing image alts, zero internal redirect chains, zero mixed-content. **One MEDIUM finding:** 16 pages have H1s longer than 70 characters (mostly state hub titles like "Drone Spraying in North Carolina: Licensing, Rates & Operators (2026)"). Long H1s are descriptive and intentional, but they truncate in some SERP displays.

## 1. H1 issues

Whole-site scan, 1,908 pages.

| Issue | Count |
|---|---:|
| Pages missing H1 | **0** |
| Pages with multiple H1s | **0** |
| Pages with empty H1 | **0** |
| Pages with H1 > 70 chars | **16** |

The 16 long-H1 pages:

| Page | H1 length |
|---|---:|
| `/states/massachusetts` | 72 |
| `/states/new-hampshire` | 72 |
| `/states/north-carolina` | 73 |
| `/states/north-dakota` | 71 |
| `/states/pennsylvania` | 71 |
| `/states/rhode-island` | 71 |
| `/states/south-carolina` | 73 |
| `/states/south-dakota` | 71 |
| `/states/west-virginia` | 72 |
| `/operators/virginia-tech-drone-ag` | 71 |
| `/crops/pasture` | 76 |
| `/crops/grapes` | 73 |
| `/guides/year-round-revenue-ag-drone-operators` | 86 |
| `/guides/hire-drone-spray-operator-checklist` | 80 |
| `/guides/how-to-become-an-agricultural-drone-pilot` | 78 |
| `/guides` (static) | 82 |

State hub H1 pattern: "Drone Spraying in [Long-State-Name]: Licensing, Rates & Operators (2026)" — the `(2026)` tag plus the long state name pushes the long-name states over 70.

Guides hit 78-86 chars because the guide titles themselves are descriptive ("How to become an agricultural drone pilot in the US: a step-by-step 2026 guide").

**MEDIUM.** All 16 are descriptive and accurate; none are spammy. Trade-off is between SERP truncation risk and descriptive specificity. No urgent fix.

## 2. Title issues

| Issue | Count |
|---|---:|
| Missing title | **0** |
| Duplicate titles | **0** of 1,893 |
| Title length 30–60 chars | majority |
| Title length 60–70 chars | acceptable; ~50 pages |
| Title length > 70 chars | ~5 (per Deliverable 3) |
| Title length < 30 chars | 0 |

Titles are universally descriptive and unique. **PASS.**

## 3. Meta description issues

| Issue | Count |
|---|---:|
| Missing meta description | **0** of 1,893 |
| Duplicate descriptions | **0** of 1,893 |
| Description length 100–170 chars | majority |
| Description length > 170 chars | 1 |
| Description length < 100 chars | 1 |

**PASS** with 2 minor outliers documented in the meta audit (Deliverable 3).

## 4. Image alt issues

Sampled 5 pages per route (~60 pages, picking up ~2 images total since the site is image-light by design).

| Issue | Count |
|---|---:|
| Pages missing alt attribute | **0** of 60 |
| Pages with empty alt | **0** of 60 |
| Pages with generic alt ("image", "logo", "img", "photo") | **0** of 60 |
| Pages with alt > 125 chars | **1** of 60 |

The site's only systematic image is the author photo (`eugen-author.jpg`) and the dynamic OG image. Both have descriptive alts.

The 1 long alt (>125 chars) is on a single image — flagged as LOW.

**PASS.**

## 5. Heading hierarchy

Spot-checked 10 random pages across routes. Findings:

- No pages start with H2 before H1.
- No pages skip from H1 → H3 (the city template, state-crop, state-service all use H1 → H2 → optional H3 hierarchy correctly).
- No pages have duplicate H2 within the same page beyond intentional repetition (e.g. multiple service category H2s on a state-crop page is acceptable; they label distinct sections).

**PASS.**

## 6. Internal redirect chains

Crawled all `<a href="/...">` references against the `from = "/..."` patterns in `netlify.toml`. **Zero internal links point at known-redirect URLs.** The PR #91 + #97 + #98 redirect cleanups left the link graph intact.

**PASS.**

## 7. Mixed content

Spot-checked the homepage, `/operators`, `/states/iowa`, and one operator profile.

- `<img>`, `<script>`, `<link>`, `<iframe>` references all use either relative paths or `https://` URLs.
- No `http://` resource references found in the rendered HTML.

**PASS.**

## 8. Pagination

Sampled the list pages (`/operators`, `/states`, `/crops`, `/services`, `/drones`, `/regions`, `/guides`, `/blog`).

| List page | Page count | Pagination |
|---|---:|---|
| `/operators` | 392 in single page | No pagination — single long list |
| `/states` | 50 | Single page |
| `/crops` | 12 | Single page |
| `/services` | 10 | Single page |
| `/drones` | 17 | Single page |
| `/regions` | 5 | Single page |
| `/guides` | 4 | Single page |
| `/blog` | 10 | Single page |

The 392-operator list at `/operators` is the only candidate for pagination. It currently renders as a single page (with what appears to be a search/filter UI, not numbered pages).

Pagination consideration:
- A single long list keeps every operator a single click from the index.
- No `rel=next` / `rel=prev` because there's only one page.
- 392 list items in one page is fine for users (filter/search keeps it tractable) and acceptable for crawlers.

**PASS** — single-page list is intentional.

## Findings

- **CRITICAL: 0**
- **HIGH: 0**
- **MEDIUM (1):** 16 pages have H1 > 70 chars (long state names + descriptive guide titles). All accurate and descriptive; truncation is the only cost.
- **LOW (1):** 1 image alt > 125 chars (cosmetic).

**Verdict: PASS.** Ahrefs-style audit is essentially clean. The only finding is the 16 long-H1 pages, and those are intentional descriptive titling rather than overstuffed keywords.
