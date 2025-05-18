import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

const MiddleContent = ({ data, isLoading, error }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 5;

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const events = data?.events || [];
  const totalPages = Math.ceil(events.length / cardsPerPage);

  const visibleCards =
    events.length <= 5
      ? events
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
    <div className="flex flex-col gap-6 sm:gap-10">
      <div className="h-screen overflow-y-auto scrollbar-hide">
        {visibleCards.length === 0 ? (
          <div className="flex items-center justify-center mt-40">
            <p className="text-xl font-semibold">No events found</p>
          </div>
        ) : (
          <>
            {visibleCards.map((item) => (
              <div
                key={item.id}
                className="relative z-30 rounded overflow-hidden shadow-lg mb-4 cursor-pointer"
              >
                {console.log(item)}
                <Link to={`/event-user-view/${item.id}`} key={item.id}>
                  <img
                    src={item.flyer ? item.flyer : item.event_thumb_image}
                    alt={item.event_title || "Event image"}
                    className="w-full h-[200px] md:h-[300px] lg:h-[200px] xl:h-[260px] object-fill"
                  />
                  <div className="absolute bg-black/60 top-0 left-0 w-full h-full p-5 sm:p-[60px]">
                    {item.event_dates && item.event_dates.length > 0 && (
                      <div className="absolute top-0 right-0">
                        <button className="bg-primary text-[#F12617] p-1 text-sm sm:text-base sm:p-2 font-bold">
                          {(() => {
                            if (
                              !item.event_dates ||
                              item.event_dates.length === 0
                            )
                              return null;

                            const dates = item.event_dates.map(
                              (d) => new Date(d.date)
                            );
                            const sorted = dates.sort((a, b) => a - b);
                            const last = sorted[sorted.length - 1];

                            const weekdaysES = [
                              "Domingos",
                              "Lunes",
                              "Martes",
                              "Miércoles",
                              "Jueves",
                              "Viernes",
                              "Sábados",
                            ];

                            const allSameDay = sorted.every(
                              (date) => date.getDay() === sorted[0].getDay()
                            );

                            const formatDate = (date) =>
                              new Date(date).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              });

                            return allSameDay
                              ? `Todos los ${weekdaysES[sorted[0].getDay()]}`
                              : `Hasta ${formatDate(last)}`;
                          })()}
                        </button>
                      </div>
                    )}

                    <div className="space-y-2  w-full max-w-[300px] xlg:max-w-[355px] absolute top-1/2  sm:left-10 transform  -translate-y-1/2 px-4 sm:px-0">
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
                        <p className="flex items-center gap-2  text-primary  font-semibold z-50 hover:underline">
                          <MapPin className="size-5 md:size-6 xlg:size-7" />
                          <p className="sm:text-lg">{item.business_address}</p>
                        </p>
                      )}
                      <div className="flex items-center max-w-[200px] justify-between text-sm sm:text-base font-semibold text-white">
                        {item.price_limite && <p> {item.price_limite}</p>}
                        {item.event_start_time && (
                          <p> {item.event_start_time}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </>
        )}
      </div>

      {events.length > 4 && (
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center gap-2">
            <button
              className="flex flex-col items-center"
              onClick={handlePrev}
              disabled={currentPage === 0}
            >
              <ChevronLeft className=" size-9 border rounded-full p-1" />
              <p className="font-bold text-lg">Atrás</p>
            </button>
          </div>
          <div className="text-gray-600">
            Página {currentPage + 1} de {totalPages}
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              className="flex flex-col items-center"
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className=" size-9 border rounded-full p-1" />
              <p className="font-bold text-lg">Siguiente</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiddleContent;
