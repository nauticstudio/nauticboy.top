import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://nauticboy.top'),
  title: 'Nautic Boy & Studio | Music, mixing, mastering & software',
  description: 'Electronic music, mixing and mastering, production templates and DJ software by Nautic Boy & Studio. Choose English or Español to explore.',
  alternates: { canonical: '/', languages: { en: '/en', es: '/es', 'x-default': '/' } },
  openGraph: { type: 'website', url: 'https://nauticboy.top/', siteName: 'Nautic Boy & Studio', title: 'Nautic Boy & Studio', description: 'Music · Mixing & mastering · Templates · Software', images: ['/images/studio.jpg'] },
  twitter: { card: 'summary_large_image', title: 'Nautic Boy & Studio', images: ['/images/studio.jpg'] },
};

export default function RootPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,0,0.12),transparent_65%)]" />
      <div className="relative w-full max-w-2xl">
        <p className="mb-7 font-mono text-xs uppercase tracking-[0.22em] text-brand-accent">Music · Studio · Software</p>
        <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">Nautic Boy<br /><span className="text-brand-accent">&amp; Studio</span></h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-400">Electronic music, mixing &amp; mastering, production templates and tools for DJs.</p>
        <nav aria-label="Choose your language / Elegí tu idioma" className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link prefetch={false} href="/en" hrefLang="en" className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6 text-xl font-medium transition-colors hover:border-brand-accent hover:bg-white/10">English<ArrowUpRight aria-hidden="true" size={22} /></Link>
          <Link prefetch={false} href="/es" hrefLang="es" lang="es" className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6 text-xl font-medium transition-colors hover:border-brand-accent hover:bg-white/10">Español<ArrowUpRight aria-hidden="true" size={22} /></Link>
        </nav>
        <p className="mt-8 text-sm text-gray-500">NauticMixxx · NauticPlayer · Nautic Studio</p>
      </div>
    </main>
  );
}
