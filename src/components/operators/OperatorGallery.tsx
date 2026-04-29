import Image from 'next/image';
import type { GalleryImage } from '@/data/types';

interface Props {
  operatorName: string;
  images: GalleryImage[];
}

/**
 * Compact photo gallery for operator profiles. Renders up to 3 images in a
 * 3-column grid (stacks on mobile). Each image:
 *   - uses next/image so Netlify's image CDN serves AVIF/WebP at the right size
 *   - lazy-loads (loading="lazy")
 *   - reserves layout space via intrinsic width/height (zero CLS)
 *   - opens the full-resolution file in a new tab on click
 *
 * Server component — zero added client JS.
 */
export default function OperatorGallery({ operatorName, images }: Props) {
  if (!images || images.length === 0) return null;

  return (
    <section
      className="bg-white border border-gray-200 rounded-xl p-6"
      aria-label={`${operatorName} photo gallery`}
    >
      <h2 className="font-bold text-gray-900 mb-4 text-lg">Photos from the operator</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 list-none p-0 m-0">
        {images.map((img) => (
          <li key={img.src} className="relative">
            <a
              href={img.src}
              target="_blank"
              rel="noopener noreferrer"
              className="block group rounded-lg overflow-hidden border border-gray-200 hover:border-green-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
              aria-label={`Open full-size photo: ${img.alt}`}
            >
              <span className="block aspect-[3/4] bg-gray-50">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                  className="w-full h-full object-cover group-hover:opacity-95 transition-opacity"
                />
              </span>
            </a>
            {img.caption && (
              <p className="mt-1.5 text-[11px] text-gray-500 leading-snug">{img.caption}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
