import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageLayout, PageHero, CTASection, SectionWrapper } from '../components/layouts';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  Calculator,
  Phone,
  Mail,
  ArrowRight,
  Car,
  Calendar,
  MapPin
} from 'lucide-react';
import pricingData from '../data/pricing.json';

interface EarningsCalculation {
  dailyEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
  yearlyEarnings: number;
  totalCosts: number;
  netEarnings: number;
}

const HostPage: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<string>('economy');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [location, setLocation] = useState<string>('gaborone');

  const earningsCalculation = useMemo((): EarningsCalculation => {
    const baseRates = {
      economy: 450,
      luxury: 850,
      commercial: 650
    };

    const locationMultipliers = {
      gaborone: 1.0,
      francistown: 0.85,
      maun: 1.2,
      kasane: 1.15,
      palapye: 0.8
    };

    const baseRate = baseRates[vehicleType as keyof typeof baseRates] || baseRates.economy;
    const locationMultiplier = locationMultipliers[location as keyof typeof locationMultipliers] || 1.0;
    
    const dailyEarnings = baseRate * locationMultiplier;
    const weeklyEarnings = dailyEarnings * daysPerWeek;
    const monthlyEarnings = weeklyEarnings * 4.33;
    const yearlyEarnings = monthlyEarnings * 12;
    
    // Calculate costs (insurance, maintenance, fuel)
    const dailyCosts = dailyEarnings * 0.25; // 25% for costs
    const totalCosts = dailyCosts * daysPerWeek * 4.33;
    const netEarnings = monthlyEarnings - totalCosts;

    return {
      dailyEarnings,
      weeklyEarnings,
      monthlyEarnings,
      yearlyEarnings,
      totalCosts,
      netEarnings
    };
  }, [vehicleType, daysPerWeek, location]);

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: "Earn Extra Income",
      description: "Generate substantial monthly income from your vehicle when you're not using it.",
      highlight: "Up to P15,000/month"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Full Insurance Coverage",
      description: "Comprehensive insurance protection for your vehicle and peace of mind.",
      highlight: "100% Protected"
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: "Flexible Schedule",
      description: "Set your own availability and work around your personal schedule.",
      highlight: "Your Choice"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Vetted Renters",
      description: "All renters are verified with valid licenses and background checks.",
      highlight: "Safe & Secure"
    }
  ];

  const requirements = [
    "Valid Botswana driver's license (minimum 2 years)",
    "Vehicle registration and roadworthy certificate",
    "Comprehensive insurance policy",
    "Vehicle age: Maximum 10 years old",
    "Clean driving record",
    "Smartphone for app management"
  ];

  const process = [
    {
      step: 1,
      title: "Apply Online",
      description: "Complete our simple application form with your vehicle details."
    },
    {
      step: 2,
      title: "Vehicle Inspection",
      description: "We'll inspect your vehicle to ensure it meets our quality standards."
    },
    {
      step: 3,
      title: "Documentation",
      description: "Submit required documents and complete the verification process."
    },
    {
      step: 4,
      title: "Start Earning",
      description: "List your vehicle and start accepting bookings immediately."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Become a Host - Mobirides",
    "description": "Earn extra income by sharing your vehicle on Mobirides. Join our community of trusted hosts in Botswana.",
    "url": "https://mobirides.com/host",
    "mainEntity": {
      "@type": "Service",
      "name": "Vehicle Hosting Service",
      "provider": {
        "@type": "Organization",
        "name": "Mobirides"
      },
      "areaServed": "Botswana",
      "serviceType": "Peer-to-peer car sharing"
    }
  };

  return (
    <PageLayout
      title="Become a Host - Earn with Your Vehicle | Mobirides"
      description="Turn your vehicle into a source of income. Join Mobirides as a host and earn up to P15,000 per month sharing your car with verified renters in Botswana."
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <PageHero
        variant="default"
        title="Turn Your Car Into Cash"
        subtitle="Join thousands of car owners earning extra income by sharing their vehicles with trusted drivers in your community."
        ctaText="Start Hosting Today"
        ctaLink="https://app.mobirides.com"
        backgroundImage="/images/host-hero-bg.jpg"
      />

      {/* Earnings Calculator Section */}
      <SectionWrapper background="white" padding="large" id="calculator">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Calculate Your Potential Earnings
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how much you could earn by hosting your vehicle on our platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                Earnings Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="vehicle-type">Vehicle Type</Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy (Corolla, Vitz)</SelectItem>
                    <SelectItem value="luxury">Luxury (BMW, Mercedes)</SelectItem>
                    <SelectItem value="commercial">Commercial (Hilux, Ranger)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gaborone">Gaborone</SelectItem>
                    <SelectItem value="francistown">Francistown</SelectItem>
                    <SelectItem value="maun">Maun</SelectItem>
                    <SelectItem value="kasane">Kasane</SelectItem>
                    <SelectItem value="palapye">Palapye</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="days-per-week">Days Available Per Week</Label>
                <Select value={daysPerWeek.toString()} onValueChange={(value) => setDaysPerWeek(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7].map(day => (
                      <SelectItem key={day} value={day.toString()}>
                        {day} {day === 1 ? 'day' : 'days'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="hours-per-day">Hours Available Per Day</Label>
                <Select value={hoursPerDay.toString()} onValueChange={(value) => setHoursPerDay(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[4, 6, 8, 10, 12, 16, 24].map(hour => (
                      <SelectItem key={hour} value={hour.toString()}>
                        {hour} hours
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Earnings Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Your Potential Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-800">Daily Earnings</span>
                  <span className="text-2xl font-bold text-green-600">
                    P{earningsCalculation.dailyEarnings.toFixed(0)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-800">Weekly Earnings</span>
                  <span className="text-2xl font-bold text-blue-600">
                    P{earningsCalculation.weeklyEarnings.toFixed(0)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="font-medium text-purple-800">Monthly Earnings</span>
                  <span className="text-3xl font-bold text-purple-600">
                    P{earningsCalculation.monthlyEarnings.toFixed(0)}
                  </span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Estimated Costs</span>
                    <span className="text-sm text-red-600">
                      -P{earningsCalculation.totalCosts.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Net Monthly Income</span>
                    <span className="text-xl font-bold text-green-600">
                      P{earningsCalculation.netEarnings.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full" size="lg" asChild>
                  <a 
                    href="https://app.mobirides.com?redirect=add-car" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Start Hosting Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>

      {/* Benefits Section */}
      <SectionWrapper background="gray" padding="large">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Host with Mobirides?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our community of successful hosts and enjoy these exclusive benefits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{benefit.description}</p>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {benefit.highlight}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Requirements Section */}
      <SectionWrapper background="white" padding="medium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Host Requirements
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              To ensure the safety and quality of our platform, all hosts must meet these requirements:
            </p>
            
            <div className="space-y-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Getting started as a host is simple. Follow these four easy steps:
            </p>
            
            <div className="space-y-6">
              {process.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Success Stories Section */}
      <SectionWrapper background="gray" padding="medium">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Success Stories from Our Hosts
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from real hosts who are earning with Mobirides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Thabo Mogale",
              location: "Gaborone",
              vehicle: "Toyota Corolla 2019",
              earnings: "P8,500",
              quote: "Hosting with Mobirides has been fantastic. I earn enough to cover my car payments and more!",
              rating: 4.9
            },
            {
              name: "Keabetswe Setlhare",
              location: "Francistown",
              vehicle: "BMW 3 Series 2020",
              earnings: "P12,000",
              quote: "The extra income helps me save for my family's future. The platform is easy to use and renters are respectful.",
              rating: 5.0
            },
            {
              name: "Mpho Kgosana",
              location: "Maun",
              vehicle: "Toyota Hilux 2018",
              earnings: "P15,200",
              quote: "Perfect for the tourism season in Maun. My Hilux is always in demand for safari trips!",
              rating: 4.8
            }
          ].map((story, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < Math.floor(story.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">{story.rating}</span>
                </div>
                
                <blockquote className="text-gray-700 mb-4 italic">
                  "{story.quote}"
                </blockquote>
                
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{story.name}</div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {story.location}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <Car className="w-3 h-3" />
                    {story.vehicle}
                  </div>
                  <div className="text-lg font-bold text-green-600 mt-2">
                    {story.earnings}/month
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <CTASection
        title="Ready to Start Earning?"
        description="Join our community of successful hosts and turn your vehicle into a reliable source of income."
        actions={[
          {
            text: "Apply to Host",
            href: "https://app.mobirides.com?redirect=add-car",
            variant: "primary"
          },
          {
            text: "Call Us",
            href: "tel:+2671234567",
            variant: "secondary",
            icon: <Phone className="w-4 h-4" />
          }
        ]}
      />
    </PageLayout>
  );
};

export default HostPage;