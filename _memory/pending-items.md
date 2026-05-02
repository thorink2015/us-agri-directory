# Pending items

> What's blocked and what unblocks it. When an item moves from pending
> to done, move it into `session-history.md` and delete it here.

Last updated: 2026-04-15

## Blocked on Eugen's input

### Author identity

Author placeholders filled and photo uploaded 2026-04-24 (see
`project-facts.md § Author (E-E-A-T)`). Optional items remaining
(not blockers):

- `AUTHOR.x` (X/Twitter URL) — optional, leave blank if not used
- `organizationSchema().sameAs` — add company LinkedIn / X when
  those accounts exist

## Phase A follow-up (from PR #90 audit, 2026-05-02)

Findings written to `audit/phase-a-followup-audit.md`. Three 404
fixes shipped 2026-05-02 (this PR), four remaining items below.

Done (PR #91 — three 404s):

- ✅ `/regions/delta` 301 → `/regions/mississippi-delta` (force=true
  in `netlify.toml`)
- ✅ `dji-agras-t25p` full catalog entry in `src/data/drone-model.ts`
  (mirrors T25 specs, US-spec variant noted, NDAA non-compliance
  called out, 6 FAQs, 5 authority links). Removed the no-longer-
  needed fallback label from `DRONE_NAME_FALLBACKS`.
- ✅ Homepage newsletter form rewired to Formspree via the new
  `src/components/ui/HomepageNewsletterForm.tsx` client component
  (mirrors Footer + ContactForm + ExitIntentPopup pattern). Hidden
  `_form_type=newsletter-homepage` plus `_subject` so the inbox can
  distinguish from the footer signup.

Done (PR #93 — operator template uplift):

- ✅ Thin operator profile uplift via `src/lib/operator-content.ts`
  helpers and 5 new sections in `src/app/operators/[slug]/page.tsx`
  (auto paragraph, region context line, crop pricing context,
  state licensing context, 2-FAQ block + FAQPage JSON-LD). Verified
  rendered word counts on three canaries: lnp-ag-drone-spraying
  40 → 448, sphex-ag 51 → 462, agronix 51 → 495. Rich profile
  (agriforce-drone) 164 → 735, no regression. Pattern documented
  in `_memory/code-patterns.md`.

Still pending:

1. **Lift the state-crop template** at
   `src/app/states/[slug]/crops/[crop]/page.tsx` — thread
   `crop.longDescription`, `crop.faqs`, `state.sprayWindows`,
   and state licensing context into the page; gate the obviously
   weak combos via `generateStaticParams` filter or noindex meta.
   Affects 408 URLs.
2. **Fill `organizationSchema().sameAs`** when company social
   accounts exist (also tracked above).
3. **Pull a Search Console crawl-error export** and audit operator
   slug duplicates / orphan pages in bulk (flagged in the PR #90
   audit "bonus finding" section).

## Blocked on research files

See `_research/README.md` for what's uploaded and what's missing.

| Research file | Unblocks |
|---|---|
| `research-03-state-licensing.md` | 50 state page template (build-plan Session 11), `/regulations/state-licensing` |
| `research-04-usda-programs.md` | `/grants` pillar, insurance page, training page, `/pricing` rewrite |
| `research-05-keyword-map.md` | Homepage rewrite, `/pricing` pillar rewrite |
| `operators-batch-2-southeast.md` | Southeast operator seed data (plan references Batch 2 but not uploaded) — other 7 batches fully imported (PR #38) |

## Blocked on external account setup (Eugen handles)

- ✅ Yandex Webmaster — verified
- ✅ Bing Webmaster Tools — connected via Google import (auto-verified + sitemap imported)
- ✅ IndexNow — auto-pings on every production deploy (1130 URLs, HTTP 200)
- Google Search Console — verify domain + submit sitemap `https://agdronedirectory.com/sitemap.xml`
- Sign up for Plausible Analytics → share domain ID so we can wire
  `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and swap out GA4
- Sign up for rank tracker (SerpRobot or Wincher) with 50 seed keywords
- Set up Cloudflare for performance + bot management

## Ready to build when unblocked

- ✅ Homepage full rewrite — shipped 2026-04-16
- ✅ `/pricing` pillar rewrite — shipped 2026-04-16
- ✅ All 6 tool pages SEO/AEO treatment — shipped 2026-04-16
- ✅ State page template + 3 proof states (IA, TX, CA) — shipped 2026-04-17 (PR #22 draft)
- `/regulations` hub + FAA sub-page + EPA sub-page (needs research-01, research-02)
- Remaining 47 state data objects — template ready, **blocked on research-03-state-licensing.md**
- Grants / insurance / training pages (needs research-04)
- `/start-a-drone-business` pillar (needs all research files)
- Blog posts 1-10 (build-plan says "written in full by me" — Eugen writes these)

## Known gaps to patch

- `/advertise` (merged PR #58, 2026-04-21) is NOT listed in
  `src/app/sitemap.ts` `staticPages`. Append
  `{ url: `${BASE_URL}/advertise`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 }`
  in the next small batch. Flagged by `standing-rules.md` §3.1.

## Optional polish (not blocking)

- Netlify post-deploy GitHub Action to auto-run IndexNow ping
- OG image generation (currently stubbed to `/images/og-default.jpg`)
- Dark mode (not in scope unless requested)
