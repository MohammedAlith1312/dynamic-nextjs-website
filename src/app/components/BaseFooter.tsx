'use client';
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BaseFooter() {
  const locale = useLocale() as "en" | "ar";
  const isArabic = locale === "ar";

  const pathname = usePathname();

  // --- Conditional background ---
  // White on '/' or '/en' or '/ar', gray otherwise
  const isWhiteBg = pathname === "/" || pathname === `/${locale}`;
  const bgClass = isWhiteBg ? "bg-white" : "basefooter";

  // --- Hide footer on investor relation page ---
  const hideFooter =
  pathname?.includes("investor-relation") ||
  pathname?.includes("business-request-form") ||
   pathname?.includes("elite-service") ||
  pathname?.includes("elite-request-form")||
  pathname?.includes("first-aid-training");


  if (hideFooter) return null;

  const links = isArabic
    ? [
        { href: `/${locale}/about-mawarid`, label: "عن الموارد" },
        { href: `/${locale}/services`, label: "الخدمات" },
        { href: `/${locale}#Achievements`, label: "الإنجازات" },
        { href: `/${locale}#ContactUs`, label: "تواصل معنا" },
        { href: `/${locale}/investor-relation`, label: "علاقات المستثمرين" },
      ]
    : [
        { href: `/${locale}/about-mawarid`, label: "ABOUT ALMAWARID" },
        { href: `/${locale}/services`, label: "SERVICES" },
        { href: `/${locale}#Achievements`, label: "ACHIEVEMENTS" },
        { href:`/${locale}#ContactUs`, label: "CONTACT" },
        { href:`/${locale}/investor-relation`, label: "INVESTOR RELATIONS" },
      ];

  return (
    <div id="ContactUs"
      dir={isArabic ? "rtl" : "ltr"}
      className={`px-4 py-8 base-footer ${bgClass}`}
    >
      <div className="container mx-auto">
      <ul className={`flex flex-wrap font-Medium ${isArabic ? "text-right" : "text-left"}`}>
        {links.map((item, index) => (
          <li key={index} className="w-1/2 md:w-1/2 lg:w-full">
            {/* <a href={item.href}>{item.label}</a> */}
            <Link href={item.href}>{item.label}</Link>
            <div className="line h-[2px] theme-bgcolor w-full mt-2"></div>
          </li>
        ))}
      </ul>
      <div className="mt-12 address">
        <p className="mb-1">{isArabic ? "13211 الرياض، الروضة" : "13211 Riyadh , Alrawdah"}</p>
        <p className="mb-1">920028886</p>
        <p>
          <a href="mailto:info@mawarid.com.sa">info@mawarid.com.sa</a>
        </p>
      </div>
      </  div>
    </div>
  );
}
