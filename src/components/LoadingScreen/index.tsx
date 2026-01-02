import React from 'react';
import { motion } from 'framer-motion';
import { LoadingScreenProps } from '../../types';

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-wedding-cream text-wedding-gold">
      <div className="w-20 h-20 mb-6 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
          <path
            d="M50 10 C 20 10 10 40 10 50 C 10 80 40 90 50 90 C 80 90 90 60 90 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="10 5"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
           <span className="text-xl font-persian-title">دعوت</span>
        </div>
      </div>

      <div className="w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-wedding-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
      <p className="mt-3 font-persian-body text-wedding-dark opacity-60 text-sm">لطفا صبر کنید...</p>
    </div>
  );
};
