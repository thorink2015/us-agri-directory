import { Metadata } from 'next';
import { Download } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import MailtoLink from '@/components/ui/MailtoLink';
import { AUTHOR, SITE } from '@/data/author';

// ─── Tank Mix newsletter advertising terms ──────────────────────────────────
// A noindex legal landing page for advertisers who buy a placement in the
// Tank Mix newsletter. People reach it from a proposal, invoice or payment
// link, so it is intentionally noindex and kept out of the sitemap. All copy
// is Eugen's own deliverable (satisfies copy-source-of-truth). A branded PDF
// snapshot of the same terms lives at /public/tank-mix-advertising-terms.pdf
// (regenerate with headless Chromium if the copy changes).
// ----------------------------------------------------------------------------

const LAST_UPDATED = 'July 2026';
const LAST_MODIFIED_ISO = '2026-07-09';
const PDF_PATH = '/tank-mix-advertising-terms.pdf';
const PAGE_PATH = '/advertising-terms';

export const metadata: Metadata = {
  title: 'Advertising Terms | Tank Mix',
  description:
    'Terms for advertising, sponsorship and dedicated email placements in the Tank Mix newsletter from the US Ag Drone Directory.',
  alternates: { canonical: PAGE_PATH },
  robots: { index: false, follow: true },
};

export default function AdvertisingTermsPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Advertising Terms',
    url: `${SITE.domain}${PAGE_PATH}`,
    description:
      'Terms for advertising, sponsorship and dedicated email placements in the Tank Mix newsletter.',
    dateModified: LAST_MODIFIED_ISO,
    publisher: { '@id': AUTHOR.organizationId },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Advertising Terms',
        item: `${SITE.domain}${PAGE_PATH}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Advertising Terms' }]} />

        <p className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-2">
          Tank Mix newsletter
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Advertising Terms</h1>
        <p className="text-sm text-gray-500 mb-6">Last updated: {LAST_UPDATED}</p>

        <div className="mb-10">
          <a
            href={PDF_PATH}
            download="Tank-Mix-Advertising-Terms.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
          <p className="mt-2 text-xs text-gray-500">
            A copy of these terms for your records. No email required.
          </p>
        </div>

        <div className="space-y-6 text-gray-700">
          <p className="text-base leading-relaxed">
            These terms cover any advertising, sponsorship or dedicated email placement bought
            with Tank Mix.
          </p>
          <p className="leading-relaxed">
            When you approve a proposal or pay an invoice or payment link from us, you agree to
            these terms. If a signed proposal or insertion order says something different, that
            document wins.
          </p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">What you&apos;re buying</h2>
            <p className="leading-relaxed">
              You&apos;re buying the placements listed in your proposal or invoice. That means the
              specific sends, dates and positions we agreed on. We keep control of the newsletter
              itself, including layout, editorial and where your placement sits in the issue. We
              label sponsored content as sponsored so it&apos;s clear to readers, which also keeps
              us right with FTC rules.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Payment</h2>
            <p className="leading-relaxed">
              Payment is due as stated on your proposal or invoice. We hold your send dates once we
              get payment or a signed proposal. If payment is late, we can move or pause your
              placement until it clears. All prices are in US dollars.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Approving your copy</h2>
            <p className="leading-relaxed">
              You send us your creative and any tracking links at least five business days before
              the send date. We show you a proof before anything goes out. If you don&apos;t send
              changes in writing within three business days of getting the proof, we treat it as
              approved and schedule it. You&apos;re responsible for your own claims, links and
              creative being accurate and legal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Category exclusivity</h2>
            <p className="leading-relaxed">
              If your proposal includes category exclusivity, we won&apos;t run another advertiser
              in your category for the term listed. Exclusivity only covers what your proposal
              spells out. Anything outside that is open.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">What we promise</h2>
            <p className="leading-relaxed">
              We run every placement as agreed. Every dedicated send is guaranteed a minimum 50%
              open rate. If a send comes in under that, the next send is free. If a send fails on
              our end, we re-run it at no charge. We don&apos;t guarantee clicks, leads or sales.
              Any remedy is delivered as extra work or credit, not a cash refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Payments and changes</h2>
            <p className="leading-relaxed mb-3">
              Payments are due before work starts and are non-refundable if your plans change. What
              you paid stays yours as credit:
            </p>
            <ul className="space-y-3 mb-3">
              <li className="pl-4 border-l-2 border-green-200 leading-relaxed">
                <b className="text-gray-900">One-off send.</b> Payment holds your date. You can move
                the date once at no charge. Cancel and the amount becomes a credit toward a future
                placement, good for 12 months.
              </li>
              <li className="pl-4 border-l-2 border-green-200 leading-relaxed">
                <b className="text-gray-900">Multi-month sponsorship.</b> One payment, due before the
                start date. Cancel before the start and the full amount becomes a credit. Cancel
                mid-term and the months already run count as delivered. The rest becomes a credit,
                good for 12 months.
              </li>
            </ul>
            <p className="leading-relaxed">
              If we can&apos;t deliver a placement you paid for and can&apos;t make it good another
              way, we credit or return that portion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Limit on liability</h2>
            <p className="leading-relaxed">
              If something goes wrong, the most we&apos;re responsible for is the amount you paid for
              the placement involved. We&apos;re not responsible for indirect or knock-on losses like
              lost business or lost profit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Your brand and assets</h2>
            <p className="leading-relaxed">
              You give us permission to use the logos, images and copy you send us for your
              placement, for the length of the campaign. That permission ends when the campaign
              ends.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Which law applies</h2>
            <p className="leading-relaxed">
              These terms are governed by the laws of the State of Delaware, without regard to its
              conflict of law rules.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Changes</h2>
            <p className="leading-relaxed">
              We can update these terms. The version in place when you approve a proposal or pay is
              the one that applies to that buy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Questions</h2>
            <p className="leading-relaxed">
              Email{' '}
              <MailtoLink email={AUTHOR.publicEmail} className="text-green-700 hover:underline">
                {AUTHOR.publicEmail}
              </MailtoLink>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
