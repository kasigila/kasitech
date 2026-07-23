"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DemoChrome } from "@/components/site/DemoChrome";
import { cn } from "@/lib/cn";
import {
  activityLog,
  approvals,
  commandSuggestions,
  customers,
  demoUser,
  expenses,
  formatTzs,
  homeMetrics,
  invoices as initialInvoices,
  notifications as initialNotifications,
  products as initialProducts,
  purchaseOrders as initialPurchaseOrders,
  revenueByWeek,
  revenuePrev,
  tasks as initialTasks,
  team,
  todayLabel,
  unpaidOver30,
  SPC02_PO_ID,
  SPC02_RESTOCK_QTY,
  SPC02_SKU,
  type Approval,
  type Customer,
  type CustomerStatus,
  type DemoNotification,
  type Invoice,
  type Product,
  type PurchaseOrder,
  type Task,
} from "./data";

type View =
  | "home"
  | "crm"
  | "finance"
  | "inventory"
  | "team"
  | "analytics"
  | "tasks"
  | "approvals"
  | "notifications";

type CmdPhase =
  | "closed"
  | "palette"
  | "results"
  | "preview"
  | "confirmed";

function DemoBadge() {
  return (
    <p className="font-mono text-[10px] tracking-[0.16em] text-black/40 dark:text-white/40">
      KASI CONCEPT · DEMO DATA
    </p>
  );
}

const AUTOMATION_BANNER_KEY = "kasi-automation-approved";

export function KasiFlowDemo() {
  const [view, setView] = useState<View>("home");
  const [dark, setDark] = useState(false);
  const [customerId, setCustomerId] = useState(customers[0].id);
  const [crmList, setCrmList] = useState(customers);
  const [noteDraft, setNoteDraft] = useState("");
  const [invoiceList, setInvoiceList] = useState<Invoice[]>(initialInvoices);
  const [notificationList, setNotificationList] =
    useState<DemoNotification[]>(initialNotifications);
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [poList, setPoList] = useState<PurchaseOrder[]>(initialPurchaseOrders);
  const [approvalList, setApprovalList] = useState<Approval[]>(approvals);
  const [tasksList, setTasksList] = useState<Task[]>(initialTasks);
  const [flowBanner, setFlowBanner] = useState<string | null>(null);
  const [financeTab, setFinanceTab] = useState<
    "invoices" | "payments" | "expenses" | "balances"
  >("invoices");
  const [dateRange, setDateRange] = useState<"4w" | "8w" | "ytd">("4w");
  const [compare, setCompare] = useState(true);
  const [exportMsg, setExportMsg] = useState<string | null>(null);

  // Command palette
  const [cmdPhase, setCmdPhase] = useState<CmdPhase>("closed");
  const [cmdQuery, setCmdQuery] = useState("");
  const [cmdResults, setCmdResults] = useState<Invoice[]>([]);

  const customer = crmList.find((c) => c.id === customerId) ?? crmList[0];
  const stockAlerts = productList.filter((p) => p.stock <= p.reorderAt);
  const pendingApprovals = approvalList.filter((a) => a.status === "Pending");
  const overdueOver30 = useMemo(
    () => unpaidOver30(invoiceList),
    [invoiceList],
  );

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(AUTOMATION_BANNER_KEY);
      if (raw) {
        setFlowBanner(
          "Rule from Kasi Intelligence: when new inquiry + no reply in 30 min → create CRM lead, ack, WhatsApp salesperson, follow-up +2h.",
        );
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdPhase("palette");
        setCmdQuery("");
        setCmdResults([]);
      }
      if (e.key === "Escape") setCmdPhase("closed");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(next: View) {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateStatus(status: CustomerStatus) {
    setCrmList((list) =>
      list.map((c) => (c.id === customerId ? { ...c, status } : c)),
    );
  }

  function addNote() {
    if (!noteDraft.trim()) return;
    setCrmList((list) =>
      list.map((c) =>
        c.id === customerId
          ? { ...c, notes: [noteDraft.trim(), ...c.notes] }
          : c,
      ),
    );
    setNoteDraft("");
  }

  function updateCustomerField(
    field: "email" | "phone" | "company",
    value: string,
  ) {
    setCrmList((list) =>
      list.map((c) => (c.id === customerId ? { ...c, [field]: value } : c)),
    );
  }

  function confirmReminders() {
    const ids = new Set(cmdResults.map((i) => i.id));
    const justNow = "JUST NOW";
    setInvoiceList((list) =>
      list.map((i) =>
        ids.has(i.id) ? { ...i, remindedAt: justNow } : i,
      ),
    );
    const customerNames = new Set(cmdResults.map((i) => i.customer));
    setCrmList((list) =>
      list.map((c) => {
        if (!customerNames.has(c.company)) return c;
        return {
          ...c,
          history: [
            { date: justNow, event: "Payment reminder sent (⌘K)" },
            ...c.history,
          ],
          notes: [
            `Reminder queued for overdue invoice · ${justNow}`,
            ...c.notes,
          ],
        };
      }),
    );
    setNotificationList((list) => [
      {
        id: `n-${Date.now()}`,
        text: `Payment reminders queued for ${cmdResults.length} overdue invoices`,
        urgent: false,
        at: justNow,
      },
      ...list,
    ]);
    setTasksList((list) =>
      list.map((t) =>
        t.id === "t1" ? { ...t, status: "Done" as const } : t,
      ),
    );
    setCmdPhase("closed");
    go("finance");
    setFinanceTab("invoices");
  }

  function submitSpcPoForApproval() {
    setPoList((list) =>
      list.map((po) =>
        po.id === SPC02_PO_ID ? { ...po, status: "Sent" as const } : po,
      ),
    );
    setNotificationList((list) => [
      {
        id: `n-po-${Date.now()}`,
        text: `${SPC02_PO_ID} submitted for approval (${SPC02_SKU} restock)`,
        urgent: false,
        at: "JUST NOW",
      },
      ...list,
    ]);
    go("approvals");
  }

  function createSpcPo() {
    const exists = poList.some(
      (po) => po.id === SPC02_PO_ID || po.items.includes(SPC02_SKU),
    );
    if (exists) {
      submitSpcPoForApproval();
      return;
    }
    const newPo: PurchaseOrder = {
      id: "PO-442",
      supplier: "Okello Farms",
      items: `${SPC02_SKU} × ${SPC02_RESTOCK_QTY}`,
      status: "Sent",
      total: SPC02_RESTOCK_QTY * 22000,
      date: "23 Jul 2026",
    };
    setPoList((list) => [newPo, ...list]);
    setApprovalList((list) => [
      {
        id: "ap-spc",
        title: `${newPo.id} Okello Farms`,
        requester: "Brian Owino",
        amount: newPo.total,
        status: "Pending",
      },
      ...list,
    ]);
    setNotificationList((list) => [
      {
        id: `n-po-new-${Date.now()}`,
        text: `PO created for ${SPC02_SKU} · awaiting approval`,
        urgent: true,
        at: "JUST NOW",
      },
      ...list,
    ]);
    go("approvals");
  }

  function approvePo(approvalId: string) {
    const approval = approvalList.find((a) => a.id === approvalId);
    if (!approval || approval.status !== "Pending") return;
    setApprovalList((list) =>
      list.map((a) =>
        a.id === approvalId ? { ...a, status: "Approved" as const } : a,
      ),
    );
    const poId = approval.title.split(" ")[0];
    const isSpc =
      approval.title.includes(SPC02_SKU) ||
      poId === SPC02_PO_ID ||
      approval.title.includes("Okello Farms");
    if (isSpc) {
      setPoList((list) =>
        list.map((po) =>
          po.id === poId || po.items.includes(SPC02_SKU)
            ? { ...po, status: "Received" as const }
            : po,
        ),
      );
      setProductList((list) =>
        list.map((p) =>
          p.sku === SPC02_SKU
            ? { ...p, stock: p.stock + SPC02_RESTOCK_QTY }
            : p,
        ),
      );
      setTasksList((list) =>
        list.map((t) =>
          t.id === "t2" ? { ...t, status: "Done" as const } : t,
        ),
      );
      setNotificationList((list) => [
        {
          id: `n-recv-${Date.now()}`,
          text: `${SPC02_SKU} restock received · inventory updated`,
          urgent: false,
          at: "JUST NOW",
        },
        ...list.filter((n) => n.text !== "SPC-02 stock critical"),
      ]);
    }
  }

  function runCommand(q: string) {
    const query = q.toLowerCase().trim();
    setCmdQuery(q);
    if (
      query.includes("remind") &&
      (query.includes("overdue") || query.includes("invoice"))
    ) {
      setCmdResults(overdueOver30);
      setCmdPhase("results");
      return;
    }
    if (query.includes("unpaid") && query.includes("30")) {
      setCmdResults(overdueOver30);
      setCmdPhase("results");
      return;
    }
    if (query.includes("stock")) {
      setCmdPhase("closed");
      go("inventory");
      return;
    }
    if (query.includes("approval")) {
      setCmdPhase("closed");
      go("approvals");
      return;
    }
    if (query.includes("customer")) {
      setCmdPhase("closed");
      go("crm");
      return;
    }
    if (query.includes("finance")) {
      setCmdPhase("closed");
      go("finance");
      return;
    }
    setCmdResults(overdueOver30);
    setCmdPhase("results");
  }

  const filteredSuggestions = useMemo(() => {
    if (!cmdQuery.trim()) return commandSuggestions;
    return commandSuggestions.filter((s) =>
      s.toLowerCase().includes(cmdQuery.toLowerCase()),
    );
  }, [cmdQuery]);

  const shell = dark
    ? "bg-[#111111] text-[#F2F2F2]"
    : "bg-[#F4F4F2] text-[#161616]";
  const panel = dark
    ? "border-white/10 bg-[#1A1A1A]"
    : "border-black/10 bg-white";
  const muted = dark ? "text-white/50" : "text-black/50";

  return (
    <div className={cn("min-h-screen pt-12", shell)}>
      <DemoChrome slug="kasi-flow" />

      <div className="mx-auto flex max-w-7xl">
        {/* Desktop sidebar */}
        <aside
          className={cn(
            "sticky top-12 hidden h-[calc(100vh-3rem)] w-52 shrink-0 flex-col border-r p-4 md:flex",
            dark ? "border-white/10" : "border-black/10",
          )}
        >
          <button
            type="button"
            onClick={() => go("home")}
            className="text-left text-sm font-semibold tracking-[0.14em]"
          >
            KASI FLOW
          </button>
          <DemoBadge />
          <nav className="mt-6 flex flex-1 flex-col gap-1 text-sm">
            {(
              [
                ["home", "Overview"],
                ["crm", "CRM"],
                ["finance", "Finance"],
                ["inventory", "Inventory"],
                ["team", "Team"],
                ["analytics", "Analytics"],
                ["tasks", "Tasks"],
                ["approvals", "Approvals"],
                ["notifications", "Notifications"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => go(id)}
                className={cn(
                  "rounded-md px-3 py-2 text-left",
                  view === id
                    ? "bg-[#C7FF00]/20 text-inherit"
                    : cn(muted, "hover:bg-black/5 dark:hover:bg-white/5"),
                )}
              >
                {label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              setCmdPhase("palette");
              setCmdQuery("");
            }}
            className={cn(
              "mt-2 flex items-center justify-between rounded-md border px-3 py-2 text-xs",
              panel,
            )}
          >
            <span>Command</span>
            <kbd className="font-mono text-[10px] opacity-60">⌘K</kbd>
          </button>
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            className={cn("mt-2 text-left text-xs", muted)}
          >
            {dark ? "Light mode" : "Dark mode"}
          </button>
        </aside>

        <div className="min-w-0 flex-1 pb-20 md:pb-8">
          {/* Top bar */}
          <header
            className={cn(
              "sticky top-12 z-30 flex items-center justify-between gap-3 border-b px-4 py-3 backdrop-blur md:px-6",
              dark
                ? "border-white/10 bg-[#111111]/90"
                : "border-black/10 bg-[#F4F4F2]/90",
            )}
          >
            <div className="md:hidden">
              <p className="text-sm font-semibold tracking-[0.12em]">
                KASI FLOW
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCmdPhase("palette")}
              className={cn(
                "hidden flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm sm:flex md:max-w-md",
                panel,
                muted,
              )}
            >
              <span>Search or run a command…</span>
              <kbd className="ml-auto font-mono text-[10px]">⌘K</kbd>
            </button>
            <div className="flex items-center gap-3 text-sm">
              <button
                type="button"
                className="md:hidden"
                onClick={() => setCmdPhase("palette")}
              >
                ⌘K
              </button>
              <button
                type="button"
                onClick={() => setDark((d) => !d)}
                className={cn("text-xs md:hidden", muted)}
              >
                {dark ? "Light" : "Dark"}
              </button>
              <span className={cn("hidden text-xs sm:inline", muted)}>
                {demoUser.role}
              </span>
            </div>
          </header>

          <main className="px-4 py-6 md:px-6">
            {flowBanner && (
              <div
                className={cn(
                  "mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#C7FF00]/40 bg-[#C7FF00]/10 px-4 py-3 text-sm",
                )}
              >
                <span>{flowBanner}</span>
                <div className="flex gap-2">
                  <Link
                    href="/demo/kasi-intelligence"
                    className="text-xs text-[#6a8f00] underline dark:text-[#C7FF00]"
                  >
                    Kasi Intelligence
                  </Link>
                  <button
                    type="button"
                    className="text-xs opacity-60"
                    onClick={() => {
                      setFlowBanner(null);
                      try {
                        sessionStorage.removeItem(AUTOMATION_BANNER_KEY);
                      } catch {
                        /* ignore */
                      }
                    }}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}
            {view === "home" && (
              <div>
                <DemoBadge />
                <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  GOOD MORNING, {demoUser.name.toUpperCase()}
                </h1>
                <p className={cn("mt-1 text-sm", muted)}>{todayLabel()}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {homeMetrics.map((m) => (
                    <div
                      key={m.label}
                      className={cn("rounded-xl border p-4", panel)}
                    >
                      <p className={cn("text-xs", muted)}>{m.label}</p>
                      <p className="mt-2 text-2xl font-semibold">{m.value}</p>
                      <p className="mt-1 text-xs text-[#6a8f00] dark:text-[#C7FF00]">
                        {m.delta}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                  <div className={cn("rounded-xl border p-4", panel)}>
                    <p className="text-sm font-medium">Open tasks</p>
                    <ul className="mt-3 space-y-2 text-sm">
                      {tasksList
                        .filter((t) => t.status === "Open")
                        .slice(0, 4)
                        .map((t) => (
                          <li
                            key={t.id}
                            className="flex justify-between gap-2 border-b border-black/5 py-2 dark:border-white/5"
                          >
                            <span>{t.title}</span>
                            <span className={muted}>{t.due}</span>
                          </li>
                        ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => go("tasks")}
                      className="mt-3 text-xs text-[#6a8f00] dark:text-[#C7FF00]"
                    >
                      All tasks →
                    </button>
                  </div>
                  <div className={cn("rounded-xl border p-4", panel)}>
                    <p className="text-sm font-medium">Needs attention</p>
                    <ul className="mt-3 space-y-2 text-sm">
                      <li>
                        {overdueOver30.length} unpaid invoices over 30 days
                      </li>
                      <li>{stockAlerts.length} stock alerts</li>
                      <li>{pendingApprovals.length} pending approvals</li>
                    </ul>
                    <button
                      type="button"
                      onClick={() => {
                        setCmdQuery("show unpaid invoices over 30 days");
                        runCommand("show unpaid invoices over 30 days");
                      }}
                      className="mt-4 rounded-md bg-[#C7FF00] px-3 py-2 text-xs font-medium text-black"
                    >
                      Run ⌘K unpaid invoices
                    </button>
                  </div>
                </div>
              </div>
            )}

            {view === "crm" && (
              <CrmView
                list={crmList}
                customer={customer}
                customerId={customerId}
                setCustomerId={setCustomerId}
                updateStatus={updateStatus}
                updateCustomerField={updateCustomerField}
                noteDraft={noteDraft}
                setNoteDraft={setNoteDraft}
                addNote={addNote}
                panel={panel}
                muted={muted}
              />
            )}

            {view === "finance" && (
              <div>
                <DemoBadge />
                <h1 className="mt-3 text-2xl font-semibold">Finance</h1>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(
                    [
                      "invoices",
                      "payments",
                      "expenses",
                      "balances",
                    ] as const
                  ).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFinanceTab(t)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs capitalize",
                        financeTab === t
                          ? "bg-[#C7FF00] text-black"
                          : cn("border", panel),
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className={cn("mt-4 overflow-x-auto rounded-xl border", panel)}>
                  {financeTab === "invoices" && (
                    <table className="w-full min-w-[560px] text-left text-sm">
                      <thead className={muted}>
                        <tr>
                          <th className="px-4 py-3 font-medium">Invoice</th>
                          <th className="px-4 py-3 font-medium">Customer</th>
                          <th className="px-4 py-3 font-medium">Amount</th>
                          <th className="px-4 py-3 font-medium">Status</th>
                          <th className="px-4 py-3 font-medium">Due</th>
                          <th className="px-4 py-3 font-medium">Last action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceList.map((i) => (
                          <tr
                            key={i.id}
                            className="border-t border-black/5 dark:border-white/5"
                          >
                            <td className="px-4 py-3 font-mono text-xs">
                              {i.id}
                            </td>
                            <td className="px-4 py-3">{i.customer}</td>
                            <td className="px-4 py-3">
                              {formatTzs(i.amount)}
                            </td>
                            <td className="px-4 py-3">
                              <StatusPill status={i.status} />
                            </td>
                            <td className="px-4 py-3">
                              {i.due}
                              {i.daysOverdue > 0 && (
                                <span className={cn("ml-2 text-xs", muted)}>
                                  {i.daysOverdue}d
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-xs">
                              {i.remindedAt ? (
                                <span className="font-medium text-[#6a8f00] dark:text-[#C7FF00]">
                                  Reminded · {i.remindedAt}
                                </span>
                              ) : (
                                <span className={muted}>-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {financeTab === "payments" && (
                    <ul className="divide-y divide-black/5 p-4 text-sm dark:divide-white/5">
                      {invoiceList
                        .filter((i) => i.status === "Paid")
                        .map((i) => (
                          <li
                            key={i.id}
                            className="flex justify-between py-3"
                          >
                            <span>
                              {i.id} · {i.customer}
                            </span>
                            <span>{formatTzs(i.amount)}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                  {financeTab === "expenses" && (
                    <ul className="divide-y divide-black/5 p-4 text-sm dark:divide-white/5">
                      {expenses.map((e) => (
                        <li key={e.id} className="flex justify-between py-3">
                          <span>
                            {e.category} · {e.vendor}
                            <span className={cn("ml-2 text-xs", muted)}>
                              {e.date}
                            </span>
                          </span>
                          <span>{formatTzs(e.amount)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {financeTab === "balances" && (
                    <div className="grid gap-3 p-4 sm:grid-cols-3">
                      <Metric
                        label="Cash"
                        value="TZS 18.4M"
                        muted={muted}
                      />
                      <Metric
                        label="Receivables"
                        value="TZS 9.4M"
                        muted={muted}
                      />
                      <Metric
                        label="Payables"
                        value="TZS 4.1M"
                        muted={muted}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {view === "inventory" && (
              <div>
                <DemoBadge />
                <h1 className="mt-3 text-2xl font-semibold">Inventory</h1>
                {stockAlerts.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm">
                    <span>
                      {stockAlerts.length} product
                      {stockAlerts.length === 1 ? "" : "s"} at or below reorder
                      level
                      {stockAlerts.some((p) => p.sku === SPC02_SKU)
                        ? ` · ${SPC02_SKU} critical`
                        : ""}
                    </span>
                    {stockAlerts.some((p) => p.sku === SPC02_SKU) && (
                      <button
                        type="button"
                        onClick={createSpcPo}
                        className="rounded-md bg-[#C7FF00] px-3 py-1.5 text-xs font-medium text-black"
                      >
                        Create purchase order
                      </button>
                    )}
                  </div>
                )}
                <div className={cn("mt-4 overflow-x-auto rounded-xl border", panel)}>
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead className={muted}>
                      <tr>
                        <th className="px-4 py-3 font-medium">Product</th>
                        <th className="px-4 py-3 font-medium">SKU</th>
                        <th className="px-4 py-3 font-medium">Stock</th>
                        <th className="px-4 py-3 font-medium">Supplier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList.map((p) => (
                        <tr
                          key={p.id}
                          className="border-t border-black/5 dark:border-white/5"
                        >
                          <td className="px-4 py-3">{p.name}</td>
                          <td className="px-4 py-3 font-mono text-xs">
                            {p.sku}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={
                                p.stock <= p.reorderAt
                                  ? "font-semibold text-amber-600 dark:text-amber-400"
                                  : ""
                              }
                            >
                              {p.stock}
                            </span>
                            <span className={cn("ml-1 text-xs", muted)}>
                              / reorder {p.reorderAt}
                            </span>
                          </td>
                          <td className="px-4 py-3">{p.supplier}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h2 className="mt-8 text-sm font-medium">Purchase orders</h2>
                <ul
                  className={cn(
                    "mt-3 divide-y rounded-xl border text-sm",
                    panel,
                    dark ? "divide-white/5" : "divide-black/5",
                  )}
                >
                  {poList.map((po) => (
                    <li
                      key={po.id}
                      className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
                    >
                      <span>
                        {po.id} · {po.supplier} · {po.items}
                      </span>
                      <span className={muted}>
                        {po.status} · {formatTzs(po.total)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {view === "team" && (
              <div>
                <DemoBadge />
                <h1 className="mt-3 text-2xl font-semibold">Team</h1>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {team.map((e) => (
                    <div
                      key={e.id}
                      className={cn("rounded-xl border p-4", panel)}
                    >
                      <p className="font-medium">{e.name}</p>
                      <p className={cn("text-sm", muted)}>{e.role}</p>
                      <p className="mt-3 text-xs">
                        Permissions: {e.permissions.join(", ")}
                      </p>
                      <p className={cn("mt-1 text-xs", muted)}>
                        Active {e.lastActive}
                      </p>
                    </div>
                  ))}
                </div>
                <h2 className="mt-8 text-sm font-medium">Activity</h2>
                <ul className={cn("mt-3 space-y-2 text-sm", muted)}>
                  {activityLog.map((a) => (
                    <li key={a.time + a.text}>
                      <span className="font-mono text-xs">{a.time}</span> : {" "}
                      {a.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {view === "analytics" && (
              <div>
                <DemoBadge />
                <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                  <h1 className="text-2xl font-semibold">Analytics</h1>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        ["4w", "4 weeks"],
                        ["8w", "8 weeks"],
                        ["ytd", "YTD"],
                      ] as const
                    ).map(([k, l]) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setDateRange(k)}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs",
                          dateRange === k
                            ? "bg-[#C7FF00] text-black"
                            : cn("border", panel),
                        )}
                      >
                        {l}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setCompare((c) => !c)}
                      className={cn("rounded-full border px-3 py-1.5 text-xs", panel)}
                    >
                      Compare {compare ? "on" : "off"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setExportMsg(
                          "Export queued: CSV will download in a real deployment (demo).",
                        )
                      }
                      className="rounded-full bg-[#C7FF00] px-3 py-1.5 text-xs font-medium text-black"
                    >
                      Export
                    </button>
                  </div>
                </div>
                {exportMsg && (
                  <p className="mt-3 text-sm text-[#6a8f00] dark:text-[#C7FF00]">
                    {exportMsg}
                  </p>
                )}
                <div className={cn("mt-6 rounded-xl border p-5", panel)}>
                  <p className="text-sm font-medium">
                    Revenue (TZS M) · {dateRange.toUpperCase()}
                  </p>
                  <div className="mt-6 flex h-48 items-end gap-4">
                    {revenueByWeek.map((w, i) => {
                      const max = 20;
                      const prev = revenuePrev[i]?.value ?? 0;
                      return (
                        <div
                          key={w.label}
                          className="flex flex-1 flex-col items-center gap-2"
                        >
                          <div className="flex h-40 w-full items-end justify-center gap-1">
                            {compare && (
                              <div
                                className="w-3 rounded-t bg-black/15 dark:bg-white/15"
                                style={{ height: `${(prev / max) * 100}%` }}
                                title={`Prev ${prev}M`}
                              />
                            )}
                            <div
                              className="w-4 rounded-t bg-[#C7FF00]"
                              style={{ height: `${(w.value / max) * 100}%` }}
                              title={`${w.value}M`}
                            />
                          </div>
                          <span className={cn("text-xs", muted)}>
                            {w.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {compare && (
                    <p className={cn("mt-4 text-xs", muted)}>
                      Lime = current · Grey = prior period
                    </p>
                  )}
                </div>
              </div>
            )}

            {view === "tasks" && (
              <SimpleList
                title="Tasks"
                panel={panel}
                muted={muted}
                items={tasksList.map((t) => ({
                  id: t.id,
                  primary: t.title,
                  secondary: `${t.owner} · ${t.due} · ${t.priority}`,
                  tag: t.status,
                }))}
              />
            )}

            {view === "approvals" && (
              <div>
                <DemoBadge />
                <h1 className="mt-3 text-2xl font-semibold">Approvals</h1>
                <ul className="mt-6 space-y-2">
                  {approvalList.map((a) => (
                    <li
                      key={a.id}
                      className={cn(
                        "flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm",
                        panel,
                      )}
                    >
                      <div>
                        <p className="font-medium">{a.title}</p>
                        <p className={cn("text-xs", muted)}>
                          {a.requester}
                          {a.amount ? ` · ${formatTzs(a.amount)}` : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusPill status={a.status} />
                        {a.status === "Pending" && (
                          <button
                            type="button"
                            onClick={() => {
                              approvePo(a.id);
                              go("inventory");
                            }}
                            className="rounded-md bg-[#C7FF00] px-3 py-1.5 text-xs font-medium text-black"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {view === "notifications" && (
              <div>
                <DemoBadge />
                <h1 className="mt-3 text-2xl font-semibold">Notifications</h1>
                <ul className="mt-6 space-y-2">
                  {notificationList.map((n) => (
                    <li
                      key={n.id}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-sm",
                        panel,
                        n.urgent && "border-[#C7FF00]/50",
                      )}
                    >
                      {n.urgent && (
                        <span className="mr-2 text-[10px] font-semibold tracking-wider text-[#6a8f00] dark:text-[#C7FF00]">
                          URGENT
                        </span>
                      )}
                      {n.text}
                      {n.at ? (
                        <span className={cn("ml-2 text-xs", muted)}>{n.at}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile nav */}
      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 flex border-t md:hidden",
          dark
            ? "border-white/10 bg-[#111111]/95"
            : "border-black/10 bg-[#F4F4F2]/95",
        )}
      >
        {(
          [
            ["home", "Overview"],
            ["crm", "Customers"],
            ["tasks", "Tasks"],
            ["approvals", "Approvals"],
            ["notifications", "Alerts"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => go(id)}
            className={cn(
              "flex-1 py-3 text-[10px] tracking-wide uppercase",
              view === id
                ? "text-[#6a8f00] dark:text-[#C7FF00]"
                : muted,
            )}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Command palette */}
      {cmdPhase !== "closed" && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 px-4 pt-[12vh]">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close"
            onClick={() => setCmdPhase("closed")}
          />
          <div
            className={cn(
              "relative w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl",
              dark
                ? "border-white/15 bg-[#1A1A1A] text-white"
                : "border-black/10 bg-white text-[#161616]",
            )}
          >
            {cmdPhase === "palette" && (
              <>
                <div className="flex items-center gap-2 border-b border-black/10 px-4 dark:border-white/10">
                  <span className="font-mono text-xs opacity-50">⌘K</span>
                  <input
                    autoFocus
                    className="w-full bg-transparent py-4 text-sm outline-none"
                    placeholder="show unpaid invoices over 30 days"
                    value={cmdQuery}
                    onChange={(e) => setCmdQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        runCommand(
                          cmdQuery ||
                            "show unpaid invoices over 30 days",
                        );
                    }}
                  />
                </div>
                <ul className="max-h-64 overflow-y-auto p-2 text-sm">
                  {filteredSuggestions.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => runCommand(s)}
                        className="w-full rounded-lg px-3 py-2.5 text-left hover:bg-[#C7FF00]/15"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {cmdPhase === "results" && (
              <div className="p-4">
                <p className="font-mono text-[10px] tracking-wider opacity-50">
                  RESULTS · {cmdResults.length} invoices
                </p>
                <p className="mt-1 text-sm font-medium">
                  Unpaid invoices over 30 days
                </p>
                <ul className="mt-4 max-h-56 space-y-2 overflow-y-auto text-sm">
                  {cmdResults.map((i) => (
                    <li
                      key={i.id}
                      className="flex justify-between gap-2 border-b border-black/5 py-2 dark:border-white/5"
                    >
                      <span>
                        {i.id} · {i.customer}
                      </span>
                      <span>
                        {formatTzs(i.amount)} · {i.daysOverdue}d
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setCmdPhase("closed")}
                    className="px-3 py-2 text-xs opacity-60"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => setCmdPhase("preview")}
                    className="rounded-md bg-[#C7FF00] px-3 py-2 text-xs font-medium text-black"
                  >
                    Send reminders
                  </button>
                </div>
              </div>
            )}

            {cmdPhase === "preview" && (
              <div className="p-4">
                <p className="font-mono text-[10px] tracking-wider text-amber-600 dark:text-amber-400">
                  PREVIEW · NOTHING SENT YET
                </p>
                <h2 className="mt-2 text-lg font-semibold">
                  Reminder preview
                </h2>
                <p className="mt-2 text-sm opacity-70">
                  You are about to email payment reminders to{" "}
                  {cmdResults.length} customers for invoices totaling{" "}
                  {formatTzs(
                    cmdResults.reduce((s, i) => s + i.amount, 0),
                  )}
                  .
                </p>
                <div className="mt-4 rounded-lg border border-black/10 bg-black/[0.03] p-3 text-sm dark:border-white/10 dark:bg-white/5">
                  <p className="font-medium">Subject: Payment reminder: overdue invoice</p>
                  <p className="mt-2 opacity-70">
                    Hi {"{{name}}"}, invoice {"{{id}}"} for {"{{amount}}"} is{" "}
                    {"{{days}}"} days overdue. Please arrange payment or reply
                    to discuss a plan.
                  </p>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setCmdPhase("results")}
                    className="px-3 py-2 text-xs opacity-60"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCmdPhase("confirmed")}
                    className="rounded-md bg-[#C7FF00] px-3 py-2 text-xs font-medium text-black"
                  >
                    Confirm send (demo)
                  </button>
                </div>
              </div>
            )}

            {cmdPhase === "confirmed" && (
              <div className="p-6 text-center">
                <p className="text-sm font-medium">Reminders queued</p>
                <p className="mt-2 text-sm opacity-60">
                  Demo only: no emails were sent. In production this would
                  require the same preview step.
                </p>
                <button
                  type="button"
                  onClick={() => setCmdPhase("closed")}
                  className="mt-6 rounded-md bg-[#C7FF00] px-4 py-2 text-xs font-medium text-black"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const tone =
    status === "Paid" || status === "Active" || status === "Done" || status === "Approved"
      ? "bg-[#C7FF00]/25 text-inherit"
      : status === "Overdue" || status === "At risk" || status === "Churned"
        ? "bg-red-500/15 text-red-700 dark:text-red-300"
        : "bg-black/5 dark:bg-white/10";
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-xs", tone)}>
      {status}
    </span>
  );
}

function Metric({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted: string;
}) {
  return (
    <div>
      <p className={cn("text-xs", muted)}>{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}

function SimpleList({
  title,
  items,
  panel,
  muted,
}: {
  title: string;
  items: { id: string; primary: string; secondary: string; tag: string }[];
  panel: string;
  muted: string;
}) {
  return (
    <div>
      <DemoBadge />
      <h1 className="mt-3 text-2xl font-semibold">{title}</h1>
      <ul className={cn("mt-6 divide-y rounded-xl border", panel)}>
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
          >
            <div>
              <p>{item.primary}</p>
              <p className={cn("text-xs", muted)}>{item.secondary}</p>
            </div>
            <StatusPill status={item.tag} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function CrmView({
  list,
  customer,
  customerId,
  setCustomerId,
  updateStatus,
  updateCustomerField,
  noteDraft,
  setNoteDraft,
  addNote,
  panel,
  muted,
}: {
  list: Customer[];
  customer: Customer;
  customerId: string;
  setCustomerId: (id: string) => void;
  updateStatus: (s: CustomerStatus) => void;
  updateCustomerField: (
    field: "email" | "phone" | "company",
    value: string,
  ) => void;
  noteDraft: string;
  setNoteDraft: (v: string) => void;
  addNote: () => void;
  panel: string;
  muted: string;
}) {
  return (
    <div>
      <DemoBadge />
      <h1 className="mt-3 text-2xl font-semibold">CRM</h1>
      <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <ul className={cn("rounded-xl border divide-y", panel)}>
          {list.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => setCustomerId(c.id)}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-3 text-left text-sm",
                  c.id === customerId && "bg-[#C7FF00]/15",
                )}
              >
                <span>
                  <span className="font-medium">{c.name}</span>
                  <span className={cn("block text-xs", muted)}>
                    {c.company}
                  </span>
                </span>
                <StatusPill status={c.status} />
              </button>
            </li>
          ))}
        </ul>
        <div className={cn("rounded-xl border p-5", panel)}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold">{customer.name}</h2>
              <label className="mt-3 block text-xs">
                <span className={muted}>Company</span>
                <input
                  className={cn(
                    "mt-1 block w-full rounded-md border px-2 py-1.5 text-sm",
                    panel,
                  )}
                  value={customer.company}
                  onChange={(e) =>
                    updateCustomerField("company", e.target.value)
                  }
                />
              </label>
              <label className="mt-2 block text-xs">
                <span className={muted}>Email</span>
                <input
                  className={cn(
                    "mt-1 block w-full rounded-md border px-2 py-1.5 text-sm",
                    panel,
                  )}
                  value={customer.email}
                  onChange={(e) =>
                    updateCustomerField("email", e.target.value)
                  }
                />
              </label>
              <label className="mt-2 block text-xs">
                <span className={muted}>Phone</span>
                <input
                  className={cn(
                    "mt-1 block w-full rounded-md border px-2 py-1.5 text-sm",
                    panel,
                  )}
                  value={customer.phone}
                  onChange={(e) =>
                    updateCustomerField("phone", e.target.value)
                  }
                />
              </label>
              <p className="mt-3 text-sm">
                Lifetime value {formatTzs(customer.value)}
              </p>
            </div>
            <label className="text-xs">
              <span className={muted}>Status</span>
              <select
                className={cn(
                  "mt-1 block rounded-md border px-2 py-1.5 text-sm",
                  panel,
                )}
                value={customer.status}
                onChange={(e) =>
                  updateStatus(e.target.value as CustomerStatus)
                }
              >
                {(
                  ["Lead", "Active", "At risk", "Churned"] as CustomerStatus[]
                ).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <h3 className="mt-6 text-sm font-medium">History</h3>
          <ul className={cn("mt-2 space-y-1 text-sm", muted)}>
            {customer.history.map((h) => (
              <li key={h.date + h.event}>
                {h.date}: {h.event}
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-sm font-medium">Notes</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {customer.notes.map((n) => (
              <li
                key={n}
                className="rounded-lg bg-black/[0.03] px-3 py-2 dark:bg-white/5"
              >
                {n}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <input
              className={cn(
                "flex-1 rounded-md border px-3 py-2 text-sm",
                panel,
              )}
              placeholder="Add a note"
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
            />
            <button
              type="button"
              onClick={addNote}
              className="rounded-md bg-[#C7FF00] px-3 py-2 text-xs font-medium text-black"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
