import React, { useState } from 'react';
import { PageLayout } from '../components/layouts';
import { Shield, CheckCircle, AlertTriangle, Phone, FileText, Clock, Users, Star } from 'lucide-react';

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

const HostProtectionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'features' | 'protocols' | 'support'>('features');

  const protectionFeatures: ProtectionFeature[] = [
    {
      id: 'verification',
      title: 'Rider Verification',
      description: 'Comprehensive background checks and identity verification for all riders',
      icon: <CheckCircle className="w-6 h-6" />,
      benefits: [
        'Government ID verification',
        'Phone number confirmation',
        'Email verification',
        'Social media profile checks'
      ]
    },
    {
      id: 'insurance',
      title: 'Host Insurance Coverage',
      description: 'Comprehensive insurance protection for hosts and their vehicles',
      icon: <Shield className="w-6 h-6" />,
      benefits: [
        'Vehicle damage coverage up to $1M',
        'Liability protection',
        'Personal injury coverage',
        '24/7 claims support'
      ]
    },
    {
      id: 'monitoring',
      title: 'Real-time Monitoring',
      description: 'Advanced GPS tracking and trip monitoring for enhanced safety',
      icon: <AlertTriangle className="w-6 h-6" />,
      benefits: [
        'Live GPS tracking',
        'Route monitoring',
        'Speed alerts',
        'Emergency detection'
      ]
    },
    {
      id: 'support',
      title: '24/7 Host Support',
      description: 'Round-the-clock support for hosts with dedicated assistance',
      icon: <Phone className="w-6 h-6" />,
      benefits: [
        'Emergency hotline',
        'Technical support',
        'Dispute resolution',
        'Safety guidance'
      ]
    }
  ];

  const safetyProtocols: SafetyProtocol[] = [
    {
      id: 'pre-trip',
      title: 'Pre-Trip Safety Check',
      description: 'Essential safety checks before each ride',
      priority: 'high',
      steps: [
        'Verify rider identity through app',
        'Check vehicle condition and cleanliness',
        'Confirm pickup and destination locations',
        'Review rider ratings and feedback'
      ]
    },
    {
      id: 'during-trip',
      title: 'During Trip Protocols',
      description: 'Safety measures to follow during the ride',
      priority: 'high',
      steps: [
        'Follow GPS navigation route',
        'Maintain professional communication',
        'Report any suspicious behavior immediately',
        'Keep emergency contacts accessible'
      ]
    },
    {
      id: 'post-trip',
      title: 'Post-Trip Procedures',
      description: 'Important steps after completing a ride',
      priority: 'medium',
      steps: [
        'Rate and review the rider',
        'Report any incidents or damages',
        'Clean and inspect vehicle',
        'Update availability status'
      ]
    }
  ];

  const supportContacts: SupportContact[] = [
    {
      type: 'emergency',
      title: 'Emergency Support',
      description: 'Immediate assistance for urgent situations',
      contact: '1-800-MOBI-911',
      availability: '24/7',
      icon: <Phone className="w-5 h-5" />
    },
    {
      type: 'technical',
      title: 'Technical Support',
      description: 'Help with app issues and technical problems',
      contact: 'hello@mobirides.com',
      availability: 'Mon-Sun 6AM-10PM',
      icon: <FileText className="w-5 h-5" />
    },
    {
      type: 'claims',
      title: 'Insurance Claims',
      description: 'Assistance with insurance claims and coverage',
      contact: 'claims@mobirides.com',
      availability: 'Mon-Fri 8AM-6PM',
      icon: <Shield className="w-5 h-5" />
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Host Protection - MobiRides",
    "description": "Comprehensive protection and safety features for MobiRides hosts, including insurance coverage, safety protocols, and 24/7 support.",
    "url": "https://mobirides.com/host-protection",
    "mainEntity": {
      "@type": "Service",
      "name": "Host Protection Program",
      "provider": {
        "@type": "Organization",
        "name": "MobiRides"
      },
      "serviceType": "Rideshare Host Protection",
      "areaServed": "Worldwide"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageLayout
        title="Host Protection | MobiRides"
        description="Comprehensive protection and safety features for MobiRides hosts, including insurance coverage, safety protocols, and 24/7 support."
        keywords="host protection, rideshare safety, driver insurance, host support, vehicle protection"
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
                Host Protection
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Your safety and security are our top priorities. Discover comprehensive protection features designed specifically for MobiRides hosts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Become a Host
                </button>
                <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8" aria-label="Tabs">
              {[
                { id: 'features', label: 'Protection Features', icon: Shield },
                { id: 'protocols', label: 'Safety Protocols', icon: CheckCircle },
                { id: 'support', label: 'Support & Contact', icon: Phone }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as 'features' | 'protocols' | 'support')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
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
                    We provide multiple layers of protection to ensure your safety and peace of mind while hosting on MobiRides.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {protectionFeatures.map((feature) => (
                    <div key={feature.id} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-6">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
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
                    Follow these essential safety protocols to ensure a secure and professional hosting experience.
                  </p>
                </div>
                
                <div className="space-y-8">
                  {safetyProtocols.map((protocol, index) => (
                    <div key={protocol.id} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center mb-2">
                            <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full mr-3">
                              {index + 1}
                            </span>
                            <h3 className="text-xl font-semibold text-gray-900">{protocol.title}</h3>
                          </div>
                          <p className="text-gray-600">{protocol.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                            <div className="bg-gray-100 rounded-full p-1 mr-3 mt-1">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            </div>
                            <p className="text-gray-700">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
                    Get immediate help when you need it most. Our dedicated support team is here to assist you.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {supportContacts.map((contact) => (
                    <div key={contact.type} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 text-center">
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

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
                  <div className="text-center">
                    <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Emergency Situations</h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                      In case of emergency, immediately contact local authorities (911) first, then notify MobiRides support. Your safety is our top priority.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a href="tel:911" className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                        Call 911 (Emergency)
                      </a>
                      <a href="tel:1-800-MOBI-911" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
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
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Hosting Safely?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of protected hosts earning with confidence on MobiRides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Hosting Today
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                Download Host App
              </button>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default HostProtectionPage;