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
  /**
   * Client website previews live as static HTML under /preview/*.
   * Next strips the trailing slash, so rewrite the directory URL to the static index.
   */
  async rewrites() {
    return [
      {
        source: "/preview/credo-website",
        destination: "/preview/credo-website/index.html",
      },
      {
        source: "/preview/jembe",
        destination: "/preview/jembe/index.html",
      },
    ];
  },
};

export default nextConfig;
