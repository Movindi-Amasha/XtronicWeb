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

Drop a demo video in as `video.mp4` (`.webm` and `.mov` also work) inside the
same product folder:

- `solar-4wd-rover/video.mp4`
- `wooden-taxiing-aircraft/video.mp4`
- `solar-speedboat/video.mp4`
- `voice-robot/video.mp4`
- `solar-butterfly/video.mp4`
- `stem-bundle-5in1/video.mp4`
- `gift-wrap-card/video.mp4`
- `tools-accessories-pack/video.mp4`

If a video is present, it shows up as the **first** item in that product's
photo carousel on its product page — visitors swipe or use the arrow buttons
to move from the video into the regular photos, same as flipping between
photos. No video, no code change needed — the gallery just shows photos as
before.

Keep file size reasonable for the web (a short 15–30 second clip, compressed
MP4/H.264, under ~20MB) so the page still loads quickly.
