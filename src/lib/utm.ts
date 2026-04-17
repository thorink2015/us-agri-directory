export type UtmCampaign =
  | 'authority_link'
  | 'operator_profile'
  | 'drone_specs'
  | 'service_provider';

export function addUtm(url: string, campaign: UtmCampaign | string): string {
  if (!url) return url;
  if (/^(mailto:|tel:|javascript:|#|\/)/i.test(url)) return url;
  if (!/^https?:\/\//i.test(url)) return url;
  const separator = url.includes('?') ? '&' : '?';
  return (
    url +
    separator +
    'utm_source=agdronedirectory&utm_medium=referral&utm_campaign=' +
    campaign
  );
}

const AUTHORITY_DOMAINS = [
  'faa.gov',
  'usda.gov',
  'nrcs.usda.gov',
  'epa.gov',
  'regulations.gov',
  'govinfo.gov',
  'ecfr.gov',
  'cdpr.ca.gov',
  'calepa.ca.gov',
];

const DRONE_MFG_DOMAINS = [
  'dji.com',
  'ag.dji.com',
  'hyliosolutions.com',
  'hylio.com',
  'xagusa.com',
  'xag.com',
  'agerasrobotics.com',
  'pyka.co',
  'guardianagriculture.com',
  'rantizo.com',
];

export function inferCampaign(url: string): UtmCampaign {
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (host.endsWith('.edu')) return 'authority_link';
    if (AUTHORITY_DOMAINS.some((d) => host === d || host.endsWith('.' + d))) {
      return 'authority_link';
    }
    if (DRONE_MFG_DOMAINS.some((d) => host === d || host.endsWith('.' + d))) {
      return 'drone_specs';
    }
    return 'operator_profile';
  } catch {
    return 'operator_profile';
  }
}
