import React, { useState } from 'react';
import { PageLayout } from '../components/layouts';
import { Users, MessageCircle, Calendar, Award, TrendingUp, MapPin, Star, ChevronRight } from 'lucide-react';

interface CommunityFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  stats: string;
  color: string;
}

interface ForumTopic {
  id: string;
  title: string;
  category: string;
  author: string;
  replies: number;
  lastActivity: string;
  isHot: boolean;
}

interface CommunityEvent {
  id: string;
  title: string;
  type: 'webinar' | 'meetup' | 'workshop' | 'conference';
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  description: string;
}

interface HostSpotlight {
  id: string;
  name: string;
  location: string;
  rating: number;
  totalRides: number;
  monthlyEarnings: string;
  story: string;
  avatar: string;
}

const HostCommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'forum' | 'events' | 'spotlight'>('overview');

  const communityFeatures: CommunityFeature[] = [
    {
      id: 'forum',
      title: 'Community Forum',
      description: 'Connect with fellow hosts, share experiences, and get advice',
      icon: <MessageCircle className="w-6 h-6" />,
      stats: '15K+ Active Members',
      color: 'bg-blue-500'
    },
    {
      id: 'events',
      title: 'Host Events',
      description: 'Join webinars, meetups, and training sessions',
      icon: <Calendar className="w-6 h-6" />,
      stats: '50+ Monthly Events',
      color: 'bg-green-500'
    },
    {
      id: 'rewards',
      title: 'Recognition Program',
      description: 'Earn badges and rewards for outstanding hosting',
      icon: <Award className="w-6 h-6" />,
      stats: '25+ Achievement Badges',
      color: 'bg-purple-500'
    },
    {
      id: 'insights',
      title: 'Market Insights',
      description: 'Access exclusive data and trends in your area',
      icon: <TrendingUp className="w-6 h-6" />,
      stats: 'Real-time Analytics',
      color: 'bg-orange-500'
    }
  ];

  const forumTopics: ForumTopic[] = [
    {
      id: '1',
      title: 'Best practices for new hosts in urban areas',
      category: 'Getting Started',
      author: 'Sarah M.',
      replies: 23,
      lastActivity: '2 hours ago',
      isHot: true
    },
    {
      id: '2',
      title: 'How to handle difficult passengers professionally',
      category: 'Host Tips',
      author: 'Mike R.',
      replies: 45,
      lastActivity: '4 hours ago',
      isHot: true
    },
    {
      id: '3',
      title: 'Vehicle maintenance tips for rideshare hosts',
      category: 'Vehicle Care',
      author: 'Lisa K.',
      replies: 18,
      lastActivity: '6 hours ago',
      isHot: false
    },
    {
      id: '4',
      title: 'Tax deductions every host should know about',
      category: 'Finance',
      author: 'David L.',
      replies: 67,
      lastActivity: '8 hours ago',
      isHot: true
    },
    {
      id: '5',
      title: 'Safety protocols during late-night rides',
      category: 'Safety',
      author: 'Emma T.',
      replies: 31,
      lastActivity: '12 hours ago',
      isHot: false
    }
  ];

  const communityEvents: CommunityEvent[] = [
    {
      id: '1',
      title: 'Host Success Webinar: Maximizing Your Earnings',
      type: 'webinar',
      date: '2024-02-15',
      time: '7:00 PM EST',
      location: 'Online',
      attendees: 245,
      maxAttendees: 500,
      description: 'Learn proven strategies to increase your earnings and optimize your hosting schedule.'
    },
    {
      id: '2',
      title: 'Local Host Meetup - Gaborone',
      type: 'meetup',
      date: '2024-02-18',
      time: '2:00 PM CAT',
      location: 'Gaborone Convention Centre',
      attendees: 67,
      maxAttendees: 100,
      description: 'Network with fellow Gaborone hosts, share experiences, and enjoy refreshments.'
    },
    {
      id: '3',
      title: 'Vehicle Safety & Maintenance Workshop',
      type: 'workshop',
      date: '2024-02-22',
      time: '10:00 AM PST',
      location: 'Los Angeles Training Center',
      attendees: 34,
      maxAttendees: 50,
      description: 'Hands-on workshop covering essential vehicle maintenance and safety checks.'
    },
    {
      id: '4',
      title: 'Annual Host Conference 2024',
      type: 'conference',
      date: '2024-03-15',
      time: '9:00 AM EST',
      location: 'Chicago Convention Center',
      attendees: 1250,
      maxAttendees: 2000,
      description: 'Three-day conference featuring keynote speakers, workshops, and networking opportunities.'
    }
  ];

  const hostSpotlights: HostSpotlight[] = [
    {
      id: '1',
      name: 'Thabo Molefi',
      location: 'Gaborone, Botswana',
      rating: 4.9,
      totalRides: 2847,
      monthlyEarnings: 'P8,500',
      story: 'Started hosting to supplement his teaching income and now runs a successful side business.',
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20friendly%20african%20man%20teacher%20from%20botswana%20smiling%20warmly&image_size=square'
    },
    {
      id: '2',
      name: 'Keabetswe Mogale',
      location: 'Francistown, Botswana',
      rating: 4.8,
      totalRides: 1923,
      monthlyEarnings: 'P7,200',
      story: 'Mining professional who hosts during evenings and weekends to explore entrepreneurship.',
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20an%20african%20woman%20mining%20professional%20from%20botswana%20smiling%20confidently&image_size=square'
    },
    {
      id: '3',
      name: 'Lesego Kgang',
      location: 'Maun, Botswana',
      rating: 4.9,
      totalRides: 3156,
      monthlyEarnings: 'P9,100',
      story: 'University student who built a flexible income stream around her class schedule and tourism season.',
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20young%20african%20college%20student%20from%20botswana%20smiling%20brightly&image_size=square'
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Host Community - MobiRides",
    "description": "Join the MobiRides host community. Connect with fellow hosts, attend events, share experiences, and grow your hosting business.",
    "url": "https://mobirides.com/host-community",
    "mainEntity": {
      "@type": "Organization",
      "name": "MobiRides Host Community",
      "description": "A vibrant community of rideshare hosts supporting each other's success"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageLayout
        title="Host Community | MobiRides"
        description="Join the MobiRides host community. Connect with fellow hosts, attend events, share experiences, and grow your hosting business."
        keywords="host community, rideshare hosts, driver network, host events, host forum"
      >
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-purple-600 p-4 rounded-full">
                  <Users className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Host Community
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Connect with thousands of successful hosts, share experiences, and grow your hosting business together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                  Join Community
                </button>
                <button className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                  Browse Forum
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
                { id: 'overview', label: 'Community Overview', icon: Users },
                { id: 'forum', label: 'Discussion Forum', icon: MessageCircle },
                { id: 'events', label: 'Events & Meetups', icon: Calendar },
                { id: 'spotlight', label: 'Host Spotlight', icon: Star }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as 'overview' | 'forum' | 'events' | 'spotlight')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === id
                      ? 'border-purple-500 text-purple-600'
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
            {activeTab === 'overview' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Welcome to Our Thriving Community
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Join over 15,000 active hosts who support each other's success through shared knowledge, networking, and collaboration.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {communityFeatures.map((feature) => (
                    <div key={feature.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className={`${feature.color} p-3 rounded-lg w-fit mb-4`}>
                        <div className="text-white">{feature.icon}</div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      <p className="text-sm font-medium text-purple-600">{feature.stats}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-3xl font-bold text-purple-600 mb-2">15,000+</div>
                      <div className="text-gray-600">Active Hosts</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                      <div className="text-gray-600">Monthly Events</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                      <div className="text-gray-600">Satisfaction Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'forum' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Community Discussion Forum
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Get answers, share tips, and connect with experienced hosts in our active community forum.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Discussions</h3>
                      <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
                        View All <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {forumTopics.map((topic) => (
                      <div key={topic.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h4 className="text-lg font-medium text-gray-900 mr-3">{topic.title}</h4>
                              {topic.isHot && (
                                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                                  Hot
                                </span>
                              )}
                            </div>
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                              <span className="bg-gray-100 px-2 py-1 rounded">{topic.category}</span>
                              <span>by {topic.author}</span>
                              <span>{topic.replies} replies</span>
                              <span>{topic.lastActivity}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Upcoming Events & Meetups
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Join our regular events to learn, network, and grow your hosting business.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {communityEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              event.type === 'webinar' ? 'bg-blue-100 text-blue-800' :
                              event.type === 'meetup' ? 'bg-green-100 text-green-800' :
                              event.type === 'workshop' ? 'bg-orange-100 text-orange-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {event.type.toUpperCase()}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                          <p className="text-gray-600 mb-4">{event.description}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{event.attendees}/{event.maxAttendees} attendees</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                          ></div>
                        </div>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors whitespace-nowrap">
                          Register
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'spotlight' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Host Success Stories
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Meet some of our most successful hosts and learn from their experiences.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {hostSpotlights.map((host) => (
                    <div key={host.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                      <div className="text-center mb-6">
                        <img 
                          src={host.avatar} 
                          alt={host.name}
                          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                        />
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{host.name}</h3>
                        <p className="text-gray-600 flex items-center justify-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {host.location}
                        </p>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Rating</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-semibold">{host.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Total Rides</span>
                          <span className="font-semibold">{host.totalRides.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Monthly Earnings</span>
                          <span className="font-semibold text-green-600">{host.monthlyEarnings}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm italic">"{host.story}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Connect with thousands of successful hosts and start growing your hosting business today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Community Forum
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Attend Next Event
              </button>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default HostCommunityPage;