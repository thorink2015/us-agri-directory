import { readFileSync } from 'fs';

const src = readFileSync('/home/user/us-agri-directory/src/data/services.ts', 'utf8');
// Extract blocks starting at slug and authorityLinks
const slugRe = /slug:\s*'([^']+)'/g;
const slugs = [];
let m;
while ((m = slugRe.exec(src)) !== null) slugs.push({ slug: m[1], idx: m.index });

const authRe = /authorityLinks:\s*\[([\s\S]*?)\]/g;
const blocks = [];
while ((m = authRe.exec(src)) !== null) blocks.push({ body: m[1], idx: m.index });

// Match each block to the last slug before it
const rows = [];
for (const b of blocks) {
  const owner = [...slugs].reverse().find((s) => s.idx < b.idx);
  const linkRe = /\{\s*label:\s*'([^']+)',\s*url:\s*'([^']+)'\s*\}/g;
  let lm;
  while ((lm = linkRe.exec(b.body)) !== null) {
    rows.push({ page: owner.slug, label: lm[1], url: lm[2] });
  }
}

async function check(url) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 15000);
  try {
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal, headers: { 'user-agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)' } });
    if ([403, 405, 501].includes(res.status)) {
      res = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal, headers: { 'user-agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)' } });
    }
    return { status: res.status, finalUrl: res.url };
  } catch (e) {
    return { status: `ERR:${e.name}`, finalUrl: '' };
  } finally {
    clearTimeout(t);
  }
}

console.log(`Checking ${rows.length} URLs...\n`);
console.log('STATUS | PAGE         | LABEL | URL');
console.log('-------+--------------+-------+----');
const results = [];
for (const r of rows) {
  const res = await check(r.url);
  results.push({ ...r, ...res });
  const flag = res.status === 200 ? '  OK  ' : ` ${String(res.status).padEnd(4)} `;
  console.log(`${flag} | ${r.page.padEnd(12)} | ${r.label}\n       | URL: ${r.url}`);
  if (res.finalUrl && res.finalUrl !== r.url) console.log(`       | -> ${res.finalUrl}`);
}

const bad = results.filter((r) => r.status !== 200);
console.log(`\n${'='.repeat(60)}\nFLAGGED (${bad.length} non-200):\n${'='.repeat(60)}`);
for (const r of bad) {
  console.log(`[${r.status}] ${r.page} :: ${r.label}\n        ${r.url}`);
}
