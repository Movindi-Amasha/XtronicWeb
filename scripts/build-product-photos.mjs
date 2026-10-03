import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const CANVAS_W = 1200;
const CANVAS_H = 900;
const BACKGROUND = "#E8F4FE"; // brand-blue-50, matches the card's image slot

// `file` is the original single hero shot; `folder` is where extra angles
// for that product get dropped in (product/<folder>/*.svg) — main.jpg stays
// the first shot, additional files become 2.jpg, 3.jpg, ... in name order.
const SOURCES = [
  { slug: "solar-4wd-rover", file: "4wd.png", folder: "4wd" },
  { slug: "wooden-taxiing-aircraft", file: "plane.png", folder: "plane" },
  { slug: "solar-speedboat", file: "Yatch.png", folder: "yatch" },
  { slug: "voice-robot", file: "robit.png", folder: "robot" },
  { slug: "solar-butterfly", file: "butterfly.png", folder: "Butterfly" },
];

async function collectInputs(file, folder) {
  const inputs = [path.join("product", file)];
  const folderPath = path.join("product", folder);

  let entries = [];
  try {
    entries = await readdir(folderPath);
  } catch {
    entries = [];
  }

  const extra = entries
    .filter((f) => f.toLowerCase().endsWith(".svg"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => path.join(folderPath, f));

  return [...inputs, ...extra];
}

async function buildPhoto(inputPath, outPath) {
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

  await mkdir(path.dirname(outPath), { recursive: true });

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

  console.log(`${inputPath} -> ${outPath}`);
}

for (const { slug, file, folder } of SOURCES) {
  const inputs = await collectInputs(file, folder);
  for (let i = 0; i < inputs.length; i++) {
    const outName = i === 0 ? "main.jpg" : `${i + 1}.jpg`;
    const outPath = path.join("public", "products", slug, outName);
    await buildPhoto(inputs[i], outPath);
  }
}
