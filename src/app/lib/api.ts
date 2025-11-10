export async function getMessages(locale: 'ar' | 'en') {
let PROXY_URL = `/api/proxy?locale=${locale}`;

  // Check if code is running on server
  if (typeof window === 'undefined') {
    // On server, provide absolute URL
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
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
