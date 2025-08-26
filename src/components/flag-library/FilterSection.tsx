import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import Switch from "../ui/switch";
import { Separator } from "../ui/separator";
import { regions, getRegionEmoji } from "../../utils/flagLibraryConstants";

interface FilterSectionProps {
  searchTerm: string;
  selectedRegion: string;
  showGeoguessrFaves: boolean;
  filteredCountriesCount: number;
  favoritesLoading: boolean;
  favoritesError: string | null;
  favoritesCount: number;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRegionChange: (region: string) => void;
  onGeoguessrToggle: (checked: boolean) => void;
  onClearSearch: () => void;
  searchRef: React.RefObject<HTMLInputElement>;
}

export default function FilterSection({
  searchTerm,
  selectedRegion,
  showGeoguessrFaves,
  filteredCountriesCount,
  favoritesLoading,
  favoritesError,
  favoritesCount,
  onSearchChange,
  onRegionChange,
  onGeoguessrToggle,
  onClearSearch,
  searchRef
}: FilterSectionProps) {
  return (
    <section aria-labelledby="filters-heading">
      <h2 id="filters-heading" className="sr-only">Search and Filter Options</h2>
      
      <div className="p-6 md:p-4 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg rounded-lg">
        <div className="space-y-6">
          
          {/* Search */}
          <div className="relative">
            <Label htmlFor="flag-search" className="sr-only">
              Search countries by name
            </Label>
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              ref={searchRef}
              id="flag-search"
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={onSearchChange}
              className="pl-10 h-12 text-lg md:text-base border-2 focus:border-blue-500"
              aria-describedby="search-help"
            />
            <p id="search-help" className="sr-only">
              Type to filter countries by name. {filteredCountriesCount} countries currently shown.
            </p>
            {searchTerm && (
              <Button
                onClick={onClearSearch}
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-100"
                aria-label="Clear search"
              >
                ✕
              </Button>
            )}
          </div>

          <Separator className="bg-gray-200" />

          {/* Region Filter */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-gray-700">Filter by Region</h3>
            <div 
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filter countries by geographic region"
            >
              {regions.map((region) => (
                <Button
                  key={region}
                  onClick={() => onRegionChange(region)}
                  variant="outline"
                  size="sm"
                  className="text-sm border-2"
                  style={{
                    backgroundColor: selectedRegion === region ? '#000000' : undefined,
                    color: selectedRegion === region ? '#ffffff' : undefined,
                    borderColor: selectedRegion === region ? '#000000' : '#d1d5db',
                    boxShadow: selectedRegion === region ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : undefined
                  }}
                  role="tab"
                  aria-selected={selectedRegion === region}
                  aria-controls="country-list"
                >
                  <span className="mr-1" role="img" aria-label={`${region} emoji`}>
                    {getRegionEmoji(region)}
                  </span>
                  {region}
                </Button>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-200" />

          {/* Geoguessr Favorites Toggle */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Switch
              id="geoguessr-toggle"
              checked={showGeoguessrFaves}
              onCheckedChange={onGeoguessrToggle}
              disabled={favoritesLoading || !!favoritesError}
              aria-describedby="geoguessr-toggle-description"
            />
            <div className="flex-1">
              <Label htmlFor="geoguessr-toggle" className="text-sm font-medium cursor-pointer text-gray-700">
                Show Geoguessr Favorites
              </Label>
              <p className="text-xs text-gray-500 mt-1">
                {favoritesLoading ? "Loading favorites..." : 
                 favoritesError ? "Error loading favorites" :
                 `${favoritesCount} favorites available`}
              </p>
            </div>
            <p id="geoguessr-toggle-description" className="sr-only">
              Toggle to show only countries marked as favorites in Geoguessr with full coverage. 
              {favoritesLoading ? "Loading favorites data." : 
               favoritesError ? "Error loading favorites data." :
               `${favoritesCount} favorites available.`}
            </p>
          </div>
          
          {favoritesError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                Unable to load Geoguessr favorites: {favoritesError}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}