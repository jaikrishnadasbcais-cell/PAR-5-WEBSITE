import { PageShell } from '@/components/layout/PageShell';
import { AnnouncementBar } from '@/components/sections/home/AnnouncementBar';
import { Hero } from '@/components/sections/home/Hero';
import { LobbyGrid } from '@/components/sections/home/LobbyGrid';
import { CTABand } from '@/components/sections/home/CTABand';
import { LoadingTransition } from '@/components/sections/home/LoadingTransition';

export default function Home() {
  return (
    <>
      <LoadingTransition />
      <AnnouncementBar />
      <PageShell>
        <Hero />
        <LobbyGrid />
        <CTABand />
      </PageShell>
    </>
  );
}
