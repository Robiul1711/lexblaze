import React, { useState } from "react";
import img1 from "@/assets/images/img1.png";
import img2 from "@/assets/images/img2.png";
import img3 from "@/assets/images/img3.png";
import img4 from "@/assets/images/img4.png";
import img5 from "@/assets/images/img5.png";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const cards = [
  {
    id: 1,
    img: img1,
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon: <MapPin className="size-5 md:size-6 xlg:size-7" />,
    location: "Whiskey Bones Apparel Presents",
    date: "Gratis",
    time: "11:11",
  },
  {
    id: 2,
    img: img2,
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon: <MapPin className="size-5 md:size-6 xlg:size-7" />,
    location: "Whiskey Bones Apparel Presents",
    date: "Gratis",
    time: "11:11",
    button: "Todos Los Domingos",
  },
  {
    id: 3,
    img: img3,
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon: <MapPin className="size-5 md:size-6 xlg:size-7" />,
    location: "Whiskey Bones Apparel Presents",
    date: "Gratis",
    time: "11:11",
    button: "Todos Los Domingos",
  },
  {
    id: 4,
    img: img4,
    // title: "Whiskey Bones Apparel Presents",
    // subtitle: "Fuck Me Righteous Tour",
    // locationIcon: <MapPin className="size-5 md:size-6 xlg:size-7" />,
    // location: "Whiskey Bones Apparel Presents",
    // date: "Gratis",
    // time: "11:11",
  },
  {
    id: 5,
    img: img5,
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon: <MapPin className="size-5 md:size-6 xlg:size-7" />,
    location: "Whiskey Bones Apparel Presents",
    date: "Gratis",
    time: "11:11",
  },
  {
    id: 6,
    img: img5,
    title: "Additional Event 1",
    subtitle: "Extra Tour Date",
    locationIcon: <MapPin className="size-5 md:size-6 xlg:size-7" />,
    location: "Another Venue",
    date: "Gratis",
    time: "12:00",
  },
  {
    id: 7,
    img: img5,
    title: "Additional Event 2",
    subtitle: "Final Show",
    locationIcon: <MapPin className="size-5 md:size-6 xlg:size-7" />,
    location: "Main Arena",
    date: "Gratis",
    time: "20:00",
  },
];

const MiddleContent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 5;
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const visibleCards = cards.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const navigate =useNavigate()
  return (
    <div className="flex flex-col gap-6 sm:gap-12">
      <div className="h-screen overflow-y-auto scrollbar-hide">
        {visibleCards.map((item) => (
          <div onClick={() => navigate("/event-user-view")}
            key={item.id}
            className="relative z-30 rounded overflow-hidden shadow-lg mb-10 "
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bg-black/40 top-0 left-0 w-full h-full p-5 sm:p-[60px]">
              {item.button && (
                <div className="absolute top-0 right-0">
                  <button className="bg-primary text-[#F12617] p-1  text-sm sm:text-base sm:p-3 font-bold">
                    {item.button}
                  </button>
                </div>
              )}

              <div className="space-y-2 sm:space-y-4 max-w-[355px] absolute top-1/2 transform -translate-y-1/2">
                {item.title && (
                  <p className="sm:text-lg text-white font-semibold">{item.title}</p>
                )}
                {item.subtitle && (
                  <h2 className="text-[20px] sm:text-[24px] md:text-[32px] text-white font-extrabold">
                    {item.subtitle}
                  </h2>
                )}
                {item.location && (
                  <Link to={"/venue-user-view"} className="flex items-center gap-2 sm:gap-4 text-primary font-semibold z-50">
                    <p>{item.locationIcon}</p>
                    <p className="sm:text-lg">{item.location}</p>
                  </Link>
                )}
                <div className="flex items-center justify-between text-sm sm:text-base font-semibold text-white">
                  {item.date && <p>{item.date}</p>}
                  {item.time && <p>{item.time}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center gap-2">
          <button
            className={`p-1 rounded-full border-[2px] border-black ${
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            <ChevronLeft />
          </button>
          <p className="font-bold text-lg">Atrás</p>
        </div>
        <div className="text-gray-600">
          Página {currentPage + 1} de {totalPages}
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            className={`p-1 rounded-full border-[2px] border-black ${
              currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight />
          </button>
          <p className="font-bold text-lg">Siguiente</p>
        </div>
      </div>
    </div>
  );
};

export default MiddleContent;