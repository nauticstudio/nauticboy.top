import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { works } from '@/lib/data/works';
import { PortfolioCarousel } from './PortfolioCarousel';
import { Dictionary } from '@/lib/i18n/dictionaries';

interface PortfolioSectionProps {
  dict: Dictionary;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ dict }) => {
  return (
    <section id="work" className="py-24 relative overflow-hidden bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          kicker={dict.work_title}
          title={dict.work_subtitle}
          align="center"
        />

        <PortfolioCarousel
          works={works}
          previewLabel={dict.work_preview}
          viewLabel={dict.work_view}
        />
      </div>
    </section>
  );
};
