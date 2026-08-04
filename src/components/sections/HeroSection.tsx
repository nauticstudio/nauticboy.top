import React from 'react';
import { GlowButton } from '../ui/GlowButton';
import { ParticleField } from '../ui/ParticleField';
import { HeroParallax } from './HeroParallax';
import { RevealWrapper } from '../ui/RevealWrapper';
import { ChevronDown, Download, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Dictionary } from '@/lib/i18n/dictionaries';

interface HeroSectionProps {
  dict: Dictionary;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ dict }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ParticleField />
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-violet/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="max-w-xl">
            <RevealWrapper direction="right">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-xl">
                   <Image src="/images/np_64x64.png" alt="NauticPlayer" width={32} height={32} />
                </div>
                <span className="text-sm font-bold tracking-widest text-brand-accent uppercase">Now Playing</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                <span className="text-gradient">NauticPlayer</span>
              </h1>
              
              <p 
                className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed font-light"
                dangerouslySetInnerHTML={{ __html: dict.software_tagline }}
              />
            </RevealWrapper>
            
            <ul className="space-y-4 mb-10">
              {[
                dict.software_feature1,
                dict.software_feature2,
                dict.software_feature3
              ].map((feature, i) => (
                <RevealWrapper key={i} direction="right" delay={0.2 + i * 0.1}>
                  <li className="flex items-start text-gray-400">
                    <span className="text-brand-accent mr-3 mt-1 text-sm">✓</span>
                    <span dangerouslySetInnerHTML={{ __html: feature }} />
                  </li>
                </RevealWrapper>
              ))}
            </ul>

            <RevealWrapper direction="up" delay={0.6}>
              <div className="flex flex-wrap gap-4">
                <GlowButton href="https://player.nauticboy.top" className="gap-2">
                  <Download size={20} />
                  {dict.software_cta}
                </GlowButton>
                <GlowButton href="#services" variant="secondary" className="gap-2">
                  {dict.hero_cta1}
                  <ExternalLink size={18} />
                </GlowButton>
              </div>
            </RevealWrapper>
          </div>

          {/* Interactive 3D Mockup (Client Component) */}
          <HeroParallax />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 cursor-pointer hover:text-white transition-colors">
        <ChevronDown size={32} className="animate-bounce" />
      </div>
    </section>
  );
};
