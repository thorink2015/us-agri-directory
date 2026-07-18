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
import {
  PREMIUM_ACRE_STRIPE_FOUNDING_URL,
  PREMIUM_ACRE_STRIPE_REGULAR_URL,
} from '@/lib/premium-acre';
import FAQAccordion from '@/components/ui/FAQAccordion';

// ─── Shared sales page for The Premium Acre (paid newsletter) ────────────────
// Rendered by BOTH sales routes so their shared content can never drift:
//   /premium-acre/join       founding variant, $17/mo (indexable)
//   /premium-acre/subscribe  regular variant, $49/mo (noindex, Tank Mix wave)
// The `variant` prop switches everything price- and offer-related (Stripe
// link, CTA label and note, hero lock line, price block, offer card, perks,
// FAQ set, closer); the regular variant contains no founding language at
// all. Positioning per Eugen (2026-07-17): hero in his own newsletter-ad
// voice, money-making content center stage, the five documents demoted to a
// welcome-bonus perk, no day-one delivery promises (docs not produced yet),
// guides framed modestly as the work that inspired this.
// -----------------------------------------------------------------------------

export type PremiumAcreVariant = 'founding' | 'regular';

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

const FOUNDING_PERKS = [
  {
    lead: '$17 a month for as long as you stay.',
    rest: 'New members after founding pay $49.',
  },
  {
    lead: 'First look at farmer leads in your area.',
    rest: 'When an inquiry comes through the directory, members see it first. A perk, not a quota.',
  },
  {
    lead: 'I go through your operation myself.',
    rest: 'How farmers find you, what an inspector would see, and the three fixes I would make first, sent to you.',
  },
  {
    lead: 'Bonus: five ready-to-use documents.',
    rest: 'Quoting sheet, spray record, service agreement, subcontract agreement and a compliance checklist.',
  },
  {
    lead: 'A vote on what I dig into next.',
    rest: 'You help pick the work and the numbers each issue breaks down.',
  },
];

const REGULAR_PERKS = [
  {
    lead: 'Two issues a month, on the 1st and the 15th.',
    rest: 'The work that pays more, the numbers researched for you and how to land it.',
  },
  {
    lead: 'First look at farmer leads in your area.',
    rest: 'When an inquiry comes through the directory, members see it first. A perk, not a quota.',
  },
  {
    lead: 'Bonus: five ready-to-use documents.',
    rest: 'Quoting sheet, spray record, service agreement, subcontract agreement and a compliance checklist.',
  },
  {
    lead: 'A vote on what I dig into next.',
    rest: 'You help pick the work and the numbers each issue breaks down.',
  },
];

const FAQ_WORTH_IT = {
  question: 'How do I know the issues are worth paying for?',
  answer:
    'Start with the free field guides: The Premium Acre Playbook, The Solar Book and Fields Only a Drone Can Fly. They are the kind of digging The Premium Acre is built on. And membership is month to month, so you can cancel anytime.',
};

const FAQ_TAIL = [
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

const FOUNDING_FAQS = [
  FAQ_WORTH_IT,
  {
    question: 'Is the founding rate really locked?',
    answer:
      'Yes. Founding members pay $17 a month for as long as they stay, and the price never goes up. After the founding spots close, the regular rate is $49 a month.',
  },
  {
    question: 'What happens after I join?',
    answer:
      'You lock in the $17 founding rate. The newsletter kicks off in the next week or so, and founding members get the first issue plus the welcome bonuses: five ready-to-use documents (quoting sheet, spray record, service agreement, subcontract agreement and a compliance checklist) and first look at farmer leads in your area.',
  },
  ...FAQ_TAIL,
];

const REGULAR_FAQS = [
  FAQ_WORTH_IT,
  {
    question: 'What happens after I join?',
    answer:
      'You get the next issue on the 1st or the 15th, plus the welcome bonuses: five ready-to-use documents (quoting sheet, spray record, service agreement, subcontract agreement and a compliance checklist) and first look at farmer leads in your area.',
  },
  ...FAQ_TAIL,
];

// ─── Variant configuration (everything price- and offer-related) ─────────────

const VARIANTS = {
  founding: {
    stripeUrl: PREMIUM_ACRE_STRIPE_FOUNDING_URL,
    ctaLabel: 'Lock in my $17 rate',
    ctaNote:
      'Stripe checkout. Month to month, cancel anytime. Your $17 never goes up while you stay.',
    heroLockLine: true,
    price: '$17',
    priceCaption: '/month, locked while you stay',
    afterPriceLine: 'After the founding spots close, the price is $49 a month.',
    leadsCalloutTag: 'A founding perk, not a quota: leads land when farmers ask.',
    offerBadge: 'Founding member offer',
    offerTitle: 'The founding member deal',
    offerSub:
      'When the founding spots close, the rate is $49 a month and the $17 lock is gone for good.',
    perks: FOUNDING_PERKS,
    faqs: FOUNDING_FAQS,
    closerTitle: 'Lock in the founding rate',
    closerBody: '$17 a month while you stay. $49 after the founding spots close.',
  },
  regular: {
    stripeUrl: PREMIUM_ACRE_STRIPE_REGULAR_URL,
    ctaLabel: 'Join for $49 a month',
    ctaNote: 'Stripe checkout. Month to month, cancel anytime.',
    heroLockLine: false,
    price: '$49',
    priceCaption: '/month',
    afterPriceLine: null,
    leadsCalloutTag: 'A member perk, not a quota: leads land when farmers ask.',
    offerBadge: 'Membership',
    offerTitle: 'The membership',
    offerSub: 'Every issue, the leads and the bonuses. Month to month.',
    perks: REGULAR_PERKS,
    faqs: REGULAR_FAQS,
    closerTitle: 'Join The Premium Acre',
    closerBody: '$49 a month. Month to month, cancel anytime.',
  },
} as const;

// ─── Small shared pieces ─────────────────────────────────────────────────────

function CtaButton({
  href,
  label,
  invert = false,
}: {
  href: string;
  label: string;
  invert?: boolean;
}) {
  return (
    <a
      href={href}
      className={
        invert
          ? 'inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-900 font-semibold rounded-full hover:bg-green-50 transition-colors text-base'
          : 'inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-800 text-white font-semibold rounded-full hover:bg-green-900 transition-colors text-base shadow-sm'
      }
    >
      {label}
      <ArrowRight className="w-4 h-4" />
    </a>
  );
}

function CtaNote({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <p className={`text-xs mt-4 ${light ? 'text-green-200' : 'text-gray-500'}`}>
      {text}
    </p>
  );
}

interface SalesPageProps {
  /** Route path, e.g. '/premium-acre/join' */
  pagePath: string;
  /** WebPage schema name, e.g. 'Join The Premium Acre' */
  pageName: string;
  /** Meta description of the route (reused in the WebPage schema) */
  description: string;
  /** Last breadcrumb item label, e.g. 'Join' */
  breadcrumbLeafName: string;
  /** Pricing/offer variant: founding ($17) or regular ($49) */
  variant: PremiumAcreVariant;
}

export default function PremiumAcreSalesPage({
  pagePath,
  pageName,
  description,
  breadcrumbLeafName,
  variant,
}: SalesPageProps) {
  const cfg = VARIANTS[variant];
  const absoluteUrl = `${SITE.domain}${pagePath}`;

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
      {
        '@type': 'ListItem',
        position: 3,
        name: breadcrumbLeafName,
        item: absoluteUrl,
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageName,
    description,
    url: absoluteUrl,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE.domain}/#website` },
    author: { '@id': AUTHOR.personId },
    publisher: { '@id': AUTHOR.organizationId },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cfg.faqs.map((faq) => ({
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
              how to land it.
              {cfg.heroLockLine && ' Founding members lock the lowest price.'}
            </p>

            <div className="mb-2 flex items-baseline justify-center gap-2">
              <span className="font-serif text-5xl font-bold text-gray-900">
                {cfg.price}
              </span>
              <span className="text-sm text-gray-500">{cfg.priceCaption}</span>
            </div>
            {cfg.afterPriceLine && (
              <p className="text-sm text-gray-500 mb-6">{cfg.afterPriceLine}</p>
            )}

            <div className={cfg.afterPriceLine ? '' : 'mt-6'}>
              <CtaButton href={cfg.stripeUrl} label={cfg.ctaLabel} />
              <CtaNote text={cfg.ctaNote} />
            </div>

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
                  agdronedirectory.com, members see it first.{' '}
                  {cfg.leadsCalloutTag}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── The free field guides ─────────────────────────────────────── */}
        <section className="px-4 py-20 bg-stone-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                The guides that inspired this
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Three free field guides from Tank Mix. Work like this is what
                grew into The Premium Acre.
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

        {/* ─── The offer ─────────────────────────────────────────────────── */}
        <section id="founder-deal" className="px-4 pb-20 scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-green-900 to-green-950 rounded-3xl px-6 py-12 sm:px-12 text-center text-white">
              <p className="inline-block text-[11px] font-semibold uppercase tracking-widest text-green-300 border border-green-700 rounded-full px-4 py-1.5 mb-6">
                {cfg.offerBadge}
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                {cfg.offerTitle}
              </h2>
              <p className="text-green-200 mb-8">{cfg.offerSub}</p>

              <div className="flex items-baseline justify-center gap-2 mb-8">
                <span className="font-serif text-6xl font-bold text-white">
                  {cfg.price}
                </span>
                <span className="text-sm text-green-200">
                  {cfg.priceCaption}
                </span>
              </div>

              <ul className="max-w-md mx-auto text-left space-y-4 mb-10">
                {cfg.perks.map((perk) => (
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

              <CtaButton href={cfg.stripeUrl} label={cfg.ctaLabel} invert />
              <CtaNote text={cfg.ctaNote} light />
            </div>
          </div>
        </section>

        {/* ─── FAQ ───────────────────────────────────────────────────────── */}
        <section className="px-4 pb-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-gray-900 tracking-tight text-center mb-8">
              Questions, answered
            </h2>
            <FAQAccordion faqs={[...cfg.faqs]} />
          </div>
        </section>

        {/* ─── Final CTA ─────────────────────────────────────────────────── */}
        <section className="px-4 pb-24">
          <div className="max-w-2xl mx-auto text-center border-t border-stone-200 pt-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              {cfg.closerTitle}
            </h2>
            <p className="text-gray-600 mb-8">{cfg.closerBody}</p>
            <CtaButton href={cfg.stripeUrl} label={cfg.ctaLabel} />
            <CtaNote text={cfg.ctaNote} />
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
