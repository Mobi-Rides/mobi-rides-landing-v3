# MobiRides Damage Protection — Content Consistency Review

> **Date**: 2026-03-16  
> **Branch**: `fix/damage-protection-content-sync`  
> **Canonical Source**: `20260305_DAMAGE_PROTECTION_OVERVIEW.md`  
> **Status**: Planned — awaiting implementation

---

## Summary

A full-codebase audit revealed widespread inconsistencies in how the damage protection product is described across pages, data files, and marketing documents. This review documents all findings and the implementation plan to resolve them, based on 4 policy decisions confirmed by the product owner.

---

## Policy Decisions

| # | Question | Decision |
|---|----------|----------|
| 1 | Is damage protection included or paid? | **Optional tiered paid protection** |
| 2 | Are limits/excess the same across tiers? | **Different limits and excess per tier** |
| 3 | Who is the insurance partner — BIC, Pay-U, or both? | **Pay-U only** (combination product; remove all BIC references) |
| 4 | What is the emergency contact? | **Local emergency number (997) + one MobiRides hotline (+267 74300747)** |

---

## Canonical Tier Structure

| Tier | Premium % | Coverage Cap | Excess (Deductible) | Minor Damage | Major Incidents |
|------|:---------:|:------------:|:-------------------:|:------------:|:---------------:|
| **No Coverage** | 0% | — | — | ❌ | ❌ |
| **Basic** | 10% | P15,000 | P300 | ✅ | ❌ |
| **Standard** | 15% | P50,000 | P1,000 | ✅ | ✅ |
| **Premium** | 20% | P50,000 | P500 (reduced) | ✅ | ✅ |

- Pricing is **percentage-based** (% of daily rental rate), not flat daily fees
- Underwriting partner: **Pay-U** exclusively
- Emergency contacts: **+267 74300747** (MobiRides hotline) / **997** (Botswana emergency services) / **+267 74300748** (roadside assistance — separate service)

---

## Findings

### Severity: HIGH

#### 1. Core Product Offer Is Contradictory (included vs. paid add-on)

Multiple pages and data files describe damage protection as "included", "automatic", or "at no additional cost" — contradicting the actual tiered paid model.

| File | Current Language | Required Change |
|------|-----------------|-----------------|
| `src/pages/PricingPage.tsx` | "Every rental includes comprehensive damage liability waiver" | → "Choose from Basic, Standard, or Premium damage protection tiers at checkout" |
| `src/pages/SafetyPage.tsx` | "Every rental is covered by our damage liability waiver with up to P1M liability coverage" | → "Optional damage protection tiers available at checkout, powered by Pay-U" |
| `src/components/sections/TrustSection.tsx` | "Every rental is covered by our damage liability waiver via Pay-U" | → "Protect your rental with optional Pay-U damage protection tiers" |
| `src/pages/AboutPage.tsx` | "Every rental is backed by comprehensive damage protection" | → "Rentals can be backed by optional damage protection tiers" |
| `src/data/faq-data.json` | "included at no additional cost" with "up to P2 million" | → Describe 3 optional tiers with tier-specific limits |
| `src/data/faqs.json` | "All rentals include comprehensive damage liability waiver" | → Optional tiers via Pay-U; remove flat "10% excess" |
| `src/data/support-articles.json` | "all vehicles on MobiRides are covered by comprehensive damage liability waiver" | → "MobiRides offers optional Pay-U damage protection tiers" |
| `src/data/legal-content.json` | "All vehicles are covered by our damage liability waiver during active rentals" | → "Optional damage protection is available for all rentals" |
| `src/data/press-releases.json` | "automatically included in every MobiRides booking at no additional cost" | → "available as an optional add-on with three coverage tiers" |
| `src/components/sections/HowItWorksSection.tsx` | "comprehensive damage protection" | → "optional damage protection" |

#### 2. Coverage Limits Conflict (P1M vs P2M vs tier-specific)

Different files cite different flat coverage figures. The canonical model has **tier-specific** caps.

| File | Current Value | Canonical Value |
|------|--------------|-----------------|
| `src/pages/SafetyPage.tsx` | P1M liability, P800K vehicle | Basic: P15,000 / Standard & Premium: P50,000 |
| `src/pages/HostProtectionPage.tsx` (JSON-LD) | "P1M damage protection coverage" | "Up to P50,000 damage protection coverage" |
| `src/data/faq-data.json` | "up to P2 million in liability coverage" | Tier-specific: P15,000 / P50,000 |
| `src/data/press-releases.json` | "Up to P2 million in liability coverage" | "Coverage caps from P15,000 (Basic) to P50,000 (Standard/Premium)" |

#### 3. Excess/Deductible Policy Inconsistent

| File | Current Value | Canonical Value |
|------|--------------|-----------------|
| `src/data/faqs.json` | Flat "10% liability excess" | Tier-specific: P300 (Basic) / P1,000 (Standard) / P500 (Premium) |

---

### Severity: MEDIUM

#### 4. Emergency Contacts Fragmented and Conflicting

Two fake/placeholder emergency numbers appear across the site alongside the real hotline.

| File | Current Number | Required |
|------|---------------|----------|
| `src/config/site.ts` | `+267 911 MOBI (6624)` | → `+267 74300747` |
| `src/pages/SafetyPage.tsx` (×2) | `1-800-MOBI-911` | → `+267 74300747` |
| `src/data/contact-info.json` | `+267 911 MOBI (6624)` | → `+267 74300747` |
| `src/data/faq.json` | `+267 911 MOBI (6624)` | → `+267 74300747` |
| `src/data/hostSupport.json` | `+267 911 MOBI (6624)` | → `+267 74300747` |
| `src/data/support-articles.json` | `+267 911 MOBI (6624)` | → `+267 74300747` |

*Note: `src/pages/DamageProtectionPage.tsx` already uses `+267 74300747` — no change needed.*

#### 5. Insurance Partner Narrative Inconsistent (BIC references)

All active code uses **Pay-U**, but marketing/planning documents still reference **BIC**.

| File | Lines | Content |
|------|-------|---------|
| `website-updates-2025-11-23.md` | 23, 429 | "BIC, Pay-U" / "Backed by BIC and Pay-U" |
| `public/20251201_MobiRides_Launch_Campaign_Tracker.md` | 110, 167, 338, 403 | "Full BIC insurance coverage" / "BIC insurance included" |
| `public/20251201_MobiRides_Social_Content_Templates.md` | 49, 143, 176, 270, 648, 1089, 1265 | "BIC insurance included" / "All with BIC insurance ✓" |
| `public/20251128_MobiRides_Investor_Pitch_Deck_Outline.md` | 169, 195, 228, 427, 461, 728 | "BIC Botswana (comprehensive coverage)" |
| `public/20260309_MobiRides_Outstanding_Updates_Backlog.md` | 165 | "BIC/Pay-U partnership" |
| `public/20260308_MobiRides_Implementation_Tracker.md` | 133 | "BIC/Pay-U mention" |

#### 6. Pricing Model Misaligned (flat daily fees vs percentages)

Multiple files use flat daily fees instead of the canonical percentage-based pricing.

| File | Current Pricing | Canonical Pricing |
|------|----------------|-------------------|
| `src/pages/DamageProtectionPage.tsx` | Basic: +P150/day, Standard: +P350/day, Premium: +P550/day | Basic: 10%, Standard: 15%, Premium: 20% of daily rate |
| `src/pages/HostProtectionPage.tsx` | Basic: +P150/day, Enhanced: +P200/day, Premium: +P400/day | Basic: 10%, Standard: 15%, Premium: 20% (rename "Enhanced" → "Standard") |
| `src/data/pricing.json` | Standard: P350/day, Premium: P550/day (no Basic) | Basic: 10%, Standard: 15%, Premium: 20% (add Basic tier) |

---

## Implementation Plan

### Phase 1: Emergency Contact Standardization (safety-critical)

**Files**: 6 | **Priority**: Immediate

Replace all `+267 911 MOBI (6624)` and `1-800-MOBI-911` with `+267 74300747`.

| Step | File | Change |
|------|------|--------|
| 1.1 | `src/config/site.ts` | `emergency` value → `+267 74300747` |
| 1.2 | `src/pages/SafetyPage.tsx` | Two `1-800-MOBI-911` refs → `+267 74300747` |
| 1.3 | `src/data/contact-info.json` | Emergency phone → `+267 74300747` |
| 1.4 | `src/data/faq.json` | `emergencyHotline` → `+267 74300747` |
| 1.5 | `src/data/hostSupport.json` | `hotline` → `+267 74300747` |
| 1.6 | `src/data/support-articles.json` | Emergency number in answer → `+267 74300747` |

### Phase 2: "Included" → "Optional Tiered" Language (legal/commercial risk)

**Files**: 10 | **Priority**: High

Remove all language claiming protection is "included", "automatic", or "at no additional cost". Replace with optional tier language.

| Step | File | Change Summary |
|------|------|---------------|
| 2.1 | `src/pages/PricingPage.tsx` | Title → "Optional Pay-U Damage Protection"; description → tier selection |
| 2.2 | `src/pages/SafetyPage.tsx` | Remove "Every rental is covered…P1M"; replace stats with tier-specific caps |
| 2.3 | `src/components/sections/TrustSection.tsx` | "Comprehensive" → "Optional"; "Every rental is covered" → optional tiers |
| 2.4 | `src/components/sections/HowItWorksSection.tsx` | "comprehensive" → "optional" |
| 2.5 | `src/pages/AboutPage.tsx` | "Every rental is backed by comprehensive…" → "Rentals can be backed by optional…" |
| 2.6 | `src/data/faq-data.json` | Rewrite answer: 3 optional tiers with specific limits |
| 2.7 | `src/data/faqs.json` | "All vehicles covered" → optional tiers; remove flat "10% excess" |
| 2.8 | `src/data/support-articles.json` | "all vehicles covered" → optional tiers |
| 2.9 | `src/data/legal-content.json` | "All vehicles are covered" → "Optional damage protection is available" |
| 2.10 | `src/data/press-releases.json` | "automatically included…no additional cost" → "optional add-on"; update caps |

### Phase 3: Pricing Model Alignment (tier-specific values)

**Files**: 3 | **Priority**: High

Replace flat daily fees with percentage-based pricing; align tier names, limits, and excesses.

| Step | File | Change Summary |
|------|------|---------------|
| 3.1 | `src/pages/DamageProtectionPage.tsx` | Fees → percentages; limits/excess → canonical |
| 3.2 | `src/pages/HostProtectionPage.tsx` | Fees → percentages; "Enhanced" → "Standard"; JSON-LD "P1M" → "P50,000" |
| 3.3 | `src/data/pricing.json` | Add Basic tier; flat fees → percentages; add caps in descriptions |

### Phase 4: BIC Reference Removal

**Files**: 6 | **Priority**: Medium

Replace all BIC mentions with Pay-U.

| Step | File | Change |
|------|------|--------|
| 4.1 | `website-updates-2025-11-23.md` | "BIC, Pay-U" → "Pay-U"; "Backed by BIC and Pay-U" → "Backed by Pay-U" |
| 4.2 | `public/20251201_MobiRides_Launch_Campaign_Tracker.md` | All "BIC insurance" → "Pay-U damage protection" |
| 4.3 | `public/20251201_MobiRides_Social_Content_Templates.md` | All "BIC insurance" / "BIC comprehensive" → "Pay-U damage protection" |
| 4.4 | `public/20251128_MobiRides_Investor_Pitch_Deck_Outline.md` | "BIC Botswana" → "Pay-U" |
| 4.5 | `public/20260309_MobiRides_Outstanding_Updates_Backlog.md` | "BIC/Pay-U" → "Pay-U" |
| 4.6 | `public/20260308_MobiRides_Implementation_Tracker.md` | "BIC/Pay-U" → "Pay-U" |

---

## Verification Checklist

- [ ] **Grep for stale terms** (expect 0 results each):
  - `grep -ri "911 MOBI\|1-800-MOBI\|MOBI-911" src/`
  - `grep -ri "BIC" src/ public/ website-updates*.md`
  - `grep -ri "included.*no.*cost\|no additional cost\|automatically included" src/`
  - `grep -ri "every rental.*include\|all rentals include\|all vehicles.*covered" src/`
- [ ] **Build check**: `bun run build` — no compilation errors
- [ ] **JSON validation**: All `.json` data files parse without errors
- [ ] **Visual spot-check** on dev server:
  - `/pricing` — protection described as optional
  - `/damage-protection` — tiers show percentages, limits, and excesses match canonical
  - `/host-protection` — tier names and pricing match canonical
  - `/safety` — no flat P1M/P2M figures, no fake emergency numbers
  - `/about`, `/faq`, `/support` — updated language

---

## Scope Exclusions

- **Placeholder links** (`href="#"`) in DamageProtectionPage.tsx — requires real URLs, out of scope
- **+267 74300748** (roadside assistance) — separate service, kept as-is
- **997** (Botswana emergency services) — correct local number, kept as-is

---

## File Inventory

**Total files to modify**: ~22  
**Total individual edits**: ~40+

### Source Code (Phases 1–3)
- `src/config/site.ts`
- `src/pages/PricingPage.tsx`
- `src/pages/DamageProtectionPage.tsx`
- `src/pages/HostProtectionPage.tsx`
- `src/pages/SafetyPage.tsx`
- `src/pages/AboutPage.tsx`
- `src/components/sections/TrustSection.tsx`
- `src/components/sections/HowItWorksSection.tsx`

### Data Files (Phases 1–3)
- `src/data/faq-data.json`
- `src/data/faqs.json`
- `src/data/faq.json`
- `src/data/support-articles.json`
- `src/data/contact-info.json`
- `src/data/hostSupport.json`
- `src/data/pricing.json`
- `src/data/legal-content.json`
- `src/data/press-releases.json`

### Marketing Documents (Phase 4)
- `website-updates-2025-11-23.md`
- `public/20251201_MobiRides_Launch_Campaign_Tracker.md`
- `public/20251201_MobiRides_Social_Content_Templates.md`
- `public/20251128_MobiRides_Investor_Pitch_Deck_Outline.md`
- `public/20260309_MobiRides_Outstanding_Updates_Backlog.md`
- `public/20260308_MobiRides_Implementation_Tracker.md`
