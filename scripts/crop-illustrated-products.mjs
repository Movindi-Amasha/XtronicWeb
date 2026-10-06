import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "product/mascot/products-sheet-transparent.png";
const OUT_DIR = "public/mascot";

// Generous bounding boxes eyeballed from the 2048x2048 sheet; trim() tightens
// each down to its actual content afterward.
const ITEMS = [
  { name: "illustrated-rover", left: 0, top: 40, width: 1000, height: 630 },
  { name: "illustrated-plane", left: 1030, top: 100, width: 980, height: 600 },
  { name: "illustrated-boat", left: 480, top: 730, width: 1050, height: 460 },
  { name: "illustrated-robot", left: 130, top: 1150, width: 600, height: 870 },
  { name: "illustrated-butterfly", left: 1030, top: 1300, width: 950, height: 700 },
];

await mkdir(OUT_DIR, { recursive: true });

for (const item of ITEMS) {
  const outPath = `${OUT_DIR}/${item.name}.png`;
  const extracted = sharp(SRC).extract({
    left: item.left,
    top: item.top,
    width: item.width,
    height: item.height,
  });
  try {
    await extracted.clone().trim({ threshold: 10 }).png().toFile(outPath);
  } catch {
    await extracted.png().toFile(outPath);
  }
  console.log(`${item.name} -> ${outPath}`);
}
