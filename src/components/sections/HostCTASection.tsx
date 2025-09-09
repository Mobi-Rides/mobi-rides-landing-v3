import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Shield, Users, TrendingUp } from 'lucide-react';

const HostCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Own a car? Put it to <span className="text-primary">work!</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Earn up to <span className="font-bold text-primary">P15,000 per month</span> by sharing your car with MobiRides Connect.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-700">Comprehensive insurance coverage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-700">Professional vetting of all renters</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-700">24/7 roadside assistance</span>
                </div>
              </div>
              
              <button className="bg-white border-2 border-primary text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 flex items-center space-x-2">
                <span>List my car</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src="/lovable-uploads/f8b461ed-0b87-4858-81ad-7986353c8bbf.png"
                  alt="Professional in car earning with car sharing"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostCTASection;