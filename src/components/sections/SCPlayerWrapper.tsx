'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, Pause, ExternalLink, VolumeX } from 'lucide-react';
import { WaveformProgress } from '../ui/WaveformProgress';

interface SCWidget {
  load(url: string, options: Record<string, unknown>): void;
  pause(): void;
  play(): void;
  bind(event: string, callback: (data: unknown) => void): void;
  getDuration(callback: (duration: number) => void): void;
  seekTo(ms: number): void;
  isPaused(callback: (paused: boolean) => void): void;
}

interface SCStatic {
  Widget: {
    (iframe: HTMLIFrameElement): SCWidget;
    Events: {
      READY: string;
      PLAY: string;
      PAUSE: string;
      PLAY_PROGRESS: string;
      FINISH: string;
      ERROR: string;
    };
  };
}

interface SCPlayerWrapperProps {
  tracks: { id: number; scId: string; title: string; src: string; buyLink: string }[];
  ctaText: string;
  blockedNotice: string;
}

export const SCPlayerWrapper: React.FC<SCPlayerWrapperProps> = ({ tracks, ctaText, blockedNotice }) => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [widget, setWidget] = useState<SCWidget | null>(null);
  // El navegador bloqueó el arranque programático: mostrar el reproductor real
  // para que el usuario lo arranque con un gesto dentro del iframe.
  const [blocked, setBlocked] = useState(false);
  // Pista solicitada cuyo PLAY aún no llegó; el READY tras load() la arranca
  // si el navegador ignoró auto_play.
  const pendingIdRef = useRef<number | null>(null);
  // scId cargado actualmente en el widget (arranca con el src del iframe).
  const loadedScIdRef = useRef<string>(tracks[0]?.scId ?? '');
  // Espejo de widget sin estado para usarlo dentro de timers y handlers.
  const widgetRef = useRef<SCWidget | null>(null);
  // Detecta el autoplay bloqueado: si tras el intento sigue pausado, hay fallback.
  const watchdogRef = useRef<number | null>(null);

  const currentTrack = tracks.find(t => t.id === playingId);

  const clearWatchdog = () => {
    if (watchdogRef.current !== null) {
      window.clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }
  };

  // Si tras el intento de arranque el widget sigue pausado, el navegador bloqueó
  // el autoplay (Safari/iOS ignoran el gesto delegado por postMessage): desplegar
  // el reproductor real para que el primer play sea un tap directo en el iframe.
  const armWatchdog = (ms: number) => {
    clearWatchdog();
    const w = widgetRef.current;
    if (!w) return;
    watchdogRef.current = window.setTimeout(() => {
      if (pendingIdRef.current === null) return;
      w.isPaused((paused: boolean) => {
        if (paused && pendingIdRef.current !== null) setBlocked(true);
      });
    }, ms);
  };

  useEffect(() => {
    let disposed = false;
    let created: SCWidget | null = null;

    const initWidget = () => {
      const SC = (window as unknown as { SC?: SCStatic }).SC;
      const iframeElement = document.querySelector('#sc-widget') as HTMLIFrameElement | null;
      if (!SC || !iframeElement) return false;

      const scWidget = SC.Widget(iframeElement);

      scWidget.bind(SC.Widget.Events.READY, () => {
        if (disposed) return;
        // load() emite un READY nuevo: reintentar la reproducción por si
        // auto_play fue bloqueado por la política de autoplay.
        if (pendingIdRef.current !== null) {
          scWidget.play();
          armWatchdog(2600);
        }
      });
      scWidget.bind(SC.Widget.Events.PLAY, () => {
        if (disposed) return;
        clearWatchdog();
        setBlocked(false);
        const id = pendingIdRef.current;
        pendingIdRef.current = null;
        if (id !== null) {
          setPlayingId(id);
        } else {
          // El usuario arrancó la pista desde el propio widget de SoundCloud.
          const t = tracks.find(x => x.scId === loadedScIdRef.current);
          if (t) setPlayingId(t.id);
        }
      });
      scWidget.bind(SC.Widget.Events.PAUSE, () => {
        if (disposed) return;
        // Durante un cambio de pista llega un PAUSE del track anterior;
        // solo sincronizar la UI cuando no hay carga pendiente.
        if (pendingIdRef.current === null) setPlayingId(null);
      });
      scWidget.bind(SC.Widget.Events.PLAY_PROGRESS, (data) => {
        if (disposed) return;
        setProgress((data as { relativePosition: number }).relativePosition);
      });
      scWidget.bind(SC.Widget.Events.FINISH, () => {
        if (disposed) return;
        clearWatchdog();
        pendingIdRef.current = null;
        setPlayingId(null);
        setProgress(0);
      });
      scWidget.bind(SC.Widget.Events.ERROR, () => {
        if (disposed) return;
        clearWatchdog();
        pendingIdRef.current = null;
        setPlayingId(null);
        setProgress(0);
      });

      created = scWidget;
      widgetRef.current = scWidget;
      setWidget(scWidget);
      return true;
    };

    // api.js se inyecta tras la hidratación (Script afterInteractive) y puede
    // tardar más de un segundo en redes lentas: sondear hasta que exista en
    // vez de apostar por un timeout fijo que dejaba el player muerto para siempre.
    const poll = setInterval(() => {
      if (disposed || initWidget()) clearInterval(poll);
    }, 150);
    const stop = setTimeout(() => clearInterval(poll), 30000);

    return () => {
      disposed = true;
      clearInterval(poll);
      clearTimeout(stop);
      clearWatchdog();
      created?.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = (id: number, scId: string) => {
    if (!widget) return;

    if (playingId === id) {
      pendingIdRef.current = null;
      clearWatchdog();
      setBlocked(false);
      widget.pause();
      setPlayingId(null);
      return;
    }

    setProgress(0);
    pendingIdRef.current = id;
    loadedScIdRef.current = scId;
    setBlocked(false);
    widget.load(`https://api.soundcloud.com/tracks/${scId}`, {
      auto_play: true,
      show_artwork: false,
      visual: false
    });
    armWatchdog(3500);
    setPlayingId(id);
  };

  const handleSeek = (percent: number) => {
    if (!widget) return;
    widget.getDuration((duration: number) => {
      widget.seekTo(duration * percent);
    });
  };

  const stopAll = () => {
    pendingIdRef.current = null;
    clearWatchdog();
    setBlocked(false);
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

      {/* Waveform Progress Bar (sustituida por el player real mientras el autoplay está bloqueado) */}
      {!blocked && (
        <WaveformProgress
          progress={progress}
          isPlaying={playingId !== null}
          trackTitle={currentTrack?.title || ''}
          onClose={stopAll}
          onSeek={handleSeek}
        />
      )}

      {/* Widget de SoundCloud. En el flujo normal vive en 1×1 invisible (mejor
          tolerado que display:none en móviles). Si el navegador bloquea el
          autoplay se expande visible con el aviso: el play que pulsa el usuario
          dentro del iframe es un gesto real y desbloquea el audio en Safari/iOS;
          a partir de ese PLAY los controles custom vuelven a mandar. Debe
          permanecer siempre montado para no recrear el widget. */}
      <div
        role={blocked ? 'region' : undefined}
        aria-label={blocked ? blockedNotice : undefined}
        className={`fixed ${
          blocked
            ? 'bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl gradient-border bg-black/85 backdrop-blur-2xl rounded-2xl p-3 shadow-2xl'
            : 'bottom-0 left-0 z-0 w-px h-px overflow-hidden opacity-[0.02] pointer-events-none'
        }`}
      >
        {blocked && (
          <p className="flex items-center gap-2 px-2 pb-2 text-xs text-white/80">
            <VolumeX size={14} className="text-brand-accent shrink-0" aria-hidden="true" />
            {blockedNotice}
          </p>
        )}
        <iframe
          id="sc-widget"
          title="SoundCloud player"
          scrolling="no"
          allow="autoplay"
          frameBorder="no"
          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
            `https://api.soundcloud.com/tracks/${tracks[0]?.scId ?? ''}`
          )}`}
          style={{
            display: 'block',
            border: 0,
            width: blocked ? '100%' : '1px',
            height: blocked ? '166px' : '1px'
          }}
        />
      </div>
    </>
  );
};
