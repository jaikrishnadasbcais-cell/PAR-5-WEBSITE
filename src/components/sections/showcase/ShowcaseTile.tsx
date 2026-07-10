import Image from 'next/image';
import { TiltCard } from '@/components/motion/TiltCard';
import type { DesignTile } from '@/lib/designTiles';

// One Design Direction tile — framed screenshot + label, hover-tilt (C3).
// Shared by the /showcase grid (Phase 4) and the v3.4 gift landing pages'
// "a taste of what we build" row, so both render identical proof tiles.
// `sizes` is caller-supplied because the two contexts lay the tiles out at
// different column counts.
export function ShowcaseTile({
  tile,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
}: {
  tile: DesignTile;
  sizes?: string;
}) {
  return (
    <TiltCard className="h-full overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_2px_8px_-2px_rgba(10,10,10,0.08),0_20px_40px_-12px_rgba(10,10,10,0.18)]">
      <div className="relative aspect-[4/3]">
        <Image
          src={tile.src}
          alt={`${tile.label} design direction`}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
      <p className="p-4 text-body font-medium text-text-primary">{tile.label}</p>
    </TiltCard>
  );
}
