'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export const LanguageToggle: React.FC<{ currentLang: string }> = ({ currentLang }) => {
  const pathname = usePathname();
  const router = useRouter();

  const toggleLang = () => {
    const newLang = currentLang === 'en' ? 'es' : 'en';
    // Replace the language segment in the URL
    // e.g. /en/about -> /es/about
    const segments = pathname.split('/');
    segments[1] = newLang;
    const newPath = segments.join('/');
    
    localStorage.setItem('nb_lang', newLang);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLang}
      aria-label={currentLang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
      className="relative z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
    >
      <Globe className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-glow transition-colors" />
      <span className="text-xs font-semibold text-gray-400 group-hover:text-white transition-colors uppercase">
        {currentLang === 'en' ? 'es' : 'en'}
      </span>
    </button>
  );
};
