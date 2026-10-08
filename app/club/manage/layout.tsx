import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Club Membership",
  robots: { index: false, follow: true },
};

export default function ClubManageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
