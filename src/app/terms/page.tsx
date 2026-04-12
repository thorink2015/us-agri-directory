import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Terms of Service | US Ag Drone Directory',
  description: 'Terms of Service for US Ag Drone Directory. Rules and conditions for using our directory.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Terms of Service' }]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: April 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of terms</h2>
          <p className="leading-relaxed">
            By accessing or using usagdronedirectory.com (&quot;the Site&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Site. We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. About the directory</h2>
          <p className="leading-relaxed">
            US Ag Drone Directory is an informational directory that lists agricultural drone service operators across the United States. We do not provide drone services ourselves, act as an agent for any operator, or guarantee the quality of any listed business. We are not a party to any transaction between farmers and operators.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Operator listings</h2>
          <p className="leading-relaxed mb-3">By submitting a listing, you represent and warrant that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are authorized to submit information on behalf of the listed business</li>
            <li>All submitted information is accurate and not misleading</li>
            <li>Your business holds all required federal and state licenses, including applicable FAA certifications (Part 107, Part 137) for the services you advertise</li>
            <li>You will notify us of material changes to your business information</li>
          </ul>
          <p className="leading-relaxed mt-3">
            We reserve the right to reject, edit, or remove any listing at our discretion, including listings that contain false information, violate applicable law, or are reported as fraudulent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. No endorsement</h2>
          <p className="leading-relaxed">
            Inclusion in this directory does not constitute an endorsement, certification, or recommendation by US Ag Drone Directory. We perform basic verification of submitted information but cannot guarantee the accuracy, reliability, or quality of any listed operator. Users should conduct their own due diligence before hiring any service provider.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Pricing information</h2>
          <p className="leading-relaxed">
            Price ranges displayed on this Site are estimates based on market research and operator-submitted data. Actual prices may vary significantly based on location, field conditions, crop type, and individual operator pricing. Always obtain a direct quote from the operator before hiring.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Intellectual property</h2>
          <p className="leading-relaxed">
            All content on this Site (text, design, code, layout) is the property of US Ag Drone Directory unless otherwise noted. You may not reproduce, distribute, or create derivative works from our content without prior written permission. Operator names, logos, and information remain the property of the respective businesses.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Limitation of liability</h2>
          <p className="leading-relaxed">
            To the fullest extent permitted by law, US Ag Drone Directory shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of this Site or any operator listed herein. This includes but is not limited to crop damage, financial loss, or personal injury resulting from drone services obtained through this directory.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Prohibited uses</h2>
          <p className="leading-relaxed mb-3">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Submit false, misleading, or fraudulent operator listings</li>
            <li>Scrape or harvest contact information for spam or unsolicited commercial purposes</li>
            <li>Use automated tools to access or index the Site in a way that degrades performance</li>
            <li>Attempt to gain unauthorized access to any part of the Site or its systems</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. External links</h2>
          <p className="leading-relaxed">
            This Site contains links to operator websites and third-party resources. We are not responsible for the content, accuracy, or practices of those external sites. Links do not imply endorsement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">10. Governing law</h2>
          <p className="leading-relaxed">
            These Terms are governed by the laws of the United States. Any disputes arising from use of this Site shall be resolved in accordance with applicable federal law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">11. Contact</h2>
          <p className="leading-relaxed">
            For questions about these Terms, contact us at:{' '}
            <a href="mailto:contact@usagdronedirectory.com" className="text-green-700 hover:underline">
              contact@usagdronedirectory.com
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
