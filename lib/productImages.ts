import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

/**
 * Lists every image in public/products/<slug>/, main.jpg first then the
 * rest in natural order (2.jpg before 10.jpg) — so dropping more files into
 * that folder and rebuilding is all it takes to grow the product gallery.
 */
export function getProductImages(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "products", slug);

  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  const hasCutout = files.includes("cutout.png");

  const images = files.filter(
    (f) =>
      IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()) &&
      !f.toLowerCase().startsWith("banner.") &&
      // When a background-removed cutout exists, skip the plain studio shot
      // it was made from — showing the same product twice in a row (once
      // floating, once on a flat background) right at the start of the
      // gallery reads as a glitchy duplicate rather than a second angle.
      !(hasCutout && f === "main.jpg")
  );

  // Background-removed cutout (if one exists) leads the gallery, then any
  // extra angle shots.
  const rank = (f: string) => (f === "cutout.png" ? 0 : f === "main.jpg" ? 1 : 2);
  images.sort((a, b) => {
    const r = rank(a) - rank(b);
    if (r !== 0) return r;
    return a.localeCompare(b, undefined, { numeric: true });
  });

  return images.map((f) => `/products/${slug}/${f}`);
}

/**
 * The wide marketing banner for a product's page header, if one exists
 * (public/products/<slug>/banner.jpg) — separate from the gallery since it
 * carries baked-in title text rather than being a plain product photo.
 */
export function getProductBanner(slug: string): string | null {
  const file = path.join(process.cwd(), "public", "products", slug, "banner.jpg");
  return fs.existsSync(file) ? `/products/${slug}/banner.jpg` : null;
}

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"];

// Product demo videos are hosted on Cloudinary rather than committed to the
// repo — GitHub hard-rejects any file over 100MB, and Vercel's build doesn't
// fetch Git LFS content by default, so a locally-served video breaks in
// production either way. Cloudinary's CDN works regardless of where the app
// itself is deployed. Add a new entry here once a video is uploaded; the
// local public/products/<slug>/video.<ext> fallback below still works for
// anyone testing with a file dropped in locally before it's uploaded.
//
// Every URL includes the q_auto,f_auto transformation — the raw uploads are
// 50-100MB+ (far above normal web streaming bitrate), which is exactly why
// playback kept stalling to buffer. q_auto,f_auto has Cloudinary serve an
// auto-compressed, auto-format version instead (confirmed ~80% smaller,
// still a valid, good-quality MP4) with no change needed to the source file.
const EXTERNAL_VIDEOS: Record<string, string> = {
  "voice-robot": "https://res.cloudinary.com/w70iq3ve/video/upload/q_auto,f_auto/v1791442429/Xtronic_Voice_Robot_WEB_VID.mp4",
  "solar-4wd-rover": "https://res.cloudinary.com/w70iq3ve/video/upload/q_auto,f_auto/v1791442400/1_Racer.mp4",
  // Uploaded as .mov — Cloudinary transcodes to real video/mp4 on the fly
  // just by requesting the .mp4 extension, which is what every browser
  // reliably plays (Chrome/Firefox often refuse video/quicktime outright).
  "wooden-taxiing-aircraft": "https://res.cloudinary.com/w70iq3ve/video/upload/q_auto,f_auto/v1791442848/Plane_Video.mp4",
};

/**
 * A product demo video, if one exists. Checks the Cloudinary mapping first,
 * then falls back to public/products/<slug>/video.<ext> for local testing.
 * Shown as the first slide in the PDP gallery, ahead of the photos.
 */
export function getProductVideo(slug: string): string | null {
  if (EXTERNAL_VIDEOS[slug]) return EXTERNAL_VIDEOS[slug];

  const dir = path.join(process.cwd(), "public", "products", slug);
  for (const ext of VIDEO_EXTENSIONS) {
    if (fs.existsSync(path.join(dir, `video${ext}`))) {
      return `/products/${slug}/video${ext}`;
    }
  }
  return null;
}
