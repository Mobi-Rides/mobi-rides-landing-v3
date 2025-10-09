import React, { useState } from 'react';
import { PageLayout } from '../components/layouts';
import { Shield, FileText, Phone, CheckCircle, AlertTriangle, Users, Car, Clock, Download, ExternalLink } from 'lucide-react';

interface CoverageItem {
  type: string;
  coverage: string;
  limit: string;
  deductible?: string;
  description: string;
}

interface InsurancePolicy {
  id: string;
  name: string;
  description: string;
  coverageItems: CoverageItem[];
  premium: string;
  popular?: boolean;
}

interface ClaimStep {
  step: number;
  title: string;
  description: string;
  timeframe: string;
}

const InsurancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'coverage' | 'claims' | 'policies'>('coverage');
  const [selectedPolicy, setSelectedPolicy] = useState<string>('comprehensive');

  const insurancePolicies: InsurancePolicy[] = [
    {
      id: 'basic',
      name: 'Basic Coverage',
      description: 'Essential protection for everyday rides',
      premium: '+P150/day',
      coverageItems: [
        {
          type: 'Third Party Liability',
          coverage: 'Bodily injury and property damage to others',
          limit: 'P 500,000',
          description: 'Covers damages to other people and their property'
        },
        {
          type: 'Personal Accident',
          coverage: 'Medical expenses for driver and passengers',
          limit: 'P 50,000',
          description: 'Emergency medical treatment and hospitalization'
        }
      ]
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Coverage',
      description: 'Complete protection for hosts and riders',
      premium: '+P350/day',
      popular: true,
      coverageItems: [
        {
          type: 'Third Party Liability',
          coverage: 'Bodily injury and property damage to others',
          limit: 'P 1,000,000',
          description: 'Enhanced coverage for third-party claims'
        },
        {
          type: 'Vehicle Damage',
          coverage: 'Collision and comprehensive damage',
          limit: 'P 800,000',
          deductible: 'P 5,000',
          description: 'Covers repair or replacement of your vehicle'
        },
        {
          type: 'Personal Accident',
          coverage: 'Medical expenses and disability benefits',
          limit: 'P 100,000',
          description: 'Comprehensive medical coverage for all occupants'
        },
        {
          type: 'Theft Protection',
          coverage: 'Vehicle theft and hijacking',
          limit: 'P 800,000',
          description: 'Full replacement value for stolen vehicles'
        }
      ]
    },
    {
      id: 'premium',
      name: 'Premium Coverage',
      description: 'Maximum protection with additional benefits',
      premium: '+P550/day',
      coverageItems: [
        {
          type: 'Third Party Liability',
          coverage: 'Bodily injury and property damage to others',
          limit: 'P 2,000,000',
          description: 'Maximum liability protection available'
        },
        {
          type: 'Vehicle Damage',
          coverage: 'Collision, comprehensive, and wear coverage',
          limit: 'P 1,200,000',
          deductible: 'P 2,500',
          description: 'Includes wear and tear coverage'
        },
        {
          type: 'Personal Accident',
          coverage: 'Medical, disability, and life insurance',
          limit: 'P 200,000',
          description: 'Includes life insurance benefits'
        },
        {
          type: 'Business Interruption',
          coverage: 'Lost income during vehicle repairs',
          limit: 'P 50,000',
          description: 'Compensation for lost earnings'
        },
        {
          type: 'Legal Protection',
          coverage: 'Legal fees and court costs',
          limit: 'P 100,000',
          description: 'Full legal support and representation'
        }
      ]
    }
  ];

  const claimsProcess: ClaimStep[] = [
    {
      step: 1,
      title: 'Report the Incident',
      description: 'Contact our 24/7 claims hotline immediately after any incident. Provide your policy number and incident details.',
      timeframe: 'Within 24 hours'
    },
    {
      step: 2,
      title: 'Document Everything',
      description: 'Take photos of the scene, vehicles, and any injuries. Collect contact information from all parties involved.',
      timeframe: 'At the scene'
    },
    {
      step: 3,
      title: 'File Police Report',
      description: 'Report the incident to local police if required. Obtain a police report number for your records.',
      timeframe: 'Within 24 hours'
    },
    {
      step: 4,
      title: 'Claims Assessment',
      description: 'Our claims adjuster will inspect the damage and review all documentation to determine coverage.',
      timeframe: '2-5 business days'
    },
    {
      step: 5,
      title: 'Repair Authorization',
      description: 'Once approved, we\'ll authorize repairs at our network of approved service centers.',
      timeframe: '1-2 business days'
    },
    {
      step: 6,
      title: 'Settlement',
      description: 'Receive your settlement payment or have repairs completed at no cost to you.',
      timeframe: '5-10 business days'
    }
  ];

  const emergencyContacts = [
    {
      title: '24/7 Claims Hotline',
      number: '+267 74300747',
      description: 'Report accidents and incidents'
    },
    {
      title: 'Emergency Roadside',
      number: '+267 74300748',
      description: 'Towing and roadside assistance'
    },
    {
      title: 'Medical Emergency',
      number: '997',
      description: 'Botswana emergency services'
    }
  ];

  const documents = [
    {
      title: 'Insurance Policy Terms',
      description: 'Complete policy terms and conditions',
      fileSize: '2.3 MB',
      type: 'PDF'
    },
    {
      title: 'Claims Form',
      description: 'Downloadable claims submission form',
      fileSize: '156 KB',
      type: 'PDF'
    },
    {
      title: 'Coverage Summary',
      description: 'Quick reference coverage guide',
      fileSize: '890 KB',
      type: 'PDF'
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "MobiRides Insurance",
    "description": "Comprehensive insurance coverage for ride-sharing in Botswana",
    "areaServed": {
      "@type": "Country",
      "name": "Botswana"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+267-123-4567",
      "contactType": "Claims Support",
      "availableLanguage": ["English", "Setswana"]
    }
  };

  return (
    <PageLayout
      title="Insurance Coverage - MobiRides"
      description="Comprehensive insurance coverage for hosts and riders in Botswana. Learn about our policies, claims process, and get the protection you need."
      keywords="insurance, coverage, claims, vehicle protection, Botswana, MobiRides"
      jsonLd={jsonLd}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 p-4 rounded-full">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Complete <span className="text-blue-600">Insurance</span> Protection
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Drive with confidence knowing you're fully protected. Our comprehensive insurance covers hosts, riders, and vehicles across Botswana.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">24/7 Claims Support</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Car className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">Vehicle Protection</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Users className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium">Personal Coverage</span>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="max-w-6xl mx-auto px-4 mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: 'coverage', label: 'Coverage Options', icon: Shield },
              { id: 'claims', label: 'Claims Process', icon: FileText },
              { id: 'policies', label: 'Policy Documents', icon: Download }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as 'coverage' | 'claims' | 'policies')}
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

        {/* Coverage Options */}
        {activeTab === 'coverage' && (
          <section className="max-w-6xl mx-auto px-4 mb-16">
            <div className="grid md:grid-cols-3 gap-8">
              {insurancePolicies.map((policy) => (
                <div
                  key={policy.id}
                  className={`relative bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 ${
                    policy.popular ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                  }`}
                >
                  {policy.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{policy.name}</h3>
                    <p className="text-gray-600 mb-4">{policy.description}</p>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {policy.premium}
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {policy.coverageItems.map((item, index) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-1">{item.type}</h4>
                        <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600 font-medium">Up to {item.limit}</span>
                          {item.deductible && (
                            <span className="text-gray-500">Deductible: {item.deductible}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    policy.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    Select {policy.name}
                  </button>
                </div>
              ))}
            </div>

            {/* Emergency Contacts */}
            <div className="mt-16 bg-red-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency Contacts</h2>
                <p className="text-gray-600">Keep these numbers handy for immediate assistance</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 text-center">
                    <Phone className="w-8 h-8 text-red-600 mx-auto mb-3" />
                    <h3 className="font-bold text-gray-900 mb-2">{contact.title}</h3>
                    <p className="text-2xl font-bold text-red-600 mb-2">{contact.number}</p>
                    <p className="text-sm text-gray-600">{contact.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Claims Process */}
        {activeTab === 'claims' && (
          <section className="max-w-4xl mx-auto px-4 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Claims Process</h2>
              <p className="text-xl text-gray-600">Follow these steps to file and track your insurance claim</p>
            </div>
            
            <div className="space-y-8">
              {claimsProcess.map((step, index) => (
                <div key={step.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <Clock className="w-4 h-4" />
                        {step.timeframe}
                      </div>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help with Your Claim?</h3>
              <p className="text-gray-600 mb-6">Our claims specialists are available 24/7 to assist you</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Start New Claim
                </button>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-blue-600">
                  Track Existing Claim
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Policy Documents */}
        {activeTab === 'policies' && (
          <section className="max-w-4xl mx-auto px-4 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Policy Documents</h2>
              <p className="text-xl text-gray-600">Download important insurance documents and forms</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {documents.map((doc, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <FileText className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">{doc.title}</h3>
                      <p className="text-gray-600 mb-3">{doc.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{doc.type} • {doc.fileSize}</span>
                        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Additional Resources</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Online Services</h4>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                        <ExternalLink className="w-4 h-4" />
                        Policy Management Portal
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                        <ExternalLink className="w-4 h-4" />
                        Claims Status Tracker
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                        <ExternalLink className="w-4 h-4" />
                        Premium Calculator
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Support</h4>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                        <ExternalLink className="w-4 h-4" />
                        Frequently Asked Questions
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                        <ExternalLink className="w-4 h-4" />
                        Contact Insurance Team
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                        <ExternalLink className="w-4 h-4" />
                        Schedule Consultation
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
};

export default InsurancePage;