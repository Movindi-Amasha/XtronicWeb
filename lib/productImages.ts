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
