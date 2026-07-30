/**
 * Commercial Catalog V2 — Phase 3.2 visual redesign.
 * Presentation only: does not change Price Book, prices, wording, or Demo Studio URLs.
 */
import {
  PDFDocument,
  StandardFonts,
  type PDFImage,
  type PDFPage,
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
} from "@/commercial/catalog/buying-guide-content";
import { DEMO_STUDIO_ORIGIN } from "@/demo-studio/configuration/deep-link";
import {
  C,
  CARD_GAP,
  CARD_SLOT_H,
  CONTENT_BOTTOM,
  CONTENT_TOP,
  M,
  PAGE,
} from "@/commercial/catalog/visual/theme";
import {
  chipLabels,
  drawCardShell,
  drawChecklist,
  drawChips,
  drawDemoStudioPanel,
  drawPrice,
  drawProductTitle,
  drawSavingsBadge,
  drawSectionLabel,
  drawText,
  drawWorkflowDiagram,
  iconForCode,
  paintFooter,
  paintHeader,
  workflowSteps,
  wrap,
  type Fonts,
} from "@/commercial/catalog/visual/components";
import { drawIcon } from "@/commercial/catalog/visual/icons";

type QrCache = Map<string, PDFImage>;
type TocEntry = { label: string; page: PDFPage };

type Doc = {
  pdf: PDFDocument;
  fonts: Fonts;
  qr: QrCache;
  toc: TocEntry[];
};

function mark(doc: Doc, label: string, page: PDFPage) {
  doc.toc.push({ label, page });
}

export async function buildCatalogPdf(): Promise<Buffer> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`KasiTech Services & Pricing | ${PRICE_BOOK_VERSION}`);
  pdf.setAuthor("KasiTech");
  pdf.setSubject("Commercial buying guide");
  pdf.setCreator("KasiTech");
  pdf.setKeywords([PRICE_BOOK_VERSION, "catalog", "Tanzania", "Phase 3.2"]);

  const fonts: Fonts = {
    regular: await pdf.embedFont(StandardFonts.Helvetica),
    bold: await pdf.embedFont(StandardFonts.HelveticaBold),
  };
  const doc: Doc = { pdf, fonts, qr: new Map(), toc: [] };

  cover(doc);
  const tocPage = pdf.addPage([PAGE.w, PAGE.h]);
  paintHeader(tocPage, fonts, "How to read this guide");

  await writePackages(doc);
  await writeBundles(doc);
  await writeCapabilities(doc);
  writeCare(doc);
  writeKb(doc);
  writeFaq(doc);
  writeJourney(doc);

  fillHowTo(tocPage, doc);
  return Buffer.from(await pdf.save());
}

/* ───────────── Cover ───────────── */

function cover(doc: Doc) {
  const pg = doc.pdf.addPage([PAGE.w, PAGE.h]);
  pg.drawRectangle({ x: 0, y: 0, width: PAGE.w, height: PAGE.h, color: C.black });
  pg.drawRectangle({ x: 0, y: PAGE.h - 8, width: PAGE.w, height: 8, color: C.lime });
  pg.drawRectangle({ x: 0, y: 0, width: 6, height: PAGE.h, color: C.lime });

  drawText(pg, "KasiTech", doc.fonts.bold, 42, M + 10, PAGE.h - 160, C.ivory);
  drawText(pg, "SERVICES & PRICING", doc.fonts.regular, 12, M + 10, PAGE.h - 186, C.lime);
  drawText(pg, "Commercial buying guide", doc.fonts.regular, 14, M + 10, PAGE.h - 230, C.ivory);

  const lines = [
    "Understand what we sell, what each service does,",
    "what is included, who it is for, how pieces relate,",
    "how much it costs, and how to see it live -",
    "without guessing.",
  ];
  let y = PAGE.h - 280;
  for (const line of lines) {
    drawText(pg, line, doc.fonts.regular, 11, M + 10, y, C.muted);
    y -= 16;
  }

  drawIcon(pg, "monitor", M + 10, 120, 18, C.lime);
  drawText(pg, "Demo Studio ready", doc.fonts.bold, 10, M + 34, 108, C.lime);

  drawText(pg, PRICE_BOOK_VERSION, doc.fonts.bold, 11, M + 10, 72, C.lime);
  drawText(pg, "All prices in Tanzanian Shillings (TSh)", doc.fonts.regular, 9, M + 10, 54, C.grey);
  drawText(pg, "kasitechinnovations.com  |  Dar es Salaam", doc.fonts.regular, 9, M + 10, 38, C.grey);
}

/* ───────────── Section pages ───────────── */

async function writePackages(doc: Doc) {
  const packages = buildPackageGuides();
  const intro = sectionIntro(doc, "Website packages", "Website packages - at a glance", [
    "Every serious digital presence starts with a website package. Scan prices below, then flip for full inclusions and a live Demo Studio QR for each package.",
  ]);
  let { page: pg, y } = drawGlanceTable(
    doc,
    intro.page,
    packages.map((g) => ({
      name: g.item.name,
      price: displayItemPrice(g.item),
      blurb: g.idealFor,
      icon: iconForCode(g.item.code),
    })),
    intro.y,
    "Website packages",
  );
  y -= 10;
  if (y < CONTENT_BOTTOM + 140) {
    foot(doc, pg);
    pg = newPage(doc, "Website packages");
    y = CONTENT_TOP;
  }
  drawSectionLabel(pg, doc.fonts, "Website baseline (included in WEB-ONE through WEB-SIG)", M, y);
  y -= 12;
  y = drawChecklist(pg, doc.fonts, WEB_BASELINE_INCLUDED, M, y, PAGE.w - M * 2, 16);
  y -= 8;
  for (const n of [
    "Custom Platform is quoted separately. Domain registration and hosting are usually third-party costs.",
    "Two packages per page follow - scan the QR on each Demo Studio panel.",
  ]) {
    for (const line of wrap(n, doc.fonts.regular, 8, PAGE.w - M * 2)) {
      if (y < CONTENT_BOTTOM + 20) {
        foot(doc, pg);
        pg = newPage(doc, "Website packages");
        y = CONTENT_TOP;
      }
      drawText(pg, line, doc.fonts.regular, 8, M, y, C.grey);
      y -= 11;
    }
  }
  foot(doc, pg);

  await writePairedCards(doc, "Website packages", packages, (page, slot, g, variant) =>
    paintPackageCard(doc, page, slot, g, variant),
  );
}

async function writeBundles(doc: Doc) {
  const bundles = buildBundleGuides();
  const intro = sectionIntro(doc, "Popular bundles", "Popular bundles - at a glance", [
    "Bundles group the services customers usually need together. Scan prices below, then flip for component prices, totals, and savings when they apply.",
  ]);
  const { page: pg } = drawGlanceTable(
    doc,
    intro.page,
    bundles.map((b) => ({
      name: b.name,
      price: b.bundlePriceLabel,
      blurb: b.valueProp,
      icon: iconForCode(b.code),
    })),
    intro.y,
    "Popular bundles",
  );
  foot(doc, pg);

  await writePairedCards(doc, "Popular bundles", bundles, (page, slot, b, variant) =>
    paintBundleCard(doc, page, slot, b, variant),
  );
}

async function writeCapabilities(doc: Doc) {
  const caps = buildCapabilityGuides();
  const intro = sectionIntro(doc, "Popular capabilities", "Popular capabilities - at a glance", [
    "Add capabilities to a package or use them inside a bundle. If something is already included or absorbed, you are not charged again for that inclusion.",
  ]);
  const { page: pg } = drawGlanceTable(
    doc,
    intro.page,
    caps.map((g) => ({
      name: g.item.name,
      price: displayItemPrice(g.item),
      blurb: g.valueProp,
      icon: iconForCode(g.item.code),
    })),
    intro.y,
    "Popular capabilities",
  );
  foot(doc, pg);

  await writePairedCards(doc, "Popular capabilities", caps, (page, slot, g, variant) =>
    paintCapabilityCard(doc, page, slot, g, variant),
  );
}

function writeCare(doc: Doc) {
  const plans = buildCareGuides();
  let page = newPage(doc, "Website Care");
  mark(doc, "Website Care - at a glance", page);
  let y = CONTENT_TOP;
  y = heading(page, doc.fonts, "What is Website Care?", y);
  y = para(
    page,
    doc.fonts,
    "A website is not finished at launch. Content changes, security needs attention, and small improvements appear. Website Care is the commercial relationship for ongoing maintenance after launch.",
    y,
  );
  y = para(
    page,
    doc.fonts,
    "Exact hours, response times, and backup allowances are confirmed in your quotation. This catalog lists approved plan names and prices only - we do not invent entitlements.",
    y,
  );
  y -= 8;
  drawSectionLabel(page, doc.fonts, "Plans", M, y);
  y -= 14;

  for (const g of plans) {
    if (y < CONTENT_BOTTOM + 100) {
      foot(doc, page);
      page = newPage(doc, "Website Care");
      y = CONTENT_TOP;
    }
    const blockH = 88;
    drawCardShell(page, M, y - blockH, PAGE.w - M * 2, blockH);
    drawIcon(page, "shield", M + 12, y - 10, 14, C.ink);
    drawText(page, g.item.name, doc.fonts.bold, 11, M + 32, y - 20, C.black);
    drawPrice(page, doc.fonts, displayItemPrice(g.item), PAGE.w - M - 12, y - 20, 12);
    drawChips(page, doc.fonts, chipLabels(g.whoFor), M + 12, y - 38, PAGE.w - M * 2 - 24);
    let ty = y - 56;
    for (const line of wrap(g.valueProp, doc.fonts.regular, 7.5, PAGE.w - M * 2 - 24).slice(0, 2)) {
      drawText(page, line, doc.fonts.regular, 7.5, M + 12, ty, C.grey);
      ty -= 10;
    }
    drawSectionLabel(page, doc.fonts, "When to upgrade", M + 12, ty - 2);
    const up = wrap(g.whenUpgrade, doc.fonts.regular, 6.5, PAGE.w - M * 2 - 24)[0] ?? "";
    drawText(page, up, doc.fonts.regular, 6.5, M + 12, ty - 14, C.muted);
    y -= blockH + 10;
  }

  y -= 4;
  for (const line of wrap(
    `See Care on a live site: ${DEMO_STUDIO_ORIGIN}/demo-studio?care=professional`,
    doc.fonts.regular,
    8,
    PAGE.w - M * 2,
  )) {
    drawText(page, line, doc.fonts.regular, 8, M, y, C.grey);
    y -= 11;
  }
  foot(doc, page);
}

function writeKb(doc: Doc) {
  const plans = buildKbGuides();
  let page = newPage(doc, "KasiTech Business");
  mark(doc, "KasiTech Business - at a glance", page);
  let y = CONTENT_TOP;
  y = heading(page, doc.fonts, "What is KasiTech Business?", y);
  y = para(
    page,
    doc.fonts,
    "KasiTech Business transforms a website into a business management platform - so owners can manage website content, analytics, bookings, customers, catalog/services, feedback, QR experiences, locations, and day-to-day operations from one place.",
    y,
  );
  y = para(
    page,
    doc.fonts,
    "Only approved modules are documented. Launch unlocks website and analytics basics. Growth unlocks the fuller operator set. Pro, Scale, and Enterprise are commercial tiers - additional modules beyond Growth are scoped with KasiTech, not invented here.",
    y,
  );
  y -= 6;
  drawSectionLabel(page, doc.fonts, "Plans", M, y);
  y -= 12;

  for (const g of plans) {
    const blockH = 96;
    if (y - blockH < CONTENT_BOTTOM) {
      foot(doc, page);
      page = newPage(doc, "KasiTech Business");
      y = CONTENT_TOP;
    }
    drawCardShell(page, M, y - blockH, PAGE.w - M * 2, blockH);
    drawIcon(page, "spark", M + 12, y - 10, 14, C.ink);
    drawText(page, g.item.name, doc.fonts.bold, 11, M + 32, y - 20, C.black);
    drawPrice(page, doc.fonts, displayItemPrice(g.item), PAGE.w - M - 12, y - 20, 11);
    for (const line of wrap(g.valueProp, doc.fonts.regular, 7.5, PAGE.w - M * 2 - 24).slice(0, 2)) {
      drawText(page, line, doc.fonts.regular, 7.5, M + 12, y - 38, C.grey);
    }
    drawSectionLabel(page, doc.fonts, "Included", M + 12, y - 52);
    drawChecklist(page, doc.fonts, g.included, M + 12, y - 64, PAGE.w - M * 2 - 24, 2);
    y -= blockH + 10;
  }

  for (const line of wrap(
    `See KasiTech Business live: ${DEMO_STUDIO_ORIGIN}/demo-studio?kb=growth`,
    doc.fonts.regular,
    8,
    PAGE.w - M * 2,
  )) {
    drawText(page, line, doc.fonts.regular, 8, M, y, C.grey);
    y -= 11;
  }
  foot(doc, page);
}

function writeFaq(doc: Doc) {
  let page = newPage(doc, "FAQ");
  mark(doc, "FAQ", page);
  let y = heading(page, doc.fonts, "Frequently asked questions", CONTENT_TOP);
  y -= 4;
  for (const f of FAQ_ENTRIES) {
    const qLines = wrap(f.q, doc.fonts.bold, 9, PAGE.w - M * 2);
    const aLines = wrap(f.a, doc.fonts.regular, 8, PAGE.w - M * 2);
    const need = qLines.length * 12 + aLines.length * 11 + 18;
    if (y - need < CONTENT_BOTTOM) {
      foot(doc, page);
      page = newPage(doc, "FAQ");
      y = CONTENT_TOP;
    }
    page.drawRectangle({ x: M, y: y - 2, width: 3, height: 12, color: C.lime });
    for (const line of qLines) {
      drawText(page, line, doc.fonts.bold, 9, M + 10, y, C.black);
      y -= 12;
    }
    y -= 2;
    for (const line of aLines) {
      drawText(page, line, doc.fonts.regular, 8, M + 10, y, C.grey);
      y -= 11;
    }
    y -= 10;
  }
  foot(doc, page);
}

function writeJourney(doc: Doc) {
  const pg = doc.pdf.addPage([PAGE.w, PAGE.h]);
  mark(doc, "Your journey", pg);
  pg.drawRectangle({ x: 0, y: 0, width: PAGE.w, height: PAGE.h, color: C.black });
  pg.drawRectangle({ x: 0, y: PAGE.h - 8, width: PAGE.w, height: 8, color: C.lime });
  drawText(pg, "Your journey with KasiTech", doc.fonts.bold, 22, M, PAGE.h - 90, C.ivory);

  const steps = [
    ["1. Choose", "Pick a package, bundle, or capability from this catalog."],
    ["2. Configure", "Open Demo Studio - see the live fictional site and price."],
    ["3. Approve", "Receive a formal quotation. Nothing starts without written approval."],
    ["4. Build", "We design and build the agreed scope."],
    ["5. Launch", "Go live with QA, domain connection, and launch support."],
    ["6. Grow", "Add Care, KasiTech Business, and new capabilities over time."],
  ];
  let y = PAGE.h - 140;
  for (const [t, d] of steps) {
    pg.drawRectangle({ x: M, y: y - 4, width: 4, height: 28, color: C.lime });
    drawText(pg, t, doc.fonts.bold, 12, M + 16, y + 8, C.lime);
    drawText(pg, d, doc.fonts.regular, 10, M + 16, y - 8, C.muted);
    y -= 52;
  }
  drawIcon(pg, "monitor", M, y + 10, 16, C.lime);
  drawText(pg, "Demo Studio sits in step 2 - Configure.", doc.fonts.regular, 10, M + 24, y, C.ivory);
  drawText(pg, DEMO_STUDIO_ORIGIN + "/demo-studio", doc.fonts.bold, 11, M, y - 24, C.lime);
  drawText(
    pg,
    `${PRICE_BOOK_VERSION}  |  All prices in TSh  |  kasitechinnovations.com`,
    doc.fonts.regular,
    8,
    M,
    48,
    C.grey,
  );
  drawText(
    pg,
    "This catalog is a commercial reference - not a quotation or invoice.",
    doc.fonts.regular,
    8,
    M,
    34,
    C.muted,
  );
}

/* ───────────── Paired product cards ───────────── */

type Slot = { x: number; yBottom: number; w: number; h: number };

async function writePairedCards<T>(
  doc: Doc,
  section: string,
  items: T[],
  paint: (
    page: PDFPage,
    slot: Slot,
    item: T,
    variant: number,
  ) => Promise<void>,
) {
  let page = newPage(doc, section);
  let indexOnPage = 0;

  for (let i = 0; i < items.length; i++) {
    if (indexOnPage === 2) {
      foot(doc, page);
      page = newPage(doc, section);
      indexOnPage = 0;
    }
    const slot: Slot = {
      x: M,
      w: PAGE.w - M * 2,
      h: CARD_SLOT_H,
      yBottom:
        indexOnPage === 0
          ? CONTENT_TOP - CARD_SLOT_H
          : CONTENT_BOTTOM,
    };
    if (indexOnPage === 1) {
      // bottom slot aligned under gap
      const topOfBottom = CONTENT_TOP - CARD_SLOT_H - CARD_GAP;
      slot.yBottom = topOfBottom - CARD_SLOT_H;
    }
    const name =
      "item" in (items[i] as object)
        ? String((items[i] as PackageGuide | CapabilityGuide).item.name)
        : String((items[i] as BundleGuide).name);
    mark(doc, `${name} detail`, page);
    await paint(page, slot, items[i]!, i % 3);
    indexOnPage += 1;
  }
  foot(doc, page);
}

async function paintPackageCard(
  doc: Doc,
  page: PDFPage,
  slot: Slot,
  g: PackageGuide,
  variant: number,
) {
  const { x, yBottom, w, h } = slot;
  drawCardShell(page, x, yBottom, w, h);
  const pad = 12;
  const innerX = x + pad;
  const innerW = w - pad * 2;
  let y = yBottom + h - pad;

  y = drawProductTitle(page, doc.fonts, {
    icon: iconForCode(g.item.code),
    name: g.item.name,
    price: displayItemPrice(g.item),
    x: innerX,
    yTop: y,
    w: innerW,
    priceSize: variant === 0 ? 15 : 13,
  });

  if (g.timeline) {
    drawChips(page, doc.fonts, [g.timeline], innerX, y, innerW);
    y -= 18;
  }

  drawSectionLabel(page, doc.fonts, "Value", innerX, y);
  y -= 10;
  for (const line of wrap(g.valueProp, doc.fonts.regular, 8, innerW).slice(0, 2)) {
    drawText(page, line, doc.fonts.regular, 8, innerX, y, C.ink);
    y -= 10;
  }
  y -= 4;

  const demoH = 72;
  const bodyBottom = yBottom + demoH + 10;
  const colGap = 12;
  const colW = (innerW - colGap) / 2;

  drawSectionLabel(page, doc.fonts, "This package adds", innerX, y);
  y -= 10;
  const included = [
    ...g.included,
    ...(g.includesBaseline
      ? ["Plus the full website baseline listed on the packages at-a-glance page"]
      : []),
  ];
  drawChecklist(page, doc.fonts, included, innerX, y, colW, 7);

  drawSectionLabel(page, doc.fonts, "Ideal for", innerX + colW + colGap, y + 10);
  drawChips(
    page,
    doc.fonts,
    chipLabels(g.idealFor),
    innerX + colW + colGap,
    y,
    colW,
  );
  const commonY = y - 36;
  drawSectionLabel(page, doc.fonts, "Commonly used by", innerX + colW + colGap, commonY);
  drawChips(
    page,
    doc.fonts,
    chipLabels(g.commonlyUsedBy),
    innerX + colW + colGap,
    commonY - 12,
    colW,
  );

  if (g.notes) {
    drawSectionLabel(page, doc.fonts, "Notes", innerX, bodyBottom + 14);
    for (const line of wrap(g.notes, doc.fonts.regular, 6.5, innerW).slice(0, 2)) {
      drawText(page, line, doc.fonts.regular, 6.5, innerX, bodyBottom + 4, C.muted);
    }
  }

  const qrImg = await embedQr(doc, g.seeLiveUrl);
  drawDemoStudioPanel(page, doc.fonts, {
    x: innerX,
    yBottom: yBottom + 8,
    w: innerW,
    h: demoH,
    productName: g.item.name,
    url: g.seeLiveUrl,
    qr: qrImg,
    displayUrl: g.seeLiveUrl.replace(DEMO_STUDIO_ORIGIN, "kasitechinnovations.com"),
  });
}

async function paintBundleCard(
  doc: Doc,
  page: PDFPage,
  slot: Slot,
  b: BundleGuide,
  variant: number,
) {
  const { x, yBottom, w, h } = slot;
  drawCardShell(page, x, yBottom, w, h);
  const pad = 12;
  const innerX = x + pad;
  const innerW = w - pad * 2;
  let y = yBottom + h - pad;

  y = drawProductTitle(page, doc.fonts, {
    icon: iconForCode(b.code),
    name: b.name,
    price: b.bundlePriceLabel,
    x: innerX,
    yTop: y,
    w: innerW,
    priceSize: 14,
  });

  if (b.showSavings && b.savingsTsh != null && b.savingsTsh > 0) {
    drawSavingsBadge(
      page,
      doc.fonts,
      `You save ${formatMoney(b.savingsTsh)}`,
      innerX,
      y,
    );
    y -= 18;
  } else {
    y -= 4;
  }

  drawSectionLabel(page, doc.fonts, "What this bundle is", innerX, y);
  y -= 10;
  for (const line of wrap(b.valueProp, doc.fonts.regular, 8, innerW).slice(0, 2)) {
    drawText(page, line, doc.fonts.regular, 8, innerX, y, C.ink);
    y -= 10;
  }
  y -= 2;

  const demoH = 72;
  const colGap = 12;
  const colW = (innerW - colGap) / 2;

  drawSectionLabel(page, doc.fonts, "Included", innerX, y);
  const items = [
    ...b.components.map((c) =>
      b.showSavings
        ? `${c.name} - normally ${c.priceLabel}`
        : `${c.name} - ${c.priceLabel} standalone`,
    ),
    ...b.entitlements.map(
      (e) => `${e} (bundle entitlement - not a separate catalog charge)`,
    ),
  ];
  drawChecklist(page, doc.fonts, items, innerX, y - 10, colW, 6);

  if (variant === 1) {
    drawSectionLabel(page, doc.fonts, "Why together", innerX + colW + colGap, y);
    let wy = y - 10;
    for (const line of wrap(b.whyTogether, doc.fonts.regular, 7, colW).slice(0, 5)) {
      drawText(page, line, doc.fonts.regular, 7, innerX + colW + colGap, wy, C.grey);
      wy -= 9;
    }
  } else {
    drawSectionLabel(page, doc.fonts, "Industry", innerX + colW + colGap, y);
    drawChips(
      page,
      doc.fonts,
      chipLabels(b.industryHint || b.name),
      innerX + colW + colGap,
      y - 12,
      colW,
    );
    if (
      b.showSavings &&
      b.standaloneTotalTsh != null &&
      b.savingsTsh != null &&
      b.savingsTsh > 0
    ) {
      drawSectionLabel(
        page,
        doc.fonts,
        "If bought separately",
        innerX + colW + colGap,
        y - 40,
      );
      drawText(
        page,
        formatMoney(b.standaloneTotalTsh),
        doc.fonts.bold,
        9,
        innerX + colW + colGap,
        y - 54,
        C.ink,
      );
    } else if (b.pricingNote) {
      drawSectionLabel(
        page,
        doc.fonts,
        "Pricing note",
        innerX + colW + colGap,
        y - 40,
      );
      let ny = y - 52;
      for (const line of wrap(b.pricingNote, doc.fonts.regular, 6.5, colW).slice(0, 4)) {
        drawText(page, line, doc.fonts.regular, 6.5, innerX + colW + colGap, ny, C.muted);
        ny -= 8;
      }
    }
  }

  const qrImg = await embedQr(doc, b.seeLiveUrl);
  drawDemoStudioPanel(page, doc.fonts, {
    x: innerX,
    yBottom: yBottom + 8,
    w: innerW,
    h: demoH,
    productName: b.name,
    url: b.seeLiveUrl,
    qr: qrImg,
    displayUrl: b.seeLiveUrl.replace(DEMO_STUDIO_ORIGIN, "kasitechinnovations.com"),
  });
}

async function paintCapabilityCard(
  doc: Doc,
  page: PDFPage,
  slot: Slot,
  g: CapabilityGuide,
  variant: number,
) {
  const { x, yBottom, w, h } = slot;
  drawCardShell(page, x, yBottom, w, h);
  const pad = 12;
  const innerX = x + pad;
  const innerW = w - pad * 2;
  let y = yBottom + h - pad;

  y = drawProductTitle(page, doc.fonts, {
    icon: iconForCode(g.item.code),
    name: g.item.name,
    price: displayItemPrice(g.item),
    x: innerX,
    yTop: y,
    w: innerW,
    priceSize: variant === 2 ? 15 : 13,
  });

  drawSectionLabel(page, doc.fonts, "Purpose", innerX, y);
  y -= 10;
  for (const line of wrap(g.valueProp, doc.fonts.regular, 8, innerW).slice(0, 2)) {
    drawText(page, line, doc.fonts.regular, 8, innerX, y, C.ink);
    y -= 10;
  }
  y -= 4;

  const demoH = 72;
  const colGap = 12;
  const colW = (innerW - colGap) / 2;

  drawSectionLabel(page, doc.fonts, "Included", innerX, y);
  drawChecklist(page, doc.fonts, g.included, innerX, y - 10, colW, 5);

  if (variant !== 0) {
    drawSectionLabel(page, doc.fonts, "Workflow", innerX + colW + colGap, y);
    drawWorkflowDiagram(
      page,
      doc.fonts,
      workflowSteps(g.workflow),
      innerX + colW + colGap,
      y - 10,
      colW,
    );
  } else {
    drawSectionLabel(page, doc.fonts, "Ideal for", innerX + colW + colGap, y);
    drawChips(
      page,
      doc.fonts,
      chipLabels(g.idealFor),
      innerX + colW + colGap,
      y - 12,
      colW,
    );
    drawSectionLabel(page, doc.fonts, "Related", innerX + colW + colGap, y - 42);
    drawChips(
      page,
      doc.fonts,
      g.related.slice(0, 4),
      innerX + colW + colGap,
      y - 54,
      colW,
    );
  }

  if (g.notes) {
    const noteY = yBottom + demoH + 16;
    drawSectionLabel(page, doc.fonts, "Notes", innerX, noteY + 10);
    for (const line of wrap(g.notes, doc.fonts.regular, 6.5, innerW).slice(0, 2)) {
      drawText(page, line, doc.fonts.regular, 6.5, innerX, noteY, C.muted);
    }
  }

  const qrImg = await embedQr(doc, g.seeLiveUrl);
  drawDemoStudioPanel(page, doc.fonts, {
    x: innerX,
    yBottom: yBottom + 8,
    w: innerW,
    h: demoH,
    productName: g.item.name,
    url: g.seeLiveUrl,
    qr: qrImg,
    displayUrl: g.seeLiveUrl.replace(DEMO_STUDIO_ORIGIN, "kasitechinnovations.com"),
  });
}

/* ───────────── Shared helpers ───────────── */

function newPage(doc: Doc, section: string): PDFPage {
  const pg = doc.pdf.addPage([PAGE.w, PAGE.h]);
  paintHeader(pg, doc.fonts, section);
  return pg;
}

function sectionIntro(
  doc: Doc,
  section: string,
  tocLabel: string,
  paras: string[],
): { page: PDFPage; y: number } {
  const pg = newPage(doc, section);
  mark(doc, tocLabel, pg);
  let y = heading(pg, doc.fonts, section, CONTENT_TOP);
  for (const p of paras) y = para(pg, doc.fonts, p, y);
  y -= 4;
  drawSectionLabel(pg, doc.fonts, "At a glance", M, y);
  return { page: pg, y: y - 14 };
}

function heading(page: PDFPage, fonts: Fonts, text: string, y: number): number {
  drawText(page, text, fonts.bold, 18, M, y, C.black);
  page.drawRectangle({ x: M, y: y - 8, width: 36, height: 2.5, color: C.lime });
  return y - 24;
}

function para(page: PDFPage, fonts: Fonts, text: string, y: number): number {
  for (const line of wrap(text, fonts.regular, 9, PAGE.w - M * 2)) {
    drawText(page, line, fonts.regular, 9, M, y, C.grey);
    y -= 12;
  }
  return y - 6;
}

function drawGlanceTable(
  doc: Doc,
  startPage: PDFPage,
  rows: {
    name: string;
    price: string;
    blurb: string;
    icon: ReturnType<typeof iconForCode>;
  }[],
  yStart: number,
  section: string,
): { page: PDFPage; y: number } {
  let page = startPage;
  let y = yStart;
  for (const row of rows) {
    if (y < CONTENT_BOTTOM + 36) {
      foot(doc, page);
      page = newPage(doc, section);
      y = CONTENT_TOP;
    }
    drawIcon(page, row.icon, M, y + 2, 11, C.ink);
    drawText(page, row.name, doc.fonts.bold, 9, M + 16, y - 6, C.black);
    drawPrice(page, doc.fonts, row.price, PAGE.w - M, y - 6, 9);
    y -= 12;
    const blurb = wrap(row.blurb, doc.fonts.regular, 7, PAGE.w - M * 2 - 16)[0] ?? "";
    drawText(page, blurb, doc.fonts.regular, 7, M + 16, y, C.muted);
    y -= 6;
    page.drawLine({
      start: { x: M, y },
      end: { x: PAGE.w - M, y },
      thickness: 0.4,
      color: C.rule,
    });
    y -= 10;
  }
  return { page, y };
}

function foot(doc: Doc, page: PDFPage) {
  const n = doc.pdf.getPages().indexOf(page) + 1;
  paintFooter(page, doc.fonts, n, PRICE_BOOK_VERSION);
}

async function embedQr(doc: Doc, url: string): Promise<PDFImage> {
  const hit = doc.qr.get(url);
  if (hit) return hit;
  const dataUrl = await QRCode.toDataURL(url, {
    width: 256,
    margin: 2,
    errorCorrectionLevel: "H",
    color: { dark: "#090909", light: "#FFFFFF" },
  });
  const raw = Buffer.from(dataUrl.split(",")[1]!, "base64");
  const img = await doc.pdf.embedPng(raw);
  doc.qr.set(url, img);
  return img;
}

function fillHowTo(tocPage: PDFPage, doc: Doc) {
  const { fonts, pdf, toc } = doc;
  let y = CONTENT_TOP;
  drawText(tocPage, "How to read this guide", fonts.bold, 18, M, y, C.black);
  tocPage.drawRectangle({ x: M, y: y - 8, width: 36, height: 2.5, color: C.lime });
  y -= 26;

  const intro =
    "This is KasiTech's commercial reference manual - not a brochure and not a technical manual. Every product is documented so you can decide with confidence.";
  for (const line of wrap(intro, fonts.regular, 9, PAGE.w - M * 2)) {
    drawText(tocPage, line, fonts.regular, 9, M, y, C.grey);
    y -= 12;
  }
  y -= 10;

  drawSectionLabel(tocPage, fonts, "How sections are organised", M, y);
  y -= 12;
  for (const line of [
    "1. At a glance - all items with prices on one page",
    "2. Detail pages - two premium product cards per page, each with a Demo Studio panel",
    "Scan prices first. When something stands out, flip to its detail page.",
  ]) {
    drawIcon(tocPage, "check", M, y + 2, 9, C.limeDeep);
    drawText(tocPage, line, fonts.regular, 8, M + 14, y - 4, C.grey);
    y -= 14;
  }
  y -= 10;

  drawSectionLabel(tocPage, fonts, "Skip to a section", M, y);
  y -= 14;
  const skipLabels = [
    "Website packages - at a glance",
    "Popular bundles - at a glance",
    "Popular capabilities - at a glance",
    "Website Care - at a glance",
    "KasiTech Business - at a glance",
    "FAQ",
    "Your journey",
  ];
  for (const label of skipLabels) {
    const entry = toc.find((t) => t.label === label);
    if (!entry) continue;
    const pageNum = pdf.getPages().indexOf(entry.page) + 1;
    const display = label.replace(" - at a glance", "");
    drawText(tocPage, display, fonts.bold, 10, M, y, C.black);
    const pageLabel = `p. ${pageNum}`;
    const pw = fonts.regular.widthOfTextAtSize(pageLabel, 10);
    drawText(tocPage, pageLabel, fonts.regular, 10, PAGE.w - M - pw, y, C.muted);
    addInternalLink(tocPage, M, y - 2, PAGE.w - M * 2, 14, entry.page);
    y -= 16;
  }

  y -= 8;
  drawSectionLabel(tocPage, fonts, "See it live", M, y);
  y -= 12;
  for (const line of wrap(
    `Each product card includes a Demo Studio panel with QR. Open ${DEMO_STUDIO_ORIGIN}/demo-studio to configure live.`,
    fonts.regular,
    8,
    PAGE.w - M * 2,
  )) {
    drawText(tocPage, line, fonts.regular, 8, M, y, C.grey);
    y -= 11;
  }
  y -= 10;
  for (const line of wrap(
    "Formal quotations confirm final scope, compatibility, timeline, third-party fees, taxes, and commercial terms before commencement. This catalog is not an invoice.",
    fonts.regular,
    8,
    PAGE.w - M * 2,
  )) {
    drawText(tocPage, line, fonts.regular, 8, M, y, C.muted);
    y -= 11;
  }

  paintFooter(tocPage, fonts, pdf.getPages().indexOf(tocPage) + 1, PRICE_BOOK_VERSION);
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
