'use client';

import Image from 'next/image';
import { useNauticRelease } from '@/lib/release/useNauticRelease';
import { ArrowUpRight, Check, CodeXml } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { NAUTICMIXXX_REPO, nauticMixxxPage } from '@/lib/nauticmixxx';
import { GlowButton } from '../ui/GlowButton';

export function NauticMixxxLaunch({ dict, lang }: { dict: Dictionary; lang: string }) {
  const release = useNauticRelease();
  const chips = [dict.mixxx_chip_1, dict.mixxx_chip_2, dict.mixxx_chip_3];

  return (
    <article id="nauticmixxx" aria-labelledby="mixxx-heading" className="overflow-hidden rounded-3xl border border-white/10 bg-[#101214]">
      <div className="flex flex-col justify-between gap-6 border-b border-white/10 p-6 md:flex-row md:items-center md:p-8">
        <div className="flex items-center gap-4">
          <Image src="/images/nauticmixxx-icon.png" alt="" width={56} height={56} className="shrink-0" />
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-accent">{dict.mixxx_eyebrow} · {release.tag}</p>
            <h3 id="mixxx-heading" className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">NauticMixxx</h3>
          </div>
        </div>
        <GlowButton href={nauticMixxxPage(lang)} magnetic={false} className="gap-2 px-6! py-3! text-sm!">
          {dict.mixxx_cta}<ArrowUpRight size={17} aria-hidden="true" />
        </GlowButton>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr]">
        <figure className="flex flex-col justify-center border-b border-white/10 bg-black p-3 sm:p-6 lg:border-b-0 lg:border-r">
          <a href={`${nauticMixxxPage(lang)}#screens`} aria-label={dict.mixxx_screens_link} className="block rounded-lg outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand-accent">
            <Image src="/images/nauticmixxx-performance.webp" alt={dict.mixxx_performance_alt} width={1392} height={874} className="h-auto w-full object-contain" />
          </a>
          <figcaption className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">PERFORMANCE · {dict.mixxx_capture_source}</figcaption>
        </figure>
        <div className="p-6 md:p-8">
          <h4 className="text-2xl font-medium leading-snug tracking-tight text-white">{dict.mixxx_title}</h4>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">{dict.mixxx_desc}</p>
          <ul className="mt-6 space-y-3">
            {chips.map((chip) => <li key={chip} className="flex items-start gap-3 text-sm text-gray-300"><Check size={16} className="mt-0.5 shrink-0 text-brand-accent" aria-hidden="true" />{chip}</li>)}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-gray-500">{dict.mixxx_limitations}</p>
          <figure className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black">
            <Image src="/images/nauticmixxx-home.webp" alt={dict.mixxx_home_alt} width={1392} height={874} className="h-auto w-full object-contain" />
            <figcaption className="border-t border-white/10 px-3 py-2 text-xs text-gray-500">{dict.mixxx_home_caption}</figcaption>
          </figure>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-4 md:px-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-gray-400">{dict.mixxx_preview}</span>
        <div className="flex flex-wrap gap-5 text-xs">
          <a href={release.page} className="text-brand-accent hover:text-white transition-colors">{dict.mixxx_downloads_link.replace('{version}', release.version)} ↗</a>
          <a href={NAUTICMIXXX_REPO} className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><CodeXml size={14} aria-hidden="true" />{dict.mixxx_source_link}</a>
        </div>
      </div>
    </article>
  );
}
