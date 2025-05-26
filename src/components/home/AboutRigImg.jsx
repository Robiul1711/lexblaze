import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import eventDetails from "@/assets/images/rightSideImg.png";
import eventDetails3 from "@/assets/images/leftSideImg.png";
import eventDetails2 from "@/assets/images/eventUserView.png";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AboutRigImg = () => {
    const data = {
        events: [
            {
                id: 1,
                event_thumb_image: eventDetails,
            },
            {
                id: 2,
                event_thumb_image: eventDetails2,
            },
            {
                id: 3,
                event_thumb_image: eventDetails3,
            },
        ],
    };


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
        className='w-full max-w-[320px] xs:max-w-[480px] xxs:max-w-[480px]  lg:max-w-[322px] xl:max-w-[480px] max-h-[480px]'
      >
        {
          data?.events?.slice(0, 4)?.map((event, index) => (
            <SwiperSlide key={event.id || index} className='w-full h-full'>
              <div className='w-full h-full'>
                <img
                  src={event?.event_thumb_image}
                  className='w-full h-full object-cover rounded-md'
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

export default AboutRigImg;