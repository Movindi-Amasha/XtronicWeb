import sharp from "sharp";

const SRC = "product/mascot/sheet-transparent.png";
const OUT_DIR = "public/mascot";

// Row 3 cells, but height trimmed to 460 (not the full 512) to stay clear
// of the banner row below, whose background shape dips upward at some
// x-positions — no .trim() here, since trim() was expanding the bounding
// box out to that distant stray content instead of a clean content crop.
const CELLS = [
  { name: "gift-box-prop", left: 0, top: 1024, width: 512, height: 460 },
  { name: "holding-gift", left: 512, top: 1024, width: 512, height: 460 },
  { name: "sitting-reading", left: 1024, top: 1024, width: 512, height: 460 },
  { name: "magnifying-glass", left: 1536, top: 1024, width: 512, height: 460 },
];

for (const cell of CELLS) {
  const outPath = `${OUT_DIR}/${cell.name}.png`;
  await sharp(SRC)
    .extract({ left: cell.left, top: cell.top, width: cell.width, height: cell.height })
    .png()
    .toFile(outPath);
  console.log(`${cell.name} -> ${outPath}`);
}
