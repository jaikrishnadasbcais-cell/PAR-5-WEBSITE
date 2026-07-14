type IconProps = { className?: string };

const SHARED_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function HomeIcon({ className }: IconProps) {
  return (
    <svg {...SHARED_PROPS} className={className} aria-hidden="true">
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg {...SHARED_PROPS} className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.25" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.25" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.25" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.25" />
    </svg>
  );
}

export function BookIcon({ className }: IconProps) {
  return (
    <svg {...SHARED_PROPS} className={className} aria-hidden="true">
      <path d="M12 6.5c-1.5-1.5-4-2.5-8-2.5v14c4 0 6.5 1 8 2.5 1.5-1.5 4-2.5 8-2.5V4c-4 0-6.5 1-8 2.5Z" />
      <path d="M12 6.5V21" />
    </svg>
  );
}

// Editorial thin-stroke shopping bag (v3.5 H1) — the cart affordance shared by
// the desktop header and the mobile "Build" tab, which it replaces the cube
// (PackageIcon) with. Deliberately a bag outline, not a skeuomorphic trolley.
export function CartIcon({ className }: IconProps) {
  return (
    <svg {...SHARED_PROPS} className={className} aria-hidden="true">
      <path d="M6 8h12l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H8.7a1.5 1.5 0 0 1-1.5-1.3L6 8Z" />
      <path d="M9 8.5V6.5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function TargetIcon({ className }: IconProps) {
  return (
    <svg {...SHARED_PROPS} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PersonIcon({ className }: IconProps) {
  return (
    <svg {...SHARED_PROPS} className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.2-3.8 4-5.5 7.5-5.5s6.3 1.7 7.5 5.5" />
    </svg>
  );
}
