# US Ag Drone Directory

Farmer-direct directory of verified US agricultural drone spray operators across all 50 states. Listings are filtered for FAA Part 107 and Part 137 status and state pesticide applicator licensing with aerial endorsement. Pricing benchmarks cite primary sources (Iowa State Custom Rate Survey, Kansas State Extension, UC Davis, USDA NRCS). Live at [agdronedirectory.com](https://agdronedirectory.com).

## Tech stack

- [Next.js 14](https://nextjs.org) App Router
- TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- Deployed on [Netlify](https://www.netlify.com)
- Data layer: TypeScript files in `src/data/` — no database, no CMS

## Local development

```bash
npm install
npm run dev      # start dev server on http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # next lint
```

## Project layout

- `src/app/` — App Router routes, layouts, dynamic robots and sitemap
- `src/components/` — shared React components
- `src/data/` — operators, states, crops, services, drones, blog posts, guides, author
- `public/` — static assets (images, ads.txt, humans.txt, llms.txt, IndexNow key)
- `scripts/` — IndexNow ping and other build-time utilities
