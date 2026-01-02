import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { InvitationCard } from './components/InvitationCard';
import { AppState } from './types';
import { weddingConfig } from './config/weddingConfig';
import { useAudio } from './hooks/useAudio';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);
  const { loadingProgress, audioRef, loadAudio, playAudio } = useAudio();

  useEffect(() => {
    if (appState === AppState.LOADING) {
      loadAudio(weddingConfig.audio.url).then(() => {
        setTimeout(() => setAppState(AppState.READY), 500);
      });
    }
  }, [appState, loadAudio]);

  const handleOpenInvitation = () => {
    playAudio(weddingConfig.audio.volume);
    setAppState(AppState.OPENING);
  };

  return (
    <div className="min-h-screen bg-wedding-cream flex flex-col items-center justify-center overflow-hidden relative">
      <audio ref={audioRef} loop preload="auto" />

      <AnimatePresence mode="wait">
        {appState === AppState.LOADING && (
          <motion.div 
            key="loading"
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50"
          >
            <LoadingScreen progress={loadingProgress} />
          </motion.div>
        )}

        {appState === AppState.READY && (
          <motion.div
            key="ready"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center z-40 p-6 text-center"
          >
            <div className="mb-6 relative w-20 h-20">
                <div className="absolute inset-0 bg-wedding-gold opacity-20 rounded-full animate-ping"></div>
                <div className="absolute inset-0 border-2 border-wedding-gold rounded-full flex items-center justify-center bg-white shadow-lg">
                    <span className="text-2xl">💌</span>
                </div>
            </div>

            <h1 className="text-2xl font-persian-title text-wedding-dark mb-3">کارت دعوت شما</h1>
            <p className="text-wedding-dark/60 font-persian-body text-base mb-6">{weddingConfig.message.invitationText}</p>

            <button
              onClick={handleOpenInvitation}
              className="bg-wedding-gold text-white px-8 py-2.5 rounded-full font-persian-title text-lg shadow-lg hover:bg-yellow-600 transition-transform active:scale-95"
            >
              مشاهده کارت
            </button>
          </motion.div>
        )}

        {(appState === AppState.OPENING || appState === AppState.OPENED) && (
          <InvitationCard key="invitation" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
