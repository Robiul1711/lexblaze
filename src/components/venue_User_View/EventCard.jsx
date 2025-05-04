
import { useLocation } from "react-router-dom";
import { MapPin } from "lucide-react";
import { DeleteIcon, EditIcon2 } from "@/lib/Icons";
const EventCard = ({ visibleCards }) => {
  const {pathname}=useLocation();
console.log(visibleCards);

  return (
    <div className="flex flex-col mt-10">

        {visibleCards?.map((item) => (
          <div key={item.id}>
            <h1 className="text-[#333] text-xl sm:text-2xl xlg:text-[40px] font-bold text-center mb-3 sm:mb-4 xlg:mb-5">
              {item.month}
            </h1>
            <div className="relative rounded overflow-hidden shadow-lg mb-5 sm:mb-7 xlg:mb-10 ">
            <div className="h-[300px] sm:h-[350px] md:h-[420px] w-full">
  <img
    src={item.event_thumb_image}
    alt={item.title}
    className="w-full h-full object-fill"
  />
</div>

              <div className="absolute bg-black/40 top-0 left-0 w-full h-full">
                <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-5 ">
                  {item.button && (
                    <div className="absolute top-0  right-0">
                      <button className="bg-primary text-[#F12617] p-3 font-bold">
                        {item.button}
                      </button>
                    </div>
                  )}

                  <div className="space-y-1  sm:space-y-4">
                    <p className="sm:text-lg text-white font-semibold">
                      {item.business_name}
                    </p>
                    <div className="flex items-center justify-between ">
                      <h2 className="text-[20px] md:text-[32px] lg:text-xl xlg:text-[32px]  text-white font-extrabold">
                        {item.event_title}
                      </h2>
                      {pathname === "/venue-profile-edit" && (
                        <p> <EditIcon2/></p>
                      )}
                    </div>
                    <div className="flex items-center justify-between  text-primary font-semibold">
                      <div className="flex items-center gap-2 sm:gap-4 ">
                        <p><MapPin className="size-7" /></p>
                        <p className="xlg:text-lg">{item.business_address}</p>
                      </div>
                      {pathname === "/venue-profile-edit" && (
                        <p><DeleteIcon /></p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between gap-4 font-semibold text-white">
                      <p>{item.price_limite}</p>
                      <p>{item.event_start_time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    
    </div>
  );
};

export default EventCard;
