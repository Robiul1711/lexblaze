import Title48 from "@/components/common/Title48";
import LeftSide from "@/components/home/LeftSide";
import MiddleContent from "@/components/home/MiddleContent";
import RightSide from "@/components/home/RightSide";
import bottomImg from "@/assets/images/img6.png";

import { useAuth } from "@/hooks/useAuth";
import SlideSwiper from "@/components/home/SlideSwiper";
import AddSlider from "@/components/common/AddSlider";
import { TodoEventDropdownMobile } from "@/shared/navbar/TodoEventDropdownMobile";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
const Home = () => {

  const axiosPublic = useAxiosPublic();
  const {search, date, category}=useAuth();

  const dynamicDate = date; // dynamic value

  const formattedDate = new Date(dynamicDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  
  console.log(date); // Output: 14/05/25
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["events", search, date, category, ], // <- include reactive keys
    queryFn: async () => {
      const response = await axiosPublic.post(`/event/show`, {
        search,
        date,
        category_id: category,
      });
      return response.data;
    },
  });
  return (
    <div className="section-padding-x  lg:mb-[60px]">
      {/* Title  */}
      <div className="lg:hidden my-3 lg:my-0 ">
      <SlideSwiper data={data} />

      </div>
      <div className="text-center  lg:mt-10  space-y-2 lg:space-y-0 w-full">
      <TodoEventDropdownMobile />
        <Title48 title1="Ver Eventos para el " title2={formattedDate} />
      </div>
      <div className="flex justify-between w-full gap-12 mt-5 lg:mt-10">
        {/* Leftside  */}
        <div className="hidden lg:block lg:w-[40%]"> 
          <LeftSide />
        </div>
        {/* Middle  */}
        <div className="w-full  lg:w-[60%]">
          <MiddleContent data={data} isLoading={isLoading} error={error} />
        </div>
        {/* Rightside  */}
        <div className="hidden lg:block lg:w-[40%]">
          <RightSide />
        </div>
      </div>
      {/* Footer  */}
      <div className="flex justify-center mt-5 sm:mt-10  pb-[120px]">
       <AddSlider />
      </div>
    </div>
  );
};

export default Home;
