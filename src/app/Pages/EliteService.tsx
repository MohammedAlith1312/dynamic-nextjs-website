import { getMessages } from "../lib/api";
import Banner from "../components/Banner";
import ServicesSection from "../components/serviceSection";
export default async function EliteService({ locale }: { locale: "ar" | "en" }){
    const data =await getMessages(locale);
        
          const items = data?.result?.Data || [];
          const EliteBanner = items.filter(
            (item: any) => item.WorkItemType === 'Banner' && item.ParentId === 50
          );

          // console.log('EliteBanner',EliteBanner);

          const EliteService=items.filter(
            (item: any) => item.WorkItemType === 'Service' && item.ParentId === 55
          );
          // console.log('EliteService',EliteService);
    return(
         <div>
             <Banner banners={EliteBanner} locale={locale} />
                    <ServicesSection  serviceItems={EliteService} locale={locale} />
                   
                  </div>
    )
}