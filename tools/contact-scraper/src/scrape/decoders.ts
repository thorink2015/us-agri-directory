// Email obfuscation decoders. Each takes raw HTML or text and returns a
// list of recovered emails in canonical form (lowercase, trimmed). The
// extractor calls every decoder and unions the results.

// 1) Cloudflare Email Protection.
//    Pattern: <a href="/cdn-cgi/l/email-protection#XXXX..."> or any element
//    with attribute data-cfemail="XXXX...". The hex string is XOR-encoded.
//    First byte is the key; remaining bytes are XOR'd against it.
export function decodeCfEmailHex(hex: string): string | null {
  if (!/^[0-9a-fA-F]+$/.test(hex) || hex.length < 4 || hex.length % 2 !== 0) {
    return null;
  }
  const bytes: number[] = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substring(i, i + 2), 16));
  }
  const key = bytes[0]!;
  let out = '';
  for (let i = 1; i < bytes.length; i++) {
    out += String.fromCharCode(bytes[i]! ^ key);
  }
  return out;
}

export function extractCfEmails(html: string): string[] {
  const found = new Set<string>();
  // data-cfemail="..."
  const attrRe = /data-cfemail\s*=\s*"([0-9a-fA-F]+)"/gi;
  let m: RegExpExecArray | null;
  while ((m = attrRe.exec(html)) !== null) {
    const decoded = decodeCfEmailHex(m[1]!);
    if (decoded) found.add(decoded);
  }
  // /cdn-cgi/l/email-protection#XXXX
  const hrefRe = /\/cdn-cgi\/l\/email-protection#([0-9a-fA-F]+)/gi;
  while ((m = hrefRe.exec(html)) !== null) {
    const decoded = decodeCfEmailHex(m[1]!);
    if (decoded) found.add(decoded);
  }
  return [...found];
}

// 2) HTML entity obfuscation: &#64; → @ and &commat; → @, plus numeric
//    entities for the local part. Decoding ALL entities first lets the
//    main email regex catch these naturally.
export function decodeHtmlEntities(html: string): string {
  return html
    .replace(/&commat;/gi, '@')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec: string) =>
      String.fromCodePoint(parseInt(dec, 10)),
    )
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&nbsp;/gi, ' ');
}

// 3) Word-spelled obfuscation: "name [at] domain dot com",
//    "name (at) domain (dot) com", "name AT domain DOT com", etc.
//    Conservative: requires both [at] and [dot] OR a single [at] with
//    a real-looking TLD on the right.
export function extractSpelledOutEmails(text: string): string[] {
  const out = new Set<string>();
  const compact = text.replace(/\s+/g, ' ');
  // [at] / (at) / {at} / AT (case sensitive standalone)
  const atTok = '(?:\\s*[\\[\\(\\{]\\s*at\\s*[\\]\\)\\}]\\s*|\\s+at\\s+|\\s*@\\s*)';
  const dotTok =
    '(?:\\s*[\\[\\(\\{]\\s*dot\\s*[\\]\\)\\}]\\s*|\\s+dot\\s+|\\s*\\.\\s*)';
  // Local part: one or more letters/digits/dots/dashes/underscores/pluses
  const local = '([A-Za-z0-9._%+-]{1,64})';
  // Domain label fragment
  const label = '([A-Za-z0-9-]{1,63})';
  // Build a regex: local @ label dot label (dot label)?
  const re = new RegExp(
    `${local}${atTok}${label}${dotTok}${label}(?:${dotTok}${label})?`,
    'gi',
  );
  let m: RegExpExecArray | null;
  while ((m = re.exec(compact)) !== null) {
    const local_ = m[1]!.toLowerCase();
    const labels = [m[2], m[3], m[4]].filter(Boolean) as string[];
    if (labels.length < 2) continue;
    const domain = labels.join('.').toLowerCase();
    const email = `${local_}@${domain}`;
    // Guard against silly matches like "X at Y dot Z" where Z is "com" but
    // local is just "x" — still keep, the post-filter rejects junk.
    if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
      out.add(email);
    }
  }
  return [...out];
}

// 4) `mailto:` href extraction. Cheap but very high signal.
export function extractMailtoEmails(html: string): string[] {
  const out = new Set<string>();
  const re = /mailto:([^"'\s?<>]+)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const raw = decodeURIComponent(m[1]!).trim().toLowerCase();
    out.add(raw);
  }
  return [...out];
}
