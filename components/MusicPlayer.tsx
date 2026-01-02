import React, { useEffect, useRef } from 'react';
import { MUSIC_URL } from '../constants';

interface MusicPlayerProps {
  isPlaying: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.volume = 0.5; // Moderate volume
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Auto-play prevented:", error);
          // Usually handled by the interaction requirement in App.tsx
        });
      }
    }
  }, [isPlaying]);

  return (
    <audio 
      ref={audioRef} 
      src={MUSIC_URL} 
      loop 
      preload="auto" 
      style={{ display: 'none' }} 
    />
  );
};