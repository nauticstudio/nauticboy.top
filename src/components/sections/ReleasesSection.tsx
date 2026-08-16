import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealWrapper } from '../ui/RevealWrapper';
import { releases } from '@/lib/data/releases';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { SpotifyIcon } from '../ui/Icons';
import { Dictionary } from '@/lib/i18n/dictionaries';

interface ReleasesSectionProps {
  dict: Dictionary;
}

export const ReleasesSection: React.FC<ReleasesSectionProps> = ({ dict }) => {
  return (
    <section id="dj" className="py-24 relative bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <SectionHeading
            index="02"
            kicker={dict.releases_title}
            title={dict.releases_heading}
            subtitle={dict.releases_desc}
            className="mb-0!"
          />
          <RevealWrapper direction="left" className="shrink-0">
            <a
              href="https://open.spotify.com/artist/6Oe1G3e3ajshDM507toD5H?si=nJ0pRFbGQVezygHeOF6eCQ"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer inline-flex items-center gap-3 px-8 py-4 bg-[#1DB954] text-black font-bold rounded-full hover:scale-105 transition-transform"
            >
              <SpotifyIcon size={22} />
              {dict.listen_spotify}
            </a>
          </RevealWrapper>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-14">
          {releases.map((release, i) => (
            <RevealWrapper key={release.id} direction="up" delay={(i % 5) * 0.08}>
              <a
                href={release.spotifyLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${release.title} — ${release.label}`}
                className="group relative block aspect-square overflow-hidden rounded-2xl border border-white/10 hover:border-brand-accent/40 transition-colors duration-500"
              >
                <Image
                  src={release.src}
                  alt={release.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <span className="absolute top-3 left-3 font-mono text-[10px] tracking-widest text-white/70 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-4">
                  <span className="w-12 h-12 rounded-full bg-brand-accent text-white flex items-center justify-center shadow-glow-orange mb-3">
                    <Play fill="currentColor" size={18} className="ml-0.5" aria-hidden="true" />
                  </span>
                  <h4 className="font-bold text-sm text-white text-center line-clamp-1">{release.title}</h4>
                  <p className="font-mono text-[10px] text-brand-accent uppercase tracking-widest mt-1 line-clamp-1">
                    {release.label}
                  </p>
                </div>
              </a>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};
