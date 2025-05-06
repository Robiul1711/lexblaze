import Title48 from "@/components/common/Title48";
import LeftSide from "@/components/home/LeftSide";
import MiddleContent from "@/components/home/MiddleContent";
import RightSide from "@/components/home/RightSide";
import bottomImg from "@/assets/images/img6.png";

import { useAuth } from "@/hooks/useAuth";
import SlideSwiper from "@/components/home/SlideSwiper";
import AddSlider from "@/components/common/AddSlider";
import { TodoEventDropdownMobile } from "@/shared/navbar/TodoEventDropdownMobile";
const Home = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <div className="section-padding-x  lg:mb-[120px]">
      {/* Title  */}
      <div className="lg:hidden my-3 lg:my-0 ">
      <SlideSwiper  />

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
          <MiddleContent />
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
