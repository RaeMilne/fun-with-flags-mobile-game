import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft } from "lucide-react";
import { Country, getCountriesByRegion } from "../utils/apiService";
import Switch from "./ui/switch";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

interface SettingsScreenProps {
  countries: Country[];
  selectedRegion: string;
  useGeoguessrFavorites: boolean;
  onRegionChange: (region: string) => void;
  onGeoguessrFavoritesChange: (useFavorites: boolean) => void;
  onBack: () => void;
}

const regions = [
  { value: "All Countries", label: "All Countries", emoji: "🌍" },
  { value: "Africa", label: "Africa", emoji: "🌍" },
  { value: "Americas", label: "Americas", emoji: "🌎" },
  { value: "Asia", label: "Asia", emoji: "🌏" },
  { value: "Europe", label: "Europe", emoji: "🇪🇺" },
  { value: "Oceania", label: "Oceania", emoji: "🏝️" }
];

export default function SettingsScreen({ 
  countries, 
  selectedRegion, 
  useGeoguessrFavorites,
  onRegionChange, 
  onGeoguessrFavoritesChange,
  onBack 
}: SettingsScreenProps) {
  const [currentSelection, setCurrentSelection] = useState(selectedRegion);
  const [currentGeoguessrSetting, setCurrentGeoguessrSetting] = useState(useGeoguessrFavorites);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Focus the main heading when component mounts
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, []);

  const getRegionCount = (region: string): number => {
    if (countries.length === 0) return 0;
    return getCountriesByRegion(countries, region).length;
  };

  const handleSave = () => {
    onRegionChange(currentSelection);
    onGeoguessrFavoritesChange(currentGeoguessrSetting);
    onBack();
  };

  const handleRegionSelect = (value: string) => {
    setCurrentSelection(value);
  };

  const handleGeoguessrToggle = (checked: boolean) => {
    setCurrentGeoguessrSetting(checked);
  };

  const hasChanges = currentSelection !== selectedRegion || currentGeoguessrSetting !== useGeoguessrFavorites;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200" role="banner">
        <div className="flex items-center justify-between p-4 md:p-6">
          <Button 
            variant="ghost" 
            size="default" 
            onClick={onBack} 
            className="text-lg md:text-base h-12 md:h-10 px-4 hover:bg-gray-100 border border-gray-200"
            aria-describedby="back-button-description"
          >
            <ArrowLeft className="w-5 h-5 md:w-4 md:h-4 mr-2 md:mr-1" aria-hidden="true" />
            <span className="text-lg md:text-base">Back</span>
          </Button>
          <p id="back-button-description" className="sr-only">
            Return to the previous screen without saving changes
          </p>
          
          <h1 
            ref={headingRef}
            tabIndex={-1}
            className="text-xl md:text-lg font-semibold outline-none text-gray-800"
          >
            Settings
          </h1>
          <div className="w-20 md:w-16"></div>
        </div>
      </header>

      <div className="p-6 md:p-4 pt-8">
        <div className="w-full max-w-md mx-auto space-y-8 md:space-y-6">
          
          {/* Region Selection */}
          <section aria-labelledby="region-selection-heading">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg">
              <div className="space-y-6 md:space-y-4">
                <div>
                  <h2 id="region-selection-heading" className="text-xl md:text-lg font-semibold mb-2 text-gray-800">
                    Game Region
                  </h2>
                  <p className="text-sm text-gray-600">
                    Choose which countries to include in your flag guessing game.
                  </p>
                </div>

                <Separator className="bg-gray-200" />

                <div 
                  role="radiogroup" 
                  aria-labelledby="region-selection-heading"
                  aria-describedby="region-instructions"
                  className="space-y-3"
                >
                  {regions.map((region) => {
                    const count = getRegionCount(region.value);
                    const isSelected = currentSelection === region.value;
                    
                    return (
                      <Button
                        key={region.value}
                        onClick={() => handleRegionSelect(region.value)}
                        variant="outline"
                        className="w-full h-16 px-4 py-3 justify-between text-left border-2"
                        style={{
                          backgroundColor: isSelected ? '#000000' : undefined,
                          color: isSelected ? '#ffffff' : undefined,
                          borderColor: isSelected ? '#000000' : '#d1d5db',
                          boxShadow: isSelected ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : undefined
                        }}
                        role="radio"
                        aria-checked={isSelected}
                        aria-describedby={`region-${region.value}-description`}
                      >
                        <div className="flex items-center space-x-3">
                          <span 
                            className="text-xl" 
                            role="img" 
                            aria-label={`${region.label} emoji`}
                          >
                            {region.emoji}
                          </span>
                          <span className="text-base font-medium">{region.label}</span>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`text-sm ${
                            isSelected 
                              ? "bg-white/20 text-white" 
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {count} {count === 1 ? 'country' : 'countries'}
                        </Badge>
                        <p id={`region-${region.value}-description`} className="sr-only">
                          {region.label} region contains {count} countries
                        </p>
                      </Button>
                    );
                  })}
                </div>
                
                <p id="region-instructions" className="sr-only">
                  Select a region by clicking on it. The selected region will be highlighted.
                </p>
              </div>
            </Card>
          </section>

          {/* Geoguessr Favorites Toggle */}
          <section aria-labelledby="geoguessr-favorites-heading">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg">
              <div className="space-y-6 md:space-y-4">
                <div>
                  <h2 id="geoguessr-favorites-heading" className="text-xl md:text-lg font-semibold mb-2 text-gray-800">
                    Geoguessr
                  </h2>
                  <p className="text-sm text-gray-600">
                    Include countries that are more likely to appear when playing Geoguessr. These are countries with full Google Street View coverage.
                  </p>
                </div>

                <Separator className="bg-gray-200" />

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Switch
                    id="geoguessr-favorites"
                    checked={currentGeoguessrSetting}
                    onCheckedChange={handleGeoguessrToggle}
                    aria-label="Use Geoguessr favorites"
                  />
                  <div className="flex-1">
                    <Label htmlFor="geoguessr-favorites" className="text-base font-semibold text-gray-800 cursor-pointer">
                      Use Geoguessr Favorites
                    </Label>
                    <p className="text-xs text-gray-600 mt-1">
                      {currentGeoguessrSetting ? "Will filter to your favorite countries" : "Will include all countries in selected region"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Current Selection Preview */}
          {hasChanges && (
            <section aria-labelledby="preview-heading">
              <h2 id="preview-heading" className="sr-only">Selection Preview</h2>
              <Card className="p-4 bg-blue-50/80 backdrop-blur-sm border border-blue-200 shadow-md" role="status">
                <div className="text-center">
                  <p className="text-sm text-blue-700 mb-2 font-medium">Changes to save:</p>
                  <div className="flex items-center justify-center space-x-2">
                    {currentSelection !== selectedRegion && (
                      <>
                        <span 
                          className="text-lg" 
                          role="img" 
                          aria-label={`${currentSelection} emoji`}
                        >
                          {regions.find(r => r.value === currentSelection)?.emoji}
                        </span>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 border border-blue-200">
                          {currentSelection} ({getRegionCount(currentSelection)} countries)
                        </Badge>
                      </>
                    )}
                    {currentGeoguessrSetting !== useGeoguessrFavorites && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800 border border-purple-200">
                        {currentGeoguessrSetting ? "+ Favorites" : "- Favorites"}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </section>
          )}

          {/* Action Buttons */}
          <section aria-labelledby="actions-heading">
            <h2 id="actions-heading" className="sr-only">Settings Actions</h2>
            <div className="space-y-3">
              <Button 
                onClick={handleSave}
                className="w-full h-14 md:h-12 shadow-lg text-lg md:text-base border-2"
                style={{
                  backgroundColor: hasChanges ? '#2563eb' : '#6b7280',
                  color: '#ffffff',
                  borderColor: hasChanges ? '#2563eb' : '#6b7280',
                  cursor: hasChanges ? 'pointer' : 'not-allowed'
                }}
                disabled={!hasChanges}
                aria-describedby="save-description"
              >
                Save Settings
              </Button>
              <p id="save-description" className="sr-only">
                Save your region selection and Geoguessr favorites preference and return to the home screen
              </p>
              
              <Button 
                onClick={onBack}
                variant="outline"
                className="w-full h-12 md:h-10 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-lg md:text-base"
                aria-describedby="cancel-description"
              >
                Cancel
              </Button>
              <p id="cancel-description" className="sr-only">
                Discard changes and return to the previous screen
              </p>
            </div>
          </section>

          {/* Help Text */}
          <footer className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-200" role="contentinfo">
            <h3 className="sr-only">Settings Help</h3>
            <p className="text-sm text-gray-600">
              Tip: Start with a specific region to learn flags from that area, then challenge yourself with "All Countries"!
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}