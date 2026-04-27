'use client';

import { useEffect, useState } from 'react';
import { Righteous, Boogaloo } from 'next/font/google';

const righteous = Righteous({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-righteous',
});

const boogaloo = Boogaloo({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-boogaloo',
});

const TARGET = new Date('2026-09-26T00:00:00');
const PINK   = '#FF1B8D';
const BLUE   = '#0A6EFF';
const YELLOW = '#FFE600';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function Starburst({ size = 24, color = YELLOW }: { size?: number; color?: string }) {
  const cx = size / 2;
  const cy = size / 2;
  const r1 = size * 0.5;
  const r2 = size * 0.21;
  const points = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * Math.PI) / 12 - Math.PI / 2;
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
      className={`${righteous.variable} ${boogaloo.variable} relative min-h-screen flex items-center justify-center overflow-hidden`}
      style={{ background: '#07050E' }}
    >
      {/* Soft background glows */}
      <div className="absolute pointer-events-none" style={{
        top: '-10%', left: '10%', width: '60vw', height: '60vw',
        background: PINK, opacity: 0.1, filter: 'blur(120px)', borderRadius: '50%',
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: '-10%', right: '10%', width: '60vw', height: '60vw',
        background: BLUE, opacity: 0.1, filter: 'blur(120px)', borderRadius: '50%',
      }} />

      {/* Outer border */}
      <div className="absolute inset-4 pointer-events-none" style={{ border: `2px solid ${YELLOW}`, opacity: 0.55 }} />
      {/* Inner border */}
      <div className="absolute inset-6 pointer-events-none" style={{ border: `1px solid ${PINK}`, opacity: 0.25 }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-10 py-16 gap-7">

        {/* Top starbursts */}
        <div className="flex items-center gap-3">
          {([PINK, BLUE, YELLOW, BLUE, PINK] as const).map((c, i) => (
            <Starburst key={i} size={i === 2 ? 28 : 16} color={c} />
          ))}
        </div>

        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-boogaloo)',
          color: BLUE,
          letterSpacing: '0.4em',
          fontSize: '0.85rem',
        }}>
          YOU ARE INVITED
        </p>

        {/* Main title */}
        <div className="flex flex-col items-center leading-none">
          <h1 style={{
            fontFamily: 'var(--font-righteous)',
            fontSize: 'clamp(4rem, 15vw, 10.5rem)',
            color: PINK,
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
          }}>
            PIRIPIRI
          </h1>
          <h1 style={{
            fontFamily: 'var(--font-righteous)',
            fontSize: 'clamp(4rem, 15vw, 10.5rem)',
            color: BLUE,
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
          }}>
            HABIBI
          </h1>
        </div>

        {/* Yellow divider */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          <div style={{ flex: 1, height: '2px', background: YELLOW, opacity: 0.55 }} />
          <Starburst size={30} color={YELLOW} />
          <div style={{ flex: 1, height: '2px', background: YELLOW, opacity: 0.55 }} />
        </div>

        {/* Date */}
        <p style={{
          fontFamily: 'var(--font-righteous)',
          fontSize: 'clamp(1.5rem, 5vw, 2.8rem)',
          color: YELLOW,
          letterSpacing: '0.12em',
        }}>
          26 · 9 · 2026
        </p>

        {/* Location */}
        <p style={{
          fontFamily: 'var(--font-boogaloo)',
          fontSize: '1rem',
          color: PINK,
          letterSpacing: '0.28em',
          marginTop: '-0.75rem',
        }}>
          MARRAKECH, MOROCCO
        </p>

        {/* Countdown */}
        {time.mounted && (
          <div className="flex gap-5 sm:gap-8 mt-2">
            {([
              { value: time.days,    label: 'DAYS', color: PINK   },
              { value: time.hours,   label: 'HRS',  color: BLUE   },
              { value: time.minutes, label: 'MIN',  color: YELLOW },
              { value: time.seconds, label: 'SEC',  color: PINK   },
            ] as const).map(({ value, label, color }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div style={{ border: `2px solid ${color}`, padding: '0.35rem 0.7rem', minWidth: '3.2rem', textAlign: 'center' }}>
                  <span style={{
                    fontFamily: 'var(--font-righteous)',
                    fontSize: 'clamp(2rem, 5.5vw, 3.2rem)',
                    color,
                    lineHeight: 1,
                    display: 'block',
                  }}>
                    {pad(value)}
                  </span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-boogaloo)',
                  fontSize: '0.7rem',
                  color,
                  letterSpacing: '0.18em',
                  opacity: 0.8,
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom starbursts */}
        <div className="flex items-center gap-3 mt-1">
          {([YELLOW, PINK, BLUE, PINK, YELLOW] as const).map((c, i) => (
            <Starburst key={i} size={i === 2 ? 28 : 16} color={c} />
          ))}
        </div>

      </div>
    </div>
  );
}
