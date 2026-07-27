import ZuriDemo from "@/demos/zuri/ZuriDemo";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "ZURI Demo",
  description:
    "Hospitality demo: Zanzibar discovery, booking, guest experience, concierge, and operations.",
  path: "/demo/zuri",
});

export default function ZuriDemoPage() {
  return <ZuriDemo />;
}
