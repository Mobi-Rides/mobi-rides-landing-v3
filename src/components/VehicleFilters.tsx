import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Fuel, 
  Settings, 
  X,
  Filter
} from 'lucide-react';

export interface VehicleFilters {
  search: string;
  category: string;
  location: string;
  pickupDate: string;
  returnDate: string;
  passengers: string;
  priceRange: [number, number];
  features: string[];
  fuelType: string;
  transmission: string;
}

interface VehicleFiltersProps {
  filters: VehicleFilters;
  onFiltersChange: (filters: VehicleFilters) => void;
  onClearFilters: () => void;
  className?: string;
}

const VehicleFiltersComponent: React.FC<VehicleFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  className = ''
}) => {
  const updateFilter = (key: keyof VehicleFilters, value: string | string[] | [number, number]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleFeature = (feature: string) => {
    const updatedFeatures = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature];
    updateFilter('features', updatedFeatures);
  };

  const availableFeatures = [
    'Air Conditioning',
    'GPS Navigation',
    'Bluetooth',
    'USB Charging',
    'Backup Camera',
    'Sunroof',
    'Leather Seats',
    'All-Wheel Drive',
    'Cruise Control',
    'Heated Seats'
  ];

  const locations = [
    'Gaborone',
    'Francistown',
    'Maun',
    'Kasane',
    'Palapye',
    'Serowe',
    'Lobatse',
    'Jwaneng'
  ];

  const hasActiveFilters = () => {
    return (
      filters.search ||
      filters.category !== 'all' ||
      filters.location !== 'all' ||
      filters.pickupDate ||
      filters.returnDate ||
      filters.passengers !== 'any' ||
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < 2000 ||
      filters.features.length > 0 ||
      filters.fuelType !== 'any' ||
      filters.transmission !== 'any'
    );
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search & Filters
          </CardTitle>
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="flex items-center gap-2 mb-2">
            <Search className="w-4 h-4" />
            Search Vehicles
          </Label>
          <Input
            id="search"
            placeholder="Search by make, model, or features..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
          />
        </div>

        {/* Location & Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="location" className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4" />
              Pickup Location
            </Label>
            <Select value={filters.location} onValueChange={(value) => updateFilter('location', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location.toLowerCase()}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="pickupDate" className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4" />
              Pickup Date
            </Label>
            <Input
              id="pickupDate"
              type="date"
              value={filters.pickupDate}
              onChange={(e) => updateFilter('pickupDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div>
            <Label htmlFor="returnDate" className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4" />
              Return Date
            </Label>
            <Input
              id="returnDate"
              type="date"
              value={filters.returnDate}
              onChange={(e) => updateFilter('returnDate', e.target.value)}
              min={filters.pickupDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Category & Passengers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category" className="mb-2 block">
              Vehicle Category
            </Label>
            <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="midsize">Midsize</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="pickup">Pickup Truck</SelectItem>
                <SelectItem value="van">Van/Minibus</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="passengers" className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4" />
              Passengers
            </Label>
            <Select value={filters.passengers} onValueChange={(value) => updateFilter('passengers', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Number of passengers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="2">2 passengers</SelectItem>
                <SelectItem value="4">4 passengers</SelectItem>
                <SelectItem value="5">5 passengers</SelectItem>
                <SelectItem value="7">7 passengers</SelectItem>
                <SelectItem value="8+">8+ passengers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <Label className="mb-4 block">
            Price Range (BWP per day)
          </Label>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
              max={2000}
              min={0}
              step={50}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>BWP {filters.priceRange[0]}</span>
              <span>BWP {filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Fuel Type & Transmission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fuelType" className="flex items-center gap-2 mb-2">
              <Fuel className="w-4 h-4" />
              Fuel Type
            </Label>
            <Select value={filters.fuelType} onValueChange={(value) => updateFilter('fuelType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="transmission" className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4" />
              Transmission
            </Label>
            <Select value={filters.transmission} onValueChange={(value) => updateFilter('transmission', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select transmission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="automatic">Automatic</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Features */}
        <div>
          <Label className="mb-3 block">
            Features & Amenities
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {availableFeatures.map(feature => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature}
                  checked={filters.features.includes(feature)}
                  onCheckedChange={() => toggleFeature(feature)}
                />
                <Label htmlFor={feature} className="text-sm cursor-pointer">
                  {feature}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters() && (
          <div className="pt-4 border-t">
            <Label className="mb-2 block text-sm font-medium">
              Active Filters
            </Label>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {filters.search}
                  <button onClick={() => updateFilter('search', '')} className="ml-1 hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.category !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {filters.category}
                  <button onClick={() => updateFilter('category', 'all')} className="ml-1 hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.location !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Location: {filters.location}
                  <button onClick={() => updateFilter('location', 'all')} className="ml-1 hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.features.length > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.features.length} Features
                  <button onClick={() => updateFilter('features', [])} className="ml-1 hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  BWP {filters.priceRange[0]} - {filters.priceRange[1]}
                  <button onClick={() => updateFilter('priceRange', [0, 2000])} className="ml-1 hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VehicleFiltersComponent;