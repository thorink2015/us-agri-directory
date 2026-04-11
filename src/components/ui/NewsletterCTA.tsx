'use client';

import { Bell, MessageCircle } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

interface Props {
  variant?: 'ro' | 'md';
}

export default function NewsletterCTA({ variant = 'ro' }: Props) {
  const isMd = variant === 'md';

  const accent = isMd
    ? { badge: 'bg-blue-500/20 border-blue-500/40 text-blue-300', dot: 'bg-blue-400', muted: 'text-blue-300', border: 'border-blue-500/30' }
    : { badge: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300', dot: 'bg-emerald-400', muted: 'text-emerald-300', border: 'border-emerald-500/30' };

  return (
    <section className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: copy */}
          <div>
            <div className={`inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full mb-5 border ${accent.badge}`}>
              <Bell className="w-3.5 h-3.5" />
              {isMd ? 'Noutăți exclusive din Moldova' : 'Noutăți exclusive din România'}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight text-white">
              {isMd
                ? 'Fii primul care află prețurile sezonului 2026'
                : 'Primești lunar cele mai bune prețuri și oferte'}
            </h2>

            <p className="mb-6 leading-relaxed text-gray-400">
              {isMd
                ? 'Operatori noi adăugați în Moldova, tarife MDL actualizate, modificări la subvențiile AIPA și ghiduri practice. Gratuit, fără spam.'
                : 'Operatori noi în județul tău, tarife RON/ha actualizate pe culturi, modificări legislative AFIR/AACR și oferte de sezon. Gratuit, fără spam.'}
            </p>

            <ul className="space-y-2.5 text-sm text-gray-400">
              {(isMd
                ? [
                    'Prețuri MDL/ha actualizate lunar',
                    'Operatori noi autorizați ANSA în Moldova',
                    'Noutăți despre subvențiile AIPA',
                  ]
                : [
                    'Prețuri RON/ha actualizate lunar pe culturi',
                    'Operatori noi din județul tău',
                    'Modificări legislative AFIR și AACR',
                  ]
              ).map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${accent.dot}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className={`rounded-2xl p-6 border bg-white/5 ${accent.border}`}>
            <p className="text-sm text-gray-300 mb-3 font-medium">
              Abonează-te la newsletter
            </p>

            <NewsletterForm className="mb-6" />

            <div className="border-t border-white/10 pt-4">
              <a
                href="https://whatsapp.com/channel/droneagricol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                Sau urmărește-ne pe WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
