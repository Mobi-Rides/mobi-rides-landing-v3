import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Smartphone, Globe, Shield } from 'lucide-react';

const FinalCTASection = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Perfect experience on any device"
    },
    {
      icon: Globe,
      title: "No Download Required", 
      description: "Access instantly through your browser"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Bank-level security for all transactions"
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-h1 mb-6">
              Your Next <span className="gradient-text">Opportunity</span> Awaits.
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-lg">
              Access premium mobility now. Whether you're heading to a crucial business meeting, 
              exploring Botswana's natural wonders, or building your entrepreneurial dreams, 
              MobiRides is your trusted partner in movement.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-hero text-lg px-8 py-4 group">
                Start Exploring
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="font-semibold px-8 py-4">
                Learn More
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              🚗 <strong>app.mobirides.com</strong> • Available 24/7 • Instant access
            </p>
          </div>

          {/* Web App Preview */}
          <div className="relative">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-strong overflow-hidden">
              <CardContent className="p-0">
                {/* Browser Header */}
                <div className="bg-gray-700 px-4 py-3 flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-gray-600 rounded px-3 py-1 text-sm text-gray-300 ml-4">
                    app.mobirides.com
                  </div>
                </div>

                {/* App Content */}
                <div className="p-6 bg-white text-gray-900">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">M</span>
                      </div>
                      <span className="font-bold text-lg">MobiRides</span>
                    </div>
                    <div className="text-sm text-gray-500">Dashboard</div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Find Your Perfect Ride</h4>
                      <div className="flex space-x-2">
                        <div className="flex-1 bg-white rounded border px-3 py-2 text-sm">
                          📍 Gaborone CBD
                        </div>
                        <div className="bg-primary text-white rounded px-4 py-2 text-sm font-medium">
                          Search
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-2xl mb-1">🚗</div>
                        <div className="text-xs font-medium">SUVs</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-2xl mb-1">🚚</div>
                        <div className="text-xs font-medium">Bakkies</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-2xl mb-1">👑</div>
                        <div className="text-xs font-medium">Luxe</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-secondary/20 rounded-full blur-xl"></div>
            <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;