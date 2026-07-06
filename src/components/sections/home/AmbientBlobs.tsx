type Blob = {
  size: number;
  style: React.CSSProperties;
  driftClassName: string;
  durationSeconds: number;
};

// Felt, not seen — large, heavily blurred, very low-opacity monochrome shapes
// filling otherwise-dead background space. Monochrome (not accent-tinted) so
// this doesn't quietly expand the "10% accent max" surface area. Reused across
// every flat content page (Solutions, Process, Showcase, Insights), not just
// the hero, for consistent background depth site-wide.
const BLOBS: Blob[] = [
  { size: 520, style: { top: '-8%', left: '2%' }, driftClassName: 'ambient-drift-1', durationSeconds: 42 },
  { size: 640, style: { top: '15%', right: '-10%' }, driftClassName: 'ambient-drift-2', durationSeconds: 55 },
  { size: 420, style: { bottom: '-6%', left: '28%' }, driftClassName: 'ambient-drift-3', durationSeconds: 38 },
];

export function AmbientBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          className={`absolute rounded-full bg-text-primary opacity-[0.06] blur-3xl ${blob.driftClassName}`}
          style={{
            width: blob.size,
            height: blob.size,
            animationDuration: `${blob.durationSeconds}s`,
            ...blob.style,
          }}
        />
      ))}
    </div>
  );
}
