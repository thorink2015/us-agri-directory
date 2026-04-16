'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, X, ChevronDown, ChevronUp, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Operator, SERVICE_LABELS, ServiceType } from '@/data/types';
import { County } from '@/data/types';
import { DRONE_NAME_MAP } from '@/data/drone-model';
import OperatorCard from '@/components/operators/OperatorCard';
import Breadcrumb from '@/components/layout/Breadcrumb';

interface Props {
  operators: Operator[];
  counties: County[];
}

type SortOption = 'default' | 'price_asc' | 'price_desc' | 'ha_desc' | 'name_asc';

const SORT_LABELS: Record<SortOption, string> = {
  default: 'Relevance (default)',
  price_asc: 'Price: low → high',
  price_desc: 'Price: high → low',
  ha_desc: 'Acres treated ↓',
  name_asc: 'Name A–Z',
};

export default function OperatoriClient({ operators, counties }: Props) {
  // Basic filters
  const [search, setSearch] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceType | ''>('');

  // Advanced filters
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedDrone, setSelectedDrone] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [certPart107, setCertPart107] = useState(false);
  const [certPart137, setCertPart137] = useState(false);
  const [ndaaOnly, setNdaaOnly] = useState(false);

  // Sort
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const filtered = useMemo(() => {
    let result = operators.filter((op) => {
      if (selectedCounty && !op.counties.includes(selectedCounty)) return false;
      if (selectedService && !op.services.includes(selectedService)) return false;
      if (verifiedOnly && !op.verified) return false;
      if (featuredOnly && !op.featured) return false;
      if (certPart107 && !op.certFAAPart107) return false;
      if (certPart137 && !op.certFAAPart137) return false;
      if (ndaaOnly && !op.ndaaCompliant) return false;
      if (selectedDrone && !op.drones.includes(selectedDrone)) return false;
      if (priceMin && op.priceMinUsd && op.priceMinUsd < Number(priceMin)) return false;
      if (priceMax && op.priceMaxUsd && op.priceMaxUsd > Number(priceMax)) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          op.name.toLowerCase().includes(q) ||
          op.city.toLowerCase().includes(q) ||
          op.description.toLowerCase().includes(q)
        );
      }
      return true;
    });

    // Sort
    switch (sortBy) {
      case 'price_asc':
        result = result.sort((a, b) => (a.priceMinUsd ?? 999) - (b.priceMinUsd ?? 999));
        break;
      case 'price_desc':
        result = result.sort((a, b) => (b.priceMaxUsd ?? 0) - (a.priceMaxUsd ?? 0));
        break;
      case 'ha_desc':
        result = result.sort((a, b) => (b.haTreated ?? 0) - (a.haTreated ?? 0));
        break;
      case 'name_asc':
        result = result.sort((a, b) => a.name.localeCompare(b.name, 'en'));
        break;
      default:
        // Featured first, then verified
        result = result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.verified && !b.verified) return -1;
          if (!a.verified && b.verified) return 1;
          return 0;
        });
    }

    return result;
  }, [
    operators, selectedCounty, selectedService, search,
    verifiedOnly, featuredOnly, certPart107, certPart137, ndaaOnly,
    selectedDrone, priceMin, priceMax, sortBy,
  ]);

  const hasBasicFilters = !!(search || selectedCounty || selectedService);
  const hasAdvancedFilters = !!(priceMin || priceMax || selectedDrone || verifiedOnly || featuredOnly || certPart107 || certPart137 || ndaaOnly);
  const hasFilters = hasBasicFilters || hasAdvancedFilters;
  const advancedCount = [priceMin, priceMax, selectedDrone, verifiedOnly, featuredOnly, certPart107, certPart137, ndaaOnly].filter(Boolean).length;

  function clearFilters() {
    setSearch('');
    setSelectedCounty('');
    setSelectedService('');
    setPriceMin('');
    setPriceMax('');
    setSelectedDrone('');
    setVerifiedOnly(false);
    setFeaturedOnly(false);
    setCertPart107(false);
    setCertPart137(false);
    setNdaaOnly(false);
    setSortBy('default');
  }

  const allDrones = Array.from(new Set(operators.flatMap((op) => op.drones))).sort();
  const stateName = counties.find((c) => c.slug === selectedCounty)?.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Operators' }]} />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Agricultural Drone Operators
        </h1>
        <p className="text-gray-500 text-sm">
          {filtered.length} {filtered.length === 1 ? 'operator' : 'operators'}
          {stateName ? ` in ${stateName}` : ' across the US'}
        </p>
      </div>

      {/* Filter panel */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
        {/* Basic filters row */}
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* State */}
          <select
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white min-w-[150px]"
          >
            <option value="">All States</option>
            {counties.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>

          {/* Service */}
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value as ServiceType | '')}
            className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white min-w-[160px]"
          >
            <option value="">All Services</option>
            {Object.entries(SERVICE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white min-w-[190px]"
            >
              {Object.entries(SORT_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Advanced toggle */}
          <button
            onClick={() => setShowAdvanced((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-sm border rounded-lg transition-colors ${
              advancedCount > 0
                ? 'border-green-500 text-green-700 bg-green-50'
                : 'border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-700'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Advanced filters
            {advancedCount > 0 && (
              <span className="bg-green-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                {advancedCount}
              </span>
            )}
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-red-500 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              <X className="w-4 h-4" /> Clear
            </button>
          )}
        </div>

        {/* Advanced filters panel */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Advanced Filters</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* Price range */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Price range ($/acre)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    min={0}
                    max={100}
                  />
                  <span className="text-gray-400 text-xs">–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    min={0}
                    max={100}
                  />
                </div>
              </div>

              {/* Drone model */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Drone model</label>
                <select
                  value={selectedDrone}
                  onChange={(e) => setSelectedDrone(e.target.value)}
                  className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="">All models</option>
                  {allDrones.map((d) => (
                    <option key={d} value={d}>{DRONE_NAME_MAP[d] || d}</option>
                  ))}
                </select>
              </div>

              {/* Toggles */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Operator status</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Verified only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featuredOnly}
                      onChange={(e) => setFeaturedOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Featured only</span>
                  </label>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Certifications</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={certPart107}
                      onChange={(e) => setCertPart107(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">FAA Part 107</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={certPart137}
                      onChange={(e) => setCertPart137(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">FAA Part 137</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ndaaOnly}
                      onChange={(e) => setNdaaOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">NDAA Compliant fleet</span>
                  </label>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <>
          {/* Active filter chips */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {search && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-800 text-xs rounded-full border border-green-200">
                  &ldquo;{search}&rdquo;
                  <button onClick={() => setSearch('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {stateName && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-800 text-xs rounded-full border border-green-200">
                  {stateName}
                  <button onClick={() => setSelectedCounty('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedService && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-800 text-xs rounded-full border border-green-200">
                  {SERVICE_LABELS[selectedService]}
                  <button onClick={() => setSelectedService('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {verifiedOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-800 text-xs rounded-full border border-green-200">
                  Verified
                  <button onClick={() => setVerifiedOnly(false)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {certPart107 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-800 text-xs rounded-full border border-green-200">
                  FAA Part 107
                  <button onClick={() => setCertPart107(false)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {certPart137 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-800 text-xs rounded-full border border-green-200">
                  FAA Part 137
                  <button onClick={() => setCertPart137(false)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {ndaaOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-800 text-xs rounded-full border border-green-200">
                  NDAA Compliant
                  <button onClick={() => setNdaaOnly(false)}><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((op) => (
              <OperatorCard key={op.slug} operator={op} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <Filter className="w-14 h-14 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-700 text-lg font-medium mb-1">No operators found</p>
          <p className="text-gray-400 text-sm mb-5">Try adjusting or clearing your filters</p>
          <button
            onClick={clearFilters}
            className="px-5 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
