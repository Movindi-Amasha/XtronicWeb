import type { Metadata } from "next";
import { Geist_Mono, Fredoka, Nunito } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import CartDrawer from "@/components/CartDrawer";
import CartToast from "@/components/CartToast";
import CartHydration from "@/components/CartHydration";
import QuickViewModal from "@/components/QuickViewModal";
import SiteMotion from "@/components/SiteMotion";
import "./globals.css";

// Body text
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

// Uppercase UI labels, buttons, nav, specs
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Bold, chunky, rounded display font — hero titles, section headings, stat
// numbers. Reads friendly/playful (like LEGO's own branding) without being
// literally handwritten, which felt too childish for a brand name.
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "XTRONIC KIDS | STEM Robotics & Solar Kits for Kids 6+",
    template: "%s | XTRONIC KIDS",
  },
  description:
    "Hands-on STEM robotics and solar engineering kits for kids 6+. Screen-free building with real circuits, gears and solar power.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "XTRONIC KIDS | STEM Robotics & Solar Kits for Kids 6+",
    description:
      "Hands-on STEM robotics and solar engineering kits for kids 6+. Screen-free building with real circuits, gears and solar power.",
    url: siteUrl,
    siteName: "XTRONIC KIDS",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: `${siteUrl}/brand/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "XTRONIC KIDS — Learn, Build, Play",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XTRONIC KIDS | STEM Robotics & Solar Kits for Kids 6+",
    description:
      "Hands-on STEM robotics and solar engineering kits for kids 6+. Screen-free building with real circuits, gears and solar power.",
    images: [`${siteUrl}/brand/og-image.jpg`],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "XTRONIC KIDS",
  url: siteUrl,
  logo: `${siteUrl}/brand/xtronic-logo-transparent.png`,
  description:
    "XTRONIC KIDS makes hands-on STEM robotics and solar engineering kits for kids 6+, shipping across Australia and Sri Lanka.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "XTRONIC KIDS",
  publisher: { "@id": `${siteUrl}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/shop?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${geistMono.variable} ${fredoka.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-brand-navy antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:rounded-full focus:bg-brand-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1 overflow-x-clip pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBottomBar />
        <CartDrawer />
        <CartToast />
        <CartHydration />
        <QuickViewModal />
        <SiteMotion />
      </body>
    </html>
  );
}
