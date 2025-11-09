// app/lib/proxy.ts

export async function fetchFromPortal(categoryId: string, locale: "ar" | "en") {
  const BASE_URL =
    "https://portal.mawarid.com.sa/SystemApi/api/v1/entitytype/dynamic/getbycategoryid";

  const url = `${BASE_URL}?CategoryId=${categoryId}&getfromjson=true&locale=${locale}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    const res = await fetch(url, {
      headers: {
        "Authorization": "Bearer Public",
        "Appcode": "SOL0000008",
        "Area": "System",
        "Clientsecretid": "536d1e85f7a04cd385c27d98ff949cda",
        "Clientuserid": "Public",
        "Companycode": "Mawarid",
      },
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error("Portal API error:", res.status, res.statusText);
      return null;
    }

    return await res.json();
  } catch (err: any) {
    clearTimeout(timeout);
    if (err.name === "AbortError") console.error(" Portal API request timed out");
    else console.error(" Portal API fetch failed:", err);
    return null;
  }
}
