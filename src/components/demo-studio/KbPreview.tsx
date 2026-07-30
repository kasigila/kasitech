"use client";

import { useMemo, useState } from "react";
import { KB_MODULES, kbModuleState, planLabel } from "@/demo-studio";

type Props = {
  kbPlan: string | null;
  businessName: string;
};

type BookingRow = {
  id: string;
  time: string;
  customer: string;
  service: string;
  staff: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
};

const BOOKINGS: BookingRow[] = [
  {
    id: "b1",
    time: "Today · 09:30",
    customer: "Neema J.",
    service: "Signature Facial",
    staff: "Asha",
    status: "Confirmed",
  },
  {
    id: "b2",
    time: "Today · 11:00",
    customer: "Daniel K.",
    service: "Editorial Blowout",
    staff: "Maria",
    status: "Pending",
  },
  {
    id: "b3",
    time: "Yesterday · 16:15",
    customer: "Amina R.",
    service: "Nail Couture",
    staff: "Asha",
    status: "Completed",
  },
  {
    id: "b4",
    time: "Mon · 14:00",
    customer: "James O.",
    service: "Consultation",
    staff: "Maria",
    status: "Cancelled",
  },
];

const CUSTOMERS = [
  { name: "Neema Juma", last: "Today", count: 6, status: "Active" },
  { name: "Daniel Kimaro", last: "2 days ago", count: 2, status: "Active" },
  { name: "Amina Rashid", last: "Yesterday", count: 11, status: "VIP" },
  { name: "James Okello", last: "Last week", count: 1, status: "New" },
];

const CATALOG = [
  { name: "Signature Facial", price: "TSh 85,000", category: "Skin", status: "Live" },
  { name: "Editorial Blowout", price: "TSh 45,000", category: "Hair", status: "Live" },
  { name: "Nail Couture", price: "TSh 35,000", category: "Nails", status: "Live" },
  { name: "Bridal Prep", price: "Custom", category: "Events", status: "Draft" },
];

const EVENTS = [
  { name: "Friday fire tasting", when: "Fri 19:30", seats: "12 left", status: "Published" },
  { name: "Private courtyard dinner", when: "Sat 18:00", seats: "Enquiry", status: "Published" },
  { name: "Staff training day", when: "Mon closed", seats: "—", status: "Internal" },
];

const FEEDBACK = [
  {
    rating: 5,
    customer: "Neema M.",
    comment: "Calm studio, careful pacing — will return.",
    date: "2 days ago",
    status: "Published",
  },
  {
    rating: 4,
    customer: "Tomas L.",
    comment: "Booking online was easy. Great result.",
    date: "Last week",
    status: "Published",
  },
  {
    rating: 5,
    customer: "Asha P.",
    comment: "Team remembered my preferences.",
    date: "Last week",
    status: "New",
  },
];

const TRAFFIC = [42, 55, 48, 70, 63, 81, 76];

export function KbPreview({ kbPlan, businessName }: Props) {
  const [module, setModule] = useState("overview");
  const [bookingDetail, setBookingDetail] = useState<BookingRow | null>(null);
  const [customerDetail, setCustomerDetail] = useState<(typeof CUSTOMERS)[0] | null>(null);

  const openModules = useMemo(
    () => KB_MODULES.filter((m) => kbModuleState(kbPlan, m) !== "hidden"),
    [kbPlan],
  );

  if (!kbPlan) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#0c0c0c] px-6 text-center text-kasi-grey">
        <p className="font-display text-xl text-kasi-ivory">KasiTech Business</p>
        <p className="mt-3 max-w-sm text-sm">
          Choose a KasiTech Business plan in your build to preview the owner
          dashboard your team would use day to day.
        </p>
      </div>
    );
  }

  const active =
    openModules.find((m) => m.id === module && kbModuleState(kbPlan, m) === "open")?.id ??
    "overview";

  return (
    <div className="flex h-full bg-[#0e0e0e] text-kasi-ivory">
      <aside className="w-44 shrink-0 border-r border-kasi-border/80 p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-kasi-green">
          {planLabel(kbPlan)}
        </p>
        <p className="mt-1 truncate text-xs text-kasi-grey">{businessName}</p>
        <nav className="mt-4 space-y-1">
          {openModules.map((m) => {
            const state = kbModuleState(kbPlan, m);
            if (state === "hidden") return null;
            const locked = state === "locked";
            return (
              <button
                key={m.id}
                type="button"
                disabled={locked}
                onClick={() => !locked && setModule(m.id)}
                className={`block w-full rounded px-2 py-1.5 text-left text-[11px] ${
                  locked
                    ? "cursor-not-allowed text-kasi-grey/40"
                    : active === m.id
                      ? "bg-white/10 text-kasi-ivory"
                      : "text-kasi-ivory/80 hover:bg-white/5"
                }`}
              >
                {m.label}
                {locked && (
                  <span className="mt-0.5 block text-[9px] text-kasi-grey/50">
                    Available with Growth
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="relative flex-1 overflow-y-auto p-5">
        {active === "overview" && <OverviewPanel />}
        {active === "analytics" && <AnalyticsPanel />}
        {active === "website" && (
          <ModuleShell title="Website">
            <p className="text-sm text-kasi-grey">
              Edit pages, publish updates, and keep your live site current.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {["Home", "Services", "About", "Contact"].map((p) => (
                <div key={p} className="border border-kasi-border p-3 text-sm">
                  {p}
                  <span className="mt-1 block text-[11px] text-kasi-grey">Published</span>
                </div>
              ))}
            </div>
          </ModuleShell>
        )}
        {active === "catalog" && <CatalogPanel />}
        {active === "bookings" && (
          <BookingsPanel
            onOpen={setBookingDetail}
          />
        )}
        {active === "customers" && (
          <CustomersPanel onOpen={setCustomerDetail} />
        )}
        {active === "events" && <EventsPanel />}
        {active === "qr" && <QrPanel />}
        {active === "feedback" && <FeedbackPanel />}
        {active === "locations" && (
          <ModuleShell title="Locations">
            <ul className="mt-4 space-y-2 text-sm">
              <li className="border border-kasi-border p-3">Mikocheni studio · Primary</li>
              <li className="border border-kasi-border p-3">Masaki pop-up · Seasonal</li>
            </ul>
          </ModuleShell>
        )}

        {(kbPlan === "KB-PRO" || kbPlan === "KB-SCALE" || kbPlan === "KB-ENT") && (
          <p className="mt-8 text-[11px] text-kasi-grey">
            Higher plans are priced in the catalog. Additional modules beyond Growth
            are scoped with KasiTech — not invented in this preview.
          </p>
        )}

        {bookingDetail && (
          <DetailDrawer title="Booking" onClose={() => setBookingDetail(null)}>
            <dl className="space-y-2 text-sm">
              <Row k="Time" v={bookingDetail.time} />
              <Row k="Customer" v={bookingDetail.customer} />
              <Row k="Service" v={bookingDetail.service} />
              <Row k="Staff" v={bookingDetail.staff} />
              <Row k="Status" v={bookingDetail.status} />
            </dl>
          </DetailDrawer>
        )}
        {customerDetail && (
          <DetailDrawer title="Customer" onClose={() => setCustomerDetail(null)}>
            <dl className="space-y-2 text-sm">
              <Row k="Name" v={customerDetail.name} />
              <Row k="Last visit" v={customerDetail.last} />
              <Row k="Bookings" v={String(customerDetail.count)} />
              <Row k="Status" v={customerDetail.status} />
            </dl>
          </DetailDrawer>
        )}
      </div>
    </div>
  );
}

function OverviewPanel() {
  const cards = [
    { label: "Bookings today", value: "7" },
    { label: "Customers this month", value: "128" },
    { label: "Website visitors", value: "1,940" },
    { label: "Upcoming events", value: "2" },
    { label: "Recent feedback", value: "4.8★" },
    { label: "Open enquiries", value: "9" },
  ];
  return (
    <ModuleShell title="Overview">
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="border border-kasi-border p-4">
            <div className="font-mono text-[10px] uppercase tracking-wider text-kasi-grey">
              {c.label}
            </div>
            <div className="mt-2 font-display text-2xl">{c.value}</div>
          </div>
        ))}
      </div>
    </ModuleShell>
  );
}

function AnalyticsPanel() {
  const max = Math.max(...TRAFFIC);
  return (
    <ModuleShell title="Analytics">
      <p className="text-sm text-kasi-grey">Website traffic · last 7 days</p>
      <div className="mt-4 flex h-32 items-end gap-2">
        {TRAFFIC.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full bg-kasi-green/80"
              style={{ height: `${(v / max) * 100}%` }}
            />
            <span className="text-[9px] text-kasi-grey">D{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="border border-kasi-border p-4">
          <div className="text-[11px] uppercase tracking-wider text-kasi-grey">Top pages</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Home · 38%</li>
            <li>Services · 24%</li>
            <li>Book · 19%</li>
          </ul>
        </div>
        <div className="border border-kasi-border p-4">
          <div className="text-[11px] uppercase tracking-wider text-kasi-grey">Trends</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Bookings ↑ 12% vs last week</li>
            <li>New customers ↑ 8%</li>
          </ul>
        </div>
      </div>
    </ModuleShell>
  );
}

function BookingsPanel({ onOpen }: { onOpen: (b: BookingRow) => void }) {
  return (
    <ModuleShell title="Bookings">
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-[12px]">
          <thead className="text-[10px] uppercase tracking-wider text-kasi-grey">
            <tr>
              <th className="pb-2 font-normal">Time</th>
              <th className="pb-2 font-normal">Customer</th>
              <th className="pb-2 font-normal">Service</th>
              <th className="pb-2 font-normal">Staff</th>
              <th className="pb-2 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {BOOKINGS.map((b) => (
              <tr
                key={b.id}
                className="cursor-pointer border-t border-kasi-border/60 hover:bg-white/5"
                onClick={() => onOpen(b)}
              >
                <td className="py-2.5">{b.time}</td>
                <td>{b.customer}</td>
                <td>{b.service}</td>
                <td>{b.staff}</td>
                <td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModuleShell>
  );
}

function CustomersPanel({
  onOpen,
}: {
  onOpen: (c: (typeof CUSTOMERS)[0]) => void;
}) {
  return (
    <ModuleShell title="Customers">
      <ul className="mt-4 space-y-2">
        {CUSTOMERS.map((c) => (
          <li key={c.name}>
            <button
              type="button"
              className="flex w-full items-center justify-between border border-kasi-border px-3 py-2.5 text-left text-sm hover:bg-white/5"
              onClick={() => onOpen(c)}
            >
              <span>
                <span className="block">{c.name}</span>
                <span className="text-[11px] text-kasi-grey">
                  Last visit {c.last} · {c.count} bookings
                </span>
              </span>
              <span className="text-[11px] text-kasi-green">{c.status}</span>
            </button>
          </li>
        ))}
      </ul>
    </ModuleShell>
  );
}

function CatalogPanel() {
  return (
    <ModuleShell title="Catalog / Services">
      <ul className="mt-4 space-y-2">
        {CATALOG.map((c) => (
          <li
            key={c.name}
            className="flex items-center justify-between border border-kasi-border px-3 py-2.5 text-sm"
          >
            <span>
              <span className="block">{c.name}</span>
              <span className="text-[11px] text-kasi-grey">
                {c.category} · {c.price}
              </span>
            </span>
            <span className="text-[11px] text-kasi-grey">{c.status}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-kasi-grey">
        Editing is simulated in this demo — changes are not saved to production data.
      </p>
    </ModuleShell>
  );
}

function EventsPanel() {
  return (
    <ModuleShell title="Events">
      <ul className="mt-4 space-y-2">
        {EVENTS.map((e) => (
          <li key={e.name} className="border border-kasi-border p-3 text-sm">
            <div className="font-medium">{e.name}</div>
            <div className="mt-1 text-[11px] text-kasi-grey">
              {e.when} · {e.seats} · {e.status}
            </div>
          </li>
        ))}
      </ul>
    </ModuleShell>
  );
}

function QrPanel() {
  return (
    <ModuleShell title="QR">
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="border border-kasi-border p-4">
          <div className="text-[11px] uppercase tracking-wider text-kasi-grey">
            Campaign
          </div>
          <div className="mt-1 text-sm font-medium">Table menu QR</div>
          <p className="mt-2 text-[12px] text-kasi-grey">
            Destination: /menu · Scans this week: 214
          </p>
          <div
            className="mt-4 grid h-28 w-28 place-items-center border border-kasi-border bg-white"
            aria-hidden
          >
            <div
              className="h-20 w-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,#111 0 2px,transparent 2px 4px), repeating-linear-gradient(90deg,#111 0 2px,transparent 2px 4px)",
              }}
            />
          </div>
        </div>
        <div className="border border-kasi-border p-4 text-sm text-kasi-grey">
          QR campaigns link physical spaces (tables, posters, packaging) to a page
          on your KasiTech site — menu, booking, or feedback.
        </div>
      </div>
    </ModuleShell>
  );
}

function FeedbackPanel() {
  return (
    <ModuleShell title="Feedback">
      <ul className="mt-4 space-y-3">
        {FEEDBACK.map((f) => (
          <li key={f.customer + f.date} className="border border-kasi-border p-3">
            <div className="flex items-center justify-between text-sm">
              <span>
                {"★".repeat(f.rating)}
                <span className="ml-2">{f.customer}</span>
              </span>
              <span className="text-[11px] text-kasi-grey">
                {f.date} · {f.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-kasi-grey">{f.comment}</p>
          </li>
        ))}
      </ul>
    </ModuleShell>
  );
}

function ModuleShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl tracking-tight">{title}</h2>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function DetailDrawer({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0 z-10 flex justify-end bg-black/50">
      <div className="h-full w-full max-w-sm border-l border-kasi-border bg-[#121212] p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl">{title}</h3>
          <button type="button" className="text-sm text-kasi-grey" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-kasi-border/50 py-2">
      <dt className="text-kasi-grey">{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}
