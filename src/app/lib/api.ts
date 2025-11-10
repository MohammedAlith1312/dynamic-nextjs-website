
"use server";

export async function getMessages(locale: "en" | "ar") {
  const API_URL = locale === "ar"
    ? "https://portal.mawarid.com.sa/SystemApi/api/v1/entitytype/dynamic/getbycategoryid?CategoryId=CDN0000018&getfromjson=true"
    : "https://portal.mawarid.com.sa/SystemApi/api/v1/entitytype/dynamic/getbycategoryid?CategoryId=CDN0000012&getfromjson=true";

  const res = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer Public",
      "Appcode": "SOL0000008",
      "Area": "System",
      "Clientsecretid": "536d1e85f7a04cd385c27d98ff949cda",
      "Clientuserid": "Public",
      "Companycode": "Mawarid",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch Mawarid API");
  return res.json();
}
