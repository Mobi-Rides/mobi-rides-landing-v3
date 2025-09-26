import React, { useState } from 'react';
import { PageLayout } from '../components/layouts';
import { MapPin, Clock, Star, Users, Camera, Navigation, Bookmark, Search, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface TravelDestination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  duration: string;
  category: 'city' | 'nature' | 'culture' | 'adventure';
  highlights: string[];
  bestTime: string;
}

interface TravelTip {
  id: string;
  title: string;
  category: 'safety' | 'budget' | 'culture' | 'transport';
  content: string;
  author: string;
  readTime: string;
  helpful: number;
}

interface LocalGuide {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  rating: number;
  reviews: number;
  languages: string[];
  avatar: string;
  description: string;
}

const TravelGuidesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'destinations' | 'tips' | 'guides' | 'resources'>('destinations');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const travelDestinations: TravelDestination[] = [
    {
      id: '1',
      name: 'Cape Town',
      country: 'South Africa',
      description: 'Discover the Mother City\'s stunning landscapes, from Table Mountain to pristine beaches, rich history, and vibrant culture.',
      image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=450&fit=crop&crop=entropy',
      rating: 4.8,
      duration: '5-7 days',
      category: 'city',
      highlights: ['Table Mountain', 'V&A Waterfront', 'Robben Island', 'Cape Point'],
      bestTime: 'October-March'
    },
    {
      id: '2',
      name: 'Windhoek',
      country: 'Namibia',
      description: 'Gateway to the Namib Desert, featuring German colonial architecture, vibrant markets, and stunning desert landscapes.',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=450&fit=crop&crop=entropy',
      rating: 4.6,
      duration: '3-5 days',
      category: 'nature',
      highlights: ['Christuskirche', 'Katutura Township', 'Sossusvlei Access', 'Craft Centre'],
      bestTime: 'May-October'
    },
    {
      id: '3',
      name: 'Kigali',
      country: 'Rwanda',
      description: 'Experience Africa\'s cleanest capital city with its rolling hills, genocide memorial sites, and thriving cultural scene.',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?w=800&h=450&fit=crop&crop=entropy',
      rating: 4.7,
      duration: '2-4 days',
      category: 'city',
      highlights: ['Genocide Memorial', 'Kimironko Market', 'Nyamirambo District', 'Inema Arts Center'],
      bestTime: 'June-September, December-February'
    },
    {
      id: '4',
      name: 'Luanda',
      country: 'Angola',
      description: 'Explore Angola\'s bustling capital with Portuguese colonial architecture, beautiful bayside location, and vibrant nightlife.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop&crop=entropy',
      rating: 4.5,
      duration: '3-4 days',
      category: 'culture',
      highlights: ['Fortaleza de São Miguel', 'Ilha do Cabo', 'National Museum', 'Marginal Promenade'],
      bestTime: 'May-October'
    },
    {
      id: '5',
      name: 'Ponta do Ouro',
      country: 'Mozambique',
      description: 'Pristine beaches perfect for diving and whale watching, with crystal-clear waters and vibrant marine life.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=450&fit=crop&crop=entropy',
      rating: 4.8,
      duration: '4-7 days',
      category: 'nature',
      highlights: ['Scuba Diving', 'Whale Watching', 'Ponta Malongane', 'Turtle Nesting'],
      bestTime: 'April-October'
    },
    {
      id: '6',
      name: 'Victoria Falls',
      country: 'Zambia/Zimbabwe',
      description: 'Experience one of the world\'s most spectacular waterfalls, adventure activities, and stunning natural beauty.',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=450&fit=crop&crop=entropy',
      rating: 4.7,
      duration: '2-4 days',
      category: 'nature',
      highlights: ['Victoria Falls Bridge', 'White Water Rafting', 'Sunset Cruise', 'Wildlife Safari'],
      bestTime: 'April-October'
    }
  ];

  const travelTips: TravelTip[] = [
    {
      id: '1',
      title: 'Essential Safety Tips for Solo Travelers',
      category: 'safety',
      content: 'Stay connected with family, research local customs, keep copies of important documents, and trust your instincts.',
      author: 'Sarah Johnson',
      readTime: '5 min read',
      helpful: 234
    },
    {
      id: '2',
      title: 'Budget Travel: How to See the World for Less',
      category: 'budget',
      content: 'Use rideshare apps, stay in hostels, cook your own meals, and take advantage of free walking tours.',
      author: 'Mike Chen',
      readTime: '7 min read',
      helpful: 189
    },
    {
      id: '3',
      title: 'Cultural Etiquette: Respecting Local Customs',
      category: 'culture',
      content: 'Research dress codes, learn basic phrases, understand tipping customs, and be mindful of religious practices.',
      author: 'Elena Rodriguez',
      readTime: '6 min read',
      helpful: 156
    },
    {
      id: '4',
      title: 'Getting Around: Transportation Tips for Every City',
      category: 'transport',
      content: 'Download local transport apps, consider rideshare options, learn about public transit passes, and keep cash handy.',
      author: 'David Kim',
      readTime: '4 min read',
      helpful: 201
    }
  ];

  const localGuides: LocalGuide[] = [
    {
      id: '1',
      name: 'Thandiwe Mthembu',
      location: 'Cape Town, South Africa',
      specialties: ['Cultural Tours', 'Wine Experiences', 'Historical Sites'],
      rating: 4.9,
      reviews: 127,
      languages: ['English', 'Afrikaans', 'Xhosa'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c045e009?w=200&h=200&fit=crop&crop=face',
      description: 'Cape Town local with 8 years of experience showcasing the city\'s rich cultural diversity and stunning landscapes.'
    },
    {
      id: '2',
      name: 'Samuel Mukamana',
      location: 'Kigali, Rwanda',
      specialties: ['Historical Tours', 'Cultural Experiences', 'Community Visits'],
      rating: 4.8,
      reviews: 93,
      languages: ['English', 'Kinyarwanda', 'French'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      description: 'Kigali native passionate about sharing Rwanda\'s inspiring recovery story and vibrant culture.'
    },
    {
      id: '3',
      name: 'Kealeboga Modise',
      location: 'Gaborone, Botswana',
      specialties: ['Safari Tours', 'Wildlife Photography', 'Cultural Heritage'],
      rating: 4.7,
      reviews: 156,
      languages: ['English', 'Setswana', 'Afrikaans'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      description: 'Wildlife expert and cultural guide offering authentic experiences in Botswana\'s natural wonders.'
    }
  ];

  const filteredDestinations = selectedCategory === 'all' 
    ? travelDestinations 
    : travelDestinations.filter(dest => dest.category === selectedCategory);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Travel Guides - MobiRides",
    "description": "Discover amazing travel destinations, get expert tips, and connect with local guides. Your ultimate travel companion with MobiRides.",
    "url": "https://mobirides.com/travel-guides",
    "mainEntity": {
      "@type": "TravelGuide",
      "name": "MobiRides Travel Guides",
      "description": "Comprehensive travel guides and resources for modern travelers"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageLayout
        title="Travel Guides | MobiRides"
        description="Discover amazing travel destinations, get expert tips, and connect with local guides. Your ultimate travel companion with MobiRides."
        keywords="travel guides, destinations, travel tips, local guides, travel resources"
      >
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-blue-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-green-600 p-4 rounded-full">
                  <MapPin className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Travel Guides
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Discover incredible destinations, get insider tips, and connect with local experts to make your travels unforgettable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Explore Destinations
                </button>
                <button className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Find Local Guides
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
                { id: 'destinations', label: 'Destinations', icon: MapPin },
                { id: 'tips', label: 'Travel Tips', icon: Bookmark },
                { id: 'guides', label: 'Local Guides', icon: Users },
                { id: 'resources', label: 'Resources', icon: Navigation }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as 'destinations' | 'tips' | 'guides' | 'resources')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === id
                      ? 'border-green-500 text-green-600'
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
            {activeTab === 'destinations' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Popular Travel Destinations
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                    Explore handpicked destinations from around the world, complete with insider tips and local insights.
                  </p>
                  
                  {/* Category Filter */}
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {[
                      { id: 'all', label: 'All Destinations' },
                      { id: 'city', label: 'Cities' },
                      { id: 'nature', label: 'Nature' },
                      { id: 'culture', label: 'Culture' },
                      { id: 'adventure', label: 'Adventure' }
                    ].map(({ id, label }) => (
                      <button
                        key={id}
                        onClick={() => setSelectedCategory(id)}
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${
                          selectedCategory === id
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredDestinations.map((destination) => (
                    <div key={destination.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <ImageWithFallback
                          src={destination.image} 
                          alt={`${destination.name}, ${destination.country}`}
                          className="w-full h-48 object-cover"
                          loading="lazy"
                          fallbackSrc="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=450&fit=crop&crop=entropy"
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                            destination.category === 'city' ? 'bg-blue-500' :
                            destination.category === 'nature' ? 'bg-green-500' :
                            destination.category === 'culture' ? 'bg-purple-500' :
                            'bg-orange-500'
                          }`}>
                            {destination.category.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{destination.name}</h3>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm font-medium">{destination.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{destination.country}</p>
                        <p className="text-gray-700 mb-4">{destination.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>Best duration: {destination.duration}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>Best time: {destination.bestTime}</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Top Highlights:</h4>
                          <div className="flex flex-wrap gap-1">
                            {destination.highlights.slice(0, 3).map((highlight, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                          View Guide
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Expert Travel Tips
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Learn from experienced travelers and make the most of your adventures with these practical tips.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {travelTips.map((tip) => (
                    <div key={tip.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${
                              tip.category === 'safety' ? 'bg-red-100 text-red-800' :
                              tip.category === 'budget' ? 'bg-green-100 text-green-800' :
                              tip.category === 'culture' ? 'bg-purple-100 text-purple-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {tip.category.toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-500">{tip.readTime}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                          <p className="text-gray-600 mb-4">{tip.content}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <span>by {tip.author}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{tip.helpful} found helpful</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'guides' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Connect with Local Guides
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Discover authentic experiences with verified local guides who know their cities inside and out.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {localGuides.map((guide) => (
                    <div key={guide.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                      <div className="text-center mb-4">
                        <img 
                          src={guide.avatar} 
                          alt={guide.name}
                          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                        />
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{guide.name}</h3>
                        <p className="text-gray-600 text-sm flex items-center justify-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {guide.location}
                        </p>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm">Rating</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-medium">{guide.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">({guide.reviews})</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-gray-600 text-sm block mb-1">Specialties</span>
                          <div className="flex flex-wrap gap-1">
                            {guide.specialties.map((specialty, index) => (
                              <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-gray-600 text-sm block mb-1">Languages</span>
                          <p className="text-sm text-gray-700">{guide.languages.join(', ')}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
                      
                      <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                        Contact Guide
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Travel Resources & Tools
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Essential tools and resources to help you plan, book, and enjoy your travels.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Trip Planner',
                      description: 'Plan your itinerary with our interactive trip planning tool',
                      icon: <Navigation className="w-6 h-6" />,
                      color: 'bg-blue-500'
                    },
                    {
                      title: 'Currency Converter',
                      description: 'Real-time currency conversion for budget planning',
                      icon: <Clock className="w-6 h-6" />,
                      color: 'bg-green-500'
                    },
                    {
                      title: 'Weather Forecast',
                      description: 'Check weather conditions for your destination',
                      icon: <MapPin className="w-6 h-6" />,
                      color: 'bg-orange-500'
                    },
                    {
                      title: 'Language Phrases',
                      description: 'Essential phrases in local languages',
                      icon: <Users className="w-6 h-6" />,
                      color: 'bg-purple-500'
                    },
                    {
                      title: 'Packing Checklist',
                      description: 'Customizable packing lists for different trip types',
                      icon: <Bookmark className="w-6 h-6" />,
                      color: 'bg-red-500'
                    },
                    {
                      title: 'Emergency Contacts',
                      description: 'Important contact numbers for travelers',
                      icon: <Search className="w-6 h-6" />,
                      color: 'bg-gray-500'
                    }
                  ].map((resource, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className={`${resource.color} p-3 rounded-lg w-fit mb-4`}>
                        <div className="text-white">{resource.icon}</div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                      <p className="text-gray-600 mb-4">{resource.description}</p>
                      <button className="text-green-600 font-medium hover:text-green-700 transition-colors">
                        Access Tool →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Next Adventure?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Use MobiRides to get around your destination safely and conveniently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Download App
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Plan Your Trip
              </button>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default TravelGuidesPage;