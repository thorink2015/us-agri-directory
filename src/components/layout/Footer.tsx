'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Plane, ChevronDown } from 'lucide-react';
import { counties } from '@/data/counties';

export default function Footer() {
  const [showAll, setShowAll] = useState(false);

  return (
    <footer className="bg-green-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Upper grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-white rotate-45" />
              </div>
              <span className="font-bold text-lg text-white">
                US Ag Drone
                <span className="text-yellow-400"> Directory</span>
              </span>
            </Link>
            <p className="text-sm text-green-300 leading-relaxed max-w-xs">
              The largest directory of agricultural drone services in America. Connecting farmers with verified operators in all 50 states.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Services</h3>
            <ul className="space-y-2 text-sm text-green-300">
              <li><Link href="/services/spraying" className="hover:text-white transition-colors">Drone Spraying</Link></li>
              <li><Link href="/services/seeding" className="hover:text-white transition-colors">Cover Crop Seeding</Link></li>
              <li><Link href="/services/mapping" className="hover:text-white transition-colors">Aerial Mapping</Link></li>
              <li><Link href="/services/monitoring" className="hover:text-white transition-colors">Crop Scouting</Link></li>
              <li><Link href="/services/spreading" className="hover:text-white transition-colors">Fertilizer Application</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing Guide</Link></li>
            </ul>
          </div>

          {/* Directory */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Directory</h3>
            <ul className="space-y-2 text-sm text-green-300">
              <li><Link href="/operators" className="hover:text-white transition-colors">All Operators</Link></li>
              <li><Link href="/judete" className="hover:text-white transition-colors">Browse by State</Link></li>
              <li><Link href="/crops" className="hover:text-white transition-colors">Browse by Crop</Link></li>
              <li><Link href="/drones" className="hover:text-white transition-colors">Drone Models</Link></li>
              <li><Link href="/list-your-business" className="hover:text-white transition-colors">List Your Business</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Company</h3>
            <ul className="space-y-2 text-sm text-green-300">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Expandable states list */}
        <div className="border-t border-green-800 pt-6 mb-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full flex items-center justify-between text-white font-semibold text-sm uppercase tracking-wide mb-3 hover:text-yellow-300 transition-colors"
            aria-expanded={showAll}
          >
            <span>All 50 States ({counties.length})</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>

          {showAll ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-1 text-xs text-green-300">
              {counties.map((state) => (
                <Link
                  key={state.slug}
                  href={`/judete/${state.slug}`}
                  className="hover:text-white transition-colors py-1.5 block"
                >
                  {state.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-1 text-xs text-green-300">
              {counties.slice(0, 10).map((state) => (
                <Link
                  key={state.slug}
                  href={`/judete/${state.slug}`}
                  className="hover:text-white transition-colors py-1.5 block"
                >
                  {state.name}
                </Link>
              ))}
              <button
                onClick={() => setShowAll(true)}
                className="text-yellow-400 hover:text-yellow-300 font-semibold text-left py-1.5"
              >
                + View all →
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-green-800 mt-4 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-green-200">
          <p>© 2026 US Agricultural Drone Directory. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-green-700">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <p>Free basic listings for all verified operators</p>
        </div>
      </div>
    </footer>
  );
}
