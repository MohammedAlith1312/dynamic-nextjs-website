"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { FaBars, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function MenuHeaderButtons() {
  const [open, setOpen] = useState(false);
  const locale = useLocale() as "ar" | "en";
  const isArabic = locale === "ar";

  const closeNav = () => setOpen(false);

  const links = {
    ar: [
      { text: "عن الموارد", href: `/${locale}/about-mawarid` },
      { text: "الخدمات", href: `/${locale}/services` }, 
      { text: "الإنجازات", href: `/${locale}#Achievements` },
      { text: "تواصل معنا", href: `/${locale}#ContactUs` }, 
      { text: "علاقات المستثمرين", href: `/${locale}/investor-relation` }, 
    ],
    en: [
      { text: "ABOUT ALMAWARID", href: `/${locale}/about-mawarid` },
      { text: "SERVICES", href: `/${locale}/services` }, 
      { text: "ACHIEVEMENTS", href: `/${locale}#Achievements` },
      { text: "CONTACT US", href: `/${locale}#ContactUs` }, 
      { text: "INVESTOR RELATIONS", href: `/${locale}/investor-relation` }, 
    ],
  };

  return (
    <div dir={isArabic ? "rtl" : "ltr"}>
      {/* Open Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center text-[#fdbd3f] text-2xl"
      >
        <FaBars />
      </button>

      {/* Sidebar Menu */}
      <div
        className={`absolute -top-8 ${
          isArabic ? "-right-4" : "-left-4"
        } w-[200px] bg-[#595c5e] text-white z-50 shadow-lg 
        transform transition-transform duration-[1000ms]
        ${open ? "translate-x-0" : isArabic ? "translate-x-full" : "-translate-x-full"}`}
      >
        <div className="p-4 flex flex-col gap-5">
          {/* Close Button */}
          <button
            onClick={closeNav}
            className={`text-[#fdbd3f] text-2xl ${
              isArabic ? "self-start" : "self-end"
            }`}
          >
            {isArabic ? <FaArrowRight /> : <FaArrowLeft />}
          </button>

          {/* Navigation */}
          <nav className="flex flex-col gap-7 text-sm font-bold pb-6">
            {links[locale].map((item, index) => (
              <div key={index} className="flex flex-col gap-3">
                <Link
                  href={item.href}
                  onClick={closeNav}
                  className="hover:text-[#fdbd3f]"
                >
                  {item.text}
                </Link>
                <div className="bg-[#fdbd3f] w-full h-0.5"></div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
