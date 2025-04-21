import React from "react";
import {
  EditIcon,
  MenuIcon,
  MessageIcon,
  PhoneIcon,
  PlusIcon,
  RedLocationIcon,
  WatchIcon,
} from "@/lib/Icons";
import Title24 from "../common/Title24";
import { useLocation } from "react-router-dom";
import SwiperImg from "./SwiperImg";
const EventDetailsCard = () => {
  const {pathname}=useLocation();
  return (
    <div className="mb-10">
      <SwiperImg />
     
      <div className="flex flex-col gap-9 mt-8">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
          <RedLocationIcon />
          <Title24>Avenida Cachonda 6969</Title24>
          </div>
          {pathname==="/venue-profile-edit" &&    <EditIcon />}
       
        </div>
        <div className="flex  items-center gap-4">
          <WatchIcon />
          <Title24>Lun-Jue 9a-9p, Vie 9a-2a, Sab 8p-3a, Dom 11a-6p </Title24>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <MessageIcon />
            <Title24>Correo Electrónico </Title24>
          </div>
          <div className="flex items-center gap-4">
            <PhoneIcon />
            <Title24>Teléfono</Title24>
          </div>
          <div className="flex items-center gap-4">
            <MenuIcon />
            <Title24>La Carta </Title24>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <Title24>Website</Title24>
          <Title24>Edad: 21+</Title24>
        </div>
        <div className="max-w-[620px] w-full text-center">
          <Title24>
            Whiskey Bones HeadQurters Bar has been around since God knows when.
            Home of rocking out with your cock out and raging to the tits. We
            specialize in live music and getting absolutley fucked! Two ful bars
            and an incredible dancefloor are tucked awy inside and outside we
            present our amazing outdoor stage
          </Title24>
        </div>
        <div className="w-full text-center">
          <button className="bg-[#0E1060] py-3 w-full mb-3 rounded-xl font-bold text-xl text-white">
            Nuestros Eventos
          </button>
        </div>
        {
          pathname==="/venue-profile-edit" &&   
          
        <div className=" flex justify-end">
          <button className="bg-[#0E1060] py-3 px-6 mb-3 rounded-xl font-bold text-xl flex items-center justify-center gap-6 text-white">
            <PlusIcon />
          Crear Evento
          </button>
        </div>

        }
      </div>
    </div>
  );
};

export default EventDetailsCard;
