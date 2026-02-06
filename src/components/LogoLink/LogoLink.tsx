"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo/Logo";

export default function LogoLink() {
  const pathname = usePathname();
  const isMainPage = pathname === `/`;

  const logoClassName = "absolute top-1/2 -translate-y-1/2 z-[1201] w-[160px] h-[47px]";

  if (isMainPage) {
    return (
      <div className="w-[160px] h-[70px] relative">
        <Logo className={logoClassName} />
      </div>
    );
  }

  return (
    <div className="w-[160px] h-[70px] relative">
      <Link href="/">
        <Logo className={logoClassName} />
      </Link>
    </div>
  );
}
