import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import pickupTruckImage from '@/assets/pickup-truck.jpg';
import commercialVanImage from '@/assets/commercial-van.jpg';
import familySedanImage from '@/assets/family-sedan.jpg';
import luxurySuvImage from '@/assets/luxury-suv.jpg';

const CarsSection = () => {
  const autoplay = Autoplay({
    delay: 4000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
  });

  const categories = [
    {
      title: "Pickup",
      description: "For the site, farm, or safari",
      image: pickupTruckImage,
      popular: true
    },
    {
      title: "Commercial", 
      description: "For business and cargo needs",
      image: commercialVanImage
    },
    {
      title: "Family car",
      description: "Perfect for daily commutes and trips",
      image: familySedanImage
    },
    {
      title: "SUV",
      description: "Adventure-ready vehicles", 
      image: luxurySuvImage
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            Cars for your every need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From rugged pickups to luxury sedans, find the perfect vehicle for every occasion in Botswana.
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
              {categories.map((category, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="group cursor-pointer">
                    {/* Image Container */}
                    <div className="relative overflow-hidden rounded-3xl mb-6 bg-gray-100">
                      <img 
                        src={category.image}
                        alt={category.title}
                        className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                    </div>
                    
                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>

        {/* Popular Routes - Keep existing */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-h2 text-center mb-8">Popular Routes</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { route: "Gaborone → Maun", type: "Safari Adventure", distance: "550km" },
              { route: "Francistown → Kasane", type: "Business Trip", distance: "850km" },
              { route: "Gaborone → Jwaneng", type: "Mining Sector", distance: "160km" }
            ].map((route, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{route.route}</span>
                  <span className="text-sm text-gray-500">{route.distance}</span>
                </div>
                <p className="text-sm text-primary font-medium">{route.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarsSection;