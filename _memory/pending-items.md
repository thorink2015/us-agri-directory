# Pending items

> What's blocked and what unblocks it. When an item moves from pending
> to done, move it into `session-history.md` and delete it here.

Last updated: 2026-04-15

## Blocked on Eugen's input

### Author identity (fills placeholders in `src/data/author.ts`)

| Placeholder | Where used | Status |
|---|---|---|
| `{{LAST_NAME}}` | Footer credit, full name, Person schema | Awaiting |
| `{{LINKEDIN_URL}}` | `/about` contact, Person sameAs | Awaiting |
| `{{X_URL}}` | Person sameAs (optional) | Awaiting |
| `{{COUNTRY_REGION}}` | Canonical bio in `/about` | Awaiting |
| `{{FIELD_OF_STUDY}}` | Canonical bio in `/about` | Awaiting |
| Author photo | `/public/images/eugen-author.jpg` | Awaiting upload (initial-letter avatar fallback active) |
| Public email | `AUTHOR.publicEmail` — currently `eugen@agdronedirectory.com` | Needs confirmation |

## Blocked on research files

See `_research/README.md` for what's uploaded and what's missing.

| Research file | Unblocks |
|---|---|
| `research-03-state-licensing.md` | 50 state page template (build-plan Session 11), `/regulations/state-licensing` |
| `research-04-usda-programs.md` | `/grants` pillar, insurance page, training page, `/pricing` rewrite |
| `research-05-keyword-map.md` | Homepage rewrite, `/pricing` pillar rewrite |
| `operators-batch-2-southeast.md` | Southeast operator seed data (plan references Batch 2 but not uploaded) |

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

## Optional polish (not blocking)

- Netlify post-deploy GitHub Action to auto-run IndexNow ping
- OG image generation (currently stubbed to `/images/og-default.jpg`)
- Dark mode (not in scope unless requested)
