"use client";

import { usePathname } from "next/navigation";
import LogoLink from "@/components/LogoLink/LogoLink";
import Menu from "@/components/Menu/Menu";

const LINKS = [
  {
    text: `Home`,
    href: `/`,
  },
  {
    text: `Über uns`,
    href: `/ueber-uns`,
  },
  {
    text: `Unsere Services`,
    href: `/services`,
  },
  {
    text: `Preisliste`,
    href: `/preisliste`,
  },
  {
    text: `Online Termin`,
    href: `/booking`,
  },
  {
    text: `Datenschutz`,
    href: `/datenschutz`,
    subLink: true,
  },
  {
    text: `Impressum`,
    href: `/impressum`,
    subLink: true,
  },
] as const;

export default function Header() {
  const pathname = usePathname();
  const isBooking = pathname?.startsWith(`/booking`);

  return (
    <header
      className={`${isBooking ? "" : "sticky top-0"} z-[1100] bg-transparent`}
      style={{ backdropFilter: isBooking ? undefined : `blur(8px)` }}
    >
      <div className="px-4 py-2">
        <div className="container flex items-center">
          <LogoLink />
          <div className="ml-auto">
            <Menu links={LINKS} />
          </div>
        </div>
      </div>
    </header>
  );
}
