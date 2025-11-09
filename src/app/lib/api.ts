import { fetchFromPortal } from "./proxy";

export async function getMessages(locale: "ar" | "en") {
  const categoryId = locale === "ar" ? "CDN0000018" : "CDN0000012";

  const data = await fetchFromPortal(categoryId, locale);

  if (!data) {
    return { result: { Data: [] } }; // fallback if error or timeout
  }

  return data;
}
