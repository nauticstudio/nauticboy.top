import React from 'react';
import { getNavigation } from '@/lib/navigation';
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
  const navLinks = getNavigation(dict);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-4 px-4">
      <ScrollProgress />
      <NavbarWrapper>
        {/* Left: Logo */}
        <div className="flex items-center shrink-0 min-w-0">
          <a
            href="#top"
            aria-label="Nautic Boy & Studio"
            className="relative z-20 flex items-center gap-1 font-bold tracking-tighter text-white text-[15px] sm:text-lg whitespace-nowrap hover:opacity-80 transition-opacity"
          >
            NAUTIC<span className="text-brand-accent">BOY</span>
            <span className="hidden sm:inline text-gray-500 mx-1">&amp;</span>
            <span className="hidden sm:inline text-brand-accent">STUDIO</span>
          </a>
        </div>

        {/* Center: Desktop Menu */}
        <NavLinks links={navLinks} />

        {/* Right: Options & Mobile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 justify-end">
          <LanguageToggle currentLang={lang} />

          <GlowButton
            href="#contact"
            variant="white"
            magnetic={false}
            wrapperClassName="hidden! xl:block!"
            className="py-2! px-5! text-sm!"
          >
            {dict.nav_contact}
          </GlowButton>

          <MobileMenu links={navLinks} contactText={dict.nav_contact} openLabel={dict.nav_open_menu} closeLabel={dict.nav_close_menu} />
        </div>
      </NavbarWrapper>
    </header>
  );
};
