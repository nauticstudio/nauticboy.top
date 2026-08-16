'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'white';
  className?: string;
  wrapperClassName?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  ariaLabel?: string;
  magnetic?: boolean;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  wrapperClassName = '',
  onClick,
  href,
  target,
  ariaLabel,
  magnetic = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [magneticOn, setMagneticOn] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  useEffect(() => {
    if (!magnetic) return;
    const mq = window.matchMedia('(pointer: fine)');
    const update = () => setMagneticOn(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [magnetic]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magneticOn || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.15);
    y.set(relY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles =
    'btn-shimmer relative inline-flex items-center justify-center px-8 py-4 rounded-full font-bold transition-colors duration-300 cursor-pointer';

  const variants = {
    primary:
      'bg-brand-accent text-white shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:shadow-[0_0_35px_rgba(255,107,0,0.6)]',
    secondary:
      'bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/25 shadow-[0_4px_16px_rgba(0,0,0,0.2)]',
    ghost: 'bg-transparent border border-white/10 text-white hover:bg-white/5 hover:border-white/25',
    white:
      'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.45)]',
  };

  const content = (
    <motion.span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      style={magneticOn ? { x: springX, y: springY } : undefined}
    >
      {children}
    </motion.span>
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${wrapperClassName}`}
    >
      {href ? (
        <a
          href={href}
          target={target}
          onClick={onClick}
          aria-label={ariaLabel}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        >
          {content}
        </a>
      ) : (
        <button onClick={onClick} aria-label={ariaLabel}>
          {content}
        </button>
      )}
    </div>
  );
};
