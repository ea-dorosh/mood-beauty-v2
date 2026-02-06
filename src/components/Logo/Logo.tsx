import Image from "next/image";

interface LogoProps {
  readonly className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={className}>
      <Image
        src="/logo.svg"
        alt="MOOD BEAUTY Logo"
        fill
        sizes="160px"
        style={{ objectFit: `contain` }}
        priority
      />
    </div>
  );
}
