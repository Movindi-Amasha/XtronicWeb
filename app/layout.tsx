import type { Metadata } from "next";
import { Geist_Mono, Fredoka, Nunito } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import CartDrawer from "@/components/CartDrawer";
import CartToast from "@/components/CartToast";
import CartHydration from "@/components/CartHydration";
import QuickViewModal from "@/components/QuickViewModal";
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

export const metadata: Metadata = {
  title: {
    default: "XTRONIC KIDZ: Learn, Build, Play",
    template: "%s | XTRONIC KIDZ",
  },
  description:
    "Hands-on STEM robotics and solar engineering kits designed to ignite curious minds. Learn, build and play with XTRONIC KIDZ.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "XTRONIC KIDZ: Learn, Build, Play",
    description:
      "Hands-on STEM robotics and solar engineering kits designed to ignite curious minds.",
    siteName: "XTRONIC KIDZ",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${geistMono.variable} ${fredoka.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-brand-navy antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:rounded-full focus:bg-brand-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBottomBar />
        <CartDrawer />
        <CartToast />
        <CartHydration />
        <QuickViewModal />
      </body>
    </html>
  );
}
