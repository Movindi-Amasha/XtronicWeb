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

  const images = files.filter((f) =>
    IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase())
  );

  images.sort((a, b) => {
    if (a === "main.jpg") return -1;
    if (b === "main.jpg") return 1;
    return a.localeCompare(b, undefined, { numeric: true });
  });

  return images.map((f) => `/products/${slug}/${f}`);
}
