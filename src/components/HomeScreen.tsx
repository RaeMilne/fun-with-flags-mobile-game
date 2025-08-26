import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Loader2, Settings } from "lucide-react";
import { fetchAllCountries, Country, getCountriesByRegion } from "../utils/apiService";
import FloatingFlags from "./FloatingFlags";

interface HomeScreenProps {
  selectedRegion: string;
  onStartGame: (countries: Country[]) => void;
  onViewFlags: (countries: Country[]) => void;
  onSettings: (countries?: Country[]) => void;
}

export default function HomeScreen({ selectedRegion, onStartGame, onViewFlags, onSettings }: HomeScreenProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllCountries();
      setCountries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load countries');
    } finally {
      setLoading(false);
    }
  };

  const handleStartGame = () => {
    if (countries.length > 0) {
      onStartGame(countries);
    }
  };

  const handleViewFlags = () => {
    if (countries.length > 0) {
      onViewFlags(countries);
    }
  };

  const handleSettings = () => {
    onSettings(countries);
  };

  const getRegionEmoji = (region: string): string => {
    switch (region) {
      case "All Countries":
        return "🌍";
      case "Africa":
        return "🌍";
      case "Americas":
        return "🌎";
      case "Asia":
        return "🌏";
      case "Europe":
        return "🇪🇺";
      case "Oceania":
        return "🏝️";
      default:
        return "🌍";
    }
  };

  const getSelectedRegionCount = (): number => {
    if (countries.length === 0) return 0;
    return getCountriesByRegion(countries, selectedRegion).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 relative">
      {/* Floating Flags Animation */}
      <FloatingFlags />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-8 md:space-y-6">
          {/* Title Section */}
          <header className="text-center space-y-4" role="banner">
            <h1 className="text-5xl md:text-6xl">Fun with Flags</h1>
            <p className="text-muted-foreground px-4">
              How many flags can you recognize in a row? Test your knowledge of world countries!
            </p>
          </header>

          {/* Selected Region Display */}
          {countries.length > 0 && selectedRegion !== "All Countries" && (
            <section aria-labelledby="region-info">
              <h2 id="region-info" className="sr-only">Current Region Selection</h2>
              <Card className="p-4 bg-blue-50/80 backdrop-blur-sm border-blue-200">
                <div className="flex items-center justify-center space-x-3">
                  <span 
                    className="text-xl" 
                    role="img" 
                    aria-label={`${selectedRegion} region emoji`}
                  >
                    {getRegionEmoji(selectedRegion)}
                  </span>
                  <div className="text-center">
                    <p className="text-sm text-blue-700">Currently playing with:</p>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {selectedRegion} ({getSelectedRegionCount()} countries)
                    </Badge>
                  </div>
                </div>
              </Card>
            </section>
          )}

          {/* Main Actions */}
          <section aria-labelledby="main-actions">
            <h2 id="main-actions" className="sr-only">Game Actions</h2>
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-8" role="status" aria-live="polite">
                  <Loader2 className="w-8 h-8 animate-spin mr-3" aria-hidden="true" />
                  <span>Loading countries...</span>
                </div>
              ) : error ? (
                <div className="text-center space-y-4" role="alert">
                  <p className="text-red-600">{error}</p>
                  <Button 
                    onClick={loadCountries}
                    variant="outline"
                    className="w-full text-lg md:text-base"
                    aria-describedby="retry-description"
                  >
                    Try Again
                  </Button>
                  <p id="retry-description" className="sr-only">
                    Retry loading country data from the API
                  </p>
                </div>
              ) : (
                <>
                  <Button 
                    onClick={handleStartGame}
                    disabled={countries.length === 0}
                    className="w-full h-14  shadow-lg text-lg md:text-base"
                    size="lg"
                    aria-describedby="play-game-description"
                  >
                    Play Game
                    {selectedRegion !== "All Countries" && (
                      <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                        {selectedRegion}
                      </Badge>
                    )}
                  </Button>
                  <p id="play-game-description" className="sr-only">
                    Start a new flag guessing game with {selectedRegion === "All Countries" ? "all countries" : `countries from ${selectedRegion}`}
                  </p>
                  
                  <Button 
                    onClick={handleViewFlags}
                    disabled={countries.length === 0}
                    variant="outline"
                    className="w-full h-12 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-lg md:text-base"
                    aria-describedby="view-flags-description"
                  >
                    View Flag Library
                  </Button>
                  <p id="view-flags-description" className="sr-only">
                    Browse through all available country flags
                  </p>
                  
                  <Button 
                    onClick={handleSettings}
                    variant="outline"
                    className="w-full h-12 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-lg md:text-base"
                    aria-describedby="settings-description"
                  >
                    <Settings className="w-4 h-4 mr-1" aria-hidden="true" />
                    Settings
                  </Button>
                  <p id="settings-description" className="sr-only">
                    Open settings to change game region and preferences
                  </p>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}