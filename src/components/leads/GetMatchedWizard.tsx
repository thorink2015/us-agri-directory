'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Loader2,
  ShieldCheck,
  Phone,
} from 'lucide-react';
import Script from 'next/script';
import { counties } from '@/data/counties';
import {
  ACREAGE_RANGES,
  CROP_OPTIONS,
  PRICING_CONTEXT_LINE,
  REASSURANCE_LINE,
  TCPA_CONSENT_TEXT,
  type AcreageValue,
  type CropValue,
} from './wizard-options';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || '';
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

type Step = 1 | 2 | 3 | 4;

interface Props {
  /** Pre-selected state slug (e.g. on a state page, pass the state). */
  defaultStateSlug?: string;
  /** Tracking source for the Formspree inbox (e.g. "homepage-hero", "state-iowa"). */
  source?: string;
  /** When provided, used as the form's initial step's heading override. */
  headingOverride?: string;
  /** Optional sub-heading shown under the heading on step 1. */
  subheadingOverride?: string;
  /** Compact mode tightens padding for in-card embeds (vs. modal). */
  compact?: boolean;
  /** Called after a successful submit. Modal wrapper uses this to keep focus / auto-close. */
  onSubmitted?: () => void;
}

interface FormState {
  zip: string;
  stateSlug: string;
  crop: CropValue | '';
  acreage: AcreageValue | '';
  name: string;
  phone: string;
  email: string;
  consent: boolean;
}

const INITIAL: FormState = {
  zip: '',
  stateSlug: '',
  crop: '',
  acreage: '',
  name: '',
  phone: '',
  email: '',
  consent: false,
};

/**
 * GetMatchedWizard. 4-step lead capture used across the site. See
 * `_memory/code-patterns.md` for placement strategy.
 */
export default function GetMatchedWizard({
  defaultStateSlug,
  source = 'unknown',
  headingOverride,
  subheadingOverride,
  compact = false,
  onSubmitted,
}: Props) {
  const formId = useId();
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usePicker, setUsePicker] = useState(!!defaultStateSlug);
  const [form, setForm] = useState<FormState>({
    ...INITIAL,
    stateSlug: defaultStateSlug ?? '',
  });
  const turnstileTokenRef = useRef<string>('');
  const turnstileWidgetRef = useRef<HTMLDivElement>(null);
  const turnstileRenderedRef = useRef(false);

  const selectedState = useMemo(
    () => counties.find((c) => c.slug === form.stateSlug) ?? null,
    [form.stateSlug],
  );

  const canAdvanceStep1 = form.zip.trim().length >= 5 || !!selectedState;
  const canAdvanceStep2 = !!form.crop;
  const canAdvanceStep3 = !!form.acreage;
  const canSubmit =
    !!form.phone.trim() &&
    form.consent &&
    !loading &&
    (TURNSTILE_SITE_KEY ? !!turnstileTokenRef.current : true);

  // Render Turnstile when on step 4 and key is configured.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    if (step !== 4) return;
    if (turnstileRenderedRef.current) return;
    if (typeof window === 'undefined') return;
    const w = window as unknown as {
      turnstile?: {
        render: (
          el: HTMLElement,
          options: {
            sitekey: string;
            callback: (token: string) => void;
            'expired-callback'?: () => void;
            'error-callback'?: () => void;
            theme?: 'light' | 'dark' | 'auto';
            size?: 'normal' | 'flexible' | 'compact';
            appearance?: 'always' | 'execute' | 'interaction-only';
          },
        ) => string;
      };
    };
    if (!w.turnstile || !turnstileWidgetRef.current) return;
    w.turnstile.render(turnstileWidgetRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token) => {
        turnstileTokenRef.current = token;
      },
      'expired-callback': () => {
        turnstileTokenRef.current = '';
      },
      'error-callback': () => {
        turnstileTokenRef.current = '';
      },
      theme: 'light',
      appearance: 'interaction-only',
    });
    turnstileRenderedRef.current = true;
  }, [step]);

  function next() {
    setError('');
    if (step === 1 && !canAdvanceStep1) return;
    if (step === 2 && !canAdvanceStep2) return;
    if (step === 3 && !canAdvanceStep3) return;
    setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
  }

  function back() {
    setError('');
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError('');

    // Honeypot: any value here means a bot filled the hidden field.
    const fd = new FormData(e.currentTarget);
    const honeypot = (fd.get('company_website') as string) || '';
    if (honeypot.trim()) {
      // Pretend success so bots don't iterate.
      setSubmitted(true);
      setLoading(false);
      onSubmitted?.();
      return;
    }

    const cropLabel = CROP_OPTIONS.find((c) => c.value === form.crop)?.label ?? form.crop;
    const acreageLabel =
      ACREAGE_RANGES.find((a) => a.value === form.acreage)?.label ?? form.acreage;
    const stateName = selectedState?.name ?? '';

    const payload: Record<string, unknown> = {
      _form_type: 'get-matched-lead',
      _subject: `New lead: ${stateName || form.zip || 'unknown area'}, ${cropLabel || 'crop TBC'}`,
      source,
      zip: form.zip.trim(),
      state_slug: form.stateSlug,
      state_name: stateName,
      crop: cropLabel,
      crop_slug: form.crop,
      acreage: acreageLabel,
      acreage_value: form.acreage,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      tcpa_consent: form.consent,
      tcpa_consent_text: TCPA_CONSENT_TEXT,
      tcpa_consent_at: new Date().toISOString(),
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    };
    if (TURNSTILE_SITE_KEY && turnstileTokenRef.current) {
      payload['cf-turnstile-response'] = turnstileTokenRef.current;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
        onSubmitted?.();
      } else {
        setError('Something went wrong. Please call us at the number on the contact page.');
      }
    } catch {
      setError('Network error. Please try again or call us.');
    } finally {
      setLoading(false);
    }
  }

  const padding = compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8';

  if (submitted) {
    return (
      <div
        className={`bg-white rounded-2xl border border-green-200 ${padding} text-center`}
        role="status"
        aria-live="polite"
      >
        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-6 h-6 text-green-700" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Got it. We are matching you with up to 3 operators
          {selectedState ? ` in ${selectedState.name}` : ''}.
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
          You will get a text within 24 hours, often faster during spray season.
          If you do not hear back, reply to the confirmation email or call us.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
          <Link
            href="/pricing"
            className="text-green-700 font-medium hover:underline"
          >
            See typical $/acre rates
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/operators"
            className="text-green-700 font-medium hover:underline"
          >
            Browse all operators
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm ${padding}`}>
      {TURNSTILE_SITE_KEY && step === 4 && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
      )}

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-green-700">
            Step {step} of 4
          </span>
          <span className="text-xs text-gray-500">Free, takes 60 seconds</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-700 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
            aria-hidden="true"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-labelledby={`${formId}-h`}>
        {/* Honeypot. Bots fill it, humans never see it. */}
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] top-[-9999px] w-px h-px opacity-0"
          defaultValue=""
        />

        {step === 1 && (
          <Step1
            formId={formId}
            heading={headingOverride ?? 'Where are your fields?'}
            subheading={
              subheadingOverride ??
              'Tell us your ZIP code and we will match you with up to 3 verified operators in your area within 24 hours.'
            }
            zip={form.zip}
            stateSlug={form.stateSlug}
            usePicker={usePicker}
            onZip={(v) => update('zip', v)}
            onStateSlug={(v) => update('stateSlug', v)}
            onTogglePicker={() => setUsePicker((p) => !p)}
          />
        )}

        {step === 2 && (
          <Step2
            formId={formId}
            crop={form.crop}
            onPick={(v) => {
              update('crop', v);
              // auto-advance. The tile click is the answer.
              window.setTimeout(() => setStep(3), 120);
            }}
          />
        )}

        {step === 3 && (
          <Step3
            formId={formId}
            acreage={form.acreage}
            onPick={(v) => {
              update('acreage', v);
              window.setTimeout(() => setStep(4), 120);
            }}
          />
        )}

        {step === 4 && (
          <Step4
            formId={formId}
            name={form.name}
            phone={form.phone}
            email={form.email}
            consent={form.consent}
            stateName={selectedState?.name ?? ''}
            onName={(v) => update('name', v)}
            onPhone={(v) => update('phone', v)}
            onEmail={(v) => update('email', v)}
            onConsent={(v) => update('consent', v)}
            turnstileSlot={
              TURNSTILE_SITE_KEY ? (
                <div ref={turnstileWidgetRef} className="my-3" />
              ) : null
            }
          />
        )}

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* Nav buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <span aria-hidden="true" />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={next}
              disabled={
                (step === 1 && !canAdvanceStep1) ||
                (step === 2 && !canAdvanceStep2) ||
                (step === 3 && !canAdvanceStep3)
              }
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-xl bg-green-700 text-white hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-bold rounded-xl bg-green-700 text-white hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4" /> Get my 3 matches
                </>
              )}
            </button>
          )}
        </div>

        {/* Footer reassurance. Visible on every step. */}
        <div className="pt-3 mt-2 border-t border-gray-100 flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-green-700 flex-shrink-0 mt-0.5" />
          <span>{REASSURANCE_LINE}</span>
        </div>
      </form>
    </div>
  );
}

/* ─────────────────────────────── Step components ─────────────────────────────── */

function Step1({
  formId,
  heading,
  subheading,
  zip,
  stateSlug,
  usePicker,
  onZip,
  onStateSlug,
  onTogglePicker,
}: {
  formId: string;
  heading: string;
  subheading: string;
  zip: string;
  stateSlug: string;
  usePicker: boolean;
  onZip: (v: string) => void;
  onStateSlug: (v: string) => void;
  onTogglePicker: () => void;
}) {
  return (
    <div>
      <h3 id={`${formId}-h`} className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
        {heading}
      </h3>
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">{subheading}</p>

      {usePicker ? (
        <>
          <label
            htmlFor={`${formId}-state`}
            className="block text-sm font-semibold text-gray-800 mb-1.5"
          >
            Your state
          </label>
          <select
            id={`${formId}-state`}
            value={stateSlug}
            onChange={(e) => onStateSlug(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="">Pick your state</option>
            {counties.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onTogglePicker}
            className="mt-3 text-sm text-green-700 font-medium hover:underline"
          >
            Or enter ZIP code instead
          </button>
        </>
      ) : (
        <>
          <label
            htmlFor={`${formId}-zip`}
            className="block text-sm font-semibold text-gray-800 mb-1.5"
          >
            ZIP code
          </label>
          <input
            id={`${formId}-zip`}
            inputMode="numeric"
            autoComplete="postal-code"
            pattern="[0-9]{5}"
            maxLength={5}
            value={zip}
            onChange={(e) => onZip(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="50010"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={onTogglePicker}
            className="mt-3 text-sm text-green-700 font-medium hover:underline"
          >
            Don&apos;t know your ZIP? Pick your state instead
          </button>
        </>
      )}

      <p className="mt-5 text-xs text-gray-500 leading-relaxed">
        {PRICING_CONTEXT_LINE}
      </p>
    </div>
  );
}

function Step2({
  formId,
  crop,
  onPick,
}: {
  formId: string;
  crop: CropValue | '';
  onPick: (v: CropValue) => void;
}) {
  return (
    <div>
      <h3 id={`${formId}-h`} className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
        What&apos;s your main crop?
      </h3>
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">
        We will match you with operators who already work this crop in your area.
      </p>

      <div
        role="radiogroup"
        aria-label="Crop"
        className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
      >
        {CROP_OPTIONS.map((opt) => {
          const selected = crop === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onPick(opt.value)}
              className={
                'flex flex-col items-center justify-center gap-1 px-3 py-4 rounded-xl border text-sm font-semibold transition-all ' +
                (selected
                  ? 'border-green-700 bg-green-50 text-green-900 ring-2 ring-green-200'
                  : 'border-gray-200 bg-white text-gray-800 hover:border-green-400 hover:bg-green-50')
              }
            >
              <span aria-hidden="true" className="text-2xl leading-none">
                {opt.emoji}
              </span>
              <span className="leading-tight text-center">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step3({
  formId,
  acreage,
  onPick,
}: {
  formId: string;
  acreage: AcreageValue | '';
  onPick: (v: AcreageValue) => void;
}) {
  return (
    <div>
      <h3 id={`${formId}-h`} className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
        About how many acres?
      </h3>
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">
        A rough range is fine. Operators use this to size their quote.
      </p>

      <div role="radiogroup" aria-label="Acreage range" className="grid grid-cols-1 gap-2">
        {ACREAGE_RANGES.map((opt) => {
          const selected = acreage === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onPick(opt.value)}
              className={
                'flex items-center justify-between px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all ' +
                (selected
                  ? 'border-green-700 bg-green-50 text-green-900 ring-2 ring-green-200'
                  : 'border-gray-200 bg-white text-gray-800 hover:border-green-400 hover:bg-green-50')
              }
            >
              <span>{opt.label}</span>
              {selected && <CheckCircle className="w-4 h-4 text-green-700" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step4({
  formId,
  name,
  phone,
  email,
  consent,
  stateName,
  onName,
  onPhone,
  onEmail,
  onConsent,
  turnstileSlot,
}: {
  formId: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
  stateName: string;
  onName: (v: string) => void;
  onPhone: (v: string) => void;
  onEmail: (v: string) => void;
  onConsent: (v: boolean) => void;
  turnstileSlot: React.ReactNode;
}) {
  return (
    <div>
      <h3 id={`${formId}-h`} className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
        How should the operators reach you?
      </h3>
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">
        We will text your match list within 24 hours. Most farmers prefer text.
        {stateName ? ` We will only share your info with up to 3 operators in ${stateName}.` : ''}
      </p>

      <div className="space-y-3.5">
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="block text-sm font-semibold text-gray-800 mb-1.5"
          >
            Your name <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id={`${formId}-name`}
            value={name}
            onChange={(e) => onName(e.target.value)}
            autoComplete="name"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="First and last"
          />
        </div>
        <div>
          <label
            htmlFor={`${formId}-phone`}
            className="block text-sm font-semibold text-gray-800 mb-1.5"
          >
            Phone <span className="text-gray-500 font-normal">(operators will text you quotes)</span>
          </label>
          <input
            id={`${formId}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => onPhone(e.target.value)}
            placeholder="(555) 123-4567"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label
            htmlFor={`${formId}-email`}
            className="block text-sm font-semibold text-gray-800 mb-1.5"
          >
            Email <span className="text-gray-400 font-normal">(optional, for confirmation)</span>
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => onEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-xs text-gray-700 leading-relaxed">
          <p className="mb-2">
            By submitting, you agree we will share your name, email, and phone with up to 3 ag drone operators we match to your request. You will also receive a confirmation email. Unsubscribe any time.
            See our{' '}
            <Link href="/privacy" className="text-green-700 underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" className="text-green-700 underline">
              Terms
            </Link>
            .
          </p>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => onConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-green-700 border-gray-400 rounded focus:ring-green-500 flex-shrink-0"
            />
            <span>{TCPA_CONSENT_TEXT}</span>
          </label>
        </div>

        {turnstileSlot}
      </div>
    </div>
  );
}
