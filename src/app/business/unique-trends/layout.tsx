import { DeskShell } from "@/components/business/ui";
import { shopOrigin } from "@/lib/business-portal/client";
import { getPortalSession, UNIQUE_TRENDS_ID } from "@/lib/business-portal/session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function UniqueTrendsDeskLayout({ children }: { children: React.ReactNode }) {
  const session = await getPortalSession();
  if (!session || session.businessId !== UNIQUE_TRENDS_ID) redirect("/business");
  return <DeskShell shopUrl={shopOrigin()}>{children}</DeskShell>;
}
