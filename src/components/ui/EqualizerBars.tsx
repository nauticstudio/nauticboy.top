import React from 'react';

interface EqualizerBarsProps {
  bars?: number;
  className?: string;
  barClassName?: string;
}

export const EqualizerBars: React.FC<EqualizerBarsProps> = ({
  bars = 5,
  className = '',
  barClassName = 'bg-brand-accent',
}) => (
  <div className={`flex items-end gap-[3px] h-4 ${className}`} aria-hidden="true">
    {Array.from({ length: bars }).map((_, i) => (
      <span
        key={i}
        className={`eq-bar w-[3px] rounded-full ${barClassName}`}
        style={{
          height: '100%',
          animationDuration: `${0.8 + (i % 3) * 0.25}s`,
          animationDelay: `${i * 0.12}s`,
        }}
      />
    ))}
  </div>
);
