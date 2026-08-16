'use client';

import React from 'react';
import { motion, HTMLMotionProps, useReducedMotion, type Variants } from 'framer-motion';

interface RevealWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const RevealWrapper: React.FC<RevealWrapperProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = "",
  ...props
}) => {
  const reduced = useReducedMotion();

  const variants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3, delay } },
      }
    : {
        hidden: {
          opacity: 0,
          y: direction === 'up' ? 32 : direction === 'down' ? -32 : 0,
          x: direction === 'left' ? 32 : direction === 'right' ? -32 : 0,
          scale: direction === 'none' ? 0.95 : 1,
          filter: 'blur(8px)',
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
