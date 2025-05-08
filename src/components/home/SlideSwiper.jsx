import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import eventDetails from "@/assets/images/eventDetails.png";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SlideSwiper = ({data}) => {
  const firstFourImages = data?.events?.slice(0, 4)?.map(event => event.event_thumb_image);
  console.log(firstFourImages);


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
        className='w-full lg:max-w-[522px] xl:max-w-[622px] max-h-[424px]'
      >
        {
          data?.events?.slice(0, 4)?.map((event, index) => (
            <SwiperSlide key={event.id || index} className='w-full h-full'>
              <div className='w-full h-full'>
                <img
                  src={event?.event_thumb_image}
                  className='w-full h-full object-cover'
                  alt={`Slide ${index + 1}`}
                />
              </div>
            </SwiperSlide>
          ))
        }
 

   

      </Swiper>
    </div>
  );
};

export default SlideSwiper;