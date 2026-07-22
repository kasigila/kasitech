"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BrandIntro } from "@/components/site/BrandIntro";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDemo = pathname?.startsWith("/demo/");

  if (isDemo) {
    return <>{children}</>;
  }

  return (
    <>
      <BrandIntro />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
