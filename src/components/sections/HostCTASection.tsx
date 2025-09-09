import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Shield, Users, TrendingUp } from 'lucide-react';

const HostCTASection = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Premium Income",
      description: "Generate up to P15,000 monthly from your vehicle"
    },
    {
      icon: Shield,
      title: "Comprehensive Protection",
      description: "Full insurance coverage and damage protection"
    },
    {
      icon: Users,
      title: "Vetted Community",
      description: "All renters are verified professionals"
    },
    {
      icon: TrendingUp,
      title: "Maximize Asset Value",
      description: "Turn your parked car into a performing asset"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(271, 91%, 59%) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(142, 71%, 45%) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-h1 mb-6">
              Your Vehicle is an <span className="text-transparent bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text">Asset</span>. 
              <br />Let It Perform.
            </h2>
            <p className="text-body-lg text-gray-300 mb-8 max-w-lg">
              Join a select community of vehicle owners earning on Botswana's premium mobility platform. 
              Transform your car from an expense into an income stream.
            </p>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                      <p className="text-gray-400">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button className="btn-hero text-lg px-8 py-4 mb-4">
              Learn About Hosting
            </Button>
            <p className="text-sm text-gray-400">
              Apply now • Approval in 24 hours • Start earning immediately
            </p>
          </div>

          {/* Visual */}
          <div className="relative">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <DollarSign className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Monthly Earnings Calculator</h3>
                  <p className="text-gray-300">Premium sedan example</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-gray-300">Daily Rate (P650)</span>
                    <span className="font-semibold">× 20 days</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-gray-300">Monthly Gross</span>
                    <span className="font-semibold">P13,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-gray-300">Platform Fee (15%)</span>
                    <span className="font-semibold">-P1,950</span>
                  </div>
                  <div className="flex justify-between items-center py-3 text-lg font-bold text-secondary-light">
                    <span>Your Earnings</span>
                    <span>P11,050</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
                  <p className="text-sm text-gray-300 text-center">
                    <strong className="text-secondary-light">Plus:</strong> Maintenance reimbursement, 
                    insurance coverage, and professional cleaning services included.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostCTASection;