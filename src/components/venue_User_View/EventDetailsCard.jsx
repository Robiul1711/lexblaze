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
import { Link, useLocation, useNavigate } from "react-router-dom";
import SwiperImg from "./SwiperImg";
import { useAuth } from "@/hooks/useAuth";
import Title48 from "../common/Title48";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
const EventDetailsCard = () => {
  const [showNumber, setShowNumber] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { pathname } = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const response = await axiosSecure.get("/business_profile_data");
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
      window.location.reload();
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
      window.location.href = `tel:${phoneNumber}`;
    } else {
      setShowNumber(true);
    }
  };
console.log(data)
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="mb-10   w-full">
      <div className="text-center mt-3  pb-1">
        <Title48 title2={data?.user.business_name} />
      </div>
      <SwiperImg data={data?.user?.user_images} />

      <div className="flex flex-col gap-4 xlg:gap-4  mt-5">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center  gap-2 xlg:gap-3">
            <RedLocationIcon />
            <Title24>{data?.user?.business_address}</Title24>
          </div>
          {pathname === "/venue-profile-edit" && (
            <Link to={"/update-profile"}>
              {" "}
              <EditIcon />
            </Link>
          )}
        </div>
        <div className="flex  items-center gap-2 xlg:gap-3">
          <WatchIcon />
          <Title24>{data?.user?.business_time} </Title24>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-4">
          {data?.user?.isShowEmail==='true' ? null : (
            <div className="flex items-center gap-2 xlg:gap-3">
              <MessageIcon />
              <Title24>{data?.user?.email}</Title24>
            </div>
          )}

          {data?.user?.isShowPhone==='true' ? (
            null
          ) : <div className="flex items-center gap-2 xlg:gap-3">
              <button
                className="rounded-full xlg:text-[20px] font-semibold flex items-center justify-center gap-1"
                onClick={handleCallButtonClick}
              >
                <PhoneIcon />
                {showNumber ? phoneNumber : "Teléfono"}
              </button>
            </div>}

          <div className="flex items-center gap-1 xlg:gap-3">
            <MenuIcon />
            <Title24>{data?.user?.business_food_menu}</Title24>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2 xlg:gap-3">
          <a
            href={data?.user?.business_website_link}
            target="_blank"
            rel="noopener noreferrer"
            className="xlg:text-[20px] font-semibold hover:text-[#4888ff] hover:underline"
          >
            Website
          </a>
          {console.log(data?.user)}
          <Title24>Edad {data?.user?.age}</Title24>
        </div>
        <div className="mx-auto w-full text-center">
          <Title24>{data?.user?.business_details}</Title24>
        </div>
        <div className="w-full text-center">
          <p className="bg-[#0E1060] py-1 sm:py-2  w-full rounded-xl font-bold text-xl sm:text-xl text-white">
            Nuestros Eventos
          </p>
        </div>
        {pathname === "/venue-profile-edit" && (
          <div className=" flex flex-col items-start xxs:flex-row gap-4 justify-between">
            <button
              onClick={() => {
                setIsSubmitting(true);
                LogOutInMutation.mutate();
              }}
              disabled={isSubmitting}
              className={`bg-red-600 hover:bg-red-700 text-xl text-white font-semibold h-10 sm:h-11 gap-1 flex items-center justify-center  px-6 rounded-[12px] transition duration-300 ${
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
              className="bg-[#0E1060] py-1 sm:py-2 xlg:py-2 px-6  rounded-xl font-bold text-xl flex items-center justify-center gap-2  text-white"
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

export default EventDetailsCard;
