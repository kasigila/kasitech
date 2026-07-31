import type { Metadata } from "next";

export const SITE_URL = "https://www.kasitechinnovations.com";
export const SITE_NAME = "KasiTech";
export const SITE_TITLE = "KasiTech: Digital products that work";
export const SITE_DESCRIPTION =
  "Premium digital technology studio in Dar es Salaam. Websites, booking, ecommerce, software, and AI systems built to work.";
export const SITE_LAST_MODIFIED = "2026-07-01";

/** Client pricing catalog PDF (opens in browser). */
export const PRICING_PDF_HREF = "/api/catalog/pdf";

export const OG_IMAGE_PATH = "/opengraph-image";
export const TWITTER_IMAGE_PATH = "/twitter-image";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;
export const TWITTER_IMAGE_URL = `${SITE_URL}${TWITTER_IMAGE_PATH}`;
export const OG_IMAGE_ALT = "KasiTech - Digital products that work";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  openGraphTitle,
}: {
  title: string;
  description: string;
  path: string;
  openGraphTitle?: string;
}): Metadata {
  const socialTitle = openGraphTitle ?? `${title} · ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
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
      title: socialTitle,
      description,
      images: [TWITTER_IMAGE_URL],
    },
  };
}
