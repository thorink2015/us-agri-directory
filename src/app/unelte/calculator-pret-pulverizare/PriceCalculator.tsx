'use client';

import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';

const CROPS = [
  { slug: 'grau', name: 'Grâu', pricePerHa: 100, tractorPerHa: 60 },
  { slug: 'porumb', name: 'Porumb', pricePerHa: 100, tractorPerHa: 60 },
  { slug: 'rapita', name: 'Rapiță', pricePerHa: 110, tractorPerHa: 65 },
  { slug: 'floarea-soarelui', name: 'Floarea-soarelui', pricePerHa: 100, tractorPerHa: 60 },
  { slug: 'vita-de-vie', name: 'Viță de vie', pricePerHa: 150, tractorPerHa: 180 },
  { slug: 'livada', name: 'Livadă', pricePerHa: 160, tractorPerHa: 200 },
  { slug: 'soia', name: 'Soia', pricePerHa: 100, tractorPerHa: 60 },
  { slug: 'cereale', name: 'Alte cereale', pricePerHa: 100, tractorPerHa: 60 },
];

export default function PriceCalculator() {
  const [cropSlug, setCropSlug] = useState('grau');
  const [hectares, setHectares] = useState(50);
  const [treatments, setTreatments] = useState(3);

  const crop = useMemo(() => CROPS.find((c) => c.slug === cropSlug) || CROPS[0], [cropSlug]);

  const droneTotal = crop.pricePerHa * hectares * treatments;
  const tractorTotal = crop.tractorPerHa * hectares * treatments;
  const savings = tractorTotal - droneTotal;
  const savingsPercent = tractorTotal > 0 ? ((savings / tractorTotal) * 100).toFixed(1) : '0';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <Calculator className="w-5 h-5 text-green-700" />
        </div>
        <h2 className="font-bold text-gray-900">Estimare cost pulverizare</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cultură</label>
          <select
            value={cropSlug}
            onChange={(e) => setCropSlug(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none"
          >
            {CROPS.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} ({c.pricePerHa} RON/ha)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Suprafață (ha): <span className="text-green-700 font-bold">{hectares}</span>
          </label>
          <input
            type="range"
            min={1}
            max={1000}
            value={hectares}
            onChange={(e) => setHectares(Number(e.target.value))}
            className="w-full accent-green-700"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 ha</span>
            <span>500 ha</span>
            <span>1000 ha</span>
          </div>
          <input
            type="number"
            value={hectares}
            onChange={(e) => setHectares(Math.max(1, Number(e.target.value) || 1))}
            min={1}
            className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            aria-label="Hectare (introducere directă)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Număr tratamente pe sezon: <span className="text-green-700 font-bold">{treatments}</span>
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={treatments}
            onChange={(e) => setTreatments(Number(e.target.value))}
            className="w-full accent-green-700"
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-5 mb-4">
        <div className="text-sm text-gray-600 mb-1">Cost total estimat cu dronă</div>
        <div className="text-4xl font-bold text-green-700 mb-1">
          {droneTotal.toLocaleString('ro')} RON
        </div>
        <div className="text-xs text-gray-500">
          {crop.pricePerHa} RON/ha × {hectares} ha × {treatments} tratamente
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Cost alternativ (tractor)</div>
          <div className="text-lg font-bold text-gray-700">
            {tractorTotal.toLocaleString('ro')} RON
          </div>
        </div>
        <div className={`${savings >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'} border rounded-xl p-4`}>
          <div className="text-xs text-gray-500 mb-1">{savings >= 0 ? 'Economie' : 'Diferență'}</div>
          <div className={`text-lg font-bold ${savings >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
            {Math.abs(savings).toLocaleString('ro')} RON
          </div>
          <div className="text-xs text-gray-500">{savingsPercent}%</div>
        </div>
      </div>
    </div>
  );
}
