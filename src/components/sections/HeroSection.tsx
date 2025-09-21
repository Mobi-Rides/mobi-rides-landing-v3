import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MapPin, Calendar, Search, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import useMapboxGeocoding, { MapboxFeature } from '@/hooks/useMapboxGeocoding';
import heroImage from '@/assets/hero-professional.jpg';
const HeroSection = () => {
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<MapboxFeature | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Date state management
  const [pickupDate, setPickupDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [returnDate, setReturnDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [dateError, setDateError] = useState('');
  const { suggestions, isLoading, error, searchLocation, clearSuggestions } = useMapboxGeocoding();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Show suggestions when they are available
  useEffect(() => {
    if (suggestions.length > 0 && locationQuery.length >= 3) {
      setShowSuggestions(true);
    }
  }, [suggestions, locationQuery]);

  // Handle input change and trigger search
  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationQuery(value);
    
    if (value.length >= 3) {
      searchLocation(value);
      setShowSuggestions(true);
    } else {
      clearSuggestions();
      setShowSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: MapboxFeature) => {
    setLocationQuery(suggestion.place_name);
    setSelectedLocation(suggestion);
    setShowSuggestions(false);
    clearSuggestions();
  };

  // Handle date changes with validation
  const handlePickupDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPickupDate = e.target.value;
    setPickupDate(newPickupDate);
    
    // Validate that return date is after pickup date
    if (returnDate && newPickupDate >= returnDate) {
      const nextDay = new Date(newPickupDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setReturnDate(nextDay.toISOString().split('T')[0]);
    }
    setDateError('');
  };

  const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newReturnDate = e.target.value;
    
    if (newReturnDate <= pickupDate) {
      setDateError('Return date must be after pickup date');
      return;
    }
    
    setReturnDate(newReturnDate);
    setDateError('');
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Professional stepping out of premium vehicle in Gaborone CBD" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Rentals For You<br />
              <span className="gradient-text-light">By You</span>
            </h1>
            <p className="text-xl mb-8 font-light text-white">
              Search it, Tap it, Like it, Drive it!
            </p>
            
            {/* Mobile App Badge */}
            <div className="mb-8">
              <p className="text-sm mb-4 text-white">Car rental by locals with trip liability insurance included</p>
            </div>
          </div>

          {/* Search Component */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="space-y-6">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                {isLoading && (
                  <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin z-10" />
                )}
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="Specific address, station, suburb..." 
                  value={locationQuery}
                  onChange={handleLocationInputChange}
                  
                  className="w-full pl-12 pr-12 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50 relative z-0" 
                />
                
                {/* Autocomplete Suggestions Dropdown */}
                {showSuggestions && (suggestions.length > 0 || error) && (
                  <div 
                    ref={suggestionsRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto z-50"
                  >
                    {error && (
                      <div className="p-4 text-red-500 text-sm">
                        {error}
                      </div>
                    )}
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSuggestionSelect(suggestion)}
                        className="w-full text-left p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
                      >
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {suggestion.text}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {suggestion.place_name}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                  <input 
                    type="date" 
                    value={pickupDate}
                    onChange={handlePickupDateChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                  <input 
                    type="date" 
                    value={returnDate}
                    onChange={handleReturnDateChange}
                    min={pickupDate}
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
                  />
                </div>
              </div>
              
              {dateError && (
                <div className="text-red-500 text-sm mt-2">
                  {dateError}
                </div>
              )}
              
              <a 
                href="https://app.mobirides.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-gradient-hero text-white py-4 px-8 text-xl font-bold rounded-2xl shadow-strong hover:shadow-glow transition-all duration-300 transform hover:scale-[1.02] block text-center"
              >
                Search
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>;
};
export default HeroSection;