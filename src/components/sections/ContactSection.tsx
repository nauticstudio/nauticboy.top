import React from 'react';
import { RevealWrapper } from '../ui/RevealWrapper';
import { InstagramIcon } from '../ui/Icons';
import { MessageSquare } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { Dictionary } from '@/lib/i18n/dictionaries';

interface ContactSectionProps {
  dict: Dictionary;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ dict }) => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealWrapper direction="up">
          <div className="gradient-border bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-glow-violet">
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 w-72 h-72 bg-brand-accent/10 rounded-full blur-[110px] animate-pulse"
            />

            <div className="relative z-10">
              <div className="text-center mb-14">
                <div className="flex items-center justify-center gap-4 mb-5">
                  <span className="font-mono text-[11px] tracking-[0.25em] text-brand-accent">08</span>
                  <span className="h-px w-10 bg-brand-accent/40" aria-hidden="true" />
                  <span className="kicker">{dict.nav_contact}</span>
                </div>
                <h2 className="font-display text-3xl md:text-[2.75rem] font-bold leading-[1.15] text-white mb-5">
                  {dict.contact_title}
                </h2>
                <p className="text-gray-400 text-lg max-w-xl mx-auto">{dict.contact_desc}</p>
              </div>

              <ContactForm dict={dict} />

              {/* Social Links */}
              <div className="flex justify-center gap-10 mt-16 border-t border-white/5 pt-12">
                <a
                  href="https://www.instagram.com/nautic.studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <InstagramIcon size={22} className="group-hover:text-brand-accent transition-colors" />
                  <span className="font-mono text-[11px] tracking-[0.25em] uppercase">Instagram</span>
                </a>
                <a
                  href="https://t.me/+QJCKqq-wpR45MmJh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <MessageSquare size={22} className="group-hover:text-brand-violet transition-colors" />
                  <span className="font-mono text-[11px] tracking-[0.25em] uppercase">Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
};
