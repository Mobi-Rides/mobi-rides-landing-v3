import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import findYourDriveImage from '@/assets/find-your-drive.jpg';
import bookWithConfidenceImage from '@/assets/book-with-confidence.jpg';
import conciergeServiceImage from '@/assets/concierge-service.jpg';

const HowItWorksSection = () => {
  const autoplay = Autoplay({
    delay: 5500,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
  });

  const steps = [
    {
      title: "Find Your Drive",
      description: "Browse our curated fleet of premium vehicles from trusted local owners across Botswana.",
      image: findYourDriveImage
    },
    {
      title: "Book with Confidence", 
      description: "Secure booking with comprehensive insurance coverage and transparent pricing.",
      image: bookWithConfidenceImage
    },
    {
      title: "Enjoy Concierge Service",
      description: "Professional handover with 24/7 support throughout your journey.",
      image: conciergeServiceImage
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h1 mb-6">
            How <span className="text-primary">MobiRides</span> Works
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Premium car sharing made simple. Three easy steps to unlock mobility across Botswana.
          </p>
        </div>

        <div className="relative max-w-lg mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[autoplay]}
            className="w-full"
          >
            <CarouselContent>
              {steps.map((step, index) => (
                <CarouselItem key={index}>
                  <div className="text-center group px-4">
                    {/* Step Number */}
                    <div className="relative mb-8">
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-medium group-hover:shadow-strong transition-all duration-300">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute -top-2 -right-4 w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="card-feature group-hover:shadow-medium transition-all duration-300">
                      <h3 className="text-h2 mb-6">{step.title}</h3>
                      <p className="text-body-lg text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="absolute -left-16 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute -right-16 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-body-lg text-muted-foreground mb-6">
            Ready to experience premium mobility?
          </p>
          <button className="btn-hero text-lg px-8 py-4">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;