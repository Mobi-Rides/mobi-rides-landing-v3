# MobiRides Website Updates
**Date:** 23 November 2025

## Overview
This document outlines all website updates needed to reflect MobiRides' two-product portfolio strategy (P2P Car Sharing + Rent2Buy) and new partnership focus (Motshelo/Stokvel Groups + Chinese EV Dealerships).

---

## 1. Partners Page Updates (`src/data/partners.json`)

### Add Two New Partner Categories

#### Category 1: Motshelo/Stokvel Investment Groups
```json
{
  "id": "motshelo-stokvel",
  "name": "Motshelo/Stokvel Investment Groups",
  "icon": "Users",
  "description": "Join MobiRides as a financing partner through your investment group. Earn 6.5% returns while empowering Batswana to own vehicles through our Rent2Buy program.",
  "benefits": [
    "Earn 6.5% financing returns on your group's capital",
    "Low-risk secured lending (vehicles as collateral + GPS tracking)",
    "Monthly or quarterly payout options for your group",
    "Impact investing: Help Batswana achieve vehicle ownership",
    "Portfolio diversification into automotive sector",
    "Technology-enabled: Mobile money integration for easy payouts",
    "Full transparency: Track financed vehicles in real-time",
    "Community alignment: Support local entrepreneurship"
  ],
  "requirements": [
    "Registered motshelo/stokvel group with active membership",
    "Minimum investment capacity: P200,000",
    "Group membership: 20+ active members",
    "Track record of successful group investments (2+ years)",
    "Mobile money/digital payment capability",
    "Designated group representative for MobiRides partnership",
    "Agreement to MobiRides financing terms and risk-sharing model"
  ]
}
```

#### Category 2: Automotive Dealerships & Refleet Partners
```json
{
  "id": "automotive-refleet",
  "name": "Automotive Dealerships & Refleet Partners",
  "icon": "Car",
  "description": "Partner with MobiRides to list your used fleet vehicles on our Rent2Buy marketplace. Ideal for dealerships with EV offerings looking to position for Botswana's electric vehicle future.",
  "benefits": [
    "Access to ready-to-buy customers through Rent2Buy marketplace",
    "Earn revenue on used fleet vehicle sales (refleeting)",
    "MobiRides handles marketing, platform, and buyer financing",
    "Strategic partnership opportunity for EV-focused dealerships",
    "Position your brand as Botswana's EV mobility leader",
    "Co-marketing opportunities for EV tourism and rentals",
    "Technology platform integration (inventory management)",
    "Extended warranty and maintenance package opportunities"
  ],
  "requirements": [
    "Licensed automotive dealership in Botswana",
    "Used vehicle inventory available for Rent2Buy listing",
    "Preference: EV offerings in product line (BYD, GWM, Chery, JAC, Geely)",
    "Ability to provide vehicle history and maintenance records",
    "Willingness to offer warranty/maintenance packages for buyers",
    "Digital inventory management capability",
    "Commitment to 2-3 year refleeting cycle partnership",
    "Alignment with MobiRides' EV phase preparation (2026-2027)"
  ]
}
```

#### Update Existing: Financial Partners
**Update Description to:**
```json
{
  "description": "Join our network of traditional financial institutions providing vehicle financing for Rent2Buy customers. Complement our motshelo/stokvel partnerships with institutional lending capacity."
}
```

### Update Partnership Form (`PartnersPage.tsx`)

**Add to SelectItem dropdown:**
```tsx
<SelectItem value="motshelo-stokvel">Motshelo/Stokvel Investment Group</SelectItem>
<SelectItem value="automotive-refleet">Automotive Dealership/Refleet Partner</SelectItem>
```

---

## 2. Pricing Page Updates (`/pricing`)

### Current State
- Page currently displays pricing/cost information
- Needs to be repositioned as **Rent2Buy waitlist generation page**

### Updates Needed

#### Add Banner Section (Top of Page)
```tsx
<div className="bg-gradient-primary text-primary-foreground p-6 rounded-lg mb-8 text-center">
  <h2 className="text-3xl font-bold mb-2">Rent2Buy - Coming Q2 2026</h2>
  <p className="text-lg mb-4">
    Own your dream vehicle through flexible rent-to-own plans. Join the waitlist for early access!
  </p>
  <Button size="lg" variant="secondary">
    Join the Waitlist
  </Button>
</div>
```

#### Update Page Messaging
- **Primary Headline:** "Own Your Vehicle Through Rent2Buy - Q2 2026 Launch"
- **Subheadline:** "Be among the first to experience vehicle ownership made affordable. Join our exclusive waitlist."
- **CTA Focus:** All CTAs should direct to waitlist signup form (not booking)

#### Add Waitlist Form Section
```tsx
<section className="max-w-2xl mx-auto">
  <h3>Get Early Access to Rent2Buy</h3>
  <ContactForm 
    formType="rent2buy-waitlist"
    title="Join the Rent2Buy Waitlist"
    description="Get notified when we launch in Q2 2026 and receive exclusive early adopter benefits."
  />
</section>
```

#### Add Seller Information Section
```tsx
<section className="bg-muted/50 p-8 rounded-lg mt-12">
  <h3 className="text-2xl font-bold mb-4">Have Vehicles to Sell?</h3>
  <p className="mb-4">
    Are you a dealership, fleet owner, or individual with quality used vehicles? 
    List your vehicles on MobiRides Rent2Buy and reach motivated buyers.
  </p>
  <Button variant="outline" asChild>
    <Link to="/partners">Become a Partner</Link>
  </Button>
</section>
```

#### Clarify Pilot Status
- Add disclaimer: "Rent2Buy is currently in pilot phase with select vehicles. Public launch Q2 2026."
- Show example pricing scenarios but clearly mark as "estimated" or "example"

---

## 3. Homepage Updates (`src/pages/Index.tsx`)

### Add "Coming Soon" Teaser Section (Optional)

**Insert after TrustSection, before TestimonialsSection:**

```tsx
<section className="py-16 bg-gradient-subtle">
  <div className="container mx-auto px-4 text-center">
    <Badge className="mb-4">Coming Q2 2026</Badge>
    <h2 className="text-4xl font-bold mb-4">
      Introducing MobiRides Rent2Buy
    </h2>
    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
      Own your dream vehicle through flexible rent-to-own plans. 
      Powered by local motshelo partnerships and trusted dealerships.
    </p>
    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
      <Card>
        <CardHeader>
          <TrendingUp className="w-8 h-8 mb-2" />
          <CardTitle>10% Platform Fee</CardTitle>
        </CardHeader>
        <CardContent>
          Transparent pricing on every transaction
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Users className="w-8 h-8 mb-2" />
          <CardTitle>Motshelo Financing</CardTitle>
        </CardHeader>
        <CardContent>
          Community-backed financing with competitive rates
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Zap className="w-8 h-8 mb-2" />
          <CardTitle>EV-Ready</CardTitle>
        </CardHeader>
        <CardContent>
          Partnering with Chinese EV brands for sustainable mobility
        </CardContent>
      </Card>
    </div>
    <Button size="lg" asChild>
      <Link to="/pricing">Join the Waitlist</Link>
    </Button>
  </div>
</section>
```

---

## 4. Value Proposition Updates (Multiple Pages)

### Pages to Update
- `/` (Homepage)
- `/find-ride`
- `/host`

### New Value Propositions to Add

#### 1. On-Demand Delivery & Collection
```tsx
<div className="feature-card">
  <Truck className="w-12 h-12" />
  <h3>On-Demand Delivery & Collection</h3>
  <p>
    Book your rental and have it delivered to your location across Botswana. 
    We collect it when you're done—convenience at every step.
  </p>
</div>
```

#### 2. 5-30 Minute Booking Confirmation
```tsx
<div className="feature-card">
  <Clock className="w-12 h-12" />
  <h3>Fast 5-30 Minute Confirmation</h3>
  <p>
    Get booking confirmations in as fast as 5 minutes, maximum 30 minutes. 
    No more waiting days to know if your rental is secured.
  </p>
</div>
```

#### 3. Pay-U Insurance Partnership
```tsx
<div className="feature-card">
  <Shield className="w-12 h-12" />
  <h3>Trusted Pay-U Insurance</h3>
  <p>
    Every rental is covered by Pay-U, Botswana's leading insurance provider. 
    Comprehensive coverage gives you peace of mind on every trip.
  </p>
</div>
```

#### 4. 15% Fair Commission Model
```tsx
<div className="feature-card">
  <Percent className="w-12 h-12" />
  <h3>Transparent 15% Commission</h3>
  <p>
    Hosts keep 85% of every rental. No hidden fees, no surprises—just fair, 
    transparent earnings that reward your vehicle ownership.
  </p>
</div>
```

#### 5. Safari & Tourism Focus
```tsx
<div className="feature-card">
  <MapPin className="w-12 h-12" />
  <h3>Perfect for Safari & Tourism</h3>
  <p>
    Explore Botswana's world-famous Okavango Delta, Chobe National Park, 
    and Makgadikgadi Pans with the right vehicle for your adventure.
  </p>
</div>
```

---

## 5. Safari & Tourism Market Updates

### Create Dedicated Landing Page (Optional)
- **Path:** `/safari-tourism`
- **Content:**
  - Hero: "Explore Botswana's Wilderness with MobiRides"
  - Vehicle recommendations for safari (4x4s, SUVs)
  - Popular safari destinations (Okavango, Chobe, Makgadikgadi)
  - Partnership opportunities with lodges/tour operators
  - Seasonal demand considerations (peak: May-October)

### Update Locations Page (`/locations`)
- Add Safari & Tourism section
- Highlight Maun (Okavango gateway)
- Highlight Kasane (Chobe gateway)
- Mention vehicle types suited for safari routes

### Partnership Strategy
- **Target:** Lodges, tour operators, safari companies
- **Value Prop:** Provide vehicles to tourists without fleet ownership
- **Integration:** Direct booking links from lodge websites

---

## 6. Navigation & Branding Updates

### Main Navigation
- **DO NOT** add Rent2Buy to main navigation yet (Q2 2026 launch)
- Keep current structure: Find a Ride, Host, Partners, About, etc.

### Footer Navigation
- Add link to `/pricing` under "Products" or "Services" section
- Label as "Rent2Buy (Coming Soon)"

### Branding Consistency
- Use **"Rent2Buy"** consistently (not "Rent-to-Buy" or "R2B")
- Logo usage: Keep MobiRides primary, Rent2Buy as sub-brand

---

## 7. SEO & Meta Updates

### `/pricing` Page Meta
```html
<title>MobiRides Rent2Buy - Own Your Vehicle | Q2 2026 Launch</title>
<meta name="description" content="Join the waitlist for MobiRides Rent2Buy. Own your dream vehicle through flexible rent-to-own plans. Powered by motshelo financing. Launching Q2 2026 in Botswana." />
<meta property="og:title" content="MobiRides Rent2Buy - Coming Q2 2026" />
```

### `/partners` Page Meta Update
```html
<meta name="description" content="Partner with MobiRides. Join as a Motshelo/Stokvel investment group, automotive dealership, or financial institution. Grow Botswana's mobility ecosystem." />
```

---

## 8. Forms & Conversion Tracking

### Waitlist Form (New)
- **Location:** `/pricing` page
- **Fields:**
  - Name
  - Email
  - Phone
  - Preferred vehicle type (Dropdown: Entry-Level, Executive, Utility, EV)
  - Expected purchase timeline (Dropdown: Q2 2026, Q3 2026, Q4 2026, 2027)
  - How did you hear about Rent2Buy?
- **Submission:** Store in Supabase `rent2buy_waitlist` table
- **Follow-up:** Send confirmation email + add to newsletter

### Partner Form Update
- Already covered in Section 1 (add new SelectItem options)

---

## Priority Implementation Order

### Phase 1 (Immediate - Week 1)
1. ✅ Update `src/data/partners.json` with two new categories
2. ✅ Update `PartnersPage.tsx` form dropdown
3. ✅ Add `/pricing` page Rent2Buy banner and waitlist messaging

### Phase 2 (Week 2)
4. ✅ Add value proposition updates to `/`, `/find-ride`, `/host`
5. ✅ Create waitlist form component and database table
6. ✅ Update SEO meta tags

### Phase 3 (Optional - Week 3-4)
7. ✅ Add homepage "Coming Soon" teaser section
8. ✅ Create `/safari-tourism` landing page
9. ✅ Update locations page with safari focus

---

## Testing Checklist

- [ ] Partners page loads with two new categories
- [ ] Partner form dropdown includes new options
- [ ] `/pricing` page clearly shows Q2 2026 launch messaging
- [ ] Waitlist form submits successfully
- [ ] All value propositions display correctly across pages
- [ ] Mobile responsive design maintained
- [ ] SEO meta tags render correctly
- [ ] No broken links to external CTAs

---

## Notes

- **Rent2Buy in Navigation:** Wait until Q1 2026 to add to main nav
- **Pilot Vehicles:** Keep internal (don't showcase P200K repos publicly)
- **EV Messaging:** Emphasize "preparation" not "currently available"
- **Motshelo Outreach:** Website updates support offline outreach efforts
- **Chinese Dealerships:** Coordinate website launch with dealership MOUs

---

**Document Owner:** MobiRides Product Team  
**Last Updated:** 23 November 2025  
**Next Review:** 15 December 2025 (Pre-Q1 2026 Launch)
