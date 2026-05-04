// Shared option lists for the GetMatched lead wizard. Kept as pure data
// so server components can read them too (e.g. to pre-pick a state on a
// state page) without pulling the full client bundle.

export const ACREAGE_RANGES = [
  { value: 'under-40', label: 'Under 40 acres' },
  { value: '40-160', label: '40 to 160 acres' },
  { value: '160-500', label: '160 to 500 acres' },
  { value: '500-2000', label: '500 to 2,000 acres' },
  { value: '2000-plus', label: '2,000+ acres' },
] as const;

export const CROP_OPTIONS = [
  { value: 'corn', label: 'Corn', emoji: '🌽' },
  { value: 'soybeans', label: 'Soybeans', emoji: '🌱' },
  { value: 'cotton', label: 'Cotton', emoji: '🌾' },
  { value: 'specialty', label: 'Specialty', emoji: '🥬' },
  { value: 'orchard-vineyard', label: 'Orchard or vineyard', emoji: '🍇' },
  { value: 'pasture', label: 'Pasture', emoji: '🐄' },
  { value: 'other', label: 'Other', emoji: '🌿' },
] as const;

export type AcreageValue = (typeof ACREAGE_RANGES)[number]['value'];
export type CropValue = (typeof CROP_OPTIONS)[number]['value'];

// Plain-language reassurance shown above the TCPA checkbox.
// Voice rules: no em dashes, no banned words, plain blue-collar farmer.
export const REASSURANCE_LINE =
  '3 operators max, never more. Operators pay us, not you. We never sell your info.';

// Required TCPA consent text. Save the exact string with the submission so
// we have a verifiable record of what the user agreed to at submit time.
export const TCPA_CONSENT_TEXT =
  'I agree AgDroneDirectory and matched operators may call or text me about my request. Msg and data rates may apply. Reply STOP to opt out.';

// Pricing context shown on step 1 / step 4. Sourced from Iowa State 2026
// Custom Rate Survey ($12.50 per acre average) and the published
// $12 to $18 per acre row-crop range already used on the homepage FAQ.
export const PRICING_CONTEXT_LINE =
  'Typical row-crop application runs $12 to $18 per acre. Specialty and orchard work runs higher.';
