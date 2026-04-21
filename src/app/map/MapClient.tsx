'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { US_STATES_VIEWBOX, US_STATE_PATHS } from '@/data/us-states-svg';
import { STATE_ABBR } from '@/lib/utils';
import type { ServiceType } from '@/data/types';

export interface StateSummary {
  slug: string;
  name: string;
  count: number;
  services: ServiceType[];
  crops: string[];
  cities: string[];
}

interface Props {
  statesSummary: StateSummary[];
  serviceOptions: { key: ServiceType; label: string }[];
  cropOptions: { slug: string; name: string }[];
}

function bucketFor(n: number): 0 | 1 | 2 | 3 | 4 {
  if (n === 0) return 0;
  if (n <= 5) return 1;
  if (n <= 15) return 2;
  if (n <= 30) return 3;
  return 4;
}

export default function MapClient({ statesSummary, serviceOptions, cropOptions }: Props) {
  const [search, setSearch] = useState('');
  const [service, setService] = useState<ServiceType | ''>('');
  const [crop, setCrop] = useState('');

  const byAbbr = useMemo(() => {
    const m: Record<string, StateSummary> = {};
    for (const s of statesSummary) {
      const abbr = STATE_ABBR[s.slug];
      if (abbr) m[abbr.toLowerCase()] = s;
    }
    return m;
  }, [statesSummary]);

  const hasFilter = !!(search.trim() || service || crop);

  const matchSet = useMemo(() => {
    if (!hasFilter) return null;
    const q = search.trim().toLowerCase();
    const isZip = /^\d{3,5}$/.test(q);
    const matches = new Set<string>();
    for (const s of statesSummary) {
      if (s.count === 0) continue;
      if (service && !s.services.includes(service)) continue;
      if (crop && !s.crops.includes(crop)) continue;
      if (q) {
        const abbr = (STATE_ABBR[s.slug] || '').toLowerCase();
        const nameMatch = s.name.toLowerCase().includes(q) || abbr === q;
        const cityMatch = s.cities.some((c) => c.toLowerCase().includes(q));
        // We don't index zips, but treat short digit queries as "no filter on zip"
        // rather than blocking all states — keep name/city logic.
        if (!nameMatch && !cityMatch && !isZip) continue;
        if (isZip && !nameMatch && !cityMatch) {
          // No zip data available; skip this state unless name/city matches.
          continue;
        }
      }
      matches.add(s.slug);
    }
    return matches;
  }, [search, service, crop, statesSummary, hasFilter]);

  const pathEntries = useMemo(() => {
    return Object.entries(US_STATE_PATHS).sort(
      (a, b) => b[1].length - a[1].length,
    );
  }, []);

  const ranked = useMemo(() => {
    const base = statesSummary
      .filter((s) => s.count > 0)
      .filter((s) => !matchSet || matchSet.has(s.slug))
      .sort((a, b) => b.count - a.count);
    return base;
  }, [statesSummary, matchSet]);

  function clear() {
    setSearch('');
    setService('');
    setCrop('');
  }

  const resultCount = matchSet ? matchSet.size : statesSummary.filter((s) => s.count > 0).length;

  return (
    <section aria-labelledby="map-heading">
      <h2 id="map-heading" className="sr-only">
        Interactive operator map
      </h2>
      <style>{MAP_CSS}</style>

      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
        <div className="us-map__frame" style={{ aspectRatio: '959 / 593' }}>
          <svg
            viewBox={US_STATES_VIEWBOX}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Map of US states shaded by number of drone operators"
            className="us-map__svg"
          >
            {pathEntries.map(([abbr, d]) => {
              const state = byAbbr[abbr];
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
              const bucket = bucketFor(state.count);
              const isMatch = !matchSet || matchSet.has(state.slug);
              // When a filter is active, non-matching states render as gray (bucket 0).
              const renderBucket = matchSet && !isMatch ? 0 : bucket;
              const label = `${state.name}: ${state.count} ${state.count === 1 ? 'operator' : 'operators'}`;
              return (
                <a key={abbr} href={`/states/${state.slug}`} aria-label={label}>
                  <path
                    d={d}
                    data-bucket={renderBucket}
                    data-match={matchSet ? (isMatch ? 'true' : 'false') : undefined}
                    className="us-map__path"
                  />
                  <title>{label}</title>
                </a>
              );
            })}
          </svg>
        </div>

        <div className="us-map__legend" aria-hidden="true">
          <span className="us-map__legend-label">Operators per state</span>
          <span className="us-map__legend-item"><i data-bucket={0}></i>0</span>
          <span className="us-map__legend-item"><i data-bucket={1}></i>1&ndash;5</span>
          <span className="us-map__legend-item"><i data-bucket={2}></i>6&ndash;15</span>
          <span className="us-map__legend-item"><i data-bucket={3}></i>16&ndash;30</span>
          <span className="us-map__legend-item"><i data-bucket={4}></i>31+</span>
        </div>
      </div>

      {/* Filter panel */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by state, city, or zip code"
              aria-label="Search by state, city, or zip code"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <select
            value={service}
            onChange={(e) => setService(e.target.value as ServiceType | '')}
            aria-label="Filter by service type"
            className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white min-w-[180px]"
          >
            <option value="">All service types</option>
            {serviceOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>{opt.label}</option>
            ))}
          </select>

          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            aria-label="Filter by crop"
            className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white min-w-[160px]"
          >
            <option value="">All crops</option>
            {cropOptions.map((opt) => (
              <option key={opt.slug} value={opt.slug}>{opt.name}</option>
            ))}
          </select>

          {hasFilter && (
            <button
              onClick={clear}
              className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-red-500 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              <X className="w-4 h-4" /> Clear
            </button>
          )}
        </div>

        <p className="text-xs text-gray-600 mt-3">
          {hasFilter
            ? `${resultCount} ${resultCount === 1 ? 'state' : 'states'} match your filters. Non-matching states stay gray on the map.`
            : 'Pick a service or crop to highlight matching states. Click any state to open its operator directory.'}
        </p>
      </div>

      {/* Mobile-first ranked list, also filtered */}
      <nav
        aria-label="States with most operators"
        className="us-map__ranked mt-6"
      >
        <p className="us-map__ranked-title">
          {hasFilter ? 'Matching states' : 'States with most operators'}
        </p>
        {ranked.length > 0 ? (
          <ol className="us-map__ranked-list">
            {ranked.slice(0, 24).map((s) => (
              <li key={s.slug}>
                <Link href={`/states/${s.slug}`} className="us-map__ranked-link">
                  <span>{s.name}</span>
                  <span className="us-map__ranked-count">{s.count}</span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-gray-600 py-2">
            No states match those filters. Try clearing one of the dropdowns.
          </p>
        )}
      </nav>
    </section>
  );
}

const MAP_CSS = `
.us-map__frame {
  width: 100%;
  max-width: 100%;
  position: relative;
}
.us-map__svg {
  width: 100%;
  height: 100%;
  display: block;
}
.us-map__path {
  stroke: #ffffff;
  stroke-width: 0.5;
  stroke-linejoin: round;
  transition: filter 120ms ease, stroke 120ms ease, stroke-width 120ms ease, opacity 120ms ease;
  cursor: pointer;
}
.us-map__path--static { cursor: default; }
.us-map__path[data-bucket="0"] { fill: #e5e7eb; }
.us-map__path[data-bucket="1"] { fill: #bbf7d0; }
.us-map__path[data-bucket="2"] { fill: #4ade80; }
.us-map__path[data-bucket="3"] { fill: #16a34a; }
.us-map__path[data-bucket="4"] { fill: #166534; }
.us-map__path[data-match="false"] { opacity: 0.65; cursor: default; }
.us-map__path:hover,
.us-map__path:focus {
  filter: brightness(1.1);
  stroke: #065f46;
  stroke-width: 1.5;
  outline: none;
}
.us-map__path--static:hover { filter: none; stroke: #ffffff; stroke-width: 0.5; }
.us-map__path[data-match="false"]:hover { filter: none; stroke: #ffffff; stroke-width: 0.5; }

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
@media (min-width: 640px) {
  .us-map__ranked-list { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 1024px) {
  .us-map__ranked-list { grid-template-columns: repeat(4, 1fr); }
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
