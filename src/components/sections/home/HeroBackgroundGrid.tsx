'use client';

import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { DESIGN_TILES } from '@/lib/designTiles';

type TileLayerConfig = {
  key: string;
  translateZ: number;
  scale: number;
  blur: number;
  opacity: number;
  columns: number;
  rows: number;
  widthPercent: number;
  imageOffset: number;
  rowDurationSeconds: number;
  // How far this layer translates (px) over the full hero scroll — nearer
  // layers move further, which is what sells the depth on scroll (C1.6).
  scrubDistance: number;
};

// Three depth layers, vivid (v3 amendment C1.1): no global washout — the near
// layer runs at full contrast, and depth comes only from the per-layer
// blur/opacity falloff toward the back. Farther layers sit at more negative
// translateZ and are scaled up to compensate for perspective shrink. Each
// layer is oversized past 100% width so it covers edge-to-edge after the
// rotateX/rotateZ/perspective transform.
const LAYERS: TileLayerConfig[] = [
  {
    key: 'far',
    translateZ: -520,
    scale: 1.5,
    blur: 6,
    opacity: 0.5,
    columns: 10,
    rows: 4,
    widthPercent: 240,
    imageOffset: 0,
    rowDurationSeconds: 16,
    scrubDistance: 50,
  },
  {
    key: 'mid',
    translateZ: -260,
    scale: 1.22,
    blur: 2.5,
    opacity: 0.75,
    columns: 9,
    rows: 4,
    widthPercent: 225,
    imageOffset: 5,
    rowDurationSeconds: 12,
    scrubDistance: 110,
  },
  {
    key: 'near',
    translateZ: -60,
    scale: 1,
    blur: 0,
    opacity: 1,
    columns: 8,
    rows: 4,
    widthPercent: 210,
    imageOffset: 11,
    rowDurationSeconds: 9,
    scrubDistance: 180,
  },
];

// Entrance cascade timing (C1.4): rows resolve back-to-front in a fast
// stagger after the intro swoosh hands off (~0.55s), finishing inside the
// 1.6s total budget.
const ENTRANCE_BASE_DELAY = 0.55;
const LAYER_STAGGER = 0.12;
const ROW_STAGGER = 0.06;

function TileLayer({
  config,
  layerIndex,
  scrollProgress,
  reduced,
}: {
  config: TileLayerConfig;
  layerIndex: number;
  scrollProgress: MotionValue<number>;
  reduced: boolean;
}) {
  const y = useTransform(scrollProgress, [0, 1], [0, reduced ? 0 : config.scrubDistance]);

  return (
    <motion.div className="absolute inset-0" style={{ y }}>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `rotateX(58deg) rotateZ(-8deg) translateZ(${config.translateZ}px) scale(${config.scale})`,
          filter: config.blur > 0 ? `blur(${config.blur}px)` : undefined,
          opacity: config.opacity,
        }}
      >
        <div className="flex w-full flex-col gap-4">
          {Array.from({ length: config.rows }).map((_, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={
                reduced
                  ? { duration: 0.25 }
                  : {
                      duration: 0.5,
                      delay:
                        ENTRANCE_BASE_DELAY + layerIndex * LAYER_STAGGER + rowIndex * ROW_STAGGER,
                      ease: 'easeOut',
                    }
              }
              className={`flex flex-none gap-4 ${
                rowIndex % 2 === 0 ? 'row-drift-left' : 'row-drift-right'
              }`}
              style={{
                width: `${config.widthPercent}%`,
                animationDuration: `${config.rowDurationSeconds}s`,
              }}
            >
              {Array.from({ length: config.columns }).map((_, colIndex) => {
                const i = rowIndex * config.columns + colIndex;
                const tile = DESIGN_TILES[(config.imageOffset + i) % DESIGN_TILES.length];
                return (
                  <div
                    key={colIndex}
                    className="relative aspect-video min-w-0 flex-1 overflow-hidden rounded-lg border border-text-primary/[0.15] shadow-[0_8px_24px_-8px_rgba(10,10,10,0.25)]"
                  >
                    <Image src={tile.src} alt="" fill sizes="260px" className="object-cover" />
                  </div>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Full-bleed cinematic backdrop (C1). scrollProgress scrubs per-layer parallax
// + a whole-grid fade as the hero scrolls away (reversible, user-controlled);
// rotateX/rotateY carry the spring-damped cursor parallax from the Hero
// section (desktop pointer only — the values are static 0 on touch devices).
export function HeroBackgroundGrid({
  scrollProgress,
  rotateX,
  rotateY,
}: {
  scrollProgress: MotionValue<number>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}) {
  const reduced = useReducedMotion() ?? false;
  const gridOpacity = useTransform(scrollProgress, [0, 0.85], [1, 0]);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ perspective: '1400px', perspectiveOrigin: '50% 20%', opacity: gridOpacity }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {LAYERS.map((layer, layerIndex) => (
          <TileLayer
            key={layer.key}
            config={layer}
            layerIndex={layerIndex}
            scrollProgress={scrollProgress}
            reduced={reduced}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
