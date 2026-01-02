import React from 'react';
import { motion, Variants } from 'framer-motion';
import { WEDDING_DATA } from '../constants';
import { OrnamentTop, OrnamentBottom } from './Ornament';

export const InvitationCard: React.FC = () => {
  // Swirl and scale in animation
  const cardVariants: Variants = {
    hidden: { 
      scale: 0, 
      rotate: -180, 
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: "anticipate"
      }
    }
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5 + (i * 0.2), // Wait for card to settle, slightly faster sequence
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="w-full max-w-sm p-4 perspective-1000">
      <motion.div
        className="relative bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-wedding-gold/30"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none" />
        <div className="absolute inset-0 border-double border-4 border-wedding-gold/20 m-2 rounded-lg pointer-events-none" />
        
        {/* Ornaments */}
        <OrnamentTop className="absolute top-0 left-0 w-full text-wedding-gold h-16 opacity-80" />
        <OrnamentBottom className="absolute bottom-0 left-0 w-full text-wedding-gold h-16 opacity-80" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 py-8 text-center space-y-5">
          
          {/* Header */}
          <motion.div custom={0} variants={contentVariants} className="space-y-1 mt-4">
            <h2 className="text-lg text-wedding-gold font-persian-body">به نام خدا</h2>
          </motion.div>

          {/* Names - Bride First */}
          <motion.div custom={1} variants={contentVariants} className="space-y-4 my-2">
            <h1 className="text-4xl font-persian-title text-wedding-dark drop-shadow-sm leading-tight">
              {WEDDING_DATA.bride}
            </h1>
            <div className="flex items-center justify-center space-x-3 space-x-reverse text-wedding-gold">
               <span className="h-px w-8 bg-current opacity-50"></span>
               <span className="text-xl font-serif">&</span>
               <span className="h-px w-8 bg-current opacity-50"></span>
            </div>
            <h1 className="text-4xl font-persian-title text-wedding-dark drop-shadow-sm leading-tight">
              {WEDDING_DATA.groom}
            </h1>
          </motion.div>

          {/* Divider */}
          <motion.div custom={2} variants={contentVariants} className="w-full px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-wedding-gold/40 to-transparent"></div>
          </motion.div>

          {/* Poem / Body Text */}
          <motion.div custom={3} variants={contentVariants} className="space-y-2 font-persian-body text-xl text-wedding-dark/90 leading-relaxed">
            {WEDDING_DATA.bodyText.map((line, index) => (
              <p key={index} className={`${index > 1 ? 'font-bold text-wedding-dark' : 'text-wedding-dark/80'}`}>
                {line}
              </p>
            ))}
          </motion.div>

          {/* Information Grid */}
          <motion.div custom={4} variants={contentVariants} className="w-full space-y-3 font-persian-body text-lg text-wedding-dark bg-wedding-gold/5 p-4 rounded-lg border border-wedding-gold/10">
            <div className="flex items-center justify-between border-b border-wedding-gold/20 pb-2">
              <span className="text-wedding-gold font-bold">{WEDDING_DATA.dateLabel}</span>
              <span>جمعه، ۲۴ شهریور ۱۴۰۳</span>
            </div>

            <div className="flex items-center justify-between border-b border-wedding-gold/20 pb-2">
              <span className="text-wedding-gold font-bold">{WEDDING_DATA.timeLabel}</span>
              <span>از ساعت ۱۹ الی ۲۳</span>
            </div>

            <div className="flex items-center justify-between border-b border-wedding-gold/20 pb-2">
              <span className="text-wedding-gold font-bold">{WEDDING_DATA.locationLabel}</span>
              <span>تهران</span>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};