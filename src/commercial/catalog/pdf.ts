import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { loadPriceBook } from "@/commercial/price-book/load";
import {
  PACKAGE_POSITIONING,
  catalogMeta,
  displayItemPrice,
  getBundleViews,
  getWebsitePackages,
} from "@/commercial/catalog/presentation";
import { PRICE_BOOK_VERSION, type CatalogItem } from "@/commercial/types";
import { formatTsh } from "@/commercial/money";

const PAGE = { w: 595.28, h: 841.89 }; // A4
const M = 48;
const BLACK = rgb(0.035, 0.035, 0.035);
const IVORY = rgb(0.957, 0.949, 0.918);
const LIME = rgb(0.78, 1, 0);
const GREY = rgb(0.42, 0.42, 0.4);
const MUTED = rgb(0.55, 0.55, 0.52);
const RULE = rgb(0.88, 0.86, 0.82);

/** Highlight codes for the client-facing “capabilities” pages — approved SKUs only. */
const HIGHLIGHT_CODES = [
  "BKG-APT",
  "BKG-STAFF",
  "BKG-REST",
  "BKG-TOUR",
  "PAY-STD",
  "ECOM-START",
  "REST-MENU",
  "REST-AMENU",
  "TOUR-CAT",
  "RE-LIST",
  "LOC-GBP",
  "LOC-REV",
  "SEO-FND",
  "SEO-PRO",
  "LANG-ENSW",
  "ADD-INQ",
];

const CARE_CODES = ["CARE-ESS", "CARE-STD", "CARE-BUS", "CARE-PRO", "CARE-PRI"];
const KB_CODES = ["KB-LAUNCH", "KB-GROW", "KB-PRO", "KB-SCALE", "KB-ENT"];

type Ctx = {
  pdf: PDFDocument;
  font: PDFFont;
  fontBold: PDFFont;
  page: PDFPage;
  y: number;
};

/**
 * Client-share Services & Pricing catalog — intentional document from KT-PB-2026.1.
 * Designed for meetings and WhatsApp/email sharing (not a webpage print).
 */
export async function buildCatalogPdf(): Promise<Buffer> {
  const book = loadPriceBook();
  const meta = catalogMeta();
  const packages = getWebsitePackages(book);
  const bundles = getBundleViews(book);
  const today = new Date().toISOString().slice(0, 10);

  const pdf = await PDFDocument.create();
  pdf.setTitle(`KasiTech Services & Pricing · ${PRICE_BOOK_VERSION}`);
  pdf.setAuthor("KasiTech");
  pdf.setSubject("Client services and pricing catalog");
  pdf.setCreator("KasiTech");
  pdf.setKeywords([PRICE_BOOK_VERSION, "Tanzania", "pricing"]);

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  // —— Cover ——
  {
    const page = pdf.addPage([PAGE.w, PAGE.h]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE.w, height: PAGE.h, color: BLACK });
    page.drawRectangle({
      x: 0,
      y: PAGE.h - 12,
      width: PAGE.w,
      height: 12,
      color: LIME,
    });
    page.drawRectangle({
      x: 0,
      y: 0,
      width: 8,
      height: PAGE.h,
      color: LIME,
    });

    drawText(page, "KasiTech", fontBold, 42, M + 8, PAGE.h - 160, IVORY);
    drawText(page, "SERVICES & PRICING", font, 14, M + 8, PAGE.h - 190, LIME);
    drawText(
      page,
      "A clear catalog of websites, features,",
      font,
      13,
      M + 8,
      PAGE.h - 260,
      IVORY,
    );
    drawText(
      page,
      "bundles, and ongoing care for Tanzanian",
      font,
      13,
      M + 8,
      PAGE.h - 278,
      IVORY,
    );
    drawText(page, "businesses.", font, 13, M + 8, PAGE.h - 296, IVORY);

    drawText(page, meta.tagline, font, 11, M + 8, PAGE.h - 360, MUTED);
    drawText(
      page,
      `${PRICE_BOOK_VERSION}  ·  All prices in TSh  ·  ${today}`,
      font,
      9,
      M + 8,
      72,
      MUTED,
    );
    drawText(
      page,
      "kasitechinnovations.com  ·  Dar es Salaam",
      font,
      9,
      M + 8,
      56,
      GREY,
    );
  }

  // —— Intro ——
  {
    const ctx = newPage(pdf, font, fontBold, "Welcome");
    body(
      ctx,
      "This catalog shows approved KasiTech offerings and prices from our current Price Book. Scope is fixed for the stated package or service unless marked Custom Quote. Nothing extra is billed without your written approval.",
    );
    space(ctx, 16);
    sectionTitle(ctx, "How to use this");
    bullet(ctx, "Start with a website package — or an industry bundle if it fits.");
    bullet(ctx, "Add features your customers need (booking, payments, shop, SEO…).");
    bullet(ctx, "Choose Care and KasiTech Business if you want ongoing support.");
    bullet(ctx, "We’ll confirm a formal quotation before any work begins.");
    space(ctx, 18);
    sectionTitle(ctx, "Also useful");
    bullet(ctx, "Live pricing: kasitechinnovations.com/pricing");
    bullet(ctx, "Configure a build visually: kasitechinnovations.com/demo-studio");
    space(ctx, 24);
    noteBox(
      ctx,
      meta.disclaimer +
        " Formal quotations confirm final scope, timeline, third-party fees, taxes, and commercial terms.",
    );
    footer(ctx, 2);
  }

  // —— Website packages ——
  {
    let ctx = newPage(pdf, font, fontBold, "Website packages");
    body(
      ctx,
      "Every serious digital presence starts here. Pick the package that matches how much structure and content your business needs.",
    );
    space(ctx, 14);

    for (const p of packages) {
      if (ctx.y < 140) {
        footer(ctx, pdf.getPageCount());
        ctx = newPage(pdf, font, fontBold, "Website packages");
      }
      const pos = PACKAGE_POSITIONING[p.code];
      packageCard(ctx, p, pos?.bestFor, pos?.plain);
      space(ctx, 10);
    }
    footer(ctx, pdf.getPageCount());
  }

  // —— Bundles ——
  {
    let ctx = newPage(pdf, font, fontBold, "Popular bundles");
    body(
      ctx,
      "Bundles combine a website with the features most businesses in that category need — often with approved savings versus buying each piece alone.",
    );
    space(ctx, 14);

    for (const b of bundles) {
      if (ctx.y < 130) {
        footer(ctx, pdf.getPageCount());
        ctx = newPage(pdf, font, fontBold, "Popular bundles");
      }
      const includes = b.chargeComponents.map((c) => c.name).join(" · ");
      const save =
        b.savings?.showSavings && b.savings.savingsTsh != null
          ? `Save ${formatTsh(b.savings.savingsTsh)} vs buying separately`
          : null;
      rowCard(
        ctx,
        b.item.name,
        b.priceLabel,
        b.item.clientDescription,
        includes ? `Includes: ${includes}` : null,
        save,
      );
      space(ctx, 10);
    }
    footer(ctx, pdf.getPageCount());
  }

  // —— Capabilities ——
  {
    let ctx = newPage(pdf, font, fontBold, "Popular capabilities");
    body(
      ctx,
      "Add what your customers need. Prices below are standalone; some are included in packages or absorbed by bundles when you choose those.",
    );
    space(ctx, 12);

    for (const code of HIGHLIGHT_CODES) {
      const item = book.itemByCode.get(code);
      if (!item || !item.active) continue;
      if (ctx.y < 90) {
        footer(ctx, pdf.getPageCount());
        ctx = newPage(pdf, font, fontBold, "Popular capabilities");
      }
      simpleRow(ctx, item.name, displayItemPrice(item), item.clientDescription);
      space(ctx, 6);
    }
    footer(ctx, pdf.getPageCount());
  }

  // —— Care + KB ——
  {
    let ctx = newPage(pdf, font, fontBold, "Care & KasiTech Business");
    sectionTitle(ctx, "Website Care");
    body(
      ctx,
      "Ongoing care plans keep your site healthy after launch. Exact inclusions for your plan are confirmed in your quotation.",
    );
    space(ctx, 10);
    for (const code of CARE_CODES) {
      const item = book.itemByCode.get(code);
      if (!item) continue;
      if (ctx.y < 80) {
        footer(ctx, pdf.getPageCount());
        ctx = newPage(pdf, font, fontBold, "Care & KasiTech Business");
      }
      simpleRow(ctx, item.name, displayItemPrice(item), item.clientDescription);
      space(ctx, 6);
    }

    space(ctx, 16);
    sectionTitle(ctx, "KasiTech Business");
    body(
      ctx,
      "Owner tools for your website and operations — from Launch analytics through Growth modules such as bookings and customers.",
    );
    space(ctx, 10);
    for (const code of KB_CODES) {
      const item = book.itemByCode.get(code);
      if (!item) continue;
      if (ctx.y < 80) {
        footer(ctx, pdf.getPageCount());
        ctx = newPage(pdf, font, fontBold, "Care & KasiTech Business");
      }
      simpleRow(ctx, item.name, displayItemPrice(item), item.clientDescription);
      space(ctx, 6);
    }
    footer(ctx, pdf.getPageCount());
  }

  // —— Closing ——
  {
    const page = pdf.addPage([PAGE.w, PAGE.h]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE.w, height: PAGE.h, color: BLACK });
    page.drawRectangle({
      x: 0,
      y: PAGE.h - 8,
      width: PAGE.w,
      height: 8,
      color: LIME,
    });

    drawText(page, "Ready when you are", fontBold, 28, M, PAGE.h - 180, IVORY);
    drawText(
      page,
      "Tell us about your business — or build a live estimate",
      font,
      12,
      M,
      PAGE.h - 220,
      MUTED,
    );
    drawText(page, "in Demo Studio and send it to us.", font, 12, M, PAGE.h - 238, MUTED);

    drawText(page, "kasitechinnovations.com", fontBold, 14, M, PAGE.h - 300, LIME);
    drawText(page, "/pricing", font, 12, M, PAGE.h - 322, IVORY);
    drawText(page, "/demo-studio", font, 12, M, PAGE.h - 340, IVORY);

    drawText(
      page,
      "This document is a pricing catalog, not a quotation or invoice.",
      font,
      8,
      M,
      100,
      GREY,
    );
    drawText(
      page,
      `${PRICE_BOOK_VERSION}  ·  © KasiTech  ·  Dar es Salaam, Tanzania`,
      font,
      8,
      M,
      82,
      MUTED,
    );
  }

  const bytes = await pdf.save();
  return Buffer.from(bytes);
}

function newPage(
  pdf: PDFDocument,
  font: PDFFont,
  fontBold: PDFFont,
  title: string,
): Ctx {
  const page = pdf.addPage([PAGE.w, PAGE.h]);
  page.drawRectangle({
    x: 0,
    y: PAGE.h - 36,
    width: PAGE.w,
    height: 36,
    color: BLACK,
  });
  page.drawRectangle({
    x: 0,
    y: PAGE.h - 36,
    width: 6,
    height: 36,
    color: LIME,
  });
  drawText(page, "KasiTech", fontBold, 9, M, PAGE.h - 22, LIME);
  drawText(page, title.toUpperCase(), font, 8, M + 70, PAGE.h - 22, IVORY);
  return { pdf, font, fontBold, page, y: PAGE.h - 64 };
}

function drawText(
  page: PDFPage,
  text: string,
  font: PDFFont,
  size: number,
  x: number,
  y: number,
  color: ReturnType<typeof rgb>,
) {
  page.drawText(text, { x, y, size, font, color });
}

function ensure(ctx: Ctx, need: number) {
  if (ctx.y - need < 56) {
    footer(ctx, ctx.pdf.getPageCount());
    const next = newPage(ctx.pdf, ctx.font, ctx.fontBold, "Continued");
    ctx.page = next.page;
    ctx.y = next.y;
  }
}

function space(ctx: Ctx, n: number) {
  ctx.y -= n;
}

function sectionTitle(ctx: Ctx, title: string) {
  ensure(ctx, 28);
  drawText(ctx.page, title, ctx.fontBold, 13, M, ctx.y, BLACK);
  ctx.y -= 6;
  ctx.page.drawRectangle({
    x: M,
    y: ctx.y,
    width: 40,
    height: 2,
    color: LIME,
  });
  ctx.y -= 16;
}

function body(ctx: Ctx, text: string) {
  const lines = wrap(text, ctx.font, 10, PAGE.w - M * 2);
  for (const line of lines) {
    ensure(ctx, 14);
    drawText(ctx.page, line, ctx.font, 10, M, ctx.y, GREY);
    ctx.y -= 14;
  }
}

function bullet(ctx: Ctx, text: string) {
  const lines = wrap(text, ctx.font, 10, PAGE.w - M * 2 - 14);
  ensure(ctx, 14 * lines.length);
  drawText(ctx.page, "•", ctx.font, 10, M, ctx.y, LIME);
  for (let i = 0; i < lines.length; i++) {
    drawText(ctx.page, lines[i]!, ctx.font, 10, M + 14, ctx.y, GREY);
    ctx.y -= 14;
  }
}

function noteBox(ctx: Ctx, text: string) {
  const lines = wrap(text, ctx.font, 8, PAGE.w - M * 2 - 24);
  const h = lines.length * 11 + 20;
  ensure(ctx, h + 8);
  ctx.page.drawRectangle({
    x: M,
    y: ctx.y - h + 8,
    width: PAGE.w - M * 2,
    height: h,
    color: rgb(0.96, 0.95, 0.92),
  });
  let ty = ctx.y - 8;
  for (const line of lines) {
    drawText(ctx.page, line, ctx.font, 8, M + 12, ty, GREY);
    ty -= 11;
  }
  ctx.y -= h + 8;
}

function packageCard(
  ctx: Ctx,
  item: CatalogItem,
  bestFor?: string,
  plain?: string,
) {
  const price = displayItemPrice(item);
  const desc = plain || item.clientDescription;
  const best = bestFor || "";
  const descLines = wrap(desc, ctx.font, 9, PAGE.w - M * 2 - 24);
  const bestLines = best ? wrap(`Best for: ${best}`, ctx.font, 8, PAGE.w - M * 2 - 24) : [];
  const h = 28 + descLines.length * 12 + bestLines.length * 11 + 16;

  ensure(ctx, h + 4);
  const bottom = ctx.y - h;
  ctx.page.drawRectangle({
    x: M,
    y: bottom,
    width: PAGE.w - M * 2,
    height: h,
    borderColor: RULE,
    borderWidth: 1,
  });
  ctx.page.drawRectangle({
    x: M,
    y: bottom,
    width: 3,
    height: h,
    color: LIME,
  });

  drawText(ctx.page, item.name, ctx.fontBold, 11, M + 14, ctx.y - 16, BLACK);
  const pw = ctx.fontBold.widthOfTextAtSize(price, 10);
  drawText(
    ctx.page,
    price,
    ctx.fontBold,
    10,
    PAGE.w - M - 14 - pw,
    ctx.y - 16,
    BLACK,
  );

  let ty = ctx.y - 34;
  for (const line of descLines) {
    drawText(ctx.page, line, ctx.font, 9, M + 14, ty, GREY);
    ty -= 12;
  }
  for (const line of bestLines) {
    drawText(ctx.page, line, ctx.font, 8, M + 14, ty, MUTED);
    ty -= 11;
  }
  ctx.y = bottom - 4;
}

function rowCard(
  ctx: Ctx,
  name: string,
  price: string,
  desc: string,
  includes: string | null,
  save: string | null,
) {
  const descLines = wrap(desc, ctx.font, 9, PAGE.w - M * 2 - 24);
  const incLines = includes
    ? wrap(includes, ctx.font, 8, PAGE.w - M * 2 - 24)
    : [];
  const h =
    28 +
    descLines.length * 12 +
    incLines.length * 11 +
    (save ? 14 : 0) +
    14;

  ensure(ctx, h + 4);
  const bottom = ctx.y - h;
  ctx.page.drawRectangle({
    x: M,
    y: bottom,
    width: PAGE.w - M * 2,
    height: h,
    borderColor: RULE,
    borderWidth: 1,
  });

  drawText(ctx.page, name, ctx.fontBold, 11, M + 14, ctx.y - 16, BLACK);
  const pw = ctx.fontBold.widthOfTextAtSize(price, 10);
  drawText(
    ctx.page,
    price,
    ctx.fontBold,
    10,
    PAGE.w - M - 14 - pw,
    ctx.y - 16,
    BLACK,
  );

  let ty = ctx.y - 34;
  for (const line of descLines) {
    drawText(ctx.page, line, ctx.font, 9, M + 14, ty, GREY);
    ty -= 12;
  }
  for (const line of incLines) {
    drawText(ctx.page, line, ctx.font, 8, M + 14, ty, MUTED);
    ty -= 11;
  }
  if (save) {
    drawText(ctx.page, save, ctx.fontBold, 8, M + 14, ty, rgb(0.35, 0.5, 0));
  }
  ctx.y = bottom - 4;
}

function simpleRow(
  ctx: Ctx,
  name: string,
  price: string,
  desc: string,
) {
  const descLines = wrap(desc, ctx.font, 8, PAGE.w - M * 2 - 8);
  ensure(ctx, 20 + descLines.length * 10);
  drawText(ctx.page, name, ctx.fontBold, 10, M, ctx.y, BLACK);
  const pw = ctx.fontBold.widthOfTextAtSize(price, 9);
  drawText(ctx.page, price, ctx.fontBold, 9, PAGE.w - M - pw, ctx.y, BLACK);
  ctx.y -= 12;
  ctx.page.drawLine({
    start: { x: M, y: ctx.y + 4 },
    end: { x: PAGE.w - M, y: ctx.y + 4 },
    thickness: 0.4,
    color: RULE,
  });
  for (const line of descLines.slice(0, 2)) {
    drawText(ctx.page, line, ctx.font, 8, M, ctx.y, MUTED);
    ctx.y -= 10;
  }
}

function footer(ctx: Ctx, pageNum: number) {
  drawText(
    ctx.page,
    `${PRICE_BOOK_VERSION}  ·  kasitechinnovations.com`,
    ctx.font,
    7,
    M,
    28,
    MUTED,
  );
  const label = String(pageNum);
  const w = ctx.font.widthOfTextAtSize(label, 7);
  drawText(ctx.page, label, ctx.font, 7, PAGE.w - M - w, 28, MUTED);
}

function wrap(
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const word of words) {
    const next = cur ? `${cur} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > maxWidth && cur) {
      lines.push(cur);
      cur = word;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines.length ? lines : [""];
}
