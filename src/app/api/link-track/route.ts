import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const channel = searchParams.get(`channel`) || `unknown`;
    const target = searchParams.get(`target`) || `/booking`;

    console.log(`[LINK-TRACK] Processing request:`, {
      channel,
      target,
      nodeEnv: process.env.NODE_ENV,
      serverApiUrl: process.env.SERVER_API_URL,
    });

    const headersIn = request.headers;
    const xff = headersIn.get(`x-forwarded-for`);
    const xri = headersIn.get(`x-real-ip`);
    const cfc = headersIn.get(`cf-connecting-ip`);
    const ua = headersIn.get(`user-agent`);
    const ref = headersIn.get(`referer`);

    // Try local backend first (works in prod if Next and API are co-located)
    const tryPost = async (baseUrl: string) => {
      const targetUrl = `${baseUrl.replace(/\/$/, ``)}/api/public/tracking/link-click`;
      return fetch(targetUrl, {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`,
          ...(ua ? { "user-agent": ua } : {}),
          ...(ref ? { referer: ref } : {}),
          ...(xff ? { "x-forwarded-for": xff } : {}),
          ...(xri ? { "x-real-ip": xri } : {}),
          ...(cfc ? { "cf-connecting-ip": cfc } : {}),
        },
        body: JSON.stringify({
          linkedAt: new Date().toISOString(),
          channel,
          target,
        }),
        cache: `no-store`,
      });
    };

    const isProd = process.env.NODE_ENV === `production`;
    let response: Response | null = null;

    // In production, try the public backend URL first
    if (isProd) {
      const backendUrl = process.env.SERVER_API_URL || `https://crm.moodbeauty.de`;
      try {
        console.log(`[LINK-TRACK] Trying production backend: ${backendUrl}`);
        response = await tryPost(backendUrl);
        console.log(`[LINK-TRACK] Production backend response:`, {
          status: response?.status,
          ok: response?.ok,
        });
      } catch (error) {
        console.log(`[LINK-TRACK] Production backend failed:`, (error as Error).message);
      }
    }

    // Try local backend if production failed or in development
    if (!response || !response.ok) {
      try {
        console.log(`[LINK-TRACK] Trying local backend: http://127.0.0.1:3500`);
        response = await tryPost(`http://127.0.0.1:3500`);
        console.log(`[LINK-TRACK] Local backend response:`, {
          status: response?.status,
          ok: response?.ok,
        });
      } catch (error) {
        console.log(`[LINK-TRACK] Local backend failed:`, (error as Error).message);
      }
    }

    if (!response || !response.ok) {
      console.log(`[LINK-TRACK] All attempts failed, returning 502`);
      return NextResponse.json({ error: `Upstream error` }, { status: 502 });
    }

    console.log(`[LINK-TRACK] Success! Returning 200`);
    return NextResponse.json({ message: `link click logged` }, { status: 200 });
  } catch (error) {
    console.error(`[LINK-TRACK] Unexpected error:`, error);
    return NextResponse.json({ error: `Proxy failed` }, { status: 500 });
  }
}
