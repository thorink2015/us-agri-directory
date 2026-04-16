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
    title: 'All Ag Drone Operators | US Agricultural Drone Directory',
    description: 'Find verified drone spraying operators across all 50 states. Compare rates, equipment, and certifications.',
    url: 'https://agdronedirectory.com/operators',
  },
};

export default function OperatorsPage() {
  return <OperatoriClient operators={operators} counties={counties} />;
}
