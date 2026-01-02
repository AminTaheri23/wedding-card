import { useState, useRef, useCallback } from 'react';

interface UseAudioReturn {
  loadingProgress: number;
  isLoaded: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  loadAudio: (url: string) => Promise<void>;
  playAudio: (volume?: number) => Promise<void>;
  pauseAudio: () => void;
}

export const useAudio = (): UseAudioReturn => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const loadAudio = useCallback(async (url: string): Promise<void> => {
    if (isLoaded) return;

    try {
      const response = await fetch(url);
      
      if (!response.ok) throw new Error("Network response was not ok");

      const contentLength = response.headers.get('Content-Length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      let loaded = 0;

      const reader = response.body?.getReader();
      const chunks: Uint8Array[] = [];

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          if (value) {
            chunks.push(value);
            loaded += value.length;
            if (total) {
              const percent = Math.min(Math.round((loaded / total) * 100), 99);
              setLoadingProgress(percent);
            } else {
              setLoadingProgress(prev => Math.min(prev + 2, 90));
            }
          }
        }
      }

      const blob = new Blob(chunks as BlobPart[], { type: 'audio/mpeg' });
      const audioBlobUrl = URL.createObjectURL(blob);
      
      if (audioRef.current) {
        audioRef.current.src = audioBlobUrl;
        await new Promise(r => setTimeout(r, 100));
      }
      
      setLoadingProgress(100);
      setIsLoaded(true);

    } catch (error) {
      console.warn("Audio pre-fetch failed, switching to native loader:", error);
      
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.load();
        
        const waitForAudio = new Promise<void>((resolve) => {
          const onCanPlay = () => {
            cleanup();
            resolve();
          };
          
          const onError = () => {
            console.error("Audio load error");
            cleanup();
            resolve();
          };

          const cleanup = () => {
            audioRef.current?.removeEventListener('canplay', onCanPlay);
            audioRef.current?.removeEventListener('error', onError);
          };

          audioRef.current?.addEventListener('canplay', onCanPlay);
          audioRef.current?.addEventListener('error', onError);

          setTimeout(() => {
            cleanup();
            resolve();
          }, 10000);
        });

        const interval = setInterval(() => {
          setLoadingProgress(prev => prev < 90 ? prev + 1 : prev);
        }, 100);

        await waitForAudio;
        
        clearInterval(interval);
        setLoadingProgress(100);
        setIsLoaded(true);
      }
    }
  }, [isLoaded]);

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

  return {
    loadingProgress,
    isLoaded,
    audioRef,
    loadAudio,
    playAudio,
    pauseAudio
  };
};
