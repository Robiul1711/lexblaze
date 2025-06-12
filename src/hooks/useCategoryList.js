// hooks/useCategoryList.js
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategoryList = () => {
  const axiosPublic = useAxiosPublic();

  const {data}= useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/category/allApiDatas`);
      return response.data;
    },
  });

  return data;
};

export default useCategoryList;
