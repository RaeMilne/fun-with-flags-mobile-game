import { useState, useEffect, useRef } from "react";
import HomeScreen from "./components/HomeScreen";
import GameplayScreen from "./components/GameplayScreen";
import EndRoundScreen from "./components/EndRoundScreen";
import FlagLibraryScreen from "./components/FlagLibraryScreen";
import SettingsScreen from "./components/SettingsScreen";
import { SkipLink } from "./components/accessibility/SkipLink";
import { LiveAnnouncer } from "./components/accessibility/LiveAnnouncer";
import { Country } from "./utils/apiService";

type Screen = "home" | "game" | "endRound" | "flags" | "settings";

const screenTitles: Record<Screen, string> = {
  home: "Fun with Flags - Home",
  game: "Fun with Flags - Game",
  endRound: "Fun with Flags - Game Over",
  flags: "Fun with Flags - Flag Library", 
  settings: "Fun with Flags - Settings"
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [selectedRegion, setSelectedRegion] = useState("All Countries");
  const [useGeoguessrFavorites, setUseGeoguessrFavorites] = useState(false);
  const [gameStreak, setGameStreak] = useState(0);
  const [countries, setCountries] = useState<Country[]>([]);
  const [announcement, setAnnouncement] = useState("");
  const mainRef = useRef<HTMLElement>(null);

  // Update document title and announce screen changes
  useEffect(() => {
    const title = screenTitles[currentScreen];
    document.title = title;
    setAnnouncement(`Navigated to ${title}`);
    
    // Focus main content area when screen changes
    if (mainRef.current) {
      mainRef.current.focus();
    }
  }, [currentScreen]);

  // Add reduced motion support
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
      } else {
        document.documentElement.style.removeProperty('--animation-duration');
        document.documentElement.style.removeProperty('--transition-duration');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleStartGame = (countriesData: Country[]) => {
    setCountries(countriesData);
    setCurrentScreen("game");
  };

  const handleGameEnd = (streak: number) => {
    setGameStreak(streak);
    setCurrentScreen("endRound");
  };

  const handlePlayAgain = () => {
    setCurrentScreen("game");
  };

  const handleGoHome = () => {
    setCurrentScreen("home");
  };

  const handleViewFlags = (countriesData: Country[]) => {
    setCountries(countriesData);
    setCurrentScreen("flags");
  };

  const handleSettings = (countriesData?: Country[]) => {
    if (countriesData) {
      setCountries(countriesData);
    }
    setCurrentScreen("settings");
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setAnnouncement(`Region changed to ${region}`);
  };

  const handleGeoguessrFavoritesChange = (useFavorites: boolean) => {
    setUseGeoguessrFavorites(useFavorites);
    setAnnouncement(`Geoguessr favorites ${useFavorites ? 'enabled' : 'disabled'}`);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return (
          <HomeScreen 
            selectedRegion={selectedRegion}
            onStartGame={handleStartGame}
            onViewFlags={handleViewFlags}
            onSettings={handleSettings}
          />
        );
      case "game":
        return (
          <GameplayScreen 
            countries={countries}
            region={selectedRegion}
            useGeoguessrFavorites={useGeoguessrFavorites}
            onGameEnd={handleGameEnd}
            onHome={handleGoHome}
            onAnnouncement={setAnnouncement}
          />
        );
      case "endRound":
        return (
          <EndRoundScreen 
            streak={gameStreak}
            onPlayAgain={handlePlayAgain}
            onHome={handleGoHome}
          />
        );
      case "flags":
        return (
          <FlagLibraryScreen 
            countries={countries}
            onBack={handleGoHome}
          />
        );
      case "settings":
        return (
          <SettingsScreen 
            countries={countries}
            selectedRegion={selectedRegion}
            useGeoguessrFavorites={useGeoguessrFavorites}
            onRegionChange={handleRegionChange}
            onGeoguessrFavoritesChange={handleGeoguessrFavoritesChange}
            onBack={handleGoHome}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <SkipLink href="#main" children="Skip to main content" />
      <LiveAnnouncer message={announcement} />
      
      <main 
        ref={mainRef}
        tabIndex={-1}
        className="min-h-screen"
        role="main"
        aria-label="Fun with Flags Game"
      >
       {renderScreen()}
      </main>
    </div>
  );
}