import type { PDFFont, PDFImage, PDFPage } from "pdf-lib";
import { C, M, PAGE, QR, type Color } from "./theme";
import { drawIcon, iconForCode, type IconKind } from "./icons";

export function sanitize(text: string): string {
  return text
    .replace(/\u2018|\u2019|\u02BC/g, "'")
    .replace(/\u201C|\u201D/g, '"')
    .replace(/\u2013|\u2014/g, "-")
    .replace(/\u2022/g, "-")
    .replace(/\u00B7/g, "|")
    .replace(/\u2192/g, "->")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "");
}

export function wrap(
  text: string,
  font: PDFFont,
  size: number,
  max: number,
): string[] {
  const words = sanitize(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const word of words) {
    const next = cur ? `${cur} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > max && cur) {
      lines.push(cur);
      cur = word;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines.length ? lines : [""];
}

export function drawText(
  page: PDFPage,
  text: string,
  font: PDFFont,
  size: number,
  x: number,
  y: number,
  color: Color,
) {
  const clean = sanitize(text);
  if (!clean) return;
  page.drawText(clean, { x, y, size, font, color });
}

/** Split workflow strings that already use "->" — presentation only. */
export function workflowSteps(workflow: string): string[] {
  return sanitize(workflow)
    .split(/->/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.length > 28 ? `${s.slice(0, 26)}…` : s));
}

export function chipLabels(text: string): string[] {
  let t = sanitize(text).trim();
  if (!t) return [];

  // Prefer the list after an em/en dash or colon ("… — a, b, or c")
  const parts = t.split(/\s+[—–]\s+|\s+-\s+|:\s+/);
  if (parts.length > 1) {
    const tail = parts[parts.length - 1]!;
    if (tail.includes(",") || /\bor\b/i.test(tail)) t = tail;
  }

  return t
    .split(/,/)
    .map((s) => s.trim())
    .map((s) =>
      s
        .replace(/^(and|or)\s+/i, "")
        .replace(/\s+(and|or)$/i, "")
        .replace(/\s+\bor\b\s+/gi, " ")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .map((s) => s.replace(/^[,.\s]+|[,.\s]+$/g, ""))
    .filter((s) => s.length > 1 && !/^(and|or)$/i.test(s))
    .slice(0, 6);
}

export type Fonts = { regular: PDFFont; bold: PDFFont };

export function paintHeader(
  page: PDFPage,
  fonts: Fonts,
  section: string,
) {
  page.drawRectangle({
    x: 0,
    y: PAGE.h - 36,
    width: PAGE.w,
    height: 36,
    color: C.black,
  });
  page.drawRectangle({
    x: 0,
    y: PAGE.h - 36,
    width: 4,
    height: 36,
    color: C.lime,
  });
  drawText(page, "KasiTech", fonts.bold, 9, M, PAGE.h - 22, C.lime);
  drawText(
    page,
    section.toUpperCase(),
    fonts.regular,
    7,
    M + 62,
    PAGE.h - 22,
    C.ivory,
  );
}

export function paintFooter(
  page: PDFPage,
  fonts: Fonts,
  pageNum: number,
  version: string,
) {
  drawText(
    page,
    `${version}  ·  All prices in TSh  ·  kasitechinnovations.com`,
    fonts.regular,
    6.5,
    M,
    18,
    C.muted,
  );
  const n = String(pageNum);
  drawText(
    page,
    n,
    fonts.regular,
    7,
    PAGE.w - M - fonts.regular.widthOfTextAtSize(n, 7),
    18,
    C.muted,
  );
}

/** Soft product card shell that occupies a fixed editorial slot. */
export function drawCardShell(
  page: PDFPage,
  x: number,
  yBottom: number,
  w: number,
  h: number,
) {
  page.drawRectangle({
    x,
    y: yBottom,
    width: w,
    height: h,
    color: C.soft,
  });
  page.drawRectangle({
    x,
    y: yBottom + h - 3,
    width: 28,
    height: 3,
    color: C.lime,
  });
}

export function drawSectionLabel(
  page: PDFPage,
  fonts: Fonts,
  label: string,
  x: number,
  y: number,
) {
  drawText(page, label.toUpperCase(), fonts.bold, 6, x, y, C.muted);
}

/** Lime price treatment. */
export function drawPrice(
  page: PDFPage,
  fonts: Fonts,
  price: string,
  xRight: number,
  y: number,
  size = 13,
) {
  const clean = sanitize(price);
  const w = fonts.bold.widthOfTextAtSize(clean, size);
  drawText(page, clean, fonts.bold, size, xRight - w, y, C.limeDeep);
}

export function drawSavingsBadge(
  page: PDFPage,
  fonts: Fonts,
  label: string,
  x: number,
  y: number,
) {
  const padX = 6;
  const text = sanitize(label);
  const tw = fonts.bold.widthOfTextAtSize(text, 7);
  page.drawRectangle({
    x,
    y: y - 2,
    width: tw + padX * 2,
    height: 14,
    color: C.black,
  });
  drawText(page, text, fonts.bold, 7, x + padX, y + 2, C.lime);
  return tw + padX * 2;
}

/** Outline checklist — not bullet lists. */
export function drawChecklist(
  page: PDFPage,
  fonts: Fonts,
  items: string[],
  x: number,
  yTop: number,
  maxW: number,
  maxItems: number,
): number {
  let y = yTop;
  for (const raw of items.slice(0, maxItems)) {
    drawIcon(page, "check", x, y + 2, 9, C.limeDeep);
    const lines = wrap(raw, fonts.regular, 7.5, maxW - 14);
    for (let i = 0; i < lines.length; i++) {
      drawText(page, lines[i]!, fonts.regular, 7.5, x + 12, y - i * 9, C.ink);
    }
    y -= Math.max(11, lines.length * 9 + 2);
  }
  return y;
}

/** Vertical workflow diagram from existing "->" copy. */
export function drawWorkflowDiagram(
  page: PDFPage,
  fonts: Fonts,
  steps: string[],
  x: number,
  yTop: number,
  maxW: number,
): number {
  let y = yTop;
  const show = steps.slice(0, 5);
  for (let i = 0; i < show.length; i++) {
    const step = show[i]!;
    page.drawRectangle({
      x,
      y: y - 2,
      width: 4,
      height: 12,
      color: C.lime,
    });
    const lines = wrap(step, fonts.regular, 7, maxW - 10);
    for (let li = 0; li < lines.length; li++) {
      drawText(page, lines[li]!, fonts.regular, 7, x + 10, y - li * 9, C.ink);
    }
    y -= Math.max(14, lines.length * 9 + 4);
    if (i < show.length - 1) {
      drawIcon(page, "arrowDown", x + 8, y + 10, 10, C.limeDeep);
      y -= 8;
    }
  }
  return y;
}

/**
 * Chips that never clip text. Long labels wrap inside a taller pill;
 * pills wrap to the next row when the row is full.
 *
 * PDF text `y` is the glyph baseline (not the top of the box) — the
 * rectangle must be placed around that baseline or labels float above the pills.
 */
export function drawChips(
  page: PDFPage,
  fonts: Fonts,
  chips: string[],
  x: number,
  y: number,
  maxW: number,
): number {
  let cx = x;
  let cy = y;
  let rowH = 0;
  const gapX = 6;
  const gapY = 6;
  const padX = 8;
  const padY = 4;
  const fontSize = 6.5;
  const lineH = 9;
  const ascent = fontSize * 0.78;

  for (const raw of chips) {
    const label = sanitize(raw);
    if (!label) continue;

    const lines = wrap(
      label,
      fonts.regular,
      fontSize,
      Math.max(40, maxW - padX * 2),
    );
    const textW = Math.max(
      ...lines.map((l) => fonts.regular.widthOfTextAtSize(l, fontSize)),
      0,
    );
    const w = Math.min(maxW, Math.ceil(textW + padX * 2));
    const heightFor = (baselineY: number) => {
      const top = baselineY + ascent + padY;
      const bottom = baselineY - (lines.length - 1) * lineH - padY;
      return { top, bottom, height: top - bottom };
    };

    let box = heightFor(cy);
    if (cx > x && cx + w > x + maxW) {
      cx = x;
      cy -= rowH + gapY;
      rowH = 0;
      box = heightFor(cy);
    }

    page.drawRectangle({
      x: cx,
      y: box.bottom,
      width: w,
      height: box.height,
      borderColor: C.rule,
      borderWidth: 0.6,
      color: C.white,
    });

    let ty = cy;
    for (const line of lines) {
      drawText(page, line, fonts.regular, fontSize, cx + padX, ty, C.grey);
      ty -= lineH;
    }

    cx += w + gapX;
    rowH = Math.max(rowH, box.height);
  }

  return cy - rowH + ascent + padY;
}

/** Premium Demo Studio panel with QR. */
export function drawDemoStudioPanel(
  page: PDFPage,
  fonts: Fonts,
  opts: {
    x: number;
    yBottom: number;
    w: number;
    h: number;
    productName: string;
    url: string;
    qr: PDFImage;
    displayUrl: string;
  },
) {
  const { x, yBottom, w, h, productName, qr, displayUrl } = opts;
  page.drawRectangle({
    x,
    y: yBottom,
    width: w,
    height: h,
    color: C.black,
  });
  page.drawRectangle({
    x,
    y: yBottom,
    width: 3,
    height: h,
    color: C.lime,
  });

  drawIcon(page, "monitor", x + 12, yBottom + h - 10, 12, C.lime);
  drawText(
    page,
    "DEMO STUDIO",
    fonts.bold,
    7,
    x + 28,
    yBottom + h - 18,
    C.lime,
  );
  drawText(
    page,
    "Preview available  ·  Automatic configuration",
    fonts.regular,
    6,
    x + 12,
    yBottom + h - 30,
    C.muted,
  );

  const nameLines = wrap(productName, fonts.bold, 8, w - QR - 36);
  let ty = yBottom + h - 46;
  for (const line of nameLines.slice(0, 2)) {
    drawText(page, line, fonts.bold, 8, x + 12, ty, C.ivory);
    ty -= 10;
  }

  const short = sanitize(displayUrl);
  const urlLines = wrap(short, fonts.regular, 6, w - QR - 36);
  ty -= 4;
  for (const line of urlLines.slice(0, 2)) {
    drawText(page, line, fonts.regular, 6, x + 12, ty, C.muted);
    ty -= 8;
  }

  const qrPad = 4;
  const qrX = x + w - QR - 12;
  const qrY = yBottom + (h - QR) / 2;
  page.drawRectangle({
    x: qrX - qrPad,
    y: qrY - qrPad,
    width: QR + qrPad * 2,
    height: QR + qrPad * 2,
    color: C.white,
  });
  page.drawImage(qr, { x: qrX, y: qrY, width: QR, height: QR });
}

export function drawProductTitle(
  page: PDFPage,
  fonts: Fonts,
  opts: {
    icon: IconKind;
    name: string;
    price: string;
    x: number;
    yTop: number;
    w: number;
    priceSize?: number;
  },
): number {
  const { icon, name, price, x, yTop, w, priceSize = 14 } = opts;
  drawIcon(page, icon, x, yTop, 16, C.ink);
  const priceClean = sanitize(price);
  const pw = fonts.bold.widthOfTextAtSize(priceClean, priceSize);
  drawText(page, priceClean, fonts.bold, priceSize, x + w - pw, yTop - 14, C.limeDeep);

  const nameMax = w - pw - 28;
  const lines = wrap(name, fonts.bold, 12, nameMax);
  let y = yTop - 14;
  for (const line of lines.slice(0, 2)) {
    drawText(page, line, fonts.bold, 12, x + 22, y, C.black);
    y -= 14;
  }
  return y - 4;
}

export { iconForCode, drawIcon };
