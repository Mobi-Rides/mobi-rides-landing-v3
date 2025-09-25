import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Shield, Headphones, DollarSign, TrendingUp } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import miningImage from '@/assets/mining-professional.jpg';
import supportImage from '@/assets/customer-support.jpg';
import agribusinessImage from '@/assets/agribusiness.jpg';

const TrustSection = () => {
  const autoplay = Autoplay({
    delay: 4000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
  });

  const trustPoints = [
    {
      icon: Shield,
      title: "Comprehensive Insurance",
      description: "Drive with peace of mind. Every trip is covered by our comprehensive insurance policy.",
      image: miningImage,
      alt: "Mining professional with reliable vehicle"
    },
    {
      icon: Headphones,
      title: "24/7 Professional Support",
      description: "Our dedicated support team is available around the clock to assist you.",
      image: supportImage,
      alt: "Professional customer support representative"
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees, no surprises. Clear, upfront pricing for every rental.",
      image: "/api/placeholder/400/300",
      alt: "Professional reviewing transparent invoice"
    },
    {
      icon: TrendingUp,
      title: "Powering Botswana's Progress",
      description: "Support local entrepreneurs and drive the nation's economy with every rental.",
      image: agribusinessImage,
      alt: "Modern farmer with agricultural transport vehicle"
    }
  ];

  return (
    <section className="py-20 bg-gradient-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h1 mb-6 text-white">
            Built on <span className="text-yellow-300">Trust</span> & <span className="text-yellow-300">Excellence</span>
          </h2>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto">
            Every aspect of MobiRides is designed to give you confidence, from comprehensive coverage to professional support.
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[autoplay]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {trustPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2">
                     <Card className="card-elevated overflow-hidden group hover:shadow-strong transition-all duration-300 h-full">
                       <div className="md:flex h-full">
                         {/* Image */}
                         <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden flex-shrink-0">
                           <img 
                             src={point.image} 
                             alt={point.alt}
                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                           />
                           <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
                         </div>
                         
                         {/* Content */}
                         <CardContent className="md:w-3/5 p-6 lg:p-8 flex flex-col justify-center">
                           <div className="flex items-start mb-4">
                             <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                               <Icon className="w-6 h-6 text-white" />
                             </div>
                             <h3 className="text-lg md:text-xl lg:text-2xl font-semibold leading-tight">{point.title}</h3>
                           </div>
                           <p className="text-body text-muted-foreground leading-relaxed">
                             {point.description}
                           </p>
                         </CardContent>
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: "100+", label: "Happy Customers" },
            { number: "50+", label: "Trusted Vehicles" },
            { number: "99.8%", label: "Reliability Rate" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-black text-yellow-300 mb-2">
                {stat.number}
              </div>
              <div className="text-body text-white/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;