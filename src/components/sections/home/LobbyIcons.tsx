// Lobby grid marks (v3.1 amendment D2) — one small linear/outline icon per
// block, 1.5px stroke, Lucide-style restraint. These are marks, not
// illustrations; no literal golf imagery per the non-negotiables.

function IconBase({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// Layered squares — websites, systems, and tools stacked into one build.
export function SolutionsIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </IconBase>
  );
}

// Forward arrow in a circle — first call to launch.
export function ProcessIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h7M12.5 9.5 15 12l-2.5 2.5" />
    </IconBase>
  );
}

// Frame grid — the range of design directions.
export function ShowcaseIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </IconBase>
  );
}

// Open book — practical thinking.
export function InsightsIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M12 7v13" />
      <path d="M12 7a4 4 0 0 0-4-4H3.5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H8a4 4 0 0 1 4 3 4 4 0 0 1 4-3h4.5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H16a4 4 0 0 0-4 4Z" />
    </IconBase>
  );
}

// Document/blueprint — the Digital Sales System roadmap.
export function BlueprintIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </IconBase>
  );
}

// Browser window — the demo website.
export function DemoSiteIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M6.2 6.5h.01M9 6.5h.01" />
    </IconBase>
  );
}
