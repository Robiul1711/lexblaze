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
    <div className=''>
        <img src={data?.[0]?.image} alt="" className='rounded-md object-cover h-full xl:h-[450px] lg:h-[320px] xlg:h-[380px]'/>
    </div>
  )
}

export default LeftSide