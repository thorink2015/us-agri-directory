'use client';

import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';

const CROPS = [
  { slug: 'corn', name: 'Corn', pricePerAcre: 14, groundPerAcre: 10 },
  { slug: 'soybeans', name: 'Soybeans', pricePerAcre: 14, groundPerAcre: 10 },
  { slug: 'wheat', name: 'Wheat', pricePerAcre: 13, groundPerAcre: 9 },
  { slug: 'cotton', name: 'Cotton', pricePerAcre: 17, groundPerAcre: 12 },
  { slug: 'rice', name: 'Rice', pricePerAcre: 18, groundPerAcre: 14 },
  { slug: 'grapes', name: 'Grapes / Vineyards', pricePerAcre: 25, groundPerAcre: 35 },
  { slug: 'orchards', name: 'Orchards', pricePerAcre: 28, groundPerAcre: 40 },
  { slug: 'cover-crops', name: 'Cover Crops (seeding)', pricePerAcre: 15, groundPerAcre: 8 },
];

export default function PriceCalculator() {
  const [cropSlug, setCropSlug] = useState('corn');
  const [acres, setAcres] = useState(200);
  const [applications, setApplications] = useState(2);

  const crop = useMemo(() => CROPS.find((c) => c.slug === cropSlug) || CROPS[0], [cropSlug]);

  const droneTotal = crop.pricePerAcre * acres * applications;
  const groundTotal = crop.groundPerAcre * acres * applications;
  const savings = groundTotal - droneTotal;
  const savingsPercent = groundTotal > 0 ? ((Math.abs(savings) / groundTotal) * 100).toFixed(1) : '0';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <Calculator className="w-5 h-5 text-green-700" />
        </div>
        <h2 className="font-bold text-gray-900">Spray Cost Estimate</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
          <select
            value={cropSlug}
            onChange={(e) => setCropSlug(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none"
          >
            {CROPS.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} (${c.pricePerAcre}/acre drone)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Acreage: <span className="text-green-700 font-bold">{acres} acres</span>
          </label>
          <input
            type="range"
            min={1}
            max={5000}
            value={acres}
            onChange={(e) => setAcres(Number(e.target.value))}
            className="w-full accent-green-700"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 acre</span>
            <span>2,500 acres</span>
            <span>5,000 acres</span>
          </div>
          <input
            type="number"
            value={acres}
            onChange={(e) => setAcres(Math.max(1, Number(e.target.value) || 1))}
            min={1}
            className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            aria-label="Acreage (direct entry)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Applications per season: <span className="text-green-700 font-bold">{applications}</span>
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={applications}
            onChange={(e) => setApplications(Number(e.target.value))}
            className="w-full accent-green-700"
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-5 mb-4">
        <div className="text-sm text-gray-600 mb-1">Estimated total drone cost</div>
        <div className="text-4xl font-bold text-green-700 mb-1">
          ${droneTotal.toLocaleString('en-US')}
        </div>
        <div className="text-xs text-gray-500">
          ${crop.pricePerAcre}/acre × {acres} acres × {applications} application{applications !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Ground rig equivalent</div>
          <div className="text-lg font-bold text-gray-700">
            ${groundTotal.toLocaleString('en-US')}
          </div>
        </div>
        <div className={`${savings >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'} border rounded-xl p-4`}>
          <div className="text-xs text-gray-500 mb-1">{savings >= 0 ? 'Drone premium' : 'Drone savings'}</div>
          <div className={`text-lg font-bold ${savings >= 0 ? 'text-blue-700' : 'text-green-700'}`}>
            ${Math.abs(savings).toLocaleString('en-US')}
          </div>
          <div className="text-xs text-gray-500">{savingsPercent}% {savings >= 0 ? 'more vs ground' : 'saved vs ground'}</div>
        </div>
      </div>
    </div>
  );
}
