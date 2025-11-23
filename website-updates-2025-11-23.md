# MobiRides Website Updates
**Date:** 23 November 2025  
**Status:** Based on Actual Performance Data (Jan-Nov 2025)

## CONTEXT: CURRENT STATUS & LIVE CAMPAIGN

### Platform Status (As of Nov 2025):
- **Web App:** Live MVP operational since Q1 2025
- **Native Mobile App:** In development (Version 4)
- **Current Traction:** 100+ organic users, 46+ vehicles, P10,000+ revenue to-date
- **Zero Paid Marketing:** All growth organic/referral-based

### Active Launch Campaign (Nov 17 - Dec 14, 2025):
- **Phase 1:** Renter Campaign (Nov 17-30)
  - **Promo:** P100 OFF first rental
  - **Code:** FIRST100
  - **Targets:** 500+ downloads, 500+ registrations, 50+ bookings
- **Phase 2:** Host Campaign (Dec 1-14)
  - **Message:** "Earn up to P5,000/month"
  - **Targets:** 20+ host registrations, 30+ cars listed

### Confirmed Partnerships:
- **Insurance:** BIC, Pay-U (comprehensive coverage operational)
- **Financing:** Sekele Fund, Metshelo (discussions for Rent2Buy)
- **Mobile Money:** Orange, Mascom, BeMobile (payment integration)
- **Ecosystem:** Botswana Innovation Hub, BoostUp Accelerator, Deverse Labs

### Financial Performance (Jan-Oct 2025):
- **January:** P14,200 revenue, P55,000 investment (Cerberus Capital)
- **February:** P30,195 revenue (PULAMED contracts, multiple bookings)
- **March-Oct:** Consistent operations, P18-22K avg monthly revenue
- **Key Insight:** Product-market fit validated, ready for scale

---

## 1. Partners Page Updates (`src/data/partners.json`)

### Add Two New Partner Categories

#### Category 1: Motshelo/Stokvel Investment Groups
```json
{
  "id": "motshelo-stokvel",
  "name": "Motshelo/Stokvel Investment Groups",
  "icon": "Users",
  "description": "Join MobiRides as a Rent2Buy financing partner. Earn 6.5% returns while empowering Batswana to own vehicles through community-backed lending.",
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
  "description": "Partner with MobiRides to list your used fleet vehicles on our Rent2Buy marketplace. Ideal for dealerships with EV offerings preparing for Botswana's electric vehicle future.",
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

## 2. `/pricing` Page - Active Campaign & Rent2Buy Waitlist

### Current Priority:
1. Feature **P100 OFF** promotion (active until Dec 31, 2025)
2. Showcase verified traction (100+ users, 46+ vehicles)
3. Generate Rent2Buy waitlist for Q2 2026 launch

### Required Updates:

#### A. Page Hero with Active Promotion:
```tsx
<section className="hero-section">
  {/* Promotion Banner - Top Priority */}
  <div className="bg-gradient-primary text-primary-foreground py-4 text-center mb-6">
    <h1 className="text-2xl md:text-3xl font-bold mb-2">
      🎉 Launch Special: Get P100 OFF Your First Rental
    </h1>
    <p className="text-lg">
      Use code <strong className="text-2xl">FIRST100</strong> at checkout
    </p>
    <p className="text-sm opacity-90 mt-1">
      Valid until December 31, 2025 | Join 100+ renters already saving
    </p>
  </div>

  {/* Main Headline */}
  <h2 className="text-4xl font-bold mb-4">
    Transparent Pricing. No Surprises.
  </h2>
  <p className="text-xl text-muted-foreground mb-6">
    Browse 46+ verified vehicles. Book in minutes. Drive in hours.
  </p>
  
  <div className="flex gap-4 justify-center">
    <Button size="lg" asChild>
      <Link to="/find-ride">Claim P100 OFF Now →</Link>
    </Button>
    <Button size="lg" variant="outline" asChild>
      <Link to="#rent2buy-waitlist">Join Rent2Buy Waitlist (Q2 2026)</Link>
    </Button>
  </div>
</section>
```

#### B. P2P Car Sharing - Live Now Section:
```tsx
<section className="p2p-pricing">
  <Badge className="mb-4">Live Now - Book Today</Badge>
  <h3 className="text-3xl font-bold mb-6">P2P Car Sharing - Active Campaign</h3>
  
  {/* Renter Pricing */}
  <div className="renter-section mb-12">
    <h4 className="text-2xl font-semibold mb-4">For Renters</h4>
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Browse 46+ Vehicles</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            <li>✓ Budget sedans: P150-250/day (P50-150/day with FIRST100)</li>
            <li>✓ Mid-range: P200-400/day</li>
            <li>✓ Safari SUVs: P350-600/day</li>
            <li>✓ Executive: P500-800/day</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Example: Book a P200/day sedan → Pay only P100/day on your first rental with code FIRST100
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Why 100+ Renters Choose MobiRides</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            <li>✓ Transparent pricing - what you see is what you pay</li>
            <li>✓ 5-30 minute booking confirmation</li>
            <li>✓ Pay-U comprehensive insurance included</li>
            <li>✓ On-demand delivery & collection</li>
          </ul>
        </CardContent>
      </Card>
    </div>
    <Button className="mt-6" asChild>
      <Link to="/find-ride">Find Your Ride (P100 OFF) →</Link>
    </Button>
  </div>
  
  {/* Host Earnings */}
  <div className="host-section">
    <h4 className="text-2xl font-semibold mb-4">For Hosts</h4>
    <Card className="bg-accent">
      <CardHeader>
        <CardTitle>Earn Up to P5,000/Month</CardTitle>
        <CardDescription>Simple 15% commission. Keep 85% of every rental.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="earnings-calculator bg-background p-6 rounded-lg">
          <p className="font-semibold mb-2">Example Earnings:</p>
          <ul>
            <li>Daily Rate: P200/day</li>
            <li>Your Earnings: P170/day (after 15% commission)</li>
            <li>Monthly (30 days rented): P5,100/month</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Our top hosts earn P5,000+ monthly with consistent bookings. 
            Join 46+ verified hosts already earning on MobiRides.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link to="/host">List Your Car & Start Earning →</Link>
        </Button>
      </CardFooter>
    </Card>
  </div>
</section>
```

#### C. Rent2Buy - Coming Q2 2026 Section:
```tsx
<section id="rent2buy-waitlist" className="rent2buy-section mt-16 bg-muted/30 p-12 rounded-lg">
  <div className="text-center mb-8">
    <Badge variant="secondary" className="mb-4">Coming Q2 2026</Badge>
    <h3 className="text-3xl font-bold mb-4">
      MobiRides Rent2Buy Marketplace
    </h3>
    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
      Turn your rental into ownership. Browse quality used vehicles, 
      finance through motshelo/stokvel partnerships, and drive away your dream car.
    </p>
  </div>
  
  <div className="grid md:grid-cols-3 gap-6 mb-12">
    <Card>
      <CardHeader>
        <Percent className="w-8 h-8 mb-2" />
        <CardTitle>10% Platform Fee</CardTitle>
      </CardHeader>
      <CardContent>
        Transparent pricing on every vehicle transaction
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <Users className="w-8 h-8 mb-2" />
        <CardTitle>Motshelo Financing</CardTitle>
      </CardHeader>
      <CardContent>
        Community-backed financing with competitive 12-15% rates
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <Zap className="w-8 h-8 mb-2" />
        <CardTitle>EV-Ready</CardTitle>
      </CardHeader>
      <CardContent>
        Partnering with Chinese EV dealerships for sustainable mobility
      </CardContent>
    </Card>
  </div>
  
  {/* Waitlist Form */}
  <div className="max-w-2xl mx-auto">
    <h4 className="text-2xl font-semibold mb-4 text-center">Join the Rent2Buy Waitlist</h4>
    <ContactForm 
      formType="rent2buy-waitlist"
      title="Get Early Access"
      description="Be among the first to own your vehicle through MobiRides Rent2Buy. Get notified when we launch in Q2 2026."
    />
  </div>
  
  {/* Seller CTA */}
  <div className="mt-12 text-center p-8 bg-background rounded-lg border">
    <h5 className="text-xl font-semibold mb-2">Have Vehicles to Sell?</h5>
    <p className="mb-4 text-muted-foreground">
      Dealerships, fleet owners, and individuals with quality used vehicles can list on Rent2Buy
    </p>
    <Button variant="outline" asChild>
      <Link to="/partners">Become a Partner →</Link>
    </Button>
  </div>
</section>
```

---

## 3. Homepage Updates (`src/pages/Index.tsx`)

### Required Changes:

#### A. Add Active Promotion Banner (Top of Page):
```tsx
{/* Insert before HeroSection */}
<div className="bg-primary text-primary-foreground py-3 text-center sticky top-0 z-50">
  <p className="text-sm md:text-base font-medium">
    🎉 Launch Special: Get <strong>P100 OFF</strong> your first rental with code <strong>FIRST100</strong> 
    <span className="mx-2 opacity-90">|</span>
    <span className="opacity-90">Valid until Dec 31, 2025</span>
    <Button variant="ghost" size="sm" className="ml-4 text-primary-foreground hover:text-primary" asChild>
      <Link to="/find-ride">Book Now →</Link>
    </Button>
  </p>
</div>
```

#### B. Update TrustSection with Real Metrics:
```tsx
// In src/components/sections/TrustSection.tsx
const stats = [
  { number: "100+", label: "Active Renters", icon: Users },
  { number: "46+", label: "Verified Vehicles", icon: Car },
  { number: "P10K+", label: "Revenue Generated", icon: TrendingUp },
  { number: "15%", label: "Fair Commission", icon: Percent }
];
```

#### C. Insert Rent2Buy Teaser Section:
```tsx
{/* Insert between HowItWorksSection and TestimonialsSection */}
<section className="py-20 bg-gradient-to-b from-muted/30 to-background">
  <div className="container mx-auto px-4 text-center">
    <Badge variant="secondary" className="mb-4">Coming Q2 2026</Badge>
    <h2 className="text-4xl font-bold mb-4">
      Introducing Rent2Buy Marketplace
    </h2>
    <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
      Own your dream vehicle through flexible rent-to-own plans. 
      Powered by motshelo/stokvel partnerships and trusted dealerships. 
      Join the waitlist for exclusive early access.
    </p>
    <div className="flex gap-4 justify-center">
      <Button size="lg" variant="default" asChild>
        <Link to="/pricing#rent2buy-waitlist">
          Join the Waitlist →
        </Link>
      </Button>
      <Button size="lg" variant="outline" asChild>
        <Link to="/partners">
          Partner With Us
        </Link>
      </Button>
    </div>
  </div>
</section>
```

---

## 4. Value Proposition Updates (Multiple Pages)

### Pages to Update:
- Homepage (`/`)
- Find Ride Page (`/find-ride`)
- Host Page (`/host`)

### Value Propositions to Add (With Real Data):

#### 1. Active Promotion (Renter-Focused) - Priority
```tsx
<Card className="border-primary">
  <CardHeader>
    <Tag className="w-12 h-12 text-primary" />
    <CardTitle>P100 OFF Your First Rental</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Join 100+ renters who've saved with code FIRST100. Book by Dec 31, 2025.</p>
    <Button className="mt-4" asChild>
      <Link to="/find-ride">Claim Your Discount →</Link>
    </Button>
  </CardContent>
</Card>
```

#### 2. Verified Earning Potential (Host-Focused)
```tsx
<Card>
  <CardHeader>
    <TrendingUp className="w-12 h-12" />
    <CardTitle>Earn Up to P5,000/Month</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Our top hosts earn P5,100/month with P200/day rates. Simple 15% commission. Keep 85% of every rental.</p>
    <div className="mt-4 p-4 bg-muted rounded-lg">
      <p className="text-sm font-semibold">Real Example:</p>
      <ul className="text-sm mt-2">
        <li>• P200/day rate = P170/day earnings</li>
        <li>• 30 days rented = P5,100/month</li>
      </ul>
    </div>
  </CardContent>
</Card>
```

#### 3. Verified Fleet & Trust
```tsx
<Card>
  <CardHeader>
    <ShieldCheck className="w-12 h-12" />
    <CardTitle>46+ Verified Vehicles</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Every vehicle inspected and insured. Backed by BIC and Pay-U comprehensive insurance coverage.</p>
  </CardContent>
</Card>
```

#### 4. Pay-U Insurance Partnership
```tsx
<Card>
  <CardHeader>
    <Shield className="w-12 h-12" />
    <CardTitle>Trusted Pay-U Insurance</CardTitle>
  </CardHeader>
  <CardContent>
    <p>All rentals covered by Pay-U, Botswana's leading insurance provider. Comprehensive coverage gives you peace of mind on every trip.</p>
  </CardContent>
</Card>
```

#### 5. Fast Confirmations
```tsx
<Card>
  <CardHeader>
    <Clock className="w-12 h-12" />
    <CardTitle>5-30 Minute Confirmations</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Most bookings confirmed within 30 minutes. Need it urgently? We'll prioritize your request.</p>
  </CardContent>
</Card>
```

#### 6. On-Demand Delivery
```tsx
<Card>
  <CardHeader>
    <Truck className="w-12 h-12" />
    <CardTitle>We Bring the Car to You</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Skip the pickup hassle. Select delivery & collection for added convenience across Gaborone, Francistown, and Maun.</p>
  </CardContent>
</Card>
```

#### 7. Fair Commission Model
```tsx
<Card>
  <CardHeader>
    <Percent className="w-12 h-12" />
    <CardTitle>Transparent 15% Commission</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Hosts keep 85% of every rental. No hidden fees. No monthly costs. Just straightforward, fair earnings.</p>
  </CardContent>
</Card>
```

#### 8. Safari & Tourism Focus
```tsx
<Card>
  <CardHeader>
    <Compass className="w-12 h-12" />
    <CardTitle>Perfect for Safari Adventures</CardTitle>
  </CardHeader>
  <CardContent>
    <p>From Chobe to the Okavango Delta - explore Botswana's wonders with 46+ verified vehicles including 4x4s and SUVs.</p>
  </CardContent>
</Card>
```

---

## 5. SEO & Meta Updates

### `/pricing` Page Meta:
```html
<title>MobiRides Pricing - P100 OFF First Rental | Rent2Buy Coming Q2 2026</title>
<meta name="description" content="Get P100 OFF your first rental with code FIRST100. Browse 46+ vehicles from P150/day. Join Rent2Buy waitlist for vehicle ownership through motshelo financing. Valid until Dec 31, 2025." />
<meta property="og:title" content="MobiRides - P100 OFF First Rental | Rent2Buy Q2 2026" />
<meta property="og:description" content="Join 100+ renters saving with code FIRST100. Book now or join Rent2Buy waitlist for vehicle ownership." />
```

### `/partners` Page Meta:
```html
<title>Partner with MobiRides - Motshelo Groups | EV Dealerships | Financial Institutions</title>
<meta name="description" content="Join MobiRides as a Motshelo/Stokvel investment group (earn 6.5%), automotive dealership, or financial partner. Grow Botswana's mobility ecosystem with 46+ verified vehicles." />
```

### Homepage Meta:
```html
<meta name="description" content="MobiRides - Botswana's trusted P2P car sharing platform. Get P100 OFF your first rental with code FIRST100. 100+ active renters, 46+ verified vehicles, Pay-U insurance included." />
```

---

## 6. Forms & Conversion Tracking

### Rent2Buy Waitlist Form (New):
```tsx
// src/components/forms/Rent2BuyWaitlistForm.tsx
<form onSubmit={handleSubmit}>
  <Input 
    name="name" 
    label="Full Name" 
    required 
  />
  <Input 
    name="email" 
    type="email" 
    label="Email Address" 
    required 
  />
  <Input 
    name="phone" 
    type="tel" 
    label="Phone Number" 
    required 
  />
  <Select name="vehicle_type" label="Preferred Vehicle Type">
    <SelectItem value="entry-level">Entry-Level (P80K-P150K)</SelectItem>
    <SelectItem value="executive">Executive (P200K-P350K)</SelectItem>
    <SelectItem value="utility">Utility/4x4 (P150K-P300K)</SelectItem>
    <SelectItem value="ev">Electric Vehicle (EV)</SelectItem>
  </Select>
  <Select name="timeline" label="Expected Purchase Timeline">
    <SelectItem value="q2-2026">Q2 2026 (Apr-Jun)</SelectItem>
    <SelectItem value="q3-2026">Q3 2026 (Jul-Sep)</SelectItem>
    <SelectItem value="q4-2026">Q4 2026 (Oct-Dec)</SelectItem>
    <SelectItem value="2027">2027</SelectItem>
  </Select>
  <Select name="source" label="How did you hear about Rent2Buy?">
    <SelectItem value="social-media">Social Media</SelectItem>
    <SelectItem value="mobi-renter">I'm a current MobiRides renter</SelectItem>
    <SelectItem value="mobi-host">I'm a current MobiRides host</SelectItem>
    <SelectItem value="word-of-mouth">Word of Mouth</SelectItem>
    <SelectItem value="website">MobiRides Website</SelectItem>
    <SelectItem value="other">Other</SelectItem>
  </Select>
  <Button type="submit">Join Waitlist</Button>
</form>
```

**Supabase Table:** `rent2buy_waitlist`
```sql
CREATE TABLE rent2buy_waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicle_type TEXT,
  timeline TEXT,
  source TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Priority Implementation Order

### Phase 1 (Immediate - This Week)
1. ✅ Add active promotion banner to homepage
2. ✅ Update `/pricing` page with P100 OFF campaign
3. ✅ Update `partners.json` with two new categories
4. ✅ Update TrustSection with real metrics (100+, 46+, P10K+)

### Phase 2 (Week 2)
5. ✅ Add value propositions across `/`, `/find-ride`, `/host`
6. ✅ Create Rent2Buy waitlist form and database table
7. ✅ Update all SEO meta tags
8. ✅ Add Rent2Buy teaser section to homepage

### Phase 3 (Optional - Week 3-4)
9. ✅ Create `/safari-tourism` landing page
10. ✅ Update `/locations` with safari focus
11. ✅ Add conversion tracking for campaign

---

## Testing Checklist

- [ ] Active promotion banner displays correctly on homepage
- [ ] P100 OFF messaging clear on `/pricing` page
- [ ] Rent2Buy waitlist form submits successfully
- [ ] Real metrics display correctly (100+, 46+, P10K+)
- [ ] Partners page loads with new categories
- [ ] All CTAs link to correct pages
- [ ] Mobile responsive design maintained
- [ ] SEO meta tags render correctly
- [ ] No broken links

---

**Document Owner:** MobiRides Product Team  
**Campaign Duration:** Nov 17 - Dec 31, 2025  
**Next Review:** Dec 15, 2025 (Pre-Q1 2026 Rent2Buy Pilot)
