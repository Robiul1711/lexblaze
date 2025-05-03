import Title48 from "@/components/common/Title48";
import LeftSide from "@/components/home/LeftSide";
import RightSide from "@/components/home/RightSide";
import bottomImg from "@/assets/images/img6.png";
import EventCard from "@/components/venue_User_View/EventCard";
import EventDetailsCard from "@/components/venue_User_View/EventDetailsCard";
import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import img1 from "@/assets/images/img1.png";
import img2 from "@/assets/images/img2.png";
import img3 from "@/assets/images/img3.png";
import img4 from "@/assets/images/img4.png";
import img5 from "@/assets/images/img5.png";

import { DeleteIcon, EditIcon2 } from "@/lib/Icons";
import { useAuth } from "@/hooks/useAuth";
const card = [
  {
    id: 1,
    img: img1,
    month: "Jul 09",
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon: <MapPin className="size-7" />,
    location: "Whiskey Bones Apparel Presents",
    date: "Gratis",
    time: "11:11",
    deleteIcon: <DeleteIcon />,
    editIcon: <EditIcon2 />,
  },
  {
    id: 2,
    img: img2,
    month: "Jul 12",
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon: <MapPin className="size-7" />,
    location: "Whiskey Bones Apparel Presents",
    date: "Gratis",
    time: "11:11",
    deleteIcon: <DeleteIcon />,
    editIcon: <EditIcon2 />,
  },
  {
    id: 3,
    img: img3,
    month: "Jul 10",
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon: <MapPin className="size-7" />,
    location: "Whiskey Bones Apparel Presents",
    date: "Gratis",
    time: "11:11",
    deleteIcon: <DeleteIcon />,
    editIcon: <EditIcon2 />,
  },

  {
    id: 4,
    img: img5,
    month: "Jul 19",
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon: <MapPin className="size-7" />,
    location: "Whiskey Bones Apparel Presents",
    date: "Gratis",
    time: "11:11",
    deleteIcon: <DeleteIcon />,
    editIcon: <EditIcon2 />,
    // button: "Todos Los Domingos",
  },
];

const VenueUserView = () => {

  const [currentPage, setCurrentPage] =useState(0);
  const cardsPerPage=3;
  const totalPages = Math.ceil(card.length / cardsPerPage);

  const visibleCards=card.slice(
    currentPage*cardsPerPage,
    (currentPage+1)*cardsPerPage
  );

  const handleNext=()=>{
    if(currentPage<totalPages-1){
      setCurrentPage(currentPage+1);
    }
  };

  const handlePrev=()=>{
    if(currentPage>0){
      setCurrentPage(currentPage-1);
    }
  };
  return (
    <div className="section-padding-x ">
      {/* Title  */}
   
      <div className="flex flex-col lg:flex-row justify-between w-full gap-6 xlg:gap-12  ">
        {/* Leftside  */}
        <div className="mt-40  hidden lg:block"> 
          <LeftSide />
        </div>
        {/* Middle  */}
        <div className=" lg:bg-[#FFFBE0] lg:px-6 xlg:px-10">
      
      <div className="mt-5 lg:mt-10 h-screen overflow-y-auto scrollbar-hide">

        <EventDetailsCard />
        <EventCard visibleCards={visibleCards}/>
    </div>
        <div className="flex justify-between items-center py-10">
           <div className="flex flex-col items-center gap-2">
             <button
               className={`p-1 rounded-full border-[2px] border-black ${
                 currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
               }`}
               onClick={handlePrev}
               disabled={currentPage === 0}
             >
               <ChevronLeft />
             </button>
             <p className="font-bold text-lg">Atrás</p>
           </div>
           <div className="text-gray-600">
             Página {currentPage + 1} de {totalPages}
           </div>
           <div className="flex flex-col items-center gap-2">
             <button
               className={`p-1 rounded-full border-[2px] border-black ${
                 currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
               }`}
               onClick={handleNext}
               disabled={currentPage === totalPages - 1}
             >
               <ChevronRight />
             </button>
             <p className="font-bold text-lg">Siguiente</p>
           </div>
         </div>
          <div className="flex justify-center mb-5 lg:mb-[220px] ">
       <img src={bottomImg} alt="" />
      </div>
        </div>
        {/* Rightside  */}
        <div className="lg:mt-40 mb-32">
          <RightSide />
        </div>
      </div>
      {/* Footer  */}
    
    </div>
  );
};

export default VenueUserView;