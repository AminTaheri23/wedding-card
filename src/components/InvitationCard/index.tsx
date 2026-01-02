import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '../../config/weddingConfig';
import { OrnamentTop, OrnamentBottom } from '../Ornament';
import { cardVariants, contentVariants } from '../../utils/animationVariants';

export const InvitationCard: React.FC = () => {
  const { couple, event, message, navigation } = weddingConfig;

  return (
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

          <motion.div custom={0} variants={contentVariants} className="space-y-1 mt-3">
            <h2 className="text-base text-wedding-gold font-persian-body">{message.greeting}</h2>
          </motion.div>

          <motion.div custom={1} variants={contentVariants} className="space-y-3 my-1">
            <h1 className="text-3xl font-persian-title text-wedding-dark drop-shadow-sm leading-tight">
              {couple.bride}
            </h1>
            <div className="flex items-center justify-center space-x-2 space-x-reverse text-wedding-gold">
               <span className="h-px w-6 bg-current opacity-50"></span>
               <span className="text-lg font-serif">و</span>
               <span className="h-px w-6 bg-current opacity-50"></span>
            </div>
            <h1 className="text-3xl font-persian-title text-wedding-dark drop-shadow-sm leading-tight">
              {couple.groom}
            </h1>
          </motion.div>

          <motion.div custom={2} variants={contentVariants} className="w-full px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-wedding-gold/40 to-transparent"></div>
          </motion.div>

          <motion.div custom={3} variants={contentVariants} className="space-y-1.5 font-persian-body text-base text-wedding-dark/90 leading-relaxed">
            {message.body.map((line, index) => (
              <p key={index} className={`${index > 1 ? 'font-bold text-wedding-dark' : 'text-wedding-dark/80'}`}>
                {line}
              </p>
            ))}
          </motion.div>

          <motion.div custom={4} variants={contentVariants} className="w-full space-y-2 font-persian-body text-sm text-wedding-dark bg-wedding-gold/5 p-3 rounded-lg border border-wedding-gold/10">
            <div className="flex items-center justify-between border-b border-wedding-gold/20 pb-1.5">
              <span className="text-wedding-gold font-bold">{event.dateLabel}</span>
              <span>{event.date}</span>
            </div>

            <div className="flex items-center justify-between border-b border-wedding-gold/20 pb-1.5">
              <span className="text-wedding-gold font-bold">{event.timeLabel}</span>
              <span>{event.time}</span>
            </div>

            <div className="flex items-center justify-between border-b border-wedding-gold/20 pb-1.5">
              <span className="text-wedding-gold font-bold">{event.locationLabel}</span>
              <span>{event.location}</span>
            </div>
          </motion.div>

          <motion.div custom={5} variants={contentVariants} className="w-full flex gap-2">
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
  );
};
