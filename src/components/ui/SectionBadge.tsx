import React from 'react';

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({ children, className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[10px] font-medium tracking-[0.3em] uppercase bg-brand-accent/10 text-brand-accent border border-brand-accent/20 mb-4 ${className}`}>
      {children}
    </span>
  );
};
