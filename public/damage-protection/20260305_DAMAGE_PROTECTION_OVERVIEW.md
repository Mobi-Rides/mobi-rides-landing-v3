# MobiRides Damage Protection Module

---

## Terms & Conditions (Popup)

For the full terms and conditions, please click the "View Terms & Conditions" button in the app or website. The popup displays the latest Service Level Agreement and coverage details, including:

- Coverage tiers and inclusions/exclusions
- Premium calculation and payment terms
- Claims process and timelines
- Excess and admin fee details
- Revenue split and remittance schedule

The popup is powered by the TermsPopup React component, which renders the full markdown content of the Service Level Agreement for user review.

---

> **Version**: 1.0.0  
> **Date**: 2026-03-05  
> **Classification**: Mixed (sections marked individually)  
> **Owner**: MobiRides Product & Engineering  
> **Last Updated By**: Engineering Team

---

## Audience Matrix

| Section | Partners | Support | Investors | Engineers | Marketing |
|---------|:--------:|:-------:|:---------:|:---------:|:---------:|
| 1. Executive Summary | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2. Product Overview | ✅ | ✅ | ✅ | — | ✅ |
| 3. Coverage Tiers & Pricing | ✅ | ✅ | ✅ | ✅ | ✅ |
| 4. Business & Financial Model | ✅ (NDA) | — | ✅ | — | — |
| 5. Claims Process | ✅ | ✅ | ✅ | ✅ | ✅ |
| 6. Risk Assessment & Underwriting | ✅ (NDA) | — | — | ✅ | — |
| 7. Technical Architecture | — | — | — | ✅ | — |
| 8. User Experience Flows | — | ✅ | ✅ | ✅ | ✅ |
| 9. Admin Operations | — | ✅ | — | ✅ | — |
| 10. Notifications & Communication | — | ✅ | — | ✅ | — |
| 11. Compliance & Terms | ✅ | ✅ | ✅ | ✅ | — |
| 12. Current Status & Known Gaps | — | — | ✅ | ✅ | — |
| 13. Roadmap | ✅ | — | ✅ | ✅ | ✅ |
| 14. Document References | — | — | — | ✅ | — |
| 15. Appendix | ✅ | ✅ | ✅ | ✅ | ✅ |

**Legend**: ✅ = Relevant | — = Not applicable | (NDA) = Requires partner NDA

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Overview](#2-product-overview)
3. [Coverage Tiers & Pricing](#3-coverage-tiers--pricing)
4. [Business & Financial Model](#4-business--financial-model)
5. [Claims Process](#5-claims-process)
6. [Risk Assessment & Underwriting](#6-risk-assessment--underwriting)
7. [Technical Architecture](#7-technical-architecture)
8. [User Experience Flows](#8-user-experience-flows)
9. [Admin Operations](#9-admin-operations)
10. [Notifications & Communication](#10-notifications--communication)
11. [Compliance & Terms](#11-compliance--terms)
12. [Current Status & Known Gaps](#12-current-status--known-gaps)
13. [Roadmap](#13-roadmap)
14. [Document References](#14-document-references)
15. [Appendix](#15-appendix)

---

## 1. Executive Summary

**Classification**: Public

**Damage Protection** is MobiRides' integrated rental-period insurance product that protects hosts against vehicle damage and loss caused by renters. It is a core trust layer enabling peer-to-peer car sharing in Botswana.

### Key Facts

| Attribute | Detail |
|-----------|--------|
| **Product Name** | Damage Protection (branded; "insurance" used internally) |
| **Underwriting Partner** | Pay-U |
| **Revenue Split** | 90% Pay-U / 10% MobiRides commission |
| **Coverage Scope** | Botswana P2P car rentals via MobiRides platform |
| **Coverage Tiers** | 4 (No Coverage, Basic, Standard, Premium) |
| **International Coverage Cap** | $2,000,000 USD |
| **Premium Currency** | BWP (Botswana Pula) |
| **Premium Basis** | Percentage of daily rental rate × rental days × risk multiplier |
| **Claim Reporting Window** | 24 hours from incident |
| **Auto-Approval Threshold** | Claims < P500 |

### How It Works (30-Second Overview)

1. **Renter selects** a Damage Protection tier during booking checkout
2. **Premium is calculated** based on daily rental rate, tier percentage, and risk profile
3. **Policy certificate** (PDF) is auto-generated upon booking confirmation
4. **If an incident occurs**, the renter submits a claim via the app with evidence
5. **Claims are reviewed** by MobiRides admin (or auto-approved if < P500)
6. **Approved payouts** are credited to the renter's wallet; excess is collected from renter
7. **Premiums are remitted** to Pay-U in batches (90/10 split)

---

## 2. Product Overview

**Classification**: Public

### What Is Damage Protection?

Damage Protection is rental-period coverage that shields car owners (hosts) from financial loss when their vehicle is damaged, stolen, or vandalized during a MobiRides rental. Unlike traditional rental car insurance sold by agencies, Damage Protection is:

- **Embedded**: Selected during the booking flow, not purchased separately
- **Proportional**: Priced as a percentage of the rental cost, not a flat fee
- **Risk-Adjusted**: Premiums factor in driver verification status, vehicle value, and claims history
- **Platform-Managed**: Claims are filed, tracked, and resolved entirely within MobiRides

### Why It Exists

Peer-to-peer car sharing requires a trust mechanism between strangers. Damage Protection:

- **Reduces host anxiety** about listing vehicles, increasing supply
- **Increases renter confidence** to book higher-value vehicles
- **Generates platform revenue** via the 10% commission on premiums
- **Creates competitive differentiation** vs informal rental arrangements

### Competitive Positioning

| Feature | MobiRides Damage Protection | Traditional Rental Insurance | Informal Arrangements |
|---------|:--:|:--:|:--:|
| Embedded in booking flow | ✅ | ❌ | ❌ |
| Risk-adjusted pricing | ✅ | ❌ | ❌ |
| In-app claims | ✅ | ❌ | ❌ |
| Auto-generated policy docs | ✅ | ✅ | ❌ |
| Professional underwriter | ✅ | ✅ | ❌ |
| P2P-optimized | ✅ | ❌ | ❌ |

### Target Metrics

| Metric | Target | Notes |
|--------|--------|-------|
| Attach rate | 30%+ | % of bookings with Damage Protection |
| Average premium per booking | P300-P600 | Based on Standard/Premium tiers |
| Monthly premium revenue | P15,000-P25,000 | At scale with 100+ monthly bookings |
| Claim approval rate | 70-80% | Excluding fraudulent/invalid claims |

---

## 3. Coverage Tiers & Pricing

**Classification**: Public

### Tier Comparison

| Tier | Premium % | Coverage Cap | Excess (Deductible) | Minor Damage | Major Incidents |
|------|:---------:|:------------:|:-------------------:|:------------:|:---------------:|
| **No Coverage** | 0% | — | — | ❌ | ❌ |
| **Basic** | 10% | P15,000 | P300 | ✅ | ❌ |
| **Standard** | 15% | P50,000 | P1,000 | ✅ | ✅ |
| **Premium** | 20% | P50,000 | P500 (reduced) | ✅ | ✅ |

### What's Covered

**Minor Damage** (Basic, Standard, Premium):
- Windscreen/window damage
- Tyre damage or blowout
- Minor body scratches and dents
- Side mirror damage

**Major Incidents** (Standard, Premium only):
- Collision damage
- Theft of vehicle
- Vandalism
- Fire damage
- Weather/natural disaster damage
- Total loss

### Key Exclusions (All Tiers)

- Damage from illegal activities or unauthorized drivers
- Mechanical/engine failure (pre-existing)
- Wear and tear
- Personal belongings inside the vehicle
- Driving under the influence
- Use outside of Botswana without prior approval

### Premium Calculation Formula

```
Premium = Daily Rental Rate × Premium Percentage × Risk Multiplier × Number of Days
```

**Variables**:
- `Daily Rental Rate`: Car's listed price per day (BWP)
- `Premium Percentage`: Tier rate stored as decimal (0.10, 0.15, 0.20)
- `Risk Multiplier`: 1.0 (low), 1.2 (medium), 1.5 (high), 10.0 (prohibited/declined)
- `Number of Days`: Rental duration (minimum 1 day)

### Worked Examples

#### Example 1: P500/day car, 7-day rental, Standard tier, low risk

| Component | Calculation | Amount |
|-----------|-------------|--------|
| Daily rental | — | P500.00 |
| Premium % | 15% | 0.15 |
| Risk multiplier | Low risk | 1.0 |
| Days | — | 7 |
| **Premium per day** | P500 × 0.15 × 1.0 | **P75.00** |
| **Total premium** | P75.00 × 7 | **P525.00** |

#### Example 2: P1,000/day car, 3-day rental, Premium tier, medium risk

| Component | Calculation | Amount |
|-----------|-------------|--------|
| Daily rental | — | P1,000.00 |
| Premium % | 20% | 0.20 |
| Risk multiplier | Medium risk (unverified driver) | 1.2 |
| Days | — | 3 |
| **Premium per day** | P1,000 × 0.20 × 1.2 | **P240.00** |
| **Total premium** | P240.00 × 3 | **P720.00** |

---

## 4. Business & Financial Model

**Classification**: Internal Only / Partner NDA Required

### Revenue Flow

```
Renter pays booking total (rental + damage protection premium)
         |
         v
   MobiRides Business Account (custodial)
         |
         |-- 85% rental amount --> Host Wallet (ledger entry)
         |-- 15% rental amount --> MobiRides Commission
         |
         '-- Premium amount:
              |-- 90% --> Pay-U (underwriter) via batch remittance
              '-- 10% --> MobiRides Insurance Commission
```

### Commission Configuration

The commission split is stored in the `insurance_commission_rates` database table, allowing rate adjustments without code changes:

| Field | Description |
|-------|-------------|
| `rate` | Current commission rate (decimal, e.g., 0.10 for 10%) |
| `effective_from` | Date the rate takes effect |
| `effective_until` | End date (null = current rate) |
| `min_premium_amount` | Minimum premium before commission applies |
| `max_commission_amount` | Cap on commission per policy |

### Remittance to Pay-U

Premiums owed to Pay-U are tracked in the `premium_remittance_batches` table.