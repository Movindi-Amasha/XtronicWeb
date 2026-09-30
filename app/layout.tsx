import type { Metadata } from "next";
import { Geist, Geist_Mono, Doto } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import CartDrawer from "@/components/CartDrawer";
import CartToast from "@/components/CartToast";
import CartHydration from "@/components/CartHydration";
import QuickViewModal from "@/components/QuickViewModal";
import "./globals.css";

// Body text
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500"],
});

// Uppercase UI labels, buttons, nav, specs
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Dotted/pixel display font — hero titles, section headings, stat numbers,
// the oversized footer wordmark. Reference: RIVICHIMOVICHI build brief.
const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "XTRONIC KIDZ — Learn, Build, Play",
    template: "%s | XTRONIC KIDZ",
  },
  description:
    "Hands-on STEM robotics and solar engineering kits designed to ignite curious minds. Learn, build and play with XTRONIC KIDZ.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "XTRONIC KIDZ — Learn, Build, Play",
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
      className={`${geist.variable} ${geistMono.variable} ${doto.variable} h-full`}
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
