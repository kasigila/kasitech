import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site/SiteChrome";
import { ConsoleEgg } from "@/components/site/ConsoleEgg";
import {
  OG_IMAGE_ALT,
  OG_IMAGE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  TWITTER_IMAGE_URL,
} from "@/lib/site";

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
    default: SITE_TITLE,
    template: "%s · KasiTech",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://www.kasitechinnovations.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [TWITTER_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: OG_IMAGE_URL,
  sameAs: [
    "https://www.linkedin.com/in/karen-marie-kasigila-443b73242",
    "https://www.instagram.com/kasitechinnovations",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ConsoleEgg />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
