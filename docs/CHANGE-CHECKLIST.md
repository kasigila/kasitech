# KasiTech Website — Full Change Checklist

Source: [WEBSITE-AUDIT-2026-07.md](./WEBSITE-AUDIT-2026-07.md)  
Status: **Not started** (diagnosis only — no implementation yet)  
Convention: `- [ ]` = todo · `- [x]` = done

---

## P0 — Critical

### Enquiry / lead delivery
- [ ] Only show “WE’VE GOT IT” / emailed success when delivery actually succeeds (`StartProjectForm.tsx`)
- [ ] Stop claiming “a copy is emailed to KasiTech” when FormSubmit/API fail or backends are unset
- [ ] Surface explicit WhatsApp and email fallbacks when delivery fails
- [ ] Fix `/api/enquiry` so `ok: true` is not returned when nothing was delivered (or return `delivered: []` and branch UI on it)
- [ ] Add server-side schema validation for enquiry payload (id, name, email, phone, lengths)

### Phone / contact validation
- [ ] Replace 10-digit-only phone validation with E.164 / international support
- [ ] Accept Tanzania (+255) numbers in `/start`
- [ ] Update validation copy (“10-digit…”) to match real rules

### Mobile navigation accessibility
- [ ] Close mobile menu on Escape (`Header.tsx`)
- [ ] Move focus into mobile menu when opened
- [ ] Trap focus while menu is open
- [ ] Return focus to Menu button on close
- [ ] Mark background inert / prevent underlying scroll interaction correctly
- [ ] Increase Menu / Close tap targets to ≥44×44px
- [ ] Increase social icon tap targets to ≥44×44px where needed

### SEO / social / canonical
- [ ] Add default Open Graph image (1200×630)
- [ ] Add default Twitter/X image
- [ ] Set per-page `openGraph` title, description, url (not root defaults on `/work`, `/company`, `/start`, etc.)
- [ ] Add `alternates.canonical` on major pages
- [ ] Standardize host on `www` (or apex) across `metadataBase`, sitemap, robots, `og:url`, and Vercel redirects
- [ ] Add metadata for `/demo/zuri` (currently inherits root)

### Accessibility contrast
- [ ] Fix ivory muted text tokens (`text-kasi-black/40`, `/45`, `/50`) to ≥4.5:1 AA
- [ ] Fix inactive BuildPathways labels (~`#676663` on black, 3.46:1)
- [ ] Fix Zuri/demo muted teal contrast (`#52777A` on cream) where below AA
- [ ] Re-check Capability/Founder ivory section labels after token change

### Trust / contact hygiene
- [ ] Plan and switch public email from iCloud to domain email (e.g. `hello@kasitechinnovations.com`) when ready
- [ ] Clarify primary project contact (WhatsApp vs Tanzania mobile) sitewide
- [ ] Centralize contact data into one module (stop drift across `social.ts`, `card.ts`, `whatsapp.ts`, FAQ)
- [ ] Fix or relabel BYZ live URL (`kasigila.github.io/byzmock`) — production domain or honest staging label
- [ ] Clean Climate Finance URL if `/index.html` looks unfinished
- [ ] Soften or contextualize “EST. 2026” where it undercuts maturity without extra proof

---

## P1 — High impact

### BrandIntro / first visit
- [ ] Shorten BrandIntro to ≤1s **or** make it non-blocking (don’t cover CTA for ~3.4s)
- [ ] Keep reduced-motion path short and non-blocking

### Homepage structure & CRO
- [ ] Sharpen hero value prop (who + outcome + geography), not only category copy
- [ ] Add proof line near hero (shipped launches + concepts count, or equivalent)
- [ ] Render a single `HeroProductWindow` (remove desktop+mobile duplicate mounts in `page.tsx`)
- [ ] Move shipped proof earlier; prefer static display over auto-rotate
- [ ] Add “Start a similar project” on homepage shipped cards
- [ ] Link shipped cards to internal case studies (`/work/africa-climate-finance`, `/work/byz`), not only external sites
- [ ] Reduce competing “Try demo / browse examples” exits before enquiry
- [ ] Compress homepage length especially on mobile (~9–15 screens today)
- [ ] Enlarge carousel pagination hit areas (≥24px, prefer 44px)
- [ ] Add pause control for auto-rotating hero demos
- [ ] Restyle IntentChips as proper tappable chips (not thin underlined `/`-separated text)

### Work / portfolio IA
- [ ] Restructure `/work` into clear **Shipped** vs **Concepts** priority
- [ ] Surface internal shipped case study links prominently
- [ ] Reduce Work hero height so first project row appears earlier on desktop
- [ ] Fix Work filter semantics (`aria-pressed` toggles **or** full tabs with panels/arrow keys)
- [ ] Add accessible names on image-only work/demo links (empty `alt=""` on sole link content)
- [ ] Add meta description for `/work/all`
- [ ] Group or paginate `/work/all` for mobile length

### Case studies
- [ ] Server-render most of `CaseStudyView`; extract accordion as a small client island
- [ ] Progressive disclosure for long “thinking” sections
- [ ] Add OG images per case study / project cover
- [ ] Title distinction: concept demos vs client work in metadata

### Company / About / Founder
- [ ] Permanent redirect `/about` → `/company`
- [ ] Remove `/about` from sitemap (if redirecting)
- [ ] Make Company hero primary CTA “Start a project” (not only “Explore our work”)
- [ ] Tighten Company page length (Identity → Proof → Engage → Close)
- [ ] Tighten Founder page (hero + one interactive section + connect)
- [ ] Fix Founder / Company tablist semantics where incomplete

### Capabilities
- [ ] Enlarge mobile pillar anchors (ATTRACT / TRANSACT / OPERATE / DECIDE) — e.g. 2×2 chips
- [ ] Lead each pillar with outcome + deliverables + demo + Start CTA; shorten body copy
- [ ] Soften abstract “compositions” language for buyers

### Reduced motion
- [ ] Stop interval auto-advance when `prefers-reduced-motion` is on (`HeroProductWindow`, `CapabilitySystem`, `ShippedCaseStudy`)
- [ ] Use Framer `useReducedMotion` / shared hook across marketing + demos
- [ ] Replace motion with instant state changes under reduced motion

### Analytics
- [ ] Wire real analytics for `kasi:analytics` events (or GA/Plausible)
- [ ] Track CTA clicks, form step drop-off, WhatsApp exits, submission failures

### SEO content / schema
- [ ] Add meta descriptions for `/faq`, `/lab`, `/privacy`, `/terms`, `/work/all`
- [ ] Add `FAQPage` JSON-LD on `/faq`
- [ ] Add `Organization` (and optionally `WebSite`) JSON-LD sitewide
- [ ] Decide demo index policy: add selected demos to sitemap **or** `noindex` consistently

### Start form UX / a11y
- [ ] Associate errors with inputs (`aria-invalid`, `aria-describedby`)
- [ ] Restore visible focus rings (avoid `outline-none` without replacement)
- [ ] Soften budget/timeline anxiety copy; allow exploratory budgets clearly
- [ ] Make WhatsApp auto-redirect optional or confirm before leaving page
- [ ] Add brief “what happens next” reassurance before contact step

### Code hygiene
- [ ] Delete or archive unused home components:
  - [ ] `WhyKasiTech.tsx`
  - [ ] `BeautifulIsntEnough.tsx`
  - [ ] `KasiMeansSpeed.tsx`
  - [ ] `SelectedWork.tsx`
  - [ ] `AllDemosStrip.tsx`
  - [ ] `PortfolioRouter.tsx`
  - [ ] `ShippedWork.tsx`
  - [ ] `WhatWeBuild.tsx`
  - [ ] `HowWeThink.tsx`
  - [ ] `HowWeEngage.tsx`
  - [ ] `BeyondClientWork.tsx`
- [ ] Fix ESLint `set-state-in-effect` errors (`Header`, `StartProjectForm`, `MpesaOverlay`, `KasiFlowDemo`, `MotoDemo`)
- [ ] Remove unused variables flagged in demos (`AmaniDemo`, `KasiFlowDemo`, `SokoDemo`)
- [ ] Get `npm run lint` green

### Lab / FAQ / legal polish (P1 content)
- [ ] Either densify `/lab` with real artifacts or demote from nav until ready
- [ ] Add FAQ jump links or accordion for mobile scanability
- [ ] Link WhatsApp/email from Privacy copy that mentions them

---

## P2 — Polish

### Header / navigation
- [ ] Keep Start CTA visible (don’t hide entire header on scroll, or leave CTA chip)
- [ ] Move Founder under Company dropdown (simplify primary nav)
- [ ] Demote Lab to Company subsection until content-ready
- [ ] Refine mega-menu open/close (optional click-to-pin)

### Performance / JS
- [ ] Replace simple Framer fades on marketing with CSS transitions
- [ ] Reduce unnecessary `"use client"` islands on static marketing surfaces
- [ ] Audit font weights/subsets for Space Grotesk, Outfit, JetBrains Mono
- [ ] Consider system mono for non-critical mono UI text
- [ ] Monitor/upgrade Next for high-severity transitive npm advisories

### Motion / micro-interactions
- [ ] Add pause controls to CapabilitySystem and ShippedCaseStudy rotators
- [ ] Slow or remove auto-rotation where it hurts reading
- [ ] Ensure DemoChrome overlays have focus trap / Escape / return focus

### Visual consistency
- [ ] Align border-radius language (`/card` rounded CTA vs sharp marketing)
- [ ] `aria-hidden` on decorative BrowserFrame dots
- [ ] SafeImage decorative fallback: hide when `alt=""`

### Demo chrome / demos
- [ ] Stronger persistent mobile bar: “KasiTech concept · Start a project”
- [ ] Ensure sticky DemoChrome doesn’t obscure primary demo CTAs on small screens
- [ ] Self-host critical Unsplash LCP heroes for top demos (at least Zuri)
- [ ] Lazy-split heavy demo admin/business/checkout views (dynamic import)

### Sitemap / metadata polish
- [ ] Stop rewriting every `lastModified` to `new Date()` on each build
- [ ] Absolute `openGraph.url` on `/card` for clarity
- [ ] Unique 404 title if App Router allows

### Content tightening
- [ ] Reduce repeated “products that work” / “what do you want to build” phrasing across home, company, footer
- [ ] Add short process explanation (Discover → Design → Build → Launch → Support)
- [ ] Amplify existing “24h reply” risk-reversal near CTAs

### Card / privacy / terms
- [ ] Align `/card` contact story with sitewide primary contact
- [ ] Verify Save Contact / vCard on real iOS and Android devices
- [ ] Expand Privacy/Terms only as needed for FormSubmit, Resend, localStorage reality

---

## P3 — Future enhancements

- [ ] Client testimonials (with approval)
- [ ] Logo bar / social proof strip
- [ ] Quantified case-study metrics (before/after, conversion, time-to-launch)
- [ ] Case study media kits / annotated screenshots
- [ ] Self-host all demo imagery
- [ ] Split monolithic mega-demos into route-level chunks
- [ ] Build Lab into a real product/R&D surface **or** remove from discovery
- [ ] Swahili (or bilingual) support if East Africa push intensifies
- [ ] CMS for case studies / FAQs
- [ ] Pricing / packages page if offers become productized
- [ ] Calendar booking for institutional buyers (alongside WhatsApp)
- [ ] Mid-funnel “Book a 20-min call” for buyers who won’t use WhatsApp
- [ ] Breadcrumbs on case studies / demo exits
- [ ] Optional search on 404 (popular work/demos)

---

## Preserve (do not “fix” away)

- [x] Brand colors (black / ivory / lime `#C7FF00`) and sharp geometric UI language
- [x] Outfit + Space Grotesk display system (refine weights only if needed)
- [x] Interactive demos as differentiator (with clearer concept vs shipped labeling)
- [x] `/start` conversational intake concept
- [x] FAQ honesty about demos vs client work
- [x] `/card` digital business card
- [x] Dark/ivory section rhythm on Company
- [x] Global `:focus-visible` and reduced-motion CSS baselines
- [x] Typed data modules (`projects.ts`, `case-studies.ts`, `shipped-work.ts`)

---

## Suggested implementation order

1. [ ] P0 enquiry + phone + mobile menu
2. [ ] P0 OG/canonical/www + contrast
3. [ ] P0 contact/trust hygiene (ops + copy)
4. [ ] P1 BrandIntro + homepage proof/CTA
5. [ ] P1 Work IA + `/about` redirect
6. [ ] P1 reduced-motion + form a11y + analytics
7. [ ] P1 SEO schema/meta + dead code/lint
8. [ ] P2 polish pass
9. [ ] P3 when proof assets and ops are ready
