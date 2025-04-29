import { useLocation } from "react-router-dom";
const EventCard = ({visibleCards}) => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col ">

        {visibleCards.map((item) => (
          <div key={item.id}>
            <h1 className="text-[#333] text-xl sm:text-2xl xlg:text-[40px] font-bold text-center mb-3 sm:mb-4 xlg:mb-5">
              {item.month}
            </h1>
            <div className="relative rounded overflow-hidden shadow-lg mb-5 sm:mb-7 xlg:mb-10 ">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />
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
                      {item.title}
                    </p>
                    <div className="flex items-center justify-between ">
                      <h2 className="text-[20px] md:text-[32px] lg:text-xl xlg:text-[32px]  text-white font-extrabold">
                        {item.subtitle}
                      </h2>
                      {pathname === "/venue-profile-edit" && (
                        <p>{item.editIcon}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between  text-primary font-semibold">
                      <div className="flex items-center gap-2 sm:gap-4 ">
                        <p>{item.locationIcon}</p>
                        <p className="xlg:text-lg">{item.location}</p>
                      </div>
                      {pathname === "/venue-profile-edit" && (
                        <p>{item.deleteIcon}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between gap-4 font-semibold text-white">
                      <p>{item.time}</p>
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
