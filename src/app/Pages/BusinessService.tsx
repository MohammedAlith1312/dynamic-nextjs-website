import { getMessages } from "../lib/api";
import ServicesSection from "../components/serviceSection";
export default async function BusinessService({ locale }: { locale: "ar" | "en" }){
     const data = await getMessages(locale);
      const items = data?.result?.Data || [];
    
      const businessService = items.filter(
        (item: any) => item.WorkItemType === 'Service' && item.ParentId === 58
      );
    
      console.log(" businessService",  businessService);
    return(
          <div>
             <ServicesSection  serviceItems={businessService} locale={locale} />
             {/* <BaseFooter/> */}
           </div>
    )
}