export type ProductCategory =
  | "Solar Energy"
  | "Robotics & Electronics"
  | "Wooden Mechanics";

export interface Product {
  slug: string;
  name: string;
  emoji: string;
  category: ProductCategory;
  categoryLabel: string;
  age: string;
  priceCents: number;
  buildTime: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  stemConcepts: string[];
  whatsInTheBox: string[];
  image: string;
}

export const products: Product[] = [
  {
    slug: "solar-4wd-rover",
    name: "Solar 4-Wheel Drive DIY Rover",
    emoji: "☀️",
    category: "Solar Energy",
    categoryLabel: "Solar Mechanics & Clean Energy",
    age: "6+",
    priceCents: 2995,
    buildTime: "45–60 min",
    rating: 4.9,
    reviewCount: 128,
    highlights: [
      "Dual-angle solar panel for maximum sun capture",
      "Four-wheel gearbox drivetrain",
      "Battery-free outdoor driving",
    ],
    stemConcepts: ["Photovoltaics", "Mechanics", "Gear ratios"],
    whatsInTheBox: [
      "Dual-angle solar panel",
      "4-wheel gearbox chassis kit",
      "Snap-fit body panels",
      "Illustrated build guide",
    ],
    image: "/products/solar-4wd-rover/main.jpg",
  },
  {
    slug: "wooden-taxiing-aircraft",
    name: "Wooden Taxiing Aircraft Kit",
    emoji: "✈️",
    category: "Wooden Mechanics",
    categoryLabel: "Wooden Mechanics & Flight",
    age: "6+",
    priceCents: 2495,
    buildTime: "30–45 min",
    rating: 4.8,
    reviewCount: 94,
    highlights: [
      "Laser-cut basswood construction",
      "High-speed mini propeller",
      "Electric circuit switch",
    ],
    stemConcepts: ["Simple circuits", "Aerodynamics", "Wood engineering"],
    whatsInTheBox: [
      "Laser-cut basswood panels",
      "Mini propeller & motor",
      "Circuit switch & battery pack",
      "Illustrated build guide",
    ],
    image: "/products/wooden-taxiing-aircraft/main.jpg",
  },
  {
    slug: "solar-speedboat",
    name: "Solar-Powered Yacht / Speedboat",
    emoji: "🛥️",
    category: "Solar Energy",
    categoryLabel: "Solar Mechanics & Clean Energy",
    age: "6+",
    priceCents: 3295,
    buildTime: "30–45 min",
    rating: 4.7,
    reviewCount: 71,
    highlights: [
      "Waterproof buoyancy hull",
      "Direct-sun drive motor",
      "Dual-blade twin screw propulsion",
    ],
    stemConcepts: ["Buoyancy", "Photovoltaics", "Fluid dynamics"],
    whatsInTheBox: [
      "Waterproof hull components",
      "Solar panel & drive motor",
      "Twin-screw propeller set",
      "Illustrated build guide",
    ],
    image: "/products/solar-speedboat/main.jpg",
  },
  {
    slug: "voice-robot",
    name: "Smart Voice-Controlled Robot Kit",
    emoji: "🤖",
    category: "Robotics & Electronics",
    categoryLabel: "Robotics & Electronics",
    age: "7+",
    priceCents: 3995,
    buildTime: "60–90 min",
    rating: 4.9,
    reviewCount: 156,
    highlights: [
      "Responds to clap and voice triggers",
      "Bi-directional gear system",
      "Flashing LED eyes",
    ],
    stemConcepts: ["Sound frequency", "Electronics", "Gear mechanics"],
    whatsInTheBox: [
      "Robot chassis & gear system",
      "Voice/clap sensor module",
      "LED eye assembly",
      "Illustrated build guide",
    ],
    image: "/products/voice-robot/main.jpg",
  },
  {
    slug: "solar-butterfly",
    name: "Solar-Powered Flapping Butterfly",
    emoji: "🦋",
    category: "Solar Energy",
    categoryLabel: "Solar Mechanics & Clean Energy",
    age: "6+",
    priceCents: 2295,
    buildTime: "30–45 min",
    rating: 4.8,
    reviewCount: 63,
    highlights: [
      "Realistic wing-flutter linkage",
      "Micro solar cell",
      "Desk display stand included",
    ],
    stemConcepts: ["Photovoltaics", "Linkage mechanisms", "Biomimicry"],
    whatsInTheBox: [
      "Micro solar cell & motor",
      "Wing linkage mechanism",
      "Display stand",
      "Illustrated build guide",
    ],
    image: "/products/solar-butterfly/main.jpg",
  },
];

export const categories: ProductCategory[] = [
  "Solar Energy",
  "Robotics & Electronics",
  "Wooden Mechanics",
];

export function formatPriceAUD(cents: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(cents / 100);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
