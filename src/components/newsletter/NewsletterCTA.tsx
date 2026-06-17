import Image from 'next/image';
import { Mail, Users, CheckCircle } from 'lucide-react';
import { AUTHOR } from '@/data/author';
import SubscriberCount from './SubscriberCount';
import BeehiivEmbed from './BeehiivEmbed';

/**
 * Tank Mix by AgDrone — the site-wide newsletter call to action.
 *
 * Rendered prominently in the homepage flow and at the bottom of every other
 * page (above the footer) via GlobalNewsletter. The branded chrome (title,
 * byline, copy, subscriber count) lives here; the actual email capture is the
 * beehiiv embed.
 */
export default function NewsletterCTA() {
  return (
    <section
      aria-label="Subscribe to Tank Mix, the AgDrone newsletter"
      className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-100"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl border border-green-200 bg-white shadow-sm">
          {/* Header band */}
          <div className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-800 px-6 sm:px-10 pt-9 pb-8 text-white">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.12] pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 18% 28%, white 1px, transparent 1.5px), radial-gradient(circle at 82% 72%, white 1px, transparent 1.5px)',
                backgroundSize: '34px 34px',
              }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/10 text-green-100 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 mb-5">
                <Mail className="w-3.5 h-3.5 text-yellow-400" />
                The weekly newsletter
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
                Tank Mix <span className="text-yellow-400">by AgDrone</span>
              </h2>

              <div className="mt-3 flex items-center gap-2.5">
                <span className="relative inline-flex w-7 h-7 rounded-full overflow-hidden border border-white/30 bg-white/10">
                  <Image
                    src="/images/eugen-author.jpg"
                    alt={`${AUTHOR.firstName}, ${AUTHOR.jobTitle}`}
                    width={28}
                    height={28}
                    className="object-cover"
                  />
                </span>
                <span className="text-sm text-green-200">
                  Written by{' '}
                  <span className="font-semibold text-white">{AUTHOR.fullName}</span>,{' '}
                  {AUTHOR.jobTitle}
                </span>
              </div>

              <p className="mt-5 text-green-50 text-base sm:text-lg leading-relaxed max-w-2xl">
                The weekly read for spray drone operators. What changed in the
                rules, the rates, the weather and the gear. Over 700 operators
                read it.
              </p>
            </div>
          </div>

          {/* Body: subscriber count + signup */}
          <div className="px-6 sm:px-10 py-8">
            <div className="inline-flex items-center gap-2 mb-5 rounded-full bg-green-50 border border-green-100 px-3 py-1.5">
              <Users className="w-4 h-4 text-green-700" />
              <p className="text-sm text-gray-700">
                <span className="font-bold text-green-800">
                  <SubscriberCount />
                </span>{' '}
                operators subscribed
              </p>
            </div>

            <BeehiivEmbed />

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-green-600" /> Free, every
                week
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-green-600" /> No spam,
                unsubscribe anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
