export type AnimationDirection = 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top' | 'diagonal-1' | 'diagonal-2';

export interface FloatingFlag {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  direction: AnimationDirection;
  driftX?: number;
  driftY?: number;
  rotation?: number;

}

export const animationDirections: AnimationDirection[] = [
  'left-to-right', 'right-to-left', 'top-to-bottom', 
  'bottom-to-top', 'diagonal-1', 'diagonal-2'
];

export const getAnimationClass = (direction: AnimationDirection): string => {
  switch (direction) {
    case 'left-to-right': return 'animate-float-left-to-right';
    case 'right-to-left': return 'animate-float-right-to-left';
    case 'top-to-bottom': return 'animate-float-top-to-bottom';
    case 'bottom-to-top': return 'animate-float-bottom-to-top';
    case 'diagonal-1': return 'animate-float-diagonal-1';
    case 'diagonal-2': return 'animate-float-diagonal-2';
    default: return 'animate-float-left-to-right';
  }
};

export const getStartingPosition = (index: number) => {
  // Distribute flags evenly across the entire screen area
  // Use a grid-based approach with randomness for natural distribution
  const gridSize = Math.ceil(Math.sqrt(60)); // Assuming 60 flags total
  const gridX = index % gridSize;
  const gridY = Math.floor(index / gridSize);
  
  // Calculate base position with even distribution
  const baseX = (gridX / gridSize) * 100;
  const baseY = (gridY / gridSize) * 100;
  
  // Add randomness within each grid cell to avoid perfect grid appearance
  const randomOffsetX = (Math.random() - 0.5) * (100 / gridSize * 0.8);
  const randomOffsetY = (Math.random() - 0.5) * (100 / gridSize * 0.8);
  
  const startX = Math.max(5, Math.min(95, baseX + randomOffsetX));
  const startY = Math.max(5, Math.min(95, baseY + randomOffsetY));
  
  return { startX, startY };
};

export const getFlagPosition = (flag: FloatingFlag) => {
  // Since flags now start distributed across the screen, use simple percentage positioning
  return { 
    left: `${flag.x}%`, 
    top: `${flag.y}%` 
  };
};