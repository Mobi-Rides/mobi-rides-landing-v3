import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MapPin, Calendar, Search } from 'lucide-react';
import heroImage from '@/assets/hero-professional.jpg';
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Professional stepping out of premium vehicle in Gaborone CBD" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Like it, Tap it,<br />
              <span className="gradient-text-light">Drive it</span>
            </h1>
            <p className="text-xl mb-8 font-light text-white">
              <span className="gradient-text-light font-semibold">Unlock cars 24/7</span> with your phone, and go!
            </p>
            
            {/* Mobile App Badge */}
            <div className="mb-8">
              <p className="text-sm mb-4 text-white">Car rental by locals with trip liability insurance included</p>
            </div>
          </div>

          {/* Search Component */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="space-y-6">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="Specific address, station, suburb..." className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="text" placeholder="Pickup" className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50" />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="text" placeholder="Return" className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50" />
                </div>
              </div>
              
              <a 
                href="https://app.mobirides.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-gradient-hero text-white py-4 px-8 text-xl font-bold rounded-2xl shadow-strong hover:shadow-glow transition-all duration-300 transform hover:scale-[1.02] block text-center"
              >
                Search
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>;
};
export default HeroSection;