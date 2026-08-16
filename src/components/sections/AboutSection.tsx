import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealWrapper } from '../ui/RevealWrapper';
import { CountUp } from '../ui/CountUp';
import { EqualizerBars } from '../ui/EqualizerBars';
import Image from 'next/image';
import { Dictionary } from '@/lib/i18n/dictionaries';

interface AboutSectionProps {
  dict: Dictionary;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ dict }) => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-brand-accent/10 blur-[140px] animate-drift"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <RevealWrapper direction="right">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 bg-linear-to-br from-brand-accent to-brand-violet rounded-[2rem] opacity-25 blur-2xl animate-pulse"
              />
              <div className="relative rounded-3xl overflow-hidden gradient-border shadow-[0_30px_60px_rgba(0,0,0,0.6)] aspect-4/5 max-w-md mx-auto">
                <Image
                  src="/images/studio.jpg"
                  alt="Nautic Studio"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-[72%_center]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10">
                <div className="glass-card bg-black/70 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-4">
                  <EqualizerBars bars={4} className="h-3.5" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 whitespace-nowrap">
                    Nautic Studio
                  </p>
                </div>
              </div>
            </div>
          </RevealWrapper>

          {/* Text Column */}
          <div>
            <SectionHeading
              index="06"
              kicker={dict.nav_about}
              title={dict.about_title}
              accentWords={[2, 3]}
            />

            <RevealWrapper direction="left">
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                {dict.about_p1}
              </p>

              <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                {dict.about_p2}
              </p>

              <div className="grid grid-cols-3 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-8 relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-8 top-1/2 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"
                />
                {[
                  { value: 100, suffix: '+', decimals: 0, label: dict.about_tracks },
                  { value: 10, suffix: '+', decimals: 0, label: dict.about_years },
                  { value: 5, suffix: '★', decimals: 1, label: dict.about_rating },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <p className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                      <CountUp to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                    </p>
                    <p className="kicker">{stat.label}</p>
                  </div>
                ))}
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};
