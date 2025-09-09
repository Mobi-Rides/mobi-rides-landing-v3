import { Card } from '@/components/ui/card';
import findYourDriveImage from '@/assets/find-your-drive.jpg';
import bookWithConfidenceImage from '@/assets/book-with-confidence.jpg';
import conciergeServiceImage from '@/assets/concierge-service.jpg';

const HowItWorksSection = () => {
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
            How <span className="gradient-text">MobiRides</span> Works
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Premium car sharing made simple. Three easy steps to unlock mobility across Botswana.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              {/* Step Number */}
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-medium group-hover:shadow-strong transition-all duration-300">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="card-feature group-hover:shadow-medium transition-all duration-300">
                <h3 className="text-h3 mb-4">{step.title}</h3>
                <p className="text-body text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-secondary opacity-30 transform translate-x-1/2"></div>
              )}
            </div>
          ))}
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