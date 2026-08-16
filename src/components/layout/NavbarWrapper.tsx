'use client';

import React, { useState, useEffect } from 'react';

export const NavbarWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`relative flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] mx-auto max-w-6xl rounded-2xl border border-white/10 ${
        isScrolled 
        ? 'bg-black/80 backdrop-blur-2xl shadow-[0_16px_40px_0_rgba(0,0,0,0.4)]' 
        : 'bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
      }`}
    >
      {children}
    </nav>
  );
};
