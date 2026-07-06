import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { MobileTabBar } from './MobileTabBar';

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <MobileTabBar />
    </>
  );
}
