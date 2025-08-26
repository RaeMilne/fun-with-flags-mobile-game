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
        return (
          <HomeScreen 
            selectedRegion={selectedRegion}
            onStartGame={handleStartGame}
            onViewFlags={handleViewFlags}
            onSettings={handleSettings}
          />
        );
    }
  };

  return (
    <div className="size-full">
      {/* Skip Links */}
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      {/* Live Announcer for Screen Readers */}
      <LiveAnnouncer message={announcement} />
      <div id="live-announcer" aria-live="polite" aria-atomic="true" className="sr-only" />
      
      {/* Main Application */}
      <main 
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="outline-none"
        role="main"
        aria-label={`Fun with Flags - ${currentScreen} screen`}
      >
        {renderScreen()}
      </main>
    </div>
  );
}