'use client';

import React from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Wrench } from 'lucide-react';
import { GlowButton } from '../ui/GlowButton';
import { EqualizerBars } from '../ui/EqualizerBars';
import { TiltCard } from '../ui/TiltCard';
import { CountUp } from '../ui/CountUp';
import { Dictionary } from '@/lib/i18n/dictionaries';

interface HeroSectionProps {
  dict: Dictionary;
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({ dict }) => {
  const marqueeItems = dict.hero_marquee.split('·').map((s) => s.trim()).filter(Boolean);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full bg-brand-accent/10 blur-[140px] animate-drift"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -right-40 w-[40rem] h-[40rem] rounded-full bg-brand-violet/10 blur-[160px] animate-drift-slow"
      />

      <div className="relative flex-1 flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Copy */}
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.div variants={item} className="inline-flex items-center gap-3 rounded-full glass-card px-4 py-2 mb-8">
              <EqualizerBars bars={4} className="h-3" />
              <span className="kicker text-white/60">{dict.hero_kicker}</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display text-[2.75rem] sm:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] text-white mb-6"
            >
              {dict.hero_title.split(' ').map((word, i, arr) => (
                <span
                  key={i}
                  className={`inline-block mr-[0.25em] last:mr-0 ${i === arr.length - 1 ? 'text-gradient' : ''}`}
                >
                  {word}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed font-light mb-10"
            >
              {dict.hero_desc}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 mb-14">
              <GlowButton href="#services" className="gap-2">
                {dict.hero_cta1}
                <ArrowRight size={18} />
              </GlowButton>
              <GlowButton href="#software" variant="secondary" className="gap-2">
                <Wrench size={18} />
                {dict.hero_cta2}
              </GlowButton>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-8 md:gap-10">
              <div>
                <p className="font-display text-2xl md:text-3xl font-bold text-white">
                  <CountUp to={100} suffix="+" />
                </p>
                <p className="kicker mt-1">{dict.about_tracks}</p>
              </div>
              <div className="h-10 w-px bg-white/10" aria-hidden="true" />
              <div>
                <p className="font-display text-2xl md:text-3xl font-bold text-white">
                  <CountUp to={10} suffix="+" />
                </p>
                <p className="kicker mt-1">{dict.about_years}</p>
              </div>
              <div className="h-10 w-px bg-white/10" aria-hidden="true" />
              <div>
                <p className="font-display text-2xl md:text-3xl font-bold text-white">
                  <CountUp to={5} decimals={1} suffix="★" />
                </p>
                <p className="kicker mt-1">{dict.about_rating}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual: studio composition with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.25 }}
            className="relative hidden md:block"
          >
            <TiltCard innerClassName="rounded-3xl" maxRotate={10}>
              <div
                aria-hidden="true"
                className="absolute -inset-12 bg-brand-accent/15 blur-[110px] rounded-full animate-pulse"
              />

              <div className="relative rounded-3xl overflow-hidden gradient-border shadow-[0_40px_80px_rgba(0,0,0,0.7)]">
                <Image
                  src="/images/studio.jpg"
                  alt="Nautic Studio"
                  width={880}
                  height={660}
                  priority
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/20" />
                <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                    Mix &amp; Mastering Suite
                  </p>
                  <EqualizerBars bars={5} className="h-4" />
                </div>
              </div>

              {/* Depth chips */}
              <div className="absolute -top-5 -right-4 md:-right-8 z-20 [transform:translateZ(70px)] animate-float">
                <div className="glass-card bg-black/70 px-4 py-3 rounded-xl shadow-2xl">
                  <p className="font-mono text-xs text-brand-accent tracking-widest">−14 LUFS</p>
                  <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Master Target</p>
                </div>
              </div>

              <div
                className="absolute -bottom-6 -left-4 md:-left-8 z-20 [transform:translateZ(55px)] animate-float"
                style={{ animationDelay: '1.4s' }}
              >
                <div className="glass-card bg-black/70 px-4 py-3 rounded-xl shadow-2xl">
                  <p className="font-mono text-xs text-white tracking-widest">44.1 kHz / 24-bit</p>
                  <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Lossless Chain</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="relative hidden md:flex flex-col items-center gap-3 pb-8 mx-auto text-white/40 hover:text-white/80 transition-colors"
        aria-label={dict.hero_scroll}
      >
        <span className="kicker">{dict.hero_scroll}</span>
        <span className="block w-px h-10 bg-white/15 overflow-hidden">
          <span className="block w-full h-full bg-brand-accent animate-scroll-line" />
        </span>
      </motion.a>

      {/* Mono ticker */}
      <div className="relative border-t border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden">
        <div className="mask-fade-x py-4">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((half) => (
              <div key={half} className="flex items-center shrink-0" aria-hidden={half === 1}>
                {marqueeItems.map((entry, i) => (
                  <React.Fragment key={`${half}-${i}`}>
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/35 whitespace-nowrap px-6">
                      {entry}
                    </span>
                    <span className="text-brand-accent/50 text-[8px]" aria-hidden="true">◆</span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
