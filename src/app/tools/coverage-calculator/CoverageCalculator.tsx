'use client';

import { useState, useMemo } from 'react';
import { Clock, Plane, AlertTriangle } from 'lucide-react';

const DRONE_MODELS = [
  {
    id: 'dji-t25p', name: 'DJI Agras T25P', tankGal: 6.6,
    acresPerHrLow: 20, acresPerHrHigh: 30,
    batteryMinutes: 17, chargeMinutes: 25, swapsPerBattery: 1,
  },
  {
    id: 'dji-t50', name: 'DJI Agras T50', tankGal: 13.2,
    acresPerHrLow: 30, acresPerHrHigh: 45,
    batteryMinutes: 15, chargeMinutes: 25, swapsPerBattery: 1,
  },
  {
    id: 'dji-t100', name: 'DJI Agras T100', tankGal: 26.4,
    acresPerHrLow: 60, acresPerHrHigh: 80,
    batteryMinutes: 14, chargeMinutes: 30, swapsPerBattery: 1,
  },
  {
    id: 'hylio-ag272', name: 'Hylio AG-272', tankGal: 7.2,
    acresPerHrLow: 25, acresPerHrHigh: 38,
    batteryMinutes: 18, chargeMinutes: 20, swapsPerBattery: 1,
  },
  {
    id: 'xag-p100', name: 'XAG P100 Pro', tankGal: 6.6,
    acresPerHrLow: 22, acresPerHrHigh: 35,
    batteryMinutes: 16, chargeMinutes: 22, swapsPerBattery: 1,
  },
];

const APP_RATES = [
  { id: '2gpa', label: '2 gal/acre (fungicide, standard)', gpa: 2 },
  { id: '3gpa', label: '3 gal/acre (foliar nutrient)', gpa: 3 },
  { id: '5gpa', label: '5 gal/acre (heavy residue/dense canopy)', gpa: 5 },
];

const FIELD_SHAPES = [
  { id: 'square', label: 'Square / rectangular', turnPenalty: 0.05 },
  { id: 'irregular', label: 'Irregular / L-shaped', turnPenalty: 0.12 },
  { id: 'narrow', label: 'Narrow strips or pivot corners', turnPenalty: 0.20 },
];

export default function CoverageCalculator() {
  const [droneId, setDroneId] = useState('dji-t50');
  const [acres, setAcres] = useState(300);
  const [appRateId, setAppRateId] = useState('2gpa');
  const [fieldShapeId, setFieldShapeId] = useState('square');
  const [drones, setDrones] = useState(1);

  const drone = useMemo(() => DRONE_MODELS.find((d) => d.id === droneId) || DRONE_MODELS[1], [droneId]);
  const appRate = useMemo(() => APP_RATES.find((r) => r.id === appRateId) || APP_RATES[0], [appRateId]);
  const fieldShape = useMemo(() => FIELD_SHAPES.find((f) => f.id === fieldShapeId) || FIELD_SHAPES[0], [fieldShapeId]);

  const results = useMemo(() => {
    const avgAcresPerHr = (drone.acresPerHrLow + drone.acresPerHrHigh) / 2 * (1 - fieldShape.turnPenalty);

    // Total product needed (gallons)
    const totalGallons = acres * appRate.gpa;

    // Tank fills needed
    const tankFills = Math.ceil(totalGallons / drone.tankGal);

    // Flying time (hours)
    const flyingHours = acres / avgAcresPerHr;
    const flyingMinutes = flyingHours * 60;

    // Battery swaps needed (battery lasts ~batteryMinutes of flying)
    const batterySwaps = Math.max(0, Math.ceil(flyingMinutes / drone.batteryMinutes) - 1);

    // Tank refill time: ~4 minutes per fill
    const refillMinutes = tankFills * 4;

    // Battery swap time (charging already has batteries ready if using dual charger)
    const batterySwapMinutes = batterySwaps * 3; // 3 min swap time

    // Setup + safety check: 20 min per session, assume one session per job
    const setupMinutes = 20;

    // Ferry time (driving to field): not included, operator-dependent

    const totalMinutes = flyingMinutes + refillMinutes + batterySwapMinutes + setupMinutes;
    const totalMinutesPerDrone = totalMinutes;
    const totalMinutesMultiDrone = totalMinutes / drones;

    const formatTime = (min: number) => {
      const h = Math.floor(min / 60);
      const m = Math.round(min % 60);
      if (h === 0) return `${m} min`;
      return `${h}h ${m}m`;
    };

    const earlyStart = 7; // 7am
    const endHour = earlyStart + totalMinutesMultiDrone / 60;
    const endHrInt = Math.floor(endHour);
    const endMin = Math.round((endHour - endHrInt) * 60);
    const endTimeStr = `${endHrInt}:${endMin.toString().padStart(2, '0')} ${endHrInt >= 12 ? 'PM' : 'AM'}`.replace(/^12/, '12').replace(/^(\d+)/, (m) => `${parseInt(m) > 12 ? parseInt(m) - 12 : parseInt(m)}`);

    const singleDayJob = totalMinutesMultiDrone <= 480; // 8 hours

    return {
      avgAcresPerHr: avgAcresPerHr.toFixed(0),
      totalGallons: Math.round(totalGallons),
      tankFills,
      flyingMinutes: Math.round(flyingMinutes),
      batterySwaps,
      refillMinutes: Math.round(refillMinutes),
      batterySwapMinutes: Math.round(batterySwapMinutes),
      setupMinutes,
      totalMinutesPerDrone: Math.round(totalMinutesPerDrone),
      totalMinutesMultiDrone: Math.round(totalMinutesMultiDrone),
      formatTime,
      endTimeStr,
      singleDayJob,
    };
  }, [drone, acres, appRate, fieldShape, drones]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-orange-700" />
          </div>
          <h2 className="font-bold text-gray-900">Job Parameters</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Drone model</label>
            <select
              value={droneId}
              onChange={(e) => setDroneId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none"
            >
              {DRONE_MODELS.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.acresPerHrLow}–{d.acresPerHrHigh} ac/hr)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application rate</label>
            <select
              value={appRateId}
              onChange={(e) => setAppRateId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none"
            >
              {APP_RATES.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Field shape</label>
            <select
              value={fieldShapeId}
              onChange={(e) => setFieldShapeId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none"
            >
              {FIELD_SHAPES.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of drones: <span className="text-orange-700 font-bold">{drones}</span>
            </label>
            <input
              type="range" min={1} max={5} step={1}
              value={drones}
              onChange={(e) => setDrones(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>1</span><span>5</span></div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total acreage: <span className="text-orange-700 font-bold">{acres.toLocaleString()} acres</span>
            </label>
            <input
              type="range" min={10} max={3000} step={10}
              value={acres}
              onChange={(e) => setAcres(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>10</span><span>3,000</span></div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Plane className="w-5 h-5 text-orange-600 rotate-45" /> Estimated Job Duration
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Flying time</div>
            <div className="font-bold text-orange-700 text-lg">{results.formatTime(results.flyingMinutes)}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Tank refills</div>
            <div className="font-bold text-gray-700 text-lg">{results.tankFills}×</div>
            <div className="text-xs text-gray-400">{results.formatTime(results.refillMinutes)}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">Battery swaps</div>
            <div className="font-bold text-gray-700 text-lg">{results.batterySwaps}×</div>
            <div className="text-xs text-gray-400">{results.formatTime(results.batterySwapMinutes)}</div>
          </div>
          <div className={`rounded-xl p-4 text-center ${results.singleDayJob ? 'bg-green-100' : 'bg-amber-50'}`}>
            <div className="text-xs text-gray-500 mb-1">Total ({drones} drone{drones > 1 ? 's' : ''})</div>
            <div className={`font-bold text-lg ${results.singleDayJob ? 'text-green-700' : 'text-amber-700'}`}>
              {results.formatTime(results.totalMinutesMultiDrone)}
            </div>
          </div>
        </div>

        {/* Schedule estimate */}
        <div className={`flex items-start gap-3 p-4 rounded-xl ${results.singleDayJob ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
          {results.singleDayJob
            ? <Clock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            : <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          }
          <div>
            {results.singleDayJob ? (
              <p className="text-sm font-semibold text-gray-800">
                Single-day job. Starting at 7:00 AM, expect to finish by approximately{' '}
                <span className="text-green-700">{results.endTimeStr}</span>.
              </p>
            ) : (
              <p className="text-sm font-semibold text-gray-800">
                Multi-day job at this acreage. Consider adding {Math.ceil(results.totalMinutesMultiDrone / 480) - 1} more drone{Math.ceil(results.totalMinutesMultiDrone / 480) - 1 > 1 ? 's' : ''} to complete in one day.
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Based on {results.avgAcresPerHr} ac/hr effective rate, {results.totalGallons.toLocaleString()} gal total product,
              {results.tankFills} tank fill{results.tankFills !== 1 ? 's' : ''}, 20-min setup. Does not include drive time to field.
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown table */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-600">
        <h3 className="font-semibold text-gray-800 mb-3">Time breakdown (per drone)</h3>
        <ul className="space-y-1.5">
          <li className="flex justify-between"><span>Setup and pre-flight check</span><span className="font-medium">{results.setupMinutes} min</span></li>
          <li className="flex justify-between"><span>Active flying at {results.avgAcresPerHr} ac/hr</span><span className="font-medium">{results.formatTime(results.flyingMinutes)}</span></li>
          <li className="flex justify-between"><span>Tank refills ({results.tankFills}× at 4 min each)</span><span className="font-medium">{results.formatTime(results.refillMinutes)}</span></li>
          <li className="flex justify-between"><span>Battery swaps ({results.batterySwaps}× at 3 min each)</span><span className="font-medium">{results.formatTime(results.batterySwapMinutes)}</span></li>
          <li className="flex justify-between font-semibold text-gray-800 pt-2 border-t border-gray-200">
            <span>Total (1 drone)</span><span>{results.formatTime(results.totalMinutesPerDrone)}</span>
          </li>
          {drones > 1 && (
            <li className="flex justify-between font-semibold text-green-700 pt-1">
              <span>Total ({drones} drones, parallel)</span><span>{results.formatTime(results.totalMinutesMultiDrone)}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
