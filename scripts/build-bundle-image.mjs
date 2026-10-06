import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const CANVAS_W = 1200;
const CANVAS_H = 900;
const BACKGROUND = "#E8F4FE";

const SLUGS = [
  "solar-4wd-rover",
  "wooden-taxiing-aircraft",
  "solar-speedboat",
  "voice-robot",
  "solar-butterfly",
];

// 2 small tiles top row, 1 big centered-ish + 2 small bottom row — a simple
// collage using the real product photos we already have.
const TILE = 360;
const positions = [
  { x: 40, y: 40 },
  { x: CANVAS_W - TILE - 40, y: 40 },
  { x: (CANVAS_W - TILE) / 2, y: (CANVAS_H - TILE) / 2 },
  { x: 40, y: CANVAS_H - TILE - 40 },
  { x: CANVAS_W - TILE - 40, y: CANVAS_H - TILE - 40 },
];

const composites = [];
for (let i = 0; i < SLUGS.length; i++) {
  const buf = await sharp(`public/products/${SLUGS[i]}/main.jpg`)
    .resize(TILE, TILE, { fit: "cover" })
    .toBuffer();
  const rounded = await sharp(buf)
    .composite([
      {
        input: Buffer.from(
          `<svg width="${TILE}" height="${TILE}"><rect width="${TILE}" height="${TILE}" rx="24" fill="#fff"/></svg>`
        ),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();
  composites.push({ input: rounded, left: positions[i].x, top: positions[i].y });
}

await mkdir("public/products/stem-bundle-5in1", { recursive: true });

await sharp({
  create: { width: CANVAS_W, height: CANVAS_H, channels: 3, background: BACKGROUND },
})
  .composite(composites)
  .jpeg({ quality: 90 })
  .toFile("public/products/stem-bundle-5in1/main.jpg");

console.log("Wrote public/products/stem-bundle-5in1/main.jpg");
