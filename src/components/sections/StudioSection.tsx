import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { SpotlightCard } from '../ui/SpotlightCard';
import { GlowButton } from '../ui/GlowButton';
import { RevealWrapper } from '../ui/RevealWrapper';
import { Music, SlidersHorizontal, Check } from 'lucide-react';
import { Dictionary } from '@/lib/i18n/dictionaries';

interface StudioSectionProps {
  dict: Dictionary;
}

interface ServiceCardProps {
  dict: Dictionary;
  popular?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ dict, popular = false }) => {
  const isMixing = !popular;
  const title = isMixing ? dict.mixing_title : dict.mastering_title;
  const desc = isMixing ? dict.mixing_desc : dict.mastering_desc;
  const price = isMixing ? dict.mixing_price : dict.mastering_price;
  const cta = isMixing ? dict.mixing_cta : dict.mastering_cta;
  const Icon = isMixing ? SlidersHorizontal : Music;
  const features = isMixing
    ? [dict.mixing_feature1, dict.mixing_feature2, dict.mixing_feature3, dict.mixing_feature4]
    : [dict.mastering_feature1, dict.mastering_feature2, dict.mastering_feature3];

  return (
    <SpotlightCard
      className={`gradient-border bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-8 md:p-10 h-full flex flex-col transition-transform duration-500 hover:-translate-y-1.5 ${
        popular ? 'shadow-glow-orange' : ''
      }`}
    >
      {popular && (
        <div className="absolute top-0 right-0 z-10 bg-brand-accent text-white font-mono text-[10px] font-medium px-4 py-1.5 rounded-bl-xl tracking-[0.2em] uppercase">
          {dict.mastering_popular}
        </div>
      )}

      <div className="w-14 h-14 bg-brand-accent/10 rounded-2xl flex items-center justify-center mb-8 border border-brand-accent/20">
        <Icon className="text-brand-accent" size={26} aria-hidden="true" />
      </div>

      <div className="flex items-baseline justify-between gap-4 mb-4">
        <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
        <div className="text-right shrink-0">
          <p className="kicker !text-[9px] mb-0.5">{dict.price_from}</p>
          <p className="font-display text-2xl font-bold text-white">{price}</p>
        </div>
      </div>

      <p className="text-gray-400 mb-8 leading-relaxed">{desc}</p>

      <ul className="space-y-3.5 mb-10 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center text-gray-300 text-sm">
            <Check className="text-brand-accent mr-3 shrink-0" size={15} aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <GlowButton href="#contact" variant={popular ? 'primary' : 'ghost'} wrapperClassName="w-full" className="w-full">
        {cta}
      </GlowButton>
    </SpotlightCard>
  );
};

export const StudioSection: React.FC<StudioSectionProps> = ({ dict }) => {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          kicker={dict.services_title}
          title={dict.services_heading}
          subtitle={dict.services_desc}
          align="center"
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <RevealWrapper direction="up" className="h-full">
            <ServiceCard dict={dict} />
          </RevealWrapper>
          <RevealWrapper direction="up" delay={0.15} className="h-full">
            <ServiceCard dict={dict} popular />
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
};
