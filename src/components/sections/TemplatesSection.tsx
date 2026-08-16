import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealWrapper } from '../ui/RevealWrapper';
import { templates } from '@/lib/data/templates';
import { SCPlayerWrapper } from './SCPlayerWrapper';
import Script from 'next/script';
import { Dictionary } from '@/lib/i18n/dictionaries';

interface TemplatesSectionProps {
  dict: Dictionary;
}

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({ dict }) => {
  return (
    <section id="templates" className="py-24 relative overflow-hidden">
      <Script src="https://w.soundcloud.com/player/api.js" strategy="afterInteractive" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          kicker={dict.templates_title}
          title={dict.templates_heading}
          subtitle={dict.templates_desc}
          align="center"
        />

        <RevealWrapper direction="up">
          <SCPlayerWrapper tracks={templates} ctaText={dict.template_cta} />
        </RevealWrapper>
      </div>
    </section>
  );
};
