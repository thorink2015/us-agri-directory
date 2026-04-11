# Images

## Required files

- `og-image.png` — 1200×630px Open Graph image for social sharing
  - Design: Green background (#2D6A4F), white text "DroneAgricol.ro", drone icon
  - Used in: layout.tsx metadataBase openGraph images

## Naming conventions

- All images: lowercase, hyphens, no spaces
- Operator logos: `operator-[slug].png` (e.g. operator-riagro.png)
- Crop images: `crop-[slug].webp` (e.g. crop-vita-de-vie.webp)
- Hero/section images: `hero-drone-agricultural.webp`

## Optimization guidelines

- Use WebP format for all photos (JPEG fallback for IE11)
- Maximum file size: 100KB for thumbnails, 200KB for hero images
- Use Next.js Image component with width/height specified
- Always include descriptive alt tags in Romanian

## Creating the OG image

You can create og-image.png using:
1. Canva: 1200×630px template
2. Figma: export as PNG
3. Or use a service like og.droneagricol.ro (future)
