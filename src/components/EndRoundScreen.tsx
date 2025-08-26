import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, Home, RotateCcw } from "lucide-react";

interface EndRoundScreenProps {
  streak: number;
  onPlayAgain: () => void;
  onHome: () => void;
}

export default function EndRoundScreen({ streak, onPlayAgain, onHome }: EndRoundScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Focus the main heading when component mounts
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, []);

  const getStreakMessage = () => {
    if (streak === 0) return "Give it another try!";
    if (streak === 1) return "Good start!";
    if (streak <= 5) return "Nice work!";
    if (streak <= 10) return "Great job!";
    if (streak <= 20) return "Excellent!";
    return "Amazing! You're a flag expert!";
  };

  const getPerformanceLevel = () => {
    if (streak === 0) return "beginner";
    if (streak <= 5) return "good";
    if (streak <= 10) return "great";
    if (streak <= 20) return "excellent";
    return "expert";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 md:space-y-6">
        
        {/* Header */}
        <header className="text-center space-y-4" role="banner">
          <div className="text-6xl mb-4" role="img" aria-label="Trophy emoji">🏆</div>
          <h1 
            ref={headingRef}
            tabIndex={-1}
            className="text-3xl outline-none"
          >
            Game Over!
          </h1>
        </header>

        {/* Score Card */}
        <section aria-labelledby="score-heading">
          <Card className="p-8 md:p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
            <div className="space-y-6 md:space-y-4">
              <div>
                <h2 id="score-heading" className="text-xl md:text-lg text-muted-foreground mb-2">
                  Your Final Score
                </h2>
                <div className="flex items-center justify-center space-x-3">
                  <Trophy className="w-8 h-8 text-yellow-600" aria-hidden="true" />
                  <span 
                    className="text-5xl md:text-4xl font-bold text-blue-600"
                    aria-label={`${streak} correct answers`}
                  >
                    {streak}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {streak === 1 ? "correct flag" : "correct flags"} in a row
                </p>
              </div>

              <div>
                <Badge 
                  variant="secondary" 
                  className={`text-lg md:text-base px-4 py-2 ${
                    getPerformanceLevel() === 'expert' ? 'bg-yellow-100 text-yellow-800' :
                    getPerformanceLevel() === 'excellent' ? 'bg-green-100 text-green-800' :
                    getPerformanceLevel() === 'great' ? 'bg-blue-100 text-blue-800' :
                    getPerformanceLevel() === 'good' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  {getStreakMessage()}
                </Badge>
              </div>
            </div>
          </Card>
        </section>

        {/* Actions */}
        <section aria-labelledby="actions-heading">
          <h2 id="actions-heading" className="sr-only">Game Actions</h2>
          <div className="space-y-4 md:space-y-3">
            <Button 
              onClick={onPlayAgain}
              className="w-full h-14 md:h-12  shadow-lg text-lg md:text-base"
              size="lg"
              aria-describedby="play-again-description"
            >
              <RotateCcw className="w-5 h-5 md:w-4 md:h-4 mr-2" aria-hidden="true" />
              Play Again
            </Button>
            <p id="play-again-description" className="sr-only">
              Start a new flag guessing game with the same settings
            </p>
            
            <Button 
              onClick={onHome}
              variant="outline"
              className="w-full h-12 md:h-10 border-2 text-lg md:text-base"
              aria-describedby="home-description"
            >
              <Home className="w-5 h-5 md:w-4 md:h-4 mr-2" aria-hidden="true" />
              Back to Home
            </Button>
            <p id="home-description" className="sr-only">
              Return to the home screen to change settings or view flags
            </p>
          </div>
        </section>

        {/* Performance Summary */}
        <footer className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center" role="contentinfo">
          <h3 className="sr-only">Performance Summary</h3>
          <p className="text-sm text-muted-foreground">
            {streak === 0 
              ? "Every expert started as a beginner. Try again!" 
              : streak <= 5 
              ? "You're getting the hang of it. Keep practicing!"
              : streak <= 15
              ? "Impressive geography knowledge! Challenge yourself with different regions."
              : "Outstanding! You're a true flag recognition master."
            }
          </p>
        </footer>
      </div>
    </div>
  );
}