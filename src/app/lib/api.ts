// import 'server-only';
export const dynamic = 'force-dynamic';

const En_API_URL = "https://portal.mawarid.com.sa/SystemApi/api/v1/entitytype/dynamic/getbycategoryid?CategoryId=CDN0000012&getfromjson=true"



const Ar_API_URL ="https://portal.mawarid.com.sa/SystemApi/api/v1/entitytype/dynamic/getbycategoryid?CategoryId=CDN0000018&getfromjson=true"
  // const API_URL = locale === "ar" ? Ar_API_URL : En_API_URL;


export async function getMessages(locale: 'ar' | 'en') {
  const API_URL = locale === "ar" ? Ar_API_URL : En_API_URL;

  // Timeout in ms
  const TIMEOUT = 20000; // 20 seconds

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    if (!API_URL) throw new Error("API_URL is not defined");

    const res = await fetch(`${API_URL}&locale=${locale}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer Public',
        'Appcode': 'SOL0000008',
        'Area': 'System',
        'Clientsecretid': '536d1e85f7a04cd385c27d98ff949cda',
        'Clientuserid': 'Public',
        'Companycode': 'Mawarid',
      },
      cache: 'no-store',
      signal: controller.signal,  // <-- attach signal here
    });

    clearTimeout(timeoutId); // Clear timeout on success

    if (!res.ok) {
      console.error(`Failed to fetch messages for locale: ${locale}, status: ${res.status}`);
      return {};
    }

    const data = await res.json();
    return data || {};
  } catch (error: any) {
    clearTimeout(timeoutId); // Clear timeout if error occurs too

    if (error.name === 'AbortError') {
      console.error(`Request timed out fetching messages for locale ${locale}`);
    } else {
      console.error(`Error fetching messages for locale ${locale}:`, error);
    }
    return {};
  }
}
