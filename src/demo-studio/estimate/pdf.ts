import PDFDocument from "pdfkit";
import { formatTsh, PRICE_BOOK_VERSION } from "@/commercial";
import type { CommercialSnapshot, DeliveryLevel } from "@/commercial";
import { estimateDelivery } from "../configuration/delivery-calendar";
import type { DemoIndustryId } from "../types";
import { ALL_INDUSTRIES } from "../industries/businesses";

const DISCLAIMER =
  "This document is a project estimate and does not constitute a final quotation or invoice. Final scope, compatibility, timeline, third-party fees, applicable taxes and commercial terms are confirmed by KasiTech before commencement.";

export type EstimatePdfInput = {
  configurationId: string;
  industry: DemoIndustryId;
  packageCode: string | null;
  bundleCode: string | null;
  delivery: DeliveryLevel;
  snapshot: CommercialSnapshot;
  generatedAt?: Date;
};

function industryLabel(id: DemoIndustryId): string {
  return ALL_INDUSTRIES.find((i) => i.id === id)?.label ?? id;
}

export async function buildProjectEstimatePdf(
  input: EstimatePdfInput,
): Promise<Buffer> {
  const doc = new PDFDocument({ margin: 50, size: "A4" });
  const chunks: Buffer[] = [];
  doc.on("data", (c) => chunks.push(c as Buffer));

  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });

  const at = input.generatedAt ?? new Date();
  const snap = input.snapshot;

  doc.fillColor("#090909");
  doc.fontSize(18).text("KasiTech", { continued: false });
  doc.fontSize(11).fillColor("#666").text("PROJECT ESTIMATE");
  doc.moveDown(0.5);
  doc.fontSize(9).fillColor("#333");
  doc.text(`Configuration: ${input.configurationId}`);
  doc.text(`Date: ${at.toISOString().slice(0, 10)}`);
  doc.text(`Industry: ${industryLabel(input.industry)}`);
  doc.text(`Price Book: ${snap.priceBookVersion}`);
  if (snap.priceBookVersion !== PRICE_BOOK_VERSION) {
    doc.fillColor("#990000").text(
      `Created with ${snap.priceBookVersion} — totals preserved from saved snapshot (not live reprice).`,
    );
  }
  doc.moveDown();

  doc.fillColor("#090909").fontSize(12).text("Build summary");
  doc.fontSize(9).fillColor("#333");
  if (input.packageCode) doc.text(`Website package: ${input.packageCode}`);
  if (input.bundleCode) doc.text(`Bundle: ${input.bundleCode}`);
  doc.text(`Delivery: ${input.delivery}`);
  const del = estimateDelivery(input.packageCode, input.delivery, at);
  doc.text(`Estimated delivery: ${del.baselineLabel}`);
  doc.text(del.note);
  doc.moveDown();

  doc.fillColor("#090909").fontSize(12).text("Charge lines");
  doc.fontSize(9).fillColor("#333");
  for (const c of snap.charges) {
    const bill =
      c.billing === "MONTHLY"
        ? "/month"
        : c.billing === "ANNUAL"
          ? "/year"
          : c.billing === "ONE_TIME"
            ? " one-time"
            : ` ${c.billing}`;
    doc.text(`${c.name} — ${formatTsh(c.amountTsh)}${bill}`);
  }
  doc.moveDown();

  doc.fillColor("#090909").fontSize(12).text("Totals");
  doc.fontSize(10).fillColor("#111");
  doc.text(`One-time: ${formatTsh(snap.totals.oneTimeTsh)}`);
  doc.text(`Monthly: ${formatTsh(snap.totals.monthlyTsh)}/month`);
  doc.text(`Annual: ${formatTsh(snap.totals.annualTsh)}/year`);
  if (snap.totals.estimatedFirst12MonthsTsh != null) {
    doc.text(
      `Estimated first 12 months: ${formatTsh(snap.totals.estimatedFirst12MonthsTsh)}`,
    );
  }
  if (snap.totals.thirdPartyDisclosed) {
    doc.moveDown(0.3);
    doc
      .fontSize(9)
      .fillColor("#555")
      .text(
        "Third-party costs (domain, hosting, external services) are disclosed separately and confirmed before approval.",
      );
  }
  if (snap.totals.customQuoteRequired) {
    doc
      .fontSize(9)
      .fillColor("#555")
      .text("Some items require a custom quote and are not included in numeric totals.");
  }

  doc.moveDown(1.5);
  doc.fontSize(8).fillColor("#666").text(DISCLAIMER, { align: "left" });
  doc.moveDown(0.5);
  doc.text("kasitechinnovations.com · Demo Studio estimate");

  doc.end();
  return done;
}
