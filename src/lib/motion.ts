/**
 * Motion tier presets for the brand animation system.
 * Micro 140–180ms · Component 220–320ms · Section 400–550ms · Narrative 600–1200ms
 */

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const motionTiers = {
  micro: {
    duration: 0.16,
    ease: motionEase,
  },
  functional: {
    duration: 0.18,
    ease: motionEase,
  },
  component: {
    duration: 0.28,
    ease: motionEase,
  },
  interface: {
    duration: 0.4,
    ease: motionEase,
  },
  section: {
    duration: 0.48,
    ease: motionEase,
  },
  cinematic: {
    duration: 0.8,
    ease: motionEase,
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
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};
