import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "product/mascot/sheet-transparent.png";
const OUT_DIR = "public/mascot";

// Grid mapped from the 2048x2048 sheet: 4 columns x 4 rows of 512px cells,
// with the hero pose spanning 2 row-heights in column 0 and the two bottom
// banners each spanning 2 columns of the last row.
const CELLS = [
  { name: "hero-hands-on-hips", left: 0, top: 0, width: 512, height: 1024 },
  { name: "waving", left: 512, top: 0, width: 512, height: 512 },
  { name: "thumbs-up-confetti", left: 1024, top: 0, width: 512, height: 512 },
  { name: "pointing", left: 1536, top: 0, width: 512, height: 512 },
  { name: "thinking", left: 512, top: 512, width: 512, height: 512 },
  { name: "shrug-1", left: 1024, top: 512, width: 512, height: 512 },
  { name: "shrug-2", left: 1536, top: 512, width: 512, height: 512 },
  { name: "gift-box-prop", left: 0, top: 1024, width: 512, height: 512 },
  { name: "holding-gift", left: 512, top: 1024, width: 512, height: 512 },
  { name: "sitting-reading", left: 1024, top: 1024, width: 512, height: 512 },
  { name: "magnifying-glass", left: 1536, top: 1024, width: 512, height: 512 },
  { name: "banner-toys", left: 0, top: 1536, width: 1024, height: 512 },
  { name: "banner-logo", left: 1024, top: 1536, width: 1024, height: 512 },
];

// Small inset to trim any anti-aliased fringe right at each cell boundary.
const INSET = 4;

await mkdir(OUT_DIR, { recursive: true });

for (const cell of CELLS) {
  const outPath = `${OUT_DIR}/${cell.name}.png`;
  const isBanner = cell.name.startsWith("banner-");
  let pipeline = sharp(SRC).extract({
    left: cell.left + INSET,
    top: cell.top + INSET,
    width: cell.width - INSET * 2,
    height: cell.height - INSET * 2,
  });
  // Banners have an opaque gradient background — trimming would misread
  // that near-uniform gradient as "boring" and over-crop it.
  if (!isBanner) {
    try {
      await pipeline.clone().trim({ threshold: 10 }).png().toFile(outPath);
      console.log(`${cell.name} -> ${outPath}`);
      continue;
    } catch {
      // Falls through to the untrimmed save below (e.g. a fully-transparent
      // or edge-touching crop that trim() can't compute a bbox for).
    }
  }
  await pipeline.png().toFile(outPath);
  console.log(`${cell.name} -> ${outPath}`);
}
