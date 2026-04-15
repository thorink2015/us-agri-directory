import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Globe, MapPin, CheckCircle, Calendar, Plane,
  Clock, Languages, CreditCard, Shield, Award, Zap, Users,
} from 'lucide-react';
import {
  FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, TiktokIcon,
} from '@/components/ui/SocialIcons';
import { operators, getOperatorBySlug } from '@/data/operators';
import { counties } from '@/data/counties';
import { CROP_NAME_MAP } from '@/data/crops';
import { DRONE_NAME_MAP } from '@/data/drone-models';
import { SERVICE_LABELS } from '@/data/types';
import { formatPrice, getStateAbbr } from '@/lib/utils';
import { buildOperatorMetadata } from '@/lib/seo';
import Breadcrumb from '@/components/layout/Breadcrumb';
import OperatorSchema from '@/components/schema/OperatorSchema';
import ExternalLink from '@/components/ui/ExternalLink';
import OperatorContactLinks from '@/components/operators/OperatorContactLinks';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return operators.map((op) => ({ slug: op.slug }));
}

export async function generateMetadata({ params }: Props) {
  const op = getOperatorBySlug(params.slug);
  if (!op) return {};
  return buildOperatorMetadata(op);
}

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese',
  zh: 'Mandarin',
};

const PAYMENT_LABELS: Record<string, string> = {
  cash: 'Cash',
  check: 'Check',
  transfer: 'Bank transfer',
  card: 'Credit card',
  venmo: 'Venmo / Zelle',
};

export default function OperatorPage({ params }: Props) {
  const operator = getOperatorBySlug(params.slug);
  if (!operator) notFound();

  const coveredStates = counties.filter((c) => operator.counties.includes(c.slug));

  return (
    <>
      <OperatorSchema operator={operator} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Operators', href: '/operatori' },
            { label: operator.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── Main content ─────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero / Header card */}
            <div className="bg-gradient-to-br from-white to-green-50/30 border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-green-200">
                  <Plane className="w-10 h-10 text-green-700 rotate-45" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{operator.name}</h1>
                    {operator.verified && (
                      <span className="flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    )}
                    {operator.featured && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold uppercase tracking-wide">
                        Featured
                      </span>
                    )}
                  </div>
                  {operator.tagline && (
                    <p className="text-green-700 font-medium text-sm mb-2">{operator.tagline}</p>
                  )}
                  <div className="flex items-center gap-3 flex-wrap text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {operator.city}, {getStateAbbr(operator.counties)}
                    </span>
                    {operator.founded && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Est. {operator.founded}
                      </span>
                    )}
                    {operator.coverageRadiusKm && (
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        {Math.round(operator.coverageRadiusKm * 0.621)} mi radius
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-gray-700 leading-relaxed">{operator.description}</p>

              {/* Quick stats bar */}
              {(operator.haTreated || operator.fleetSize || operator.pilotsCount || operator.clientsCount) && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-200">
                  {operator.haTreated && (
                    <div>
                      <div className="text-xl font-bold text-green-700">{operator.haTreated.toLocaleString('en-US')}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">acres treated</div>
                    </div>
                  )}
                  {operator.fleetSize && (
                    <div>
                      <div className="text-xl font-bold text-green-700">{operator.fleetSize}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">drones in fleet</div>
                    </div>
                  )}
                  {operator.pilotsCount && (
                    <div>
                      <div className="text-xl font-bold text-green-700">{operator.pilotsCount}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">licensed pilots</div>
                    </div>
                  )}
                  {operator.clientsCount && (
                    <div>
                      <div className="text-xl font-bold text-green-700">{operator.clientsCount}+</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">farm clients</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Services */}
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="font-bold text-gray-900 mb-4 text-lg">Services offered</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {operator.services.map((s) => (
                  <Link
                    key={s}
                    href={`/servicii/${s}`}
                    className="px-3 py-2 bg-green-50 text-green-800 border border-green-200 rounded-lg text-sm font-medium hover:bg-green-100 hover:border-green-300 transition-colors text-center"
                  >
                    {SERVICE_LABELS[s]}
                  </Link>
                ))}
              </div>
            </section>

            {/* Crops */}
            {operator.crops.length > 0 && (
              <section className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-bold text-gray-900 mb-4 text-lg">Crops serviced</h2>
                <div className="flex flex-wrap gap-2">
                  {operator.crops.map((c) => (
                    <Link
                      key={c}
                      href={`/culturi/${c}`}
                      className="px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors"
                    >
                      {CROP_NAME_MAP[c] || c}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Drones */}
            {operator.drones.length > 0 && (
              <section className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-bold text-gray-900 mb-4 text-lg">Equipment used</h2>
                <div className="flex flex-wrap gap-2">
                  {operator.drones.map((d) => (
                    <Link
                      key={d}
                      href={`/drone/${d}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      <Plane className="w-3.5 h-3.5 rotate-45" />
                      {DRONE_NAME_MAP[d] || d}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications + Quality */}
            {(operator.certFAAPart107 || operator.certFAAPart137 || operator.certHylio || operator.ndaaCompliant || operator.iso9001 || operator.acceptsUsdaFunds) && (
              <section className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-600" />
                  Certifications & compliance
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {operator.certFAAPart107 && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>FAA Part 107 Remote Pilot Certificate</span>
                    </div>
                  )}
                  {operator.certFAAPart137 && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>FAA Part 137 Agricultural Aircraft Operator</span>
                    </div>
                  )}
                  {operator.certHylio && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Hylio Certified Operator</span>
                    </div>
                  )}
                  {operator.ndaaCompliant && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>NDAA-compliant drone fleet</span>
                    </div>
                  )}
                  {operator.iso9001 && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>ISO 9001 certified</span>
                    </div>
                  )}
                  {operator.acceptsUsdaFunds && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>Accepts USDA grant-funded projects</span>
                    </div>
                  )}
                  {operator.emergencyService && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>Emergency response available</span>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Coverage — US states */}
            {coveredStates.length > 0 && (
              <section className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="font-bold text-gray-900 mb-4 text-lg">
                  States served ({coveredStates.length})
                </h2>
                <div className="flex flex-wrap gap-2">
                  {coveredStates.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/judete/${c.slug}`}
                      className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs border border-gray-200 rounded hover:border-green-300 hover:text-green-700 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ─── Sidebar ─────────────────────────────────────── */}
          <aside className="space-y-4">
            {/* Price */}
            <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                Estimated rates
              </h3>
              <div className="text-3xl font-bold text-green-700 mb-1">
                {operator.priceMinUsd
                  ? formatPrice(operator.priceMinUsd, operator.priceMaxUsd)
                  : <span className="text-xl">Contact for quote</span>}
              </div>
              {!operator.priceMinUsd && (
                <p className="text-sm text-gray-500">Rates vary by crop, field size, and location</p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                * Chemical/product not included unless noted
              </p>
            </div>

            {/* Response time + service details */}
            {(operator.responseTimeHours || operator.languagesSpoken?.length || operator.paymentMethods?.length) && (
              <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
                {operator.responseTimeHours && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Response time
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {operator.responseTimeHours < 1
                        ? '< 1 hour'
                        : `~ ${operator.responseTimeHours} hours`}
                    </div>
                  </div>
                )}
                {operator.languagesSpoken && operator.languagesSpoken.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                      <Languages className="w-3.5 h-3.5" /> Languages spoken
                    </div>
                    <div className="text-sm text-gray-900">
                      {operator.languagesSpoken.map((l) => LANGUAGE_LABELS[l] || l).join(', ')}
                    </div>
                  </div>
                )}
                {operator.paymentMethods && operator.paymentMethods.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5" /> Payment accepted
                    </div>
                    <div className="text-sm text-gray-900">
                      {operator.paymentMethods.map((p) => PAYMENT_LABELS[p] || p).join(', ')}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Contact */}
            <div id="contact" className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                <Users className="w-4 h-4" /> Contact
              </h3>
              <div className="space-y-2">
                <OperatorContactLinks
                  operatorSlug={operator.slug}
                  phone={operator.phone}
                  email={operator.email}
                />
                {operator.website && (
                  <ExternalLink
                    href={operator.website}
                    operatorSlug={operator.slug}
                    source="operator_profile"
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-700 transition-colors"
                  >
                    <Globe className="w-4 h-4 text-green-600" />
                    Official website
                  </ExternalLink>
                )}
              </div>

              {/* Social media */}
              {(operator.facebook || operator.instagram || operator.linkedin || operator.youtube || operator.tiktok) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Social media</div>
                  <div className="flex flex-wrap gap-2">
                    {operator.facebook && (
                      <ExternalLink
                        href={operator.facebook}
                        operatorSlug={operator.slug}
                        source="operator_profile_facebook"
                        withUtm={false}
                        className="w-9 h-9 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
                        aria-label="Facebook"
                      >
                        <FacebookIcon className="w-4 h-4" />
                      </ExternalLink>
                    )}
                    {operator.instagram && (
                      <ExternalLink
                        href={operator.instagram}
                        operatorSlug={operator.slug}
                        source="operator_profile_instagram"
                        withUtm={false}
                        className="w-9 h-9 bg-pink-50 text-pink-700 rounded-lg flex items-center justify-center hover:bg-pink-100 transition-colors"
                        aria-label="Instagram"
                      >
                        <InstagramIcon className="w-4 h-4" />
                      </ExternalLink>
                    )}
                    {operator.linkedin && (
                      <ExternalLink
                        href={operator.linkedin}
                        operatorSlug={operator.slug}
                        source="operator_profile_linkedin"
                        withUtm={false}
                        className="w-9 h-9 bg-sky-50 text-sky-700 rounded-lg flex items-center justify-center hover:bg-sky-100 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </ExternalLink>
                    )}
                    {operator.youtube && (
                      <ExternalLink
                        href={operator.youtube}
                        operatorSlug={operator.slug}
                        source="operator_profile_youtube"
                        withUtm={false}
                        className="w-9 h-9 bg-red-50 text-red-700 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors"
                        aria-label="YouTube"
                      >
                        <YoutubeIcon className="w-4 h-4" />
                      </ExternalLink>
                    )}
                    {operator.tiktok && (
                      <ExternalLink
                        href={operator.tiktok}
                        operatorSlug={operator.slug}
                        source="operator_profile_tiktok"
                        withUtm={false}
                        className="w-9 h-9 bg-gray-100 text-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                        aria-label="TikTok"
                      >
                        <TiktokIcon className="w-4 h-4" />
                      </ExternalLink>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/adauga-operator"
              className="block w-full text-center px-4 py-2.5 border border-green-700 text-green-700 rounded-xl text-sm font-medium hover:bg-green-50 transition-colors"
            >
              Update this listing
            </Link>
            <Link
              href="/adauga-operator"
              className="block w-full text-center px-4 py-2.5 bg-yellow-50 border border-yellow-300 text-yellow-900 rounded-xl text-sm font-medium hover:bg-yellow-100 transition-colors"
            >
              List your business free
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
