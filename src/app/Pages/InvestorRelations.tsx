import React from "react";
import { getMessages } from "../lib/api";
import InvestorTabs from "../components/investortabs";



export default async function InvestorRelationPage({ locale }: { locale: "ar" | "en" }) {
  
 const data = await getMessages(locale);
  const items = data?.result?.Data || [];

    const investorRelation = items.filter(
    (item: any) => item.WorkItemType === 'News' && item.ParentId === 56
    
  );


  return <InvestorTabs locale={locale} news={investorRelation} reports={[]} investorContacts={[]} />;
}
