import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import eventDetails from "@/assets/images/eventDetails.png";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SwiperImg = () => {
  return (
    <div  >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className='w-full max-w-[622px] max-h-h-[424px]'
      >
        <SwiperSlide >
          <img src={eventDetails} className='w-full' alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={eventDetails} className='w-full' alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={eventDetails} className='w-full' alt="Slide 3" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperImg;