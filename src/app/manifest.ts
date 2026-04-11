import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TerraDron.ro: Director Drone Agricole',
    short_name: 'TerraDron',
    description: 'Directorul operatorilor de drone agricole din România și Moldova',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F9FA',
    theme_color: '#2D6A4F',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
