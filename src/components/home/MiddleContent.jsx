import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import { useAuth } from "@/hooks/useAuth";

const MiddleContent = () => {
  const {search, date, category}=useAuth();
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;

  const { data, isLoading, error } = useQuery({
    queryKey: ["events", search, date, category], // <- include reactive keys
    queryFn: async () => {
      const response = await axiosPublic.post(`/event/show`, {
        search,
        date,
        category_id: category,
      });
      return response.data;
    },
  });
  console.log(typeof(category));
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const events = data?.events || [];
  const totalPages = Math.ceil(events.length / cardsPerPage);

  // Determine which events to show based on count
  const visibleCards =
    events.length <= 5
      ? events // Show all if 5 or fewer
      : events.slice(
          currentPage * cardsPerPage,
          (currentPage + 1) * cardsPerPage
        );

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
    <div className="flex flex-col gap-6 sm:gap-12">
      <div className="h-screen overflow-y-auto  scrollbar-hide">
        {visibleCards.length > 0 ? (
          visibleCards.map((item) => (
            <div key={item.id} className="relative z-30 rounded overflow-hidden shadow-lg mb-10 cursor-pointer">

            <Link to={`/event-user-view/${item.id}`}
              key={item.id} 
              
            >
              <img
                src={item.event_thumb_image || "/default-event-image.jpg"}
                alt={item.event_title || "Event image"}
                className="w-full h-[300px] md:h-[350px] lg:h-[300px] xl:h-[350px] object-fill"
              />
              <div className="absolute bg-black/40 top-0 left-0 w-full h-full p-5 sm:p-[60px]">
                {item.event_end_date && (
                  <div className="absolute top-0 right-0">
                    <button className="bg-primary text-[#F12617] p-1 text-sm sm:text-base sm:p-3 font-bold">
                Hasta  {item.event_end_date}
                    </button>
                  </div>
                )}

               <div className="space-y-2 sm:space-y-4 w-full sm:max-w-[355px] absolute top-1/2 left-1/2 sm:left-[30%] lg:left-1/2 xl:left-[40%] transform -translate-x-1/2 -translate-y-1/2 px-4 sm:px-0">

                  {item.event_title && (
                    <p className="sm:text-lg text-white font-semibold">
                      {item.event_title}
                    </p>
                  )}
                  {item.business_address && (
                    <h2 className="text-[20px] sm:text-[24px] md:text-[32px] text-white font-extrabold">
                      {item.business_address}
                    </h2>
                  )}
                  {item.business_address && (
                    <Link
                    
                      className="flex items-center gap-2 sm:gap-4 text-primary font-semibold z-50 hover:underline"
                    >
                      <MapPin className="size-5 md:size-6 xlg:size-7" />
                      <p className="sm:text-lg">{item.business_address}</p>
                    </Link>
                  )}
                  <div className="flex items-center justify-between text-sm sm:text-base font-semibold text-white">
                    {item.price_limite && <p> {item.price_limite}</p>}
                    {item.event_start_time && <p> {item.event_start_time}</p>}
                  </div>
                </div>
              </div>
            </Link>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-xl">No events found</p>
          </div>
        )}
      </div>

      {/* Only show pagination if there are more than 5 events */}
      {events.length > 4 && (
        <div className="flex justify-between items-center">
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
      )}
    </div>
  );
};

export default MiddleContent;
