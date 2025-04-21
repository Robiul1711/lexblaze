import Title48 from "@/components/common/Title48";
import LeftSide from "@/components/home/LeftSide";
import RightSide from "@/components/home/RightSide";
import bottomImg from "@/assets/images/img6.png";
import TutorialMiddle from "@/components/tutorials/TutorialMiddle";
import EventCard from "@/components/venue_User_View/EventCard";
import EventDetailsCard from "@/components/venue_User_View/EventDetailsCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
const VenueUserView = () => {

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
        <div className="text-center mt-14">
        <Title48 title2="Whiskey Bones Apparel Bar" />
      </div>
      <div className="mt-10 h-screen overflow-y-auto scrollbar-hide">

        <EventDetailsCard />
        <EventCard />
    </div>
        <div className="flex justify-between items-center py-10 ">
      <div className="flex flex-col items-center gap-2 ">
      <button className="p-1 rounded-full border-[2px] border-black "><ChevronLeft /></button>
      <p className="font-bold text-lg">Atrás</p>

      </div>
      <div className="flex flex-col items-center gap-2 ">
      <button className="p-1 rounded-full border-[2px] border-black "><ChevronRight /></button>
      <p className="font-bold text-lg">Siguiente</p>

      </div>
      </div>
          <div className="flex justify-center mb-[220px] ">
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

export default VenueUserView;