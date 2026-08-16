'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { Testimonial } from '@/lib/data/testimonials';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused, activeIndex, testimonials.length]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  };

  return (
    <div
      className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Artist reviews"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Image Stack */}
      <div className="relative h-[380px] md:h-[480px] w-full perspective-2000">
        <AnimatePresence mode="popLayout">
          {testimonials.map((testimonial, index) => {
            const isActive = index === activeIndex;
            const offset = (index - activeIndex + testimonials.length) % testimonials.length;

            return isActive ? (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, z: 10 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0 z-30"
              >
                <div className="relative w-full h-full rounded-3xl overflow-hidden gradient-border shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)]">
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ) : offset === 1 ? (
              <div
                key={testimonial.id}
                className="absolute inset-0 z-20 transform translate-x-8 translate-y-8 scale-95 opacity-40 blur-[2px]"
              >
                <Image
                  src={testimonial.src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover rounded-3xl grayscale"
                  aria-hidden="true"
                />
              </div>
            ) : null;
          })}
        </AnimatePresence>
      </div>

      {/* Content Column */}
      <div className="flex flex-col justify-center" aria-live="polite">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Quote className="text-brand-accent mb-8" size={44} aria-hidden="true" />

          <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed italic mb-10 font-light">
            &ldquo;{testimonials[activeIndex].quote}&rdquo;
          </p>

          <div className="mb-12">
            <h3 className="font-display text-xl font-semibold mb-1.5 text-white">
              {testimonials[activeIndex].name}
            </h3>
            <p className="font-mono text-[11px] text-brand-accent uppercase tracking-[0.25em]">
              {testimonials[activeIndex].role}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] tracking-[0.25em] text-white/40">
              {String(activeIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>

            <div className="flex gap-2.5" role="tablist" aria-label="Select review">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Review ${i + 1}: ${t.name}`}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === activeIndex ? 'w-8 bg-brand-accent' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3 ml-auto">
              <button
                onClick={prev}
                aria-label="Previous review"
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-accent/30 transition-all"
              >
                <ChevronLeft className="text-gray-400 group-hover:text-white transform group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
              </button>
              <button
                onClick={next}
                aria-label="Next review"
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-accent/30 transition-all"
              >
                <ChevronRight className="text-gray-400 group-hover:text-white transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
