import { useState, useCallback, useRef } from 'react';

// Mapbox Geocoding API response types
interface MapboxFeature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Record<string, any>;
  text: string;
  place_name: string;
  center: [number, number];
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  context?: Array<{
    id: string;
    text: string;
    short_code?: string;
  }>;
}

interface MapboxGeocodingResponse {
  type: string;
  query: string[];
  features: MapboxFeature[];
  attribution: string;
}

interface UseMapboxGeocodingReturn {
  suggestions: MapboxFeature[];
  isLoading: boolean;
  error: string | null;
  searchLocation: (query: string) => Promise<void>;
  clearSuggestions: () => void;
}

const useMapboxGeocoding = (): UseMapboxGeocodingReturn => {
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const searchLocation = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new abort controller
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    
    if (!accessToken) {
      setError('Mapbox access token not found');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${accessToken}&autocomplete=true&limit=5&country=bw&types=place,locality,neighborhood,address,poi`;
      
      const response = await fetch(url, {
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MapboxGeocodingResponse = await response.json();
      
      // Only update state if this request wasn't cancelled
      if (!controller.signal.aborted) {
        setSuggestions(data.features || []);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return; // Don't set error for cancelled requests
      }
      if (!controller.signal.aborted) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setError(null);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    suggestions,
    isLoading,
    error,
    searchLocation,
    clearSuggestions,
  };
};

export default useMapboxGeocoding;
export type { MapboxFeature };