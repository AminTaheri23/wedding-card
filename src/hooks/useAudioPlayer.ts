import { useRef, useCallback } from 'react';

interface UseAudioPlayerReturn {
  audioRef: React.RefObject<HTMLAudioElement>;
  playAudio: (volume?: number) => Promise<void>;
  pauseAudio: () => void;
  setVolume: (volume: number) => void;
}

export const useAudioPlayer = (): UseAudioPlayerReturn => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = useCallback(async (volume = 0.5): Promise<void> => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.log("Playback prevented by browser:", e));
      }
    }
  }, []);

  const pauseAudio = useCallback((): void => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const setVolume = useCallback((volume: number): void => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  return {
    audioRef,
    playAudio,
    pauseAudio,
    setVolume
  };
};
