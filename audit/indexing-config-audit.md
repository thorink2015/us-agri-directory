# Indexing config audit (Deliverable 2 of 8)

## Headline

**One CRITICAL finding:** the dynamic sitemap (`src/app/sitemap.ts`) ships **1,903 URLs without filtering out any of the noindex-gated pages from PRs #94 / #96 / #97 / #98 / #99**. ~325 noindex'd pages are being submitted to Google as crawl-priority URLs while the page itself signals `noindex,follow`. That's wasted crawl budget and conflicting signal at scale.

Everything else PASSES.

## 1. robots.txt

`src/app/robots.ts` (full content):

- `userAgent: '*'` allows `/`, disallows `/_memory/`, `/_research/`, `/_handoff/`, `/api/`, `/go/`. Correct.
- Explicit allow rules for **27 named AI/search crawlers** (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Google-Extended, Googlebot, Googlebot-Image, anthropic-ai, Claude-Web, ClaudeBot, cohere-ai, CCBot, Diffbot, Applebot, Applebot-Extended, Bytespider, YouBot, meta-externalagent, FacebookBot, Amazonbot, Bingbot, DuckDuckBot, MistralAI-User, xAI-Bot, Grok, Timpibot).
- Sitemap URL: `https://agdronedirectory.com/sitemap.xml`. Correct.
- `/go/` (affiliate redirects) correctly disallowed.

**Verdict: PASS.** Comprehensive crawler allowlist; nothing blocked that shouldn't be.

## 2. Sitemap

### Findings

- **Total URLs in sitemap: 1,903.** Total built static HTML pages: **1,908**. The 5-page gap is roughly the difference between dynamic icon endpoints (`/icon`, `/apple-icon`) and a handful of routes that aren't in the sitemap generator.
- Every sitemap entry includes `lastModified`, `changeFrequency`, `priority`. Schema correct.
- `/regions/delta` correctly absent (it's a Netlify 301 redirect, not a built page).

### CRITICAL: noindex pages still in sitemap

Spot-checked 4 known-noindex URLs from prior PRs against the sitemap:

| URL | In sitemap? | Source PR |
|---|:-:|---|
| `/regions/delta` | ❌ no | PR #91 (correct — redirect, not a page) |
| `/states/alaska/services/emergency` | ✅ **yes** | PR #96 (state-service, 224 noindex'd) |
| `/states/nevada/operators` | ✅ **yes** | PR #97 (9 thin state-operators pages) |
| `/states/alaska/palmer` | ✅ **yes** | PR #98 (1 noindex'd seeded city) |
| `/operators/applied-ag` | ✅ **yes** | PR #99 (1 ultra-thin operator) |

Estimated total noindex pages currently in the sitemap:

| Source PR | Noindex page count |
|---|---:|
| PR #94 (state-crop weak combos) | 99 |
| PR #96 (state-service weak combos) | 224 |
| PR #97 (thin state-operators) | 9 |
| PR #98 (seeded city in 1-op state) | 1 |
| PR #99 (ultra-thin operators) | 1 |
| **Total** | **~334** |

**~17.5% of sitemap URLs are pages we tell Google not to index.** Fix is a single helper call inside `generateSitemap()` that filters out URLs where the metadata returns `robots.index === false`. Trivial implementation; high impact.

**Verdict: FAIL on this single dimension; PASS on every other sitemap-config check.**

### Other sitemap observations

- `lastModified` is set to `new Date()` (build time) for all entries. Acceptable but suboptimal — a future change could timestamp per-entity-data `lastReviewedAt` field where it exists.
- Audit/orphan pages (`/_memory/...`, `/_research/...`, `/_handoff/...`) correctly absent.

## 3. IndexNow

- **Plugin location:** `netlify/plugins/indexnow/`. Confirmed in repo.
- **Trigger:** runs `onSuccess` after every Netlify production deploy.
- **Engines pinged:** the IndexNow protocol fans out to all participating engines (Bing, Yandex, Naver, IndexNow, Seznam) from a single ping URL. The plugin pings `https://api.indexnow.org/IndexNow` which propagates to all participants.
- **Last successful ping date:** per `_memory/project-facts.md` last verified result was 1,130 URLs / HTTP 200 / 2026-04-16. With the post-PR #99 site at 1,903 URLs, the next deploy will resubmit a substantially larger set.
- **Key file:** `/public/199aa73a01c74f6786948b45aaec2d17.txt` (PR #94+ confirmed clean).

**Verdict: PASS.**

## 4. Canonicals

5-page sample per route type (60+ URLs spot-checked):

- All sampled pages emit `<link rel="canonical" href="https://agdronedirectory.com/...">`.
- Every canonical points at `agdronedirectory.com` (no `www.` subdomain).
- Trailing slash policy is consistent across the site (no trailing slash on canonicals).
- **Zero canonical issues found across the sample.**

**Verdict: PASS.**

## 5. hreflang

Spot-checked the homepage, an operator page, a city page, a state-crop page, a guide. **Zero `<link rel="alternate" hreflang="...">` tags rendered.** Consistent with the site's US-only intent. No accidental rendering of wrong values.

**Verdict: PASS.**

## 6. Trailing slash policy

Checked canonical URLs and internal `<a href>` patterns. Site-wide convention: **no trailing slash on routes**. Internal links never append a trailing slash (`/operators/agronix`, not `/operators/agronix/`). Canonical URLs match. No mixed-slash duplication risk.

**Verdict: PASS.**

## 7. www vs apex

`netlify.toml` ships:

```
[[redirects]]
  from = "https://www.agdronedirectory.com/*"
  to = "https://agdronedirectory.com/:splat"
  status = 301
  force = true

[[redirects]]
  from = "http://www.agdronedirectory.com/*"
  to = "https://agdronedirectory.com/:splat"
  status = 301
  force = true

[[redirects]]
  from = "http://agdronedirectory.com/*"
  to = "https://agdronedirectory.com/:splat"
  status = 301
  force = true
```

All three force-301 to apex HTTPS. **Verdict: PASS.**

## Findings

- **CRITICAL (1):** sitemap submits ~334 noindex'd pages to search engines. Filter `MetadataRoute.Sitemap` entries by metadata `robots.index === false`.
- **HIGH: 0**
- **MEDIUM (1):** sitemap `lastModified` is build time across all routes, not per-entity. Not a blocker, but per-entity timestamps from `lastReviewedAt` fields would improve Google's recrawl prioritization.
- **LOW: 0**

**Verdict: FAIL** on the sitemap-noindex dimension; PASS on robots, IndexNow, canonicals, hreflang, trailing slash, www-to-apex.
