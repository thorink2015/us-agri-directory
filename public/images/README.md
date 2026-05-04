# Images

## Required files

- `og-image.png` — 1200×630px Open Graph image for social sharing
  - Design: green background (#2D6A4F), white text "US Ag Drone Directory", drone icon
  - Used in: `layout.tsx` metadataBase openGraph images

## Naming conventions

- All images: lowercase, hyphens, no spaces
- Operator logos: `operator-[slug].png` (e.g. `operator-hylio-aero.png`)
- Crop images: `crop-[slug].webp` (e.g. `crop-corn.webp`, `crop-soybeans.webp`)
- Hero/section images: `hero-drone-spraying.webp`, `hero-cover-crop-seeding.webp`

## Optimization guidelines

- Use WebP format for all photos (JPEG fallback for IE11)
- Maximum file size: 100KB for thumbnails, 200KB for hero images
- Use the Next.js `<Image>` component with explicit `width` and `height`
- Always include descriptive English alt tags using US ag terminology (acres, fungicide, defoliant, cover crop, NDVI, Part 137, etc.)

## Creating the OG image

You can create `og-image.png` using:
1. Canva: 1200×630px template
2. Figma: export as PNG
3. Or generate via the dynamic OG route at `/opengraph-image`
