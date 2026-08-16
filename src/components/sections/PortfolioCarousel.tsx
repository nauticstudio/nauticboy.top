'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import type { Work } from '@/lib/data/works';

interface PortfolioCarouselProps {
  works: Work[];
  previewLabel: string;
  viewLabel: string;
}

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

export const PortfolioCarousel: React.FC<PortfolioCarouselProps> = ({
  works,
  previewLabel,
  viewLabel,
}) => {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const progress = duration > 0 ? currentTime / duration : 0;

  const close = () => {
    setSelectedWork(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) audioRef.current.pause();
  };

  // Modal: escape key, scroll lock and initial focus
  useEffect(() => {
    if (!selectedWork) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedWork]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = percent * duration;
    setCurrentTime(percent * duration);
  };

  const hasLink = selectedWork?.ctaLink && selectedWork.ctaLink !== '#';

  return (
    <>
      <div className="relative mt-16">
        <div className="mask-fade-x marquee-hover-pause overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((half) => (
              <div key={half} className="flex gap-6 pr-6 shrink-0" aria-hidden={half === 1}>
                {works.map((work) => (
                  <button
                    key={`${work.id}-${half}`}
                    onClick={() => setSelectedWork(work)}
                    aria-label={`${work.title} — ${work.description}`}
                    className="group relative w-56 md:w-72 aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-brand-accent/40 transition-colors duration-500 cursor-pointer"
                  >
                    <Image
                      src={work.src}
                      alt={work.title}
                      fill
                      sizes="(max-width: 768px) 224px, 288px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end text-left">
                      <p className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em] mb-1.5 line-clamp-1">
                        {work.description}
                      </p>
                      <h4 className="text-white font-bold leading-tight line-clamp-1">{work.title}</h4>
                    </div>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-brand-accent text-white flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-glow-orange">
                      <Play fill="currentColor" size={16} className="ml-0.5" aria-hidden="true" />
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={selectedWork.title}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="gradient-border bg-brand-dark/95 backdrop-blur-2xl rounded-3xl relative overflow-hidden grid md:grid-cols-2">
                <button
                  ref={closeRef}
                  onClick={close}
                  aria-label="Close"
                  className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white/60 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors"
                >
                  <X size={18} aria-hidden="true" />
                </button>

                <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px]">
                  <Image
                    src={selectedWork.src}
                    alt={selectedWork.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/30 hidden md:block" />
                </div>

                <div className="p-8 md:p-10 flex flex-col">
                  <p className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.25em] mb-4">
                    {selectedWork.description}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-6 text-white">
                    {selectedWork.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-10">{selectedWork.content}</p>

                  <div className="mt-auto space-y-6">
                    <div className="flex items-center gap-5">
                      <button
                        onClick={toggleAudio}
                        aria-label={isPlaying ? 'Pause preview' : previewLabel}
                        className="w-14 h-14 shrink-0 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        {isPlaying ? (
                          <Pause fill="currentColor" aria-hidden="true" />
                        ) : (
                          <Play fill="currentColor" className="ml-1" aria-hidden="true" />
                        )}
                      </button>

                      <div className="flex-grow min-w-0">
                        <p className="kicker mb-2">{previewLabel}</p>
                        <div
                          className="h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer"
                          onClick={handleSeek}
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={Math.round(progress * 100)}
                          aria-label="Preview progress"
                        >
                          <div
                            className="h-full bg-brand-accent rounded-full transition-[width] duration-300"
                            style={{ width: `${progress * 100}%` }}
                          />
                        </div>
                        <p className="font-mono text-[10px] text-white/40 mt-2 tracking-widest">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </p>
                      </div>
                    </div>

                    {hasLink && (
                      <a
                        href={selectedWork.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-shimmer flex items-center justify-center gap-2 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-colors group"
                      >
                        <ExternalLink size={18} className="group-hover:text-brand-accent transition-colors" aria-hidden="true" />
                        {viewLabel}
                      </a>
                    )}
                  </div>
                </div>

                <audio
                  ref={audioRef}
                  src={selectedWork.audioSrc}
                  onEnded={() => setIsPlaying(false)}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
