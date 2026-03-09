# MobiRides Website — Outstanding Updates Backlog
**Date:** 9 March 2026  
**Type:** Implementation Backlog  
**Reporter:** MobiRides Product Team  
**Status Key:** 🔴 Blocked | 🟠 To Do | 🔵 In Progress | 🟢 Done

---

## MR-6.11 — Add Real Metrics Stats Bar to TrustSection

| Field | Value |
|-------|-------|
| **Priority** | P0 — Campaign-Critical |
| **Epic** | Homepage Enhancements |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Page** | `/` (Homepage) |
| **Description** | Add a stats bar to TrustSection showing real traction metrics: "154+ Users, 56+ Vehicles, P247K+ Revenue, 15% Commission". Current section is a trust-point carousel with no stats bar. |
| **Acceptance Criteria** | Stats bar visible below or above trust carousel. Values match spec. Responsive on mobile. |

---

## MR-7.3 — Build Rent2BuyWaitlistForm Component

| Field | Value |
|-------|-------|
| **Priority** | P1 — Revenue & Conversion |
| **Epic** | Rent2Buy Waitlist & Forms |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Page** | `/rent2buy`, `/pricing` |
| **Description** | Create a dedicated waitlist form component with fields: name, email, phone, vehicle type (4 options), timeline (4 options), referral source (6 options). |
| **Acceptance Criteria** | Form validates all required fields. Submits to `rent2buy_waitlist` Supabase table. Success toast on submission. |
| **Dependencies** | MR-7.4 (Supabase table must exist first) |

---

## MR-7.4 — Create `rent2buy_waitlist` Supabase Table

| Field | Value |
|-------|-------|
| **Priority** | P1 — Revenue & Conversion |
| **Epic** | Rent2Buy Waitlist & Forms |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Description** | Create Supabase table with columns: `id` (uuid), `name` (text), `email` (text), `phone` (text), `vehicle_type` (text), `timeline` (text), `source` (text), `created_at` (timestamptz). Enable RLS with insert policy for anonymous users. |
| **Acceptance Criteria** | Table exists in Supabase. RLS policy allows anonymous inserts. Select restricted to authenticated admins. |
| **Blocks** | MR-7.3, MR-7.5 |

---

## MR-7.5 — Embed Waitlist Form on Pricing Page

| Field | Value |
|-------|-------|
| **Priority** | P1 — Revenue & Conversion |
| **Epic** | Rent2Buy Waitlist & Forms |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Page** | `/pricing` |
| **Description** | Embed `Rent2BuyWaitlistForm` in the Rent2Buy section of the Pricing page. |
| **Acceptance Criteria** | Form renders within Pricing page Rent2Buy section. Submission works identically to `/rent2buy` page. |
| **Dependencies** | MR-7.3 |

---

## MR-4.4 — Add Tiered Host Earnings Section to Pricing Page

| Field | Value |
|-------|-------|
| **Priority** | P1 — Revenue & Conversion |
| **Epic** | Pricing Page Enhancements |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Page** | `/pricing` |
| **Description** | Add section showing 85% host commission with per-tier earnings breakdown: Economy P7.6K, Standard P15.3K, Premium P34K, Luxury P68K, Prestige P102K per month. |
| **Acceptance Criteria** | 5-tier earnings grid visible. Responsive layout. Consistent with existing pricing card design. |

---

## MR-4.5 — Add Rent2Buy "Coming Q2 2026" Section to Pricing Page

| Field | Value |
|-------|-------|
| **Priority** | P1 — Revenue & Conversion |
| **Epic** | Pricing Page Enhancements |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Page** | `/pricing` |
| **Description** | Add a 3-card grid section: 10% management fee, Motshelo financing, EV-Ready vehicles. Include waitlist form (MR-7.5). |
| **Acceptance Criteria** | 3 cards rendered. "Coming Q2 2026" badge visible. Links to `/rent2buy` page. |
| **Dependencies** | MR-7.3 (for embedded waitlist form) |

---

## MR-5.6 — Add Motshelo/Stokvel Investment Groups Category

| Field | Value |
|-------|-------|
| **Priority** | P2 — Partner Ecosystem |
| **Epic** | Partners Page Enhancements |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Page** | `/partners` |
| **File** | `src/data/partners.json` |
| **Description** | Add new partner category: "Motshelo/Stokvel Investment Groups" with details: 6.5% interest rate, P200K minimum investment, 20+ member groups. |
| **Acceptance Criteria** | Category card renders on Partners page. Content matches spec. Icon/styling consistent with existing categories. |

---

## MR-5.7 — Add Automotive Dealerships & Refleet Partners Category

| Field | Value |
|-------|-------|
| **Priority** | P2 — Partner Ecosystem |
| **Epic** | Partners Page Enhancements |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Page** | `/partners` |
| **File** | `src/data/partners.json` |
| **Description** | Add new partner category for EV dealerships and refleeting partners. |
| **Acceptance Criteria** | Category card renders. Content describes EV dealership and refleet opportunities. |

---

## MR-5.8 — Update Financial Partners Description

| Field | Value |
|-------|-------|
| **Priority** | P2 — Partner Ecosystem |
| **Epic** | Partners Page Enhancements |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **File** | `src/data/partners.json` |
| **Description** | Update the Financial Partners category description to reference motshelo complementarity and updated financing options. |
| **Acceptance Criteria** | Description text updated. No layout changes required. |

---

## MR-5.9 — Add New Options to Partnership Form Dropdown

| Field | Value |
|-------|-------|
| **Priority** | P2 — Partner Ecosystem |
| **Epic** | Partners Page Enhancements |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Page** | `/partners` |
| **File** | `src/pages/PartnersPage.tsx` |
| **Description** | Add "Motshelo/Stokvel" and "Automotive Dealership/Refleet" to the partnership type `SelectItem` dropdown. |
| **Acceptance Criteria** | Both new options appear in dropdown. Form submission includes new values. |
| **Dependencies** | MR-5.6, MR-5.7 (categories should exist first) |

---

## MR-8.1 — Verified Fleet & Trust Value Proposition Card

| Field | Value |
|-------|-------|
| **Priority** | P3 — Cross-Page Value Props |
| **Epic** | Value Proposition Cards |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Pages** | `/`, `/find-ride` |
| **Description** | Create card: "56+ Verified Vehicles" highlighting BIC/Pay-U partnership and verified host program. |
| **Acceptance Criteria** | Card component created. Renders on specified pages. Responsive. |

---

## MR-8.2 — Pay-U Insurance Partnership Card

| Field | Value |
|-------|-------|
| **Priority** | P3 — Cross-Page Value Props |
| **Epic** | Value Proposition Cards |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Pages** | `/`, `/find-ride` |
| **Description** | Dedicated card highlighting Pay-U comprehensive insurance coverage for all rentals. |
| **Acceptance Criteria** | Card renders with Pay-U branding reference. Links to safety/protection page. |

---

## MR-8.3 — Fast Confirmations Card

| Field | Value |
|-------|-------|
| **Priority** | P3 — Cross-Page Value Props |
| **Epic** | Value Proposition Cards |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Pages** | `/`, `/find-ride` |
| **Description** | Card: "5-30 Minute Confirmations" emphasizing speed of booking process. |
| **Acceptance Criteria** | Card renders with confirmation time messaging. |

---

## MR-8.4 — On-Demand Delivery Card

| Field | Value |
|-------|-------|
| **Priority** | P3 — Cross-Page Value Props |
| **Epic** | Value Proposition Cards |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Pages** | `/find-ride` |
| **Description** | Card: delivery & collection service across Gaborone, Francistown, Maun. |
| **Acceptance Criteria** | Card lists 3 cities. Links to locations page. |

---

## MR-8.5 — Fair Commission Model Card

| Field | Value |
|-------|-------|
| **Priority** | P3 — Cross-Page Value Props |
| **Epic** | Value Proposition Cards |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Pages** | `/host` |
| **Description** | Card: "Transparent 15% Commission" explaining host-friendly fee structure. |
| **Acceptance Criteria** | Card renders on Host page. Commission percentage clearly displayed. |

---

## MR-8.6 — Safari & Tourism Focus Card

| Field | Value |
|-------|-------|
| **Priority** | P3 — Cross-Page Value Props |
| **Epic** | Value Proposition Cards |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Pages** | `/`, `/find-ride` |
| **Description** | Card: "Perfect for Safari Adventures" with 4x4 pricing info and tourism-focused messaging. |
| **Acceptance Criteria** | Card mentions 4x4 availability. Links to pricing or find-ride page. |

---

## MR-8.7 — Host Earnings Card

| Field | Value |
|-------|-------|
| **Priority** | P3 — Cross-Page Value Props |
| **Epic** | Value Proposition Cards |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Pages** | `/host` |
| **Description** | Card: "Earn from P7.6K to P102K/Month" with tier breakdown by vehicle category. |
| **Acceptance Criteria** | Earnings range displayed. Links to pricing page for full breakdown. |

---

## MR-8.8 — Active Promotion Card (FIRST100)

| Field | Value |
|-------|-------|
| **Priority** | P3 — Cross-Page Value Props |
| **Epic** | Value Proposition Cards |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Pages** | `/find-ride`, `/host` |
| **Description** | Promo card displaying FIRST100 campaign: "P100 OFF Your First Rental" with code and expiry. |
| **Acceptance Criteria** | Card renders on both pages. Code `FIRST100` displayed prominently. |

---

## MR-2.12 — Update Pricing Page Meta with Campaign Keywords

| Field | Value |
|-------|-------|
| **Priority** | P4 — SEO Polish |
| **Epic** | SEO & Analytics |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Page** | `/pricing` |
| **Description** | Update `<title>` and `<meta description>` to include "P100 OFF", "FIRST100", "Rent2Buy Q2 2026" keywords. |
| **Acceptance Criteria** | Meta tags contain campaign keywords. Title < 60 chars. Description < 160 chars. |

---

## MR-2.13 — Update Partners Page Meta with New Categories

| Field | Value |
|-------|-------|
| **Priority** | P4 — SEO Polish |
| **Epic** | SEO & Analytics |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Page** | `/partners` |
| **Description** | Update meta description to include "Motshelo", "EV Dealerships" keywords. |
| **Acceptance Criteria** | Meta tags reference new partner categories. |
| **Dependencies** | MR-5.6, MR-5.7 (categories should be live first) |

---

## MR-4.6 — Dual CTA Hero on Pricing Page

| Field | Value |
|-------|-------|
| **Priority** | P4 — SEO Polish |
| **Epic** | Pricing Page Enhancements |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Page** | `/pricing` |
| **Description** | Replace generic hero with dual-button CTA: "Claim P100 OFF" (→ app) + "Join Rent2Buy Waitlist" (→ waitlist section anchor). |
| **Acceptance Criteria** | Two CTA buttons visible in hero. Both link to correct destinations. |
| **Dependencies** | MR-7.5 (waitlist section must exist for anchor link) |

---

## MR-7.6 — Seller CTA Card on Pricing Page

| Field | Value |
|-------|-------|
| **Priority** | P4 — SEO Polish |
| **Epic** | Rent2Buy Waitlist & Forms |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Page** | `/pricing` |
| **Description** | Add "Have Vehicles to Sell?" card linking to `/partners` page for fleet owners and dealerships. |
| **Acceptance Criteria** | Card renders in Rent2Buy or bottom section. Links to `/partners`. |

---

## MR-3.3 — Promo CTA Card on Find Ride Page

| Field | Value |
|-------|-------|
| **Priority** | P4 — SEO Polish |
| **Epic** | FIRST100 Campaign |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Page** | `/find-ride` |
| **Description** | Add value proposition card: "P100 OFF Your First Rental" with FIRST100 code, linking to app. |
| **Acceptance Criteria** | Card visible on Find Ride page. Code displayed. CTA links to `https://app.mobirides.com`. |

---

## MR-3.4 — Campaign Cross-Reference on Host Page

| Field | Value |
|-------|-------|
| **Priority** | P4 — SEO Polish |
| **Epic** | FIRST100 Campaign |
| **Status** | 🟠 To Do |
| **Assignee** | Unassigned |
| **Page** | `/host` |
| **Description** | Add mention that the FIRST100 campaign is driving renter demand, encouraging hosts to list vehicles now to capture increased bookings. |
| **Acceptance Criteria** | Campaign reference visible on Host page. Contextually placed near earnings or CTA section. |

---

## Backlog Summary

| Priority | Count | Focus Area |
|----------|-------|------------|
| P0 | 1 | Stats bar verification |
| P1 | 5 | Rent2Buy waitlist + Pricing sections |
| P2 | 4 | Partner ecosystem expansion |
| P3 | 8 | Value proposition cards |
| P4 | 6 | SEO meta + conversion CTAs |
| **Total** | **24** | |

---

## Sprint Planning Recommendation

### Sprint 1 (Current)
- MR-6.11, MR-7.4, MR-7.3, MR-7.5, MR-4.4, MR-4.5

### Sprint 2
- MR-5.6, MR-5.7, MR-5.8, MR-5.9

### Sprint 3
- MR-8.1 through MR-8.8

### Sprint 4
- MR-2.12, MR-2.13, MR-4.6, MR-7.6, MR-3.3, MR-3.4

---

**Document Owner:** MobiRides Product Team  
**Created:** 9 March 2026  
**Last Updated:** 9 March 2026
