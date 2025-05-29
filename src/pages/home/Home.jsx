import Title48 from "@/components/common/Title48";
import LeftSide from "@/components/home/LeftSide";
import MiddleContent from "@/components/home/MiddleContent";
import RightSide from "@/components/home/RightSide";
import { useAuth } from "@/hooks/useAuth";
import AddSlider from "@/components/common/AddSlider";
import { TodoEventDropdownMobile } from "@/shared/navbar/TodoEventDropdownMobile";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const {  date, category } = useAuth();
  const dynamicDate = date;
  const formattedDate = new Date(dynamicDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["events", date, category],
    queryFn: async () => {
      const response = await axiosPublic.post(`/event/show`, {
        // search,
        date,
        category_id: category,
      });
      return response.data;
    },
  });
  return (
    <div className="section-padding-x lg:mb-[60px]">
      {/* Title */}
      <div className="lg:hidden my-3 lg:my-0">
        {/* <SlideSwiper data={data} /> */}
          <AddSlider />
      </div>
      
      <div className="text-center lg:mt-4 space-y-2 lg:space-y-0 w-full">
        <TodoEventDropdownMobile />
{
  (() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const format = (date) =>
      date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" });

    const isToday = formattedDate === format(today);
    const isTomorrow = formattedDate === format(tomorrow);

    const title1 = isToday
      ? "Ver Eventos de Hoy "
      : isTomorrow
      ? "Ver Eventos para Mañana "
      : "Ver Eventos para el ";

    return <Title48 title1={title1} title2={formattedDate} />;
  })()
}
      </div>

      <div className="flex justify-between w-full gap-8 mt-2 ">
        {/* Leftside */}
        <div className="hidden lg:block lg:w-[40%]">
          
          <LeftSide />
        </div>
        
        {/* Middle */}
        <div className="w-full lg:w-[60%]">
          
          <MiddleContent data={data} isLoading={isLoading} error={error} />
    
        </div>
        
        {/* Rightside */}
        <div className="hidden lg:block lg:w-[40%]">
          <RightSide />
        </div>
      </div>

      {/* Show AddSlider only when data is loaded and not loading */}
      {!isLoading && data && (
        <div className="flex flex-col items-center max-w-[600px] mx-auto justify-center mt-5 sm:mt-10 pb-[45px] sm:pb-[70px]">
      
          <div className="lg:hidden mb-5 ">
               <RightSide />
          </div>
          <div className="hidden lg:block">

          <AddSlider />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;