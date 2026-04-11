'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import { counties } from '@/data/counties';

export default function SearchBar() {
  const [county, setCounty] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (county) {
      router.push(`/judete/${county}`);
    } else {
      router.push('/operatori');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <label htmlFor="county-select" className="sr-only">Alege județul</label>
        <select
          id="county-select"
          aria-label="Alege județul"
          value={county}
          onChange={(e) => setCounty(e.target.value)}
          className="w-full pl-10 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
        >
          <option value="">Alege județul tău...</option>
          <optgroup label="România">
            {counties.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 px-6 py-3.5 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors text-sm whitespace-nowrap"
      >
        <Search className="w-4 h-4" />
        Găsește operatori
      </button>
    </form>
  );
}
