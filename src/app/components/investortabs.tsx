"use client";
import React, { useState } from "react";
import InvestorSection, { InvestorItem } from "./investorSection";
import Reports from "./reports";

interface Props {
  locale: "ar" | "en";
  news: InvestorItem[];
  reports: InvestorItem[];
  investorContacts:InvestorItem[];
}

export default function InvestorTabs({ locale, news, reports, investorContacts}: Props) {
  const [activeTab, setActiveTab] = useState<"news" | "reports" | "email" | "investor-Contacts">("news");
  const isArabic = locale === "ar";

  const Title= isArabic ?"علاقات المستثمرين":"INVESTOR RELATIONS"
  const texts = {
   
    News: isArabic ? "اخر الاخبار" : "News",
    Reports: isArabic ? "التقارير" : "Reports",
    EmailSubscription: isArabic
      ? "الاشتراك بنشرات البريد الالكتروني"
      : "Email Subscription",
    InvestorContacts: isArabic
      ? "للتواصل مع علاقات المستثمرين"
      : "Investor Contacts",
  };

  const tabKeys: ("news" | "reports" | "email" | "investor-Contacts")[] = ["news", "reports", "email", "investor-Contacts"];
  const tabLabels = Object.values(texts);

  return (
    <div className="px-4 py-4 container m-auto">
      <h1 className="text-2xl text-bold">{Title}</h1>
      <div dir={isArabic ? "rtl" : "ltr"} className="mt-5 flex flex-col md:flex-row gap-4">
        {/* Tabs */}
       
        <ul className={`w-full md:w-3/6 ${isArabic ? "text-right" : "text-left"}`}>
         
          {tabLabels.map((label, index) => {
            const key = tabKeys[index];
            const isActive = activeTab === key;
            return (
              <li
                key={key}
                onClick={() => setActiveTab(key)}
                className={`cursor-pointer py-2 transition-colors ${isActive ? "text-yellow-500 font-semibold" : "text-gray-700"}`}
              >
                {label}
                <div className={`h-[4px] transition-all ${isActive ? "theme-bgcolor w-2/4" : "bg-gray-200 w-2/4"}`}></div>
              </li>
            );
          })}
        </ul>

        {/* Tab content */}
        <div className="w-full md:w-4/6">
          
          {activeTab === "news" && <InvestorSection locale={locale} items={news} type="news" />}
          {activeTab === "reports" && <InvestorSection locale={locale} items={reports} type="reports" />}
          {activeTab === "email" && <InvestorSection locale={locale} items={reports} type="Email Subscription" />}
          {activeTab === "investor-Contacts" && <InvestorSection locale={locale} items={investorContacts} type="investor-Contacts" />}
           
         
        </div>
      </div>
    </div>
  );
}
