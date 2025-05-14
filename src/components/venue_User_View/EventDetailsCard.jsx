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
       localStorage.removeItem('user'); // or whatever key you used to store user data
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
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="mb-10 lg:max-w-[620px]  w-full">
      <SwiperImg data={data?.user?.user_images} />

      <div className="flex flex-col gap-4 xlg:gap-6  mt-8">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 xlg:gap-4">
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
        <div className="flex  items-center gap-2 xlg:gap-4">
          <WatchIcon />
          <Title24>{data?.user?.business_time} </Title24>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-6">
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
          <Title24>{data?.user?.business_details}</Title24>
        </div>
        <div className="w-full text-center">
          <p className="bg-[#0E1060] py-1 sm:py-2 xlg:py-3 w-full mb-3 rounded-xl font-bold text-xl sm:text-xl text-white">
            Nuestros Eventos
          </p>
        </div>
        {pathname === "/venue-profile-edit" && (
          <div className=" flex flex-col xxs:flex-row gap-4 justify-between">
            <button
              onClick={() => {
                setIsSubmitting(true);
                LogOutInMutation.mutate();
              }}
              disabled={isSubmitting}
              className={`bg-red-600 hover:bg-red-700 text-xl text-white font-semibold h-10 sm:h-14 gap-1 flex items-center justify-center  px-6 rounded-[14px] transition duration-300 ${
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

export default EventDetailsCard;
