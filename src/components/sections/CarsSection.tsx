import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Car, Crown, MapPin } from 'lucide-react';

const CarsSection = () => {
  const categories = [
    {
      icon: Truck,
      name: "Bakkies",
      description: "For the site, farm, or safari",
      features: ["4WD Capability", "Cargo Space", "Rugged Build"],
      price: "From P350/day",
      gradient: "from-secondary to-secondary-light"
    },
    {
      icon: Car,
      name: "SUVs", 
      description: "For business trips or family adventures",
      features: ["7-Seater Options", "Comfort Features", "All-Terrain"],
      price: "From P450/day",
      gradient: "from-primary to-primary-light"
    },
    {
      icon: Crown,
      name: "Luxe",
      description: "Arrive in style",
      features: ["Premium Interiors", "Latest Tech", "Concierge Service"],
      price: "From P750/day",
      gradient: "from-gray-700 to-gray-900"
    },
    {
      icon: MapPin,
      name: "City Cars",
      description: "For efficient urban commutes",
      features: ["Fuel Efficient", "Easy Parking", "Perfect for CBD"],
      price: "From P250/day",
      gradient: "from-secondary-light to-primary-light"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h1 mb-6">
            Cars for Your <span className="gradient-text">Every Need</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            From rugged bakkies to luxury sedans, find the perfect vehicle for every occasion in Botswana.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="card-elevated group hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className={`h-32 bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                  <Icon className="w-12 h-12 text-white" />
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-h3 mb-2">{category.name}</h3>
                  <p className="text-body text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {category.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {category.price}
                    </span>
                    <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                      Browse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Popular Routes */}
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