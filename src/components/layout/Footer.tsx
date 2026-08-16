import React from 'react';
import { InstagramIcon } from '../ui/Icons';
import { Send, ArrowUp } from 'lucide-react';
import { NewsletterForm } from '../ui/NewsletterForm';
import { Dictionary } from '@/lib/i18n/dictionaries';

interface FooterProps {
  dict: Dictionary;
}

export const Footer: React.FC<FooterProps> = ({ dict }) => {
  return (
    <footer className="bg-black pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      <div className="hairline absolute top-0 left-1/2 -translate-x-1/2 max-w-4xl" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="col-span-1 lg:col-span-1">
            <a href="#top" className="inline-block font-bold tracking-tighter text-white text-2xl mb-6" aria-label="Nautic Boy — back to top">
              NAUTIC<span className="text-brand-accent">BOY</span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">{dict.footer_desc}</p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/nautic.studio/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-brand-accent hover:text-white hover:border-brand-accent hover:scale-105 transition-all"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://t.me/+QJCKqq-wpR45MmJh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-brand-violet hover:text-white hover:border-brand-violet hover:scale-105 transition-all"
              >
                <Send size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-8">{dict.footer_services}</h4>
            <ul className="space-y-4">
              {[
                { name: dict.mixing_title, href: '#services' },
                { name: dict.mastering_title, href: '#services' },
                { name: 'DJ / Live Acts', href: '#dj' },
                { name: dict.nav_software, href: '#software' },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-500 hover:text-white transition-colors text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-8">{dict.footer_nav}</h4>
            <ul className="space-y-4">
              {[
                { name: dict.nav_studio, href: '#services' },
                { name: dict.nav_releases, href: '#dj' },
                { name: dict.nav_templates, href: '#templates' },
                { name: dict.nav_portfolio, href: '#work' },
                { name: dict.nav_about, href: '#about' },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-500 hover:text-white transition-colors text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-8">{dict.footer_newsletter}</h4>
            <p className="text-gray-500 text-sm mb-6">{dict.footer_newsletter_desc}</p>
            <NewsletterForm placeholder={dict.footer_email_ph} submitLabel={dict.footer_subscribe} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/5">
          <p className="font-mono text-[11px] tracking-widest text-gray-600">
            © {new Date().getFullYear()} NAUTIC BOY &amp; STUDIO — {dict.footer_rights}
          </p>

          <div className="flex gap-8">
            <a href="#" className="text-gray-600 hover:text-white text-xs transition-colors">{dict.footer_privacy}</a>
            <a href="#" className="text-gray-600 hover:text-white text-xs transition-colors">{dict.footer_terms}</a>
          </div>

          <a
            href="#top"
            aria-label="Back to top"
            className="group flex items-center gap-3 text-gray-500 hover:text-white transition-colors"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Top</span>
            <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-accent group-hover:text-brand-accent transition-all">
              <ArrowUp size={14} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};
