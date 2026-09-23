import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business sign in",
  robots: { index: false, follow: false },
};

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
