import QRCode from "qrcode";
import { businessCard } from "@/lib/card";

export async function CardQr({ className }: { className?: string }) {
  const svg = await QRCode.toString(businessCard.cardUrl, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: {
      dark: "#090909",
      light: "#F4F2EA",
    },
  });

  return (
    <div
      className={className}
      role="img"
      aria-label="QR code linking to the KasiTech digital business card"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
