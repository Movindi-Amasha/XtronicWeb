import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Club Membership Confirmed",
  robots: { index: false, follow: true },
};

export default function ClubSuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
