'use client';

import React from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { Download, Cpu, Zap, AudioLines } from 'lucide-react';
import { GlowButton } from '../ui/GlowButton';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealWrapper } from '../ui/RevealWrapper';
import { TiltCard } from '../ui/TiltCard';
import { Dictionary } from '@/lib/i18n/dictionaries';

interface SoftwareSectionProps {
  dict: Dictionary;
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export const SoftwareSection: React.FC<SoftwareSectionProps> = ({ dict }) => {
  const features = [
    { text: dict.software_feature1, Icon: Cpu },
    { text: dict.software_feature2, Icon: Zap },
    { text: dict.software_feature3, Icon: AudioLines },
  ];

  return (
    <section id="software" className="py-24 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-52 w-[34rem] h-[34rem] rounded-full bg-brand-violet/10 blur-[150px] animate-drift-slow"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          kicker={dict.software_title}
          title="NauticPlayer"
          subtitle={dict.software_desc}
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
            <motion.h3
              variants={item}
              className="text-3xl md:text-4xl font-light text-white leading-snug mb-10"
              dangerouslySetInnerHTML={{ __html: dict.software_tagline }}
            />

            <div className="space-y-5 mb-12">
              {features.map(({ text, Icon }, i) => (
                <motion.div key={i} variants={item} className="flex items-start gap-4">
                  <span className="shrink-0 w-11 h-11 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
                    <Icon className="text-brand-accent" size={20} aria-hidden="true" />
                  </span>
                  <p
                    className="text-gray-400 leading-relaxed pt-2.5 [&_strong]:text-white [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div variants={item} className="flex flex-wrap items-center gap-6">
              <GlowButton href="https://player.nauticboy.top" target="_blank" className="gap-2">
                <Download size={18} />
                {dict.software_cta}
              </GlowButton>
              <span className="kicker">macOS · Apple Silicon · Native</span>
            </motion.div>
          </motion.div>

          {/* 3D mockup */}
          <RevealWrapper direction="left" delay={0.15} className="hidden lg:block">
            <TiltCard innerClassName="rounded-3xl" maxRotate={14}>
              <div
                aria-hidden="true"
                className="absolute -inset-10 bg-brand-violet/20 blur-[100px] rounded-full animate-pulse"
              />

              <div className="relative rounded-3xl overflow-hidden gradient-border shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                <Image
                  src="/images/player-bl.webp"
                  alt="NauticPlayer Interface"
                  width={600}
                  height={400}
                  priority
                  className="relative z-10 w-full h-auto"
                />
              </div>

              <div className="absolute -top-6 -right-6 z-20 [transform:translateZ(75px)] animate-float">
                <div className="glass-card bg-black/70 px-4 py-3 rounded-xl shadow-2xl">
                  <p className="font-mono text-xs text-white tracking-widest">AVAudioEngine</p>
                  <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Native Core</p>
                </div>
              </div>

              <div
                className="absolute -bottom-6 -left-6 z-20 [transform:translateZ(60px)] animate-float"
                style={{ animationDelay: '1.2s' }}
              >
                <div className="glass-card bg-black/70 px-4 py-3 rounded-xl shadow-2xl">
                  <p className="font-mono text-xs text-brand-accent tracking-widest">Automix</p>
                  <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Menu Bar DJ</p>
                </div>
              </div>
            </TiltCard>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
};
