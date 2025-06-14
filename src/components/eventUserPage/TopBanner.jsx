import React from "react";
import { MapPin } from "lucide-react";
import Title24 from "../common/Title24";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { use } from "react";

const TopBanner = ({ data }) => {
  const { user } = useAuth();

  const getEventDateLabel = (eventDates) => {
    if (!eventDates || eventDates.length === 0) return null;

    // Convert to Date objects and sort
    const dates = eventDates
      .map((d) => new Date(d?.date))
      .filter((d) => d instanceof Date && !isNaN(d))
      .sort((a, b) => a - b);

    if (dates.length === 0) return null;

    // Month abbreviations in Spanish
    const monthAbbreviations = [
      "Ene", "Feb", "Mar", "Abr", "May", "Jun", 
      "Jul", "Ago", "Set", "Oct", "Nov", "Dic"
    ];

    // Format a single date as DD/MM/YYYY
    const formatSingleDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${day}/${month}/${date.getFullYear()}`;
    };

    // Format for non-consecutive dates
    const formatNonConsecutiveDates = (dates) => {
      // Group dates by month and year
      const grouped = {};
      dates.forEach(date => {
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(date.getDate());
      });

      const parts = [];
      Object.entries(grouped).forEach(([key, days]) => {
        const [year, month] = key.split('-');
        const monthName = monthAbbreviations[parseInt(month)];
        parts.push(`${days.join(', ')} ${monthName} ${year}`);
      });

      return parts.join(' y ');
    };

    // Check if dates form a continuous range
    const isContinuousRange = () => {
      for (let i = 1; i < dates.length; i++) {
        const prev = dates[i - 1];
        const curr = dates[i];
        const diff = (curr - prev) / (1000 * 60 * 60 * 24);
        if (diff !== 1) return false;
      }
      return true;
    };

    // Single date
    if (dates.length === 1) {
      return formatSingleDate(dates[0]);
    }

    // Continuous date range
    if (isContinuousRange()) {
      return `${formatSingleDate(dates[0])} a ${formatSingleDate(dates[dates.length - 1])}`;
    }

    // Non-consecutive dates
    return formatNonConsecutiveDates(dates);
  };

  return (
    <div className="flex flex-col mx-auto w-full">
      {/* {console.log(data?.user?.email)}
      {console.log(user?.user?.email)} */}
     <Link
  to={
    data?.user?.email === user?.user?.email
      ? `/venue-profile-edit`
      : `/venue-user-view/${data?.user_id}`
  }
  className="relative rounded overflow-hidden shadow-lg h-[200px] sm:h-[230px] xl:h-[250px]"
>
        <img
          src={data?.flyer ? data?.flyer : data?.event_thumb_image}
          alt={data?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bg-black/70 top-0 left-0 w-full h-full p-3 flex flex-col">
          {/* {data.event_dates && data.event_dates.length > 0 && (
            <div className="absolute top-0 right-0">
              <button className="bg-primary text-[#F12617] p-1 text-sm sm:text-base sm:p-2 font-bold">
                {getEventDateLabel(data.event_dates)}
              </button>
            </div>
          )} */}

          <div className="space-y-1 sm:space-y-3 absolute top-1/2 transform -translate-y-1/2 w-full text-center sm:text-left px-4">
            <p className="xlg:text-lg sm:text-xl md:text-lg text-white flex items-center font-semibold">
              {data?.business_name}
            </p>
            <h2 className="text-[24px] md:text-[32px] lg:text-xl xl:text-2xl flex items-center text-white font-extrabold">
              {data?.event_title}
            </h2>
            {user ? (
              <p className="flex items-center gap-1 hover:underline text-primary font-semibold">
                {data?.user?.business_name  && <MapPin className="size-5 sm:size-6" />}
 
                <p className="lg:text-lg">{data?.user?.business_name}</p>
              </p>
            ) : (
              <p className="flex items-center gap-1 text-primary font-semibold">
            {data?.user?.business_name && <MapPin className="size-5 sm:size-6" />}
                <p className="lg:text-lg">{data?.user?.business_name}</p>
              </p>
            )}
            {console.log(data)}
            <div className="flex items-start gap-2 font-semibold text-white">
              <p>{getEventDateLabel(data?.event_dates)}</p>
            </div>

            <div className="flex items-start gap-2 font-semibold text-white">
              <p>
                {data?.event_start_time === "Invalid Date" 
                  ? ""
                  : data?.event_start_time}
              </p>
              {data?.event_end_time === "Invalid Date" || data?.event_end_time === "null"
                ? ""
                : data?.event_end_time && <span>a</span>}

              <p>
                {data?.event_end_time === "Invalid Date" || data?.event_end_time === "null"
                  ? ""
                  : data?.event_end_time}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Rest of your component remains the same */}
      <p className="bg-[#0E1060] py-2 px-4 w-full lg:text-xl font-semibold text-white">
        Más Detalles del Evento
      </p>
      {data?.business_website_link && (
        <Link
          to={data?.business_website_link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#000] hover:text-blue-500 duration-300 py-2 rounded-xl my-3 px-4 w-full text-xl font-semibold text-white"
        >
          ENTRADAS
        </Link>
      )}
      <div className="flex justify-between items-center mt-3">
        <Title24>{data?.price_limite}</Title24>
        {data?.age_limite && (
          <Title24>Límite de Edad: {data?.age_limite}</Title24>
        )}
      </div>
      <div className="pt-10 pb-10 lg:pb-20 max-w-[620px] space-y-5 lg:space-y-10 lg:text-center mx-auto">
        <Title24>{data?.event_details}</Title24>
      </div>
    </div>
  );
};

export default TopBanner;