"use client"
import { useLocale } from "next-intl";
import Image from "next/image";
import Logo from '@/app/assests/images/MawridWebsite2023-12.png'
import Twitter from '@/app/assests/images/MawridWebsite2023-13.png'
import Instagram from '@/app/assests/images/MawridWebsite2023-14.png'
import LinkedIn from '@/app/assests/images/MawridWebsite2023-15.png'
import Youtube from '@/app/assests/images/MawridWebsite2023-16.png'

export default function FooterBottom() {
  const locale = useLocale() as "en" | "ar";
  const isArabic = locale === "ar";
  console.log("locale:", locale, "isArabic:", isArabic);

  return (
    <div 
     dir={isArabic ? "rtl" : "ltr"}
    className={`footer bg-[#54585b] text-white py-4 px-6
    //  ${ isArabic ? "md:flex-row-reverse" : "" }`
      
    }>
      <div
        className={`container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-3
         ${isArabic ? "flex-row-reverse text-right" : "flex-row text-left"}`}
      >
        {/* Left / Right text */}
        
        <div className="w-full sm:w-1/2 lg:w-1/3 text-center md:text-left text-sm">
          <a href="#" className="text-white">
            {isArabic
              ? "جميع الحقوق محفوظة 2023 ©"
              : "© Copyright 2023 All Rights Reserved"
            }
          </a>
        </div>

        {/* Centered social icons */}
        
        <div className="w-full sm:w-1/2 lg:w-1/3 flex justify-center items-center gap-5">
          <a
            href="https://x.com/MawaridManpower"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={Twitter}
              alt="twitter"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.instagram.com/mawarid.manpower/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={Instagram}
              alt="instagram"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.linkedin.com/company/mawarid-manpower-solutions-company-riyadh-saudi-arabia/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={LinkedIn}
              alt="linkedin"
              width={20}
              height={20}
            />
          </a>
          <a href="#">
            <Image
              src={Youtube}
              alt="youtube"
              width={20}
              height={20}
            />
          </a>
        </div>

        {/* Logo */}
        <div className="w-auto sm:w-1/2 lg:w-1/3 flex justify-center md:justify-end">
          <Image
            src={Logo}
            alt="logo"
            width={130}
            height={130}
          />
        </div>
      </div>
      </div>
  );
}
