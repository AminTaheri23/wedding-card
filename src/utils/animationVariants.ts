import { Variants } from "framer-motion";

export const cardVariants: Variants = {
  hidden: {
    scale: 0,
    rotate: -180,
    opacity: 0,
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "anticipate",
    },
  },
};

export const contentVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.5 + i * 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

export const zoomVariants: Variants = {
  normal: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  zoomed: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
};

export const zoomContainerVariants: Variants = {
  normal: {
    position: "relative",
    scale: 1,
    zIndex: 10,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  zoomed: {
    position: "fixed",
    scale: 1,
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
};

export const hintVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 2.5,
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};
