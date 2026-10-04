import type { Dictionary } from '@/lib/i18n/dictionaries';

// Match the order of the page sections in both navigation surfaces.
export const getNavigation = (dict: Dictionary) => [
  { name: dict.nav_studio, href: '#services', id: 'services' },
  { name: dict.nav_portfolio, href: '#work', id: 'work' },
  { name: dict.nav_releases, href: '#dj', id: 'dj' },
  { name: dict.nav_templates, href: '#templates', id: 'templates' },
  { name: dict.nav_software, href: '#software', id: 'software' },
  { name: dict.nav_about, href: '#about', id: 'about' },
];
