import { MetadataRoute } from 'next';
import { operators } from '@/data/operators';
import { counties } from '@/data/counties';
import { crops } from '@/data/crops';
import { services } from '@/data/services';
import { droneModels } from '@/data/drone-models';
import { SERVICE_LABELS } from '@/data/types';

const BASE_URL = 'https://usagdronedirectory.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ─── Static pages ────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/operatori`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/judete`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/culturi`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/servicii`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/drone`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/list-your-business`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/despre`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // ─── Operator profiles ───────────────────────────────────────────────────
  const operatorPages: MetadataRoute.Sitemap = operators.map((op) => ({
    url: `${BASE_URL}/operatori/${op.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // ─── State pages (50 × 1 = 50) ───────────────────────────────────────────
  const countyPages: MetadataRoute.Sitemap = counties.map((c) => ({
    url: `${BASE_URL}/judete/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // ─── State + Crop pages (50 × 8 = 400) ───────────────────────────────────
  const countyCropPages: MetadataRoute.Sitemap = counties.flatMap((county) =>
    crops.map((crop) => ({
      url: `${BASE_URL}/judete/${county.slug}/culturi/${crop.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // ─── State + Service pages (50 × N) ─────────────────────────────────────
  const serviceKeys = Object.keys(SERVICE_LABELS);
  const countyServicePages: MetadataRoute.Sitemap = counties.flatMap((county) =>
    serviceKeys.map((serviceKey) => ({
      url: `${BASE_URL}/judete/${county.slug}/servicii/${serviceKey}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // ─── Crop pages (8) ──────────────────────────────────────────────────────
  const cropPages: MetadataRoute.Sitemap = crops.map((c) => ({
    url: `${BASE_URL}/culturi/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ─── Service pages ───────────────────────────────────────────────────────
  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/servicii/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  // ─── Drone model pages ───────────────────────────────────────────────────
  const dronePages: MetadataRoute.Sitemap = droneModels.map((d) => ({
    url: `${BASE_URL}/drone/${d.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  return [
    ...staticPages,        // 12
    ...operatorPages,      // 10+
    ...countyPages,        // 50
    ...countyCropPages,    // 400
    ...countyServicePages, // 400+
    ...cropPages,          // 8
    ...servicePages,       // 6+
    ...dronePages,         // 5
    // Total: ~900+ URLs
  ];
}
