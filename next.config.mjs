/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
      // Simple page renames
      { source: '/preturi-pulverizare-drona', destination: '/pricing', permanent: true },
      { source: '/despre', destination: '/about', permanent: true },
      { source: '/adauga-operator', destination: '/list-your-business', permanent: true },

      // Tools hub + sub-routes
      { source: '/unelte', destination: '/tools', permanent: true },
      { source: '/unelte/calculator-pret-pulverizare', destination: '/tools/spray-cost-calculator', permanent: true },
      { source: '/unelte/calculator-hectare', destination: '/tools/acreage-converter', permanent: true },
      { source: '/unelte/comparator-drone', destination: '/tools/drone-comparison', permanent: true },
      { source: '/unelte/calendar-tratamente', destination: '/tools/treatment-calendar', permanent: true },

      // Guides hub + individual guide slugs
      { source: '/ghid', destination: '/guides', permanent: true },
      { source: '/ghid/:slug', destination: '/guides/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
