import sharp from "sharp";

const W = 1200;
const H = 630;

const bg = await sharp("public/brand/hero-bg.jpg")
  .resize(W, H, { fit: "cover" })
  .modulate({ brightness: 0.9 })
  .toBuffer();

const tint = await sharp({
  create: { width: W, height: H, channels: 4, background: { r: 13, g: 31, b: 53, alpha: 0.45 } },
})
  .png()
  .toBuffer();

const logoSize = 520;
const logo = await sharp("public/brand/xtronic-logo-transparent.png")
  .resize(logoSize, logoSize, { fit: "contain" })
  .toBuffer();

await sharp(bg)
  .composite([
    { input: tint, left: 0, top: 0 },
    { input: logo, left: Math.round((W - logoSize) / 2), top: Math.round((H - logoSize) / 2) },
  ])
  .jpeg({ quality: 88 })
  .toFile("public/brand/og-image.jpg");

console.log("done -> public/brand/og-image.jpg");
