import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: 'linear-gradient(135deg, #1a3726 0%, #2D6A4F 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Stylised "A" for Ag + drone wing shape */}
        <div
          style={{
            color: '#FFD166',
            fontSize: 18,
            fontWeight: 800,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: -1,
            lineHeight: 1,
          }}
        >
          A
        </div>
      </div>
    ),
    { ...size },
  );
}
