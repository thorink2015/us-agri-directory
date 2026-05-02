import { ImageResponse } from 'next/og';
import {
  getCity,
  getQualifyingCities,
  getCityServiceBreakdown,
  getCityCropBreakdown,
} from '@/data/cities';
import { CROP_NAME_MAP } from '@/data/crops';
import { SERVICE_LABELS } from '@/data/types';
import { getStateData } from '@/data/states';

export const runtime = 'nodejs';
export const alt = 'US Ag Drone Directory — drone spraying services for this city';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamicParams = false;

export async function generateStaticParams() {
  return getQualifyingCities().map((c) => ({ slug: c.stateSlug, city: c.slug }));
}

interface Props {
  params: { slug: string; city: string };
}

export default async function Image({ params }: Props) {
  const city = getCity(params.slug, params.city);
  const stateData = city ? getStateData(city.stateSlug) : undefined;
  const cityName = city?.city ?? params.city;
  const stateName = city?.stateName ?? params.slug;
  const stateAbbr = stateData?.abbreviation ?? stateName;

  // Pick top crop or top service for the contextual line.
  const topCrop = city
    ? getCityCropBreakdown(city)
        .map((b) => CROP_NAME_MAP[b.slug])
        .filter(Boolean)[0]
    : undefined;
  const topService = city
    ? getCityServiceBreakdown(city)
        .map((s) => SERVICE_LABELS[s.service])
        .filter(Boolean)[0]
    : undefined;
  const opCount = city?.operators.length ?? 0;
  const subline = topCrop
    ? `Top crop: ${topCrop} · ${opCount} operator${opCount === 1 ? '' : 's'}`
    : topService
      ? `${topService} · ${opCount} operator${opCount === 1 ? '' : 's'}`
      : `Verified ${stateName} drone operators`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a3726 0%, #2D6A4F 60%, #1a3726 100%)',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 60,
            backgroundColor: 'rgba(255,255,255,0.12)',
            borderRadius: 8,
            padding: '6px 16px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: 18,
            letterSpacing: 1,
          }}
        >
          agdronedirectory.com
        </div>
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 60,
            backgroundColor: 'rgba(255,209,102,0.18)',
            borderRadius: 8,
            padding: '6px 16px',
            color: '#FFD166',
            fontSize: 18,
            letterSpacing: 1,
            fontWeight: 600,
          }}
        >
          Drone Spraying · 2026
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            marginBottom: 28,
            color: 'rgba(255,255,255,0.78)',
            fontSize: 28,
            letterSpacing: 0.5,
          }}
        >
          <span style={{ fontSize: 36 }}>📍</span>
          <span>{stateName}</span>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 96,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: -3,
            lineHeight: 1,
            textAlign: 'center',
            maxWidth: 1080,
          }}
        >
          <span>{cityName}</span>
          <span style={{ color: '#FFD166' }}>, {stateAbbr}</span>
        </div>

        <div
          style={{
            fontSize: 36,
            color: 'rgba(255,255,255,0.88)',
            textAlign: 'center',
            marginTop: 24,
            maxWidth: 980,
            lineHeight: 1.3,
          }}
        >
          Agricultural Drone Services
        </div>

        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            marginTop: 18,
            maxWidth: 1000,
            lineHeight: 1.4,
          }}
        >
          {subline}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            color: 'rgba(255,255,255,0.6)',
            fontSize: 18,
          }}
        >
          <span>FAA Part 137</span>
          <span>·</span>
          <span>State licensing</span>
          <span>·</span>
          <span>2026 rates</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
