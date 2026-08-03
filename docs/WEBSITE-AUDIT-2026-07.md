# KasiTech Website Comprehensive Audit

**Site:** https://www.kasitechinnovations.com (apex `kasitechinnovations.com` 308-redirects to `www`)  
**Codebase:** Next.js 16 / React 19 / Tailwind 4 / Framer Motion  
**Audit date:** 27 July 2026  
**Method:** Full codebase inspection + live route crawl + Playwright viewport testing (320–1920px) + Lighthouse (mobile) + first-time buyer simulation  

**Scope note:** Diagnosis only. No product/UI changes were implemented in this pass.

---

## Executive Summary

KasiTech already has a **distinct, memorable brand system** (black / ivory / lime `#C7FF00`, Outfit + Space Grotesk, sharp corners, strong display type) and a **unusually ambitious proof layer**: twelve interactive concept demos that most boutique studios never ship. Core Web Vitals on marketing pages are strong (homepage mobile Lighthouse ~97 performance, 0 CLS). Conversion plumbing exists (`/start` multi-step form, WhatsApp, header CTA).

What prevents the site from feeling like a **world-class technology company sales system** is not missing aesthetics—it is a combination of:

1. **Proof vs. promise imbalance.** Concepts dominate. Real shipped work is only two projects, one hosted on `github.io` (`byzmock`), and outcomes are qualitative, not quantified. First-time buyers must trust demos more than clients.
2. **Conversion friction and truthfulness.** The enquiry form can claim “WE’VE GOT IT” / “emailed to KasiTech” even when delivery backends are unset; phone validation requires exactly 10 digits despite “working worldwide”; public contact uses a personal iCloud address and a US WhatsApp paired with a Tanzania mobile.
3. **Information architecture that over-explores.** Homepage and Work push visitors deep into demos before reinforcing why KasiTech and how to buy. BrandIntro blocks first paint for ~3.4s. Company story is split across `/company` and a legacy `/about`.
4. **Polish gaps that undermine premium perception.** OG images missing; page OG metadata not per-route; no JSON-LD; Escape does not close mobile menu; many unused home components; duplicate `HeroProductWindow` mounts; contrast failures on ivory sections and inactive pathway labels; tiny carousel dots as tap targets.

**Verdict:** The site is a strong creative studio portfolio with excellent demos. It is **not yet a reliable acquisition machine** for high-trust, high-ticket projects. Fix trust, lead delivery, IA focus, and accessibility contrast first—then refine visual rhythm.

### What should remain

- Brand colors, display typography, and sharp geometric UI language
- Interactive demos as differentiators (with clearer “concept vs shipped” labeling)
- `/start` conversational intake concept
- FAQ honesty about demos vs client work
- `/card` digital business card
- Dark/ivory section rhythm on Company
- Focus-visible and global reduced-motion CSS baselines

### What must change (directionally)

- Lead with buyer comprehension + proof, not demo playground
- Make enquiry delivery truthful and internationally valid
- Collapse legacy/duplicate IA; strengthen shipped-work path
- Fix a11y contrast, mobile menu keyboard behavior, and carousel targets
- Complete SEO social metadata and structured data
- Delete or wire dead home components; reduce unnecessary client islands

---

## Critical Issues (address immediately)

| # | Issue | Why critical |
|---|--------|--------------|
| C1 | Enquiry success UI claims email delivery even when FormSubmit/API fail or backends unset (`StartProjectForm.tsx`, `api/enquiry/route.ts`) | Leads can silently drop; damages trust |
| C2 | Phone validation requires exactly 10 digits; rejects Tanzania (+255) and most intl formats | Blocks target market from converting |
| C3 | Public trust signals weak: iCloud email, US WhatsApp + TZ mobile split, BYZ on `kasigila.github.io/byzmock`, EST. 2026 | Premium buyers hesitate |
| C4 | No Open Graph / Twitter images; `twitter:card` is `summary_large_image` without image | Broken social previews for every share |
| C5 | Mobile menu Escape does not close (verified 320–430px); no focus trap/return | Keyboard / a11y failure |
| C6 | Apex↔www canonical inconsistency: live serves `www`, sitemap/`metadataBase`/`og:url` use non-www | SEO duplicate-host risk |

---

## Route Inventory

| Route | Purpose | Indexable | Chrome |
|-------|---------|-----------|--------|
| `/` | Homepage / acquisition | Yes | Header/Footer + BrandIntro |
| `/work` | Portfolio router (concepts + client) | Yes | Full |
| `/work/all` | All 12 demos | Yes | Full |
| `/work/[slug]` | Concept + shipped case studies (+ `/work/000`) | Yes | Full |
| `/demo/*` (12) | Interactive product demos | Yes (not in sitemap) | DemoChrome only |
| `/capabilities` | Service pillars | Yes | Full |
| `/company` | Canonical company story | Yes | Full |
| `/about` | Legacy short about | Yes | Full |
| `/founder` | Founder narrative | Yes | Full |
| `/start` | Project intake | Yes | Full |
| `/lab` | R&D / experiments | Yes | Full |
| `/faq` | Pre-sales FAQ | Yes | Full |
| `/privacy`, `/terms` | Legal | Yes | Full |
| `/card` | Digital business card | Yes | Standalone |
| `/not-found` | 404 | — | Full |
| `/api/enquiry` | Enquiry POST | Disallowed | — |
| `/card/vcf` | vCard download | — | — |

**Demo slugs:** `zuri`, `moto`, `noir`, `soko`, `nest`, `afya`, `amani`, `atlas`, `nuru`, `impact`, `kasi-flow`, `kasi-intelligence`

**Shipped slugs:** `africa-climate-finance`, `byz`

---

## Page-by-Page Audit

### `/` — Homepage

**Page purpose:** Explain KasiTech, show range, convert to `/start` or WhatsApp.

**Current experience:** After ~3.4s BrandIntro (first session tab), visitor sees large all-caps value prop, green CTA, intent chips, auto-rotating demo carousel (desktop right / mobile below), then BuildPathways, ShippedCaseStudy (2 projects), CapabilitySystem (ivory), FounderTeaser, FinalCTA. ~6–9 viewport-heights desktop; ~9–15 on small phones.

**UX problems**
- BrandIntro delays comprehension of offer/CTA.
- Value prop is category-clear but undifferentiated (“products that work”).
- Hero immediately competes with 12 demos; buyer path vs playground path unclear.
- Intent chips are thin text links with `/` separators—easy to miss vs primary CTA.
- Shipped proof rotates away; no quantified outcomes; no “Start similar project” on cards.
- Scroll-hiding header removes persistent CTA during exploration.

**UI/design problems**
- Duplicate `HeroProductWindow` mounts (`page.tsx` desktop + mobile)—layout smell and performance cost.
- Carousel dots are 6×6px targets (Lighthouse fail).
- Inactive BuildPathways titles use ~`#676663` on `#090909` (3.46:1)—fails AA.
- Ivory capability/founder labels use `text-kasi-black/40–50` (1.4–3.7:1)—fails AA.

**Content problems**
- Repeated “what do you want to build / examples of what yours could feel like” across hero + pathways.
- No process, pricing band, or risk reversal above fold.
- EST. 2026 on founder teaser may signal immaturity without counterbalancing proof.

**Conversion problems**
- Too many exits into demos before enquiry.
- Weak social proof density for a premium studio ask.

**Technical problems**
- Multiple client rotators ignore `prefers-reduced-motion` for intervals.
- Analytics `track()` dispatches `kasi:analytics` with no listener in repo.
- Heading order skip reported by Lighthouse (h3 under incomplete hierarchy in pathways/shipped).

**Mobile problems**
- At 320px hero is text-first (~full screen of words) before demos; total ~14.6 screens.
- Menu/Close text targets short (~20–26px height).
- Intent chip row wraps awkwardly; dense underline links.

**Recommended changes**
1. Shorten BrandIntro to ≤1s or non-blocking reveal; never cover CTA for 3.4s.
2. Hero: one sharper claim (who + outcome + geography) + one proof line (e.g. “2 live launches · 12 interactive concepts”).
3. Single `HeroProductWindow`; CSS-only responsive placement; pause control + larger dots (≥44px hit area).
4. After hero: shipped proof static (no auto-rotate) with internal case-study links + “Start similar →”.
5. Fix contrast on inactive labels (`≥4.5:1`); enlarge Menu tap target.
6. Keep FinalCTA; add mid-page sticky or persistent header CTA (don’t hide on scroll, or hide chrome but keep CTA).

---

### `/work`

**Page purpose:** Let buyers browse concepts and shipped work; route to demos/case studies/start.

**Current experience:** Large hero (“DIFFERENT BUSINESSES…”), anchors to concepts/client work, filter chips, concept grid with demo + case study links, client work cards (external live sites), final CTA.

**UX problems**
- Above-the-fold is mostly headline; portfolio grid requires scroll.
- Client cards link out to live sites more than to internal case studies (`/work/africa-climate-finance`, `/work/byz`)—buries owned narrative.
- Filter `role="tablist"` without tabpanels/arrow keys.

**UI/design problems**
- Many filter chips; on mobile they wrap into a tall control stack or feel cramped.
- Image-only links with `alt=""` → unnamed accessible names (automated audit).

**Content / conversion**
- Clear “concepts vs shipped” framing—keep.
- Missing comparison framing (“pick the closest industry → start”).

**Mobile:** Work page ~11.8 screens at 390px—heavy. Prioritize filters + 3 featured + “view all”.

**Recommended changes**
- Surface 2 shipped case studies first or as equal peer section with internal links.
- Add `aria-label` on image links; convert filters to `aria-pressed` toggle group or full tabs.
- Reduce hero height; show first row of work in first viewport on desktop.

---

### `/work/all`

**Purpose:** Complete demo index.  
**Issues:** Title-only metadata (no description); empty alts on cover links; dense 12-card grid on mobile (~8.8 screens).  
**Fix:** Add description; descriptive link names; optional industry grouping; keep BuyCtas.

---

### `/work/[slug]` (concepts)

**Purpose:** Explain a concept; drive demo try + project start.  
**Strengths:** Structured case study data; clear fictional framing via DemoChrome on demo side; CTAs to demo/start/WhatsApp.  
**Issues:** `CaseStudyView` is fully client for one accordion; long “thinking” walls; OG per-slug incomplete (no images).  
**Fix:** Server-render body; island for accordion; add OG image per project cover; progressive disclosure for long sections.

---

### `/work/africa-climate-finance` & `/work/byz`

**Purpose:** Real proof.  
**Strengths:** Challenge/solution/capabilities/outcome structure; live visit CTA.  
**Critical trust issue:** BYZ URL is `https://kasigila.github.io/byzmock/index.html`—reads as mock/personal GitHub Pages, not production client domain. Climate Finance URL includes `/index.html` (slightly unfinished).  
**Fix:** Prefer client production domains; if GitHub hosting is temporary, label honestly (“staging”) or move; add metrics, quotes, screenshots with captions; link from homepage/work prominently.

---

### `/work/000`

**Purpose:** Meta case study of the KasiTech site itself (footer “Built by KasiTech”).  
**Note:** Clever; ensure it doesn’t confuse as client work. Keep footer-only discovery.

---

### `/demo/*` (all twelve)

**Purpose:** Experiential proof of build capability.  
**Strengths:** High craft; DemoChrome with Start/WhatsApp/case study; fictional-data banner.  
**Issues:**
- `/demo/zuri` missing page metadata (inherits root title/description)—unique among demos.
- Demos not in sitemap (may be intentional; if indexable, add selectively or `noindex` consistently).
- Unsplash remote LCP images (Zuri mobile LCP ~3.5s, perf 91).
- Monolithic client components (Zuri especially large).
- DemoChrome “About +” and overlays lack robust focus trap.
- Risk: visitor thinks they left KasiTech; banner is easy to miss.

**Mobile:** Demo chrome + demo nav can feel stacked; ensure sticky chrome doesn’t obscure primary demo CTAs.

**Recommended changes**
- Metadata for Zuri; decide index policy for all demos.
- Self-host hero images; lazy-split admin/business views.
- Stronger persistent “This is a KasiTech concept · Start a project” bar on mobile.

---

### `/capabilities`

**Purpose:** Map services to tryable concepts (Attract/Transact/Operate/Decide).  
**Strengths:** Clear pillars; paired demos.  
**Issues:** Mobile pillar anchors (ATTRACT/TRANSACT/…) are small and tightly spaced; sections are long text + screenshot; “compositions” language is abstract for some buyers.  
**Fix:** Larger anchor chips; lead each pillar with outcome + 3 deliverables + one demo + Start CTA; shorten body copy.

---

### `/company`

**Purpose:** Canonical “why us / who we are” story.  
**Strengths:** Strong brand motion, ivory contrast sections, chapter structure, links to work/lab/start.  
**Issues:** Long (~7 screens); overlaps homepage messaging; Company hero primary CTA is “Explore our work” (exploration over conversion); ivory muted text fails contrast; heavy `"use client"` + Framer across sections.  
**Fix:** Tighten to Identity → Proof → How we engage → Close; make Start primary in hero; fix opacity tokens to ≥4.5:1; server-render static copy.

---

### `/about`

**Purpose:** Legacy stub pointing to `/company`.  
**Issues:** Still indexable with unique title/description; in sitemap; dilutes company intent; mostly empty right column on desktop.  
**Fix:** `permanentRedirect` to `/company` (or canonical + noindex). Remove from sitemap if redirecting.

---

### `/founder`

**Purpose:** Human trust / founder brand.  
**Strengths:** Distinctive interactive journey/thinking visuals; good OG title/description; links to card/company/start.  
**Issues:** Long interactive sections may feel more “portfolio art” than buyer utility; client-heavy; ensure journey tabs have proper semantics.  
**Fix:** Keep hero + one interactive section + connect; move secondary narrative below or shorten; ensure tab a11y.

---

### `/start`

**Purpose:** Convert visitors to qualified enquiries.  
**Strengths:** Clear 4-step flow; “reply within 24h”; need prefill via query; WhatsApp handoff concept. Lighthouse a11y 100 / perf 97 on mobile.  
**Critical issues:** False success/email claims; 10-digit phone rule; auto-redirect to WhatsApp may surprise users who wanted email-only; budget asked before strong reassurance; errors not tied via `aria-describedby`/`aria-invalid`; `outline-none` on inputs.  
**Fix:** Validate delivery; international phones; only claim what succeeded; optional WhatsApp vs stay-on-page; associate errors; visible focus rings.

---

### `/lab`

**Purpose:** Signal R&D / product ambition.  
**Issues:** No meta description; thin content (“next up”); risks looking empty for a nav item.  
**Fix:** Either ship 1–2 real lab artifacts or demote Lab to company subsection until dense enough; add description.

---

### `/faq`

**Purpose:** Objection handling.  
**Strengths:** Excellent honesty about demos vs shipped; timelines; WhatsApp explanation; M-Pesa.  
**Issues:** No meta description; no FAQ schema; flat list (fine) but no jump links; WhatsApp FAQ exists because contact model is confusing—symptom of brand issue.  
**Fix:** Add description + `FAQPage` JSON-LD; consider accordion for scanability on mobile.

---

### `/privacy` & `/terms`

**Purpose:** Legal minimum.  
**Issues:** Very short; no descriptions; privacy mentions contact channels but doesn’t link them.  
**Fix:** Add descriptions; link WhatsApp/email; expand only as needed for real data practices (FormSubmit, Resend, localStorage).

---

### `/card`

**Purpose:** Save founder contact (events/networking).  
**Strengths:** Focused; QR; vCard; good metadata; chrome correctly suppressed.  
**Issues:** Exposes iCloud + dual phone story; desktop layout is mobile-card centered (acceptable); WhatsApp vs Mobile mismatch may confuse.  
**Fix:** Domain email when ready; consistent primary contact; ensure Save Contact works on iOS/Android (verify in device QA).

---

### Custom `not-found`

**Purpose:** Recover lost visitors.  
**Strengths:** Clear links Home / Work / Start. Returns HTTP 404 correctly.  
**Fix:** Optional search or popular demos; unique title if possible.

---

## Mobile UX Findings

Issue: Mobile menu does not close on Escape; focus not moved into menu; background not inert.  
Location: `Header.tsx` (`#mobile-menu`)  
Severity: High  
Device: Mobile  
Why it matters: Keyboard and AT users can get stuck; fails expected dialog patterns.  
Recommended fix: Focus trap + Escape + return focus to Menu button; `aria-modal` on open panel.  
Implementation notes: Mirror desktop panel Escape handler for `open` state.

Issue: Menu/Close and social icons under 44×44px.  
Location: Header mobile controls; footer/social  
Severity: Medium  
Device: Mobile  
Why it matters: Mis-taps; WCAG 2.2 target size.  
Recommended fix: Min 44px hit areas with padding; enlarge Close control.

Issue: Homepage ~9–15 screens; Work ~12 screens at 390px.  
Location: `/`, `/work`  
Severity: High  
Device: Mobile  
Why it matters: Feels like scrolling essays; drop-off before proof/CTA.  
Recommended fix: Compress heroes; collapse secondary sections; prioritize shipped proof + one pathway + CTA.

Issue: Hero carousel dots 6px; Lighthouse target-size fail.  
Location: `HeroProductWindow.tsx`  
Severity: Medium  
Device: Both (worse mobile)  
Why it matters: Pagination unusable by touch.  
Recommended fix: Invisible expanded hit slop or larger controls + pause.

Issue: Capabilities pillar anchors cramped on one row.  
Location: `/capabilities`  
Severity: Medium  
Device: Mobile  
Why it matters: Hard to tap; accidental wrong pillar.  
Recommended fix: 2×2 grid of large chips.

Issue: Intent chips as underlined text with `/` separators.  
Location: `IntentChips.tsx`  
Severity: Medium  
Device: Mobile  
Why it matters: Looks like body copy; weak affordance.  
Recommended fix: Wrap as tappable chips with padding (still on-brand, not rounded-full pills if brand forbids—use square chips).

Issue: No horizontal overflow detected in automated pass (good).  
Location: Sitewide  
Severity: —  
Device: Both  
Why it matters: Layout stability.  
Recommended fix: Preserve; retest after redesign.

---

## Desktop UX Findings

Issue: First viewport can feel like “large words + demo widget” rather than a composed product story.  
Location: `/` hero  
Severity: Medium  
Device: Desktop (1366–1920)  
Why it matters: Premium studios lead with brand + one visual idea; here demo carousel competes with brand.  
Recommended fix: Keep brand-dominant left column; treat demo as supporting proof with slower/manual advance.

Issue: Work/Company heroes consume full viewport before content.  
Location: `/work`, `/company`  
Severity: Medium  
Device: Desktop  
Why it matters: Excess scrolling through statements.  
Recommended fix: Reduce `min-h` heroes; bring grids/proof into first screen.

Issue: Header auto-hide on scroll removes Start CTA.  
Location: `Header.tsx`  
Severity: Medium  
Device: Desktop  
Why it matters: Conversion CTA disappears during consideration.  
Recommended fix: Keep header pinned or leave CTA chip visible.

Issue: `/about` large empty right space.  
Location: `/about`  
Severity: Low  
Device: Desktop  
Why it matters: Looks unfinished.  
Recommended fix: Redirect away.

Issue: Hover mega-panels are rich but mouse-leave delay (180ms) can feel sticky; keyboard path exists for panels but mobile Escape gap remains.  
Location: `Header.tsx`  
Severity: Low  
Device: Desktop  
Why it matters: Minor friction.  
Recommended fix: Ensure click-to-pin option; keep focus management.

---

## Navigation / Information Architecture

**Current primary nav:** Work · Capabilities · Company · Founder · Start  

**Journey map (ideal):** Landing → Understand → Services → Proof → Trust → Enquiry  

**Friction points**
1. Landing delayed by BrandIntro.
2. Understand vs Explore: demos outrank explanation of engagement model.
3. Services (`/capabilities`) use abstract verbs; buyers may want “Website / Shop / System” language matching intent chips.
4. Proof: concepts easy; shipped work under-linked.
5. Trust: founder strong; company email/phone story weak; thin testimonials.
6. Enquiry: form + WhatsApp good idea; validation/delivery bugs break journey.
7. `/about` vs `/company` duplication.
8. `/lab` in footer/dropdown before content is ready.
9. `/card` footer-only—fine for networking, not for main journey.
10. No breadcrumbs on case studies/demos (useful on deep demo exits).

**Recommended IA**
- Nav: Work · Capabilities · Company · Start (Founder under Company dropdown)
- Redirect `/about` → `/company`
- Work page tabs: Shipped | Concepts
- Keep Lab inside Company until populated
- Demo routes: optional `noindex` if they dilute branded queries; keep linked from Work

---

## Visual Design Audit

**Strong**
- Cohesive dark studio identity; lime accent used with restraint on CTAs
- Display type scale feels intentional, not generic Inter/SaaS
- Demo craft elevates perceived capability
- Ivory interruptions create rhythm on Company/Capabilities

**Weak / un-premium**
- Over-reliance on all-caps walls without visual product framing in early marketing sections
- Auto-rotating panels feel busy vs deliberate
- Personal email + GitHub Pages proof undercut visual premium
- Inconsistent radius: marketing sharp; `/card` CTA rounded—minor drift
- Stock Unsplash in demos vs local screenshots in marketing—quality variance
- Motion quantity > motion purpose on marketing pages

**Guidance:** Do not restyle into purple SaaS. Raise craft by tightening hierarchy, proof presentation, and interaction restraint—keep KasiTech DNA.

---

## Content & Copy Audit

**Excessive / repetitive**
- “Digital products that work” / “products that work” / “every screen should earn its place” across home, company, footer, about
- “What do you want to build?” repeated hero + BuildPathways + unused PortfolioRouter

**Vague / agency-generic**
- WhyKasiTech / BeautifulIsntEnough style lines (also mostly unused dead code)
- “Compositions across the digital business”

**Missing**
- Named client results / metrics
- Testimonials
- Explicit process (Discover → Design → Build → Launch → Support)
- Pricing orientation (even ranges or “from”)
- Risk reversal (“fixed scope proposal after discovery”, “24h reply” already present—amplify)

**Progressive disclosure opportunities**
- Case study “thinking” → accordion (partially done)
- FAQ → accordion + schema
- Capabilities body → bullets + demo thumbnail
- Homepage pathways → keep interactive but shorter copy

**Dead copy components (unused imports):**  
`WhyKasiTech`, `BeautifulIsntEnough`, `KasiMeansSpeed`, `SelectedWork`, `AllDemosStrip`, `PortfolioRouter`, `ShippedWork`, `WhatWeBuild`, `HowWeThink`, `HowWeEngage`, `BeyondClientWork` under `src/components/home/`—remove or wire; they indicate prior homepage iterations still in tree.

---

## Conversion Audit

**Goals:** Project enquiries, WhatsApp chats, qualified briefs, partnerships.

**CTA hierarchy**
- Primary: Start a Project (header + many pages)—good consistency
- Secondary: WhatsApp via `BuyCtas` / FinalCTA / DemoChrome
- Tertiary: Try demo / Explore work—often overweighted on home/company heroes

**Missing conversion assets**
- Testimonials / logos
- Quantified case results
- Mid-funnel “Book a 20-min call” alternative if WhatsApp feels informal to institutional buyers
- Form progress save + honest failure state
- Analytics funnel (events currently not collected)

**Qualification:** Budget/timeline on `/start` is good; soften copy and allow “Not sure” without shame; don’t block on 10-digit phones.

---

## Accessibility Audit (WCAG 2.2 AA)

| Issue | Location | Severity | Notes |
|-------|----------|----------|-------|
| Contrast fails ivory muted text | Company/Capability/Founder ivory (`text-kasi-black/40–50`) | High | 1.4–3.7:1 |
| Contrast fails inactive pathway titles | BuildPathways `#676663` on black | High | 3.46:1 |
| Demo chrome/Zuri muted teal | `#52777A` on cream | Medium | ~4.0–4.4:1 |
| Mobile menu keyboard | `Header.tsx` | High | Escape/focus trap |
| Carousel target size | `HeroProductWindow` | Medium | 6px dots |
| Tab semantics incomplete | WorkIndex, Founder sections, demos | Medium | Use pressed toggles or full tabs |
| Form errors not associated | `StartProjectForm` | Medium | `aria-invalid` / `aria-describedby` |
| `outline-none` inputs | Start form, some demos | Medium | Rely on visible focus |
| Reduced motion incomplete | Hero/Capability/Shipped rotators, many demos | High | Intervals still run |
| Decorative browser dots | `BrowserFrame` | Low | `aria-hidden` |
| Image link names | Work grids | Medium | Empty alt on sole content of link |
| BrandIntro `aria-hidden` while visible | `BrandIntro` | Medium | Hides announcement of overlay; also blocks interaction without dialog semantics |

Lighthouse mobile: Home a11y **90**; Start **100**; Zuri **96**.

---

## SEO Audit

Issue: No `og:image` / `twitter:image` sitewide.  
Location: `layout.tsx` metadata  
Severity: Critical  
Device: Both  
Why it matters: Shares show blank/generic previews despite `summary_large_image`.  
Recommended fix: Add default 1200×630 brand OG; per-route images for work/demos.  
Implementation notes: Place under `/public/og/`; set in root + `generateMetadata`.

Issue: Child pages inherit root `og:title`/`og:url`/`og:description` on live HTML (Work/Company/Start show root OG).  
Location: Page `metadata` exports incomplete for openGraph  
Severity: High  
Why it matters: Social/Slack previews wrong for deep links.  
Recommended fix: Explicit `openGraph` + `alternates.canonical` per page.

Issue: `metadataBase` and sitemap use `https://kasitechinnovations.com` while production canonical host is `www`.  
Location: `layout.tsx`, `sitemap.ts`, `robots.ts`  
Severity: High  
Recommended fix: Standardize on `www` (or apex) everywhere; align Vercel redirect + canonical tags.

Issue: `/demo/zuri` missing route metadata.  
Location: `src/app/demo/zuri/page.tsx`  
Severity: Medium  
Recommended fix: Match other demos’ title/description.

Issue: Title-only metadata on `/work/all`, `/lab`, `/faq`, `/privacy`, `/terms`.  
Severity: Medium  
Recommended fix: Unique descriptions; consider `noindex` for thin legal if desired.

Issue: No JSON-LD (Organization, WebSite, FAQPage, CreativeWork).  
Severity: Medium  
Recommended fix: Add Organization + FAQ schema first.

Issue: Sitemap `lastModified: new Date()` every build; demos absent; `/about` present.  
Severity: Low–Medium  
Recommended fix: Stable dates; redirect about; decide demo inclusion.

Issue: No structured distinction in SERP between concepts and client work.  
Severity: Low  
Recommended fix: Titles like “ZURI (Concept Demo)” vs “Africa Climate Finance (Client)”.

**What’s fine:** robots.txt allows site, disallows `/api/`; titles generally unique; 404 works; crawlable anchors; external `rel` present.

---

## Performance Audit

**Measured (Lighthouse mobile, live):**
- `/` — Perf 97; LCP 2.6s; CLS 0; TBT 30ms; ~564 KiB
- `/start` — Perf 97; LCP 2.6s
- `/demo/zuri` — Perf 91; LCP 3.5s; Unsplash LCP dependency

Issue: Duplicate `HeroProductWindow` on homepage.  
Location: `src/app/page.tsx`  
Severity: High  
Why it matters: Double intervals, double Framer, dual priority image risk.  
Recommended fix: One instance + CSS.

Issue: Broad `"use client"` + Framer on static marketing.  
Location: home/*, company/*, CaseStudyView  
Severity: Medium  
Recommended fix: Server components + islands; CSS for simple fades.

Issue: Unsplash remote heroes in demos.  
Location: `demos/*/`, `next.config.ts` remotePatterns  
Severity: Medium (High on demo LCP)  
Recommended fix: Self-host critical heroes.

Issue: Three Google fonts globally.  
Location: `layout.tsx`  
Severity: Low–Medium  
Recommended fix: Audit weights; subset; optional system mono.

Issue: Analytics/custom events unused—no third-party analytics cost (good), but also no RUM.  
Severity: Low for perf / High for CRO learning  

Issue: npm audit reports high severity via Next transitive deps—monitor patches.  
Severity: Medium  

**Positive:** Static generation of many routes; next/image; font-display swap; low CLS; fast TTFB on Vercel.

---

## Functional QA

| Test | Result |
|------|--------|
| Primary routes HTTP | 200 |
| Unknown route | 404 + custom page |
| Apex → www | 308 |
| Homepage internal links | OK (LinkedIn returned 999—LinkedIn bot block, not site bug) |
| Shipped external links | Both 200 |
| Mobile menu open | Works |
| Mobile menu Escape | **Fails** (stays open) |
| `/start` step progression | Works (need → goals) |
| Form delivery truthfulness | **Misleading** when backends empty |
| WhatsApp deep links | Constructed to `wa.me/12698613487` |
| Demo fictional banner | Present |
| Horizontal overflow | Not detected in sampled viewports |
| ESLint | **Fails** locally (`set-state-in-effect` in Header, StartProjectForm, MpesaOverlay, KasiFlow, Moto) |
| Production build | Succeeds |

---

## Code Quality Audit

Issue: ~11 unused home section components.  
Location: `src/components/home/*` listed above  
Severity: Medium  
Why it matters: Drift, confusion for future redesign.  
Recommended fix: Delete or move to `_archive` after confirming unused.

Issue: Contact data duplicated (`social.ts`, `card.ts`, `faq`, `whatsapp.ts`).  
Severity: Medium  
Recommended fix: Single `contact.ts` source of truth.

Issue: Enquiry API weak runtime validation.  
Location: `api/enquiry/route.ts`  
Severity: Medium  
Recommended fix: Schema validate; don’t return `ok: true` when undelivered—or return explicit `delivered: []` and make UI branch.

Issue: `CaseStudyView` client boundary too large.  
Severity: Medium  

Issue: Lint errors block CI quality gate if enforced.  
Severity: High for engineering hygiene  

Issue: Hardcoded demo/content is fine for studio site; keep typed data modules (`projects.ts`, `case-studies.ts`)—**preserve**.

---

## First-Time Customer Simulation (answers)

| Question | Site’s answer today | Friction |
|----------|---------------------|----------|
| What is KasiTech? | Digital tech studio in Dar; products that work | Clear enough after BrandIntro |
| What do they sell? | Sites, booking, ecommerce, software, AI | Clear |
| Who for? | Businesses/orgs/founders worldwide | Broad; not niche-specific |
| Why choose them? | Craft + demos + founder story | Weak vs competitors on proof |
| Services? | Capabilities pillars | Discoverable |
| Examples? | 12 demos + 2 shipped | Demos dominate; shipped thin |
| How to start? | `/start` + WhatsApp | Obvious CTAs; form caveats |
| Contact? | WhatsApp US, TZ mobile, iCloud | Confusing/unpremium |
| Credible? | Mixed | GitHub Pages + EST 2026 + iCloud |
| Premium tech company? | Visually yes; commercially almost | Trust details break spell |
| Trust with important project? | Hesitant until proof/contact fixed | — |
| Find without excess scroll? | Partially | Home/Work too long on mobile |
| Next action obvious? | Usually Start | Often competed by Try demo |

---

## Prioritized Implementation Roadmap

### P0 — Critical (reliability, trust, blockers)

1. **Enquiry truthfulness** — Only show success/email claims when delivery succeeds; surface WhatsApp/email fallback explicitly; fix API `ok` semantics. *(High impact, small–medium effort)*
2. **International phone validation** — Accept E.164 / TZ numbers; align copy. *(High impact, small effort)*
3. **Mobile menu a11y** — Escape, focus trap, return focus, 44px targets. *(High impact, small effort)*
4. **OG images + per-page openGraph/canonical on `www`** — Align metadataBase/sitemap/host. *(High impact, small effort)*
5. **Contrast fixes** — Replace `/40–/50` ivory opacities and inactive `#676663` labels with AA-compliant tokens. *(High impact, small effort)*
6. **Trust contact hygiene** — Plan domain email; clarify primary WhatsApp; upgrade BYZ hosting/labeling. *(High business impact; email may need ops)*

### P1 — High impact (structure, CRO, UX)

7. Shorten/remove blocking BrandIntro.  
8. Homepage restructure: proof earlier, fewer auto-rotators, single HeroProductWindow, stronger shipped case CTAs.  
9. Work IA: Shipped vs Concepts; internal case study links.  
10. Redirect `/about` → `/company`.  
11. Reduced-motion: stop intervals; respect `useReducedMotion`.  
12. Wire real analytics listener (or GA/Plausible) for funnel events.  
13. FAQ + Organization JSON-LD; meta descriptions on thin pages; Zuri demo metadata.  
14. Form `aria-*` error association + visible focus.  
15. Delete unused home components; fix lint errors.

### P2 — Polish

16. Pin header CTA; refine mega-menu.  
17. Replace Framer fades with CSS on marketing.  
18. Larger carousel controls; pause buttons.  
19. Tighten Company/Founder length; Founder under Company nav.  
20. Card/contact consistency; privacy links.  
21. DemoChrome mobile sticky bar refinement.  
22. Sitemap lastmod + demo index policy.

### P3 — Future enhancements

23. Testimonials/logo bar once clients approve.  
24. Quantified case study metrics and media kits.  
25. Self-host all demo imagery; split mega-demos.  
26. Lab as real product surface or remove from nav.  
27. Multilingual (SW) if East Africa push intensifies.  
28. CMS for case studies/FAQs.  
29. Pricing/packages page if productized offers emerge.  
30. Advanced qualification (calendar booking) for institutional buyers.

---

## Appendix A — Lighthouse snapshot (mobile, 2026-07-27)

| Page | Perf | a11y | BP | SEO | LCP | CLS |
|------|------|------|----|-----|-----|-----|
| `/` | 97 | 90 | 100 | 100 | 2.6s | 0 |
| `/start` | 97 | 100 | 100 | 100 | 2.6s | 0 |
| `/demo/zuri` | 91 | 96 | 100 | 100 | 3.5s | 0 |

## Appendix B — Key files referenced

- `src/app/layout.tsx`, `page.tsx`, `sitemap.ts`, `robots.ts`
- `src/components/site/{Header,Footer,SiteChrome,BrandIntro,DemoChrome,BuyCtas}.tsx`
- `src/components/home/*`, `src/components/start/StartProjectForm.tsx`
- `src/app/api/enquiry/route.ts`, `src/lib/{whatsapp,social,card,analytics,formsubmit}.ts`
- `src/data/{projects,shipped-work,case-studies,founder}.ts`
- `src/app/globals.css`

## Appendix C — Evidence artifacts

Viewport screenshots and automated crawl notes were captured during this audit under the agent artifacts directory (`audit-screenshots/`), covering homepage (1920/1440/1366/430/390/375/320), key marketing routes, demos, card, start form steps, and 404.
