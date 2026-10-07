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

  const images = files.filter(
    (f) =>
      IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()) &&
      !f.toLowerCase().startsWith("banner.")
  );

  // Background-removed cutout (if one exists) leads the gallery, then the
  // original studio photo, then any extra angle shots.
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
const EXTERNAL_VIDEOS: Record<string, string> = {
  "voice-robot": "https://res.cloudinary.com/w70iq3ve/video/upload/v1791387112/Xtronic_Voice_Robot_WEB_VID.mp4",
  "solar-4wd-rover": "https://res.cloudinary.com/w70iq3ve/video/upload/v1791387079/Racer_Web.mp4",
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
