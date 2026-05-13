# AdSense pre-review checklist
> Generated 2026-05-13 from PR #120 (`claude/adsense-batch-setup-hadDu`).
> Eugen edits this file as items are completed. When every row is green,
> the PR is mergeable and AdSense > Policy center > "I confirm I have
> fixed the issues" > Request review is the next step.

## 1. TODO[copy] markers that block review submission

These are visible placeholder strings rendered on the live site today.
Grep with: `grep -rn "TODO\[copy\]" src/`

| File | What's needed | Notes |
|---|---|---|
| `src/data/author.ts` (line ~`bio:`) | Expand `AUTHOR.bio` from ~95 words to **120-180 words** | `/about` and every byline pull from here. Standing-rules.md section 11 marks `author.ts` as canonical, so edit there, not in `/about` |
| `src/app/about/page.tsx` (Contact section) | Business hours line (timezone + days/hours) | Rendered as `text-gray-400 italic` placeholder until filled |
| `src/app/about/page.tsx` (Contact section) | Response-time commitment (e.g. "within 1 business day") | Same render pattern |

## 2. TODO[asset] markers that block review submission

Grep with: `grep -rn "TODO\[asset\]" src/`

| File | What's needed | Notes |
|---|---|---|
| `src/app/about/page.tsx` (Contact section) | Business mailing address — **city + state minimum** for AdSense reviewer verification | Render as plain `<p>` in place of the placeholder once known |
| `src/app/about/page.tsx` (Founder identity) | Decide on canonical author photo path | File exists at `/public/images/eugen-author.jpg` per `project-facts.md`; spec proposed `/images/authors/eugen-manoli.jpg`. Either rename the file or leave the `<Image src>` pointing at `/images/eugen-author.jpg` — both are fine, just pick one |

## 3. AdSense dashboard — ad units to create

Create at **AdSense > Ads > By ad unit**. Map the AdSense-generated
slot ID into the key in `src/lib/adSlots.ts`. Until then, AdSlot
renders nothing in production (env-gated, see section 5).

| Slot key in `src/lib/adSlots.ts` | Format | Where it renders |
|---|---|---|
| `HOME_BELOW_HERO` | Display, responsive | Homepage, below the stats row |
| `HOME_MID` | Display, responsive | Homepage, between crop services and Featured Operators |
| `STATE_BELOW_INTRO` | Display, responsive | `/states/[slug]` rich-data path when `ops.length >= 10`, below AEO block |
| `STATE_AFTER_OPERATORS` | Display, responsive | Same state pages, below operator grid |
| `TOOLS_BELOW_RESULT` | Display, responsive | Spray-cost, ROI, coverage, acreage calculators, below the calculator output |
| `GUIDE_IN_ARTICLE_1` | In-article (fluid) | **Not yet placed** in code. Reserved for `/guides/[slug]` and `/blog/[slug]` if/when Eugen approves placement. |
| `GUIDE_IN_ARTICLE_2` | In-article (fluid) | Same — reserved, not placed |

Open `src/lib/adSlots.ts` and replace each `TODO_REPLACE_WITH_REAL_SLOT_ID`
literal with the slot ID AdSense assigns. One line per unit.

## 4. AdSense Privacy & messaging CMP

Set up in **AdSense > Privacy & messaging**. No code changes needed —
the CMP loads through the AdSense loader script already in
`src/app/layout.tsx`.

| CMP message | Required regions | Notes |
|---|---|---|
| GDPR consent banner | EU + UK | Required for EU/UK traffic. Configure purposes 1, 3, 4 at minimum. |
| US states banner (CCPA/CPRA + state opt-out chain) | California + new-law states | Google calls this the "US states" message. Toggle on. |

Once the CMP is set up, AdSense delivers the banner through its own
script. The current `privacy/page.tsx` already links to Google Ads
Settings, aboutads.info/choices, youronlinechoices.eu and the Google
partner-sites page — those satisfy the standalone "opt out" links the
CMP banner refers users to.

## 5. Netlify env vars

Set in **Netlify > Site settings > Environment variables** for the
production context.

| Variable | Current state | Flip-to value | When to flip |
|---|---|---|---|
| `NEXT_PUBLIC_ADS_ENABLED` | Unset (default: ads off) | `true` | Only after AdSense approves the account AND every slot ID in `src/lib/adSlots.ts` is a real value (not `TODO_*`) |

Verification of the off state: `npm run build && grep -rcE 'class="adsbygoogle"' .next/server/app/` returns 0. Confirmed in PR #120
commit `2f6a240` build output.

## 6. Auto Ads OFF confirmation

In **AdSense > Ads > By site > Edit (agdronedirectory.com) > Auto Ads**,
set the toggle to **OFF**. Manual placement only.

Auto Ads would ignore the explicit page allow-list in `src/app/page.tsx`,
`src/app/states/[slug]/page.tsx` and `src/app/tools/*/page.tsx` and
inject ads on the thin pages the policy fix is meant to avoid (operator
profiles, city pages, state-crop, state-service). Leaving Auto Ads ON
re-creates the original violation.

Anchor / side-rail ads — also under the Auto Ads card — keep OFF
until the directory clears 50k monthly pageviews and we revisit.

## 7. Pre-submission verification

Run locally on the production branch with `NEXT_PUBLIC_ADS_ENABLED`
unset to confirm reviewer surface is clean:

- [ ] `npm run build` exits 0 with no errors (last green: 2026-05-13 commit `2f6a240`)
- [ ] `npm run lint` exits 0 with no warnings (last green: 2026-05-13 commit `2f6a240`)
- [ ] `grep -rcE 'class="adsbygoogle"' .next/server/app/` returns 0
- [ ] `grep -rcE '>Ad slot<' .next/server/app/` returns 0
- [ ] `/privacy` page renders the AdSense + cookies + opt-out block
- [ ] `/about` renders the founder photo, methodology list, and How-we-make-money section
- [ ] `/about` no longer contains the "directory is not monetized" sentence
- [ ] All `TODO[copy]` and `TODO[asset]` markers in section 1-2 above are filled in

## 8. Deferred (NOT shipping this round)

These were considered and deliberately deferred:

- **`<AdSlot />` on `/blog/[slug]` and `/guides/[slug]`** — placement
  pattern unclear without seeing the MDX flow; revisit after AdSense
  approval. Slots `GUIDE_IN_ARTICLE_1` / `GUIDE_IN_ARTICLE_2` reserved
  but unused. Article schema is already emitted there.
- **301 redirect on 0-operator city pages** — already noindex'd via
  `src/lib/indexing-gates.ts` and blocked from Mediapartners-Google;
  redirect adds no AdSense-relevant uplift and could surprise existing
  search traffic.
- **`/authors/[slug]` infrastructure** — Article schema uses the
  canonical `AUTHOR.personId` `@id` ref (Eugen-as-sole-author). A
  multi-author route can be added later without re-shipping schemas.
- **Operator FAQ removal** — PR #100 already diversified operator
  FAQs to a 3x3 question/answer matrix keyed on `hash(operator.slug)`
  (mean similarity 41.3% → 19.5%). No site-wide identical block to
  remove.

## 9. Order of operations to ship

1. Eugen fills the four TODO[copy] / TODO[asset] markers (or accepts the existing photo path) on the PR #120 branch.
2. Eugen creates the 5 active ad units in AdSense dashboard, replaces `TODO_*` slot IDs in `src/lib/adSlots.ts`.
3. Eugen confirms Auto Ads OFF and CMP messages live in AdSense dashboard.
4. PR #120 reviewed and merged to `main`. Netlify deploys.
5. With production deploy green, AdSense reviewer surface is clean (`NEXT_PUBLIC_ADS_ENABLED` still unset → no `<ins>` in HTML, but AdSense script still loads for verification).
6. AdSense > Policy center > "I confirm I have fixed the issues" > Request review.
7. After approval, Eugen sets `NEXT_PUBLIC_ADS_ENABLED=true` on Netlify production, triggers redeploy. Ads go live.
