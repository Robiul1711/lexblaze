import LeftSide from "@/components/home/LeftSide";
import RightSide from "@/components/home/RightSide";
import bottomImg from "@/assets/images/img6.png";
import EventDetailsCard from "@/components/venue_User_View/EventDetailsCard";
import eventUserView from "@/assets/images/eventUserView.png";
import TopBanner from "@/components/eventUserPage/TopBanner";
const EventPageUserView = () => {

  return (
    <div className="section-padding-x ">
      {/* Title  */}
   
      <div className="flex justify-between gap-12  ">
        {/* Leftside  */}
        <div className="mt-40"> 
          <LeftSide />
        </div>
        {/* Middle  */}
        <div className=" bg-[#FFFBE0] px-10">

      <div className="mt-10 ">

        <TopBanner />
        <img src={eventUserView} alt="" />

    </div>

          <div className="flex justify-center mb-[220px] mt-20 ">
       <img src={bottomImg} alt="" />
      </div>
        </div>
        {/* Rightside  */}
        <div className="mt-40">
          <RightSide />
        </div>
      </div>
      {/* Footer  */}
    
    </div>
  );
};

export default EventPageUserView;