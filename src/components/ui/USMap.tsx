import Link from 'next/link';
import { counties } from '@/data/counties';
import { operators } from '@/data/operators';
import { STATE_ABBR } from '@/lib/utils';
import { US_STATES_VIEWBOX, US_STATE_PATHS } from '@/data/us-states-svg';

// Bucket 0 = 0, 1 = 1-5, 2 = 6-15, 3 = 16-30, 4 = 31+
function bucketFor(n: number): 0 | 1 | 2 | 3 | 4 {
  if (n === 0) return 0;
  if (n <= 5) return 1;
  if (n <= 15) return 2;
  if (n <= 30) return 3;
  return 4;
}

interface USMapProps {
  // Slug of a state to render with the highlight fill (blue).
  // The highlighted path is rendered last so it sits on top of any neighbors.
  highlightSlug?: string;
  // Compact variant: max-width 300px, no legend, no mobile ranked list.
  // Use on state pages where the map is a navigational sidebar aid.
  compact?: boolean;
  // Tailwind/extra wrapper class (e.g. `hidden md:block` to skip on mobile).
  className?: string;
}

export default function USMap({ highlightSlug, compact = false, className = '' }: USMapProps = {}) {
  // Build state-slug -> operator count map at build time (server component).
  const counts: Record<string, number> = {};
  for (const c of counties) {
    counts[c.slug] = operators.filter((op) => op.counties.includes(c.slug)).length;
  }

  // Reverse map: 2-letter abbr (lowercase) -> { slug, name }
  const byAbbr: Record<string, { slug: string; name: string }> = {};
  for (const c of counties) {
    const abbr = STATE_ABBR[c.slug];
    if (abbr) byAbbr[abbr.toLowerCase()] = { slug: c.slug, name: c.name };
  }

  // Render order: biggest first for hit-testing on small coastal states,
  // but the highlighted state (if any) renders LAST so it sits on top.
  const pathEntries = Object.entries(US_STATE_PATHS).sort((a, b) => {
    const aIsHighlight = highlightSlug && byAbbr[a[0]]?.slug === highlightSlug;
    const bIsHighlight = highlightSlug && byAbbr[b[0]]?.slug === highlightSlug;
    if (aIsHighlight && !bIsHighlight) return 1;
    if (!aIsHighlight && bIsHighlight) return -1;
    return b[1].length - a[1].length;
  });

  // Ranked list for mobile fallback: only states with ≥1 operator.
  const ranked = counties
    .map((c) => ({ slug: c.slug, name: c.name, count: counts[c.slug] || 0 }))
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count);

  const ariaLabel = highlightSlug
    ? `Map of US states with ${byAbbr[STATE_ABBR[highlightSlug]?.toLowerCase() ?? '']?.name ?? 'the current state'} highlighted`
    : 'Map of US states shaded by number of drone operators';

  return (
    <div className={`us-map ${compact ? 'us-map--compact' : ''} ${className}`.trim()}>
      <style>{USMAP_CSS}</style>

      <div
        className="us-map__frame"
        style={{ aspectRatio: '959 / 593' }}
      >
        <svg
          viewBox={US_STATES_VIEWBOX}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={ariaLabel}
          className="us-map__svg"
        >
          {pathEntries.map(([abbr, d]) => {
            const state = byAbbr[abbr];
            // DC has no state page and no operators; render as static gray fill.
            if (!state) {
              return (
                <path
                  key={abbr}
                  d={d}
                  data-bucket={0}
                  className="us-map__path us-map__path--static"
                  aria-hidden="true"
                />
              );
            }
            const count = counts[state.slug] || 0;
            const bucket = bucketFor(count);
            const isHighlighted = state.slug === highlightSlug;
            const label = isHighlighted
              ? `${state.name} (current): ${count} ${count === 1 ? 'operator' : 'operators'}`
              : `${state.name}: ${count} ${count === 1 ? 'operator' : 'operators'}`;
            return (
              <a
                key={abbr}
                href={`/states/${state.slug}`}
                aria-label={label}
              >
                <path
                  d={d}
                  data-bucket={bucket}
                  data-highlighted={isHighlighted ? 'true' : undefined}
                  data-label={label}
                  className="us-map__path"
                />
                <title>{label}</title>
              </a>
            );
          })}
        </svg>
      </div>

      {!compact && (
        <div className="us-map__legend" aria-hidden="true">
          <span className="us-map__legend-label">Operators per state</span>
          <span className="us-map__legend-item"><i data-bucket={0}></i>0</span>
          <span className="us-map__legend-item"><i data-bucket={1}></i>1&ndash;5</span>
          <span className="us-map__legend-item"><i data-bucket={2}></i>6&ndash;15</span>
          <span className="us-map__legend-item"><i data-bucket={3}></i>16&ndash;30</span>
          <span className="us-map__legend-item"><i data-bucket={4}></i>31+</span>
        </div>
      )}

      {!compact && ranked.length > 0 && (
        <nav
          aria-label="States with most operators"
          className="us-map__ranked md:hidden"
        >
          <p className="us-map__ranked-title">States with most operators</p>
          <ol className="us-map__ranked-list">
            {ranked.slice(0, 12).map((s) => (
              <li key={s.slug}>
                <Link href={`/states/${s.slug}`} className="us-map__ranked-link">
                  <span>{s.name}</span>
                  <span className="us-map__ranked-count">{s.count}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}

// Scoped CSS. Keeps the component fully server-rendered (zero client JS).
// Inline <style> is rendered by React 18 server components as-is.
const USMAP_CSS = `
.us-map__frame {
  width: 100%;
  max-width: 100%;
  position: relative;
}
.us-map--compact .us-map__frame { max-width: 300px; }
.us-map__svg {
  width: 100%;
  height: 100%;
  display: block;
}
.us-map__path {
  stroke: #ffffff;
  stroke-width: 0.5;
  stroke-linejoin: round;
  transition: filter 120ms ease, stroke 120ms ease, stroke-width 120ms ease;
  cursor: pointer;
}
.us-map__path--static { cursor: default; }
.us-map__path[data-bucket="0"] { fill: #e5e7eb; }
.us-map__path[data-bucket="1"] { fill: #bbf7d0; }
.us-map__path[data-bucket="2"] { fill: #4ade80; }
.us-map__path[data-bucket="3"] { fill: #16a34a; }
.us-map__path[data-bucket="4"] { fill: #166534; }
.us-map__path[data-highlighted="true"][data-bucket] {
  fill: #2563eb;
  stroke: #1e3a8a;
  stroke-width: 1.5;
}
.us-map__path:hover,
.us-map__path:focus {
  filter: brightness(1.1);
  stroke: #065f46;
  stroke-width: 1.5;
  outline: none;
}
.us-map__path[data-highlighted="true"]:hover,
.us-map__path[data-highlighted="true"]:focus {
  stroke: #1e3a8a;
}
.us-map__path--static:hover { filter: none; stroke: #ffffff; stroke-width: 0.5; }

.us-map__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  align-items: center;
  font-size: 0.75rem;
  color: #4b5563;
  margin-top: 0.75rem;
}
.us-map__legend-label {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #6b7280;
}
.us-map__legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}
.us-map__legend-item i {
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 0.1875rem;
  border: 1px solid rgba(0,0,0,0.06);
  display: inline-block;
}
.us-map__legend-item i[data-bucket="0"] { background: #e5e7eb; }
.us-map__legend-item i[data-bucket="1"] { background: #bbf7d0; }
.us-map__legend-item i[data-bucket="2"] { background: #4ade80; }
.us-map__legend-item i[data-bucket="3"] { background: #16a34a; }
.us-map__legend-item i[data-bucket="4"] { background: #166534; }

.us-map__ranked {
  margin-top: 1rem;
  padding: 0.875rem 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
}
.us-map__ranked-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 0.5rem 0;
}
.us-map__ranked-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem 0.75rem;
}
.us-map__ranked-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 0.5rem;
  min-height: 44px;
  font-size: 0.875rem;
  color: #065f46;
  text-decoration: none;
  border-bottom: 1px solid #e5e7eb;
}
.us-map__ranked-link:hover { background: #ecfdf5; }
.us-map__ranked-count {
  font-weight: 600;
  font-size: 0.75rem;
  color: #065f46;
  background: #d1fae5;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
}
`;
