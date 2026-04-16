#!/usr/bin/env node
/**
 * IndexNow ping script.
 *
 * Fetches the live sitemap.xml, extracts every URL, and POSTs them to the
 * IndexNow API. Search engines that participate (Bing, Yandex, Seznam,
 * Naver, Yep) will crawl the submitted URLs within minutes.
 *
 * Run manually after a content deploy:
 *   npm run indexnow:ping
 *
 * Or integrate into Netlify post-deploy via a Build Hook that triggers a
 * GitHub Action / serverless function invoking this script.
 *
 * Key verification: IndexNow expects the key to be hosted at
 * https://agdronedirectory.com/199aa73a01c74f6786948b45aaec2d17.txt — already in /public.
 *
 * Docs: https://www.indexnow.org/documentation
 */

const HOST = 'agdronedirectory.com';
const KEY = '199aa73a01c74f6786948b45aaec2d17';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

// IndexNow limits: max 10,000 URLs per request.
const MAX_PER_REQUEST = 10000;

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Sitemap fetch failed: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) {
    throw new Error('Sitemap contained no <loc> entries');
  }
  return urls;
}

async function submitBatch(urls) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  return { status: res.status, text: await res.text().catch(() => '') };
}

async function main() {
  console.log(`[indexnow] fetching ${SITEMAP_URL}`);
  const urls = await fetchSitemapUrls();
  console.log(`[indexnow] ${urls.length} URLs to submit`);

  for (let i = 0; i < urls.length; i += MAX_PER_REQUEST) {
    const batch = urls.slice(i, i + MAX_PER_REQUEST);
    console.log(`[indexnow] submitting batch ${i / MAX_PER_REQUEST + 1}: ${batch.length} URLs`);
    const { status, text } = await submitBatch(batch);
    if (status >= 200 && status < 300) {
      console.log(`[indexnow] batch accepted (${status})`);
    } else {
      console.error(`[indexnow] batch rejected (${status}): ${text}`);
      process.exitCode = 1;
    }
  }
}

main().catch((err) => {
  console.error('[indexnow] error:', err.message);
  process.exit(1);
});
