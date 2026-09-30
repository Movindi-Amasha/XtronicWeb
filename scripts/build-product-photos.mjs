import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const CANVAS_W = 1200;
const CANVAS_H = 900;
const BACKGROUND = "#E8F4FE"; // brand-blue-50, matches the card's image slot

const SOURCES = [
  { slug: "solar-4wd-rover", file: "4wd.svg" },
  { slug: "wooden-taxiing-aircraft", file: "plane.svg" },
  { slug: "solar-speedboat", file: "yatch.svg" },
  { slug: "voice-robot", file: "robit.svg" },
  { slug: "solar-butterfly", file: "butterfly.svg" },
];

async function buildPhoto(slug, file) {
  const inputPath = path.join("product", file);
  const pipeline = sharp(inputPath).ensureAlpha();

  let trimmed;
  try {
    trimmed = await pipeline.clone().trim({ threshold: 10 }).toBuffer();
  } catch {
    trimmed = await pipeline.clone().toBuffer();
  }

  const meta = await sharp(trimmed).metadata();
  const pad = Math.round(Math.max(meta.width, meta.height) * 0.08);
  // Split into two sharp() calls with an intermediate buffer — chaining
  // extend() directly into modulate()+resize() in one pipeline miscalculates
  // the final output size (a libvips quirk), materializing between them
  // avoids it.
  const extended = await sharp(trimmed)
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const padded = await sharp(extended)
    .modulate({ brightness: 1.1, saturation: 1.3 })
    .resize(CANVAS_W, CANVAS_H, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const outDir = path.join("public", "products", slug);
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, "main.jpg");

  await sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 3,
      background: BACKGROUND,
    },
  })
    .composite([{ input: padded }])
    .jpeg({ quality: 90 })
    .toFile(outPath);

  console.log(`${slug} -> ${outPath}`);
}

for (const { slug, file } of SOURCES) {
  await buildPhoto(slug, file);
}
