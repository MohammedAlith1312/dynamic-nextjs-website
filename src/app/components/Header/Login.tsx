"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { FaCaretDown } from "react-icons/fa6";
import Link from "next/link";

export default function Login() {
  const [open, setOpen] = useState(false);
  const locale = useLocale() as "ar" | "en";

  


  const texts = {
    login: locale === "ar" ? "تسجيل الدخول" : "Login",
    employee: locale === "ar" ? "الموظفين" : "Employee",
    individual: locale === "ar" ? "عملاء الأفراد" : "Individual Customer",
  };

  return (
    <div className="relative login cursor-pointer">
      <div
        onClick={() => setOpen(!open)}
        className="flex gap-2 text-white transition z-0 items-center"
      >
        {texts.login}
        <FaCaretDown /> 
      </div>

      {open && (
        <div
          className={`absolute top-full mt-1 w-48 rounded-md shadow-lg z-110 bg-white ${
            locale === "ar" ? "left-0" : "right-0"
          }`}
        >
          <ul
            className={` ${
              locale === "ar" ? "text-right" : "text-left"
            }`}
          >
            <li className="hover:bg-gray-100 p-3">
              <Link
                href="https://svc.mawarid.com.sa"
                target="_blank"
                className="block rounded-md"
              >
                {texts.employee}
              </Link>
            </li>
            <li className="hover:bg-gray-100 p-3">
              <Link
                href="https://hemmah.com.sa/home"
                target="_blank"
                className="block rounded-md"
              >
                {texts.individual}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
