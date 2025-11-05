import React, { useState } from 'react';
import { PageLayout } from '../components/layouts';
import { 
  Phone, MessageCircle, Mail, Smartphone, AlertTriangle, Upload, CreditCard,
  Settings, Play, DollarSign, Shield, Car, User, Users, Calendar, BookOpen,
  Award, Heart, Wrench, Zap, Star, TrendingUp, Map, Clock, CheckCircle,
  ArrowRight, ExternalLink, Search, Filter, ChevronRight, HelpCircle
} from 'lucide-react';
import hostSupportData from '../data/hostSupport.json';

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  color: string;
  action: string;
}

interface SupportChannel {
  name: string;
  description: string;
  icon: string;
  contact: string;
  hours: string;
  responseTime: string;
  languages: string[];
  color: string;
}

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  articleCount: number;
  topics: string[];
}

interface CommunityResource {
  title: string;
  description: string;
  icon: string;
  members: string;
  activity: string;
  cities: string[];
}

interface EmergencyFeature {
  title: string;
  description: string;
  icon: string;
  responseTime: string;
}

interface TrainingResource {
  title: string;
  description: string;
  type: string;
  duration: string;
  icon: string;
  completion: string;
}

const HostSupportPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('getting-started');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChannel, setSelectedChannel] = useState<string>('phone');

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      Phone, MessageCircle, Mail, Smartphone, AlertTriangle, Upload, CreditCard,
      Settings, Play, DollarSign, Shield, Car, User, Users, Calendar, BookOpen,
      Award, Heart, Wrench, Zap, Star, TrendingUp, Map, Clock, CheckCircle
    };
    return icons[iconName] || HelpCircle;
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; border: string; hover: string } } = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', hover: 'hover:bg-blue-200' },
      green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', hover: 'hover:bg-green-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', hover: 'hover:bg-purple-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200', hover: 'hover:bg-orange-200' },
      red: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', hover: 'hover:bg-red-200' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', hover: 'hover:bg-yellow-200' }
    };
    return colors[color] || colors.blue;
  };

  const getButtonColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      green: 'bg-green-600 hover:bg-green-700',
      purple: 'bg-purple-600 hover:bg-purple-700',
      orange: 'bg-orange-600 hover:bg-orange-700',
      red: 'bg-red-600 hover:bg-red-700',
      yellow: 'bg-yellow-600 hover:bg-yellow-700'
    };
    return colors[color] || colors.blue;
  };

  const selectedCategoryData = hostSupportData.helpCategories.categories.find(
    (category: HelpCategory) => category.id === activeCategory
  ) || hostSupportData.helpCategories.categories[0];

  const selectedChannelData = hostSupportData.supportChannels.channels.find(
    (channel: SupportChannel) => channel.name.toLowerCase().includes(selectedChannel)
  ) || hostSupportData.supportChannels.channels[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Host Support Center - MobiRides",
    "description": hostSupportData.hero.description,
    "provider": {
      "@type": "Organization",
      "name": "MobiRides",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BW"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": hostSupportData.emergencySupport.hotline,
        "contactType": "customer service",
        "availableLanguage": ["English", "Setswana"]
      }
    }
  };

  return (
    <PageLayout
      title="Host Support Center - MobiRides | 24/7 Driver Support Botswana"
      description="Get comprehensive support as a MobiRides host in Botswana. 24/7 emergency assistance, training resources, community support, and help center."
      keywords="MobiRides support, driver help Botswana, rideshare support, host assistance, emergency support, driver training"
      canonical="https://www.mobirides.com/host/support"
      jsonLd={jsonLd}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
          <div className="absolute inset-0">
            <img 
              src={hostSupportData.hero.backgroundImage}
              alt="MobiRides Host Support"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {hostSupportData.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-white mb-6 opacity-90">
              {hostSupportData.hero.subtitle}
            </p>
            <p className="text-lg text-white mb-8 opacity-80 max-w-3xl mx-auto">
              {hostSupportData.hero.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                {hostSupportData.hero.ctaText}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">
                Emergency: {hostSupportData.emergencySupport.hotline}
              </button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">{hostSupportData.stats.responseTime}</div>
                <div className="text-sm text-white opacity-90">Avg Response</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">{hostSupportData.stats.satisfactionRate}</div>
                <div className="text-sm text-white opacity-90">Satisfaction</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">{hostSupportData.stats.supportTickets}</div>
                <div className="text-sm text-white opacity-90">Ticket Resolution</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">{hostSupportData.stats.activeHosts}</div>
                <div className="text-sm text-white opacity-90">Active Hosts</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {hostSupportData.quickActions.title}
            </h2>
            <p className="text-xl text-gray-600">
              {hostSupportData.quickActions.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hostSupportData.quickActions.actions.map((action: QuickAction, index) => {
              const IconComponent = getIcon(action.icon);
              const colorClasses = getColorClasses(action.color);
              const buttonColorClasses = getButtonColorClasses(action.color);
              
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group">
                  <div className={`w-16 h-16 ${colorClasses.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-8 h-8 ${colorClasses.text}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600 mb-4">{action.description}</p>
                  
                  <button className={`w-full ${buttonColorClasses} text-white py-3 rounded-lg font-medium transition-colors`}>
                    Get Started
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Support Channels */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {hostSupportData.supportChannels.title}
            </h2>
            <p className="text-xl text-gray-600">
              {hostSupportData.supportChannels.subtitle}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Channel Selection */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {hostSupportData.supportChannels.channels.map((channel: SupportChannel, index) => {
                  const IconComponent = getIcon(channel.icon);
                  const isSelected = channel.name.toLowerCase().includes(selectedChannel);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedChannel(channel.name.toLowerCase().split(' ')[0])}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white hover:bg-gray-50 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-6 h-6" />
                        <div>
                          <h3 className="font-semibold">{channel.name}</h3>
                          <p className={`text-sm ${
                            isSelected ? 'text-blue-100' : 'text-gray-600'
                          }`}>
                            {channel.responseTime} response
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Selected Channel Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${getColorClasses(selectedChannelData.color).bg}`}>
                    {React.createElement(getIcon(selectedChannelData.icon), {
                      className: `w-8 h-8 ${getColorClasses(selectedChannelData.color).text}`
                    })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedChannelData.name}</h3>
                    <p className="text-gray-600">{selectedChannelData.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                    <p className="text-lg font-semibold text-blue-600 mb-1">{selectedChannelData.contact}</p>
                    <p className="text-sm text-gray-600">{selectedChannelData.hours}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Response Time</h4>
                    <p className="text-lg font-semibold text-green-600 mb-1">{selectedChannelData.responseTime}</p>
                    <div className="flex gap-2">
                      {selectedChannelData.languages.map((lang, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button className={`${getButtonColorClasses(selectedChannelData.color)} text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2`}>
                  Contact Now
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {hostSupportData.helpCategories.title}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {hostSupportData.helpCategories.subtitle}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Category Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {hostSupportData.helpCategories.categories.map((category: HelpCategory) => {
              const IconComponent = getIcon(category.icon);
              const colorClasses = getColorClasses(category.color);
              const isActive = category.id === activeCategory;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`text-left p-6 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white hover:bg-gray-50 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    isActive ? 'bg-white/20' : colorClasses.bg
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      isActive ? 'text-white' : colorClasses.text
                    }`} />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">{category.title}</h3>
                  <p className={`text-sm mb-3 ${
                    isActive ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {category.description}
                  </p>
                  
                  <div className={`text-xs font-medium ${
                    isActive ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {category.articleCount} articles
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Active Category Topics */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{selectedCategoryData.title} Topics</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {selectedCategoryData.topics.map((topic, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{topic}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Support */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="bg-red-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <AlertTriangle className="w-16 h-16 text-red-200 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {hostSupportData.emergencySupport.title}
              </h2>
              <p className="text-xl mb-4 opacity-90">
                {hostSupportData.emergencySupport.subtitle}
              </p>
              <p className="text-lg opacity-80 max-w-3xl mx-auto mb-6">
                {hostSupportData.emergencySupport.description}
              </p>
              
              <div className="bg-white/20 rounded-lg p-4 inline-block">
                <div className="text-3xl font-bold">{hostSupportData.emergencySupport.hotline}</div>
                <div className="text-sm opacity-90">24/7 Emergency Hotline</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hostSupportData.emergencySupport.features.map((feature: EmergencyFeature, index) => {
                const IconComponent = getIcon(feature.icon);
                
                return (
                  <div key={index} className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <IconComponent className="w-8 h-8 text-red-200 mb-3" />
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm opacity-90 mb-2">{feature.description}</p>
                    <div className="text-xs font-medium text-red-200">
                      Response: {feature.responseTime}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Community Resources */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {hostSupportData.communityResources.title}
            </h2>
            <p className="text-xl text-gray-600">
              {hostSupportData.communityResources.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {hostSupportData.communityResources.resources.map((resource: CommunityResource, index) => {
              const IconComponent = getIcon(resource.icon);
              
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                      <p className="text-gray-600 mb-4">{resource.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Members</div>
                          <div className="font-semibold text-gray-900">{resource.members}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Activity</div>
                          <div className="font-semibold text-gray-900">{resource.activity}</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-2">Available in:</div>
                        <div className="flex flex-wrap gap-2">
                          {resource.cities.map((city, cityIndex) => (
                            <span key={cityIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {city}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Join Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Training Resources */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {hostSupportData.trainingResources.title}
            </h2>
            <p className="text-xl text-gray-600">
              {hostSupportData.trainingResources.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {hostSupportData.trainingResources.resources.map((resource: TrainingResource, index) => {
              const IconComponent = getIcon(resource.icon);
              
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-purple-600" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                      <p className="text-gray-600 mb-4">{resource.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Type</div>
                          <div className="font-semibold text-gray-900">{resource.type}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Duration</div>
                          <div className="font-semibold text-gray-900">{resource.duration}</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">Completion Rate</div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: resource.completion }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{resource.completion}</div>
                      </div>
                      
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                        Start Training
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {hostSupportData.cta.title}
            </h2>
            <p className="text-xl mb-6 opacity-90">
              {hostSupportData.cta.subtitle}
            </p>
            <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
              {hostSupportData.cta.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                {hostSupportData.cta.primaryButton}
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">
                {hostSupportData.cta.secondaryButton}
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {hostSupportData.cta.features.map((feature, index) => (
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

export default HostSupportPage;