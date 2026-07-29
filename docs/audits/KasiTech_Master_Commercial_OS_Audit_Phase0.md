# KasiTech Master Product & Implementation Audit

**Status:** Phase 0 audit only — no implementation started  
**Source catalog:** KasiTech_Publish_Ready_Services_Pricing_Catalog_2026_v2.docx  
**Target Price Book:** KT-PB-2026.1  
**Exported:** 2026-07-29  
**Canvas origin:** `master-commercial-os-audit.canvas.tsx`

> **STOP — awaiting administrator review.** Several commercial rules cannot be engineered without guessing. Resolve Admin Flags before authorizing Phase 1.

---

## 1. Overview

### Key metrics

| Metric | Value |
| --- | --- |
| Catalog line items extracted | 149 |
| ONE_TIME priced SKUs | 110 |
| Admin flags (do not guess) | 24+ |
| DB / auth / PDF / CRM today | 0 |

### Repository verdict

KasiTech today is a polished **Next.js 16** marketing site + **12 client-side concept demos** + a static TSh catalog at `/pricing`. It is **not** a commercial operating system. The Master Spec requires one Price Book powering Catalog → Demo Studio → Quote → SOW → Agreement → Invoice → Project → Care. That infrastructure does not exist yet.

### What exists

- Next 16.2 / React 19 / Tailwind 4 · App Router
- Brand system: black / ivory / `#c7ff00` · Outfit + Space Grotesk + JetBrains Mono
- `/pricing` from `src/data/catalog.ts` (~140 price fields, static)
- 12 demos under `/demo/*` (Zuri, Moto, Noir, Soko, Nest, Afya, Amani, Atlas, Nuru, Impact, Kasi Flow, Intelligence)
- Lead path: `/start` → localStorage + FormSubmit + optional Resend/Formspree + WhatsApp
- Deployed on Vercel · kasitechinnovations.com

### What does not exist

- Database, Prisma/Drizzle, migrations
- Auth / roles (PUBLIC · CLIENT · STAFF · ADMIN)
- Canonical Price Book engine + versioning + snapshots
- `/demo-studio` configurator (catalog §21 destination)
- Quotes, SOW, agreements, invoices, receipts, change requests
- PDF generation (catalog print CSS only)
- Internal OS, client portal, payments, care tracking
- Automated tests / CI

### Catalog coverage confirmation

Every customer-facing priced item from the approved catalog is inventoried: **149 line items** across websites, features, booking, payments, commerce, languages, 7 industry groups, 8 bundles, SEO/local, social/ads, branding, KasiTech Business, custom solutions, care, hosting, delivery, and discovery. Policy sections (§13–§22) are mapped as commercial rules / document modules — not invented SKUs.

### Existing `/pricing` vs Word source

| Area | Status |
| --- | --- |
| Core priced packages / features / industries / bundles | Ported in catalog.ts — good price fidelity |
| Package comparison matrix + delivery windows | Present on /pricing |
| Payment schedule tiers (§13) | Present |
| Hosting/domain/SSL policy table (§17) | Partial — email priced; domain/hosting prose incomplete |
| Content population limits (§17) | Not structured as engine rules yet |
| Warranty / handover matrix (§18) | Condensed in terms highlights |
| Social scope definitions (§19) | Missing from web catalog |
| Demo Studio destination /demo-studio (§21) | Not built — demos are separate /demo/* |
| Contact placeholders in Word §22 | Site has real social/WhatsApp; business email still personal iCloud |

---

## 2. Price Book Inventory (KT-PB-2026.1)

Proposed service codes are **provisional** naming for the Price Book schema. Prices match the approved catalog exactly. Codes themselves need admin approval before freeze.

| Code | Name | Category | Price (TSh) | Billing |
| --- | --- | --- | --- | --- |
| WEB-ONE | One Page | Websites | 500,000 | ONE_TIME |
| WEB-ESS | Essential | Websites | 900,000 | ONE_TIME |
| WEB-BUS | Business | Websites | 1,500,000 | ONE_TIME |
| WEB-BUSP | Business+ | Websites | 2,250,000 | ONE_TIME |
| WEB-PRO | Professional | Websites | 3,250,000 | ONE_TIME |
| WEB-SIG | Signature | Websites | 4,500,000 | ONE_TIME |
| WEB-CUS | Custom Platform | Websites | Custom Quote | CUSTOM_QUOTE |
| ADD-PAGE | Additional standard page | Website Features | 100,000 | ONE_TIME |
| ADD-LAND | Custom landing page | Website Features | 250,000 | ONE_TIME |
| ADD-BLOG | Blog / News | Website Features | 300,000 | ONE_TIME |
| ADD-PORT | Projects / Portfolio | Website Features | 350,000 | ONE_TIME |
| ADD-CASE | Case Studies | Website Features | 300,000 | ONE_TIME |
| ADD-TEAM | Team / Leadership | Website Features | 200,000 | ONE_TIME |
| ADD-CARE | Careers / Vacancies | Website Features | 300,000 | ONE_TIME |
| ADD-RES | Resource Centre | Website Features | 300,000 | ONE_TIME |
| ADD-EVT | Events | Website Features | 300,000 | ONE_TIME |
| ADD-SRCH | Advanced Site Search | Website Features | 350,000 | ONE_TIME |
| ADD-MULTI | Multi-location Directory | Website Features | 300,000 | ONE_TIME |
| ADD-MAP | Interactive Map | Website Features | 400,000 | ONE_TIME |
| ADD-INQ | Advanced Inquiry Form | Website Features | 150,000 | ONE_TIME |
| ADD-STEP | Multi-step Form | Website Features | 250,000 | ONE_TIME |
| ADD-QUOTE | Quote Request System | Website Features | 300,000 | ONE_TIME |
| ADD-FILE | File Uploads | Website Features | 100,000 | ONE_TIME |
| ADD-FEED | Social Feed | Website Features | 150,000 | ONE_TIME |
| ADD-BOT | Website Chatbot | Website Features | 350,000 | ONE_TIME |
| BKG-EXT | External Booking Integration | Booking | 250,000 | ONE_TIME |
| BKG-APT | Appointment Booking | Booking | 650,000 | ONE_TIME |
| BKG-STAFF | Multi-staff Booking | Booking | 1,250,000 | ONE_TIME |
| BKG-REST | Restaurant Reservations | Booking | 600,000 | ONE_TIME |
| BKG-TOUR | Tour / Activity Booking | Booking | 900,000 | ONE_TIME |
| BKG-HOTINT | Hotel Booking Integration | Booking | 400,000 | ONE_TIME |
| BKG-HOTCUS | Custom Hotel Booking | Booking | 2,000,000 | ONE_TIME |
| BKG-CAL | Availability Calendar | Booking | 400,000 | ONE_TIME |
| PAY-STD | Standard Payment Integration | Payments | 500,000 | ONE_TIME |
| PAY-DEP | Deposit Payments | Payments | 350,000 | ONE_TIME |
| PAY-REC | Recurring Payments | Payments | 750,000 | ONE_TIME |
| PAY-DON | Donation Payments | Payments | 500,000 | ONE_TIME |
| PAY-API | Custom / Direct Payment API | Payments | Custom Quote | CUSTOM_QUOTE |
| ECOM-START | Starter Store | E-commerce | 1,500,000 | ONE_TIME |
| ECOM-BUS | Business Store | E-commerce | 2,500,000 | ONE_TIME |
| ECOM-ADV | Advanced Store | E-commerce | 4,000,000 | ONE_TIME |
| ECOM-CUS | Custom Commerce | E-commerce | Custom Quote | CUSTOM_QUOTE |
| LANG-ENSW | English + Swahili functionality | Languages | 400,000 | ONE_TIME |
| LANG-ADD | Each additional language | Languages | 300,000 | ONE_TIME |
| LANG-TRANS | Professional translation | Languages | Custom Quote | CUSTOM_QUOTE |
| TOUR-CAT | Tour/Safari Catalogue | Industry · Tourism | 400,000 | ONE_TIME |
| TOUR-ITIN | Itinerary Templates | Industry · Tourism | 300,000 | ONE_TIME |
| TOUR-INQ | Tour Inquiry | Industry · Tourism | 300,000 | ONE_TIME |
| TOUR-BKG | Tour Booking | Industry · Tourism | 900,000 | ONE_TIME |
| TOUR-BUILD | Itinerary Builder | Industry · Tourism | 900,000 | ONE_TIME |
| RE-LIST | Property Listings | Industry · Real Estate | 650,000 | ONE_TIME |
| RE-FILT | Search & Filters | Industry · Real Estate | 450,000 | ONE_TIME |
| RE-AGENT | Agent Profiles | Industry · Real Estate | 250,000 | ONE_TIME |
| RE-INQ | Property Inquiry | Industry · Real Estate | 250,000 | ONE_TIME |
| RE-MAP | Property Map | Industry · Real Estate | 450,000 | ONE_TIME |
| REST-MENU | Digital Menu | Industry · Restaurant | 300,000 | ONE_TIME |
| REST-AMENU | Advanced Menu | Industry · Restaurant | 450,000 | ONE_TIME |
| REST-RSV | Reservations (industry listing) | Industry · Restaurant | 600,000 | ONE_TIME |
| REST-ORDER | Online Ordering | Industry · Restaurant | 900,000 | ONE_TIME |
| REST-BRANCH | Multi-branch | Industry · Restaurant | 350,000 | ONE_TIME |
| REST-QR | QR Menu | Industry · Restaurant | 150,000 | ONE_TIME |
| EDU-ADM | Admissions | Industry · Education | 450,000 | ONE_TIME |
| EDU-FAC | Faculty Directory | Industry · Education | 250,000 | ONE_TIME |
| EDU-COURSE | Course Catalogue | Industry · Education | 400,000 | ONE_TIME |
| EDU-STUD | Student Portal | Industry · Education | 2,000,000 | ONE_TIME |
| EDU-PAR | Parent Portal | Industry · Education | 2,000,000 | ONE_TIME |
| EDU-FEE | Fee Payments | Industry · Education | 750,000 | ONE_TIME |
| NGO-PROG | Programs / Projects | Industry · NGO | 350,000 | ONE_TIME |
| NGO-DON | Donations (NGO listing) | Industry · NGO | 500,000 | ONE_TIME |
| NGO-PUB | Publications | Industry · NGO | 300,000 | ONE_TIME |
| NGO-VOL | Volunteer Applications | Industry · NGO | 250,000 | ONE_TIME |
| NGO-PORT | Donor Portal | Industry · NGO | 1,750,000 | ONE_TIME |
| HLTH-DIR | Practitioner Directory | Industry · Healthcare | 250,000 | ONE_TIME |
| HLTH-APT | Appointments (healthcare listing) | Industry · Healthcare | 650,000 | ONE_TIME |
| HLTH-FORM | Patient Forms | Industry · Healthcare | 250,000 | ONE_TIME |
| HLTH-PORT | Patient Portal | Industry · Healthcare | 2,500,000 | ONE_TIME |
| HLTH-TELE | Teleconsult Integration | Industry · Healthcare | 450,000 | ONE_TIME |
| LOG-QUOTE | Quote Workflow | Industry · Logistics | 300,000 | ONE_TIME |
| LOG-INQ | Shipment Inquiry | Industry · Logistics | 350,000 | ONE_TIME |
| LOG-TRACK | Tracking Interface | Industry · Logistics | 650,000 | ONE_TIME |
| LOG-API | Live Tracking API | Industry · Logistics | 1,250,000 | ONE_TIME |
| LOG-PORT | Customer Portal | Industry · Logistics | 2,000,000 | ONE_TIME |
| BND-LAUNCH | Business Launch | Bundles | 1,250,000 | ONE_TIME |
| BND-BEAUTY | Beauty & Booking | Bundles | 1,050,000 | ONE_TIME |
| BND-REST | Restaurant Bundle | Bundles | 1,850,000 | ONE_TIME |
| BND-STORE | Online Store | Bundles | 2,850,000 | ONE_TIME |
| BND-TOUR | Tourism Bundle | Bundles | 2,850,000 | ONE_TIME |
| BND-RE | Real Estate Bundle | Bundles | 2,650,000 | ONE_TIME |
| BND-PRES | Professional Presence | Bundles | 3,750,000 | ONE_TIME |
| BND-GROW | Digital Growth | Bundles | 2,250,000 | MONTHLY |
| SEO-FND | SEO Foundation | SEO | 400,000 once | ONE_TIME |
| SEO-PRO | Professional SEO Setup | SEO | 750,000 once | ONE_TIME |
| SEO-ADV | Advanced SEO Setup | SEO | 1,250,000 once | ONE_TIME |
| SEO-CARE | SEO Care | SEO | 350,000 | MONTHLY |
| SEO-GROW | SEO Growth | SEO | 650,000 | MONTHLY |
| SEO-AUTH | SEO Authority | SEO | 1,100,000 | MONTHLY |
| LOC-GBP | Google Business Profile | Local Search | 150,000 | ONE_TIME |
| LOC-OPT | Local Search Optimization | Local Search | 250,000 | ONE_TIME |
| LOC-REV | Review Strategy Setup | Local Search | 100,000 | ONE_TIME |
| SOC-ESS | Social Essential | Social Media | 350,000 | MONTHLY |
| SOC-GROW | Social Growth | Social Media | 650,000 | MONTHLY |
| SOC-PRO | Social Pro | Social Media | 1,000,000 | MONTHLY |
| SOC-CORP | Social Corporate | Social Media | 1,750,000 | MONTHLY |
| ADS-META-S | Meta Ads Setup | Advertising | 200,000 once | ONE_TIME |
| ADS-META-M | Meta Management | Advertising | 300,000 + tier | MONTHLY |
| ADS-GOOG-S | Google Ads Setup | Advertising | 300,000 once | ONE_TIME |
| ADS-GOOG-M | Google Management | Advertising | 400,000 + tier | MONTHLY |
| ADS-LAND | Campaign Landing Page | Advertising | 250,000 | ONE_TIME |
| BR-LOGOR | Logo Refresh | Branding & Content | 300,000 | ONE_TIME |
| BR-LOGO | Professional Logo | Branding & Content | 500,000 | ONE_TIME |
| BR-VIS | Visual Identity | Branding & Content | 900,000 | ONE_TIME |
| BR-GUIDE | Brand Guidelines | Branding & Content | 450,000 | ONE_TIME |
| BR-CARD | Business Card | Branding & Content | 150,000 | ONE_TIME |
| BR-LETTER | Letterhead | Branding & Content | 100,000 | ONE_TIME |
| BR-PROF | Company Profile | Branding & Content | 450,000 | ONE_TIME |
| BR-DECK | Corporate Deck | Branding & Content | 450,000 | ONE_TIME |
| BR-BROCH | Brochure / Catalogue | Branding & Content | 350,000 | ONE_TIME |
| BR-SOCIAL | Social Visual System | Branding & Content | 350,000 | ONE_TIME |
| COPY-1 | One-page Copywriting | Branding & Content | 200,000 | ONE_TIME |
| COPY-5 | Up to 5 Pages Copywriting | Branding & Content | 400,000 | ONE_TIME |
| COPY-10 | Up to 10 Pages Copywriting | Branding & Content | 650,000 | ONE_TIME |
| COPY-20 | Up to 20 Pages Copywriting | Branding & Content | 1,100,000 | ONE_TIME |
| MEDIA-PROD | Photography & Video | Branding & Content | Custom Quote | CUSTOM_QUOTE |
| KB-LAUNCH | KasiTech Business Launch | KasiTech Business | 150,000 | MONTHLY |
| KB-GROW | KasiTech Business Growth | KasiTech Business | 400,000 | MONTHLY |
| KB-PRO | KasiTech Business Pro | KasiTech Business | 800,000 | MONTHLY |
| KB-SCALE | KasiTech Business Scale | KasiTech Business | 1,500,000 | MONTHLY |
| KB-ENT | KasiTech Business Enterprise | KasiTech Business | Custom Quote | CUSTOM_QUOTE |
| CUS-WEBAPP | Custom Web Application | Custom Solutions | Custom Quote | CUSTOM_QUOTE |
| CUS-CRM | CRM / Inventory / Operations | Custom Solutions | Custom Quote | CUSTOM_QUOTE |
| CUS-DASH | Dashboard / Data Platform | Custom Solutions | Custom Quote | CUSTOM_QUOTE |
| CUS-AI | AI / Automation System | Custom Solutions | Custom Quote | CUSTOM_QUOTE |
| CUS-MOBILE | Mobile Application | Custom Solutions | Custom Quote | CUSTOM_QUOTE |
| CUS-API | API / Third-party Integration | Custom Solutions | Custom Quote | CUSTOM_QUOTE |
| CARE-ESS | Essential Care | Care | 180,000 | ANNUAL |
| CARE-STD | Standard Care | Care | 300,000 | ANNUAL |
| CARE-BUS | Business Care | Care | 600,000 | ANNUAL |
| CARE-PRO | Professional Care | Care | 150,000 | MONTHLY |
| CARE-PRI | Priority Care | Care | 300,000 | MONTHLY |
| HOST-EMAIL | Business email setup | Hosting | 150,000 | ONE_TIME |
| HOST-EMAIL-ADD | Additional email setup | Hosting | 25,000 / address | ONE_TIME |
| HOST-DOMAIN | Domain registration / renewal | Hosting | Third-party | THIRD_PARTY |
| HOST-HOSTING | Website hosting | Hosting | Third-party / care | THIRD_PARTY |
| HOST-SSL | SSL certificate | Hosting | Included w/ hosting | INCLUDED |
| DEL-STD | Standard Delivery | Delivery | Included | INCLUDED |
| DEL-PRI | Priority Delivery | Delivery | +25% | SURCHARGE |
| DEL-RUSH | Rush Delivery | Delivery | +40% | SURCHARGE |
| DEL-EMER | Accelerated / Emergency | Delivery | +50% | SURCHARGE |
| DISC-COMPLEX | Formal Discovery Phase | Custom Work | Custom Quote | CUSTOM_QUOTE |

### Not separate SKUs (commercial rules / entitlements)

Website baseline inclusions · package comparison capabilities · payment schedule bands · revision rounds · 30-day warranty · content population limits · social scope definitions · tax treatment · pause/reactivation language · cancellation (agreement-governed). These become rule engines + document modules, not inventable prices.

---

## 3. Matrices

### Package matrix

| Capability | One Page | Essential | Business | Business+ | Professional | Signature |
| --- | --- | --- | --- | --- | --- | --- |
| Price | 500k | 900k | 1.5M | 2.25M | 3.25M | 4.5M |
| Delivery | 7–10d | 2–3w | 3–4w | 4–6w | 6–8w | 8–10w |
| Pages | 1 | ≤5 | ≤10 | ≤15 | ≤20 | Bespoke |
| CMS | — | Selected | ✓ | ✓ | ✓ | ✓ |
| Blog / News | Add-on | Add-on | ✓ | ✓ | ✓ | ✓ |
| Portfolio | Add-on | Add-on | ✓ | ✓ | ✓ | ✓ |
| Case / Team / Resources | Add-on | Add-on | Add-on | ✓ | ✓ | ✓ |
| Advanced forms | Add-on | Add-on | ✓ | ✓ | ✓ | ✓ |
| SEO level | Basic | Basic | Enhanced | Technical | Technical | Advanced |
| UX/UI | Focused | Standard | Enhanced | Advanced | Advanced | Bespoke |
| Premium interactions | — | — | — | Selected | Selected | ✓ |

### Bundle matrix

| Bundle | Price | Mapped components | Mapped sum | Implied savings | Unmapped inclusions |
| --- | --- | --- | --- | --- | --- |
| Business Launch | 1,250,000 | Essential + GBP + Email | 1,200,000 | Cannot compute | enhanced SEO · analytics |
| Beauty & Booking | 1,050,000 | One Page + Ext Booking + GBP | 900,000 | Cannot compute | gallery · social integration |
| Restaurant | 1,850,000 | Essential + Digital Menu + Reservations + GBP | 1,950,000 | ~100,000 (if gallery free) | gallery |
| Online Store | 2,850,000 | Essential + Starter Store + Std Payment | 2,900,000 | 50,000 | — |
| Tourism | 2,850,000 | Business + Tour Cat + Itinerary + Inquiry | 2,500,000 | Cannot compute | enhanced SEO |
| Real Estate | 2,650,000 | Business + Listings + Filters + Inquiry | 2,850,000 | 200,000 | — |
| Professional Presence | 3,750,000 | Professional + Pro SEO Setup + GBP | 4,150,000 | 400,000 | — |
| Digital Growth | 2,250,000 /mo | Social Pro + SEO Growth | 1,650,000 /mo | Cannot compute | website care/content allowance |

> **Warning:** Bundle savings cannot be auto-detected for 4 of 8 bundles until unmapped inclusions are mapped to SKUs (or given explicit zero-price entitlement codes).

### Care plan matrix

| Plan | Price | Period | Catalog inclusions (exact text) |
| --- | --- | --- | --- |
| Essential Care | 180,000 | year | Small/static site · SSL monitoring · technical checks |
| Standard Care | 300,000 | year | Small-business maintenance · backups · technical checks |
| Business Care | 600,000 | year | Maintenance · backups · monitoring · defined minor content updates |
| Professional Care | 150,000 | month | Routine support · maintenance · defined content updates |
| Priority Care | 300,000 | month | Priority support · monitoring · backups · analytics checks · content support |
| No Care Plan | — | — | Allowed; hosting/third-party must remain active for site to stay online |

Catalog does not quantify update hours, SLA response times, or backup frequency. Comparison UI must not invent entitlements.

### KasiTech Business plan matrix

| Plan | Price / month | Users | Locations | Catalog modules |
| --- | --- | --- | --- | --- |
| Launch | 150,000 | 1 | 1 | Website editor · basic analytics |
| Growth | 400,000 | ≤5 | — | Customer DB · bookings · events · QR · standard analytics |
| Pro | 800,000 | ≤10 | 2 | Advanced analytics · expanded workflows |
| Scale | 1,500,000 | ≤25 | 5 | Advanced operations |
| Enterprise | Custom | Custom | Custom | Custom users, locations, integrations, workflows |

### Industry → feature priority (Demo Studio)

| Industry | Catalog features (priced) | Demo Studio §21 listed? | Existing /demo |
| --- | --- | --- | --- |
| Beauty & Wellness | Uses One Page + Ext Booking + gallery (bundle) | Yes | /demo/noir (events — closest) |
| Restaurant | Menu, Reservations, Ordering, Multi-branch, QR | Yes | /demo/moto |
| Tourism | Catalogue, Itinerary, Inquiry, Booking, Builder | Yes | /demo/zuri |
| Real Estate | Listings, Filters, Agents, Inquiry, Map | Yes | /demo/nest |
| Retail / E-commerce | Stores + payments | Yes | /demo/soko |
| Professional Services | General website features | Yes | /demo/amani |
| Education | Admissions, Faculty, Courses, Portals, Fees | Yes (Education/NGO) | /demo/nuru |
| NGO | Programs, Donations, Publications, Volunteer, Donor portal | Yes (Education/NGO) | /demo/impact |
| Healthcare | Directory, Appointments, Forms, Portal, Teleconsult | NO in §21 list | /demo/afya |
| Logistics | Quote, Inquiry, Tracking, API, Portal | NO in §21 list | /demo/atlas |
| General Business | Website packages + add-ons | Yes | — |
| Hospitality / Hotel | Hotel booking integration / custom | Not named (under Tourism?) | /demo/zuri |

### Feature dependency matrix (proposed — needs approval)

> **Danger:** Catalog does not define formal dependency rules. Below are engineering proposals inferred from product sense — NOT approved commercial rules.

| If client selects… | Proposed requires… | Status |
| --- | --- | --- |
| Any store / industry module | Website package (or bundle that includes one) | Catalog implies — FLAG confirm |
| Deposit / Recurring / Donation payments | Standard Payment Integration? | NOT stated — FLAG |
| Multi-staff Booking | Appointment Booking? | NOT stated — FLAG |
| Advanced Menu | Digital Menu? | NOT stated — FLAG |
| Business Store / Advanced Store | Not Starter — mutually exclusive tiers? | NOT stated — FLAG |
| Tour Booking | Tour Catalogue? | NOT stated — FLAG |
| Live Tracking API | Tracking Interface? | NOT stated — FLAG |
| Parent/Student/Donor/Patient portals | Website foundation + auth/security scoping | Sensitive-data note only |
| Delivery surcharge | One-time project fee base | Stated (§16) |
| Package-included feature | Do not charge again | Stated (§02) |

### Document data mapping

| Document | Primary data sources | Must snapshot |
| --- | --- | --- |
| Catalog PDF | Active Price Book | Price Book version |
| Project Estimate | Configuration + Price Book + delivery calc | Full commercial snapshot |
| Formal Quote | Client + Config snapshot + schedule + tax | Yes — immutable |
| SOW | Quote line items → sowLanguage / acceptanceCriteria | Yes — matches quote |
| Agreement | Client legal + quote/SOW refs + legal modules | Template version + commercial refs |
| Invoice | Approved payment milestone from schedule | Yes — amounts frozen |
| Receipt | Payment record + invoice balance | Yes |
| Change Request | Delta vs accepted scope + new totals | Yes |
| Approval Certificate | Approval event + project version | Yes |

### Commercial lifecycle

`PUBLIC_CONFIG → ESTIMATE → LEAD → INTERNAL_REVIEW → FORMAL_QUOTE → ACCEPTED_QUOTE → SOW → AGREEMENT → CONTRACTED → INVOICE → PAYMENT → ACTIVE_PROJECT`

Document states: `DRAFT · READY_FOR_REVIEW · SENT · VIEWED · ACCEPTED · SUPERSEDED · CANCELLED`

### Project lifecycle

`READY_TO_START · WAITING_FOR_CLIENT · ACTIVE · AWAITING_CLIENT · ON_HOLD · LAUNCHED · WARRANTY · CARE · COMPLETED · CANCELLED`

Approval gates: `DESIGN · DEVELOPMENT · FINAL_ACCEPTANCE`. Post-approval scope change → Change Request.

---

## 4. Administrator Flags — Do Not Guess

### A. Bundle composition & savings (blocking)

| ID | Issue | Why it blocks |
| --- | --- | --- |
| F01 | Business Launch includes 'enhanced SEO' — not a SKU | Cannot compute standalone value or auto-detect eligibility |
| F02 | Beauty & Booking includes 'gallery' and 'social integration' — not SKUs | Same — savings math incomplete |
| F03 | Restaurant / Beauty bundles include 'gallery' — not SKUs | Need zero-price entitlement codes or map to a feature |
| F04 | Tourism bundle includes 'enhanced SEO' — not a SKU | Same as F01 |
| F05 | Digital Growth: 'website care/content within allowance' | Which care plan? What quantitative allowance? |
| F06 | 4 of 8 bundles cannot show approved savings without F01–F05 | APPLY BUNDLE UI incomplete |

### B. Duplicate / overlapping line items

| Pair | Both priced | Question |
| --- | --- | --- |
| BKG-REST vs REST-RSV (Reservations) | 600,000 each | Same service listed twice, or distinct? |
| BKG-TOUR vs TOUR-BKG (Tour Booking) | 900,000 each | Alias or separate? |
| BKG-APT vs HLTH-APT (Appointments) | 650,000 each | Industry alias of Appointment Booking? |
| PAY-DON vs NGO-DON (Donations) | 500,000 each | Payment module vs NGO feature? |
| ADD-LAND vs ADS-LAND (Landing page) | 250,000 each | Same SKU under two categories? |
| EDU-FEE 750k vs PAY-REC 750k | Same price | Fee Payments include Recurring Payments or additive? |

### C. Missing dependency / exclusivity rules

| ID | Gap |
| --- | --- |
| F10 | Does any e-commerce/industry feature require a minimum website package? |
| F11 | Are store tiers mutually exclusive? |
| F12 | Do Deposit/Recurring/Donation require Standard Payment Integration? |
| F13 | Does Multi-staff require Appointment Booking? |
| F14 | Does Advanced Menu require Digital Menu? |
| F15 | SEO Care/Growth/Authority exclusivity vs stacking? |
| F16 | Social plan exclusivity vs stacking? |
| F17 | Care plans exclusivity (one only)? |
| F18 | KasiTech Business plans exclusivity? |

### D. Timeline & delivery

| ID | Gap |
| --- | --- |
| F20 | Delivery windows stated for website packages only — how do add-ons/industry modules extend timeline? |
| F21 | How is 'standard project fee' defined for surcharge when mix of one-time + monthly? |
| F22 | Business-day calendar / timezone for completion date calculation? |
| F23 | Which configurations are ineligible for Rush/Emergency (API/payment-provider deps)? |

### E. Care / KB entitlements

| ID | Gap |
| --- | --- |
| F30 | No quantitative content-update hours for any care plan |
| F31 | No SLA response times except word 'Priority' |
| F32 | Hosting 'included only where stated in care plan' — which plans include hosting? |
| F33 | KB Growth 'bookings · events · QR' — map to which website/booking SKUs for demo unlock? |
| F34 | KB Pro/Scale 'expanded workflows / advanced operations' — undefined module list |

### F. Legal / tax / commercial

| ID | Gap |
| --- | --- |
| F40 | No approved CSA / SOW / quote legal templates supplied yet |
| F41 | Tax: catalog says prices before tax if legally required — is KasiTech VAT-registered? Rate? |
| F42 | Cancellation/refunds: agreement-governed — need approved modules |
| F43 | Project pause/reactivation rules referenced but not numerically defined in catalog |
| F44 | Discount types beyond published bundles not defined (referral/strategic/discretionary caps) |
| F45 | Ads management 15% over spend threshold — of media spend, billed how/when? |

### G. Demo Studio scope

| ID | Gap |
| --- | --- |
| F50 | §21 Demo Studio industries omit Healthcare & Logistics despite priced features + existing demos |
| F51 | No dedicated Beauty/Salon demo — Noir is nightlife/events |
| F52 | Gallery / social integration lack SKUs but appear in Demo Studio expectations |
| F53 | Implementation task templates for ALL services — none exist in catalog (must be authored, not invented as commercial) |

---

## 5. Proposed Architecture

### Three experiences

| Surface | Role |
| --- | --- |
| **A · Public Catalog** `/pricing` | Search, filter, compare, add-to-build, downloadable PDF from Price Book |
| **B · Public Demo Studio** `/demo-studio` | Industry schemas + feature toggles driven by Price Book IDs; reuse `/demo/*` as content packs |
| **C · Private KasiTech OS** `/app` | CRM, configurator, documents, finance, delivery, care. Generate ≠ authorize |

### Canonical engines

| Engine | Responsibility |
| --- | --- |
| Price Book | Versioned SKUs KT-PB-YYYY.N — sole price source |
| Configuration | Industry + package/bundle + features + care + KB + delivery |
| Compatibility | Dependencies, incompatibilities, package inclusions, no double charge |
| Bundle | Exact bundle price, savings vs mapped SKUs, eligibility detection |
| Pricing | Integer TSh totals: one-time / monthly / annual / third-party / first-12 |
| Timeline | Base window + add-on impact (after F20) + delivery surcharge dates |
| Snapshot | Immutable commercial JSON on every issued document |
| Preflight | Block issue until validation checklist passes |
| Numbering | Transactional KT-Q / SOW / AGR / INV / RCP / CR sequences |
| Audit | Append-only event log for commercial & security events |

### Proposed database (Postgres)

Suggested stack: Vercel + Neon/Supabase Postgres + Drizzle ORM + Auth.js (or Clerk) · object storage for PDFs · Resend for email. Exact vendor choice is an admin decision.

| Domain | Core tables |
| --- | --- |
| Price Book | price_books, services, service_versions, package_inclusions, bundles, bundle_items, dependencies |
| CRM | companies, contacts, leads, opportunities, activities |
| Config | configurations, configuration_items, configuration_snapshots, build_comparisons |
| Commercial | estimates, quotes, sows, agreements, invoices, payments, receipts, change_requests, discounts |
| Delivery | projects, tasks, task_templates, approvals, readiness_items, assets, credentials_vault |
| Care | care_subscriptions, entitlements_usage, warranties, renewals, support_tickets |
| System | users, roles, audit_events, document_numbers, legal_templates |

### Migration strategy (do not break the site)

| Step | Approach |
| --- | --- |
| 1 | Keep existing marketing routes untouched initially |
| 2 | Introduce packages/price-book + packages/pricing-engine as new modules |
| 3 | Migrate src/data/catalog.ts → generated from Price Book seed (single source) |
| 4 | Add /demo-studio beside existing /demo/*; gradually wrap demos as content packs |
| 5 | Add /app/* behind auth; SiteChrome already excludes /demo — extend for /app |
| 6 | Replace FormSubmit lead path with DB leads after Phase 5; keep WhatsApp as channel |
| 7 | Feature flags for public catalog redesign vs current /pricing |
| 8 | No rewrite of working demos required for Phase 1–2 |

### Security review (proposed)

| Area | Control |
| --- | --- |
| AuthZ | Server-side RBAC — PUBLIC / CLIENT / STAFF / ADMIN — never UI-only |
| Documents | Signed URLs · role checks · no regenerate-from-live-prices |
| Credentials | Encrypted vault · no secrets in PDFs · prefer delegated provider access |
| Money | Integer minor units (TSh) · deterministic calc · no LLM math |
| Audit | Immutable append log for price/book/document/payment/credential events |
| PII | Least privilege · MFA for staff · separate client portal tenancy |
| Internal costing | Never exposed on public or client APIs |

### Testing strategy

Golden configs with known totals · unit tests for every pricing rule · snapshot tests for issued documents · e2e public journey · e2e internal pack · e2e project/CR/launch. A pricing change is incomplete until financial tests pass.

---

## 6. Implementation Phases

| Phase | Scope | Gate |
| --- | --- | --- |
| 0 | This audit | YOU ARE HERE — awaiting approval + flag answers |
| 1 | Price Book · schema · migrate all SKUs · engines · financial tests | Flags F01–F45 resolved or explicitly deferred with blocked features |
| 2 | Public catalog redesign · search/filter/compare · catalog PDF | Price Book frozen KT-PB-2026.1 |
| 3 | Demo Studio · industries · toggles · bundles · care · KB preview · summary | Dependency rules approved |
| 4 | Save/share/compare · estimate PDF · Submit → Lead | Snapshot format locked |
| 5 | Internal CRM · clients · sales configurator (mobile-first) | Auth live |
| 6 | Quote · SOW · Agreement · Invoice · numbering · preflight | Legal templates approved |
| 7 | Payments · receipts · approvals · CRs · auto project/tasks | Payment schedule rules confirmed |
| 8 | Client portal · care · support · warranty · renewals | Portal MVP scope signed off |
| 9 | Analytics · internal costing · audit hardening · a11y · e2e QA | Definition of success checklist |

### Recommended immediate decisions

1. Approve or amend provisional service codes (WEB-ONE, etc.).
2. Resolve bundle unmapped inclusions (F01–F05) — map to SKUs or create entitlement codes at TSh 0.
3. Confirm duplicate pairs (Reservations, Tour Booking, Appointments, Donations, Landing Page).
4. Supply or authorize drafting of dependency rules (F10–F18).
5. Confirm Demo Studio industries include Healthcare + Logistics.
6. Confirm tax posture and approve legal template authorship process.
7. Choose DB/auth vendors (recommendation: Postgres + Auth.js or Clerk on Vercel).
8. Explicitly authorize Phase 1 start after flags are answered.

---

## Coverage statement

Every customer-facing priced service, package, bundle, care plan, KasiTech Business plan, delivery surcharge, and custom-quote category in the approved 2026 v2 catalog has been accounted for in the inventory. Policy sections are accounted for as rules/modules. Items that cannot be implemented without guessing are flagged — not invented.

**No major implementation begun.** Authorize Phase 1 only after reviewing flags.
