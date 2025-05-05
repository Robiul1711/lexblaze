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
const EventPageUserView = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["singleEventsData"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/event/details/${id}`);
      return response.data;
    },
  });

  return (
    <div className="section-padding-x ">
      {/* Title  */}

      <div className="flex flex-col lg:flex-row justify-between gap-6 xlg:gap-12  ">
        {/* Leftside  */}
        <div className="hidden mt-40 lg:block">
          <LeftSide />
        </div>
        {/* Middle  */}
        <div className=" lg:bg-[#FFFBE0] lg:px-6 xlg:px-10">
          <div className="text-center mt-5 lg:mt-10 ">
            <TopBanner data={data?.event} />
            <img src={eventUserView} alt="" className="w-full max-h-[400px] object-fill" />
          </div>

          <div className="lg:flex justify-center lg:mb-[220px] mt-20 hidden ">
            <AddSlider />
          </div>
        </div>
        {/* Rightside  */}
        <div className="mt-10 lg:mt-40">
          <RightSide />
        </div>
        <div className="flex justify-center mb-[100px] mt-10 lg:mt-20 lg:hidden ">
        <AddSlider />
        </div>
      </div>
      {/* Footer  */}
    </div>
  );
};

export default EventPageUserView;
