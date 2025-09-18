import React, { useState } from 'react';
import { PageLayout } from '../components/layouts';
import { 
  DollarSign, Car, Clock, Star, TrendingUp, CheckCircle, XCircle, Activity,
  Play, Pause, User, HelpCircle, Bell, Settings, ChevronRight, ArrowUp,
  ArrowDown, Calendar, MapPin, Phone, MessageCircle, Mail, AlertTriangle,
  Fuel, Battery, Wrench, FileText, Award, Target, Zap, BarChart3,
  PieChart, LineChart, Filter, Download, RefreshCw, Eye, EyeOff
} from 'lucide-react';
import hostDashboardData from '../data/hostDashboard.json';

interface QuickStat {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: string;
  color: string;
}

interface EarningsPeriod {
  label: string;
  value: string;
  rides: number;
  hours: number;
}

interface Ride {
  id: string;
  passenger: string;
  pickup: string;
  destination: string;
  status?: string;
  estimatedEarning?: string;
  earning?: string;
  distance: string;
  duration: string;
  startTime?: string;
  scheduledTime?: string;
  completedTime?: string;
  rating?: number;
}

interface PerformanceMetric {
  label: string;
  value: string;
  target: string;
  status: 'excellent' | 'good' | 'needs_improvement';
  icon: string;
  color: string;
  description: string;
}

interface Document {
  type: string;
  status: 'valid' | 'expiring_soon' | 'expired';
  expiryDate: string;
  daysUntilExpiry: number;
}

interface Incentive {
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: string;
  deadline: string;
  status: string;
  color: string;
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action: string;
}

const HostDashboardPage: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('This Week');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [selectedRideTab, setSelectedRideTab] = useState<string>('active');

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      DollarSign, Car, Clock, Star, TrendingUp, CheckCircle, XCircle, Activity,
      Play, Pause, User, HelpCircle, Bell, Settings, Phone, MessageCircle, Mail,
      AlertTriangle, Fuel, Battery, Wrench, FileText, Award, Target, Zap
    };
    return icons[iconName] || HelpCircle;
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; border: string } } = {
      green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
      red: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' }
    };
    return colors[color] || colors.blue;
  };

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      excellent: 'text-green-600 bg-green-100',
      good: 'text-blue-600 bg-blue-100',
      needs_improvement: 'text-orange-600 bg-orange-100',
      valid: 'text-green-600 bg-green-100',
      expiring_soon: 'text-orange-600 bg-orange-100',
      expired: 'text-red-600 bg-red-100',
      active: 'text-blue-600 bg-blue-100',
      in_progress: 'text-green-600 bg-green-100',
      completed: 'text-gray-600 bg-gray-100'
    };
    return statusColors[status] || 'text-gray-600 bg-gray-100';
  };

  const selectedEarningsPeriod = hostDashboardData.earningsOverview.periods.find(
    (period: EarningsPeriod) => period.label === selectedPeriod
  ) || hostDashboardData.earningsOverview.periods[1];

  const unreadNotifications = hostDashboardData.notifications.notifications.filter(
    (notif: Notification) => !notif.read
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Host Dashboard - MobiRides",
    "description": hostDashboardData.hero.description,
    "provider": {
      "@type": "Organization",
      "name": "MobiRides",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BW"
      }
    }
  };

  return (
    <PageLayout
      title="Host Dashboard - MobiRides | Manage Your Rideshare Business"
      description="Comprehensive host dashboard for MobiRides drivers in Botswana. Track earnings, manage rides, monitor performance, and grow your hosting business."
      jsonLd={jsonLd}
    >
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{hostDashboardData.hero.title}</h1>
                <p className="text-gray-600">{hostDashboardData.hero.subtitle}</p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Online/Offline Toggle */}
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${
                    isOnline ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                  <button
                    onClick={() => setIsOnline(!isOnline)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isOnline ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isOnline ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Bell className="w-6 h-6" />
                    {unreadNotifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadNotifications.length}
                      </span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                      <div className="p-4 border-b">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {hostDashboardData.notifications.notifications.slice(0, 5).map((notification: Notification) => (
                          <div key={notification.id} className={`p-4 border-b hover:bg-gray-50 ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'warning' ? 'bg-orange-500' :
                                notification.type === 'success' ? 'bg-green-500' :
                                notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                              }`} />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                                <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-gray-500">
                                    {new Date(notification.timestamp).toLocaleDateString()}
                                  </span>
                                  <button className="text-xs text-blue-600 hover:text-blue-800">
                                    {notification.action}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'earnings', label: 'Earnings' },
                { id: 'rides', label: 'Rides' },
                { id: 'performance', label: 'Performance' },
                { id: 'vehicle', label: 'Vehicle' },
                { id: 'incentives', label: 'Incentives' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-6">{hostDashboardData.quickStats.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {hostDashboardData.quickStats.stats.map((stat: QuickStat, index) => {
                    const IconComponent = getIcon(stat.icon);
                    const colorClasses = getColorClasses(stat.color);
                    
                    return (
                      <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                          <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
                            <IconComponent className={`w-6 h-6 ${colorClasses.text}`} />
                          </div>
                          <div className={`flex items-center text-sm ${
                            stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stat.changeType === 'positive' ? (
                              <ArrowUp className="w-4 h-4 mr-1" />
                            ) : (
                              <ArrowDown className="w-4 h-4 mr-1" />
                            )}
                            {stat.change}
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Quick Actions */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-6">{hostDashboardData.quickActions.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {hostDashboardData.quickActions.actions.map((action, index) => {
                    const IconComponent = getIcon(action.icon);
                    const colorClasses = getColorClasses(action.color);
                    
                    return (
                      <button key={index} className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow text-left">
                        <div className={`w-10 h-10 rounded-lg ${colorClasses.bg} flex items-center justify-center mb-3`}>
                          <IconComponent className={`w-5 h-5 ${colorClasses.text}`} />
                        </div>
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Recent Activity */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6">
                    <div className="space-y-4">
                      {hostDashboardData.rideManagement.recentRides.slice(0, 3).map((ride: Ride) => (
                        <div key={ride.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {ride.pickup} → {ride.destination}
                              </div>
                              <div className="text-sm text-gray-600">
                                {ride.passenger} • {ride.completedTime}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">{ride.earning}</div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${
                                  i < (ride.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`} />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <div className="space-y-8">
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">{hostDashboardData.earningsOverview.title}</h2>
                  <div className="flex items-center gap-4">
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                      {hostDashboardData.earningsOverview.periods.map((period: EarningsPeriod) => (
                        <option key={period.label} value={period.label}>{period.label}</option>
                      ))}
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg p-6 shadow-sm border">
                      <h3 className="font-semibold text-gray-900 mb-4">Earnings Chart</h3>
                      <div className="h-64 flex items-center justify-center text-gray-500">
                        <BarChart3 className="w-16 h-16" />
                        <span className="ml-4">Earnings chart visualization would go here</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm border">
                      <h3 className="font-semibold text-gray-900 mb-4">{selectedPeriod} Summary</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{selectedEarningsPeriod.value}</div>
                          <div className="text-sm text-gray-600">Total Earnings</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-lg font-semibold text-gray-900">{selectedEarningsPeriod.rides}</div>
                            <div className="text-sm text-gray-600">Rides</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-gray-900">{selectedEarningsPeriod.hours}h</div>
                            <div className="text-sm text-gray-600">Hours</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-sm border">
                      <h3 className="font-semibold text-gray-900 mb-4">All Periods</h3>
                      <div className="space-y-3">
                        {hostDashboardData.earningsOverview.periods.map((period: EarningsPeriod) => (
                          <div key={period.label} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{period.label}</span>
                            <span className="font-medium text-gray-900">{period.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Rides Tab */}
          {activeTab === 'rides' && (
            <div className="space-y-8">
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">{hostDashboardData.rideManagement.title}</h2>
                  <div className="flex items-center gap-2">
                    {[
                      { id: 'active', label: 'Active' },
                      { id: 'upcoming', label: 'Upcoming' },
                      { id: 'recent', label: 'Recent' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedRideTab(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedRideTab === tab.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6">
                    {selectedRideTab === 'active' && (
                      <div className="space-y-4">
                        {hostDashboardData.rideManagement.activeRides.length > 0 ? (
                          hostDashboardData.rideManagement.activeRides.map((ride: Ride) => (
                            <div key={ride.id} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Car className="w-5 h-5 text-green-600" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{ride.passenger}</div>
                                    <div className="text-sm text-gray-600">Started at {ride.startTime}</div>
                                  </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  getStatusColor(ride.status || '')
                                }`}>
                                  In Progress
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <div className="text-sm text-gray-600">Route</div>
                                  <div className="font-medium text-gray-900">
                                    {ride.pickup} → {ride.destination}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-600">Distance & Time</div>
                                  <div className="font-medium text-gray-900">
                                    {ride.distance} • {ride.duration}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-600">Estimated Earning</div>
                                  <div className="font-medium text-gray-900">{ride.estimatedEarning}</div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Car className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No active rides</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {selectedRideTab === 'upcoming' && (
                      <div className="space-y-4">
                        {hostDashboardData.rideManagement.upcomingRides.map((ride: Ride) => (
                          <div key={ride.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Clock className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{ride.passenger}</div>
                                  <div className="text-sm text-gray-600">Scheduled for {ride.scheduledTime}</div>
                                </div>
                              </div>
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                View Details
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <div className="text-sm text-gray-600">Route</div>
                                <div className="font-medium text-gray-900">
                                  {ride.pickup} → {ride.destination}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Distance & Time</div>
                                <div className="font-medium text-gray-900">
                                  {ride.distance} • {ride.duration}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Estimated Earning</div>
                                <div className="font-medium text-gray-900">{ride.estimatedEarning}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {selectedRideTab === 'recent' && (
                      <div className="space-y-4">
                        {hostDashboardData.rideManagement.recentRides.map((ride: Ride) => (
                          <div key={ride.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{ride.passenger}</div>
                                  <div className="text-sm text-gray-600">Completed at {ride.completedTime}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-gray-900">{ride.earning}</div>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${
                                      i < (ride.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`} />
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <div className="text-sm text-gray-600">Route</div>
                                <div className="font-medium text-gray-900">
                                  {ride.pickup} → {ride.destination}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Distance & Time</div>
                                <div className="font-medium text-gray-900">
                                  {ride.distance} • {ride.duration}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Passenger Rating</div>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${
                                      i < (ride.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`} />
                                  ))}
                                  <span className="ml-1 text-sm text-gray-600">({ride.rating}/5)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-6">{hostDashboardData.performanceMetrics.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hostDashboardData.performanceMetrics.metrics.map((metric: PerformanceMetric, index) => {
                    const IconComponent = getIcon(metric.icon);
                    const colorClasses = getColorClasses(metric.color);
                    
                    return (
                      <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
                            <IconComponent className={`w-6 h-6 ${colorClasses.text}`} />
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getStatusColor(metric.status)
                          }`}>
                            {metric.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="mb-2">
                          <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                          <div className="text-sm text-gray-600">{metric.label}</div>
                        </div>
                        
                        <div className="text-xs text-gray-500 mb-3">
                          Target: {metric.target}
                        </div>
                        
                        <p className="text-sm text-gray-600">{metric.description}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {/* Vehicle Tab */}
          {activeTab === 'vehicle' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-6">{hostDashboardData.vehicleStatus.title}</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Vehicle Info */}
                  <div className="bg-white rounded-lg p-6 shadow-sm border">
                    <h3 className="font-semibold text-gray-900 mb-4">Vehicle Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Make & Model</span>
                        <span className="font-medium text-gray-900">
                          {hostDashboardData.vehicleStatus.vehicle.make} {hostDashboardData.vehicleStatus.vehicle.model}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year</span>
                        <span className="font-medium text-gray-900">{hostDashboardData.vehicleStatus.vehicle.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plate Number</span>
                        <span className="font-medium text-gray-900">{hostDashboardData.vehicleStatus.vehicle.plateNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Color</span>
                        <span className="font-medium text-gray-900">{hostDashboardData.vehicleStatus.vehicle.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getStatusColor(hostDashboardData.vehicleStatus.vehicle.status)
                        }`}>
                          {hostDashboardData.vehicleStatus.vehicle.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Maintenance */}
                  <div className="bg-white rounded-lg p-6 shadow-sm border">
                    <h3 className="font-semibold text-gray-900 mb-4">Maintenance Status</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Service</span>
                        <span className="font-medium text-gray-900">{hostDashboardData.vehicleStatus.maintenance.lastService}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Service</span>
                        <span className="font-medium text-gray-900">{hostDashboardData.vehicleStatus.maintenance.nextService}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mileage</span>
                        <span className="font-medium text-gray-900">{hostDashboardData.vehicleStatus.maintenance.mileage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fuel Level</span>
                        <span className="font-medium text-gray-900">{hostDashboardData.vehicleStatus.maintenance.fuelLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Battery Health</span>
                        <span className="font-medium text-gray-900">{hostDashboardData.vehicleStatus.maintenance.batteryHealth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tire Condition</span>
                        <span className="font-medium text-gray-900">{hostDashboardData.vehicleStatus.maintenance.tireCondition}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Documents */}
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <h3 className="font-semibold text-gray-900 mb-4">Documents Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hostDashboardData.vehicleStatus.documents.map((doc: Document, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{doc.type}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getStatusColor(doc.status)
                          }`}>
                            {doc.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Expires: {doc.expiryDate}
                        </div>
                        <div className={`text-sm mt-1 ${
                          doc.daysUntilExpiry <= 30 ? 'text-red-600' :
                          doc.daysUntilExpiry <= 90 ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {doc.daysUntilExpiry} days remaining
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Incentives Tab */}
          {activeTab === 'incentives' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-6">{hostDashboardData.incentives.title}</h2>
                
                {/* Active Incentives */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Incentives</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hostDashboardData.incentives.activeIncentives.map((incentive: Incentive, index) => {
                      const progress = (incentive.progress / incentive.target) * 100;
                      const colorClasses = getColorClasses(incentive.color);
                      
                      return (
                        <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-900">{incentive.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              getStatusColor(incentive.status)
                            }`}>
                              ACTIVE
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-4">{incentive.description}</p>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium text-gray-900">
                                {incentive.progress}/{incentive.target}
                              </span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full bg-${incentive.color}-600`}
                                style={{ width: `${Math.min(progress, 100)}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {Math.round(progress)}% complete
                            </div>
                          </div>
                          
                          <div className="border-t pt-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-sm text-gray-600">Reward</div>
                                <div className="font-semibold text-gray-900">{incentive.reward}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-600">Deadline</div>
                                <div className="font-medium text-gray-900">{incentive.deadline}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Completed Incentives */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Completed</h3>
                  <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-6">
                      <div className="space-y-4">
                        {hostDashboardData.incentives.completedIncentives.map((incentive, index) => (
                          <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Award className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{incentive.title}</div>
                                <div className="text-sm text-gray-600">Completed on {incentive.completedDate}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">{incentive.reward}</div>
                              <div className="text-sm text-green-600">Earned</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Support Section */}
        <section className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{hostDashboardData.support.title}</h2>
              <p className="text-gray-600">{hostDashboardData.support.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hostDashboardData.support.channels.map((channel, index) => {
                const IconComponent = getIcon(channel.icon);
                const colorClasses = getColorClasses(channel.color);
                
                return (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 ${colorClasses.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`w-8 h-8 ${colorClasses.text}`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{channel.name}</h3>
                    <p className="text-gray-600 mb-2">{channel.contact}</p>
                    <p className="text-sm text-gray-500">{channel.hours}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default HostDashboardPage;