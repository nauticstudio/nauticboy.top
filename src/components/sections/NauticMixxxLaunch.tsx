'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, AudioWaveform, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Dictionary } from '@/lib/i18n/dictionaries';
import { GlowButton } from '../ui/GlowButton';

interface NauticMixxxLaunchProps {
  dict: Dictionary;
}

const NAUTICMIXXX_URL = 'https://nauticmixxx.nauticboy.top';
const channels = [72, 53, 64, 81];
const waveform = [24, 46, 70, 38, 82, 58, 92, 44, 68, 34, 78, 55, 88, 48, 73, 31, 64, 84, 52, 40, 76, 60, 90, 43];

export const NauticMixxxLaunch: React.FC<NauticMixxxLaunchProps> = ({ dict }) => {
  const chips = [dict.mixxx_chip_1, dict.mixxx_chip_2, dict.mixxx_chip_3];

  return (
    <section id="nauticmixxx" className="relative overflow-hidden border-y border-white/5 bg-[#f0eee9] py-20 text-[#191917] md:py-28">
      <div className="pointer-events-none absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-brand-accent/10 blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-lg border border-[#f05a24]/20 bg-white/50 px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#c74315]">
              <Sparkles size={13} aria-hidden="true" />
              {dict.mixxx_eyebrow}
            </div>
            <h2 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-[5.3rem]">
              Nautic<span className="text-[#f05a24]">Mixxx</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-[#68655f] md:text-xl">{dict.mixxx_desc}</p>
          </div>

          <GlowButton href={NAUTICMIXXX_URL} target="_blank" className="gap-2 bg-[#191917]! shadow-[0_10px_28px_rgba(25,25,23,0.2)]! hover:shadow-[0_14px_34px_rgba(25,25,23,0.28)]!">
            {dict.mixxx_cta}
            <ArrowUpRight size={18} />
          </GlowButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-[#191918] shadow-[0_35px_80px_rgba(25,25,23,0.2)]"
        >
          <div className="flex h-10 items-center justify-between border-b border-white/5 bg-[#262624] px-4">
            <div className="flex gap-1.5" aria-hidden="true">
              <i className="h-2 w-2 rounded-full bg-[#f2694f]" />
              <i className="h-2 w-2 rounded-full bg-[#ddb553]" />
              <i className="h-2 w-2 rounded-full bg-[#65ad70]" />
            </div>
            <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">NauticMixxx · Preview</span>
            <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-white/35"><i className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{dict.mixxx_preview}</span>
          </div>

          <div className="grid min-h-[410px] md:grid-cols-[1.25fr_0.75fr]">
            <div className="relative border-b border-white/5 p-6 md:border-b-0 md:border-r md:p-9">
              <div className="mb-7 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">Session overview</span>
                <span className="flex items-center gap-2 font-mono text-[9px] text-white/35"><AudioWaveform size={13} />44.1 kHz · 24 bit</span>
              </div>
              <div className="relative flex h-32 items-center justify-around gap-1 overflow-hidden rounded-xl border border-white/5 bg-black/20 px-3">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[28px_28px]" />
                {waveform.map((height, index) => (
                  <i key={index} className="relative w-1 rounded-full bg-linear-to-t from-[#db4314] to-[#ffad78]" style={{ height: `${height}%` }} />
                ))}
                <i className="absolute inset-y-0 left-[48%] w-px bg-white/70" />
              </div>

              <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-4">
                {channels.map((level, index) => (
                  <div key={level} className="flex h-40 flex-col items-center justify-end rounded-xl border border-white/5 bg-white/[0.025] p-3">
                    <div className="relative h-full w-1.5 overflow-hidden rounded-full bg-white/5">
                      <i className="absolute inset-x-0 bottom-0 rounded-full bg-linear-to-t from-emerald-500 via-amber-400 to-red-400" style={{ height: `${level}%` }} />
                    </div>
                    <span className="mt-3 font-mono text-[7px] tracking-[0.12em] text-white/40">CH {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between p-7 md:p-9">
              <div>
                <SlidersHorizontal className="mb-6 text-[#f05a24]" size={25} />
                <p className="font-display text-2xl font-medium leading-tight tracking-[-0.04em] text-white md:text-3xl">{dict.mixxx_title}</p>
              </div>
              <div className="mt-12 space-y-3">
                {chips.map((chip, index) => (
                  <div key={chip} className="flex items-center gap-3 border-t border-white/5 pt-3">
                    <span className="font-mono text-[8px] text-[#f05a24]">0{index + 1}</span>
                    <span className="text-sm text-white/55">{chip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
