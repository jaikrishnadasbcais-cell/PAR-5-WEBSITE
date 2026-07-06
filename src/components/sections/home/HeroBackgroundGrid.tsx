import Image from 'next/image';
import { DESIGN_TILES } from '@/lib/designTiles';

// Single layer, no blur, no framing box — just the tiled grid floating at low
// opacity directly in the page background. Big enough (6 rows) to cover a
// real portion of the home screen, sitting in normal flow right under the
// headline rather than as a full-bleed section background.
const COLUMNS = 9;
const ROWS = 6;
const WIDTH_PERCENT = 210;
const ROW_DURATION_SECONDS = 9;
const IMAGE_OFFSET = 11;

export function HeroBackgroundGrid() {
  return (
    <div
      className="relative mt-8 h-[380px] overflow-hidden opacity-50 md:mt-10 md:h-[560px]"
      style={{ perspective: '1400px', perspectiveOrigin: '50% 20%' }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: 'rotateX(58deg) rotateZ(-8deg) translateZ(-60px)' }}
      >
        <div className="flex w-full flex-col gap-4">
          {Array.from({ length: ROWS }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex flex-none gap-4 ${
                rowIndex % 2 === 0 ? 'row-drift-left' : 'row-drift-right'
              }`}
              style={{
                width: `${WIDTH_PERCENT}%`,
                animationDuration: `${ROW_DURATION_SECONDS}s`,
              }}
            >
              {Array.from({ length: COLUMNS }).map((_, colIndex) => {
                const i = rowIndex * COLUMNS + colIndex;
                const tile = DESIGN_TILES[(IMAGE_OFFSET + i) % DESIGN_TILES.length];
                return (
                  <div
                    key={colIndex}
                    className="relative aspect-video min-w-0 flex-1 overflow-hidden rounded border border-text-primary/[0.15]"
                  >
                    <Image src={tile.src} alt="" fill sizes="260px" className="object-cover" />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
