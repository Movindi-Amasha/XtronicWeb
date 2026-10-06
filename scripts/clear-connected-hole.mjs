import sharp from "sharp";

// Clears exactly one connected island of checker-toned opaque pixels,
// found by flood-filling outward from a known seed point inside it —
// precise (follows the real shape) instead of guessing a bounding box.
const [, , SRC, OUT, seedXArg, seedYArg] = process.argv;
const seedX = Number(seedXArg);
const seedY = Number(seedYArg);

const GRAY = [205, 205, 205];
const WHITE = [255, 255, 255];
const TOL = 30;

function closeTo(r, g, b, [tr, tg, tb]) {
  return Math.abs(r - tr) <= TOL && Math.abs(g - tg) <= TOL && Math.abs(b - tb) <= TOL;
}
function isCheckerTone(r, g, b) {
  return closeTo(r, g, b, GRAY) || closeTo(r, g, b, WHITE);
}

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const visited = new Uint8Array(width * height);
const queue = new Int32Array(width * height);
let qHead = 0,
  qTail = 0;

function idx(x, y) {
  return y * width + x;
}

function tryPush(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const i = idx(x, y);
  if (visited[i]) return;
  const p = i * channels;
  if (data[p + 3] !== 255) return; // only chase opaque pixels
  if (!isCheckerTone(data[p], data[p + 1], data[p + 2])) return;
  visited[i] = 1;
  queue[qTail++] = i;
}

tryPush(seedX, seedY);
let count = 0;
while (qHead < qTail) {
  const i = queue[qHead++];
  const x = i % width;
  const y = (i - x) / width;
  data[i * channels + 3] = 0;
  count++;
  tryPush(x + 1, y);
  tryPush(x - 1, y);
  tryPush(x, y + 1);
  tryPush(x, y - 1);
}

console.log(`Cleared ${count} connected pixels from seed (${seedX},${seedY})`);
await sharp(data, { raw: info }).png().toFile(OUT);
console.log(`Wrote ${OUT}`);
