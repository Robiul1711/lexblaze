import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import bottomImg from "@/assets/images/img6.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useLocation } from "react-router-dom";

const AddSlider = () => {
    const axiosPublic=useAxiosPublic();
    const { data, isLoading, error } = useQuery({
        queryKey: ["adsData"],
        queryFn: async () => {
          const response = await axiosPublic.get("/adds/allApiDatas");
          return response.data;
        },
      });

const {pathname}=useLocation();
  return (
    <div className={`w-full lg:max-w-[500px] xl:max-w-[600px] ${pathname === "/" ? "h-[180px] xxs:h-[200px] sm:h-[300px] md:h-[350px] lg:h-[180px]" : "h-[100px] lg:h-[180px]"}  `} >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full h-full"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={item.id || index} className="w-full h-full">
            <div className="w-full h-full">
              <img
                src={item?.image}
                className="w-full h-full object-cover rounded-md"
                alt={`Slide ${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AddSlider;
