import React, { useEffect, useRef } from 'react';
import { useReward } from 'partycles';

export const FallingPetals: React.FC = () => {
  const { reward, isAnimating } = useReward('petals-container', 'petals', {
    particleCount: 50,
    spread: 30,
    startVelocity: 30,
    elementSize: 20,
    lifetime: 500,
    physics: {
      gravity: 0.1,
      wind: 0.00,
      friction: 0.96,
    },
    colors: ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493', '#FFF0F5'],
  });

  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!isAnimating) {
      reward();
    }

    intervalRef.current = setInterval(() => {
      reward();
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [reward, isAnimating]);

  return <div id="petals-container" className="fixed top-[5%] left-0 right-0 h-0 pointer-events-none z-10" />;
};
