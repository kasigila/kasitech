import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
  type PDFImage,
} from "pdf-lib";
import QRCode from "qrcode";
import { PRICE_BOOK_VERSION } from "@/commercial/types";
import { displayItemPrice } from "@/commercial/catalog/presentation";
import {
  FAQ_ENTRIES,
  WEB_BASELINE_INCLUDED,
  buildBundleGuides,
  buildCapabilityGuides,
  buildCareGuides,
  buildKbGuides,
  buildPackageGuides,
  formatMoney,
  type BundleGuide,
  type CapabilityGuide,
  type PackageGuide,
  type PlanGuide,
} from "@/commercial/catalog/buying-guide-content";
import {
  CATALOG_QR_TARGETS,
  DEMO_STUDIO_ORIGIN,
} from "@/demo-studio/configuration/deep-link";

const PAGE = { w: 595.28, h: 841.89 };
const M = 48;
const QR_SIZE = 72;
const CONTENT_RIGHT = PAGE.w - M - QR_SIZE - 16; // leave room for QR
const BLACK = rgb(0.035, 0.035, 0.035);
const IVORY = rgb(0.957, 0.949, 0.918);
const LIME = rgb(0.78, 1, 0);
const GREY = rgb(0.38, 0.38, 0.36);
const MUTED = rgb(0.55, 0.55, 0.52);
const RULE = rgb(0.88, 0.86, 0.82);
const SOFT = rgb(0.97, 0.96, 0.94);

type Ctx = {
  pdf: PDFDocument;
  font: PDFFont;
  fontBold: PDFFont;
  page: PDFPage;
  y: number;
  section: string;
};

type TocEntry = { label: string; page: PDFPage };

type QrCache = Map<string, PDFImage>;

/**
 * Commercial Catalog V2 — buying guide from KT-PB-2026.1.
 * Glance lists first, then detailed breakdowns with readable QR codes.
 */
export async function buildCatalogPdf(): Promise<Buffer> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`KasiTech Services & Pricing | ${PRICE_BOOK_VERSION}`);
  pdf.setAuthor("KasiTech");
  pdf.setSubject("Commercial buying guide");
  pdf.setCreator("KasiTech");
  pdf.setKeywords([PRICE_BOOK_VERSION, "catalog", "Tanzania"]);

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const qrCache: QrCache = new Map();
  const toc: TocEntry[] = [];

  const mark = (label: string, pg: PDFPage) => {
    toc.push({ label, page: pg });
  };

  cover(pdf, font, fontBold);

  // Placeholder TOC / how-to page (filled after we know destinations)
  const tocPage = pdf.addPage([PAGE.w, PAGE.h]);
  paintHeader(tocPage, font, fontBold, "How to read this guide");

  // —— Packages: glance then detail ——
  {
    const packages = buildPackageGuides();
    let ctx = page(pdf, font, fontBold, "Website packages");
    mark("Website packages - at a glance", ctx.page);
    h1(ctx, "Website packages");
    p(
      ctx,
      "Every serious digital presence starts with a website package. Scan prices below, then flip for full inclusions and a live Demo Studio QR for each package.",
    );
    space(ctx, 10);
    label(ctx, "AT A GLANCE");
    for (const g of packages) {
      glanceRow(ctx, g.item.name, displayItemPrice(g.item), g.idealFor);
    }
    space(ctx, 12);
    label(ctx, "WEBSITE BASELINE (INCLUDED IN WEB-ONE THROUGH WEB-SIG)");
    for (const b of WEB_BASELINE_INCLUDED) bullet(ctx, b);
    space(ctx, 8);
    p(
      ctx,
      "Custom Platform is quoted separately. Domain registration and hosting are usually third-party costs.",
      8,
    );
    space(ctx, 6);
    p(ctx, "Full breakdown of each package follows.", 9);
    foot(ctx);

    for (const g of packages) {
      ctx = page(pdf, font, fontBold, "Website packages");
      mark(`${g.item.name} package detail`, ctx.page);
      await writePackageDetail(ctx, g, qrCache);
      foot(ctx);
    }
  }

  // —— Bundles: glance then detail ——
  {
    const bundles = buildBundleGuides();
    let ctx = page(pdf, font, fontBold, "Popular bundles");
    mark("Popular bundles - at a glance", ctx.page);
    h1(ctx, "Popular bundles");
    p(
      ctx,
      "Bundles group the services customers usually need together. Scan prices below, then flip for component prices, totals, and savings when they apply.",
    );
    space(ctx, 10);
    label(ctx, "AT A GLANCE");
    for (const b of bundles) {
      glanceRow(ctx, b.name, b.bundlePriceLabel, b.valueProp);
    }
    space(ctx, 8);
    p(ctx, "Full breakdown of each bundle follows.", 9);
    foot(ctx);

    for (const b of bundles) {
      ctx = page(pdf, font, fontBold, "Popular bundles");
      mark(`${b.name} detail`, ctx.page);
      await writeBundleDetail(ctx, b, qrCache);
      foot(ctx);
    }
  }

  // —— Capabilities: glance then detail ——
  {
    const caps = buildCapabilityGuides();
    let ctx = page(pdf, font, fontBold, "Popular capabilities");
    mark("Popular capabilities - at a glance", ctx.page);
    h1(ctx, "Popular capabilities");
    p(
      ctx,
      "Add capabilities to a package or use them inside a bundle. If something is already included or absorbed, you are not charged again for that inclusion.",
    );
    space(ctx, 10);
    label(ctx, "AT A GLANCE");
    for (const g of caps) {
      glanceRow(ctx, g.item.name, displayItemPrice(g.item), g.valueProp);
    }
    space(ctx, 8);
    p(ctx, "Full documentation for each capability follows.", 9);
    foot(ctx);

    for (const g of caps) {
      ctx = page(pdf, font, fontBold, "Popular capabilities");
      mark(`${g.item.name} detail`, ctx.page);
      await writeCapabilityDetail(ctx, g, qrCache);
      foot(ctx);
    }
  }

  // —— Care: glance then detail ——
  {
    const plans = buildCareGuides();
    let ctx = page(pdf, font, fontBold, "Website Care");
    mark("Website Care - at a glance", ctx.page);
    h1(ctx, "What is Website Care?");
    p(
      ctx,
      "A website is not finished at launch. Content changes, security needs attention, and small improvements appear. Website Care is the commercial relationship for ongoing maintenance after launch.",
    );
    space(ctx, 6);
    p(
      ctx,
      "Exact hours, response times, and backup allowances are confirmed in your quotation. This catalog lists approved plan names and prices only - we do not invent entitlements.",
    );
    space(ctx, 10);
    label(ctx, "AT A GLANCE");
    for (const g of plans) {
      glanceRow(ctx, g.item.name, displayItemPrice(g.item), g.whoFor);
    }
    space(ctx, 8);
    p(ctx, "Plan details follow.", 9);
    foot(ctx);

    for (const g of plans) {
      ctx = page(pdf, font, fontBold, "Website Care");
      mark(`${g.item.name} detail`, ctx.page);
      await writePlanDetail(ctx, g, qrCache);
      foot(ctx);
    }
  }

  // —— KB: glance then detail ——
  {
    const plans = buildKbGuides();
    let ctx = page(pdf, font, fontBold, "KasiTech Business");
    mark("KasiTech Business - at a glance", ctx.page);
    h1(ctx, "What is KasiTech Business?");
    p(
      ctx,
      "KasiTech Business transforms a website into a business management platform - so owners can manage website content, analytics, bookings, customers, catalog/services, feedback, QR experiences, locations, and day-to-day operations from one place.",
    );
    space(ctx, 6);
    p(
      ctx,
      "Only approved modules are documented. Launch unlocks website and analytics basics. Growth unlocks the fuller operator set. Pro, Scale, and Enterprise are commercial tiers - additional modules beyond Growth are scoped with KasiTech, not invented here.",
    );
    space(ctx, 10);
    label(ctx, "AT A GLANCE");
    for (const g of plans) {
      glanceRow(ctx, g.item.name, displayItemPrice(g.item), g.whoFor);
    }
    space(ctx, 8);
    p(ctx, "Plan details follow.", 9);
    foot(ctx);

    for (const g of plans) {
      ctx = page(pdf, font, fontBold, "KasiTech Business");
      mark(`${g.item.name} detail`, ctx.page);
      await writePlanDetail(ctx, g, qrCache);
      foot(ctx);
    }
  }

  // QR index
  {
    let ctx = page(pdf, font, fontBold, "See it live");
    mark("See it live - QR index", ctx.page);
    h1(ctx, "See it live");
    p(
      ctx,
      "Scan a QR code or open the link. Demo Studio loads the matching fictional business, applies the package or bundle, calculates the live price, and shows what customers experience.",
    );
    space(ctx, 8);
    p(ctx, `Base: ${DEMO_STUDIO_ORIGIN}/demo-studio`, 8);
    space(ctx, 14);

    let col = 0;
    let rowTop = ctx.y;
    for (const t of CATALOG_QR_TARGETS) {
      const img = await embedQr(pdf, qrCache, t.url);
      if (col === 0 && ctx.y < 150) {
        foot(ctx);
        ctx = page(pdf, font, fontBold, "See it live");
        rowTop = ctx.y;
      }
      const x = col === 0 ? M : PAGE.w / 2 + 4;
      if (col === 0) rowTop = ctx.y;
      const size = 80;
      // Force square draw box
      ctx.page.drawRectangle({
        x: x - 2,
        y: rowTop - size - 6,
        width: size + 4,
        height: size + 4,
        color: rgb(1, 1, 1),
        borderColor: RULE,
        borderWidth: 0.5,
      });
      ctx.page.drawImage(img, {
        x,
        y: rowTop - size - 4,
        width: size,
        height: size,
      });
      draw(ctx.page, t.label, fontBold, 8, x, rowTop - size - 18, BLACK);
      const short = t.url.replace(DEMO_STUDIO_ORIGIN, "");
      draw(ctx.page, short.slice(0, 40), font, 6, x, rowTop - size - 30, MUTED);
      col += 1;
      if (col === 2) {
        col = 0;
        ctx.y = rowTop - size - 48;
      }
    }
    if (col === 1) ctx.y = rowTop - 140;
    foot(ctx);
  }

  // FAQ
  {
    let ctx = page(pdf, font, fontBold, "FAQ");
    mark("FAQ", ctx.page);
    h1(ctx, "Frequently asked questions");
    space(ctx, 8);
    for (const f of FAQ_ENTRIES) {
      ctx = ensure(ctx, 70);
      draw(ctx.page, f.q, fontBold, 10, M, ctx.y, BLACK);
      ctx.y -= 14;
      p(ctx, f.a, 9);
      space(ctx, 8);
    }
    foot(ctx);
  }

  // Journey
  {
    const pg = pdf.addPage([PAGE.w, PAGE.h]);
    mark("Your journey", pg);
    pg.drawRectangle({ x: 0, y: 0, width: PAGE.w, height: PAGE.h, color: BLACK });
    pg.drawRectangle({ x: 0, y: PAGE.h - 8, width: PAGE.w, height: 8, color: LIME });
    draw(pg, "Your journey with KasiTech", fontBold, 22, M, PAGE.h - 100, IVORY);
    const steps = [
      ["1. Choose", "Pick a package, bundle, or capability from this catalog."],
      ["2. Configure", "Open Demo Studio - see the live fictional site and price."],
      ["3. Approve", "Receive a formal quotation. Nothing starts without written approval."],
      ["4. Build", "We design and build the agreed scope."],
      ["5. Launch", "Go live with QA, domain connection, and launch support."],
      ["6. Grow", "Add Care, KasiTech Business, and new capabilities over time."],
    ];
    let y = PAGE.h - 150;
    for (const [t, d] of steps) {
      draw(pg, t, fontBold, 12, M, y, LIME);
      draw(pg, d, font, 10, M, y - 16, MUTED);
      y -= 48;
    }
    draw(pg, "Demo Studio sits in step 2 - Configure.", font, 10, M, y - 10, IVORY);
    draw(pg, DEMO_STUDIO_ORIGIN + "/demo-studio", fontBold, 11, M, y - 36, LIME);
    draw(
      pg,
      `${PRICE_BOOK_VERSION}  |  All prices in TSh  |  kasitechinnovations.com`,
      font,
      8,
      M,
      48,
      GREY,
    );
    draw(
      pg,
      "This catalog is a commercial reference - not a quotation or invoice.",
      font,
      8,
      M,
      34,
      MUTED,
    );
  }

  // Fill TOC / how-to with skip links now that pages exist
  fillHowToAndToc(tocPage, pdf, font, fontBold, toc);

  return Buffer.from(await pdf.save());
}

async function writePackageDetail(
  ctx: Ctx,
  g: PackageGuide,
  qr: QrCache,
) {
  productHeader(ctx, g.item.name, displayItemPrice(g.item));
  field(ctx, "VALUE", g.valueProp);
  field(ctx, "WHAT IT DOES", g.whatItDoes);
  label(ctx, "WHAT IS INCLUDED");
  for (const line of g.included) bullet(ctx, line);
  field(ctx, "IDEAL FOR", g.idealFor);
  field(ctx, "COMMONLY USED BY", g.commonlyUsedBy);
  if (g.timeline) field(ctx, "TYPICAL TIMELINE", g.timeline);
  await seeLive(ctx, g.seeLiveUrl, qr);
  if (g.notes) field(ctx, "NOTES", g.notes);
}

async function writeBundleDetail(ctx: Ctx, b: BundleGuide, qr: QrCache) {
  productHeader(ctx, b.name, b.bundlePriceLabel);
  field(ctx, "WHAT THIS BUNDLE IS", b.valueProp);
  field(ctx, "WHY THESE SERVICES BELONG TOGETHER", b.whyTogether);
  label(
    ctx,
    b.showSavings
      ? "WHAT IS INCLUDED (WITH STANDALONE PRICES)"
      : "WHAT IS INCLUDED",
  );
  for (const c of b.components) {
    bullet(
      ctx,
      b.showSavings
        ? `${c.name}  -  normally ${c.priceLabel}`
        : `${c.name}  -  ${c.priceLabel} as a standalone service`,
    );
  }
  for (const e of b.entitlements) {
    bullet(ctx, `${e} (included in this bundle - not a separate catalog charge)`);
  }
  space(ctx, 6);
  field(ctx, "BUNDLE PRICE", b.bundlePriceLabel);
  if (
    b.showSavings &&
    b.standaloneTotalTsh != null &&
    b.savingsTsh != null &&
    b.savingsTsh > 0
  ) {
    field(ctx, "TOTAL IF PURCHASED SEPARATELY", formatMoney(b.standaloneTotalTsh));
    field(ctx, "YOU SAVE", formatMoney(b.savingsTsh));
  } else if (b.pricingNote) {
    field(ctx, "PRICING NOTE", b.pricingNote);
  }
  await seeLive(ctx, b.seeLiveUrl, qr);
}

async function writeCapabilityDetail(
  ctx: Ctx,
  g: CapabilityGuide,
  qr: QrCache,
) {
  productHeader(ctx, g.item.name, displayItemPrice(g.item));
  field(ctx, "PURPOSE", g.valueProp);
  field(ctx, "WHAT IT DOES", g.whatItDoes);
  label(ctx, "INCLUDED FUNCTIONALITY");
  for (const line of g.included) bullet(ctx, line);
  field(ctx, "IDEAL FOR", g.idealFor);
  field(ctx, "COMMONLY USED BY", g.commonlyUsedBy);
  field(ctx, "RELATED CAPABILITIES", g.related.join(" | "));
  field(ctx, "EXAMPLE WORKFLOW", g.workflow);
  await seeLive(ctx, g.seeLiveUrl, qr);
  if (g.notes) field(ctx, "NOTES", g.notes);
}

async function writePlanDetail(ctx: Ctx, g: PlanGuide, qr: QrCache) {
  productHeader(ctx, g.item.name, displayItemPrice(g.item));
  field(ctx, "VALUE", g.valueProp);
  field(ctx, "WHO IT IS FOR", g.whoFor);
  label(ctx, "INCLUDED");
  for (const line of g.included) bullet(ctx, line);
  field(ctx, "WHEN TO UPGRADE", g.whenUpgrade);
  await seeLive(ctx, g.seeLiveUrl, qr);
  if (g.notes) field(ctx, "NOTES", g.notes);
}

function cover(pdf: PDFDocument, font: PDFFont, fontBold: PDFFont) {
  const pg = pdf.addPage([PAGE.w, PAGE.h]);
  pg.drawRectangle({ x: 0, y: 0, width: PAGE.w, height: PAGE.h, color: BLACK });
  pg.drawRectangle({ x: 0, y: PAGE.h - 10, width: PAGE.w, height: 10, color: LIME });
  pg.drawRectangle({ x: 0, y: 0, width: 8, height: PAGE.h, color: LIME });
  draw(pg, "KasiTech", fontBold, 40, M + 8, PAGE.h - 160, IVORY);
  draw(pg, "SERVICES & PRICING", font, 13, M + 8, PAGE.h - 188, LIME);
  draw(pg, "Commercial buying guide", font, 12, M + 8, PAGE.h - 230, IVORY);
  draw(pg, "Understand what we sell, what each service does,", font, 11, M + 8, PAGE.h - 270, MUTED);
  draw(pg, "what is included, who it is for, how pieces relate,", font, 11, M + 8, PAGE.h - 286, MUTED);
  draw(pg, "how much it costs, and how to see it live -", font, 11, M + 8, PAGE.h - 302, MUTED);
  draw(pg, "without guessing.", font, 11, M + 8, PAGE.h - 318, MUTED);
  draw(pg, PRICE_BOOK_VERSION, fontBold, 11, M + 8, 80, LIME);
  draw(pg, "All prices in Tanzanian Shillings (TSh)", font, 9, M + 8, 62, GREY);
  draw(pg, "kasitechinnovations.com  |  Dar es Salaam", font, 9, M + 8, 46, GREY);
}

function paintHeader(
  pg: PDFPage,
  font: PDFFont,
  fontBold: PDFFont,
  section: string,
) {
  pg.drawRectangle({ x: 0, y: PAGE.h - 34, width: PAGE.w, height: 34, color: BLACK });
  pg.drawRectangle({ x: 0, y: PAGE.h - 34, width: 5, height: 34, color: LIME });
  draw(pg, "KasiTech", fontBold, 8, M, PAGE.h - 20, LIME);
  draw(pg, section.toUpperCase(), font, 7, M + 58, PAGE.h - 20, IVORY);
}

function fillHowToAndToc(
  tocPage: PDFPage,
  pdf: PDFDocument,
  font: PDFFont,
  fontBold: PDFFont,
  toc: TocEntry[],
) {
  let y = PAGE.h - 58;
  draw(tocPage, "How to read this guide", fontBold, 18, M, y, BLACK);
  y -= 8;
  tocPage.drawRectangle({ x: M, y, width: 36, height: 2, color: LIME });
  y -= 20;

  const intro =
    "This is KasiTech's commercial reference manual - not a brochure and not a technical manual. Every product is documented so you can decide with confidence.";
  for (const line of wrap(intro, font, 9, PAGE.w - M * 2)) {
    draw(tocPage, line, font, 9, M, y, GREY);
    y -= 13;
  }
  y -= 8;

  draw(tocPage, "HOW SECTIONS ARE ORGANISED", fontBold, 7, M, y, MUTED);
  y -= 12;
  for (const line of [
    "1. At a glance - all items with prices on one page",
    "2. Detail pages - inclusions, who it is for, and a Demo Studio QR",
    "Scan prices first. When something stands out, flip to its detail page.",
  ]) {
    draw(tocPage, `- ${line}`, font, 8, M, y, GREY);
    y -= 12;
  }
  y -= 10;

  draw(tocPage, "SKIP TO A SECTION", fontBold, 7, M, y, MUTED);
  y -= 14;

  // Prefer high-level section starts (glance pages + major sections)
  const skipLabels = [
    "Website packages - at a glance",
    "Popular bundles - at a glance",
    "Popular capabilities - at a glance",
    "Website Care - at a glance",
    "KasiTech Business - at a glance",
    "See it live - QR index",
    "FAQ",
    "Your journey",
  ];

  for (const label of skipLabels) {
    const entry = toc.find((t) => t.label === label);
    if (!entry) continue;
    const pageNum = pdf.getPages().indexOf(entry.page) + 1;
    const display = label.replace(" - at a glance", "").replace(" - QR index", "");
    const text = `${display}`;
    const pageLabel = `p. ${pageNum}`;
    draw(tocPage, text, fontBold, 10, M, y, BLACK);
    const pw = font.widthOfTextAtSize(pageLabel, 10);
    draw(tocPage, pageLabel, font, 10, PAGE.w - M - pw, y, MUTED);

    // Clickable link to destination page
    addInternalLink(tocPage, M, y - 2, PAGE.w - M * 2, 14, entry.page);

    y -= 18;
    if (y < 80) break;
  }

  y -= 8;
  draw(tocPage, "SEE IT LIVE", fontBold, 7, M, y, MUTED);
  y -= 12;
  const live =
    `Open ${DEMO_STUDIO_ORIGIN}/demo-studio with the links or QR codes in this guide. Demo Studio selects the matching configuration and shows live pricing.`;
  for (const line of wrap(live, font, 8, PAGE.w - M * 2)) {
    draw(tocPage, line, font, 8, M, y, GREY);
    y -= 11;
  }
  y -= 10;
  const note =
    "Formal quotations confirm final scope, compatibility, timeline, third-party fees, taxes, and commercial terms before commencement. This catalog is not an invoice.";
  for (const line of wrap(note, font, 8, PAGE.w - M * 2)) {
    draw(tocPage, line, font, 8, M, y, MUTED);
    y -= 11;
  }

  const pageNum = pdf.getPages().indexOf(tocPage) + 1;
  draw(
    tocPage,
    `${PRICE_BOOK_VERSION}  |  All prices in TSh  |  kasitechinnovations.com`,
    font,
    7,
    M,
    28,
    MUTED,
  );
  const n = String(pageNum);
  draw(tocPage, n, font, 7, PAGE.w - M - font.widthOfTextAtSize(n, 7), 28, MUTED);
}

function addInternalLink(
  fromPage: PDFPage,
  x: number,
  y: number,
  w: number,
  h: number,
  destPage: PDFPage,
) {
  const link = fromPage.doc.context.register(
    fromPage.doc.context.obj({
      Type: "Annot",
      Subtype: "Link",
      Rect: [x, y, x + w, y + h],
      Border: [0, 0, 0],
      C: [0.78, 1, 0],
      Dest: [destPage.ref, "XYZ", null, PAGE.h - 40, null],
    }),
  );
  fromPage.node.addAnnot(link);
}

async function embedQr(
  pdf: PDFDocument,
  cache: QrCache,
  url: string,
): Promise<PDFImage> {
  const hit = cache.get(url);
  if (hit) return hit;
  const dataUrl = await QRCode.toDataURL(url, {
    width: 256,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#090909", light: "#FFFFFF" },
  });
  const raw = Buffer.from(dataUrl.split(",")[1]!, "base64");
  const img = await pdf.embedPng(raw);
  cache.set(url, img);
  return img;
}

function page(
  pdf: PDFDocument,
  font: PDFFont,
  fontBold: PDFFont,
  section: string,
): Ctx {
  const pg = pdf.addPage([PAGE.w, PAGE.h]);
  paintHeader(pg, font, fontBold, section);
  return { pdf, font, fontBold, page: pg, y: PAGE.h - 58, section };
}

function ensure(ctx: Ctx, need: number): Ctx {
  if (ctx.y - need >= 56) return ctx;
  foot(ctx);
  const next = page(ctx.pdf, ctx.font, ctx.fontBold, ctx.section);
  ctx.page = next.page;
  ctx.y = next.y;
  return ctx;
}

function sanitize(text: string): string {
  return text
    .replace(/\u2018|\u2019|\u02BC/g, "'")
    .replace(/\u201C|\u201D/g, '"')
    .replace(/\u2013|\u2014/g, "-")
    .replace(/\u2022/g, "-")
    .replace(/\u00B7|\u2022/g, "|")
    .replace(/\u2192/g, "->")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "");
}

function draw(
  page: PDFPage,
  text: string,
  font: PDFFont,
  size: number,
  x: number,
  y: number,
  color: ReturnType<typeof rgb>,
) {
  const clean = sanitize(text);
  if (!clean) return;
  page.drawText(clean, { x, y, size, font, color });
}

function space(ctx: Ctx, n: number) {
  ctx.y -= n;
}

function h1(ctx: Ctx, t: string) {
  draw(ctx.page, t, ctx.fontBold, 18, M, ctx.y, BLACK);
  ctx.y -= 8;
  ctx.page.drawRectangle({ x: M, y: ctx.y, width: 36, height: 2, color: LIME });
  ctx.y -= 18;
}

function label(ctx: Ctx, t: string) {
  ensure(ctx, 20);
  draw(ctx.page, t, ctx.fontBold, 7, M, ctx.y, MUTED);
  ctx.y -= 12;
}

function p(ctx: Ctx, text: string, size = 9, maxWidth = PAGE.w - M * 2) {
  const lines = wrap(text, ctx.font, size, maxWidth);
  for (const line of lines) {
    ensure(ctx, size + 4);
    draw(ctx.page, line, ctx.font, size, M, ctx.y, GREY);
    ctx.y -= size + 4;
  }
}

function bullet(ctx: Ctx, text: string) {
  const lines = wrap(text, ctx.font, 8, PAGE.w - M * 2 - 12);
  ensure(ctx, 12 * lines.length);
  draw(ctx.page, "-", ctx.font, 8, M, ctx.y, LIME);
  for (const line of lines) {
    draw(ctx.page, line, ctx.font, 8, M + 10, ctx.y, GREY);
    ctx.y -= 11;
  }
}

function field(ctx: Ctx, labelText: string, value: string) {
  ensure(ctx, 28);
  draw(ctx.page, labelText, ctx.fontBold, 7, M, ctx.y, MUTED);
  ctx.y -= 11;
  p(ctx, value, 9, CONTENT_RIGHT - M);
  space(ctx, 4);
}

function productHeader(ctx: Ctx, name: string, price: string) {
  ensure(ctx, 40);
  ctx.page.drawRectangle({
    x: M,
    y: ctx.y - 8,
    width: PAGE.w - M * 2,
    height: 28,
    color: SOFT,
  });
  draw(ctx.page, name, ctx.fontBold, 12, M + 8, ctx.y, BLACK);
  const pw = ctx.fontBold.widthOfTextAtSize(sanitize(price), 10);
  draw(ctx.page, price, ctx.fontBold, 10, PAGE.w - M - 8 - pw, ctx.y, BLACK);
  ctx.y -= 28;
}

function glanceRow(ctx: Ctx, name: string, price: string, blurb: string) {
  ensure(ctx, 34);
  draw(ctx.page, name, ctx.fontBold, 10, M, ctx.y, BLACK);
  const pw = ctx.fontBold.widthOfTextAtSize(sanitize(price), 10);
  draw(ctx.page, price, ctx.fontBold, 10, PAGE.w - M - pw, ctx.y, BLACK);
  ctx.y -= 13;
  const oneLine = wrap(blurb, ctx.font, 8, PAGE.w - M * 2)[0] ?? "";
  draw(ctx.page, oneLine, ctx.font, 8, M, ctx.y, MUTED);
  ctx.y -= 6;
  ctx.page.drawLine({
    start: { x: M, y: ctx.y },
    end: { x: PAGE.w - M, y: ctx.y },
    thickness: 0.4,
    color: RULE,
  });
  ctx.y -= 10;
}

async function seeLive(ctx: Ctx, url: string, qr: QrCache) {
  ensure(ctx, QR_SIZE + 36);
  const img = await embedQr(ctx.pdf, qr, url);
  const qrX = PAGE.w - M - QR_SIZE;
  const qrY = ctx.y - QR_SIZE;

  // White square pad so the code stays crisp and unstretched
  ctx.page.drawRectangle({
    x: qrX - 3,
    y: qrY - 3,
    width: QR_SIZE + 6,
    height: QR_SIZE + 6,
    color: rgb(1, 1, 1),
    borderColor: RULE,
    borderWidth: 0.6,
  });
  ctx.page.drawImage(img, {
    x: qrX,
    y: qrY,
    width: QR_SIZE,
    height: QR_SIZE,
  });

  draw(ctx.page, "SEE IT LIVE", ctx.fontBold, 7, M, ctx.y, MUTED);
  ctx.y -= 12;
  const short = url.replace(DEMO_STUDIO_ORIGIN, "kasitechinnovations.com");
  const lines = wrap(short, ctx.font, 8, CONTENT_RIGHT - M - 8);
  for (const line of lines.slice(0, 3)) {
    draw(ctx.page, line, ctx.font, 8, M, ctx.y, GREY);
    ctx.y -= 11;
  }
  draw(ctx.page, "Scan the QR code to open this build in Demo Studio.", ctx.font, 7, M, ctx.y, MUTED);
  // Move below QR block
  ctx.y = Math.min(ctx.y - 8, qrY - 14);
}

function foot(ctx: Ctx) {
  const pageNum = ctx.pdf.getPages().indexOf(ctx.page) + 1;
  draw(
    ctx.page,
    `${PRICE_BOOK_VERSION}  |  All prices in TSh  |  kasitechinnovations.com`,
    ctx.font,
    7,
    M,
    28,
    MUTED,
  );
  const n = String(pageNum);
  draw(
    ctx.page,
    n,
    ctx.font,
    7,
    PAGE.w - M - ctx.font.widthOfTextAtSize(n, 7),
    28,
    MUTED,
  );
}

function wrap(text: string, font: PDFFont, size: number, max: number): string[] {
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
