import React from 'react'
import leftImg from "@/assets/images/leftSideImg.png"
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
const LeftSide = () => {
  const axiosPublic=useAxiosPublic();
  const { data, isLoading, error } = useQuery({
      queryKey: ["adsData"],
      queryFn: async () => {
        const response = await axiosPublic.get("/adds/allApiDatas");
        return response.data;
      },
    });

  return (
  <div className=" w-full aspect-[4/5]">

  <img
    src={data?.[0]?.image}
    alt=""
    className="  w-full h-full object-cover rounded-md"
  />
</div>

  )
}

export default LeftSide