import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";
import { categoriesData } from "@/constants/staticData";

export default function ServicesPage() {
  return (
    <section className="py-8 md:py-16">
      <div className="container">
        <h1 className="heading-1 text-center mb-8 font-bold tracking-wide">
          Unsere Services
        </h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {categoriesData.map((service) => (
            <div
              key={service.href}
              className="flex md:justify-center"
            >
              <Link
                href={service.href}
                className="block no-underline text-inherit w-full md:w-[400px]"
              >
                <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,.06)] h-full flex flex-col transition-[transform,box-shadow] duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,.1)]">
                  <div className="relative aspect-video">
                    <OptimizedImage
                      src={service.img}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                      style={{
                        objectFit: `cover`,
                        objectPosition: `center`,
                      }}
                    />
                  </div>

                  <div className="p-4 md:p-6 flex flex-col gap-2">
                    <h3 className="heading-3 font-semibold mb-1">
                      {service.title}
                    </h3>
                    <p className="body-text opacity-90 leading-relaxed">
                      {service.text}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
