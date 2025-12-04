import React from 'react';
import { PageLayout, PageHero } from '@/components/layouts';
import { buildCanonicalUrl } from '@/config/site';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Car, 
  Shield, 
  Headphones, 
  UserCheck,
  CreditCard,
  Check,
  Sparkles
} from 'lucide-react';

const PricingPage: React.FC = () => {
  const pricingTiers = [
    {
      tier: 1,
      category: 'Economy',
      dailyRate: 'P400 - P500',
      examples: ['Toyota Corolla', 'VW Polo', 'Hyundai i20'],
      description: 'Perfect for city commutes and budget-conscious travelers',
      popular: false,
    },
    {
      tier: 2,
      category: 'Standard',
      dailyRate: 'P750 - P1,000',
      examples: ['Honda Fit', 'Mazda 3', 'Toyota Camry'],
      description: 'Comfortable rides for business and leisure',
      popular: true,
    },
    {
      tier: 3,
      category: 'Executive',
      dailyRate: 'P1,500 - P2,000',
      examples: ['Mercedes C-Class', 'BMW 3 Series', 'Audi A4'],
      description: 'Premium vehicles for distinguished professionals',
      popular: false,
    },
    {
      tier: 4,
      category: '4x4 / SUV',
      dailyRate: 'P2,000 - P2,500',
      examples: ['Toyota Fortuner', 'Land Rover Discovery', 'Ford Ranger'],
      description: 'Adventure-ready vehicles for safari and off-road',
      popular: false,
    },
    {
      tier: 5,
      category: 'Prestige',
      dailyRate: 'P3,500 - P4,500',
      examples: ['Range Rover', 'Mercedes GLE', 'BMW X5'],
      description: 'Luxury vehicles for the ultimate experience',
      popular: false,
    },
  ];

  const includedFeatures = [
    {
      icon: Shield,
      title: 'BIC Insurance Coverage',
      description: 'Every rental includes comprehensive insurance for peace of mind',
    },
    {
      icon: Headphones,
      title: '24/7 Roadside Assistance',
      description: 'Our support team is always available when you need help',
    },
    {
      icon: UserCheck,
      title: 'Verified Host Network',
      description: 'All hosts are vetted and vehicles inspected for quality',
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Safe, transparent transactions with no hidden fees',
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "MobiRides P2P Car Sharing",
    "description": "Transparent peer-to-peer car sharing rates in Botswana. All rentals include BIC insurance coverage.",
    "provider": {
      "@type": "Organization",
      "name": "MobiRides"
    }
  };

  return (
    <PageLayout
      title="Car Sharing Rates | Transparent P2P Pricing | MobiRides Botswana"
      description="Find the perfect vehicle at fair prices. Browse our 5-tier pricing from Economy (P400/day) to Prestige (P4,500/day). All rentals include BIC insurance coverage."
      keywords="car rental prices Botswana, P2P car sharing rates, vehicle hire Gaborone, MobiRides pricing, car rental Botswana"
      canonical={buildCanonicalUrl('/pricing')}
      jsonLd={jsonLd}
    >
      <PageHero
        title="Transparent P2P Car Sharing Rates"
        description="Find the perfect vehicle at fair prices. All rentals include BIC insurance coverage."
      />

      {/* Promo Banner */}
      <section className="py-6 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
            <p className="text-lg font-semibold text-primary-foreground">
              Use code <span className="bg-primary-foreground/20 px-2 py-1 rounded">MOBIRIDES100</span> for P100 off your first booking!
            </p>
            <Sparkles className="h-6 w-6 text-primary-foreground hidden sm:block" />
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vehicle Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our 5-tier vehicle categories. Rates vary by host and specific vehicle features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingTiers.map((tier) => (
              <Card 
                key={tier.tier} 
                className={`relative ${tier.popular ? 'border-primary border-2 shadow-lg' : ''}`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Car className="h-7 w-7 text-primary" />
                  </div>
                  <Badge variant="outline" className="mb-2 w-fit mx-auto">Tier {tier.tier}</Badge>
                  <CardTitle className="text-2xl">{tier.category}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4 bg-muted rounded-lg">
                    <p className="text-2xl md:text-3xl font-bold text-primary">{tier.dailyRate}</p>
                    <p className="text-sm text-muted-foreground">per day</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Example Vehicles:</p>
                    <ul className="space-y-1">
                      {tier.examples.map((example, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Included</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every MobiRides rental comes with these benefits at no extra cost.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {includedFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Ride?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Browse available vehicles from verified hosts across Botswana.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="min-h-[48px] px-8"
            asChild
          >
            <a 
              href="https://app.mobirides.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Browse Available Vehicles
            </a>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default PricingPage;