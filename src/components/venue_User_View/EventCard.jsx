import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import img1 from "@/assets/images/img1.png";
import img2 from "@/assets/images/img2.png";
import img3 from "@/assets/images/img3.png";
import img4 from "@/assets/images/img4.png";
import img5 from "@/assets/images/img5.png";
import React from "react";
import { DeleteIcon, EditIcon2 } from "@/lib/Icons";
const card = [
  {
    id: 1,
    img: img1,
    month: "Jul 09",
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon: <MapPin className="size-7" />,
    location: "Whiskey Bones Apparel Presents",
    date: "Gratis",
    time: "11:11",
    deleteIcon: <DeleteIcon />,
    editIcon: <EditIcon2 />,
  },
  {
    id: 2,
    img: img2,
    month: "Jul 12",
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon: <MapPin className="size-7" />,
    location: "Whiskey Bones Apparel Presents",
    date: "Gratis",
    time: "11:11",
    deleteIcon: <DeleteIcon />,
    editIcon: <EditIcon2 />,
  },
  {
    id: 3,
    img: img3,
    month: "Jul 10",
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon: <MapPin className="size-7" />,
    location: "Whiskey Bones Apparel Presents",
    date: "Gratis",
    time: "11:11",
    deleteIcon: <DeleteIcon />,
    editIcon: <EditIcon2 />,
  },

  {
    id: 4,
    img: img5,
    month: "Jul 19",
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon: <MapPin className="size-7" />,
    location: "Whiskey Bones Apparel Presents",
    date: "Gratis",
    time: "11:11",
    deleteIcon: <DeleteIcon />,
    editIcon: <EditIcon2 />,
    // button: "Todos Los Domingos",
  },
];
const EventCard = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="">
        {card.map((item) => (
          <div key={item.id}>
            <h1 className="text-[#333] text-[40px] font-bold text-center mb-5 font-belanosima">
              {item.month}
            </h1>
            <div className="relative rounded overflow-hidden shadow-lg mb-10">
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

                <div className="space-y-4">
                  <p className="text-lg text-white font-semibold">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between ">
                    <h2 className="text-[24px] md:text-[32px] text-white font-extrabold">
                      {item.subtitle}
                    </h2>
                    <p>{item.editIcon}</p>
                  </div>
                  <div className="flex items-center justify-between  text-primary font-semibold">
                    <div className="flex items-center gap-4 ">
                      <p>{item.locationIcon}</p>
                      <p className="text-lg">{item.location}</p>
                    </div>
                    <p>{item.deleteIcon}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 font-semibold text-white">
                    <p>{item.date}</p>
                    <p>{item.time}</p>
                  </div>
                </div>
              </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
