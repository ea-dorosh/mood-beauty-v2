import Link from "next/link";

interface CategoryInfoProps {
  readonly description: string;
  readonly services?: readonly string[];
  readonly advantages?: readonly string[];
  readonly conclusion?: string;
  readonly ctaText?: string;
  readonly ctaHref?: string;
}

export default function CategoryInfo({
  description,
  services,
  advantages,
  conclusion,
  ctaText = `Jetzt Termin vereinbaren`,
  ctaHref = `/booking`,
}: CategoryInfoProps) {
  return (
    <div className="max-w-[800px] mx-auto p-0">
      <p className="leading-[1.8] mb-8 text-[1.1rem] text-justify">
        {description}
      </p>

      {services && (
        <div className="mb-8">
          <h4 className="heading-4 mb-4 text-[1.3rem] font-semibold">
            Unsere Leistungen:
          </h4>
          <ul className="list-none p-0 m-0">
            {services.map((service, index) => (
              <li
                key={index}
                className="flex items-start gap-2 py-1"
              >
                <svg
                  className="w-5 h-5 mt-0.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span className="text-base leading-relaxed">{service}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {advantages && (
        <div className="mb-8">
          <h4 className="heading-4 mb-4 text-[1.3rem] font-semibold">
            Vorteile unserer Techniken:
          </h4>
          <ul className="list-none p-0 m-0">
            {advantages.map((advantage, index) => (
              <li
                key={index}
                className="flex items-start gap-2 py-1"
              >
                <svg
                  className="w-5 h-5 mt-0.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span className="text-base leading-relaxed">{advantage}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {conclusion && (
        <p className="leading-[1.8] mb-8 text-[1.1rem] text-justify italic text-gray-500">
          {conclusion}
        </p>
      )}

      <div className="text-center">
        <Link
          href={ctaHref}
          className="btn btn-md btn-primary"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
