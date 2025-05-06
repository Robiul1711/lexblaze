import React from 'react'
import rightImg from "@/assets/images/rightSideImg.png"
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
const RightSide = () => {
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
      <button className='bg-[#D40000] xlg:py-3 w-full py-2 mb-3 rounded-md lg:rounded-xl text-sm font-bold xl:text-xl text-white'>EVENTOS DESTACADOS</button>
        <img src={data?.[1]?.image} alt="" className='rounded-md object-cover  xl:h-[450px] lg:h-[320px] xlg:h-[380px]' />
    </div>
  )
}

export default RightSide