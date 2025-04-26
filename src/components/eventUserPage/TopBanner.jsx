import React from "react";
import img3 from "@/assets/images/img3.png";
import { MapPin } from "lucide-react";
import Title24 from "../common/Title24";
import { Link } from "react-router-dom";
const card = [

  {
    id: 1,
    img: img3,
    title: "Whiskey Bones Apparel Presents",
    subtitle: "Fuck Me Righteous Tour",
    locationIcon:<MapPin className="size-7" />,
    location: "Whiskey Bones Apparel Presents",
    date: "Jue Jul 09 - Dom Jul 12",
    time: "De 20:00 a 05:00 ",
    // button: "Todos Los Domingos",
  },


];
const TopBanner = () => {
  return (
    <div className="flex flex-col ">
    <div className="">
    {card.map((item) => (
      <div key={item.id} className="relative rounded overflow-hidden shadow-lg">
        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute bg-black/40 top-0 left-0 w-full h-full p-6 flex flex-col justify-center items-center">
          {item.button && (
            <div className="absolute top-0 right-0">
              <button className="bg-primary text-[#F12617] p-3 font-bold">
                {item.button}
              </button>
            </div>
          )}

          <div className="space-y-2 lg:space-y-4">
            <p className="lg:text-lg text-white font-semibold flex items-start">{item.title}</p>
            <h2 className="text-[24px] md:text-[32px] text-white font-extrabold">
              {item.subtitle}
            </h2>
            <Link to={"/venue-user-view"} className="flex items-center gap-4 text-primary font-semibold">
              <p>{item.locationIcon}</p>
              <p className="text-lg">{item.location}</p>
            </Link>
            <div className="flex flex-col items-start  gap-4 font-semibold text-white">
              <p>{item.date}</p>
              <p>{item.time}</p>
            </div>
          </div>
        </div>
      </div>
    ))}

    <button className="bg-[#0E1060] py-2 px-4 w-full  lg:text-2xl font-semibold text-white">Más Detalles del Evento</button>
    <button className="bg-[#000] py-3 lg:py-5 rounded-xl my-5 lg:my-10 px-4 w-full text-2xl font-semibold text-white">ENTRADAS</button>
    <div className="flex justify-between items-center">
      <Title24>$10.000 - 50.000</Title24>
      <Title24>Límite de Edad: 21+</Title24>
    </div>
    <div className="pt-10 pb-10 lg:pb-20 max-w-[620px] space-y-5 lg:space-y-10 lg:text-center lg:mx-auto">
      <Title24>Join us for a spicy, dulce de leche, tetas grandisimas, wet-wet party to have your panties stained for months to cum. We the big liveola told ya momma to come ova soldiers. Honey dips that strip, big booties and botox lips! </Title24>
      <Title24>Don&apos;t fomo on this dreamworld manifest into real world snow powdered mania adrenaline. JesuCristo fuck me running and call it a menagie trois</Title24>
    </div>
    </div>

  </div>
  )
}

export default TopBanner