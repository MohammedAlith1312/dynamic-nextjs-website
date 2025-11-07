"use client";
import React from "react";
import Reports from "./reports";
import EmailSubscriptionForm from "./EmailSubscriptionForm";

export interface InvestorItem {
  Title: string;
  Description: string;
  NewsDate: string;
  CreatedDatetime:string;
  order: number;
  Link1?: string | null; // For news
}

interface Props {
  locale: "ar" | "en";
  items?: InvestorItem[];
  type?: "news" | "reports"|"investor-Contacts"|"Email Subscription";
}

export default function InvestorSection({ locale, items = [], type = "news" }: Props) {
 

  const InvestorContacts = [
    {
     Question:locale=='ar'?"إذا كان لديك أي سؤال أو تعليق حول شركة الموارد، يرجى الاتصال بعلاقات المستثمرين:":"If you have any question or comment about Ma'aden and its operations, please contact investor relations",
      Title:locale=='ar'?"شركة الموارد للقوى البشرية":"Mawarid manpower company",
      Address:locale=='ar'?"13211 الرياض، الروضة":"13211 Riyadh , Alrawdah",
      PhoneNo:locale=='ar'?"920028886":"920028886",
      Email:locale=='ar'?"ir@mawarid.com.sa":"ir@mawarid.com.sa"


    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${date.getFullYear()}`;
  };

  if (type === "reports") {
    return (
    <Reports locale={locale}/>
    );
  }

  if (type==="investor-Contacts"){
    return(
      <div>
       

         {InvestorContacts.map((contact, idx) => (
  <div key={idx} className="mt-4">
    <p className="mb-4 text-lg">{contact.Question}</p>
  <div className={`h-[6px] transition-all theme-bgcolor ` }></div>
    <h6 className="font-bold theme-color mt-4"><b>{contact.Title}</b></h6>
    {contact.Address}
    <p>Phone: {contact.PhoneNo}</p>
    <a href="mailto:ir@mawarid.com.sa" className="theme-color">Email: {contact.Email}</a>
  </div>
))}
      </div>
    )
  }
 
  if (type==="Email Subscription"){
    return(
      <div className="grid gap-3">
      
      <EmailSubscriptionForm/>
      </div>
    )
  }
  // Sort items descending: first by order, then by NewsDate
 const sortedItems = [...items].sort(
  (a, b) => new Date(b.CreatedDatetime).getTime() - new Date(a.CreatedDatetime).getTime()
);

  return (
    <section className="space-y-6">
      {sortedItems.length === 0 && <p>{locale === "ar" ? "لا توجد بيانات" : "No news found."}</p>}
      {sortedItems.map((item, idx) => {
        let actionText: string | null = null;
        let actionValue: any = null;

        if (item.Link1) {
          try {
            const cleaned = item.Link1.replace(/\\r\\n/g, "").trim();
            const parsed = JSON.parse(cleaned);
            actionText = Object.keys(parsed)[0];
            actionValue = Object.values(parsed)[0];
          } catch {
            
          }
        }

        return (
          <div key={idx} className="border-b pb-2">
            <h6 className=" pb-2"><b>{item.Title}</b></h6>
            <p className="text-sm theme-color ">{item.NewsDate && formatDate(item.NewsDate)}</p>
            <p className="mt-1">{item.Description}</p>
            {actionText && actionValue && (
              <a
                href={actionValue}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block px-3 py-2 border bg-yellow-400 text-white "
              >
                {actionText}
              </a>
            )}

           
          </div>
          
        );
            
      })}

      <div className="pt-4">
        <Reports locale={locale} />
      </div>
    
    </section>
  );
}
