import LeftSide from "@/components/home/LeftSide";
import RightSide from "@/components/home/RightSide";
import bottomImg from "@/assets/images/img6.png";
import EventDetailsCard from "@/components/venue_User_View/EventDetailsCard";
import eventUserView from "@/assets/images/eventUserView.png";
import TopBanner from "@/components/eventUserPage/TopBanner";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import AddSlider from "@/components/common/AddSlider";
import LoadingSpinner from "@/components/common/LoadingSpinner";
const EventPageUserView = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["singleEventsData"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/event/details/${id}`);
      return response.data;
    },
  });

  return (
    <div className="section-padding-x ">
      {/* Title  */}

      <div className="flex min-h-screen w-full flex-col lg:flex-row justify-between gap-5 xl:gap-12  ">
        {/* Leftside  */}
        <div className="hidden mt-10 lg:block">
          <LeftSide />
        </div>
        {/* Middle  */}
        <div
          className={`max-w-[550px] xl:max-w-[680px] w-full mx-auto ${
            isLoading ? "" : "lg:bg-[#FFFBE0] "
          } `}
        >
          <div className="text-center mt-5 lg:mt-10 md:px-5 ">
            {isLoading ? (
              <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
              </div>
            ) : (
              <TopBanner data={data?.event} />
            )}
            <div
              className={`relative  lg:mb-2 ${
                data?.event?.event_thumb_image && " aspect-[4/5]"
              }`}
            >
              {data?.event?.event_thumb_image && (
                <img
                  src={data.event.event_thumb_image}
                  alt="flyer"
                  className="absolute max-h-[600px] h-full w-full  rounded-md"
                />
              )}
            </div>
          </div>

          <div className="lg:flex px-4 justify-center lg:mb-[100px]  hidden ">
            <AddSlider />
          </div>
        </div>
        {/* Rightside  */}
        <div className="mt-3 lg:mt-10">
          <RightSide />
        </div>
        <div className="flex   justify-center mb-[50px] sm:mb-[100px] lg:mb-[800px] mt-4 lg:mt-20 lg:hidden ">
          <AddSlider />
        </div>
      </div>
      {/* Footer  */}
    </div>
  );
};

export default EventPageUserView;
