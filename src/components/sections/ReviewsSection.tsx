import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { testimonials } from '@/lib/data/testimonials';
import { TestimonialSlider } from './TestimonialSlider';
import { Dictionary } from '@/lib/i18n/dictionaries';

interface ReviewsSectionProps {
  dict: Dictionary;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ dict }) => {
  return (
    <section id="reviews" className="py-24 relative overflow-hidden bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="07"
          kicker={dict.reviews_kicker}
          title={dict.reviews_title}
          subtitle={dict.reviews_desc}
          align="center"
        />

        <TestimonialSlider testimonials={testimonials} />
      </div>
    </section>
  );
};
