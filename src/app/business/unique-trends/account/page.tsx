import { fieldClass, Notice, PageTitle } from "@/components/business/ui";
import { saveDeskPassword } from "@/lib/business-portal/actions";
import { getPortalSession } from "@/lib/business-portal/session";
import { redirect } from "next/navigation";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const session = await getPortalSession();
  if (!session) redirect("/business");
  return (
    <div className="max-w-md">
      <PageTitle title="Password" text={`You are signed in as ${session.email}. This only changes how you sign in. It does not change the shop.`} />
      <Notice saved={params.saved} error={params.error} savedText="Saved. Use this password the next time you sign in." />
      <form action={saveDeskPassword} className="space-y-3">
        <label className="block text-sm">Name<input name="name" defaultValue={session.name} className={fieldClass} /></label>
        <label className="block text-sm">Current password<input name="currentPassword" type="password" required className={fieldClass} /></label>
        <label className="block text-sm">New password<input name="nextPassword" type="password" required minLength={8} className={fieldClass} /></label>
        <button className="h-12 bg-kasi-ivory px-5 text-sm text-kasi-black">Save new password</button>
      </form>
    </div>
  );
}
