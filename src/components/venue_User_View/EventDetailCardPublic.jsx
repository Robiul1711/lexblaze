import React, { useState } from "react";
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
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import SwiperImg from "./SwiperImg";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Title48 from "../common/Title48";
const EventDetailCardPublic = () => {
  const [showNumber, setShowNumber] = useState(false);

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { pathname } = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user_id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        "/single/business_profile_data/" + user_id
      );
      return response.data;
    },
  });
  const LogOutInMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.post("/logout", data);
      localStorage.removeItem("user"); // or whatever key you used to store user data
      return response?.data;
    },
    onSuccess: (response) => {
      toast.success(response?.message || "Logout successful");

      navigate("/log-in");
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  // number popup
const phoneNumber = data?.user?.phone;

const handleCallButtonClick = () => {
  if (phoneNumber) {
    setShowNumber(true); // Show number after click
    window.location.href = `tel:${phoneNumber}`;
  }
};


  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="mb-10   w-full">
         <Title48 title2={data?.user?.business_name} />
      <SwiperImg data={data?.user?.user_images} />

      <div className="flex flex-col gap-4 xlg:gap-4  mt-4">
        <div className="flex justify-between items-center gap-4">
           {data?.user?.business_address ? (
  <div className="flex items-center gap-2 xlg:gap-3">
    <RedLocationIcon />
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        data.user.business_address
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline "
    >
      <Title24>{data.user.business_address}</Title24>
    </a>
  </div>
) : null}
        
          {pathname === "/venue-profile-edit" && (
            <Link to={"/update-profile"}>
              {" "}
              <EditIcon />
            </Link>
          )}
        </div>
{
  data?.user?.business_time ? (
  <div className="flex items-center gap-2">
    <WatchIcon />
    <Title24>{data?.user?.business_time} </Title24>
  </div>
) : null
}

        <div className="flex justify-between items-center flex-wrap gap-4">
          {data?.user?.isShowEmail==='false' ? null : (
            <div className="flex items-center gap-2 ">
              {
                data?.user?.email && (
                  
                  <MessageIcon />
                )
              }
              <Title24>{data?.user?.email}</Title24>
            </div>
          )}

    {data?.user?.isShowPhone === 'false' ? null : (
  <div className="flex items-center gap-2">
                {phoneNumber && (
                  <button
                    className="rounded-full xlg:text-[20px] font-semibold flex items-center justify-center gap-2"
                    onClick={handleCallButtonClick}
                  >
                    <PhoneIcon />
                    {phoneNumber
                      ? showNumber
                        ? phoneNumber
                        : phoneNumber
                      : "Teléfono"}
                  </button>
                )}
  </div>
)}
{
  data?.user?.business_food_menu && (

    <div className="flex items-center gap-2">
      <a
        href={data?.user?.business_food_menu}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-inherit no-underline"
      >
        <MenuIcon />
        <Title24>La Carta</Title24>
      </a>
    </div>
  )
}
   {/* <a
  href={data?.user?.business_food_menu}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-1 text-inherit no-underline"
>
  <MenuIcon />
  <Title24>La Carta</Title24>
</a> */}

        </div>
        
        <div className="flex justify-between items-center gap-2 ">
          {
            data?.user?.business_website_link ? (
              <a
                href={data?.user?.business_website_link}
                target="_blank"
                rel="noopener noreferrer"
                className="xlg:text-[20px] font-semibold hover:text-[#4888ff] hover:underline"
              >
                Website
              </a>
            ) : null
          }
         {
          data?.user?.age && (
            
            <Title24>Límite de Edad: {data?.user?.age}</Title24>
          )
         }
        </div>
        <div className="mx-auto w-full text-center">
          <Title24>{data?.user?.business_details}</Title24>
        </div>
        <div className="w-full text-center">
          <p className="bg-[#0E1060] py-1 sm:py-2 xlg:py-3 w-full mb-3 rounded-xl font-bold text-xl sm:text-xl text-white">
            Nuestros Eventos
          </p>
        </div>
        {pathname === "/venue-profile-edit" && (
          <div className=" flex justify-between">
            <button
              onClick={() => {
                setIsSubmitting(true);
                LogOutInMutation.mutate();
              }}
              disabled={isSubmitting}
              className={`bg-[#11D619] hover:bg-green-600 text-white font-semibold py-3 px-11 rounded-[20px] transition duration-300 flex items-center justify-center gap-2 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Cerrando...
                </>
              ) : (
                "Cerrar sesión"
              )}
            </button>

            <Link
              to="/create-event"
              className="bg-[#0E1060] py-1 sm:py-2 xlg:py-3 px-6 mb-3 rounded-xl font-bold text-xl flex items-center justify-center gap-2 xlg:gap-6 text-white"
            >
              <PlusIcon />
              Crear Evento
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailCardPublic;
