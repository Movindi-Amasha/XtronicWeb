import sharp from "sharp";

// Surgically zero out alpha in a small rectangular region — used for an
// isolated background pocket the flood-fill couldn't reach because it was
// fully enclosed by character limbs (no path to the image border).
const [, , SRC, OUT, leftArg, topArg, widthArg, heightArg] = process.argv;
const left = Number(leftArg);
const top = Number(topArg);
const width = Number(widthArg);
const height = Number(heightArg);

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, channels } = info;

for (let y = top; y < top + height; y++) {
  for (let x = left; x < left + width; x++) {
    const i = (y * w + x) * channels;
    data[i + 3] = 0;
  }
}

await sharp(data, { raw: info }).png().toFile(OUT);
console.log(`Wrote ${OUT}`);
