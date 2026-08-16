'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface SectionHeadingProps {
  index: string;
  kicker: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  accentWords?: number[];
  className?: string;
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  kicker,
  title,
  subtitle,
  align = 'left',
  accentWords = [],
  className = '',
}) => {
  const centered = align === 'center';

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
      className={`mb-14 md:mb-20 ${centered ? 'text-center' : 'text-left'} ${className}`}
    >
      <motion.div
        variants={word}
        className={`flex items-center gap-4 mb-5 ${centered ? 'justify-center' : ''}`}
      >
        <span className="font-mono text-[11px] tracking-[0.25em] text-brand-accent">
          {index}
        </span>
        <span className="h-px w-10 bg-brand-accent/40" aria-hidden="true" />
        <span className="kicker">{kicker}</span>
      </motion.div>

      <h2 className="font-display text-3xl md:text-[2.75rem] font-bold leading-[1.15] text-white">
        {title.split(' ').map((w, i) => (
          <motion.span
            key={i}
            variants={word}
            className={`inline-block mr-[0.28em] last:mr-0 ${accentWords.includes(i) ? 'text-brand-accent' : ''}`}
          >
            {w}
          </motion.span>
        ))}
      </h2>

      {subtitle && (
        <motion.p
          variants={word}
          className={`mt-5 text-lg text-gray-400 font-light leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
