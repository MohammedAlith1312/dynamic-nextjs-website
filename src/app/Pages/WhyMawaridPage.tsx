import { getMessages } from "../lib/api";
import ServicesSection from "../components/serviceSection";
export default async function WhymawaridPage({ locale }: { locale: 'ar' | 'en' }){
      const data = await getMessages(locale);
  const items = data?.result?.Data || [];
   const WhymawaridPage = items.filter(
    (item: any) => item.WorkItemType == "WhyMawarid" && item.ParentId==60
  );
//   console.log('whymawaridPage', WhymawaridPage);

  
    return(
        <div>
             <ServicesSection  serviceItems={WhymawaridPage} locale={locale} />
           
           </div>
    )

}