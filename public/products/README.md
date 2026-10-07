# Product images

Drop each product's photo in as `main.jpg` (or `.png`/`.webp` — just update the
extension in `lib/products.ts` to match) inside its folder:

- `solar-4wd-rover/main.jpg` — Solar 4-Wheel Drive DIY Rover
- `wooden-taxiing-aircraft/main.jpg` — Wooden Taxiing Aircraft Kit
- `solar-speedboat/main.jpg` — Solar-Powered Yacht / Speedboat
- `voice-robot/main.jpg` — Smart Voice-Controlled Robot Kit
- `solar-butterfly/main.jpg` — Solar-Powered Flapping Butterfly

Until a photo is added, the site shows a brand-colored placeholder tile with
the product's emoji instead of a broken image — nothing will look broken in
the meantime.

Recommended: square or 4:3, at least 800px wide, JPG or WebP.

## Product videos

Product demo videos are hosted on **Cloudinary**, not committed to this repo.
GitHub hard-rejects any file over 100MB, and Vercel doesn't fetch Git LFS
content during its build, so a video sitting in `public/` would work locally
but break (or fail to push) once deployed.

To add a video for a product:

1. Upload the file at [cloudinary.com](https://cloudinary.com) (Media
   Library → Upload).
2. Copy its delivery URL (looks like
   `https://res.cloudinary.com/<cloud-name>/video/upload/v.../<name>.mp4`).
3. Add an entry to `EXTERNAL_VIDEOS` in `lib/productImages.ts`, keyed by the
   product's slug.

It then shows up as the **first** item in that product's photo carousel on
its product page — visitors swipe or use the arrow buttons to move from the
video into the regular photos. No video, no code change needed — the gallery
just shows photos as before.

For local testing only, you can still drop a `video.mp4` (`.webm`/`.mov` also
work) directly into a product's folder here — `getProductVideo()` falls back
to it when there's no Cloudinary entry for that slug. It's gitignored, so it
never accidentally gets committed.
