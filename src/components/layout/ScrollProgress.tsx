'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 z-[60] h-[2px] origin-left bg-linear-to-r from-brand-secondary via-brand-accent to-brand-glow"
      style={{ scaleX }}
    />
  );
};
