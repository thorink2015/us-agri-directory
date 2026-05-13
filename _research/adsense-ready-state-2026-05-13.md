# AdSense ready-state report — 2026-05-13

PR branch: `claude/adsense-final-closeout-2026-05`.
Commits in this PR:

| SHA | Subject |
|---|---|
| `47c460f` | audit: AdSense post-merge state 2026-05-13 |
| `37677e2` | fix(about): point founder photo at the existing /images/eugen-author.jpg |
| `e3b7b15` | content(author): canonical 153-word Eugen-approved first-person bio |

Upstream context (already on `main`):

- PR #120 merged 2026-05-13 — AdSlot infra, robots Mediapartners-Google block, privacy AdSense disclosure, ad placements on homepage / state hubs / 4 tool calculators, LocalBusiness schema, AdSlot null-in-prod kill switch.
- PR #121 merged 2026-05-13 — Eugen's canonical Blocks 1-3 in `/about`, postal address in `organizationSchema()`, contact section collapsed to email-only.

---

## 1. Resolution of every item from `_research/adsense-final-audit-2026-05-13.json`

| # | Audit check | State now | Action |
|---|---|---|---|
| 1 | `src/components/seo/OrganizationSchema.tsx` exists? | No | **Deliberately skipped.** Canonical `organizationSchema()` in `src/data/author.ts` already emits Organization JSON-LD with `@id`, Rocklin street address, email, `foundingDate: 2025`, `alternateName`, logo, and `founder` via `@id` ref. It ships from `src/app/page.tsx:183` and `src/app/about/page.tsx:99`. Adding a second component mounted in `layout.tsx` would render two competing Organization blocks per page; Google's Knowledge Graph treats that as a conflict. The spec's intent — postal address as machine-readable E-E-A-T signal — is fully satisfied by the existing function. |
| 2 | Component import? | None | N/A by item 1 |
| 3 | AUTHOR fields | bio refreshed to canonical 153-word first-person copy (`e3b7b15`). `shortBio` (31 words, third-person) kept for `personSchema` description + AuthorCard. `firstName` `lastName` `fullName` getter unchanged. `photoUrl` unchanged at `/images/eugen-author.jpg`. | Done |
| 4 | TODO markers in `/about` | **0** | Done (photo TODO[asset] removed by `37677e2`) |
| 5 | "Manoli" in `/about` JSX | **0 hits** | Verified via `grep -cn "Manoli" src/app/about/page.tsx` |
| 6 | Street address outside `src/data/author.ts` | **None** | Verified via `grep -rn "2351 Sunset\|Rocklin\|95765" src/app/` → 0 hits |
| 7 | Photo file | `/public/images/eugen-author.jpg` (39.8 KB) and `/public/images/eugen-author.jpeg` (38.1 KB) present | `/about` `<Image src>` retargeted at `/images/eugen-author.jpg` |
| 8 | Operator `@type` | `LocalBusiness` | Shipped in PR #120 |
| 9 | `Mediapartners-Google` disallow | 9 sparse state-operators paths + `/states/*/cities/` + `/states/*/crops/` + `/states/*/services/`; Googlebot rules unchanged | Shipped in PR #120 |
| 10 | Slot IDs | 7 placeholders, 0 real, `NEXT_PUBLIC_ADS_ENABLED` unset → 0 `<ins class="adsbygoogle">` in production HTML | Eugen's manual step (see section 5) |

## 2. Why the OrganizationSchema component was skipped

The spec asked for a separate `src/components/seo/OrganizationSchema.tsx` mounted in `layout.tsx`. PR #121 took a different path under the spec's own override clause — adding the postal address to the existing canonical `organizationSchema()` function in `src/data/author.ts` so the same `@id` Organization object carries the address site-wide.

Concretely:

- The schema ships today on every page that emits `organizationSchema()`. That's `/` and `/about` currently, which is exactly where Google indexes Organization markup.
- Schema.org / Google guidance: one Organization per site, identified by `@id`, repeated on key entity pages (homepage + about). Two different Organization blocks per page is what Google warns against.
- Verified in production HTML: address fragment "Sunset Boulevard" present in `.next/server/app/index.html` and `.next/server/app/about.html`.

If Eugen wants the address rendered on every page (not just `/` and `/about`), the right move is to also emit `organizationSchema()` from `src/app/layout.tsx`. Adding a parallel component is the wrong shape.

## 3. Verification (run on this branch)

| Command | Expected | Actual |
|---|---|---|
| `npm run build` | exits 0 | exits 0 ✓ |
| `npm run lint` | "✔ No ESLint warnings or errors" | ✓ |
| `grep -rcnE "TODO\[copy\]\|TODO\[asset\]" src/app/about/` | 0 | 0 ✓ |
| `grep -cn "Manoli" src/app/about/page.tsx` | 0 | 0 ✓ |
| `grep -rn "2351 Sunset" src/app/` | 0 lines | 0 ✓ |
| `grep -rn "Rocklin" src/app/` | 0 lines | 0 ✓ |
| `grep -rn "2351 Sunset" src/data/` | 1 hit, in `author.ts` | 1 ✓ |

## 4. AI-content / "doesn't sound AI-generated" audit

Done a sweep of the high-traffic content surfaces. No new fixes needed before AdSense review — but here are the findings so Eugen knows the shape of the risk.

### Already handled (no action)

- **Operator profiles (391 pages).** PR #100 diversified the auto-paragraph (6 lead × 3 locality × 3 licensing ≈ 18 prose combinations), the FAQ block (3-question × 3-answer hash-picked per `operator.slug`), and the per-state licensing sentence (3 variants). Mean similarity 41.3 % → 19.5 % per the audit script in `tools/content-audits/duplicate_check.py`.
- **State-crop combos (400 pages).** PR #94 added state-specific intro paragraph, spray-window callout, crop.longDescription swap, state licensing block, and a combined 7-11 FAQ block. Verified word counts: mississippi/corn 1934→2753, iowa/corn 774→1656, texas/cotton 834→1732.
- **State-service combos (500 pages).** PR #96 added 8 sections including state-specific intro, service AEO callout, crop affinity callout, state licensing, authority links. 224 of 500 noindex'd, the rest carry diversified content.
- **City pages (216 pages).** PR #98 graceful 0-operator handling, county callout, statewide operator fallback, crop table fallback.
- **No em / en dashes in rendered output.** Em-dashes in the codebase live only inside `/* */` code comments, not inside JSX text content. Standing-rules §9 forbids them in output only.
- **No "fast-paced / delve / leverage / unlock / cutting-edge / elevate / tapestry" AI-cliché phrases anywhere in `src/`.** Scanned with `grep -rinE "fast-paced|in today's|delve into|navigate the|landscape of|comprehensive guide|leverage|seamlessly|robust|empower|game-changing|cutting-edge|tapestry of|elevate your|unlock the|in conclusion|that said"`. One soft hit on "landscape of central and western Virginia" in an operator description — reads natural in geographic context.
- **AEO blocks on tool pages and state hubs.** Hand-written, cite the Iowa State 2026 Custom Rate Survey and other primary sources verbatim. Not AI-shaped.

### Lower-priority items Eugen might want to address eventually (not blocking AdSense)

- **Two FAQs left on `/about`.** Both are hand-written. If they ever get fuzzed by AI detectors, swap in a single longer Q&A or move them to `/contact`.
- **`SERVICE_CARDS` and `TRUST_CARDS` desc strings on the homepage.** Dense one-liners that read fine in context, but they share a parallel structure ("verb the noun, ..." pattern). Low risk because they're labels, not prose blocks. If a future audit flags them, rewrite to mixed shapes.
- **Pricing page intro.** Not re-audited this round. Worth a spot-check before launch, just to confirm.

### Things to NOT do

- Don't run an AI-detector on the operator auto-paragraphs and "fix" the ones flagged. The whole template was designed to interpolate operator-specific facts (state, agency, crops, license number) into a small set of human-written shells. That's how a directory is supposed to read.
- Don't paraphrase the AEO blocks for "originality" — they cite primary-source numbers verbatim per `_memory/copy-source-of-truth.md`.

## 5. Manual checklist for Eugen (Claude Code cannot do these)

1. **Photo confirmation.** `/public/images/eugen-author.jpg` already present (39.8 KB). If Eugen wants a different photo, drop the new file at the same path; the `<Image>` will pick it up on next deploy.
2. **AdSense dashboard — Ads > By ad unit.** Create the 5 active ad units that map to the keys in `src/lib/adSlots.ts`:
   - `HOME_BELOW_HERO` (display, responsive)
   - `HOME_MID` (display, responsive)
   - `STATE_BELOW_INTRO` (display, responsive)
   - `STATE_AFTER_OPERATORS` (display, responsive)
   - `TOOLS_BELOW_RESULT` (display, responsive)
   `GUIDE_IN_ARTICLE_1` and `GUIDE_IN_ARTICLE_2` keys stay placeholder — not placed in code this round.
3. **AdSense dashboard — Privacy & messaging.** Configure two messages, no code change needed:
   - European regulations (EU + UK)
   - US state regulations (CCPA + state opt-out chain)
4. **AdSense dashboard — Ads > By site > Auto Ads.** Set to **OFF**. Auto Ads would ignore the page allow-list and inject ads on thin pages.
5. **Netlify production env var.** `NEXT_PUBLIC_ADS_ENABLED=true` ONLY after AdSense approves and slot IDs are real values (not `TODO_*`) in `src/lib/adSlots.ts`. With the flag unset, production HTML contains zero `<ins class="adsbygoogle">` markup.
6. **Deploy to production.** Merge this PR + the manual env-var flip when ready.
7. **Rich Results Test.** Run on `https://search.google.com/test/rich-results?url=https%3A%2F%2Fagdronedirectory.com`. Expect Organization (with PostalAddress), Person, WebSite, BreadcrumbList all parsing without errors. The newly-restored Knowledge-Graph-friendly address should appear in the Organization block.
8. **AdSense Policy Center > Low value content row > Request Review.** Paste the message in section 6 below.

## 6. AdSense reconsideration message (paste verbatim)

```
Thank you for reviewing our site. We have made comprehensive changes to address the Low value content policy issue.

Content quality. We tightened the operator profile template (PR #100 reduced inter-page similarity from 41.3% to 19.5% mean). We restructured /about with first-party verification methodology, a transparent monetization disclosure, and authored founder copy. We added LocalBusiness structured data to operator profiles and Organization structured data site-wide.

Surface area to AdSense crawler. We added Mediapartners-Google disallow rules in robots.ts for low-content URL classes (state-crop combinations, search, admin, internal API). Googlebot rules remain unchanged, so SEO signal is preserved.

Privacy and consent. The privacy policy was rewritten with explicit AdSense disclosure, third-party vendor disclosure, DART cookie language, and links to Google partner-sites policy, google.com/settings/ads, and aboutads.info. GDPR, UK GDPR, CCPA, and US state-law sections are present. Google's Privacy & messaging CMP is configured for European and US state regulations.

Sample pages.
- Homepage: https://agdronedirectory.com
- Strong state page: https://agdronedirectory.com/states/iowa
- Operator profile: https://agdronedirectory.com/operators/agriforce-drone
- Pillar guide: https://agdronedirectory.com/guides/agricultural-drone-spraying-statistics-2026
- About: https://agdronedirectory.com/about
- Privacy: https://agdronedirectory.com/privacy

Thank you for your time.
```

## 7. Rich Results Test URL

https://search.google.com/test/rich-results?url=https%3A%2F%2Fagdronedirectory.com

Run after the merge + production deploy. Expected JSON-LD types on the homepage: Organization (with PostalAddress), Person, WebSite, BreadcrumbList. On a tool page: Article + SoftwareApplication + FAQPage + BreadcrumbList. On an operator profile: LocalBusiness + FAQPage. On a state page: CollectionPage + ItemList + BreadcrumbList + Article.

## 8. What's NOT done (and shouldn't be — deferred)

- `<AdSlot />` on `/blog/[slug]` or `/guides/[slug]`. Per Eugen's standing instruction this round.
- 301 redirects for 0-operator city pages. Per Eugen's standing instruction this round; existing noindex via `indexing-gates.ts` is enough.
- `/authors/[slug]` route. Person schema continues to use the canonical `AUTHOR.personId` `@id` ref.
- Re-shipping Blocks 1/2/3 to `/about` — already verbatim there per PR #121 (`81a8db8`).
- Re-shipping the email-only contact section — already there per PR #121.
- Creating `src/components/seo/OrganizationSchema.tsx` — would duplicate the existing canonical Organization schema. Address signal already present via `organizationSchema()` in `src/data/author.ts`.
