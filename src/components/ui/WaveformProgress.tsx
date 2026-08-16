'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, X } from 'lucide-react';

interface WaveformProgressProps {
  progress: number; // 0 to 1
  isPlaying: boolean;
  trackTitle: string;
  onClose: () => void;
  onSeek: (percent: number) => void;
}

export const WaveformProgress: React.FC<WaveformProgressProps> = ({
  progress,
  isPlaying,
  trackTitle,
  onClose,
  onSeek
}) => {
  // Generate pseudo-random bar heights based on track title to keep it consistent
  const bars = useMemo(() => {
    const seed = trackTitle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const count = 60;
    return Array.from({ length: count }, (_, i) => {
      const random = Math.sin(seed + i * 0.5) * 0.5 + 0.5;
      return 20 + random * 60; // 20% to 80% height
    });
  }, [trackTitle]);

  const seekFromClientX = (clientX: number, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left;
    onSeek(Math.max(0, Math.min(1, x / rect.width)));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    seekFromClientX(e.clientX, e.currentTarget);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      onSeek(Math.min(1, progress + 0.05));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      onSeek(Math.max(0, progress - 0.05));
    } else if (e.key === 'Home') {
      e.preventDefault();
      onSeek(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      onSeek(1);
    }
  };

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl"
          role="region"
          aria-label={trackTitle}
        >
          <div className="gradient-border bg-black/80 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-accent/20 flex items-center justify-center">
                <Music className="text-brand-accent w-4 h-4" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.25em] mb-0.5">Now Previewing</p>
                <h4 className="text-white text-sm font-bold truncate">{trackTitle}</h4>
              </div>
              <button
                onClick={onClose}
                aria-label="Close preview"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div
              className="relative h-12 flex items-center gap-[2px] cursor-pointer group"
              onClick={handleSeek}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="slider"
              aria-label={`Seek ${trackTitle}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
            >
              {bars.map((height, i) => {
                const barProgress = i / bars.length;
                const isPlayed = barProgress <= progress;

                return (
                  <div
                    key={i}
                    className="flex-1 rounded-full transition-colors duration-300"
                    style={{
                      height: `${height}%`,
                      backgroundColor: isPlayed ? '#FF6B00' : 'rgba(255,255,255,0.1)'
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-brand-accent/20 blur-xl rounded-full -z-10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
