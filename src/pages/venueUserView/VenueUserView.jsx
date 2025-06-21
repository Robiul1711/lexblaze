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
import useAxiosPublic from "@/hooks/useAxiosPublic";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingSpinner from "@/components/common/LoadingSpinner";


const VenueUserView = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0); // Moved before any conditional returns
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[currentPage])
  const { data, isLoading, error} = useQuery({
    queryKey: ["profileEventsData"],
    queryFn: async () => {
      const response = await axiosSecure.get("/user/event/show");
      return response.data;
    },
  });


  const cardsPerPage = 10;
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
    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error.message} />;
// console.log(visibleCards)
  return (
    <div className="section-padding-x  h-full min-h-screen ">
      <div className="flex flex-col lg:flex-row justify-center xl:justify-between w-full gap-6 ">
        {/* Leftside */}
        <div className="mt-10 hidden xlg:block">
          <LeftSide />
        </div>
        
        {/* Middle */}
       
          
          <div className={`${isLoading ? "" : "lg:bg-[#FFFBE0] "}  lg:px-6  `}>
     
          <div className=" overflow-y-auto scrollbar-hide">
            <EventDetailsCard />
            <EventCard visibleCards={visibleCards} />
          </div>
          {/* {console.log(visibleCards)} */}
          {
            visibleCards.length > 9  && (
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
            )
          }
       
             <div className="lg:mt-10 mb-5 max-w-[500px] mx-auto  xlg:hidden">
          <RightSide />
        </div>
          <div className="flex justify-center mb-10 sm:mb-[60px]  lg:mb-[160px]">
          <AddSlider />
          </div>
        </div>
        
    
        
        {/* Rightside */}
        <div className="lg:mt-10 mb-32 hidden xlg:block">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default VenueUserView;