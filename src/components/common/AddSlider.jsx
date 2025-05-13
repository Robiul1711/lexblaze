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

const AddSlider = () => {
    const axiosPublic=useAxiosPublic();
    const { data, isLoading, error } = useQuery({
        queryKey: ["adsData"],
        queryFn: async () => {
          const response = await axiosPublic.get("/adds/allApiDatas");
          return response.data;
        },
      });

      console.log(data);
  return (
    <div className="w-full lg:max-w-[522px] xl:max-w-[622px] h-[200px] sm:h-[250px]">
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
                className="w-full h-full object-cover"
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
