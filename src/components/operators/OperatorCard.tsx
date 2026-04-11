'use client';

import Link from 'next/link';
import { MapPin, Phone, Globe, CheckCircle, Plane, Zap, Shield } from 'lucide-react';
import { Operator, SERVICE_LABELS } from '@/data/types';
import { formatPrice, addUtmParams } from '@/lib/utils';
import {
  trackOperatorWebsiteClick,
  trackOperatorPhoneClick,
} from '@/components/analytics/events';

interface OperatorCardProps {
  operator: Operator;
  showCounty?: boolean;
}

const MAX_VISIBLE_TAGS = 3;

export default function OperatorCard({ operator, showCounty = true }: OperatorCardProps) {
  // Display shortName on cards for visual balance; fall back to full name
  const displayName = operator.shortName || operator.name;
  const visibleServices = operator.services.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = operator.services.length - MAX_VISIBLE_TAGS;

  return (
    <article
      className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-green-400 transition-all flex flex-col h-full min-h-[320px]"
      itemScope
      itemType="https://schema.org/ProfessionalService"
    >
      {/* ── Header: icon + name + badges ───────────────────────── */}
      <header className="flex items-start gap-3 mb-2">
        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-green-200 group-hover:to-green-100 transition-colors">
          <Plane className="w-6 h-6 text-green-700 rotate-45" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link
              href={`/operatori/${operator.slug}`}
              className="font-bold text-gray-900 group-hover:text-green-700 transition-colors text-base leading-tight truncate"
              itemProp="name"
              title={operator.name}
            >
              {displayName}
            </Link>
            {operator.verified && (
              <span title="Verificat" className="flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-green-600" aria-label="Verificat" />
              </span>
            )}
          </div>
          {showCounty && (
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5" itemProp="address">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">
                {operator.city}
                {operator.country === 'MD' ? ', MD' : ', RO'}
              </span>
            </div>
          )}
        </div>
        {operator.featured && (
          <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide flex-shrink-0">
            Top
          </span>
        )}
      </header>

      {/* ── Tagline (optional, more descriptive than description) ── */}
      {operator.tagline && (
        <p className="text-xs font-medium text-green-700 mb-2 line-clamp-1">
          {operator.tagline}
        </p>
      )}

      {/* ── Description ─────────────────────────────────────────── */}
      <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-grow-0" itemProp="description">
        {operator.description}
      </p>

      {/* ── Service tags (3 visible + overflow counter) ─────────── */}
      <div className="flex flex-wrap gap-1 mb-3 min-h-[24px]">
        {visibleServices.map((service) => (
          <span
            key={service}
            className="text-[11px] bg-green-50 text-green-800 px-2 py-0.5 rounded-md border border-green-200 font-medium"
          >
            {SERVICE_LABELS[service]}
          </span>
        ))}
        {hiddenCount > 0 && (
          <Link
            href={`/operatori/${operator.slug}`}
            className="text-[11px] text-gray-500 hover:text-green-700 px-2 py-0.5 rounded-md border border-gray-200 hover:border-green-300 transition-colors font-medium"
            aria-label={`Mai multe servicii (${hiddenCount})`}
          >
            +{hiddenCount} mai multe
          </Link>
        )}
      </div>

      {/* ── Stats row (grows to push footer down) ─────────────── */}
      <div className="flex-1 flex items-end">
        <div className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100">
            <div className="text-sm font-bold text-green-700">
              {operator.priceMinRon
                ? formatPrice(operator.priceMinRon, operator.priceMaxRon)
                : operator.priceMinMdl
                ? formatPrice(operator.priceMinMdl, operator.priceMaxMdl, 'MDL')
                : <span className="text-gray-400 font-normal text-xs">Preț la cerere</span>}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-gray-500">
              {operator.haTreated && operator.haTreated >= 1000 && (
                <span className="flex items-center gap-0.5" title="Hectare tratate cumulat">
                  <Zap className="w-3 h-3" /> {(operator.haTreated / 1000).toFixed(0)}K ha
                </span>
              )}
              {operator.fleetSize && (
                <span className="flex items-center gap-0.5" title="Flotă drone">
                  <Plane className="w-3 h-3 rotate-45" /> {operator.fleetSize}
                </span>
              )}
              {operator.acceptsAfirFunds && (
                <span title="Acceptă fonduri AFIR">
                  <Shield className="w-3 h-3 text-blue-600" />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer: 2 CTAs (Vezi profil + Website) ──────────────── */}
      <footer className="flex items-stretch gap-2 mt-3 pt-3 border-t border-gray-100">
        <Link
          href={`/operatori/${operator.slug}`}
          aria-label={`Vezi profil ${operator.name}`}
          className="flex-1 text-center px-3 py-2 bg-green-700 text-white text-xs font-semibold rounded-lg hover:bg-green-800 transition-colors"
        >
          Vezi profil
        </Link>
        {operator.website ? (
          <a
            href={addUtmParams(operator.website, operator.slug)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-white border border-green-700 text-green-700 text-xs font-semibold rounded-lg hover:bg-green-50 transition-colors"
            aria-label={`Website ${operator.name}`}
            onClick={() => trackOperatorWebsiteClick(operator.slug, 'operator_card')}
          >
            <Globe className="w-3.5 h-3.5" /> Website
          </a>
        ) : operator.phone ? (
          <a
            href={`tel:${operator.phone}`}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-white border border-green-700 text-green-700 text-xs font-semibold rounded-lg hover:bg-green-50 transition-colors"
            aria-label={`Telefon ${operator.name}`}
            onClick={() => trackOperatorPhoneClick(operator.slug)}
          >
            <Phone className="w-3.5 h-3.5" /> Telefon
          </a>
        ) : (
          <Link
            href={`/operatori/${operator.slug}#contact`}
            className="flex-1 text-center px-3 py-2 bg-white border border-green-700 text-green-700 text-xs font-semibold rounded-lg hover:bg-green-50 transition-colors"
          >
            Contact
          </Link>
        )}
      </footer>
    </article>
  );
}
