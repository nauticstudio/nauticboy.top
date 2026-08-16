'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { WaveformProgress } from '../ui/WaveformProgress';

interface SCWidget {
  load(url: string, options: Record<string, unknown>): void;
  pause(): void;
  play(): void;
  bind(event: string, callback: (data: unknown) => void): void;
  getDuration(callback: (duration: number) => void): void;
  seekTo(ms: number): void;
}

interface SCStatic {
  Widget: {
    (iframe: HTMLIFrameElement): SCWidget;
    Events: { PLAY_PROGRESS: string; FINISH: string };
  };
}

interface SCPlayerWrapperProps {
  tracks: { id: number; scId: string; title: string; src: string; buyLink: string }[];
  ctaText: string;
}

export const SCPlayerWrapper: React.FC<SCPlayerWrapperProps> = ({ tracks, ctaText }) => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [widget, setWidget] = useState<SCWidget | null>(null);

  const currentTrack = tracks.find(t => t.id === playingId);

  useEffect(() => {
    // SC is loaded via Script component in the parent
    const initWidget = () => {
      const SC = (window as unknown as { SC?: SCStatic }).SC;
      if (SC) {
        const iframeElement = document.querySelector('#sc-widget') as HTMLIFrameElement;
        if (iframeElement) {
          const scWidget = SC.Widget(iframeElement);
          setWidget(scWidget);

          // Bind events
          scWidget.bind(SC.Widget.Events.PLAY_PROGRESS, (data) => {
            setProgress((data as { relativePosition: number }).relativePosition);
          });

          scWidget.bind(SC.Widget.Events.FINISH, () => {
            setPlayingId(null);
            setProgress(0);
          });
        }
      }
    };

    const timer = setTimeout(initWidget, 1000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = (id: number, scId: string) => {
    if (!widget) return;

    if (playingId === id) {
      widget.pause();
      setPlayingId(null);
    } else {
      setProgress(0);
      widget.load(`https://api.soundcloud.com/tracks/${scId}`, {
        auto_play: true,
        show_artwork: false,
        visual: false
      });
      setPlayingId(id);
    }
  };

  const handleSeek = (percent: number) => {
    if (!widget) return;
    widget.getDuration((duration: number) => {
      widget.seekTo(duration * percent);
    });
  };

  const handleClose = () => {
    if (widget) widget.pause();
    setPlayingId(null);
    setProgress(0);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track, i) => {
          const isPlaying = playingId === track.id;
          return (
            <div
              key={track.id}
              className={`group gradient-border relative overflow-hidden rounded-2xl bg-white/5 aspect-square transition-all duration-500 ${
                isPlaying ? 'border-brand-accent/40 shadow-glow-orange' : 'hover:border-white/20'
              }`}
            >
              <Image
                src={track.src}
                alt={track.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                className={`absolute inset-0 object-cover transition-all duration-700 ${
                  isPlaying ? 'scale-105 blur-[2px]' : 'group-hover:scale-110'
                }`}
              />

              <span className="absolute top-3 left-3 font-mono text-[10px] tracking-widest text-white/70 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 z-10">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-8 text-center">
                <h3 className="text-xl font-bold mb-6">{track.title}</h3>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => togglePlay(track.id, track.scId)}
                    aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                    className="w-14 h-14 rounded-full bg-brand-accent text-white flex items-center justify-center hover:scale-110 transition-transform shadow-glow-orange"
                  >
                    {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}
                  </button>

                  <a
                    href={track.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer inline-flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-colors"
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    {ctaText}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Waveform Progress Bar */}
      <WaveformProgress
        progress={progress}
        isPlaying={playingId !== null}
        trackTitle={currentTrack?.title || ''}
        onClose={handleClose}
        onSeek={handleSeek}
      />

      {/* Hidden Player */}
      <iframe
        id="sc-widget"
        title="SoundCloud player"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1"
        style={{ display: 'none' }}
      />
    </>
  );
};
