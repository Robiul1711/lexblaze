import Title48 from "@/components/common/Title48";
import LeftSide from "@/components/home/LeftSide";
import RightSide from "@/components/home/RightSide";
import bottomImg from "@/assets/images/img6.png";
import EventCard from "@/components/venue_User_View/EventCard";
import EventDetailsCard from "@/components/venue_User_View/EventDetailsCard";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AddSlider from "@/components/common/AddSlider";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import EventDetailCardPublic from "@/components/venue_User_View/EventDetailCardPublic";
import EventCardPublic from "@/components/venue_User_View/EventCardPublic";

const VanueUserViewPublic = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0);
  const { user_id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["profileEventsData", user_id],
    queryFn: async () => {
      const response = await axiosPublic.get("specificUser/event/show/" + user_id);
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

  return (
    <div className="section-padding-x">
      <div className="flex flex-col lg:flex-row  justify-center xl:justify-between w-full gap-5">
        
        {/* Left Side */}
        <div className="hidden w-[30%] xlg:block  ">
          <div className="mt-10  top-10">
            <LeftSide />
          </div>
        </div>

        {/* Middle Content */}
        <div className={` max-w-[550px] xl:max-w-[680px] w-full  mx-auto ${isLoading ? "" : "lg:bg-[#FFFBE0]"} sm:px-6`}>
          {isLoading ? (
            <div className="w-full min-h-[50vh] flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {/* Top debug/info section */}
              <div className="text-center mt-2">
                {/* {console.log(visibleCards[0])} */}
              </div>

              {/* Scroll content removed - now naturally scrolls */}
              <div className="mt-4 space-y-6">
                <EventDetailCardPublic />
                <EventCardPublic visibleCards={visibleCards} />
              </div>

              {/* Pagination */}
              {
                visibleCards && visibleCards.length >9 && (
                      <div className="flex justify-between items-center py-10">
                <div className="flex flex-col items-center gap-2">
                  <button
                    className={`p-1 rounded-full border-[2px] border-black ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                  >
                    <ChevronLeft />
                  </button>
                  <p className="font-bold text-lg">Atrás</p>
                </div>
                <div className="text-gray-600 font-semibold">
                  Página {currentPage + 1} de {totalPages}
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button
                    className={`p-1 rounded-full border-[2px] border-black ${currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
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
          

              {/* Advertisement */}
              <div className="flex justify-center flex-col gap-3 mb-12 sm:mb-28 lg:mb-[120px]">
                <div className="xlg:hidden">

                <RightSide />
                </div>
                <AddSlider />
              </div>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden w-[30%] xlg:block ">
          <div className="mt-10  top-10">
            <RightSide />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VanueUserViewPublic;
