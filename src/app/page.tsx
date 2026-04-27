'use client';

import { useEffect, useState } from 'react';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-montserrat',
});

const TARGET = new Date('2026-09-26T00:00:00');

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function MoroccanStar({ size = 48, color = '#C9A84C' }: { size?: number; color?: string }) {
  const cx = size / 2;
  const cy = size / 2;
  const r1 = size * 0.42;
  const r2 = size * 0.18;
  const points = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * Math.PI) / 8 - Math.PI / 2;
    const r = i % 2 === 0 ? r1 : r2;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <polygon points={points} fill={color} />
    </svg>
  );
}

export default function Home() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, mounted: false });

  useEffect(() => {
    function tick() {
      const diff = TARGET.getTime() - Date.now();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0, mounted: true });
        return;
      }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor(diff / 3600000) % 24,
        minutes: Math.floor(diff / 60000) % 60,
        seconds: Math.floor(diff / 1000) % 60,
        mounted: true,
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`${cormorant.variable} ${montserrat.variable} relative min-h-screen flex items-center justify-center overflow-hidden`}
      style={{ background: 'linear-gradient(160deg, #100602 0%, #1c0d04 50%, #100602 100%)' }}
    >
      {/* Double border frame */}
      <div className="absolute inset-5 pointer-events-none" style={{ border: '1px solid rgba(201,168,76,0.35)' }} />
      <div className="absolute inset-7 pointer-events-none" style={{ border: '1px solid rgba(201,168,76,0.12)' }} />

      {/* Corner ornaments */}
      {['top-4 left-4', 'top-4 right-4 rotate-90', 'bottom-4 left-4 -rotate-90', 'bottom-4 right-4 rotate-180'].map((pos) => (
        <svg key={pos} className={`absolute ${pos} w-8 h-8 pointer-events-none`} viewBox="0 0 32 32" fill="none" aria-hidden>
          <path d="M2 2 L14 2 L14 8 M2 2 L2 14 L8 14" stroke="rgba(201,168,76,0.5)" strokeWidth="1" />
        </svg>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-10 py-20 gap-8">

        {/* Top star */}
        <MoroccanStar size={32} color="rgba(201,168,76,0.55)" />

        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-montserrat)',
          color: 'rgba(201,168,76,0.6)',
          letterSpacing: '0.45em',
          fontSize: '0.6rem',
          fontWeight: 200,
        }}>
          YOU ARE INVITED
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(4rem, 13vw, 9.5rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: '#F5E6C8',
          lineHeight: 1,
          letterSpacing: '-0.01em',
        }}>
          PiriPiri Habibi
        </h1>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full max-w-sm">
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4))' }} />
          <MoroccanStar size={14} color="rgba(201,168,76,0.65)" />
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.4))' }} />
        </div>

        {/* Date */}
        <p style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)',
          fontWeight: 300,
          color: '#C9A84C',
          letterSpacing: '0.2em',
        }}>
          26 · 9 · 2026
        </p>

        {/* Location */}
        <p style={{
          fontFamily: 'var(--font-montserrat)',
          fontSize: '0.65rem',
          fontWeight: 200,
          color: 'rgba(245,230,200,0.55)',
          letterSpacing: '0.38em',
          marginTop: '-1rem',
        }}>
          MARRAKECH, MOROCCO
        </p>

        {/* Countdown */}
        {time.mounted && (
          <>
            <div className="flex gap-8 sm:gap-12 mt-2">
              {([
                { value: time.days, label: 'DAYS' },
                { value: time.hours, label: 'HRS' },
                { value: time.minutes, label: 'MIN' },
                { value: time.seconds, label: 'SEC' },
              ] as const).map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <span style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
                    fontWeight: 300,
                    color: '#F5E6C8',
                    lineHeight: 1,
                    minWidth: '2ch',
                    textAlign: 'center',
                  }}>
                    {pad(value)}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: '0.5rem',
                    fontWeight: 300,
                    color: 'rgba(201,168,76,0.55)',
                    letterSpacing: '0.2em',
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Bottom ornament */}
        <MoroccanStar size={20} color="rgba(201,168,76,0.3)" />
      </div>
    </div>
  );
}
