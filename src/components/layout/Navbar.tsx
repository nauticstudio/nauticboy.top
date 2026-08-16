import React from 'react';
import { GlowButton } from '../ui/GlowButton';
import { NavbarWrapper } from './NavbarWrapper';
import { NavLinks } from './NavLinks';
import { ScrollProgress } from './ScrollProgress';
import { LanguageToggle } from './LanguageToggle';
import { MobileMenu } from './MobileMenu';
import { Dictionary } from '@/lib/i18n/dictionaries';

interface NavbarProps {
  dict: Dictionary;
  lang: string;
}

export const Navbar: React.FC<NavbarProps> = ({ dict, lang }) => {
  const navLinks = [
    { name: dict.nav_studio, href: '#services', id: 'services' },
    { name: dict.nav_releases, href: '#dj', id: 'dj' },
    { name: dict.nav_templates, href: '#templates', id: 'templates' },
    { name: dict.nav_portfolio, href: '#work', id: 'work' },
    { name: dict.nav_software, href: '#software', id: 'software' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-4 px-4">
      <ScrollProgress />
      <NavbarWrapper>
        {/* Left: Logo */}
        <div className="flex items-center flex-1 min-w-0">
          <a
            href="#top"
            className="relative z-20 flex items-center gap-1 font-bold tracking-tighter text-white text-[15px] sm:text-lg whitespace-nowrap hover:opacity-80 transition-opacity"
          >
            NAUTIC<span className="text-brand-accent">BOY</span>
            <span className="text-gray-500 mx-1">&amp;</span>
            <span className="text-brand-accent">STUDIO</span>
          </a>
        </div>

        {/* Center: Desktop Menu */}
        <NavLinks links={navLinks} />

        {/* Right: Options & Mobile */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end">
          <LanguageToggle currentLang={lang} />

          <GlowButton
            href="#contact"
            variant="white"
            magnetic={false}
            wrapperClassName="hidden lg:inline-block"
            className="hidden lg:inline-flex py-2! px-5! text-sm!"
          >
            {dict.nav_contact}
          </GlowButton>

          <MobileMenu links={navLinks} contactText={dict.nav_contact} />
        </div>
      </NavbarWrapper>
    </header>
  );
};
