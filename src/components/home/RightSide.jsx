import React from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../common/LoadingSpinner";
import { useLocation } from "react-router-dom";

const RightSide = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, error } = useQuery({
    queryKey: ["adsData"],
    queryFn: async () => {
      const response = await axiosPublic.get("/adds/allApiDatas");
      return response.data;
    },
  });

  const { pathname } = useLocation();

  return (
    <div className="">
      {isLoading ? (
        pathname === "/about-us" && <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500 font-semibold text-center my-4">
          Failed to load ads. Please try again later.
        </p>
      ) : (
        <>
          <p className="bg-[#D40000] xlg:py-3 w-full py-2 mb-3 rounded-md lg:rounded-xl text-sm text-center font-bold xl:text-xl text-white">
            EVENTOS DESTACADOS
          </p>
          {data?.[1]?.image && (
            <img
              src={data[1].image}
              alt="Ad"
              className="rounded-md object-cover xl:h-[400px] lg:h-[300px] xlg:h-[300px]"
            />
          )}
        </>
      )}
    </div>
  );
};

export default RightSide;
