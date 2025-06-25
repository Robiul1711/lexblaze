import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import { useAuth } from "@/hooks/useAuth";

const MiddleContent = ({ data, isLoading, error }) => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 20;

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
      // splice 
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

  // Hasta and Todo Los const
  const getEventDateLabel = (eventDates) => {
    if (!eventDates || eventDates.length === 0) return null;

    const dates = eventDates
      .map((d) => new Date(d?.date))
      .filter((d) => d instanceof Date && !isNaN(d))
      .sort((a, b) => a - b);

    if (dates.length === 0) return null;

    // Format date helper - modified to capitalize month
    const formatDate = (date) => {
      const formatted = date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      // Capitalize the first letter of the month
      return formatted.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // Check if all dates are today
    const today = new Date();
    const isSameDay = (a, b) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    const allToday = dates.every((date) => isSameDay(date, today));
    if (allToday) return null;

    // One date only
    if (dates.length === 1) {
      return formatDate(dates[0]);
    }

    // All same weekday
    const allSameDay = dates.every(
      (date) => date.getDay() === dates[0].getDay()
    );

    if (allSameDay) {
      const weekdaysES = [
        "Domingos",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábados",
      ];
      return `Todos los ${weekdaysES[dates[0].getDay()]}`;
    }

    // Continuous range
    let isContinuous = true;
    for (let i = 1; i < dates.length; i++) {
      const diffInDays = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
      if (diffInDays !== 1) {
        isContinuous = false;
        break;
      }
    }

    if (isContinuous) {
      const last = dates[dates.length - 1];
      return `Hasta ${formatDate(last)}`;
    }

    // Otherwise, show last date
    return formatDate(dates[dates.length - 1]);
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
                {/* {console.log(item)} */}
                <Link to={`/event-user-view/${item.id}`} key={item.id}>
                  <img
                    src={item.flyer ? item.flyer : item.event_thumb_image}
                    alt={item.event_title || "Event image"}
                    className="w-full h-[200px] md:h-[300px] lg:h-[200px] xl:h-[260px] object-cover"
                  />
                  <div className="absolute bg-black/70 top-0 left-0 w-full h-full p-5 sm:p-[60px]">
                    {item.event_dates &&
                      item.event_dates.length > 0 &&
                      (() => {
                        const dateLabel = getEventDateLabel(item.event_dates);
                        return dateLabel ? (
                          <div className="absolute top-0 right-0">
                            <button className="bg-primary text-[#F12617] p-1 text-sm sm:text-base sm:p-2 font-bold">
                              {dateLabel}
                            </button>
                          </div>
                        ) : null;
                      })()}

                    <div className="space-y-2  w-full max-w-[300px] xlg:max-w-[355px] absolute top-1/2  sm:left-10 transform  -translate-y-1/2 px-4 sm:px-0">
                      {item.business_name && (
                        <p className="sm:text-lg text-white font-semibold">
                          {item.business_name}
                        </p>
                      )}
                      {item.event_title && (
                        <h2 className="text-[20px] sm:text-[24px] md:text-[28px] text-white font-extrabold">
                          {item.event_title}
                        </h2>
                      )}

                      <Link
                        to={
                          item?.user?.email === user?.user?.email
                            ? `/venue-profile-edit`
                            : `/venue-user-view/${item?.user_id}`
                        }
                        className="inline-block"
                      >
                        {console.log(item?.user?.email)}
                        {item?.business_address && (
                          <p className="flex items-center gap-1  text-primary  font-semibold z-50 hover:underline">
                            <MapPin className="size-5 md:size-6 " />
                            <p className="sm:text-lg">
                              {item?.business_address}
                            </p>
                          </p>
                        )}
                      </Link>
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

      {events.length > 20 && (
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
