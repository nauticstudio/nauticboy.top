'use client';

import React, { useEffect, useState } from 'react';

interface NavLinksProps {
  links: { name: string; href: string; id: string }[];
}

export const NavLinks: React.FC<NavLinksProps> = ({ links }) => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  return (
    <div className="hidden lg:flex items-center justify-center gap-7">
      {links.map((link) => {
        const isActive = active === link.id;
        return (
          <a
            key={link.name}
            href={link.href}
            aria-current={isActive ? 'true' : undefined}
            className={`relative text-sm font-medium transition-colors ${
              isActive ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            {link.name}
            <span
              aria-hidden="true"
              className={`absolute -bottom-1.5 left-0 h-px bg-brand-accent transition-all duration-300 ${
                isActive ? 'w-full' : 'w-0'
              }`}
            />
          </a>
        );
      })}
    </div>
  );
};
