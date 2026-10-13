import { getProductBySlug } from "./products";

// "Our Works Gallery" photos: kids with their finished builds
// (public/works/*). Shared by the homepage and How It Works carousels and
// the /gallery page. Kits without a works photo yet use their own
// "in action" product photo (public/products/<slug>/4.jpg).
const WORK_PHOTOS: { slug: string; image: string }[] = [
  { slug: "solar-4wd-rover", image: "/works/solar-racer.jpg" },
  { slug: "solar-speedboat", image: "/works/solar-boat.jpg" },
  { slug: "wooden-taxiing-aircraft", image: "/works/solar-plane.jpg" },
  { slug: "solar-butterfly", image: "/works/solar-butterfly.jpg" },
  { slug: "voice-robot", image: "/products/voice-robot/4.jpg" },
];

export const WORKS = WORK_PHOTOS.map(({ slug, image }) => ({
  href: `/shop/${slug}`,
  image,
  title: getProductBySlug(slug)?.name ?? slug,
}));
