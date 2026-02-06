import type { Metadata } from "next";
import Link from "next/link";
import PriceMenu from "@/components/PriceMenu/PriceMenu";
import servicesService from "@/services/services.service";

export const metadata: Metadata = {
  title: `Preisliste - MOOD BEAUTY München`,
  description: `Unsere Preisliste für Permanent Make-Up, Nails, Lashes & Brows Services in München. Transparente Preisgestaltung für alle Schönheitsbehandlungen.`,
  keywords: [
    `Preisliste`,
    `Permanent Make-Up Preise`,
    `Nails Preise`,
    `Lashes Preise`,
    `München`,
    `MOOD BEAUTY`,
  ],
};

export default async function PreislistePage() {
  const categories = await servicesService.getServices();

  return (
    <section className="py-8 md:py-16 bg-background">
      <div className="container max-w-[1200px] px-4 md:px-8">
        <h1 className="heading-1 text-primary text-center font-bold tracking-[0.02em] mb-4">
          Preisliste
        </h1>

        <p className="body-text text-primary text-center mb-8 opacity-80 max-w-[600px] mx-auto">
          Entdecken Sie unsere transparenten Preise für alle Beauty-Services
        </p>

        <PriceMenu categories={categories} />

        {/* Booking Call-to-Action */}
        <div className="mt-12 md:mt-16 text-center">
          <h3 className="heading-3 text-primary font-semibold mb-6">
            Bereit für Ihren Termin?
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/booking"
              className="btn btn-lg btn-primary w-full sm:w-auto sm:min-w-[200px] text-center"
            >
              Online Termin buchen
            </Link>

            <Link
              href="/services"
              className="btn btn-lg btn-secondary w-full sm:w-auto sm:min-w-[200px] text-center"
            >
              Unsere Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
