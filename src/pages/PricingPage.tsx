import React, { useState, useEffect, useCallback } from 'react';
import { PageLayout } from '../components/layouts';
import { Calculator, MapPin, Clock, Users, Star, Check, Info } from 'lucide-react';
import pricingData from '../data/pricing.json';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerKm: number;
  pricePerMinute: number;
  features: string[];
  popular: boolean;
  color: string;
}

interface CalculatorState {
  distance: string;
  duration: string;
  selectedTier: string;
  isPeakHour: boolean;
  hasDiscount: string;
}

const PricingPage: React.FC = () => {
  const [calculator, setCalculator] = useState<CalculatorState>({
    distance: '',
    duration: '',
    selectedTier: 'comfort',
    isPeakHour: false,
    hasDiscount: 'none'
  });

  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'tiers' | 'calculator' | 'additional'>('tiers');

  const calculatePrice = useCallback(() => {
    const tier = pricingData.pricingTiers.find(t => t.id === calculator.selectedTier);
    if (!tier || !calculator.distance || !calculator.duration) return 0;

    const distance = parseFloat(calculator.distance);
    const duration = parseFloat(calculator.duration);
    
    let basePrice = tier.basePrice + (tier.pricePerKm * distance) + (tier.pricePerMinute * duration);
    
    // Apply peak hour multiplier
    if (calculator.isPeakHour) {
      basePrice *= pricingData.peakHours.multiplier;
    }
    
    // Apply discount
    if (calculator.hasDiscount !== 'none') {
      const discount = pricingData.discounts.find(d => d.name.toLowerCase().includes(calculator.hasDiscount));
      if (discount) {
        basePrice *= (1 - discount.percentage / 100);
      }
    }
    
    // Apply tax
    basePrice *= (1 + pricingData.taxRate);
    
    // Ensure minimum fare
    return Math.max(basePrice, pricingData.minimumFare);
  }, [calculator]);

  useEffect(() => {
    setEstimatedPrice(calculatePrice());
  }, [calculator, calculatePrice]);

  const handleCalculatorChange = (field: keyof CalculatorState, value: string | boolean) => {
    setCalculator(prev => ({ ...prev, [field]: value }));
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "MobiRides Pricing",
    "description": "Transparent pricing for ride-sharing services in Botswana",
    "provider": {
      "@type": "Organization",
      "name": "MobiRides"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Botswana"
    },
    "offers": pricingData.pricingTiers.map(tier => ({
      "@type": "Offer",
      "name": tier.name,
      "description": tier.description,
      "price": tier.basePrice,
      "priceCurrency": pricingData.currency
    }))
  };

  return (
    <PageLayout
      title="Pricing - MobiRides"
      description="Transparent and affordable pricing for ride-sharing in Botswana. Calculate your fare and choose the perfect ride tier for your needs."
      keywords="pricing, fare calculator, ride cost, Botswana transport, MobiRides rates"
      jsonLd={jsonLd}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transparent <span className="text-blue-600">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              No hidden fees, no surprises. Choose the ride tier that fits your needs and budget in Botswana.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Calculator className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">Fare Calculator</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium">Multiple Discounts</span>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="max-w-6xl mx-auto px-4 mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: 'tiers', label: 'Pricing Tiers', icon: Users },
              { id: 'calculator', label: 'Fare Calculator', icon: Calculator },
              { id: 'additional', label: 'Additional Services', icon: Info }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as 'tiers' | 'calculator' | 'additional')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Pricing Tiers */}
        {activeTab === 'tiers' && (
          <section className="max-w-6xl mx-auto px-4 mb-16">
            <div className="grid md:grid-cols-3 gap-8">
              {pricingData.pricingTiers.map((tier: PricingTier) => (
                <div
                  key={tier.id}
                  className={`relative bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 ${
                    tier.popular ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <p className="text-gray-600 mb-4">{tier.description}</p>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {pricingData.currencySymbol}{tier.basePrice}
                      <span className="text-lg font-normal text-gray-500"> base</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      + {pricingData.currencySymbol}{tier.pricePerKm}/km + {pricingData.currencySymbol}{tier.pricePerMinute}/min
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    tier.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    Choose {tier.name}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Fare Calculator */}
        {activeTab === 'calculator' && (
          <section className="max-w-4xl mx-auto px-4 mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Fare Calculator</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distance (km)
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={calculator.distance}
                        onChange={(e) => handleCalculatorChange('distance', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter distance"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (minutes)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={calculator.duration}
                        onChange={(e) => handleCalculatorChange('duration', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter duration"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ride Tier
                    </label>
                    <select
                      value={calculator.selectedTier}
                      onChange={(e) => handleCalculatorChange('selectedTier', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {pricingData.pricingTiers.map((tier: PricingTier) => (
                        <option key={tier.id} value={tier.id}>{tier.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={calculator.isPeakHour}
                        onChange={(e) => handleCalculatorChange('isPeakHour', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Peak hours (+50%)</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount
                    </label>
                    <select
                      value={calculator.hasDiscount}
                      onChange={(e) => handleCalculatorChange('hasDiscount', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="none">No discount</option>
                      {pricingData.discounts.map((discount, index) => (
                        <option key={index} value={discount.name.toLowerCase()}>
                          {discount.name} (-{discount.percentage}%)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Estimated Fare</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    {pricingData.currencySymbol}{estimatedPrice.toFixed(2)}
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Base fare:</span>
                      <span>{pricingData.currencySymbol}{pricingData.pricingTiers.find(t => t.id === calculator.selectedTier)?.basePrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax ({(pricingData.taxRate * 100).toFixed(0)}%):</span>
                      <span>Included</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minimum fare:</span>
                      <span>{pricingData.currencySymbol}{pricingData.minimumFare}</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Book This Ride
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Additional Services */}
        {activeTab === 'additional' && (
          <section className="max-w-4xl mx-auto px-4 mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Additional Services</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {pricingData.additionalServices.map((service, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                      <span className="text-xl font-bold text-blue-600">
                        {pricingData.currencySymbol}{service.price}
                        {service.unit && <span className="text-sm font-normal"> {service.unit}</span>}
                      </span>
                    </div>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Available Discounts</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {pricingData.discounts.map((discount, index) => (
                    <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="text-center mb-3">
                        <div className="text-2xl font-bold text-green-600">{discount.percentage}% OFF</div>
                        <h4 className="text-lg font-semibold text-gray-900">{discount.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{discount.description}</p>
                      <p className="text-xs text-gray-500">{discount.conditions}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Peak Hours Info */}
        <section className="max-w-4xl mx-auto px-4 mb-16">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Peak Hours Information</h2>
            <p className="text-center text-gray-600 mb-6">
              During peak hours, fares are increased by {((pricingData.peakHours.multiplier - 1) * 100).toFixed(0)}% to ensure driver availability.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Morning Rush</h3>
                <p className="text-sm text-gray-600">7:00 AM - 9:00 AM</p>
                <p className="text-xs text-gray-500">Monday - Friday</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Evening Rush</h3>
                <p className="text-sm text-gray-600">5:00 PM - 7:00 PM</p>
                <p className="text-xs text-gray-500">Monday - Friday</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Weekend Nights</h3>
                <p className="text-sm text-gray-600">8:00 PM - 2:00 AM</p>
                <p className="text-xs text-gray-500">Friday - Saturday</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default PricingPage;