export async function getMessages(locale: 'ar' | 'en') {
    const isServer = typeof window === 'undefined';
  let baseUrl = '';
  if (isServer) {
    if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else {
      baseUrl = 'http://localhost:3000'; // local dev fallback
    }
  }

  const PROXY_URL = isServer
    ? `${baseUrl}/api/proxy?locale=${locale}`
    : `/api/proxy?locale=${locale}`;

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
