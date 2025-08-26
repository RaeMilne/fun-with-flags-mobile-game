import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Country,
  getCountriesByRegion,
} from "../utils/apiService";
import { getGeoguessrFavorites } from "../utils/supabase/geoguessrFavorites";
import FilterSection from "./flag-library/FilterSection";
import { CountriesDisplay } from "./flag-library/CountriesDisplay";

interface FlagLibraryScreenProps {
  countries: Country[];
  onBack: () => void;
}

export default function FlagLibraryScreen({
  countries,
  onBack,
}: FlagLibraryScreenProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] =
    useState("All Countries");
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    "grid",
  );
  const [filteredCountries, setFilteredCountries] = useState<
    Country[]
  >([]);
  const [showGeoguessrFaves, setShowGeoguessrFaves] =
    useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const [geoguessrFavorites, setGeoguessrFavorites] = useState<string[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const [favoritesError, setFavoritesError] = useState<string | null>(null);
  
  // Fetch Geoguessr favorites when component mounts
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setFavoritesLoading(true);
        setFavoritesError(null);
        const favorites = await getGeoguessrFavorites();
        setGeoguessrFavorites(favorites);
        console.log('Loaded Geoguessr favorites:', favorites);
      } catch (err) {
        console.error('Error fetching Geoguessr favorites:', err);
        setFavoritesError('Failed to load favorites');
      } finally {
        setFavoritesLoading(false);
      }
    };
  
    fetchFavorites();
  }, []);
  useEffect(() => {
    // Focus the main heading when component mounts
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Focus the main heading when component mounts
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let filtered = getCountriesByRegion(
      countries,
      selectedRegion,
    );

    if (searchTerm) {
      filtered = filtered.filter((country) =>
        country.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      );
    }

    // Apply Geoguessr favorites filter
    if (showGeoguessrFaves) {
      console.log("Applying Geoguessr favorites filter...");
              console.log(
          "Available favorites:",
          geoguessrFavorites.map((cca3) => ({
            cca3: cca3,
            is_favorite: true,
            coverage: "full"
          })),
        );

        if (geoguessrFavorites.length > 0) {
          const favoriteCca3s = new Set(geoguessrFavorites);
        const beforeCount = filtered.length;

        filtered = filtered.filter((country) => {
          const isIncluded =
            country.cca3 && favoriteCca3s.has(country.cca3);
          if (isIncluded) {
            console.log(
              `Including favorite country: ${country.name} (${country.cca3})`,
            );
          }
          return isIncluded;
        });

        console.log(
          `Filtered from ${beforeCount} to ${filtered.length} countries using Geoguessr favorites (is_favorite=TRUE, coverage=FULL)`,
        );
      } else {
        // If toggle is on but no favorites available, show empty result
        console.log(
          "Geoguessr favorites toggle is on but no favorites available, showing empty result",
        );
        filtered = [];
      }
    }

    setFilteredCountries(filtered);
  }, [
    countries,
    selectedRegion,
    searchTerm,
    showGeoguessrFaves,
    geoguessrFavorites,
  ]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setSearchTerm(""); // Clear search when changing regions
  };

  const handleGeoguessrToggle = (checked: boolean) => {
    setShowGeoguessrFaves(checked);
    setSearchTerm(""); // Clear search when toggling favorites
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header
        className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10"
        role="banner"
      >
        <div className="flex items-center justify-between p-4 md:p-6">
          <Button
            variant="ghost"
            size="default"
            onClick={onBack}
            className="text-lg md:text-base h-12 md:h-10 px-4"
            aria-describedby="back-button-description"
          >
            <ArrowLeft
              className="w-5 h-5 md:w-4 md:h-4 mr-2 md:mr-1"
              aria-hidden="true"
            />
            <span className="text-lg md:text-base">Back</span>
          </Button>
          <p id="back-button-description" className="sr-only">
            Return to the home screen
          </p>

          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-xl md:text-lg font-semibold outline-none"
          >
            Flag Library
          </h1>
          <div className="w-20 md:w-16"></div>
        </div>
      </header>

      <div className="p-6 md:p-4 pt-8">
        <div className="w-full max-w-4xl mx-auto space-y-8 md:space-y-6">
          <FilterSection
            searchTerm={searchTerm}
            selectedRegion={selectedRegion}
            showGeoguessrFaves={showGeoguessrFaves}
            filteredCountriesCount={filteredCountries.length}
            favoritesLoading={favoritesLoading}
            favoritesError={favoritesError}
            favoritesCount={geoguessrFavorites.length}
            onSearchChange={handleSearchChange}
            onRegionChange={handleRegionChange}
            onGeoguessrToggle={handleGeoguessrToggle}
            onClearSearch={handleClearSearch}
            searchRef={searchRef}
          />

          <CountriesDisplay
            filteredCountries={filteredCountries}
            selectedRegion={selectedRegion}
            showGeoguessrFaves={showGeoguessrFaves}
            favoritesLoading={favoritesLoading}
            favoritesError={favoritesError}
            favoritesCount={geoguessrFavorites.length}
            searchTerm={searchTerm}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onClearSearch={handleClearSearch}
          />
        </div>
      </div>
    </div>
  );
}