import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
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
    ],
    sitemap: 'https://agdronedirectory.com/sitemap.xml',
  };
}
