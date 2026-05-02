'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || '';

export default function HomepageNewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrored(false);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: 'Newsletter subscription (homepage)' }),
      });
      if (res.ok) {
        setSubscribed(true);
      } else {
        setErrored(true);
      }
    } catch {
      setErrored(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-12 bg-white border-t border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
            <Mail className="w-6 h-6 text-green-700" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg font-bold text-gray-900">Get drone spraying updates for your region</h2>
            <p className="text-sm text-gray-500 mt-1">Short monthly briefings. No spam. Unsubscribe anytime.</p>
          </div>
          {subscribed ? (
            <p className="text-sm text-green-700 font-semibold w-full sm:w-auto text-center sm:text-right">
              You&apos;re subscribed. Thank you!
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto"
            >
              <input type="hidden" name="_form_type" value="newsletter-homepage" />
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                placeholder="you@farm.com"
                className="flex-1 sm:w-64 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-green-700 text-white text-sm font-semibold rounded-xl hover:bg-green-800 transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {loading ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
        {errored && (
          <p className="text-xs text-red-600 mt-3 text-center sm:text-right">
            Something went wrong. Please try again, or email{' '}
            <a href="mailto:eugen@agdronedirectory.com" className="underline">
              eugen@agdronedirectory.com
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
