import { Variants } from 'framer-motion';

export const cardVariants: Variants = {
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

export const contentVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.5 + (i * 0.2),
      duration: 0.8,
      ease: "easeOut"
    }
  })
};
