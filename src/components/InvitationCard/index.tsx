import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "../../config/weddingConfig";
import { OrnamentTop, OrnamentBottom } from "../Ornament";
import {
  cardVariants,
  contentVariants,
  zoomContainerVariants,
  hintVariants,
} from "../../utils/animationVariants";

export const InvitationCard: React.FC = () => {
  const { navigation } = weddingConfig;
  const [isZoomed, setIsZoomed] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [scale, setScale] = useState(1);
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialScale, setInitialScale] = useState(1);
  const [tapTimer, setTapTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const getDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches);
      setInitialDistance(distance);
      setInitialScale(scale);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistance > 0) {
      const distance = getDistance(e.touches);
      const scaleChange = distance / initialDistance;
      const newScale = Math.min(Math.max(initialScale * scaleChange, 1), 3);
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    setInitialDistance(0);
    if (scale <= 1) {
      setIsZoomed(false);
    } else {
      setIsZoomed(true);
    }
  };

  const handleImageClick = () => {
    if (tapTimer) {
      clearTimeout(tapTimer);
      setTapTimer(null);
      setScale(1);
      setIsZoomed(false);
    } else {
      const timer = setTimeout(() => {
        if (!isZoomed) {
          setScale(1.25);
          setIsZoomed(true);
        }
        setTapTimer(null);
      }, 300);
      setTapTimer(timer);
    }
  };

  const handleZoomClick = () => {
    setScale(1);
    setIsZoomed(false);
  };

  return (
    <>
      <div className="w-full max-w-xs p-3 perspective-1000">
        <motion.div
          className="relative bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-wedding-gold/30"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none" />
          <div className="absolute inset-0 border-double border-4 border-wedding-gold/20 m-2 rounded-lg pointer-events-none" />

          <OrnamentTop className="absolute top-0 left-0 w-full text-wedding-gold h-14 opacity-80" />
          <OrnamentBottom className="absolute bottom-0 left-0 w-full text-wedding-gold h-14 opacity-80" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-6 text-center space-y-4">
            <motion.div
              custom={0}
              variants={contentVariants}
              className="w-full flex-1 flex items-center justify-center relative"
            >
              <AnimatePresence>
                {showHint && !isZoomed && (
                  <motion.div
                    variants={hintVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="bg-wedding-dark/80 text-white px-4 py-2 rounded-full text-sm font-persian-body z-50">
                      برای بزرگنمایی ضربه بزنید
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                variants={zoomContainerVariants}
                animate={isZoomed ? "zoomed" : "normal"}
                className="cursor-pointer touch-none"
                onClick={handleImageClick}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src="./assets/card.jpg"
                  alt="Wedding Card"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </motion.div>
            </motion.div>

            <motion.div
              custom={1}
              variants={contentVariants}
              className="w-full flex gap-2"
            >
              <a
                href={navigation.neshan}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 px-2 bg-wedding-gold text-white font-bold font-persian-body text-xs text-center rounded-lg shadow-md hover:bg-wedding-gold/90 transition-all active:scale-95"
              >
                نشان
              </a>
              <a
                href={navigation.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 px-2 bg-blue-600 text-white font-bold font-persian-body text-xs text-center rounded-lg shadow-md hover:bg-blue-500 transition-all active:scale-95"
              >
                گوگل مپ
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-auto"
            onClick={handleZoomClick}
          >
            <motion.img
              src="./assets/card.jpg"
              alt="Wedding Card Zoomed"
              initial={{ scale: 1 }}
              animate={{ scale }}
              exit={{ scale: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-full max-h-full object-contain cursor-pointer touch-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={(e) => {
                e.stopPropagation();
                handleImageClick();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
