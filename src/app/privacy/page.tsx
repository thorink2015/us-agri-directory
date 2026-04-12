import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy | US Ag Drone Directory',
  description: 'Privacy Policy for US Ag Drone Directory. How we collect, use, and protect your information.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: April 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Who we are</h2>
          <p className="leading-relaxed">
            US Ag Drone Directory (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website at usagdronedirectory.com. We provide a free directory connecting farmers with agricultural drone service operators across the United States.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information we collect</h2>
          <p className="leading-relaxed mb-3">We collect information in two ways:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Information you provide:</strong> When you submit a listing via our operator registration form, we collect your business name, contact details (phone, email, website), location, and service information. This information is used to create your public directory listing.</li>
            <li><strong>Information collected automatically:</strong> When you visit our website, we collect standard analytics data through Google Analytics 4 (GA4), including pages visited, time on site, and general geographic location (country/region level). We do not collect personally identifiable information through analytics.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. How we use your information</h2>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>To create and maintain your operator listing in our public directory</li>
            <li>To respond to inquiries you send us</li>
            <li>To improve the directory and user experience using aggregated analytics data</li>
            <li>We do not sell, rent, or share your personal information with third parties for marketing purposes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Public listings</h2>
          <p className="leading-relaxed">
            Information submitted for operator listings (business name, city/state, phone, email, website, services, and description) is published publicly on this website. By submitting a listing, you consent to this public display. If you wish to update or remove your listing, contact us at contact@usagdronedirectory.com.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Cookies and tracking</h2>
          <p className="leading-relaxed">
            We use Google Analytics 4 to understand how visitors use our site. GA4 uses cookies to collect anonymized usage data. You can opt out of GA4 tracking by using the Google Analytics Opt-out Browser Add-on or by enabling &quot;Do Not Track&quot; in your browser. We do not use advertising cookies or sell data to ad networks.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Third-party links</h2>
          <p className="leading-relaxed">
            Our directory includes links to operator websites. We are not responsible for the privacy practices of those external sites. We recommend reviewing the privacy policy of any website you visit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Data retention</h2>
          <p className="leading-relaxed">
            Operator listing information is retained as long as the listing is active. Analytics data is retained per Google Analytics default settings (26 months). Contact form submissions are retained for up to 12 months.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Your rights</h2>
          <p className="leading-relaxed">
            You have the right to request access to, correction of, or deletion of your personal information that we hold. To make such a request, email us at contact@usagdronedirectory.com. We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Children&apos;s privacy</h2>
          <p className="leading-relaxed">
            This website is not directed at children under the age of 13. We do not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">10. Changes to this policy</h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy periodically. The &quot;Last updated&quot; date at the top of this page will reflect any changes. Continued use of the site after updates constitutes acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">11. Contact</h2>
          <p className="leading-relaxed">
            For privacy-related questions or requests, contact us at:{' '}
            <a href="mailto:contact@usagdronedirectory.com" className="text-green-700 hover:underline">
              contact@usagdronedirectory.com
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
