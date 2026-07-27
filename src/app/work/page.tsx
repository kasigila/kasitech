import WorkIndex from "@/components/work/WorkIndex";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Client work and KasiTech concept products - websites, commerce, systems, and AI demonstrations.",
  path: "/work",
});

export default function WorkPage() {
  return <WorkIndex />;
}
