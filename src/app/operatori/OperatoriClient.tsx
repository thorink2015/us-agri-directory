'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, X, ChevronDown, ChevronUp, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Operator, SERVICE_LABELS, ServiceType } from '@/data/types';
import { County } from '@/data/types';
import { DRONE_NAME_MAP } from '@/data/drone-models';
import OperatorCard from '@/components/operators/OperatorCard';
import Breadcrumb from '@/components/layout/Breadcrumb';

interface Props {
  operators: Operator[];
  counties: County[];
}

type SortOption = 'default' | 'price_asc' | 'price_desc' | 'ha_desc' | 'name_asc';

const SORT_LABELS: Record<SortOption, string> = {
  default: 'Relevanță (implicit)',
  price_asc: 'Preț: mic → mare',
  price_desc: 'Preț: mare → mic',
  ha_desc: 'Suprafață tratată ↓',
  name_asc: 'Nume A–Z',
};

export default function OperatoriClient({ operators, counties }: Props) {
  // Basic filters
  const [search, setSearch] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceType | ''>('');
  const [country, setCountry] = useState<'RO' | 'MD' | ''>('');

  // Advanced filters
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedDrone, setSelectedDrone] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [certAACR, setCertAACR] = useState(false);
  const [certDJI, setCertDJI] = useState(false);
  const [certXAG, setCertXAG] = useState(false);

  // Sort
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const filtered = useMemo(() => {
    let result = operators.filter((op) => {
      if (country && op.country !== country) return false;
      if (selectedCounty && !op.counties.includes(selectedCounty)) return false;
      if (selectedService && !op.services.includes(selectedService)) return false;
      if (verifiedOnly && !op.verified) return false;
      if (featuredOnly && !op.featured) return false;
      if (certAACR && !op.certAACR) return false;
      if (certDJI && !op.certDJI) return false;
      if (certXAG && !op.certXAG) return false;
      if (selectedDrone && !op.drones.includes(selectedDrone)) return false;
      if (priceMin && op.priceMinRon && op.priceMinRon < Number(priceMin)) return false;
      if (priceMax && op.priceMaxRon && op.priceMaxRon > Number(priceMax)) return false;
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
        result = result.sort((a, b) => (a.priceMinRon ?? 999) - (b.priceMinRon ?? 999));
        break;
      case 'price_desc':
        result = result.sort((a, b) => (b.priceMaxRon ?? 0) - (a.priceMaxRon ?? 0));
        break;
      case 'ha_desc':
        result = result.sort((a, b) => (b.haTreated ?? 0) - (a.haTreated ?? 0));
        break;
      case 'name_asc':
        result = result.sort((a, b) => a.name.localeCompare(b.name, 'ro'));
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
    operators, country, selectedCounty, selectedService, search,
    verifiedOnly, featuredOnly, certAACR, certDJI, certXAG,
    selectedDrone, priceMin, priceMax, sortBy,
  ]);

  const hasBasicFilters = !!(search || selectedCounty || selectedService || country);
  const hasAdvancedFilters = !!(priceMin || priceMax || selectedDrone || verifiedOnly || featuredOnly || certAACR || certDJI || certXAG);
  const hasFilters = hasBasicFilters || hasAdvancedFilters;
  const advancedCount = [priceMin, priceMax, selectedDrone, verifiedOnly, featuredOnly, certAACR, certDJI, certXAG].filter(Boolean).length;

  function clearFilters() {
    setSearch('');
    setSelectedCounty('');
    setSelectedService('');
    setCountry('');
    setPriceMin('');
    setPriceMax('');
    setSelectedDrone('');
    setVerifiedOnly(false);
    setFeaturedOnly(false);
    setCertAACR(false);
    setCertDJI(false);
    setCertXAG(false);
    setSortBy('default');
  }

  const allDrones = Array.from(new Set(operators.flatMap((op) => op.drones))).sort();
  const countyName = counties.find((c) => c.slug === selectedCounty)?.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Operatori' }]} />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Operatori de Drone Agricole
        </h1>
        <p className="text-gray-500 text-sm">
          {filtered.length} {filtered.length === 1 ? 'operator' : 'operatori'}
          {countyName ? ` în județul ${countyName}` : country === 'MD' ? ' din Moldova' : country === 'RO' ? ' din România' : ' din România și Moldova'}
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
              placeholder="Caută după nume, oraș..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Country */}
          <select
            value={country}
            onChange={(e) => { setCountry(e.target.value as 'RO' | 'MD' | ''); setSelectedCounty(''); }}
            className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white min-w-[130px]"
          >
            <option value="">Toate țările</option>
            <option value="RO">🇷🇴 România</option>
            <option value="MD">🇲🇩 Moldova</option>
          </select>

          {/* County — hidden for Moldova */}
          {country !== 'MD' && (
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white min-w-[150px]"
            >
              <option value="">Toate județele</option>
              {counties.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          )}

          {/* Service */}
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value as ServiceType | '')}
            className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white min-w-[160px]"
          >
            <option value="">Toate serviciile</option>
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
            Filtre avansate
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
              <X className="w-4 h-4" /> Resetează
            </button>
          )}
        </div>

        {/* Advanced filters panel */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Filtre avansate</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* Price range */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Interval preț (RON/ha)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    min={0}
                    max={500}
                  />
                  <span className="text-gray-400 text-xs">–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    min={0}
                    max={500}
                  />
                </div>
              </div>

              {/* Drone model */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Model dronă</label>
                <select
                  value={selectedDrone}
                  onChange={(e) => setSelectedDrone(e.target.value)}
                  className="w-full px-2.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="">Toate modelele</option>
                  {allDrones.map((d) => (
                    <option key={d} value={d}>{DRONE_NAME_MAP[d] || d}</option>
                  ))}
                </select>
              </div>

              {/* Toggles */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Statut operator</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Verificat</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featuredOnly}
                      onChange={(e) => setFeaturedOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Recomandat</span>
                  </label>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Certificări</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={certAACR}
                      onChange={(e) => setCertAACR(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Autorizat AACR</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={certDJI}
                      onChange={(e) => setCertDJI(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Dealer DJI</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={certXAG}
                      onChange={(e) => setCertXAG(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Dealer XAG</span>
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
              {countyName && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-800 text-xs rounded-full border border-green-200">
                  {countyName}
                  <button onClick={() => setSelectedCounty('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedService && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-800 text-xs rounded-full border border-green-200">
                  {SERVICE_LABELS[selectedService]}
                  <button onClick={() => setSelectedService('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {country && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-800 text-xs rounded-full border border-green-200">
                  {country === 'RO' ? 'România' : 'Moldova'}
                  <button onClick={() => setCountry('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {verifiedOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-800 text-xs rounded-full border border-green-200">
                  Verificat
                  <button onClick={() => setVerifiedOnly(false)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {certAACR && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-800 text-xs rounded-full border border-green-200">
                  AACR
                  <button onClick={() => setCertAACR(false)}><X className="w-3 h-3" /></button>
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
          <p className="text-gray-700 text-lg font-medium mb-1">Niciun operator găsit</p>
          <p className="text-gray-400 text-sm mb-5">Încearcă să modifici sau să elimini filtrele</p>
          <button
            onClick={clearFilters}
            className="px-5 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors"
          >
            Resetează toate filtrele
          </button>
        </div>
      )}
    </div>
  );
}
