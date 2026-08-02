import type { Metadata } from "next";
import { CredoWebsitePreview } from "@/components/demo-studio/CredoWebsitePreview";

export const metadata: Metadata = {
  title: "Credo Energy Group · Website Preview | KasiTech",
  description:
    "Conceptual Credo Energy Group website preview for proposal KT-CEG-WEB-2026-001. Not the final polished build.",
  robots: { index: false, follow: false },
};

export default function CredoWebsitePreviewPage() {
  return <CredoWebsitePreview />;
}
