import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MapPin, Calendar, Search } from 'lucide-react';
import heroImage from '@/assets/hero-professional.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional stepping out of premium vehicle in Gaborone CBD"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white animate-fade-up">
            <h1 className="text-display mb-6">
              Mobility for the <span className="gradient-text bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">Driven</span>.
            </h1>
            <p className="text-h3 font-normal mb-4 text-gray-100">
              Premium Car Rentals on Your Terms.
            </p>
            <p className="text-body-lg mb-8 text-gray-200 max-w-lg">
              Access a curated fleet of vehicles from trusted local owners. 
              Safe, seamless, and sophisticated.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button className="btn-hero text-lg px-8 py-4">
                Start Exploring
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Search Component */}
          <div className="animate-scale-in">
            <Card className="bg-white/95 backdrop-blur-md p-6 lg:p-8 shadow-strong">
              <h3 className="text-h3 mb-6 text-gray-900">Find Your Perfect Ride</h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input 
                    placeholder="Where do you need a car?"
                    className="pl-10 py-3 text-lg"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <Input 
                      type="date"
                      className="pl-10 py-3"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                    <Input 
                      type="date"
                      className="pl-10 py-3"
                    />
                  </div>
                </div>
                
                <Button className="w-full btn-hero text-lg py-4 mt-6">
                  <Search className="mr-2 h-5 w-5" />
                  Explore Rides
                </Button>
              </div>
              
              <p className="text-sm text-gray-600 mt-4 text-center">
                Redirects to app.mobirides.com
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;