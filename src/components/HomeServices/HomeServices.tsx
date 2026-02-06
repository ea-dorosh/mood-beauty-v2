import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage/OptimizedImage";
import { categoriesData } from "@/constants/staticData";

export default function HomeServices() {
  return (
    <section className="py-8 md:py-16">
      <div className="container px-4 md:px-8">
        <h2 className="heading-2 text-primary text-center font-bold tracking-[.02em] mb-8">
          Unsere Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {categoriesData.map((service) => (
            <div
              key={service.href}
              className="flex md:justify-center"
            >
              <Link
                href={service.href}
                className="block w-full md:w-[400px] flex-shrink-0"
              >
                <div className="service-card">
                  {/* Image */}
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

                  {/* Content */}
                  <div className="p-4 md:p-6 flex flex-col gap-2">
                    <h3 className="heading-3 text-primary font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="body-text text-primary opacity-90 leading-relaxed">
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
