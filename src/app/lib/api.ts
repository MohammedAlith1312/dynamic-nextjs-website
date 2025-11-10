export async function getMessages(locale: 'ar' | 'en') {
   const isServer = typeof window === 'undefined';
  let PROXY_URL = `/api/proxy?locale=${locale}`;

  if (isServer) {
    // When running on server, use absolute URL fallback to localhost
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'; // fallback for local dev

    PROXY_URL = `${baseUrl}/api/proxy?locale=${locale}`;
  }



  try {
    const res = await fetch(PROXY_URL, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`Proxy API error for locale ${locale}: ${res.status}`);
      return {};
    }

    const data = await res.json();
    return data || {};
  } catch (error) {
    console.error(`Failed to fetch messages from proxy for locale ${locale}`, error);
    return {};
  }
}
