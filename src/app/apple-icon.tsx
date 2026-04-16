import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 36,
          background: 'linear-gradient(135deg, #1a3726 0%, #2D6A4F 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
        }}
      >
        {/* Drone icon: plane emoji styled */}
        <div
          style={{
            fontSize: 72,
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          ✈
        </div>
        {/* "AG" label */}
        <div
          style={{
            color: '#FFD166',
            fontSize: 32,
            fontWeight: 800,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: 2,
            lineHeight: 1,
          }}
        >
          AG
        </div>
      </div>
    ),
    { ...size },
  );
}
