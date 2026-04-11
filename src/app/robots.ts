import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // ── AI crawlers — explicit allow for citation advantage ──────────────
      { userAgent: 'GPTBot', allow: '/' },           // OpenAI / ChatGPT
      { userAgent: 'OAI-SearchBot', allow: '/' },    // OpenAI search
      { userAgent: 'PerplexityBot', allow: '/' },    // Perplexity AI
      { userAgent: 'Google-Extended', allow: '/' },  // Google AI / Gemini
      { userAgent: 'anthropic-ai', allow: '/' },     // Anthropic / Claude
      { userAgent: 'Claude-Web', allow: '/' },       // Claude web browsing
      { userAgent: 'cohere-ai', allow: '/' },        // Cohere
      { userAgent: 'CCBot', allow: '/' },            // Common Crawl (LLM training)
      { userAgent: 'Diffbot', allow: '/' },          // Diffbot AI
      { userAgent: 'Applebot', allow: '/' },         // Apple / Siri
      { userAgent: 'Bytespider', allow: '/' },       // ByteDance AI
      { userAgent: 'YouBot', allow: '/' },           // You.com
      { userAgent: 'meta-externalagent', allow: '/' }, // Meta AI
    ],
    sitemap: 'https://terradron.ro/sitemap.xml',
  };
}
