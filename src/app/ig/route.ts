import { NextResponse, type NextRequest } from "next/server";

export const dynamic = `force-dynamic`;
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    // Fix for production: use the correct domain instead of localhost
    const host = url.host.includes(`localhost`) ? `moodbeauty.de` : url.host;
    const protocol = url.host.includes(`localhost`) ? `https:` : url.protocol;
    // Ensure protocol always ends with colon
    const normalizedProtocol = protocol.endsWith(`:`) ? protocol : `${protocol}:`;
    const origin = `${normalizedProtocol}//${host}`;

    console.log(`[IG] Processing Instagram redirect from: ${origin} (original: ${url.protocol}//${url.host})`);

    // Call internal API to log click
    const apiUrl = `${origin}/api/link-track?channel=instagram-bio&target=/booking`;
    console.log(`[IG] Calling tracking API: ${apiUrl}`);

    try {
      const trackingResponse = await fetch(apiUrl, {
        method: `POST`,
        cache: `no-store`,
        headers: {
          "User-Agent": request.headers.get(`user-agent`) || `Instagram-Bot`,
        },
      });
      console.log(`[IG] Tracking API response: ${trackingResponse.status} ${trackingResponse.ok}`);
    } catch (error) {
      console.error(`[IG] Tracking API failed:`, (error as Error).message);
    }

    const redirectUrl = `${origin}/booking?utm_source=instagram&utm_medium=social&utm_campaign=bio&utm_content=profile_link&source=instagram`;
    console.log(`[IG] Redirecting to: ${redirectUrl}`);

    // Create redirect response with no-cache headers
    const response = NextResponse.redirect(redirectUrl, { status: 302 });

    // Add headers to prevent caching
    response.headers.set(`Cache-Control`, `no-cache, no-store, must-revalidate, max-age=0`);
    response.headers.set(`Pragma`, `no-cache`);
    response.headers.set(`Expires`, `0`);
    response.headers.set(`CDN-Cache-Control`, `no-cache`);
    response.headers.set(`Cloudflare-CDN-Cache-Control`, `no-cache`);
    response.headers.set(`Vary`, `*`);
    response.headers.set(`X-Robots-Tag`, `noindex, nofollow`);

    return response;
  } catch (error) {
    console.error(`[IG] Unexpected error:`, (error as Error).message);

    try {
      const fallbackUrl = new URL(request.url);
      const fallbackProtocol = fallbackUrl.protocol.endsWith(`:`)
        ? fallbackUrl.protocol
        : `${fallbackUrl.protocol}:`;
      const fallbackOrigin = `${fallbackProtocol}//${fallbackUrl.host}`;
      const fallbackResponse = NextResponse.redirect(`${fallbackOrigin}/booking`, { status: 302 });

      // Add no-cache headers to fallback too
      fallbackResponse.headers.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
      fallbackResponse.headers.set(`Pragma`, `no-cache`);
      fallbackResponse.headers.set(`Expires`, `0`);

      return fallbackResponse;
    } catch {
      const hardcodedResponse = NextResponse.redirect(`https://moodbeauty.de/booking`, { status: 302 });
      hardcodedResponse.headers.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
      return hardcodedResponse;
    }
  }
}
