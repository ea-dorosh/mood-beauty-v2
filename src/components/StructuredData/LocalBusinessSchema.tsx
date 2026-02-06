"use client";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": `https://schema.org`,
    "@type": `BeautySalon`,
    name: `MOOD BEAUTY München`,
    description: `Professionelles Permanent Make-Up, Nails, Lashes & Brows in München`,
    url: `https://moodbeauty.de`,
    telephone: `+49-152-073-89-443`,
    email: `moodbeauty.de@gmail.com`,
    address: {
      "@type": `PostalAddress`,
      streetAddress: `Theresienstraße 38`,
      addressLocality: `München`,
      postalCode: `80333`,
      addressCountry: `DE`,
    },
    geo: {
      "@type": `GeoCoordinates`,
      latitude: 48.1481216,
      longitude: 11.572882,
    },
    openingHoursSpecification: [
      {
        "@type": `OpeningHoursSpecification`,
        dayOfWeek: [`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`],
        opens: `10:00`,
        closes: `20:00`,
      },
      {
        "@type": `OpeningHoursSpecification`,
        dayOfWeek: [`Saturday`],
        opens: `10:00`,
        closes: `18:00`,
      },
    ],
    priceRange: `€€`,
    image: `https://moodbeauty.de/images/design/design_1.avif`,
    logo: `https://moodbeauty.de/logo.svg`,
    sameAs: [`https://www.instagram.com/moodbeauty.de`],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
