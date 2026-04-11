import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'TerraDron.ro: Director Operatori Drone Agricole din România și Moldova';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
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
        {/* Top badge */}
        <div style={{
          position: 'absolute',
          top: 40,
          left: 60,
          backgroundColor: 'rgba(255,255,255,0.12)',
          borderRadius: 8,
          padding: '6px 16px',
          color: 'rgba(255,255,255,0.7)',
          fontSize: 18,
          letterSpacing: 1,
        }}>
          terradron.ro
        </div>

        {/* Main logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 36 }}>
          <div style={{
            width: 90,
            height: 90,
            borderRadius: 20,
            backgroundColor: 'rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 52,
          }}>
            ✈
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 68, fontWeight: 800, color: '#ffffff', letterSpacing: -2, lineHeight: 1 }}>
              TerraDron
              <span style={{ color: '#FFD166' }}>.ro</span>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: 30,
          color: 'rgba(255,255,255,0.82)',
          textAlign: 'center',
          maxWidth: 860,
          lineHeight: 1.45,
          marginBottom: 44,
        }}>
          Directorul complet al operatorilor de drone agricole din România și Moldova
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            '23 operatori verificați',
            '41 județe acoperite',
            '993 pagini indexabile',
          ].map((stat) => (
            <div key={stat} style={{
              backgroundColor: 'rgba(255,255,255,0.14)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 10,
              padding: '12px 22px',
              color: '#ffffff',
              fontSize: 20,
              fontWeight: 500,
            }}>
              {stat}
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <div style={{
          position: 'absolute',
          bottom: 36,
          fontSize: 18,
          color: 'rgba(255,255,255,0.45)',
        }}>
          Pulverizare · Fertilizare · Monitorizare NDVI · Cartografiere
        </div>
      </div>
    ),
    { ...size },
  );
}
