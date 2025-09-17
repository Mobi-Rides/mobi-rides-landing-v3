import React, { useState, useMemo } from 'react';
import { PageLayout, PageHero, SectionWrapper, CTASection } from '../components/layouts';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Search, Filter, MapPin, Users, Fuel, Calendar, Phone, Heart, Star } from 'lucide-react';
import { useCars, CarsFilters } from '../hooks/useCars';
import { Car } from '../lib/supabase';
import { CarCard } from '../components/CarCard';
import pricingData from '../data/pricing.json';
import locationsData from '../data/locations.json';
import CoverageMap from '../components/CoverageMap';



const FindRidePage: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('price');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch cars from Supabase
  const filters: CarsFilters = {
    vehicleType: selectedCategory === 'all' ? undefined : selectedCategory,
    available: true
  };
  
  const { cars: vehicles = [], loading: isLoading, error, hasMore, loadMore } = useCars(filters);
  const categories = ['all', ...new Set(vehicles.map(v => v.vehicle_type))];

  const filteredVehicles = useMemo(() => {
    const filtered = vehicles.filter(vehicle => {
      const matchesCategory = selectedCategory === 'all' || vehicle.vehicle_type === selectedCategory;
      const matchesLocation = searchLocation === '' || 
        locationsData.serviceAreas.some(area => 
          area.name.toLowerCase().includes(searchLocation.toLowerCase())
        ) || vehicle.location?.toLowerCase().includes(searchLocation.toLowerCase());
      
      let matchesPrice = true;
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        matchesPrice = vehicle.price_per_day >= min && (max ? vehicle.price_per_day <= max : true);
      }
      
      return matchesCategory && matchesLocation && matchesPrice;
    });

    // Sort vehicles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price_per_day - b.price_per_day;
        case 'rating':
          // Since rating is not in the Car interface, use a default or remove this sort option
          return 0;
        case 'name':
          return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`);
        default:
          return 0;
      }
    });

    return filtered;
  }, [vehicles, selectedCategory, searchLocation, priceRange, sortBy]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Find a Ride - Car Rental in Botswana",
    "description": "Browse and book from our fleet of rental cars in Botswana. Economy, luxury, and commercial vehicles available with transparent pricing.",
    "url": "https://app.mobirides.com/find-ride",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": vehicles.length,
      "itemListElement": vehicles.slice(0, 5).map((vehicle, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": `${vehicle.brand} ${vehicle.model}`,
        "description": vehicle.description || `${vehicle.year} ${vehicle.brand} ${vehicle.model}`,
        "offers": {
          "@type": "Offer",
          "price": vehicle.price_per_day,
          "priceCurrency": "BWP",
          "availability": vehicle.is_available ? "InStock" : "OutOfStock"
        }
      }))
    }
  };

  return (
    <PageLayout
      title="Find a Ride - Car Rental in Botswana | Mobirides"
      description="Browse and book from our fleet of rental cars in Botswana. Economy, luxury, and commercial vehicles available with transparent pricing and 24/7 support."
      canonical="https://app.mobirides.com/find-ride"
      jsonLd={jsonLd}
    >
      <PageHero
        title="Find Your Perfect Ride"
        subtitle="Car Rental"
        description="Choose from our diverse fleet of well-maintained vehicles. From economy cars for city trips to 4x4s for safari adventures."
        backgroundImage="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20car%20rental%20fleet%20in%20botswana%20landscape%20with%20acacia%20trees%20professional%20photography&image_size=landscape_16_9"
      />

      <SectionWrapper background="white" padding="medium">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by location (e.g., Gaborone, Maun)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto w-full"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category === 'all' ? 'All Categories' : category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price Range (per day)</label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="0-500">P0 - P500</SelectItem>
                        <SelectItem value="500-1000">P500 - P1,000</SelectItem>
                        <SelectItem value="1000-2000">P1,000 - P2,000</SelectItem>
                        <SelectItem value="2000">P2,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price">Price (Low to High)</SelectItem>
                        <SelectItem value="rating">Rating (High to Low)</SelectItem>
                        <SelectItem value="name">Name (A to Z)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredVehicles.length} of {vehicles.length} vehicles
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            {searchLocation && ` near ${searchLocation}`}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading vehicles...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error loading vehicles
            </h3>
            <p className="text-gray-600 mb-4">
              {error || 'Something went wrong. Please try again later.'}
            </p>
          </div>
        )}

        {/* Vehicle Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle) => (
              <CarCard 
                key={vehicle.id} 
                car={vehicle} 
                onClick={() => {
                  // Navigate to specific car details page
                  window.open(`https://app.mobirides.com/cars/${vehicle.id}`, '_blank');
                }}
              />
            ))}
          </div>
        )}
        
        {/* Load More Button */}
        {!isLoading && filteredVehicles.length > 0 && hasMore && (
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8"
              onClick={loadMore}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load More Vehicles'}
            </Button>
          </div>
        )}
        
        {!isLoading && !error && filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No vehicles found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange('all');
                setSearchLocation('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </SectionWrapper>

      {/* Pricing Transparency Section */}
      <SectionWrapper background="gray" padding="medium">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Transparent Pricing, No Hidden Fees
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our pricing is straightforward and honest. Here's exactly what you'll pay:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(pricingData.fees).map((fee, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{fee.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {'amount' in fee ? `P${fee.amount}` : 
                   'rate' in fee ? `${(fee.rate * 100)}%` : 
                   'withinGaborone' in fee ? `P${fee.withinGaborone} - P${fee.outsideGaborone}` : 
                   'Free'}
                </div>
                <p className="text-sm text-gray-600">{fee.description}</p>
                {'mandatory' in fee && fee.mandatory && (
                  <p className="text-xs text-blue-600 mt-2">✓ Mandatory</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            Our Guarantee
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            {pricingData.guarantees.map((guarantee, index) => (
              <li key={index}>✓ {guarantee}</li>
            ))}
          </ul>
        </div>
      </SectionWrapper>

      {/* Coverage Map Section */}
      <SectionWrapper background="white" padding="medium">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Service Coverage Across Botswana
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We deliver to major cities and tourist destinations throughout Botswana
          </p>
        </div>
        
        <CoverageMap />
      </SectionWrapper>

      <CTASection
        title="Ready to Book Your Perfect Ride?"
        description="Join thousands of satisfied customers who trust Mobirides for their transportation needs in Botswana."
        actions={[
          {
            text: "Start Booking",
            href: "https://app.mobirides.com",
            variant: "primary"
          },
          {
            text: "Call Us Now",
            href: "tel:+2671234567",
            variant: "secondary",
            icon: <Phone className="w-4 h-4" />
          }
        ]}
      />
    </PageLayout>
  );
};

export default FindRidePage;