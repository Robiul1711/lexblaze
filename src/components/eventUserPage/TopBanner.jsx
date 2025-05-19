import React from "react";
import { MapPin } from "lucide-react";
import Title24 from "../common/Title24";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const TopBanner = ({ data }) => {
  const { user } = useAuth();

  // const linkPath = user ? "/venue-profile-edit" : "/venue-user-view";
  // Hasta and Todo Los 
const getEventDateLabel = (eventDates) => {
  if (!eventDates || eventDates.length === 0) return null;

  const dates = eventDates
    .map((d) => new Date(d?.date)) // safe access
    .filter((d) => d instanceof Date && !isNaN(d)) // valid dates
    .sort((a, b) => a - b);

  if (dates.length === 0) return null; // ✅ Prevent .getDay on undefined

  const formatDate = (date) =>
    date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  if (dates.length === 1) {
    return `Hasta ${formatDate(dates[0])}`;
  }

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

  const last = dates[dates.length - 1];
  return `Hasta ${formatDate(last)}`;
};

  return (
    <div className="flex flex-col max-w-[620px] mx-auto w-full">
      <div className="relative rounded overflow-hidden shadow-lg">
        <img
          src={data?.flyer? data?.flyer : data?.event_thumb_image}
          alt={data?.title}
          className="w-full  max-h-[200px] sm:max-h-[300px] "
        />
        <div className="absolute bg-black/60 top-0 left-0 w-full h-full p-6 sm:p-12 flex  flex-col ">
    {data.event_dates && data.event_dates.length > 0 && (
  <div className="absolute top-0 right-0">
        <button className="bg-primary text-[#F12617] p-1 text-sm sm:text-base sm:p-2 font-bold">
                          {getEventDateLabel(data.event_dates)}
                        </button>
  </div>
)}


       <div className="space-y-1 sm:space-y-3 absolute top-1/2 transform -translate-y-1/2 w-full text-center sm:text-left px-4">
  <p className="xlg:text-lg sm:text-xl md:text-lg text-white flex items-center font-semibold">
    {data?.business_name}
  </p>
  <h2 className="text-[24px] md:text-[32px] lg:text-xl xl:text-2xl flex items-center text-white font-extrabold">
    {data?.event_title}
  </h2>
            {user ? (
              <Link
                to={`/venue-profile-edit`}
                className="flex items-center gap-2 hover:underline text-primary font-semibold"
              >
                <MapPin className="size-5 sm:size-6 xlg:size-7" />
                <p className="lg:text-lg">{data?.business_address}</p>
              </Link>
            ) : (
              <Link
                to={`/venue-user-view/${data?.user_id}`}
                className="flex items-center gap-2 hover:underline text-primary font-semibold"
              >
                <MapPin className="size-5 sm:size-6 xlg:size-7" />
                <p className="lg:text-lg">{data?.business_address}</p>
              </Link>
            )}
            <div className="flex  items-start gap-2 font-semibold text-white">
              <p>{data?.event_dates && data?.event_dates[0]?.date}</p>
              {data?.event_dates && data?.event_dates.length > 1 && <span>to</span>}

              <p>{data?.event_dates && data?.event_dates[data?.event_dates.length - 1]?.date}</p>
            </div>
            <div className="flex  items-start gap-2 font-semibold text-white">
              <p>{data?.event_start_time}</p>
              {data?.event_start_time && data?.event_end_time && <span>to</span>}
           
              <p>{data?.event_end_time}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="bg-[#0E1060] py-2 px-4 w-full  lg:text-2xl font-semibold text-white">
        Más Detalles del Evento 
      </p>
      {data?.business_website_link && (
        
      <Link
        to={data?.business_website_link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#000] py-3 xlg:py-3 rounded-xl my-4 xlg:my-6 px-4 w-full text-2xl font-semibold text-white"
      >
        ENTRADAS
      </Link>
      )}
      <div className="flex justify-between items-center mt-3">
        <Title24>${data?.price_limite}</Title24>
        <Title24>Límite de Edad: {data?.age_limite}</Title24>
      </div>
      <div className="pt-10 pb-10 lg:pb-20 max-w-[620px] space-y-5 lg:space-y-10 lg:text-center mx-auto">
        <Title24>{data?.event_details}</Title24>
      </div>
    </div>
  );
};

export default TopBanner;
