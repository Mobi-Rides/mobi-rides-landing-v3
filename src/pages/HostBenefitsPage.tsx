import React, { useState } from 'react';
import { PageLayout } from '../components/layouts';
import { buildCanonicalUrl } from '@/config/site';
import {
  Clock, CreditCard, Shield, TrendingUp, Users, Car, Star, Target, 
  Moon, Calendar, FileText, Smartphone, CheckCircle, ArrowRight,
  Sun, ChevronRight, Play, Award, DollarSign, MapPin
} from 'lucide-react';
import hostBenefitsData from '../data/hostBenefits.json';

interface EarningTimeframe {
  period: string;
  amount: string;
  description: string;
  icon: string;
}

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

interface SuccessStory {
  id: string;
  name: string;
  location: string;
  image: string;
  duration: string;
  monthlyEarnings: string;
  rating: number;
  totalTrips: number;
  quote: string;
  highlights: string[];
}

interface IncentiveProgram {
  name: string;
  description: string;
  amount: string;
  icon: string;
  color: string;
}

const HostBenefitsPage: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<string>(hostBenefitsData.successStories[0].id);
  const [activeTab, setActiveTab] = useState<string>('earnings');

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      Clock, CreditCard, Shield, TrendingUp, Users, Car, Star, Target,
      Moon, Calendar, FileText, Smartphone, Sun, Award, DollarSign
    };
    return icons[iconName] || Clock;
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      red: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[color] || colors.blue;
  };

  const selectedStoryData = hostBenefitsData.successStories.find(
    (story: SuccessStory) => story.id === selectedStory
  ) || hostBenefitsData.successStories[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Host Benefits - MobiRides",
    "description": hostBenefitsData.hero.description,
    "provider": {
      "@type": "Organization",
      "name": "MobiRides",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BW"
      }
    },
    "offers": {
      "@type": "Offer",
      "description": "Earn money as a ride-sharing host",
      "priceRange": `${hostBenefitsData.earningPotential.currency} ${hostBenefitsData.earningPotential.timeframes[3].amount} per month`
    }
  };

  return (
    <PageLayout
      title="Host Benefits - Earn More with MobiRides | Botswana"
      description="Join thousands of MobiRides hosts in Botswana. Earn BWP 10,000-18,000 monthly with flexible schedules, instant payments, and comprehensive support."
      canonical={buildCanonicalUrl('/host-benefits')}
      jsonLd={jsonLd}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-green-600/90"></div>
          <div className="absolute inset-0">
            <img 
              src={hostBenefitsData.hero.backgroundImage}
              alt="MobiRides Host"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  {hostBenefitsData.hero.title}
                </h1>
                <p className="text-xl md:text-2xl mb-6 opacity-90">
                  {hostBenefitsData.hero.subtitle}
                </p>
                <p className="text-lg mb-8 opacity-80 max-w-lg">
                  {hostBenefitsData.hero.description}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                    {hostBenefitsData.hero.ctaText}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Watch Success Stories
                  </button>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold">{hostBenefitsData.stats.totalHosts}</div>
                    <div className="text-sm opacity-90">Active Hosts</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold">{hostBenefitsData.stats.averageRating}</div>
                    <div className="text-sm opacity-90">Average Rating</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold">{hostBenefitsData.stats.monthlyEarnings}</div>
                    <div className="text-sm opacity-90">Avg Monthly</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold">{hostBenefitsData.stats.satisfactionRate}</div>
                    <div className="text-sm opacity-90">Satisfaction</div>
                  </div>
                </div>
              </div>
              
              <div className="lg:block hidden">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Quick Requirements Check</h3>
                  <div className="space-y-4">
                    {hostBenefitsData.requirements.items.map((req, index) => {
                      const IconComponent = getIcon(req.icon);
                      return (
                        <div key={index} className="flex items-center gap-4 text-white">
                          <div className="bg-white/20 p-2 rounded-lg">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium">{req.requirement}</div>
                            <div className="text-sm opacity-80">{req.description}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-2">
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { id: 'earnings', label: 'Earning Potential', icon: TrendingUp },
                { id: 'benefits', label: 'Host Benefits', icon: Star },
                { id: 'stories', label: 'Success Stories', icon: Users },
                { id: 'incentives', label: 'Bonuses & Rewards', icon: Award }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Earning Potential Tab */}
        {activeTab === 'earnings' && (
          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {hostBenefitsData.earningPotential.title}
              </h2>
              <p className="text-xl text-gray-600">
                {hostBenefitsData.earningPotential.subtitle}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {hostBenefitsData.earningPotential.timeframes.map((timeframe: EarningTimeframe, index) => {
                const IconComponent = getIcon(timeframe.icon);
                return (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{timeframe.period}</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {hostBenefitsData.earningPotential.currency} {timeframe.amount}
                    </div>
                    <p className="text-gray-600 text-sm">{timeframe.description}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Factors That Boost Your Earnings</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {hostBenefitsData.earningPotential.factors.map((factor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Benefits Tab */}
        {activeTab === 'benefits' && (
          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Hosts Love MobiRides</h2>
              <p className="text-xl text-gray-600">Comprehensive benefits designed for your success</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hostBenefitsData.benefits.map((benefit: Benefit) => {
                const IconComponent = getIcon(benefit.icon);
                return (
                  <div key={benefit.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 mb-6">{benefit.description}</p>
                    <ul className="space-y-2">
                      {benefit.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            
            {/* Comparison Section */}
            <div className="mt-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {hostBenefitsData.comparison.title}
                </h3>
                <p className="text-xl text-gray-600">
                  {hostBenefitsData.comparison.subtitle}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-8 text-white">
                  <h4 className="text-2xl font-bold mb-6">{hostBenefitsData.comparison.mobirides.title}</h4>
                  <ul className="space-y-3">
                    {hostBenefitsData.comparison.mobirides.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <h4 className="text-2xl font-bold mb-6 text-gray-900">{hostBenefitsData.comparison.traditional.title}</h4>
                  <ul className="space-y-3">
                    {hostBenefitsData.comparison.traditional.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-600">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Success Stories Tab */}
        {activeTab === 'stories' && (
          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Real Stories, Real Success</h2>
              <p className="text-xl text-gray-600">Meet some of our top-performing hosts across Botswana</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Story Selection */}
              <div className="lg:col-span-1">
                <div className="space-y-4">
                  {hostBenefitsData.successStories.map((story: SuccessStory) => (
                    <button
                      key={story.id}
                      onClick={() => setSelectedStory(story.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedStory === story.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white hover:bg-gray-50 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={story.image}
                          alt={story.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{story.name}</h3>
                          <div className="flex items-center gap-2 text-sm opacity-80">
                            <MapPin className="w-4 h-4" />
                            {story.location}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Selected Story Details */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start gap-6 mb-6">
                    <img
                      src={selectedStoryData.image}
                      alt={selectedStoryData.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedStoryData.name}</h3>
                      <div className="flex items-center gap-4 text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {selectedStoryData.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedStoryData.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {selectedStoryData.rating}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 rounded-lg p-3 text-center">
                          <div className="text-xl font-bold text-blue-600">{selectedStoryData.monthlyEarnings}</div>
                          <div className="text-sm text-gray-600">Monthly Earnings</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                          <div className="text-xl font-bold text-green-600">{selectedStoryData.totalTrips.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Total Trips</div>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-3 text-center">
                          <div className="text-xl font-bold text-yellow-600">{selectedStoryData.rating}</div>
                          <div className="text-sm text-gray-600">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <blockquote className="text-lg text-gray-700 italic mb-6 border-l-4 border-blue-600 pl-4">
                    "{selectedStoryData.quote}"
                  </blockquote>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {selectedStoryData.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Incentives Tab */}
        {activeTab === 'incentives' && (
          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {hostBenefitsData.incentives.title}
              </h2>
              <p className="text-xl text-gray-600">
                {hostBenefitsData.incentives.subtitle}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostBenefitsData.incentives.programs.map((program: IncentiveProgram, index) => {
                const IconComponent = getIcon(program.icon);
                const colorClasses = getColorClasses(program.color);
                
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${colorClasses}`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h3>
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    <div className={`inline-block px-4 py-2 rounded-lg font-bold text-lg ${colorClasses}`}>
                      {program.amount}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {hostBenefitsData.cta.title}
            </h2>
            <p className="text-xl mb-6 opacity-90">
              {hostBenefitsData.cta.subtitle}
            </p>
            <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
              {hostBenefitsData.cta.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                {hostBenefitsData.cta.primaryButton}
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">
                {hostBenefitsData.cta.secondaryButton}
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {hostBenefitsData.cta.features.map((feature, index) => (
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

export default HostBenefitsPage;