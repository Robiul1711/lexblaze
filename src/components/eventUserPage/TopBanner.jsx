// import React from "react";
// import { MapPin } from "lucide-react";
// import Title24 from "../common/Title24";
// import { Link } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";
// import { use } from "react";

// const TopBanner = ({ data }) => {
//   const { user } = useAuth();

//   const getEventDateLabel = (eventDates) => {
//     if (!eventDates || eventDates.length === 0) return null;

//     // Convert to Date objects and sort
//     const dates = eventDates
//       .map((d) => new Date(d?.date))
//       .filter((d) => d instanceof Date && !isNaN(d))
//       .sort((a, b) => a - b);

//     if (dates.length === 0) return null;

//     // Month abbreviations in Spanish
//     const monthAbbreviations = [
//       "Ene",
//       "Feb",
//       "Mar",
//       "Abr",
//       "May",
//       "Jun",
//       "Jul",
//       "Ago",
//       "Set",
//       "Oct",
//       "Nov",
//       "Dic",
//     ];

//     // Format a single date as DD/MM/YYYY
//     const formatSingleDate = (date) => {
//       const day = date.getDate().toString().padStart(2, "0");
//       const month = (date.getMonth() + 1).toString().padStart(2, "0");
//       return `${day}/${month}/${date.getFullYear()}`;
//     };

//     // Format for non-consecutive dates
//     const formatNonConsecutiveDates = (dates) => {
//       // Group dates by month and year
//       const grouped = {};
//       dates.forEach((date) => {
//         const key = `${date.getFullYear()}-${date.getMonth()}`;
//         if (!grouped[key]) {
//           grouped[key] = [];
//         }
//         grouped[key].push(date.getDate());
//       });

//       const parts = [];
//       Object.entries(grouped).forEach(([key, days]) => {
//         const [year, month] = key.split("-");
//         const monthName = monthAbbreviations[parseInt(month)];
//         parts.push(`${days.join(", ")} ${monthName} ${year}`);
//       });

//       return parts.join(" y ");
//     };

//     // Check if dates form a continuous range
//     const isContinuousRange = () => {
//       for (let i = 1; i < dates.length; i++) {
//         const prev = dates[i - 1];
//         const curr = dates[i];
//         const diff = (curr - prev) / (1000 * 60 * 60 * 24);
//         if (diff !== 1) return false;
//       }
//       return true;
//     };

//     // Single date
//     if (dates.length === 1) {
//       return formatSingleDate(dates[0]);
//     }

//     // Continuous date range
//     if (isContinuousRange()) {
//       return `${formatSingleDate(dates[0])} a ${formatSingleDate(
//         dates[dates.length - 1]
//       )}`;
//     }

//     // Non-consecutive dates
//     return formatNonConsecutiveDates(dates);
//   };

//   return (
//     <div className="flex flex-col mx-auto w-full">
//       {/* {console.log(data?.user?.email)}
//       {console.log(user?.user?.email)} */}
//       <Link
//         to={
//           data?.user?.email === user?.user?.email
//             ? `/venue-profile-edit`
//             : `/venue-user-view/${data?.user_id}`
//         }
//         className="relative rounded overflow-hidden shadow-lg h-[200px] sm:h-[230px] xl:h-[250px]"
//       >
//         <img
//           src={data?.flyer ? data?.flyer : data?.event_thumb_image}
//           alt={data?.title}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute bg-black/70 top-0 left-0 w-full h-full p-3 flex flex-col">
//           {/* {data.event_dates && data.event_dates.length > 0 && (
//             <div className="absolute top-0 right-0">
//               <button className="bg-primary text-[#F12617] p-1 text-sm sm:text-base sm:p-2 font-bold">
//                 {getEventDateLabel(data.event_dates)}
//               </button>
//             </div>
//           )} */}

//           <div className="space-y-1 sm:space-y-3 flex flex-col items-start absolute top-1/2 transform -translate-y-1/2 w-full text-center sm:text-left px-4">
//             <p className="xlg:text-lg sm:text-xl md:text-lg text-white flex items-center font-semibold">
//               {data?.business_name}
//             </p>
//             <h2 className="text-[24px] md:text-[32px] lg:text-xl xl:text-2xl flex items-center text-white font-extrabold">
//               {data?.event_title}
//             </h2>
//             {user
//               ? data?.business_address && (
//                   <a
//                     href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//                       data.business_address
//                     )}`}
//                     target="_blank"
//                       onClick={(e) => e.stopPropagation()}
//                     rel="noopener noreferrer"
//                    className="inline-flex items-start  gap-1 hover:underline text-primary font-semibold"

//                   >
//                     <MapPin className="size-5 sm:size-6" />
//                     <span className="lg:text-lg">{data.business_address}</span>
//                   </a>
//                 )
//               : data?.business_address && (
//                   <a
//                     href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//                       data.business_address
//                     )}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                       onClick={(e) => e.stopPropagation()}
//                    className="inline-flex items-start  gap-1 hover:underline text-primary font-semibold"

//                   >
//                     <MapPin className="size-5 sm:size-6" />
//                     <span className="lg:text-lg">{data.business_address}</span>
//                   </a>
//                 )}

//             {/* {console.log(data)} */}
//             <div className="flex items-start gap-2 font-semibold text-white">
//               <p>{getEventDateLabel(data?.event_dates)}</p>
//             </div>

//             <div className="flex items-start gap-2 font-semibold text-white">
//               <p>
//                 {data?.event_start_time === "Invalid Date"
//                   ? ""
//                   : data?.event_start_time}
//               </p>
//               {data?.event_end_time === "Invalid Date" ||
//               data?.event_end_time === "null"
//                 ? ""
//                 : data?.event_end_time && <span>a</span>}

//               <p>
//                 {data?.event_end_time === "Invalid Date" ||
//                 data?.event_end_time === "null"
//                   ? ""
//                   : data?.event_end_time}
//               </p>
//             </div>
//           </div>
//         </div>
//       </Link>

//       {/* Rest of your component remains the same */}
//       <p className="bg-[#0E1060] py-2 px-4 w-full lg:text-xl font-semibold text-white">
//         Más Detalles del Evento
//       </p>
//       {data?.business_website_link && (
//         <Link
//           to={data?.business_website_link}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-[#000] hover:text-blue-500 duration-300 py-2 rounded-xl my-3 px-4 w-full text-xl font-semibold text-white"
//         >
//           ENTRADAS
//         </Link>
//       )}
//       <div className="flex justify-between items-center mt-3">
//         <Title24>{data?.price_limite}</Title24>
//         {data?.age_limite && (
//           <Title24>Límite de Edad: {data?.age_limite}</Title24>
//         )}
//       </div>
//       <div className="pt-10 pb-10 lg:pb-20 max-w-[620px] space-y-5 lg:space-y-10 lg:text-center mx-auto">
//         <Title24>{data?.event_details}</Title24>
//       </div>
//     </div>
//   );
// };

// export default TopBanner;
import React from "react";
import { MapPin } from "lucide-react";
import Title24 from "../common/Title24";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(localizedFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);
dayjs.extend(weekday);

const TopBanner = ({ data }) => {
  const { user } = useAuth();

  const getEventDateLabel = (eventDates) => {
    if (!eventDates || eventDates.length === 0) return null;

    const dates = eventDates
      .map((d) => dayjs(d?.date))
      .filter((d) => d.isValid())
      .sort((a, b) => a - b);

    if (dates.length === 0) return null;

    const monthAbbreviations = [
      "Ene", "Feb", "Mar", "Abr", "May", "Jun",
      "Jul", "Ago", "Set", "Oct", "Nov", "Dic",
    ];

    const formatDate = (date) => date.format("DD/MM/YYYY");

    const isContinuousRange = () => {
      for (let i = 1; i < dates.length; i++) {
        if (!dates[i].isSame(dates[i - 1].add(1, "day"), "day")) return false;
      }
      return true;
    };

    if (dates.length === 1) {
      return formatDate(dates[0]);
    }

    if (isContinuousRange()) {
      return `${formatDate(dates[0])} a ${formatDate(dates[dates.length - 1])}`;
    }

    const grouped = {};
    dates.forEach((d) => {
      const key = `${d.year()}-${d.month()}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(d.date());
    });

    const parts = Object.entries(grouped).map(([key, days]) => {
      const [year, month] = key.split("-");
      return `${days.join(", ")} ${monthAbbreviations[parseInt(month)]} ${year}`;
    });

    return parts.join(" y ");
  };

  const formatTime = (time) => {
    const parsed = dayjs(time, "HH:mm");
    return parsed.isValid() ? parsed.format("HH:mm") : "";
  };

  return (
    <div className="flex flex-col mx-auto w-full">
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
          <div className="space-y-1 sm:space-y-3 flex flex-col items-start absolute top-1/2 transform -translate-y-1/2 w-full text-center sm:text-left px-4">
            <p className="xlg:text-lg sm:text-xl md:text-lg text-white flex items-center font-semibold">
              {data?.business_name}
            </p>
            <h2 className="text-[24px] md:text-[32px] lg:text-xl xl:text-2xl flex items-center text-white font-extrabold">
              {data?.event_title}
            </h2>

            {data?.business_address && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.business_address)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-start gap-1 hover:underline text-primary font-semibold"
              >
                <MapPin className="size-5 sm:size-6" />
                <span className="lg:text-lg">{data.business_address}</span>
              </a>
            )}

            <div className="flex items-start gap-2 font-semibold text-white">
              <p>{getEventDateLabel(data?.event_dates)}</p>
            </div>

            <div className="flex items-start gap-2 font-semibold text-white">
              <p>{formatTime(data?.event_start_time)}</p>
              {formatTime(data?.event_start_time) &&
                formatTime(data?.event_end_time) && <span>a</span>}
              <p>{formatTime(data?.event_end_time)}</p>
            </div>
          </div>
        </div>
      </Link>

      <p className="bg-[#0E1060] py-2 px-4 w-full lg:text-xl font-semibold text-white">
        Más Detalles del Evento
      </p>

      {data?.business_website_link && (
        <Link
          to={data.business_website_link}
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
