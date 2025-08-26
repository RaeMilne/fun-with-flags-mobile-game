import { useState, useEffect } from "react";
import { Pause, Play, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { flagEmojis } from "../utils/flagConstants";
import { 
  FloatingFlag, 
  animationDirections, 
  getAnimationClass, 
  getStartingPosition, 
  getFlagPosition 
} from "../utils/flagAnimations";

export default function FloatingFlags() {
  const [flags, setFlags] = useState<FloatingFlag[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    if (mediaQuery.matches) {
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    // Generate massive amount of flags from all directions
    const generateFlags = () => {
      const newFlags: FloatingFlag[] = [];
      const numFlags = 60; // Many more flags for spectacular effect!
      
      for (let i = 0; i < numFlags; i++) {
        const direction = animationDirections[i % animationDirections.length];
        const { startX, startY } = getStartingPosition(i);
        
        const driftX = (Math.random() - 0.5) * 120; // -60 to 60px drift for path variation
        const driftY = (Math.random() - 0.5) * 120; // -60 to 60px drift for path variation
        const rotation = (Math.random() - 0.5) * 60; // -30 to 30 degree rotation
        
        newFlags.push({
          id: i,
          emoji: flagEmojis[Math.floor(Math.random() * flagEmojis.length)],
          x: startX,
          y: startY,
          size: 14 + Math.random() * 24, // 14-38px size (bigger variety)
          duration: 4 + Math.random() * 8, // 4-12 seconds (variety in speed)
          delay: Math.random() * 2, // 0-2 seconds delay for minimal stagger
          direction,
          driftX,
          driftY,
          rotation,
          // Removed opacity property - using consistent 0.6 in styles instead
        });
      }
      
      setFlags(newFlags);
    };

    generateFlags();

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Don't render anything if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        {flags.map((flag) => (
          <div
            key={flag.id}
            className={`absolute ${getAnimationClass(flag.direction)}`}
            style={{
              ...getFlagPosition(flag),
              fontSize: `${flag.size}px`,
              animationDuration: `${flag.duration}s`,
              animationDelay: `${flag.delay}s`,
              animationPlayState: isPaused ? 'paused' : 'running',
              '--drift-x': `${flag.driftX}px`,
              '--drift-y': `${flag.driftY}px`,
              '--rotation': `${flag.rotation}deg`,
              opacity: 0.6, // Consistent opacity for smooth flow
              filter: `hue-rotate(${Math.random() * 30 - 15}deg)`, // More subtle color variation
            } as React.CSSProperties & { 
              '--drift-x': string; 
              '--drift-y': string; 
              '--rotation': string; 
            }}
          >
            {flag.emoji}
          </div>
        ))}
      </div>

      {/* Animation Control Buttons */}
      <div className="fixed top-4 left-4 z-50 pointer-events-auto flex gap-2">
        <Button
          onClick={togglePause}
          variant="outline"
          size="sm"
          className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 shadow-lg"
          aria-label={isPaused ? "Resume flag animation" : "Pause flag animation"}
          title={isPaused ? "Resume animation" : "Pause animation"}
        >
          {isPaused ? (
            <Play className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Pause className="w-4 h-4" aria-hidden="true" />
          )}
        </Button>
        
        <Button
          onClick={toggleVisibility}
          variant="outline"
          size="sm"
          className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 shadow-lg"
          aria-label={isVisible ? "Hide floating flags" : "Show floating flags"}
          title={isVisible ? "Hide flags" : "Show flags"}
        >
          {isVisible ? (
            <Eye className="w-4 h-4" aria-hidden="true" />
          ) : (
            <EyeOff className="w-4 h-4" aria-hidden="true" />
          )}
        </Button>
      </div>
    </>
  );
}