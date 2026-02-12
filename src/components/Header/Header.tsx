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
      className={`${isBooking ? "" : "sticky top-0"} z-[1100]`}
      style={{
        backgroundColor: isBooking ? `transparent` : `rgba(255, 255, 255, 0.65)`,
        backdropFilter: isBooking ? undefined : `blur(8px)`,
        borderBottom: isBooking ? `none` : `1px solid rgba(0, 0, 0, 0.06)`,
      }}
    >
      <div className="px-0 h-[70px]">
        <div className="container flex items-center h-full">
          <LogoLink />
          <div className="ml-auto">
            <Menu links={LINKS} />
          </div>
        </div>
      </div>
    </header>
  );
}
