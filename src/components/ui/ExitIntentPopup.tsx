'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X, Send, CheckCircle } from 'lucide-react';
import { counties } from '@/data/counties';
import { crops } from '@/data/crops';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || '';
const SESSION_FLAG = 'exit_intent_shown';
const MOBILE_DELAY_MS = 45_000;
const EXCLUDED_PATHS = ['/privacy', '/terms', '/contact'];

export default function ExitIntentPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const armedRef = useRef(false);

  const isExcluded = EXCLUDED_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  useEffect(() => {
    if (isExcluded) return;
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(SESSION_FLAG)) return;

    armedRef.current = true;

    const trigger = () => {
      if (!armedRef.current) return;
      armedRef.current = false;
      sessionStorage.setItem(SESSION_FLAG, '1');
      setOpen(true);
    };

    const isTouch = window.matchMedia('(hover: none)').matches || window.innerWidth < 768;

    let timerId: ReturnType<typeof setTimeout> | null = null;
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      if (e.clientY > 0) return;
      trigger();
    };

    if (isTouch) {
      timerId = setTimeout(trigger, MOBILE_DELAY_MS);
    } else {
      document.addEventListener('mouseout', onMouseOut);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [isExcluded, pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => setOpen(false), 3000);
    return () => clearTimeout(t);
  }, [submitted]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: 'Exit intent lead' }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please email contact@agdronedirectory.com directly.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (!open || isExcluded) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl p-6 sm:p-7">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 id="exit-intent-title" className="text-lg font-bold text-gray-900 mb-1">
              Thanks!
            </h3>
            <p className="text-sm text-gray-600">
              We will email your matches within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <h3
              id="exit-intent-title"
              className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 pr-6"
            >
              Need a drone operator for your fields?
            </h3>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Tell us your state and crop. We will match you with 3 verified operators within 24 hours. Free, no obligation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="hidden" name="_form_type" value="exit-intent-lead" />

              <div>
                <label htmlFor="exit-email" className="sr-only">Email</label>
                <input
                  id="exit-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email *"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="exit-state" className="sr-only">State</label>
                  <select
                    id="exit-state"
                    name="state"
                    required
                    defaultValue=""
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="" disabled>State *</option>
                    {counties.map((c) => (
                      <option key={c.slug} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="exit-crop" className="sr-only">Crop</label>
                  <select
                    id="exit-crop"
                    name="crop"
                    required
                    defaultValue=""
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="" disabled>Crop *</option>
                    {crops.map((c) => (
                      <option key={c.slug} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="exit-acres" className="sr-only">Acres</label>
                <input
                  id="exit-acres"
                  name="acres"
                  type="number"
                  min={0}
                  placeholder="Acres (optional)"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Sending…' : 'Get My Matches'}
              </button>

              <p className="text-[11px] text-gray-500 text-center leading-snug">
                No spam. We share your info only with the 3 operators we match you with.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
