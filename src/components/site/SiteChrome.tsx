"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BrandIntro } from "@/components/site/BrandIntro";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDemo = pathname?.startsWith("/demo/");
  const isDemoStudio =
    pathname?.startsWith("/demo-studio") || pathname?.startsWith("/build/");
  const isPreview = pathname?.startsWith("/preview/");
  const isCard = pathname === "/card";
  const isHome = pathname === "/";

  // Standalone surfaces: demos, Demo Studio, proposal previews, shared builds, digital business card
  if (isDemo || isDemoStudio || isPreview || isCard) {
    return <>{children}</>;
  }

  return (
    <>
      {isHome && <BrandIntro />}
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
