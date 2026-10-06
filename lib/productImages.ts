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

  images.sort((a, b) => {
    if (a === "main.jpg") return -1;
    if (b === "main.jpg") return 1;
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
