import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SwiperImg = ({ data = [] }) => {
  if (!Array.isArray(data)) {
    console.error("SwiperImg expected 'data' to be an array but got:", data);
    return null;
  }

  return (
    <div className="w-full lg:max-w-[522px] xl:max-w-[622px] h-[424px]">
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
        {data.map((item, index) => (
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

export default SwiperImg;
