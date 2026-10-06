import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "product/mascot/Gemini_Generated_Image_rapcj7rapcj7rapc.jpeg";
const OUT_DIR = "product/mascot";

// The two checkerboard tile tones baked into the source JPEG (no real alpha).
const GRAY = [215, 216, 218];
const WHITE = [255, 255, 255];
const TOL = 20;

function closeTo(r, g, b, [tr, tg, tb]) {
  return Math.abs(r - tr) <= TOL && Math.abs(g - tg) <= TOL && Math.abs(b - tb) <= TOL;
}

function isBackground(r, g, b) {
  return closeTo(r, g, b, GRAY) || closeTo(r, g, b, WHITE);
}

const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// Classify background on a blurred copy — smooths out JPEG ringing/noise
// right at the checker-tile edges that would otherwise break flood-fill
// connectivity and leave faint opaque flecks behind — but keep the alpha
// mask applied to the original, unblurred pixels below.
const { data: blurred } = await sharp(SRC)
  .blur(2)
  .raw()
  .toBuffer({ resolveWithObject: true });

const alpha = new Uint8Array(width * height).fill(255);
const visited = new Uint8Array(width * height);

function idx(x, y) {
  return y * width + x;
}

const queue = new Int32Array(width * height);
let qHead = 0;
let qTail = 0;

function tryPush(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const i = idx(x, y);
  if (visited[i]) return;
  const p = i * channels;
  if (!isBackground(blurred[p], blurred[p + 1], blurred[p + 2])) return;
  visited[i] = 1;
  alpha[i] = 0;
  queue[qTail++] = i;
}

// Seed the flood fill from every border pixel.
for (let x = 0; x < width; x++) {
  tryPush(x, 0);
  tryPush(x, height - 1);
}
for (let y = 0; y < height; y++) {
  tryPush(0, y);
  tryPush(width - 1, y);
}

while (qHead < qTail) {
  const i = queue[qHead++];
  const x = i % width;
  const y = (i - x) / width;
  tryPush(x + 1, y);
  tryPush(x - 1, y);
  tryPush(x, y + 1);
  tryPush(x, y - 1);
}

const rgba = Buffer.alloc(width * height * 4);
for (let i = 0; i < width * height; i++) {
  const p = i * channels;
  const o = i * 4;
  rgba[o] = data[p];
  rgba[o + 1] = data[p + 1];
  rgba[o + 2] = data[p + 2];
  rgba[o + 3] = alpha[i];
}

await mkdir(OUT_DIR, { recursive: true });
const outPath = `${OUT_DIR}/sheet-transparent.png`;
await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toFile(outPath);
console.log(`Wrote ${outPath}`);
