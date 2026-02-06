import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://moodbeauty.de`;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: `weekly`,
      priority: 1,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: `daily`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/preisliste`,
      lastModified: new Date(),
      changeFrequency: `daily`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: `weekly`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/permanent-make-up`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/permanent-make-up/powder-brows`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/permanent-make-up/hairstroke`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/permanent-make-up/velvet-lips`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/permanent-make-up/wimpernkranz`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/nails`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/lashes-und-brows`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ueber-uns`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date(),
      changeFrequency: `yearly`,
      priority: 0.1,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: `yearly`,
      priority: 0.1,
    },
  ];
}
