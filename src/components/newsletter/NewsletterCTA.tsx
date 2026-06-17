import { Mail } from 'lucide-react';
import BeehiivEmbed from './BeehiivEmbed';

/**
 * Tank Mix by AgDrone — the site-wide newsletter call to action.
 *
 * Rendered prominently in the homepage flow and at the bottom of every other
 * page (above the footer) via GlobalNewsletter. One green card throughout:
 * copy on the left, a defined signup panel (form + reassurance) on the right
 * on desktop, stacked on mobile.
 */
export default function NewsletterCTA() {
  return (
    <section
      aria-label="Subscribe to Tank Mix, the AgDrone newsletter"
      className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-100"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl border border-green-700/40 bg-gradient-to-br from-green-900 via-green-800 to-green-800 shadow-sm">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 16% 26%, white 1px, transparent 1.5px), radial-gradient(circle at 84% 74%, white 1px, transparent 1.5px)',
              backgroundSize: '34px 34px',
            }}
          />
          <div className="relative px-6 sm:px-10 py-10 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Copy */}
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-white/10 text-green-100 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 mb-5">
                  <Mail className="w-3.5 h-3.5 text-yellow-400" />
                  The weekly newsletter
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
                  Tank Mix <span className="text-yellow-400">by AgDrone</span>
                </h2>

                <p className="mt-4 text-green-50 text-base sm:text-lg leading-relaxed max-w-xl">
                  The weekly read for spray drone operators. What changed in the
                  rules, the rates, the weather and the gear. Over 700 operators
                  read it.
                </p>
              </div>

              {/* Signup panel */}
              <div className="w-full">
                <div className="rounded-2xl bg-black/15 ring-1 ring-white/10 p-5 sm:p-6">
                  <p className="text-sm font-semibold text-white mb-3">
                    Get the next issue, free
                  </p>
                  <BeehiivEmbed />
                  <p className="mt-3 text-xs text-green-200/90">
                    One email a week. No spam. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
