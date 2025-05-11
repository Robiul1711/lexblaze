import Title48 from "@/components/common/Title48";
import LeftSide from "@/components/home/LeftSide";
import RightSide from "@/components/home/RightSide";
import bottomImg from "@/assets/images/img6.png";
import EventCard from "@/components/venue_User_View/EventCard";
import EventDetailsCard from "@/components/venue_User_View/EventDetailsCard";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AddSlider from "@/components/common/AddSlider";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { use } from "react";


const VenueUserView = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0); // Moved before any conditional returns
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[currentPage])
  const { data, isLoading } = useQuery({
    queryKey: ["profileEventsData"],
    queryFn: async () => {
      const response = await axiosSecure.get("/user/event/show");
      return response.data;
    },
  });


  const cardsPerPage = 3;
  const totalPages = Math.ceil(data?.events?.length / cardsPerPage) || 1;
  const visibleCards = data?.events?.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  ) || [];

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
console.log(visibleCards)
  return (
    <div className="section-padding-x ">
      <div className="flex flex-col lg:flex-row  justify-center xl:justify-between w-full gap-6 xlg:gap-12">
        {/* Leftside */}
        <div className="mt-40 hidden xlg:block">
          <LeftSide />
        </div>
        
        {/* Middle */}
        {
          isLoading ? (
           <div className="w-full  flex justify-center items-center"><LoadingSpinner /></div>
          )
          :
          <div className={`lg:bg-[#FFFBE0] lg:px-6 xlg:px-10`}>
          <div className="text-center mt-5 lg:mt-14">
            <Title48 title2={visibleCards[0]?.business_name} />
          </div>
          <div className="mt-5 lg:mt-10 h-screen overflow-y-auto scrollbar-hide">
            <EventDetailsCard />
            <EventCard visibleCards={visibleCards} />
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
                  currentPage === totalPages - 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
              >
                <ChevronRight />
              </button>
              <p className="font-bold text-lg">Siguiente</p>
            </div>
          </div>
          <div className="flex justify-center mb-5 lg:mb-[160px]">
          <AddSlider />
          </div>
        </div>
        }
    
        
        {/* Rightside */}
        <div className="lg:mt-40 mb-32 hidden xlg:block">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default VenueUserView;