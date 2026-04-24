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

## Next session — plots program pillar guide (monetization)

Eugen is opening a separate session to ship a pillar guide on a
&ldquo;plots program&rdquo; topic (exact angle TBD, likely USDA plots or
similar). Key differences from guides 1 and 2:

- **Affiliate monetization.** The guide includes an affiliate link
  Eugen wants to monetize. The same link needs placement on several
  other pages across the site, not just inside the guide.
- **Standing rules still apply.** No em dashes, no banned words,
  data-driven FAQ schema, the sentinel append loop, reciprocal links,
  `llms.txt` + `llms-full.txt` entries, sitemap auto-pickup.
- **Netlify budget constraint applies until 2026-05-01.** See
  `known-issues.md` for the push-only-when-done rule. Likely fine
  since this guide will probably ship on or after 2026-05-01.
- **Affiliate link hygiene to design in that session:**
  - Centralize the affiliate URL in `src/data/affiliates.ts` (or
    similar) so it can be updated in one place if the merchant ever
    rotates it.
  - Add UTM parameters via a `withUtm(url, source)` helper so we can
    attribute clicks to which page sent them.
  - `rel="sponsored noopener noreferrer"` on every affiliate anchor
    (Google treats `sponsored` as the correct attribution signal for
    monetized links; `nofollow` alone is older guidance).
  - Render a &ldquo;This link may earn us a commission&rdquo; disclosure
    once per page near first use, per FTC guidelines.
  - Track placements: list every page where the link appears in
    `session-history.md` so future sessions know where to update.

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
