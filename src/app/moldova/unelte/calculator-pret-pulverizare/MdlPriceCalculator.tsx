'use client';

import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';

const CROPS = [
  { slug: 'grau',            name: 'Grâu',             pricePerHa: 195, tractorPerHa: 130 },
  { slug: 'porumb',          name: 'Porumb',            pricePerHa: 200, tractorPerHa: 130 },
  { slug: 'rapita',          name: 'Rapiță',            pricePerHa: 205, tractorPerHa: 135 },
  { slug: 'floarea-soarelui',name: 'Floarea-soarelui',  pricePerHa: 200, tractorPerHa: 130 },
  { slug: 'vita-de-vie',     name: 'Viță de vie',       pricePerHa: 245, tractorPerHa: 340 },
  { slug: 'livada',          name: 'Livadă',            pricePerHa: 250, tractorPerHa: 360 },
  { slug: 'soia',            name: 'Soia',              pricePerHa: 200, tractorPerHa: 130 },
  { slug: 'cereale',         name: 'Alte cereale',      pricePerHa: 190, tractorPerHa: 125 },
];

export default function MdlPriceCalculator() {
  const [cropSlug, setCropSlug]     = useState('grau');
  const [hectares, setHectares]     = useState(50);
  const [treatments, setTreatments] = useState(3);

  const crop = useMemo(() => CROPS.find((c) => c.slug === cropSlug) ?? CROPS[0], [cropSlug]);

  const droneTotal   = crop.pricePerHa  * hectares * treatments;
  const tractorTotal = crop.tractorPerHa * hectares * treatments;
  const savings      = tractorTotal - droneTotal;
  const savingsPct   = tractorTotal > 0 ? ((savings / tractorTotal) * 100).toFixed(1) : '0';
  const droneWins    = savings > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Calculator className="w-5 h-5 text-blue-700" />
        </div>
        <h2 className="font-bold text-gray-900">Estimare cost pulverizare (MDL)</h2>
      </div>

      <div className="space-y-4 mb-6">
        {/* Crop selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cultură</label>
          <select
            value={cropSlug}
            onChange={(e) => setCropSlug(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
          >
            {CROPS.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} ({c.pricePerHa} MDL/ha)
              </option>
            ))}
          </select>
        </div>

        {/* Hectares slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Suprafață (ha):{' '}
            <span className="text-blue-700 font-bold">{hectares}</span>
          </label>
          <input
            type="range"
            min={1}
            max={1000}
            value={hectares}
            onChange={(e) => setHectares(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 ha</span>
            <span>500 ha</span>
            <span>1.000 ha</span>
          </div>
          <input
            type="number"
            value={hectares}
            onChange={(e) => setHectares(Math.max(1, Number(e.target.value) || 1))}
            min={1}
            className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            aria-label="Hectare (introducere directă)"
          />
        </div>

        {/* Treatments slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Număr tratamente pe sezon:{' '}
            <span className="text-blue-700 font-bold">{treatments}</span>
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={treatments}
            onChange={(e) => setTreatments(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
        </div>
      </div>

      {/* Primary result */}
      <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-5 mb-4">
        <div className="text-sm text-gray-600 mb-1">Cost total estimat cu dronă</div>
        <div className="text-4xl font-bold text-blue-700 mb-1">
          {droneTotal.toLocaleString('ro')} MDL
        </div>
        <div className="text-xs text-gray-500">
          {crop.pricePerHa} MDL/ha × {hectares} ha × {treatments} tratamente
        </div>
        <div className="text-xs text-gray-500 mt-0.5">
          ≈ {(droneTotal / 20).toLocaleString('ro', { maximumFractionDigits: 0 })} EUR
          <span className="ml-1 text-gray-400">(curs ~20 MDL/EUR)</span>
        </div>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Alternativ (tractor / manual)</div>
          <div className="text-lg font-bold text-gray-700">
            {tractorTotal.toLocaleString('ro')} MDL
          </div>
        </div>
        <div
          className={`border rounded-xl p-4 ${
            droneWins ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'
          }`}
        >
          <div className="text-xs text-gray-500 mb-1">
            {droneWins ? 'Economie cu drona' : 'Suprapreț dronă'}
          </div>
          <div className={`text-lg font-bold ${droneWins ? 'text-green-700' : 'text-orange-700'}`}>
            {Math.abs(savings).toLocaleString('ro')} MDL
          </div>
          <div className="text-xs text-gray-500">
            {droneWins ? `−${savingsPct}%` : `+${Math.abs(Number(savingsPct))}%`}
          </div>
        </div>
      </div>

      {!droneWins && (
        <p className="mt-3 text-xs text-gray-500 bg-orange-50 border border-orange-200 rounded-lg p-3">
          Pentru culturi de câmp, drona este mai scumpă per hectar față de tractor, dar elimină
          tasarea solului și permite tratamente imediat după ploaie.
        </p>
      )}
    </div>
  );
}
