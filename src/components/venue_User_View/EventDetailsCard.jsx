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
import { Link, useLocation } from "react-router-dom";
import SwiperImg from "./SwiperImg";
import { useAuth } from "@/hooks/useAuth";
import Title48 from "../common/Title48";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import useAxiosSecure from "@/hooks/useAxiosSecure";
const EventDetailsCard = () => {

  const axiosSecure = useAxiosSecure();
  const {pathname}=useLocation();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const response = await axiosSecure.get("/business_profile_data");
      return response.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="mb-10 lg:max-w-[620px] w-full">
   
      <SwiperImg data={data?.user?.user_images} />
     
      <div className="flex flex-col gap-4 xlg:gap-6 xl:gap-9 mt-8">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 xlg:gap-4">
          <RedLocationIcon />
          <Title24>{data?.user?.business_address}</Title24>
          </div>
          {pathname==="/venue-profile-edit" && <Link to={'/profile'}> <EditIcon /></Link>  }
       
        </div>
        <div className="flex  items-center gap-2 xlg:gap-4">
          <WatchIcon />
          <Title24>{data?.user?.business_time} </Title24>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-2 xlg:gap-4">
            <MessageIcon />
            <Title24>{data?.user?.email}</Title24>
          </div>
          <div className="flex items-center gap-2 xlg:gap-4">
            <PhoneIcon />
            <Title24>{data?.user?.phone}</Title24>
          </div>
          <div className="flex items-center gap-2 xlg:gap-4">
            <MenuIcon />
            <Title24>{data?.user?.business_food_menu}</Title24>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2 xlg:gap-4">
          <Title24>Website : {data?.user?.business_website_link}</Title24>
          <Title24>Edad: 21+</Title24>
        </div>
        <div className="mx-auto w-full text-center">
          <Title24>
            {data?.user?.business_details}
          </Title24>
        </div>
        <div className="w-full text-center">
          <button className="bg-[#0E1060] py-1 sm:py-2 xlg:py-3 w-full mb-3 rounded-xl font-bold text-xl sm:text-xl text-white">
            Nuestros Eventos
          </button>
        </div>
        {
          pathname==="/venue-profile-edit" &&   
          
        <div className=" flex justify-end">
          <Link to="/create-event" className="bg-[#0E1060] py-1 sm:py-2 xlg:py-3 px-6 mb-3 rounded-xl font-bold text-xl flex items-center justify-center gap-2 xlg:gap-6 text-white">
            <PlusIcon />
          Crear Evento
          </Link>
        </div>

        }
      </div>
    </div>
  );
};

export default EventDetailsCard;
