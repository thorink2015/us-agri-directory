import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_memory/', '/_research/', '/_handoff/', '/api/', '/go/'],
      },
      // ── AI crawlers, explicit allow for citation advantage ──────────────
      { userAgent: 'GPTBot', allow: '/' },                // OpenAI / ChatGPT training
      { userAgent: 'OAI-SearchBot', allow: '/' },         // OpenAI SearchGPT
      { userAgent: 'ChatGPT-User', allow: '/' },          // ChatGPT browsing mode
      { userAgent: 'PerplexityBot', allow: '/' },         // Perplexity AI
      { userAgent: 'Perplexity-User', allow: '/' },       // Perplexity user-initiated fetch
      { userAgent: 'Google-Extended', allow: '/' },       // Google Gemini / Bard
      { userAgent: 'Googlebot', allow: '/' },             // Google Search
      { userAgent: 'Googlebot-Image', allow: '/' },       // Google Images
      { userAgent: 'anthropic-ai', allow: '/' },          // Anthropic legacy
      { userAgent: 'Claude-Web', allow: '/' },            // Claude web browsing
      { userAgent: 'ClaudeBot', allow: '/' },             // Anthropic / Claude canonical crawler
      { userAgent: 'cohere-ai', allow: '/' },             // Cohere
      { userAgent: 'CCBot', allow: '/' },                 // Common Crawl (LLM training)
      { userAgent: 'Diffbot', allow: '/' },               // Diffbot AI
      { userAgent: 'Applebot', allow: '/' },              // Apple / Siri classic
      { userAgent: 'Applebot-Extended', allow: '/' },     // Apple Intelligence / LLMs
      { userAgent: 'Bytespider', allow: '/' },            // ByteDance AI
      { userAgent: 'YouBot', allow: '/' },                // You.com
      { userAgent: 'meta-externalagent', allow: '/' },    // Meta AI
      { userAgent: 'FacebookBot', allow: '/' },           // Meta translation
      { userAgent: 'Amazonbot', allow: '/' },             // Amazon / Alexa
      { userAgent: 'Bingbot', allow: '/' },               // Bing Search / Copilot
      { userAgent: 'DuckDuckBot', allow: '/' },           // DuckDuckGo
      { userAgent: 'MistralAI-User', allow: '/' },        // Mistral AI
      { userAgent: 'xAI-Bot', allow: '/' },               // xAI / Grok
      { userAgent: 'Grok', allow: '/' },                  // Grok alias
      { userAgent: 'Timpibot', allow: '/' },              // Timpi search (AI search index)

      // ── AdSense crawler: keep off thin / templated routes ─────────────
      // Mediapartners-Google scores page quality for ad eligibility. It
      // does NOT respect <meta name="robots" content="noindex">, so the
      // sitewide gates in `src/lib/indexing-gates.ts` aren't enough on
      // their own; we have to block the same URL classes here too.
      // Googlebot (search) is unaffected — the `*` rule above keeps it
      // crawling everything that isn't already noindex'd.
      // Patterns below mirror the indexing-gate predicates so the
      // AdSense crawler only scores rich, indexable pages.
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
        disallow: [
          // Sparse state-operator list pages (PR #97, <9 ops): 9 states
          '/states/alaska/operators',
          '/states/arizona/operators',
          '/states/hawaii/operators',
          '/states/nevada/operators',
          '/states/new-mexico/operators',
          '/states/rhode-island/operators',
          '/states/utah/operators',
          '/states/wisconsin/operators',
          '/states/wyoming/operators',
          // Per-city pages: many seeded cities have 0 direct operators
          // and lean on a statewide fallback list. Block the whole
          // city URL class from AdSense scoring; Googlebot still
          // indexes the ~215 of 216 that pass the city noindex gate.
          '/states/*/cities/',
          // State+crop and state+service combos: 323 of 900 are
          // noindex'd today (99 crops + 224 services). Cheap to block
          // the entire URL class for AdSense; the indexable ones
          // still earn search traffic via Googlebot.
          '/states/*/crops/',
          '/states/*/services/',
        ],
      },
    ],
    sitemap: 'https://agdronedirectory.com/sitemap.xml',
  };
}
