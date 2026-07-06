import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// PAR5 wordmark (white variant, for the dark #0A0A0A background) embedded as an
// SVG data URI — satori delegates <img> rendering to resvg, which handles the
// real (complex, traced) logo SVG reliably, unlike raw inline <svg> passthrough.
export default function OpengraphImage() {
  const logoSvg = readFileSync(
    join(process.cwd(), 'public/images/brand/PAR5-logo-white.svg'),
    'utf-8'
  );
  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUri} width={480} height={232} alt="" />
      </div>
    ),
    { ...size }
  );
}
