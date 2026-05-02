# HTTP, security, crawler signals audit (Deliverable 7 of 8)

## Headline

**Strong security posture.** Full security header set including HSTS preload, CSP, Permissions-Policy, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy. **Zero CRITICAL or HIGH findings.** Two LOW: the CSP allows `'unsafe-inline'` and `'unsafe-eval'` in `script-src` (relaxed for Next.js + AdSense compatibility); `.well-known/security.txt` was sanitized in PR #89 but worth a re-confirm post-deploy.

## 1. HSTS

`netlify.toml` ships:

```
Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"
```

- `max-age=63072000` (2 years) ✅
- `includeSubDomains` ✅
- `preload` ✅

**Verdict: PASS.** HSTS is preload-list eligible. Post-deploy, recommend submitting agdronedirectory.com to https://hstspreload.org if not already submitted.

## 2. Security headers

From `netlify.toml`:

```
X-Frame-Options          = "SAMEORIGIN"
X-Content-Type-Options   = "nosniff"
Referrer-Policy          = "strict-origin-when-cross-origin"
Permissions-Policy       = "camera=(), microphone=(), geolocation=()"
Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"
```

- `X-Frame-Options: SAMEORIGIN` — clickjacking protection. ✅
- `X-Content-Type-Options: nosniff` — MIME sniffing protection. ✅
- `Referrer-Policy: strict-origin-when-cross-origin` — sensible default; full URL sent within same origin, just origin sent cross-origin over HTTPS. ✅
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` — denies camera, mic, geolocation. ✅

**Verdict: PASS.**

## 3. Content-Security-Policy

```
Content-Security-Policy = "default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval'
    https://www.googletagmanager.com https://www.google-analytics.com https://formspree.io;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https: blob:;
  font-src 'self' data:;
  connect-src 'self' https://www.google-analytics.com https://formspree.io https://whatsapp.com;
  frame-src https://www.youtube.com;
  object-src 'none';
  base-uri 'self';"
```

Per-directive review:

| Directive | Value | Notes |
|---|---|---|
| `default-src` | `'self'` | Restrictive base. ✅ |
| `script-src` | `'self' 'unsafe-inline' 'unsafe-eval' + GA/GTag/Formspree` | `'unsafe-inline'` and `'unsafe-eval'` relaxed — required for Next.js inline JSON-LD scripts and Tailwind/Next runtime. **LOW finding** — could move to nonce-based CSP if Eugen wants stricter. |
| `style-src` | `'self' 'unsafe-inline'` | `'unsafe-inline'` for Tailwind utility classes / inline styles. Acceptable. |
| `img-src` | `'self' data: https: blob:` | Permissive — allows any HTTPS image. Reasonable for a directory linking to operator logos. |
| `font-src` | `'self' data:` | Self-hosted fonts only (next/font). ✅ |
| `connect-src` | `'self' GA + Formspree + whatsapp.com` | XHR/fetch destinations. WhatsApp may be from contact-form deep links. ✅ |
| `frame-src` | `https://www.youtube.com` | YouTube embeds only. Restrictive. ✅ |
| `object-src` | `'none'` | Blocks Flash, plugins. ✅ |
| `base-uri` | `'self'` | Prevents `<base>` injection. ✅ |

**Breakage risk:** if any future page wants to embed Twitter, Vimeo, or other framers, will need a CSP update. Otherwise the policy is well-tuned for the current site's needs.

**Verdict: PASS** (one LOW for the `unsafe-inline` / `unsafe-eval` allowances).

## 4. HTTP status codes

50 random URLs sampled across the static-build output. **All 50 are present as built `.html` files,** which means production will serve them as 200 OK from Netlify edge.

For the redirects in `netlify.toml`, sampled:

| URL | Expected status | Mechanism |
|---|---|---|
| `https://www.agdronedirectory.com/` | 301 → apex | netlify.toml |
| `http://agdronedirectory.com/` | 301 → HTTPS apex | netlify.toml |
| `/regions/delta` | 301 → `/regions/mississippi-delta` | netlify.toml (PR #91) |
| `/operators/kuhn-s-aerial-applications-llc` | 301 → `/operators/kuhns-aerial-applications` | netlify.toml |
| `/operators/flying-cowboy-photography` | 301 → `/operators/flying-cowboy-ag-services` | netlify.toml |
| `/operators/american-drone-llc` | 301 → `/operators/american-drone` | netlify.toml |

All redirects use `status = 301` with `force = true`. **PASS.**

## 5. Mobile-friendly

Spot-checked 5 pages:

- `<meta name="viewport" content="width=device-width, initial-scale=1"/>` ✅ on every sampled page.
- Tailwind responsive utilities used throughout (`sm:`, `md:`, `lg:`, `xl:` prefixes).
- No horizontal scroll observed in the rendered HTML inspection.
- Form inputs use 16px default font size (avoid iOS zoom-on-focus).

**Verdict: PASS.**

## 6. Crawl-rate signals

- No `Crawl-delay:` directive in robots.txt (correct for modern Googlebot).
- Netlify edge serves prerendered HTML — no rate limiting that would throttle crawlers.
- Sitemap pings via IndexNow on every deploy fan out to crawlers without throttling.

**Verdict: PASS.**

## 7. .well-known/security.txt

Per PR #89, current contents:

```
Contact: mailto:eugen@agdronedirectory.com
Expires: 2027-05-02T00:00:00.000Z
Preferred-Languages: en
Canonical: https://agdronedirectory.com/.well-known/security.txt
```

Clean. ISO 8601 expiration ~12 months out. Single Contact, single Preferred-Language, valid Canonical pointing to apex HTTPS.

**Verdict: PASS.**

## Findings

- **CRITICAL: 0**
- **HIGH: 0**
- **MEDIUM: 0**
- **LOW (2):**
  1. CSP allows `'unsafe-inline'` and `'unsafe-eval'` on `script-src`. Necessary for the current Next.js + GA/AdSense setup, but a nonce-based CSP would be stricter. Future hardening.
  2. HSTS preload list submission status unknown. Recommend Eugen submit `agdronedirectory.com` to https://hstspreload.org if not already done.

**Verdict: PASS.** Security posture is one of the strongest dimensions on the site. Headers are configured correctly; CSP is reasonably tight given the Next.js + AdSense constraints.
