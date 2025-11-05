import React, { useState } from 'react';
import { PageLayout } from '../components/layouts';
import { 
  User, Car, FileText, CheckCircle, Clock, MapPin, Phone, Upload,
  Shield, Calendar, CreditCard, Smartphone, MessageCircle, Wind,
  Sparkles, Camera, Award, DollarSign, ChevronRight, ArrowRight,
  AlertCircle, HelpCircle, FileCheck
} from 'lucide-react';
import hostRequirementsData from '../data/hostRequirements.json';

interface Requirement {
  requirement: string;
  description: string;
  icon: string;
  mandatory: boolean;
}

interface RequirementCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  items: Requirement[];
}

interface ApplicationStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  duration: string;
  color: string;
}

interface InspectionLocation {
  city: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  services: string[];
}

interface VehicleCategory {
  category: string;
  description: string;
  models: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

const HostRequirementsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('driver');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('Gaborone');

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      User, Car, FileText, CheckCircle, Clock, MapPin, Phone, Upload,
      Shield, Calendar, CreditCard, Smartphone, MessageCircle, Wind,
      Sparkles, Camera, Award, DollarSign, FileCheck
    };
    return icons[iconName] || CheckCircle;
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
      green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
      red: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' }
    };
    return colors[color] || colors.blue;
  };

  const getStepColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      purple: 'bg-purple-600',
      orange: 'bg-orange-600',
      red: 'bg-red-600',
      yellow: 'bg-yellow-600'
    };
    return colors[color] || colors.blue;
  };

  const selectedLocationData = hostRequirementsData.inspectionLocations.locations.find(
    (location: InspectionLocation) => location.city === selectedLocation
  ) || hostRequirementsData.inspectionLocations.locations[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Host Requirements - MobiRides",
    "description": hostRequirementsData.hero.description,
    "provider": {
      "@type": "Organization",
      "name": "MobiRides",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BW"
      }
    },
    "applicationProcess": {
      "@type": "HowTo",
      "name": "How to become a MobiRides host",
      "step": hostRequirementsData.applicationProcess.steps.map((step: ApplicationStep) => ({
        "@type": "HowToStep",
        "name": step.title,
        "text": step.description
      }))
    }
  };

  return (
    <PageLayout
      title="Host Requirements - Drive with MobiRides | Botswana"
      description="Learn about MobiRides host requirements in Botswana. Age, license, vehicle, and background check requirements to start earning as a rideshare driver."
      canonical="https://www.mobirides.com/host/requirements"
      jsonLd={jsonLd}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-green-600/90"></div>
          <div className="absolute inset-0">
            <img 
              src={hostRequirementsData.hero.backgroundImage}
              alt="MobiRides Host Requirements"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {hostRequirementsData.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-white mb-6 opacity-90">
              {hostRequirementsData.hero.subtitle}
            </p>
            <p className="text-lg text-white mb-8 opacity-80 max-w-3xl mx-auto">
              {hostRequirementsData.hero.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                {hostRequirementsData.hero.ctaText}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">
                View Inspection Centers
              </button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">{hostRequirementsData.stats.approvalRate}</div>
                <div className="text-sm text-white opacity-90">Approval Rate</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">{hostRequirementsData.stats.averageApprovalTime}</div>
                <div className="text-sm text-white opacity-90">Avg Approval</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">{hostRequirementsData.stats.inspectionCenters}</div>
                <div className="text-sm text-white opacity-90">Inspection Centers</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">{hostRequirementsData.stats.supportedVehicles}</div>
                <div className="text-sm text-white opacity-90">Supported Models</div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {hostRequirementsData.requirements.title}
            </h2>
            <p className="text-xl text-gray-600">
              {hostRequirementsData.requirements.subtitle}
            </p>
          </div>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {hostRequirementsData.requirements.categories.map((category: RequirementCategory) => {
              const IconComponent = getIcon(category.icon);
              const colorClasses = getColorClasses(category.color);
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeCategory === category.id
                      ? `${colorClasses.bg} ${colorClasses.text} ${colorClasses.border} border-2 shadow-lg`
                      : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {category.title}
                </button>
              );
            })}
          </div>
          
          {/* Active Category Requirements */}
          {hostRequirementsData.requirements.categories.map((category: RequirementCategory) => {
            if (category.id !== activeCategory) return null;
            
            return (
              <div key={category.id} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  {category.items.map((item: Requirement, index) => {
                    const IconComponent = getIcon(item.icon);
                    
                    return (
                      <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                        <div className={`p-2 rounded-lg ${
                          item.mandatory ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          <IconComponent className={`w-5 h-5 ${
                            item.mandatory ? 'text-red-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{item.requirement}</h3>
                            {item.mandatory && (
                              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        {/* Application Process */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {hostRequirementsData.applicationProcess.title}
            </h2>
            <p className="text-xl text-gray-600">
              {hostRequirementsData.applicationProcess.subtitle}
            </p>
          </div>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-1 bg-gray-200 hidden lg:block"></div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hostRequirementsData.applicationProcess.steps.map((step: ApplicationStep, index) => {
                const IconComponent = getIcon(step.icon);
                const stepColorClass = getStepColorClasses(step.color);
                
                return (
                  <div key={step.step} className="relative">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className={`w-16 h-16 ${stepColorClass} rounded-full flex items-center justify-center mx-auto mb-4 relative z-10`}>
                        <IconComponent className="w-8 h-8 text-white" />
                        <div className="absolute -top-2 -right-2 bg-white text-gray-900 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 border-gray-200">
                          {step.step}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{step.title}</h3>
                      <p className="text-gray-600 mb-4 text-center">{step.description}</p>
                      
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{step.duration}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Inspection Locations */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {hostRequirementsData.inspectionLocations.title}
            </h2>
            <p className="text-xl text-gray-600">
              {hostRequirementsData.inspectionLocations.subtitle}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Location Selection */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {hostRequirementsData.inspectionLocations.locations.map((location: InspectionLocation) => (
                  <button
                    key={location.city}
                    onClick={() => setSelectedLocation(location.city)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      selectedLocation === location.city
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white hover:bg-gray-50 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{location.city}</h3>
                        <p className={`text-sm ${
                          selectedLocation === location.city ? 'text-blue-100' : 'text-gray-600'
                        }`}>
                          {location.name}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Selected Location Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{selectedLocationData.name}</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Address</h4>
                        <p className="text-gray-600">{selectedLocationData.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Phone</h4>
                        <p className="text-gray-600">{selectedLocationData.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Hours</h4>
                        <p className="text-gray-600">{selectedLocationData.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Available Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLocationData.services.map((service, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Schedule Inspection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Vehicles */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {hostRequirementsData.supportedVehicles.title}
            </h2>
            <p className="text-xl text-gray-600">
              {hostRequirementsData.supportedVehicles.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {hostRequirementsData.supportedVehicles.categories.map((category: VehicleCategory, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.category}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                
                <ul className="space-y-2">
                  {category.models.map((model, modelIndex) => (
                    <li key={modelIndex} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {model}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="bg-blue-50 rounded-lg p-6 inline-block">
              <AlertCircle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-blue-800 font-medium">Don't see your vehicle model?</p>
              <p className="text-blue-700 text-sm mt-1">Contact our support team to check if your vehicle qualifies</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {hostRequirementsData.faqs.title}
            </h2>
          </div>
          
          <div className="space-y-4">
            {hostRequirementsData.faqs.questions.map((faq: FAQ, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <HelpCircle className={`w-5 h-5 text-gray-500 transition-transform ${
                    expandedFAQ === index ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {expandedFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {hostRequirementsData.cta.title}
            </h2>
            <p className="text-xl mb-6 opacity-90">
              {hostRequirementsData.cta.subtitle}
            </p>
            <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
              {hostRequirementsData.cta.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                {hostRequirementsData.cta.primaryButton}
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">
                {hostRequirementsData.cta.secondaryButton}
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {hostRequirementsData.cta.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 justify-center">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default HostRequirementsPage;