import Link from "next/link";
import { BusinessLoginForm } from "@/components/business/login-form";
import { logoutBusiness } from "@/lib/business-portal/actions";
import { getPortalSession } from "@/lib/business-portal/session";

export const dynamic = "force-dynamic";

export default async function BusinessPage() {
  const session = await getPortalSession();
  return (
    <main className="flex min-h-screen items-center justify-center bg-kasi-black px-5 py-16 text-kasi-ivory">
      <div className="w-full max-w-md">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-kasi-grey">KasiTech</p>
        <h1 className="mt-3 font-display text-4xl tracking-[-0.03em]">Business sign in</h1>
        {session ? (
          <div className="mt-8 border border-kasi-border p-5">
            <p className="text-sm text-kasi-grey">Signed in as {session.name}</p>
            <p className="mt-4 font-display text-2xl">Unique Trends TZ</p>
            <p className="mt-2 text-sm text-kasi-grey">Shop desk for this business only.</p>
            <Link href="/business/unique-trends" className="mt-6 inline-flex h-12 items-center bg-kasi-ivory px-5 text-sm text-kasi-black">
              Open shop desk
            </Link>
            <form action={logoutBusiness} className="mt-4">
              <button type="submit" className="text-sm text-kasi-grey underline">
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <>
            <p className="mt-3 text-sm text-kasi-grey">
              Use the username and password for your business. It opens only that business.
            </p>
            <BusinessLoginForm />
          </>
        )}
      </div>
    </main>
  );
}
