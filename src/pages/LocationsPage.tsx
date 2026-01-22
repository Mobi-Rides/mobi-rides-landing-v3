import React, { useState } from 'react';
import { PageLayout } from '../components/layouts';
import { buildCanonicalUrl } from '@/config/site';
import { MapPin, Clock, Users, Star, Calendar, TrendingUp, CheckCircle, AlertCircle, Navigation, Plane, Building, Heart } from 'lucide-react';
import locationsData from '../data/locations.json';

interface City {
  id: string;
  name: string;
  region: string;
  population: number;
  status: string;
  launchDate?: string;
  expectedLaunch?: string;
  coverage: number;
  targetCoverage?: number;
  averageWaitTime?: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  serviceAreas?: string[];
  landmarks?: string[];
  stats?: {
    totalRides: number;
    availableVehicles: number;
    customerSatisfaction: number;
  };
  estimatedVehicles?: number;
  keyFeatures?: string[];
}

const LocationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'upcoming' | 'zones' | 'expansion'>('current');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'planned': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'planned': return AlertCircle;
      default: return Clock;
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "MobiRides Locations",
    "description": "Ride-sharing service locations across Botswana",
    "provider": {
      "@type": "Organization",
      "name": "MobiRides"
    },
    "areaServed": locationsData.currentCities.map(city => ({
      "@type": "City",
      "name": city.name,
      "addressRegion": city.region,
      "addressCountry": "Botswana"
    })),
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -22.3285,
        "longitude": 24.6849
      },
      "geoRadius": "500000"
    }
  };

  return (
    <PageLayout
      title="Service Locations - MobiRides"
      description="Discover MobiRides service areas across Botswana. Find coverage in Gaborone, Francistown, Maun, and upcoming cities."
      keywords="MobiRides locations, Botswana cities, service areas, Gaborone, Francistown, Maun, ride sharing coverage"
      canonical={buildCanonicalUrl('/locations')}
      jsonLd={jsonLd}
    >
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Serving <span className="text-green-600">Botswana</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connecting communities across Botswana with reliable, safe, and affordable ride-sharing services.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-green-600">{locationsData.currentCities.length}</div>
                <div className="text-sm text-gray-600">Active Cities</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{locationsData.coverage.populationCovered}</div>
                <div className="text-sm text-gray-600">People Served</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-purple-600">{locationsData.coverage.totalVehicles}</div>
                <div className="text-sm text-gray-600">Available Vehicles</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-orange-600">{locationsData.coverage.averageCoverage}</div>
                <div className="text-sm text-gray-600">Avg Coverage</div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="max-w-6xl mx-auto px-4 mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: 'current', label: 'Current Cities', icon: CheckCircle },
              { id: 'upcoming', label: 'Upcoming Cities', icon: Calendar },
              { id: 'zones', label: 'Service Zones', icon: Navigation },
              { id: 'expansion', label: 'Expansion Plan', icon: TrendingUp }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as 'current' | 'upcoming' | 'zones' | 'expansion')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Current Cities */}
        {activeTab === 'current' && (
          <section className="max-w-6xl mx-auto px-4 mb-16">
            <div className="grid lg:grid-cols-3 gap-8">
              {locationsData.currentCities.map((city: City) => {
                const StatusIcon = getStatusIcon(city.status);
                return (
                  <div
                    key={city.id}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedCity(selectedCity === city.id ? null : city.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{city.name}</h3>
                          <p className="text-gray-600">{city.region}</p>
                        </div>
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(city.status)}`}>
                          <StatusIcon className="w-4 h-4" />
                          {city.status}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{city.coverage}%</div>
                          <div className="text-sm text-gray-600">Coverage</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{city.averageWaitTime}min</div>
                          <div className="text-sm text-gray-600">Avg Wait</div>
                        </div>
                      </div>
                      
                      {city.stats && (
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900">{city.stats.totalRides.toLocaleString()}</div>
                            <div className="text-xs text-gray-600">Total Rides</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900">{city.stats.availableVehicles}</div>
                            <div className="text-xs text-gray-600">Vehicles</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-lg font-semibold text-gray-900">{city.stats.customerSatisfaction}</span>
                            </div>
                            <div className="text-xs text-gray-600">Rating</div>
                          </div>
                        </div>
                      )}
                      
                      <div className="text-sm text-gray-500 mb-4">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Population: {city.population.toLocaleString()}
                      </div>
                      
                      {selectedCity === city.id && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          {city.serviceAreas && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Service Areas</h4>
                              <div className="flex flex-wrap gap-1">
                                {city.serviceAreas.slice(0, 8).map((area, index) => (
                                  <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                    {area}
                                  </span>
                                ))}
                                {city.serviceAreas.length > 8 && (
                                  <span className="text-xs text-gray-500">+{city.serviceAreas.length - 8} more</span>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {city.landmarks && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Key Landmarks</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {city.landmarks.slice(0, 5).map((landmark, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <MapPin className="w-3 h-3 text-gray-400" />
                                    {landmark}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Upcoming Cities */}
        {activeTab === 'upcoming' && (
          <section className="max-w-6xl mx-auto px-4 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're expanding to bring MobiRides to more communities across Botswana.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {locationsData.upcomingCities.map((city: any, index: number) => {
                const StatusIcon = getStatusIcon(city.status);
                return (
                  <div key={city.id} className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{city.name}</h3>
                        <p className="text-gray-600">{city.region}</p>
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(city.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                        Planned
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{city.targetCoverage}%</div>
                        <div className="text-sm text-gray-600">Target Coverage</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{city.estimatedVehicles}</div>
                        <div className="text-sm text-gray-600">Est. Vehicles</div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Calendar className="w-4 h-4" />
                        Expected Launch: {new Date(city.expectedLaunch!).toLocaleDateString('en-GB', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        Population: {city.population.toLocaleString()}
                      </div>
                    </div>
                    
                    {city.keyFeatures && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {city.keyFeatures.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Service Zones */}
        {activeTab === 'zones' && (
          <section className="max-w-6xl mx-auto px-4 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Zones</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Different service levels tailored to various areas and needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(locationsData.serviceZones).map(([key, zone]) => {
                const getZoneIcon = (zoneKey: string) => {
                  switch (zoneKey) {
                    case 'urban': return Building;
                    case 'suburban': return Users;
                    case 'airport': return Plane;
                    case 'tourism': return Heart;
                    default: return MapPin;
                  }
                };
                
                const ZoneIcon = getZoneIcon(key);
                
                return (
                  <div key={key} className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <ZoneIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{zone.name}</h3>
                        <p className="text-gray-600">{zone.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Coverage Hours</div>
                        <div className="font-semibold text-gray-900">{zone.coverage}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Wait Time</div>
                        <div className="font-semibold text-gray-900">{zone.averageWaitTime}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                      <ul className="space-y-2">
                        {zone.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Expansion Plan */}
        {activeTab === 'expansion' && (
          <section className="max-w-6xl mx-auto px-4 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Expansion Roadmap</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our strategic plan to connect all of Botswana with reliable transportation.
              </p>
            </div>
            
            <div className="space-y-8">
              {Object.entries(locationsData.expansionPlan).map(([phase, plan], index) => (
                <div key={phase} className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 capitalize">{phase.replace('phase', 'Phase ')}</h3>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {plan.timeline}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-6">{plan.focus}</p>
                      
                      <div className="grid md:grid-cols-4 gap-6 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{plan.cities.length}</div>
                          <div className="text-sm text-gray-600">New Cities</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{plan.investment}</div>
                          <div className="text-sm text-gray-600">Investment</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{plan.expectedVehicles}</div>
                          <div className="text-sm text-gray-600">New Vehicles</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{plan.timeline}</div>
                          <div className="text-sm text-gray-600">Timeline</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Target Cities</h4>
                        <div className="flex flex-wrap gap-2">
                          {plan.cities.map((city, cityIndex) => (
                            <span key={cityIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                              {city}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Special Services */}
        <section className="max-w-6xl mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored transportation solutions for specific needs and occasions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locationsData.specialServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <div className="text-xs text-gray-500 mb-3">
                  Available in: {service.availableIn.join(', ')}
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Partnerships */}
        <section className="max-w-6xl mx-auto px-4 mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Working together to provide seamless transportation experiences.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {locationsData.partnerships.map((partner, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{partner.name}</h3>
                      <div className="text-sm text-blue-600 mb-2">{partner.type}</div>
                      <p className="text-sm text-gray-600">{partner.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default LocationsPage;