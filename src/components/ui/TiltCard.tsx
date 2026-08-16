'use client';

import React, { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  maxRotate?: number;
  glare?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  innerClassName = '',
  maxRotate = 12,
  glare = true,
}) => {
  const reduced = useReducedMotion();
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const update = () => setInteractive(mq.matches && window.innerWidth >= 1024);
    update();
    mq.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [maxRotate, -maxRotate]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-maxRotate, maxRotate]), {
    stiffness: 150,
    damping: 20,
  });

  const glareX = useTransform(mx, [0, 1], ['18%', '82%']);
  const glareY = useTransform(my, [0, 1], ['18%', '82%']);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.13), transparent 55%)`;

  const enabled = interactive && !reduced;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div
      className={`perspective-2000 ${className}`}
      onMouseMove={enabled ? handleMouseMove : undefined}
      onMouseLeave={enabled ? handleMouseLeave : undefined}
    >
      <motion.div
        style={enabled ? { rotateX, rotateY } : undefined}
        className={`transform-style-3d relative ${innerClassName}`}
      >
        {children}
        {glare && enabled && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
            style={{ background: glareBackground }}
          />
        )}
      </motion.div>
    </div>
  );
};
