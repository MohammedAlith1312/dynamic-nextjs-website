import React from "react";
import Services from "@/app/Pages/ServicesPage";
import AboutPage from "@/app/Pages/AboutPage";
import InvestorRelationPage from "@/app/Pages/InvestorRelations";
import BusinessService from "@/app/Pages/BusinessService";
import EliteService from "@/app/Pages/EliteService";
import BusinessRequestForm from "@/app/Pages/BusinessRequestForm";
import EliteRequestForm from "@/app/Pages/EliteRequestForm";
import FirstAidTraining from "@/app/Pages/First-aid-training";
import WhymawaridPage from "@/app/Pages/WhyMawaridPage";

export const dynamic = "force-dynamic";

// ✅ Generate all static paths for locales & PagesList
// export function generateStaticParams() {
//   const locales = ["ar", "en"];
//   const pagesList = [
//     "about-mawarid",
//     "services",
//     "investor-relation",
//     "business-service",
//     "elite-service",
//     "business-request-form",
//     "elite-request-form",
//     "first-aid-training",
//     "why-mawarid"
//   ];

//   const params: { locale: string; pages: string }[] = [];

//   for (const locale of locales) {
//     for (const pages of pagesList) {
//       params.push({ locale, pages });
//     }
//   }

//   return params;
// }

export default async function pagesPage({
  params,
}: {
  params: Promise<{ locale: string; pages: string }>;
}) {
  const { locale, pages } = await params;

  // ✅ Remove .html or any other extension safely
  const cleanpages = pages.replace(/\.[^/.]+$/, "");
  const isRtl = locale === "ar";

  let Component: React.ReactNode;

  switch (cleanpages) {
    case "about-mawarid":
      Component = <AboutPage locale={locale as "ar" | "en"} />;
      break;

    case "services":
      Component = <Services locale={locale as "ar" | "en"} />;
      break;

    case "investor-relation":
      Component = <InvestorRelationPage locale={locale as "ar" | "en"} />;
      break;

    case "business-service":
      Component = <BusinessService locale={locale as "ar" | "en"} />;
      break;

    case "elite-service":
      Component = <EliteService locale={locale as "ar" | "en"} />;
      break;

    case "business-request-form":
      Component = <BusinessRequestForm />;
      break;

    case "elite-request-form":
      Component = <EliteRequestForm />;
      break;

      case "first-aid-training":
        Component=<FirstAidTraining />
    break;
      
     case "why-mawarid":
      Component=<WhymawaridPage locale={locale as "ar" | "en"}/>
      break;

    default:
      Component = (
        <div className="p-10 text-center">
          <h1 className="text-4xl font-bold text-red-600">
            404 - Page Not Found
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            The pages <code>{cleanpages}</code> does not exist.
          </p>
        </div>
      );
      break;
  }

  return <div dir={isRtl ? "rtl" : "ltr"}>{Component}</div>;
}
