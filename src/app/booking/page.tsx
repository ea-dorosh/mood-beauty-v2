import { headers as nextHeaders } from "next/headers";
import BookingFormContainer from "@/components/BookingForm/BookingFormContainer";
import servicesService from "@/services/services.service";

// Force dynamic rendering to run server-side tracking on every request
export const dynamic = `force-dynamic`;

export const metadata = {
  title: `Online Termin buchen - MOOD BEAUTY München | Natalia Dorosh`,
  description: `Buchen Sie Ihren Termin für Permanent Make-Up, Nail Art und andere Schönheitsbehandlungen in München. Kostenlose Beratung verfügbar.`,
  keywords: `Termin buchen, Permanent Make-Up München, Nail Art München, Schönheitsbehandlung, Online Buchung, MOOD BEAUTY`,
};

async function trackQrScan(searchParams: { source?: string } | undefined) {
  const source = searchParams?.source;
  if (!source) return;

  const incoming = await nextHeaders();
  const xff = incoming.get(`x-forwarded-for`);
  const xri = incoming.get(`x-real-ip`);
  const cfc = incoming.get(`cf-connecting-ip`);
  const ua = incoming.get(`user-agent`);
  const ref = incoming.get(`referer`);
  const proto = incoming.get(`x-forwarded-proto`) || `http`;
  const host = incoming.get(`host`);
  const origin = `${proto}://${host}`;
  const nextLocalOrigin = `http://127.0.0.1:3001`;

  const trackingMap: Record<string, string> = {
    public: `qr-track`,
    coupon: `coupon-qr-track`,
    ga: `ga-track`,
    ga1: `ga1-track`,
    ga2: `ga2-track`,
  };

  const trackingEndpoint = trackingMap[source];
  if (!trackingEndpoint) return;

  const headers: Record<string, string> = {
    "Content-Type": `application/json`,
    ...(ua ? { "user-agent": ua } : {}),
    ...(ref ? { referer: ref } : {}),
    ...(xff ? { "x-forwarded-for": xff } : {}),
    ...(xri ? { "x-real-ip": xri } : {}),
    ...(cfc ? { "cf-connecting-ip": cfc } : {}),
  };

  const body = JSON.stringify({
    trackedAt: new Date().toISOString(),
    source: `server-side`,
  });

  try {
    try {
      await fetch(`${nextLocalOrigin}/api/${trackingEndpoint}`, {
        method: `POST`,
        headers,
        body,
        cache: `no-store`,
      });
    } catch {
      await fetch(`${origin}/api/${trackingEndpoint}`, {
        method: `POST`,
        headers,
        body,
        cache: `no-store`,
      });
    }
  } catch (error) {
    console.error(`${source} tracking error:`, error);
  }
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const categories = await servicesService.getServices();
  await trackQrScan(resolvedSearchParams);

  return (
    <BookingFormContainer categories={categories as unknown as import("@/types/booking").Category[]} />
  );
}
