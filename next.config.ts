import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Keep pdfkit outside the Turbopack/webpack bundle so AFM font data resolves on Vercel. */
  serverExternalPackages: ["pdfkit", "fontkit"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
