'use client';

import { Bell, MessageCircle } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

import { addUtm } from '@/lib/utm';
export default function NewsletterCTA() {
  return (
    <section className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full mb-5 border bg-emerald-500/20 border-emerald-500/40 text-emerald-300">
              <Bell className="w-3.5 h-3.5" />
              Free seasonal updates
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight text-white">
              Stay ahead of the spray season
            </h2>

            <p className="mb-6 leading-relaxed text-gray-400">
              New verified operators added weekly, per-acre rate updates by crop and region,
              regulatory changes (FAA Part 137, EPA FIFRA), and USDA EQIP funding alerts.
              Free, no spam.
            </p>

            <ul className="space-y-2.5 text-sm text-gray-400">
              {[
                'Per-acre rate updates by crop & region',
                'New verified operators in your state',
                'FAA, EPA & USDA regulatory alerts',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="rounded-2xl p-6 border bg-white/5 border-emerald-500/30">
            <p className="text-sm text-gray-300 mb-3 font-medium">
              Subscribe to the newsletter
            </p>

            <NewsletterForm className="mb-6" />

            <div className="border-t border-white/10 pt-4">
              <a
                href={addUtm("https://whatsapp.com/channel/usagdronedirectory", "service_provider")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                Follow us on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
