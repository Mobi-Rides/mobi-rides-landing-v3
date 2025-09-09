import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Kgosi Molapisi",
      role: "Mining Operations Manager",
      company: "Debswana Diamond Company",
      content: "MobiRides has transformed how our team moves between sites. The reliability is unmatched, and the 4WD options are perfect for our operations.",
      rating: 5,
      avatar: "/api/placeholder/80/80"
    },
    {
      name: "Thandiwe Sebego", 
      role: "Tourism Director",
      company: "Okavango Safaris",
      content: "Our clients expect luxury, and MobiRides delivers. The premium vehicles and professional service make every safari transfer seamless.",
      rating: 5,
      avatar: "/api/placeholder/80/80"
    },
    {
      name: "Motlalepula Tshosa",
      role: "Agricultural Entrepreneur", 
      company: "Botswana Beef Exports",
      content: "From farm to market, MobiRides provides reliable transport solutions. The bakkies are perfect for our agricultural operations across the country.",
      rating: 5,
      avatar: "/api/placeholder/80/80"
    },
    {
      name: "David Makgato",
      role: "Senior Consultant",
      company: "PwC Botswana",
      content: "As a consultant traveling between Gaborone and Francistown weekly, MobiRides gives me the flexibility and professionalism I need.",
      rating: 5,
      avatar: "/api/placeholder/80/80"
    },
    {
      name: "Lesego Ramotswana",
      role: "Creative Director",
      company: "Mindset Media",
      content: "The booking process is so smooth, and the variety of vehicles means I always find the perfect ride for client meetings across Botswana.",
      rating: 5,
      avatar: "/api/placeholder/80/80"
    },
    {
      name: "Bogosi Molotsi",
      role: "Regional Manager",
      company: "Orange Botswana",
      content: "MobiRides understands business needs. The transparent pricing and reliable service have made them our go-to for corporate transportation.",
      rating: 5,
      avatar: "/api/placeholder/80/80"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h1 mb-6">
            Hear From Our <span className="gradient-text">Community</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who trust MobiRides for their mobility needs across Botswana.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-elevated group hover:shadow-strong transition-all duration-300 relative">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute -top-4 left-6">
                  <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4 pt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-body text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-sm font-medium">Trusted by leading companies in:</div>
            <div className="flex flex-wrap gap-6">
              <span className="text-sm">Mining</span>
              <span className="text-sm">•</span>
              <span className="text-sm">Tourism</span>
              <span className="text-sm">•</span>
              <span className="text-sm">Agriculture</span>
              <span className="text-sm">•</span>
              <span className="text-sm">Professional Services</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;