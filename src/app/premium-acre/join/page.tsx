import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Target,
  MapPin,
  Download,
} from 'lucide-react';
import { AUTHOR, SITE } from '@/data/author';
import { PREMIUM_ACRE_STRIPE_URL } from '@/lib/premium-acre';
import FAQAccordion from '@/components/ui/FAQAccordion';

// ─── Founding-member sales page for The Premium Acre (paid newsletter) ───────
// Light, minimal, conversion-focused. Sits below the /premium-acre founding
// list signup: that page collects emails, this one takes the payment.
// Positioning per Eugen (2026-07-17): hero in his own newsletter-ad voice
// (product name as the title, his "I do the digging, you get the playbook"
// line), money-making content center stage (playbooks, real numbers, how to
// land the work, getting found online), and the binder documents demoted to
// a welcome bonus instead of a headline section. Facts trace to Eugen's
// deliverable and his in-chat inputs; founding price $17/month.
// Uses the same distraction-free chrome as /premium-acre (minimal header +
// footer, no newsletter band, no exit popup).
// -----------------------------------------------------------------------------

// ─── Stripe checkout ─────────────────────────────────────────────────────────
// Every CTA on this page points here. Set NEXT_PUBLIC_STRIPE_PREMIUM_ACRE_URL
// in the Netlify dashboard to the live Stripe Payment Link
// (https://buy.stripe.com/...) and redeploy. Until it is set, the buttons
// scroll to the founder-deal card so nobody gets bounced off the page.
const STRIPE_CHECKOUT_URL = PREMIUM_ACRE_STRIPE_URL || '#founder-deal';

const PAGE_PATH = '/premium-acre/join';
const DESCRIPTION =
  'A paid newsletter for ag drone operators: the work that pays more, who is buying and how to land it. Get the founding rate, $17 a month.';

export const metadata: Metadata = {
  title: 'Join The Premium Acre: $17 Founding Member Rate',
  description: DESCRIPTION,
  keywords: [
    'the premium acre',
    'paid newsletter for drone operators',
    'ag drone operator membership',
    'premium acre founding member',
  ],
  alternates: { canonical: PAGE_PATH },
  authors: [{ name: AUTHOR.fullName, url: `${SITE.domain}/about` }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'US Ag Drone Directory',
    title: 'Join The Premium Acre: $17 Founding Member Rate',
    description: DESCRIPTION,
    url: `${SITE.domain}${PAGE_PATH}`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'The Premium Acre newsletter founding membership',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join The Premium Acre: $17 Founding Member Rate',
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },
};

// ─── Page content (facts from Eugen's deliverable + his in-chat copy) ────────

const PLAYBOOK_CARDS = [
  {
    icon: TrendingUp,
    title: 'The work that pays more',
    body: 'Every issue digs up work that beats $13 corn acres. Solar sites pay vegetation contractors five figures a year and almost nobody flies herbicide on them. Lanes like that, priced to the dollar.',
  },
  {
    icon: BarChart3,
    title: 'The numbers, researched for you',
    body: 'Who pays, what it pays and what to quote. Real rates and real numbers you can price a job on, not guesses.',
  },
  {
    icon: Target,
    title: 'How to land it',
    body: 'Who to call and the words to use. Plus how to get your business found online, so farmers come looking for you.',
  },
];

const SAMPLE_GUIDES = [
  {
    href: '/guides/premium-acre-playbook',
    title: 'The Premium Acre Playbook',
    tagline: 'The spray work that never joined the price war',
  },
  {
    href: '/guides/the-solar-book',
    title: 'The Solar Book',
    tagline: 'How to win solar farm vegetation work',
  },
  {
    href: '/guides/fields-only-a-drone-can-fly',
    title: 'Fields Only a Drone Can Fly',
    tagline: 'How to find them and what to charge',
  },
];

const FOUNDER_PERKS = [
  {
    lead: '$17 a month for as long as you stay.',
    rest: 'New members after founding pay $49.',
  },
  {
    lead: 'First look at farmer leads in your area, starting day one.',
    rest: 'When an inquiry comes through the directory, members see it first. A perk, not a quota.',
  },
  {
    lead: 'I go through your operation myself.',
    rest: 'How farmers find you, what an inspector would see, and the three fixes I would make first, sent to you.',
  },
  {
    lead: 'Bonus: five ready-to-use documents the day you join.',
    rest: 'Quoting sheet, spray record, service agreement, subcontract agreement and a compliance checklist.',
  },
  {
    lead: 'A vote on what I dig into next.',
    rest: 'You help pick the work and the numbers each issue breaks down.',
  },
];

const FAQS = [
  {
    question: 'How do I know the issues are worth paying for?',
    answer:
      'Read the free field guides first. The Premium Acre Playbook, The Solar Book and Fields Only a Drone Can Fly cost nothing, and every paid issue has to clear that bar and go further. If the guides do not earn your $17, keep your money.',
  },
  {
    question: 'Is the founding rate really locked?',
    answer:
      'Yes. Founding members pay $17 a month for as long as they stay, and the price never goes up. After the founding spots close, the regular rate is $49 a month.',
  },
  {
    question: 'What do I get the day I join?',
    answer:
      'A welcome bonus of five ready-to-use documents (quoting sheet, spray record, service agreement, subcontract agreement and a compliance checklist), first look at farmer leads in your area, and the next issue on the 1st or the 15th.',
  },
  {
    question: 'How is this different from Tank Mix?',
    answer:
      'Tank Mix is the free weekly that shows you the industry. The Premium Acre is the paid playbook: the work that pays more, the numbers researched for you and how to land it.',
  },
  {
    question: 'I spray part time. Is this for me?',
    answer:
      'Yes. Better-paying work matters most when your flying hours are limited, and the documents and leads work the same for a part-time operator as for a full-time outfit.',
  },
  {
    question: 'How does payment work?',
    answer:
      'Checkout runs through Stripe with any major card. Membership is month to month, and you can cancel anytime.',
  },
  {
    question: 'When do issues arrive?',
    answer: 'Twice a month, on the 1st and the 15th, straight to your inbox.',
  },
];

// ─── Small shared pieces ─────────────────────────────────────────────────────

function CtaButton({ invert = false }: { invert?: boolean }) {
  return (
    <a
      href={STRIPE_CHECKOUT_URL}
      className={
        invert
          ? 'inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-900 font-semibold rounded-full hover:bg-green-50 transition-colors text-base'
          : 'inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-800 text-white font-semibold rounded-full hover:bg-green-900 transition-colors text-base shadow-sm'
      }
    >
      Lock in my $17 rate
      <ArrowRight className="w-4 h-4" />
    </a>
  );
}

function CtaNote({ light = false }: { light?: boolean }) {
  return (
    <p className={`text-xs mt-4 ${light ? 'text-green-200' : 'text-gray-500'}`}>
      Stripe checkout. Month to month, cancel anytime. Your $17 never goes up
      while you stay.
    </p>
  );
}

export default function PremiumAcreJoinPage() {
  const absoluteUrl = `${SITE.domain}${PAGE_PATH}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'The Premium Acre',
        item: `${SITE.domain}/premium-acre`,
      },
      { '@type': 'ListItem', position: 3, name: 'Join', item: absoluteUrl },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Join The Premium Acre',
    description: DESCRIPTION,
    url: absoluteUrl,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE.domain}/#website` },
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-white">
        {/* ─── Hero (Eugen's own newsletter-ad voice) ─────────────────────── */}
        <section className="bg-gradient-to-b from-stone-50 to-white px-4 pt-16 pb-20 sm:pt-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-green-800 bg-green-50 border border-green-200 px-3 py-1 rounded-full mb-6">
              <Mail className="w-3.5 h-3.5" />
              Now open
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-6 text-balance">
              The Premium Acre
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
              A paid newsletter for ag drone operators. I do the digging, you
              get the playbook: the work that pays more, who&apos;s buying and
              how to land it. Founding members lock the lowest price.
            </p>

            <div className="mb-2 flex items-baseline justify-center gap-2">
              <span className="font-serif text-5xl font-bold text-gray-900">
                $17
              </span>
              <span className="text-sm text-gray-500">
                /month, locked while you stay
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              After the founding spots close, the price is $49 a month.
            </p>

            <CtaButton />
            <CtaNote />

            {/* Issue mock: a light stacked-cards graphic of the newsletter */}
            <div className="relative max-w-md mx-auto mt-16" aria-hidden="true">
              <div className="absolute inset-x-8 -top-3 h-full bg-white border border-stone-200 rounded-2xl -rotate-2" />
              <div className="absolute inset-x-4 -top-1.5 h-full bg-white border border-stone-200 rounded-2xl rotate-1" />
              <div className="relative bg-white border border-stone-200 rounded-2xl shadow-xl shadow-stone-200/70 p-6 text-left">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-600" />
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-900">
                      The Premium Acre
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    Twice a month · the 1st and the 15th
                  </span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-800" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        The work that pays more
                      </p>
                      <p className="text-xs text-gray-500">
                        Priced to the dollar
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-green-800" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Who&apos;s buying
                      </p>
                      <p className="text-xs text-gray-500">
                        Real rates, real numbers
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                      <Target className="w-4 h-4 text-green-800" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        How to land it
                      </p>
                      <p className="text-xs text-gray-500">
                        Who to call and what to say
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── The playbook (money first) ────────────────────────────────── */}
        <section className="px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                I do the digging. You get the playbook.
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Twice a month, on the 1st and the 15th. Built to make you money,
                not to fill your inbox.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {PLAYBOOK_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="bg-white border border-stone-200 rounded-2xl p-7"
                >
                  <span className="inline-flex w-11 h-11 rounded-full bg-green-50 items-center justify-center mb-5">
                    <card.icon className="w-5 h-5 text-green-800" />
                  </span>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 max-w-xl mx-auto mt-8">
              Also inside: the compliance traps that cost real fines (one
              missing spray-record line is $750) and ready-to-use documents
              when a job calls for them.
            </p>

            <div className="max-w-2xl mx-auto mt-10 bg-stone-50 border border-stone-200 rounded-2xl p-6 flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-800" />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  First look at farmer leads
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  When a farmer inquiry from your area comes through
                  agdronedirectory.com, members see it first. A founding perk,
                  not a quota: leads land when farmers ask.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Sneak peek: the free field guides ─────────────────────────── */}
        <section className="px-4 py-20 bg-stone-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                See the work before you pay
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                These three field guides are free Tank Mix downloads. Every paid
                issue clears this bar, then goes further: exact numbers, what to
                say and the document to close the work. If the guides are not
                worth your time, keep your $17.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {SAMPLE_GUIDES.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group bg-white border border-stone-200 rounded-2xl p-6 hover:border-green-300 hover:shadow-md transition-all"
                >
                  <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-green-700 mb-3">
                    <Download className="w-3.5 h-3.5" />
                    Free PDF
                  </p>
                  <h3 className="font-serif text-lg font-bold text-gray-900 leading-snug mb-1">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{guide.tagline}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-800">
                    Read it free
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Who writes this ───────────────────────────────────────────── */}
        <section className="px-4 py-20">
          <div className="max-w-xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight text-center mb-8">
              Who writes this
            </h2>
            <div className="flex items-start gap-5">
              <Image
                src="/images/eugen-author.jpg"
                alt="AgDrone Eugen"
                width={112}
                height={112}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <p className="text-base text-gray-600 leading-relaxed">
                I am <strong className="text-gray-900">AgDrone Eugen</strong>. I
                edit Tank Mix, the free weekly that goes out to 1,000+ drone
                operators across the country, and I run agdronedirectory.com,
                the national operator directory. The Premium Acre is where I put
                the numbers and the playbooks that do not fit a free email.
              </p>
            </div>
          </div>
        </section>

        {/* ─── The founding offer ────────────────────────────────────────── */}
        <section id="founder-deal" className="px-4 pb-20 scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-green-900 to-green-950 rounded-3xl px-6 py-12 sm:px-12 text-center text-white">
              <p className="inline-block text-[11px] font-semibold uppercase tracking-widest text-green-300 border border-green-700 rounded-full px-4 py-1.5 mb-6">
                Founding member offer
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                The founding member deal
              </h2>
              <p className="text-green-200 mb-8">
                When the founding spots close, the rate is $49 a month and the
                $17 lock is gone for good.
              </p>

              <div className="flex items-baseline justify-center gap-2 mb-8">
                <span className="font-serif text-6xl font-bold text-white">
                  $17
                </span>
                <span className="text-sm text-green-200">
                  /month, locked while you stay
                </span>
              </div>

              <ul className="max-w-md mx-auto text-left space-y-4 mb-10">
                {FOUNDER_PERKS.map((perk) => (
                  <li key={perk.lead} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-100 leading-relaxed">
                      <strong className="text-white font-semibold">
                        {perk.lead}
                      </strong>{' '}
                      {perk.rest}
                    </p>
                  </li>
                ))}
              </ul>

              <CtaButton invert />
              <CtaNote light />
            </div>
          </div>
        </section>

        {/* ─── FAQ ───────────────────────────────────────────────────────── */}
        <section className="px-4 pb-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-gray-900 tracking-tight text-center mb-8">
              Questions, answered
            </h2>
            <FAQAccordion faqs={FAQS} />
          </div>
        </section>

        {/* ─── Final CTA ─────────────────────────────────────────────────── */}
        <section className="px-4 pb-24">
          <div className="max-w-2xl mx-auto text-center border-t border-stone-200 pt-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Lock in the founding rate
            </h2>
            <p className="text-gray-600 mb-8">
              $17 a month while you stay. $49 after the founding spots close.
              Read the free guides first if you want proof.
            </p>
            <CtaButton />
            <CtaNote />
            <p className="text-xs text-gray-400 mt-10">
              The Premium Acre · A Tank Mix publication ·{' '}
              <Link href="/" className="hover:text-gray-600 transition-colors">
                agdronedirectory.com
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
