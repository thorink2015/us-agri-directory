'use client';

import { useMemo, useState } from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const DRONE_MODELS = [
  { id: 'dji-t50',     name: 'DJI Agras T50',   tankGal: 10.6, flightMin: 8,  chargeMin: 10, swapMin: 3 },
  { id: 'dji-t100',    name: 'DJI Agras T100',  tankGal: 26.4, flightMin: 10, chargeMin: 9,  swapMin: 4 },
  { id: 'dji-t25',     name: 'DJI Agras T25',   tankGal: 5.3,  flightMin: 7,  chargeMin: 10, swapMin: 3 },
  { id: 'hylio-ag272', name: 'Hylio AG-272',    tankGal: 18,   flightMin: 9,  chargeMin: 28, swapMin: 4 },
  { id: 'hylio-ag230', name: 'Hylio AG-230',    tankGal: 8,    flightMin: 8,  chargeMin: 28, swapMin: 3 },
  { id: 'xag-p100',    name: 'XAG P100 Pro',    tankGal: 13.2, flightMin: 9,  chargeMin: 15, swapMin: 3 },
  { id: 'talos-t60x',  name: 'Talos T60X',      tankGal: 13.2, flightMin: 9,  chargeMin: 12, swapMin: 3 },
];

const APP_RATES = [2, 3, 5, 10, 15];

const FIELD_SHAPES = [
  { id: 'square',    label: 'Square / rectangular', mult: 1.0 },
  { id: 'irregular', label: 'Irregular',            mult: 1.15 },
  { id: 'narrow',    label: 'Narrow / strip',       mult: 1.25 },
];

function fmtTime(totalMinutes: number) {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  if (h === 0) return `${m} minutes`;
  if (m === 0) return `${h} hour${h > 1 ? 's' : ''}`;
  return `${h} hour${h > 1 ? 's' : ''}, ${m} min`;
}

export default function CoverageCalculator() {
  const [acres, setAcres] = useState(160);
  const [acresInput, setAcresInput] = useState('160');
  const [droneId, setDroneId] = useState('dji-t50');
  const [appRate, setAppRate] = useState(3);
  const [shapeId, setShapeId] = useState('square');
  const [fleet, setFleet] = useState(1);

  const drone = useMemo(() => DRONE_MODELS.find((d) => d.id === droneId) ?? DRONE_MODELS[0], [droneId]);
  const shape = useMemo(() => FIELD_SHAPES.find((f) => f.id === shapeId) ?? FIELD_SHAPES[0], [shapeId]);

  const results = useMemo(() => {
    const acresPerTank = drone.tankGal / appRate;
    const tanksNeeded = Math.ceil(acres / acresPerTank);

    const totalFlightTime = tanksNeeded * drone.flightMin;
    const totalChargeTime = tanksNeeded * drone.chargeMin;
    const totalSwapTime = tanksNeeded * drone.swapMin;

    const grossMinutes = (totalFlightTime + totalSwapTime) * shape.mult;
    const chargeBottleneck = Math.max(0, totalChargeTime - totalFlightTime);
    const totalMinutes = grossMinutes + chargeBottleneck;
    const totalMinutesWithFleet = totalMinutes / fleet;

    const effectiveAcresPerHour = totalMinutesWithFleet > 0 ? acres / (totalMinutesWithFleet / 60) : 0;
    const recommendedFleet = Math.ceil(totalMinutes / (60 * 8));

    let verdict: 'single' | 'tight' | 'multi';
    if (totalMinutesWithFleet <= 60 * 8) verdict = 'single';
    else if (totalMinutesWithFleet <= 60 * 14) verdict = 'tight';
    else verdict = 'multi';

    return {
      acresPerTank,
      tanksNeeded,
      totalFlightTime,
      totalChargeTime,
      totalSwapTime,
      grossMinutes,
      chargeBottleneck,
      totalMinutes,
      totalMinutesWithFleet,
      effectiveAcresPerHour,
      recommendedFleet,
      verdict,
    };
  }, [drone, shape, acres, appRate, fleet]);

  function handleAcresInput(val: string) {
    setAcresInput(val);
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 10 && n <= 5000) setAcres(n);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-orange-700" />
          </div>
          <h2 className="font-bold text-gray-900 text-lg">Job parameters</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Total acres</label>
            <div className="flex gap-2 items-center">
              <input
                type="range"
                min={10}
                max={5000}
                step={10}
                value={acres}
                onChange={(e) => { setAcres(Number(e.target.value)); setAcresInput(e.target.value); }}
                className="flex-1 accent-orange-600"
              />
              <input
                type="number"
                min={10}
                max={5000}
                value={acresInput}
                onChange={(e) => handleAcresInput(e.target.value)}
                className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm text-center focus:border-orange-500 focus:outline-none"
                aria-label="Acres (direct entry)"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-0.5">
              <span>10</span><span>5,000 acres</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Drone model</label>
            <select
              value={droneId}
              onChange={(e) => setDroneId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:outline-none"
            >
              {DRONE_MODELS.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.tankGal} gal)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application rate</label>
            <select
              value={appRate}
              onChange={(e) => setAppRate(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:outline-none"
            >
              {APP_RATES.map((r) => (
                <option key={r} value={r}>{r} gallons per acre</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Field shape</label>
            <select
              value={shapeId}
              onChange={(e) => setShapeId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:outline-none"
            >
              {FIELD_SHAPES.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fleet size: <span className="text-orange-700 font-bold">{fleet}</span>
            </label>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={fleet}
              onChange={(e) => setFleet(Number(e.target.value))}
              className="w-full accent-orange-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-0.5">
              <span>1 drone</span><span>5 drones</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="font-bold text-gray-900 text-lg mb-4">Estimated job duration</h2>

        <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-xl p-5 mb-5">
          <div className="text-sm text-gray-600 mb-1">Total time with {fleet} drone{fleet > 1 ? 's' : ''}</div>
          <div className="text-3xl font-bold text-orange-700">
            {fmtTime(results.totalMinutesWithFleet)}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Effective {Math.round(results.effectiveAcresPerHour)} acres per hour
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Tank refills</div>
            <div className="font-bold text-gray-900 text-lg">{results.tanksNeeded}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Battery swaps</div>
            <div className="font-bold text-gray-900 text-lg">{results.tanksNeeded}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Acres / tank</div>
            <div className="font-bold text-gray-900 text-lg">{results.acresPerTank.toFixed(1)}</div>
          </div>
        </div>

        {/* Single-day verdict */}
        <div className={`flex items-start gap-3 p-4 rounded-xl ${
          results.verdict === 'single'
            ? 'bg-green-50 border border-green-200'
            : results.verdict === 'tight'
              ? 'bg-amber-50 border border-amber-200'
              : 'bg-red-50 border border-red-200'
        }`}>
          {results.verdict === 'single'
            ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            : <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${results.verdict === 'tight' ? 'text-amber-600' : 'text-red-600'}`} />
          }
          <div>
            {results.verdict === 'single' && (
              <p className="text-sm font-semibold text-gray-800">
                Completable in a single spray day.
              </p>
            )}
            {results.verdict === 'tight' && (
              <p className="text-sm font-semibold text-gray-800">
                Tight for a single day. Consider adding a second drone or splitting across two days.
              </p>
            )}
            {results.verdict === 'multi' && (
              <p className="text-sm font-semibold text-gray-800">
                Multi-day job. A fleet of {results.recommendedFleet} drones would complete this in one day.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-600">
        <h3 className="font-semibold text-gray-800 mb-3">Time breakdown (before fleet division)</h3>
        <ul className="space-y-1.5">
          <li className="flex justify-between">
            <span>Active flight time ({results.tanksNeeded} × {drone.flightMin} min)</span>
            <span className="font-medium">{fmtTime(results.totalFlightTime)}</span>
          </li>
          <li className="flex justify-between">
            <span>Tank refill &amp; battery swap ({results.tanksNeeded} × {drone.swapMin} min)</span>
            <span className="font-medium">{fmtTime(results.totalSwapTime)}</span>
          </li>
          <li className="flex justify-between">
            <span>Field shape penalty ({shape.label}, ×{shape.mult.toFixed(2)})</span>
            <span className="font-medium">+{fmtTime(results.grossMinutes - (results.totalFlightTime + results.totalSwapTime))}</span>
          </li>
          <li className="flex justify-between">
            <span>Charging bottleneck</span>
            <span className="font-medium">{fmtTime(results.chargeBottleneck)}</span>
          </li>
          <li className="flex justify-between font-semibold text-gray-800 pt-2 border-t border-gray-200">
            <span>Single-drone total</span>
            <span>{fmtTime(results.totalMinutes)}</span>
          </li>
          {fleet > 1 && (
            <li className="flex justify-between font-semibold text-orange-700 pt-1">
              <span>Fleet of {fleet} (parallel)</span>
              <span>{fmtTime(results.totalMinutesWithFleet)}</span>
            </li>
          )}
        </ul>
        <p className="text-xs text-gray-500 mt-3">
          Assumes rotating batteries keep the drone airborne unless charge time exceeds flight time. Does not include drive to field or initial mission setup.
        </p>
      </div>
    </div>
  );
}
