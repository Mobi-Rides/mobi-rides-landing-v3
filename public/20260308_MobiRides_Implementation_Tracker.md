# MobiRides Website — Implementation Tracker
**Date:** 8 March 2026  
**Reference:** `website-updates-2025-11-23.md` (ideal state spec)  
**Status Key:** ✅ Done | 🟡 Partial | ❌ Not Started

---

## EPIC 1 — Core Pages & Routing

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Homepage (`/`) | ✅ | Lazy-loaded sections, JSON-LD, canonical URL |
| 1.2 | Find Ride (`/find-ride`) | ✅ | Vehicle filters, Mapbox integration |
| 1.3 | Host (`/host`) | ✅ | Host onboarding page live |
| 1.4 | Partners (`/partners`) | ✅ | Multi-step partnership form, 4 categories |
| 1.5 | Pricing (`/pricing`) | ✅ | 5-tier vehicle pricing cards |
| 1.6 | Rent2Buy (`/rent2buy`) | ✅ | Standalone page live |
| 1.7 | Blog (`/blog`, `/blog/:slug`) | ✅ | CMS with admin editor, Supabase-backed |
| 1.8 | About (`/about`) | ✅ | Team grid, company story |
| 1.9 | Safety (`/safety`) | ✅ | |
| 1.10 | Careers (`/careers`) | ✅ | Job listings from JSON |
| 1.11 | Press (`/press`) | ✅ | Press releases |
| 1.12 | Contact (`/contact`) | ✅ | Contact form |
| 1.13 | Support (`/support`) | ✅ | Support articles, ticket form |
| 1.14 | Privacy & Terms | ✅ | `/privacy`, `/terms` |
| 1.15 | FAQ (`/faq`) | ✅ | Accordion-based FAQ |
| 1.16 | Locations (`/locations`) | ✅ | Coverage map |
| 1.17 | Host sub-pages | ✅ | `/host-benefits`, `/host-requirements`, `/host-support`, `/host-dashboard`, `/host-protection`, `/host-community` |
| 1.18 | Damage Protection | ✅ | `/damage-protection` |
| 1.19 | Travel Guides | ✅ | `/travel-guides` |
| 1.20 | Business Solutions | ✅ | `/business-solutions` |
| 1.21 | API Docs | ✅ | `/api-docs` |
| 1.22 | 301 Redirects (legacy paths) | ✅ | `/host/protection` → `/host-protection` etc. |
| 1.23 | 404 Not Found | ✅ | Custom page |

---

## EPIC 2 — SEO & Analytics Infrastructure

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Google Analytics (GA4) | ✅ | `G-XDD87CJL7V` in `index.html` |
| 2.2 | Google Site Verification | ✅ | Meta tag present |
| 2.3 | Facebook Domain Verification | ✅ | Meta tag present |
| 2.4 | Open Graph meta (homepage) | ✅ | `og:title`, `og:description`, `og:image` |
| 2.5 | Twitter Card meta | ✅ | `summary_large_image` |
| 2.6 | Canonical URLs (all pages) | ✅ | `buildCanonicalUrl()` on every page |
| 2.7 | JSON-LD structured data | ✅ | Organization + LocalBusiness on homepage, Service on pricing |
| 2.8 | Sitemap edge function | ✅ | `supabase/functions/sitemap` |
| 2.9 | `robots.txt` | ✅ | Present in `/public` |
| 2.10 | Favicon & Apple Touch Icon | ✅ | Multiple sizes |
| 2.11 | **Homepage meta — update with real metrics** | ❌ | Spec: "154+ users, 56+ vehicles, P247K+ revenue" — current meta is generic |
| 2.12 | **Pricing page meta — campaign keywords** | ❌ | Spec: include "P100 OFF", "FIRST100", "Rent2Buy Q2 2026" — not present |
| 2.13 | **Partners page meta — new categories** | ❌ | Spec: include "Motshelo", "EV Dealerships" — not present |

---

## EPIC 3 — Active Campaign: FIRST100 Promo

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | **Pricing page promo code** | 🟡 | Banner exists but shows `MOBIRIDES100` — spec requires `FIRST100` |
| 3.2 | **Homepage sticky promo banner** | ❌ | Spec: sticky top banner with "P100 OFF first rental, code FIRST100, valid Dec 31 2025" — not implemented |
| 3.3 | **Find Ride page — promo CTA card** | ❌ | Spec: value proposition card "P100 OFF Your First Rental" with FIRST100 code |
| 3.4 | **Host page — promo cross-reference** | ❌ | Spec: mention campaign driving renter demand |

---

## EPIC 4 — Pricing Page Enhancements

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | 5-tier pricing cards | ✅ | Economy → Prestige, correct price ranges |
| 4.2 | "What's Included" features | ✅ | Pay-U, roadside, verified hosts, secure payments |
| 4.3 | Promo banner section | ✅ | Exists (but wrong code — see 3.1) |
| 4.4 | **Tiered host earnings section (85% commission)** | ❌ | Spec: show per-tier earnings breakdown (P7.6K–P102K/month) — not present |
| 4.5 | **Rent2Buy "Coming Q2 2026" section** | ❌ | Spec: 3-card grid (10% fee, Motshelo financing, EV-Ready) + waitlist form — not on pricing page |
| 4.6 | **Dual CTA (Claim P100 OFF + Join Rent2Buy Waitlist)** | ❌ | Spec: two-button hero — current hero is generic |

---

## EPIC 5 — Partners Page Enhancements

| # | Task | Status | Notes |
|---|------|--------|-------|
| 5.1 | Fleet Owners category | ✅ | In `partners.json` |
| 5.2 | Insurance Providers category | ✅ | In `partners.json` |
| 5.3 | Financial Partners category | ✅ | In `partners.json` |
| 5.4 | Service Providers category | ✅ | In `partners.json` |
| 5.5 | Multi-step partnership form | ✅ | 4-step wizard in `PartnersPage.tsx` |
| 5.6 | **Motshelo/Stokvel Investment Groups category** | ❌ | Spec: new category with 6.5% interest, P200K min, 20+ members |
| 5.7 | **Automotive Dealerships & Refleet Partners category** | ❌ | Spec: new category for EV dealerships, refleeting |
| 5.8 | **Financial Partners description update** | ❌ | Spec: update to reference motshelo complementarity |
| 5.9 | **Partnership form — new dropdown options** | ❌ | Spec: add "Motshelo/Stokvel" and "Automotive Dealership/Refleet" to `SelectItem` |

---

## EPIC 6 — Homepage Enhancements

| # | Task | Status | Notes |
|---|------|--------|-------|
| 6.1 | Hero section | ✅ | Animated hero with CTA |
| 6.2 | How It Works section | ✅ | Lazy-loaded |
| 6.3 | Cars section | ✅ | Vehicle showcase |
| 6.4 | Trust section (carousel) | ✅ | 4 trust points with images |
| 6.5 | Testimonials section | ✅ | |
| 6.6 | Host CTA section | ✅ | |
| 6.7 | Rent2Buy Teaser section | ✅ | "Launching Q2 2026" badge, Motshelo mention, 3 benefits |
| 6.8 | Explore Botswana section | ✅ | |
| 6.9 | Final CTA section | ✅ | |
| 6.10 | **Sticky promo banner (FIRST100)** | ❌ | See Epic 3.2 |
| 6.11 | **TrustSection — real metrics stats bar** | ❌ | Spec: "154+ Users, 56+ Vehicles, P247K+ Revenue, 15% Commission" — current section is trust-point carousel, no stats bar |

---

## EPIC 7 — Rent2Buy Waitlist & Forms

| # | Task | Status | Notes |
|---|------|--------|-------|
| 7.1 | Rent2Buy standalone page (`/rent2buy`) | ✅ | Exists with detailed content |
| 7.2 | Rent2Buy teaser on homepage | ✅ | Links to `/rent2buy` and `/pricing` |
| 7.3 | **Rent2BuyWaitlistForm component** | ❌ | Spec: dedicated form with name, email, phone, vehicle type (4 options), timeline (4 options), referral source (6 options) |
| 7.4 | **`rent2buy_waitlist` Supabase table** | ❌ | Spec: `id`, `name`, `email`, `phone`, `vehicle_type`, `timeline`, `source`, `created_at` |
| 7.5 | **Waitlist form on Pricing page** | ❌ | Spec: embed form in Rent2Buy section of `/pricing` |
| 7.6 | **Seller CTA on Pricing page** | ❌ | Spec: "Have Vehicles to Sell?" card linking to `/partners` |

---

## EPIC 8 — Value Proposition Cards (Cross-Page)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 8.1 | **Verified Fleet & Trust card** | ❌ | Spec: "56+ Verified Vehicles" with BIC/Pay-U mention |
| 8.2 | **Pay-U Insurance Partnership card** | ❌ | Spec: dedicated card highlighting Pay-U coverage |
| 8.3 | **Fast Confirmations card** | ❌ | Spec: "5-30 Minute Confirmations" |
| 8.4 | **On-Demand Delivery card** | ❌ | Spec: delivery & collection across Gaborone, Francistown, Maun |
| 8.5 | **Fair Commission Model card** | ❌ | Spec: "Transparent 15% Commission" |
| 8.6 | **Safari & Tourism Focus card** | ❌ | Spec: "Perfect for Safari Adventures" with 4x4 pricing |
| 8.7 | **Host earnings card** | ❌ | Spec: "Earn from P7.6K to P102K/Month" with tier breakdown |
| 8.8 | **Active Promotion card (FIRST100)** | ❌ | Spec: promo card on Find Ride and Host pages |

---

## EPIC 9 — Technical & Infrastructure

| # | Task | Status | Notes |
|---|------|--------|-------|
| 9.1 | Vite + React + TypeScript | ✅ | |
| 9.2 | Tailwind CSS + shadcn/ui | ✅ | Design system with semantic tokens |
| 9.3 | Supabase integration | ✅ | Auth, blog CMS, edge functions |
| 9.4 | Mapbox geocoding | ✅ | Coverage map on locations page |
| 9.5 | React Router v6 | ✅ | All routes configured |
| 9.6 | Lazy loading (sections) | ✅ | `React.lazy` + `Suspense` on homepage |
| 9.7 | Skeleton loading states | ✅ | Per-section skeletons |
| 9.8 | Page transitions | ✅ | `PageTransition` wrapper |
| 9.9 | Scroll-to-top | ✅ | Auto + button |
| 9.10 | Admin blog CMS | ✅ | TipTap editor, image upload, preview |
| 9.11 | Protected admin routes | ✅ | Auth-gated `/admin/*` |
| 9.12 | Edge functions | ✅ | `generate-blog-article`, `import-blog-posts`, `sitemap`, `ping`, `upload-blog-image` |
| 9.13 | Connection speed detection | ✅ | `useConnectionSpeed` hook |
| 9.14 | Intersection observer | ✅ | `useIntersectionObserver` hook |

---

## Summary

| Category | Done | Partial | Outstanding |
|----------|------|---------|-------------|
| Core Pages & Routing | 23 | 0 | 0 |
| SEO & Analytics | 10 | 0 | 3 |
| FIRST100 Campaign | 0 | 1 | 3 |
| Pricing Enhancements | 3 | 0 | 3 |
| Partners Enhancements | 5 | 0 | 4 |
| Homepage Enhancements | 9 | 0 | 2 |
| Rent2Buy Waitlist | 2 | 0 | 4 |
| Value Prop Cards | 0 | 0 | 8 |
| Technical Infrastructure | 14 | 0 | 0 |
| **TOTAL** | **66** | **1** | **27** |

---

## Priority Backlog (Recommended Order)

### P0 — Campaign-Critical (implement first)
1. **MR-3.1** Update promo code `MOBIRIDES100` → `FIRST100` on Pricing page
2. **MR-3.2** Add sticky FIRST100 promo banner to Homepage
3. **MR-6.11** Add real metrics stats bar to TrustSection (154+ users, 56+ vehicles)
4. **MR-2.11** Update homepage meta description with real traction data

### P1 — Revenue & Conversion
5. **MR-7.3** Build `Rent2BuyWaitlistForm` component
6. **MR-7.4** Create `rent2buy_waitlist` Supabase table
7. **MR-7.5** Embed waitlist form on Pricing page Rent2Buy section
8. **MR-4.4** Add tiered host earnings section to Pricing page
9. **MR-4.5** Add Rent2Buy "Coming Q2 2026" section to Pricing page

### P2 — Partner Ecosystem
10. **MR-5.6** Add Motshelo/Stokvel category to `partners.json`
11. **MR-5.7** Add Automotive Dealerships/Refleet category to `partners.json`
12. **MR-5.8** Update Financial Partners description
13. **MR-5.9** Add new options to partnership form dropdown

### P3 — Cross-Page Value Props
14. **MR-8.1–8.8** Create and distribute 8 value proposition cards across `/`, `/find-ride`, `/host`

### P4 — SEO Polish
15. **MR-2.12** Update Pricing page meta with campaign keywords
16. **MR-2.13** Update Partners page meta with new categories
17. **MR-4.6** Dual CTA hero on Pricing page
18. **MR-7.6** Seller CTA card on Pricing page
19. **MR-3.3** Promo CTA card on Find Ride page
20. **MR-3.4** Campaign cross-reference on Host page

---

**Document Owner:** MobiRides Product Team  
**Last Updated:** 8 March 2026  
**Next Review:** Upon completion of P0 items
