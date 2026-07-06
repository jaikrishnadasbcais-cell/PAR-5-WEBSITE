import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Just the flag triangle, not the full PAR5 lockup — per docs/architecture.md §2.5,
// the full mark doesn't read clearly at 16-32px. Drawn with the CSS border-triangle
// trick (not raw SVG passthrough) since it's guaranteed to render correctly in
// satori's constrained box-model renderer.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: '7px solid transparent',
            borderBottom: '7px solid transparent',
            borderLeft: '22px solid #8FFF00',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
