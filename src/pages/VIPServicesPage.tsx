import React, { useState } from 'react';
import { PageLayout } from '../components/layouts';
import { buildCanonicalUrl } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Plane, Car, Users, Calendar, Map, Shield,
  Star, Clock, Phone, CheckCircle, ArrowRight, Award
} from 'lucide-react';
import vipHero from '@/assets/banners/vip-hero.jpg';
import luxurySuv from '@/assets/luxury-suv.jpg';
import familySedan from '@/assets/family-sedan.jpg';
import commercialVan from '@/assets/commercial-van.jpg';
import pickupTruck from '@/assets/pickup-truck.jpg';

const services = [
  {
    icon: Plane,
    title: 'Airport Transfers',
    description: 'Seamless meet & greet service with real-time flight tracking. Your chauffeur is always on time, whether you land early or late.',
    features: ['Flight tracking', 'Meet & greet', 'Luggage assistance', 'Premium vehicles']
  },
  {
    icon: Car,
    title: 'Executive Chauffeur',
    description: 'Professional drivers available for hourly or daily hire. Corporate accounts with consolidated billing and reporting.',
    features: ['Hourly/daily hire', 'Corporate accounts', 'Professional drivers', 'In-car WiFi']
  },
  {
    icon: Users,
    title: 'VIP Shuttle Service',
    description: 'Group transport for delegations, teams, and events. Multi-stop routes with branded vehicles available.',
    features: ['Group transport', 'Multi-stop routes', 'Branded vehicles', 'Onboard coordination']
  },
  {
    icon: Calendar,
    title: 'Events & Conferences',
    description: 'End-to-end delegate transport and logistics coordination. On-site fleet management for seamless event mobility.',
    features: ['Delegate transport', 'Logistics planning', 'On-site management', 'Real-time coordination']
  },
  {
    icon: Map,
    title: 'Safari & Tour Drives',
    description: 'Guided safari transfers and scenic tours in rugged 4x4 vehicles. Explore Botswana\'s wilderness in comfort and style.',
    features: ['4x4 vehicles', 'Guided tours', 'Scenic routes', 'Custom itineraries']
  },
  {
    icon: Shield,
    title: 'Diplomatic & Protocol Transport',
    description: 'Security-cleared, protocol-trained chauffeurs for ambassadors, dignitaries, and government officials. Discreet and confidential.',
    features: ['Security-cleared drivers', 'Protocol-trained', 'Confidential service', 'Advance planning']
  }
];

const valueProps = [
  {
    icon: Award,
    title: 'Professional, Vetted Chauffeurs',
    description: 'Every driver is background-checked, professionally trained, and experienced in executive and diplomatic transport.'
  },
  {
    icon: Car,
    title: 'Premium & Luxury Fleet',
    description: 'From luxury sedans to safari 4x4s and shuttle vans — our fleet is maintained to the highest standards.'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Round-the-clock service with real-time coordination. Early morning flights or late-night events — we\'re always ready.'
  },
  {
    icon: Shield,
    title: 'Discreet, Protocol-Aware Service',
    description: 'Trusted by embassies and international organisations. We understand the importance of discretion and professionalism.'
  }
];

const fleet = [
  { image: luxurySuv, name: 'Luxury SUV', description: 'Executive transport & airport transfers' },
  { image: familySedan, name: 'Premium Sedan', description: 'Corporate chauffeur & city travel' },
  { image: pickupTruck, name: 'Safari 4x4', description: 'Game drives & wilderness tours' },
  { image: commercialVan, name: 'Shuttle Van', description: 'Group & delegation transport' },
];

const testimonials = [
  {
    quote: "MobiRides provided exceptional transport for our delegation during the Techstars Botswana programme. Professional, punctual, and perfectly coordinated.",
    author: "Programme Director",
    org: "Techstars Botswana"
  },
  {
    quote: "We rely on MobiRides for all our official ground transport in Gaborone. Their protocol awareness and discretion are outstanding.",
    author: "Embassy Representative",
    org: "European Diplomatic Mission"
  },
  {
    quote: "From airport pickups to conference shuttles, MobiRides handled everything flawlessly for our 200-delegate regional summit.",
    author: "Events Manager",
    org: "International Conference Organiser"
  }
];

const VIPServicesPage: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', serviceType: '', eventDate: '', guests: '', requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.serviceType) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Quote request submitted!", description: "Our VIP team will contact you within 24 hours." });
    setFormData({ name: '', email: '', phone: '', serviceType: '', eventDate: '', guests: '', requirements: '' });
    setIsSubmitting(false);
  };

  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "MobiRides VIP & Executive Transport Services",
    "description": "Premium chauffeur, airport transfer, event transport, safari drives, and diplomatic protocol transport services in Botswana.",
    "provider": { "@type": "Organization", "name": "MobiRides" },
    "areaServed": { "@type": "Country", "name": "Botswana" },
    "url": "https://mobirides.com/vip"
  };

  return (
    <PageLayout
      title="VIP & Executive Transport Services | MobiRides"
      description="Premium chauffeur, airport transfers, event transport, safari drives, and diplomatic protocol services in Botswana. Trusted by ambassadors and global organisations."
      keywords="VIP transport Botswana, executive chauffeur, airport transfer Gaborone, event transport, safari drives, diplomatic transport"
      canonical={buildCanonicalUrl('/vip')}
      jsonLd={jsonLd}
    >
      {/* Hero Section */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${vipHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary-foreground">Premium Service</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Executive & VIP<br />Transport Services
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
              Trusted by ambassadors, global programme leaders, and Botswana's most discerning travellers. 
              Chauffeur-driven excellence for every occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-primary text-base" onClick={scrollToForm}>
                Request a Quote <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-base" asChild>
                <a href="tel:+26777123456">
                  <Phone className="w-4 h-4 mr-2" /> Call Us Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="bg-foreground text-background py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Trusted by</span>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              {['Austrian Embassy', 'Irish Embassy', 'Techstars Botswana', 'Leading Corporates'].map((org) => (
                <span key={org} className="text-sm md:text-base font-medium text-background/80">
                  {org}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Premium Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From airport arrivals to safari adventures — comprehensive VIP transport solutions tailored to your needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-5 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-6 leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{t.author}</p>
                    <p className="text-sm text-muted-foreground">{t.org}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose MobiRides VIP</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The gold standard in executive ground transport across Botswana.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop) => {
              const Icon = prop.icon;
              return (
                <div key={prop.title} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{prop.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{prop.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Premium Fleet</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meticulously maintained vehicles for every executive need.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fleet.map((vehicle) => (
              <Card key={vehicle.name} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-foreground mb-1">{vehicle.name}</h3>
                  <p className="text-sm text-muted-foreground">{vehicle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Request Form */}
      <section id="quote-form" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Request a Quote</h2>
              <p className="text-lg text-muted-foreground">
                Tell us about your transport needs and our VIP team will get back to you within 24 hours.
              </p>
            </div>
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        maxLength={100}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        maxLength={255}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+267 7X XXX XXX"
                        maxLength={20}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Service Type *</Label>
                      <Select value={formData.serviceType} onValueChange={(v) => setFormData({ ...formData, serviceType: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="airport-transfer">Airport Transfer</SelectItem>
                          <SelectItem value="executive-chauffeur">Executive Chauffeur</SelectItem>
                          <SelectItem value="vip-shuttle">VIP Shuttle Service</SelectItem>
                          <SelectItem value="events-conferences">Events & Conferences</SelectItem>
                          <SelectItem value="safari-tours">Safari & Tour Drives</SelectItem>
                          <SelectItem value="diplomatic">Diplomatic & Protocol</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Date Required</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        max="500"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        placeholder="e.g. 4"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Special Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="Tell us about your specific needs, itinerary, or any special requests..."
                      rows={4}
                      maxLength={1000}
                    />
                  </div>
                  <Button type="submit" className="btn-primary w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for the VIP Experience?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Contact our executive team today and let us elevate your ground transport in Botswana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={scrollToForm}>
              Get a Quote <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
              <a href="mailto:vip@mobirides.com">
                vip@mobirides.com
              </a>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default VIPServicesPage;
