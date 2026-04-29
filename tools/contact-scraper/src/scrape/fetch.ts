import { CONFIG } from '../config.ts';

export type FetchOutcome =
  | { kind: 'ok'; status: number; finalUrl: string; html: string }
  | { kind: 'http_error'; status: number; finalUrl: string }
  | { kind: 'cf_blocked'; finalUrl: string; html: string }
  | { kind: 'too_large'; status: number; finalUrl: string }
  | { kind: 'timeout' }
  | { kind: 'network_error'; reason: string };

// Detects a Cloudflare interstitial challenge. The challenge HTML always
// includes one of these markers; tuned not to false-positive on real sites
// that just sit behind Cloudflare without a challenge.
function looksLikeCfChallenge(html: string): boolean {
  if (!html) return false;
  return (
    html.includes('cf_chl_opt') ||
    html.includes('Just a moment...') ||
    html.includes('__cf_chl_') ||
    html.includes('cf-browser-verification')
  );
}

async function readBodyWithCap(
  res: Response,
  maxBytes: number,
): Promise<{ html: string; truncated: boolean }> {
  const reader = res.body?.getReader();
  if (!reader) return { html: '', truncated: false };
  const decoder = new TextDecoder('utf-8', { fatal: false });
  let total = 0;
  let html = '';
  let truncated = false;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      truncated = true;
      try {
        await reader.cancel();
      } catch {
        // ignore
      }
      break;
    }
    html += decoder.decode(value, { stream: true });
  }
  html += decoder.decode();
  return { html, truncated };
}

export interface FetchOptions {
  timeoutMs?: number;
}

export async function fetchHtml(
  url: string,
  opts: FetchOptions = {},
): Promise<FetchOutcome> {
  const timeoutMs = opts.timeoutMs ?? CONFIG.pageTimeoutMs;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': CONFIG.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': CONFIG.acceptLanguage,
      },
      signal: ctrl.signal,
    });
    const finalUrl = res.url || url;
    if (res.status >= 400) {
      // Drain the body so the connection can be released.
      try {
        await res.body?.cancel();
      } catch {
        // ignore
      }
      return { kind: 'http_error', status: res.status, finalUrl };
    }
    const ct = (res.headers.get('content-type') ?? '').toLowerCase();
    if (ct && !ct.includes('text/') && !ct.includes('xml') && !ct.includes('json')) {
      try {
        await res.body?.cancel();
      } catch {
        // ignore
      }
      return { kind: 'http_error', status: res.status, finalUrl };
    }
    const { html, truncated } = await readBodyWithCap(
      res,
      CONFIG.maxResponseBytes,
    );
    if (truncated) {
      // Still useful: parse what we got. Caller can note the truncation if needed.
    }
    if (looksLikeCfChallenge(html)) {
      return { kind: 'cf_blocked', finalUrl, html };
    }
    return { kind: 'ok', status: res.status, finalUrl, html };
  } catch (err) {
    if ((err as { name?: string }).name === 'AbortError') {
      return { kind: 'timeout' };
    }
    const reason =
      err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    return { kind: 'network_error', reason };
  } finally {
    clearTimeout(timer);
  }
}

// Normalize input websites: add https:// if missing scheme, strip trailing
// whitespace, drop fragment. Returns null if unparseable.
export function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(withScheme);
    u.hash = '';
    return u.toString();
  } catch {
    return null;
  }
}

export function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}
