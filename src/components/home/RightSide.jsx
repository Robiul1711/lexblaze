import React from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../common/LoadingSpinner";
import { useLocation } from "react-router-dom";

const RightSide = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, error } = useQuery({
    queryKey: ["adsDataRight"],
    queryFn: async () => {
      const response = await axiosPublic.get("/adsto");
      return response.data;
    },
  });
  const { pathname } = useLocation();
  // console.log(data)
  return (
    <div className="w-full  max-w-[450px] mx-auto aspect-[4/5] ">
      {isLoading ? (
        pathname === "/about-us" && <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500 font-semibold text-center my-3">
          {/* Failed to load ads. Please try again later. */}
        </p>
      ) : (
        <>
          <p className="bg-[#D40000] xlg:py-2 w-full py-2 mb-3 rounded-md lg:rounded-xl text-sm text-center font-semibold xl:text-lg text-white">
            EVENTOS DESTACADOS
          </p>

          <img
            src={data?.right_side_ads}
            alt="Ad"
            className=" w-full h-full object-cover rounded-md "
          />
        </>
      )}
    </div>
  );
};

export default RightSide;
