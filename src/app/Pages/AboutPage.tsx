import { getMessages } from "../lib/api";
import ServicesSection from "../components/serviceSection";
import { BoardMembers,BoardMemberItem } from "../components/boardMember";
import BaseFooter from "../components/BaseFooter";
export default async function AboutPage({ locale }: { locale: 'ar' | 'en' })
{
  const data = await getMessages(locale);
  const items = data?.result?.Data || [];
  const serviceSection = items.filter(
        (item: any) => item.WorkItemType === 'AboutMawarid' && item.ParentId === 59
      );
      
 const parentId = locale === 'en' ? 71 : 74;
 const recId=locale === 'en' ? 71 : 74;
 const position=locale === 'en'?"Chairman":"رئيس مجلس الإدارة";


const AllBoardofDirectors = items.filter(
  (item: any) => item.WorkItemType === 'BoardMember' && item.ParentId === parentId
);
// console.log("AllBoardofDirectors",AllBoardofDirectors);
const BoardofDirectorsTitle = items.filter(
  (item: any) => item.WorkItemType === 'Section' && item.RecId === recId
);
    // console.log("BoardofDirectorsTitle",BoardofDirectorsTitle);

    const BoardofDirectors=AllBoardofDirectors.filter(
  (item: any) => item.boardPosition!== position 
);

 const Chairman =AllBoardofDirectors.find(
  (item: any) => item.boardPosition === position
);
// console.log("Chairman", Chairman);

 const goDetails = (member: BoardMemberItem) => {
    // console.log("View details for:", member);
  };


return(
    <>
    <div className="about_mawarid">
    <ServicesSection  aboutItems={serviceSection} locale={locale} />
    <BoardMembers
        BoardofDirectorsTitle={BoardofDirectorsTitle}
        Chairman={Chairman}
        BoardofDirectors={BoardofDirectors}
     
      />
      </div>
      {/* <BaseFooter/> */}
    </>


)
}