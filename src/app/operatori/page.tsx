import { Metadata } from 'next';
import OperatoriClient from './OperatoriClient';
import { operators } from '@/data/operators';
import { counties } from '@/data/counties';

export const metadata: Metadata = {
  title: 'Toți Operatorii de Drone Agricole din România și Moldova',
  description:
    'Caută și filtrează toți operatorii de drone agricole din România și Moldova. Filtrare după județ, serviciu și tipul de cultură.',
  alternates: { canonical: '/operatori' },
  openGraph: {
    title: 'Toți Operatorii de Drone Agricole | TerraDron.ro',
    description: 'Director complet: 23 operatori verificați din România și Moldova. Filtrare după județ și serviciu.',
    url: 'https://terradron.ro/operatori',
  },
};

export default function OperatoriPage() {
  return <OperatoriClient operators={operators} counties={counties} />;
}
