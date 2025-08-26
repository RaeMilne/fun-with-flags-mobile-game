import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Grid, List } from "lucide-react";
import { Country } from "../../utils/apiService";
import { CountryCard } from "./CountryCard";

interface CountriesDisplayProps {
  filteredCountries: Country[];
  selectedRegion: string;
  showGeoguessrFaves: boolean;
  favoritesLoading: boolean;
  favoritesError: string | null;
  favoritesCount: number;
  searchTerm: string;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  onClearSearch: () => void;
}

export function CountriesDisplay({
  filteredCountries,
  selectedRegion,
  showGeoguessrFaves,
  favoritesLoading,
  favoritesError,
  favoritesCount,
  searchTerm,
  viewMode,
  onViewModeChange,
  onClearSearch
}: CountriesDisplayProps) {
  return (
    <section aria-labelledby="countries-heading">
      <h2 id="countries-heading" className="sr-only">
        Countries in {selectedRegion}
      </h2>
      
      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCountries.length} countries
          {showGeoguessrFaves && !favoritesLoading && !favoritesError && (
            <span className="ml-1 text-amber-600">(Geoguessr Faves)</span>
          )}
        </p>
        <div className="flex gap-1" role="tablist" aria-label="Change view mode">
          <Button
            onClick={() => onViewModeChange("grid")}
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            aria-selected={viewMode === "grid"}
            aria-label="Grid view"
          >
            <Grid className="w-4 h-4" aria-hidden="true" />
          </Button>
          <Button
            onClick={() => onViewModeChange("list")}
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            aria-selected={viewMode === "list"}
            aria-label="List view"
          >
            <List className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
      
      <div 
        id="country-list"
        className={
          viewMode === "grid" 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-3" 
            : "space-y-3"
        }
        role="region"
        aria-live="polite"
        aria-label={`${filteredCountries.length} countries displayed`}
      >
        {filteredCountries.length === 0 ? (
          <Card className="col-span-full p-8 text-center bg-white/60">
            <div className="text-4xl mb-4" role="img" aria-label="No results emoji">🔍</div>
            <h3 className="text-lg font-medium mb-2">No countries found</h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? `No countries match "${searchTerm}"${showGeoguessrFaves ? ' in your Geoguessr favorites' : ` in ${selectedRegion}`}.`
                : showGeoguessrFaves 
                  ? favoritesError
                    ? 'Unable to load Geoguessr favorites. Please check your Supabase configuration.'
                    : favoritesLoading
                      ? 'Loading Geoguessr favorites...'
                      : favoritesCount === 0
                        ? 'No countries are marked as Geoguessr favorites with full coverage in your database.'
                        : `No Geoguessr favorite countries match the current filters${selectedRegion !== 'All Countries' ? ` for ${selectedRegion}` : ''}.`
                  : `No countries available for ${selectedRegion}.`
              }
            </p>
            {searchTerm && (
              <Button 
                onClick={onClearSearch}
                variant="outline" 
                className="mt-4"
              >
                Clear Search
              </Button>
            )}
          </Card>
        ) : (
          filteredCountries.map((country, index) => (
            <CountryCard 
              key={country.name}
              country={country}
              index={index}
              viewMode={viewMode}
            />
          ))
        )}
      </div>
    </section>
  );
}