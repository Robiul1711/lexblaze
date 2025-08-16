import React from "react";
import leftImg from "@/assets/images/leftSideImg.png";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const LeftSide = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, error } = useQuery({
    queryKey: ["adsDataLeft"],
    queryFn: async () => {
      const response = await axiosPublic.get("/adsto");
      return response.data;
    },
  });
  return (
    <>
      {isLoading ? null : (
        <div
          className={`w-full ${
            data ? "w-full  max-w-[450px] mx-auto aspect-[4/5]" : ""
          } `}
        >
          <img
            src={data?.left_side_ads}
            alt=""
            className="  w-full h-full  object-cover rounded-md"
          />
        </div>
      )}
    </>
  );
};

export default LeftSide;
