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
  /**
   * When provided, the wizard becomes an operator-first quote request:
   * step 1 (location) is skipped, the operator's primary state is used
   * automatically, headings reframe around the targeted operator, the
   * contact step gains a "broaden to 2 more operators" toggle, and the
   * submission is tagged `_form_type=operator-quote-request` with the
   * target operator slug + name. Used on operator profile pages.
   */
  operatorContext?: {
    slug: string;
    name: string;
    stateSlug: string;
    stateName: string;
  };
}

interface FormState {
  zip: string;
  stateSlug: string;
  crop: CropValue | '';
  acreage: AcreageValue | '';
  acresExact: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
  addNote: boolean;
  notes: string;
  /** Operator-first mode only: also broaden to 2 more operators in state. Default ON. */
  broaden: boolean;
}

const INITIAL: FormState = {
  zip: '',
  stateSlug: '',
  crop: '',
  acreage: '',
  acresExact: '',
  name: '',
  phone: '',
  email: '',
  consent: false,
  addNote: false,
  notes: '',
  broaden: true,
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
  operatorContext,
}: Props) {
  const formId = useId();
  // Operator-first mode: skip step 1 entirely. Total visible steps = 3.
  const isOperatorMode = !!operatorContext;
  const initialStep: Step = isOperatorMode ? 2 : 1;
  const totalSteps = isOperatorMode ? 3 : 4;
  const visibleStepNumber = (s: Step) => (isOperatorMode ? s - 1 : s);

  const [step, setStep] = useState<Step>(initialStep);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usePicker, setUsePicker] = useState(!!defaultStateSlug);
  const [form, setForm] = useState<FormState>({
    ...INITIAL,
    stateSlug: operatorContext?.stateSlug ?? defaultStateSlug ?? '',
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
  const exactAcresNum = form.acresExact ? parseInt(form.acresExact, 10) : NaN;
  const exactAcresValid = Number.isFinite(exactAcresNum) && exactAcresNum >= 1 && exactAcresNum <= 100000;
  const canAdvanceStep3 = !!form.acreage || exactAcresValid;
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
    // In operator mode, step 1 (location) is skipped entirely; clamp to 2.
    const minStep: Step = isOperatorMode ? 2 : 1;
    setStep((s) => (s > minStep ? ((s - 1) as Step) : s));
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
    // If the farmer entered an exact acreage, derive the bucket so the inbox
    // gets both fields populated. Otherwise use whatever tile was clicked.
    const exactNum = form.acresExact ? parseInt(form.acresExact, 10) : NaN;
    const acresExact = Number.isFinite(exactNum) && exactNum >= 1 ? exactNum : null;
    const derivedBucket: AcreageValue | '' =
      acresExact !== null
        ? acresExact < 40
          ? 'under-40'
          : acresExact < 160
            ? '40-160'
            : acresExact < 500
              ? '160-500'
              : acresExact < 2000
                ? '500-2000'
                : '2000-plus'
        : form.acreage;
    const acreageLabel =
      ACREAGE_RANGES.find((a) => a.value === derivedBucket)?.label ?? derivedBucket;
    const stateName = selectedState?.name ?? '';
    const trimmedNotes = form.addNote ? form.notes.trim().slice(0, 1000) : '';
    const acresForSubject = acresExact !== null ? `${acresExact} ac` : acreageLabel;

    const operatorSubjectPrefix = isOperatorMode
      ? `Quote request for ${operatorContext!.name}`
      : `New lead`;
    const operatorAreaPart = isOperatorMode
      ? operatorContext!.stateName
      : stateName || form.zip || 'unknown area';

    const payload: Record<string, unknown> = {
      _form_type: isOperatorMode ? 'operator-quote-request' : 'get-matched-lead',
      _subject: `${operatorSubjectPrefix}: ${operatorAreaPart}, ${cropLabel || 'crop TBC'}, ${acresForSubject}`,
      source,
      zip: form.zip.trim(),
      state_slug: isOperatorMode ? operatorContext!.stateSlug : form.stateSlug,
      state_name: isOperatorMode ? operatorContext!.stateName : stateName,
      crop: cropLabel,
      crop_slug: form.crop,
      acreage: acreageLabel,
      acreage_value: derivedBucket,
      acres_exact: acresExact,
      notes: trimmedNotes,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      tcpa_consent: form.consent,
      tcpa_consent_text: TCPA_CONSENT_TEXT,
      tcpa_consent_at: new Date().toISOString(),
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      // Operator-first mode metadata. Empty/null when not in operator mode.
      target_operator_slug: operatorContext?.slug ?? '',
      target_operator_name: operatorContext?.name ?? '',
      also_match_others: isOperatorMode ? form.broaden : null,
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
          {isOperatorMode
            ? form.broaden
              ? `Got it. ${operatorContext!.name} plus up to 2 more operators in ${operatorContext!.stateName} will reach out.`
              : `Got it. ${operatorContext!.name} will reach out shortly.`
            : `Got it. Matching you with up to 3 FAA Part 137 operators${selectedState ? ` in ${selectedState.name}` : ''}.`}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
          Expect a text within 24 hours. Often faster during spray season.
          If nothing arrives, reply to the confirmation email and we will chase it.
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
            Step {visibleStepNumber(step)} of {totalSteps}
          </span>
          <span className="text-xs text-gray-500">Free, takes 60 seconds</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-700 transition-all duration-300"
            style={{ width: `${(visibleStepNumber(step) / totalSteps) * 100}%` }}
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
              'Drop your ZIP. We text you up to 3 verified Part 137 operators in 24 hours.'
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
            operatorName={operatorContext?.name}
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
            acresExact={form.acresExact}
            onPick={(v) => {
              update('acreage', v);
              update('acresExact', '');
              window.setTimeout(() => setStep(4), 120);
            }}
            onExact={(v) => {
              update('acresExact', v);
              if (v.length > 0) update('acreage', '');
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
            addNote={form.addNote}
            notes={form.notes}
            stateName={isOperatorMode ? operatorContext!.stateName : (selectedState?.name ?? '')}
            operatorContext={operatorContext}
            broaden={form.broaden}
            onName={(v) => update('name', v)}
            onPhone={(v) => update('phone', v)}
            onEmail={(v) => update('email', v)}
            onConsent={(v) => update('consent', v)}
            onAddNote={(v) => update('addNote', v)}
            onNotes={(v) => update('notes', v)}
            onBroaden={(v) => update('broaden', v)}
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
  operatorName,
  onPick,
}: {
  formId: string;
  crop: CropValue | '';
  operatorName?: string;
  onPick: (v: CropValue) => void;
}) {
  return (
    <div>
      <h3 id={`${formId}-h`} className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
        {operatorName
          ? `What are you asking ${operatorName} to treat?`
          : 'What are you treating?'}
      </h3>
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">
        {operatorName
          ? `${operatorName} can quote on each of these.`
          : 'We match you with operators who already spray this crop in your area.'}
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
  acresExact,
  onPick,
  onExact,
}: {
  formId: string;
  acreage: AcreageValue | '';
  acresExact: string;
  onPick: (v: AcreageValue) => void;
  onExact: (v: string) => void;
}) {
  const usingExact = acresExact.length > 0;
  const exactNum = acresExact ? parseInt(acresExact, 10) : NaN;
  const exactValid = Number.isFinite(exactNum) && exactNum >= 1 && exactNum <= 100000;
  return (
    <div>
      <h3 id={`${formId}-h`} className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
        How many acres are you treating?
      </h3>
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">
        Pick a range or type the exact number. Operators use this to size your quote.
      </p>

      {/* Exact-acres input (always visible, primary path for farmers who know the number) */}
      <label
        htmlFor={`${formId}-acres-exact`}
        className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide"
      >
        Exact acres (if you know it)
      </label>
      <div className="relative mb-4">
        <input
          id={`${formId}-acres-exact`}
          type="number"
          inputMode="numeric"
          min={1}
          max={100000}
          step={1}
          value={acresExact}
          onChange={(e) => onExact(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder="e.g. 320"
          className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
          acres
        </span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-500 uppercase tracking-wide">Or pick a range</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div role="radiogroup" aria-label="Acreage range" className="grid grid-cols-1 gap-2">
        {ACREAGE_RANGES.map((opt) => {
          const selected = !usingExact && acreage === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onPick(opt.value)}
              className={
                'flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-semibold transition-all ' +
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

      {usingExact && !exactValid && (
        <p className="mt-3 text-xs text-amber-700">
          Enter a whole number between 1 and 100,000.
        </p>
      )}
    </div>
  );
}

function Step4({
  formId,
  name,
  phone,
  email,
  consent,
  addNote,
  notes,
  stateName,
  operatorContext,
  broaden,
  onName,
  onPhone,
  onEmail,
  onConsent,
  onAddNote,
  onNotes,
  onBroaden,
  turnstileSlot,
}: {
  formId: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
  addNote: boolean;
  notes: string;
  stateName: string;
  operatorContext?: { slug: string; name: string; stateSlug: string; stateName: string };
  broaden: boolean;
  onName: (v: string) => void;
  onPhone: (v: string) => void;
  onEmail: (v: string) => void;
  onConsent: (v: boolean) => void;
  onAddNote: (v: boolean) => void;
  onNotes: (v: string) => void;
  onBroaden: (v: boolean) => void;
  turnstileSlot: React.ReactNode;
}) {
  const isOperatorMode = !!operatorContext;
  return (
    <div>
      <h3 id={`${formId}-h`} className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
        {isOperatorMode
          ? `Last step. How does ${operatorContext!.name} reach you?`
          : 'Last step. How do operators reach you?'}
      </h3>
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">
        {isOperatorMode
          ? `${operatorContext!.name} will text or call within 24 hours${broaden ? ` along with up to 2 more verified operators in ${operatorContext!.stateName}` : ''}.`
          : `We text your matches within 24 hours.${stateName ? ` Your info goes only to up to 3 operators in ${stateName}, never more.` : ' Your info goes only to up to 3 matched operators, never more.'}`}
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

        {/* Operator-mode only: optional broaden to 2 more operators in state */}
        {isOperatorMode && (
          <label className="flex items-start gap-2.5 px-3 py-3 bg-green-50 border border-green-200 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={broaden}
              onChange={(e) => onBroaden(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-green-700 border-gray-400 rounded focus:ring-green-500 flex-shrink-0"
            />
            <span className="text-sm leading-snug">
              <span className="block font-semibold text-green-900">
                Also send me 2 more quotes from verified operators in {operatorContext!.stateName}
              </span>
              <span className="block text-xs text-green-800/80 mt-0.5">
                Compare {operatorContext!.name}&apos;s quote against 2 nearby Part 137 operators. 3 max, never more.
              </span>
            </span>
          </label>
        )}

        {/* Optional note for the matched operators */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <label className="flex items-center gap-2 px-3 py-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={addNote}
              onChange={(e) => onAddNote(e.target.checked)}
              className="w-4 h-4 text-green-700 border-gray-400 rounded focus:ring-green-500"
            />
            <span className="text-sm font-semibold text-gray-800">
              Add a note for the operators
            </span>
            <span className="text-xs text-gray-400 font-normal">(optional)</span>
          </label>
          {addNote && (
            <div className="px-3 pb-3">
              <textarea
                id={`${formId}-notes`}
                value={notes}
                onChange={(e) => onNotes(e.target.value.slice(0, 1000))}
                rows={3}
                maxLength={1000}
                placeholder="Anything operators should know? Target spray window, product, field access, when you want to be called, etc."
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
              <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500">
                <span>Plain text. No links, no contact info needed here.</span>
                <span>{notes.length} / 1000</span>
              </div>
            </div>
          )}
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
