"use client";

import React, { useState, useEffect } from "react";
import Sidenav from "./SideNav";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from '@/app/assests/images/logo.png'
import FirstAidFormLogo from '@/app/assests/images/FirstAidFormLogo.png'


export default function MenuHeader() {
  const locale = useLocale() as "ar" | "en";
  const pathname = usePathname() ?? "/";
  const otherLocale = locale === "ar" ? "en" : "ar";
  const [activeSection, setActiveSection] = useState<string>("");

  
  const texts = {
    aboutMawarid: locale === "ar" ? "عن الموارد" : "ABOUT MAWARID",
    services: locale === "ar" ? "الخدمات" : "SERVICES",
    achievement: locale === "ar" ? "الإنجازات" : "ACHIEVEMENT",
    contact: locale === "ar" ? "تواصل معنا" : "CONTACT US",
    investor: locale === "ar" ? "علاقات المستثمرين" : "INVESTOR RELATIONS",
    language: otherLocale === "ar" ? "ع" : "En",
    lang2:otherLocale === "ar" ? "ع" : "E",
    profile: locale === "ar" ? "الملف التعريفي" : "Profile",
    button:locale==="ar"?"/assests/pdf/MawaridProfile2025Arabic.pdf":"/assests/pdf/MawaridProfile2025English.pdf"
  };

  useEffect(() => {
  // Clean up first
  const header = document.getElementById("menuHeader");
  const sections = ["Achievements", "ContactUs"];
  let cleanup = false;

  // Run only on home page
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`||pathname === `/${locale}/${texts}`;

  if (!isHome) {
    setActiveSection("");
    // if (header) header.classList.remove("sticky");
    return;
  }

  const sticky = header?.offsetTop ?? 0;

  const handleScroll = () => {
    if (cleanup) return; // prevent updates after unmount
    const scrollY = window.scrollY;
    let current = "";

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const offsetTop = el.offsetTop - 150;
        const offsetBottom = offsetTop + el.offsetHeight;
        if (scrollY >= offsetTop && scrollY < offsetBottom) {
          current = id;
        }
      }
    });

    setActiveSection(current);

    if (window.pageYOffset > sticky) {
      header?.classList.add("stickyDown");
    } else {
      header?.classList.remove("stickyDown");
    }
  };

  // Wait a bit until page fully loads
  const timer = setTimeout(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
  }, );

  // Cleanup when leaving page
  return () => {
    cleanup = true;
    clearTimeout(timer);
    window.removeEventListener("scroll", handleScroll);
  };
}, [pathname, locale]);

  // Compute locale switch path
  let newPath = pathname;
  if (pathname.startsWith(`/${locale}/`)) {
    newPath = pathname.replace(`/${locale}/`, `/${otherLocale}/`);
  } else if (pathname === `/${locale}` || pathname === `/${locale}/`) {
    newPath = `/${otherLocale}`;
  } else {
    newPath = `/${otherLocale}`;
  }


  const isActive = (route: string) =>
    pathname === route || pathname.startsWith(route + "/");


   const isFirstAid = pathname.includes("first-aid-training");

  if (isFirstAid) {
    const firstAidText =
      locale === "ar"
        ? "نموذج تسجيل دورة الإسعافات الأولية"
        : "First Aid Training Registration Form";

    const firstAidLocalePath =
       `/en/first-aid-training`
      

    return (
      <div id="menuHeader" className="w-screen sticky top-0 z-100">
        <div className="menu-header container mx-auto flex justify-between items-center py-4 px-4 xl:px-6 bg-white">
          {/* Left Section: Logos */}
          <div className="flex items-center gap-4">
            {/* Main logo */}
            <Link href={`/${locale}/first-aid-training`}>
              <Image
                src={Logo}
                alt="Mawarid Logo"
                width={110}
                height={110}
                className="cursor-pointer"
              />
            </Link>

     
          </div>


<div className="text-center py-3 hidden xl:block">
          <h2 className="text-2xl  ">
            {firstAidText}
          </h2>
        </div>
          {/* Language button (E / ع) */}
          <div className="flex gap-2">
                   {/* First Aid logo */}
            <Link href={`/ar/first-aid-training`}>
              <Image
                src={FirstAidFormLogo}
                alt="First Aid Logo"
                width={60}
                height={50}
                className="cursor-pointer"
              />
            </Link>
            <Link href={firstAidLocalePath}>
              <button className={`bg-[#fdbd3f]   border-2 border-[#fdbd3f] hover:bg-transparent hover:text-[#fdbd3f] transition-all duration-300 
                ${otherLocale + "-lang"}`}>
                {texts.lang2}
              </button>
            </Link>
          </div>
        </div>

        
        
      </div>
    );
  }


  

  return (
    <div id="menuHeader" className="w-screen bg-white sticky top-0 z-100 animate-top">
      <div className="menu-header flex sm:flex-shrink-1 px-4 xl:px-6 justify-between items-center py-6 bg-white w-screen container mx-auto">
        {/* Mobile Menu */}
        <div className="pt-3 xl:hidden relative">
          <Sidenav />
        </div>

        {/* Logo */}
        <div>
          <Link href={`/${locale}`}>
            <Image
              src={Logo}
              alt="logo"
              width={130}
              height={130}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden xl:block">
          <ul className="flex gap-4 h-full items-center justify-center w-full pt-2">
            <li
              className={`flex gap-3 ${
                isActive(`/${locale}/about-mawarid`)
                  ? "text-[#fdbd3f]"
                  : "hover:text-[#fdbd3f]"
              }`}
            >
              <Link href={`/${locale}/about-mawarid`} locale={locale}>
                {texts.aboutMawarid}
              </Link>
              <div className="bg-[#fdbd3f] w-1" />
            </li>

            <li
              className={`flex gap-3 ${
                isActive(`/${locale}/services`)
                  ? "text-[#fdbd3f]"
                  : "hover:text-[#fdbd3f]"
              }`}
            >
              <Link href={`/${locale}/services`} locale={locale}>
                {texts.services}
              </Link>
              <div className="bg-[#fdbd3f] w-1" />
            </li>

            {/* ✅ Highlight only when on homepage */}
            <li
              className={`flex gap-3 ${
               activeSection === "Achievements"
                  ? "text-[#fdbd3f]"
                  : "hover:text-[#fdbd3f]"
              }`}
            >
              <Link href={`/${locale}#Achievements`}>{texts.achievement}</Link>
              <div className="bg-[#fdbd3f] w-1" />
            </li>

            <li
              className={`flex gap-3 ${
                activeSection === "ContactUs"
                  ? "text-[#fdbd3f]"
                  : "hover:text-[#fdbd3f]"
              }`}
            >
              <Link href={`/${locale}#ContactUs`}>{texts.contact}</Link>
              <div className="bg-[#fdbd3f] w-1" />
            </li>

            <li
              className={`flex gap-3 ${
                isActive(`/${locale}/investor-relation`)
                  ? "text-[#fdbd3f]"
                  : "hover:text-[#fdbd3f]"
              }`}
            >
              <Link href={`/${locale}/investor-relation`} locale={locale}>
                {texts.investor}
              </Link>
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-1 xl:gap-2 h-full items-center pt-2">
          {/* Language Switch */}
          <Link href={newPath} locale={otherLocale}>
            <button
              className={`bg-[#fdbd3f] border-2 hover:bg-transparent border-[#fdbd3f] px-2 text-center xl:px-2 xl:py-1 ${
                otherLocale + "-lang"
              }`}
            >
              {texts.language}
            </button>
          </Link>

          {/* Profile */}
          <Link
            href={texts.button}
            target="_blank"
            rel="noopener noreferrer"
          
          >
            <button className="bg-[#fdbd3f] border-2 hover:bg-transparent border-[#fdbd3f] px-1 xl:py-1 text-center xl:text-center">
              {texts.profile}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
