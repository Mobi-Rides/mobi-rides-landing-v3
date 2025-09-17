import React, { useState, useMemo, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone, 
  Info, 
  Car, 
  Truck, 
  MoreVertical, 
  Search, 
  X, 
  SortAsc, 
  SortDesc, 
  Loader2, 
  Heart, 
  Share2, 
  ExternalLink, 
  Star,
  AlertCircle,
  RefreshCw 
} from 'lucide-react';
import locationsData from '../data/locations.json';

interface ServiceArea {
  id: string;
  name: string;
  type: string;
  coordinates: number[];
  coverage: string;
  deliveryFee: number;
  description: string;
  landmarks: string[];
}

interface CoverageMapProps {
  className?: string;
}

interface MapboxMapProps {
  serviceAreas: ServiceArea[];
  selectedArea: ServiceArea | null;
  onAreaSelect: (area: ServiceArea) => void;
  onAreaHover: (areaId: string | null) => void;
  hoveredArea: string | null;
  mapError: string | null;
  setMapError: (error: string | null) => void;
  retryCount: number;
  setRetryCount: (count: number) => void;
  maxRetries: number;
  fallbackStyles: string[];
  mapCenter: [number, number];
}

const CoverageMap: React.FC<CoverageMapProps> = ({ className = '' }) => {
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'coverage' | 'deliveryFee'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [mapError, setMapError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Refresh functionality state
  const [refreshInterval, setRefreshInterval] = useState<number>(30000); // 30 seconds default
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState<boolean>(true);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  
  const MAX_RETRIES = 2;
  const FALLBACK_STYLES = [
    'mapbox://styles/mapbox/light-v11',
    'mapbox://styles/mapbox/streets-v12',
    'mapbox://styles/mapbox/outdoors-v12'
  ];

  const serviceAreas = useMemo(() => locationsData.serviceAreas, []);

  // Computed filtered and sorted areas
  const filteredAndSortedAreas = useMemo(() => {
    const filtered = serviceAreas.filter(area => 
      area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.coverage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'coverage': {
          // Sort by coverage priority: full > limited > basic
          const coveragePriority = { full: 3, limited: 2, basic: 1 };
          aValue = coveragePriority[a.coverage as keyof typeof coveragePriority] || 0;
          bValue = coveragePriority[b.coverage as keyof typeof coveragePriority] || 0;
          break;
        }
        case 'deliveryFee':
          aValue = a.deliveryFee;
          bValue = b.deliveryFee;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

    return filtered;
  }, [serviceAreas, searchTerm, sortBy, sortOrder]);

  // Toggle favorite function
  const toggleFavorite = (areaId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(areaId)) {
        newFavorites.delete(areaId);
      } else {
        newFavorites.add(areaId);
      }
      return newFavorites;
    });
  };

  // Share location function
  const shareLocation = (area: ServiceArea) => {
    const [lat, lng] = area.coordinates;
    const shareData = {
      title: `${area.name} - MobiRides`,
      text: `Check out this location: ${area.name} - ${area.description}`,
      url: `https://maps.google.com/?q=${lat},${lng}`
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(console.error);
    } else {
      // Fallback to copying to clipboard
      const shareText = `${area.name}: ${area.description}\nLocation: https://maps.google.com/?q=${lat},${lng}`;
      navigator.clipboard.writeText(shareText).then(() => {
        // You could add a toast notification here
        console.log('Location copied to clipboard');
      }).catch(console.error);
    }
  };

  // Manual refresh function
  const refreshMapData = async () => {
    if (isRefreshing) return; // Prevent multiple simultaneous refreshes
    
    setIsRefreshing(true);
    setLastRefreshTime(new Date());
    
    try {
      // In a real application, you would fetch fresh data from an API here
      // For now, we'll simulate a refresh by re-triggering marker updates
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Force re-render of markers by updating a dependency
      // This will trigger the marker creation useEffect
      setRetryCount(prev => prev); // Trigger re-render without changing retry count
      
      console.log('Map data refreshed successfully');
    } catch (error) {
      console.error('Failed to refresh map data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Mapbox configuration
  const mapCenter = useMemo(() => [24.6849, -22.3285] as [number, number], []); // Center of Botswana [lng, lat]
  const mapOptions = useMemo(() => ({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: mapCenter,
    zoom: 4,
    attributionControl: false
  }), [mapCenter]);

  const getCoverageColor = (coverage: string) => {
    switch (coverage) {
      case 'full': return 'text-green-500';
      case 'limited': return 'text-yellow-500';
      case 'basic': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const getCoverageIcon = (type: string) => {
    return type === 'city' ? Car : Truck;
  };

  // Mapbox Map Component
  const MapboxMapComponent: React.FC<MapboxMapProps> = ({
    serviceAreas,
    selectedArea,
    onAreaSelect,
    onAreaHover,
    hoveredArea,
    mapError,
    setMapError,
    retryCount,
    setRetryCount,
    maxRetries,
    fallbackStyles,
    mapCenter
  }) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
    const popupRef = useRef<mapboxgl.Popup | null>(null);

    // Initialize map with retry and fallback logic
    const initializeMap = (styleIndex = 0) => {
      if (!mapContainer.current) return;

      const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
      if (!mapboxToken) {
        console.error('Mapbox token is required');
        setMapError('Mapbox token is missing');
        return;
      }

      mapboxgl.accessToken = mapboxToken;
      
      try {
        // Clean up existing map if any
        if (map.current) {
          map.current.remove();
          map.current = null;
        }

        const currentStyle = fallbackStyles[styleIndex] || fallbackStyles[0];
        console.log(`Attempting to load map with style: ${currentStyle} (attempt ${styleIndex + 1})`);

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: currentStyle,
          center: mapCenter,
          zoom: 4,
          attributionControl: false,
          // Add retry and error handling options
          transformRequest: (url, resourceType) => {
            // Add custom headers or modify requests if needed
            if (resourceType === 'Style' && url.startsWith('https://api.mapbox.com/styles/')) {
              return {
                url: url,
                headers: {
                  'Accept': 'application/json',
                  'Cache-Control': 'no-cache'
                }
              };
            }
            return { url };
          }
        });

        map.current.on('load', () => {
          console.log('Map loaded successfully');
          setMapLoaded(true);
          setMapError(null);
        });

        // Add error handling for map loading failures
        map.current.on('error', (e) => {
          console.error('Mapbox error:', e.error);
          
          // Try next fallback style if available
          if (styleIndex < fallbackStyles.length - 1 && retryCount < maxRetries) {
            console.log(`Retrying with fallback style ${styleIndex + 1}`);
            setRetryCount(prev => prev + 1);
            setTimeout(() => initializeMap(styleIndex + 1), 1000);
          } else {
            setMapError(`Failed to load map after ${maxRetries} attempts`);
          }
        });

        // Add style loading error handler
        map.current.on('styleimagemissing', (e) => {
          console.warn('Style image missing:', e.id);
        });

      } catch (error) {
        console.error('Failed to initialize Mapbox map:', error);
        setMapError(`Map initialization failed: ${error}`);
      }
    };

    // Initialize map
    useEffect(() => {
      if (!mapContainer.current || map.current) return;
      initializeMap(0);

      return () => {
        if (map.current) {
          map.current.remove();
        }
      };
    }, []);

    // Create markers when map is ready
    useEffect(() => {
      if (!map.current || !mapLoaded) return;

      // Clear existing markers
      Object.values(markersRef.current).forEach(marker => marker.remove());
      markersRef.current = {};

      // Create new markers
      serviceAreas.forEach(area => {
        const [lat, lng] = area.coordinates.length >= 2 ? area.coordinates : [0, 0];
        
        // Create marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'mapbox-marker';
        const size = area.coverage === 'full' ? 24 : area.coverage === 'limited' ? 20 : 16;
        const color = area.coverage === 'full' ? '#22c55e' : 
                     area.coverage === 'limited' ? '#eab308' : '#f97316';
        
        markerElement.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border: 2px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
        `;

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([lng, lat])
          .addTo(map.current!);

        // Add click event
        markerElement.addEventListener('click', () => {
          onAreaSelect(area);
          
          // Create popup
          if (popupRef.current) {
            popupRef.current.remove();
          }
          
          popupRef.current = new mapboxgl.Popup({ offset: 25 })
            .setLngLat([lng, lat])
            .setHTML(`
              <div class="p-3">
                <h3 class="font-semibold text-gray-900 mb-1">${area.name}</h3>
                <p class="text-sm text-gray-600 mb-2">${area.description}</p>
                <div class="text-sm text-gray-700">
                  <div><strong>Coverage:</strong> ${area.coverage}</div>
                  <div><strong>Delivery Fee:</strong> P${area.deliveryFee}</div>
                </div>
              </div>
            `)
            .addTo(map.current!);
        });

        // Add hover events
        markerElement.addEventListener('mouseenter', () => {
          onAreaHover(area.id);
        });

        markerElement.addEventListener('mouseleave', () => {
          onAreaHover(null);
        });

        markersRef.current[area.id] = marker;
      });
    }, [mapLoaded, serviceAreas, onAreaSelect, onAreaHover]);

    // Update marker styles based on hover/selection
    useEffect(() => {
      Object.entries(markersRef.current).forEach(([areaId, marker]) => {
        const area = serviceAreas.find(a => a.id === areaId);
        if (!area) return;
        
        const isSelected = selectedArea?.id === area.id;
        const isHovered = hoveredArea === area.id;
        
        const markerElement = marker.getElement();
        if (markerElement) {
          const baseSize = area.coverage === 'full' ? 24 : area.coverage === 'limited' ? 20 : 16;
          const size = isSelected || isHovered ? baseSize * 1.2 : baseSize;
          const color = area.coverage === 'full' ? '#22c55e' : 
                       area.coverage === 'limited' ? '#eab308' : '#f97316';
          const opacity = isSelected || isHovered ? '1' : '0.8';
          const borderColor = isSelected ? '#1f2937' : 'white';
          const borderWidth = isSelected || isHovered ? '3px' : '2px';
          
          markerElement.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border: ${borderWidth} solid ${borderColor};
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
            opacity: ${opacity};
            transform: ${isSelected || isHovered ? 'scale(1.1)' : 'scale(1)'};
          `;
        }
      });
    }, [serviceAreas, selectedArea, hoveredArea]);

    // Automatic refresh mechanism
    useEffect(() => {
      if (!autoRefreshEnabled || refreshInterval <= 0) return;

      const intervalId = setInterval(() => {
        refreshMapData();
      }, refreshInterval * 1000);

      return () => clearInterval(intervalId);
    }, [autoRefreshEnabled, refreshInterval]);

    return <div ref={mapContainer} className="w-full h-full rounded-lg" />;
  };

  // Check if we have a valid Mapbox API key
  const apiKey = import.meta.env.VITE_MAPBOX_TOKEN;
  const hasValidApiKey = apiKey && apiKey !== 'your_mapbox_token_here' && apiKey.trim() !== '';

  const renderMap = () => {
    // If no valid API key, show configuration message
    if (!hasValidApiKey) {
      return (
        <div className="flex items-center justify-center h-96 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-center p-6">
            <div className="mb-4">
              <MapPin className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
            </div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Mapbox API Key Required</h3>
            <p className="text-yellow-700 mb-4 max-w-md">
              To display the interactive map, please add your Mapbox API key to the environment variables.
            </p>
            <div className="bg-yellow-100 rounded-lg p-3 text-left">
              <p className="text-sm font-medium text-yellow-800 mb-1">Steps to configure:</p>
              <ol className="text-sm text-yellow-700 space-y-1">
                <li>1. Get a Mapbox API key from Mapbox Studio</li>
                <li>2. Add it to your .env file: VITE_MAPBOX_TOKEN=your_actual_key</li>
                <li>3. Restart the development server</li>
              </ol>
            </div>
          </div>
        </div>
      );
    }

    // If there's a map error, show error message with retry option
    if (mapError) {
      return (
        <div className="flex items-center justify-center h-96 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-center p-6">
            <div className="mb-4">
              <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-2" />
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Map Loading Failed</h3>
            <p className="text-red-700 mb-4 max-w-md">
              {mapError.includes('401') || mapError.includes('Unauthorized') 
                ? 'Invalid or expired Mapbox token. Please check your API key configuration.'
                : mapError.includes('network') || mapError.includes('CORS')
                ? 'Network connectivity issue. Please check your internet connection.'
                : 'Unable to load the map. This might be due to network issues or API limitations.'}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setMapError(null);
                  setRetryCount(0);
                  initializeMap();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              <div className="bg-red-100 rounded-lg p-3 text-left">
                <p className="text-sm font-medium text-red-800 mb-1">Troubleshooting:</p>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Check your internet connection</li>
                  <li>• Verify your Mapbox token is valid</li>
                  <li>• Try refreshing the page</li>
                  <li>• Contact support if the issue persists</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <MapboxMapComponent
        serviceAreas={serviceAreas}
        selectedArea={selectedArea}
        onAreaSelect={setSelectedArea}
        onAreaHover={setHoveredArea}
        hoveredArea={hoveredArea}
        mapError={mapError}
        setMapError={setMapError}
        retryCount={retryCount}
        setRetryCount={setRetryCount}
        maxRetries={MAX_RETRIES}
        fallbackStyles={FALLBACK_STYLES}
        mapCenter={mapCenter}
      />
    );
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Service Coverage Areas</h3>
            <p className="text-gray-600">Explore our vehicle rental locations across Botswana</p>
          </div>
          
          {/* Refresh Controls */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
            {/* Auto-refresh toggle */}
            <div className="flex items-center gap-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefreshEnabled}
                  onChange={(e) => setAutoRefreshEnabled(e.target.checked)}
                  className="sr-only"
                />
                <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  autoRefreshEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}>
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                    autoRefreshEnabled ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </div>
                <span className="ml-2 text-sm text-gray-700">Auto-refresh</span>
              </label>
            </div>
            
            {/* Refresh interval selector */}
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              disabled={!autoRefreshEnabled}
              className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value={15}>15s</option>
              <option value={30}>30s</option>
              <option value={60}>60s</option>
              <option value={120}>120s</option>
            </select>
            
            {/* Manual refresh button */}
            <button
              onClick={refreshMapData}
              disabled={isRefreshing}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
              title="Refresh map data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            
            {/* Last refresh time */}
            {lastRefreshTime && (
              <div className="text-xs text-gray-500">
                Last: {lastRefreshTime.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Interactive Mapbox Map */}
        <div className="lg:col-span-2">
          <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
            {renderMap()}
          </div>
        </div>

        {/* Legend and Info Panel */}
        <div className="space-y-4">
          {/* Coverage Legend */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Coverage Levels
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-700">Full Coverage</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-700">Limited Coverage</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <span className="text-sm text-gray-700">Basic Coverage</span>
              </div>
            </div>
          </div>

          {/* Selected Area Info */}
          {selectedArea && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-blue-900">{selectedArea.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedArea.coverage === 'full' ? 'bg-green-100 text-green-800' :
                  selectedArea.coverage === 'limited' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {selectedArea.coverage} coverage
                </span>
              </div>
              <p className="text-sm text-blue-800 mb-3">{selectedArea.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-900">Delivery Fee: P{selectedArea.deliveryFee}</span>
                </div>
                
                {selectedArea.landmarks.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-blue-900 mb-1">Key Landmarks:</p>
                    <ul className="text-xs text-blue-800 space-y-1">
                      {selectedArea.landmarks.slice(0, 3).map((landmark, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {landmark}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Service Areas List */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Locations ({filteredAndSortedAreas.length})
              </h4>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                aria-label="Toggle search and filters"
              >
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            {/* Search and Filter Controls */}
            <div className={`space-y-3 mb-4 transition-all duration-300 overflow-hidden ${
              showFilters ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Sort Controls */}
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'coverage' | 'deliveryFee')}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Sort by Name</option>
                  <option value="coverage">Sort by Coverage</option>
                  <option value="deliveryFee">Sort by Fee</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                >
                  {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                <span className="ml-2 text-sm text-gray-600">Loading locations...</span>
              </div>
            )}
            
            {/* Locations List */}
            <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
              {filteredAndSortedAreas.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No locations found</p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-blue-600 hover:text-blue-700 text-sm mt-1"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              ) : (
                filteredAndSortedAreas.map((area, index) => {
                  const Icon = getCoverageIcon(area.type);
                  const isFavorite = favorites.has(area.id);
                  const isSelected = selectedArea?.id === area.id;
                  const isHovered = hoveredArea === area.id;
                  
                  return (
                    <div
                      key={area.id}
                      className={`group relative bg-white rounded-lg border transition-all duration-200 hover:shadow-md ${
                        isSelected 
                          ? 'border-blue-300 shadow-md ring-2 ring-blue-100' 
                          : 'border-gray-200 hover:border-gray-300'
                      } ${isHovered ? 'scale-[1.02]' : 'scale-100'}`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <button
                        onClick={() => setSelectedArea(area)}
                        onMouseEnter={() => setHoveredArea(area.id)}
                        onMouseLeave={() => setHoveredArea(null)}
                        className="w-full text-left p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label={`Select ${area.name}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <Icon className={`w-5 h-5 ${getCoverageColor(area.coverage)} transition-transform duration-200 ${
                              isSelected || isHovered ? 'scale-110' : 'scale-100'
                            }`} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 text-sm truncate">{area.name}</p>
                                <p className="text-xs text-gray-600 capitalize mt-0.5">
                                  {area.type} • {area.coverage} coverage
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-1 ml-2">
                                <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                                  P{area.deliveryFee}
                                </span>
                                {isFavorite && (
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                )}
                              </div>
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{area.description}</p>
                            
                            {/* Quick Actions */}
                            <div className={`flex items-center gap-2 mt-2 transition-all duration-200 ${
                              isSelected || isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                            }`}>
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(area.id);
                                }}
                                className={`p-1 rounded-md transition-colors cursor-pointer ${
                                  isFavorite 
                                    ? 'text-yellow-600 hover:text-yellow-700 bg-yellow-50' 
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                }`}
                                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                role="button"
                                tabIndex={0}
                                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleFavorite(area.id);
                                  }
                                }}
                              >
                                <Heart className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
                              </div>
                              
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  shareLocation(area);
                                }}
                                className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                                title="Share location"
                                role="button"
                                tabIndex={0}
                                aria-label="Share location"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    shareLocation(area);
                                  }
                                }}
                              >
                                <Share2 className="w-3 h-3" />
                              </div>
                              
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const [lat, lng] = area.coordinates.length >= 2 ? area.coordinates : [0, 0];
                  window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
                                }}
                                className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                                title="Open in Google Maps"
                                role="button"
                                tabIndex={0}
                                aria-label="Open in Google Maps"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const [lat, lng] = area.coordinates.length >= 2 ? area.coordinates : [0, 0];
                                    window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
                                  }
                                }}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })
              )}
            </div>
            
            {/* Summary Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Showing {filteredAndSortedAreas.length} of {serviceAreas.length} locations</span>
                {favorites.size > 0 && (
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-yellow-500 fill-current" />
                    {favorites.size} favorite{favorites.size !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverageMap;

// Custom CSS styles for enhanced UI
const customStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 #f1f5f9;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out;
  }
  
  .coverage-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .8;
    }
  }
`;

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = customStyles;
  if (!document.head.querySelector('style[data-coverage-map]')) {
    styleElement.setAttribute('data-coverage-map', 'true');
    document.head.appendChild(styleElement);
  }
}