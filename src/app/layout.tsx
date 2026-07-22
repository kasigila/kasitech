import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site/SiteChrome";
import { ConsoleEgg } from "@/components/site/ConsoleEgg";

const sans = Space_Grotesk({
  variable: "--font-kasi-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Outfit({
  variable: "--font-kasi-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-kasi-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KasiTech — Digital products that work",
    template: "%s · KasiTech",
  },
  description:
    "Premium digital technology studio in Dar es Salaam. Websites, booking, ecommerce, software and AI systems built to work.",
  metadataBase: new URL("https://kasitech.co"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-kasi-black text-kasi-ivory">
        <ConsoleEgg />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
