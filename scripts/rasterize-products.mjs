import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const GRID = 48;
const ALPHA_THRESHOLD = 60;
const MIN_LIGHTNESS = 0.3;

const SOURCES = [
  { slug: "solar-4wd-rover", file: "4wd.svg" },
  { slug: "wooden-taxiing-aircraft", file: "plane.svg" },
  { slug: "solar-speedboat", file: "yatch.svg" },
  { slug: "voice-robot", file: "robit.svg" },
  { slug: "solar-butterfly", file: "butterfly.svg" },
];

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r: h = ((g - b) / d) % 6; break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

function boostLightness(r, g, b) {
  const [h, s, l] = rgbToHsl(r, g, b);
  if (l >= MIN_LIGHTNESS) return [r, g, b];
  const [nr, ng, nb] = hslToRgb(h, Math.min(1, s * 1.1), MIN_LIGHTNESS);
  return [nr, ng, nb];
}

async function rasterize(slug, input) {
  const pipeline = sharp(input).ensureAlpha();

  let trimmed;
  try {
    trimmed = await pipeline.clone().trim({ threshold: 10 }).toBuffer();
  } catch {
    trimmed = await pipeline.clone().toBuffer();
  }

  const trimmedMeta = await sharp(trimmed).metadata();
  const pad = Math.round(Math.max(trimmedMeta.width, trimmedMeta.height) * 0.06);
  const padded = await sharp(trimmed)
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const { data, info } = await sharp(padded)
    .modulate({ brightness: 1.25, saturation: 1.55 })
    .resize(GRID, GRID, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(data.length);
  const cells = new Array(info.width * info.height).fill(null);
  let lit = 0;
  for (let i = 0; i < info.width * info.height; i++) {
    const o = i * info.channels;
    const [r, g, b, a] = [data[o], data[o + 1], data[o + 2], data[o + 3]];
    if (a > ALPHA_THRESHOLD) {
      const [br, bg, bb] = boostLightness(r, g, b);
      out[o] = br;
      out[o + 1] = bg;
      out[o + 2] = bb;
      out[o + 3] = 255;
      cells[i] = `#${[br, bg, bb].map((n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0")).join("")}`;
      lit++;
    } else {
      out[o] = 0;
      out[o + 1] = 0;
      out[o + 2] = 0;
      out[o + 3] = 0;
    }
  }

  const outDir = path.join("public", "generated", "signal");
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, `${slug}.png`);
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(outPath);

  console.log(`${slug} -> ${outPath} (${lit}/${info.width * info.height} lit)`);
  return { slug, size: info.width, cells };
}

const results = {};
for (const { slug, file } of SOURCES) {
  results[slug] = await rasterize(slug, path.join("product", file));
}

const jsonDir = path.join("lib", "generated");
await mkdir(jsonDir, { recursive: true });
const jsonPath = path.join(jsonDir, "signalGrids.json");
await writeFile(jsonPath, JSON.stringify(results));
console.log(`wrote ${jsonPath}`);
