// Tunables. Change here, not scattered through the code.

export const CONFIG = {
  // Realistic Chrome-on-macOS UA. Some sites 403 default Node fetch.
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  acceptLanguage: 'en-US,en;q=0.9',

  // Per-page network timeout.
  pageTimeoutMs: 30_000,
  // Total per-site budget across all candidate pages.
  perSiteBudgetMs: 60_000,

  // Cross-domain parallelism. Never hit the same domain twice at once.
  defaultConcurrency: 5,
  // Random jitter between hits to the same domain.
  defaultPerDomainDelayMs: 2_500,

  // One retry on transient failure, with a longer timeout.
  retry: {
    attempts: 1,
    timeoutMs: 60_000,
  },

  // Pages we attempt for each site, in priority order. Homepage first
  // because the footer often holds the email; contact pages second.
  candidatePaths: [
    '/',
    '/contact',
    '/contact-us',
    '/contact/',
    '/contact-us/',
    '/get-in-touch',
    '/about',
    '/about-us',
    '/about/',
    '/about-us/',
  ] as const,

  // Hard cap on bytes per page to avoid pulling huge PDF/image responses.
  maxResponseBytes: 2_500_000,

  // Save resumable progress every N completions.
  progressFlushEvery: 10,
} as const;
