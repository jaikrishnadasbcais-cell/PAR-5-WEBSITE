'use client';

import { useEffect, useState } from 'react';
import { AnimatedLogo } from '@/components/brand/AnimatedLogo';
import { DESIGN_TILES } from '@/lib/designTiles';

const SESSION_KEY = 'par5-intro-played';
// Hard bridge cap for slow image loads. The choreographed part (logo entrance
// + swoosh draw + exit fade) fits the v3 C1.4 sub-1.6s budget; this cap only
// delays the reveal when the hero tiles genuinely aren't loaded yet.
const MAX_DURATION_MS = 1500;

// Homepage-only, once per session (sessionStorage). Reveal is tied to real hero
// image load progress — fast connections dismiss promptly, slow ones are bridged
// up to a hard 2s cap, after which the page reveals regardless of load state.
// Skipped entirely under prefers-reduced-motion, since this is purely decorative.
export function LoadingTransition() {
  const [shouldRender, setShouldRender] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    sessionStorage.setItem(SESSION_KEY, '1');
    setShouldRender(true);

    let settled = false;
    let imagesReady = false;
    let entranceReady = false;
    let loadedCount = 0;
    const total = DESIGN_TILES.length;

    const finish = () => {
      if (settled) return;
      settled = true;
      setIsExiting(true);
    };

    // Only exit once BOTH the entrance animation has had time to play AND the
    // images are ready — otherwise a fast cache hit would cut the fade/scale-in
    // short instead of letting it complete, per the "let the animation complete
    // and reveal promptly" requirement.
    const maybeFinish = () => {
      if (imagesReady && entranceReady) finish();
    };

    const maxTimer = setTimeout(finish, MAX_DURATION_MS);
    const entranceTimer = setTimeout(() => {
      entranceReady = true;
      maybeFinish();
    }, 700); // .intro-logo-in (0.5s) + the swoosh draw finishing (0.15s delay + 0.5s)

    const onProgress = () => {
      loadedCount += 1;
      if (loadedCount >= total) {
        imagesReady = true;
        maybeFinish();
      }
    };

    DESIGN_TILES.forEach((tile) => {
      const img = new window.Image();
      img.onload = onProgress;
      img.onerror = onProgress;
      img.src = tile.src;
    });

    return () => {
      clearTimeout(maxTimer);
      clearTimeout(entranceTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bg transition-opacity duration-300 ${
        isExiting ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      onTransitionEnd={() => {
        if (isExiting) setShouldRender(false);
      }}
      aria-hidden="true"
    >
      <AnimatedLogo className="intro-logo-in h-12 w-auto" />
    </div>
  );
}
