'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

type Speck = {
  top: number; // %
  left: number; // %
  size: 1 | 2 | 3; // px
  opacity: number; // 0.15–0.4 per v3.2 F4
  variant: 1 | 2 | 3; // drift keyframe
  duration: number; // 20–40s
  delay: number; // negative phase offset, seconds
  green?: boolean; // max 3–4, never clustered
  mobileHidden?: boolean; // ~half hidden below md: to hit the 10–14 mobile count
};

// Deterministic config — NOT Math.random() at render time (SSR hydration
// mismatch risk, v3.2 F4). 24 on desktop, 12 on mobile. The three green
// specks sit in different thirds of the field so they never cluster.
const SPECKS: Speck[] = [
  { top: 12, left: 6, size: 2, opacity: 0.3, variant: 1, duration: 28, delay: 2 },
  { top: 22, left: 14, size: 1, opacity: 0.2, variant: 2, duration: 34, delay: 9, mobileHidden: true },
  { top: 8, left: 24, size: 2, opacity: 0.25, variant: 3, duration: 24, delay: 5 },
  { top: 30, left: 31, size: 3, opacity: 0.18, variant: 1, duration: 38, delay: 14, mobileHidden: true },
  { top: 16, left: 42, size: 2, opacity: 0.35, variant: 2, duration: 26, delay: 7, green: true },
  { top: 26, left: 55, size: 1, opacity: 0.22, variant: 3, duration: 32, delay: 11, mobileHidden: true },
  { top: 10, left: 63, size: 2, opacity: 0.28, variant: 1, duration: 22, delay: 3 },
  { top: 34, left: 71, size: 2, opacity: 0.2, variant: 2, duration: 36, delay: 17, mobileHidden: true },
  { top: 18, left: 82, size: 1, opacity: 0.32, variant: 3, duration: 27, delay: 6 },
  { top: 28, left: 91, size: 2, opacity: 0.24, variant: 1, duration: 30, delay: 12, mobileHidden: true },
  { top: 44, left: 9, size: 1, opacity: 0.26, variant: 2, duration: 33, delay: 8 },
  { top: 52, left: 19, size: 2, opacity: 0.16, variant: 3, duration: 25, delay: 15, mobileHidden: true },
  { top: 47, left: 36, size: 2, opacity: 0.3, variant: 1, duration: 29, delay: 4 },
  { top: 58, left: 47, size: 1, opacity: 0.2, variant: 2, duration: 39, delay: 19, mobileHidden: true },
  { top: 42, left: 59, size: 3, opacity: 0.15, variant: 3, duration: 23, delay: 10 },
  { top: 55, left: 68, size: 2, opacity: 0.33, variant: 1, duration: 31, delay: 13, green: true, mobileHidden: true },
  { top: 49, left: 78, size: 1, opacity: 0.25, variant: 2, duration: 35, delay: 1 },
  { top: 60, left: 88, size: 2, opacity: 0.19, variant: 3, duration: 26, delay: 16, mobileHidden: true },
  { top: 70, left: 12, size: 2, opacity: 0.28, variant: 1, duration: 37, delay: 5, green: true },
  { top: 76, left: 27, size: 1, opacity: 0.17, variant: 2, duration: 24, delay: 18, mobileHidden: true },
  { top: 68, left: 44, size: 2, opacity: 0.24, variant: 3, duration: 28, delay: 9 },
  { top: 78, left: 58, size: 1, opacity: 0.31, variant: 1, duration: 34, delay: 2, mobileHidden: true },
  { top: 72, left: 74, size: 2, opacity: 0.21, variant: 2, duration: 40, delay: 20 },
  { top: 80, left: 86, size: 1, opacity: 0.27, variant: 3, duration: 30, delay: 7, mobileHidden: true },
];

// The atmosphere layer (v3.2 F4) — lowest layer in the footer stack, paused
// whenever the footer is off-screen, static under reduced-motion (texture,
// not information).
export function FooterSpecks() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', visible && 'specks-live')}
    >
      {SPECKS.map((speck, i) => (
        <span
          key={i}
          className={cn(
            'speck absolute rounded-full',
            `speck-drift-${speck.variant}`,
            speck.green ? 'bg-accent' : 'bg-inverse-text',
            speck.mobileHidden && 'hidden md:block'
          )}
          style={{
            top: `${speck.top}%`,
            left: `${speck.left}%`,
            width: speck.size,
            height: speck.size,
            opacity: speck.opacity,
            animationDuration: `${speck.duration}s`,
            animationDelay: `-${speck.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
