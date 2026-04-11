import Link from 'next/link';
import { MapPin, Users } from 'lucide-react';
import { County } from '@/data/types';
import { CROP_NAME_MAP } from '@/data/crops';
import { getCountyOperatorCount } from '@/data/counties';

interface CountyCardProps {
  county: County;
}

export default function CountyCard({ county }: CountyCardProps) {
  const operatorCount = getCountyOperatorCount(county.slug);
  const crops = county.mainCrops.slice(0, 3).map((c) => CROP_NAME_MAP[c] || c);

  return (
    <Link
      href={`/judete/${county.slug}`}
      className="block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-green-300 transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
            {county.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <MapPin className="w-3 h-3" />
            <span>{county.region}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Users className="w-3.5 h-3.5 text-green-600" />
          <span className="font-semibold text-green-700">{operatorCount}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-2">
        {crops.map((crop) => (
          <span key={crop} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
            {crop}
          </span>
        ))}
      </div>

      {operatorCount === 0 && (
        <p className="text-xs text-amber-600 mt-2">Fii primul operator din acest județ</p>
      )}
    </Link>
  );
}
