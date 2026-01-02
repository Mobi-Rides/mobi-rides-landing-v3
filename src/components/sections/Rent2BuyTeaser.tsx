import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Key, TrendingUp, Shield, ArrowRight } from 'lucide-react';

const Rent2BuyTeaser = () => {
  const benefits = [
    {
      icon: Key,
      title: 'Own Your Vehicle',
      description: 'Every payment builds equity toward ownership',
    },
    {
      icon: TrendingUp,
      title: 'Build Wealth',
      description: 'No traditional bank loans required',
    },
    {
      icon: Shield,
      title: 'Flexible Terms',
      description: 'Choose weekly, monthly, or quarterly plans',
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Rent-to-Buy Program
              </span>
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                Launching Q2 2026
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Own Your Dream Car with <span className="text-primary">Rent2Buy</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Rent now, own later. Our unique program lets you build equity with every rental payment through partnerships with Motshelo groups and private financing. 
              Perfect for entrepreneurs, families, and professionals who want vehicle ownership without traditional bank loans.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button size="lg" asChild>
              <Link to="/rent2buy">
                Learn More About Rent2Buy
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white">
              <div className="text-center">
                <p className="text-sm uppercase tracking-wider mb-2 opacity-80">Starting from</p>
                <p className="text-5xl md:text-6xl font-bold mb-2">P2,200</p>
                <p className="text-lg opacity-90 mb-6">per month</p>
                
                <div className="border-t border-white/20 pt-6 mt-6">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-2xl font-bold">6-24</p>
                      <p className="text-sm opacity-80">Month Terms</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">4</p>
                      <p className="text-sm opacity-80">Vehicle Categories</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-primary/20 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rent2BuyTeaser;