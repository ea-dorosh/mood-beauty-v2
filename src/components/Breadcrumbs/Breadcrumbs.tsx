"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Map URL segments to readable labels
const SEGMENT_LABELS: Record<string, string> = {
  services: `Services`,
  nails: `Maniküre & Pediküre`,
  "permanent-make-up": `Permanent Make-Up`,
  "powder-brows": `Powder Brows`,
  hairstroke: `Hairstroke`,
  "velvet-lips": `Velvet Lips`,
  wimpernkranz: `Wimpernkranz`,
  booking: `Termin buchen`,
  "ueber-uns": `Über uns`,
  impressum: `Impressum`,
  datenschutz: `Datenschutz`,
};

// Pages where breadcrumbs should not be displayed
const HIDDEN_PAGES = [`/`, `/ueber-uns`, `/services`, `/booking`];
const HIDDEN_PREFIXES = [`/termin-stornieren`];

interface Breadcrumb {
  readonly label: string;
  readonly href: string;
  readonly current: boolean;
}

const formatSegmentLabel = (segment: string): string => {
  if (SEGMENT_LABELS[segment]) {
    return SEGMENT_LABELS[segment];
  }

  // Capitalize first letter and replace hyphens with spaces
  return segment
    .split(`-`)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(` `);
};

const generateBreadcrumbs = (pathname: string): readonly Breadcrumb[] => {
  const segments = pathname.split(`/`).filter(Boolean);
  const breadcrumbs: Breadcrumb[] = [
    { label: `Home`, href: `/`, current: false },
  ];

  let currentPath = ``;

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    breadcrumbs.push({
      label: formatSegmentLabel(segment),
      href: currentPath,
      current: isLast,
    });
  });

  return breadcrumbs;
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Hide breadcrumbs on main pages or pages that start with hidden prefixes
  const shouldHide =
    HIDDEN_PAGES.includes(pathname) ||
    HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (shouldHide) {
    return null;
  }

  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <div className="py-4 px-6 bg-background border-b border-black/10 container">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm md:text-base">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.href} className="flex items-center gap-2">
              {/* Separator */}
              {index > 0 && (
                <span className="text-black/40" aria-hidden="true">/</span>
              )}

              {breadcrumb.current ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="text-black/60 hover:underline transition-colors"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
