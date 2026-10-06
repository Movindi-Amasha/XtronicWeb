// Removes a photographed (not flat/checker) background from a product photo
// via border-seeded flood fill against one or more reference background
// tones (sampled from the image's own corners), so enclosed near-white
// regions that are actually part of the product (white plastic, highlights)
// are left alone since they have no path to the border through "background"
// pixels. Usage:
//   node scripts/remove-photo-bg.mjs <src> <out.png> <tolerance> <r,g,b> [<r,g,b> ...]
import sharp from "sharp";

const [, , src, out, toleranceArg, ...toneArgs] = process.argv;
const TOLERANCE = Number(toleranceArg);
const TONES = toneArgs.map((t) => t.split(",").map(Number));

function dist(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

function matchesAnyTone(px) {
  return TONES.some((tone) => dist(px, tone) <= TOLERANCE);
}

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const isBg = new Uint8Array(width * height); // candidate background-like pixel
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const px = [data[i], data[i + 1], data[i + 2]];
    isBg[y * width + x] = matchesAnyTone(px) ? 1 : 0;
  }
}

const visited = new Uint8Array(width * height);
const stack = [];
for (let x = 0; x < width; x++) {
  stack.push([x, 0], [x, height - 1]);
}
for (let y = 0; y < height; y++) {
  stack.push([0, y], [width - 1, y]);
}

while (stack.length) {
  const [x, y] = stack.pop();
  if (x < 0 || y < 0 || x >= width || y >= height) continue;
  const idx = y * width + x;
  if (visited[idx] || !isBg[idx]) continue;
  visited[idx] = 1;
  stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

let cleared = 0;
for (let p = 0; p < width * height; p++) {
  if (visited[p]) {
    data[p * channels + 3] = 0;
    cleared++;
  }
}
console.log(`${src}: cleared ${cleared} / ${width * height} px`);

await sharp(data, { raw: { width, height, channels } }).png().toFile(out);
console.log(`-> ${out}`);
