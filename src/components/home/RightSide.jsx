// import React from "react";
// import useAxiosPublic from "@/hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// import LoadingSpinner from "../common/LoadingSpinner";
// import { useLocation } from "react-router-dom";

// const RightSide = () => {
//   const axiosPublic = useAxiosPublic();
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["adsDataRight"],
//     queryFn: async () => {
//       const response = await axiosPublic.get("/adds/allApiDatas");
//       return response.data;
//     },
//   });
//   const { pathname } = useLocation();
//   // console.log(data)
//   return (
//     <div className="w-full  max-w-[450px] mx-auto aspect-[4/5] ">
//       {isLoading ? (
//         pathname === "/about-us" && <LoadingSpinner />
//       ) : error ? (
//         <p className="text-red-500 font-semibold text-center my-3">
//           {/* Failed to load ads. Please try again later. */}
//         </p>
//       ) : (
//         <>
//           <p className="bg-[#D40000] xlg:py-2 w-full py-2 mb-3 rounded-md lg:rounded-xl text-sm text-center font-semibold xl:text-lg text-white">
//             EVENTOS DESTACADOS
//           </p>

//           <img
//             src={data?.right_side_ads}
//             alt="Ad"
//             className=" w-full h-full object-cover rounded-md "
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default RightSide;

import React from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../common/LoadingSpinner";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const RightSide = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, error } = useQuery({
    queryKey: ["adsDataRight"],
    queryFn: async () => {
      const response = await axiosPublic.get("/adds/allApiDatas");
      return response.data;
    },
  });

  const { pathname } = useLocation();

  // filter only right-side ads
  const rightAds = data?.filter((ad) => ad.type === "right" && ad.status === "active");

  return (
    <div className="w-full max-w-[450px] mx-auto aspect-[4/5]">
      {isLoading ? (
        pathname === "/about-us" && <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500 font-semibold text-center my-3"></p>
      ) : (
        <>
          <p className="bg-[#D40000] xlg:py-2 w-full py-2 mb-3 rounded-md lg:rounded-xl text-sm text-center font-semibold xl:text-lg text-white">
            EVENTOS DESTACADOS
          </p>

          {/* Carousel for right-side ads */}
          {rightAds?.length > 0 ? (
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              spaceBetween={10}
              slidesPerView={1}
              className="w-full h-full rounded-md"
            >
              {rightAds.map((ad) => (
                <SwiperSlide key={ad.id}>
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-gray-500">No ads available</p>
          )}
        </>
      )}
    </div>
  );
};

export default RightSide;
