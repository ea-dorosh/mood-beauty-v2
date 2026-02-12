import AppointmentCancellation from "@/components/AppointmentCancellation/AppointmentCancellation";

export const metadata = {
  title: `Termin stornieren - MOOD BEAUTY München`,
  description: `Stornieren Sie Ihren Termin bei MOOD BEAUTY München einfach und unkompliziert.`,
  robots: `noindex, nofollow`, // Don't index cancellation pages
};

export default async function AppointmentCancellationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <AppointmentCancellation token={token} />
    </div>
  );
}
