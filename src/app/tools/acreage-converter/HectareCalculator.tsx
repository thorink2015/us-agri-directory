'use client';

import { useState, useMemo } from 'react';
import { Ruler } from 'lucide-react';

type Unit = 'acres' | 'hectares' | 'sqft' | 'sqmeters' | 'sections';

const TO_SQM: Record<Unit, number> = {
  acres:    4046.8564224,
  hectares: 10000,
  sqft:     0.09290304,
  sqmeters: 1,
  sections: 2589988.110336, // 640 acres
};

const UNIT_LABELS: Record<Unit, string> = {
  acres:    'Acres',
  hectares: 'Hectares (ha)',
  sqft:     'Square Feet (sq ft)',
  sqmeters: 'Square Meters (m²)',
  sections: 'Sections (640 ac)',
};

const UNITS: Unit[] = ['acres', 'hectares', 'sqft', 'sqmeters', 'sections'];

function formatNum(n: number): string {
  if (n >= 1_000_000) return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
  if (n >= 1000)      return n.toLocaleString('en-US', { maximumFractionDigits: 3 });
  if (n >= 1)         return n.toLocaleString('en-US', { maximumFractionDigits: 4 });
  return n.toLocaleString('en-US', { maximumFractionDigits: 6 });
}

export default function AcreageConverter() {
  const [value, setValue] = useState(160);
  const [inputStr, setInputStr] = useState('160');
  const [fromUnit, setFromUnit] = useState<Unit>('acres');
  const [toUnit, setToUnit] = useState<Unit>('hectares');

  const sqm = useMemo(() => value * TO_SQM[fromUnit], [value, fromUnit]);

  const allConversions = useMemo(
    () =>
      UNITS.filter((u) => u !== fromUnit).map((u) => ({
        unit: u,
        label: UNIT_LABELS[u],
        value: sqm / TO_SQM[u],
      })),
    [sqm, fromUnit],
  );

  const primaryResult = useMemo(() => sqm / TO_SQM[toUnit], [sqm, toUnit]);

  function handleValueInput(val: string) {
    setInputStr(val);
    const n = parseFloat(val);
    if (!isNaN(n) && n >= 0) setValue(n);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Ruler className="w-5 h-5 text-blue-700" />
        </div>
        <h2 className="font-bold text-gray-900 text-lg">Farm Acreage Converter</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Value input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
          <input
            type="number"
            value={inputStr}
            min={0}
            onChange={(e) => handleValueInput(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
          />
        </div>

        {/* From unit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as Unit)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
          >
            {UNITS.map((u) => (
              <option key={u} value={u}>{UNIT_LABELS[u]}</option>
            ))}
          </select>
        </div>

        {/* To unit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as Unit)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
          >
            {UNITS.filter((u) => u !== fromUnit).map((u) => (
              <option key={u} value={u}>{UNIT_LABELS[u]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Primary result */}
      <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-5 mb-4">
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {formatNum(value)} {UNIT_LABELS[fromUnit]} =
        </div>
        <div className="text-3xl font-bold text-blue-700">
          {formatNum(primaryResult)}
        </div>
        <div className="text-sm text-gray-600 mt-0.5">{UNIT_LABELS[toUnit]}</div>
      </div>

      {/* All conversions */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">All equivalents</div>
        <div className="grid grid-cols-2 gap-3">
          {allConversions.map((c) => (
            <div key={c.unit} className="flex flex-col">
              <span className="text-xs text-gray-500">{c.label}</span>
              <span className="font-bold text-gray-900 text-sm">{formatNum(c.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
