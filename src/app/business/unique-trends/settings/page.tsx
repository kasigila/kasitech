import { fieldClass, Notice, PageTitle } from "@/components/business/ui";
import { deleteDeskFaq, saveDeskFaq, saveDeskPolicy, saveDeskSettings } from "@/lib/business-portal/actions";
import { portalData } from "@/lib/business-portal/client";

type Settings = {
  businessName: string;
  location: string;
  whatsappDisplay: string;
  instagramHandle: string;
  tagline: string;
  aboutText: string;
  originMessage: string;
};
type Faq = { id: string; question: string; answer: string; isVisible: boolean };
type Policy = { id: string; title: string; content: string };

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const data = await portalData<{ settings: Settings; faqs: Faq[]; policies: Policy[] }>("settings");
  const settings = data.settings;
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <PageTitle title="Business settings" text="Only confirmed shop details belong here. Leave anything you are not sure about pointing customers to WhatsApp." />
        <Notice saved={params.saved} error={params.error} />
        <form action={saveDeskSettings} className="space-y-3">
          <label className="block text-sm">Shop name<input name="businessName" defaultValue={settings.businessName} className={fieldClass} /></label>
          <label className="block text-sm">Location<input name="location" defaultValue={settings.location} className={fieldClass} /></label>
          <label className="block text-sm">WhatsApp<input name="whatsapp" defaultValue={settings.whatsappDisplay} className={fieldClass} /></label>
          <label className="block text-sm">Instagram<input name="instagramHandle" defaultValue={settings.instagramHandle} className={fieldClass} /></label>
          <label className="block text-sm">Short line<input name="tagline" defaultValue={settings.tagline} className={fieldClass} /></label>
          <label className="block text-sm">About<textarea name="aboutText" rows={5} defaultValue={settings.aboutText} className="mt-1 w-full border border-kasi-border bg-black px-3 py-2 text-sm" /></label>
          <label className="block text-sm">Origin line<input name="originMessage" defaultValue={settings.originMessage} className={fieldClass} /></label>
          <button className="h-12 bg-kasi-ivory px-5 text-sm text-kasi-black">Save shop details</button>
        </form>
      </div>
      <div>
        <h2 className="font-display text-3xl">Questions</h2>
        <form action={saveDeskFaq} className="mt-4 space-y-3 border border-kasi-border p-4">
          <input name="question" placeholder="Question" className={fieldClass} />
          <textarea name="answer" rows={3} placeholder="Answer" className="w-full border border-kasi-border bg-black px-3 py-2 text-sm" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isVisible" defaultChecked /> Show on the shop</label>
          <button className="h-11 bg-kasi-ivory px-4 text-sm text-kasi-black">Add question</button>
        </form>
        <div className="mt-4 space-y-3">
          {data.faqs.map((faq) => (
            <form key={faq.id} action={saveDeskFaq} className="space-y-3 border border-kasi-border p-4">
              <input type="hidden" name="id" value={faq.id} />
              <input name="question" defaultValue={faq.question} className={fieldClass} />
              <textarea name="answer" rows={3} defaultValue={faq.answer} className="w-full border border-kasi-border bg-black px-3 py-2 text-sm" />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isVisible" defaultChecked={faq.isVisible} /> Show on the shop</label>
              <div className="flex gap-2">
                <button className="h-10 bg-kasi-ivory px-4 text-sm text-kasi-black">Save</button>
                <button formAction={deleteDeskFaq} className="h-10 border border-kasi-border px-3 text-sm">Delete</button>
              </div>
            </form>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-display text-3xl">Policies</h2>
        <div className="mt-4 space-y-3">
          {data.policies.map((policy) => (
            <form key={policy.id} action={saveDeskPolicy} className="space-y-3 border border-kasi-border p-4">
              <input type="hidden" name="id" value={policy.id} />
              <h3 className="font-display text-2xl">{policy.title}</h3>
              <textarea name="content" rows={5} defaultValue={policy.content} className="w-full border border-kasi-border bg-black px-3 py-2 text-sm" />
              <button className="h-10 bg-kasi-ivory px-4 text-sm text-kasi-black">Save</button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
