export async function getMessages(locale: 'ar' | 'en') {
  const PROXY_URL = `/api/proxy?locale=${locale}`; // always relative URL

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
