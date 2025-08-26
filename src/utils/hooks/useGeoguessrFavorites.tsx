import { useState, useEffect, useCallback } from 'react';
import { projectId, publicAnonKey } from '../supabase/info';

interface GeoguessrFavorite {
  cca3: string;
  is_favorite: boolean;
  coverage: string;
}

interface UseGeoguessrFavoritesReturn {
  favorites: GeoguessrFavorite[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGeoguessrFavorites = (): UseGeoguessrFavoritesReturn => {
  const [favorites, setFavorites] = useState<GeoguessrFavorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Skip fetch if we don't have proper credentials
      if (projectId === 'demo-project' || publicAnonKey === 'demo-key') {
        setFavorites([]);
        return;
      }
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0dd961f1/geoguessr-favorites`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const responseText = await response.text();
        // Don't throw error for missing credentials or table
        if (response.status === 404 || response.status === 401) {
          setFavorites([]);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}. Response: ${responseText}`);
      }

      const data = await response.json();
      
      if (data.error) {
        // Don't throw error for missing table or column issues
        setFavorites([]);
        return;
      }

      const favoritesData = data.favorites || [];
      setFavorites(favoritesData);
    } catch (err) {
      // For now, just set empty array instead of showing error to user
      setFavorites([]);
      setError(null); // Don't show error to user for this optional feature
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const refetch = () => {
    fetchFavorites();
  };

  return { favorites, loading, error, refetch };
};