import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  swayAmount: number;
  color: string;
}

const PETALS: Petal[] = (() => {
  const petalCount = 40;
  const petalColors = [
    'rgba(255, 182, 193, 0.8)',
    'rgba(255, 192, 203, 0.8)',
    'rgba(255, 160, 160, 0.8)',
    'rgba(255, 200, 180, 0.8)',
  ];

  return Array.from({ length: petalCount }, (_, i) => ({
    id: i,
    x: Math.random() * 40 + 30,
    size: Math.random() * 15 + 10,
    delay: Math.random() * 10,
    duration: Math.random() * 5 + 8,
    rotation: Math.random() * 360,
    swayAmount: Math.random() * 50 + 30,
    color: petalColors[Math.floor(Math.random() * petalColors.length)],
  }));
})();

export const FallingPetals: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {PETALS.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-full opacity-70"
          style={{
            width: petal.size,
            height: petal.size,
            backgroundColor: petal.color,
            borderRadius: '50% 50% 50% 50%',
          }}
          initial={{
            y: -50,
            right: `${petal.x}%`,
            rotate: petal.rotation,
          }}
          animate={{
            y: '110vh',
            right: [`${petal.x}%`, `${petal.x + Math.sin(petal.id) * (petal.swayAmount / 10)}%`, `${petal.x}%`],
            rotate: petal.rotation + 360,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            repeatDelay: 0,
            ease: 'linear',
            x: {
              duration: petal.duration / 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
          }}
        />
      ))}
    </div>
  );
};
