import { PageShell } from "@/components/layout/PageShell";

// Route group layout — wraps every route except the homepage (which composes
// PageShell itself, in src/app/page.tsx, so it can render AnnouncementBar as a
// true DOM sibling before the sticky header). Every page added under this
// group automatically gets the shared header/footer/tab bar — no need to
// remember to wrap each new page.tsx individually.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <PageShell>{children}</PageShell>;
}
