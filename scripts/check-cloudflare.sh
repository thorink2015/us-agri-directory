#!/usr/bin/env bash
# ============================================================
# check-cloudflare.sh
# Audits Cloudflare settings for agdronedirectory.com
#
# Usage:
#   bash scripts/check-cloudflare.sh
#
# Credentials are loaded from .env.cloudflare.local (gitignored).
# Create that file once with:
#   echo 'CF_TOKEN=<your-api-token>'  >> .env.cloudflare.local
#   echo 'CF_ZONE_ID=<your-zone-id>' >> .env.cloudflare.local
# ============================================================

ENV_FILE="$(dirname "$0")/../.env.cloudflare.local"
if [ -f "$ENV_FILE" ]; then
  # shellcheck disable=SC1090
  source "$ENV_FILE"
fi

CF_TOKEN="${CF_TOKEN:?'Set CF_TOKEN in .env.cloudflare.local'}"
ZONE_ID="${CF_ZONE_ID:-4ef2d92cf7fc7fc3a77fab5f02fd6d9d}"
BASE="https://api.cloudflare.com/client/v4/zones/${ZONE_ID}"
AUTH=(-H "Authorization: Bearer ${CF_TOKEN}" -H "Content-Type: application/json")

ok()  { echo "  ✅  $1"; }
warn(){ echo "  ⚠️   $1"; }
info(){ echo "  ℹ️   $1"; }
hdr() { echo; echo "══════════════════════════════════════"; echo "  $1"; echo "══════════════════════════════════════"; }

cf() { curl -s "${AUTH[@]}" "$@"; }

# ── 1. Zone overview ─────────────────────────────────────────
hdr "1 · ZONE OVERVIEW"
ZONE=$(cf "${BASE}")
NAME=$(echo "$ZONE" | python3 -c "import sys,json; z=json.load(sys.stdin)['result']; print(z['name'])")
STATUS=$(echo "$ZONE" | python3 -c "import sys,json; z=json.load(sys.stdin)['result']; print(z['status'])")
PLAN=$(echo "$ZONE" | python3 -c "import sys,json; z=json.load(sys.stdin)['result']; print(z['plan']['name'])")
PAUSED=$(echo "$ZONE" | python3 -c "import sys,json; z=json.load(sys.stdin)['result']; print(z['paused'])")
echo "  Domain : $NAME"
echo "  Status : $STATUS   (should be 'active')"
echo "  Plan   : $PLAN"
echo "  Paused : $PAUSED   (should be False)"
[ "$STATUS" = "active" ] && ok "Zone is active" || warn "Zone is NOT active — DNS not routed through Cloudflare yet"
[ "$PAUSED" = "False" ]  && ok "Not paused"     || warn "Zone is paused — Cloudflare proxy is OFF"

# ── 2. DNS records ────────────────────────────────────────────
hdr "2 · DNS RECORDS"
DNS=$(cf "${BASE}/dns_records?per_page=100")
echo "$DNS" | python3 - <<'PYEOF'
import sys, json
records = json.load(sys.stdin).get('result', [])
for r in records:
    proxied = "🟠 proxied" if r.get('proxied') else "⚪ DNS-only"
    print(f"  {r['type']:6}  {r['name']:40}  →  {r.get('content','')[:50]}  [{proxied}]")
PYEOF
# Check that root + www exist and are proxied
for CHECK in "agdronedirectory.com" "www.agdronedirectory.com"; do
    PROXIED=$(echo "$DNS" | python3 -c "
import sys, json
records = json.load(sys.stdin).get('result', [])
match = [r for r in records if r['name'] == '$CHECK']
if match:
    print('proxied' if match[0].get('proxied') else 'dns-only')
else:
    print('missing')
")
    case "$PROXIED" in
        proxied)  ok "$CHECK  — proxied through Cloudflare" ;;
        dns-only) warn "$CHECK  — DNS-only (not proxied); you lose CDN + DDoS protection" ;;
        missing)  warn "$CHECK  — no record found" ;;
    esac
done

# ── 3. SSL/TLS ────────────────────────────────────────────────
hdr "3 · SSL / TLS"
SSL_MODE=$(cf "${BASE}/settings/ssl" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])")
MIN_TLS=$(cf "${BASE}/settings/min_tls_version" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])")
ALWAYS_HTTPS=$(cf "${BASE}/settings/always_use_https" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])")
AUTO_HTTPS=$(cf "${BASE}/settings/automatic_https_rewrites" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])")
HSTS=$(cf "${BASE}/settings/security_header" | python3 -c "import sys,json; h=json.load(sys.stdin)['result']['value'].get('strict_transport_security',{}); print('on max_age=' + str(h.get('max_age',0)) if h.get('enabled') else 'off')" 2>/dev/null || echo "n/a")

echo "  SSL mode           : $SSL_MODE"
echo "  Min TLS version    : $MIN_TLS"
echo "  Always HTTPS       : $ALWAYS_HTTPS"
echo "  Auto HTTPS rewrites: $AUTO_HTTPS"
echo "  HSTS               : $HSTS"

[ "$SSL_MODE" = "full" ] || [ "$SSL_MODE" = "strict" ] && ok "SSL mode is $SSL_MODE (good for Netlify)" || warn "SSL mode is '$SSL_MODE' — should be 'full' or 'strict' for Netlify"
[ "$MIN_TLS" = "1.2" ] || [ "$MIN_TLS" = "1.3" ] && ok "Min TLS $MIN_TLS" || warn "Min TLS '$MIN_TLS' — upgrade to 1.2+"
[ "$ALWAYS_HTTPS" = "on" ] && ok "Always HTTPS is on" || warn "Always HTTPS is OFF — turn it on"
[ "$AUTO_HTTPS" = "on" ] && ok "Auto HTTPS rewrites on" || warn "Auto HTTPS rewrites OFF"

# ── 4. Security ───────────────────────────────────────────────
hdr "4 · SECURITY"
SEC_LEVEL=$(cf "${BASE}/settings/security_level" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])")
BROWSER_CHECK=$(cf "${BASE}/settings/browser_check" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])")
BOT_FIGHT=$(cf "${BASE}/settings/bot_fight_mode" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])" 2>/dev/null || echo "n/a")
echo "  Security level : $SEC_LEVEL"
echo "  Browser check  : $BROWSER_CHECK"
echo "  Bot fight mode : $BOT_FIGHT"
[ "$SEC_LEVEL" = "medium" ] || [ "$SEC_LEVEL" = "high" ] && ok "Security level: $SEC_LEVEL" || warn "Security level '$SEC_LEVEL' — recommend 'medium' or higher"
[ "$BROWSER_CHECK" = "on" ] && ok "Browser integrity check on" || warn "Browser integrity check OFF"
[ "$BOT_FIGHT" = "on" ]     && ok "Bot Fight Mode on"          || info "Bot Fight Mode: $BOT_FIGHT (free tier — enable in Security > Bots)"

# ── 5. Performance ────────────────────────────────────────────
hdr "5 · PERFORMANCE / CACHING"
MINIFY=$(cf "${BASE}/settings/minify" | python3 -c "import sys,json; m=json.load(sys.stdin)['result']['value']; print('html=' + m['html'] + ' css=' + m['css'] + ' js=' + m['js'])")
BROTLI=$(cf "${BASE}/settings/brotli" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])")
HTTP2=$(cf "${BASE}/settings/http2" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])")
HTTP3=$(cf "${BASE}/settings/http3" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])")
CACHE_LVL=$(cf "${BASE}/settings/cache_level" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])")
EARLY_HINTS=$(cf "${BASE}/settings/early_hints" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['value'])" 2>/dev/null || echo "n/a")
echo "  Minify      : $MINIFY"
echo "  Brotli      : $BROTLI"
echo "  HTTP/2      : $HTTP2"
echo "  HTTP/3      : $HTTP3"
echo "  Cache level : $CACHE_LVL"
echo "  Early Hints : $EARLY_HINTS"

[[ "$MINIFY" == *"html=on"* ]] && ok "HTML minify on" || warn "HTML minify OFF — enable in Speed > Optimization"
[[ "$MINIFY" == *"css=on"*  ]] && ok "CSS minify on"  || warn "CSS minify OFF"
[[ "$MINIFY" == *"js=on"*   ]] && ok "JS minify on"   || warn "JS minify OFF"
[ "$BROTLI" = "on" ] && ok "Brotli compression on" || warn "Brotli OFF — enable in Speed > Optimization"
[ "$HTTP2"  = "on" ] && ok "HTTP/2 on"             || warn "HTTP/2 OFF"
[ "$HTTP3"  = "on" ] && ok "HTTP/3 on"             || info "HTTP/3 OFF — enable in Network for QUIC support"
[ "$CACHE_LVL" = "aggressive" ] || [ "$CACHE_LVL" = "standard" ] && ok "Cache level: $CACHE_LVL" || warn "Cache level: $CACHE_LVL — recommend 'standard' or 'aggressive'"
[ "$EARLY_HINTS" = "on" ] && ok "Early Hints on (103 preload)" || info "Early Hints: $EARLY_HINTS — enable for LCP improvement"

# ── 6. Page rules ─────────────────────────────────────────────
hdr "6 · PAGE RULES"
PAGERULES=$(cf "${BASE}/pagerules?status=active")
COUNT=$(echo "$PAGERULES" | python3 -c "import sys,json; print(len(json.load(sys.stdin).get('result',[])))")
echo "  Active page rules: $COUNT"
echo "$PAGERULES" | python3 - <<'PYEOF'
import sys, json
rules = json.load(sys.stdin).get('result', [])
for r in rules:
    url = r['targets'][0]['constraint']['value']
    actions = ', '.join(a['id'] for a in r['actions'])
    print(f"  • {url}  →  {actions}")
PYEOF

# ── 7. Nameservers ────────────────────────────────────────────
hdr "7 · NAMESERVERS (from public DNS)"
echo "  Checking via dig..."
if command -v dig &>/dev/null; then
    dig +short NS agdronedirectory.com | sed 's/^/  /'
else
    info "dig not available — check nameservers in Cloudflare dashboard"
fi

# ── Summary ───────────────────────────────────────────────────
hdr "DONE — review any ⚠️  warnings above"
echo
