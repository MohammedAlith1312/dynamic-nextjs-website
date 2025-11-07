"use client";

import { useLocale } from "next-intl";

export interface Service {
  RecId: number;
  Image?: string;
  imgposition?: "Left" | "Right" | null;
  IsBackground?: "True" | "False" | null;
  action?: string | null;
  PageUrl?: string | null;
  Order: number;
}

export interface ServiceProps {
  servicesbox: Service[];
}

export default function Services({ servicesbox }: ServiceProps) {
  const locale = useLocale();
  const sortedServices = [...servicesbox].sort((a, b) => a.Order - b.Order);
   const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div className="">
      <div className="serviceboxes">
        {sortedServices.map((service, index) => {
          let pageUrl = service.PageUrl || "";

          // Check if it's an external URL
          const httpLink =
            pageUrl.startsWith("http://") || pageUrl.startsWith("https://");
            const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

          if (!httpLink) {
         
            if (pageUrl?.includes(".html")) {
              pageUrl = pageUrl.replace(".html", "");
            }

            // Add locale prefix only for local paths
            if (!pageUrl.startsWith(`/${locale}`)) {
              pageUrl = `${basePath}/${locale}${pageUrl.startsWith("/") ? "" : "/"}${pageUrl}`;
            }
          }

          return (
            <div className="card" key={index}>
              <a
                href={pageUrl}
                {...(httpLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <img src={service.Image} alt={`Service ${index + 1}`} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
