import React, { useState } from 'react';
import { PageLayout } from '../components/layouts';
import { Shield, CheckCircle, AlertTriangle, Phone, FileText, MapPin, Car, CreditCard, Camera, Lock } from 'lucide-react';

interface ProtectionFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

interface SafetyProtocol {
  id: string;
  title: string;
  description: string;
  steps: string[];
  priority: 'high' | 'medium' | 'low';
}

interface SupportContact {
  type: string;
  title: string;
  description: string;
  contact: string;
  availability: string;
  icon: React.ReactNode;
}

interface DamageTier {
  name: string;
  price: string;
  coverage: string;
  features: string[];
  recommended?: boolean;
}

const HostProtectionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'features' | 'protocols' | 'support' | 'coverage'>('features');

  const protectionFeatures: ProtectionFeature[] = [
    {
      id: 'verification',
      title: 'Renter Verification',
      description: 'Comprehensive background checks and identity verification for all renters',
      icon: <CheckCircle className="w-6 h-6" />,
      benefits: [
        'Government ID + driver\'s license verification',
        'Driving record checks',
        'Credit check option',
        'Past rental history review'
      ]
    },
    {
      id: 'insurance',
      title: 'Vehicle Protection Insurance',
      description: 'Comprehensive insurance protection for your vehicle and income',
      icon: <Shield className="w-6 h-6" />,
      benefits: [
        'Vehicle damage coverage up to P1,000,000',
        'Theft protection',
        'Mechanical breakdown coverage',
        'Loss of income protection during repairs'
      ]
    },
    {
      id: 'monitoring',
      title: '24/7 Vehicle Monitoring',
      description: 'Advanced GPS tracking and monitoring during rental periods',
      icon: <MapPin className="w-6 h-6" />,
      benefits: [
        'GPS tracking during rental',
        'Geofence alerts if vehicle leaves approved area',
        'Mileage tracking',
        'Speed monitoring with owner alerts'
      ]
    },
    {
      id: 'support',
      title: 'Owner Support & Claims',
      description: 'Dedicated support for vehicle owners with comprehensive assistance',
      icon: <Phone className="w-6 h-6" />,
      benefits: [
        'Damage claims processing',
        'Renter dispute resolution',
        'Legal support for incidents',
        'Roadside assistance for renters'
      ]
    }
  ];

  const safetyProtocols: SafetyProtocol[] = [
    {
      id: 'pre-rental',
      title: 'Pre-Rental Checklist',
      description: 'Essential documentation before handing over your vehicle',
      priority: 'high',
      steps: [
        'Document vehicle condition with photos and video',
        'Verify fuel level and mileage',
        'Review rental agreement with renter',
        'Conduct vehicle walk-around inspection together',
        'Check for any existing damage or issues'
      ]
    },
    {
      id: 'during-rental',
      title: 'During Rental Period',
      description: 'Best practices while your vehicle is being rented',
      priority: 'high',
      steps: [
        'Monitor GPS and mileage limits',
        'Respond to renter questions promptly',
        'Check in at rental midpoint for longer bookings',
        'Be available for emergency support',
        'Report any suspicious activity immediately'
      ]
    },
    {
      id: 'post-rental',
      title: 'Post-Rental Procedures',
      description: 'Important steps after your vehicle is returned',
      priority: 'medium',
      steps: [
        'Inspect vehicle for damage within 24 hours',
        'Review fuel level and cleanliness',
        'Take post-rental photos with timestamps',
        'Rate the renter and provide feedback',
        'Report any issues or damages immediately',
        'File insurance claim if needed'
      ]
    }
  ];

  const supportContacts: SupportContact[] = [
    {
      type: 'emergency',
      title: 'Emergency Vehicle Recovery',
      description: 'For stolen vehicles or critical emergencies',
      contact: '999 (Police) + MobiRides Emergency',
      availability: '24/7',
      icon: <Phone className="w-5 h-5" />
    },
    {
      type: 'claims',
      title: 'Claims & Damage Support',
      description: 'Insurance claims and damage documentation assistance',
      contact: 'claims@mobirides.com',
      availability: 'Mon-Sun 8AM-8PM',
      icon: <Shield className="w-5 h-5" />
    },
    {
      type: 'owner-support',
      title: 'Owner Support & Disputes',
      description: 'Help with renter disputes, payments, and technical support',
      contact: 'hello@mobirides.com or +267 74300747',
      availability: 'Mon-Fri 8AM-6PM',
      icon: <FileText className="w-5 h-5" />
    }
  ];

  const damageTiers: DamageTier[] = [
    {
      name: 'Basic Coverage',
      price: 'Included',
      coverage: 'Up to P50,000',
      features: [
        'Collision damage coverage',
        'Third-party liability',
        'Basic theft protection',
        'Standard claims support'
      ]
    },
    {
      name: 'Enhanced Coverage',
      price: '+P200/day',
      coverage: 'Up to P250,000',
      features: [
        'All Basic features',
        'Mechanical breakdown coverage',
        'Enhanced theft protection',
        'Priority claims processing',
        'Rental income protection'
      ],
      recommended: true
    },
    {
      name: 'Premium Coverage',
      price: '+P400/day',
      coverage: 'Up to P1,000,000',
      features: [
        'All Enhanced features',
        'Comprehensive theft coverage',
        'Legal assistance included',
        'Extended rental income protection',
        'Dedicated claims manager',
        'Zero deductible option'
      ]
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Host Protection - Vehicle Insurance & Safety | MobiRides",
    "description": "Comprehensive protection for car owners: P1M insurance coverage, verified renters, 24/7 support, and theft protection. Rent your vehicle with confidence.",
    "url": "https://mobirides.com/host-protection",
    "mainEntity": {
      "@type": "Service",
      "name": "Host Protection Program",
      "provider": {
        "@type": "Organization",
        "name": "MobiRides"
      },
      "serviceType": "Peer-to-Peer Car Rental Protection",
      "areaServed": "Botswana"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageLayout
        title="Host Protection - Vehicle Insurance & Safety | MobiRides"
        description="Comprehensive protection for car owners: P1M insurance coverage, verified renters, 24/7 support, and theft protection. Rent your vehicle with confidence."
        keywords="car rental protection, vehicle insurance, host protection, peer-to-peer car sharing, rental damage coverage, Botswana car rental"
        canonical="https://www.mobirides.com/host/protection"
      >
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-600 p-4 rounded-full">
                  <Shield className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Protect Your Investment, Rent with Confidence
              </h1>
              <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto font-semibold">
                Comprehensive protection for car owners
              </p>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                MobiRides provides multiple layers of protection so you can share your vehicle and earn income with complete peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://app.mobirides.com" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  List Your Vehicle
                </a>
                <button 
                  onClick={() => setActiveTab('coverage')}
                  className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Learn About Insurance
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-4 overflow-x-auto" aria-label="Tabs">
              {[
                { id: 'features', label: 'Protection Features', icon: Shield },
                { id: 'coverage', label: 'Insurance Coverage', icon: CreditCard },
                { id: 'protocols', label: 'Safety Protocols', icon: CheckCircle },
                { id: 'support', label: 'Support & Contact', icon: Phone }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`py-4 px-3 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'features' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Comprehensive Protection Features
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We provide multiple layers of protection to ensure your vehicle's safety and your peace of mind while renting on MobiRides.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {protectionFeatures.map((feature) => (
                    <div key={feature.id} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-6">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-1" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Owner Best Practices */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mt-12">
                  <div className="flex items-center mb-6">
                    <Camera className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Owner Best Practices</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Always take pre/post-rental photos with timestamps',
                      'Use the in-app inspection checklist',
                      'Maintain comprehensive records of all rentals',
                      'Respond to renter messages within 2 hours',
                      'Report damages within 24 hours of return',
                      'Keep vehicle maintenance up to date'
                    ].map((practice, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-sm">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{practice}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'coverage' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Damage Protection Tiers
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Choose the level of coverage that's right for your vehicle. All tiers include comprehensive protection.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {damageTiers.map((tier) => (
                    <div 
                      key={tier.name} 
                      className={`rounded-xl p-8 border-2 ${
                        tier.recommended 
                          ? 'border-blue-600 shadow-xl relative' 
                          : 'border-gray-200 shadow-lg'
                      }`}
                    >
                      {tier.recommended && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                            Recommended
                          </span>
                        </div>
                      )}
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                        <div className="text-3xl font-bold text-blue-600 mb-2">{tier.price}</div>
                        <p className="text-gray-600 font-medium">{tier.coverage}</p>
                      </div>
                      <ul className="space-y-3">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* What's Covered vs Not Covered */}
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <div className="bg-green-50 rounded-xl p-8 border border-green-200">
                    <div className="flex items-center mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">What's Covered</h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'Collision damage',
                        'Theft and vandalism',
                        'Weather-related damage',
                        'Third-party liability',
                        'Rental income loss (Enhanced+)',
                        'Mechanical breakdown (Enhanced+)'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-xl p-8 border border-red-200">
                    <div className="flex items-center mb-6">
                      <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">Not Covered</h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'Normal wear and tear',
                        'Pre-existing damage',
                        'Interior stains (unless vandalism)',
                        'Missing personal items',
                        'Intentional damage by owner',
                        'Unauthorized modifications'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Renter Standards */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <Lock className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Renter Standards</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    All renters must meet these requirements before they can book your vehicle:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Age & Experience</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Minimum age: 23 years (21 for economy)</li>
                        <li>• At least 2 years driving experience</li>
                        <li>• Valid driver's license required</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Background Checks</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Clean driving record verification</li>
                        <li>• No major violations in past 3 years</li>
                        <li>• Government ID verification</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Security Deposit</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• 1 day rental deposit held</li>
                        <li>• Released after damage inspection</li>
                        <li>• No credit/debit card required</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Renter Rating</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Past rental history reviewed</li>
                        <li>• Owner ratings considered</li>
                        <li>• Low-rated renters may be restricted</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'protocols' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Safety Protocols & Guidelines
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Follow these essential safety protocols to ensure a secure and professional rental experience.
                  </p>
                </div>
                
                <div className="space-y-8">
                  {safetyProtocols.map((protocol, index) => (
                    <div key={protocol.id} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full mr-3">
                              Step {index + 1}
                            </span>
                            <h3 className="text-xl font-semibold text-gray-900">{protocol.title}</h3>
                          </div>
                          <p className="text-gray-600">{protocol.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ml-4 flex-shrink-0 ${
                          protocol.priority === 'high' ? 'bg-red-100 text-red-800' :
                          protocol.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {protocol.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {protocol.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-start">
                            <div className="bg-gray-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            </div>
                            <p className="text-gray-700">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Real-World Scenarios */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Common Scenarios & Solutions</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        scenario: 'Renter returns car with damage',
                        solution: 'Document with photos, contact MobiRides claims within 24 hours, file insurance claim'
                      },
                      {
                        scenario: 'Renter extends rental without permission',
                        solution: 'Contact renter immediately, notify MobiRides support, track vehicle GPS location'
                      },
                      {
                        scenario: 'Vehicle involved in accident',
                        solution: 'Ensure everyone is safe, call 999 if needed, document scene, contact MobiRides emergency'
                      },
                      {
                        scenario: 'Renter loses keys',
                        solution: 'Renter is responsible for replacement costs, provide spare if available, document incident'
                      },
                      {
                        scenario: 'Suspicious activity during rental',
                        solution: 'Monitor GPS, contact renter for clarification, report to MobiRides if concerns persist'
                      },
                      {
                        scenario: 'Renter no-show at return time',
                        solution: 'Attempt to contact renter, check GPS location, report to MobiRides after 2 hours'
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-white rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-start">
                          <AlertTriangle className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                          {item.scenario}
                        </h4>
                        <p className="text-gray-700 text-sm pl-7">{item.solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    24/7 Support & Emergency Contact
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Get immediate help when you need it most. Our dedicated support team is here to assist vehicle owners.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {supportContacts.map((contact) => (
                    <div key={contact.type} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 text-center hover:shadow-xl transition-shadow">
                      <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        {contact.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.title}</h3>
                      <p className="text-gray-600 mb-4">{contact.description}</p>
                      <div className="space-y-2">
                        <p className="font-semibold text-blue-600">{contact.contact}</p>
                        <p className="text-sm text-gray-500">{contact.availability}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Emergency Situations */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 border-2 border-red-200">
                  <div className="text-center">
                    <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Rental Emergency Situations</h3>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                      In case of emergency, follow these protocols based on the situation type:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
                      <div className="bg-white rounded-lg p-6">
                        <h4 className="font-bold text-red-600 mb-3">🚨 Stolen Vehicle</h4>
                        <ol className="space-y-2 text-gray-700 text-sm">
                          <li>1. Call 999 (Police) immediately</li>
                          <li>2. Contact MobiRides emergency line</li>
                          <li>3. Provide vehicle details and GPS data</li>
                          <li>4. File police report within 24 hours</li>
                        </ol>
                      </div>
                      
                      <div className="bg-white rounded-lg p-6">
                        <h4 className="font-bold text-orange-600 mb-3">🚗 Renter Accident</h4>
                        <ol className="space-y-2 text-gray-700 text-sm">
                          <li>1. Ensure everyone's safety first</li>
                          <li>2. Call 999 if injuries occur</li>
                          <li>3. Exchange insurance information</li>
                          <li>4. Contact MobiRides claims immediately</li>
                        </ol>
                      </div>
                      
                      <div className="bg-white rounded-lg p-6">
                        <h4 className="font-bold text-yellow-600 mb-3">⚠️ Unauthorized Use</h4>
                        <ol className="space-y-2 text-gray-700 text-sm">
                          <li>1. Check GPS location of vehicle</li>
                          <li>2. Attempt to contact renter</li>
                          <li>3. Report to MobiRides support</li>
                          <li>4. File police report if unresolved</li>
                        </ol>
                      </div>
                      
                      <div className="bg-white rounded-lg p-6">
                        <h4 className="font-bold text-blue-600 mb-3">❌ Renter No-Show</h4>
                        <ol className="space-y-2 text-gray-700 text-sm">
                          <li>1. Check GPS to locate vehicle</li>
                          <li>2. Contact renter via app/phone</li>
                          <li>3. Report to MobiRides after 2 hours</li>
                          <li>4. Consider remote vehicle lockout</li>
                        </ol>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a href="tel:999" className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                        Call 999 (Police Emergency)
                      </a>
                      <a href="tel:+26774300747" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Call MobiRides Emergency
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Car className="w-16 h-16 text-blue-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to List Your Vehicle with Full Protection?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of vehicle owners earning income with comprehensive insurance coverage and peace of mind on MobiRides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.mobirides.com" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                List Your Vehicle
              </a>
              <a href="/host" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                Learn About Hosting
              </a>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default HostProtectionPage;