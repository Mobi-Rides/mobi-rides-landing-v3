import { useState, useEffect, useCallback } from 'react';
import { supabase, Car } from '../lib/supabase';
import { toast } from 'sonner';

export interface CarsFilters {
  vehicleType?: string;
  priceRange?: [number, number];
  searchTerm?: string;
  available?: boolean;
}

export interface CarsResult {
  cars: Car[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refetch: () => Promise<void>;
}

const ITEMS_PER_PAGE = 10;

export const useCars = (filters?: CarsFilters): CarsResult => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const fetchCars = useCallback(async (pageNum: number = 0, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('cars')
        .select('*')
        .eq('is_available', true) // Only fetch available cars
        .order('created_at', { ascending: false })
        .range(pageNum * ITEMS_PER_PAGE, (pageNum + 1) * ITEMS_PER_PAGE - 1);

      // Apply filters
      if (filters?.vehicleType && filters.vehicleType !== 'all') {
        query = query.eq('vehicle_type', filters.vehicleType);
      }

      if (filters?.priceRange) {
        query = query
          .gte('price_per_day', filters.priceRange[0])
          .lte('price_per_day', filters.priceRange[1]);
      }

      if (filters?.searchTerm) {
        query = query.or(
          `brand.ilike.%${filters.searchTerm}%,model.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`
        );
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching cars:', error);
        setError(`Failed to fetch cars: ${error.message}`);
        toast.error('Failed to load cars. Please try again.');
        return;
      }

      const newCars = data || [];
      
      if (append) {
        setCars(prev => [...prev, ...newCars]);
      } else {
        setCars(newCars);
      }

      setHasMore(newCars.length === ITEMS_PER_PAGE);
      setPage(pageNum);
    } catch (err) {
      console.error('Unexpected error fetching cars:', err);
      setError('An unexpected error occurred');
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [filters?.vehicleType, filters?.priceRange, filters?.searchTerm]);

  const loadMore = async () => {
    if (!loading && hasMore) {
      await fetchCars(page + 1, true);
    }
  };

  const refetch = async () => {
    setPage(0);
    await fetchCars(0, false);
  };

  useEffect(() => {
    fetchCars(0, false);
  }, [fetchCars]);

  return {
    cars,
    loading,
    error,
    hasMore,
    loadMore,
    refetch
  };
};

export const useCarById = (id: string) => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchCar = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            setCar(null);
            return;
          }
          console.error('Error fetching car:', error);
          setError(`Failed to fetch car: ${error.message}`);
          toast.error('Failed to load car details.');
          return;
        }

        setCar(data);
      } catch (err) {
        console.error('Unexpected error fetching car:', err);
        setError('An unexpected error occurred');
        toast.error('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  return { car, loading, error };
};