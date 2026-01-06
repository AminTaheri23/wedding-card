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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
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
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-wedding-dark/80 text-white px-4 py-2 rounded-full text-sm font-persian-body z-20 pointer-events-none"
                  >
                    برای بزرگنمایی ضربه بزنید
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                variants={zoomContainerVariants}
                animate={isZoomed ? "zoomed" : "normal"}
                className="cursor-pointer"
                onClick={handleImageClick}
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
            onClick={handleImageClick}
          >
            <motion.img
              src="./assets/card.jpg"
              alt="Wedding Card Zoomed"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-full max-h-full object-contain cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
