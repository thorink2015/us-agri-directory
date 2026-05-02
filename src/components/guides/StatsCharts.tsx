/**
 * Inline SVG chart components for the agricultural-drone-spraying-statistics-2026
 * guide. Inline SVG keeps the page weight minimal (no extra HTTP requests),
 * scales crisply at any zoom or DPI, and exposes data to screen readers and
 * AI engines via <title>, <desc>, and <text> labels.
 *
 * Brand palette: green-900 #14532d, green-700 #15803d, green-500 #22c55e,
 * amber-700 #b45309, amber-400 #fbbf24, stone-200 #e7e5e4, slate-500 #64748b.
 *
 * Every chart is decoratively styled but content-rich: numbers, units, and
 * source labels are rendered as real <text> nodes so AEO answer engines can
 * lift them. Each chart is wrapped with role="img" + aria-labelledby for
 * AT support.
 */

type ChartProps = {
  className?: string;
};

const COLORS = {
  green900: '#14532d',
  green800: '#166534',
  green700: '#15803d',
  green500: '#22c55e',
  green100: '#dcfce7',
  amber700: '#b45309',
  amber500: '#f59e0b',
  amber400: '#fbbf24',
  amber100: '#fef3c7',
  stone200: '#e7e5e4',
  stone400: '#a8a29e',
  slate700: '#334155',
  slate500: '#64748b',
  slate400: '#94a3b8',
  white: '#ffffff',
};

/* ------------------------------------------------------------------ */
/* 1. Hero illustration: stylized spray drone over crop rows           */
/* ------------------------------------------------------------------ */
export function HeroDroneIllustration({ className }: ChartProps) {
  return (
    <svg
      viewBox="0 0 800 320"
      role="img"
      aria-labelledby="hero-drone-title hero-drone-desc"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="hero-drone-title">
        Agricultural spray drone treating US cropland in 2025
      </title>
      <desc id="hero-drone-desc">
        Stylized illustration of a four-rotor agricultural spray drone applying
        a fine mist over rows of crops at low altitude, with rolling fields and
        a sun in the background. Represents the 16.4 million US acres treated
        by spray drones in 2025.
      </desc>

      {/* Sky */}
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="60%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <linearGradient id="hero-field" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.green500} />
          <stop offset="100%" stopColor={COLORS.green800} />
        </linearGradient>
        <linearGradient id="hero-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#bae6fd" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="800" height="220" fill="url(#hero-sky)" />

      {/* Sun */}
      <circle cx="660" cy="80" r="38" fill={COLORS.amber400} opacity="0.9" />
      <circle cx="660" cy="80" r="54" fill={COLORS.amber400} opacity="0.18" />

      {/* Distant hills */}
      <path
        d="M 0 200 Q 150 150 300 175 T 600 165 T 800 180 L 800 220 L 0 220 Z"
        fill={COLORS.green800}
        opacity="0.55"
      />
      <path
        d="M 0 215 Q 200 180 400 195 T 800 200 L 800 240 L 0 240 Z"
        fill={COLORS.green700}
        opacity="0.7"
      />

      {/* Foreground field */}
      <rect x="0" y="220" width="800" height="100" fill="url(#hero-field)" />

      {/* Crop rows (perspective lines) */}
      <g stroke={COLORS.green900} strokeWidth="1.6" opacity="0.45">
        <line x1="-80" y1="320" x2="380" y2="220" />
        <line x1="40" y1="320" x2="392" y2="220" />
        <line x1="160" y1="320" x2="404" y2="220" />
        <line x1="280" y1="320" x2="416" y2="220" />
        <line x1="400" y1="320" x2="428" y2="220" />
        <line x1="520" y1="320" x2="440" y2="220" />
        <line x1="640" y1="320" x2="452" y2="220" />
        <line x1="760" y1="320" x2="464" y2="220" />
        <line x1="880" y1="320" x2="476" y2="220" />
      </g>

      {/* Mist plume */}
      <ellipse
        cx="280"
        cy="190"
        rx="105"
        ry="42"
        fill="url(#hero-mist)"
      />
      <ellipse cx="280" cy="178" rx="80" ry="20" fill="url(#hero-mist)" />

      {/* Drone body */}
      <g>
        {/* Arms */}
        <line x1="220" y1="148" x2="170" y2="120" stroke={COLORS.slate700} strokeWidth="6" strokeLinecap="round" />
        <line x1="220" y1="148" x2="170" y2="176" stroke={COLORS.slate700} strokeWidth="6" strokeLinecap="round" />
        <line x1="340" y1="148" x2="390" y2="120" stroke={COLORS.slate700} strokeWidth="6" strokeLinecap="round" />
        <line x1="340" y1="148" x2="390" y2="176" stroke={COLORS.slate700} strokeWidth="6" strokeLinecap="round" />

        {/* Tank/body */}
        <rect x="220" y="132" width="120" height="32" rx="8" fill={COLORS.green900} />
        <rect x="234" y="118" width="92" height="20" rx="6" fill={COLORS.amber700} />
        <rect x="240" y="122" width="80" height="12" rx="3" fill={COLORS.amber400} opacity="0.8" />

        {/* Spray nozzles */}
        <line x1="240" y1="164" x2="240" y2="176" stroke={COLORS.slate500} strokeWidth="3" />
        <line x1="280" y1="164" x2="280" y2="176" stroke={COLORS.slate500} strokeWidth="3" />
        <line x1="320" y1="164" x2="320" y2="176" stroke={COLORS.slate500} strokeWidth="3" />

        {/* Rotors */}
        <ellipse cx="170" cy="120" rx="32" ry="4" fill={COLORS.slate400} opacity="0.6" />
        <ellipse cx="170" cy="176" rx="32" ry="4" fill={COLORS.slate400} opacity="0.6" />
        <ellipse cx="390" cy="120" rx="32" ry="4" fill={COLORS.slate400} opacity="0.6" />
        <ellipse cx="390" cy="176" rx="32" ry="4" fill={COLORS.slate400} opacity="0.6" />
        <circle cx="170" cy="120" r="5" fill={COLORS.slate700} />
        <circle cx="170" cy="176" r="5" fill={COLORS.slate700} />
        <circle cx="390" cy="120" r="5" fill={COLORS.slate700} />
        <circle cx="390" cy="176" r="5" fill={COLORS.slate700} />
      </g>

      {/* Caption-style stat overlay */}
      <g fontFamily="ui-sans-serif, system-ui, sans-serif">
        <rect x="490" y="232" width="270" height="64" rx="8" fill={COLORS.white} opacity="0.92" />
        <text x="504" y="254" fontSize="13" fontWeight="700" fill={COLORS.green900}>
          16.4 million US acres
        </text>
        <text x="504" y="272" fontSize="11" fill={COLORS.slate700}>
          treated by spray drones in 2025
        </text>
        <text x="504" y="288" fontSize="10" fill={COLORS.slate500}>
          Source: ASDC 2025 Impact Survey
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Adoption curve: 3.7M (2023), 10.3M (2024), 16.4M (2025)          */
/* ------------------------------------------------------------------ */
export function AdoptionCurveChart({ className }: ChartProps) {
  const data = [
    { year: '2023', value: 3.7 },
    { year: '2024', value: 10.3 },
    { year: '2025', value: 16.4 },
  ];
  const maxVal = 18;
  const w = 720;
  const h = 320;
  const pad = { top: 30, right: 30, bottom: 60, left: 60 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;
  const barW = chartW / data.length / 1.6;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-labelledby="adoption-title adoption-desc"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="adoption-title">
        US ag spray drone treated acreage, 2023 to 2025
      </title>
      <desc id="adoption-desc">
        Bar chart showing US cropland treated by spray drones grew from 3.7
        million acres in 2023 to 10.3 million in 2024 to 16.4 million in 2025,
        roughly a 4.4-fold increase over two years. Source: American Spray
        Drone Coalition 2025 Impact Survey.
      </desc>

      <rect width={w} height={h} fill={COLORS.white} />

      {/* Y-axis gridlines */}
      <g fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="11" fill={COLORS.slate500}>
        {[0, 5, 10, 15].map((tick) => {
          const y = pad.top + chartH - (tick / maxVal) * chartH;
          return (
            <g key={tick}>
              <line x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke={COLORS.stone200} strokeWidth="1" />
              <text x={pad.left - 10} y={y + 4} textAnchor="end">
                {tick}M
              </text>
            </g>
          );
        })}
      </g>

      {/* Bars */}
      {data.map((d, i) => {
        const x = pad.left + (i + 0.5) * (chartW / data.length) - barW / 2;
        const barH = (d.value / maxVal) * chartH;
        const y = pad.top + chartH - barH;
        return (
          <g key={d.year}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              fill={i === data.length - 1 ? COLORS.green700 : COLORS.green500}
              rx="3"
            />
            <text
              x={x + barW / 2}
              y={y - 10}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.green900}
            >
              {d.value}M
            </text>
            <text
              x={x + barW / 2}
              y={pad.top + chartH + 22}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="13"
              fontWeight="600"
              fill={COLORS.slate700}
            >
              {d.year}
            </text>
          </g>
        );
      })}

      {/* Y-axis label */}
      <text
        x={20}
        y={pad.top + chartH / 2}
        transform={`rotate(-90 20 ${pad.top + chartH / 2})`}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
        fill={COLORS.slate500}
      >
        US acres treated (millions)
      </text>

      {/* Source */}
      <text
        x={w - pad.right}
        y={h - 10}
        textAnchor="end"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fill={COLORS.slate500}
      >
        Source: ASDC 2025 Impact Survey (Jan 2026)
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Market-size spread: 9 firms' 2025 estimates                       */
/* ------------------------------------------------------------------ */
export function MarketSizeSpreadChart({ className }: ChartProps) {
  const data = [
    { firm: 'Mordor (current report)', value: 1.5, scope: 'Global' },
    { firm: 'Precedence Research', value: 1.92, scope: 'Global' },
    { firm: 'MarketsandMarkets', value: 2.63, scope: 'Global' },
    { firm: 'Grand View (global)', value: 3.37, scope: 'Global' },
    { firm: 'Business Research Co.', value: 3.39, scope: 'Global' },
    { firm: 'IMARC Group', value: 3.46, scope: 'Global' },
    { firm: 'DRONEII', value: 3.6, scope: 'Global (2024)' },
    { firm: 'Fortune Business Insights', value: 7.4, scope: 'Global' },
    { firm: 'Grand View (US-only)', value: 0.6147, scope: 'US-only', highlight: true },
  ];

  const maxVal = 8;
  const w = 760;
  const rowH = 30;
  const headerH = 40;
  const footerH = 60;
  const labelW = 230;
  const chartW = w - labelW - 60;
  const h = headerH + rowH * data.length + footerH;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-labelledby="market-title market-desc"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="market-title">
        2025 ag drone market size estimates by research firm
      </title>
      <desc id="market-desc">
        Horizontal bar chart comparing nine 2025 ag drone market size estimates.
        Global estimates range from $1.5 billion (Mordor) to $7.4 billion
        (Fortune Business Insights), a roughly five-fold spread. Grand View
        Research&apos;s US-only estimate is $614.7 million, the figure
        recommended for US-focused decisions.
      </desc>

      <rect width={w} height={h} fill={COLORS.white} />

      {/* Header */}
      <text
        x={20}
        y={24}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="12"
        fontWeight="700"
        fill={COLORS.slate700}
      >
        Research firm
      </text>
      <text
        x={labelW + 10}
        y={24}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="12"
        fontWeight="700"
        fill={COLORS.slate700}
      >
        2025 market size estimate (USD billions)
      </text>

      {/* Gridlines */}
      {[0, 2, 4, 6, 8].map((tick) => {
        const x = labelW + (tick / maxVal) * chartW;
        return (
          <g key={tick}>
            <line
              x1={x}
              y1={headerH - 5}
              x2={x}
              y2={headerH + rowH * data.length}
              stroke={COLORS.stone200}
              strokeWidth="1"
            />
            <text
              x={x}
              y={headerH + rowH * data.length + 16}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="11"
              fill={COLORS.slate500}
            >
              ${tick}B
            </text>
          </g>
        );
      })}

      {/* Rows */}
      {data.map((d, i) => {
        const y = headerH + i * rowH;
        const barW = (d.value / maxVal) * chartW;
        const fill = d.highlight ? COLORS.amber700 : COLORS.green700;
        return (
          <g key={d.firm}>
            <text
              x={labelW - 10}
              y={y + rowH / 2 + 4}
              textAnchor="end"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="11"
              fontWeight={d.highlight ? 700 : 500}
              fill={d.highlight ? COLORS.amber700 : COLORS.slate700}
            >
              {d.firm}
            </text>
            <rect
              x={labelW}
              y={y + 6}
              width={Math.max(barW, 2)}
              height={rowH - 12}
              fill={fill}
              rx="2"
            />
            <text
              x={labelW + barW + 6}
              y={y + rowH / 2 + 4}
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="11"
              fontWeight="600"
              fill={d.highlight ? COLORS.amber700 : COLORS.green900}
            >
              ${d.value.toFixed(d.value < 1 ? 3 : 2)}B
              <tspan fill={COLORS.slate500} fontWeight="400">
                {' '}· {d.scope}
              </tspan>
            </text>
          </g>
        );
      })}

      {/* Source */}
      <text
        x={w - 20}
        y={h - 12}
        textAnchor="end"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fill={COLORS.slate500}
      >
        Highlighted: US-only Grand View figure recommended for US decisions
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Per-acre price comparison: $21 (2024) vs $13 (2025)              */
/* ------------------------------------------------------------------ */
export function PriceComparisonChart({ className }: ChartProps) {
  const data = [
    { label: '2024 ASDC avg', value: 21, color: COLORS.slate400 },
    { label: '2025 ASDC avg', value: 13, color: COLORS.green700 },
    { label: 'MU Extension G1274 owner-op', value: 12.27, color: COLORS.green500 },
    { label: 'MU custom-hire low', value: 7.39, color: COLORS.amber400 },
    { label: 'MU custom-hire typical', value: 16, color: COLORS.amber700 },
  ];
  const maxVal = 24;
  const w = 720;
  const h = 360;
  const pad = { top: 40, right: 30, bottom: 90, left: 60 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;
  const barW = chartW / data.length / 1.6;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-labelledby="price-title price-desc"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="price-title">
        US drone spray price per acre, 2024 vs 2025 with reference points
      </title>
      <desc id="price-desc">
        Bar chart comparing US drone spraying per-acre prices. The ASDC
        national average fell from $21 per acre in 2024 to $13 per acre in
        2025, a 38 percent drop. University of Missouri Extension G1274
        reference points show owner-operator cost at $12.27, custom-hire low
        at $7.39, and typical custom-hire at $16 per acre.
      </desc>

      <rect width={w} height={h} fill={COLORS.white} />

      {/* Headline annotation */}
      <text
        x={pad.left}
        y={22}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.amber700}
      >
        ASDC national average fell 38% in one year
      </text>

      {/* Y-axis */}
      <g fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="11" fill={COLORS.slate500}>
        {[0, 5, 10, 15, 20].map((tick) => {
          const y = pad.top + chartH - (tick / maxVal) * chartH;
          return (
            <g key={tick}>
              <line x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke={COLORS.stone200} strokeWidth="1" />
              <text x={pad.left - 10} y={y + 4} textAnchor="end">
                ${tick}
              </text>
            </g>
          );
        })}
      </g>

      {/* Bars */}
      {data.map((d, i) => {
        const x = pad.left + (i + 0.5) * (chartW / data.length) - barW / 2;
        const barH = (d.value / maxVal) * chartH;
        const y = pad.top + chartH - barH;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barW} height={barH} fill={d.color} rx="3" />
            <text
              x={x + barW / 2}
              y={y - 8}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.green900}
            >
              ${d.value.toFixed(d.value % 1 === 0 ? 0 : 2)}
            </text>
            <g
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="10.5"
              fill={COLORS.slate700}
            >
              {d.label.split(' ').reduce<string[][]>((acc, word) => {
                const last = acc[acc.length - 1];
                if (!last || last.join(' ').length + word.length > 16) {
                  acc.push([word]);
                } else {
                  last.push(word);
                }
                return acc;
              }, []).map((line, li) => (
                <text
                  key={li}
                  x={x + barW / 2}
                  y={pad.top + chartH + 18 + li * 13}
                  textAnchor="middle"
                >
                  {line.join(' ')}
                </text>
              ))}
            </g>
          </g>
        );
      })}

      {/* Y-axis label */}
      <text
        x={20}
        y={pad.top + chartH / 2}
        transform={`rotate(-90 20 ${pad.top + chartH / 2})`}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
        fill={COLORS.slate500}
      >
        USD per acre
      </text>

      {/* Source */}
      <text
        x={w - pad.right}
        y={h - 8}
        textAnchor="end"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="10.5"
        fill={COLORS.slate500}
      >
        Sources: ASDC 2025 Impact Survey; University of Missouri Extension G1274
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Origin share: 2024 vs 2025 stacked bar                            */
/* ------------------------------------------------------------------ */
export function OriginShareChart({ className }: ChartProps) {
  const data = [
    { year: '2024', china: 93.5, us: 6.5 },
    { year: '2025', china: 75.75, us: 24.25 },
  ];
  const w = 720;
  const h = 320;
  const pad = { top: 50, right: 200, bottom: 60, left: 70 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;
  const barH = chartH / data.length / 1.5;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-labelledby="origin-title origin-desc"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="origin-title">
        US ag spray drone manufacturer origin share, 2024 vs 2025
      </title>
      <desc id="origin-desc">
        Horizontal stacked bar chart showing the Chinese-made share of US ag
        spray drone sales fell from 93.5 percent in 2024 to 75.75 percent in
        2025, while the US-made share grew from 6.5 percent to 24.25 percent.
        Source: American Spray Drone Coalition.
      </desc>

      <rect width={w} height={h} fill={COLORS.white} />

      <text
        x={pad.left}
        y={26}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.green900}
      >
        US-made share nearly quadrupled in one year
      </text>

      {data.map((d, i) => {
        const y = pad.top + i * (chartH / data.length) + (chartH / data.length - barH) / 2;
        const chinaW = (d.china / 100) * chartW;
        const usW = (d.us / 100) * chartW;
        return (
          <g key={d.year}>
            <text
              x={pad.left - 14}
              y={y + barH / 2 + 5}
              textAnchor="end"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.slate700}
            >
              {d.year}
            </text>

            {/* China segment */}
            <rect x={pad.left} y={y} width={chinaW} height={barH} fill={COLORS.amber700} rx="3" />
            <text
              x={pad.left + chinaW / 2}
              y={y + barH / 2 + 5}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="13"
              fontWeight="700"
              fill={COLORS.white}
            >
              {d.china}%
            </text>

            {/* US segment */}
            <rect x={pad.left + chinaW} y={y} width={usW} height={barH} fill={COLORS.green700} rx="3" />
            <text
              x={pad.left + chinaW + usW / 2}
              y={y + barH / 2 + 5}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="12"
              fontWeight="700"
              fill={COLORS.white}
            >
              {d.us}%
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <g fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="12" fill={COLORS.slate700}>
        <rect x={w - pad.right + 16} y={pad.top + 6} width="14" height="14" fill={COLORS.amber700} rx="2" />
        <text x={w - pad.right + 36} y={pad.top + 18}>
          Chinese-made (mostly DJI Agras)
        </text>
        <rect x={w - pad.right + 16} y={pad.top + 32} width="14" height="14" fill={COLORS.green700} rx="2" />
        <text x={w - pad.right + 36} y={pad.top + 44}>
          US-made (Hylio, AgEagle, others)
        </text>
      </g>

      {/* Source */}
      <text
        x={pad.left}
        y={h - 14}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fill={COLORS.slate500}
      >
        Source: ASDC comments to U.S. Department of Commerce BIS, December 19, 2025
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Environmental performance: peer-reviewed reductions              */
/* ------------------------------------------------------------------ */
export function EnvironmentalPerformanceChart({ className }: ChartProps) {
  const data = [
    {
      label: 'Pesticide use',
      low: 46,
      high: 75,
      source: 'Nature Sci. Reports meta-review, 2025',
    },
    {
      label: 'Drift at field boundary',
      low: 65,
      high: 70,
      source: 'ScienceDirect vineyard study, 2025',
    },
    {
      label: 'Operator chemical exposure',
      low: 90,
      high: 99,
      source: 'ACS Ag Sci & Tech, 2023',
    },
    {
      label: 'Water/fluid use',
      low: 71.8,
      high: 71.8,
      source: 'PLOS ONE LCA, 2024',
    },
  ];
  const w = 760;
  const labelW = 230;
  const rowH = 56;
  const headerH = 50;
  const footerH = 30;
  const chartW = w - labelW - 60;
  const h = headerH + rowH * data.length + footerH;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-labelledby="env-title env-desc"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="env-title">
        Drone vs ground spraying environmental performance, peer-reviewed studies
      </title>
      <desc id="env-desc">
        Bar chart of percentage reductions delivered by drone application
        relative to ground or backpack equipment in peer-reviewed studies.
        Pesticide use 46 to 75 percent, drift at field boundary 65 to 70
        percent, operator chemical exposure 90 to 99 percent, and water or
        fluid use 71.8 percent.
      </desc>

      <rect width={w} height={h} fill={COLORS.white} />

      <text
        x={20}
        y={26}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.green900}
      >
        Reductions vs ground or backpack application (peer-reviewed)
      </text>

      {/* Gridlines */}
      {[0, 25, 50, 75, 100].map((tick) => {
        const x = labelW + (tick / 100) * chartW;
        return (
          <g key={tick}>
            <line
              x1={x}
              y1={headerH - 8}
              x2={x}
              y2={headerH + rowH * data.length}
              stroke={COLORS.stone200}
              strokeWidth="1"
            />
            <text
              x={x}
              y={headerH - 14}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="11"
              fill={COLORS.slate500}
            >
              {tick}%
            </text>
          </g>
        );
      })}

      {/* Rows */}
      {data.map((d, i) => {
        const y = headerH + i * rowH;
        const lowX = labelW + (d.low / 100) * chartW;
        const highX = labelW + (d.high / 100) * chartW;
        const isRange = d.low !== d.high;
        return (
          <g key={d.label}>
            <text
              x={labelW - 12}
              y={y + 22}
              textAnchor="end"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="12"
              fontWeight="700"
              fill={COLORS.slate700}
            >
              {d.label}
            </text>
            <text
              x={labelW - 12}
              y={y + 38}
              textAnchor="end"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="10"
              fill={COLORS.slate500}
            >
              {d.source}
            </text>

            {/* Range track */}
            {isRange && (
              <rect
                x={labelW}
                y={y + 14}
                width={highX - labelW}
                height={20}
                fill={COLORS.green100}
                rx="3"
              />
            )}
            {/* Filled portion */}
            <rect
              x={labelW}
              y={y + 14}
              width={isRange ? lowX - labelW : highX - labelW}
              height={20}
              fill={COLORS.green700}
              rx="3"
            />
            {/* High-end marker for range */}
            {isRange && (
              <line
                x1={highX}
                y1={y + 10}
                x2={highX}
                y2={y + 38}
                stroke={COLORS.green900}
                strokeWidth="2"
              />
            )}

            {/* Value label */}
            <text
              x={highX + 8}
              y={y + 28}
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="13"
              fontWeight="700"
              fill={COLORS.green900}
            >
              {isRange ? `${d.low}–${d.high}%` : `${d.high}%`}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
