import React, { useState } from 'react';
import { PageLayout } from '../components/layouts';
import { buildCanonicalUrl } from '@/config/site';
import { Shield, FileText, Phone, CheckCircle, AlertTriangle, Users, Car, Clock, Download, ExternalLink, Wrench } from 'lucide-react';
import TermsPopup from '../components/TermsPopup';

interface DamageProtectionTier {
  id: string;
  name: string;
  description: string;
  fee: string;
  coverageCap: string;
  excess: string;
  targetSegment: string;
  popular?: boolean;
}

interface ClaimStep {
  step: number;
  title: string;
  description: string;
  timeframe: string;
}

const DamageProtectionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'coverage' | 'claims' | 'documents'>('coverage');

  const protectionTiers: DamageProtectionTier[] = [
    {
      id: 'no-coverage',
      name: 'No Coverage',
      description: 'Renter bears full liability for any damage. Suited to budget-conscious renters who accept the risk.',
      fee: 'P0 / day',
      coverageCap: 'None',
      excess: '100% renter liability',
      targetSegment: 'Budget / risk-tolerant renters',
    },
    {
      id: 'basic',
      name: 'Basic',
      description: 'Essential protection for short city rentals, capped at P8,000.',
      fee: 'P80 / day',
      coverageCap: 'P8,000',
      excess: '20% of approved claim',
      targetSegment: 'Short-term city rentals',
    },
    {
      id: 'standard',
      name: 'Standard',
      description: 'Recommended for multi-day and intercity trips, capped at P20,000.',
      fee: 'P150 / day',
      coverageCap: 'P20,000',
      excess: '15% of approved claim',
      targetSegment: 'Multi-day / intercity trips',
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Maximum protection for high-value vehicles and long-term rentals, capped at P50,000.',
      fee: 'P250 / day',
      coverageCap: 'P50,000',
      excess: '10% of approved claim',
      targetSegment: 'High-value vehicles / long-term',
    },
  ];

  const claimsProcess: ClaimStep[] = [
    {
      step: 1,
      title: 'Report the Incident',
      description: 'Submit your incident report via the MobiRides platform within 24 hours. Include your booking reference, a description of the incident, and all relevant details.',
      timeframe: 'Within 24 hours of incident'
    },
    {
      step: 2,
      title: 'MobiRides Initial Triage',
      description: 'The MobiRides claims team reviews your submission, performs initial triage, and confirms receipt. You will be notified of the outcome or any further requirements.',
      timeframe: 'Within 48 hours of submission'
    },
    {
      step: 3,
      title: 'Evidence Collection',
      description: 'If additional documentation is required, MobiRides will request it. Provide clear, timestamped photos of all damage from multiple angles and any police report numbers.',
      timeframe: 'Within 48 hours of submission'
    },
    {
      step: 4,
      title: 'Renter Information Response',
      description: 'Respond to any requests for additional information or documentation from MobiRides. Failure to respond within the deadline may result in the claim being rejected.',
      timeframe: 'Within 7 days of request'
    },
    {
      step: 5,
      title: 'Pay-U Claim Adjudication',
      description: 'Pay-U assesses and adjudicates the claim once all evidence is received. Claims of P500 or less with sufficient photographic evidence are auto-approved without manual review.',
      timeframe: 'Within 5 business days'
    },
    {
      step: 6,
      title: 'Payout & Excess Settlement',
      description: 'Pay-U processes the approved payout within 24 hours. A fixed P150 admin fee is deducted from every payout. MobiRides collects your excess portion (per your tier) within 7 days of approval.',
      timeframe: 'Within 24 hours of approval'
    }
  ];

  const coverageInclusions = [
    'Accidental collision damage',
    'Single-vehicle incidents',
    'Weather damage (hail, flooding, storm)',
    'Vandalism and malicious damage',
    'Attempted theft damage',
  ];

  const coverageExclusions = [
    'Intentional or reckless damage',
    'Driving under the influence of alcohol or drugs',
    'Unlicensed or unauthorized drivers',
    'Off-road use (unless vehicle is rated for off-road)',
    'Mechanical wear and tear',
    'Pre-existing damage (documented at handover)',
    'Damage during illegal activities',
    'Consequential losses (loss of income, travel delays)',
    '3rd Party liability',
  ];

  const emergencyContacts = [
    {
      title: '24/7 Claims Hotline',
      number: '+267 74300747',
      description: 'Report accidents and damage incidents'
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
      title: 'Damage Waiver Terms',
      description: 'Complete damage liability waiver terms and conditions',
      fileSize: '2.3 MB',
      type: 'Markdown',
      action: 'popup'
    },
    {
      title: 'Damage Claim Form',
      description: 'Downloadable damage claim submission form',
      fileSize: '156 KB',
      type: 'PDF',
      action: 'download'
    },
    {
      title: 'Protection Summary',
      description: 'Quick reference protection coverage guide',
      fileSize: '890 KB',
      type: 'PDF',
      action: 'download'
    }
  ];

  const termsMarkdownPath = '/damage-protection/terms-and-conditions-user.md';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "MobiRides Damage Protection",
    "description": "Comprehensive damage liability waiver and protection for car rentals in Botswana, powered by Pay-U cloud-based repair services",
    "provider": {
      "@type": "Organization",
      "name": "MobiRides"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Botswana"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+267-74300747",
      "contactType": "Claims Support",
      "availableLanguage": ["English", "Setswana"]
    }
  };

  return (
    <PageLayout
      title="Damage Protection - MobiRides"
      description="Comprehensive damage liability waiver for hosts and renters in Botswana. Learn about our protection tiers, claims process, and Pay-U repair services."
      keywords="damage protection, damage liability waiver, vehicle protection, claims, Botswana, MobiRides, Pay-U"
      canonical={buildCanonicalUrl('/damage-protection')}
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
              Complete <span className="text-blue-600">Damage Protection</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Rent with confidence knowing you're fully protected. Our comprehensive damage liability waiver covers hosts, renters, and vehicles across Botswana—powered by Pay-U cloud-based repair services.
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
                <Wrench className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">Pay-U Repair Network</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Users className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium">Personal Coverage</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <TermsPopup
                markdownPath={termsMarkdownPath}
                title="Damage Protection Terms (User Summary)"
                triggerLabel="View Terms & Conditions"
                triggerClassName="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              />
              <button
                type="button"
                onClick={() => setActiveTab('documents')}
                className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-white px-6 py-3 font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-50"
              >
                Browse Documents
              </button>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="max-w-6xl mx-auto px-4 mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: 'coverage', label: 'Protection Tiers', icon: Shield },
              { id: 'claims', label: 'Claims Process', icon: FileText },
              { id: 'documents', label: 'Documents', icon: Download }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as 'coverage' | 'claims' | 'documents')}
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

        {/* Protection Tiers */}
        {activeTab === 'coverage' && (
          <section className="max-w-6xl mx-auto px-4 mb-16">
            {/* Pay-U Partnership Banner */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-12 text-white text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Wrench className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Powered by Pay-U</h3>
              </div>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                All damage claims are handled through Pay-U's cloud-based repair network, ensuring fast, transparent, and quality repairs across Botswana.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {protectionTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 ${
                    tier.popular ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                  } ${tier.id === 'no-coverage' ? 'opacity-80' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{tier.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{tier.description}</p>
                    <div className={`text-3xl font-bold mb-1 ${tier.id === 'no-coverage' ? 'text-gray-400' : 'text-blue-600'}`}>
                      {tier.fee}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Coverage cap</span>
                      <span className={`font-semibold ${tier.id === 'no-coverage' ? 'text-red-500' : 'text-gray-900'}`}>{tier.coverageCap}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Your excess</span>
                      <span className="font-semibold text-gray-900">{tier.excess}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Best for</span>
                      <span className="font-semibold text-gray-900 text-right max-w-[55%]">{tier.targetSegment}</span>
                    </div>
                  </div>

                  {tier.id !== 'no-coverage' && (
                    <p className="text-xs text-gray-400 text-center mb-4">Includes all 5 standard coverage types. P150 admin fee deducted from payouts.</p>
                  )}

                  <button className={`w-full py-2.5 px-4 rounded-lg font-semibold transition-all text-sm ${
                    tier.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : tier.id === 'no-coverage'
                      ? 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    Select {tier.name}
                  </button>
                </div>
              ))}
            </div>

            {/* Coverage Inclusions & Exclusions */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> All Paid Tiers Include
                </h3>
                <ul className="space-y-2">
                  {coverageInclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-green-700 text-sm">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> All Tiers Exclude
                </h3>
                <ul className="space-y-2">
                  {coverageExclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-red-700 text-sm">
                      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
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
              <p className="text-xl text-gray-600">Follow these steps to file and track your damage claim</p>
            </div>
            
            <div className="space-y-8">
              {claimsProcess.map((step) => (
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

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              {/* Auto-Approval */}
              <div className="bg-green-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" /> Auto-Approval
                </h3>
                <p className="text-green-700 mb-4">Claims at or below <strong>P500</strong> with sufficient photographic evidence are automatically approved — no manual adjudication required.</p>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <Clock className="w-4 h-4" />
                  <span>Payout within 24 hours of auto-approval</span>
                </div>
              </div>

              {/* Admin Fee */}
              <div className="bg-amber-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-amber-800 mb-3">Admin Fee</h3>
                <p className="text-amber-700 mb-4">A fixed <strong>P150 admin fee</strong> is deducted from every approved claim payout, regardless of tier or claim amount.</p>
                <h4 className="font-semibold text-amber-800 mb-2 text-sm">Excess calculation examples:</h4>
                <div className="space-y-1 text-sm text-amber-700">
                  <div className="flex justify-between"><span>Basic — P5,000 claim (20%)</span><span>Renter pays P1,000 · Pay-U pays P3,850</span></div>
                  <div className="flex justify-between"><span>Standard — P10,000 claim (15%)</span><span>Renter pays P1,500 · Pay-U pays P8,350</span></div>
                  <div className="flex justify-between"><span>Premium — P30,000 claim (10%)</span><span>Renter pays P3,000 · Pay-U pays P26,850</span></div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-2xl p-8 text-center">
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

        {/* Documents */}
        {activeTab === 'documents' && (
          <section className="max-w-4xl mx-auto px-4 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Protection Documents</h2>
              <p className="text-xl text-gray-600">Download important damage waiver documents and forms</p>
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
                        {doc.action === 'popup' ? (
                          <TermsPopup
                            markdownPath={termsMarkdownPath}
                            title="Damage Protection Terms (User Summary)"
                            triggerLabel="Open User Terms"
                            triggerClassName="inline-flex items-center gap-2 rounded-md bg-blue-50 px-4 py-2 font-medium text-blue-700 transition-colors hover:bg-blue-100"
                          />
                        ) : (
                          <button type="button" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        )}
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
                        Protection Management Portal
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
                        Protection Fee Calculator
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
                        Contact Protection Team
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

export default DamageProtectionPage;
