'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { counties } from '@/data/counties';
import { crops } from '@/data/crops';
import { drones } from '@/data/drone-model';
import { SERVICE_LABELS } from '@/data/types';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || '';

type Mode = 'new' | 'update';

interface Props {
  /** When the page is visited via /list-your-business?claim=<slug>, the
   *  server component looks up the operator and passes these in so the
   *  form can default to update mode and tag the submission accordingly.
   *  Without these, the form behaves exactly like the original new-listing
   *  flow. */
  claimSlug?: string;
  claimName?: string;
}

export default function SubmitForm({ claimSlug, claimName }: Props) {
  const [mode, setMode] = useState<Mode>(claimSlug ? 'update' : 'new');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const business = (data.company as string) || claimName || '(unspecified)';
    const isUpdate = mode === 'update';

    // Tag the submission so the inbox can route updates separately and
    // never silently turn an update into a duplicate listing.
    const payload: Record<string, unknown> = {
      ...data,
      _form_type: isUpdate ? 'listing-update' : 'list-your-business',
      _subject: isUpdate
        ? `UPDATE: ${business}${claimSlug ? ` [${claimSlug}]` : ''}`
        : `NEW LISTING: ${business}`,
      submission_intent: isUpdate ? 'update' : 'new',
      existing_slug: isUpdate ? claimSlug ?? '' : '',
      page_url: typeof window !== 'undefined' ? window.location.href : '',
    };

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please email us directly at contact@agdronedirectory.com');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    const isUpdate = mode === 'update';
    return (
      <div className="text-center py-10">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {isUpdate ? 'Update received!' : 'Submission received!'}
        </h3>
        <p className="text-gray-600">
          {isUpdate
            ? `We have your changes${claimName ? ` for ${claimName}` : ''}. Eugen will merge them into your existing listing within 48 hours. No new duplicate listing will be created.`
            : "We've got your information. Our team will review and publish your profile within 48 hours."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Mode toggle. Always visible so an existing operator who lands here
          via Google can self-select "update" instead of accidentally
          submitting a new listing. */}
      <fieldset className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <legend className="px-2 text-sm font-semibold text-gray-700">
          What are you submitting?
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <label
            className={
              'flex items-start gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors ' +
              (mode === 'new'
                ? 'bg-white border-green-600 ring-1 ring-green-200'
                : 'bg-white border-gray-200 hover:border-green-300')
            }
          >
            <input
              type="radio"
              name="mode"
              value="new"
              checked={mode === 'new'}
              onChange={() => setMode('new')}
              className="mt-0.5"
            />
            <span className="text-sm">
              <span className="block font-semibold text-gray-900">List a new business</span>
              <span className="block text-xs text-gray-500 mt-0.5">
                My operation is not in the directory yet.
              </span>
            </span>
          </label>
          <label
            className={
              'flex items-start gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors ' +
              (mode === 'update'
                ? 'bg-white border-green-600 ring-1 ring-green-200'
                : 'bg-white border-gray-200 hover:border-green-300')
            }
          >
            <input
              type="radio"
              name="mode"
              value="update"
              checked={mode === 'update'}
              onChange={() => setMode('update')}
              className="mt-0.5"
            />
            <span className="text-sm">
              <span className="block font-semibold text-gray-900">Claim or update an existing listing</span>
              <span className="block text-xs text-gray-500 mt-0.5">
                My operation is already on the directory.
              </span>
            </span>
          </label>
        </div>

        {mode === 'update' && (
          <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-amber-900 leading-relaxed">
              {claimName ? (
                <>
                  Updating <strong>{claimName}</strong>. Submitting this form will not create a duplicate listing. Eugen will merge your changes into the existing entry within 48 hours.
                </>
              ) : (
                <>
                  Heads up: only fill in the fields you want changed. If your business is already on the directory, please paste your existing profile URL in the &ldquo;Additional information&rdquo; box so we merge into the right entry instead of creating a duplicate.
                </>
              )}
            </div>
          </div>
        )}
      </fieldset>

      {/* Carry the existing slug so the inbox sees exactly which entry to
          update. Hidden but still part of the form payload. */}
      {mode === 'update' && claimSlug && (
        <input type="hidden" name="existing_slug_visible" value={claimSlug} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Business name *
          </label>
          <input
            name="company"
            type="text"
            required
            defaultValue={mode === 'update' ? claimName ?? '' : ''}
            placeholder="e.g. AgriForce Drone Services LLC"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            City *
          </label>
          <input
            name="city"
            type="text"
            required
            placeholder="e.g. Ames, IA"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="primary-state" className="block text-sm font-medium text-gray-700 mb-1.5">
          Primary state *
        </label>
        <select
          id="primary-state"
          name="county"
          required
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="">Select state...</option>
          {counties.map((c) => (
            <option key={c.slug} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Additional states served
        </label>
        <textarea
          name="counties_covered"
          rows={2}
          placeholder="e.g. Iowa, Illinois, Missouri, Nebraska..."
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Services offered *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(SERVICE_LABELS).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                name={`service_${key}`}
                value={key}
                className="w-4 h-4 text-green-600 rounded"
              />
              <span className="text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Crops served
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {crops.map((c) => (
            <label key={c.slug} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                name={`crop_${c.slug}`}
                value={c.slug}
                className="w-4 h-4 text-green-600 rounded"
              />
              <span className="text-gray-700">{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Drone models operated
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {drones.map((d) => (
            <label key={d.slug} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                name={`drone_${d.slug}`}
                value={d.slug}
                className="w-4 h-4 text-green-600 rounded"
              />
              <span className="text-gray-700">{d.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Average rate ($/acre)
          </label>
          <input
            name="price_avg"
            type="text"
            placeholder="e.g. $14/acre"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Website
          </label>
          <input
            name="website"
            type="url"
            placeholder="https://example.com"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone *
          </label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="+1 (555) 000-0000"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email *
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="contact@yourcompany.com"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {mode === 'update' ? 'What needs to change?' : 'Additional information'}
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder={
            mode === 'update'
              ? 'List the fields you want updated (states served, services, drones, contact info, certifications, etc.)'
              : 'Short description, acres treated, certifications (FAA Part 107/137), etc.'
          }
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          'Submitting...'
        ) : mode === 'update' ? (
          <>
            <Send className="w-4 h-4" />
            Submit update request
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit listing request
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        {mode === 'update'
          ? 'Updates merge into your existing profile. We will not create a duplicate listing.'
          : 'By submitting this form, you agree to have your information published in the US Ag Drone Directory. Listings are free and permanent.'}
      </p>
    </form>
  );
}
