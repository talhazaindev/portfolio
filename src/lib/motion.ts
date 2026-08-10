/**
 * Motion tier presets for the brand animation system.
 * Functional 150–220ms · Interface 300–500ms · Cinematic 600–1000ms
 */

export const motionTiers = {
  functional: {
    duration: 0.18,
    ease: [0.22, 1, 0.36, 1] as const,
  },
  interface: {
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1] as const,
  },
  cinematic: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as const,
  },
} as const;

export const revealVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTiers.interface,
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const heroStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};
