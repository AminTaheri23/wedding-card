import React, { useState, useEffect, useRef } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { InvitationCard } from './components/InvitationCard';
import { AppState } from './types';
import { MUSIC_URL } from './constants';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (appState === AppState.LOADING) {
      let isMounted = true;

      const loadAudio = async () => {
        try {
          // 1. Attempt efficient Fetch (supports progress bar)
          const response = await fetch(MUSIC_URL);
          
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
                  // Update progress based on download
                  const percent = Math.min(Math.round((loaded / total) * 100), 99);
                  if (isMounted) setLoadingProgress(percent);
                } else {
                  // Fake progress if no Content-Length
                  if (isMounted) setLoadingProgress(prev => Math.min(prev + 2, 90));
                }
              }
            }
          }

          const blob = new Blob(chunks, { type: 'audio/mpeg' });
          const audioBlobUrl = URL.createObjectURL(blob);
          
          if (audioRef.current && isMounted) {
            audioRef.current.src = audioBlobUrl;
            // Short delay to ensure browser acknowledges source
            await new Promise(r => setTimeout(r, 100));
          }
          
          if (isMounted) {
            setLoadingProgress(100);
            setTimeout(() => setAppState(AppState.READY), 500);
          }

        } catch (error) {
          console.warn("Audio pre-fetch failed (likely CORS), switching to native loader:", error);
          
          if (isMounted && audioRef.current) {
            audioRef.current.src = MUSIC_URL;
            audioRef.current.load(); // Trigger load
            
            // Wait for 'canplay' event which means enough data is buffered to start
            const waitForAudio = new Promise<void>((resolve) => {
              const onCanPlay = () => {
                cleanup();
                resolve();
              };
              
              const onError = () => {
                 console.error("Audio load error");
                 cleanup();
                 resolve(); // Resolve anyway to not block app
              };

              const cleanup = () => {
                audioRef.current?.removeEventListener('canplay', onCanPlay);
                audioRef.current?.removeEventListener('error', onError);
              };

              audioRef.current?.addEventListener('canplay', onCanPlay);
              audioRef.current?.addEventListener('error', onError);

              // Fallback timeout: if audio takes >10s, just let user in
              setTimeout(() => {
                cleanup();
                resolve();
              }, 10000);
            });

            // Fake visual progress while waiting
            const interval = setInterval(() => {
               if(isMounted) {
                 setLoadingProgress(prev => prev < 90 ? prev + 1 : prev);
               }
            }, 100);

            await waitForAudio;
            
            clearInterval(interval);
            if (isMounted) {
              setLoadingProgress(100);
              setTimeout(() => setAppState(AppState.READY), 500);
            }
          }
        }
      };

      loadAudio();

      return () => {
        isMounted = false;
      };
    }
  }, [appState]);

  const handleOpenInvitation = () => {
    // Play audio immediately on user interaction
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.log("Playback prevented by browser (will retry on next interaction)", e));
      }
    }
    setAppState(AppState.OPENING);
  };

  return (
    <div className="min-h-screen bg-wedding-cream flex flex-col items-center justify-center overflow-hidden relative">
      {/* Audio element is populated via ref in useEffect */}
      <audio ref={audioRef} loop preload="auto" />

      <AnimatePresence mode="wait">
        {/* 1. Loading State */}
        {appState === AppState.LOADING && (
          <motion.div 
            key="loading"
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50"
          >
            <LoadingScreen progress={loadingProgress} />
          </motion.div>
        )}

        {/* 2. Ready to Open State */}
        {appState === AppState.READY && (
          <motion.div
            key="ready"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center z-40 p-8 text-center"
          >
            <div className="mb-8 relative w-24 h-24">
                <div className="absolute inset-0 bg-wedding-gold opacity-20 rounded-full animate-ping"></div>
                <div className="absolute inset-0 border-2 border-wedding-gold rounded-full flex items-center justify-center bg-white shadow-lg">
                    <span className="text-3xl">💌</span>
                </div>
            </div>
            
            <h1 className="text-3xl font-persian-title text-wedding-dark mb-4">کارت دعوت شما</h1>
            <p className="text-wedding-dark/60 font-persian-body text-lg mb-8">برای مشاهده کارت ضربه بزنید</p>
            
            <button
              onClick={handleOpenInvitation}
              className="bg-wedding-gold text-white px-10 py-3 rounded-full font-persian-title text-xl shadow-lg hover:bg-yellow-600 transition-transform active:scale-95"
            >
              مشاهده کارت
            </button>
          </motion.div>
        )}

        {/* 3. The Invitation Experience */}
        {(appState === AppState.OPENING || appState === AppState.OPENED) && (
          <InvitationCard key="invitation" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;