import React from "react";
import { MapPin } from "lucide-react";
import Title24 from "../common/Title24";
import { Link } from "react-router-dom";

const TopBanner = ({ data }) => {
  console.log(data);
  return (
    <div className="flex flex-col max-w-[620px] mx-auto w-full">
      <div className="relative rounded overflow-hidden shadow-lg">
        <img
          src={data?.event_thumb_image}
          alt={data?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bg-black/40 top-0 left-0 w-full h-full p-6 flex flex-col justify-center items-center">
          {data?.event_end_date && (
            <div className="absolute top-0 right-0">
              <button className="bg-primary text-[#F12617] p-3 font-bold">
               Hasta : {data.event_end_date}
              </button>
            </div>
          )}

          <div className="space-y-1 sm:space-y-3 xlg:space-y-4">
            <p className="xlg:text-lg sm:text-xl md:text-lg text-white font-semibold flex items-start">
              {data?.business_name}
            </p>
            <h2 className="text-[24px] md:text-[32px] lg:text-xl xlg:text-[32px] text-white flex items-start font-extrabold">
              {data?.event_title}
            </h2>
            <Link
              to="/venue-user-view"
              className="flex items-center gap-2 lg:gap-4 text-primary font-semibold"
            >
              <MapPin className="size-5 sm:size-6 xlg:size-7" />
              <p className="lg:text-lg">{data?.business_address}</p>
            </Link>
            <div className="flex  items-start gap-2 font-semibold text-white">
              <p>{data?.event_start_date}</p>
              <span>to</span>
              <p>{data?.event_end_date}</p>
            </div>
            <div className="flex  items-start gap-2 font-semibold text-white">
              <p>{data?.event_start_time}</p>
              <span>to</span>
              <p>{data?.event_end_time}</p>
            </div>
          </div>
        </div>
      </div>

      <button className="bg-[#0E1060] py-2 px-4 w-full  lg:text-2xl font-semibold text-white">
        Más Detalles del Evento
      </button>
      <button className="bg-[#000] py-3 lg:py-5 rounded-xl my-5 lg:my-10 px-4 w-full text-2xl font-semibold text-white">
        ENTRADAS
      </button>
      <div className="flex justify-between items-center">
        <Title24>${data?.price_limite}</Title24>
        <Title24>Límite de Edad: {data?.age_limite}</Title24>
      </div>
      <div className="pt-10 pb-10 lg:pb-20 max-w-[620px] space-y-5 lg:space-y-10 lg:text-center mx-auto">
        <Title24>{data?.event_details}</Title24>
      </div>
    </div>
  );
};


export default TopBanner