import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";

interface SubCategoryCardInfoProps {
  readonly id?: string;
  readonly title: string;
  readonly price: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly children: React.ReactNode;
  readonly detailsHref?: string;
}

export default function SubCategoryCardInfo({
  id,
  title,
  price,
  imageSrc,
  imageAlt,
  children,
  detailsHref,
}: SubCategoryCardInfoProps) {
  return (
    <div
      id={id}
      className="rounded-2xl p-6 bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
    >
      <div className="relative w-full pt-[67%] overflow-hidden rounded-2xl">
        <OptimizedImage
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          quality={80}
          style={{
            objectFit: `cover`,
            objectPosition: `center`,
          }}
        />
      </div>

      <div className="pt-4">
        <h3
          aria-label={title}
          className="text-[1.3rem] font-semibold mb-2 font-heading"
        >
          {title}
        </h3>

        <p
          aria-label={`Preis: ${price} Euro`}
          className="text-[1.2rem] font-bold mb-3"
        >
          {price}€
        </p>

        <div className="leading-relaxed mb-4">
          {children}
        </div>

        <div className="flex gap-3 mt-4">
          <Link
            href="/booking"
            className="btn btn-sm btn-primary flex-1 text-center"
          >
            Jetzt buchen
          </Link>

          {detailsHref && (
            <Link
              href={detailsHref}
              className="btn btn-sm btn-secondary flex-1 text-center"
            >
              Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
