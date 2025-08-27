import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Country, getRandomCountries, generateQuestionOptions } from "../utils/apiService";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface GameplayScreenProps {
  countries: Country[];
  region: string;
  useGeoguessrFavorites: boolean;
  onGameEnd: (streak: number) => void;
  onHome: () => void;
  onAnnouncement: (message: string) => void;
}

export default function GameplayScreen({ countries, region, useGeoguessrFavorites, onGameEnd, onHome, onAnnouncement }: GameplayScreenProps) {
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<Country[]>([]);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(1);
  
  const questionRef = useRef<HTMLHeadingElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (countries.length > 0) {
      startNewQuestion().catch(console.error);
    }
  }, [countries, region]);

  useEffect(() => {
    // Focus the question when a new question loads
    if (!loading && questionRef.current) {
      questionRef.current.focus();
    }
  }, [loading, currentCountry]);

  const startNewQuestion = async () => {
    setLoading(true);
    
    let countriesToUse = countries;
    
    // If Geoguessr favorites is enabled, filter to only those countries
    if (useGeoguessrFavorites) {
      try {
        const { getGeoguessrFavorites } = await import('../utils/supabase/geoguessrFavorites');
        const favoriteCca3Codes = await getGeoguessrFavorites();
        countriesToUse = countries.filter(country => 
          favoriteCca3Codes.includes(country.cca3)
        );
        
        if (countriesToUse.length === 0) {
          onGameEnd(streak);
          return;
        }
      } catch (error) {
        console.error('Error loading Geoguessr favorites:', error);
        // Fallback to regular countries if there's an error
        countriesToUse = countries;
      }
    }
    
    const randomCountries = getRandomCountries(countriesToUse, 1, region);
    
    if (randomCountries.length === 0) {
      onGameEnd(streak);
      return;
    }
    
    const country = randomCountries[0]; const questionOptions = generateQuestionOptions(country, countriesToUse, region);
    
    setCurrentCountry(country);
    setOptions(questionOptions);
    setSelectedAnswer(null);
    setShowResult(false);
    setLoading(false);
    
    // Announce new question to screen readers
    onAnnouncement(`Question ${questionNumber}. New flag loaded. Choose from ${questionOptions.length} country options.`);
  };

  const handleAnswerSelect = (selectedCountry: Country) => {
    setSelectedAnswer(selectedCountry.name);
    const correct = selectedCountry.name === currentCountry?.name;
    setIsCorrect(correct);
    setShowResult(true);

    // Announce result to screen readers
    if (correct) {
      setStreak(prev => prev + 1);
      onAnnouncement(`Correct! The flag belongs to ${currentCountry?.name}. Your streak is now ${streak + 1}. Loading next question.`);
      setQuestionNumber(prev => prev + 1);
      setTimeout(() => {
        startNewQuestion();
      }, 1500);
    } else {
      onAnnouncement(`Incorrect. The correct answer was ${currentCountry?.name}. Game over with a streak of ${streak}.`);
      setTimeout(() => {
        onGameEnd(streak);
      }, 2000);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, country: Country) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!showResult) {
        handleAnswerSelect(country);
      }
    }
  };

  const getRegionEmoji = (regionName: string): string => {
    switch (regionName) {
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
        return "🏳️";
    }
  };

  if (!currentCountry || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center" role="status" aria-live="polite">
          <Loader2 className="w-10 h-10 md:w-8 md:h-8 animate-spin mx-auto mb-6 md:mb-4" aria-hidden="true" />
          <p className="text-xl md:text-base">Loading next flag...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b" role="banner">
        <div className="flex items-center justify-between p-4 md:p-6">
          <Button 
            variant="ghost" 
            size="default" 
            onClick={onHome} 
            className="text-lg md:text-base h-12 md:h-10 px-4"
            aria-describedby="home-button-description"
          >
            <ArrowLeft className="w-5 h-5 md:w-4 md:h-4 mr-2 md:mr-1" aria-hidden="true" />
            <span className="text-lg md:text-base">Home</span>
          </Button>
          <p id="home-button-description" className="sr-only">
            Return to the home screen and end current game
          </p>
          
          <div className="text-center">
            <p className="text-base md:text-sm text-muted-foreground">Your Streak</p>
            <p className="text-3xl md:text-xl font-semibold" aria-live="polite">{streak}</p>
          </div>
          <div className="w-20 md:w-16"></div>
        </div>
        
        {/* Region indicator */}
        {region !== "All Countries" && (
          <div className="px-4 pb-4 md:pb-3 flex justify-center">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-base md:text-sm px-3 py-1">
              <span 
                className="mr-2 md:mr-1 text-lg md:text-base" 
                role="img" 
                aria-label={`${region} region emoji`}
              >
                {getRegionEmoji(region)}
              </span>
              <span className="text-base md:text-sm">{region}</span>
            </Badge>
          </div>
        )}
      </header>

      <div className="p-6 md:p-4 pt-8 md:pt-8">
        <div className="w-full max-w-md mx-auto space-y-8 md:space-y-6">
          {/* Question Text */}
          <div className="text-center">
            <h1 
              ref={questionRef}
              tabIndex={-1}
              className="text-xl md:text-lg text-muted-foreground font-medium outline-none"
            >
              Guess the country of this flag
            </h1>
          </div>

          {/* Flag Display */}
          <div className="w-full">
            <figure>
              <ImageWithFallback
                src={currentCountry.flagUrl}
                alt={currentCountry.flagAlt || `Flag of ${currentCountry.name}`}
                className="w-full object-contain rounded-lg shadow-lg border-2 border-gray-200 bg-white"
              />
              <figcaption className="sr-only">
                Flag image for question {questionNumber}. Select the correct country name from the options below.
              </figcaption>
            </figure>
          </div>

          {/* Answer Options - Responsive Grid */}
          <fieldset>
            <legend className="sr-only">
              Choose the correct country for this flag. Question {questionNumber} of your current streak.
            </legend>
            <div 
              ref={optionsRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3"
              role="radiogroup"
              aria-labelledby="question-text"
              aria-describedby="question-instructions"
            >
              {options.map((country, index) => (
                <Button
                  key={country.name}
                  onClick={() => handleAnswerSelect(country)}
                  onKeyDown={(e) => handleKeyDown(e, country)}
                  disabled={showResult}
                  variant={
                    showResult
                      ? country.name === currentCountry.name
                        ? "default"
                        : country.name === selectedAnswer
                        ? "destructive"
                        : "outline"
                      : "outline"
                  }
                  className={`h-16 md:h-14 justify-center text-center text-lg md:text-base ${
                    showResult && country.name === currentCountry.name
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : showResult && country.name === selectedAnswer && !isCorrect
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : ""
                  }`}
                  role="radio"
                  aria-checked={selectedAnswer === country.name}
                  aria-describedby={`option-${index}-description`}
                >
                  <span className="px-3 md:px-2 leading-tight text-lg md:text-base">
                    {country.name}
                  </span>
                </Button>
              ))}
            </div>
            <p id="question-instructions" className="sr-only">
              Use arrow keys to navigate between options, then press Enter or Space to select.
            </p>
          </fieldset>

          {/* Result Feedback */}
          {showResult && (
            <Card 
              className={`p-6 md:p-4 text-center border-0 ${
                isCorrect 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}
              role="alert"
              aria-live="assertive"
            >
              <h2 className="text-2xl md:text-lg font-medium">
                {isCorrect ? "🎉 Correct!" : "❌ Wrong Answer"}
              </h2>
              {!isCorrect && (
                <p className="text-lg md:text-sm mt-2 md:mt-1 font-medium">
                  The correct answer was {currentCountry.name}
                </p>
              )}
            </Card>
          )}

          {/* Progress indicator */}
          <div className="text-center text-lg md:text-sm text-muted-foreground font-medium">
            <h3>Question {questionNumber}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}