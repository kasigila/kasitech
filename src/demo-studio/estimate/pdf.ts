import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
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

/**
 * Project Estimate PDF — pdf-lib (no AFM/fontkit filesystem dependency).
 * Production-safe on Vercel.
 */
export async function buildProjectEstimatePdf(
  input: EstimatePdfInput,
): Promise<Buffer> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  let page = pdf.addPage([595.28, 841.89]); // A4
  const margin = 50;
  let y = 841.89 - margin;
  const maxWidth = 595.28 - margin * 2;
  const black = rgb(0.04, 0.04, 0.04);
  const grey = rgb(0.35, 0.35, 0.35);
  const dark = rgb(0.15, 0.15, 0.15);

  const ensureSpace = (need: number) => {
    if (y - need < margin) {
      page = pdf.addPage([595.28, 841.89]);
      y = 841.89 - margin;
    }
  };

  const write = (
    text: string,
    size: number,
    color = dark,
    bold = false,
    gap = 14,
  ) => {
    ensureSpace(gap + 4);
    const f = bold ? fontBold : font;
    const lines = wrap(text, f, size, maxWidth);
    for (const line of lines) {
      ensureSpace(gap);
      page.drawText(line, { x: margin, y: y - size, size, font: f, color });
      y -= gap;
    }
  };

  const at = input.generatedAt ?? new Date();
  const snap = input.snapshot;

  pdf.setTitle(`KasiTech Project Estimate · ${input.configurationId}`);
  pdf.setSubject(`Price Book ${snap.priceBookVersion}`);
  pdf.setProducer("KasiTech Demo Studio");
  pdf.setCreator("KasiTech");

  write("KasiTech", 18, black, true, 22);
  write("PROJECT ESTIMATE", 11, grey, false, 16);
  write(`Configuration: ${input.configurationId}`, 9, dark, false, 12);
  write(`Date: ${at.toISOString().slice(0, 10)}`, 9, dark, false, 12);
  write(`Industry: ${industryLabel(input.industry)}`, 9, dark, false, 12);
  write(`Price Book: ${snap.priceBookVersion}`, 9, dark, false, 12);
  if (snap.priceBookVersion !== PRICE_BOOK_VERSION) {
    write(
      `Created with ${snap.priceBookVersion} — totals preserved from saved snapshot (not live reprice).`,
      9,
      rgb(0.55, 0, 0),
      false,
      12,
    );
  }
  y -= 8;
  write("Build summary", 12, black, true, 16);
  if (input.packageCode) write(`Website package: ${input.packageCode}`, 9);
  if (input.bundleCode) write(`Bundle: ${input.bundleCode}`, 9);
  write(`Delivery: ${input.delivery}`, 9);
  const del = estimateDelivery(input.packageCode, input.delivery, at);
  write(`Estimated delivery: ${del.baselineLabel}`, 9);
  write(del.note, 8, grey, false, 11);
  y -= 6;
  write("Charge lines", 12, black, true, 16);
  for (const c of snap.charges) {
    const bill =
      c.billing === "MONTHLY"
        ? "/month"
        : c.billing === "ANNUAL"
          ? "/year"
          : c.billing === "ONE_TIME"
            ? " one-time"
            : ` ${c.billing}`;
    write(`${c.name} — ${formatTsh(c.amountTsh)}${bill}`, 9, dark, false, 12);
  }
  y -= 6;
  write("Totals", 12, black, true, 16);
  write(`One-time: ${formatTsh(snap.totals.oneTimeTsh)}`, 10, black, true, 14);
  write(`Monthly: ${formatTsh(snap.totals.monthlyTsh)}/month`, 10, black, true, 14);
  write(`Annual: ${formatTsh(snap.totals.annualTsh)}/year`, 10, black, true, 14);
  if (snap.totals.estimatedFirst12MonthsTsh != null) {
    write(
      `Estimated first 12 months: ${formatTsh(snap.totals.estimatedFirst12MonthsTsh)}`,
      10,
      black,
      true,
      14,
    );
  }
  if (snap.totals.thirdPartyDisclosed) {
    write(
      "Third-party costs (domain, hosting, external services) are disclosed separately and confirmed before approval.",
      8,
      grey,
      false,
      11,
    );
  }
  if (snap.totals.customQuoteRequired) {
    write(
      "Some items require a custom quote and are not included in numeric totals.",
      8,
      grey,
      false,
      11,
    );
  }
  y -= 12;
  write(DISCLAIMER, 8, grey, false, 11);
  write("kasitechinnovations.com · Demo Studio estimate", 8, grey, false, 11);

  const bytes = await pdf.save();
  return Buffer.from(bytes);
}

function wrap(
  text: string,
  font: { widthOfTextAtSize: (t: string, s: number) => number },
  size: number,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}
