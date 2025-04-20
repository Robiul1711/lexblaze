import React from "react";
import img1 from "@/assets/images/img1.png";
import img2 from "@/assets/images/img2.png";
import img3 from "@/assets/images/img3.png";
import img4 from "@/assets/images/img4.png";
import img5 from "@/assets/images/img5.png";

import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const card = [
  {
    id: 1,
    img: img1,
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon:<MapPin className="size-7" />,
    location: "Whiskey Bones Apparel Presents",
    date: "Gratis",
    time: "11:11",
    // button: "Todos Los Domingos",
  },
  {
    id: 2,
    img: img2,
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon:<MapPin className="size-7" />,
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
    locationIcon:<MapPin className="size-7" />,
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
    // locationIcon:<MapPin className="size-7" />
    // location: "Whiskey Bones Apparel Presents",
    // date: "Gratis",
    // time: "11:11",
    // button: "Todos Los Domingos",
  },
  {
    id: 5,
    img: img5,
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon:<MapPin className="size-7" />,
    location: "Whiskey Bones Apparel Presents",
    date: "Gratis",
    time: "11:11",
    // button: "Todos Los Domingos",
  },


];

const MiddleContent = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="h-screen overflow-y-auto scrollbar-hide">
      {card.map((item) => (
        <div key={item.id} className="relative rounded overflow-hidden shadow-lg mb-10">
          <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute bg-black/40 top-0 left-0 w-full h-full p-6 flex flex-col justify-center items-center">
            {item.button && (
              <div className="absolute top-0 right-0">
                <button className="bg-primary text-[#F12617] p-3 font-bold">
                  {item.button}
                </button>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-lg text-white font-semibold">{item.title}</p>
              <h2 className="text-[24px] md:text-[32px] text-white font-extrabold">
                {item.subtitle}
              </h2>
              <div className="flex items-center gap-4 text-primary font-semibold">
                <p>{item.locationIcon}</p>
                <p className="text-lg">{item.location}</p>
              </div>
              <div className="flex items-center justify-between gap-4 font-semibold text-white">
                <p>{item.date}</p>
                <p>{item.time}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      </div>
      <div className="flex justify-between items-center ">
        <div className="flex flex-col items-center gap-2 ">
        <button className="p-1 rounded-full border-[2px] border-black "><ChevronLeft /></button>
        <p className="font-bold text-lg">Atrás</p>

        </div>
        <div className="flex flex-col items-center gap-2 ">
        <button className="p-1 rounded-full border-[2px] border-black "><ChevronRight /></button>
        <p className="font-bold text-lg">Siguiente</p>

        </div>
      </div>
    </div>
  );
};

export default MiddleContent;



