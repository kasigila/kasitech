# KasiTech Master Commercial OS Audit — Phase 0 Rev 1.1

**Status:** Preliminary audit accepted · Phase 1 NOT authorized  
**Revision:** 1.1 — administrator decisions applied (30 Jul 2026)  
**Exported:** 2026-07-30  
**Price Book target:** KT-PB-2026.1  
**Source catalog:** KasiTech_Publish_Ready_Services_Pricing_Catalog_2026_v2.docx

---

## Phase 1 blockers ONLY

> Five decisions remain. Everything else is resolved, deferred past Phase 1, or represented as nullable/unresolved metadata.

| ID | Decision required | Why Phase 1 needs it | Safe interim if deferred in writing |
| --- | --- | --- | --- |
| P1-A | When PAY-DEP / PAY-REC / PAY-DON / EDU-FEE is selected, is the commercial charge ONLY that SKU, or must PAY-STD also be charged? | Payment charge-record generation | Charge selected payment SKU only; never auto-add PAY-STD; preflight WARNING until answered |
| P1-B | Upgrade commercial relationships: BKG-STAFF↔BKG-APT, REST-AMENU↔REST-MENU, optionally LOG-API↔LOG-TRACK — charge higher only, both, or replacement delta? | Correct configurator totals | commercialRule=PENDING; refuse final estimate if both would be charged until approved |
| P1-C | Approve provisional codes (WEB-ONE, BKG-REST, ENT-GALLERY, …) or supply final coding scheme | Stable IDs for seed + golden tests | Codes can migrate later; freeze preferred |
| P1-D | Digital Growth: define ENT-CARE-CONTENT-TBD or confirm free-text inclusion without entitlement code | BND-GROW composition | Free-text catalog inclusion; no savings UI; no invented care SKU |
| P1-E | EDU-FEE vs PAY-REC (both 750k): alias, replacement, or additive? | Education double-charge risk | Treat distinct; never auto-add PAY-REC with EDU-FEE |

### Explicitly NOT Phase 1 blockers

| Topic | Disposition |
| --- | --- |
| Industry duplicate SKUs | Resolved → SERVICE_ALIAS |
| Exclusive tier families | Resolved |
| Demo Studio industries + Beauty schema | Resolved (Phase 3 build) |
| Invented entitlement prices / false savings | Resolved — forbidden |
| timelineImpact invention | Resolved — nullable; matrix later |
| Care hours / SLA / backup / hosting inclusion | Deferred — catalog text only |
| KB expanded workflows / advanced ops | Deferred — undefined modules flagged |
| VAT / cancellation / refunds / legal clauses | Deferred — document phases |
| Auth / Clerk / Auth.js | Deferred — schema-ready only |
| Ads 15% overspend billing mechanics | Deferred — store rule text |

---

## Administrator decisions applied

| # | Decision | Effect |
| --- | --- | --- |
| 1 | Industry duplicates → aliases | One commercial charge; presentation via SERVICE_ALIAS |
| 2 | Mutually exclusive tier families | Store / SEO recurring / Social / Care / KB — one active |
| 3 | Demo Studio industries expanded | Beauty schema required; Healthcare & Logistics included; no Noir→salon |
| 4 | Non-sellable ENTITLEMENT | No invented prices; savings only from approved standalone SKUs |
| 5 | Payment modules not auto-stacked | Technical deps ≠ automatic commercial charges |
| 6 | Upgrade vs additive flagged | Technical dependency separate from commercial charge |
| 7 | Next 16 + Supabase + Drizzle | No Clerk/Auth.js in Phase 1; schema auth-compatible |
| 8 | timelineImpact nullable | Package windows only; no invented feature impacts |
| 9 | Care SLAs/hours not invented | Unresolved admin entitlements |
| 10 | KB vague modules not invented | Only explicit catalog modules |
| 11 | Legal/tax deferred | Not Phase 1 blockers |
| 12–13 | Typed objects + charge records | UI selection ≠ automatic charge |

## Pricing principle

Commercial **charge records**, not UI selections. Aliases never create a second charge. Entitlements never invent prices. Technical dependencies do not auto-add line items.

---

## Canonical Price Book inventory (144 records)

| Code | Name | Kind | Category | Price (TSh) | Billing |
| --- | --- | --- | --- | --- | --- |
| WEB-ONE | One Page | PACKAGE | Websites | 500,000 | ONE_TIME |
| WEB-ESS | Essential | PACKAGE | Websites | 900,000 | ONE_TIME |
| WEB-BUS | Business | PACKAGE | Websites | 1,500,000 | ONE_TIME |
| WEB-BUSP | Business+ | PACKAGE | Websites | 2,250,000 | ONE_TIME |
| WEB-PRO | Professional | PACKAGE | Websites | 3,250,000 | ONE_TIME |
| WEB-SIG | Signature | PACKAGE | Websites | 4,500,000 | ONE_TIME |
| WEB-CUS | Custom Platform | CUSTOM_QUOTE_ITEM | Websites | Custom Quote | CUSTOM_QUOTE |
| ADD-PAGE | Additional standard page | SERVICE | Website Features | 100,000 | ONE_TIME |
| ADD-LAND | Custom landing page | SERVICE | Website Features | 250,000 | ONE_TIME |
| ADD-BLOG | Blog / News | SERVICE | Website Features | 300,000 | ONE_TIME |
| ADD-PORT | Projects / Portfolio | SERVICE | Website Features | 350,000 | ONE_TIME |
| ADD-CASE | Case Studies | SERVICE | Website Features | 300,000 | ONE_TIME |
| ADD-TEAM | Team / Leadership | SERVICE | Website Features | 200,000 | ONE_TIME |
| ADD-CARE | Careers / Vacancies | SERVICE | Website Features | 300,000 | ONE_TIME |
| ADD-RES | Resource Centre | SERVICE | Website Features | 300,000 | ONE_TIME |
| ADD-EVT | Events | SERVICE | Website Features | 300,000 | ONE_TIME |
| ADD-SRCH | Advanced Site Search | SERVICE | Website Features | 350,000 | ONE_TIME |
| ADD-MULTI | Multi-location Directory | SERVICE | Website Features | 300,000 | ONE_TIME |
| ADD-MAP | Interactive Map | SERVICE | Website Features | 400,000 | ONE_TIME |
| ADD-INQ | Advanced Inquiry Form | SERVICE | Website Features | 150,000 | ONE_TIME |
| ADD-STEP | Multi-step Form | SERVICE | Website Features | 250,000 | ONE_TIME |
| ADD-QUOTE | Quote Request System | SERVICE | Website Features | 300,000 | ONE_TIME |
| ADD-FILE | File Uploads | SERVICE | Website Features | 100,000 | ONE_TIME |
| ADD-FEED | Social Feed | SERVICE | Website Features | 150,000 | ONE_TIME |
| ADD-BOT | Website Chatbot | SERVICE | Website Features | 350,000 | ONE_TIME |
| BKG-EXT | External Booking Integration | SERVICE | Booking | 250,000 | ONE_TIME |
| BKG-APT | Appointment Booking | SERVICE | Booking | 650,000 | ONE_TIME |
| BKG-STAFF | Multi-staff Booking | SERVICE | Booking | 1,250,000 | ONE_TIME |
| BKG-REST | Restaurant Reservations | SERVICE | Booking | 600,000 | ONE_TIME |
| BKG-TOUR | Tour / Activity Booking | SERVICE | Booking | 900,000 | ONE_TIME |
| BKG-HOTINT | Hotel Booking Integration | SERVICE | Booking | 400,000 | ONE_TIME |
| BKG-HOTCUS | Custom Hotel Booking | SERVICE | Booking | 2,000,000 | ONE_TIME |
| BKG-CAL | Availability Calendar | SERVICE | Booking | 400,000 | ONE_TIME |
| PAY-STD | Standard Payment Integration | SERVICE | Payments | 500,000 | ONE_TIME |
| PAY-DEP | Deposit Payments | SERVICE | Payments | 350,000 | ONE_TIME |
| PAY-REC | Recurring Payments | SERVICE | Payments | 750,000 | ONE_TIME |
| PAY-DON | Donation Payments | SERVICE | Payments | 500,000 | ONE_TIME |
| PAY-API | Custom / Direct Payment API | CUSTOM_QUOTE_ITEM | Payments | Custom Quote | CUSTOM_QUOTE |
| ECOM-START | Starter Store | SUBSCRIPTION_TIER | E-commerce · Store family | 1,500,000 | ONE_TIME |
| ECOM-BUS | Business Store | SUBSCRIPTION_TIER | E-commerce · Store family | 2,500,000 | ONE_TIME |
| ECOM-ADV | Advanced Store | SUBSCRIPTION_TIER | E-commerce · Store family | 4,000,000 | ONE_TIME |
| ECOM-CUS | Custom Commerce | CUSTOM_QUOTE_ITEM | E-commerce · Store family | Custom Quote | CUSTOM_QUOTE |
| LANG-ENSW | English + Swahili functionality | SERVICE | Languages | 400,000 | ONE_TIME |
| LANG-ADD | Each additional language | SERVICE | Languages | 300,000 | ONE_TIME |
| LANG-TRANS | Professional translation | CUSTOM_QUOTE_ITEM | Languages | Custom Quote | CUSTOM_QUOTE |
| TOUR-CAT | Tour/Safari Catalogue | SERVICE | Industry · Tourism | 400,000 | ONE_TIME |
| TOUR-ITIN | Itinerary Templates | SERVICE | Industry · Tourism | 300,000 | ONE_TIME |
| TOUR-INQ | Tour Inquiry | SERVICE | Industry · Tourism | 300,000 | ONE_TIME |
| TOUR-BUILD | Itinerary Builder | SERVICE | Industry · Tourism | 900,000 | ONE_TIME |
| RE-LIST | Property Listings | SERVICE | Industry · Real Estate | 650,000 | ONE_TIME |
| RE-FILT | Search & Filters | SERVICE | Industry · Real Estate | 450,000 | ONE_TIME |
| RE-AGENT | Agent Profiles | SERVICE | Industry · Real Estate | 250,000 | ONE_TIME |
| RE-INQ | Property Inquiry | SERVICE | Industry · Real Estate | 250,000 | ONE_TIME |
| RE-MAP | Property Map | SERVICE | Industry · Real Estate | 450,000 | ONE_TIME |
| REST-MENU | Digital Menu | SERVICE | Industry · Restaurant | 300,000 | ONE_TIME |
| REST-AMENU | Advanced Menu | SERVICE | Industry · Restaurant | 450,000 | ONE_TIME |
| REST-ORDER | Online Ordering | SERVICE | Industry · Restaurant | 900,000 | ONE_TIME |
| REST-BRANCH | Multi-branch | SERVICE | Industry · Restaurant | 350,000 | ONE_TIME |
| REST-QR | QR Menu | SERVICE | Industry · Restaurant | 150,000 | ONE_TIME |
| EDU-ADM | Admissions | SERVICE | Industry · Education | 450,000 | ONE_TIME |
| EDU-FAC | Faculty Directory | SERVICE | Industry · Education | 250,000 | ONE_TIME |
| EDU-COURSE | Course Catalogue | SERVICE | Industry · Education | 400,000 | ONE_TIME |
| EDU-STUD | Student Portal | SERVICE | Industry · Education | 2,000,000 | ONE_TIME |
| EDU-PAR | Parent Portal | SERVICE | Industry · Education | 2,000,000 | ONE_TIME |
| EDU-FEE | Fee Payments | SERVICE | Industry · Education | 750,000 | ONE_TIME |
| NGO-PROG | Programs / Projects | SERVICE | Industry · NGO | 350,000 | ONE_TIME |
| NGO-PUB | Publications | SERVICE | Industry · NGO | 300,000 | ONE_TIME |
| NGO-VOL | Volunteer Applications | SERVICE | Industry · NGO | 250,000 | ONE_TIME |
| NGO-PORT | Donor Portal | SERVICE | Industry · NGO | 1,750,000 | ONE_TIME |
| HLTH-DIR | Practitioner Directory | SERVICE | Industry · Healthcare | 250,000 | ONE_TIME |
| HLTH-FORM | Patient Forms | SERVICE | Industry · Healthcare | 250,000 | ONE_TIME |
| HLTH-PORT | Patient Portal | SERVICE | Industry · Healthcare | 2,500,000 | ONE_TIME |
| HLTH-TELE | Teleconsult Integration | SERVICE | Industry · Healthcare | 450,000 | ONE_TIME |
| LOG-QUOTE | Quote Workflow | SERVICE | Industry · Logistics | 300,000 | ONE_TIME |
| LOG-INQ | Shipment Inquiry | SERVICE | Industry · Logistics | 350,000 | ONE_TIME |
| LOG-TRACK | Tracking Interface | SERVICE | Industry · Logistics | 650,000 | ONE_TIME |
| LOG-API | Live Tracking API | SERVICE | Industry · Logistics | 1,250,000 | ONE_TIME |
| LOG-PORT | Customer Portal | SERVICE | Industry · Logistics | 2,000,000 | ONE_TIME |
| BND-LAUNCH | Business Launch | BUNDLE | Bundles | 1,250,000 | ONE_TIME |
| BND-BEAUTY | Beauty & Booking | BUNDLE | Bundles | 1,050,000 | ONE_TIME |
| BND-REST | Restaurant Bundle | BUNDLE | Bundles | 1,850,000 | ONE_TIME |
| BND-STORE | Online Store | BUNDLE | Bundles | 2,850,000 | ONE_TIME |
| BND-TOUR | Tourism Bundle | BUNDLE | Bundles | 2,850,000 | ONE_TIME |
| BND-RE | Real Estate Bundle | BUNDLE | Bundles | 2,650,000 | ONE_TIME |
| BND-PRES | Professional Presence | BUNDLE | Bundles | 3,750,000 | ONE_TIME |
| BND-GROW | Digital Growth | BUNDLE | Bundles | 2,250,000 | MONTHLY |
| SEO-FND | SEO Foundation | SERVICE | SEO | 400,000 once | ONE_TIME |
| SEO-PRO | Professional SEO Setup | SERVICE | SEO | 750,000 once | ONE_TIME |
| SEO-ADV | Advanced SEO Setup | SERVICE | SEO | 1,250,000 once | ONE_TIME |
| SEO-CARE | SEO Care | SUBSCRIPTION_TIER | SEO · Recurring family | 350,000 | MONTHLY |
| SEO-GROW | SEO Growth | SUBSCRIPTION_TIER | SEO · Recurring family | 650,000 | MONTHLY |
| SEO-AUTH | SEO Authority | SUBSCRIPTION_TIER | SEO · Recurring family | 1,100,000 | MONTHLY |
| LOC-GBP | Google Business Profile | SERVICE | Local Search | 150,000 | ONE_TIME |
| LOC-OPT | Local Search Optimization | SERVICE | Local Search | 250,000 | ONE_TIME |
| LOC-REV | Review Strategy Setup | SERVICE | Local Search | 100,000 | ONE_TIME |
| SOC-ESS | Social Essential | SUBSCRIPTION_TIER | Social · Plan family | 350,000 | MONTHLY |
| SOC-GROW | Social Growth | SUBSCRIPTION_TIER | Social · Plan family | 650,000 | MONTHLY |
| SOC-PRO | Social Pro | SUBSCRIPTION_TIER | Social · Plan family | 1,000,000 | MONTHLY |
| SOC-CORP | Social Corporate | SUBSCRIPTION_TIER | Social · Plan family | 1,750,000 | MONTHLY |
| ADS-META-S | Meta Ads Setup | SERVICE | Advertising | 200,000 once | ONE_TIME |
| ADS-META-M | Meta Management | SERVICE | Advertising | 300,000 + tier | MONTHLY |
| ADS-GOOG-S | Google Ads Setup | SERVICE | Advertising | 300,000 once | ONE_TIME |
| ADS-GOOG-M | Google Management | SERVICE | Advertising | 400,000 + tier | MONTHLY |
| BR-LOGOR | Logo Refresh | SERVICE | Branding | 300,000 | ONE_TIME |
| BR-LOGO | Professional Logo | SERVICE | Branding | 500,000 | ONE_TIME |
| BR-VIS | Visual Identity | SERVICE | Branding | 900,000 | ONE_TIME |
| BR-GUIDE | Brand Guidelines | SERVICE | Branding | 450,000 | ONE_TIME |
| BR-CARD | Business Card | SERVICE | Branding | 150,000 | ONE_TIME |
| BR-LETTER | Letterhead | SERVICE | Branding | 100,000 | ONE_TIME |
| BR-PROF | Company Profile | SERVICE | Branding | 450,000 | ONE_TIME |
| BR-DECK | Corporate Deck | SERVICE | Branding | 450,000 | ONE_TIME |
| BR-BROCH | Brochure / Catalogue | SERVICE | Branding | 350,000 | ONE_TIME |
| BR-SOCIAL | Social Visual System | SERVICE | Branding | 350,000 | ONE_TIME |
| COPY-1 | One-page Copywriting | SERVICE | Copy | 200,000 | ONE_TIME |
| COPY-5 | Up to 5 Pages Copywriting | SERVICE | Copy | 400,000 | ONE_TIME |
| COPY-10 | Up to 10 Pages Copywriting | SERVICE | Copy | 650,000 | ONE_TIME |
| COPY-20 | Up to 20 Pages Copywriting | SERVICE | Copy | 1,100,000 | ONE_TIME |
| MEDIA-PROD | Photography & Video | CUSTOM_QUOTE_ITEM | Production | Custom Quote | CUSTOM_QUOTE |
| KB-LAUNCH | KasiTech Business Launch | SUBSCRIPTION_TIER | KB · Plan family | 150,000 | MONTHLY |
| KB-GROW | KasiTech Business Growth | SUBSCRIPTION_TIER | KB · Plan family | 400,000 | MONTHLY |
| KB-PRO | KasiTech Business Pro | SUBSCRIPTION_TIER | KB · Plan family | 800,000 | MONTHLY |
| KB-SCALE | KasiTech Business Scale | SUBSCRIPTION_TIER | KB · Plan family | 1,500,000 | MONTHLY |
| KB-ENT | KasiTech Business Enterprise | CUSTOM_QUOTE_ITEM | KB · Plan family | Custom Quote | CUSTOM_QUOTE |
| CUS-WEBAPP | Custom Web Application | CUSTOM_QUOTE_ITEM | Custom | Custom Quote | CUSTOM_QUOTE |
| CUS-CRM | CRM / Inventory / Operations | CUSTOM_QUOTE_ITEM | Custom | Custom Quote | CUSTOM_QUOTE |
| CUS-DASH | Dashboard / Data Platform | CUSTOM_QUOTE_ITEM | Custom | Custom Quote | CUSTOM_QUOTE |
| CUS-AI | AI / Automation System | CUSTOM_QUOTE_ITEM | Custom | Custom Quote | CUSTOM_QUOTE |
| CUS-MOBILE | Mobile Application | CUSTOM_QUOTE_ITEM | Custom | Custom Quote | CUSTOM_QUOTE |
| CUS-API | API / Third-party Integration | CUSTOM_QUOTE_ITEM | Custom | Custom Quote | CUSTOM_QUOTE |
| CARE-ESS | Essential Care | SUBSCRIPTION_TIER | Care · Plan family | 180,000 | ANNUAL |
| CARE-STD | Standard Care | SUBSCRIPTION_TIER | Care · Plan family | 300,000 | ANNUAL |
| CARE-BUS | Business Care | SUBSCRIPTION_TIER | Care · Plan family | 600,000 | ANNUAL |
| CARE-PRO | Professional Care | SUBSCRIPTION_TIER | Care · Plan family | 150,000 | MONTHLY |
| CARE-PRI | Priority Care | SUBSCRIPTION_TIER | Care · Plan family | 300,000 | MONTHLY |
| HOST-EMAIL | Business email setup | SERVICE | Hosting | 150,000 | ONE_TIME |
| HOST-EMAIL-ADD | Additional email setup | SERVICE | Hosting | 25,000 / address | ONE_TIME |
| HOST-DOMAIN | Domain registration / renewal | THIRD_PARTY_COST | Hosting | Third-party | THIRD_PARTY |
| HOST-HOSTING | Website hosting | THIRD_PARTY_COST | Hosting | Third-party / care | THIRD_PARTY |
| HOST-SSL | SSL certificate | ENTITLEMENT | Hosting | — | INCLUDED |
| DEL-STD | Standard Delivery | DELIVERY_OPTION | Delivery | Included | INCLUDED |
| DEL-PRI | Priority Delivery | DELIVERY_OPTION | Delivery | +25% | SURCHARGE |
| DEL-RUSH | Rush Delivery | DELIVERY_OPTION | Delivery | +40% | SURCHARGE |
| DEL-EMER | Accelerated / Emergency | DELIVERY_OPTION | Delivery | +50% | SURCHARGE |
| DISC-COMPLEX | Formal Discovery Phase | CUSTOM_QUOTE_ITEM | Discovery | Custom Quote | CUSTOM_QUOTE |

### SERVICE_ALIAS map

| Alias / catalog label | Canonical charge | Notes |
| --- | --- | --- |
| Restaurant · Reservations | BKG-REST | Never charge twice |
| Tourism · Tour Booking | BKG-TOUR | Never charge twice |
| Healthcare · Appointments | BKG-APT | Never charge twice |
| NGO · Donations | PAY-DON | Donation-payment capability |
| Advertising · Campaign Landing Page | ADD-LAND | Ads metadata allowed; same charge |

### ENTITLEMENT records (non-sellable)

| Code | Name | May affect | Standalone price |
| --- | --- | --- | --- |
| ENT-GALLERY | Gallery | Bundle · Demo · SOW · tasks | None |
| ENT-SOCIAL-INTEGRATION | Social integration | Bundle · Demo · SOW · tasks | None |
| ENT-ENHANCED-SEO | Enhanced SEO | Bundle · package SEO level · SOW | None |
| ENT-ANALYTICS-BASELINE | Analytics (website baseline) | Package/bundle inclusion | None — website-included |
| ENT-CARE-CONTENT-TBD | Website care/content allowance | Digital Growth presentation | Undefined — admin TBD (P1-D) |

---

## Exclusive tier families

| Family | Members | Rule |
| --- | --- | --- |
| ECOM_STORE | ECOM-START · ECOM-BUS · ECOM-ADV · ECOM-CUS | One active |
| SEO_RECURRING | SEO-CARE · SEO-GROW · SEO-AUTH | One active |
| SOCIAL_PLAN | SOC-ESS · SOC-GROW · SOC-PRO · SOC-CORP | One active |
| CARE_PLAN | CARE-* · NONE | One active |
| KB_PLAN | KB-* · NONE | One active |

## Bundle matrix (revised savings policy)

Savings only when every comparable component has an approved standalone catalog price. Otherwise show bundle price + benefits without manufacturing savings.

| Bundle | Chargeable inclusions | Entitlements | Show savings? |
| --- | --- | --- | --- |
| Business Launch · 1,250,000 | WEB-ESS + LOC-GBP + HOST-EMAIL (=1,200,000) | ENT-ENHANCED-SEO · ENT-ANALYTICS-BASELINE | No |
| Beauty & Booking · 1,050,000 | WEB-ONE + BKG-EXT + LOC-GBP (=900,000) | ENT-GALLERY · ENT-SOCIAL-INTEGRATION | No |
| Restaurant · 1,850,000 | WEB-ESS + REST-MENU + BKG-REST + LOC-GBP (=1,950,000) | ENT-GALLERY | Yes · TSh 100,000 |
| Online Store · 2,850,000 | WEB-ESS + ECOM-START + PAY-STD (=2,900,000) | — | Yes · TSh 50,000 |
| Tourism · 2,850,000 | WEB-BUS + TOUR-CAT + TOUR-ITIN + TOUR-INQ (=2,500,000) | ENT-ENHANCED-SEO | No |
| Real Estate · 2,650,000 | WEB-BUS + RE-LIST + RE-FILT + RE-INQ (=2,850,000) | — | Yes · TSh 200,000 |
| Professional Presence · 3,750,000 | WEB-PRO + SEO-PRO + LOC-GBP (=4,150,000) | — | Yes · TSh 400,000 |
| Digital Growth · 2,250,000/mo | SOC-PRO + SEO-GROW (=1,650,000/mo) | ENT-CARE-CONTENT-TBD | No |

## Dependency matrix (revised)

| Relationship | Technical | Commercial charge rule | Status |
| --- | --- | --- | --- |
| Industry alias → canonical | Activates canonical | Single canonical charge | Approved |
| ADD-LAND via Ads label | Same landing capability | Single ADD-LAND charge | Approved |
| Store / SEO / Social / Care / KB tiers | Replace prior in family | One tier charge | Approved |
| Package-included feature | Present in demo/SOW | Do not charge add-on again | Approved |
| Delivery surcharge | Applies to one-time base | % of approved project fee | Approved |
| PAY-* / EDU-FEE vs PAY-STD | May need plumbing | Do NOT auto-add PAY-STD | Pending P1-A |
| BKG-STAFF vs BKG-APT | Likely upgrade | Do NOT auto-charge both | Pending P1-B |
| REST-AMENU vs REST-MENU | Likely upgrade | Do NOT auto-charge both | Pending P1-B |
| Higher store tier | Exclusive replace | Charge selected tier only | Approved exclusive; delta TBD |
| LOG-API vs LOG-TRACK | Possible dep | Unknown | Pending P1-B |
| Feature timelineImpact | Nullable | N/A | Approved nullable |

## Demo Studio industries

| Industry | Content approach | Demo reuse |
| --- | --- | --- |
| Beauty & Wellness | Dedicated beauty/salon schema — NEW | Do NOT use Noir |
| Restaurant / Hospitality | Restaurant schema | /demo/moto |
| Tourism / Tours | Tour operator schema | /demo/zuri |
| Hotel / Hospitality | Hotel schema where relevant | /demo/zuri |
| Real Estate | Property schema | /demo/nest |
| Retail / E-commerce | Store schema | /demo/soko |
| Professional Services | Services schema | /demo/amani |
| Education | School/academy schema | /demo/nuru |
| NGO | Impact/org schema | /demo/impact |
| Healthcare | Clinic schema | /demo/afya |
| Logistics | Freight schema | /demo/atlas |
| General Business | Generic schema | Shared chrome |

---

## Technology (Phase 1)

- Existing Next.js 16 application · TypeScript · Vercel
- Supabase Postgres · Drizzle ORM · Supabase Storage
- Resend for transactional email
- **No** Clerk / Auth.js in Phase 1
- Schema must remain compatible with future PUBLIC / CLIENT / STAFF / ADMIN

## Typed catalog objects

| Type | Purpose |
| --- | --- |
| SERVICE | Sellable capability with catalog price |
| SERVICE_ALIAS | Industry/category presentation → canonical SERVICE |
| ENTITLEMENT | Non-sellable inclusion; no invented price |
| PACKAGE | Website package with inclusions + delivery window |
| BUNDLE | Fixed-price composition of charges + entitlements |
| SUBSCRIPTION_TIER | Exclusive family member |
| THIRD_PARTY_COST | Pass-through / disclosed non-KasiTech revenue |
| CUSTOM_QUOTE_ITEM | Requires scoping |
| DELIVERY_OPTION | Standard/Priority/Rush/Emergency |

## Proposed schema (revised)

| Table | Role |
| --- | --- |
| price_books | version KT-PB-2026.1 · active · effective dates |
| catalog_items | code, kind enum, billing_type, price_minor nullable, currency TSh |
| service_aliases | alias → canonical_item_id · industry/tag · label |
| entitlements | code · sellable=false · comparable_standalone_item_id nullable |
| tier_families / tier_memberships | exclusivity |
| package_inclusions | package → item or entitlement |
| bundle_components | bundle → charge item or entitlement |
| technical_dependencies | from → to · dep_type |
| commercial_rules | ALIAS_NO_CHARGE / EXCLUSIVE_REPLACE / ADDITIVE / PENDING |
| timeline_windows | package windows · nullable feature impacts |
| commercial_charges | config → item → amount_minor · source |
| configurations | industry · price_book_version · snapshot JSON |
| audit_events | append-only |

## Pricing engine flow

UI selection → capability activation → resolve aliases → exclusive tier replacement → apply commercial_rules (PENDING blocks finalization) → emit `commercial_charges[]` → integer TSh sums → savings UI only if all comparables have approved `price_minor`.

## Phase status

| Phase | Status |
| --- | --- |
| 0 · Audit | Accepted as preliminary · Rev 1.1 |
| 1 · Price Book + engines + tests | NOT AUTHORIZED — answer P1-A…P1-E |
| 2–9 | Unchanged · blocked behind Phase 1 |

**STOP.** No implementation until Phase 1 blockers are answered or explicitly deferred with the listed interim rules in writing.
