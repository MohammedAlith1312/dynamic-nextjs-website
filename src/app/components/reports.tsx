import React from "react";


interface ReportsProps {
  locale: "ar" | "en";
}

export default function Reports({ locale }: ReportsProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const reports = [
    {
      Title: locale === "ar" ? "عرض موارد للمستثمر Q2 2025" : "Mawarid Investor Presentation Q2 2025",
      Date: "2025-08-17",
      FileLink: `${basePath}/assests/pdf/Mawarid.Investor.Presentation.Q2.2025.Execution.Copy.as.of.17.08.25._vfinal.pdf`,
      Button: locale === "ar" ? "تحميل" : "Download",
    },
  ];

  return (
    <section className="border-b pb-2">
      {reports.map((item, idx) => (
        <div key={idx}>
          <h6 className="font-bold text-base pb-2">{item.Title}</h6>
          <p className="text-yellow-400 text-sm">{item.Date}</p>
          <p className="py-2">.</p>
          <a
  href={item.FileLink}
  download
  className="inline-block bg-yellow-400 text-white font-medium px-4 py-2 mt-6 hover:bg-yellow-500 transition-colors"
>
  {item.Button}
</a>

        </div>
      ))}
    </section>
  );
}
