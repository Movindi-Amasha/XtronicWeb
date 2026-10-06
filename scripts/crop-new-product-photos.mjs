import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC_DIR = "product/new-photos";
const OUT_W = 1200;
const OUT_H = 900;

// Each product's clean 2x2 grid (quadrants: main hero / parts flatlay /
// hands building / in-action) plus its wide marketing banner.
const PRODUCTS = [
  {
    slug: "solar-4wd-rover",
    grid: "ChatGPT Image Oct 4, 2026, 04_38_00 AM.png",
    banner: "ChatGPT Image Sep 27, 2026, 01_21_24 PM.png",
  },
  {
    slug: "wooden-taxiing-aircraft",
    grid: "ChatGPT Image Oct 4, 2026, 04_45_39 AM.png",
    banner: "ChatGPT Image Sep 29, 2026, 02_08_26 AM.png",
  },
  {
    slug: "solar-speedboat",
    grid: "ChatGPT Image Oct 4, 2026, 04_33_05 AM.png",
    banner: "ChatGPT Image Sep 29, 2026, 02_53_56 AM.png",
  },
  {
    slug: "voice-robot",
    grid: "ChatGPT Image Oct 3, 2026, 03_26_56 PM.png",
    banner: "ChatGPT Image Sep 29, 2026, 03_55_08 AM.png",
  },
  {
    slug: "solar-butterfly",
    grid: "ChatGPT Image Oct 3, 2026, 02_37_31 PM.png",
    banner: "ChatGPT Image Sep 25, 2026, 04_27_23 AM.png",
  },
];

// Inset a few px from each quadrant's edges to avoid the thin white gutter
// line between panels in the source collage bleeding into the crop.
const INSET = 28;
const QW = 768 - INSET * 2;
const QH = 512 - INSET * 2;

const QUADRANTS = [
  { name: "main.jpg", left: 0 + INSET, top: 0 + INSET },
  { name: "2.jpg", left: 768 + INSET, top: 0 + INSET },
  { name: "3.jpg", left: 0 + INSET, top: 512 + INSET },
  { name: "4.jpg", left: 768 + INSET, top: 512 + INSET },
];

for (const { slug, grid, banner } of PRODUCTS) {
  const outDir = path.join("public", "products", slug);
  await mkdir(outDir, { recursive: true });

  const gridPath = path.join(SRC_DIR, grid);
  for (const q of QUADRANTS) {
    const outPath = path.join(outDir, q.name);
    await sharp(gridPath)
      .extract({ left: q.left, top: q.top, width: QW, height: QH })
      .resize(OUT_W, OUT_H, { fit: "cover", position: "centre" })
      .jpeg({ quality: 92 })
      .toFile(outPath);
    console.log(`${gridPath} [${q.name}] -> ${outPath}`);
  }

  const bannerOut = path.join(outDir, "banner.jpg");
  await sharp(path.join(SRC_DIR, banner)).jpeg({ quality: 92 }).toFile(bannerOut);
  console.log(`${banner} -> ${bannerOut}`);
}
