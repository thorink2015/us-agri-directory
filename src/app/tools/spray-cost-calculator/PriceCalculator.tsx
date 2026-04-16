'use client';

import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';

const CROPS = [
  { slug: 'corn',    name: 'Corn',              low: 14, high: 17, chemMid: 15 },
  { slug: 'soy',     name: 'Soybeans',           low: 12, high: 16, chemMid: 12 },
  { slug: 'wheat',   name: 'Wheat',              low: 12, high: 16, chemMid: 15 },
  { slug: 'cotton',  name: 'Cotton',             low: 14, high: 18, chemMid:  9 },
  { slug: 'rice',    name: 'Rice',               low: 15, high: 20, chemMid: 13 },
  { slug: 'grapes',  name: 'Grapes / Vineyards', low: 18, high: 30, chemMid: 15 },
  { slug: 'orchards',name: 'Orchards',           low: 15, high: 21, chemMid: 15 },
  { slug: 'cover',   name: 'Cover Crops',        low: 12, high: 18, chemMid: 14 },
  { slug: 'other',   name: 'Other',              low: 13, high: 18, chemMid: 13 },
];

const STATES = [
  { abbr: 'AL', name: 'Alabama', m: 1.15 },
  { abbr: 'AK', name: 'Alaska', m: 1.1 },
  { abbr: 'AZ', name: 'Arizona', m: 1.15 },
  { abbr: 'AR', name: 'Arkansas', m: 1.05 },
  { abbr: 'CA', name: 'California', m: 1.4 },
  { abbr: 'CO', name: 'Colorado', m: 0.95 },
  { abbr: 'CT', name: 'Connecticut', m: 1.2 },
  { abbr: 'DE', name: 'Delaware', m: 1.2 },
  { abbr: 'FL', name: 'Florida', m: 1.15 },
  { abbr: 'GA', name: 'Georgia', m: 1.15 },
  { abbr: 'HI', name: 'Hawaii', m: 1.1 },
  { abbr: 'ID', name: 'Idaho', m: 1.1 },
  { abbr: 'IL', name: 'Illinois', m: 1.0 },
  { abbr: 'IN', name: 'Indiana', m: 1.0 },
  { abbr: 'IA', name: 'Iowa', m: 1.0 },
  { abbr: 'KS', name: 'Kansas', m: 0.95 },
  { abbr: 'KY', name: 'Kentucky', m: 1.1 },
  { abbr: 'LA', name: 'Louisiana', m: 1.05 },
  { abbr: 'ME', name: 'Maine', m: 1.2 },
  { abbr: 'MD', name: 'Maryland', m: 1.2 },
  { abbr: 'MA', name: 'Massachusetts', m: 1.2 },
  { abbr: 'MI', name: 'Michigan', m: 1.0 },
  { abbr: 'MN', name: 'Minnesota', m: 1.0 },
  { abbr: 'MS', name: 'Mississippi', m: 1.05 },
  { abbr: 'MO', name: 'Missouri', m: 1.0 },
  { abbr: 'MT', name: 'Montana', m: 0.95 },
  { abbr: 'NE', name: 'Nebraska', m: 0.95 },
  { abbr: 'NV', name: 'Nevada', m: 1.15 },
  { abbr: 'NH', name: 'New Hampshire', m: 1.2 },
  { abbr: 'NJ', name: 'New Jersey', m: 1.2 },
  { abbr: 'NM', name: 'New Mexico', m: 0.95 },
  { abbr: 'NY', name: 'New York', m: 1.2 },
  { abbr: 'NC', name: 'North Carolina', m: 1.15 },
  { abbr: 'ND', name: 'North Dakota', m: 0.95 },
  { abbr: 'OH', name: 'Ohio', m: 1.0 },
  { abbr: 'OK', name: 'Oklahoma', m: 0.95 },
  { abbr: 'OR', name: 'Oregon', m: 1.1 },
  { abbr: 'PA', name: 'Pennsylvania', m: 1.2 },
  { abbr: 'RI', name: 'Rhode Island', m: 1.2 },
  { abbr: 'SC', name: 'South Carolina', m: 1.15 },
  { abbr: 'SD', name: 'South Dakota', m: 0.95 },
  { abbr: 'TN', name: 'Tennessee', m: 1.1 },
  { abbr: 'TX', name: 'Texas', m: 1.0 },
  { abbr: 'UT', name: 'Utah', m: 1.15 },
  { abbr: 'VT', name: 'Vermont', m: 1.2 },
  { abbr: 'VA', name: 'Virginia', m: 1.15 },
  { abbr: 'WA', name: 'Washington', m: 1.1 },
  { abbr: 'WV', name: 'West Virginia', m: 1.15 },
  { abbr: 'WI', name: 'Wisconsin', m: 1.0 },
  { abbr: 'WY', name: 'Wyoming', m: 0.95 },
];

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

export default function PriceCalculator() {
  const [cropSlug, setCropSlug] = useState('corn');
  const [stateAbbr, setStateAbbr] = useState('IA');
  const [acres, setAcres] = useState(160);
  const [acresInput, setAcresInput] = useState('160');
  const [passes, setPasses] = useState(1);
  const [operatorChemical, setOperatorChemical] = useState(false);

  const crop = useMemo(() => CROPS.find((c) => c.slug === cropSlug) ?? CROPS[0], [cropSlug]);
  const state = useMemo(() => STATES.find((s) => s.abbr === stateAbbr) ?? STATES[14], [stateAbbr]);

  const results = useMemo(() => {
    const low = parseFloat((crop.low * state.m).toFixed(2));
    const high = parseFloat((crop.high * state.m).toFixed(2));
    const chemAdd = operatorChemical ? crop.chemMid : 0;
    const totalLow = Math.round((low + chemAdd) * acres * passes);
    const totalHigh = Math.round((high + chemAdd) * acres * passes);
    return { low: low + chemAdd, high: high + chemAdd, totalLow, totalHigh, chemAdd };
  }, [crop, state, acres, passes, operatorChemical]);

  function handleAcresInput(val: string) {
    setAcresInput(val);
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 10 && n <= 10000) setAcres(n);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <Calculator className="w-5 h-5 text-green-700" />
        </div>
        <h2 className="font-bold text-gray-900 text-lg">Spray Cost Estimate</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Crop */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Crop type</label>
          <select
            value={cropSlug}
            onChange={(e) => setCropSlug(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none"
          >
            {CROPS.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <select
            value={stateAbbr}
            onChange={(e) => setStateAbbr(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none"
          >
            {STATES.map((s) => (
              <option key={s.abbr} value={s.abbr}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* Acres */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total acres
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="range"
              min={10}
              max={10000}
              step={10}
              value={acres}
              onChange={(e) => { setAcres(Number(e.target.value)); setAcresInput(e.target.value); }}
              className="flex-1 accent-green-700"
            />
            <input
              type="number"
              value={acresInput}
              min={10}
              max={10000}
              onChange={(e) => handleAcresInput(e.target.value)}
              className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm text-center focus:border-green-500 focus:outline-none"
              aria-label="Acres (direct entry)"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>10</span><span>10,000 acres</span>
          </div>
        </div>

        {/* Passes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passes per season: <span className="text-green-700 font-bold">{passes}</span>
          </label>
          <input
            type="range"
            min={1}
            max={15}
            step={1}
            value={passes}
            onChange={(e) => setPasses(Number(e.target.value))}
            className="w-full accent-green-700"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>1</span><span>15</span>
          </div>
        </div>

        {/* Chemical toggle */}
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700 mb-1">Chemical supplied by</p>
            <div className="flex rounded-lg overflow-hidden border border-gray-300">
              <button
                onClick={() => setOperatorChemical(false)}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${!operatorChemical ? 'bg-green-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Farmer
              </button>
              <button
                onClick={() => setOperatorChemical(true)}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${operatorChemical ? 'bg-green-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Operator
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-5 mb-3">
        <div className="text-sm text-gray-600 mb-1">Estimated per-acre rate ({state.name})</div>
        <div className="text-3xl font-bold text-green-700 mb-1">
          ${results.low.toFixed(2)} – ${results.high.toFixed(2)}
        </div>
        {operatorChemical && (
          <div className="text-xs text-gray-500 mb-2">
            Includes estimated chemical cost of ~${results.chemAdd}/acre
          </div>
        )}
        <div className="border-t border-green-200 pt-3 mt-2">
          <div className="text-sm text-gray-600">Total for {acres.toLocaleString()} acres × {passes} pass{passes > 1 ? 'es' : ''}</div>
          <div className="text-2xl font-bold text-gray-900 mt-0.5">
            {fmt(results.totalLow)} – {fmt(results.totalHigh)}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        {operatorChemical
          ? `Includes estimated chemical cost of ~$${results.chemAdd}/acre. Actual chemical cost varies by product.`
          : 'Application only. Chemical cost is additional.'}
        {' '}Based on 2026 Iowa State Extension and regional operator data. Actual quotes may vary.
      </p>
    </div>
  );
}
