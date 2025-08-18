import React from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const LeftSide = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, error } = useQuery({
    queryKey: ["adsDataLeft"],
    queryFn: async () => {
      const response = await axiosPublic.get("/adds/allApiDatas");
      return response.data;
    },
  });

  // filter only left-side ads


  const leftAds = data?.filter((ad) => ad.type === "left" && ad.status === "active");


  return (
    <>
      {isLoading ? null : error ? null : (
        <div className="w-full max-w-[450px] mx-auto aspect-[4/5]">
          {/* Carousel for left-side ads */}
          {leftAds?.length > 0 ? (
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              spaceBetween={10}
              slidesPerView={1}
              className="w-full h-full rounded-md"
            >
              {leftAds.map((ad) => (
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
        </div>
      )}
    </>
  );
};

export default LeftSide;
