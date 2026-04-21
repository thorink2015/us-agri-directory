import { MetadataRoute } from 'next';
import { operators } from '@/data/operators';
import { counties } from '@/data/counties';
import { crops } from '@/data/crops';
import { services } from '@/data/services';
import { drones as droneModels } from '@/data/drone-model';
import { regions } from '@/data/regions';
import { blogPosts } from '@/data/blog-posts';
import { guides } from '@/data/guides';
import { getQualifyingCities } from '@/data/cities';
import { SERVICE_LABELS } from '@/data/types';

const BASE_URL = 'https://agdronedirectory.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ─── Static pages ────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/operators`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/map`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/states`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/crops`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/drones`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/regions`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/guides`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/buyers-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/start-a-drone-business`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/grants-and-subsidies`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/insurance`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/training-and-certification`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/regulations`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/regulations/faa-part-107`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/regulations/faa-part-137`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/regulations/state-licensing`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/regulations/ndaa-compliance`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/comparisons/drone-vs-ground-rig`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/comparisons/drone-vs-airplane`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/list-your-business`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/glossary`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // ─── Operator profiles ───────────────────────────────────────────────────
  const operatorPages: MetadataRoute.Sitemap = operators.map((op) => ({
    url: `${BASE_URL}/operators/${op.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // ─── State pages (50 × 1 = 50) ───────────────────────────────────────────
  const countyPages: MetadataRoute.Sitemap = counties.map((c) => ({
    url: `${BASE_URL}/states/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // ─── State + Crop pages (50 × 8 = 400) ───────────────────────────────────
  const countyCropPages: MetadataRoute.Sitemap = counties.flatMap((county) =>
    crops.map((crop) => ({
      url: `${BASE_URL}/states/${county.slug}/crops/${crop.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // ─── State + Service pages (50 × N) ─────────────────────────────────────
  const serviceKeys = Object.keys(SERVICE_LABELS);
  const countyServicePages: MetadataRoute.Sitemap = counties.flatMap((county) =>
    serviceKeys.map((serviceKey) => ({
      url: `${BASE_URL}/states/${county.slug}/services/${serviceKey}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // ─── State operator index pages (50) ─────────────────────────────────────
  const countyOperatorPages: MetadataRoute.Sitemap = counties.map((c) => ({
    url: `${BASE_URL}/states/${c.slug}/operators`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  // ─── City pages (cities meeting the operator threshold) ──────────────────
  const cityPages: MetadataRoute.Sitemap = getQualifyingCities().map((c) => ({
    url: `${BASE_URL}/states/${c.stateSlug}/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ─── Crop pages (8) ──────────────────────────────────────────────────────
  const cropPages: MetadataRoute.Sitemap = crops.map((c) => ({
    url: `${BASE_URL}/crops/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ─── Service pages ───────────────────────────────────────────────────────
  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  // ─── Drone model pages ───────────────────────────────────────────────────
  const dronePages: MetadataRoute.Sitemap = droneModels.map((d) => ({
    url: `${BASE_URL}/drones/${d.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  // ─── Region hub pages ────────────────────────────────────────────────────
  const regionPages: MetadataRoute.Sitemap = regions.map((r) => ({
    url: `${BASE_URL}/regions/${r.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  // ─── Blog posts ──────────────────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(p.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ─── Guide posts ─────────────────────────────────────────────────────────
  const guidePages: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${BASE_URL}/guides/${g.slug}`,
    lastModified: g.lastUpdated ? new Date(g.lastUpdated) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ─── Tool pages ─────────────────────────────────────────────────────────
  const toolPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/tools/spray-cost-calculator`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/tools/roi-calculator`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/tools/coverage-calculator`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/tools/acreage-converter`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${BASE_URL}/tools/drone-comparison`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${BASE_URL}/tools/treatment-calendar`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.65 },
  ];

  return [
    ...staticPages,          // 27
    ...operatorPages,        // N operators
    ...countyPages,          // 50
    ...countyOperatorPages,  // 50
    ...cityPages,            // N qualifying cities (≥2 operators)
    ...countyCropPages,      // 50 × 8 = 400
    ...countyServicePages,   // 50 × 10 = 500
    ...cropPages,            // 8
    ...servicePages,         // 10
    ...dronePages,           // 8
    ...regionPages,          // 5
    ...blogPages,            // 10
    ...guidePages,           // N guides
    ...toolPages,            // 7
  ];
}
