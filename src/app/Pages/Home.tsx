import Banner from "../components/Banner";
import ServiceBox from "../components/Services"
import ServicesSection from "../components/serviceSection"
import Achievements from "../components/Acievement/Achievements";
import { getMessages } from "../lib/api";
import Certificates from "../components/certificates";
import BaseFooter from "../components/BaseFooter";

export default async function Home({ locale }: { locale: 'ar' | 'en' }){
    const data =await getMessages(locale);
    
      const items = data?.result?.Data || [];
      const serviceSection = items.filter(
        (item: any) => item.WorkItemType === 'AboutMawarid' && item.ParentId === 69
      );
      const BannerItems = items.filter(
        (item: any) => item.WorkItemType === 'Banner' && item.ParentId === 38
      );

         const Services = items.filter(
        (item: any) => item.WorkItemType === 'Service' && item.ParentId === 44
      );

        const Achievement = items.filter(
        (item: any) => item.WorkItemType === 'Achievement' && item.ParentId === 43
      );
       const CertificateEn= items.filter(
        (item: any) => item.WorkItemType === 'certificate' && item.ParentId === 94
      );
      const CertificateAr = items.filter(
        (item: any) => item.WorkItemType === 'certificate' && item.ParentId === 92
      );

          const servicePage1 = items.filter(
        (item: any) => item.WorkItemType === 'Service' && item.ParentId === 54
      );

      // console.log('Home',serviceSection);
    //       console.log('Banner',Banner);
    //           console.log('Services',Services);
    //            console.log('Achieve',Achievement);
      // console.log('certificate', CertificateEn);
      //    console.log('certificatear', CertificateAr);
   
    return(

<>

<div className="relative pb-12 ">
  <Banner banners={BannerItems} locale={locale} />
  <div className="container mx-auto px-2">
    <ServiceBox servicesbox={Services} />
  </div>
</div>

<ServicesSection  aboutItems={serviceSection}  locale={locale}></ServicesSection>
<Achievements achieve={Achievement} locale={locale}/>
<Certificates  certificateEn={CertificateEn}
        certificateAr={CertificateAr}
        locale={locale}/>


</>


    )
}