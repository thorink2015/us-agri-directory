import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'US Ag Drone Directory',
    short_name: 'AgDroneDir',
    description: 'The largest directory of agricultural drone operators in the United States.',
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
