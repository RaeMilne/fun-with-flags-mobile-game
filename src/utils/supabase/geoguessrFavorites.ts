import { supabase } from './client';

export interface GeoguessrFavorite {
  cca3: string;
  is_favorite: boolean;
  coverage: string;
}

export async function getGeoguessrFavorites(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('geoguessr_favorites')
      .select('cca3')
      .eq('is_favorite', 'TRUE')  // Changed from true to 'TRUE'
      .eq('coverage', 'full');    // Changed from 'FULL' to 'full'

    if (error) {
      console.error('Error fetching Geoguessr favorites:', error);
      return [];
    }

    // Extract the cca3 codes from the results
    const favoriteCodes = data?.map(item => item.cca3) || [];
    console.log('Fetched Geoguessr favorites:', favoriteCodes);
    
    return favoriteCodes;
  } catch (err) {
    console.error('Unexpected error fetching Geoguessr favorites:', err);
    return [];
  }
}
