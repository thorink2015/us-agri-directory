import { Metadata } from 'next';
import OperatoriClient from './OperatoriClient';
import { operators } from '@/data/operators';
import { counties } from '@/data/counties';

export const metadata: Metadata = {
  title: 'All Ag Drone Operators | US Agricultural Drone Directory',
  description:
    'Search and filter all verified agricultural drone operators in the US. Filter by state, service type, and crop to find the right operator for your fields.',
  alternates: { canonical: '/operators' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'All Ag Drone Operators | US Agricultural Drone Directory',
    description: 'Find verified drone spraying operators across all 50 states. Compare rates, equipment, and certifications.',
    url: 'https://agdronedirectory.com/operators',
    siteName: 'US Ag Drone Directory',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'All Ag Drone Operators',
      },
    ],
  },
};

export default function OperatorsPage() {
  return <OperatoriClient operators={operators} counties={counties} />;
}
