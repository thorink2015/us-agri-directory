'use client';

import { useState } from 'react';
import { Ruler } from 'lucide-react';

type Unit = 'ha' | 'ari' | 'm2' | 'km2' | 'acres' | 'pogoane';

const TO_M2: Record<Unit, number> = {
  ha: 10000,
  ari: 100,
  m2: 1,
  km2: 1_000_000,
  acres: 4046.86,
  pogoane: 5000,
};

const UNIT_LABELS: Record<Unit, string> = {
  ha: 'Hectare (ha)',
  ari: 'Ari (a)',
  m2: 'Metri pătrați (m²)',
  km2: 'Kilometri pătrați (km²)',
  acres: 'Acri',
  pogoane: 'Pogoane (RO)',
};

export default function HectareCalculator() {
  const [value, setValue] = useState(1);
  const [unit, setUnit] = useState<Unit>('ha');

  const m2 = value * TO_M2[unit];

  const conversions: { unit: Unit; value: number }[] = (
    ['ha', 'ari', 'm2', 'km2', 'acres', 'pogoane'] as Unit[]
  )
    .filter((u) => u !== unit)
    .map((u) => ({ unit: u, value: m2 / TO_M2[u] }));

  function format(n: number) {
    if (n >= 1000) return n.toLocaleString('ro', { maximumFractionDigits: 2 });
    if (n >= 1) return n.toFixed(2);
    return n.toFixed(4);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Ruler className="w-5 h-5 text-blue-700" />
        </div>
        <h2 className="font-bold text-gray-900">Conversie suprafețe</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Valoare</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Math.max(0, Number(e.target.value) || 0))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unitate</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none"
          >
            {(Object.keys(UNIT_LABELS) as Unit[]).map((u) => (
              <option key={u} value={u}>
                {UNIT_LABELS[u]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-5 mb-4">
        <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">
          {value} {UNIT_LABELS[unit]} echivalează cu:
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {conversions.map((c) => (
            <div key={c.unit} className="flex flex-col">
              <span className="text-xs text-gray-500">{UNIT_LABELS[c.unit]}</span>
              <span className="font-bold text-gray-900">{format(c.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
